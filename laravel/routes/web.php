<?php

use App\Http\Controllers\ProfileController;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

require __DIR__.'/auth.php';

// `/uploads/login.html` must remain a real page (not redirect to `/login.html`): an outdated
// `site/login.html` stub that meta-refreshes to `/uploads/` would otherwise loop with a redirect.

// PHP `finfo_file()` is unreliable for short text files: it returns `text/x-asm` for some
// `.min.css`, `text/html` for short `.js` (e.g. `iqmo-nav.js`), etc.
// Combined with our `X-Content-Type-Options: nosniff` header that breaks the page
// (browsers refuse to apply such files as CSS/JS). Force the right Content-Type by extension.
$serveStatic = function (string $full): BinaryFileResponse {
    $response = response()->file($full);
    $ext = strtolower(pathinfo($full, PATHINFO_EXTENSION));
    $mime = match ($ext) {
        'css' => 'text/css; charset=UTF-8',
        'js', 'mjs' => 'application/javascript; charset=UTF-8',
        'json', 'map' => 'application/json; charset=UTF-8',
        'webmanifest' => 'application/manifest+json; charset=UTF-8',
        'html', 'htm' => 'text/html; charset=UTF-8',
        'svg' => 'image/svg+xml',
        'xml' => 'application/xml; charset=UTF-8',
        'txt' => 'text/plain; charset=UTF-8',
        'png' => 'image/png',
        'jpg', 'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
        default => null,
    };
    if ($mime !== null) {
        $response->headers->set('Content-Type', $mime);
    }
    if ($ext === 'html' || $ext === 'htm') {
        $response->headers->set('Cache-Control', 'private, no-cache');
    }
    return $response;
};

// Static site assets (served by Nginx on VPS; routed here for local `php artisan serve`)
// `/admin/*` is not public: see protected routes below (IQMO_ADMIN_EMAILS + portal session).
foreach (['assets', 'badges'] as $dir) {
    Route::get("/{$dir}/{path}", function (string $path) use ($dir, $serveStatic) {
        // Use forward slashes for Laravel path helpers, then normalize.
        $rel = $dir.'/'.ltrim($path, '/');
        $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
        if (!is_file($full)) {
            abort(404);
        }
        return $serveStatic($full);
    })->where('path', '.*');
}

