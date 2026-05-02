<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Tests\TestCase;

/**
 * Каноничный URL админки — /admin/ (clean URL без .html). Старый /admin/index.html
 * 301-редиректит на /admin/, симметрично с /subject-<slug>.html → /subject-<slug>/.
 *
 * Все роуты под middleware iqmo.portal_admin: гость без cookie получает 302 на
 * /login.html, гость с чужим email — 403. Залогиненный админ проходит насквозь.
 */
final class AdminRoutesTest extends TestCase
{
    private const JWT_SECRET = 'admin-routes-test-secret';
    private const ADMIN_EMAIL = 'admin@iqmo.test';

    protected function setUp(): void
    {
        parent::setUp();
        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['iqmo.admin_emails' => [self::ADMIN_EMAIL]]);
    }

    private function adminCookie(): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => 1,
            'email' => self::ADMIN_EMAIL,
        ]);

        return ['iqmo_session' => $token];
    }

    public function test_admin_clean_url_serves_index(): void
    {
        $response = $this->withCookies($this->adminCookie())->get('/admin/');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_admin_without_trailing_slash_also_serves_index(): void
    {
        $response = $this->withCookies($this->adminCookie())->get('/admin');

        $response->assertStatus(200);
    }

    public function test_legacy_admin_index_html_redirects_301(): void
    {
        $response = $this->withCookies($this->adminCookie())->get('/admin/index.html');

        $response->assertStatus(301);
        $response->assertRedirect('/admin/');
    }

    public function test_admin_subpath_still_serves_static_assets(): void
    {
        // mock-data.js лежит рядом с index.html и подключается как ./mock-data.js;
        // после перехода на clean URL он должен по-прежнему отдаваться через
        // /admin/<path>-роут.
        $response = $this->withCookies($this->adminCookie())->get('/admin/mock-data.js');

        $response->assertStatus(200);
    }

    public function test_anonymous_is_redirected_to_login_for_clean_admin_url(): void
    {
        $response = $this->get('/admin/');

        $response->assertStatus(302);
        // Middleware шлёт на /login.html?next=<full url>; sanitizer next= оставит
        // локальный путь как есть, поэтому после логина юзер попадёт обратно на /admin/.
        $location = $response->headers->get('Location') ?? '';
        $this->assertStringContainsString('/login.html', $location);
        $this->assertStringContainsString('next=', $location);
    }

    public function test_anonymous_is_redirected_to_login_for_legacy_admin_url(): void
    {
        // Гость на /admin/index.html не должен видеть 301 (это раскрыло бы
        // существование/маршрутизацию админки до проверки авторизации). Middleware
        // первым делом 302-ит на /login.html.
        $response = $this->get('/admin/index.html');

        $response->assertStatus(302);
        $location = $response->headers->get('Location') ?? '';
        $this->assertStringContainsString('/login.html', $location);
    }

    public function test_non_admin_email_gets_403(): void
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign([
            'uid' => 99,
            'email' => 'random@iqmo.test',
        ]);

        $response = $this->withCookies(['iqmo_session' => $token])->get('/admin/');

        $response->assertStatus(403);
    }
}
