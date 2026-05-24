<?php

declare(strict_types=1);

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$userId = (int) ($argv[1] ?? 68);
$row = Illuminate\Support\Facades\DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
if (!$row) {
    echo "no profile_state\n";
    exit(1);
}
$keys = json_decode($row->keys_json, true) ?: [];
for ($i = 1; $i <= 7; $i++) {
    $key = 'iqmo-bio-v-'.$i;
    echo $key.' '.(isset($keys[$key]) ? 'yes' : 'no')."\n";
}
