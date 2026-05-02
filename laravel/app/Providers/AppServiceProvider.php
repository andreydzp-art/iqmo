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

        // /api/auth/login — защита от credential stuffing. Ключ: IP + email (если
        // прислан в body). Так brute-force ОДНОГО email с одного IP ловится строго,
        // а распределённая атака на разные email'ы с одного IP — мягче. Лимит
        // 10/мин совпадает с порогом Breeze LoginRequest для /laravel/login.
        RateLimiter::for('iqmo-auth-login', function (Request $request) {
            $email = strtolower((string) $request->input('email', ''));
            $key = sha1($request->ip().'|'.$email);

            return Limit::perMinute(10)->by($key);
        });

        // /api/auth/register — защита от registration flood (создание юзеров,
        // загаживание users-таблицы и enumeration через email_taken). Ключ:
        // только IP — email специально игнорируем, иначе атакующий с одного
        // IP получит N лимитов на N разных email'ов. 5/мин достаточно для
        // легитимного UX (опечатка в email, повтор), но не для перебора.
        RateLimiter::for('iqmo-auth-register', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });
    }
}
