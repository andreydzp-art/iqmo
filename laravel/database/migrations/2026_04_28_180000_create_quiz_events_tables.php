<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        if (! $schema->hasTable('quiz_sessions')) {
            $schema->create('quiz_sessions', function (Blueprint $table) {
                $table->bigIncrements('id');
                // Random opaque id stored in cookie. Not user_id.
                $table->string('sid', 64)->unique();
                $table->unsignedBigInteger('created_at_ms');
                $table->unsignedBigInteger('last_seen_at_ms');
                $table->string('ip_hash', 40)->nullable()->index();
                $table->string('ua_hash', 40)->nullable()->index();
                $table->index(['last_seen_at_ms'], 'idx_quiz_sessions_last_seen');
            });
        }

        if (! $schema->hasTable('quiz_events')) {
            $schema->create('quiz_events', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('sid', 64)->index();
                $table->string('quiz_id', 32)->index(); // biology-1, chemistry-1
                $table->string('event', 40)->index(); // start, question, gate_shown, gate_submit, cta_register
                $table->unsignedInteger('q_idx')->nullable(); // 1..15 (for question events)
                $table->unsignedBigInteger('occurred_at_ms')->index();
                $table->json('payload_json')->nullable();

                $table->index(['quiz_id', 'event', 'occurred_at_ms'], 'idx_quiz_events_quiz_event_time');
                $table->index(['quiz_id', 'occurred_at_ms'], 'idx_quiz_events_quiz_time');
            });
        }

        if (! $schema->hasTable('quiz_leads')) {
            $schema->create('quiz_leads', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('email', 190)->index();
                $table->string('quiz_id', 32)->index();
                $table->string('sid', 64)->nullable()->index();
                $table->unsignedInteger('score')->nullable();
                $table->unsignedInteger('total')->nullable();
                $table->json('wrong_topics_json')->nullable();
                $table->unsignedBigInteger('created_at_ms')->index();

                $table->unique(['email', 'quiz_id'], 'uq_quiz_leads_email_quiz');
                $table->index(['quiz_id', 'created_at_ms'], 'idx_quiz_leads_quiz_time');
            });
        }
    }

    public function down(): void
    {
        $schema = Schema::connection($this->connection);
        $schema->dropIfExists('quiz_leads');
        $schema->dropIfExists('quiz_events');
        $schema->dropIfExists('quiz_sessions');
    }
};

