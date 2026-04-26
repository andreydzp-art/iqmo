<?php

namespace App\Http\Middleware;

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
            $target = '/login.html?next='.rawurlencode($request->fullUrl());

            return redirect($target, 302);
        }

        $email = strtolower((string) ($payload['email'] ?? ''));
        if ($email === '' || ! in_array($email, $allowed, true)) {
            abort(403, 'Forbidden');
        }

        return $next($request);
    }
}
