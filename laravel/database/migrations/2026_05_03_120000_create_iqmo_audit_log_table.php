<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Audit-log авторизационных и админских действий (audit #12).
 *
 * Назначение:
 *   • compliance / расследования: «кто и когда залогинился, удалил
 *     аккаунт, сделал logout-everywhere, попал в /admin/»;
 *   • forensic-trail при подозрении на компрометацию: можно увидеть
 *     IP/User-Agent и сравнить с обычным паттерном юзера;
 *   • ФЗ-152: фиксация фактов обработки PII (создание/удаление аккаунта).
 *
 * НЕ заменяет analytics_events: тот сохраняет продуктовую телеметрию
 * (тесты, ошибки в вопросах, фуннел) — здесь чисто security-events.
 *
 * actor_user_id nullable, потому что некоторые события (failed login,
 * account_delete после момента стирания users-row) могут не иметь
 * валидного user_id; actor_email сохраняем как «лучшее, что у нас есть»
 * — он по любой колонке имеет смысл при ручном запросе.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        if ($schema->hasTable('audit_log')) {
            return;
        }

        $schema->create('audit_log', function (Blueprint $table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('actor_user_id')->nullable();
            $table->string('actor_email', 320)->nullable();
            // Имя действия — короткий dotted-namespace код:
            //   auth.register | auth.login | auth.logout |
            //   auth.logout_everywhere | auth.account_delete |
            //   admin.access
            $table->string('action', 64);
            // Произвольный JSON-контекст: для admin.access кладём path,
            // для остальных пока пусто.
            $table->json('context_json')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->unsignedBigInteger('created_at');

            $table->index(['actor_user_id', 'created_at'], 'idx_audit_actor_time');
            $table->index(['action', 'created_at'], 'idx_audit_action_time');
        });
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('audit_log');
    }
};
