<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoAdminOverviewBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class AdminOverviewController extends Controller
{
    public function overview(Request $request, IqmoAdminOverviewBuilder $builder): JsonResponse
    {
        $days = (int) $request->query('days', 7);

        try {
            $payload = $builder->build($days);
        } catch (\Throwable $e) {
            // Any DB-level breakage (missing connection, schema drift, JSON_EXTRACT
            // unsupported, query timeout) used to bubble up as a 500 with no body —
            // and the admin UI hung at "Загрузка…" because the spinner only clears
            // on a parsed JSON response. Return a structured 500 instead so the
            // frontend's catch-arm renders the demo-fallback callout with the cause.
            Log::error('[iqmo] admin/overview build failed', [
                'days' => $days,
                'msg' => $e->getMessage(),
                'file' => $e->getFile().':'.$e->getLine(),
            ]);
            report($e);

            // Эндпоинт защищён middleware `iqmo.portal_admin` (только администраторы),
            // поэтому возвращаем подробное сообщение даже при APP_DEBUG=false — это
            // self-service диагностика на проде, а не утечка внутренностей наружу.
            return response()->json([
                'meta' => [
                    'source' => 'error',
                    'days' => $days,
                    'error' => 'build_failed',
                    'errorMessage' => $e->getMessage(),
                    'errorClass' => get_class($e),
                    'errorAt' => basename($e->getFile()).':'.$e->getLine(),
                ],
                'kpis' => [],
                'funnel' => [],
                'subjectsSnapshot' => [],
                'topQuestions' => [],
                'learning' => null,
            ], 500)->withHeaders([
                'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
            ]);
        }

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }
}
