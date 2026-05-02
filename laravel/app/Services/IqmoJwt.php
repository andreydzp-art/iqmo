<?php

namespace App\Services;

use Illuminate\Http\Request;
use RuntimeException;

/**
 * HS256 JWT, совместимый с тем, что выпускает Node-сервер (`server/index.js`,
 * jsonwebtoken, alg=HS256, expiresIn=30d), а также используется для
 * подписи cookie `iqmo_session` из Laravel.
 *
 * Источник секрета: IQMO_JWT_SECRET (config('services.iqmo.jwt_secret')).
 * Для локальной разработки допускается fallback на APP_KEY.
 */
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
        return new self(self::resolveSecret());
    }

    /**
     * Тихий хелпер для middleware/контроллеров: возвращает uid из cookie
     * `iqmo_session` или null при любой ошибке (включая отсутствие секрета).
     */
    public static function userIdFromCookie(Request $request): ?int
    {
        $token = $request->cookie('iqmo_session');
        if (!is_string($token) || $token === '') {
            return null;
        }

        $secret = self::resolveSecret();
        if ($secret === '') {
            return null;
        }

        try {
            $payload = (new self($secret))->verify($token);
        } catch (\Throwable $e) {
            return null;
        }

        return $payload['uid'] ?? null;
    }

    /**
     * Подписывает JWT. Поле `tv` — token_version юзера на момент выдачи
     * (audit #3). Middleware AuthenticateIqmoJwt сверяет его с актуальным
     * значением в БД; INCREMENT token_version в users (logout-everywhere /
     * сброс пароля) делает все ранее выпущенные токены невалидными.
     *
     * @param  array{uid:int|string,email:string,tv?:int}  $payload
     */
    public function sign(array $payload, int $ttlSeconds = 30 * 86400): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $now = time();
        $body = [
            'uid' => (int) $payload['uid'],
            'email' => (string) $payload['email'],
            'tv' => isset($payload['tv']) ? (int) $payload['tv'] : 1,
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
     * Возвращает payload или null. Поле `tv` присутствует всегда:
     * для JWT, выпущенных ДО фикса audit #3 (без `tv` в теле),
     * возвращаем `tv = 1` — чтобы не разлогинивать существующих
     * пользователей; в БД у всех users token_version по умолчанию 1.
     *
     * @return array{uid:int,email:string,tv:int,iat:int,exp:int}|null
     */
    public function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$h, $p, $s] = $parts;

        $headerJson = $this->b64urlDecode($h);
        if (!is_string($headerJson)) {
            return null;
        }
        $header = json_decode($headerJson, true);
        if (!is_array($header) || ($header['alg'] ?? null) !== 'HS256') {
            return null;
        }

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
        $leeway = 30;
        if ($uid <= 0 || $email === '' || $exp + $leeway <= time()) {
            return null;
        }

        return [
            'uid' => $uid,
            'email' => $email,
            // Backward compat: токены без tv (выпущенные до миграции
            // audit #3) считаются tv=1, что совпадает с дефолтом колонки
            // users.token_version. Принудительного разлогина нет.
            'tv' => isset($payload['tv']) ? (int) $payload['tv'] : 1,
            'iat' => (int) ($payload['iat'] ?? 0),
            'exp' => $exp,
        ];
    }

    private static function resolveSecret(): string
    {
        $secret = (string) config('services.iqmo.jwt_secret', '');
        if ($secret === '') {
            $secret = (string) config('iqmo.jwt_secret', '');
        }
        if ($secret === '') {
            $secret = (string) config('app.key', '');
        }

        return $secret;
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