// Иллюстрации к заданиям: `extracted/img/` → `public/site/img/` (sync-site). URL `/img/...` — тот же префикс, что в HTML.
Route::get('/img/{path}', function (string $path) use ($serveStatic) {
    $path = ltrim($path, '/');
    if (str_contains($path, '..')) {
        abort(404);
    }
    if (! preg_match('#^[A-Za-z0-9][A-Za-z0-9_./-]*$#', $path)) {
        abort(404);
    }
    $rel = 'site/img/'.$path;
    $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('path', '.*');

// Server-side guard: если у пользователя уже валидная JWT-кука iqmo_session, страница
// логина не показывается — сразу 302 на /profile.html (или на sanitized ?next=, если есть).
// Без этого залогиненный юзер на ~200 мс видит форму, прежде чем JS делает /api/me.
// Применяется к каноничному /login.html и к alias /uploads/login.html.
$skipIfAuthed = function (Request $request) use ($serveStatic): \Symfony\Component\HttpFoundation\Response {
    $uid = IqmoJwt::userIdFromCookie($request);
    if ($uid !== null && $uid > 0) {
        // Сюда попадает только локальный путь, начинающийся с одного `/` (не `//`, не схема).
        // Иначе это open-redirect на чужой хост — игнорируем, отправляем в кабинет.
        $next = (string) $request->query('next', '');
        $safe = $next !== ''
            && str_starts_with($next, '/')
            && ! str_starts_with($next, '//')
            && ! str_contains($next, "\r")
            && ! str_contains($next, "\n");
        $target = $safe ? $next : '/subject-biology.html';

        return redirect($target, 302);
    }

    return $serveStatic(public_path('site/login.html'));
};

Route::get('/login.html', $skipIfAuthed);
Route::get('/uploads/login.html', $skipIfAuthed);

// `/uploads/*` теперь читается из `public/site/uploads/*` — единый источник правды
// (синхронизируется из `extracted/uploads/` через `node scripts/sync-site.mjs`).
// Старая папка `public/uploads/` удалена из git: nginx с дефолтным `try_files`
// просто прокинет запрос в Laravel, и эта route отдаст файл из site/uploads.
Route::get('/uploads/{path}', function (string $path) use ($serveStatic) {
    $rel = 'site/uploads/'.ltrim($path, '/');
    $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('path', '.*');

// Quiz landings live under `public/site/quiz/<id>/index.html` (synced from `extracted/quiz/<id>/index.html`).
// On VPS Nginx typically routes `/quiz/...` to Laravel (the file is not under `public/`), so serve it here.
Route::get('/quiz/{id}/{path?}', function (string $id, ?string $path = null) use ($serveStatic) {
    if (! preg_match('/^[0-9]+$/', $id)) {
        abort(404);
    }

    $path = $path === null ? '' : ltrim($path, '/');
    if ($path === '' || $path === 'index.html') {
        $full = public_path('site/quiz/'.$id.'/index.html');
        if (! is_file($full)) {
            abort(404);
        }
        return $serveStatic($full);
    }

    // For now quiz is a single-file landing; disallow arbitrary file serving under /quiz.
    abort(404);
})->where('path', '.*');

// Canonical homepage is served at `/` (without exposing the file name in the URL).
// Keep `/index-standalone-design.html` for backward compatibility, but redirect to `/`.
Route::get('/index-standalone-design.html', function () {
    return redirect('/', 302);
})->name('iqmo.home_canonical');

Route::get('/', function () use ($serveStatic) {
    return $serveStatic(public_path('site/index-standalone-design.html'));
})->name('home');

Route::get('/index.html', function () use ($serveStatic) {
    return $serveStatic(public_path('site/index-standalone-design.html'));
})->name('iqmo.site_index');

Route::get('/profile.html', function () use ($serveStatic) {
    return $serveStatic(public_path('site/profile.html'));
})->name('iqmo.profile_html');

Route::get('/login', function () {
    // Canonical login entrypoint is `/login.html` (served from `public/site/login.html`).
    return redirect('/login.html', 302);
})->name('iqmo.portal_login');

// Админ-UI лежит в resources/admin-ui (не в public), иначе Nginx отдаёт public/admin/* без PHP и middleware бессилен.
Route::middleware('iqmo.portal_admin')->group(function () use ($serveStatic): void {
    Route::get('/admin', function () {
        return redirect('/admin/index.html', 302);
    })->name('iqmo.admin');

    Route::get('/admin/{path}', function (string $path) use ($serveStatic) {
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

        return $serveStatic($full);
    })->where('path', '.*');
});

Route::get('/cabinet', function () use ($serveStatic) {
    return $serveStatic(public_path('site/profile.html'));
})->name('cabinet');

// Root-level static files referenced by pages served at `/<page>.html`.
// Example: `full-test-chemistry.html` includes `<script src="./exam-config.js">`,
// which resolves to `/exam-config.js` in the browser. We serve these from `public/site/`
// to avoid duplicating files into `public/`.
Route::get('/{file}', function (string $file) use ($serveStatic) {
    if ($file !== basename($file) || ! preg_match('/^[A-Za-z0-9][A-Za-z0-9_.-]*\\.(js|css|map|json)$/', $file)) {
        abort(404);
    }
    $full = public_path('site/'.$file);
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('file', '[A-Za-z0-9][A-Za-z0-9_.-]*\\.(js|css|map|json)');

// Остальные страницы портала (`subject-chemistry.html`, `trial-chemistry.html`, …): ссылки от главной
// идут с корня сайта, а файлы лежат в `public/site/` — без этого маршрута под `php artisan serve` везде 404.
Route::get('/{html}', function (string $html) use ($serveStatic) {
    if ($html !== basename($html) || ! preg_match('/^[A-Za-z0-9][A-Za-z0-9_-]*\\.html$/', $html)) {
        abort(404);
    }
    $full = public_path('site/'.$html);
    if (! is_file($full)) {
        abort(404);
    }

    // Старые копии `subject-chemistry.html` вели «Биология» на index.html. Пока `sync-site` на VPS
    // не прогнали, подменяем ссылку при отдаче через Laravel (запрос должен дойти до index.php).
    if ($html === 'subject-chemistry.html') {
        $raw = @file_get_contents($full);
        if ($raw !== false) {
            $patched = preg_replace(
                '/<a\\s+href="[^"]*index\\.html"\\s+class="subjects__item\\s+tone-bio"/',
                '<a href="/subject-biology.html" class="subjects__item tone-bio"',
                $raw,
                1
            );
            if ($patched !== $raw) {
                return response($patched, 200)
                    ->header('Content-Type', 'text/html; charset=UTF-8')
                    ->header('Cache-Control', 'private, no-cache');
            }
        }
    }

    return $serveStatic($full);
})->where('html', '[A-Za-z0-9][A-Za-z0-9_-]*\\.html');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

