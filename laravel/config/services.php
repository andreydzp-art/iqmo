<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | IQMO (портал / Node-совместимая cookie iqmo_session, HS256 как в server/index.js)
    |--------------------------------------------------------------------------
    */
    'iqmo' => [
        'jwt_secret' => env('IQMO_JWT_SECRET'),
    ],

    /*
    | Источник «Посетители · Метрика» в /api/admin/overview (счётчик с сайта).
    | Токен: OAuth Яндекса с правом metrika:read.
    | @see https://yandex.com/dev/metrika/doc/api2/intro/authorization.html
    */
    'yandex_metrika' => [
        'counter_id' => env('YANDEX_METRIKA_COUNTER_ID', '108770166'),
        'oauth_token' => env('YANDEX_METRIKA_OAUTH_TOKEN'),
    ],

];
