<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

final class QuizTrackController extends Controller
{
    private const ALLOWED_QUIZ_IDS = ['biology-1', 'biology-2', 'biology-2-short', 'biology-3', 'biology-v2', 'biology-v4', 'chemistry-1', 'chemistry-2'];
    private const ALLOWED_EVENTS = ['start', 'question', 'gate_shown', 'gate_submit', 'cta_register', 'complete'];

    public function track(Request $request)
    {
        // Body is small: we accept a single event per request.
        $quizId = (string) $request->input('quiz_id', '');
        $event = (string) $request->input('event', '');
        $qIdx = $request->input('q_idx', null);
        $payload = $request->input('payload', null);

        if (! in_array($quizId, self::ALLOWED_QUIZ_IDS, true)) {
            return response()->json(['error' => 'invalid_quiz_id'], 400);
        }
        if (! in_array($event, self::ALLOWED_EVENTS, true)) {
            return response()->json(['error' => 'invalid_event'], 400);
        }
        if ($qIdx !== null) {
            if (! is_numeric($qIdx)) {
                return response()->json(['error' => 'invalid_q_idx'], 400);
            }
            $qIdx = (int) $qIdx;
            if ($qIdx < 1 || $qIdx > 15) {
                return response()->json(['error' => 'invalid_q_idx'], 400);
            }
        } else {
            $qIdx = null;
        }

        // Payload is optional and must be an object/assoc array.
        $payloadJson = null;
        if ($payload !== null) {
            if (! is_array($payload)) {
                return response()->json(['error' => 'invalid_payload'], 400);
            }
            // Hard cap to keep rows small and safe.
            $payloadJson = json_encode($payload, JSON_UNESCAPED_UNICODE);
            if (! is_string($payloadJson) || strlen($payloadJson) > 4096) {
                return response()->json(['error' => 'payload_too_large'], 413);
            }
        }

        $now = (int) (microtime(true) * 1000);

        $sid = (string) $request->cookie('iqmo_qsid', '');
        if ($sid === '' || strlen($sid) > 64 || ! preg_match('/^[A-Za-z0-9_-]+$/', $sid)) {
            // Short url-safe id to keep cookies compact.
            $sid = rtrim(strtr(base64_encode(random_bytes(24)), '+/', '-_'), '=');
        }

        $ipHash = sha1((string) $request->ip());
        $uaHash = sha1((string) $request->userAgent());

        // Upsert session row (best-effort).
        try {
            DB::connection('iqmo')->statement(
                'INSERT INTO quiz_sessions (sid, created_at_ms, last_seen_at_ms, ip_hash, ua_hash)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE last_seen_at_ms=VALUES(last_seen_at_ms)',
                [$sid, $now, $now, $ipHash, $uaHash]
            );
        } catch (\Throwable $e) {
            // Ignore: tracking must never break UX.
        }

        try {
            DB::connection('iqmo')->table('quiz_events')->insert([
                'sid' => $sid,
                'quiz_id' => $quizId,
                'event' => $event,
                'q_idx' => $qIdx,
                'occurred_at_ms' => $now,
                'payload_json' => $payloadJson,
            ]);
        } catch (\Throwable $e) {
            // Ignore: we still want the client to proceed.
        }

        $resp = response()->json(['ok' => true]);
        // 30 days cookie; public tracking, not auth.
        if (! $request->cookies->has('iqmo_qsid')) {
            $resp->withCookie(cookie(
                name: 'iqmo_qsid',
                value: $sid,
                minutes: 30 * 24 * 60,
                path: '/',
                domain: null,
                secure: true,
                httpOnly: false,
                raw: false,
                sameSite: 'lax'
            ));
        }

        return $resp;
    }
}

