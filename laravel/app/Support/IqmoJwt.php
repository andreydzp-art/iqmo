<?php

namespace App\Support;

use Illuminate\Http\Request;

class IqmoJwt
{
    public static function userIdFromCookie(Request $request): ?int
    {
        $token = $request->cookie('iqmo_session');
        if (! $token || substr_count($token, '.') !== 2) {
            return null;
        }
        $secret = config('services.iqmo.jwt_secret');
        if (! $secret) {
            return null;
        }
        [$h, $p, $s] = explode('.', $token, 3);
        $sig = self::base64UrlDecodeBytes($s);
        if ($sig === null) {
            return null;
        }
        $check = hash_hmac('sha256', $h.'.'.$p, $secret, true);
        if (! hash_equals($check, $sig)) {
            return null;
        }
        $json = self::base64UrlDecodeBytes($p);
        if ($json === null) {
            return null;
        }
        $payload = json_decode($json, true);
        if (! is_array($payload) || empty($payload['uid'])) {
            return null;
        }

        return (int) $payload['uid'];
    }

    private static function base64UrlDecodeBytes(string $s): ?string
    {
        $b64 = strtr($s, '-_', '+/');
        $pad = strlen($b64) % 4;
        if ($pad) {
            $b64 .= str_repeat('=', 4 - $pad);
        }
        $raw = base64_decode($b64, true);

        return $raw === false ? null : $raw;
    }
}
