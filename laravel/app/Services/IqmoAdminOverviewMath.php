<?php

declare(strict_types=1);

namespace App\Services;

/**
 * Чистая математика и форматирование для админ-дашборда.
 *
 * Вынесено из `IqmoAdminOverviewBuilder` ровно для одного: чтобы эти
 * правила (медианы, группировка сессий, пороги топа вопросов, правила
 * округления процентов воронки, форматирование длительностей) можно
 * было покрывать unit-тестами без поднятия БД и Laravel-контейнера.
 *
 * Класс — только публичные статики, без состояния. Любая функция,
 * которая ходит в `DB::connection(...)`, остаётся в Builder; всё, что
 * считается «над уже выгруженными строками», живёт здесь.
 *
 * Если меняешь любое из правил ниже — исправь и тесты в
 * `tests/Unit/IqmoAdminOverviewMathTest.php`. Молчаливое расхождение
 * с тестами означает, что у админа поедут KPI на проде.
 */
final class IqmoAdminOverviewMath
{
    /** Стандартный порог разрыва сессии (как у GA): 30 минут в миллисекундах. */
    public const SESSION_GAP_MS = 30 * 60_000;

    /** Минимальная длительность сессии — иначе считаем дублем в одну секунду. */
    public const SESSION_MIN_MS = 5_000;

    /** Sane-cap длительности теста: дольше 4 ч — это либо забытый таб, либо мусор. */
    public const TIME_IN_TEST_MAX_MS = 4 * 60 * 60_000;

    /** Минимум показов для попадания в «Топ ошибок» при коротком окне (≤ 1 дн.). */
    public const TOP_QUESTIONS_MIN_SHOWS_SHORT = 3;

    /** Минимум показов в окнах 7/14/30 дней. */
    public const TOP_QUESTIONS_MIN_SHOWS_DEFAULT = 4;

    /** Порог «красной» отметки в Топ ошибок: ≥ 55 % неправильных при достаточном n. */
    public const TOP_QUESTIONS_FLAG_WRONG_PCT = 55;

    /**
     * Медиана списка чисел. Возвращает null на пустом списке (а не 0 —
     * чтобы наверху можно было различить «нет данных» и «все нули»,
     * это управляет показом «—» vs «0 с» в KPI).
     *
     * @param  list<int>|list<float>  $values
     */
    public static function median(array $values): ?float
    {
        $n = count($values);
        if ($n === 0) {
            return null;
        }
        sort($values);
        $mid = (int) floor($n / 2);
        if ($n % 2 === 1) {
            return (float) $values[$mid];
        }

        return ((float) $values[$mid - 1] + (float) $values[$mid]) / 2.0;
    }

    /**
     * Группировка событий в сессии. Вход — строки, **уже отсортированные**
     * по `(user_id, occurred_at)` (нам нужно, чтобы события одного юзера
     * шли подряд по времени). Каждая строка — объект с полями `user_id`
     * и `occurred_at`, формат как у `DB::table()->get(['user_id','occurred_at'])`.
     *
     * Возвращаем длительности (last − start) в мс для сессий, удовлетворяющих:
     *   - ≥ 2 события (одинокие ивенты дают 0 c и тащат медиану в пол),
     *   - длительность ≥ `$minDurationMs` (фильтр от 0-секундных дублей).
     *
     * Разрывов в сессии больше `$gapMs` — открываем новую сессию.
     *
     * @param  iterable<int, object{user_id: int|string, occurred_at: int|string}>  $rowsSortedByUserAndTime
     * @return list<int>
     */
    public static function groupSessionDurations(
        iterable $rowsSortedByUserAndTime,
        int $gapMs = self::SESSION_GAP_MS,
        int $minDurationMs = self::SESSION_MIN_MS,
    ): array {
        $durations = [];

        $curUid = null;
        $curStart = 0;
        $curLast = 0;
        $curEvents = 0;

        $finalize = static function () use (
            &$curStart, &$curLast, &$curEvents, &$durations, $minDurationMs
        ): void {
            if ($curEvents >= 2) {
                $d = $curLast - $curStart;
                if ($d >= $minDurationMs) {
                    $durations[] = $d;
                }
            }
            $curStart = 0;
            $curLast = 0;
            $curEvents = 0;
        };

        foreach ($rowsSortedByUserAndTime as $row) {
            $uid = (int) $row->user_id;
            $ts = (int) $row->occurred_at;

            if ($curUid !== $uid) {
                $finalize();
                $curUid = $uid;
                $curStart = $ts;
                $curLast = $ts;
                $curEvents = 1;
                continue;
            }
            if ($ts - $curLast > $gapMs) {
                $finalize();
                $curStart = $ts;
                $curLast = $ts;
                $curEvents = 1;
                continue;
            }
            $curLast = $ts;
            $curEvents++;
        }
        $finalize();

        return $durations;
    }

