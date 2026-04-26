<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Чинит расхождение схемы `analytics_events` на проде.
 *
 * История бага:
 *   - Миграция 2026_04_26_120000_create_iqmo_analytics_events_table.php создала
 *     таблицу с колонкой `payload` (JSON).
 *   - Миграция 2026_04_27_120000_create_analytics_events_table.php должна была
 *     создать её с колонкой `payload_json`, но имеет ранний `if (hasTable) return`,
 *     поэтому на уже-инициализированных БД no-op'ится и оставляет неправильное имя.
 *   - Весь код (AnalyticsIngestController на запись, IqmoAdminOverviewBuilder на
 *     чтение, server/db/mysql.js, server/sql/mysql-schema.sql) использует
 *     `payload_json` — поэтому /api/admin/overview падал в 500 с
 *     "Unknown column 'payload_json' in 'field list'".
 *
 * Эта миграция приводит схему к каноническому виду на любом стартовом состоянии:
 *   - Таблицы нет → создать корректно (на случай свежего деплоя без Node-схемы).
 *   - Только `payload` → переименовать в `payload_json` с сохранением JSON NOT NULL.
 *   - Только `payload_json` → no-op (уже правильно).
 *   - Обе колонки (ручной хотфикс) → склеить данные, дропнуть старую.
 *
 * Bad migration файл удалён в этом же коммите, чтобы свежие установки не
 * повторили ошибку. Orphan-запись в таблице `migrations` на проде безвредна.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);
        $conn = DB::connection($this->connection);

        if (!$schema->hasTable('analytics_events')) {
            $schema->create('analytics_events', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('user_id');
                $table->unsignedBigInteger('occurred_at');
                $table->string('event', 64);
                $table->json('payload_json');
                $table->unsignedBigInteger('received_at');

                $table->index(['event', 'occurred_at'], 'idx_analytics_event_time');
                $table->index(['user_id', 'occurred_at'], 'idx_analytics_user_time');

                $table->foreign('user_id', 'fk_analytics_user')
                    ->references('id')->on('users')
                    ->onDelete('cascade');
            });
            return;
        }

        $hasPayload = $schema->hasColumn('analytics_events', 'payload');
        $hasPayloadJson = $schema->hasColumn('analytics_events', 'payload_json');

        if ($hasPayloadJson && !$hasPayload) {
            return;
        }

        if ($hasPayload && !$hasPayloadJson) {
            // CHANGE COLUMN сохраняет JSON-тип и NOT NULL без сюрпризов от Schema-builder'а.
            $conn->statement('ALTER TABLE `analytics_events` CHANGE COLUMN `payload` `payload_json` JSON NOT NULL');
            return;
        }

        if ($hasPayload && $hasPayloadJson) {
            // Edge case: кто-то руками добавил payload_json, но не дропнул старую.
            // Переливаем данные только в строки, где новая колонка пуста, чтобы не затереть
            // более свежие записи, которые мог писать AnalyticsIngestController.
            $conn->statement(
                'UPDATE `analytics_events`
                 SET `payload_json` = `payload`
                 WHERE `payload_json` IS NULL OR JSON_LENGTH(`payload_json`) = 0'
            );
            $conn->statement('ALTER TABLE `analytics_events` DROP COLUMN `payload`');
        }
    }

    public function down(): void
    {
        // Намеренно no-op: откат вернул бы баг с неправильным именем колонки.
    }
};
