<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Http\Middleware\SecurityHeaders;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PHPUnit\Framework\TestCase;

/**
 * Тесты на SecurityHeaders middleware: HSTS, X-Frame-Options,
 * frame-ancestors. Это unit-тест (не Feature) — проще, без booting
 * полного Laravel: middleware принимает Request/Closure, мы проверяем
 * заголовки вручную сформированного ответа.
 */
final class SecurityHeadersTest extends TestCase
{
    private function call(Request $request): Response
    {
        $middleware = new SecurityHeaders();

        return $middleware->handle($request, fn () => new Response('ok'));
    }

    private function makeRequest(string $path, bool $secure = true): Request
    {
        $scheme = $secure ? 'https' : 'http';
        $request = Request::create("{$scheme}://example.test{$path}", 'GET');
        // Request::create() не выставляет HTTPS=on в server — isSecure()
        // ориентируется на server[HTTPS]. Forсим вручную.
        if ($secure) {
            $request->server->set('HTTPS', 'on');
        }

        return $request;
    }

    public function test_hsts_is_sent_on_https(): void
    {
        $response = $this->call($this->makeRequest('/', true));

        $hsts = $response->headers->get('Strict-Transport-Security');
        $this->assertNotNull($hsts);
        $this->assertStringContainsString('max-age=', $hsts);
        $this->assertStringContainsString('includeSubDomains', $hsts);
        // preload не должно быть: см. комментарий в SecurityHeaders.
        $this->assertStringNotContainsString('preload', $hsts);
    }

    public function test_hsts_is_NOT_sent_on_http(): void
    {
        $response = $this->call($this->makeRequest('/', false));

        $this->assertNull($response->headers->get('Strict-Transport-Security'));
    }

    public function test_public_pages_get_x_frame_sameorigin_and_frame_ancestors_self(): void
    {
        $response = $this->call($this->makeRequest('/', true));

        $this->assertSame('SAMEORIGIN', $response->headers->get('X-Frame-Options'));

        $csp = (string) $response->headers->get('Content-Security-Policy');
        $this->assertStringContainsString("frame-ancestors 'self'", $csp);
        // Проверяем, что НЕ выставлен жёсткий 'none' (это для admin) —
        // публичной части иначе не дадут iframe'иться даже самим себе
        // (например, превью /full-test внутри лендинга).
        $this->assertStringNotContainsString("frame-ancestors 'none'", $csp);
    }

    public function test_admin_pages_get_x_frame_deny_and_strict_csp(): void
    {
        $response = $this->call($this->makeRequest('/admin/users', true));

        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));

        $csp = (string) $response->headers->get('Content-Security-Policy');
        $this->assertStringContainsString("frame-ancestors 'none'", $csp);
        $this->assertStringContainsString("default-src 'self'", $csp);
        $this->assertStringContainsString("object-src 'none'", $csp);
    }

    public function test_admin_csp_does_NOT_get_overridden_by_public_fallback(): void
    {
        // Регрессионный кейс: предыдущая итерация фикса ставила публичный
        // SAMEORIGIN/frame-ancestors раньше admin-блока с replace=false,
        // и admin получал SAMEORIGIN вместо DENY. Защищаемся от
        // повторения через explicit assert.
        $response = $this->call($this->makeRequest('/admin/', true));

        $this->assertSame('DENY', $response->headers->get('X-Frame-Options'));
        $this->assertStringContainsString(
            "frame-ancestors 'none'",
            (string) $response->headers->get('Content-Security-Policy')
        );
    }

    public function test_baseline_headers_present_on_every_response(): void
    {
        $response = $this->call($this->makeRequest('/', true));

        $this->assertSame('nosniff', $response->headers->get('X-Content-Type-Options'));
        $this->assertSame('strict-origin-when-cross-origin', $response->headers->get('Referrer-Policy'));
        $this->assertNotNull($response->headers->get('Permissions-Policy'));
    }
}
