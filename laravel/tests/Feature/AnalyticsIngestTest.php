<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

/**
 * Контракт ингеста аналитики (`POST /api/analytics/events`).
 *
 * Тест покрывает три набора инвариантов, на которые опирается админка:
 *
 *  1. Аутентификация и предельные значения батча — без валидной куки 401,
 *     пустой/огромный батч 4xx, несуществующий event тихо игнорируется.
 *
 *  2. Защита от мусорных временных меток — `occurredAt` вне окна
 *     [now − 7д, now + 5мин] нормализуется в `now`, чтобы клиент не мог
 *     произвольно «бэкфиллить» прошлое или забивать будущие столбцы графиков.
 *
 *  3. Согласованность payload — `correct ≤ total` принудительно, percent
 *     досчитывается из них, если фронт его не прислал.
 *
 * `iqmo`-соединение в тестах подменяется на in-memory sqlite, чтобы не
 * требовать живой MySQL в CI и тестировать именно код контроллера.
 */
final class AnalyticsIngestTest extends TestCase
{
    private const JWT_SECRET = 'analytics-ingest-test-secret';

    private const USER_ID = 42;

    protected function setUp(): void
    {
        parent::setUp();

        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);

        // Подменяем iqmo-соединение на in-memory sqlite, чтобы тесту не нужен
        // живой MySQL. Контроллер ходит через DB::connection('iqmo'), нам этого
        // достаточно — структура колонок повторяется ровно в том виде, в каком
        // её ждёт `analytics_events`.
        config([
            'database.connections.iqmo' => [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
                'foreign_key_constraints' => false,
            ],
        ]);

