<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Добавляет `token_version` в iqmo.users — основу для JWT-revocation
 * (audit #3). После выпуска JWT с конкретным `tv` middleware
 * AuthenticateIqmoJwt сравнивает его с текущим значением в БД. Любой
 * INCREMENT этой колонки (POST /api/auth/logout-everywhere, сброс
 * пароля в будущем) мгновенно делает все ранее выпущенные JWT
 * этого пользователя невалидными.
 *
 * DEFAULT 1 — все существующие сессии остаются живыми после деплоя:
 * verifу() возвращает tv=1 для старых JWT (где этого поля в payload
 * нет вообще), что совпадает с дефолтом в БД. Никого принудительно
 * не разлогинивает.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        if (!$schema->hasTable('users')) {
            // На свежей инсталляции ensureSchema (Node) или
            // mysql-schema.sql создадут users с колонкой сразу.
            return;
        }
        if ($schema->hasColumn('users', 'token_version')) {
            return;
        }

        $schema->table('users', function (Blueprint $table): void {
            $table->unsignedInteger('token_version')->default(1)->after('password_hash');
        });
    }

    public function down(): void
    {
        $schema = Schema::connection($this->connection);
        if ($schema->hasTable('users') && $schema->hasColumn('users', 'token_version')) {
            $schema->table('users', function (Blueprint $table): void {
                $table->dropColumn('token_version');
            });
        }
    }
};
