<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Раздел «Пользователи» в админке IQMO: KPI, тренд регистраций и пагинированный
 * список аккаунтов с фильтрами / поиском / сортировкой.
 *
 * Источники:
 *   - users           — id / email / created_at
 *   - profile_state   — updated_at (≈ последняя синхронизация), keys_json
 *                       (внутри iqmo-chem-attempt-stats-v1 — счётчики попыток)
 *   - analytics_events— события chem.attempt_complete (для среднего %, времени
 *                       последнего события, фильтров «активные / спящие»)
 *   - IQMO_ADMIN_EMAILS (env) — бейдж «админ»
 *
 * Производительность:
 *   - страничные запросы по users всегда лимитированы;
 *   - агрегаты (last_event_at, count(events)) вычисляются ровно для тех id,
 *     которые попали в текущую страницу — один SELECT с GROUP BY;
 *   - decode JSON делается только для тех же id, и только если фактически
 *     есть строка в profile_state — это укладывается в десятки мс на
 *     ~10⁴ юзеров. Если когда-то перевалим за 10⁶, надо переходить на
 *     материализованный snapshot user_profile_summary.
 */
final class IqmoAdminUsersBuilder
{
    private const ALLOWED_DAYS = [1, 7, 14, 30];
    private const ALLOWED_PER_PAGE = [25, 50, 100];
    private const ALLOWED_SORTS = ['created_at', 'last_sync', 'last_event', 'attempts', 'email'];
    private const ALLOWED_FILTERS = ['all', 'new24', 'active7', 'sleeping14', 'no_attempts', 'admins'];
    private const ATTEMPT_KEY = 'iqmo-chem-attempt-stats-v1';
    private const MISTAKE_KEY = 'iqmo-chem-mistakes-v1';

