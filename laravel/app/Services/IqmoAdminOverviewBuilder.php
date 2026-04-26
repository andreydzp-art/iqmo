<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;

/**
 * Сводка для админ-дашборда из БД IQMO (users, profile_state).
 * Попытки и ошибки — из JSON-ключей синхронизации iqmo-chem-*.
 */
final class IqmoAdminOverviewBuilder
{
    private const ALLOWED_DAYS = [1, 7, 14, 30];

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
                'label' => 'MAU / DAU',
                'value' => '—',
                'delta' => 'н/д',
                'trend' => 'flat',
                'hint' => 'Нужны дневные срезы; пока только окно '.$days.' дн.',
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
                'value' => '—',
                'delta' => 'н/д',
                'trend' => 'flat',
                'hint' => 'Нет серверных сводок по баллам попыток',
            ],
            [
                'id' => 'session',
                'label' => 'Средняя сессия',
                'value' => '—',
                'delta' => 'н/д',
                'trend' => 'flat',
                'hint' => 'Нет агрегации времени по пользователям',
            ],
            [
                'id' => 'top_subject',
                'label' => 'Предмет',
                'value' => 'Химия ОГЭ',
                'delta' => 'портал',
                'trend' => 'flat',
                'hint' => 'Сейчас в облаке только химия',
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

        $funnel = $this->buildFunnel($totalUsers, $profilesTotal, $activeSync, $withAttempts, $mistakeUsers, $days);

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

        return [
            'meta' => [
                'source' => 'db',
                'generatedAt' => $nowMs,
                'days' => $days,
            ],
            'kpis' => $kpis,
            'funnel' => $funnel,
            'subjectsSnapshot' => $subjectsSnapshot,
            'topQuestions' => [],
            'learning' => $learning,
        ];
    }

    /**
     * @return list<array{step: string, users: int, pct: float}>
     */
    private function buildFunnel(
        int $totalUsers,
        int $profilesTotal,
        int $activeSync,
        int $withAttempts,
        int $mistakeUsers,
        int $days,
    ): array {
        if ($totalUsers < 1) {
            return [['step' => 'Пока нет пользователей', 'users' => 0, 'pct' => 0.0]];
        }

        $pct = static fn (int $n): float => round(100.0 * $n / max(1, $totalUsers), 1);
        $labelAct = $days === 1 ? 'Активность синхронизации (24 ч)' : 'Активность синхронизации ('.$days.' дн.)';

        return [
            ['step' => 'Аккаунтов в базе', 'users' => $totalUsers, 'pct' => 100.0],
            ['step' => 'С сохранённым профилем', 'users' => $profilesTotal, 'pct' => $pct($profilesTotal)],
            ['step' => $labelAct, 'users' => $activeSync, 'pct' => $pct($activeSync)],
            ['step' => 'С попытками в данных', 'users' => $withAttempts, 'pct' => $pct($withAttempts)],
            ['step' => 'С непустым банком ошибок', 'users' => $mistakeUsers, 'pct' => $pct($mistakeUsers)],
        ];
    }

    /** @return array<string, mixed> */
    private function stubLearning(int $days): array
    {
        $periodLabel = $days === 1 ? 'сегодня' : ($days === 7 ? '7 дней' : ($days === 14 ? '14 дней' : '30 дней'));

        $stubHint = 'Нужны серверные события или тяжёлая агрегация истории попыток; сейчас только снимки profile_state.';

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

    private function fmtInt(int $n): string
    {
        $n = max(0, $n);

        return (string) number_format($n, 0, ',', "\u{202f}");
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
}
