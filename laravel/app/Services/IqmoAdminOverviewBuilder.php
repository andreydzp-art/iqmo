<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Сводка для админ-дашборда из БД IQMO (users, profile_state).
 * Попытки: снимки profile_state + события analytics_events (chem.attempt_complete).
 */
final class IqmoAdminOverviewBuilder
{
    private const ALLOWED_DAYS = [1, 7, 14, 30];

    public function __construct(
        private readonly IqmoYandexMetrikaClient $yandexMetrika,
    ) {}

    /** @return array<string, mixed> */
    public function build(int $days): array
    {
        if (! in_array($days, self::ALLOWED_DAYS, true)) {
            $days = 7;
        }

        $nowMs = (int) floor(microtime(true) * 1000);
        $sinceMs = $nowMs - $days * 86400000;
        $prevStartMs = $sinceMs - $days * 86400000;

        $iqmo = DB::connection('iqmo');

        $totalUsers = (int) $iqmo->table('users')->count();
        $profilesTotal = (int) $iqmo->table('profile_state')->count();
        $newUsers = (int) $iqmo->table('users')->where('created_at', '>=', $sinceMs)->count();
        $newUsersPrev = (int) $iqmo->table('users')
            ->where('created_at', '>=', $prevStartMs)
            ->where('created_at', '<', $sinceMs)
            ->count();

        $activeSync = (int) $iqmo->table('profile_state')->where('updated_at', '>=', $sinceMs)->count();

        $sumAttempts = 0;
        $sumTrialFull = 0;
        $withAttempts = 0;
        $mistakeUsers = 0;

        $iqmo->table('profile_state')
            ->where('updated_at', '>=', $sinceMs)
            ->orderBy('user_id')
            ->chunk(150, function ($rows) use (&$sumAttempts, &$sumTrialFull, &$withAttempts, &$mistakeUsers): void {
                foreach ($rows as $row) {
                    $keys = $this->decodeKeys($row->keys_json ?? null);
                    if ($keys === []) {
                        continue;
                    }

                    $attemptKey = 'iqmo-chem-attempt-stats-v1';
                    if (isset($keys[$attemptKey])) {
                        $inner = $keys[$attemptKey];
                        if (is_string($inner)) {
                            $inner = json_decode($inner, true);
                        }
                        if (is_array($inner)) {
                            $withAttempts++;
                            $w = (int) ($inner['warmup'] ?? 0);
                            $q = (int) ($inner['quick'] ?? 0);
                            $t = (int) ($inner['trial'] ?? 0);
                            $f = (int) ($inner['full'] ?? 0);
                            $o = (int) ($inner['other'] ?? 0);
                            $sumAttempts += $w + $q + $t + $f + $o;
                            $sumTrialFull += $t + $f;
                        }
                    }

                    $mistKey = 'iqmo-chem-mistakes-v1';
                    if (isset($keys[$mistKey])) {
                        $mv = $keys[$mistKey];
                        if (is_string($mv)) {
                            $mv = json_decode($mv, true);
                        }
                        if (is_array($mv) && count($mv) > 0) {
                            $mistakeUsers++;
                        }
                    }
                }
            });

        $periodHint = $days === 1 ? 'за последние 24 ч' : 'за '.$days.' дн.';
        $dauLabel = $days === 1 ? 'Синхронизаций за 24 ч' : 'Профилей с синхронизацией';

        $newTrend = $newUsersPrev > 0
            ? ($newUsers >= $newUsersPrev ? 'up' : 'down')
            : ($newUsers > 0 ? 'up' : 'flat');
        $newDelta = $newUsersPrev > 0
            ? (($newUsers >= $newUsersPrev ? '+' : '-').abs($newUsers - $newUsersPrev).' к прошл. окну')
            : ($newUsers > 0 ? 'новые' : 'нет');

        $completionPct = $sumAttempts > 0
            ? round(100.0 * $sumTrialFull / $sumAttempts, 1)
            : null;

        $hasAnalytics = Schema::connection('iqmo')->hasTable('analytics_events');
        $avgScoreCur = $hasAnalytics ? $this->computeAvgScore($sinceMs, null) : ['avg' => null, 'count' => 0];
        $avgScorePrev = $hasAnalytics ? $this->computeAvgScore($prevStartMs, $sinceMs) : ['avg' => null, 'count' => 0];

        $timeInTestCur = $hasAnalytics ? $this->computeTimeInTest($sinceMs, null) : ['median' => null, 'count' => 0];
        $timeInTestPrev = $hasAnalytics ? $this->computeTimeInTest($prevStartMs, $sinceMs) : ['median' => null, 'count' => 0];

        $sessionCur = $hasAnalytics ? $this->computeAvgSession($sinceMs, $nowMs) : ['median' => null, 'count' => 0];
        $sessionPrev = $hasAnalytics ? $this->computeAvgSession($prevStartMs, $sinceMs) : ['median' => null, 'count' => 0];

        $eventFunnel = $hasAnalytics ? $this->computeEventFunnel($sinceMs) : ['view' => 0, 'start' => 0, 'complete' => 0];

        // Диагностическая шторка: одна строка-сводка по сырому ингесту за окно.
        // Когда KPI «н/д», админ открывает дашборд и за секунду видит, где обрыв
        // (фронт не пишет события / нет авторизованных / прилетают только view).
        $eventsHealth = $hasAnalytics
            ? $this->computeEventsHealth($sinceMs, $nowMs)
            : ['total' => 0, 'distinctUsers' => 0, 'lastEventMs' => null,
                'byType' => ['view' => 0, 'start' => 0, 'complete' => 0]];

        $dauMau = $hasAnalytics ? $this->computeDauMau($nowMs) : ['dau' => 0, 'mau' => 0];
        $dauMauValue = '—';
        $dauMauDelta = 'нет событий';
        $dauMauHint = 'COUNT(DISTINCT user_id) из analytics_events: DAU=24ч, MAU=30 дней.';
        if ($dauMau['mau'] > 0) {
            $stickiness = round(100.0 * $dauMau['dau'] / $dauMau['mau'], 1);
            $dauMauValue = $this->fmtInt($dauMau['dau']).' / '.$this->fmtInt($dauMau['mau']);
            $dauMauDelta = 'sticky '.str_replace('.', ',', (string) $stickiness).'%';
            $dauMauHint .= ' Stickiness = DAU/MAU. У образовательных сервисов хороший ориентир — ≥ 20 %.';
        } elseif ($dauMau['dau'] > 0) {
            $dauMauValue = $this->fmtInt($dauMau['dau']).' / '.$this->fmtInt($dauMau['mau']);
        }

        $avgScoreVal = $avgScoreCur['avg'] !== null ? round((float) $avgScoreCur['avg'], 1) : null;
        $avgScorePrevVal = $avgScorePrev['avg'] !== null ? round((float) $avgScorePrev['avg'], 1) : null;

        $avgScoreTrend = 'flat';
        $avgScoreDelta = 'н/д';
        $avgScoreHint = 'AVG(payload_json.percent) по chem.attempt_complete с mode IN (trial, full) за окно';

        if ($avgScoreVal !== null && $avgScorePrevVal !== null) {
            $diff = $avgScoreVal - $avgScorePrevVal;
            if ($diff > 0.5) {
                $avgScoreTrend = 'up';
            } elseif ($diff < -0.5) {
                $avgScoreTrend = 'down';
            }
            $sign = $diff >= 0 ? '+' : '−';
            $avgScoreDelta = $sign.str_replace('.', ',', (string) round(abs($diff), 1)).' п.п. к прошл. окну';
        } elseif ($avgScoreVal !== null) {
            $avgScoreDelta = $this->fmtInt($avgScoreCur['count']).' попыток (trial/full)';
        } elseif (! $hasAnalytics) {
            $avgScoreHint = 'Таблица analytics_events отсутствует на этой БД';
        } else {
            $avgScoreDelta = 'нет завершённых попыток';
        }

        // Среднее время в тесте: медиана (complete - start) по совпавшим attemptId
        // — устойчивее к выбросам (одна-две зависших попытки не утянут метрику).
        $timeInTestVal = $timeInTestCur['median'];
        $timeInTestPrevVal = $timeInTestPrev['median'];
        $timeInTestKpi = [
            'value' => '—',
            'delta' => 'н/д',
            'trend' => 'flat',
            'hint' => 'Медиана интервала (chem.attempt_complete − chem.attempt_start) по совпавшим attemptId за окно',
        ];
        if ($timeInTestVal !== null) {
            $timeInTestKpi['value'] = $this->fmtDuration((int) $timeInTestVal);
            $timeInTestKpi['delta'] = $this->fmtInt($timeInTestCur['count']).' тестов';
            if ($timeInTestPrevVal !== null) {
                $diff = $timeInTestVal - $timeInTestPrevVal;
                if ($diff < -1000) {
                    $timeInTestKpi['trend'] = 'up'; // быстрее — лучше
                } elseif ($diff > 1000) {
                    $timeInTestKpi['trend'] = 'down';
                }
            }
        } elseif (! $hasAnalytics) {
            $timeInTestKpi['hint'] = 'Таблица analytics_events отсутствует на этой БД';
        } else {
            $timeInTestKpi['delta'] = 'нет связных пар start↔complete';
        }

        // Средняя сессия: события одного user_id с разрывами ≤ 30 мин.
        // Берём только сессии с ≥ 2 событиями — синглы дают «0 секунд» и сильно
        // занижают медиану.
        $sessionVal = $sessionCur['median'];
        $sessionPrevVal = $sessionPrev['median'];
        $sessionKpi = [
            'value' => '—',
            'delta' => 'н/д',
            'trend' => 'flat',
            'hint' => 'Медиана длительности сессии (события одного пользователя с разрывом ≤ 30 мин) за окно',
        ];
        if ($sessionVal !== null) {
            $sessionKpi['value'] = $this->fmtDuration((int) $sessionVal);
            $sessionKpi['delta'] = $this->fmtInt($sessionCur['count']).' сессий';
            if ($sessionPrevVal !== null) {
                $diff = $sessionVal - $sessionPrevVal;
                if ($diff > 5000) {
                    $sessionKpi['trend'] = 'up';
                } elseif ($diff < -5000) {
                    $sessionKpi['trend'] = 'down';
                }
            }
        } elseif (! $hasAnalytics) {
            $sessionKpi['hint'] = 'Таблица analytics_events отсутствует на этой БД';
        } else {
            $sessionKpi['delta'] = 'нет событий в окне';
        }

        $metrikaUsers = $this->yandexMetrika->uniqueUsersForLastCalendarDays($days);
        $metrikaDelta = $days === 1
            ? 'уникальные за сегодня'
            : 'уникальные за '.$days.' дн.';
        $metrikaHint = 'ym:s:users (API Метрики) за выбранный календарный период в таймзоне '
            .config('app.timezone', 'UTC')
            .'. Задайте YANDEX_METRIKA_OAUTH_TOKEN (metrika:read) и при необходимости YANDEX_METRIKA_COUNTER_ID.';
        if ($metrikaUsers === null) {
            $metrikaDelta = 'н/д';
            $metrikaHint .= ' Сейчас цифра не получена: нет токена/счётчика или ответ API неуспешен (см. лог).';
        }

        $kpis = [
            [
                'id' => 'dau',
                'label' => $dauLabel,
                'value' => $this->fmtInt($activeSync),
                'delta' => $periodHint,
                'trend' => 'flat',
                'hint' => 'Строки profile_state с updated_at в выбранном окне (прокси активности)',
            ],
            [
                'id' => 'mau_dau',
                'label' => 'DAU / MAU',
                'value' => $dauMauValue,
                'delta' => $dauMauDelta,
                'trend' => 'flat',
                'hint' => $dauMauHint,
            ],
            [
                'id' => 'metrika_users',
                'label' => 'Посетители · Я.Метрика',
                'value' => $metrikaUsers !== null ? $this->fmtInt($metrikaUsers) : '—',
                'delta' => $metrikaDelta,
                'trend' => 'flat',
                'hint' => $metrikaHint,
            ],
            [
                'id' => 'new_users',
                'label' => 'Новые регистрации',
                'value' => $this->fmtInt($newUsers),
                'delta' => $newDelta,
                'trend' => $newTrend,
                'hint' => 'users.created_at в окне ('.$periodHint.')',
            ],
            [
                'id' => 'online',
                'label' => 'Онлайн сейчас',
                'value' => '—',
                'delta' => 'н/д',
                'trend' => 'flat',
                'hint' => 'Нет счётчика активных сессий (Redis/WebSocket)',
            ],
            [
                'id' => 'started',
                'label' => 'Попыток (всего режимов)',
                'value' => $this->fmtInt($sumAttempts),
                'delta' => 'сумма по профилям',
                'trend' => 'flat',
                'hint' => 'Сумма warmup+quick+trial+full+other из iqmo-chem-attempt-stats-v1 у синхронизировавшихся за период',
            ],
            [
                'id' => 'completed',
                'label' => 'Пробник + полный',
                'value' => $this->fmtInt($sumTrialFull),
                'delta' => 'trial+full',
                'trend' => 'flat',
                'hint' => 'По тем же ключам attempt-stats',
            ],
            [
                'id' => 'completion',
                'label' => 'Доля trial/full',
                'value' => $completionPct !== null ? str_replace('.', ',', (string) $completionPct).'%' : '—',
                'delta' => 'от суммы попыток',
                'trend' => 'flat',
                'hint' => '(trial+full) / все режимы по синхронизированным профилям',
            ],
            [
                'id' => 'avg_score',
                'label' => 'Средний результат',
                'value' => $avgScoreVal !== null ? str_replace('.', ',', (string) $avgScoreVal).'%' : '—',
                'delta' => $avgScoreDelta,
                'trend' => $avgScoreTrend,
                'hint' => $avgScoreHint,
            ],
            [
                'id' => 'session',
                'label' => 'Средняя сессия',
                'value' => $sessionKpi['value'],
                'delta' => $sessionKpi['delta'],
                'trend' => $sessionKpi['trend'],
                'hint' => $sessionKpi['hint'],
            ],
            [
                'id' => 'time_in_test',
                'label' => 'Время в тесте',
                'value' => $timeInTestKpi['value'],
                'delta' => $timeInTestKpi['delta'],
                'trend' => $timeInTestKpi['trend'],
                'hint' => $timeInTestKpi['hint'],
            ],
            [
                'id' => 'funnel_drop',
                'label' => 'Всего аккаунтов',
                'value' => $this->fmtInt($totalUsers),
                'delta' => 'в БД',
                'trend' => 'flat',
                'hint' => 'Таблица users',
            ],
            [
                'id' => 'review_flag',
                'label' => 'Вопросов на проверку',
                'value' => '—',
                'delta' => 'н/д',
                'trend' => 'flat',
                'hint' => 'Нужна статистика по qid на сервере',
            ],
            [
                'id' => 'mistakes_users',
                'label' => 'С банком ошибок',
                'value' => $this->fmtInt($mistakeUsers),
                'delta' => $periodHint,
                'trend' => 'flat',
                'hint' => 'Профили с непустым iqmo-chem-mistakes-v1 среди синхронизировавшихся',
            ],
        ];

        $hasFunnelEvents = $eventFunnel['view'] + $eventFunnel['start'] + $eventFunnel['complete'] > 0;
        $funnel = $hasFunnelEvents
            ? IqmoAdminOverviewMath::buildEventFunnel($totalUsers, $eventFunnel, $mistakeUsers, $days)
            : IqmoAdminOverviewMath::buildLegacyFunnel($totalUsers, $profilesTotal, $activeSync, $withAttempts, $mistakeUsers, $days);

        $subjectsSnapshot = [
            [
                'key' => 'chemistry',
                'name' => 'Химия ОГЭ',
                'users' => max(0, $activeSync),
                'avgPct' => '—',
                'activityShare' => 100,
            ],
        ];

        $learning = $this->stubLearning($days);

        $topQuestions = $hasAnalytics ? $this->rollupTopQuestions($sinceMs, $days) : [];

        $flagged = 0;
        foreach ($topQuestions as $q) {
            if (! empty($q['flag'])) {
                $flagged++;
            }
        }
        foreach ($kpis as $idx => $k) {
            if (($k['id'] ?? '') === 'review_flag') {
                $kpis[$idx]['value'] = $topQuestions === [] ? '—' : $this->fmtInt($flagged);
                $kpis[$idx]['delta'] = $topQuestions === [] ? 'нет событий' : 'по ответам';
                $kpis[$idx]['hint'] =
                    'Высокий % ошибок при достаточном числе показов (события chem.attempt_complete за период)';
                break;
            }
        }

        return [
            'meta' => [
                'source' => 'db',
                'generatedAt' => $nowMs,
                'days' => $days,
            ],
            'kpis' => $kpis,
            'funnel' => $funnel,
            'subjectsSnapshot' => $subjectsSnapshot,
            'topQuestions' => $topQuestions,
            'learning' => $learning,
            'eventsHealth' => $eventsHealth,
        ];
    }

