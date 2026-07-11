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

    /**
     * Ключ localStorage с накопительным XP (см. extracted/chem-progress.js).
     * Денормализуется в индексируемую profile_state.xp при каждой записи —
     * leaderboard читает его вместо полного скана JSON (perf, audit).
     */
    private const XP_KEY = 'iqmo-chem-progress-points-v1';

    /** Максимум ключей в profile_state — защита от разрастания стейта. */
    private const MAX_STATE_KEYS = 5000;

    /** Максимальный размер сериализованного keys_json (512 KB). */
    private const MAX_STATE_BYTES = 512 * 1024;

    /** Сколько последних версий храним в profile_history на юзера. */
    private const HISTORY_KEEP = 80;

    public function stateGet(Request $request)
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');
        $this->ensureProfileRow($userId);

        $row = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();
        if (!$row) {
            return response()->json(['error' => ApiErrorCode::NO_STATE], 500);
        }

        return response()->json([
            'revision' => (int) ($row->revision ?? 0),
            'updatedAt' => (int) ($row->updated_at ?? 0),
            'keys' => $this->decodeKeys($row->keys_json),
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
            return response()->json([
                'error' => ApiErrorCode::REVISION_MISMATCH,
                'server' => [
                    'revision' => $serverRev,
                    'keys' => $this->decodeKeys($row->keys_json),
                ],
            ], 409);
        }

        $existing = $this->decodeKeys($row->keys_json);
        $sanitized = self::mergeSyncKeys($existing, $incomingKeys);

        $keysJson = json_encode($sanitized, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        // Верхний предел размера стейта. Без него забагованный/зловредный клиент
        // может запушить многомегабайтный localStorage-снимок, и каждый push
        // копирует его в profile_history (до HISTORY_KEEP строк) — десятки МБ
        // на юзера. Легитимный прогресс — единицы КБ.
        if (count($sanitized) > self::MAX_STATE_KEYS || strlen($keysJson) > self::MAX_STATE_BYTES) {
            return response()->json(['error' => ApiErrorCode::PAYLOAD_TOO_LARGE], 413);
        }

        $newRev = $serverRev + 1;
        $now = (int) (microtime(true) * 1000);

        // Оптимистичный лок: пишем только если ревизия в БД всё ещё та, что мы
        // прочитали. Два конкурентных PUT одного юзера (interval-push +
        // beforeunload-push из iqmo-sync.js летят одновременно) раньше оба
        // читали revision=N, оба проходили проверку baseRevision и оба писали
        // N+1 — обновление первого терялось. Теперь проигравший гонку получает
        // affected=0 и 409: клиент перечитывает состояние и ретраит.
        // Денормализованный XP в индексируемую колонку (perf лидерборда).
        $xp = max(0, (int) ($sanitized[self::XP_KEY] ?? 0));

        $affected = DB::connection('iqmo')->table('profile_state')
            ->where('user_id', $userId)
            ->where('revision', $serverRev)
            ->update([
                'keys_json' => $keysJson,
                'revision' => $newRev,
                'updated_at' => $now,
                'xp' => $xp,
            ]);

        if ($affected === 0) {
            $fresh = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();

            return response()->json([
                'error' => ApiErrorCode::REVISION_MISMATCH,
                'server' => [
                    'revision' => (int) ($fresh->revision ?? $serverRev),
                    'keys' => $this->decodeKeys($fresh->keys_json ?? null),
                ],
            ], 409);
        }

        // История — best-effort и только после успешной записи (иначе
        // проигравший гонку писатель плодил бы orphan-снимки предыдущего стейта).
        $prevJson = is_string($row->keys_json) ? $row->keys_json : json_encode($row->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $this->snapshotHistory($userId, $prevJson, $serverRev);

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

        $curRev = (int) $cur->revision;
        $newRev = $curRev + 1;
        $now = (int) (microtime(true) * 1000);
        $histJson = is_string($hist->keys_json) ? $hist->keys_json : json_encode($hist->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        // Оптимистичный лок (audit): как в statePut. Раньше restore делал
        // безусловный UPDATE ... WHERE user_id после отдельного чтения $cur —
        // конкурентный interval-push между чтением и записью молча терялся.
        // Теперь пишем только если revision в БД всё ещё $curRev; проигравший
        // гонку получает affected=0 → 409, и клиент перечитывает состояние.
        // (Заодно ушли от MySQL-only CAST(? AS JSON) — query-builder портируем
        // на sqlite в Feature-тестах, как и statePut.)
        // Денормализованный XP — из восстанавливаемого снапшота (perf лидерборда).
        $histKeys = $this->decodeKeys($hist->keys_json);
        $xp = max(0, (int) ($histKeys[self::XP_KEY] ?? 0));

        $affected = DB::connection('iqmo')->table('profile_state')
            ->where('user_id', $userId)
            ->where('revision', $curRev)
            ->update([
                'keys_json' => $histJson,
                'revision' => $newRev,
                'updated_at' => $now,
                'xp' => $xp,
            ]);

        if ($affected === 0) {
            $fresh = DB::connection('iqmo')->table('profile_state')->where('user_id', $userId)->first();

            return response()->json([
                'error' => ApiErrorCode::REVISION_MISMATCH,
                'server' => [
                    'revision' => (int) ($fresh->revision ?? $curRev),
                    'keys' => $this->decodeKeys($fresh->keys_json ?? null),
                ],
            ], 409);
        }

        // История — best-effort и только после успешной записи (иначе
        // проигравший гонку restore плодил бы orphan-снимок).
        $prevJson = is_string($cur->keys_json) ? $cur->keys_json : json_encode($cur->keys_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $this->snapshotHistory($userId, $prevJson, $curRev);

        return response()->json(['ok' => true, 'revision' => $newRev, 'keys' => $this->decodeKeys($hist->keys_json)]);
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
        if ($cnt > self::HISTORY_KEEP) {
            // Оставляем HISTORY_KEEP самых свежих версий. `DELETE ... ORDER BY
            // ... LIMIT` — MySQL-only синтаксис (на sqlite в тестах падает),
            // поэтому удаляем через «id не входит в N новейших» — портируемо
            // для обоих драйверов.
            $keepIds = DB::connection('iqmo')->table('profile_history')
                ->where('user_id', $userId)
                ->orderByDesc('id')
                ->limit(self::HISTORY_KEEP)
                ->pluck('id')
                ->all();
            DB::connection('iqmo')->table('profile_history')
                ->where('user_id', $userId)
                ->whereNotIn('id', $keepIds)
                ->delete();
        }
    }

    /**
     * Декодирует keys_json (строка JSON от sqlite/старого драйвера или уже
     * распакованный массив от mysql2/json-каста) в ассоциативный массив.
     *
     * @return array<string, mixed>
     */
    private function decodeKeys(mixed $raw): array
    {
        if (is_string($raw)) {
            $decoded = json_decode($raw, true);

            return is_array($decoded) ? $decoded : [];
        }

        return is_array($raw) ? $raw : [];
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
