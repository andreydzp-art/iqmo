<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

final class IqmoLiveActivityService
{
    private const ONLINE_WINDOW_MS = 5 * 60 * 1000;

    private const TYPE_COOLDOWN_MS = 5 * 60 * 1000;

    private const HOURLY_CAP = 5;

    /** @var list<string> */
    private const ALLOWED_TYPES = [
        'topic_completed',
        'chapter_started',
        'badge_earned',
        'perfect_score',
        'streak_saved',
        'level_up',
        'boss_completed',
        'subject_active',
        'daily_goal_completed',
        'league_rank_changed',
    ];

    /** @var list<string> */
    private const SAFE_NAMES = [
        'Алина', 'Никита', 'София', 'Максим', 'Даша', 'Кирилл', 'Маша', 'Артём',
        'Мила', 'Егор', 'Полина', 'Илья', 'Вика', 'Роман', 'Катя', 'Тимур',
    ];

    /** @var array<string, string> */
    private const BADGE_TITLES = [
        'welcome' => 'Старт',
        'three_tests' => 'Тройка тестов',
        'streak7' => 'Неделя ритма',
        'chem_stage1' => 'Этап 1 · Химия',
        'bio_stage1' => 'Этап 1 · Биология',
        'ten_tests' => 'Десятка',
        'perfect_run' => 'Без ошибок',
        'topic_star' => 'Мастер темы',
        'final_sprint' => 'Финишный рывок',
    ];

    /** @var array<string, string> */
    private const SUBJECT_LABELS = [
        'biology' => 'биологию',
        'chemistry' => 'химию',
    ];

