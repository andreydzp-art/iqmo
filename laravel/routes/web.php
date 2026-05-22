<?php

use App\Http\Controllers\ProfileController;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

require __DIR__.'/auth.php';

// Endpoint для сброса opcache живёт в `public/_opcache_reset.php` (вне
// Laravel-роутов): сам web.php тоже лежит в opcache и любой роут здесь
// не виден до самого первого сброса. См. этот файл и шаг
// «opcache_reset() via loopback request» в .github/workflows/deploy.yml.

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
        'js', 'mjs', 'jsx' => 'application/javascript; charset=UTF-8',
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
        'pdf' => 'application/pdf',
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

// Юридические документы: `extracted/docs/` → `public/site/docs/` (sync-site).
Route::get('/docs/{path}', function (string $path) use ($serveStatic) {
    $path = ltrim($path, '/');
    if (str_contains($path, '..')) {
        abort(404);
    }
    if (! preg_match('#^[A-Za-z0-9][A-Za-z0-9_./-]*$#', $path)) {
        abort(404);
    }
    $rel = 'site/docs/'.$path;
    $full = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, public_path($rel));
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('path', '.*');

// Server-side guard: если у пользователя уже валидная JWT-кука iqmo_session, страница
// логина не показывается — сразу 302 на /subject-biology/ (или на sanitized ?next=, если есть).
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
        $target = $safe ? $next : '/subject-biology/';

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

// Yandex Direct landing: `public/site/land/` (synced from `extracted/land/`).
Route::get('/land/{path?}', function (?string $path = null) use ($serveStatic) {
    $path = $path === null ? '' : ltrim($path, '/');
    if ($path === '' || $path === 'index.html') {
        $full = public_path('site/land/index.html');
        if (! is_file($full)) {
            abort(404);
        }

        return $serveStatic($full);
    }
    if (str_contains($path, '..')) {
        abort(404);
    }
    if (! preg_match('#^[A-Za-z0-9][A-Za-z0-9_./-]*$#', $path)) {
        abort(404);
    }
    $full = public_path('site/land/'.$path);
    if (! is_file($full)) {
        abort(404);
    }
    $ext = strtolower(pathinfo($full, PATHINFO_EXTENSION));
    if (! in_array($ext, ['css', 'js', 'jsx', 'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'], true)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('path', '.*');

// Canonical homepage is served at `/` (without exposing the file name in the URL).
// Keep `/index-standalone-design.html` for backward compatibility, but redirect to `/`.
Route::get('/index-standalone-design.html', function () {
    return redirect('/', 302);
})->name('iqmo.home_canonical');

Route::get('/', function () use ($serveStatic) {
    return $serveStatic(public_path('site/index-standalone-design.html'));
})->name('home');

// Каноничный URL главной — `/` (без `.html`), симметрично subject-/full-test-/admin-
// страницам. Старый `/index.html` 301-редиректит — поисковая выдача и внешние
// ссылки переезжают без потерь, и в браузере не остаётся «двух главных» с
// одинаковым контентом (дубль для индекса — антипаттерн SEO).
Route::get('/index.html', function () {
    return redirect('/', 301);
})->name('iqmo.site_index');

// `/profile/` — clean URL (симметрично /subject-<slug>/, /full-test-<slug>/).
// Старый /profile.html 301-редиректит на каноничный URL, чтобы внешние
// ссылки и закладки не отваливались, а в адресной строке у пользователей
// оставался только один вариант.
Route::get('/profile.html', function () {
    return redirect('/profile/', 301);
})->name('iqmo.profile_html');

$serveProfileIndex = function () use ($serveStatic) {
    return $serveStatic(public_path('site/profile/index.html'));
};
// `/profile` и `/profile/` — оба отдают index.html; Laravel нормализует
// trailing slash при роутинге, одной записи достаточно.
Route::get('/profile', $serveProfileIndex)->name('iqmo.profile');

Route::get('/login', function () {
    // Canonical login entrypoint is `/login.html` (served from `public/site/login.html`).
    return redirect('/login.html', 302);
})->name('iqmo.portal_login');

// Админ-UI лежит в resources/admin-ui (не в public), иначе Nginx отдаёт public/admin/* без PHP и middleware бессилен.
//
// Каноничный URL — `/admin/` (clean URL без `.html` в адресной строке, симметрично
// /subject-<slug>/). Старый /admin/index.html 301-редиректит на /admin/. Гость на
// любом URL получает ответ middleware iqmo.portal_admin (403/503) — редирект ему
// не виден, потому что middleware применяется ДО handler-а.
Route::middleware('iqmo.portal_admin')->group(function () use ($serveStatic): void {
    Route::get('/admin/index.html', function () {
        return redirect('/admin/', 301);
    });

    $serveAdminIndex = function () use ($serveStatic) {
        $full = resource_path('admin-ui'.DIRECTORY_SEPARATOR.'index.html');
        if (! is_file($full)) {
            abort(404);
        }

        return $serveStatic($full);
    };

    // /admin и /admin/ — оба отдают index.html напрямую (Laravel нормализует
    // trailing slash при роутинге, поэтому одной записи достаточно для обоих URL).
    Route::get('/admin', $serveAdminIndex)->name('iqmo.admin');

    Route::get('/admin/{path}', function (string $path) use ($serveStatic, $serveAdminIndex) {
        $path = ltrim($path, '/');
        // Пустой path = `/admin/` — отдаём index.html (раньше тут был abort(404),
        // а сам index.html был доступен только по /admin/index.html).
        if ($path === '') {
            return $serveAdminIndex();
        }
        if (str_ends_with($path, '/')) {
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

Route::get('/cabinet', function () use ($serveProfileIndex) {
    return $serveProfileIndex();
})->name('cabinet');

// Root-level static files referenced by pages served at `/<page>` (clean URL)
// or `/<page>.html` (legacy). Example: страницы full-test-* подключают
// `<script src="/exam-config.js">`, и этот маршрут отдаёт его из public/site/,
// не дублируя файлы в public/.
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

// === Subject pages: clean URLs ===
// Каноничный URL — `/subject-<slug>/` (без `.html` в адресной строке).
// Файл лежит в `public/site/subject-<slug>/index.html` (синхронизируется
// из `extracted/subject-<slug>/index.html` через `node scripts/sync-site.mjs`).
//
// Старый плоский URL `/subject-<slug>.html` 301-редиректит на новый —
// поисковая выдача и внешние ссылки переезжают без потерь. Делать через
// nginx/.htaccess не получается: на VPS стоит nginx, который не читает
// .htaccess, и все запросы и так проходят через Laravel index.php.
//
// Добавить новый предмет (math, russian, physics, history, …):
//   1. Создать `extracted/subject-<slug>/index.html` (можно скопировать
//      `extracted/subject-biology/index.html` как стартовый каркас).
//      Все ассетные пути в этом index.html должны быть АБСОЛЮТНЫМИ
//      (`/iqmo-base.css`, `/img/...`), потому что страница лежит в
//      подпапке.
//   2. Прописать slug в массив `$SUBJECTS` ниже.
//   3. `node scripts/sync-site.mjs` → коммит → пуш.
$SUBJECTS = ['chemistry', 'biology'];

Route::get('/subject-{slug}.html', function (string $slug) use ($SUBJECTS) {
    if (! in_array($slug, $SUBJECTS, true)) {
        abort(404);
    }

    return redirect('/subject-'.$slug.'/', 301);
})->where('slug', '[a-z0-9-]+');

Route::get('/subject-{slug}', function (string $slug) use ($serveStatic, $SUBJECTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug)) {
        abort(404);
    }
    if (! in_array($slug, $SUBJECTS, true)) {
        abort(404);
    }
    $full = public_path('site/subject-'.$slug.'/index.html');
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('slug', '[a-z0-9-]+');

// `full-test-{slug}` — полный пробный вариант ОГЭ (геймифицированная карта
// уровней + сам тест с вопросами, тот же подход к clean URL, что и у
// /subject-<slug>/). Файлы — `public/site/full-test-<slug>/index.html`,
// синхронизируются из `extracted/full-test-<slug>/index.html`.
$FULL_TESTS = ['chemistry', 'biology'];

Route::get('/full-test-{slug}.html', function (string $slug) use ($FULL_TESTS) {
    if (! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }

    return redirect('/full-test-'.$slug.'/', 301);
})->where('slug', '[a-z0-9-]+');

Route::get('/full-test-{slug}', function (string $slug) use ($serveStatic, $FULL_TESTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug)) {
        abort(404);
    }
    if (! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }
    $full = public_path('site/full-test-'.$slug.'/index.html');
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('slug', '[a-z0-9-]+');

// Глава 2 — карта демо-вариантов (вложенные URL под /full-test-{slug}/)
Route::get('/full-test-{slug}/chapter-2', function (string $slug) use ($FULL_TESTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug) || ! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }

    return redirect('/full-test-'.$slug.'/chapter-2/', 301);
})->where('slug', '[a-z0-9-]+');

Route::get('/full-test-{slug}/chapter-2/', function (string $slug) use ($serveStatic, $FULL_TESTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug) || ! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }
    $full = public_path('site/full-test-'.$slug.'/chapter-2/index.html');
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('slug', '[a-z0-9-]+');

Route::get('/full-test-{slug}/chapter-2/variant/{vid}', function (string $slug, string $vid) use ($FULL_TESTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug) || ! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }
    if (! preg_match('/^[0-9]+$/', $vid)) {
        abort(404);
    }

    return redirect('/full-test-'.$slug.'/chapter-2/variant/'.$vid.'/', 301);
})->where('slug', '[a-z0-9-]+');

Route::get('/full-test-{slug}/chapter-2/variant/{vid}/', function (string $slug, string $vid) use ($serveStatic, $FULL_TESTS) {
    if (! preg_match('/^[a-z0-9-]+$/', $slug) || ! in_array($slug, $FULL_TESTS, true)) {
        abort(404);
    }
    if (! preg_match('/^[0-9]+$/', $vid)) {
        abort(404);
    }
    $full = public_path('site/full-test-'.$slug.'/chapter-2/variant/'.$vid.'/index.html');
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('slug', '[a-z0-9-]+');

// Остальные страницы портала (`trial-chemistry.html`, `warmup-chemistry.html`,
// `topic-*.html`, …): ссылки от главной идут с корня сайта, а файлы лежат
// в `public/site/` — без этого маршрута под `php artisan serve` везде 404.
Route::get('/{html}', function (string $html) use ($serveStatic) {
    if ($html !== basename($html) || ! preg_match('/^[A-Za-z0-9][A-Za-z0-9_-]*\\.html$/', $html)) {
        abort(404);
    }
    $full = public_path('site/'.$html);
    if (! is_file($full)) {
        abort(404);
    }

    return $serveStatic($full);
})->where('html', '[A-Za-z0-9][A-Za-z0-9_-]*\\.html');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Breeze-стек кабинета (его UI лежит в resources/views/profile/*.blade.php).
// На клиентском сайте мы его не используем — пользователи открывают свой
// IQMO-профиль по `/profile/` (см. выше). Чтобы оба кабинета не дрались
// за один URL, Breeze переехал на `/account/*`. Имена роутов
// (`profile.edit`/`profile.update`/`profile.destroy`) сохраняются — все
// Blade-views и `route('profile.edit')` продолжают работать без правок.
Route::middleware('auth')->group(function () {
    Route::get('/account', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/account', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/account', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

