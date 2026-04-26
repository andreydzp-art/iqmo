<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsIngestController extends Controller
{
    private const ALLOWED_EVENTS = ['chem.attempt_start', 'chem.attempt_complete', 'chem.topic_view'];

    private const ALLOWED_MODES = ['full', 'trial', 'warmup', 'quick', 'other'];

    public function store(Request $request)
    {
        $userId = IqmoJwt::userIdFromCookie($request);
        if ($userId === null) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        $body = $request->all();
        $list = $body['events'] ?? null;
        if (! is_array($list) || count($list) === 0) {
            return response()->json(['error' => 'events_required'], 400);
        }
        if (count($list) > 24) {
            return response()->json(['error' => 'too_many_events'], 400);
        }

        $now = (int) (microtime(true) * 1000);
        $rows = [];

        foreach ($list as $ev) {
            if (! is_array($ev)) {
                continue;
            }
            $name = (string) ($ev['event'] ?? '');
            if (! in_array($name, self::ALLOWED_EVENTS, true)) {
                continue;
            }
            $occurredAt = isset($ev['occurredAt']) && is_numeric($ev['occurredAt'])
                ? (int) $ev['occurredAt']
                : $now;
            $rawPl = isset($ev['payload']) && is_array($ev['payload']) ? $ev['payload'] : [];
            $payload = match ($name) {
                'chem.topic_view' => $this->sanitizeTopic($rawPl),
                'chem.attempt_start' => $this->sanitizeAttempt($rawPl, false),
                'chem.attempt_complete' => $this->sanitizeAttempt($rawPl, true),
                default => null,
            };
            if ($payload === null) {
                continue;
            }
            $rows[] = [
                'user_id' => $userId,
                'occurred_at' => $occurredAt,
                'event' => $name,
                'payload_json' => json_encode($payload, JSON_UNESCAPED_UNICODE),
                'received_at' => $now,
            ];
        }

        if ($rows === []) {
            return response()->json(['error' => 'no_valid_events'], 400);
        }

        // Same connection as IqmoAuthController/IqmoAdminOverviewBuilder so the FK to users
        // resolves and the admin top-questions rollup actually sees the rows.
        DB::connection('iqmo')->table('analytics_events')->insert($rows);

        return response()->json(['ok' => true, 'saved' => count($rows)]);
    }

    private function clampStr(mixed $v, int $max): string
    {
        $t = (string) ($v ?? '');

        return strlen($t) > $max ? substr($t, 0, $max) : $t;
    }

    private function sanitizeTopic(array $raw): ?array
    {
        $subject = $this->clampStr($raw['subject'] ?? '', 32) ?: 'chemistry';
        $topicSlug = $this->clampStr($raw['topicSlug'] ?? '', 128);
        if ($topicSlug === '') {
            return null;
        }

        return ['subject' => $subject, 'topicSlug' => $topicSlug];
    }

    private function sanitizeAttempt(array $raw, bool $allowItems): ?array
    {
        $mode = (string) ($raw['mode'] ?? '');
        if (! in_array($mode, self::ALLOWED_MODES, true)) {
            return null;
        }
        $subject = $this->clampStr($raw['subject'] ?? '', 32) ?: 'chemistry';
        $out = [
            'subject' => $subject,
            'mode' => $mode,
            'label' => $this->clampStr($raw['label'] ?? '', 256),
            'variantId' => isset($raw['variantId']) && is_numeric($raw['variantId']) ? (int) $raw['variantId'] : null,
            'variantTitle' => $this->clampStr($raw['variantTitle'] ?? '', 256),
            'topicSlug' => $this->clampStr($raw['topicSlug'] ?? '', 128),
            'attemptId' => $this->clampStr($raw['attemptId'] ?? '', 80),
        ];
        if (isset($raw['totalQuestions']) && is_numeric($raw['totalQuestions'])) {
            $out['totalQuestions'] = max(0, min(500, (int) $raw['totalQuestions']));
        }
        if ($allowItems) {
            $out['correct'] = isset($raw['correct']) ? max(0, (int) $raw['correct']) : null;
            $out['total'] = isset($raw['total']) ? max(0, (int) $raw['total']) : null;
            $out['percent'] = isset($raw['percent']) ? max(0, min(100, (int) $raw['percent'])) : null;
            $out['passedPart1'] = ! empty($raw['passedPart1']);
            $out['finishedAt'] = isset($raw['finishedAt']) && is_numeric($raw['finishedAt'])
                ? (int) $raw['finishedAt']
                : (int) round(microtime(true) * 1000);
            $items = isset($raw['items']) && is_array($raw['items']) ? array_slice($raw['items'], 0, 200) : [];
            $out['items'] = [];
            foreach ($items as $it) {
                if (! is_array($it)) {
                    continue;
                }
                $qid = $this->clampStr($it['qid'] ?? '', 64);
                if ($qid === '') {
                    continue;
                }
                $out['items'][] = ['qid' => $qid, 'ok' => ! empty($it['ok'])];
            }
        }

        return $out;
    }
}
