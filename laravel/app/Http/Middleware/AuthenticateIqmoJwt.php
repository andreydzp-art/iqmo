<?php

namespace App\Http\Middleware;

use App\Services\IqmoJwt;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticateIqmoJwt
{
    public function handle(Request $request, Closure $next): Response
    {
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $token = (string) ($request->cookies->get($cookieName) ?? '');
        $jwt = IqmoJwt::fromConfig();
        $payload = $jwt->verify($token);
        if (!$payload) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        $request->attributes->set('iqmo_user_id', $payload['uid']);
        $request->attributes->set('iqmo_user_email', $payload['email']);

        return $next($request);
    }
}
