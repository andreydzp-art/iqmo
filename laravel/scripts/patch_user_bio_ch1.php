<?php

declare(strict_types=1);

/**
 * Проставляет прохождение 7 вариантов биологии (глава 1) в profile_state.
 *
 * Запуск на VPS:
 *   php scripts/patch_user_bio_ch1.php 868
 *   php scripts/patch_user_bio_ch1.php --email=you@example.com
 */

use Illuminate\Support\Facades\DB;

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$userId = 0;
$email = null;

foreach (array_slice($argv, 1) as $arg) {
    if (str_starts_with($arg, '--email=')) {
        $email = substr($arg, 8);
    } elseif (ctype_digit($arg)) {
        $userId = (int) $arg;
    }
}

if ($userId <= 0 && $email) {
    $userId = (int) (DB::connection('iqmo')->table('users')->where('email', $email)->value('id') ?? 0);
}

if ($userId <= 0) {
    fwrite(STDERR, "Usage: php scripts/patch_user_bio_ch1.php <user_id>\n");
    fwrite(STDERR, "   or: php scripts/patch_user_bio_ch1.php --email=user@example.com\n");
    exit(1);
}

$row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
if (!$row) {
    $exists = DB::connection('iqmo')->table('users')->where('id', $userId)->exists();
    if (!$exists) {
        fwrite(STDERR, "ERROR: user_id={$userId} not found in users\n");
        exit(1);
    }
    $now = (int) (microtime(true) * 1000);
    DB::connection('iqmo')->table('profile_state')->insert([
        'user_id' => $userId,
        'keys_json' => '{}',
        'revision' => 0,
        'updated_at' => $now,
    ]);
    $row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
}

$existing = $row->keys_json;
if (is_string($existing)) {
    $decoded = json_decode($existing, true);
    $keys = is_array($decoded) ? $decoded : [];
} elseif (is_array($existing)) {
    $keys = $existing;
} else {
    $keys = [];
}

$now = (int) (microtime(true) * 1000);
$percents = [88, 92, 76, 85, 90, 72, 94];

for ($vid = 1; $vid <= 7; $vid++) {
    $pct = $percents[$vid - 1];
    $keys['iqmo-bio-v-'.$vid] = json_encode([
        'finished' => true,
        'part1Percent' => $pct,
        'percent' => $pct,
        'finishedAt' => $now - (7 - $vid) * 3600000,
        'attemptId' => 'patch-bio-v'.$vid.'-'.dechex($now),
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

$attempts = [];
for ($vid = 1; $vid <= 7; $vid++) {
    $attempts[(string) $vid] = [
        'attempts' => 0,
        'passedAt' => $now - (7 - $vid) * 3600000,
    ];
}
$keys['iqmo-bio-attempts'] = json_encode($attempts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$badgesRaw = $keys['iqmo-chem-badges-v1'] ?? null;
$badges = [];
if (is_string($badgesRaw)) {
    $badges = json_decode($badgesRaw, true) ?: [];
} elseif (is_array($badgesRaw)) {
    $badges = $badgesRaw;
}
if (!isset($badges['bio_stage1'])) {
    $badges['bio_stage1'] = $now;
    $keys['iqmo-chem-badges-v1'] = json_encode($badges, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

$keysJson = json_encode($keys, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$newRev = ((int) ($row->revision ?? 0)) + 1;

DB::connection('iqmo')->update(
    'UPDATE profile_state SET keys_json = CAST(? AS JSON), revision = ?, updated_at = ? WHERE user_id = ?',
    [$keysJson, $newRev, $now, $userId]
);

$userEmail = DB::connection('iqmo')->table('users')->where('id', $userId)->value('email');
echo "OK user_id={$userId} email={$userEmail} revision={$newRev} bio_variants=7/7\n";
