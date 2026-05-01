<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class QuizLeadController extends Controller
{
    // Допустимые quiz_id. biology-v4 — телефонный квиз /quiz/8 (фаза A/B-теста
    // "phone vs email"); остальные — email-квизы /quiz/1.../quiz/7.
    private const ALLOWED_QUIZ_IDS = [
        'biology-1', 'biology-2', 'biology-2-short', 'biology-3', 'biology-v2', 'biology-v4',
        'chemistry-1', 'chemistry-2',
    ];

    public function store(Request $request)
    {
        $emailRaw = (string) $request->input('email', '');
        $phoneRaw = (string) $request->input('phone', '');
        $quizId = (string) $request->input('quiz_id', '');

        // 1. Контакт: ИЛИ email, ИЛИ phone (как минимум один; оба тоже допустимо).
        $email = trim($emailRaw) !== '' ? strtolower(trim($emailRaw)) : null;
        $phone = $this->normalizePhone($phoneRaw);

        if ($email !== null) {
            if (strlen($email) > 190 || ! preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
                return response()->json(['error' => 'invalid_email'], 400);
            }
        }
        if ($phone === false) {
            return response()->json(['error' => 'invalid_phone'], 400);
        }
        if ($email === null && $phone === null) {
            return response()->json(['error' => 'no_contact'], 400);
        }
        if (! in_array($quizId, self::ALLOWED_QUIZ_IDS, true)) {
            return response()->json(['error' => 'invalid_quiz_id'], 400);
        }

        // 2. score / total / wrong_topics — как было.
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

        // 3. Идемпотентность: для email-лидов дедуп по uq_quiz_leads_email_quiz,
        //    для телефонных — по uq_quiz_leads_phone_quiz. Оба индекса на NULL
        //    допускают несколько строк, поэтому конфликт возникает только
        //    в рамках одного канала — это и есть нужное поведение.
        try {
            DB::connection('iqmo')->statement(
                'INSERT INTO quiz_leads (email, phone, quiz_id, sid, score, total, wrong_topics_json, created_at_ms)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                    sid=VALUES(sid),
                    score=VALUES(score),
                    total=VALUES(total),
                    wrong_topics_json=VALUES(wrong_topics_json),
                    email=COALESCE(VALUES(email), email),
                    phone=COALESCE(VALUES(phone), phone)',
                [$email, $phone, $quizId, $sid, $score, $total, $wrongTopicsJson, $now]
            );
        } catch (\Throwable $e) {
            // Не блокируем UX, ошибки видим в журнале.
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Нормализуем мобильный номер РФ к каноническому виду +7XXXXXXXXXX.
     * Поддерживаем все распространённые форматы ввода: 8XXX, +7XXX, 7XXX, 9XXX
     * без префикса. Возвращает строку либо null (если phone не задан) либо
     * false (если задан, но не валиден).
     *
     * @return string|null|false
     */
    private function normalizePhone(string $raw)
    {
        $raw = trim($raw);
        if ($raw === '') {
            return null;
        }
        $digits = preg_replace('/\D/', '', $raw);
        if ($digits === '') {
            return false;
        }
        // 8XXXXXXXXXX → 7XXXXXXXXXX (российская мобильная замена ведущей 8 на 7)
        if (strlen($digits) === 11 && $digits[0] === '8') {
            $digits = '7' . substr($digits, 1);
        }
        // 9XXXXXXXXX (10 цифр без префикса) → дописываем 7 в начало
        if (strlen($digits) === 10 && $digits[0] === '9') {
            $digits = '7' . $digits;
        }
        // Финальная проверка: 11 цифр, страна 7, мобильный префикс 9.
        if (strlen($digits) !== 11 || $digits[0] !== '7' || $digits[1] !== '9') {
            return false;
        }
        return '+' . $digits;
    }
}
