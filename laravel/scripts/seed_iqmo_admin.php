<?php

declare(strict_types=1);

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$email = 'admin@iqmo.local';
$password = 'admin12345';

$hash = Hash::make($password);
$now = (int) (microtime(true) * 1000);

$id = (int) (DB::connection('iqmo')->table('users')->where('email', $email)->value('id') ?? 0);
if ($id === 0) {
    $id = (int) DB::connection('iqmo')->table('users')->insertGetId([
        'email' => $email,
        'password_hash' => $hash,
        'created_at' => $now,
    ]);
}

DB::connection('iqmo')->statement(
    'INSERT IGNORE INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?, CAST(? AS JSON), 0, ?)',
    [$id, '{}', $now]
);

echo "IQMO admin user id: {$id}\n";