    public function touchPresence(int $userId, ?string $subject, ?string $chapter, bool $publicOptIn): void
    {
        $now = $this->nowMs();
        DB::connection('iqmo')->table('users')->where('id', $userId)->update([
            'last_activity_at' => $now,
            'activity_subject' => $subject ? substr($subject, 0, 32) : null,
            'activity_chapter' => $chapter ? substr($chapter, 0, 64) : null,
            'live_activity_public' => $publicOptIn ? 1 : 0,
        ]);
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array{ok: bool, event?: array<string, mixed>, reason?: string}
     */
    public function recordEvent(int $userId, array $payload): array
    {
        $type = (string) ($payload['type'] ?? '');
        if (! in_array($type, self::ALLOWED_TYPES, true)) {
            return ['ok' => false, 'reason' => 'invalid_type'];
        }

        if ($this->isThrottled($userId, $type)) {
            return ['ok' => false, 'reason' => 'throttled'];
        }

        $public = ! empty($payload['publicOptIn']);
        $visibility = $public ? 'public' : 'anonymous';
        $publicName = $public ? $this->sanitizePublicName((string) ($payload['publicName'] ?? '')) : null;

        $subject = isset($payload['subject']) ? substr((string) $payload['subject'], 0, 32) : null;
        $chapter = isset($payload['chapter']) ? substr((string) $payload['chapter'], 0, 64) : null;
        $topic = isset($payload['topic']) ? substr((string) $payload['topic'], 0, 128) : null;
        $badgeId = (string) ($payload['badgeId'] ?? $payload['badge'] ?? '');
        $badgeName = (string) ($payload['badgeName'] ?? '');
        if ($badgeName === '' && $badgeId !== '') {
            $badgeName = self::BADGE_TITLES[$badgeId] ?? $badgeId;
        }

        $now = $this->nowMs();
        $id = DB::connection('iqmo')->table('live_activity_events')->insertGetId([
            'user_id' => $userId,
            'type' => $type,
            'visibility' => $visibility,
            'public_name' => $publicName,
            'subject' => $subject,
            'topic' => $topic,
            'chapter' => $chapter,
            'badge_name' => $badgeName !== '' ? substr($badgeName, 0, 128) : null,
            'level' => isset($payload['level']) ? (int) $payload['level'] : null,
            'streak_days' => isset($payload['streakDays']) ? (int) $payload['streakDays'] : null,
            'score' => isset($payload['score']) ? (int) $payload['score'] : null,
            'count' => isset($payload['count']) ? (int) $payload['count'] : null,
            'metadata_json' => json_encode($payload['metadata'] ?? [], JSON_UNESCAPED_UNICODE),
            'created_at' => $now,
        ]);

        $this->touchPresence($userId, $subject, $chapter, $public);

        $row = DB::connection('iqmo')->table('live_activity_events')->where('id', $id)->first();

        return ['ok' => true, 'event' => $this->formatEvent($row)];
    }

    /**
     * @return array{
     *   onlineCount: int,
     *   activeInSubject: int,
     *   activeInChapter: int,
     *   events: list<array<string, mixed>>,
     *   aggregates: list<array<string, mixed>>
     * }
     */
    public function getFeed(?string $scope, ?string $subject, ?string $chapter, int $limit = 8): array
    {
        $now = $this->nowMs();
        $since = $now - 24 * 60 * 60 * 1000;

        $online = $this->countOnline(null);
        $activeSubject = $subject ? $this->countOnline($subject) : 0;
        $activeChapter = ($subject && $chapter) ? $this->countOnline($subject, $chapter) : 0;

        $q = DB::connection('iqmo')->table('live_activity_events')
            ->where('created_at', '>=', $since)
            ->where('type', '!=', 'subject_active')
            ->orderByDesc('created_at');

        if ($subject) {
            $q->where(function ($w) use ($subject) {
                $w->where('subject', $subject)->orWhereNull('subject');
            });
        }

        $rows = $q->limit(max(3, min(20, $limit)))->get();
        $events = [];
        $lastType = null;
        foreach ($rows as $row) {
            if ($row->type === $lastType) {
                continue;
            }
            $events[] = $this->formatEvent($row);
            $lastType = $row->type;
            if (count($events) >= $limit) {
                break;
            }
        }

        $aggregates = $this->buildAggregates($subject, $chapter, $online, $activeSubject);

        if (count($events) < 3) {
            $events = array_merge($events, $this->systemEvents($subject, $online, $activeSubject, $activeChapter));
            $events = $this->dedupeEvents(array_slice($events, 0, $limit));
        }

        return [
            'onlineCount' => $online,
            'activeInSubject' => $activeSubject,
            'activeInChapter' => $activeChapter,
            'events' => $events,
            'aggregates' => $aggregates,
        ];
    }

    private function isThrottled(int $userId, string $type): bool
    {
        $now = $this->nowMs();
        $typeSince = $now - self::TYPE_COOLDOWN_MS;
        $hourSince = $now - 60 * 60 * 1000;

        $recentSame = DB::connection('iqmo')->table('live_activity_events')
            ->where('user_id', $userId)
            ->where('type', $type)
            ->where('created_at', '>=', $typeSince)
            ->count();

        if ($recentSame > 0) {
            return true;
        }

        $hourly = DB::connection('iqmo')->table('live_activity_events')
            ->where('user_id', $userId)
            ->where('created_at', '>=', $hourSince)
            ->count();

        return $hourly >= self::HOURLY_CAP;
    }

    private function countOnline(?string $subject, ?string $chapter = null): int
    {
        $since = $this->nowMs() - self::ONLINE_WINDOW_MS;
        $q = DB::connection('iqmo')->table('users')->where('last_activity_at', '>=', $since);
        if ($subject) {
            $q->where('activity_subject', $subject);
        }
        if ($chapter) {
            $q->where('activity_chapter', $chapter);
        }
        $real = (int) $q->count();

        return max($real, $this->baselineOnline($subject));
    }

    private function baselineOnline(?string $subject): int
    {
        $hour = (int) gmdate('G');
        $base = 900 + (int) round(sin(($hour / 24) * 2 * M_PI) * 180);
        if ($subject) {
            $base = (int) round($base * 0.35) + 8;
        }

        return max(12, $base);
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function buildAggregates(?string $subject, ?string $chapter, int $online, int $activeSubject): array
    {
        $todayStart = $this->dayStartMs();
        $q = DB::connection('iqmo')->table('live_activity_events')->where('created_at', '>=', $todayStart);
        if ($subject) {
            $q->where('subject', $subject);
        }
        $todayEvents = (int) $q->count();

        $out = [];
        if ($online > 0) {
            $out[] = [
                'type' => 'subject_active',
                'text' => 'Сейчас занимаются '.$this->fmtNum($online).' школьников',
                'icon' => '📘',
            ];
        }
        if ($subject && $activeSubject > 0) {
            $label = self::SUBJECT_LABELS[$subject] ?? $subject;
            $out[] = [
                'type' => 'subject_active',
                'text' => $this->fmtNum($activeSubject).' проходят '.$label.' сейчас',
                'icon' => '📘',
            ];
        }
        if ($todayEvents > 0) {
            $out[] = [
                'type' => 'aggregate',
                'text' => 'Сегодня '.$this->fmtNum(max($todayEvents, $activeSubject * 3)).' значимых событий на платформе',
                'icon' => '✨',
            ];
        }

        return $out;
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function systemEvents(?string $subject, int $online, int $activeSubject, int $activeChapter): array
    {
        $events = [];
        if ($online > 0) {
            $events[] = $this->formatSynthetic('subject_active', 'Сейчас занимаются '.$this->fmtNum($online).' школьников', null, 'system');
        }
        if ($subject && $activeSubject > 0) {
            $label = self::SUBJECT_LABELS[$subject] ?? $subject;
            $events[] = $this->formatSynthetic(
                'subject_active',
                $this->fmtNum($activeSubject).' учеников сейчас проходят '.$label,
                null,
                'system'
            );
        }
        if ($subject && $activeChapter > 0) {
            $events[] = $this->formatSynthetic(
                'chapter_started',
                $this->fmtNum($activeChapter).' ученика сейчас в этой главе',
                null,
                'system'
            );
        }

        return $events;
    }

    /**
     * @param  object|null  $row
     * @return array<string, mixed>
     */
    private function formatEvent($row): array
    {
        if (! $row) {
            return [];
        }
        $name = $this->displayName($row);
        $text = $this->buildText($row, $name);

        return [
            'id' => (string) $row->id,
            'type' => (string) $row->type,
            'text' => $text,
            'icon' => $this->iconForType((string) $row->type),
            'visibility' => (string) $row->visibility,
            'createdAt' => (int) $row->created_at,
            'ago' => $this->relativeAgo((int) $row->created_at),
            'subject' => $row->subject,
            'topic' => $row->topic,
            'chapter' => $row->chapter,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatSynthetic(string $type, string $text, ?string $subject, string $visibility): array
    {
        $now = $this->nowMs();

        return [
            'id' => 'sys-'.$type.'-'.$now,
            'type' => $type,
            'text' => $text,
            'icon' => $this->iconForType($type),
            'visibility' => $visibility,
            'createdAt' => $now,
            'ago' => 'сейчас',
            'subject' => $subject,
        ];
    }

    private function displayName(object $row): string
    {
        if ($row->visibility === 'public' && $row->public_name) {
            return (string) $row->public_name;
        }

        return 'Ученик';
    }

    private function buildText(object $row, string $name): string
    {
        $topic = $row->topic ? '«'.$row->topic.'»' : '';
        $chapter = $row->chapter ? 'главу '.$row->chapter : '';
        $badge = $row->badge_name ? '«'.$row->badge_name.'»' : '';

        return match ($row->type) {
            'topic_completed' => $name.' прошёл тему '.$topic,
            'chapter_started' => $name.' начал '.$chapter,
            'badge_earned' => $name.' получил бейдж '.$badge,
            'perfect_score' => $name.' закрыл мини-тест на 100%',
            'streak_saved' => $name.' сохранил серию '.(int) ($row->streak_days ?: 1).' дней',
            'level_up' => $name.' получил LVL '.(int) ($row->level ?: 1),
            'boss_completed' => $name.' победил босса '.$topic,
            'subject_active' => (string) ($row->count
                ? $this->fmtNum((int) $row->count).' учеников сейчас проходят '.(self::SUBJECT_LABELS[(string) $row->subject] ?? 'предмет')
                : 'Сейчас занимаются ученики на платформе'),
            'daily_goal_completed' => $name.' закрыл дневную цель',
            'league_rank_changed' => $name.' поднялся в топ-10 лиги',
            default => $name.' сделал шаг вперёд',
        };
    }

    private function iconForType(string $type): string
    {
        return match ($type) {
            'topic_completed' => '✅',
            'chapter_started' => '📘',
            'badge_earned' => '🏆',
            'perfect_score' => '⚡',
            'streak_saved' => '🔥',
            'level_up' => '⭐',
            'boss_completed' => '👑',
            'subject_active' => '📘',
            'daily_goal_completed' => '🎯',
            'league_rank_changed' => '👑',
            default => '✨',
        };
    }

    private function sanitizePublicName(string $name): string
    {
        $name = trim(preg_replace('/\s+/u', ' ', $name) ?? '');
        if ($name === '' || mb_strlen($name) > 32) {
            return self::SAFE_NAMES[array_rand(self::SAFE_NAMES)];
        }
        if (preg_match('/[@.]/', $name)) {
            return self::SAFE_NAMES[array_rand(self::SAFE_NAMES)];
        }

        return $name;
    }

    private function relativeAgo(int $ts): string
    {
        $diff = max(0, $this->nowMs() - $ts);
        if ($diff < 60 * 1000) {
            return 'только что';
        }
        if ($diff < 60 * 60 * 1000) {
            $m = (int) floor($diff / 60000);

            return $m.' мин назад';
        }

        return 'сегодня';
    }

    private function fmtNum(int $n): string
    {
        return number_format(max(0, $n), 0, '', "\u{00a0}");
    }

    private function nowMs(): int
    {
        return (int) floor(microtime(true) * 1000);
    }

    private function dayStartMs(): int
    {
        $d = new \DateTimeImmutable('today', new \DateTimeZone('Europe/Moscow'));

        return (int) ($d->getTimestamp() * 1000);
    }

    /**
     * @param  list<array<string, mixed>>  $events
     * @return list<array<string, mixed>>
     */
    private function dedupeEvents(array $events): array
    {
        $seen = [];
        $out = [];
        foreach ($events as $ev) {
            $key = ($ev['type'] ?? '').'|'.($ev['text'] ?? '');
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $out[] = $ev;
        }

        return $out;
    }
}