    /**
     * DAU = уникальные user_id с любым событием за последние 24 ч.
     * MAU = уникальные user_id с любым событием за последние 30 дней.
     *
     * Считаем «на лету», без отдельной таблицы daily_user_stats, потому что
     * при текущем объёме (≤ десятки тысяч строк/день) это ~100 ms по индексам.
     * Когда таблица перевалит за миллион строк — стоит переключиться на
     * ежедневный snapshot через `php artisan schedule:run` (см. DEPLOY.md).
     *
     * @return array{dau: int, mau: int}
     */
    private function computeDauMau(int $nowMs): array
    {
        try {
            $oneDayAgo = $nowMs - 86_400_000;
            $thirtyDaysAgo = $nowMs - 30 * 86_400_000;

            $iqmo = DB::connection('iqmo');

            $dau = (int) ($iqmo->table('analytics_events')
                ->where('occurred_at', '>=', $oneDayAgo)
                ->distinct()
                ->count('user_id'));

            $mau = (int) ($iqmo->table('analytics_events')
                ->where('occurred_at', '>=', $thirtyDaysAgo)
                ->distinct()
                ->count('user_id'));

            return ['dau' => $dau, 'mau' => $mau];
        } catch (\Throwable $e) {
            return ['dau' => 0, 'mau' => 0];
        }
    }

