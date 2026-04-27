<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Services\IqmoYandexMetrikaClient;
use Illuminate\Support\Facades\Http;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class IqmoYandexMetrikaClientTest extends TestCase
{
    #[Test]
    public function returns_null_without_token(): void
    {
        config([
            'services.yandex_metrika.oauth_token' => '',
            'services.yandex_metrika.counter_id' => '1',
        ]);

        $c = new IqmoYandexMetrikaClient;
        $this->assertNull($c->uniqueUsersForLastCalendarDays(1));
        $r = $c->fetchUniqueUsersReport(1);
        $this->assertSame('not_configured', $r['code']);
        $this->assertNull($r['users']);
    }

    #[Test]
    public function parses_users_from_api_response(): void
    {
        config([
            'services.yandex_metrika.oauth_token' => 'test-token',
            'services.yandex_metrika.counter_id' => '108770166',
            'app.timezone' => 'Europe/Moscow',
        ]);

        Http::fake([
            'api-metrika.yandex.net/stat/v1/data*' => Http::response([
                'data' => [
                    ['metrics' => [42.0]],
                ],
            ], 200),
        ]);

        $c = new IqmoYandexMetrikaClient;
        $n = $c->uniqueUsersForLastCalendarDays(7);
        $this->assertSame(42, $n);
        $r = $c->fetchUniqueUsersReport(7);
        $this->assertSame('ok', $r['code']);
        $this->assertSame(42, $r['users']);
    }

    #[Test]
    public function uses_totals_when_data_rows_missing(): void
    {
        config([
            'services.yandex_metrika.oauth_token' => 'test-token',
            'services.yandex_metrika.counter_id' => '1',
        ]);

        Http::fake([
            'api-metrika.yandex.net/stat/v1/data*' => Http::response([
                'totals' => [7.0],
            ], 200),
        ]);

        $c = new IqmoYandexMetrikaClient;
        $this->assertSame(7, $c->uniqueUsersForLastCalendarDays(1));
    }
}
