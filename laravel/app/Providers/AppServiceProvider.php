<?php

namespace App\Providers;

use App\Services\IqmoJwt;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('analytics-ingest', function (Request $request) {
            $uid = IqmoJwt::userIdFromCookie($request);
            $key = sha1($request->ip().'|'.($uid ?? 'anon'));

            return Limit::perMinute(45)->by($key);
        });
    }
}