        // Нет FK на users — реальный prod-стейт мы тут не воспроизводим (users
        // живут в другом инстансе MySQL, миграция Node-сервера). Цель теста —
        // санитайзеры/лимиты контроллера, а не миграционная схема.
        Schema::connection('iqmo')->create('analytics_events', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('occurred_at');
            $table->string('event', 64);
            $table->text('payload_json');
            $table->unsignedBigInteger('received_at');
        });
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('analytics_events');

        parent::tearDown();
    }

    private function authedCookie(): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => self::USER_ID,
            'email' => 'u@iqmo.test',
        ]);

        return ['iqmo_session' => $token];
    }

    private function postEvents(array $events, ?array $cookies = null): \Illuminate\Testing\TestResponse
    {
        $cookies ??= $this->authedCookie();

        // postJson по умолчанию НЕ шлёт куки в запросе (см. prepareCookiesForJsonRequest()
        // в Laravel — оно отдаёт пустой массив, если withCredentials не выставлен).
        // Поэтому без withCredentials() наш middleware iqmo.jwt получил бы пустой
        // request->cookies и отвечал 401 даже на корректные тесты.
        return $this->withCredentials()
            ->withCookies($cookies)
            ->postJson('/api/analytics/events', ['events' => $events]);
    }

    public function test_unauthenticated_request_is_rejected(): void
    {
        // Нет куки — middleware iqmo.jwt отвечает 401 ещё до контроллера.
        $response = $this->withCredentials()
            ->postJson('/api/analytics/events', ['events' => [
                ['event' => 'chem.topic_view', 'payload' => ['topicSlug' => 'periodic-table']],
            ]]);

        $response->assertStatus(401);
        $this->assertSame(0, DB::connection('iqmo')->table('analytics_events')->count());
    }

    public function test_empty_batch_is_rejected(): void
    {
        $response = $this->postEvents([]);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'events_required']);
    }

    public function test_oversized_batch_is_rejected(): void
    {
        $events = [];
        for ($i = 0; $i < 25; $i++) {
            $events[] = ['event' => 'chem.topic_view', 'payload' => ['topicSlug' => 'topic-'.$i]];
        }

        $response = $this->postEvents($events);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'too_many_events']);
    }

    public function test_unknown_event_name_is_silently_dropped(): void
    {
        // Один валидный + один с чужим именем. Чужой просто пропускается, валидный сохраняется.
        $response = $this->postEvents([
            ['event' => 'chem.topic_view', 'payload' => ['topicSlug' => 'periodic-table']],
            ['event' => 'evil.spam', 'payload' => ['x' => 'y']],
        ]);

        $response->assertStatus(200);
        $response->assertJson(['ok' => true, 'saved' => 1]);

        $this->assertSame(1, DB::connection('iqmo')->table('analytics_events')->count());
        $this->assertSame(
            'chem.topic_view',
            DB::connection('iqmo')->table('analytics_events')->value('event'),
        );
    }

    public function test_topic_view_is_persisted_with_sanitized_payload(): void
    {
        $response = $this->postEvents([
            [
                'event' => 'chem.topic_view',
                'occurredAt' => 1_700_000_000_000,
                // subject — мусорная строка длиной > 32 байт, должна обрезаться.
                'payload' => ['subject' => str_repeat('X', 64), 'topicSlug' => 'periodic-table'],
            ],
        ]);

        $response->assertStatus(200);
        $row = DB::connection('iqmo')->table('analytics_events')->first();
        $this->assertNotNull($row);

        $this->assertSame('chem.topic_view', $row->event);
        $this->assertSame(self::USER_ID, (int) $row->user_id);

        $payload = json_decode((string) $row->payload_json, true);
        $this->assertSame('periodic-table', $payload['topicSlug']);
        $this->assertLessThanOrEqual(32, strlen($payload['subject']));
    }

    public function test_occurred_at_far_in_the_past_is_normalized_to_now(): void
    {
        // 2010-01-01 в миллисекундах. Это явно за пределами 7-дневного окна.
        $ancient = 1_262_304_000_000;

        $before = (int) (microtime(true) * 1000);
        $response = $this->postEvents([
            ['event' => 'chem.topic_view', 'occurredAt' => $ancient, 'payload' => ['topicSlug' => 't']],
        ]);
        $after = (int) (microtime(true) * 1000);

        $response->assertStatus(200);
        $stored = (int) DB::connection('iqmo')->table('analytics_events')->value('occurred_at');

        // Не должно быть 2010-го года: контроллер обязан был перетереть на now.
        $this->assertNotSame($ancient, $stored);
        $this->assertGreaterThanOrEqual($before - 1000, $stored);
        $this->assertLessThanOrEqual($after + 1000, $stored);
    }

    public function test_occurred_at_far_in_the_future_is_normalized_to_now(): void
    {
        // 1 год вперёд — тоже за окном (5 мин допуск на дрейф часов).
        $future = (int) (microtime(true) * 1000) + 365 * 24 * 60 * 60 * 1000;

        $before = (int) (microtime(true) * 1000);
        $response = $this->postEvents([
            ['event' => 'chem.topic_view', 'occurredAt' => $future, 'payload' => ['topicSlug' => 't']],
        ]);
        $after = (int) (microtime(true) * 1000);

        $response->assertStatus(200);
        $stored = (int) DB::connection('iqmo')->table('analytics_events')->value('occurred_at');

        $this->assertLessThanOrEqual($after + 1000, $stored);
        $this->assertGreaterThanOrEqual($before - 1000, $stored);
    }

    public function test_recent_occurred_at_is_preserved(): void
    {
        // 1 час назад — точно внутри 7-дневного окна, должен сохраниться как есть.
        $oneHourAgo = (int) (microtime(true) * 1000) - 60 * 60 * 1000;

        $response = $this->postEvents([
            ['event' => 'chem.topic_view', 'occurredAt' => $oneHourAgo, 'payload' => ['topicSlug' => 't']],
        ]);

        $response->assertStatus(200);
        $stored = (int) DB::connection('iqmo')->table('analytics_events')->value('occurred_at');
        $this->assertSame($oneHourAgo, $stored);
    }

    public function test_attempt_complete_clamps_correct_to_total(): void
    {
        $response = $this->postEvents([
            [
                'event' => 'chem.attempt_complete',
                'payload' => [
                    'mode' => 'warmup',
                    'subject' => 'chemistry',
                    'attemptId' => 'a-1',
                    'correct' => 50,
                    'total' => 5,
                    // percent не присылаем — контроллер должен досчитать из чищенных correct/total.
                ],
            ],
        ]);

        $response->assertStatus(200);
        $payload = json_decode(
            (string) DB::connection('iqmo')->table('analytics_events')->value('payload_json'),
            true
        );

        $this->assertSame(5, $payload['total']);
        $this->assertSame(5, $payload['correct'], 'correct must be clamped to total');
        $this->assertSame(100, $payload['percent'], 'percent must be derived from clamped values');
    }

    public function test_attempt_complete_explicit_percent_is_clamped_to_100(): void
    {
        $response = $this->postEvents([
            [
                'event' => 'chem.attempt_complete',
                'payload' => [
                    'mode' => 'quick',
                    'subject' => 'chemistry',
                    'attemptId' => 'a-2',
                    'correct' => 1,
                    'total' => 1,
                    'percent' => 999,
                ],
            ],
        ]);

        $response->assertStatus(200);
        $payload = json_decode(
            (string) DB::connection('iqmo')->table('analytics_events')->value('payload_json'),
            true
        );
        $this->assertSame(100, $payload['percent']);
    }

    public function test_biology_events_are_accepted_and_persisted(): void
    {
        // Биология шлёт `bio.*` (тот же ингест, что и chem.*). Цель теста — гарантия,
        // что allowlist не вернёт обратно в режим «только химия» при будущих рефакторах.
        $response = $this->postEvents([
            ['event' => 'bio.topic_view', 'payload' => ['subject' => 'biology', 'topicSlug' => 'cell']],
            [
                'event' => 'bio.attempt_start',
                'payload' => [
                    'mode' => 'full',
                    'subject' => 'biology',
                    'attemptId' => 'bio-att-1',
                    'totalQuestions' => 30,
                ],
            ],
            [
                'event' => 'bio.attempt_complete',
                'payload' => [
                    'mode' => 'full',
                    'subject' => 'biology',
                    'attemptId' => 'bio-att-1',
                    'correct' => 21,
                    'total' => 30,
                ],
            ],
        ]);

        $response->assertStatus(200);
        $response->assertJson(['ok' => true, 'saved' => 3]);

        $rows = DB::connection('iqmo')->table('analytics_events')->orderBy('id')->get();
        $this->assertSame(['bio.topic_view', 'bio.attempt_start', 'bio.attempt_complete'], $rows->pluck('event')->all());
        $complete = json_decode((string) $rows->last()->payload_json, true);
        $this->assertSame(21, $complete['correct']);
        $this->assertSame(30, $complete['total']);
        $this->assertSame(70, $complete['percent']);
    }

    public function test_oversized_body_is_rejected_with_413(): void
    {
        // Эмулируем огромное тело: 65 KB событий. Реальный фронт такого никогда не
        // отправляет (батч обрезан до 24), но залогиненный бот мог бы.
        $events = [];
        $bigString = str_repeat('A', 4 * 1024); // 4 KB на каждое событие
        for ($i = 0; $i < 20; $i++) {
            $events[] = [
                'event' => 'chem.topic_view',
                'payload' => ['topicSlug' => 'topic-'.$i, 'subject' => $bigString],
            ];
        }

        // Считаем реальный размер JSON и проставим его в Content-Length —
        // postJson этого автоматически не делает в тестовом клиенте.
        $payload = json_encode(['events' => $events]);
        $response = $this->withCredentials()
            ->withCookies($this->authedCookie())
            ->withHeaders(['Content-Length' => (string) strlen($payload)])
            ->postJson('/api/analytics/events', ['events' => $events]);

        $response->assertStatus(413);
        $response->assertJson(['error' => 'payload_too_large']);
        $this->assertSame(0, DB::connection('iqmo')->table('analytics_events')->count());
    }
}
