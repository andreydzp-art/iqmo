<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adds baseline security headers to every web response, with stricter
 * policy for /admin/* (CSP + X-Frame-Options: DENY).
 *
 * Why a custom middleware rather than nginx?
 *  - Production nginx config is owned by ops and currently `try_files`-proxies
 *    to PHP for /admin/*. Setting headers here ensures parity between local
 *    `php artisan serve`, CI smoke checks, and production.
 *  - Putting CSP only on /admin/* avoids breaking inline scripts on the public
 *    site (Yandex Metrika, dataLayer, ecommerce snippets) until we have time
 *    to either nonce them or move them to external files.
 */
final class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Headers safe for every page, including the public site.
        // - nosniff prevents content-type confusion attacks on /assets/*.
        // - Referrer-Policy keeps URLs out of cross-origin Referer headers
        //   (we don't want test answers leaking via 3rd-party requests).
        // - Permissions-Policy disables APIs we don't use; cheap defence-in-depth.
        $response->headers->set('X-Content-Type-Options', 'nosniff', false);
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin', false);
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=(), payment=()',
            false
        );

        // /admin/* is internal: lock it down harder than the public site.
        // - X-Frame-Options: DENY — admin must never be iframed, even by ourselves.
        // - frame-ancestors 'none' is the modern replacement; we send both for
        //   broader browser coverage (older Edge/IE only honor X-Frame-Options).
        // - 'unsafe-inline' for script-src/style-src is unavoidable today:
        //   resources/admin-ui/index.html ships large inline <script> blocks and
        //   inline <style>. Removing that flag is its own refactor (nonce or
        //   externalised chunks). Even with it, CSP still buys us:
        //     * form-action 'self'   — stolen creds can't POST to evil.example
        //     * object-src 'none'    — no Flash/embed payloads
        //     * base-uri 'self'      — attacker can't rewrite relative URLs
        //     * frame-ancestors 'none' — clickjacking blocked
        //     * connect-src/img-src whitelist — exfil channels narrowed
        // - mc.yandex.ru is whitelisted because the Metrika counter snippet
        //   loads tag.js from there and sends beacons back; remove if Metrika
        //   gets dropped from /admin.
        if (str_starts_with(ltrim($request->path(), '/'), 'admin')) {
            $response->headers->set('X-Frame-Options', 'DENY', false);
            $response->headers->set(
                'Content-Security-Policy',
                implode('; ', [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' https://mc.yandex.ru",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "img-src 'self' data: https://mc.yandex.ru",
                    "font-src 'self' data: https://fonts.gstatic.com",
                    "connect-src 'self' https://mc.yandex.ru",
                    "frame-src https://mc.yandex.ru",
                    "frame-ancestors 'none'",
                    "base-uri 'self'",
                    "form-action 'self'",
                    "object-src 'none'",
                ]),
                false
            );
        }

        return $response;
    }
}
