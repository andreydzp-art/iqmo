<?php

declare(strict_types=1);

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Счётчик сайта: Яндекс.Метрика Reporting API v1 (stat/v1/data).
 * Нужен OAuth-токен с правом metrika:read.
 *
 * @see https://yandex.com/dev/metrika/doc/api2/api_v1/intro.html
 */
final class IqmoYandexMetrikaClient
{
    private const DATA_URL = 'https://api-metrika.yandex.net/stat/v1/data';

    private const USERS_METRIC = 'ym:s:users';

    /**
     * Уникальные посетители за календарный интервал [сегодня − (days−1) … сегодня] в таймзоне приложения.
     * Для days=1 — посетители за текущие сутки по этой таймзоне.
     */
    public function uniqueUsersForLastCalendarDays(int $days): ?int
    {
        $token = (string) config('services.yandex_metrika.oauth_token', '');
        $counterId = (string) config('services.yandex_metrika.counter_id', '');

        if ($token === '' || $counterId === '') {
            return null;
        }

        $days = max(1, $days);
        $tz = (string) config('app.timezone', 'UTC');

        $end = Carbon::now($tz)->startOfDay();
        $start = $end->copy()->subDays($days - 1);

        return $this->requestUsersMetric(
            $token,
            $counterId,
            $start->toDateString(),
            $end->toDateString()
        );
    }

    private function requestUsersMetric(string $token, string $counterId, string $date1, string $date2): ?int
    {
        try {
            $response = Http::connectTimeout(5)
                ->timeout(8)
                ->withHeaders(['Authorization' => 'OAuth '.$token])
                ->get(self::DATA_URL, [
                    'ids' => $counterId,
                    'metrics' => self::USERS_METRIC,
                    'date1' => $date1,
                    'date2' => $date2,
                ]);

            if (! $response->successful()) {
                Log::warning('[iqmo] yandex metrika: non-success', [
                    'status' => $response->status(),
                ]);

                return null;
            }

            $v = $this->extractFirstMetricValue($response->json());

            if ($v === null) {
                return null;
            }

            return (int) round($v);
        } catch (\Throwable $e) {
            Log::warning('[iqmo] yandex metrika: exception', ['message' => $e->getMessage()]);

            return null;
        }
    }

    /**
     * @param  array<string, mixed>|null  $json
     */
    private function extractFirstMetricValue(?array $json): ?float
    {
        if (! is_array($json)) {
            return null;
        }
        if (isset($json['data'][0]['metrics'][0]) && is_numeric($json['data'][0]['metrics'][0])) {
            return (float) $json['data'][0]['metrics'][0];
        }
        if (isset($json['totals'][0]) && is_numeric($json['totals'][0])) {
            return (float) $json['totals'][0];
        }

        return null;
    }
}
