<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoAuditLogger;
use App\Services\IqmoJwt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Контракт IqmoAuditLogger + хуки в IqmoAuthController/EnsureIqmoPortalAdmin.
 *
 * Использует in-memory sqlite для iqmo connection (пробросить полную
 * MySQL-схему в тестах слишком дорого). Создаём минимально нужное
 * подмножество: users, profile_state, audit_log.
 */
final class IqmoAuditLogTest extends TestCase
{
    use UsesIqmoSqlite;

    private const JWT_SECRET = 'audit-test-secret';

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
        Schema::connection('iqmo')->create('audit_log', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('actor_user_id')->nullable();
            $table->string('actor_email', 320)->nullable();
            $table->string('action', 64);
            $table->text('context_json')->nullable();
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->unsignedBigInteger('created_at');
        });

        // Throttle limiters могут унести IP между тестами — обнулим, чтобы
        // подряд несколько test_*/login не словили 429.
        $this->app->make(\Illuminate\Cache\RateLimiter::class)->clear('iqmo-auth-login');
        $this->app->make(\Illuminate\Cache\RateLimiter::class)->clear('iqmo-auth-register');
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('audit_log');
        Schema::connection('iqmo')->dropIfExists('profile_state');
        Schema::connection('iqmo')->dropIfExists('users');

        parent::tearDown();
    }

    private function lastAuditRow(): ?object
    {
        return DB::connection('iqmo')->table('audit_log')->orderByDesc('id')->first();
    }

    public function test_register_creates_audit_register_row(): void
    {
        $resp = $this->postJson('/api/auth/register', [
            'email' => 'reg@iqmo.test',
            'password' => 'password-1234',
        ]);

        $resp->assertStatus(200);

        $row = $this->lastAuditRow();
        $this->assertNotNull($row);
        $this->assertSame(IqmoAuditLogger::AUTH_REGISTER, $row->action);
        $this->assertSame('reg@iqmo.test', $row->actor_email);
        $this->assertGreaterThan(0, (int) $row->actor_user_id);
    }

    public function test_login_creates_audit_login_row(): void
    {
        // Сначала регистрируем — это создаёт auth.register row.
        $this->postJson('/api/auth/register', [
            'email' => 'login@iqmo.test',
            'password' => 'password-1234',
        ])->assertStatus(200);

        // Теперь логинимся — должна появиться auth.login.
        $resp = $this->postJson('/api/auth/login', [
            'email' => 'login@iqmo.test',
            'password' => 'password-1234',
        ]);
        $resp->assertStatus(200);

        $row = $this->lastAuditRow();
        $this->assertSame(IqmoAuditLogger::AUTH_LOGIN, $row->action);
        $this->assertSame('login@iqmo.test', $row->actor_email);
    }

    public function test_register_or_login_silent_login_writes_login_with_source_context(): void
    {
        // Шаг 1: создали аккаунт.
        $this->postJson('/api/auth/register', [
            'email' => 'rol@iqmo.test',
            'password' => 'password-1234',
        ])->assertStatus(200);

        // Шаг 2: повторный register с тем же password → silent login.
        // Контракт audit #6: ответ идентичен register success, но событие
        // должно записаться как auth.login с context.source = register_or_login,
        // чтобы в админке можно было увидеть, что юзер пришёл через
        // register-форму, хотя по факту просто залогинился.
        $resp = $this->postJson('/api/auth/register', [
            'email' => 'rol@iqmo.test',
            'password' => 'password-1234',
        ]);
        $resp->assertStatus(200);

        $row = $this->lastAuditRow();
        $this->assertSame(IqmoAuditLogger::AUTH_LOGIN, $row->action);
        $this->assertSame('rol@iqmo.test', $row->actor_email);
        $context = json_decode((string) $row->context_json, true);
        $this->assertSame('register_or_login', $context['source'] ?? null);
    }

    public function test_logout_everywhere_creates_audit_row(): void
    {
        $this->postJson('/api/auth/register', [
            'email' => 'le@iqmo.test',
            'password' => 'password-1234',
        ])->assertStatus(200);

        $userId = (int) DB::connection('iqmo')->table('users')->where('email', 'le@iqmo.test')->value('id');
        $jwt = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => $userId,
            'email' => 'le@iqmo.test',
            'tv' => 1,
        ]);

        $resp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->postJson('/api/auth/logout-everywhere');
        $resp->assertStatus(200);

        $row = $this->lastAuditRow();
        $this->assertSame(IqmoAuditLogger::AUTH_LOGOUT_EVERYWHERE, $row->action);
        $this->assertSame($userId, (int) $row->actor_user_id);
    }

    public function test_account_delete_writes_audit_row_BEFORE_users_row_is_gone(): void
    {
        // Регистрируем юзера и забираем его id до удаления.
        $this->postJson('/api/auth/register', [
            'email' => 'del@iqmo.test',
            'password' => 'password-1234',
        ])->assertStatus(200);

        $userId = (int) DB::connection('iqmo')->table('users')->where('email', 'del@iqmo.test')->value('id');
        $jwt = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => $userId,
            'email' => 'del@iqmo.test',
            'tv' => 1,
        ]);

        $resp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->deleteJson('/api/auth/me');
        $resp->assertStatus(200);

        // users-row ушла, но audit_log должен сохранить event с email.
        $this->assertNull(
            DB::connection('iqmo')->table('users')->where('id', $userId)->first(),
            'users row не должна остаться после deleteMe'
        );

        $row = DB::connection('iqmo')
            ->table('audit_log')
            ->where('action', IqmoAuditLogger::AUTH_ACCOUNT_DELETE)
            ->orderByDesc('id')
            ->first();
        $this->assertNotNull($row);
        $this->assertSame('del@iqmo.test', $row->actor_email);
        $this->assertSame($userId, (int) $row->actor_user_id);
    }

    public function test_audit_logger_swallows_db_errors_and_does_not_throw(): void
    {
        // Дроним audit_log таблицу — следующий record() должен не упасть.
        Schema::connection('iqmo')->dropIfExists('audit_log');

        // Ассёртом тут является «не вылетело исключение». Если бы upper-level
        // try/catch отсутствовал, register бы вернул 500 и тест упал.
        $resp = $this->postJson('/api/auth/register', [
            'email' => 'noaudit@iqmo.test',
            'password' => 'password-1234',
        ]);
        $resp->assertStatus(200);
    }
}
