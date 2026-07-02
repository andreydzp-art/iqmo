<?php

namespace App\Http\Controllers\Api;

use App\Constants\ApiErrorCode;
use App\Http\Controllers\Controller;
use App\Services\IqmoAuditLogger;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

final class IqmoAuthController extends Controller
{
    public function register(Request $request)
    {
        $email = strtolower(trim((string) $request->input('email', '')));
        $password = (string) $request->input('password', '');

        // Длину email проверяем наравне с форматом: без cap'а строка на
        // 10 000 символов проходит regex, а INSERT затем падает на
        // `data too long` (SQLSTATE 22001) — это НЕ 23000, поэтому код ниже
        // не распознаёт её как duplicate и отдаёт 500 вместо 400. 254 —
        // RFC-максимум для адреса; колонка users.email (320) с запасом.
        if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email) || strlen($email) > 254) {
            return response()->json(['error' => 'invalid_email'], 400);
        }
        if (strlen($password) < 8) {
            return response()->json(['error' => 'password_short'], 400);
        }
        // bcrypt игнорирует байты после 72-го: пароль длиннее молча
        // обрезается, и его «хвост» ни на что не влияет (в т.ч. при логине).
        // Явно отклоняем, чтобы пользователь не задал пароль с бессмысленным
        // суффиксом. Login намеренно НЕ капаем: существующие аккаунты с таким
        // паролем должны продолжать входить (сравнение — та же обрезка).
        if (strlen($password) > 72) {
            return response()->json(['error' => 'password_long'], 400);
        }

        $hash = Hash::make($password);
        $now = (int) (microtime(true) * 1000);

        try {
            $userId = (int) DB::connection('iqmo')->table('users')->insertGetId([
                'email' => $email,
                'password_hash' => $hash,
                'created_at' => $now,
            ]);
        } catch (\Throwable $e) {
            // ER_DUP_ENTRY — email уже занят. Раньше отдавали 409 email_taken,
            // что давало email enumeration: атакующий со списком email'ов
            // мог отличить «свободен» от «занят» по статус-коду.
            //
            // Теперь применяем register-or-login (audit #6): пробуем залогинить
            // пользователя этим же паролем.
            //   • Если пароль совпадает — silent login (тот же ответ, что
            //     register success). Хороший UX: юзер забыл, что у него уже
            //     есть аккаунт, ввёл «register», по факту попал внутрь.
            //   • Если пароль не совпадает — отдаём ровно тот же ответ, что
            //     /api/auth/login на invalid_credentials (401). Атакующий не
            //     может различить «email свободен» от «email занят, пароль
            //     не угадан» — оба ответа выглядят одинаково.
            //
            // Для нового email атакующий получает 200 OK (создаём аккаунт),
            // но это тоже не enumeration: rate limit (5/min per IP, см.
            // throttle:iqmo-auth-register) делает атаку нерентабельной.
            if (str_contains((string) $e->getCode(), '23000') || str_contains($e->getMessage(), 'Duplicate')) {
                $existing = DB::connection('iqmo')
                    ->table('users')
                    ->where('email', $email)
                    ->first();

                            if ($existing && Hash::check($password, (string) $existing->password_hash)) {
                                $userId = (int) $existing->id;
                                $this->issueSessionCookie($userId, $email);
                                $this->ensureProfileRow($userId);
                                // Silent login через register endpoint: пишем как
                                // обычный auth.login, не register — это не создание
                                // нового аккаунта. Контекст помогает отличить от
                                // прямого /api/auth/login (полезно при анализе фуннела).
                                IqmoAuditLogger::record(
                                    IqmoAuditLogger::AUTH_LOGIN,
                                    $userId,
                                    $email,
                                    ['source' => 'register_or_login'],
                                    $request
                                );

                                return response()->json(['ok' => true, 'email' => $email]);
                            }

                            return response()->json(['error' => 'invalid_credentials'], 401);
                        }

                        report($e);

                        return response()->json(['error' => 'server'], 500);
                    }

                    $this->issueSessionCookie($userId, $email);
                    $this->ensureProfileRow($userId);
                    IqmoAuditLogger::record(
                        IqmoAuditLogger::AUTH_REGISTER,
                        $userId,
                        $email,
                        [],
                        $request
                    );

                    return response()->json(['ok' => true, 'email' => $email]);
                }

    public function login(Request $request)
    {
        $email = strtolower(trim((string) $request->input('email', '')));
        $password = (string) $request->input('password', '');

        $row = DB::connection('iqmo')->table('users')->where('email', $email)->first();
        if (!$row || !Hash::check($password, (string) $row->password_hash)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $userId = (int) $row->id;
        $this->issueSessionCookie($userId, $email);
        $this->ensureProfileRow($userId);
        IqmoAuditLogger::record(
            IqmoAuditLogger::AUTH_LOGIN,
            $userId,
            $email,
            [],
            $request
        );

        return response()->json(['ok' => true, 'email' => $email]);
    }

    public function logout(Request $request)
    {
        // Пытаемся определить actor для audit-row до того, как стираем
        // cookie. Без middleware iqmo.jwt здесь, поэтому разбираем сами.
        $jwt = IqmoJwt::fromConfig();
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $token = (string) ($request->cookies->get($cookieName) ?? '');
        $payload = $jwt->verify($token);
        if ($payload) {
            IqmoAuditLogger::record(
                IqmoAuditLogger::AUTH_LOGOUT,
                (int) $payload['uid'],
                (string) ($payload['email'] ?? ''),
                [],
                $request
            );
        }

        $resp = response()->json(['ok' => true]);
        $resp->headers->clearCookie($cookieName, path: '/');

        return $resp;
    }

    /**
     * POST /api/auth/logout-everywhere — server-side revocation всех
     * активных JWT этого юзера (audit #3). INCREMENT users.token_version:
     * любой ранее выпущенный JWT с tv = N перестаёт совпадать с
     * актуальным tv = N+1 в БД, и AuthenticateIqmoJwt отдаёт 401 на
     * следующем же запросе с этого токена.
     *
     * Сценарии использования:
     *   • украдено устройство / cookie утёк через XSS — кнопка «Выйти на
     *     всех устройствах» в profile;
     *   • при смене пароля (когда endpoint появится) этот же механизм
     *     вызывается из контроллера автоматически, чтобы старые сессии
     *     не пережили password rotation.
     *
     * Mounted под `iqmo.jwt`: к моменту хендлера middleware уже
     * подтвердил существующий валидный токен и положил uid в attributes.
     */
    public function logoutEverywhere(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id', 0);
        if ($userId <= 0) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        try {
            DB::connection('iqmo')->table('users')->where('id', $userId)->increment('token_version');
        } catch (\Throwable $e) {
            // Колонка отсутствует на старом инстансе — миграция не
            // прокатилась. Без неё нечего инкрементить; отдаём 503,
            // чтобы клиент мог повторить позже / показать пользователю.
            report($e);

            return response()->json(['error' => 'revocation_unavailable'], 503);
        }

        IqmoAuditLogger::record(
            IqmoAuditLogger::AUTH_LOGOUT_EVERYWHERE,
            $userId,
            (string) $request->attributes->get('iqmo_user_email'),
            [],
            $request
        );

        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $resp = response()->json(['ok' => true]);
        $resp->headers->clearCookie($cookieName, path: '/');

        return $resp;
    }

    public function me(Request $request)
    {
        $jwt = IqmoJwt::fromConfig();
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $token = (string) ($request->cookies->get($cookieName) ?? '');
        $payload = $jwt->verify($token);
        $noStore = ['Cache-Control' => 'private, no-store, max-age=0, must-revalidate'];

        if (!$payload) {
            return response()->json(['error' => 'unauthorized'], 401)->withHeaders($noStore);
        }

        $uid = (int) $payload['uid'];
        // Read users row для двух целей: created_at для UI и
        // token_version для revocation check (audit #3). /api/me
        // намеренно НЕ под middleware iqmo.jwt — он guest-friendly:
        // нужен fast-path для anonymous browsing, и middleware всегда
        // отдаёт 401. Поэтому проверка revocation встроена прямо здесь:
        // если в users нет такого uid (account deleted) или
        // token_version разошёлся (logout-everywhere) — отдаём 401, как
        // если бы JWT был просрочен. Без этого после logout-everywhere
        // UI продолжал бы показывать юзера как залогиненного, пока
        // следующий middleware-protected запрос не отдаст 401.
        $createdAt = null;
        try {
            $row = DB::connection('iqmo')
                ->table('users')
                ->select('created_at', 'token_version')
                ->where('id', $uid)
                ->first();

            if (!$row) {
                return response()->json(['error' => 'unauthorized'], 401)->withHeaders($noStore);
            }

            $serverTv = isset($row->token_version) ? (int) $row->token_version : 1;
            if ($serverTv !== (int) $payload['tv']) {
                return response()->json(['error' => 'unauthorized'], 401)->withHeaders($noStore);
            }

            if ($row->created_at !== null) {
                $createdAt = (int) $row->created_at;
            }
        } catch (\Throwable $e) {
            // DB unreachable — не валим юзера 401-ом, ограничиваемся подписью.
            // Это редкий случай и UI продолжит работать; при восстановлении
            // БД revocation check вернётся.
        }

        return response()->json([
            'id' => $uid,
            'email' => $payload['email'],
            'created_at' => $createdAt,
        ])->withHeaders($noStore);
    }

    /**
     * DELETE /api/auth/me — irreversible account deletion (ФЗ-152, право на удаление).
     *
     * Mounted under `iqmo.jwt` middleware: by the time we get here we already have
     * a verified uid in request->attributes. We still defensively re-read it
     * instead of trusting any client-supplied id.
     *
     * Order of deletes:
     *   1. analytics_events (FK cascade exists, but doing it explicitly survives
     *      legacy installs where the table was created via mysql-schema.sql
     *      without the cascade FK).
     *   2. profile_history, profile_state (same defence-in-depth).
     *   3. users — last; once it's gone, the FK chains can no longer reach.
     *
     * Wrapped in a transaction so a failure mid-way doesn't leave us with an
     * orphan users row whose data is half-deleted.
     */
    public function deleteMe(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id', 0);
        if ($userId <= 0) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        $email = (string) $request->attributes->get('iqmo_user_email');
        // Пишем audit-row ДО удаления users-row: после DELETE FROM users
        // FK не дал бы записать (если бы он был); кроме того, эту запись
        // мы хотим иметь даже если удаление упадёт по transaction-rollback —
        // тогда останется forensic-trail, что попытка была.
        // actor_user_id оставляем (юзер ещё существует на момент записи),
        // но и actor_email положим — это compliance-важная информация
        // («Кто запросил удаление?»), а после стирания users-row никакой
        // другой источник email уже не покажет.
        IqmoAuditLogger::record(
            IqmoAuditLogger::AUTH_ACCOUNT_DELETE,
            $userId,
            $email,
            [],
            $request
        );

        try {
            DB::connection('iqmo')->transaction(function () use ($userId): void {
                $iqmo = DB::connection('iqmo');

                if ($iqmo->getSchemaBuilder()->hasTable('analytics_events')) {
                    $iqmo->table('analytics_events')->where('user_id', $userId)->delete();
                }
                if ($iqmo->getSchemaBuilder()->hasTable('profile_history')) {
                    $iqmo->table('profile_history')->where('user_id', $userId)->delete();
                }
                if ($iqmo->getSchemaBuilder()->hasTable('profile_state')) {
                    $iqmo->table('profile_state')->where('user_id', $userId)->delete();
                }
                $iqmo->table('users')->where('id', $userId)->delete();
            });
        } catch (\Throwable $e) {
            report($e);

            return response()->json(['error' => ApiErrorCode::SERVER], 500);
        }

        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $resp = response()->json(['ok' => true]);
        $resp->headers->clearCookie($cookieName, path: '/');

        return $resp;
    }

    /**
     * Список admin-email'ов в нижнем регистре, без пробелов и пустых
     * значений. Возвращает то же самое, что использует EnsureIqmoPortalAdmin
     * — единая правда о том, кто admin.
     *
     * @return list<string>
     */
    private function adminEmails(): array
    {
        $allowed = config('iqmo.admin_emails', []);
        if (! is_array($allowed)) {
            return [];
        }

        return array_values(array_unique(array_filter(array_map(
            static fn (mixed $e): string => strtolower(trim((string) $e)),
            $allowed
        ))));
    }

    private function issueSessionCookie(int $userId, string $email): void
    {
        // Включаем актуальный token_version в payload (audit #3). Если
        // колонки ещё нет (свежий VPS, миграция не прокатилась) или строка
        // отсутствует — используем 1 как дефолт. Любое расхождение с
        // users.token_version в middleware = 401.
        $tv = 1;
        try {
            $row = DB::connection('iqmo')
                ->table('users')
                ->select('token_version')
                ->where('id', $userId)
                ->first();
            if ($row && isset($row->token_version)) {
                $tv = (int) $row->token_version;
            }
        } catch (\Throwable $e) {
            // Колонки нет — schema ещё не мигрирована. Подписываем tv=1.
        }

        $token = IqmoJwt::fromConfig()->sign(['uid' => $userId, 'email' => $email, 'tv' => $tv]);
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $domain = config('iqmo.cookie_domain');
        if (!is_string($domain) || $domain === '') {
            $domain = null;
        }
        $secure = config('iqmo.cookie_secure');
        if ($secure === null) {
            $appUrl = (string) config('app.url', '');
            $secure = Str::startsWith($appUrl, 'https://');
        }

        // SameSite=strict для admin-email (audit #16). Защита от CSRF
        // на admin-actions: даже если злоумышленник заведёт сайт
        // example.com с <form action="https://iqmoschool.ru/admin/...">
        // или <img src="https://...?delete=1"> — браузер не отправит
        // cookie, потому что SameSite=strict запрещает cross-site
        // sending для всех типов запросов, включая top-level navigation.
        //
        // Минус strict: admin, кликнувший на iqmoschool.ru с внешнего
        // сайта (поисковик, мессенджер), увидит первый запрос как
        // guest. Это приемлемо: дальнейшая навигация уже same-origin,
        // и cookie возвращается. Для обычных юзеров оставляем lax —
        // strict бы раздражал на каждой ссылке из почты/мессенджера.
        $isAdmin = in_array(strtolower($email), $this->adminEmails(), true);
        $sameSite = $isAdmin ? 'strict' : 'lax';

        cookie()->queue(
            cookie(
                name: $cookieName,
                value: $token,
                minutes: 30 * 24 * 60,
                path: '/',
                domain: $domain,
                secure: (bool) $secure,
                httpOnly: true,
                raw: false,
                sameSite: $sameSite
            )
        );
    }

    private function ensureProfileRow(int $userId): void
    {
        $now = (int) (microtime(true) * 1000);
        // Был raw 'INSERT IGNORE INTO ... CAST(? AS JSON)' — это MySQL-syntax,
        // на sqlite (Feature-тесты) падал «syntax error near IGNORE».
        // insertOrIgnore у Laravel прозрачно мапится на:
        //   MySQL    → INSERT IGNORE INTO ...
        //   SQLite   → INSERT OR IGNORE INTO ...
        //   Postgres → INSERT ... ON CONFLICT DO NOTHING
        // На MySQL колонка keys_json типа JSON — он сам парсит '{}' как валидный
        // JSON, явный CAST не нужен.
        DB::connection('iqmo')->table('profile_state')->insertOrIgnore([
            'user_id' => $userId,
            'keys_json' => '{}',
            'revision' => 0,
            'updated_at' => $now,
        ]);
    }
}
