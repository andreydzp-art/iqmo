<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

// `/uploads/login.html` must remain a real page (not redirect to `/login.html`): an outdated
// `site/login.html` stub that meta-refreshes to `/uploads/` would otherwise loop with a redirect.

// Static site assets (served by Nginx on VPS; routed here for local `php artisan serve`)
// `/admin/*` is not public: see protected routes below (IQMO_ADMIN_EMAILS + portal session).
foreach (['assets', 'img', 'badges'] as $dir) {
    Route::get("/{$dir}/{path}", function (string $path) use ($dir) {
        // Use forward slashes for Laravel path helpers, then normalize.
        $rel = $dir.'/'.ltrim($path, '/');
        $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
        if (!is_file($full)) {
            abort(404);
        }
        return response()->file($full);
    })->where('path', '.*');
}

// `/uploads/*` теперь читается из `public/site/uploads/*` — единый источник правды
// (синхронизируется из `extracted/uploads/` через `node scripts/sync-site.mjs`).
// Старая папка `public/uploads/` удалена из git: nginx с дефолтным `try_files`
// просто прокинет запрос в Laravel, и эта route отдаст файл из site/uploads.
Route::get('/uploads/{path}', function (string $path) {
    $rel = 'site/uploads/'.ltrim($path, '/');
    $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
    if (! is_file($full)) {
        abort(404);
    }

    return response()->file($full);
})->where('path', '.*');

Route::get('/', function () {
    return response()->file(public_path('site/index.html'));
})->name('home');

Route::get('/index.html', function () {
    return response()->file(public_path('site/index.html'));
})->name('iqmo.site_index');

Route::get('/profile.html', function () {
    return response()->file(public_path('site/profile.html'));
})->name('iqmo.profile_html');

Route::get('/login', function () {
    // Canonical login entrypoint is `/login.html` (served from `public/site/login.html`).
    return redirect('/login.html', 302);
})->name('iqmo.portal_login');

// Админ-UI лежит в resources/admin-ui (не в public), иначе Nginx отдаёт public/admin/* без PHP и middleware бессилен.
Route::middleware('iqmo.portal_admin')->group(function (): void {
    Route::get('/admin', function () {
        return redirect('/admin/index.html', 302);
    })->name('iqmo.admin');

    Route::get('/admin/{path}', function (string $path) {
        $path = ltrim($path, '/');
        if ($path === '' || str_ends_with($path, '/')) {
            abort(404);
        }
        if (str_contains($path, '..') || ! preg_match('#^[A-Za-z0-9][A-Za-z0-9_./-]*$#', $path)) {
            abort(404);
        }
        $full = resource_path('admin-ui'.DIRECTORY_SEPARATOR.str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path));
        if (! is_file($full)) {
            abort(404);
        }

        return response()->file($full);
    })->where('path', '.*');
});

Route::get('/cabinet', function () {
    return response()->file(public_path('site/profile.html'));
})->name('cabinet');

// Root-level static files referenced by pages served at `/<page>.html`.
// Example: `full-test-chemistry.html` includes `<script src="./exam-config.js">`,
// which resolves to `/exam-config.js` in the browser. We serve these from `public/site/`
// to avoid duplicating files into `public/`.
Route::get('/{file}', function (string $file) {
    if ($file !== basename($file) || ! preg_match('/^[A-Za-z0-9][A-Za-z0-9_.-]*\\.(js|css|map|json)$/', $file)) {
        abort(404);
    }
    $full = public_path('site/'.$file);
    if (! is_file($full)) {
        abort(404);
    }

    return response()->file($full);
})->where('file', '[A-Za-z0-9][A-Za-z0-9_.-]*\\.(js|css|map|json)');

// Остальные страницы портала (`subject-chemistry.html`, `trial-chemistry.html`, …): ссылки от главной
// идут с корня сайта, а файлы лежат в `public/site/` — без этого маршрута под `php artisan serve` везде 404.
Route::get('/{html}', function (string $html) {
    if ($html !== basename($html) || ! preg_match('/^[A-Za-z0-9][A-Za-z0-9_-]*\\.html$/', $html)) {
        abort(404);
    }
    $full = public_path('site/'.$html);
    if (! is_file($full)) {
        abort(404);
    }

    return response()->file($full);
})->where('html', '[A-Za-z0-9][A-Za-z0-9_-]*\\.html');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

