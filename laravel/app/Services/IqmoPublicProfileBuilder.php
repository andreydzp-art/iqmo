<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;

/**
 * Публичный снимок профиля IQMO из profile_state (без e-mail и без
 * приватных ключей). Формат совместим с IqmoProfileRender на фронте.
 */
final class IqmoPublicProfileBuilder
{
    /** @var list<int> */
    private const CH1_VARIANT_IDS = [1, 2, 3, 4, 5, 6, 7];

    /** @var list<array{key: string, n: int, label: string}> */
    private const CHEM_TOPICS = [
        ['key' => 'iqmo-chem-topic01-subtopics', 'n' => 6, 'label' => '01 · Периодическая система'],
        ['key' => 'iqmo-chem-topic02-subtopics', 'n' => 6, 'label' => '02 · Строение атома'],
        ['key' => 'iqmo-chem-topic03-subtopics', 'n' => 7, 'label' => '03 · Химическая связь'],
        ['key' => 'iqmo-chem-topic04-subtopics', 'n' => 6, 'label' => '04 · Классы неорганики'],
        ['key' => 'iqmo-chem-topic05-subtopics', 'n' => 6, 'label' => '05 · Реакции'],
        ['key' => 'iqmo-chem-topic06-subtopics', 'n' => 6, 'label' => '06 · Растворы'],
        ['key' => 'iqmo-chem-topic07-subtopics', 'n' => 6, 'label' => '07 · Металлы'],
        ['key' => 'iqmo-chem-topic08-subtopics', 'n' => 7, 'label' => '08 · Неметаллы'],
        ['key' => 'iqmo-chem-topic09-subtopics', 'n' => 7, 'label' => '09 · Органика'],
        ['key' => 'iqmo-chem-topic10-subtopics', 'n' => 7, 'label' => '10 · Экология'],
    ];

    /** @var list<array{id: string, title: string, desc: string, rarity: string, icon: string}> */
    private const ACHIEVEMENT_CATALOG = [
        ['id' => 'welcome', 'title' => 'Старт', 'desc' => 'Первый визит в IQMO.', 'rarity' => 'common', 'icon' => 'star'],
        ['id' => 'three_tests', 'title' => 'Тройка тестов', 'desc' => 'Завершено 3 учтённых теста.', 'rarity' => 'common', 'icon' => 'book'],
        ['id' => 'streak7', 'title' => 'Неделя ритма', 'desc' => '7 дней подряд с закрытой дневной целью.', 'rarity' => 'epic', 'icon' => 'flame'],
        ['id' => 'chem_stage1', 'title' => 'Этап 1 · Химия', 'desc' => 'Все 7 вариантов главы 1 по химии.', 'rarity' => 'epic', 'icon' => 'trophy'],
        ['id' => 'bio_stage1', 'title' => 'Этап 1 · Биология', 'desc' => 'Все 7 вариантов главы 1 по биологии.', 'rarity' => 'epic', 'icon' => 'trophy'],
        ['id' => 'ten_tests', 'title' => 'Десятка', 'desc' => '10 завершённых попыток.', 'rarity' => 'rare', 'icon' => 'medal'],
        ['id' => 'perfect_run', 'title' => 'Без ошибок', 'desc' => '100% при ≥5 вопросах в зачёте.', 'rarity' => 'rare', 'icon' => 'target'],
        ['id' => 'topic_star', 'title' => 'Мастер темы', 'desc' => 'Полностью освоена хотя бы одна тема.', 'rarity' => 'rare', 'icon' => 'spark'],
        ['id' => 'final_sprint', 'title' => 'Финишный рывок', 'desc' => 'Максимальный уровень (50).', 'rarity' => 'legend', 'icon' => 'crown'],
    ];

    /**
     * @return array<string, mixed>
     */
    public static function buildForProfileId(string $profileId): ?array
    {
        $userId = IqmoGamificationMath::parseProfileUserId($profileId);
        if ($userId === null) {
            return null;
        }

        $user = DB::connection('iqmo')->table('users')->where('id', $userId)->first();
        if (!$user) {
            return null;
        }

        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
        $keys = self::normalizeKeys($row?->keys_json ?? null);

        return self::buildPayload($userId, (string) $user->email, (int) ($user->created_at ?? 0), $keys);
    }

