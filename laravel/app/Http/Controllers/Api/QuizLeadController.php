<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class QuizLeadController extends Controller
{
    private const ALLOWED_QUIZ_IDS = ['biology-1', 'chemistry-1'];

    public function store(Request $request)
    {
        $emailRaw = (string) $request->input('email', '');
        $quizId = (string) $request->input('quiz_id', '');

        $email = strtolower(trim($emailRaw));
        if ($email === '' || strlen($email) > 190 || ! preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
            return response()->json(['error' => 'invalid_email'], 400);
        }
        if (! in_array($quizId, self::ALLOWED_QUIZ_IDS, true)) {
            return response()->json(['error' => 'invalid_quiz_id'], 400);
        }

        $score = $request->input('score', null);
        $total = $request->input('total', null);
        $wrongTopics = $request->input('wrong_topics', null);

        $score = is_numeric($score) ? max(0, min(200, (int) $score)) : null;
        $total = is_numeric($total) ? max(0, min(200, (int) $total)) : null;
        if ($score !== null && $total !== null && $score > $total) {
            $score = $total;
        }

        $wrongTopicsJson = null;
        if (is_array($wrongTopics)) {
            $slice = array_slice(array_values($wrongTopics), 0, 50);
            $san = [];
            foreach ($slice as $t) {
                $s = trim((string) $t);
                if ($s !== '') {
                    $san[] = mb_substr($s, 0, 80);
                }
            }
            $wrongTopicsJson = json_encode($san, JSON_UNESCAPED_UNICODE);
            if (is_string($wrongTopicsJson) && strlen($wrongTopicsJson) > 4096) {
                $wrongTopicsJson = null;
            }
        }

        $sid = (string) ($request->cookie('iqmo_qsid') ?? '');
        if ($sid === '' || strlen($sid) > 64 || ! preg_match('/^[A-Za-z0-9_-]+$/', $sid)) {
            $sid = null;
        }

        $now = (int) (microtime(true) * 1000);

        // Idempotent per email+quiz_id (unique index). Keep latest sid/score.
        try {
            DB::connection('iqmo')->statement(
                'INSERT INTO quiz_leads (email, quiz_id, sid, score, total, wrong_topics_json, created_at_ms)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE sid=VALUES(sid), score=VALUES(score), total=VALUES(total), wrong_topics_json=VALUES(wrong_topics_json)',
                [$email, $quizId, $sid, $score, $total, $wrongTopicsJson, $now]
            );
        } catch (\Throwable $e) {
            // Do not block UX.
        }

        return response()->json(['ok' => true]);
    }
}

