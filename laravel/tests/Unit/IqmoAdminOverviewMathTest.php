<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\IqmoAdminOverviewMath;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

/**
 * Unit-тесты на чистую математику админ-дашборда.
 *
 * Зачем: до этого PR логика «медиана / группировка сессий / агрегация топа
 * вопросов / форматирование воронки» жила приватными методами Builder'а
 * и не была покрыта ничем кроме HTTP smoke-тестов в deploy.yml. Один
 * неаккуратный рефакторинг JOIN'а в `computeTimeInTest` или порога 30 мин
 * в `computeAvgSession` — и админка молча показывает «—» / неверные KPI,
 * а заметим только когда продукт-менеджер удивится цифрам через неделю.
 *
 * Тесты намеренно используют `PHPUnit\Framework\TestCase` (не Laravel-овский),
 * чтобы не платить за boot контейнера на каждый тест: математика не зависит
 * ни от Laravel, ни от БД.
 */
final class IqmoAdminOverviewMathTest extends TestCase
{
    // -----------------------------------------------------------------
    // median()
    // -----------------------------------------------------------------

    #[Test]
    public function median_returns_null_for_empty_list(): void
    {
        // Различие null vs 0.0 принципиально: KPI выше показывает «—»
        // только при null. Если медиана решит возвращать 0 — увидим
        // «0 с» вместо честного «нет данных».
        $this->assertNull(IqmoAdminOverviewMath::median([]));
    }

    #[Test]
    public function median_of_single_value(): void
    {
        $this->assertSame(42.0, IqmoAdminOverviewMath::median([42]));
    }

    #[Test]
    public function median_of_odd_count_returns_middle(): void
    {
        $this->assertSame(3.0, IqmoAdminOverviewMath::median([1, 5, 3]));
    }

    #[Test]
    public function median_of_even_count_averages_middle_two(): void
    {
        $this->assertSame(2.5, IqmoAdminOverviewMath::median([1, 2, 3, 4]));
    }

    #[Test]
    public function median_does_not_mutate_input_order_observably(): void
    {
        // sort() работает на копии, потому что массив передан by-value.
        // Тест защищает от рефакторинга вида `&$values` или замены на
        // сортировку in-place в вызывающей стороне.
        $input = [10, 1, 5];
        $this->assertSame(5.0, IqmoAdminOverviewMath::median($input));
        $this->assertSame([10, 1, 5], $input);
    }

    #[Test]
    public function median_handles_floats(): void
    {
        $this->assertSame(2.5, IqmoAdminOverviewMath::median([1.5, 3.5]));
    }

    // -----------------------------------------------------------------
    // groupSessionDurations()
    // -----------------------------------------------------------------

    #[Test]
    public function session_grouping_returns_empty_for_no_rows(): void
    {
        $this->assertSame([], IqmoAdminOverviewMath::groupSessionDurations([]));
    }