    /**
     * @param  mixed  $raw
     * @return array<string, mixed>
     */
    private static function normalizeKeys(mixed $raw): array
    {
        if (is_string($raw)) {
            $decoded = json_decode($raw, true);

            return is_array($decoded) ? $decoded : [];
        }

        return is_array($raw) ? $raw : [];
    }

    /**
     * @param  array<string, mixed>  $keys
     * @return array<string, mixed>
     */
    private static function buildPayload(int $userId, string $email, int $createdAtMs, array $keys): array
    {
        $profileId = IqmoGamificationMath::formatProfileId($userId);
        $name = self::resolveDisplayName($keys, $email);
        $totalPts = (int) self::keyVal($keys, 'iqmo-chem-progress-points-v1', 0);
        $level = IqmoGamificationMath::computeLevelDetail($totalPts);
        $levelTitle = IqmoGamificationMath::levelTitleRu($level['current']);

        $badges = self::keyVal($keys, 'iqmo-chem-badges-v1', []);
        $badges = is_array($badges) ? $badges : [];

        $streak = self::keyVal($keys, 'iqmo-chem-streak', ['days' => 0]);
        $streakDays = is_array($streak) ? (int) ($streak['days'] ?? 0) : 0;

        $weekly = self::keyVal($keys, 'iqmo-chem-weekly-points-v1', []);
        $weekly = is_array($weekly) ? $weekly : [];
        $weekKey = self::weekKey();
        $weekPts = (int) ($weekly[$weekKey] ?? 0);
        $league = self::computeLeague($weekly, $weekKey);

        $accuracy = self::keyVal($keys, 'iqmo-chem-accuracy-stats-v1', null);
        $accuracyAvg = self::accuracyAverage(is_array($accuracy) ? $accuracy : null);

        $chemV = self::summarizeVariants($keys, 'iqmo-chem-v-');
        $bioV = self::summarizeVariants($keys, 'iqmo-bio-v-');
        $mathV = self::summarizeVariants($keys, 'iqmo-math-v-', [1, 2, 3, 4, 5]);
        $chemTopics = self::chemTopicsSummary($keys);

        $chemMapPct = count(self::CH1_VARIANT_IDS) > 0
            ? (int) round(($chemV['passed'] / count(self::CH1_VARIANT_IDS)) * 100)
            : 0;
        $chemPct = max($chemMapPct, $chemTopics['avgPct']);

        $bioPct = count(self::CH1_VARIANT_IDS) > 0
            ? (int) round(($bioV['passed'] / count(self::CH1_VARIANT_IDS)) * 100)
            : 0;

        // Математика: 5 вариантов (бывшие 6–10 из сборника). $mathV['total'] = 5
        // благодаря кастомному списку variantIds, переданному в summarizeVariants выше.
        $mathPct = $mathV['total'] > 0
            ? (int) round(($mathV['passed'] / $mathV['total']) * 100)
            : 0;

        $subjects = [
            self::subjectCard('biology', 'Биология', 'ОГЭ · карта уровней · глава 1', $bioPct, $bioV, '/full-test-biology/', $level['current']),
            self::subjectCard('chemistry', 'Химия', 'ОГЭ · 10 тем · '.count(self::CHEM_TOPICS).' разделов', $chemPct, $chemV, '/subject-chemistry/', $level['current'], $chemTopics),
            self::subjectCard('mathematics', 'Математика', 'ОГЭ · 5 вариантов · 25 заданий', $mathPct, $mathV, '/full-test-mathematics/', $level['current']),
        ];

        $coursePct = count($subjects) > 0
            ? (int) round(array_sum(array_column($subjects, 'pct')) / count($subjects))
            : 0;

        $attemptStats = self::keyVal($keys, 'iqmo-chem-attempt-stats-v1', []);
        $attemptTotal = is_array($attemptStats) ? array_sum(array_map('intval', $attemptStats)) : 0;
        $totalTasks = (int) self::keyVal($keys, 'iqmo-chem-total-tasks-v1', 0);
        $totalActiveMs = (int) self::keyVal($keys, 'iqmo-chem-total-active-ms-v1', 0);

        $lastAttempt = self::keyVal($keys, 'iqmo-chem-last-attempt', null);
        $lastAttempt = is_array($lastAttempt) ? $lastAttempt : null;

        $memberSince = $createdAtMs > 0 ? (int) floor($createdAtMs / 1000) : null;

        return [
            'isPublic' => true,
            'profileId' => $profileId,
            'profileData' => [
                'name' => $name,
                'initials' => IqmoGamificationMath::initialsFromName($name),
                'profileId' => $profileId,
                'isAuthed' => false,
                'email' => null,
                'level' => $level['current'],
                'levelTitle' => $levelTitle,
                'nextLevel' => $level['current'] >= IqmoGamificationMath::MAX_LEVEL ? null : $level['current'] + 1,
                'nextLevelTitle' => $levelTitle,
                'xpCurrent' => $totalPts,
                'xpLevelMin' => $level['minXpThisLevel'],
                'xpLevelMax' => $level['nextThreshold'] ?? $level['minXpThisLevel'] + 200,
                'xpToNext' => $level['xpToNext'],
                'xpPct' => (int) round($level['progressFrac'] * 100),
                'weekXp' => $weekPts,
                'streakDays' => $streakDays,
                'leagueRank' => $league['rank'],
                'leagueSize' => $league['size'],
                'leagueDelta' => $league['rank'] > 1 ? 1 : 0,
                'coursePct' => $coursePct,
                'accuracyPct' => $accuracyAvg,
                'equippedFrame' => null,
                'memberSince' => $memberSince,
                'avatarUrl' => IqmoAvatarResolver::urlFromKeys($keys),
            ],
            'socialSignals' => self::socialSignals($levelTitle, $subjects, $league),
            'nextGoalsData' => self::nextGoals($level, $levelTitle, $streakDays, $keys, $league),
            'achievementsData' => self::achievements($badges),
            'activityData' => self::activityFeed($lastAttempt, $badges),
            'statsData' => self::stats($totalTasks, $attemptTotal, $totalActiveMs, $streakDays, $accuracyAvg, $lastAttempt, $weekPts),
            'subjectsProgressData' => $subjects,
            'collectiblesData' => [],
            'publicNotice' => ! self::hasBioKeys($keys) && $bioV['passed'] === 0
                ? 'Прогресс по биологии может храниться только на устройстве ученика и не отображаться здесь.'
                : null,
        ];
    }

