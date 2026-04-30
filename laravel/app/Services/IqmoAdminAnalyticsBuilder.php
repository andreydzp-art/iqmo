<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Единый сборщик аналитики для разделов админки: «Предметы», «Темы», «Вопросы»,
 * «Тесты» (варианты), «Ошибки», «Воронка», «Активность».
 *
 * Все методы читают только `analytics_events` (события `chem.*` и `bio.*`),
 * `users` и `quiz_events` (для воронки квизов). Никаких записей.
 *
 * Контракт окон одинаковый: метод принимает `days ∈ {1, 7, 14, 30}`. Все окна —
 * скользящие [now − days, now]. На пустом окне возвращается `meta` + пустой
 * массив-плейсхолдер (UI рисует «Нет данных»).
 *
 * При желании каждый builder можно вытащить в отдельный класс, но пока разделы
 * молодые и их 7 — держим в одном файле, чтобы не плодить однотипные классы и
 * чтобы общие SQL-фрагменты (`event IN (chem.*, bio.*)`, JSON-extract) не
 * расходились по копиям.
 */
final class IqmoAdminAnalyticsBuilder
{
    /** Допустимые окна (всё, что не из списка, схлопывается в 7). */
    public const ALLOWED_DAYS = [1, 7, 14, 30];

    /**
     * Минимальные показатели для попадания qid в «топ» (защита от шума).
     * Логика — копия `IqmoAdminOverviewMath::topQuestionsMinShows`, но
     * вынесена сюда, чтобы фильтры панелей «Вопросы» / «Ошибки» не
     * зависели от приватной логики Overview.
     */
    private const MIN_SHOWS_SHORT = 3;

    private const MIN_SHOWS_DEFAULT = 4;

    /**
     * События попыток в обоих пространствах имён. Используем в whereIn,
     * чтобы не размазывать литералы по запросам.
     *
     * @var list<string>
     */
    private const ATTEMPT_COMPLETE_EVENTS = ['chem.attempt_complete', 'bio.attempt_complete'];

    private const ATTEMPT_START_EVENTS = ['chem.attempt_start', 'bio.attempt_start'];

    private const TOPIC_VIEW_EVENTS = ['chem.topic_view', 'bio.topic_view'];

    /**
     * Sane-cap на размер выборки сырых строк (rollup в PHP). Для месяца 30 дней
     * на текущем потоке ≤ 12 000 событий complete — комфортно. Если выборка
     * упрётся в лимит, логика всё ещё корректна (просто берём более свежие).
     */
    private const RAW_ROWS_CAP = 12_000;

    private function clampDays(int $days): int
    {
        return in_array($days, self::ALLOWED_DAYS, true) ? $days : 7;
    }

    private function nowMs(): int
    {
        return (int) floor(microtime(true) * 1000);
    }

    private function sinceMs(int $days): int
    {
        return $this->nowMs() - $days * 86_400_000;
    }

    private function hasAnalytics(): bool
    {
        try {
            return Schema::connection('iqmo')->hasTable('analytics_events');
        } catch (\Throwable $e) {
            return false;
        }
    }

    private function metaShell(int $days): array
    {
        return [
            'source' => 'db',
            'generatedAt' => $this->nowMs(),
            'days' => $days,
            'sinceMs' => $this->sinceMs($days),
            'hasAnalytics' => $this->hasAnalytics(),
        ];
    }

    // ─── Subjects ──────────────────────────────────────────────────────────────