    /**
     * Среднее значение payload_json.percent по событиям chem.attempt_complete
     * за окно [$sinceMs, $untilMs) — только для режимов trial/full.
     *
     * @return array{avg: float|null, count: int}
     */
    private function computeAvgScore(int $sinceMs, ?int $untilMs): array
    {
        try {
            $q = DB::connection('iqmo')->table('analytics_events')
                ->where('event', 'chem.attempt_complete')
                ->where('occurred_at', '>=', $sinceMs)
                ->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.mode')) IN ('trial','full')");

            if ($untilMs !== null) {
                $q->where('occurred_at', '<', $untilMs);
            }

            $row = $q
                ->selectRaw(
                    'AVG(CAST(JSON_EXTRACT(payload_json, "$.percent") AS DECIMAL(10,2))) AS avg_pct, COUNT(*) AS cnt'
                )
                ->first();

            if ($row === null) {
                return ['avg' => null, 'count' => 0];
            }

            $avg = $row->avg_pct ?? null;
            $cnt = (int) ($row->cnt ?? 0);

            return [
                'avg' => $avg !== null ? (float) $avg : null,
                'count' => $cnt,
            ];
        } catch (\Throwable $e) {
            return ['avg' => null, 'count' => 0];
        }
    }

    /**
     * @return list<array{qid: string, topic: string, wrongPct: int, shows: int, avgSec: string, flag: bool}>
     */
    private function rollupTopQuestions(int $sinceMs, int $days): array
    {
        $minShows = IqmoAdminOverviewMath::topQuestionsMinShows($days);

        $rows = DB::connection('iqmo')->table('analytics_events')
            ->where('event', 'chem.attempt_complete')
            ->where('occurred_at', '>=', $sinceMs)
            ->orderByDesc('id')
            ->limit(12_000)
            ->get(['payload_json']);

        return IqmoAdminOverviewMath::aggregateTopQuestions($rows, $minShows);
    }

