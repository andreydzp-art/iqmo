<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\IqmoJwt;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use RuntimeException;

/**
 * Unit tests for IqmoJwt — keep close to the protocol invariants we share
 * with `server/index.js` (HS256 jsonwebtoken). A regression here either
 * locks current users out (verify rejects valid tokens) or — worse — lets
 * a forged token through.
 *
 * Tests deliberately avoid Laravel's TestCase so we don't carry framework
 * boot cost into pure-crypto checks.
 */
final class IqmoJwtTest extends TestCase
{
    private const SECRET = 'unit-test-secret-please-do-not-use-in-prod';

    #[Test]
    public function sign_then_verify_returns_payload(): void
    {
        $jwt = new IqmoJwt(self::SECRET);
        $token = $jwt->sign(['uid' => 42, 'email' => 'a@b.test']);
        $decoded = $jwt->verify($token);

        $this->assertIsArray($decoded);
        $this->assertSame(42, $decoded['uid']);
        $this->assertSame('a@b.test', $decoded['email']);
        $this->assertGreaterThan(time() - 5, $decoded['iat']);
        $this->assertGreaterThan(time(), $decoded['exp']);
    }

    #[Test]
    public function verify_rejects_token_signed_with_other_secret(): void
    {
        $signer = new IqmoJwt(self::SECRET);
        $verifier = new IqmoJwt('different-secret');

        $token = $signer->sign(['uid' => 1, 'email' => 'x@y.test']);

        $this->assertNull($verifier->verify($token));
    }

    #[Test]
    public function verify_rejects_tampered_payload(): void
    {
        $jwt = new IqmoJwt(self::SECRET);
        $token = $jwt->sign(['uid' => 1, 'email' => 'x@y.test']);

        // Replace middle segment with a different (still base64url) payload.
        // Goal: catch the case where signature check is skipped or weakened.
        $parts = explode('.', $token);
        $forgedPayload = rtrim(strtr(base64_encode(json_encode([
            'uid' => 9999, 'email' => 'admin@iqmo.test', 'iat' => time(), 'exp' => time() + 86400,
        ])), '+/', '-_'), '=');
        $forged = $parts[0].'.'.$forgedPayload.'.'.$parts[2];

        $this->assertNull($jwt->verify($forged));
    }

    #[Test]
    public function verify_rejects_expired_token(): void
    {
        $jwt = new IqmoJwt(self::SECRET);

        // Sign with a negative TTL — token is born already expired.
        // Use a value larger than the 30-second leeway in IqmoJwt::verify(),
        // otherwise the token is still considered fresh.
        $token = $jwt->sign(['uid' => 1, 'email' => 'old@iqmo.test'], -120);

        $this->assertNull($jwt->verify($token));
    }

    #[Test]
    public function verify_rejects_malformed_token(): void
    {
        $jwt = new IqmoJwt(self::SECRET);

        $this->assertNull($jwt->verify(''));
        $this->assertNull($jwt->verify('not.a.jwt.token'));
        $this->assertNull($jwt->verify('only-one-segment'));
        $this->assertNull($jwt->verify('two.segments'));
    }

    #[Test]
    public function verify_rejects_unsupported_algorithm(): void
    {
        // Forge a header that claims alg=none — the classic JWT-library bypass.
        // IqmoJwt must hard-pin HS256.
        $header = rtrim(strtr(base64_encode(json_encode(['alg' => 'none', 'typ' => 'JWT'])), '+/', '-_'), '=');
        $payload = rtrim(strtr(base64_encode(json_encode([
            'uid' => 1, 'email' => 'x@y.test', 'iat' => time(), 'exp' => time() + 3600,
        ])), '+/', '-_'), '=');
        $forged = $header.'.'.$payload.'.';

        $jwt = new IqmoJwt(self::SECRET);
        $this->assertNull($jwt->verify($forged));
    }

    #[Test]
    public function constructor_rejects_empty_secret(): void
    {
        $this->expectException(RuntimeException::class);
        new IqmoJwt('');
    }
}
