<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Публичный профиль: GET /api/profile/IQ-xxxx без auth, без e-mail.
 */
final class IqmoPublicProfileTest extends TestCase
{
    use UsesIqmoSqlite;

    private const USER_ID = 868;

    protected function setUp(): void
    {
        parent::setUp();

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

        DB::connection('iqmo')->table('users')->insert([
            'id' => self::USER_ID,
            'email' => 'anna.test@iqmo.ru',
            'password_hash' => 'fake-hash',
            'token_version' => 1,
            'created_at' => 1_700_000_000_000,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => self::USER_ID,
            'keys_json' => json_encode([
                'iqmo-chem-progress-points-v1' => 120,
                'iqmo-chem-badges-v1' => ['welcome' => 1_700_000_000_000],
                'iqmo-chem-v-1' => ['finished' => true, 'part1Percent' => 80, 'percent' => 75],
            ], JSON_THROW_ON_ERROR),
            'revision' => 1,
            'updated_at' => 0,
        ]);
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('profile_state');
        Schema::connection('iqmo')->dropIfExists('users');

        parent::tearDown();
    }

    public function test_public_profile_returns_json_without_email(): void
    {
        $response = $this->getJson('/api/profile/IQ-0868');

        $response->assertOk();
        $response->assertJsonPath('isPublic', true);
        $response->assertJsonPath('profileId', 'IQ-0868');
        $response->assertJsonPath('profileData.profileId', 'IQ-0868');
        $response->assertJsonPath('profileData.name', 'Anna Test');
        $response->assertJsonPath('profileData.email', null);
        $response->assertJsonPath('profileData.isAuthed', false);
        $response->assertJsonMissing(['email' => 'anna.test@iqmo.ru']);
        $cache = (string) $response->headers->get('Cache-Control');
        $this->assertStringContainsString('max-age=60', $cache);
        $this->assertStringContainsString('public', $cache);
    }

    public function test_public_profile_includes_progress_from_profile_state(): void
    {
        $response = $this->getJson('/api/profile/IQ-0868');

        $response->assertOk();
        $response->assertJsonPath('profileData.xpCurrent', 120);
        $response->assertJsonStructure([
            'achievementsData',
            'subjectsProgressData',
            'statsData',
            'activityData',
            'nextGoalsData',
            'socialSignals',
            'collectiblesData',
        ]);
    }

    public function test_unknown_user_returns_404(): void
    {
        $this->getJson('/api/profile/IQ-9999')->assertNotFound();
    }

    public function test_public_profile_uses_custom_display_name_from_state(): void
    {
        DB::connection('iqmo')->table('profile_state')->where('user_id', self::USER_ID)->update([
            'keys_json' => json_encode([
                'iqmo-chem-progress-points-v1' => 120,
                'iqmo-chem-display-name-v1' => 'Катя ОГЭ',
            ], JSON_THROW_ON_ERROR),
        ]);

        $this->getJson('/api/profile/IQ-0868')
            ->assertOk()
            ->assertJsonPath('profileData.name', 'Катя ОГЭ');
    }

    public function test_invalid_profile_id_route_returns_404(): void
    {
        $this->getJson('/api/profile/not-a-profile')->assertNotFound();
    }
}
