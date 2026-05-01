<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

final class IqmoAdminQuizMetricsBuilder
{
    private const ALLOWED_DAYS = [1, 7, 14, 30];

    /**
     * @var array<string, array{name:string, questions:int, channel:string, targets: array<string,float>}>
     *
     * `channel` определяет, по какому контакту собираются лиды и как считается attribution:
     * - email: lead.email JOIN users.email (как было), все email-метрики работают как раньше;
     * - phone: lead.phone, attribution к users НЕ считается (в фазе A users не создаются по телефону),
     *          target email_to_reg/quiz_to_reg тоже null — измеряем только phone-gate conversion.
     */
    private const QUIZZES = [
        // 'biology-1' (15 вопросов, /quiz/1) выведен из эксплуатации 2026-05-01.
        // Исторические события и лиды остаются в БД для холодного анализа,
        // но в дашборде квиз больше не показывается.
        'biology-2' => [
            'name' => 'Биология · Quiz #2',
            'questions' => 15,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
        'biology-2-short' => [
            'name' => 'Биология · Quiz #2 (short, 12)',
            'questions' => 12,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
        'biology-3' => [
            'name' => 'Биология · Quiz #3 (v3, 12)',
            'questions' => 12,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
        'biology-v2' => [
            'name' => 'Биология · v2 package (12)',
            'questions' => 12,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
        'biology-v4' => [
            'name' => 'Биология · v4 phone-gate (12)',
            'questions' => 12,
            'channel' => 'phone',
            'targets' => [
                'email_gate' => 25.0, // phone-gate conversion (label меняем на фронте)
                'email_to_reg' => 0.0,
                'quiz_to_reg' => 0.0,
            ],
        ],
        'chemistry-1' => [
            'name' => 'Химия · Quiz #1',
            'questions' => 15,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
        'chemistry-2' => [
            'name' => 'Химия · Quiz #2 (12)',
            'questions' => 12,
            'channel' => 'email',
            'targets' => [
                'email_gate' => 25.0,
                'email_to_reg' => 30.0,
                'quiz_to_reg' => 8.0,
            ],
        ],
    ];

    /** @return array<string, mixed> */
    public function build(int $days): array
    {
        if (! in_array($days, self::ALLOWED_DAYS, true)) {
            $days = 7;
        }

        $iqmo = DB::connection('iqmo');
        $nowMs = (int) floor(microtime(true) * 1000);
        $sinceMs = $nowMs - $days * 86_400_000;

        $hasQuizEvents = Schema::connection('iqmo')->hasTable('quiz_events')
            && Schema::connection('iqmo')->hasTable('quiz_leads');

        $out = [
            'meta' => [
                'source' => 'db',
                'generatedAt' => $nowMs,
                'days' => $days,
                'sinceMs' => $sinceMs,
                'hasQuizTables' => $hasQuizEvents,
            ],
            'quizzes' => [],
        ];

        if (! $hasQuizEvents) {
            return $out;
        }

        foreach (self::QUIZZES as $quizId => $cfg) {
            $starts = (int) $iqmo->table('quiz_events')
                ->where('quiz_id', $quizId)
                ->where('event', 'start')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->distinct()
                ->count('sid');

            // Mirrors frontend goal `quiz_completed` (we store it as server event `complete`).
            $completes = (int) $iqmo->table('quiz_events')
                ->where('quiz_id', $quizId)
                ->where('event', 'complete')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->distinct()
                ->count('sid');

            $gateShown = (int) $iqmo->table('quiz_events')
                ->where('quiz_id', $quizId)
                ->where('event', 'gate_shown')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->distinct()
                ->count('sid');

            $gateSubmit = (int) $iqmo->table('quiz_events')
                ->where('quiz_id', $quizId)
                ->where('event', 'gate_submit')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->distinct()
                ->count('sid');

            // Mirrors frontend goal `quiz_register_click` (we store it as server event `cta_register`).
            $registerClicks = (int) $iqmo->table('quiz_events')
                ->where('quiz_id', $quizId)
                ->where('event', 'cta_register')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->distinct()
                ->count('sid');

            $channel = (string) ($cfg['channel'] ?? 'email');

            $leadsBuilder = $iqmo->table('quiz_leads')
                ->where('quiz_id', $quizId)
                ->where('created_at_ms', '>=', $sinceMs);
            if ($channel === 'phone') {
                $leadsBuilder->whereNotNull('phone');
            } else {
                $leadsBuilder->whereNotNull('email');
            }
            $leads = (int) $leadsBuilder->count();

            // Attribution rule: registration within 7 days after lead capture.
            // Phone-канал в фазе A не создаёт users → attribution не считается, ставим 0.
            if ($channel === 'phone') {
                $emailToReg = 0;
                $emailToRegPct = null;
                $quizToRegPct = null;
            } else {
                $emailToReg = (int) $iqmo->table('quiz_leads as l')
                    ->join('users as u', DB::raw('LOWER(u.email)'), '=', DB::raw('LOWER(l.email)'))
                    ->where('l.quiz_id', $quizId)
                    ->where('l.created_at_ms', '>=', $sinceMs)
                    ->whereRaw('u.created_at >= l.created_at_ms')
                    ->whereRaw('u.created_at <= l.created_at_ms + 604800000')
                    ->distinct()
                    ->count(DB::raw('LOWER(l.email)'));

                $emailToRegPct = $leads > 0 ? round(100.0 * $emailToReg / $leads, 1) : null;
                $quizToRegPct = $starts > 0 ? round(100.0 * $emailToReg / $starts, 1) : null;
            }

            $emailGateDen = max(1, $gateShown > 0 ? $gateShown : $starts);
            $emailGateNum = $gateSubmit > 0 ? $gateSubmit : $leads;
            $emailGatePct = $starts > 0 ? round(100.0 * $emailGateNum / $emailGateDen, 1) : null;

            $qRows = $iqmo->table('quiz_events')
                ->selectRaw('q_idx, COUNT(DISTINCT sid) AS sessions')
                ->where('quiz_id', $quizId)
                ->where('event', 'question')
                ->where('occurred_at_ms', '>=', $sinceMs)
                ->whereNotNull('q_idx')
                ->groupBy('q_idx')
                ->orderBy('q_idx')
                ->get();

            $reach = [];
            foreach ($qRows as $r) {
                $idx = (int) ($r->q_idx ?? 0);
                if ($idx < 1 || $idx > (int) $cfg['questions']) {
                    continue;
                }
                $reach[$idx] = (int) ($r->sessions ?? 0);
            }

            $perQuestion = [];
            for ($i = 1; $i <= (int) $cfg['questions']; $i++) {
                $n = $reach[$i] ?? 0;
                $pct = $starts > 0 ? round(100.0 * $n / $starts, 1) : null;
                $perQuestion[] = [
                    'q' => $i,
                    'sessions' => $n,
                    'pct' => $pct,
                ];
            }

            $out['quizzes'][] = [
                'quizId' => $quizId,
                'name' => $cfg['name'],
                'channel' => $channel,
                'targets' => $cfg['targets'],
                'counts' => [
                    'starts' => $starts,
                    'completes' => $completes,
                    'gateShown' => $gateShown,
                    'gateSubmit' => $gateSubmit,
                    'registerClicks' => $registerClicks,
                    'leads' => $leads,
                    'registrationsAttributed' => $emailToReg,
                ],
                'rates' => [
                    'emailGateConversionPct' => $emailGatePct,
                    'emailToRegistrationPct' => $emailToRegPct,
                    'quizToRegistrationPct' => $quizToRegPct,
                ],
                'questions' => $perQuestion,
            ];
        }

        return $out;
    }
}