    /**
     * @param  array<string, mixed>  $opts
     * @return array<string, mixed>
     */
    public function list(array $opts): array
    {
        $days = $this->resolveDays($opts['days'] ?? 7);
        $page = max(1, (int) ($opts['page'] ?? 1));
        $perPage = $this->resolvePerPage($opts['perPage'] ?? 50);
        $sort = $this->resolveSort($opts['sort'] ?? 'created_at');
        $dir = strtolower((string) ($opts['dir'] ?? 'desc')) === 'asc' ? 'asc' : 'desc';
        $filter = $this->resolveFilter($opts['filter'] ?? 'all');
        $q = trim((string) ($opts['q'] ?? ''));

        $nowMs = (int) floor(microtime(true) * 1000);
        $sinceMs = $nowMs - $days * 86_400_000;
        $oneDayAgo = $nowMs - 86_400_000;
        $sevenDaysAgo = $nowMs - 7 * 86_400_000;
        $fourteenDaysAgo = $nowMs - 14 * 86_400_000;

        $iqmo = DB::connection('iqmo');
        $hasAnalytics = Schema::connection('iqmo')->hasTable('analytics_events');
        $adminEmails = $this->normalizedAdminEmails();

        // ─── KPI: глобальные показатели по таблице users (на весь период) ───
        $totalUsers = (int) $iqmo->table('users')->count();
        $newInWindow = (int) $iqmo->table('users')->where('created_at', '>=', $sinceMs)->count();
        $new24h = (int) $iqmo->table('users')->where('created_at', '>=', $oneDayAgo)->count();
        $adminsCount = $adminEmails === []
            ? 0
            : (int) $iqmo->table('users')->whereIn(DB::raw('LOWER(email)'), $adminEmails)->count();

        $active7d = 0;
        $sleeping14d = 0;
        $withAtLeastOneAttempt = 0;
        if ($hasAnalytics) {
            $active7d = (int) $iqmo->table('analytics_events')
                ->where('occurred_at', '>=', $sevenDaysAgo)
                ->distinct()->count('user_id');

            $activeIn14d = (int) $iqmo->table('analytics_events')
                ->where('occurred_at', '>=', $fourteenDaysAgo)
                ->distinct()->count('user_id');
            $sleeping14d = max(0, $totalUsers - $activeIn14d);

            $withAtLeastOneAttempt = (int) $iqmo->table('analytics_events')
                ->whereIn('event', ['chem.attempt_complete', 'bio.attempt_complete'])
                ->distinct()->count('user_id');
        }

        // ─── Тренд регистраций по дням (всегда последние 30 дней — это график) ───
        $thirtyDaysAgo = $nowMs - 30 * 86_400_000;
        $regRows = $iqmo->table('users')
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->selectRaw("DATE(FROM_UNIXTIME(created_at/1000)) AS d, COUNT(*) AS c")
            ->groupBy('d')
            ->orderBy('d')
            ->get();
        $regByDay = [];
        foreach ($regRows as $r) {
            $regByDay[(string) $r->d] = (int) $r->c;
        }
        $dailyRegistrations = [];
        for ($i = 29; $i >= 0; $i--) {
            $day = date('Y-m-d', (int) (($nowMs / 1000) - $i * 86_400));
            $dailyRegistrations[] = [
                'date' => $day,
                'count' => $regByDay[$day] ?? 0,
            ];
        }

        // ─── Базовый запрос со списком + фильтры/поиск ───
        $base = $iqmo->table('users');

        if ($q !== '') {
            // Лёгкая защита от слишком коротких подстрок (даёт фуллскан почти всегда)
            // и от попыток вкатить % / _ как самостоятельный wildcard.
            $needle = str_replace(['%', '_'], ['\\%', '\\_'], $q);
            if (ctype_digit($q)) {
                $base->where(function ($w) use ($q, $needle): void {
                    $w->where('id', '=', (int) $q)
                        ->orWhere('email', 'like', '%'.$needle.'%');
                });
            } else {
                $base->where('email', 'like', '%'.$needle.'%');
            }
        }

        switch ($filter) {
            case 'new24':
                $base->where('created_at', '>=', $oneDayAgo);
                break;
            case 'active7':
                if ($hasAnalytics) {
                    $base->whereIn('id', function ($sq) use ($sevenDaysAgo): void {
                        $sq->select('user_id')->from('analytics_events')
                            ->where('occurred_at', '>=', $sevenDaysAgo)
                            ->distinct();
                    });
                }
                break;
            case 'sleeping14':
                if ($hasAnalytics) {
                    $base->whereNotIn('id', function ($sq) use ($fourteenDaysAgo): void {
                        $sq->select('user_id')->from('analytics_events')
                            ->where('occurred_at', '>=', $fourteenDaysAgo)
                            ->distinct();
                    });
                }
                break;
            case 'no_attempts':
                if ($hasAnalytics) {
                    $base->whereNotIn('id', function ($sq): void {
                        $sq->select('user_id')->from('analytics_events')
                            ->whereIn('event', ['chem.attempt_complete', 'bio.attempt_complete'])
                            ->distinct();
                    });
                }
                break;
            case 'admins':
                if ($adminEmails === []) {
                    $base->whereRaw('1 = 0');
                } else {
                    $base->whereIn(DB::raw('LOWER(email)'), $adminEmails);
                }
                break;
        }

        $total = (int) (clone $base)->count();
        $totalPages = max(1, (int) ceil($total / $perPage));
        $page = min($page, $totalPages);

        // Сортировка по DB-колонкам — прямо в SQL (с пагинацией). Сортировки по
        // производным полям (last_sync, last_event, attempts) делаем в PHP по
        // ограниченной выборке, см. ниже.
        $sortableInSql = ['created_at', 'email'];
        $rows = collect();
        if (in_array($sort, $sortableInSql, true)) {
            $rows = (clone $base)
                ->select(['id', 'email', 'created_at'])
                ->orderBy($sort, $dir)
                ->orderBy('id', $dir)
                ->limit($perPage)
                ->offset(($page - 1) * $perPage)
                ->get();
        } else {
            // Сортировка по производному полю: подтягиваем компактный набор
            // (id + сорт-ключ) для всей выборки, сортируем в PHP, режем страницу,
            // а только потом догружаем email/created_at и хидрейтим агрегатами.
            $cap = max(5_000, $perPage * 10);
            $allIds = (clone $base)->select('id')->orderBy('id', 'desc')->limit($cap)->pluck('id')->all();
            if ($allIds === []) {
                $rows = collect();
            } else {
                $sortMap = $this->buildSortMap($iqmo, $allIds, $sort, $hasAnalytics);
                usort($allIds, function (int $a, int $b) use ($sortMap, $dir): int {
                    $av = $sortMap[$a] ?? null;
                    $bv = $sortMap[$b] ?? null;
                    // NULL всегда «снизу» (не зависит от направления — так удобнее
                    // листать живых, не натыкаясь на 200 пустышек подряд).
                    if ($av === null && $bv === null) {
                        return 0;
                    }
                    if ($av === null) {
                        return 1;
                    }
                    if ($bv === null) {
                        return -1;
                    }
                    return $dir === 'asc' ? ($av <=> $bv) : ($bv <=> $av);
                });
                $pageIds = array_slice($allIds, ($page - 1) * $perPage, $perPage);
                if ($pageIds !== []) {
                    $rows = $iqmo->table('users')
                        ->whereIn('id', $pageIds)
                        ->select(['id', 'email', 'created_at'])
                        ->get()
                        ->keyBy('id');
                    // Сохраняем порядок $pageIds (collection->keyBy не гарантирует его).
                    $rows = collect(array_values(array_filter(array_map(fn ($id) => $rows->get($id), $pageIds))));
                }
            }
        }

        $pageIds = $rows->pluck('id')->map(fn ($x) => (int) $x)->all();

        // Агрегаты по событиям только для текущей страницы.
        $eventAgg = [];
        if ($hasAnalytics && $pageIds !== []) {
            $eventRows = $iqmo->table('analytics_events')
                ->whereIn('user_id', $pageIds)
                ->selectRaw('user_id,
                    MAX(occurred_at) AS last_event,
                    COUNT(*) AS events_total,
                    SUM(CASE WHEN event IN ("chem.attempt_complete","bio.attempt_complete") THEN 1 ELSE 0 END) AS attempts_evt,
                    AVG(CASE
                        WHEN event IN ("chem.attempt_complete","bio.attempt_complete")
                         AND JSON_UNQUOTE(JSON_EXTRACT(payload_json, "$.mode")) IN ("trial","full")
                        THEN CAST(JSON_EXTRACT(payload_json, "$.percent") AS DECIMAL(10,2))
                        ELSE NULL
                    END) AS avg_pct')
                ->groupBy('user_id')
                ->get();
            foreach ($eventRows as $r) {
                $eventAgg[(int) $r->user_id] = [
                    'last_event' => (int) ($r->last_event ?? 0),
                    'events_total' => (int) ($r->events_total ?? 0),
                    'attempts_evt' => (int) ($r->attempts_evt ?? 0),
                    'avg_pct' => $r->avg_pct === null ? null : (float) $r->avg_pct,
                ];
            }
        }

        // profile_state для last_sync, размера профиля и счётчиков попыток.
        $profileAgg = [];
        if ($pageIds !== []) {
            $profileRows = $iqmo->table('profile_state')
                ->whereIn('user_id', $pageIds)
                ->select(['user_id', 'updated_at', 'revision', 'keys_json'])
                ->get();
            foreach ($profileRows as $r) {
                $keys = $this->decodeKeys($r->keys_json ?? null);
                $profileAgg[(int) $r->user_id] = [
                    'updated_at' => (int) ($r->updated_at ?? 0),
                    'revision' => (int) ($r->revision ?? 0),
                    'attempts_profile' => $this->extractAttemptsTotal($keys),
                    'has_mistakes' => $this->hasMistakes($keys),
                    'profile_size' => is_string($r->keys_json) ? strlen($r->keys_json) : 0,
                ];
            }
        }

        $items = [];
        foreach ($rows as $row) {
            $uid = (int) $row->id;
            $email = (string) $row->email;
            $createdAt = (int) $row->created_at;

            $ev = $eventAgg[$uid] ?? null;
            $pr = $profileAgg[$uid] ?? null;

            $lastEvent = $ev['last_event'] ?? 0;
            $lastSync = $pr['updated_at'] ?? 0;
            $lastActivity = max($lastEvent, $lastSync);

            // Попытки: предпочитаем profile-снимок (там кумулятивный счётчик
            // вообще всех режимов, не только trial/full), но если профиля нет
            // или он пустой — падаем на счётчик событий.
            $attempts = $pr['attempts_profile'] ?? null;
            if ($attempts === null) {
                $attempts = $ev['attempts_evt'] ?? 0;
            }

            $isAdmin = $adminEmails !== [] && in_array(strtolower($email), $adminEmails, true);
            $hasProfile = $pr !== null;

            $status = $this->classifyStatus(
                createdAt: $createdAt,
                lastActivityMs: $lastActivity,
                isAdmin: $isAdmin,
                nowMs: $nowMs,
                oneDayAgo: $oneDayAgo,
                sevenDaysAgo: $sevenDaysAgo,
                fourteenDaysAgo: $fourteenDaysAgo,
            );

            // PHP 8: `$ev['avg_pct'] !== null` напрямую (без `??`) обращается к
            // несуществующему ключу на null-массиве и роняет весь эндпоинт
            // через ErrorException("Trying to access array offset on null").
            // Делаем доступ через `??`, который оператором языка обходит это поведение.
            $avgPctRaw = $ev['avg_pct'] ?? null;

            $items[] = [
                'id' => $uid,
                'email' => $email,
                'createdAt' => $createdAt,
                'lastActivity' => $lastActivity > 0 ? $lastActivity : null,
                'lastSync' => $lastSync > 0 ? $lastSync : null,
                'lastEvent' => $lastEvent > 0 ? $lastEvent : null,
                'attempts' => $attempts,
                'avgPct' => $avgPctRaw !== null ? round((float) $avgPctRaw, 1) : null,
                'eventsTotal' => $ev['events_total'] ?? 0,
                'hasProfile' => $hasProfile,
                'profileSize' => $pr['profile_size'] ?? 0,
                'profileRevision' => $pr['revision'] ?? 0,
                'hasMistakes' => $pr['has_mistakes'] ?? false,
                'isAdmin' => $isAdmin,
                'status' => $status,
            ];
        }

        return [
            'meta' => [
                'source' => 'db',
                'generatedAt' => $nowMs,
                'days' => $days,
                'hasAnalytics' => $hasAnalytics,
                'sort' => $sort,
                'dir' => $dir,
                'filter' => $filter,
                'q' => $q,
            ],
            'kpis' => $this->buildKpis(
                totalUsers: $totalUsers,
                newInWindow: $newInWindow,
                new24h: $new24h,
                active7d: $active7d,
                sleeping14d: $sleeping14d,
                withAtLeastOneAttempt: $withAtLeastOneAttempt,
                adminsCount: $adminsCount,
                hasAnalytics: $hasAnalytics,
                days: $days,
            ),
            'dailyRegistrations' => $dailyRegistrations,
            'pagination' => [
                'page' => $page,
                'perPage' => $perPage,
                'total' => $total,
                'totalPages' => $totalPages,
            ],
            'items' => $items,
        ];
    }

    /**
     * Карточка пользователя: метрики за всё время, последние события, метаданные профиля.
     *
     * @return array<string, mixed>|null
     */
    public function detail(int $userId): ?array
    {
        $iqmo = DB::connection('iqmo');
        $hasAnalytics = Schema::connection('iqmo')->hasTable('analytics_events');

        $user = $iqmo->table('users')->where('id', $userId)->select(['id', 'email', 'created_at'])->first();
        if (! $user) {
            return null;
        }

        $adminEmails = $this->normalizedAdminEmails();
        $email = (string) $user->email;
        $isAdmin = $adminEmails !== [] && in_array(strtolower($email), $adminEmails, true);
        $createdAt = (int) $user->created_at;

        $profile = $iqmo->table('profile_state')->where('user_id', $userId)
            ->select(['updated_at', 'revision', 'keys_json'])
            ->first();

        $profileMeta = null;
        $attemptsBreakdown = null;
        $hasMistakes = false;
        if ($profile) {
            $keys = $this->decodeKeys($profile->keys_json ?? null);
            $rawSize = is_string($profile->keys_json) ? strlen($profile->keys_json) : 0;
            $profileMeta = [
                'updatedAt' => (int) ($profile->updated_at ?? 0),
                'revision' => (int) ($profile->revision ?? 0),
                'sizeBytes' => $rawSize,
                'keysCount' => count($keys),
            ];
            $attemptsBreakdown = $this->extractAttemptsBreakdown($keys);
            $hasMistakes = $this->hasMistakes($keys);
        }

        $eventsTotal = 0;
        $attemptsTotal = 0;
        $avgPct = null;
        $lastEventMs = null;
        $timeline = [];
        $eventCounts = [];
        $byEventDaily = [];

        if ($hasAnalytics) {
            $aggRow = $iqmo->table('analytics_events')->where('user_id', $userId)
                ->selectRaw('
                    COUNT(*) AS events_total,
                    MAX(occurred_at) AS last_event,
                    SUM(CASE WHEN event IN ("chem.attempt_complete","bio.attempt_complete") THEN 1 ELSE 0 END) AS attempts,
                    AVG(CASE
                        WHEN event IN ("chem.attempt_complete","bio.attempt_complete")
                         AND JSON_UNQUOTE(JSON_EXTRACT(payload_json, "$.mode")) IN ("trial","full")
                        THEN CAST(JSON_EXTRACT(payload_json, "$.percent") AS DECIMAL(10,2))
                        ELSE NULL
                    END) AS avg_pct
                ')
                ->first();
            if ($aggRow) {
                $eventsTotal = (int) $aggRow->events_total;
                $lastEventMs = $aggRow->last_event ? (int) $aggRow->last_event : null;
                $attemptsTotal = (int) $aggRow->attempts;
                $avgPct = $aggRow->avg_pct === null ? null : round((float) $aggRow->avg_pct, 1);
            }

            // Срез по типам событий — для маленькой панели справа.
            $countRows = $iqmo->table('analytics_events')->where('user_id', $userId)
                ->selectRaw('event, COUNT(*) AS c')
                ->groupBy('event')
                ->orderByDesc('c')
                ->limit(20)
                ->get();
            foreach ($countRows as $r) {
                $eventCounts[(string) $r->event] = (int) $r->c;
            }

            // Лента последних 50 событий: timeline для drawer'а.
            $tlRows = $iqmo->table('analytics_events')->where('user_id', $userId)
                ->orderByDesc('id')
                ->limit(50)
                ->get(['id', 'event', 'occurred_at', 'payload_json']);
            foreach ($tlRows as $r) {
                $timeline[] = [
                    'id' => (int) $r->id,
                    'event' => (string) $r->event,
                    'occurredAt' => (int) $r->occurred_at,
                    'payload' => $this->summarizePayload((string) $r->event, $r->payload_json),
                ];
            }

            // Активность по дням за 30 дней (для маленького SVG-чарта в карточке).
            $nowMs = (int) floor(microtime(true) * 1000);
            $thirtyDaysAgo = $nowMs - 30 * 86_400_000;
            $dailyRows = $iqmo->table('analytics_events')->where('user_id', $userId)
                ->where('occurred_at', '>=', $thirtyDaysAgo)
                ->selectRaw("DATE(FROM_UNIXTIME(occurred_at/1000)) AS d, COUNT(*) AS c")
                ->groupBy('d')
                ->orderBy('d')
                ->get();
            $byDay = [];
            foreach ($dailyRows as $r) {
                $byDay[(string) $r->d] = (int) $r->c;
            }
            for ($i = 29; $i >= 0; $i--) {
                $day = date('Y-m-d', (int) (($nowMs / 1000) - $i * 86_400));
                $byEventDaily[] = ['date' => $day, 'count' => $byDay[$day] ?? 0];
            }
        }

        $historyCount = (int) $iqmo->table('profile_history')->where('user_id', $userId)->count();

        return [
            'meta' => [
                'source' => 'db',
                'generatedAt' => (int) floor(microtime(true) * 1000),
                'hasAnalytics' => $hasAnalytics,
            ],
            'user' => [
                'id' => $userId,
                'email' => $email,
                'createdAt' => $createdAt,
                'isAdmin' => $isAdmin,
            ],
            'profile' => $profileMeta,
            'attempts' => [
                'total' => $attemptsTotal,
                'breakdown' => $attemptsBreakdown,
                'avgPct' => $avgPct,
                'hasMistakes' => $hasMistakes,
            ],
            'events' => [
                'total' => $eventsTotal,
                'lastAt' => $lastEventMs,
                'byType' => $eventCounts,
            ],
            'timeline' => $timeline,
            'dailyActivity' => $byEventDaily,
            'history' => [
                'revisions' => $historyCount,
            ],
        ];
    }

    // ─── helpers ───────────────────────────────────────────────────────────

    /**
     * @param  list<int>  $userIds
     * @return array<int, int|float|string|null>  user_id => sort key
     */
    private function buildSortMap(\Illuminate\Database\Connection $iqmo, array $userIds, string $sort, bool $hasAnalytics): array
    {
        $map = [];
        if ($sort === 'last_sync') {
            $rows = $iqmo->table('profile_state')->whereIn('user_id', $userIds)
                ->pluck('updated_at', 'user_id');
            foreach ($rows as $uid => $v) {
                $map[(int) $uid] = (int) $v;
            }
        } elseif ($sort === 'last_event') {
            if ($hasAnalytics) {
                $rows = $iqmo->table('analytics_events')->whereIn('user_id', $userIds)
                    ->selectRaw('user_id, MAX(occurred_at) AS m')
                    ->groupBy('user_id')->get();
                foreach ($rows as $r) {
                    $map[(int) $r->user_id] = (int) $r->m;
                }
            }
        } elseif ($sort === 'attempts') {
            // Дешёвый прокси: суммарное число событий chem.attempt_complete
            // (для аккуратного значения «всех режимов» нужен JSON-decode профилей —
            // дороже, и в большинстве случаев совпадает).
            if ($hasAnalytics) {
                $rows = $iqmo->table('analytics_events')->whereIn('user_id', $userIds)
                    ->whereIn('event', ['chem.attempt_complete', 'bio.attempt_complete'])
                    ->selectRaw('user_id, COUNT(*) AS c')
                    ->groupBy('user_id')->get();
                foreach ($rows as $r) {
                    $map[(int) $r->user_id] = (int) $r->c;
                }
            }
        }
        return $map;
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function buildKpis(
        int $totalUsers,
        int $newInWindow,
        int $new24h,
        int $active7d,
        int $sleeping14d,
        int $withAtLeastOneAttempt,
        int $adminsCount,
        bool $hasAnalytics,
        int $days,
    ): array {
        $periodHint = $days === 1 ? 'за 24 ч' : 'за '.$days.' дн.';
        $convPct = $totalUsers > 0 ? round(100.0 * $withAtLeastOneAttempt / $totalUsers, 1) : null;

        $kpis = [
            [
                'id' => 'total',
                'label' => 'Всего аккаунтов',
                'value' => $this->fmtInt($totalUsers),
                'delta' => 'в БД',
                'trend' => 'flat',
                'hint' => 'Таблица users (все когда-либо зарегистрировавшиеся)',
            ],
            [
                'id' => 'new_window',
                'label' => 'Новых регистраций',
                'value' => $this->fmtInt($newInWindow),
                'delta' => $periodHint,
                'trend' => $newInWindow > 0 ? 'up' : 'flat',
                'hint' => 'users.created_at попадает в выбранное окно',
            ],
            [
                'id' => 'new_24h',
                'label' => 'Новых за 24 ч',
                'value' => $this->fmtInt($new24h),
                'delta' => 'регистрации',
                'trend' => $new24h > 0 ? 'up' : 'flat',
                'hint' => 'Скорость прироста, не зависит от выбранного окна',
            ],
            [
                'id' => 'active_7d',
                'label' => 'Активных за 7 дн.',
                'value' => $hasAnalytics ? $this->fmtInt($active7d) : '—',
                'delta' => $hasAnalytics ? 'хоть одно событие' : 'нет таблицы',
                'trend' => 'flat',
                'hint' => 'COUNT(DISTINCT user_id) из analytics_events за последние 7 дней',
            ],
            [
                'id' => 'sleeping',
                'label' => 'Спящих 14 дн.+',
                'value' => $hasAnalytics ? $this->fmtInt($sleeping14d) : '—',
                'delta' => 'кандидаты на ре-активацию',
                'trend' => 'flat',
                'hint' => 'Юзеры без событий за 14 дней (или не подключившие синхронизацию)',
            ],
            [
                'id' => 'first_attempt',
                'label' => 'Дошли до первого теста',
                'value' => $hasAnalytics
                    ? ($convPct !== null ? str_replace('.', ',', (string) $convPct).'%' : '—')
                    : '—',
                'delta' => $hasAnalytics ? $this->fmtInt($withAtLeastOneAttempt).' из '.$this->fmtInt($totalUsers) : 'нет таблицы',
                'trend' => 'flat',
                'hint' => 'Доля юзеров с хотя бы одним chem.attempt_complete за всё время',
            ],
            [
                'id' => 'admins',
                'label' => 'Администраторов',
                'value' => $this->fmtInt($adminsCount),
                'delta' => 'IQMO_ADMIN_EMAILS',
                'trend' => 'flat',
                'hint' => 'Email юзера присутствует в env-allowlist админ-доступа',
            ],
        ];

        return $kpis;
    }

    /**
     * @param  array<string, mixed>  $keys
     */
    private function extractAttemptsTotal(array $keys): ?int
    {
        if (! isset($keys[self::ATTEMPT_KEY])) {
            return null;
        }
        $inner = $keys[self::ATTEMPT_KEY];
        if (is_string($inner)) {
            $inner = json_decode($inner, true);
        }
        if (! is_array($inner)) {
            return null;
        }
        $sum = 0;
        foreach (['warmup', 'quick', 'trial', 'full', 'other'] as $k) {
            $sum += (int) ($inner[$k] ?? 0);
        }
        return $sum;
    }

    /**
     * @param  array<string, mixed>  $keys
     * @return array<string, int>|null
     */
    private function extractAttemptsBreakdown(array $keys): ?array
    {
        if (! isset($keys[self::ATTEMPT_KEY])) {
            return null;
        }
        $inner = $keys[self::ATTEMPT_KEY];
        if (is_string($inner)) {
            $inner = json_decode($inner, true);
        }
        if (! is_array($inner)) {
            return null;
        }
        $out = [];
        foreach (['warmup', 'quick', 'trial', 'full', 'other'] as $k) {
            $out[$k] = (int) ($inner[$k] ?? 0);
        }
        return $out;
    }

    /**
     * @param  array<string, mixed>  $keys
     */
    private function hasMistakes(array $keys): bool
    {
        if (! isset($keys[self::MISTAKE_KEY])) {
            return false;
        }
        $mv = $keys[self::MISTAKE_KEY];
        if (is_string($mv)) {
            $mv = json_decode($mv, true);
        }
        return is_array($mv) && count($mv) > 0;
    }

    private function classifyStatus(
        int $createdAt,
        int $lastActivityMs,
        bool $isAdmin,
        int $nowMs,
        int $oneDayAgo,
        int $sevenDaysAgo,
        int $fourteenDaysAgo,
    ): string {
        if ($isAdmin) {
            return 'admin';
        }
        if ($createdAt >= $oneDayAgo) {
            return 'new';
        }
        if ($lastActivityMs >= $sevenDaysAgo) {
            return 'active';
        }
        if ($lastActivityMs >= $fourteenDaysAgo) {
            return 'idle';
        }
        if ($lastActivityMs > 0) {
            return 'sleeping';
        }
        return 'never';
    }

    /**
     * Срез payload для timeline — берём только поля, которые
     * полезно показать в одну строку.
     *
     * @return array<string, mixed>
     */
    private function summarizePayload(string $event, mixed $raw): array
    {
        if (is_string($raw)) {
            $p = json_decode($raw, true);
        } elseif (is_array($raw)) {
            $p = $raw;
        } else {
            return [];
        }
        if (! is_array($p)) {
            return [];
        }

        $out = [];
        foreach (['mode', 'percent', 'topic', 'topicId', 'qid', 'sku', 'sum'] as $k) {
            if (array_key_exists($k, $p)) {
                $out[$k] = $p[$k];
            }
        }
        // items в attempt_complete может быть огромным — храним только размер.
        if (isset($p['items']) && is_array($p['items'])) {
            $out['itemsCount'] = count($p['items']);
        }
        return $out;
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeKeys(mixed $raw): array
    {
        if ($raw === null || $raw === '') {
            return [];
        }
        if (is_array($raw)) {
            return $raw;
        }
        if ($raw instanceof \stdClass) {
            $raw = json_encode($raw);
        }
        if (! is_string($raw)) {
            return [];
        }
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @return list<string>
     */
    private function normalizedAdminEmails(): array
    {
        $raw = config('iqmo.admin_emails', []);
        if (! is_array($raw)) {
            return [];
        }
        return array_values(array_unique(array_filter(array_map(
            static fn (mixed $e): string => strtolower(trim((string) $e)),
            $raw,
        ))));
    }

    private function resolveDays(mixed $v): int
    {
        $n = (int) $v;
        return in_array($n, self::ALLOWED_DAYS, true) ? $n : 7;
    }

    private function resolvePerPage(mixed $v): int
    {
        $n = (int) $v;
        return in_array($n, self::ALLOWED_PER_PAGE, true) ? $n : 50;
    }

    private function resolveSort(mixed $v): string
    {
        $s = (string) $v;
        return in_array($s, self::ALLOWED_SORTS, true) ? $s : 'created_at';
    }

    private function resolveFilter(mixed $v): string
    {
        $s = (string) $v;
        return in_array($s, self::ALLOWED_FILTERS, true) ? $s : 'all';
    }

    private function fmtInt(int $n): string
    {
        $n = max(0, $n);
        return (string) number_format($n, 0, ',', "\u{202f}");
    }
}
