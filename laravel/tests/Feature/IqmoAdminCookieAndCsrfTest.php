<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Cookie;
use Tests\TestCase;

/**
 * Контракт audit #16: SameSite=strict для admin-cookie + Origin-check
 * на unsafe-методы /api/admin/*.
 */
final class IqmoAdminCookieAndCsrfTest extends TestCase
{
    private const JWT_SECRET = 'admin-cookie-test-secret';

    private const ADMIN_EMAIL = 'admin@iqmo.test';

    private const USER_EMAIL = 'user@iqmo.test';

    protected function setUp(): void
    {
        parent::setUp();

        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['iqmo.admin_emails' => [self::ADMIN_EMAIL]]);
        config(['iqmo.cookie_secure' => false]);

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

        $this->app->make(\Illuminate\Cache\RateLimiter::class)->clear('iqmo-auth-login');
        $this->app->make(\Illuminate\Cache\RateLimiter::class)->clear('iqmo-auth-register');

        // Текущая админка read-only — все определённые роуты GET. CSRF-guard
        // в EnsureIqmoPortalAdmin срабатывает на POST/PUT/PATCH/DELETE,
        // но без POST-роутов middleware вообще не выполняется (Laravel
        // отдаёт 405 раньше). Регистрируем тестовый POST endpoint, чтобы
        // проверить контракт middleware. Когда в админке появятся реальные
        // POST/PUT (role-change, user-delete и т.п.), они автоматически
        // получат тот же CSRF-guard через middleware-группу.
        \Illuminate\Support\Facades\Route::middleware(['web', 'iqmo.portal_admin'])
            ->post('/api/admin/_test_csrf', fn () => response()->json(['ok' => true]));
    }

    protected function tearDown(): void
    {
        Schema::connection('iqmo')->dropIfExists('audit_log');
        Schema::connection('iqmo')->dropIfExists('profile_state');
        Schema::connection('iqmo')->dropIfExists('users');

        parent::tearDown();
    }

    /**
     * Достаём queued cookie из CookieJar Laravel'а (тесты не парсят
     * Set-Cookie из заголовков, как браузер).
     */
    private function getQueuedSessionCookie(): ?\Symfony\Component\HttpFoundation\Cookie
    {
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        foreach (Cookie::getQueuedCookies() as $cookie) {
            if ($cookie->getName() === $cookieName) {
                return $cookie;
            }
        }

        return null;
    }

    public function test_admin_login_issues_cookie_with_samesite_strict(): void
    {
        $this->postJson('/api/auth/register', [
            'email' => self::ADMIN_EMAIL,
            'password' => 'admin-pwd-12345',
        ])->assertStatus(200);

        $cookie = $this->getQueuedSessionCookie();
        $this->assertNotNull($cookie, 'iqmo_session cookie должен быть выпущен');
        $this->assertSame('strict', $cookie->getSameSite());
    }

    public function test_regular_user_login_issues_cookie_with_samesite_lax(): void
    {
        $this->postJson('/api/auth/register', [
            'email' => self::USER_EMAIL,
            'password' => 'user-pwd-12345',
        ])->assertStatus(200);

        $cookie = $this->getQueuedSessionCookie();
        $this->assertNotNull($cookie);
        $this->assertSame('lax', $cookie->getSameSite());
    }

    /**
     * Защита от CSRF: POST на admin-endpoint с Origin'ом другого сайта
     * должен быть отвергнут даже с валидным admin-JWT.
     *
     * Сценарий: евил.example, на которой админ залогинен где-то ещё,
     * вшил <form action="https://iqmoschool.ru/api/admin/users/...">.
     * Браузер не отправит cookie из-за SameSite=strict, но мы проверяем
     * Origin-header как defence-in-depth.
     */
    public function test_admin_post_with_cross_site_origin_is_rejected(): void
    {
        config(['app.url' => 'https://www.iqmoschool.ru']);

        $jwt = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => 1,
            'email' => self::ADMIN_EMAIL,
            'tv' => 1,
        ]);

        $resp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->withHeaders(['Origin' => 'https://evil.example'])
            ->postJson('/api/admin/_test_csrf');

        $resp->assertStatus(403);
        $resp->assertJson(['error' => 'forbidden']);
    }

    public function test_admin_post_with_same_origin_passes_csrf_check(): void
    {
        config(['app.url' => 'https://www.iqmoschool.ru']);

        $jwt = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => 1,
            'email' => self::ADMIN_EMAIL,
            'tv' => 1,
        ]);

        $resp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->withHeaders(['Origin' => 'https://www.iqmoschool.ru'])
            ->postJson('/api/admin/_test_csrf');

        $resp->assertStatus(200);
        $resp->assertJson(['ok' => true]);
    }

    public function test_admin_get_skips_origin_check(): void
    {
        // GET на read-only endpoint вообще не должен проверять Origin
        // (нет state-changing эффектов). Если бы middleware проверял
        // Origin для GET — UI админки сломался бы при открытии в
        // отдельной вкладке без Referer.
        config(['app.url' => 'https://www.iqmoschool.ru']);

        $jwt = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => 1,
            'email' => self::ADMIN_EMAIL,
            'tv' => 1,
        ]);

        // Без Origin вообще: должно пройти CSRF-guard (для GET)
        $resp = $this->withCredentials()
            ->withCookies(['iqmo_session' => $jwt])
            ->getJson('/api/admin/users');

        $this->assertNotSame(403, $resp->status(), 'GET не должен ловить CSRF-guard');
    }
}