    /**
     * Сводка по предмету: какой объём активности (attempts), сколько уникальных
     * юзеров, средний процент по trial+full, доля прошедших часть 1.
     *
     * @return array<string, mixed>
     */
    public function subjects(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'subjects' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        // attempt_complete: основной агрегат по subject (в payload).
        $rows = $iqmo->table('analytics_events')
            ->whereIn('event', self::ATTEMPT_COMPLETE_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."COUNT(*) AS attempts,"
                ."COUNT(DISTINCT user_id) AS users,"
                ."AVG(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.mode')) IN ('trial','full')"
                ." THEN CAST(JSON_EXTRACT(payload_json, '$.percent') AS DECIMAL(10,2)) ELSE NULL END) AS avg_pct,"
                ."AVG(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.passedPart1')) = 'true'"
                ." THEN 1.0 ELSE 0.0 END) AS pass_rate"
            )
            ->groupBy(DB::raw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject'))"))
            ->get();

        // attempt_start: считаем стартующих, чтобы знать «кто сел за тест и не дошёл».
        $startRows = $iqmo->table('analytics_events')
            ->whereIn('event', self::ATTEMPT_START_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."COUNT(*) AS starts,"
                ."COUNT(DISTINCT user_id) AS start_users"
            )
            ->groupBy(DB::raw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject'))"))
            ->get()
            ->keyBy('subj');

        // topic_view: «глубина воронки» до теста.
        $viewRows = $iqmo->table('analytics_events')
            ->whereIn('event', self::TOPIC_VIEW_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."COUNT(*) AS views,"
                ."COUNT(DISTINCT user_id) AS view_users"
            )
            ->groupBy(DB::raw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject'))"))
            ->get()
            ->keyBy('subj');

        $subjects = [];
        $known = ['chemistry' => 'Химия', 'biology' => 'Биология'];
        $seen = [];
        foreach ($rows as $r) {
            $key = (string) ($r->subj ?? '') ?: 'unknown';
            $seen[$key] = true;
            $st = $startRows->get($key);
            $vw = $viewRows->get($key);
            $attempts = (int) ($r->attempts ?? 0);
            $startCount = (int) ($st->starts ?? 0);
            $viewCount = (int) ($vw->views ?? 0);
            $subjects[] = [
                'subject' => $key,
                'label' => $known[$key] ?? ucfirst($key),
                'attempts' => $attempts,
                'users' => (int) ($r->users ?? 0),
                'starts' => $startCount,
                'startUsers' => (int) ($st->start_users ?? 0),
                'views' => $viewCount,
                'viewUsers' => (int) ($vw->view_users ?? 0),
                'avgPct' => $r->avg_pct === null ? null : round((float) $r->avg_pct, 1),
                'passPct' => $r->pass_rate === null ? null : round(100.0 * (float) $r->pass_rate, 1),
                'completionPct' => $startCount > 0 ? round(100.0 * $attempts / $startCount, 1) : null,
                'viewToStartPct' => $viewCount > 0 ? round(100.0 * $startCount / $viewCount, 1) : null,
            ];
        }
        // Если стартов есть, а complete по предмету нет — добавим «голую» строку.
        foreach ($startRows as $key => $st) {
            if (isset($seen[$key])) {
                continue;
            }
            $vw = $viewRows->get($key);
            $subjects[] = [
                'subject' => (string) $key ?: 'unknown',
                'label' => $known[(string) $key] ?? ucfirst((string) $key),
                'attempts' => 0,
                'users' => 0,
                'starts' => (int) ($st->starts ?? 0),
                'startUsers' => (int) ($st->start_users ?? 0),
                'views' => (int) ($vw->views ?? 0),
                'viewUsers' => (int) ($vw->view_users ?? 0),
                'avgPct' => null,
                'passPct' => null,
                'completionPct' => 0.0,
                'viewToStartPct' => isset($vw->views) && (int) $vw->views > 0
                    ? round(100.0 * (int) $st->starts / (int) $vw->views, 1) : null,
            ];
        }

        usort($subjects, static fn ($a, $b) => ($b['attempts'] <=> $a['attempts']));

        return ['meta' => $meta, 'subjects' => $subjects];
    }

    // ─── Topics ────────────────────────────────────────────────────────────────

    /**
     * Что юзеры реально читают и какие темы конвертят в попытку.
     *
     * topicSlug в `attempt_complete` мы теперь сохраняем (см. sanitizeAttempt),
     * поэтому conversion и avg percent можно посчитать «честно» — конкретно
     * по теме, без угадывания «теми, кого человек смотрел перед тестом».
     *
     * @return array<string, mixed>
     */
    public function topics(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'topics' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        // views по темам.
        $viewRows = $iqmo->table('analytics_events')
            ->whereIn('event', self::TOPIC_VIEW_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.topicSlug')) AS slug,"
                ."JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."COUNT(*) AS views,"
                ."COUNT(DISTINCT user_id) AS view_users"
            )
            ->groupBy(DB::raw("slug, subj"))
            ->get();

        // attempts по темам (берём из payload.topicSlug в attempt_complete).
        $attemptRows = $iqmo->table('analytics_events')
            ->whereIn('event', self::ATTEMPT_COMPLETE_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.topicSlug')) <> ''")
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.topicSlug')) AS slug,"
                ."JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."COUNT(*) AS attempts,"
                ."COUNT(DISTINCT user_id) AS attempt_users,"
                ."AVG(CAST(JSON_EXTRACT(payload_json, '$.percent') AS DECIMAL(10,2))) AS avg_pct"
            )
            ->groupBy(DB::raw("slug, subj"))
            ->get()
            ->keyBy(static fn ($r) => ($r->slug ?? '').'|'.($r->subj ?? ''));

        $topics = [];
        $seenKeys = [];
        foreach ($viewRows as $r) {
            $slug = (string) ($r->slug ?? '');
            $subj = (string) ($r->subj ?? '');
            if ($slug === '') {
                continue;
            }
            $k = $slug.'|'.$subj;
            $seenKeys[$k] = true;
            $a = $attemptRows->get($k);
            $views = (int) ($r->views ?? 0);
            $attempts = (int) ($a->attempts ?? 0);
            $topics[] = [
                'topicSlug' => $slug,
                'subject' => $subj ?: 'unknown',
                'views' => $views,
                'viewUsers' => (int) ($r->view_users ?? 0),
                'attempts' => $attempts,
                'attemptUsers' => (int) ($a->attempt_users ?? 0),
                'avgPct' => $a !== null && $a->avg_pct !== null ? round((float) $a->avg_pct, 1) : null,
                'viewToAttemptPct' => $views > 0 ? round(100.0 * $attempts / $views, 1) : null,
            ];
        }
        // Темы, по которым были попытки без topic_view (например, прямо с теста).
        foreach ($attemptRows as $k => $a) {
            if (isset($seenKeys[$k])) {
                continue;
            }
            $topics[] = [
                'topicSlug' => (string) ($a->slug ?? ''),
                'subject' => (string) ($a->subj ?? '') ?: 'unknown',
                'views' => 0,
                'viewUsers' => 0,
                'attempts' => (int) ($a->attempts ?? 0),
                'attemptUsers' => (int) ($a->attempt_users ?? 0),
                'avgPct' => $a->avg_pct === null ? null : round((float) $a->avg_pct, 1),
                'viewToAttemptPct' => null,
            ];
        }

        usort(
            $topics,
            static fn ($a, $b) => (($b['views'] + $b['attempts']) <=> ($a['views'] + $a['attempts'])),
        );

        return ['meta' => $meta, 'topics' => array_slice($topics, 0, 100)];
    }

    // ─── Questions ─────────────────────────────────────────────────────────────

    /**
     * «Вопросы» — глубокий разрез по qid. Считаем shows / wrongPct по тем же
     * правилам, что и «Топ ошибок» в Обзоре, но добавляем разбивку по subject и
     * по фильтрам из UI.
     *
     * @param  array{subject?: string, q?: string, wrongOnly?: bool}  $filters
     * @return array<string, mixed>
     */
    public function questions(int $days, array $filters = []): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'questions' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        $events = self::ATTEMPT_COMPLETE_EVENTS;
        $subj = strtolower((string) ($filters['subject'] ?? 'all'));
        if ($subj === 'chemistry' || $subj === 'chem') {
            $events = ['chem.attempt_complete'];
        } elseif ($subj === 'biology' || $subj === 'bio') {
            $events = ['bio.attempt_complete'];
        }

        $rows = $iqmo->table('analytics_events')
            ->whereIn('event', $events)
            ->where('occurred_at', '>=', $sinceMs)
            ->orderByDesc('id')
            ->limit(self::RAW_ROWS_CAP)
            ->get(['payload_json', 'event']);

        $minShows = $days <= 1 ? self::MIN_SHOWS_SHORT : self::MIN_SHOWS_DEFAULT;
        $needle = strtolower(trim((string) ($filters['q'] ?? '')));
        $wrongOnly = ! empty($filters['wrongOnly']);

        /** @var array<string, array{n:int,w:int,subjects:array<string,int>}> $acc */
        $acc = [];
        foreach ($rows as $r) {
            $pl = json_decode((string) ($r->payload_json ?? ''), true);
            if (! is_array($pl)) {
                continue;
            }
            $items = $pl['items'] ?? null;
            if (! is_array($items)) {
                continue;
            }
            $eventNs = str_starts_with((string) ($r->event ?? ''), 'bio.') ? 'biology' : 'chemistry';
            $rowSubject = (string) ($pl['subject'] ?? $eventNs);
            foreach ($items as $it) {
                if (! is_array($it)) {
                    continue;
                }
                $qid = (string) ($it['qid'] ?? '');
                if ($qid === '') {
                    continue;
                }
                $acc[$qid] ??= ['n' => 0, 'w' => 0, 'subjects' => []];
                $acc[$qid]['n']++;
                if (empty($it['ok'])) {
                    $acc[$qid]['w']++;
                }
                $acc[$qid]['subjects'][$rowSubject] = ($acc[$qid]['subjects'][$rowSubject] ?? 0) + 1;
            }
        }

        $out = [];
        foreach ($acc as $qid => $a) {
            if ($a['n'] < $minShows) {
                continue;
            }
            $wrongPct = (int) round(100.0 * $a['w'] / $a['n']);
            if ($wrongOnly && $wrongPct < 50) {
                continue;
            }
            if ($needle !== '' && stripos($qid, $needle) === false) {
                continue;
            }
            arsort($a['subjects']);
            $top = array_key_first($a['subjects']);
            $out[] = [
                'qid' => $qid,
                'shows' => $a['n'],
                'wrong' => $a['w'],
                'wrongPct' => $wrongPct,
                'subject' => $top ?? 'unknown',
                'flag' => $wrongPct >= 55 && $a['n'] >= $minShows,
            ];
        }
        usort($out, static function ($a, $b) {
            if ($b['wrongPct'] !== $a['wrongPct']) {
                return $b['wrongPct'] <=> $a['wrongPct'];
            }
            return $b['shows'] <=> $a['shows'];
        });

        return [
            'meta' => $meta + [
                'minShows' => $minShows,
                'filters' => [
                    'subject' => $subj,
                    'q' => $needle,
                    'wrongOnly' => $wrongOnly,
                ],
                'sampledRows' => $rows->count(),
            ],
            'questions' => array_slice($out, 0, 200),
        ];
    }

    // ─── Tests (variants) ──────────────────────────────────────────────────────

    /**
     * Сводка по вариантам полного/тренировочного теста (variantId/variantTitle).
     *
     * @return array<string, mixed>
     */
    public function tests(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'tests' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        $rows = $iqmo->table('analytics_events')
            ->whereIn('event', self::ATTEMPT_COMPLETE_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.variantId')) <> 'null'")
            ->selectRaw(
                "JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.subject')) AS subj,"
                ."JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.mode')) AS mode,"
                ."JSON_EXTRACT(payload_json, '$.variantId') AS variant_id,"
                ."JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.variantTitle')) AS variant_title,"
                ."COUNT(*) AS attempts,"
                ."COUNT(DISTINCT user_id) AS users,"
                ."AVG(CAST(JSON_EXTRACT(payload_json, '$.percent') AS DECIMAL(10,2))) AS avg_pct,"
                ."AVG(CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.passedPart1')) = 'true' THEN 1.0 ELSE 0.0 END) AS pass_rate"
            )
            ->groupBy(DB::raw("subj, mode, variant_id, variant_title"))
            ->orderByDesc(DB::raw('COUNT(*)'))
            ->limit(100)
            ->get();

        $tests = [];
        foreach ($rows as $r) {
            $tests[] = [
                'subject' => (string) ($r->subj ?? '') ?: 'unknown',
                'mode' => (string) ($r->mode ?? '') ?: 'other',
                'variantId' => $r->variant_id !== null ? (int) $r->variant_id : null,
                'variantTitle' => (string) ($r->variant_title ?? ''),
                'attempts' => (int) ($r->attempts ?? 0),
                'users' => (int) ($r->users ?? 0),
                'avgPct' => $r->avg_pct === null ? null : round((float) $r->avg_pct, 1),
                'passPct' => $r->pass_rate === null ? null : round(100.0 * (float) $r->pass_rate, 1),
            ];
        }

        return ['meta' => $meta, 'tests' => $tests];
    }

    // ─── Mistakes ──────────────────────────────────────────────────────────────

    /**
     * Те же qid, что и в «Вопросах», но отсортированные по абсолютному числу
     * ошибок и с топом юзеров, у которых их больше всего.
     *
     * @return array<string, mixed>
     */
    public function mistakes(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'topQids' => [], 'topUsers' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        $rows = $iqmo->table('analytics_events')
            ->whereIn('event', self::ATTEMPT_COMPLETE_EVENTS)
            ->where('occurred_at', '>=', $sinceMs)
            ->orderByDesc('id')
            ->limit(self::RAW_ROWS_CAP)
            ->get(['user_id', 'payload_json', 'event']);

        /** @var array<string, array{n:int,w:int,subj:string}> $byQid */
        $byQid = [];
        /** @var array<int, array{wrong:int, attempts:int, last:int}> $byUser */
        $byUser = [];
        foreach ($rows as $r) {
            $pl = json_decode((string) ($r->payload_json ?? ''), true);
            if (! is_array($pl)) {
                continue;
            }
            $items = $pl['items'] ?? null;
            if (! is_array($items)) {
                continue;
            }
            $uid = (int) ($r->user_id ?? 0);
            if ($uid > 0) {
                $byUser[$uid] ??= ['wrong' => 0, 'attempts' => 0, 'last' => 0];
                $byUser[$uid]['attempts']++;
            }
            $eventNs = str_starts_with((string) ($r->event ?? ''), 'bio.') ? 'biology' : 'chemistry';
            $rowSubject = (string) ($pl['subject'] ?? $eventNs);
            foreach ($items as $it) {
                if (! is_array($it)) {
                    continue;
                }
                $qid = (string) ($it['qid'] ?? '');
                if ($qid === '') {
                    continue;
                }
                $byQid[$qid] ??= ['n' => 0, 'w' => 0, 'subj' => $rowSubject];
                $byQid[$qid]['n']++;
                if (empty($it['ok'])) {
                    $byQid[$qid]['w']++;
                    if ($uid > 0) {
                        $byUser[$uid]['wrong']++;
                    }
                }
            }
        }

        $topQids = [];
        foreach ($byQid as $qid => $a) {
            if ($a['w'] === 0) {
                continue;
            }
            $topQids[] = [
                'qid' => $qid,
                'subject' => $a['subj'] ?: 'unknown',
                'shows' => $a['n'],
                'wrong' => $a['w'],
                'wrongPct' => (int) round(100.0 * $a['w'] / max(1, $a['n'])),
            ];
        }
        usort($topQids, static fn ($a, $b) => $b['wrong'] <=> $a['wrong']);
        $topQids = array_slice($topQids, 0, 50);

        // Подтянем email топ-юзеров с наибольшим числом ошибок.
        $sortedUsers = $byUser;
        uasort($sortedUsers, static fn ($a, $b) => $b['wrong'] <=> $a['wrong']);
        $topUserIds = array_slice(array_keys($sortedUsers), 0, 25);
        $emails = [];
        if ($topUserIds !== []) {
            $u = $iqmo->table('users')->whereIn('id', $topUserIds)->select(['id', 'email'])->get();
            foreach ($u as $row) {
                $emails[(int) $row->id] = (string) $row->email;
            }
        }
        $topUsers = [];
        foreach ($topUserIds as $uid) {
            $a = $sortedUsers[$uid];
            $topUsers[] = [
                'userId' => $uid,
                'email' => $emails[$uid] ?? null,
                'attempts' => $a['attempts'],
                'wrong' => $a['wrong'],
            ];
        }

        return [
            'meta' => $meta + ['sampledRows' => $rows->count()],
            'topQids' => $topQids,
            'topUsers' => $topUsers,
        ];
    }

    // ─── Funnel ────────────────────────────────────────────────────────────────

    /**
     * Полная воронка: уникальные user_id на каждом шаге за окно. Шаги:
     *   1. registered — все юзеры, зарегистрированные за окно (база сравнения).
     *   2. topic_view — открыли хоть одну тему.
     *   3. attempt_start — начали тест (любой режим).
     *   4. attempt_complete — завершили тест (любой режим).
     *   5. attempt_complete (trial|full) — завершили «настоящий» тест.
     *
     * Дополнительно даём дневной timeseries по `attempt_complete` (для графика),
     * чтобы сразу же видеть тренд без ходов в Overview.
     *
     * @return array<string, mixed>
     */
    public function funnel(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        $registered = (int) $iqmo->table('users')
            ->where('created_at', '>=', $sinceMs)
            ->count();

        $views = 0;
        $starts = 0;
        $completes = 0;
        $realAttempts = 0;
        $daily = [];
        if ($meta['hasAnalytics']) {
            $row = $iqmo->table('analytics_events')
                ->where('occurred_at', '>=', $sinceMs)
                ->selectRaw(
                    "COUNT(DISTINCT CASE WHEN event IN ('chem.topic_view','bio.topic_view') THEN user_id END) AS u_view,"
                    ."COUNT(DISTINCT CASE WHEN event IN ('chem.attempt_start','bio.attempt_start') THEN user_id END) AS u_start,"
                    ."COUNT(DISTINCT CASE WHEN event IN ('chem.attempt_complete','bio.attempt_complete') THEN user_id END) AS u_complete,"
                    ."COUNT(DISTINCT CASE WHEN event IN ('chem.attempt_complete','bio.attempt_complete')"
                    ." AND JSON_UNQUOTE(JSON_EXTRACT(payload_json, '$.mode')) IN ('trial','full') THEN user_id END) AS u_real"
                )
                ->first();
            $views = (int) ($row->u_view ?? 0);
            $starts = (int) ($row->u_start ?? 0);
            $completes = (int) ($row->u_complete ?? 0);
            $realAttempts = (int) ($row->u_real ?? 0);

            // Дневной агрегат — для маленького графика.
            $byDay = $iqmo->table('analytics_events')
                ->whereIn('event', self::ATTEMPT_COMPLETE_EVENTS)
                ->where('occurred_at', '>=', $sinceMs)
                ->selectRaw("DATE(FROM_UNIXTIME(occurred_at/1000)) AS d, COUNT(*) AS c")
                ->groupBy('d')
                ->orderBy('d')
                ->get();
            $map = [];
            foreach ($byDay as $r) {
                $map[(string) $r->d] = (int) $r->c;
            }
            $nowSec = (int) round($this->nowMs() / 1000);
            for ($i = $days - 1; $i >= 0; $i--) {
                $day = date('Y-m-d', $nowSec - $i * 86_400);
                $daily[] = ['date' => $day, 'count' => $map[$day] ?? 0];
            }
        }

        $pct = static function (int $num, int $den): ?float {
            return $den > 0 ? round(100.0 * $num / $den, 1) : null;
        };

        $base = max($registered, $views, 1);

        return [
            'meta' => $meta,
            'steps' => [
                ['id' => 'registered', 'label' => 'Регистрация', 'value' => $registered, 'pct' => $pct($registered, $base), 'hint' => 'users.created_at в окне'],
                ['id' => 'topic_view', 'label' => 'Просмотр темы', 'value' => $views, 'pct' => $pct($views, $base), 'hint' => 'COUNT(DISTINCT user_id) chem|bio.topic_view'],
                ['id' => 'attempt_start', 'label' => 'Начало теста', 'value' => $starts, 'pct' => $pct($starts, $base), 'hint' => 'COUNT(DISTINCT user_id) chem|bio.attempt_start'],
                ['id' => 'attempt_complete', 'label' => 'Завершение теста', 'value' => $completes, 'pct' => $pct($completes, $base), 'hint' => 'COUNT(DISTINCT user_id) chem|bio.attempt_complete'],
                ['id' => 'real_attempt', 'label' => 'Полный/тренировочный', 'value' => $realAttempts, 'pct' => $pct($realAttempts, $base), 'hint' => 'mode IN (trial, full) — серьёзные попытки'],
            ],
            'transitions' => [
                'view_to_start' => $pct($starts, max(1, $views)),
                'start_to_complete' => $pct($completes, max(1, $starts)),
                'complete_to_real' => $pct($realAttempts, max(1, $completes)),
            ],
            'daily' => $daily,
        ];
    }

    // ─── Activity ──────────────────────────────────────────────────────────────

    /**
     * Тайм-лента активности: разбивка по часам и дням недели + топ активных
     * юзеров за окно. «Онлайн сейчас» уже считается в Overview, здесь не
     * дублируем.
     *
     * @return array<string, mixed>
     */
    public function activity(int $days): array
    {
        $days = $this->clampDays($days);
        $meta = $this->metaShell($days);
        if (! $meta['hasAnalytics']) {
            return ['meta' => $meta, 'hourly' => [], 'weekday' => [], 'topUsers' => []];
        }

        $sinceMs = $meta['sinceMs'];
        $iqmo = DB::connection('iqmo');

        $hourRows = $iqmo->table('analytics_events')
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw('HOUR(FROM_UNIXTIME(occurred_at/1000)) AS h, COUNT(*) AS c, COUNT(DISTINCT user_id) AS u')
            ->groupBy('h')
            ->orderBy('h')
            ->get();
        $hourMap = [];
        foreach ($hourRows as $r) {
            $hourMap[(int) $r->h] = ['c' => (int) $r->c, 'u' => (int) $r->u];
        }
        $hourly = [];
        for ($h = 0; $h < 24; $h++) {
            $hourly[] = [
                'hour' => $h,
                'events' => $hourMap[$h]['c'] ?? 0,
                'users' => $hourMap[$h]['u'] ?? 0,
            ];
        }

        // MySQL: WEEKDAY → 0=Mon ... 6=Sun. Возвращаем как русскую разбивку.
        $weekRows = $iqmo->table('analytics_events')
            ->where('occurred_at', '>=', $sinceMs)
            ->selectRaw('WEEKDAY(FROM_UNIXTIME(occurred_at/1000)) AS w, COUNT(*) AS c, COUNT(DISTINCT user_id) AS u')
            ->groupBy('w')
            ->orderBy('w')
            ->get();
        $weekMap = [];
        foreach ($weekRows as $r) {
            $weekMap[(int) $r->w] = ['c' => (int) $r->c, 'u' => (int) $r->u];
        }
        $labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        $weekday = [];
        for ($w = 0; $w < 7; $w++) {
            $weekday[] = [
                'idx' => $w,
                'label' => $labels[$w],
                'events' => $weekMap[$w]['c'] ?? 0,
                'users' => $weekMap[$w]['u'] ?? 0,
            ];
        }

        // Топ активных юзеров (по числу событий за окно).
        $top = $iqmo->table('analytics_events')
            ->where('occurred_at', '>=', $sinceMs)
            ->whereNotNull('user_id')
            ->selectRaw('user_id, COUNT(*) AS events_total, MAX(occurred_at) AS last_event,'
                ."SUM(CASE WHEN event IN ('chem.attempt_complete','bio.attempt_complete') THEN 1 ELSE 0 END) AS attempts")
            ->groupBy('user_id')
            ->orderByDesc(DB::raw('COUNT(*)'))
            ->limit(20)
            ->get();
        $userIds = [];
        foreach ($top as $r) {
            $userIds[] = (int) $r->user_id;
        }
        $emails = [];
        if ($userIds !== []) {
            $u = $iqmo->table('users')->whereIn('id', $userIds)->select(['id', 'email'])->get();
            foreach ($u as $row) {
                $emails[(int) $row->id] = (string) $row->email;
            }
        }
        $topUsers = [];
        foreach ($top as $r) {
            $uid = (int) $r->user_id;
            $topUsers[] = [
                'userId' => $uid,
                'email' => $emails[$uid] ?? null,
                'events' => (int) $r->events_total,
                'attempts' => (int) $r->attempts,
                'lastEventMs' => (int) $r->last_event,
            ];
        }

        return [
            'meta' => $meta,
            'hourly' => $hourly,
            'weekday' => $weekday,
            'topUsers' => $topUsers,
        ];
    }
}
