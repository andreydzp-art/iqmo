<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $schema = Schema::connection('iqmo');

        $schema->table('users', function (Blueprint $table) {
            if (! $schema->hasColumn('users', 'last_activity_at')) {
                $table->unsignedBigInteger('last_activity_at')->default(0)->after('created_at');
            }
            if (! $schema->hasColumn('users', 'activity_subject')) {
                $table->string('activity_subject', 32)->nullable()->after('last_activity_at');
            }
            if (! $schema->hasColumn('users', 'activity_chapter')) {
                $table->string('activity_chapter', 64)->nullable()->after('activity_subject');
            }
            if (! $schema->hasColumn('users', 'live_activity_public')) {
                $table->unsignedTinyInteger('live_activity_public')->default(0)->after('activity_chapter');
            }
        });

        if (! $schema->hasTable('live_activity_events')) {
            $schema->create('live_activity_events', function (Blueprint $table) {
                $table->unsignedBigInteger('id')->autoIncrement();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('type', 48);
                $table->string('visibility', 16)->default('anonymous');
                $table->string('public_name', 64)->nullable();
                $table->string('subject', 32)->nullable();
                $table->string('topic', 128)->nullable();
                $table->string('chapter', 64)->nullable();
                $table->string('badge_name', 128)->nullable();
                $table->unsignedSmallInteger('level')->nullable();
                $table->unsignedSmallInteger('streak_days')->nullable();
                $table->unsignedSmallInteger('score')->nullable();
                $table->unsignedInteger('count')->nullable();
                $table->json('metadata_json')->nullable();
                $table->unsignedBigInteger('created_at');
                $table->primary('id');
                $table->index(['created_at'], 'idx_live_activity_created');
                $table->index(['user_id', 'type', 'created_at'], 'idx_live_activity_user_type');
                $table->index(['subject', 'created_at'], 'idx_live_activity_subject');
            });
        }
    }

    public function down(): void
    {
        $schema = Schema::connection('iqmo');
        $schema->dropIfExists('live_activity_events');
        $schema->table('users', function (Blueprint $table) use ($schema) {
            foreach (['live_activity_public', 'activity_chapter', 'activity_subject', 'last_activity_at'] as $col) {
                if ($schema->hasColumn('users', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
