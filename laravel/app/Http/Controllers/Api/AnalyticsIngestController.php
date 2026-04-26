<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class AnalyticsIngestController extends Controller
{
    private const ALLOWED_EVENTS = [
        'chem.attempt_complete',
    ];

    private const MAX_BATCH = 24;

    public function ingest(Request $request): JsonResponse
    {
        $userId = (int) $request->attributes->get('iqmo_user_id');
        if ($userId < 1) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        $body = $request->all();
        $events = $body['events'] ?? null;
        if (! is_array($events) || $events === []) {
            return response()->json(['error' => 'events_required'], 400);
        }

        if (count($events) > self::MAX_BATCH) {
            return response()->json(['error' => 'batch_too_large'], 400);
        }

        $nowMs = (int) floor(microtime(true) * 1000);
        $rows = [];

        foreach ($events as $ev) {
            if (! is_array($ev)) {
                continue;
            }
            $name = isset($ev['event']) ? (string) $ev['event'] : '';
            if (! in_array($name, self::ALLOWED_EVENTS, true)) {
                continue;
            }
            $occurred = isset($ev['occurredAt']) ? (int) $ev['occurredAt'] : $nowMs;
            if ($occurred < 1 || $occurred > $nowMs + 120_000) {
                $occurred = $nowMs;
            }
            $payload = $ev['payload'] ?? [];
            if (! is_array($payload)) {
                $payload = [];
            }
            if ($name === 'chem.attempt_complete') {
                $payload = $this->sanitizeAttemptComplete($payload);
            }
            $rows[] = [
                'user_id' => $userId,
                'occurred_at' => $occurred,
                'event' => $name,
                'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                'received_at' => $nowMs,
            ];
        }

        if ($rows === []) {
            return response()->json(['error' => 'no_valid_events'], 400);
        }

        DB::connection('iqmo')->table('analytics_events')->insert($rows);

        return response()->json(['ok' => true, 'inserted' => count($rows)])->withHeaders([
            'Cache-Control' => 'private, no-store, max-age=0, must-revalidate',
        ]);
    }

    /** @param array<string, mixed> $p @return array<string, mixed> */
    private function sanitizeAttemptComplete(array $p): array
    {
        $mode = isset($p['mode']) ? (string) $p['mode'] : '';
        if (! in_array($mode, ['warmup', 'trial', 'full', 'quick', 'other'], true)) {
            $mode = 'other';
        }
        $subject = isset($p['subject']) ? (string) $p['subject'] : 'chemistry';
        if (strlen($subject) > 32) {
            $subject = substr($subject, 0, 32);
        }
        $items = [];
        if (isset($p['items']) && is_array($p['items'])) {
            foreach (array_slice($p['items'], 0, 200) as $it) {
                if (! is_array($it)) {
                    continue;
                }
                $qid = isset($it['qid']) ? (string) $it['qid'] : '';
                if ($qid === '' || strlen($qid) > 64) {
                    continue;
                }
                $items[] = [
                    'qid' => $qid,
                    'ok' => ! empty($it['ok']),
                ];
            }
        }

        return [
            'subject' => $subject,
            'mode' => $mode,
            'correct' => max(0, (int) ($p['correct'] ?? 0)),
            'total' => max(0, (int) ($p['total'] ?? 0)),
            'percent' => max(0, min(100, (int) ($p['percent'] ?? 0))),
            'label' => isset($p['label']) ? substr((string) $p['label'], 0, 120) : '',
            'items' => $items,
        ];
    }
}
