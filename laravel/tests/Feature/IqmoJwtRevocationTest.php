<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

/**
 * Контракт server-side JWT revocation (audit #3).
 *
 * Проверяет, что:
 *   1. Валидный JWT с tv, совпадающим с users.token_version, проходит
 *      через middleware AuthenticateIqmoJwt — возвращается ответ
 *      контроллера (≠ 401).
 *   2. JWT с tv, не совпадающим (логично: после INCREMENT token_version),
 *      получает 401 unauthorized — старые токены отзываются мгновенно.
 *   3. JWT для удалённого юзера (нет строки в users) тоже 401 — это
 *      закрывает дыру «delete account, cookie на других вкладках живёт
 *      30 дней».
 *   4. JWT без поля `tv` в payload (выпущенный ДО фикса audit #3) считается
 *      tv=1 → совпадает с дефолтом колонки. Старые сессии не разлогинены.
 *   5. POST /api/auth/logout-everywhere INCREMENT users.token_version
 *      и старый JWT, выпущенный до этого, теряет валидность.
 *
 * Используем PUT /api/profile/state как «прокси-эндпоинт» под iqmo.jwt
 * middleware — это самый простой защищённый эндпоинт.
 */
final class IqmoJwtRevocationTest extends TestCase
{
    private const JWT_SECRET = 'jwt-revocation-test-secret';

    private const USER_ID = 42;

    protected function setUp(): void
    {
        parent::setUp();

        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);

        config([
            'database.connections.iqmo' => [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
                'foreign_key_constraints' => false,
            ],
        ]);

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

        // Тестовый юзер с token_version = 1.
        DB::connection('iqmo')->table('users')->insert([
            'id' => self::USER_ID,
            'email' => 'u@iqmo.test',
            'password_hash' => 'fake-hash',
            'token_version' => 1,
            'created_at' => 0,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => self::USER_ID,
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

    private function jwtFor(int $uid, int $tv): string
    {
        return (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => $uid,
            'email' => "u{$uid}@iqmo.test",
            'tv' => $tv,
        ]);
    }

    private function callPutState(string $jwt): \Illuminate\Testing\TestResponse
    {
        return $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->putJson('/api/profile/state', [
                'baseRevision' => 0,
                'expected_user_id' => self::USER_ID,
                'keys' => ['iqmo-chem-streak' => '1'],
            ]);
    }

    public function test_jwt_with_matching_tv_passes_middleware(): void
    {
        $jwt = $this->jwtFor(self::USER_ID, 1);

        $response = $this->callPutState($jwt);

        // Контроллер выполнился — middleware пропустил. Точный 200 vs 500
        // зависит от состояния схемы; нам важно ТОЛЬКО что middleware не
        // отдал 401 unauthorized.
        $this->assertNotSame(
            401,
            $response->status(),
            'Валидный JWT с матчащим tv не должен получать 401.'
        );
    }

    public function test_jwt_with_stale_tv_is_rejected_with_401(): void
    {
        // Имитируем сценарий: выпустили JWT когда users.token_version=1,
        // потом увеличили (logout-everywhere / смена пароля) — old JWT
        // должен превратиться в тыкву.
        DB::connection('iqmo')->table('users')->where('id', self::USER_ID)->update(['token_version' => 2]);

        $jwt = $this->jwtFor(self::USER_ID, 1);

        $response = $this->callPutState($jwt);

        $response->assertStatus(401);
        $response->assertJson(['error' => 'unauthorized']);
    }

    public function test_jwt_for_deleted_user_is_rejected_with_401(): void
    {
        // После DELETE /api/auth/me другие вкладки/устройства имеют
        // живой JWT, но юзера в users больше нет — middleware должен
        // отдавать 401.
        DB::connection('iqmo')->table('profile_state')->where('user_id', self::USER_ID)->delete();
        DB::connection('iqmo')->table('users')->where('id', self::USER_ID)->delete();

        $jwt = $this->jwtFor(self::USER_ID, 1);

        $response = $this->callPutState($jwt);

        $response->assertStatus(401);
    }

    public function test_legacy_jwt_without_tv_is_treated_as_tv_1_for_backward_compat(): void
    {
        // JWT выпущенные до миграции не содержат поля `tv` в payload.
        // verify() для них возвращает tv=1 (см. IqmoJwt). Чтобы тест
        // правильно эмулировал legacy-токен, подписываем вручную BEZ tv.
        $jwt = $this->signLegacyJwt(self::USER_ID, 'u@iqmo.test');

        $response = $this->callPutState($jwt);

        $this->assertNotSame(
            401,
            $response->status(),
            'Legacy JWT без поля tv должен пропускаться (default tv=1 в users).'
        );
    }

    public function test_logout_everywhere_increments_token_version_and_invalidates_old_jwt(): void
    {
        // Шаг 1: рабочий JWT с tv=1.
        $jwt = $this->jwtFor(self::USER_ID, 1);
        $beforeCall = $this->callPutState($jwt);
        $this->assertNotSame(401, $beforeCall->status(), 'Pre-condition: старый JWT работает.');

        // Шаг 2: /api/auth/logout-everywhere инкрементит token_version
        // и стирает cookie. Аутентифицируемся тем же JWT (он ещё валиден
        // на момент входа в endpoint).
        $logoutResp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->postJson('/api/auth/logout-everywhere');
        $logoutResp->assertStatus(200);
        $logoutResp->assertJson(['ok' => true]);

        // token_version должен стать 2.
        $row = DB::connection('iqmo')->table('users')->where('id', self::USER_ID)->first();
        $this->assertSame(2, (int) $row->token_version);

        // Шаг 3: тот же JWT с tv=1 теперь должен получить 401 на любом
        // защищённом эндпоинте.
        $afterCall = $this->callPutState($jwt);
        $afterCall->assertStatus(401);
        $afterCall->assertJson(['error' => 'unauthorized']);
    }

    /**
     * Подписывает JWT в legacy-формате (без поля `tv` в payload). Нужен
     * для test_legacy_jwt_without_tv_is_treated_as_tv_1: эмулируем
     * токены, выпущенные до миграции audit #3.
     */
    private function signLegacyJwt(int $uid, string $email): string
    {
        $now = time();
        $header = $this->b64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $body = $this->b64url(json_encode([
            'uid' => $uid,
            'email' => $email,
            'iat' => $now,
            'exp' => $now + 3600,
        ]));
        $sig = hash_hmac('sha256', $header.'.'.$body, self::JWT_SECRET, true);

        return $header.'.'.$body.'.'.$this->b64url($sig);
    }

    private function b64url(string $s): string
    {
        return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
    }
}
