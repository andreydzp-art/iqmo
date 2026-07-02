<?php

declare(strict_types=1);

namespace App\Constants;

/**
 * Каталог error-кодов нашего JSON API (audit #17).
 *
 * Контракт ответа на ошибку:
 *   { "error": "<one of these constants>" }
 * HTTP-status намеренно НЕ кодирован в коде — он передаётся отдельно в
 * response()->json([...], $status). Один и тот же `unauthorized` может
 * приходить с 401 на /api/profile/state и с 401 на /api/admin/users:
 * клиенту полезно различать по URL, а не по тексту ошибки.
 *
 * Соглашения:
 *   • snake_case: [a-z][a-z0-9_]*. Регрессионный тест
 *     ApiErrorCodeTest::test_all_codes_match_snake_case проверяет.
 *   • Группа определяется префиксом-namespace'ом по смыслу:
 *       invalid_*       — клиентская валидация (HTTP 400)
 *       *_required      — отсутствует обязательное поле (400)
 *       *_too_large     — превышен лимит payload (413)
 *       too_many_*      — превышено количество (400 / 429)
 *       no_*, not_found — ресурс/состояние отсутствует (404 / 500)
 *       user_mismatch   — конфликт между токеном и payload (409)
 *       payload_too_large — body тяжелее лимита (413)
 *       unauthorized    — нет или невалидный токен (401)
 *       invalid_credentials — email+password не совпали (401)
 *       revocation_unavailable — token-version колонка отсутствует (503)
 *       server          — generic 500, см. логи
 *
 * Когда добавляете новый код:
 *   1. Добавьте константу здесь — name через `_` lowercase.
 *   2. Используйте её как ApiErrorCode::FOO в response()->json.
 *   3. Регрессионный тест увидит её автоматически (через Reflection).
 *
 * Когда переименовываете (rename) код — это API-breaking change для
 * клиентов, которые могут различать ошибки по тексту. Сейчас фронт
 * различает только USER_MISMATCH (см. iqmo-sync.js); если в будущем
 * расширится — учитывайте.
 */
final class ApiErrorCode
{
    public const INVALID_EMAIL = 'invalid_email';

    public const INVALID_PHONE = 'invalid_phone';

    public const INVALID_CREDENTIALS = 'invalid_credentials';

    public const INVALID_QUIZ_ID = 'invalid_quiz_id';

    public const INVALID_EVENT = 'invalid_event';

    public const INVALID_Q_IDX = 'invalid_q_idx';

    public const INVALID_PAYLOAD = 'invalid_payload';

    public const PASSWORD_SHORT = 'password_short';

    public const PASSWORD_LONG = 'password_long';

    public const NO_CONTACT = 'no_contact';

    public const NO_STATE = 'no_state';

    public const NO_VALID_EVENTS = 'no_valid_events';

    public const NOT_FOUND = 'not_found';

    public const KEYS_REQUIRED = 'keys_required';

    public const HISTORY_ID_REQUIRED = 'history_id_required';

    public const EVENTS_REQUIRED = 'events_required';

    public const TOO_MANY_EVENTS = 'too_many_events';

    public const PAYLOAD_TOO_LARGE = 'payload_too_large';

    public const USER_MISMATCH = 'user_mismatch';

    public const UNAUTHORIZED = 'unauthorized';

    public const FORBIDDEN = 'forbidden';

    public const REVOCATION_UNAVAILABLE = 'revocation_unavailable';

    public const REVISION_MISMATCH = 'revision_mismatch';

    public const BUILD_FAILED = 'build_failed';

    public const INVALID_ID = 'invalid_id';

    public const USER_NOT_FOUND = 'user_not_found';

    public const SERVER = 'server';

    /**
     * Полный список кодов — для тестов и документации.
     *
     * Реализован через Reflection, чтобы не дублировать список руками
     * (новые константы попадут в массив автоматически).
     *
     * @return list<string>
     */
    public static function all(): array
    {
        $reflection = new \ReflectionClass(self::class);
        $values = array_values($reflection->getConstants());
        // Reflection возвращает mixed[]; явно фильтруем строки на случай
        // добавления non-string констант в будущем.
        return array_values(array_filter($values, 'is_string'));
    }
}
