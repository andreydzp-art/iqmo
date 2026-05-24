<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Порт ключевой математики из extracted/chem-progress.js для серверной
 * сборки публичного профиля (уровни, звёзды карты).
 */
final class IqmoGamificationMath
{
    public const MAX_LEVEL = 50;

    /** @var list<int> */
    private static ?array $levelMinXp = null;

    /** @var list<string> */
    private const LEVEL_TITLES_RU = [
        '',
        'Новик', 'Ученик', 'Старт', 'Вход', 'Игрок',
        'Путь', 'Режим', 'Темп', 'Рывок', 'Сдвиг',
        'Контур', 'Баланс', 'Фокус', 'Ритм', 'Поток',
        'Вектор', 'Захват', 'Синхр', 'Навык', 'Драйв',
        'Точность', 'Расчёт', 'Логика', 'Система', 'Контроль',
        'Сборка', 'Предел', 'Опора', 'Сигнал', 'Ядро',
        'Влияние', 'Давление', 'Чтение', 'Прорыв', 'Захват',
        'Напор', 'Разбор', 'Анализ', 'Вынос', 'Штурм',
        'Элита', 'Мастер', 'Эксперт', 'Профи', 'Титан',
        'Вершина', 'Лидер', 'Легенд', 'Абсолют', 'Пик',
    ];

    /** @return list<int> */
    public static function levelMinXp(): array
    {
        if (self::$levelMinXp !== null) {
            return self::$levelMinXp;
        }

        $arr = [0];
        $cum = 0;
        for ($k = 1; $k < self::MAX_LEVEL; $k++) {
            $step = (int) ceil(22 * ($k ** 1.37));
            $cum += $step;
            $arr[] = $cum;
        }

        self::$levelMinXp = $arr;

        return $arr;
    }

    public static function levelTitleRu(int $level): string
    {
        $l = min(self::MAX_LEVEL, max(1, $level));

        return self::LEVEL_TITLES_RU[$l] ?? 'Новик';
    }

    /**
     * @return array{
     *   current: int,
     *   minXpThisLevel: int,
     *   nextThreshold: ?int,
     *   xpInLevel: int,
     *   xpToNext: int,
     *   progressFrac: float,
     *   maxLevel: int
     * }
     */
    public static function computeLevelDetail(int $totalPoints): array
    {
        $xp = max(0, $totalPoints);
        $thresholds = self::levelMinXp();
        $current = 1;
        for ($i = 1; $i < self::MAX_LEVEL; $i++) {
            if ($xp >= $thresholds[$i]) {
                $current = $i + 1;
            } else {
                break;
            }
        }

        $minXpThisLevel = $thresholds[$current - 1];
        $nextThreshold = $current < self::MAX_LEVEL ? $thresholds[$current] : null;
        $xpInLevel = $xp - $minXpThisLevel;
        $span = $nextThreshold !== null ? $nextThreshold - $minXpThisLevel : 0;
        $xpToNext = $nextThreshold !== null ? max(0, $nextThreshold - $xp) : 0;
        $progressFrac = $nextThreshold !== null && $span > 0
            ? min(1.0, max(0.0, $xpInLevel / $span))
            : 1.0;

        return [
            'current' => $current,
            'minXpThisLevel' => $minXpThisLevel,
            'nextThreshold' => $nextThreshold,
            'xpInLevel' => $xpInLevel,
            'xpToNext' => $xpToNext,
            'progressFrac' => $progressFrac,
            'maxLevel' => self::MAX_LEVEL,
        ];
    }

    public static function starsForPercent(int $percent): int
    {
        if ($percent >= 90) {
            return 3;
        }
        if ($percent >= 70) {
            return 2;
        }
        if ($percent >= 50) {
            return 1;
        }

        return 0;
    }

    public static function parseProfileUserId(string $profileId): ?int
    {
        $profileId = trim($profileId);
        if (preg_match('/^IQ-(\d+)$/i', $profileId, $m)) {
            $uid = (int) $m[1];

            return $uid > 0 ? $uid : null;
        }

        return null;
    }

    public static function formatProfileId(int $userId): string
    {
        return 'IQ-'.str_pad((string) $userId, 4, '0', STR_PAD_LEFT);
    }

    public static function displayNameFromEmail(string $email): string
    {
        $local = explode('@', strtolower(trim($email)), 2)[0] ?? '';
        $local = trim(preg_replace('/[._-]+/', ' ', $local) ?? '');
        if ($local === '') {
            return 'Ученик IQMO';
        }

        $parts = preg_split('/\s+/', $local) ?: [];
        $out = [];
        foreach ($parts as $w) {
            if ($w === '') {
                continue;
            }
            $out[] = mb_strtoupper(mb_substr($w, 0, 1)).mb_strtolower(mb_substr($w, 1));
        }

        return $out !== [] ? implode(' ', $out) : 'Ученик IQMO';
    }

    public static function initialsFromName(string $name): string
    {
        $parts = array_values(array_filter(preg_split('/\s+/', trim($name)) ?: []));
        if ($parts === []) {
            return 'IQ';
        }
        if (count($parts) === 1) {
            return mb_strtoupper(mb_substr($parts[0], 0, 2));
        }

        return mb_strtoupper(mb_substr($parts[0], 0, 1).mb_substr($parts[1], 0, 1));
    }
}
