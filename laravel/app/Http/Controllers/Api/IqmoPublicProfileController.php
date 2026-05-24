<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoPublicProfileBuilder;
use Illuminate\Http\JsonResponse;

final class IqmoPublicProfileController extends Controller
{
    public function show(string $profileId): JsonResponse
    {
        $payload = IqmoPublicProfileBuilder::buildForProfileId($profileId);
        if ($payload === null) {
            return response()->json(['error' => 'not_found'], 404);
        }

        return response()
            ->json($payload)
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
    }
}
