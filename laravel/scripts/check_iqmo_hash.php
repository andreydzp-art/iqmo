<?php

declare(strict_types=1);

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$row = DB::connection('iqmo')->table('users')->where('email', 'admin@iqmo.local')->first();
if (!$row) {
    echo "no user\n";
    exit(1);
}

var_export([
    'id' => (int) $row->id,
    'check' => Hash::check('admin12345', (string) $row->password_hash),
]);

echo "\n";
