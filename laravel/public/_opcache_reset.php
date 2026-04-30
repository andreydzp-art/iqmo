<?php

// Stand-alone opcache reset endpoint. Намеренно НЕ через Laravel-роут,
// потому что `routes/web.php` лежит в opcache и любой новый роут в нём
// невидим до самого первого сброса opcache (chicken-and-egg).
//
// Этот файл существует как «точка разрыва»: после `git reset --hard` файл
// — новый для opcache, исполняется напрямую через nginx → PHP-FPM.
//
// Авторизация: пускаем только loopback или совпадающий заголовок секрета.
// Сам по себе сброс opcache ничего из приложения не раскрывает.

declare(strict_types=1);

$remote = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
$secret = (string) (getenv('IQMO_DEPLOY_SECRET') ?: '');
$given = (string) ($_SERVER['HTTP_X_DEPLOY_SECRET'] ?? '');
$loopback = in_array($remote, ['127.0.0.1', '::1', '::ffff:127.0.0.1'], true);
$secretOk = $secret !== '' && hash_equals($secret, $given);

header('Content-Type: application/json');

if (! $loopback && ! $secretOk) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'reason' => 'forbidden', 'remote' => $remote]);
    exit;
}

if (! function_exists('opcache_reset')) {
    echo json_encode(['ok' => false, 'reason' => 'opcache_unavailable']);
    exit;
}

$ok = opcache_reset();
echo json_encode([
    'ok' => (bool) $ok,
    'remote' => $remote,
    'usedSecret' => $secretOk,
    'cachedAt' => time(),
]);
