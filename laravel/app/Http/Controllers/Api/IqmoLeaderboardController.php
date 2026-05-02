<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Публичный leaderboard для боковой карточки на subject-pages.
 *
 * XP агрегируется из колонки profile_state.keys_json (там лежит весь сихронизированный
 * localStorage пользователя). Ключ с тотал-XP — `iqmo-chem-progress-points-v1`,
 * см. extracted/chem-progress.js. Это тот же XP, что показывается в шапке страницы,
 * поэтому никаких отдельных таблиц XP не требуется.
 *
 * Endpoint доступен и гостям (чтобы блок «Рейтинг» рендерился без логина), но email
 * других пользователей всегда замаскирован (a***y@g***.com), а полный email мы вообще
 * не отдаём — даже о себе. Поле `is_me` — единственный признак, по которому фронт
 * подсвечивает «Вы».
 */
final class IqmoLeaderboardController extends Controller
{
    /** Ключ localStorage с накопительным XP. */
    private const XP_KEY = 'iqmo-chem-progress-points-v1';
    private const MAX_LIMIT = 50;
    private const MAX_LEVEL = 50;

    public function index(Request $request)
    {
        $limit = (int) $request->query('limit', 5);
        if ($limit < 1) {
            $limit = 5;
        }
        if ($limit > self::MAX_LIMIT) {
            $limit = self::MAX_LIMIT;
        }

        $meId = $this->resolveCurrentUserId($request);

        $xpPath = '$."' . self::XP_KEY . '"';

        // Top N. JOIN на profile_state может быть NULL (если у пользователя ни одной
        // синхронизации не было) — тогда COALESCE даёт 0, и такой пользователь окажется
        // в самом конце.
        $topRows = DB::connection('iqmo')->select(
            "SELECT u.id AS uid, u.email,
                    COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(ps.keys_json, ?)) AS UNSIGNED), 0) AS xp
             FROM users u
             LEFT JOIN profile_state ps ON ps.user_id = u.id
             ORDER BY xp DESC, u.id ASC
             LIMIT " . $limit,
            [$xpPath]
        );

        $items = [];
        foreach ($topRows as $i => $r) {
            $uid = (int) $r->uid;
            $xp = (int) $r->xp;
            $items[] = [
                'rank' => $i + 1,
                'uid' => $uid,
                'display' => $this->maskEmail((string) $r->email),
                'initials' => $this->initialsFromEmail((string) $r->email),
                'xp' => $xp,
                'level' => $this->levelFromXp($xp),
                'is_me' => $meId > 0 && $uid === $meId,
            ];
        }

        $me = null;
        if ($meId > 0) {
            $meRow = DB::connection('iqmo')->selectOne(
                "SELECT u.email,
                        COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(ps.keys_json, ?)) AS UNSIGNED), 0) AS xp
                 FROM users u
                 LEFT JOIN profile_state ps ON ps.user_id = u.id
                 WHERE u.id = ?",
                [$xpPath, $meId]
            );
            if ($meRow) {
                $myXp = (int) $meRow->xp;
                $rankRow = DB::connection('iqmo')->selectOne(
                    "SELECT COUNT(*) AS c FROM users u
                     LEFT JOIN profile_state ps ON ps.user_id = u.id
                     WHERE COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(ps.keys_json, ?)) AS UNSIGNED), 0) > ?",
                    [$xpPath, $myXp]
                );
                $me = [
                    'uid' => $meId,
                    'rank' => ((int) ($rankRow->c ?? 0)) + 1,
                    'xp' => $myXp,
                    'level' => $this->levelFromXp($myXp),
                    'initials' => $this->initialsFromEmail((string) $meRow->email),
                ];
            }
        }

        return response()->json([
            'items' => $items,
            'me' => $me,
        ])->withHeaders([
            'Cache-Control' => 'public, max-age=30',
        ]);
    }

    /**
     * Достаём uid из JWT-куки (если есть). Своего middleware у эндпоинта нет, потому
     * что роут публичный — гости должны видеть рейтинг, просто без отметки «Вы».
     */
    private function resolveCurrentUserId(Request $request): int
    {
        try {
            $jwt = IqmoJwt::fromConfig();
            $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
            $token = (string) ($request->cookies->get($cookieName) ?? '');
            if ($token === '') {
                return 0;
            }
            $payload = $jwt->verify($token);
            return $payload ? (int) ($payload['uid'] ?? 0) : 0;
        } catch (\Throwable $e) {
            return 0;
        }
    }

    /** Маска: `a***y@g***.com` (не раскрываем email даже для самого пользователя). */
    private function maskEmail(string $email): string
    {
        $email = trim($email);
        $at = strpos($email, '@');
        if ($at === false || $at < 1) {
            return 'user';
        }
        $local = substr($email, 0, $at);
        $domain = substr($email, $at + 1);
        $maskedLocal = mb_strlen($local) <= 2
            ? mb_substr($local, 0, 1) . '***'
            : mb_substr($local, 0, 1) . '***' . mb_substr($local, -1);
        $dot = strrpos($domain, '.');
        if ($dot === false || $dot < 1) {
            $maskedDomain = mb_substr($domain, 0, 1) . '***';
        } else {
            $head = substr($domain, 0, $dot);
            $tail = substr($domain, $dot);
            $maskedDomain = mb_substr($head, 0, 1) . '***' . $tail;
        }
        return $maskedLocal . '@' . $maskedDomain;
    }

    /** Две буквы для аватара (первая локалки + первая домена). */
    private function initialsFromEmail(string $email): string
    {
        $email = trim($email);
        $at = strpos($email, '@');
        if ($at === false || $at < 1) {
            return strtoupper(mb_substr($email, 0, 2)) ?: '??';
        }
        $a = mb_substr($email, 0, 1);
        $b = mb_substr(substr($email, $at + 1), 0, 1);
        return strtoupper($a . $b) ?: '??';
    }

    /**
     * Зеркало кривой `LEVEL_MIN_XP` из chem-progress.js (delta = ceil(22·k^1.37)).
     * Уровень = такое L, что суммарный XP до начала L+1 ещё не достигнут.
     */
    private function levelFromXp(int $xp): int
    {
        if ($xp <= 0) {
            return 1;
        }
        $cum = 0;
        for ($L = 1; $L < self::MAX_LEVEL; $L++) {
            $delta = (int) ceil(22 * pow($L, 1.37));
            if ($xp < $cum + $delta) {
                return $L;
            }
            $cum += $delta;
        }
        return self::MAX_LEVEL;
    }
}
