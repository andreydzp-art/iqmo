<?php

declare(strict_types=1);

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$userId = (int) ($argv[1] ?? 68);
$mode = $argv[2] ?? 'recent';

if ($mode === 'scan') {
    $rows = Illuminate\Support\Facades\DB::connection('iqmo')->select(
        'SELECT id, revision, created_at FROM profile_history WHERE user_id = ? ORDER BY id ASC',
        [$userId]
    );
    $firstBio = null;
    $lastNoBio = null;
    foreach ($rows as $r) {
        $hist = Illuminate\Support\Facades\DB::connection('iqmo')->table('profile_history')->where('id', $r->id)->first();
        $keys = json_decode($hist->keys_json ?? '{}', true) ?: [];
        $bio = 0;
        foreach ($keys as $k => $_) {
            if (is_string($k) && str_starts_with($k, 'iqmo-bio-v-')) {
                $bio++;
            }
        }
        if ($bio > 0 && $firstBio === null) {
            $firstBio = ['id' => $r->id, 'rev' => $r->revision, 'bio' => $bio, 'at' => $r->created_at];
        }
        if ($bio === 0) {
            $lastNoBio = ['id' => $r->id, 'rev' => $r->revision, 'at' => $r->created_at];
        }
    }
    echo 'total history: '.count($rows)."\n";
    echo 'last_no_bio: '.json_encode($lastNoBio, JSON_UNESCAPED_UNICODE)."\n";
    echo 'first_bio: '.json_encode($firstBio, JSON_UNESCAPED_UNICODE)."\n";
    exit(0);
}

$limit = (int) ($mode ?: 30);
$offset = (int) ($argv[3] ?? 0);
$rows = Illuminate\Support\Facades\DB::connection('iqmo')->select(
    'SELECT id, revision, created_at, CHAR_LENGTH(CAST(keys_json AS CHAR)) AS bytes FROM profile_history WHERE user_id = ? ORDER BY id DESC LIMIT '.$limit.' OFFSET '.$offset,
    [$userId]
);

echo "history rows: ".count($rows)."\n";
foreach ($rows as $r) {
    $hist = Illuminate\Support\Facades\DB::connection('iqmo')->table('profile_history')->where('id', $r->id)->first();
    $keys = json_decode($hist->keys_json ?? '{}', true) ?: [];
    $bio = 0;
    foreach ($keys as $k => $_) {
        if (is_string($k) && str_starts_with($k, 'iqmo-bio-v-')) {
            $bio++;
        }
    }
    echo "#{$r->id} rev={$r->revision} bytes={$r->bytes} bio_v_keys={$bio} at={$r->created_at}\n";
}
