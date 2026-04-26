<?php

use App\Http\Controllers\Api\AnalyticsIngestController;
use Illuminate\Support\Facades\Route;

Route::post('/analytics/events', [AnalyticsIngestController::class, 'store'])
    ->middleware('throttle:analytics-ingest');
