<?php

namespace App\Http\Controllers\Api;

use App\Constants\ApiErrorCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class IqmoProfileController extends Controller
{
    /** @var list<string> */
    private const SYNC_PREFIXES = ['iqmo-chem-', 'iqmo-bio-'];

    public function stateGet(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');
        $this->ensureProfileRow($userId);

        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
        if (!$row) {
            return response()->json(['error' => ApiErrorCode::NO_STATE], 500);
        }

        $keys = $row->keys_json;
        if (is_string($keys)) {
            $decoded = json_decode($keys, true);
            $keys = is_array($decoded) ? $decoded : [];
        }
        if (!is_array($keys)) {
            $keys = [];
        }

        return response()->json([
            'revision' => (int) ($row->revision ?? 0),
            'updatedAt' => (int) ($row->updated_at ?? 0),
            'keys' => $keys,
        ]);
    }

    public function statePut(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');

        $body = $request->all();

        // Защита от stale-tab race (audit #4): фронт включает в payload
        // expected_user_id — UID, под которым вкладка стартовала. Если
        // на сервере request->user_id (берётся из JWT cookie) с ним не
        // совпадает, значит cookie успела смениться (logout/login другого
        // юзера в соседней вкладке) — данные первой вкладки нельзя
        // записывать в state нового аккаунта. Возвращаем 409, фронт на
        // это просто дропнет push (см. iqmo-sync.js → handlePushResponse).
        // Параметр опциональный для обратной совместимости: старые
        // клиенты без expected_user_id всё ещё работают.
        $expected = $body['expected_user_id'] ?? null;
        if ($expected !== null && (int) $expected !== $userId) {
            return response()->json(['error' => ApiErrorCode::USER_MISMATCH], 409);
        }

        $incomingKeys = $body['keys'] ?? null;
        if (!is_array($incomingKeys)) {
            return response()->json(['error' => ApiErrorCode::KEYS_REQUIRED], 400);
        }

        $baseRevision = array_key_exists('baseRevision', $body) ? $body['baseRevision'] : null;
        $baseRevision = $baseRevision === null ? null : (int) $baseRevision;

        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
        if (!$row) {
            return response()->json(['error' => ApiErrorCode::NO_STATE], 500);
        }

        $serverRev = (int) ($row->revision ?? 0);
        if ($baseRevision !== null && $baseRevision !== $serverRev) {
            $keys = $row->keys_json;
            if (is_string($keys)) {
                $decoded = json_decode($keys, true);
                $keys = is_array($decoded) ? $decoded : [];
            }
            if (!is_array($keys)) {
                $keys = [];
            }

            return response()->json([
                'error' => ApiErrorCode::REVISION_MISMATCH,
                'server' => [
                    'revision' => $serverRev,
                    'keys' => $keys,
                ],
            ], 409);
        }

        $existing = $row->keys_json;
        if (is_string($existing)) {
            $decoded = json_decode($existing, true);
            $existing = is_array($decoded) ? $decoded : [];
        }
        if (!is_array($existing)) {
            $existing = [];
        }

        $sanitized = self::mergeSyncKeys($existing, $incomingKeys);

        $keysJson = json_encode($sanitized, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $newRev = $serverRev + 1;
        $now = (int) (microtime(true) * 1000);

        $prevJson = is_string($row->keys_json) ? $row->keys_json : json_encode($row->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $this->snapshotHistory($userId, $prevJson, (int) $row->revision);

        DB::connection('iqmo')->table('profile_state')
            ->where('user_id', $userId)
            ->update([
                'keys_json' => $keysJson,
                'revision' => $newRev,
                'updated_at' => $now,
            ]);

        return response()->json(['ok' => true, 'revision' => $newRev, 'updatedAt' => $now]);
    }

    public function history(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');

        $rows = DB::connection('iqmo')->select(
            'SELECT id, revision, created_at, CHAR_LENGTH(CAST(keys_json AS CHAR)) AS bytes FROM profile_history WHERE user_id = ? ORDER BY id DESC LIMIT 25',
            [$userId]
        );

        return response()->json(['items' => $rows]);
    }

    public function restore(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');
        $hid = (int) $request->input('historyId', 0);
        if ($hid <= 0) {
            return response()->json(['error' => ApiErrorCode::HISTORY_ID_REQUIRED], 400);
        }

        $hist = DB::connection('iqmo')->table('profile_history')->where('user_id', $userId)->where('id', $hid)->first();
        if (!$hist) {
            return response()->json(['error' => ApiErrorCode::NOT_FOUND], 404);
        }

        $cur = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
        if (!$cur) {
            return response()->json(['error' => ApiErrorCode::NO_STATE], 500);
        }

        $prevJson = is_string($cur->keys_json) ? $cur->keys_json : json_encode($cur->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $this->snapshotHistory($userId, $prevJson, (int) $cur->revision);

        $newRev = ((int) $cur->revision) + 1;
        $now = (int) (microtime(true) * 1000);
        $histJson = is_string($hist->keys_json) ? $hist->keys_json : json_encode($hist->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        DB::connection('iqmo')->update(
            'UPDATE profile_state SET keys_json = CAST(? AS JSON), revision = ?, updated_at = ? WHERE user_id = ?',
            [$histJson, $newRev, $now, $userId]
        );

        $keys = $hist->keys_json;
        if (is_string($keys)) {
            $decoded = json_decode($keys, true);
            $keys = is_array($decoded) ? $decoded : [];
        }
        if (!is_array($keys)) {
            $keys = [];
        }

        return response()->json(['ok' => true, 'revision' => $newRev, 'keys' => $keys]);
    }

    private function ensureProfileRow(int $userId): void
    {
        $now = (int) (microtime(true) * 1000);
        // Был raw 'INSERT IGNORE INTO ... CAST(? AS JSON)' — MySQL-syntax,
        // на sqlite в Feature-тестах падал. insertOrIgnore прозрачно даёт
        // правильный SQL для каждого драйвера (см. IqmoAuthController).
        DB::connection('iqmo')->table('profile_state')->insertOrIgnore([
            'user_id' => $userId,
            'keys_json' => '{}',
            'revision' => 0,
            'updated_at' => $now,
        ]);
    }

    private function snapshotHistory(int $userId, ?string $prevKeysJson, int $prevRevision): void
    {
        $now = (int) (microtime(true) * 1000);
        DB::connection('iqmo')->insert(
            'INSERT INTO profile_history (user_id, keys_json, revision, created_at) VALUES (?, CAST(? AS JSON), ?, ?)',
            [$userId, $prevKeysJson ?: '{}', (int) $prevRevision, $now]
        );

        $cntRow = DB::connection('iqmo')->selectOne('SELECT COUNT(*) AS c FROM profile_history WHERE user_id = ?', [$userId]);
        $cnt = (int) (($cntRow->c ?? 0));
        if ($cnt > 80) {
            $toDelete = $cnt - 80;
            DB::connection('iqmo')->delete(
                'DELETE FROM profile_history WHERE user_id = ? ORDER BY id ASC LIMIT ?',
                [$userId, $toDelete]
            );
        }
    }

    /**
     * Слияние snapshot'ов sync-ключей. Если клиент прислал хотя бы один ключ
     * с префиксом — для этого префикса принимается полный снимок из push
     * (старые ключи префикса на сервере заменяются). Если префикса в push нет
     * (старый клиент без bio-sync) — серверные ключи этого префикса сохраняются.
     *
     * @param  array<string, mixed>  $existing
     * @param  array<string, mixed>  $incoming
     * @return array<string, string>
     */
    private static function mergeSyncKeys(array $existing, array $incoming): array
    {
        $out = [];
        foreach ($existing as $k => $v) {
            if (!is_string($k) || self::isSyncKey($k)) {
                continue;
            }
            $out[$k] = is_string($v) ? $v : (string) json_encode($v, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }

        foreach (self::SYNC_PREFIXES as $prefix) {
            $incomingHasPrefix = false;
            foreach ($incoming as $k => $v) {
                if (is_string($k) && str_starts_with($k, $prefix)) {
                    $incomingHasPrefix = true;
                    break;
                }
            }

            if ($incomingHasPrefix) {
                foreach ($incoming as $k => $v) {
                    if (!is_string($k) || !str_starts_with($k, $prefix) || $v === null) {
                        continue;
                    }
                    $out[$k] = (string) $v;
                }

                continue;
            }

            foreach ($existing as $k => $v) {
                if (!is_string($k) || !str_starts_with($k, $prefix)) {
                    continue;
                }
                $out[$k] = is_string($v) ? $v : (string) json_encode($v, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        }

        return $out;
    }

    private static function isSyncKey(string $key): bool
    {
        foreach (self::SYNC_PREFIXES as $prefix) {
            if (str_starts_with($key, $prefix)) {
                return true;
            }
        }

        return false;
    }
}
