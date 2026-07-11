<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Гварды PUT /api/profile/state:
 *   • верхний предел размера стейта (payload_too_large) — E2;
 *   • оптимистичный лок по revision (защита от потери обновлений) — E1;
 *   • портируемый trim profile_history до HISTORY_KEEP на sqlite — E6.
 *
 * Соединение iqmo подменяется на in-memory sqlite (как в остальных
 * Feature-тестах); схема (users/profile_state/profile_history) строится
 * руками, чтобы не тянуть MySQL-only миграции.
 */
final class IqmoProfileStateGuardsTest extends TestCase
{
    use UsesIqmoSqlite;

    private const JWT_SECRET = 'profile-state-guards-secret';

    private const UID = 7;

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
            $table->unsignedBigInteger('created_at');
            $table->unsignedInteger('token_version')->default(1);
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
            'email' => 'u7@iqmo.test',
            'password_hash' => 'x',
            'created_at' => 0,
            'token_version' => 1,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => self::UID,
            'keys_json' => '{}',
            'revision' => 0,
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
            'email' => 'u7@iqmo.test',
            'tv' => 1,
        ]);

        return ['iqmo_session' => $token];
    }

    private function putState(array $body)
    {
        return $this->withCredentials()
            ->withCookies($this->cookie())
            ->putJson('/api/profile/state', $body);
    }

    public function test_normal_push_persists_keys_and_increments_revision(): void
    {
        $response = $this->putState([
            'baseRevision' => 0,
            'keys' => ['iqmo-chem-streak' => '7'],
        ]);

        $response->assertStatus(200);
        $response->assertJson(['ok' => true, 'revision' => 1]);

        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', self::UID)->first();
        $this->assertSame(1, (int) $row->revision);
        $this->assertStringContainsString('iqmo-chem-streak', (string) $row->keys_json);
    }

    public function test_oversized_state_is_rejected_with_413(): void
    {
        // Один ключ на ~600 KB — выше лимита MAX_STATE_BYTES (512 KB).
        $response = $this->putState([
            'baseRevision' => 0,
            'keys' => ['iqmo-chem-blob' => str_repeat('a', 600 * 1024)],
        ]);

        $response->assertStatus(413);
        $response->assertJson(['error' => 'payload_too_large']);

        // Стейт не должен был измениться.
        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', self::UID)->first();
        $this->assertSame(0, (int) $row->revision, 'Переросший push не должен инкрементить revision.');
    }

    public function test_stale_base_revision_returns_409_with_fresh_server_state(): void
    {
        // Первый push доводит revision до 1.
        $this->putState(['baseRevision' => 0, 'keys' => ['iqmo-chem-a' => '1']])->assertStatus(200);

        // Второй push со стухшим baseRevision=0 — конфликт.
        $response = $this->putState(['baseRevision' => 0, 'keys' => ['iqmo-chem-a' => '2']]);
        $response->assertStatus(409);
        $response->assertJson([
            'error' => 'revision_mismatch',
            'server' => ['revision' => 1],
        ]);
        // Сервер возвращает актуальные ключи, чтобы клиент пересинкался.
        $response->assertJsonPath('server.keys.iqmo-chem-a', '1');
    }

    public function test_history_is_trimmed_to_keep_limit_on_sqlite(): void
    {
        // 85 успешных push'ей: profile_history растёт, но триммер (портируемый,
        // без MySQL-only DELETE ... LIMIT) должен держать не более HISTORY_KEEP.
        for ($i = 0; $i < 85; $i++) {
            $this->putState([
                'baseRevision' => $i,
                'keys' => ['iqmo-chem-streak' => (string) $i],
            ])->assertStatus(200);
        }

        $count = (int) DB::connection('iqmo')->table('profile_history')->where('user_id', self::UID)->count();
        $this->assertLessThanOrEqual(80, $count, 'История должна быть подрезана до HISTORY_KEEP.');
        $this->assertGreaterThan(0, $count, 'История должна писаться при каждом push.');
    }
}
