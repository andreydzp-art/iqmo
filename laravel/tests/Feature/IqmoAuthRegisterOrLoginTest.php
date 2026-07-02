<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

/**
 * Контракт register-or-login для `POST /api/auth/register` (audit #6).
 *
 * Цель — закрыть email enumeration: раньше дубль email возвращал 409
 * email_taken, что выдавало атакующему «у этого email есть аккаунт».
 * Теперь:
 *
 *   • новый email + валидный пароль → 200 OK (как и раньше, register)
 *   • существующий email + правильный пароль → 200 OK (silent login,
 *     UX-ный бонус: юзер забыл, что уже регистрировался, и попадает внутрь)
 *   • существующий email + неправильный пароль → 401 invalid_credentials
 *     (тот же ответ, что login отдаёт; атакующий не может отличить
 *     «email свободен» от «email занят, не угадал пароль»)
 *
 * Этот класс проверяет все три ветки + симметрию с /api/auth/login.
 *
 * Тест требует pdo_sqlite (на CI ставится shivammathur/setup-php@v2 по
 * умолчанию). Локально без pdo_sqlite setUp() упадёт — это известный
 * pattern в репо (см. AnalyticsIngestTest).
 */
final class IqmoAuthRegisterOrLoginTest extends TestCase
{
    private const JWT_SECRET = 'register-or-login-test-secret';

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
            $table->unsignedBigInteger('created_at');
        });
        Schema::connection('iqmo')->create('profile_state', function ($table): void {
            $table->unsignedBigInteger('user_id')->primary();
            $table->text('keys_json');
            $table->unsignedInteger('revision')->default(0);
            $table->unsignedBigInteger('updated_at');
        });

        // Очищаем throttle, иначе серия тестов в одном классе выберет
        // лимит iqmo-auth-register (5/min per IP) и последние тесты
        // получат 429 раньше, чем мы успеем проверить логику.
        RateLimiter::clear('iqmo-auth-register');
        RateLimiter::clear('iqmo-auth-login');
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('users');
        Schema::connection('iqmo')->dropIfExists('profile_state');

        parent::tearDown();
    }

    private function seedUser(string $email, string $password): int
    {
        $id = (int) DB::connection('iqmo')->table('users')->insertGetId([
            'email' => $email,
            'password_hash' => Hash::make($password),
            'created_at' => 0,
        ]);
        DB::connection('iqmo')->table('profile_state')->insert([
            'user_id' => $id,
            'keys_json' => '{}',
            'revision' => 0,
            'updated_at' => 0,
        ]);

        return $id;
    }

    public function test_register_with_brand_new_email_creates_account(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'email' => 'new-user@iqmo.test',
            'password' => 'long-enough-password-1',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['ok' => true, 'email' => 'new-user@iqmo.test']);

        $row = DB::connection('iqmo')->table('users')->where('email', 'new-user@iqmo.test')->first();
        $this->assertNotNull($row, 'Пользователь должен быть создан в БД.');
    }

    public function test_register_with_existing_email_and_correct_password_logs_in_silently(): void
    {
        $email = 'existing@iqmo.test';
        $password = 'correct-horse-battery-staple';
        $existingId = $this->seedUser($email, $password);

        $response = $this->postJson('/api/auth/register', [
            'email' => $email,
            'password' => $password,
        ]);

        // Silent login — UX как register success: 200 OK + email в ответе.
        $response->assertStatus(200);
        $response->assertJson(['ok' => true, 'email' => $email]);

        // Сессия выдаётся ровно тому же существующему юзеру (не создаётся
        // дубликат). Проверяем по факту: только один user с этим email,
        // и его id не изменился.
        $count = DB::connection('iqmo')->table('users')->where('email', $email)->count();
        $this->assertSame(1, $count, 'Не должно создаваться нового пользователя при silent login.');

        $row = DB::connection('iqmo')->table('users')->where('email', $email)->first();
        $this->assertSame($existingId, (int) $row->id, 'Silent login должен использовать существующий user_id.');
    }

    public function test_register_with_existing_email_and_wrong_password_returns_401(): void
    {
        $email = 'existing@iqmo.test';
        $this->seedUser($email, 'real-password-1234');

        $response = $this->postJson('/api/auth/register', [
            'email' => $email,
            'password' => 'wrong-password-1234',
        ]);

        // Тот же ответ, что login на invalid_credentials.
        $response->assertStatus(401);
        $response->assertJson(['error' => 'invalid_credentials']);
    }

    public function test_register_response_to_taken_email_matches_login_response_exactly(): void
    {
        // Самый важный тест: ответ register с занятым email + неправильным
        // паролем должен быть НЕОТЛИЧИМ от ответа login с тем же входом.
        // Иначе атакующий по любой разнице (статус, тело, заголовок Set-
        // Cookie, etc.) сможет понять, что email существует.
        $email = 'enum-target@iqmo.test';
        $this->seedUser($email, 'real-password-1234');

        $registerResp = $this->postJson('/api/auth/register', [
            'email' => $email,
            'password' => 'guessed-wrong-pw-1234',
        ]);
        $loginResp = $this->postJson('/api/auth/login', [
            'email' => $email,
            'password' => 'guessed-wrong-pw-1234',
        ]);

        // Status code и тело — must be identical.
        $this->assertSame($loginResp->status(), $registerResp->status(),
            'Register должен отдавать тот же статус, что login на invalid_credentials.');
        $this->assertSame($loginResp->json(), $registerResp->json(),
            'Register должен отдавать то же тело, что login на invalid_credentials.');

        // Set-Cookie для register на 401 не должен содержать iqmo_session
        // (cookie выдаётся только при ok=true; защищаемся от случайного
        // регресса, если кто-то добавит issueSessionCookie раньше check'а).
        $this->assertEmpty(
            array_filter(
                $registerResp->headers->all('set-cookie') ?: [],
                fn ($c) => str_contains((string) $c, 'iqmo_session=')
            ),
            'На invalid_credentials register не должен выдавать iqmo_session cookie.',
        );
    }

    public function test_register_with_short_password_returns_400_regardless_of_email_existence(): void
    {
        // password_short — возвращается ДО вставки в users, ER_DUP_ENTRY
        // не достигается. Поэтому одинаковый ответ для существующего и
        // нового email — leak'а нет на этом уровне.
        $email = 'whatever@iqmo.test';
        $this->seedUser($email, 'real-password-1234');

        $existing = $this->postJson('/api/auth/register', [
            'email' => $email,
            'password' => 'short',
        ]);
        $fresh = $this->postJson('/api/auth/register', [
            'email' => 'fresh@iqmo.test',
            'password' => 'short',
        ]);

        $existing->assertStatus(400);
        $existing->assertJson(['error' => 'password_short']);
        $fresh->assertStatus(400);
        $fresh->assertJson(['error' => 'password_short']);
    }

    public function test_register_with_overlong_email_returns_400_not_500(): void
    {
        // Раньше email длиннее колонки (320) проходил regex, а INSERT падал
        // с SQLSTATE 22001 → 500. Теперь отклоняется валидацией как 400.
        $longLocal = str_repeat('a', 300);
        $response = $this->postJson('/api/auth/register', [
            'email' => $longLocal.'@iqmo.test',
            'password' => 'long-enough-password-1',
        ]);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'invalid_email']);

        $count = DB::connection('iqmo')->table('users')->count();
        $this->assertSame(0, $count, 'Переросший email не должен доходить до INSERT.');
    }

    public function test_register_with_password_over_72_bytes_returns_400(): void
    {
        // bcrypt обрезает пароль на 72 байте; принимать более длинный — значит
        // молча игнорировать хвост. Отклоняем явно.
        $response = $this->postJson('/api/auth/register', [
            'email' => 'longpass@iqmo.test',
            'password' => str_repeat('x', 73),
        ]);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'password_long']);

        $count = DB::connection('iqmo')->table('users')->count();
        $this->assertSame(0, $count, 'Переросший пароль не должен создавать аккаунт.');
    }
}
