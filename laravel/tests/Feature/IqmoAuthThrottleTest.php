<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\RateLimiter;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * Контракт rate-limit'а для /api/auth/login и /api/auth/register.
 *
 * Лимитеры объявлены в AppServiceProvider::boot() (`iqmo-auth-login`,
 * `iqmo-auth-register`) и применены через `throttle:` middleware в
 * routes/iqmo_api.php. Здесь мы проверяем, что:
 *
 *   1. До лимита запросы НЕ блокируются (контроллер обрабатывает ответ
 *      нормально — 400/401/500, в зависимости от валидации/окружения).
 *   2. На превышении лимита Laravel отдаёт 429 ДО входа в контроллер
 *      (Throttle middleware срабатывает раньше, и MySQL-зависимый
 *      контроллер не вызывается — поэтому тест не нуждается в БД).
 *
 * Лимиты совпадают с теми, что в AppServiceProvider:
 *   login: 10/min per (ip + email)
 *   register: 5/min per ip
 */
final class IqmoAuthThrottleTest extends TestCase
{
    use UsesIqmoSqlite;

    protected function setUp(): void
    {
        parent::setUp();

        // Подменяем `iqmo` connection на in-memory sqlite, чтобы контроллер
        // (DB::connection('iqmo')->table('users')->...) не висел в ожидании
        // живого MySQL — без этой подмены тест выполняется ~55 секунд из-за
        // connect-таймаутов на каждом фейл-запросе. С sqlite запрос сразу
        // падает на «no such table: users», контроллер ловит throwable и
        // отдаёт 500 — нам этого достаточно, мы проверяем только то, что
        // throttle middleware дал не-429 на первых N и 429 на (N+1)-м.
        $this->useIqmoSqlite();

        // Чистим лимитеры между тестами: cache=array уже изолирует от
        // других тестов, но в рамках одного метода предыдущие keys
        // могут накопиться (если тест-фикстура когда-нибудь захочет
        // переиспользовать). Делаем явный reset для предсказуемости.
        RateLimiter::clear('iqmo-auth-login');
        RateLimiter::clear('iqmo-auth-register');
    }

    public function test_login_returns_429_after_10_attempts_for_same_ip_and_email(): void
    {
        $payload = ['email' => 'throttle-test@iqmo.test', 'password' => 'x'];

        // Первые 10 запросов должны пройти throttle (контроллер ответит
        // 401/500 в зависимости от того, есть ли у инсталляции iqmo-MySQL,
        // но НЕ 429 — это нам и нужно).
        for ($i = 0; $i < 10; $i++) {
            $response = $this->postJson('/api/auth/login', $payload);
            $this->assertNotSame(
                429,
                $response->status(),
                "Request #{$i} hit 429 prematurely (expected throttle to allow first 10)."
            );
        }

        // 11-й — превышение лимита.
        $response = $this->postJson('/api/auth/login', $payload);
        $response->assertStatus(429);
    }

    public function test_login_throttle_keys_by_email_so_different_email_is_not_blocked(): void
    {
        // 10 раз бьём на email A — забиваем его лимит.
        for ($i = 0; $i < 10; $i++) {
            $this->postJson('/api/auth/login', ['email' => 'a@iqmo.test', 'password' => 'x']);
        }
        $blocked = $this->postJson('/api/auth/login', ['email' => 'a@iqmo.test', 'password' => 'x']);
        $blocked->assertStatus(429);

        // Email B с того же IP должен иметь свой счётчик и пройти.
        $other = $this->postJson('/api/auth/login', ['email' => 'b@iqmo.test', 'password' => 'x']);
        $this->assertNotSame(
            429,
            $other->status(),
            'Throttle for email A should not block email B from the same IP.'
        );
    }

    public function test_register_returns_429_after_5_attempts_for_same_ip(): void
    {
        // Register лимитится только по IP (см. AppServiceProvider:
        // иначе атакующий просто менял бы email и обходил лимит).
        // Тест: 5 запросов проходят, 6-й — 429. Каждый раз разный email,
        // чтобы исключить любую другую логику дедупа.
        for ($i = 0; $i < 5; $i++) {
            $response = $this->postJson('/api/auth/register', [
                'email' => "reg-{$i}@iqmo.test",
                'password' => 'long-enough-password-1234',
            ]);
            $this->assertNotSame(
                429,
                $response->status(),
                "Register request #{$i} hit 429 prematurely (expected throttle to allow first 5)."
            );
        }

        $response = $this->postJson('/api/auth/register', [
            'email' => 'reg-6@iqmo.test',
            'password' => 'long-enough-password-1234',
        ]);
        $response->assertStatus(429);
    }
}