    #[Test]
    public function session_grouping_drops_singleton_events(): void
    {
        // Один ивент = 0 c длительности. Если такие сессии попадут в
        // выдачу, они утянут медиану в пол. Это явное правило, лучше
        // зафиксировать тестом, чем комментарием.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 2, 'occurred_at' => 2_000_000],
        ];
        $this->assertSame([], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_returns_duration_for_two_close_events(): void
    {
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_010_000], // +10 c
        ];
        $this->assertSame([10_000], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_splits_on_gap_above_threshold(): void
    {
        // Разрыв 31 мин между ивентами одного пользователя → две сессии,
        // в каждой только по одному ивенту → ни одной длительности.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000 + 31 * 60_000],
        ];
        $this->assertSame([], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_keeps_session_at_exact_threshold(): void
    {
        // Граничный кейс: разрыв ровно 30 мин (1 800 000 мс) — ещё та же
        // сессия. Меняешь `> $gapMs` на `>= $gapMs` — этот тест ловит.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000 + 30 * 60_000],
        ];
        $this->assertSame([30 * 60_000], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_filters_below_min_duration(): void
    {
        // Два ивента в одну секунду = 0 мс. По умолчанию minDurationMs = 5_000,
        // значит этот «дубль» отбрасывается.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
        ];
        $this->assertSame([], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_finalizes_each_user_independently(): void
    {
        // 3 юзера, у каждого по две своих сессии — итого 6 длительностей,
        // и они не «слипаются» при переходе uid → uid'.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_010_000], // 10 c
            (object) ['user_id' => 1, 'occurred_at' => 1_010_000 + 31 * 60_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_010_000 + 31 * 60_000 + 20_000], // 20 c
            (object) ['user_id' => 2, 'occurred_at' => 5_000_000],
            (object) ['user_id' => 2, 'occurred_at' => 5_030_000], // 30 c
        ];
        $this->assertSame([10_000, 20_000, 30_000], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_uses_string_columns_safely(): void
    {
        // PDO иногда отдаёт user_id и occurred_at как string (особенно
        // mysqlnd vs PDO_MYSQL без emulate prepares). Cast в (int) внутри —
        // ровно для этого. Если кто-то заменит cast на typed-property hint,
        // на проде получим TypeError.
        $rows = [
            (object) ['user_id' => '7', 'occurred_at' => '1000000'],
            (object) ['user_id' => '7', 'occurred_at' => '1015000'],
        ];
        $this->assertSame([15_000], IqmoAdminOverviewMath::groupSessionDurations($rows));
    }

    #[Test]
    public function session_grouping_respects_custom_thresholds(): void
    {
        // Кто-то решит переопределить gap (например, 5 мин для другого
        // продукта) — параметризация работает.
        $rows = [
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000],
            (object) ['user_id' => 1, 'occurred_at' => 1_000_000 + 6 * 60_000],
        ];
        $this->assertSame(
            [],
            IqmoAdminOverviewMath::groupSessionDurations($rows, gapMs: 5 * 60_000),
            'разрыв 6 мин при gap=5 мин должен разорвать сессию'
        );
    }

    // -----------------------------------------------------------------
    // aggregateTopQuestions()
    // -----------------------------------------------------------------

    #[Test]
    public function top_questions_returns_empty_for_no_rows(): void
    {
        $this->assertSame([], IqmoAdminOverviewMath::aggregateTopQuestions([], minShows: 3));
    }

    #[Test]
    public function top_questions_filters_by_min_shows(): void
    {
        // qid=A — 2 показа (ниже порога), qid=B — 4 показа (выше).
        $rows = [
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'A', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'A', 'ok' => true]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => true]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => true]]])],
        ];
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 3);
        $this->assertCount(1, $out);
        $this->assertSame('B', $out[0]['qid']);
        $this->assertSame(50, $out[0]['wrongPct']);
        $this->assertSame(4, $out[0]['shows']);
    }

    #[Test]
    public function top_questions_flag_set_only_when_both_thresholds_met(): void
    {
        // qid=HARD — 5 показов, 60% ошибок → флаг.
        // qid=EASY — 5 показов, 20% ошибок → без флага (ниже 55%).
        // qid=SMALL — 4 показа, 100% ошибок (но это с минимумом 4 — на границе)
        //   → флаг (граница = ≥ minShows).
        $rows = array_merge(
            // HARD
            array_fill(0, 3, (object) ['payload_json' => json_encode(['items' => [['qid' => 'HARD', 'ok' => false]]])]),
            array_fill(0, 2, (object) ['payload_json' => json_encode(['items' => [['qid' => 'HARD', 'ok' => true]]])]),
            // EASY
            array_fill(0, 1, (object) ['payload_json' => json_encode(['items' => [['qid' => 'EASY', 'ok' => false]]])]),
            array_fill(0, 4, (object) ['payload_json' => json_encode(['items' => [['qid' => 'EASY', 'ok' => true]]])]),
            // SMALL
            array_fill(0, 4, (object) ['payload_json' => json_encode(['items' => [['qid' => 'SMALL', 'ok' => false]]])]),
        );
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 4);
        $byQid = [];
        foreach ($out as $row) {
            $byQid[$row['qid']] = $row;
        }
        $this->assertTrue($byQid['HARD']['flag'], 'HARD: 60% ошибок при 5 показах должен подсветиться');
        $this->assertFalse($byQid['EASY']['flag'], 'EASY: 20% ошибок — флаг не нужен');
        $this->assertTrue($byQid['SMALL']['flag'], 'SMALL: 100% ошибок при ровно minShows показах — на границе подсвечиваем');
    }

    #[Test]
    public function top_questions_sorts_by_wrong_pct_then_shows(): void
    {
        // A: 80%/5  ; B: 80%/10 ; C: 90%/5
        // Ожидаем: C, B, A (wrongPct DESC; при равном — shows DESC).
        $rows = array_merge(
            array_fill(0, 4, (object) ['payload_json' => json_encode(['items' => [['qid' => 'A', 'ok' => false]]])]),
            array_fill(0, 1, (object) ['payload_json' => json_encode(['items' => [['qid' => 'A', 'ok' => true]]])]),
            array_fill(0, 8, (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => false]]])]),
            array_fill(0, 2, (object) ['payload_json' => json_encode(['items' => [['qid' => 'B', 'ok' => true]]])]),
            array_fill(0, 9, (object) ['payload_json' => json_encode(['items' => [['qid' => 'C', 'ok' => false]]])]),
            array_fill(0, 1, (object) ['payload_json' => json_encode(['items' => [['qid' => 'C', 'ok' => true]]])]),
        );
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 3);
        $this->assertSame(['C', 'B', 'A'], array_column($out, 'qid'));
    }

    #[Test]
    public function top_questions_caps_to_15_results(): void
    {
        $rows = [];
        for ($i = 1; $i <= 30; $i++) {
            $qid = sprintf('Q%02d', $i);
            $rows[] = (object) ['payload_json' => json_encode(['items' => [
                ['qid' => $qid, 'ok' => false],
                ['qid' => $qid, 'ok' => false],
                ['qid' => $qid, 'ok' => false],
                ['qid' => $qid, 'ok' => true],
            ]])];
        }
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 3);
        $this->assertCount(15, $out);
    }

    #[Test]
    public function top_questions_handles_array_payload_directly(): void
    {
        // Если PDO заранее распарсил JSON в массив (json-cast), этот код
        // тоже должен работать. Двойной decode «строка→массив→строка»
        // лишний и опасный (json_encode ассоциативного массива съест
        // числовые ключи в PHP, если что-то кеширует в виде array).
        $rows = [
            (object) ['payload_json' => ['items' => [['qid' => 'X', 'ok' => false]]]],
            (object) ['payload_json' => ['items' => [['qid' => 'X', 'ok' => false]]]],
            (object) ['payload_json' => ['items' => [['qid' => 'X', 'ok' => true]]]],
        ];
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 3);
        $this->assertSame('X', $out[0]['qid']);
        $this->assertSame(67, $out[0]['wrongPct']);
    }

    #[Test]
    public function top_questions_skips_invalid_payload_silently(): void
    {
        // Один кривой профиль не должен ронять всю агрегацию: builder в
        // продакшене обрабатывает 12 000 строк, и если хотя бы одна ломает
        // парсер — админу прилетает «—» вместо данных. Эти кейсы должны
        // пропускаться, а валидные — учитываться.
        $rows = [
            (object) ['payload_json' => null],
            (object) ['payload_json' => 'not json at all'],
            (object) ['payload_json' => 12345],
            (object) ['payload_json' => json_encode(['unrelated' => 'shape'])],
            (object) ['payload_json' => json_encode(['items' => 'not-array'])],
            (object) ['payload_json' => json_encode(['items' => [['no_qid' => true]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => '', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => str_repeat('z', 65), 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'OK', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'OK', 'ok' => false]]])],
            (object) ['payload_json' => json_encode(['items' => [['qid' => 'OK', 'ok' => false]]])],
        ];
        $out = IqmoAdminOverviewMath::aggregateTopQuestions($rows, minShows: 3);
        $this->assertCount(1, $out);
        $this->assertSame('OK', $out[0]['qid']);
        $this->assertSame(3, $out[0]['shows']);
    }

    // -----------------------------------------------------------------
    // topQuestionsMinShows()
    // -----------------------------------------------------------------

    public static function topQuestionsMinShowsCases(): array
    {
        return [
            'window 24h is short → relaxed threshold' => [1, 3],
            'window 7d uses default' => [7, 4],
            'window 14d uses default' => [14, 4],
            'window 30d uses default' => [30, 4],
        ];
    }

    #[Test]
    #[DataProvider('topQuestionsMinShowsCases')]
    public function top_questions_min_shows_per_window(int $days, int $expected): void
    {
        $this->assertSame($expected, IqmoAdminOverviewMath::topQuestionsMinShows($days));
    }

    // -----------------------------------------------------------------
    // buildLegacyFunnel() / buildEventFunnel()
    // -----------------------------------------------------------------

    #[Test]
    public function legacy_funnel_returns_empty_state_when_no_users(): void
    {
        $f = IqmoAdminOverviewMath::buildLegacyFunnel(0, 0, 0, 0, 0, days: 7);
        $this->assertCount(1, $f);
        $this->assertSame('Пока нет пользователей', $f[0]['step']);
        $this->assertSame(0.0, $f[0]['pct']);
    }

    #[Test]
    public function legacy_funnel_pcts_relative_to_total_users(): void
    {
        // 200 / 100 / 50 / 25 / 10 → 100/50/25/12.5/5 при totalUsers=200.
        $f = IqmoAdminOverviewMath::buildLegacyFunnel(200, 100, 50, 25, 10, days: 7);
        $this->assertSame(100.0, $f[0]['pct']);
        $this->assertSame(50.0, $f[1]['pct']);
        $this->assertSame(25.0, $f[2]['pct']);
        $this->assertSame(12.5, $f[3]['pct']);
        $this->assertSame(5.0, $f[4]['pct']);
    }

    #[Test]
    public function legacy_funnel_label_changes_for_24h_window(): void
    {
        $f1 = IqmoAdminOverviewMath::buildLegacyFunnel(100, 50, 30, 20, 10, days: 1);
        $f7 = IqmoAdminOverviewMath::buildLegacyFunnel(100, 50, 30, 20, 10, days: 7);
        $this->assertSame('Активность синхронизации (24 ч)', $f1[2]['step']);
        $this->assertSame('Активность синхронизации (7 дн.)', $f7[2]['step']);
    }

    #[Test]
    public function event_funnel_returns_empty_state_when_no_users(): void
    {
        $f = IqmoAdminOverviewMath::buildEventFunnel(0, ['view' => 5, 'start' => 3, 'complete' => 1], 0, days: 7);
        $this->assertCount(1, $f);
        $this->assertSame('Пока нет пользователей', $f[0]['step']);
    }

    #[Test]
    public function event_funnel_uses_event_counts(): void
    {
        $f = IqmoAdminOverviewMath::buildEventFunnel(
            totalUsers: 100,
            ev: ['view' => 60, 'start' => 30, 'complete' => 10],
            mistakeUsers: 5,
            days: 7,
        );
        $this->assertSame(['Аккаунтов в базе', 'Просмотрели тему (7 дн.)', 'Начали тест (7 дн.)', 'Завершили тест (7 дн.)', 'С непустым банком ошибок'], array_column($f, 'step'));
        $this->assertSame([100, 60, 30, 10, 5], array_column($f, 'users'));
        $this->assertSame([100.0, 60.0, 30.0, 10.0, 5.0], array_column($f, 'pct'));
    }

    // -----------------------------------------------------------------
    // formatDuration()
    // -----------------------------------------------------------------

    public static function formatDurationCases(): array
    {
        // Граничные точки: 60 c (минута), 3600 c (час).
        return [
            'zero ms → 0 с' => [0, '0 с'],
            'sub-second rounds to 0 с' => [499, '0 с'],
            'half-second rounds up to 1 с' => [500, '1 с'],
            'just under a minute' => [59_499, '59 с'],
            'rounds up to exactly a minute → 1 мин (no remainder)' => [59_500, '1 мин'],
            'one minute exactly' => [60_000, '1 мин'],
            'one minute thirty seconds' => [90_000, '1 мин 30 с'],
            'just under an hour' => [3_599_499, '59 мин 59 с'],
            'one hour exactly' => [3_600_000, '1 ч'],
            'one hour one minute' => [3_660_000, '1 ч 1 мин'],
            'four hours forty-five minutes' => [4 * 3_600_000 + 45 * 60_000, '4 ч 45 мин'],
            'negative input clamped to zero' => [-5_000, '0 с'],
        ];
    }

    #[Test]
    #[DataProvider('formatDurationCases')]
    public function format_duration_renders_human_string(int $ms, string $expected): void
    {
        $this->assertSame($expected, IqmoAdminOverviewMath::formatDuration($ms));
    }

    // -----------------------------------------------------------------
    // formatInt()
    // -----------------------------------------------------------------

    #[Test]
    public function format_int_uses_narrow_no_break_space(): void
    {
        // U+202F — узкий неразрывный пробел; именно его рендерят
        // браузеры без переноса в конце строки. Замена на обычный
        // пробел (U+0020) сломает вёрстку KPI-карточек.
        $this->assertSame('1'."\u{202F}".'234', IqmoAdminOverviewMath::formatInt(1234));
        $this->assertSame('1'."\u{202F}".'234'."\u{202F}".'567', IqmoAdminOverviewMath::formatInt(1234567));
    }

    #[Test]
    public function format_int_handles_zero_and_small_values(): void
    {
        $this->assertSame('0', IqmoAdminOverviewMath::formatInt(0));
        $this->assertSame('1', IqmoAdminOverviewMath::formatInt(1));
        $this->assertSame('999', IqmoAdminOverviewMath::formatInt(999));
    }

    #[Test]
    public function format_int_clamps_negative_to_zero(): void
    {
        // Отрицательного числа на дашборде быть не должно («минус 5 пользователей»).
        // Если вдруг прилетит — показываем 0, а не «-5».
        $this->assertSame('0', IqmoAdminOverviewMath::formatInt(-5));
    }

    // -----------------------------------------------------------------
    // decodeKeys()
    // -----------------------------------------------------------------

    #[Test]
    public function decode_keys_returns_empty_for_null_or_empty(): void
    {
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys(null));
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys(''));
    }

    #[Test]
    public function decode_keys_returns_array_unchanged(): void
    {
        // Если PDO с json-cast уже распарсил поле, повторно decode'ить нельзя —
        // это легко привело бы к null/empty при «двойном decode».
        $arr = ['iqmo-chem-attempt-stats-v1' => ['warmup' => 3]];
        $this->assertSame($arr, IqmoAdminOverviewMath::decodeKeys($arr));
    }

    #[Test]
    public function decode_keys_parses_json_string(): void
    {
        $json = '{"iqmo-chem-mistakes-v1":{"40001":{}}}';
        $this->assertSame(
            ['iqmo-chem-mistakes-v1' => ['40001' => []]],
            IqmoAdminOverviewMath::decodeKeys($json)
        );
    }

    #[Test]
    public function decode_keys_handles_stdclass_via_re_encode(): void
    {
        $obj = new \stdClass;
        $obj->a = 1;
        $obj->b = 'text';
        $this->assertSame(['a' => 1, 'b' => 'text'], IqmoAdminOverviewMath::decodeKeys($obj));
    }

    #[Test]
    public function decode_keys_returns_empty_for_malformed_json(): void
    {
        // Один кривой профиль не должен ронять всю выборку. Builder
        // вызывает decodeKeys() в цикле для 150 строк за чанк.
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys('this is not json'));
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys('[1,2,'));
    }

    #[Test]
    public function decode_keys_returns_empty_for_unsupported_types(): void
    {
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys(123));
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys(true));
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys(3.14));
    }

    #[Test]
    public function decode_keys_returns_empty_when_json_decodes_to_scalar(): void
    {
        // `json_decode("123")` отдаёт 123 — не массив. Билдер ожидает
        // именно массив (потом делает `isset($keys[...])` без проверки типа).
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys('123'));
        $this->assertSame([], IqmoAdminOverviewMath::decodeKeys('"some string"'));
    }
}