    /**
     * Сырая «шторка здоровья» аналитики за окно: сколько вообще пришло строк,
     * сколько уникальных авторизованных юзеров, когда последний ивент, и
     * разбивка по трём ключевым типам. Это диагностика, а не KPI: цель —
     * за один взгляд понять, кончились ли в кабинете цифры из-за того, что:
     *   - фронт ничего не пишет (total = 0),
     *   - никто не залогинен (distinctUsers = 0, total = 0),
     *   - юзеры открывают темы, но не запускают тесты (start = 0),
     *   - запускают, но не завершают (complete = 0 → «Время в тесте» пусто).
     *
     * Один SQL-запрос, агрегаты считаются на стороне БД, никакой выгрузки строк.
     *
     * @return array{total:int, distinctUsers:int, lastEventMs:?int, byType: array{view:int, start:int, complete:int}}
     */
    private function computeEventsHealth(int $sinceMs, int $untilMs): array
    {
        try {
            $row = DB::connection('iqmo')->table('analytics_events')
                ->where('occurred_at', '>=', $sinceMs)
                ->where('occurred_at', '<', $untilMs)
                ->selectRaw(
                    'COUNT(*) AS total_cnt,'
                    .'COUNT(DISTINCT user_id) AS distinct_users,'
                    .'MAX(occurred_at) AS last_ms,'
                    ."SUM(CASE WHEN event = 'chem.topic_view' THEN 1 ELSE 0 END) AS cnt_view,"
                    ."SUM(CASE WHEN event = 'chem.attempt_start' THEN 1 ELSE 0 END) AS cnt_start,"
                    ."SUM(CASE WHEN event = 'chem.attempt_complete' THEN 1 ELSE 0 END) AS cnt_complete"
                )
                ->first();

            $lastMs = isset($row->last_ms) ? (int) $row->last_ms : 0;

            return [
                'total' => (int) ($row->total_cnt ?? 0),
                'distinctUsers' => (int) ($row->distinct_users ?? 0),
                'lastEventMs' => $lastMs > 0 ? $lastMs : null,
                'byType' => [
                    'view' => (int) ($row->cnt_view ?? 0),
                    'start' => (int) ($row->cnt_start ?? 0),
                    'complete' => (int) ($row->cnt_complete ?? 0),
                ],
            ];
        } catch (\Throwable $e) {
            return [
                'total' => 0,
                'distinctUsers' => 0,
                'lastEventMs' => null,
                'byType' => ['view' => 0, 'start' => 0, 'complete' => 0],
            ];
        }
    }