    /**
     * @param  array<string, mixed>  $keys
     */
    private static function resolveDisplayName(array $keys, string $email): string
    {
        $raw = self::keyVal($keys, 'iqmo-chem-display-name-v1', null);
        if (is_string($raw)) {
            $trimmed = trim(preg_replace('/\s+/u', ' ', $raw) ?? '');
            if ($trimmed !== '' && mb_strlen($trimmed) >= 2 && mb_strlen($trimmed) <= 32) {
                return $trimmed;
            }
        }

        return IqmoGamificationMath::displayNameFromEmail($email);
    }

    /**
     * @param  array<string, mixed>  $keys
     */
    private static function hasBioKeys(array $keys): bool
    {
        foreach (array_keys($keys) as $k) {
            if (is_string($k) && str_starts_with($k, 'iqmo-bio-')) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param  array<string, mixed>  $keys
     */
    private static function keyVal(array $keys, string $key, mixed $default = null): mixed
    {
        if (!array_key_exists($key, $keys)) {
            return $default;
        }
        $v = $keys[$key];
        if (is_string($v)) {
            $j = json_decode($v, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $j;
            }

            return $v;
        }

        return $v;
    }

    /**
     * @param  array<string, int|float>  $weekly
     * @return array{rank: int, size: int, gapToPrev: int}
     */
    private static function computeLeague(array $weekly, string $currentWeek): array
    {
        $values = [];
        foreach ($weekly as $k => $p) {
            $values[] = ['k' => (string) $k, 'p' => (int) $p];
        }
        usort($values, static fn (array $a, array $b): int => $b['p'] <=> $a['p']);
        $size = max(1, count($values));
        $rank = 1;
        foreach ($values as $i => $x) {
            if ($x['k'] === $currentWeek) {
                $rank = $i + 1;
                break;
            }
        }
        $ahead = $values[max(0, $rank - 2)] ?? null;
        $gap = $ahead && ($ahead['k'] ?? '') !== $currentWeek
            ? max(0, (int) ($ahead['p'] ?? 0) - (int) ($weekly[$currentWeek] ?? 0) + 1)
            : 0;

        return ['rank' => $rank, 'size' => $size, 'gapToPrev' => $gap];
    }

    private static function weekKey(): string
    {
        $millis = (int) floor(microtime(true) * 1000);
        $sec = intdiv($millis, 1000);
        $dl = new \DateTimeImmutable('@'.$sec);
        $y = (int) $dl->format('Y');
        $m0 = (int) $dl->format('n') - 1;
        $day = (int) $dl->format('j');
        $utcMid = gmmktime(0, 0, 0, $m0 + 1, $day, $y);
        $date = new \DateTimeImmutable('@'.$utcMid, new \DateTimeZone('UTC'));
        $dow = (int) $date->format('w');
        $dowIso = $dow === 0 ? 7 : $dow;
        $date = $date->modify((4 - $dowIso).' days');
        $yearStart = new \DateTimeImmutable($date->format('Y').'-01-01 00:00:00', new \DateTimeZone('UTC'));
        $diffDays = ($date->getTimestamp() - $yearStart->getTimestamp()) / 86400;
        $weekNo = (int) ceil(($diffDays + 1) / 7);

        return $date->format('Y').'-W'.str_pad((string) $weekNo, 2, '0', STR_PAD_LEFT);
    }

    /**
     * @param  array{sum?: int, count?: int}|null  $accuracy
     */
    private static function accuracyAverage(?array $accuracy): ?int
    {
        if ($accuracy === null) {
            return null;
        }
        $count = (int) ($accuracy['count'] ?? 0);
        if ($count <= 0) {
            return null;
        }

        return (int) round(((int) ($accuracy['sum'] ?? 0)) / $count);
    }

    /**
     * @param  array<string, mixed>  $keys
     * @return array{passed: int, finished: int, total: int, stars: int, maxStars: int, avgPart1: int}
     */
    /**
     * @param  list<int>|null  $variantIds  Кастомный список ID; если null — берём CH1_VARIANT_IDS (7 вариантов главы 1 био/химии).
     *                                      Для математики передаём [1..5] — у неё другое количество вариантов.
     * @return array{passed:int,finished:int,total:int,stars:int,maxStars:int,avgPart1:int}
     */
    private static function summarizeVariants(array $keys, string $prefix, ?array $variantIds = null): array
    {
        $ids = $variantIds ?? self::CH1_VARIANT_IDS;
        $passed = 0;
        $finished = 0;
        $totalStars = 0;
        $maxStars = count($ids) * 3;
        $pctSum = 0;
        $pctCount = 0;

        foreach ($ids as $id) {
            $state = self::keyVal($keys, $prefix.$id, null);
            if (!is_array($state) || empty($state['finished'])) {
                continue;
            }
            $finished++;
            $pct = isset($state['part1Percent']) ? (int) $state['part1Percent']
                : (isset($state['percent']) ? (int) $state['percent'] : 50);
            if ($pct >= 50) {
                $passed++;
            }
            $totalStars += IqmoGamificationMath::starsForPercent($pct);
            $pctSum += $pct;
            $pctCount++;
        }

        return [
            'passed' => $passed,
            'finished' => $finished,
            'total' => count($ids),
            'stars' => $totalStars,
            'maxStars' => $maxStars,
            'avgPart1' => $pctCount > 0 ? (int) round($pctSum / $pctCount) : 0,
        ];
    }

    /**
     * @param  array<string, mixed>  $keys
     * @return array{avgPct: int, doneTopics: int, totalTopics: int}
     */
    private static function chemTopicsSummary(array $keys): array
    {
        $sum = 0;
        $count = 0;
        $doneTopics = 0;
        foreach (self::CHEM_TOPICS as $topic) {
            $st = self::readTopicPct($keys, $topic['key'], $topic['n']);
            if ($st === null) {
                continue;
            }
            $sum += $st['pct'];
            $count++;
            if ($st['done'] >= $topic['n']) {
                $doneTopics++;
            }
        }

        return [
            'avgPct' => $count > 0 ? (int) round($sum / $count) : 0,
            'doneTopics' => $doneTopics,
            'totalTopics' => count(self::CHEM_TOPICS),
        ];
    }

    /**
     * @param  array<string, mixed>  $keys
     * @return array{pct: int, done: int, partial: int}|null
     */
    private static function readTopicPct(array $keys, string $key, int $n): ?array
    {
        $a = self::keyVal($keys, $key, null);
        if (!is_array($a)) {
            return null;
        }
        $done = 0;
        $partial = 0;
        for ($i = 0; $i < $n; $i++) {
            $v = ($a[$i] ?? 0) === 2 ? 2 : (($a[$i] ?? 0) === 1 ? 1 : 0);
            if ($v === 2) {
                $done++;
            } elseif ($v === 1) {
                $partial++;
            }
        }
        $pct = min(100, (int) round(($done * 100 + $partial * 45) / $n));

        return ['pct' => $pct, 'done' => $done, 'partial' => $partial];
    }

    /**
     * @param  array{passed: int, stars: int, maxStars: int, avgPart1: int}  $variants
     * @param  array{avgPct: int, doneTopics: int, totalTopics: int}|null  $chemTopics
     * @return array<string, mixed>
     */
    private static function subjectCard(
        string $slug,
        string $name,
        string $sub,
        int $pct,
        array $variants,
        string $href,
        int $level,
        ?array $chemTopics = null,
    ): array {
        $meta = [];
        // `$variants['total']` приходит из summarizeVariants() и учитывает кастомный список ID
        // (для math это 5, для bio/chem остаётся 7 из CH1_VARIANT_IDS).
        $totalVariants = (int) ($variants['total'] ?? count(self::CH1_VARIANT_IDS));
        if ($chemTopics !== null) {
            $meta[] = ['label' => 'тем', 'value' => $chemTopics['doneTopics'].' / '.$chemTopics['totalTopics']];
            $meta[] = ['label' => 'вариантов', 'value' => $variants['passed'].' / '.$totalVariants];
            $meta[] = ['label' => 'звёзды', 'value' => $variants['stars'].' / '.$variants['maxStars']];
        } else {
            $meta[] = ['label' => 'вариантов', 'value' => $variants['passed'].' / '.$totalVariants];
            $meta[] = ['label' => 'звёзды', 'value' => $variants['stars'].' / '.$variants['maxStars']];
        }

        return [
            'slug' => $slug,
            'name' => $name,
            'sub' => $sub,
            'level' => $level,
            'pct' => $pct,
            'status' => $pct >= 100 ? 'done' : ($pct > 0 ? 'progress' : 'new'),
            'meta' => $meta,
            'topSignal' => $variants['passed'] > 0
                ? ['text' => 'ср. '.$variants['avgPart1'].'% по части 1']
                : null,
            'href' => $href,
        ];
    }

    /**
     * @param  list<array<string, mixed>>  $subjects
     * @param  array{rank: int, size: int}  $league
     * @return list<array<string, string>>
     */
    private static function socialSignals(string $levelTitle, array $subjects, array $league): array
    {
        $signals = [['kind' => 'rank', 'text' => 'Ранг «'.$levelTitle.'»']];
        foreach ($subjects as $s) {
            if (($s['pct'] ?? 0) <= 0) {
                continue;
            }
            $meta = $s['meta'][0]['value'] ?? '';
            $kind = ($s['slug'] ?? '') === 'biology' ? 'top' : 'ahead';
            $signals[] = ['kind' => $kind, 'text' => ($s['name'] ?? '').' · '.$meta];
        }
        $signals[] = ['kind' => 'ahead', 'text' => 'Лига '.$league['rank'].' / '.$league['size']];

        return $signals;
    }

    /**
     * @param  array<string, mixed>  $level
     * @param  array{rank: int, size: int, gapToPrev: int}  $league
     * @param  array<string, mixed>  $keys
     * @return list<array<string, mixed>>
     */
    private static function nextGoals(array $level, string $levelTitle, int $streakDays, array $keys, array $league): array
    {
        $daily = self::keyVal($keys, 'iqmo-chem-daily-v1', ['tasksDone' => 0]);
        $today = is_array($daily) ? (int) ($daily['tasksDone'] ?? 0) : 0;
        $goal = self::keyVal($keys, 'iqmo-chem-daily-goal-v1', ['target' => 10]);
        $target = is_array($goal) ? (int) ($goal['target'] ?? 10) : 10;

        return [
            [
                'kind' => 'gold',
                'primary' => true,
                'eye' => 'До нового уровня',
                'big' => number_format((int) $level['xpToNext'], 0, '', ' ').' XP',
                'text' => 'до уровня '.($level['current'] + 1).' «'.$levelTitle.'»',
                'foot' => $level['current'] >= IqmoGamificationMath::MAX_LEVEL ? 'Максимальный уровень' : '≈ ещё несколько вариантов',
                'pct' => (int) round($level['progressFrac'] * 100),
            ],
            [
                'kind' => 'streak',
                'primary' => false,
                'eye' => 'Награда за серию',
                'big' => max(0, 7 - $streakDays).' дн.',
                'text' => 'до бонуса 7 дней подряд',
                'foot' => 'награда: <b>значок «Неделя ритма»</b>',
                'pct' => min(100, (int) round(($streakDays / 7) * 100)),
            ],
            [
                'kind' => 'badge',
                'primary' => false,
                'eye' => 'Дневная цель',
                'big' => max(0, $target - $today).' задач',
                'text' => 'до закрытия цели на сегодня',
                'foot' => 'сегодня: <b>'.$today.' / '.$target.'</b>',
                'pct' => $target > 0 ? min(100, (int) round(($today / $target) * 100)) : 0,
            ],
            [
                'kind' => 'league',
                'primary' => false,
                'eye' => 'Лига недели',
                'big' => $league['gapToPrev'] > 0 ? '+'.$league['gapToPrev'].' XP' : '—',
                'text' => $league['rank'] <= 1 ? 'лучшая неделя за период' : 'до места выше в лиге',
                'foot' => 'место <b>'.$league['rank'].' / '.$league['size'].'</b>',
                'pct' => $league['size'] > 1 ? max(10, 100 - $league['rank'] * 8) : 50,
            ],
        ];
    }

    /**
     * @param  array<string, int>  $badges
     * @return list<array<string, mixed>>
     */
    private static function achievements(array $badges): array
    {
        $out = [];
        foreach (self::ACHIEVEMENT_CATALOG as $cat) {
            $ts = $badges[$cat['id']] ?? null;
            $unlocked = $ts !== null;
            $out[] = [
                'id' => $cat['id'],
                'title' => $cat['title'],
                'desc' => $cat['desc'],
                'rarity' => $cat['rarity'],
                'icon' => $cat['icon'],
                'pctEarned' => null,
                'unlocked' => $unlocked,
                'earnedAt' => $unlocked ? (int) $ts : null,
                'locked' => !$unlocked,
            ];
        }

        return $out;
    }

    /**
     * @param  array<string, mixed>|null  $lastAttempt
     * @param  array<string, int>  $badges
     * @return list<array<string, mixed>>
     */
    private static function activityFeed(?array $lastAttempt, array $badges): array
    {
        $events = [];
        if ($lastAttempt && !empty($lastAttempt['finishedAt'])) {
            $mode = self::modeRu((string) ($lastAttempt['mode'] ?? ''));
            $subj = (($lastAttempt['subject'] ?? '') === 'biology') ? 'биологии' : 'химии';
            $pct = $lastAttempt['percent'] ?? null;
            $events[] = [
                'type' => 'test',
                'text' => 'Завершён <b>'.$mode.'</b>'.(!empty($lastAttempt['variantTitle']) ? ' · '.$lastAttempt['variantTitle'] : '').' по '.$subj,
                'pills' => $pct !== null ? [['kind' => 'pct', 'value' => $pct.'%']] : [],
                'time' => self::formatRelativeTime((int) $lastAttempt['finishedAt']),
            ];
        }

        if (count($events) < 2) {
            $events[] = [
                'type' => 'complete',
                'text' => 'Публичный профиль — без полной истории активности.',
                'pills' => [],
                'time' => '',
            ];
        }

        return array_slice($events, 0, 6);
    }

    /**
     * @param  array<string, mixed>|null  $lastAttempt
     * @return list<array<string, mixed>>
     */
    private static function stats(
        int $totalTasks,
        int $attemptTotal,
        int $totalActiveMs,
        int $streakDays,
        ?int $accuracyAvg,
        ?array $lastAttempt,
        int $weekPts,
    ): array {
        $hours = (int) floor($totalActiveMs / 3600000);
        $mins = (int) round(($totalActiveMs % 3600000) / 60000);
        $avgLabel = $accuracyAvg !== null ? 'среднее по попыткам' : '—';

        return [
            ['kind' => 'solved', 'top' => null, 'value' => (string) max($totalTasks, $attemptTotal), 'unit' => '', 'label' => 'Решено задач', 'delta' => 'за неделю +'.$weekPts.' XP'],
            ['kind' => 'score', 'top' => null, 'value' => $accuracyAvg !== null ? (string) $accuracyAvg : '—', 'unit' => $accuracyAvg !== null ? '%' : '', 'label' => 'Средний результат', 'delta' => $avgLabel],
            ['kind' => 'hours', 'top' => null, 'value' => (string) $hours, 'unit' => $hours > 0 ? 'ч' : 'мин', 'label' => 'Часов учёбы', 'delta' => $hours > 0 ? '+'.$mins.'м' : $mins.' мин всего'],
            ['kind' => 'best', 'top' => null, 'value' => (string) $streakDays, 'unit' => 'дн', 'label' => 'Текущая серия', 'delta' => 'лучшая серия'],
            ['kind' => 'subject', 'top' => null, 'value' => ($lastAttempt['subject'] ?? '') === 'biology' ? 'Био' : 'Хим', 'unit' => '', 'label' => 'Последний предмет', 'delta' => $lastAttempt ? self::modeRu((string) ($lastAttempt['mode'] ?? '')) : '—'],
            ['kind' => 'accuracy', 'top' => null, 'value' => $accuracyAvg !== null ? (string) $accuracyAvg : '—', 'unit' => $accuracyAvg !== null ? '%' : '', 'label' => 'Точность ответа', 'delta' => $avgLabel],
        ];
    }

    private static function modeRu(string $mode): string
    {
        return match ($mode) {
            'warmup' => 'Разминка',
            'trial' => 'Пробник',
            'full' => 'Полный вариант',
            'quick' => 'Быстрый тест',
            default => 'Тренировка',
        };
    }

    private static function formatRelativeTime(int $ts): string
    {
        if ($ts <= 0) {
            return '';
        }
        $d = (int) floor((microtime(true) * 1000 - $ts) / 60000);
        if ($d < 1) {
            return 'только что';
        }
        if ($d < 60) {
            return $d.' мин назад';
        }
        $hours = (int) floor($d / 60);
        if ($hours < 24) {
            return $hours.' ч назад';
        }
        $days = (int) floor($hours / 24);
        if ($days === 1) {
            return 'вчера';
        }
        if ($days < 7) {
            return $days.' дн. назад';
        }

        return date('d.m.Y', (int) floor($ts / 1000));
    }
}
