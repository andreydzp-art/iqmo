<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $schema = Schema::connection('iqmo');

        $schema->create('users', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->string('email', 320);
            $table->string('password_hash', 255);
            $table->unsignedBigInteger('created_at');
            $table->primary('id');
            $table->unique('email', 'uq_users_email');
        });

        $schema->create('profile_state', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->json('keys_json');
            $table->unsignedBigInteger('revision')->default(0);
            $table->unsignedBigInteger('updated_at');
            $table->primary('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });

        $schema->create('profile_history', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->json('keys_json');
            $table->unsignedBigInteger('revision');
            $table->unsignedBigInteger('created_at');
            $table->primary('id');
            $table->index('user_id', 'idx_profile_history_user');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        $schema = Schema::connection('iqmo');

        $schema->dropIfExists('profile_history');
        $schema->dropIfExists('profile_state');
        $schema->dropIfExists('users');
    }
};
