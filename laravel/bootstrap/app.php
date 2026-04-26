<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            // IQMO portal API: cookie-based JWT, served alongside the static site,
            // so it has to share the `web` stack (sessions, cookies) — not Laravel's
            // default api routes file. CSRF is excluded for /api/* below.
            Route::middleware('web')
                ->group(base_path('routes/iqmo_api.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);

        $middleware->alias([
            'iqmo.jwt' => \App\Http\Middleware\AuthenticateIqmoJwt::class,
            'iqmo.portal_admin' => \App\Http\Middleware\EnsureIqmoPortalAdmin::class,
        ]);

        // Append, not prepend: security headers should run after the response
        // body is built so they apply uniformly even when controllers return
        // file responses (e.g. /admin/{path} → response()->file()).
        $middleware->web(append: [
            \App\Http\Middleware\SecurityHeaders::class,
        ]);

        $middleware->redirectGuestsTo(fn () => route('laravel.login'));
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
