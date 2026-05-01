<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Чистка исторических записей выведенного из эксплуатации квиза 'biology-1'.
 * Подтверждено пользователем: ценной информации там не было.
 *
 * Down() намеренно no-op: восстановить удалённые строки нельзя.
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);
        $conn = DB::connection($this->connection);

        if ($schema->hasTable('quiz_events')) {
            $deleted = $conn->table('quiz_events')->where('quiz_id', 'biology-1')->delete();
            // Логируем результат в stdout — в логах GHA-деплоя видно сколько удалено.
            echo "[drop_biology1_history] quiz_events deleted: {$deleted}\n";
        }

        if ($schema->hasTable('quiz_leads')) {
            $deleted = $conn->table('quiz_leads')->where('quiz_id', 'biology-1')->delete();
            echo "[drop_biology1_history] quiz_leads deleted: {$deleted}\n";
        }
    }

    public function down(): void
    {
        // No-op: восстановление невозможно.
    }
};
