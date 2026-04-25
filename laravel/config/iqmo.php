<?php

return [
    'jwt_secret' => env('IQMO_JWT_SECRET', ''),
    'cookie_name' => 'iqmo_session',
    // In production behind HTTPS, cookies should be Secure.
    // If null, we auto-detect from APP_URL scheme.
    'cookie_secure' => env('IQMO_COOKIE_SECURE', null),
    // Optional cookie domain override (e.g. ".iqmoschool.ru")
    'cookie_domain' => env('IQMO_COOKIE_DOMAIN', null),
];
