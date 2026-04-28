<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoAdminQuizMetricsBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class AdminQuizzesController extends Controller
{
    public function index(Request $request, IqmoAdminQuizMetricsBuilder $builder): JsonResponse
    {
        $days = (int) $request->query('days', 7);

        try {
            $payload = $builder->build($days);
        } catch (\Throwable $e) {
            Log::error('[iqmo] admin/quizzes build failed', [
                'days' => $days,
                'msg' => $e->getMessage(),
                'file' => $e->getFile().':'.$e->getLine(),
            ]);
            report($e);

            return response()->json([
                'meta' => [
                    'source' => 'error',
                    'days' => $days,
                    'error' => 'build_failed',
                    'errorMessage' => $e->getMessage(),
                    'errorClass' => get_class($e),
                    'errorAt' => basename($e->getFile()).':'.$e->getLine(),
                ],
                'quizzes' => [],
            ], 500)->withHeaders([
                'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
            ]);
        }

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }
}