    /**
     * Уникальные user_id по типу события за окно [$sinceMs, ∞).
     *
     * @return array{view: int, start: int, complete: int}
     */
    private function computeEventFunnel(int $sinceMs): array
    {
        try {
            $row = DB::connection('iqmo')->table('analytics_events')
                ->where('occurred_at', '>=', $sinceMs)
                ->selectRaw(
                    "COUNT(DISTINCT CASE WHEN event = 'chem.topic_view' THEN user_id END) AS u_view,"
                    ."COUNT(DISTINCT CASE WHEN event = 'chem.attempt_start' THEN user_id END) AS u_start,"
                    ."COUNT(DISTINCT CASE WHEN event = 'chem.attempt_complete' THEN user_id END) AS u_complete"
                )
                ->first();

            return [
                'view' => (int) ($row->u_view ?? 0),
                'start' => (int) ($row->u_start ?? 0),
                'complete' => (int) ($row->u_complete ?? 0),
            ];
        } catch (\Throwable $e) {
            return ['view' => 0, 'start' => 0, 'complete' => 0];
        }
    }

    /**
     * Медианное время прохождения теста: разница (complete.occurred_at − start.occurred_at)
     * по событиям с одинаковым attemptId и одного пользователя.
     *
     * Капы:
     *  - окно: [$sinceMs, $untilMs);
     *  - sane-cap длительности: 4 часа (исключаем зависшие/брошенные тесты).
     *
     * @return array{median: float|null, count: int}
     */
    private function computeTimeInTest(int $sinceMs, ?int $untilMs): array
    {
        try {
            $params = [$sinceMs];
            $sql = "SELECT (c.occurred_at - s.occurred_at) AS dur_ms
                    FROM analytics_events s
                    INNER JOIN analytics_events c
                      ON c.user_id = s.user_id
                     AND c.event = 'chem.attempt_complete'
                     AND JSON_UNQUOTE(JSON_EXTRACT(c.payload_json, '$.attemptId')) =
                         JSON_UNQUOTE(JSON_EXTRACT(s.payload_json, '$.attemptId'))
                     AND c.occurred_at > s.occurred_at
                     AND c.occurred_at <= s.occurred_at + 14400000
                    WHERE s.event = 'chem.attempt_start'
                      AND s.occurred_at >= ?";
            if ($untilMs !== null) {
                $sql .= ' AND s.occurred_at < ?';
                $params[] = $untilMs;
            }
            $sql .= " AND JSON_UNQUOTE(JSON_EXTRACT(s.payload_json, '$.attemptId')) <> ''
                      ORDER BY s.id DESC LIMIT 5000";

            $rows = DB::connection('iqmo')->select($sql, $params);
            $durations = [];
            foreach ($rows as $r) {
                $d = (int) ($r->dur_ms ?? 0);
                if ($d > 0 && $d <= IqmoAdminOverviewMath::TIME_IN_TEST_MAX_MS) {
                    $durations[] = $d;
                }
            }
            $median = IqmoAdminOverviewMath::median($durations);

            return [
                'median' => $median,
                'count' => count($durations),
            ];
        } catch (\Throwable $e) {
            return ['median' => null, 'count' => 0];
        }
    }

