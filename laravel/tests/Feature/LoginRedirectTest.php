<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Services\IqmoJwt;
use Tests\TestCase;

/**
 * Server-side guard for /login.html (and the /uploads/login.html alias).
 *
 * Без него залогиненный пользователь видит форму логина на ~200 мс — пока
 * клиентский JS не сделает /api/me и не редиректит. Гард читает iqmo_session
 * cookie на стороне Laravel и сразу 302-ит в /profile.html (или в sanitized
 * ?next=, если он указывает на локальный путь).
 *
 * Тесты заодно фиксируют open-redirect инвариант: ?next= с протокольно-
 * относительным URL (//evil) или абсолютным (https://evil) НЕ должен утаскивать
 * пользователя на чужой хост.
 */
final class LoginRedirectTest extends TestCase
{
    private const JWT_SECRET = 'login-redirect-test-secret';

    protected function setUp(): void
    {
        parent::setUp();
        config(['iqmo.jwt_secret' => self::JWT_SECRET]);
        config(['services.iqmo.jwt_secret' => self::JWT_SECRET]);
    }

    private function authedCookie(): array
    {
        $token = (new IqmoJwt(self::JWT_SECRET))->sign(['uid' => 7, 'email' => 'u@iqmo.test']);

        return ['iqmo_session' => $token];
    }

    public function test_anonymous_sees_login_form(): void
    {
        $response = $this->get('/login.html');

        $response->assertStatus(200);
        // BinaryFileResponse не материализуется в `$response->getContent()` под тесты,
        // поэтому проверяем только статус и Content-Type — что Laravel реально вернул HTML.
        $response->assertHeader('Content-Type', 'text/html; charset=UTF-8');
    }

    public function test_authed_user_is_redirected_to_profile(): void
    {
        $response = $this->withCookies($this->authedCookie())->get('/login.html');

        $response->assertStatus(302);
        $response->assertRedirect('/subject-biology/');
    }

    public function test_authed_user_honors_local_next_param(): void
    {
        $response = $this->withCookies($this->authedCookie())
            ->get('/login.html?next=/admin/');

        $response->assertStatus(302);
        $response->assertRedirect('/admin/');
    }

    public function test_authed_user_ignores_protocol_relative_next(): void
    {
        // `//evil.example/foo` — это URL на чужой хост по той же схеме, что и
        // у нас. Открытые редиректы такого вида — вектор фишинга, поэтому не
        // должен пролезать через наш sanitizer.
        $response = $this->withCookies($this->authedCookie())
            ->get('/login.html?next=//evil.example/foo');

        $response->assertStatus(302);
        $response->assertRedirect('/subject-biology/');
    }

    public function test_authed_user_ignores_absolute_next(): void
    {
        $response = $this->withCookies($this->authedCookie())
            ->get('/login.html?next=https://evil.example/');

        $response->assertStatus(302);
        $response->assertRedirect('/subject-biology/');
    }

    public function test_alias_uploads_login_html_also_redirects(): void
    {
        $response = $this->withCookies($this->authedCookie())
            ->get('/uploads/login.html');

        $response->assertStatus(302);
        $response->assertRedirect('/subject-biology/');
    }

    public function test_invalid_cookie_falls_through_to_login_form(): void
    {
        $response = $this->withCookies(['iqmo_session' => 'not-a-valid-jwt'])
            ->get('/login.html');

        $response->assertStatus(200);
    }
}
