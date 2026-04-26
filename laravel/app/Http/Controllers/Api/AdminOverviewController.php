<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoAdminOverviewBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class AdminOverviewController extends Controller
{
    public function overview(Request $request, IqmoAdminOverviewBuilder $builder): JsonResponse
    {
        $days = (int) $request->query('days', 7);

        $payload = $builder->build($days);

        return response()->json($payload)->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }
}
