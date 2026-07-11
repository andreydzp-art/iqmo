<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Денормализуем накопительный XP в индексируемую колонку profile_state.xp
 * (perf, audit). Раньше leaderboard считал XP через
 * JSON_UNQUOTE(JSON_EXTRACT(keys_json, '$."iqmo-chem-progress-points-v1"'))
 * прямо в ORDER BY и в COUNT(*) для ранга — по такому выражению индекс
 * невозможен, и каждый (публичный!) запрос лидерборда был полным сканом
 * users ⋈ profile_state. Теперь top-N и ранг обслуживаются индексом idx.
 *
 * XP поддерживается в актуальном состоянии в IqmoProfileController::statePut
 * и ::restore (пишутся в той же атомарной UPDATE). Здесь — одноразовый
 * backfill существующих строк. DEFAULT 0 — до первого синка/бэкфилла
 * пользователь просто внизу рейтинга (как и раньше при отсутствии ключа).
 */
return new class extends Migration
{
    protected $connection = 'iqmo';

    /** Ключ localStorage с накопительным XP (см. extracted/chem-progress.js). */
    private const XP_KEY = 'iqmo-chem-progress-points-v1';

    public function up(): void
    {
        $schema = Schema::connection($this->connection);

        if (! $schema->hasTable('profile_state')) {
            return;
        }
        if ($schema->hasColumn('profile_state', 'xp')) {
            return;
        }

        $schema->table('profile_state', function (Blueprint $table): void {
            $table->unsignedBigInteger('xp')->default(0)->after('revision');
            $table->index('xp', 'idx_profile_state_xp');
        });

        // Backfill из keys_json — в PHP, чтобы не зависеть от MySQL-only
        // JSON-функций (Feature-тесты гоняются на sqlite). Обновляем только
        // строки с ненулевым XP; xp остальных остаётся DEFAULT 0. Пишем xp,
        // а не user_id, поэтому порядок chunk по user_id стабилен.
        DB::connection($this->connection)->table('profile_state')
            ->select('user_id', 'keys_json')
            ->orderBy('user_id')
            ->chunk(500, function ($rows): void {
                foreach ($rows as $row) {
                    $keys = is_string($row->keys_json)
                        ? json_decode($row->keys_json, true)
                        : (array) $row->keys_json;
                    $xp = is_array($keys) && isset($keys[self::XP_KEY])
                        ? max(0, (int) $keys[self::XP_KEY])
                        : 0;
                    if ($xp > 0) {
                        DB::connection($this->connection)->table('profile_state')
                            ->where('user_id', $row->user_id)
                            ->update(['xp' => $xp]);
                    }
                }
            });
    }

    public function down(): void
    {
        $schema = Schema::connection($this->connection);

        if ($schema->hasTable('profile_state') && $schema->hasColumn('profile_state', 'xp')) {
            $schema->table('profile_state', function (Blueprint $table): void {
                $table->dropIndex('idx_profile_state_xp');
                $table->dropColumn('xp');
            });
        }
    }
};
