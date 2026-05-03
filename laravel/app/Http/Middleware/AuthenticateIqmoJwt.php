<?php

namespace App\Http\Middleware;

use App\Constants\ApiErrorCode;
use App\Services\IqmoJwt;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

final class AuthenticateIqmoJwt
{
    public function handle(Request $request, Closure $next): Response
    {
        $cookieName = (string) config('iqmo.cookie_name', 'iqmo_session');
        $token = (string) ($request->cookies->get($cookieName) ?? '');
        $jwt = IqmoJwt::fromConfig();
        $payload = $jwt->verify($token);
        if (!$payload) {
            return response()->json(['error' => ApiErrorCode::UNAUTHORIZED], 401);
        }

        // Server-side revocation (audit #3). Раньше middleware был
        // полностью stateless: украденный JWT работал 30 дней без
        // возможности отозвать. Теперь:
        //   1. Юзер должен существовать в users (защита после delete:
        //      cookie на других вкладках/устройствах перестаёт работать).
        //   2. token_version в БД должен совпадать с tv из payload.
        //      INCREMENT token_version (logout-everywhere / в будущем —
        //      смена пароля) мгновенно инвалидирует все ранее выпущенные
        //      токены этого юзера.
        // Если колонка token_version отсутствует (миграция не прокатилась
        // на старом инстансе) — считаем серверный tv = 1, тогда payload
        // tv тоже 1 (default из verify()), и проверка пропускает.
        try {
            $row = DB::connection('iqmo')
                ->table('users')
                ->select('id', 'token_version')
                ->where('id', $payload['uid'])
                ->first();
        } catch (\Throwable $e) {
            // Не валим запрос на сбое БД — это сделало бы недоступным весь
            // авторизованный API при кратком обрыве MySQL. Сигнатура и
            // exp уже проверены, доверяем им как раньше.
            $request->attributes->set('iqmo_user_id', $payload['uid']);
            $request->attributes->set('iqmo_user_email', $payload['email']);

            return $next($request);
        }

        if (!$row) {
            return response()->json(['error' => ApiErrorCode::UNAUTHORIZED], 401);
        }

        $serverTv = isset($row->token_version) ? (int) $row->token_version : 1;
        if ($serverTv !== (int) $payload['tv']) {
            return response()->json(['error' => ApiErrorCode::UNAUTHORIZED], 401);
        }

        $request->attributes->set('iqmo_user_id', $payload['uid']);
        $request->attributes->set('iqmo_user_email', $payload['email']);

        return $next($request);
    }
}
