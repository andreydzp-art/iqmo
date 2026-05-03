<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Constants\ApiErrorCode;
use App\Http\Controllers\Controller;
use App\Services\IqmoAdminAnalyticsBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Тонкая обвязка над `IqmoAdminAnalyticsBuilder`. Каждый метод соответствует
 * своей панели в админке: subjects/topics/questions/tests/mistakes/funnel/activity.
 *
 * Ошибки билдера отдаём 500 с диагностикой в meta — UI это умеет показывать
 * (см. квизовая панель). Cache-Control стоит `no-store`, чтобы админ всегда
 * видел свежие KPI без F5.
 */
final class AdminAnalyticsController extends Controller
{
    public function __construct(private readonly IqmoAdminAnalyticsBuilder $builder)
    {
    }

    public function subjects(Request $request): JsonResponse
    {
        return $this->run('subjects', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->subjects($days);
        });
    }

    public function topics(Request $request): JsonResponse
    {
        return $this->run('topics', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->topics($days);
        });
    }

    public function questions(Request $request): JsonResponse
    {
        $days = (int) $request->query('days', 7);
        $filters = [
            'subject' => (string) $request->query('subject', 'all'),
            'q' => (string) $request->query('q', ''),
            'wrongOnly' => filter_var($request->query('wrongOnly', false), FILTER_VALIDATE_BOOLEAN),
        ];

        return $this->run('questions', $days, function (int $days) use ($filters) {
            return $this->builder->questions($days, $filters);
        });
    }

    public function tests(Request $request): JsonResponse
    {
        return $this->run('tests', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->tests($days);
        });
    }

    public function mistakes(Request $request): JsonResponse
    {
        return $this->run('mistakes', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->mistakes($days);
        });
    }

    public function funnel(Request $request): JsonResponse
    {
        return $this->run('funnel', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->funnel($days);
        });
    }

    public function activity(Request $request): JsonResponse
    {
        return $this->run('activity', (int) $request->query('days', 7), function (int $days) {
            return $this->builder->activity($days);
        });
    }

    /** @param  callable(int): array  $fn */
    private function run(string $tag, int $days, callable $fn): JsonResponse
    {
        try {
            $payload = $fn($days);
        } catch (\Throwable $e) {
            Log::error('[iqmo] admin/'.$tag.' build failed', [
                'days' => $days,
                'msg' => $e->getMessage(),
                'file' => $e->getFile().':'.$e->getLine(),
            ]);
            report($e);

            return response()->json([
                'meta' => [
                    'source' => 'error',
                    'days' => $days,
                    'error' => ApiErrorCode::BUILD_FAILED,
                    'errorMessage' => $e->getMessage(),
                    'errorClass' => get_class($e),
                    'errorAt' => basename($e->getFile()).':'.$e->getLine(),
                ],
            ], 500)->withHeaders([
                'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
            ]);
        }

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }
}
