<?php

return [
    'jwt_secret' => env('IQMO_JWT_SECRET', ''),
    'cookie_name' => 'iqmo_session',
    // In production behind HTTPS, cookies should be Secure.
    // If null, we auto-detect from APP_URL scheme.
    'cookie_secure' => env('IQMO_COOKIE_SECURE', null),
    // Optional cookie domain override (e.g. ".iqmoschool.ru")
    'cookie_domain' => env('IQMO_COOKIE_DOMAIN', null),

    /*
     * Comma-separated portal logins (IQMO JWT /api/me) allowed to open /admin/*.
     * Example: IQMO_ADMIN_EMAILS=you@company.ru,other@company.ru
     */
    'admin_emails' => array_values(array_filter(array_map(
        static fn (string $e): string => strtolower(trim($e)),
        explode(',', (string) env('IQMO_ADMIN_EMAILS', ''))
    ))),

    /*
     * Ретеншен эфемерной телеметрии (см. IqmoPruneTelemetryCommand).
     * Значение <= 0 отключает чистку конкретной таблицы. analytics_events
     * сюда НЕ входит намеренно — там выручка и агрегаты для админки.
     */
    'retention' => [
        'quiz_events_days' => (int) env('IQMO_RETAIN_QUIZ_EVENTS_DAYS', 180),
        'quiz_sessions_days' => (int) env('IQMO_RETAIN_QUIZ_SESSIONS_DAYS', 180),
        'live_activity_days' => (int) env('IQMO_RETAIN_LIVE_ACTIVITY_DAYS', 30),
    ],
];
