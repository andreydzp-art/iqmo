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
     * Уникальные посетители (упрощённо для обратной совместимости).
     */
    public function uniqueUsersForLastCalendarDays(int $days): ?int
    {
        return $this->fetchUniqueUsersReport($days)['users'];
    }

    /**
     * @return array{
     *     users: int|null,
     *     code: 'ok'|'not_configured'|'http_error'|'empty_metrics'|'exception',
     *     httpStatus: int|null,
     *     message: string|null
     * }
     */
    public function fetchUniqueUsersReport(int $days): array
    {
        $base = [
            'users' => null,
            'code' => 'not_configured',
            'httpStatus' => null,
            'message' => null,
        ];

        $token = trim((string) config('services.yandex_metrika.oauth_token', ''));
        $counterId = trim((string) config('services.yandex_metrika.counter_id', ''));

        if ($token === '' || $counterId === '') {
            $base['message'] = $token === '' ? 'YANDEX_METRIKA_OAUTH_TOKEN пуст в конфиге' : 'YANDEX_METRIKA_COUNTER_ID пуст в конфиге';

            return $base;
        }

        $days = max(1, $days);
        $tz = (string) config('app.timezone', 'UTC');

        $end = Carbon::now($tz)->startOfDay();
        $start = $end->copy()->subDays($days - 1);

        return $this->requestUsersMetric($token, $counterId, $start->toDateString(), $end->toDateString());
    }

    /**
     * @return array{users: int|null, code: 'ok'|'http_error'|'empty_metrics'|'exception', httpStatus: int|null, message: string|null}
     */
    private function requestUsersMetric(string $token, string $counterId, string $date1, string $date2): array
    {
        $fail = static fn (string $code, ?int $http, ?string $msg): array => [
            'users' => null,
            'code' => $code,
            'httpStatus' => $http,
            'message' => $msg,
        ];

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

            $status = $response->status();
            $json = $response->json();

            if (! $response->successful()) {
                $errMsg = $this->yandexErrorMessage($json) ?? (string) $response->body();
                if (strlen($errMsg) > 400) {
                    $errMsg = substr($errMsg, 0, 400).'…';
                }
                Log::warning('[iqmo] yandex metrika: non-success', [
                    'status' => $status,
                    'date1' => $date1,
                    'date2' => $date2,
                ]);

                return $fail('http_error', $status, $errMsg !== '' ? $errMsg : 'HTTP '.$status);
            }

            $v = $this->extractFirstMetricValue(is_array($json) ? $json : null);
            if ($v === null) {
                Log::warning('[iqmo] yandex metrika: no metrics in body', [
                    'date1' => $date1,
                    'date2' => $date2,
                ]);

                return $fail('empty_metrics', $status, 'В ответе нет ym:s:users — проверьте id счётчика');
            }

            return [
                'users' => (int) round($v),
                'code' => 'ok',
                'httpStatus' => $status,
                'message' => null,
            ];
        } catch (\Throwable $e) {
            Log::warning('[iqmo] yandex metrika: exception', ['message' => $e->getMessage()]);

            return $fail('exception', null, $e->getMessage());
        }
    }

    /**
     * @param  array<string, mixed>|null  $json
     */
    private function yandexErrorMessage(?array $json): ?string
    {
        if (! is_array($json)) {
            return null;
        }
        if (isset($json['message']) && is_string($json['message'])) {
            return $json['message'];
        }
        if (isset($json['errors']) && is_array($json['errors']) && $json['errors'] !== []) {
            $e = $json['errors'][0];
            if (is_array($e)) {
                $t = $e['message'] ?? $e['error_type'] ?? null;

                return is_string($t) ? $t : null;
            }
        }

        return null;
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
