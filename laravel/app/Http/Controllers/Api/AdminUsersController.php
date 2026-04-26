<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoAdminUsersBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

final class AdminUsersController extends Controller
{
    public function index(Request $request, IqmoAdminUsersBuilder $builder): JsonResponse
    {
        $opts = [
            'days' => $request->query('days'),
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'sort' => $request->query('sort'),
            'dir' => $request->query('dir'),
            'filter' => $request->query('filter'),
            'q' => $request->query('q'),
        ];

        try {
            $payload = $builder->list($opts);
        } catch (\Throwable $e) {
            return $this->renderError($e, $opts, 'index');
        }

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }

    public function show(Request $request, int $id, IqmoAdminUsersBuilder $builder): JsonResponse
    {
        if ($id < 1) {
            return response()->json(['meta' => ['source' => 'error', 'error' => 'invalid_id']], 422);
        }

        try {
            $payload = $builder->detail($id);
        } catch (\Throwable $e) {
            return $this->renderError($e, ['id' => $id], 'show');
        }

        if ($payload === null) {
            return response()->json([
                'meta' => ['source' => 'not_found', 'error' => 'user_not_found', 'id' => $id],
            ], 404);
        }

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }

    /**
     * @param  array<string, mixed>  $context
     */
    private function renderError(\Throwable $e, array $context, string $endpoint): JsonResponse
    {
        Log::error('[iqmo] admin/users '.$endpoint.' build failed', [
            'context' => $context,
            'msg' => $e->getMessage(),
            'file' => $e->getFile().':'.$e->getLine(),
        ]);
        report($e);

        // Эндпоинт под middleware iqmo.portal_admin — раскрытие сообщения
        // безопасно и нужно для self-service диагностики на проде.
        return response()->json([
            'meta' => [
                'source' => 'error',
                'error' => 'build_failed',
                'errorMessage' => $e->getMessage(),
                'errorClass' => get_class($e),
                'errorAt' => basename($e->getFile()).':'.$e->getLine(),
            ],
            'kpis' => [],
            'dailyRegistrations' => [],
            'pagination' => ['page' => 1, 'perPage' => 50, 'total' => 0, 'totalPages' => 1],
            'items' => [],
        ], 500)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }
}
