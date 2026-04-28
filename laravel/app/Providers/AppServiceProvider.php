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

        // Public quiz tracking (anonymous). Keep it generous enough not to drop real users,
        // but strict enough to avoid a noisy client spamming the DB.
        RateLimiter::for('quiz-track', function (Request $request) {
            $sid = (string) ($request->cookie('iqmo_qsid') ?? '');
            $key = sha1($request->ip().'|'.($sid !== '' ? $sid : 'no_sid'));

            return Limit::perMinute(120)->by($key);
        });
    }
}
