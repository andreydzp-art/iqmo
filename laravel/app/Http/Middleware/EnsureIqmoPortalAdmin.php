<?php

namespace App\Http\Middleware;

use App\Constants\ApiErrorCode;
use App\Services\IqmoAuditLogger;
use App\Services\IqmoJwt;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class EnsureIqmoPortalAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $allowed = config('iqmo.admin_emails', []);
        if (! is_array($allowed) || $allowed === []) {
            abort(503, 'Admin allowlist is empty: set IQMO_ADMIN_EMAILS in .env');
        }

        $allowed = array_values(array_unique(array_filter(array_map(
            static fn (mixed $e): string => strtolower(trim((string) $e)),
            $allowed
        ))));

        $jwt = IqmoJwt::fromConfig();
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $token = (string) ($request->cookies->get($cookieName) ?? '');
        $payload = $jwt->verify($token);

        if (! $payload) {
            if ($request->expectsJson() || str_starts_with($request->path(), 'api/admin')) {
                return response()->json(['error' => 'unauthorized'], 401);
            }
            $target = '/login.html?next='.rawurlencode($request->fullUrl());

            return redirect($target, 302);
        }

        $email = strtolower((string) ($payload['email'] ?? ''));
        if ($email === '' || ! in_array($email, $allowed, true)) {
            abort(403, 'Forbidden');
        }

        // Defence-in-depth для CSRF (audit #16): для unsafe-методов
        // (POST/PUT/PATCH/DELETE) проверяем Origin/Referer == app.url.
        // SameSite=strict cookie уже блокирует cross-site sending на
        // современных браузерах, но:
        //   • старые браузеры могут не реализовать SameSite полностью;
        //   • при misconfig cookie (SameSite=none случайно) этот
        //     middleware-check всё равно поймает CSRF.
        // Для GET/HEAD/OPTIONS пропускаем — там нет state-changing
        // эффектов (admin-overview/users/quizzes — read-only).
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            $expectedHost = parse_url((string) config('app.url', ''), PHP_URL_HOST);
            $originHeader = $request->header('Origin') ?: $request->header('Referer');
            $actualHost = $originHeader !== null
                ? parse_url((string) $originHeader, PHP_URL_HOST)
                : null;

            // Без Origin/Referer вообще — отбрасываем. Современные
            // браузеры всегда отправляют хотя бы Referer на same-origin
            // запросах, кроме случаев с Referrer-Policy: no-referrer.
            // У нас strict-origin-when-cross-origin → Referer всегда
            // приходит на same-origin.
            if ($expectedHost === null || $actualHost === null || $actualHost !== $expectedHost) {
                if ($request->expectsJson() || str_starts_with($request->path(), 'api/admin')) {
                    return response()->json(['error' => ApiErrorCode::FORBIDDEN], 403);
                }
                abort(403, 'Cross-site request to admin endpoint blocked');
            }
        }

        // Audit (audit #12): фиксируем КАЖДЫЙ доступ к /admin/* — каждое
        // GET /api/admin/users, открытие /admin/index.html и т.п. Это
        // даёт полный forensic-trail активности админа. Объём записей
        // ограничен — admin'ов мало, и страницы редко открываются;
        // если станет шумно, в будущем можно будет фильтровать по
        // типу запроса (сейчас context.path помогает группировать).
        IqmoAuditLogger::record(
            IqmoAuditLogger::ADMIN_ACCESS,
            (int) $payload['uid'],
            $email,
            ['path' => $request->path(), 'method' => $request->method()],
            $request
        );

        return $next($request);
    }
}
