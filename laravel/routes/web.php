<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

// Static site assets (served by Nginx on VPS; routed here for local `php artisan serve`)
foreach (['assets', 'img', 'uploads', 'badges', 'admin'] as $dir) {
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
    // `admin/index.html` loads `./mock-data.js` relative to the URL path.
    // Serving the same HTML at `/login` breaks relative assets, so redirect to the canonical admin URL.
    return redirect('/admin/index.html', 302);
})->name('iqmo.admin_login');

Route::get('/cabinet', function () {
    return response()->file(public_path('site/profile.html'));
})->name('cabinet');

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

