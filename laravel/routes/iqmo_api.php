<?php

use App\Http\Controllers\Api\AdminOverviewController;
use App\Http\Controllers\Api\AdminUsersController;
use App\Http\Controllers\Api\AnalyticsIngestController;
use App\Http\Controllers\Api\IqmoAuthController;
use App\Http\Controllers\Api\IqmoProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function (): void {
    Route::post('/auth/register', [IqmoAuthController::class, 'register']);
    Route::post('/auth/login', [IqmoAuthController::class, 'login']);
    Route::post('/auth/logout', [IqmoAuthController::class, 'logout']);

    Route::get('/me', [IqmoAuthController::class, 'me']);

    Route::middleware(['iqmo.jwt'])->group(function (): void {
        Route::get('/profile/state', [IqmoProfileController::class, 'stateGet']);
        Route::put('/profile/state', [IqmoProfileController::class, 'statePut']);
        Route::get('/profile/history', [IqmoProfileController::class, 'history']);
        Route::post('/profile/restore', [IqmoProfileController::class, 'restore']);

        // Right-to-be-forgotten endpoint (ФЗ-152). DELETE on /api/auth/me
        // because that's where /api/me already lives and the symmetry helps
        // — clients reuse the same URL they used to identify themselves.
        Route::delete('/auth/me', [IqmoAuthController::class, 'deleteMe']);

        Route::post('/analytics/events', [AnalyticsIngestController::class, 'store'])
            ->middleware('throttle:analytics-ingest');
    });

    Route::middleware(['iqmo.portal_admin'])->group(function (): void {
        Route::get('/admin/overview', [AdminOverviewController::class, 'overview']);
        Route::get('/admin/users', [AdminUsersController::class, 'index']);
        Route::get('/admin/users/{id}', [AdminUsersController::class, 'show'])
            ->whereNumber('id');
    });
});
