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
];