    /**
     * Топ «трудных» вопросов из сырых строк `chem.attempt_complete`.
     *
     * Каждая строка — объект с полем `payload_json` (string или array).
     * Внутри payload ожидается список `items[]` с `qid` и булевым `ok`
     * (true → правильно). Что не парсится — просто пропускаем.
     *
     * Правила (хардкод констант — менять с одновременной правкой тестов):
     *   - qid > 64 символов или пустой — отбрасываем (защита от мусора);
     *   - в выдачу попадают только вопросы с показами ≥ `$minShows`;
     *   - флаг `flag = true` ставится при ≥ `TOP_QUESTIONS_FLAG_WRONG_PCT` % ошибок
     *     **и** показов ≥ `$minShows` (иначе один промах создавал бы 100% ошибок);
     *   - сортировка: сначала по wrongPct DESC, при равенстве — по shows DESC;
     *   - возвращаем максимум 15 элементов.
     *
     * @param  iterable<int, object{payload_json: mixed}>  $rows
     * @return list<array{qid: string, topic: string, wrongPct: int, shows: int, avgSec: string, flag: bool}>
     */
    public static function aggregateTopQuestions(iterable $rows, int $minShows): array
    {
        /** @var array<string, array{n: int, w: int}> $acc */
        $acc = [];

        foreach ($rows as $row) {
            $raw = $row->payload_json ?? null;
            if (is_string($raw)) {
                $p = json_decode($raw, true);
            } elseif (is_array($raw)) {
                $p = $raw;
            } else {
                continue;
            }
            if (! is_array($p) || empty($p['items']) || ! is_array($p['items'])) {
                continue;
            }
            foreach ($p['items'] as $it) {
                if (! is_array($it) || ! isset($it['qid'])) {
                    continue;
                }
                $qid = (string) $it['qid'];
                if ($qid === '' || strlen($qid) > 64) {
                    continue;
                }
                if (! isset($acc[$qid])) {
                    $acc[$qid] = ['n' => 0, 'w' => 0];
                }
                $acc[$qid]['n']++;
                if (empty($it['ok'])) {
                    $acc[$qid]['w']++;
                }
            }
        }

        $out = [];
        foreach ($acc as $qid => $st) {
            $n = $st['n'];
            if ($n < $minShows) {
                continue;
            }
            $w = $st['w'];
            $wrongPct = $n > 0 ? (int) round(100.0 * $w / $n) : 0;
            $out[] = [
                'qid' => $qid,
                'topic' => 'Химия ОГЭ',
                'wrongPct' => $wrongPct,
                'shows' => $n,
                'avgSec' => '—',
                'flag' => $wrongPct >= self::TOP_QUESTIONS_FLAG_WRONG_PCT && $n >= $minShows,
            ];
        }

        usort($out, static function (array $a, array $b): int {
            if ($a['wrongPct'] !== $b['wrongPct']) {
                return $b['wrongPct'] <=> $a['wrongPct'];
            }

            return $b['shows'] <=> $a['shows'];
        });

        return array_slice($out, 0, 15);
    }

