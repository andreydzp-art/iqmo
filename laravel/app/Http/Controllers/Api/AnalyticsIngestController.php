<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\IqmoJwt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsIngestController extends Controller
{
    private const ALLOWED_EVENTS = [
        'chem.attempt_start',
        'chem.attempt_complete',
        'chem.topic_view',
        'iqmo.purchase',
    ];

    private const ALLOWED_MODES = ['full', 'trial', 'warmup', 'quick', 'other'];

    private const ALLOWED_PURCHASE_CURRENCIES = ['RUB', 'USD', 'EUR', 'KZT'];

    /**
     * Жёсткий потолок размера тела запроса — 64 KB.
     *
     * Считаем: 24 события * (имя 32 байт + payload до ~1.5 KB + JSON-обёртка) укладываются
     * с большим запасом в 64 KB. Реальные батчи у нас никогда не превышают ~5 KB. Если
     * прилетел больше — это либо опечатка фронта (loop, отправляющий весь сторадж), либо
     * простая попытка нагрузить PHP-парсер. И то и другое лучше отрезать заранее, до того
     * как `$request->all()` материализует JSON.
     *
     * `post_max_size` в php.ini уже стоит, но эта проверка — defense-in-depth на уровне
     * приложения (видна в тестах и не зависит от прода-конфига).
     */
    private const MAX_BODY_BYTES = 64 * 1024;

    /**
     * Сколько в будущее мы готовы простить клиенту по `occurredAt`.
     * 5 минут — это типичная погрешность системных часов на устройствах
     * (особенно Android после долгого сна). Всё, что дальше — нормализуем в `now`.
     */
    private const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;

    /**
     * Самое старое событие, которое мы готовы принять. 7 дней — компромисс между
     * «офлайн-режим, синканёмся когда сеть вернётся» (мы такого не делаем, но
     * запас не вредит) и «не давать клиенту произвольно бэкфиллить нашу воронку
     * за прошлые периоды».
     *
     * Без этого `occurredAt = 0` отлично сохраняется в БД и потом ломает
     * админку (в графиках появляется столбик «1970-01-01 за прошлую неделю»).
     */
    private const PAST_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

    public function store(Request $request)
    {
        $userId = IqmoJwt::userIdFromCookie($request);
        if ($userId === null) {
            return response()->json(['error' => 'unauthorized'], 401);
        }

        // Размер тела проверяем через Content-Length, ДО `$request->all()` —
        // чтобы залогиненный клиент не мог уронить PHP-парсер 8-мегабайтным JSON.
        // Заголовок не обязателен (chunked transfer), но в нашем фронте он всегда
        // приходит из `fetch` — это нормально для веб-клиентов.
        $contentLength = (int) $request->header('Content-Length', '0');
        if ($contentLength > self::MAX_BODY_BYTES) {
            return response()->json(['error' => 'payload_too_large'], 413);
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
        $minAllowedAt = $now - self::PAST_WINDOW_MS;
        $maxAllowedAt = $now + self::FUTURE_TOLERANCE_MS;
        $rows = [];

        foreach ($list as $ev) {
            if (! is_array($ev)) {
                continue;
            }
            $name = (string) ($ev['event'] ?? '');
            if (! in_array($name, self::ALLOWED_EVENTS, true)) {
                continue;
            }

            // Нормализуем `occurredAt` в окно [now − 7d, now + 5min]. Целиком
            // выкидывать строку из-за «битых часов на телефоне» жестковато —
            // у нас и `received_at` есть, поэтому в крайнем случае просто
            // обнуляем дрейф и сохраняем событие с временем приёма.
            $rawOccurredAt = isset($ev['occurredAt']) && is_numeric($ev['occurredAt'])
                ? (int) $ev['occurredAt']
                : $now;
            $occurredAt = ($rawOccurredAt < $minAllowedAt || $rawOccurredAt > $maxAllowedAt)
                ? $now
                : $rawOccurredAt;

            $rawPl = isset($ev['payload']) && is_array($ev['payload']) ? $ev['payload'] : [];
            $payload = match ($name) {
                'chem.topic_view' => $this->sanitizeTopic($rawPl),
                'chem.attempt_start' => $this->sanitizeAttempt($rawPl, false),
                'chem.attempt_complete' => $this->sanitizeAttempt($rawPl, true),
                'iqmo.purchase' => $this->sanitizePurchase($rawPl),
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
            // correct/total приходят как два независимых числа от клиента — ничто на
            // фронте не гарантирует, что correct ≤ total (баг в подсчёте, или просто
            // подделанный payload). Если так — обрезаем correct до total, иначе потом
            // в админке вылезают конверсии > 100 % и percent-агрегаты теряют смысл.
            if ($out['correct'] !== null && $out['total'] !== null && $out['correct'] > $out['total']) {
                $out['correct'] = $out['total'];
            }
            $out['percent'] = isset($raw['percent']) ? max(0, min(100, (int) $raw['percent'])) : null;
            // Если клиент percent не прислал, но correct/total есть — досчитаем сами.
            // Иначе IqmoAdminOverviewBuilder::computeAvgPct получит нулевую выборку
            // и средний балл по предмету в админке потускнеет без причины.
            if ($out['percent'] === null && $out['total'] !== null && $out['total'] > 0 && $out['correct'] !== null) {
                $out['percent'] = (int) round(($out['correct'] / $out['total']) * 100);
            }
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

    private function sanitizePurchase(array $raw): ?array
    {
        $purchaseId = $this->clampStr($raw['purchaseId'] ?? '', 64);
        if ($purchaseId === '') {
            return null;
        }
        $productId = $this->clampStr($raw['productId'] ?? '', 64) ?: 'iqmo_access';
        $productName = $this->clampStr($raw['productName'] ?? '', 128);
        $currencyRaw = strtoupper((string) ($raw['currency'] ?? 'RUB'));
        $currency = in_array($currencyRaw, self::ALLOWED_PURCHASE_CURRENCIES, true) ? $currencyRaw : 'RUB';
        $revenue = isset($raw['revenue']) && is_numeric($raw['revenue'])
            ? max(0.0, min(1_000_000.0, (float) $raw['revenue']))
            : 0.0;
        $quantity = isset($raw['quantity']) && is_numeric($raw['quantity'])
            ? max(1, min(99, (int) $raw['quantity']))
            : 1;

        return [
            'purchaseId' => $purchaseId,
            'productId' => $productId,
            'productName' => $productName,
            'currency' => $currency,
            'revenue' => $revenue,
            'quantity' => $quantity,
        ];
    }
}
