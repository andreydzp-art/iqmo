<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Создаётся в той же базе, что и Node-сервер (см. server/sql/mysql-schema.sql) —
     * connection 'iqmo' (config/database.php). Это критично: IqmoAuthController пишет
     * users в `iqmo`, AnalyticsIngestController пишет analytics_events туда же,
     * IqmoAdminOverviewBuilder читает оттуда. Дефолтное соединение `mysql` хранит
     * Laravel-Breeze users — оно не используется на портале IQMO.
     */
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        // Node может создать таблицу первым (ensureSchema / mysql-schema.sql) с теми же
        // колонками. Не валим миграцию, если она уже есть.
        if ($schema->hasTable('analytics_events')) {
            return;
        }

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
    }

    public function down(): void
    {
        Schema::connection($this->connection)->dropIfExists('analytics_events');
    }
};
