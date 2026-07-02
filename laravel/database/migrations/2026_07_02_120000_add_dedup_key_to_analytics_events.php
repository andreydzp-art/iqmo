<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Идемпотентность iqmo.purchase (audit E7).
 *
 * Событие покупки идёт через POST /api/analytics/events. Раньше вставка не
 * была защищена от повтора: сбой БД → 500 → клиент ретраит → дубль строки
 * purchase, и в админ-аналитике выручка задваивается (уникального ключа не
 * было).
 *
 * Добавляем nullable `dedup_key` (= purchaseId для покупок, NULL для всех
 * прочих событий) и UNIQUE(user_id, dedup_key). Несколько NULL в рамках
 * одного user_id допускаются и в MySQL, и в sqlite, поэтому не-покупки
 * (dedup_key IS NULL) не конфликтуют и пишутся как раньше; уникальны только
 * покупки одного пользователя. Контроллер вставляет через insertOrIgnore —
 * повтор молча отбрасывается на уровне БД (без гонки check-then-insert).
 *
 * Скоуп (user_id, dedup_key), а не глобальный: purchaseId сейчас приходит от
 * клиента (реальный шлюз на паузе), и глобальный UNIQUE позволил бы одному
 * клиенту «занять» чужой id. Ретрай — сценарий в рамках одного юзера.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        if (! $schema->hasTable('analytics_events')) {
            return;
        }
        if ($schema->hasColumn('analytics_events', 'dedup_key')) {
            return;
        }

        $schema->table('analytics_events', function (Blueprint $table): void {
            // `after` игнорируется на sqlite (тесты) — там позиция не важна.
            $table->string('dedup_key', 64)->nullable()->after('event');
            $table->unique(['user_id', 'dedup_key'], 'uq_analytics_user_dedup');
        });
    }

    public function down(): void
    {
        $schema = Schema::connection($this->connection);

        if (! $schema->hasTable('analytics_events') || ! $schema->hasColumn('analytics_events', 'dedup_key')) {
            return;
        }

        $schema->table('analytics_events', function (Blueprint $table): void {
            $table->dropUnique('uq_analytics_user_dedup');
            $table->dropColumn('dedup_key');
        });
    }
};
