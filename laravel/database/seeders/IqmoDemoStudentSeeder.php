<?php

namespace Database\Seeders;

use DateTimeImmutable;
use DateTimeZone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Демо-ученик IQMO (connection `iqmo`): известный email/пароль и заполненный profile_state (ключи iqmo-chem-*).
 */
class IqmoDemoStudentSeeder extends Seeder
{
    public const EMAIL = 'student@iqmo.demo';

    public const PASSWORD = 'demo12345';

    public function run(): void
    {
        $email = self::EMAIL;
        $password = self::PASSWORD;

        $now = (int) (microtime(true) * 1000);
        $hash = Hash::make($password);

        $id = (int) (DB::connection('iqmo')->table('users')->where('email', $email)->value('id') ?? 0);
        if ($id === 0) {
            $id = (int) DB::connection('iqmo')->table('users')->insertGetId([
                'email' => $email,
                'password_hash' => $hash,
                'created_at' => $now,
            ]);
        } else {
            DB::connection('iqmo')->table('users')->where('id', $id)->update([
                'password_hash' => $hash,
            ]);
        }

        $dLocal = new DateTimeImmutable('@'.(int) floor($now / 1000));
        $today = $dLocal->format('Y-n-j');
        $weekKey = self::iqmoWeekKeyFromMillis($now);

        $keys = [
            'iqmo-chem-anon-id' => json_encode('demo-anon-'.substr(sha1($email), 0, 12), JSON_UNESCAPED_UNICODE),
            'iqmo-chem-progress-points-v1' => json_encode(920, JSON_UNESCAPED_UNICODE),
            'iqmo-chem-streak' => json_encode(['days' => 5, 'lastDay' => $today], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-attempt-stats-v1' => json_encode([
                'warmup' => 8,
                'quick' => 6,
                'trial' => 3,
                'full' => 2,
                'other' => 0,
            ], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-total-active-ms-v1' => json_encode(2_700_000, JSON_UNESCAPED_UNICODE),
            'iqmo-chem-total-tasks-v1' => json_encode(47, JSON_UNESCAPED_UNICODE),
            'iqmo-chem-badges-v1' => json_encode([
                'welcome' => $now - 86400000 * 5,
                'ten_tests' => $now - 86400000 * 2,
            ], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-weekly-points-v1' => json_encode([$weekKey => 120], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-daily-v1' => json_encode([
                'day' => $today,
                'tasksDone' => 4,
                'points' => 35,
            ], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-daily-goal-v1' => json_encode(['type' => 'tasks', 'target' => 10], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-prep-stage-v1' => json_encode(['level' => 7, 'updatedAt' => $now], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-activity-v2' => json_encode([
                'visitXp' => true,
                'chunksToday' => 3,
                'lastBeat' => $now,
                'day' => $today,
            ], JSON_UNESCAPED_UNICODE),
            'iqmo-chem-topic01-subtopics' => json_encode([2, 2, 2, 2, 2, 2], JSON_UNESCAPED_UNICODE),
        ];

        $keysJson = json_encode($keys, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $updated = DB::connection('iqmo')->update(
            'UPDATE profile_state SET keys_json = CAST(? AS JSON), revision = revision + 1, updated_at = ? WHERE user_id = ?',
            [$keysJson, $now, $id]
        );
        if ($updated === 0) {
            DB::connection('iqmo')->statement(
                'INSERT INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?, CAST(? AS JSON), 1, ?)',
                [$id, $keysJson, $now]
            );
        }

        if ($this->command) {
            $this->command->info("IQMO demo student: id={$id}, email={$email}, password={$password}");
        }
    }

    /** Как `weekKey()` в `extracted/chem-progress.js` (локальный календарь → UTC midnight). */
    private static function iqmoWeekKeyFromMillis(int $millis): string
    {
        $sec = intdiv($millis, 1000);
        $dl = new DateTimeImmutable('@'.$sec);
        $y = (int) $dl->format('Y');
        $m0 = (int) $dl->format('n') - 1;
        $day = (int) $dl->format('j');
        $utcMid = gmmktime(0, 0, 0, $m0 + 1, $day, $y);
        $date = new DateTimeImmutable('@'.$utcMid, new DateTimeZone('UTC'));
        $dow = (int) $date->format('w');
        $dowIso = $dow === 0 ? 7 : $dow;
        $date = $date->modify((4 - $dowIso).' days');
        $yearStart = new DateTimeImmutable($date->format('Y').'-01-01 00:00:00', new DateTimeZone('UTC'));
        $diffDays = ($date->getTimestamp() - $yearStart->getTimestamp()) / 86400;
        $weekNo = (int) ceil(($diffDays + 1) / 7);

        return $date->format('Y').'-W'.str_pad((string) $weekNo, 2, '0', STR_PAD_LEFT);
    }
}
