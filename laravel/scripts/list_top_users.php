<?php

declare(strict_types=1);

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$rows = Illuminate\Support\Facades\DB::connection('iqmo')->select(
    "SELECT u.id, u.email,
            COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(ps.keys_json, '$.\"iqmo-chem-progress-points-v1\"')) AS UNSIGNED), 0) AS xp
     FROM users u
     LEFT JOIN profile_state ps ON ps.user_id = u.id
     ORDER BY xp DESC, u.id ASC
     LIMIT 10"
);

foreach ($rows as $r) {
    echo $r->id.' '.$r->xp.' '.$r->email.PHP_EOL;
}
