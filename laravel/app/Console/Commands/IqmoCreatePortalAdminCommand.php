<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * Создаёт пользователя в БД IQMO (connection `iqmo`) для входа на /login.html.
 * Доступ к /admin/* дополнительно требует IQMO_ADMIN_EMAILS в .env (тот же email).
 */
final class IqmoCreatePortalAdminCommand extends Command
{
    protected $signature = 'iqmo:create-admin
                            {email : Email для портала (в нижнем регистре)}
                            {--password= : Пароль; если не указан — сгенерировать}
                            {--reset : Обновить пароль, если пользователь уже есть}';

    protected $description = 'Создать (или сбросить пароль) пользователя IQMO-портала и напомнить про IQMO_ADMIN_EMAILS';

    public function handle(): int
    {
        $raw = trim((string) $this->argument('email'));
        $email = strtolower($raw);
        if ($email === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Укажите корректный email.');

            return self::FAILURE;
        }

        $password = (string) ($this->option('password') ?? '');
        if ($password === '') {
            $password = Str::password(18);
            $this->warn('Сгенерирован пароль (сохраните в менеджер секретов):');
            $this->line($password);
        }
        if (strlen($password) < 8) {
            $this->error('Пароль не короче 8 символов.');

            return self::FAILURE;
        }

        $now = (int) (microtime(true) * 1000);
        $hash = Hash::make($password);

        $id = (int) (DB::connection('iqmo')->table('users')->where('email', $email)->value('id') ?? 0);

        if ($id !== 0 && ! $this->option('reset')) {
            $this->error("Пользователь уже есть (id {$id}). Добавьте --reset чтобы сменить пароль.");

            return self::FAILURE;
        }

        if ($id === 0) {
            $id = (int) DB::connection('iqmo')->table('users')->insertGetId([
                'email' => $email,
                'password_hash' => $hash,
                'created_at' => $now,
            ]);
            $this->info("Создан пользователь IQMO: id={$id}, email={$email}");
        } else {
            DB::connection('iqmo')->table('users')->where('id', $id)->update([
                'password_hash' => $hash,
            ]);
            $this->info("Обновлён пароль для id={$id}, email={$email}");
        }

        DB::connection('iqmo')->statement(
            'INSERT IGNORE INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?, CAST(? AS JSON), 0, ?)',
            [$id, '{}', $now]
        );

        $this->newLine();
        $this->comment('Вход на сайте: /login.html с этим email и паролем.');
        $this->comment('Чтобы открыть /admin/*, в .env на сервере должен быть allowlist:');
        $this->line('IQMO_ADMIN_EMAILS='.$email);
        $this->newLine();
        $this->comment('После правки .env: php artisan optimize:clear');

        return self::SUCCESS;
    }
}
