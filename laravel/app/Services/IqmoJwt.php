<?php

namespace App\Services;

use RuntimeException;

final class IqmoJwt
{
    public function __construct(private readonly string $secret)
    {
        if ($this->secret === '') {
            throw new RuntimeException('IQMO_JWT_SECRET is empty');
        }
    }

    public static function fromConfig(): self
    {
        $secret = (string) config('iqmo.jwt_secret', '');
        if ($secret === '') {
            $secret = (string) config('app.key', '');
        }

        return new self($secret);
    }

    /**
     * @param  array{uid:int|string,email:string}  $payload
     */
    public function sign(array $payload, int $ttlSeconds = 30 * 86400): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $now = time();
        $body = [
            'uid' => (int) $payload['uid'],
            'email' => (string) $payload['email'],
            'iat' => $now,
            'exp' => $now + $ttlSeconds,
        ];

        $segments = [
            $this->b64url(json_encode($header, JSON_UNESCAPED_SLASHES)),
            $this->b64url(json_encode($body, JSON_UNESCAPED_SLASHES)),
        ];

        $signingInput = implode('.', $segments);
        $sig = hash_hmac('sha256', $signingInput, $this->secret, true);

        return $signingInput.'.'.$this->b64url($sig);
    }

    /**
     * @return array{uid:int,email:string,iat:int,exp:int}|null
     */
    public function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$h, $p, $s] = $parts;
        $signingInput = $h.'.'.$p;
        $expected = hash_hmac('sha256', $signingInput, $this->secret, true);
        $sig = $this->b64urlDecode($s);
        if (!is_string($sig) || !hash_equals($expected, $sig)) {
            return null;
        }

        $payloadJson = $this->b64urlDecode($p);
        if (!is_string($payloadJson)) {
            return null;
        }

        /** @var mixed $payload */
        $payload = json_decode($payloadJson, true);
        if (!is_array($payload)) {
            return null;
        }

        $uid = isset($payload['uid']) ? (int) $payload['uid'] : 0;
        $email = isset($payload['email']) ? (string) $payload['email'] : '';
        $exp = isset($payload['exp']) ? (int) $payload['exp'] : 0;
        if ($uid <= 0 || $email === '' || $exp <= time()) {
            return null;
        }

        return [
            'uid' => $uid,
            'email' => $email,
            'iat' => (int) ($payload['iat'] ?? 0),
            'exp' => $exp,
        ];
    }

    private function b64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function b64urlDecode(string $data): ?string
    {
        $b64 = strtr($data, '-_', '+/');
        $pad = strlen($b64) % 4;
        if ($pad) {
            $b64 .= str_repeat('=', 4 - $pad);
        }

        $raw = base64_decode($b64, true);

        return $raw === false ? null : $raw;
    }
}
