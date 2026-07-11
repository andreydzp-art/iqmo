<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Денормализация XP в индексируемую колонку profile_state.xp (perf лидерборда).
 *
 * IqmoLeaderboardController теперь читает XP из ps.xp, а не через
 * JSON_EXTRACT(keys_json, '$."iqmo-chem-progress-points-v1"') (полный скан).
 * Значит statePut/restore ОБЯЗАНЫ поддерживать колонку в актуальном состоянии —
 * этот контракт и охраняет тест. Сам endpoint /api/leaderboard использует
 * MySQL-only JSON_UNQUOTE для avatar_raw и на sqlite не гоняется, поэтому
 * проверяем контракт денормализации на уровне записи стейта.
 */
final class IqmoProfileXpDenormTest extends TestCase
{
    use UsesIqmoSqlite;

    private const JWT_SECRET = 'xp-denorm-secret';

    private const UID = 7;

    private const XP_KEY = 'iqmo-chem-progress-points-v1';

    protected function setUp(): void
    {
        parent::setUp();

        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);

        $this->useIqmoSqlite();

        Schema::connection('iqmo')->create('users', function ($table): void {
            $table->bigIncrements('id');
            $table->string('email')->unique();
            $table->string('password_hash');
            $table->unsignedInteger('token_version')->default(1);
            $table->unsignedBigInteger('created_at');
        });
        Schema::connection('iqmo')->create('profile_state', function ($table): void {
            $table->unsignedBigInteger('user_id')->primary();
            $table->text('keys_json');
            $table->unsignedBigInteger('revision')->default(0);
            $table->unsignedBigInteger('xp')->default(0);
            $table->unsignedBigInteger('updated_at');
        });
        Schema::connection('iqmo')->create('profile_history', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->text('keys_json');
            $table->unsignedBigInteger('revision');
            $table->unsignedBigInteger('created_at');
        });

        DB::connection('iqmo')->table('users')->insert([
            'id' => self::UID,
            'email' => 'xp@iqmo.test',
            'password_hash' => 'x',
            'token_version' => 1,
            'created_at' => 0,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => self::UID,
            'keys_json' => '{}',
            'revision' => 0,
            'xp' => 0,
            'updated_at' => 0,
        ]);
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('profile_history');
        Schema::connection('iqmo')->dropIfExists('profile_state');
        Schema::connection('iqmo')->dropIfExists('users');

        parent::tearDown();
    }

    private function cookie(): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => self::UID,
            'email' => 'xp@iqmo.test',
        ]);

        return ['iqmo_session' => $token];
    }

    private function currentXp(): int
    {
        return (int) DB::connection('iqmo')->table('profile_state')
            ->where('user_id', self::UID)
            ->value('xp');
    }

    public function test_state_put_denormalizes_points_into_xp_column(): void
    {
        $this->withCredentials()->withCookies($this->cookie())
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'keys' => [self::XP_KEY => '250', 'iqmo-chem-streak' => '4'],
            ])
            ->assertOk();

        $this->assertSame(250, $this->currentXp());
    }

    public function test_state_put_sets_xp_zero_when_points_absent(): void
    {
        $this->withCredentials()->withCookies($this->cookie())
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'keys' => ['iqmo-chem-streak' => '3'],
            ])
            ->assertOk();

        $this->assertSame(0, $this->currentXp());
    }

    public function test_restore_updates_xp_column_from_snapshot(): void
    {
        // Текущий стейт — 250 XP на ревизии 5; в истории — снапшот с 90 XP.
        DB::connection('iqmo')->table('profile_state')->where('user_id', self::UID)->update([
            'keys_json' => json_encode([self::XP_KEY => '250']),
            'revision' => 5,
            'xp' => 250,
        ]);
        $histId = DB::connection('iqmo')->table('profile_history')->insertGetId([
            'user_id' => self::UID,
            'keys_json' => json_encode([self::XP_KEY => '90']),
            'revision' => 2,
            'created_at' => 0,
        ]);

        $this->withCredentials()->withCookies($this->cookie())
            ->postJson('/api/profile/restore', ['historyId' => $histId])
            ->assertOk();

        $this->assertSame(90, $this->currentXp());
    }
}
