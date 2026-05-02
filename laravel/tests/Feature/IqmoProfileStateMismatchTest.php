<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Tests\TestCase;

/**
 * Контракт защиты от stale-tab race в `PUT /api/profile/state` (audit #4).
 *
 * Сценарий, который тест охраняет:
 *   1. Tab A авторизован под user 42 — myUid в iqmo-sync.js = 42.
 *   2. В Tab B пользователь делает logout + login user 99. Cookie на
 *      браузере теперь указывает на 99.
 *   3. Tab A об этом не знает (мы не делаем reload по storage-event,
 *      чтобы не выкинуть пользователя из теста). Его следующий push
 *      уйдёт с keys = state user 42, но cookie у запроса от 99.
 *   4. Без серверной проверки контроллер записал бы данные A в state B.
 *
 * Защита: фронт включает `expected_user_id` в payload PUT. Контроллер
 * сравнивает с request->user_id (из JWT cookie). Если не совпадает —
 * 409 user_mismatch и БД НЕ трогается.
 *
 * Тест проверяет только mismatch case (нужная новая логика), потому что
 * проверка делается ДО первого SELECT/UPDATE: схема в БД не нужна.
 * Это позволяет тесту работать локально без pdo_sqlite. Успешный кейс
 * и backward compat покрыты регрессионными smoke-проверками на проде.
 */
final class IqmoProfileStateMismatchTest extends TestCase
{
    private const JWT_SECRET = 'profile-state-mismatch-secret';

    private const COOKIE_OWNER_ID = 42;

    protected function setUp(): void
    {
        parent::setUp();

        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);

        // Подменяем iqmo-connection на in-memory sqlite (без схемы).
        // Это нужно, чтобы кейсы, где guard ПРОПУСКАЕТ запрос (cases 2-3),
        // не висели в MySQL connect-таймаутах: с sqlite контроллер сразу
        // упрётся в «no such table profile_state» и отдаст 500 — нам это
        // подходит, мы проверяем только что НЕ возвращается 409.
        // Mismatch-case (case 1) до этой строки не доходит — early return.
        config([
            'database.connections.iqmo' => [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
                'foreign_key_constraints' => false,
            ],
        ]);
    }

    private function cookieFor(int $uid): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => $uid,
            'email' => "u{$uid}@iqmo.test",
        ]);

        return ['iqmo_session' => $token];
    }

    public function test_put_with_mismatched_expected_user_id_returns_409_before_touching_db(): void
    {
        // Cookie аутентифицирует юзера 42, но клиент думает, что он 99.
        // Контроллер должен ответить 409 user_mismatch ДО обращения к БД
        // (поэтому in-memory sqlite со схемой нам не нужен — если бы код
        // дошёл до DB::table(...), упал бы на отсутствии таблиц).
        $response = $this->withCredentials()
            ->withCookies($this->cookieFor(self::COOKIE_OWNER_ID))
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'expected_user_id' => 99,
                'keys' => ['iqmo-chem-streak' => '7'],
            ]);

        $response->assertStatus(409);
        $response->assertJson(['error' => 'user_mismatch']);
    }

    public function test_put_with_matching_expected_user_id_passes_guard(): void
    {
        // Symmetric case: cookie на 42, expected_user_id=42 — guard
        // пропускает; код пытается прочитать profile_state и падает на
        // отсутствии таблицы. Нам важен НЕ результат, а то что код НЕ
        // вернул 409 user_mismatch (то есть guard пропустил кейс).
        $response = $this->withCredentials()
            ->withCookies($this->cookieFor(self::COOKIE_OWNER_ID))
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'expected_user_id' => self::COOKIE_OWNER_ID,
                'keys' => ['iqmo-chem-streak' => '7'],
            ]);

        $this->assertNotSame(
            409,
            $response->status(),
            'Guard ошибочно срабатывает на матчащем expected_user_id.'
        );
    }

    public function test_put_without_expected_user_id_passes_guard_for_backward_compat(): void
    {
        // Старые клиенты без поля expected_user_id (до этого фикса) —
        // guard должен пропустить их как раньше. Иначе мы бы сломали все
        // вкладки, которые не успели догрузить новый iqmo-sync.js после
        // деплоя.
        $response = $this->withCredentials()
            ->withCookies($this->cookieFor(self::COOKIE_OWNER_ID))
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'keys' => ['iqmo-chem-streak' => '5'],
            ]);

        $this->assertNotSame(
            409,
            $response->status(),
            'Guard ломает обратную совместимость — пустой expected_user_id режется как mismatch.'
        );
    }
}