    /**
     * Сессии: события одного user_id, упорядоченные по времени, с разрывом ≤ 30 мин.
     * Возвращаем медиану длительностей сессий с ≥ 2 событиями (одиночные ивенты
     * дают 0 c и сильно занижают медиану — нам нужен индикатор «реального»
     * учебного промежутка).
     *
     * @return array{median: float|null, count: int}
     */
    private function computeAvgSession(int $sinceMs, int $untilMs): array
    {
        try {
            $rows = DB::connection('iqmo')->table('analytics_events')
                ->where('occurred_at', '>=', $sinceMs)
                ->where('occurred_at', '<', $untilMs)
                ->orderBy('user_id')
                ->orderBy('occurred_at')
                ->limit(50_000)
                ->get(['user_id', 'occurred_at']);

            $durations = IqmoAdminOverviewMath::groupSessionDurations($rows);
            $median = IqmoAdminOverviewMath::median($durations);

            return [
                'median' => $median,
                'count' => count($durations),
            ];
        } catch (\Throwable $e) {
            return ['median' => null, 'count' => 0];
        }
    }

    /** @return array<string, mixed> */
    private function stubLearning(int $days): array
    {
        $periodLabel = $days === 1 ? 'сегодня' : ($days === 7 ? '7 дней' : ($days === 14 ? '14 дней' : '30 дней'));

        $stubHint = 'Расширенные когорты и медианы по темам — следующий этап; топ вопросов уже считается из событий chem.attempt_complete.';

        return [
            'days' => $days,
            'periodLabel' => $periodLabel,
            'kpis' => [
                [
                    'id' => 'repeat_lift',
                    'label' => 'Прирост после повторов',
                    'value' => '—',
                    'delta' => 'н/д',
                    'trend' => 'flat',
                    'hint' => $stubHint,
                ],
                [
                    'id' => 'quality_hold',
                    'label' => 'Удержание качества',
                    'value' => '—',
                    'delta' => 'н/д',
                    'trend' => 'flat',
                    'hint' => $stubHint,
                ],
                [
                    'id' => 'users_growing',
                    'label' => 'Учеников с ростом',
                    'value' => '—',
                    'delta' => 'н/д',
                    'trend' => 'flat',
                    'hint' => $stubHint,
                ],
                [
                    'id' => 'stuck_topics',
                    'label' => '«Застрявших» тем',
                    'value' => '—',
                    'delta' => 'н/д',
                    'trend' => 'flat',
                    'hint' => $stubHint,
                ],
            ],
            'fastestTopics' => [],
            'stagnantTopics' => [],
            'mistakeFix' => [
                'medianAttempts' => null,
                'p75Attempts' => null,
                'unresolvedPct' => null,
                'hint' => 'Медиана попыток до исправления на сервере пока не считается.',
            ],
        ];
    }

    /**
     * Тонкие делегаты — чтобы call-site'ы выше не торчали `IqmoAdminOverviewMath::...`
     * на каждой строке. Реальная логика и unit-тесты — в `IqmoAdminOverviewMath`.
     */
    private function fmtInt(int $n): string
    {
        return IqmoAdminOverviewMath::formatInt($n);
    }

    private function fmtDuration(int $ms): string
    {
        return IqmoAdminOverviewMath::formatDuration($ms);
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeKeys(mixed $raw): array
    {
        return IqmoAdminOverviewMath::decodeKeys($raw);
    }
}
