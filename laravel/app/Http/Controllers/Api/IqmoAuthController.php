<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

        if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
            return response()->json(['error' => 'invalid_email'], 400);
        }
        if (strlen($password) < 8) {
            return response()->json(['error' => 'password_short'], 400);
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

                    return response()->json(['ok' => true, 'email' => $email]);
                }

                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            report($e);

            return response()->json(['error' => 'server'], 500);
        }

        $this->issueSessionCookie($userId, $email);
        $this->ensureProfileRow($userId);

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

        return response()->json(['ok' => true, 'email' => $email]);
    }

    public function logout()
    {
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
        $createdAt = null;
        try {
            $row = DB::connection('iqmo')->table('users')->select('created_at')->where('id', $uid)->first();
            if ($row && $row->created_at !== null) {
                $createdAt = (int) $row->created_at;
            }
        } catch (\Throwable $e) {
            // оставим created_at = null, страница откатится на локальный счётчик
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

            return response()->json(['error' => 'server'], 500);
        }

        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $resp = response()->json(['ok' => true]);
        $resp->headers->clearCookie($cookieName, path: '/');

        return $resp;
    }

    private function issueSessionCookie(int $userId, string $email): void
    {
        $token = IqmoJwt::fromConfig()->sign(['uid' => $userId, 'email' => $email]);
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
                sameSite: 'lax'
            )
        );
    }

    private function ensureProfileRow(int $userId): void
    {
        $now = (int) (microtime(true) * 1000);
        DB::connection('iqmo')->statement(
            'INSERT IGNORE INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?, CAST(? AS JSON), 0, ?)',
            [$userId, '{}', $now]
        );
    }
}