    /**
     * Минимум показов для попадания в Топ ошибок в зависимости от окна.
     * Логика «короткое окно — низкий порог» оставлена ради того, чтобы
     * даже за 24 ч было видно, какие qid стабильно проваливаются.
     */
    public static function topQuestionsMinShows(int $days): int
    {
        return $days <= 1 ? self::TOP_QUESTIONS_MIN_SHOWS_SHORT : self::TOP_QUESTIONS_MIN_SHOWS_DEFAULT;
    }

    /**
     * «Старая» воронка по снимкам profile_state — фолбэк, когда событий ещё нет.
     *
     * @return list<array{step: string, users: int, pct: float}>
     */
    public static function buildLegacyFunnel(
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

    /**
     * Воронка по событиям: total → topic_view → attempt_start → attempt_complete → mistakes.
     *
     * @param  array{view: int, start: int, complete: int}  $ev
     * @return list<array{step: string, users: int, pct: float}>
     */
    public static function buildEventFunnel(int $totalUsers, array $ev, int $mistakeUsers, int $days): array
    {
        if ($totalUsers < 1) {
            return [['step' => 'Пока нет пользователей', 'users' => 0, 'pct' => 0.0]];
        }

        $pct = static fn (int $n): float => round(100.0 * $n / max(1, $totalUsers), 1);
        $win = $days === 1 ? '24 ч' : $days.' дн.';

        return [
            ['step' => 'Аккаунтов в базе', 'users' => $totalUsers, 'pct' => 100.0],
            ['step' => 'Просмотрели тему ('.$win.')', 'users' => $ev['view'], 'pct' => $pct($ev['view'])],
            ['step' => 'Начали тест ('.$win.')', 'users' => $ev['start'], 'pct' => $pct($ev['start'])],
            ['step' => 'Завершили тест ('.$win.')', 'users' => $ev['complete'], 'pct' => $pct($ev['complete'])],
            ['step' => 'С непустым банком ошибок', 'users' => $mistakeUsers, 'pct' => $pct($mistakeUsers)],
        ];
    }

    /**
     * Форматирование длительности в человекочитаемый русский формат.
     * Граничные случаи (которые KPI могут показать админу):
     *   0 → «0 с», 59999 → «60 с», 60000 → «1 мин», 3599999 → «60 мин»,
     *   3600000 → «1 ч», 86400000 → «24 ч».
     */
    public static function formatDuration(int $ms): string
    {
        $s = max(0, (int) round($ms / 1000));
        if ($s < 60) {
            return $s.' с';
        }
        if ($s < 3600) {
            $m = (int) floor($s / 60);
            $sr = $s - $m * 60;

            return $sr === 0 ? $m.' мин' : $m.' мин '.$sr.' с';
        }
        $h = (int) floor($s / 3600);
        $m = (int) floor(($s - $h * 3600) / 60);

        return $m === 0 ? $h.' ч' : $h.' ч '.$m.' мин';
    }

    /**
     * Целое число с разделителями групп — узким неразрывным пробелом
     * (U+202F NARROW NO-BREAK SPACE). Именно его HTML/Метрика рендерят
     * корректно, в отличие от обычного пробела (переносится на конце строки)
     * или U+00A0 (слишком широкий).
     */
    public static function formatInt(int $n): string
    {
        $n = max(0, $n);

        return (string) number_format($n, 0, ',', "\u{202F}");
    }

    /**
     * Универсальная распаковка `keys_json` из `profile_state`. Ожидаем строку
     * с JSON-объектом, но защищаемся от трёх форм, которые наблюдаем в БД:
     *   - `null` / пустая строка → `[]` (валидно: профиль ещё не пушил данные);
     *   - уже-распарсенный массив (PDO с json-cast или fixture в тесте);
     *   - `stdClass` (drivers без json-cast, но с decode в объект).
     * Любая некорректная JSON-строка → `[]` без падения, чтобы один битый
     * профиль не уронил всю агрегацию.
     *
     * @return array<string, mixed>
     */
    public static function decodeKeys(mixed $raw): array
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
