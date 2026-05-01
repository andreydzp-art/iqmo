<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * quiz_leads: добавляем колонку `phone` для лидов из квиза с регистрацией по
 * телефону (фаза A/B-теста "phone vs email"). Email становится nullable: один
 * лид теперь может прийти ИЛИ по почте, ИЛИ по телефону. Уникальность
 * сохраняется per-канал: (email, quiz_id) для email-лидов и (phone, quiz_id)
 * для телефонных, поэтому повторная отправка одной формы не создаёт дублей.
 *
 * Старый уникальный индекс `uq_quiz_leads_email_quiz` оставляем — MySQL умеет
 * хранить несколько NULL в UNIQUE-индексе, поэтому email-лиды продолжают
 * работать через него, а телефонные просто кладут email=NULL и не конфликтуют.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);
        if (! $schema->hasTable('quiz_leads')) {
            return;
        }

        // 1. email -> NULLABLE. Сделано RAW, чтобы не тащить doctrine/dbal только ради change().
        DB::connection($this->connection)->statement(
            'ALTER TABLE quiz_leads MODIFY email VARCHAR(190) NULL'
        );

        // 2. Колонка phone (если ещё нет). VARCHAR(16) хватает с запасом для +7XXXXXXXXXX
        //    и любых будущих международных номеров.
        if (! $schema->hasColumn('quiz_leads', 'phone')) {
            $schema->table('quiz_leads', function (Blueprint $table) {
                $table->string('phone', 16)->nullable()->after('email');
            });
        }

        // 3. Уникальный индекс (phone, quiz_id), но только если ещё не создан.
        $exists = DB::connection($this->connection)->select(
            "SHOW INDEX FROM quiz_leads WHERE Key_name = 'uq_quiz_leads_phone_quiz'"
        );
        if (empty($exists)) {
            $schema->table('quiz_leads', function (Blueprint $table) {
                $table->unique(['phone', 'quiz_id'], 'uq_quiz_leads_phone_quiz');
            });
        }

        // 4. Индекс на phone для аналитики/поиска.
        $existsIdx = DB::connection($this->connection)->select(
            "SHOW INDEX FROM quiz_leads WHERE Key_name = 'idx_quiz_leads_phone'"
        );
        if (empty($existsIdx)) {
            $schema->table('quiz_leads', function (Blueprint $table) {
                $table->index('phone', 'idx_quiz_leads_phone');
            });
        }
    }

    public function down(): void
    {
        $schema = Schema::connection($this->connection);
        if (! $schema->hasTable('quiz_leads')) {
            return;
        }

        $schema->table('quiz_leads', function (Blueprint $table) {
            $table->dropUnique('uq_quiz_leads_phone_quiz');
            $table->dropIndex('idx_quiz_leads_phone');
            $table->dropColumn('phone');
        });

        // Возвращаем email NOT NULL обратно — но только если в нём нет NULL-строк
        // (иначе ALTER упадёт). Если что-то осталось NULL, оставляем nullable.
        $hasNulls = DB::connection($this->connection)
            ->table('quiz_leads')->whereNull('email')->exists();
        if (! $hasNulls) {
            DB::connection($this->connection)->statement(
                'ALTER TABLE quiz_leads MODIFY email VARCHAR(190) NOT NULL'
            );
        }
    }
};
