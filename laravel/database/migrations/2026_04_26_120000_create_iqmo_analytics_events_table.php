<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $schema = Schema::connection('iqmo');

        $schema->create('analytics_events', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('occurred_at');
            $table->string('event', 64);
            $table->json('payload');
            $table->unsignedBigInteger('received_at');
            $table->primary('id');
            $table->index(['event', 'occurred_at'], 'idx_analytics_event_time');
            $table->index(['user_id', 'occurred_at'], 'idx_analytics_user_time');
        });
    }

    public function down(): void
    {
        Schema::connection('iqmo')->dropIfExists('analytics_events');
    }
};
