<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Синхронизация iqmo-bio-* через PUT /api/profile/state (вместе с chem).
 */
final class IqmoProfileBioSyncTest extends TestCase
{
    use UsesIqmoSqlite;

    private const JWT_SECRET = 'bio-sync-test-secret';

    private const USER_ID = 7;

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
            $table->unsignedInteger('revision')->default(0);
            $table->unsignedBigInteger('updated_at');
        });
        Schema::connection('iqmo')->create('profile_history', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->text('keys_json');
            $table->unsignedInteger('revision');
            $table->unsignedBigInteger('created_at');
        });

        DB::connection('iqmo')->table('users')->insert([
            'id' => self::USER_ID,
            'email' => 'bio@iqmo.test',
            'password_hash' => 'hash',
            'token_version' => 1,
            'created_at' => 0,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => self::USER_ID,
            'keys_json' => json_encode([
                'iqmo-bio-v-1' => json_encode(['finished' => true, 'part1Percent' => 88]),
            ], JSON_THROW_ON_ERROR),
            'revision' => 1,
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

    private function cookieFor(int $uid): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => $uid,
            'email' => "u{$uid}@iqmo.test",
        ]);

        return ['iqmo_session' => $token];
    }

    public function test_put_accepts_iqmo_bio_keys(): void
    {
        $response = $this->withCredentials()
            ->withCookies($this->cookieFor(self::USER_ID))
            ->putJson('/api/profile/state', [
                'baseRevision' => 1,
                'expected_user_id' => self::USER_ID,
                'keys' => [
                    'iqmo-bio-v-2' => json_encode(['finished' => true, 'part1Percent' => 72]),
                    'iqmo-chem-streak' => json_encode(['days' => 3]),
                ],
            ]);

        $response->assertOk();

        $get = $this->withCredentials()
            ->withCookies($this->cookieFor(self::USER_ID))
            ->getJson('/api/profile/state');

        $get->assertOk();
        $get->assertJsonPath('keys.iqmo-bio-v-2', json_encode(['finished' => true, 'part1Percent' => 72]));
        $get->assertJsonPath('keys.iqmo-chem-streak', json_encode(['days' => 3]));
        $get->assertJsonMissingPath('keys.iqmo-bio-v-1');
    }

    public function test_chem_only_push_preserves_existing_bio_keys(): void
    {
        $response = $this->withCredentials()
            ->withCookies($this->cookieFor(self::USER_ID))
            ->putJson('/api/profile/state', [
                'baseRevision' => 1,
                'expected_user_id' => self::USER_ID,
                'keys' => [
                    'iqmo-chem-progress-points-v1' => '120',
                ],
            ]);

        $response->assertOk();

        $get = $this->withCredentials()
            ->withCookies($this->cookieFor(self::USER_ID))
            ->getJson('/api/profile/state');

        $get->assertOk();
        $get->assertJsonPath('keys.iqmo-chem-progress-points-v1', '120');
        $get->assertJsonStructure(['keys' => ['iqmo-bio-v-1']]);
    }

    public function test_public_profile_shows_bio_progress_after_sync(): void
    {
        $this->getJson('/api/profile/IQ-0007')
            ->assertOk()
            ->assertJsonPath('profileData.name', 'Bio')
            ->assertJsonMissing(['publicNotice' => 'Прогресс по биологии может храниться только на устройстве ученика и не отображаться здесь.']);
    }
}
