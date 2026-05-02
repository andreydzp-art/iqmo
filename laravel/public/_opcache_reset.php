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
//
// Источники секрета (по убыванию приоритета):
//   1. ENV IQMO_DEPLOY_SECRET — если выставлено явно;
//   2. APP_KEY из .env — fallback для VPS, где отдельный секрет не
//      настраивали. Deploy-скрипт читает .env через ssh и передаёт
//      APP_KEY как X-Deploy-Secret. Это безопасно: APP_KEY уже на
//      VPS и не уезжает наружу — мы просто проверяем match.
// Loopback тоже принимается, но на VPS за nginx с real_ip_header
// X-Forwarded-For REMOTE_ADDR может оказаться публичным IP клиента —
// тогда в дело идёт secret-ветка.

declare(strict_types=1);

$remote = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
$secret = (string) (getenv('IQMO_DEPLOY_SECRET') ?: '');
if ($secret === '') {
    $envPath = __DIR__.'/../.env';
    if (is_readable($envPath)) {
        $lines = @file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        foreach ($lines as $line) {
            if (preg_match('/^\s*APP_KEY\s*=\s*(.+?)\s*$/', $line, $m)) {
                $secret = trim($m[1], "\"' \t");
                break;
            }
        }
    }
}
$given = (string) ($_SERVER['HTTP_X_DEPLOY_SECRET'] ?? '');
$loopback = in_array($remote, ['127.0.0.1', '::1', '::ffff:127.0.0.1'], true);
$secretOk = $secret !== '' && $given !== '' && hash_equals($secret, $given);

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
