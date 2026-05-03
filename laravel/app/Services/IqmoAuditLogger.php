<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Запись событий безопасности в iqmo.audit_log (audit #12).
 *
 * Дизайн:
 *   • static-фасад вместо DI — вызовов много (register/login/logout/
 *     logout-everywhere/deleteMe/admin.access), constructor-injection
 *     везде раздул бы сигнатуры; статика проще читается на сайте вызова;
 *   • любая ошибка БД глотается через try/catch + report() — audit-log
 *     не должен валить пользовательский запрос. Если БД недоступна,
 *     потеряем запись, но регистрация/login пройдут;
 *   • `record()` принимает Request опционально — для CLI-вызовов или
 *     scheduler-ов (если когда-то появятся) IP/UA не будут.
 *
 * Список валидных action — соглашение, не enum: пишем строкой, читаем
 * SELECT WHERE action='auth.login'. Используем dotted-namespace, чтобы
 * легко группировать (auth.* / admin.*) в админке.
 */
final class IqmoAuditLogger
{
    public const AUTH_REGISTER = 'auth.register';

    public const AUTH_LOGIN = 'auth.login';

    public const AUTH_LOGOUT = 'auth.logout';

    public const AUTH_LOGOUT_EVERYWHERE = 'auth.logout_everywhere';

    public const AUTH_ACCOUNT_DELETE = 'auth.account_delete';

    public const ADMIN_ACCESS = 'admin.access';

    /**
     * @param  array<string, mixed>  $context
     */
    public static function record(
        string $action,
        ?int $actorUserId = null,
        ?string $actorEmail = null,
        array $context = [],
        ?Request $request = null,
    ): void {
        try {
            DB::connection('iqmo')->table('audit_log')->insert([
                'actor_user_id' => $actorUserId,
                'actor_email' => $actorEmail !== null ? mb_substr($actorEmail, 0, 320) : null,
                'action' => mb_substr($action, 0, 64),
                'context_json' => $context === []
                    ? null
                    : json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                'ip' => $request?->ip(),
                'user_agent' => $request !== null
                    ? mb_substr((string) $request->userAgent(), 0, 255)
                    : null,
                'created_at' => (int) (microtime(true) * 1000),
            ]);
        } catch (\Throwable $e) {
            // Если таблицы нет (миграция не прокатилась) или БД недоступна —
            // не валим запрос, но шумим в логи: оператор увидит и поправит.
            report($e);
        }
    }
}
