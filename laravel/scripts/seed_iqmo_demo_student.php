<?php

declare(strict_types=1);

/**
 * Демо-ученик IQMO — обёртка над Database\Seeders\IqmoDemoStudentSeeder.
 *
 * Запуск: php scripts/seed_iqmo_demo_student.php
 */

use Database\Seeders\IqmoDemoStudentSeeder;

require __DIR__.'/../vendor/autoload.php';

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

(new IqmoDemoStudentSeeder)->run();

echo 'Готово. Вход: '.IqmoDemoStudentSeeder::EMAIL.' / '.IqmoDemoStudentSeeder::PASSWORD."\n";
echo "Откройте /login.html на том же хосте, что и API, затем /profile/ (кабинет).\n";
