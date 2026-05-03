<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Constants\ApiErrorCode;
use PHPUnit\Framework\TestCase;

/**
 * Регрессионные инварианты для каталога ApiErrorCode (audit #17).
 *
 * Зачем: каталог легко расходится — разработчик добавил новый код
 * напрямую в response()->json([...]) минуя ApiErrorCode, или назвал
 * константу в camelCase. Тесты ловят это сразу.
 */
final class ApiErrorCodeTest extends TestCase
{
    public function test_all_codes_are_non_empty_strings(): void
    {
        $codes = ApiErrorCode::all();
        $this->assertNotEmpty($codes, 'ApiErrorCode не должен быть пустым');
        foreach ($codes as $code) {
            $this->assertIsString($code);
            $this->assertNotSame('', $code, 'Пустых кодов быть не должно');
        }
    }

    public function test_all_codes_match_snake_case(): void
    {
        // [a-z][a-z0-9_]* — snake_case, начинается с буквы. Допустимо
        // подряд несколько подчёркиваний (history_id_required), но НЕ в
        // начале/конце.
        $pattern = '/^[a-z][a-z0-9_]*[a-z0-9]$/';
        foreach (ApiErrorCode::all() as $code) {
            $this->assertMatchesRegularExpression(
                $pattern,
                $code,
                "Код «{$code}» не соответствует snake_case [a-z][a-z0-9_]*"
            );
        }
    }

    public function test_no_duplicate_codes(): void
    {
        $codes = ApiErrorCode::all();
        $unique = array_unique($codes);
        $this->assertSame(
            count($codes),
            count($unique),
            'Два разных PHP-константы не должны указывать на одну строку'
        );
    }

    public function test_constant_name_matches_value(): void
    {
        // INVALID_EMAIL должна быть = 'invalid_email'. Это упрощает
        // grep'ать по проекту: ищу 'invalid_email' → нахожу и константу,
        // и места использования. Расхождение бы скрывало usages.
        $reflection = new \ReflectionClass(ApiErrorCode::class);
        foreach ($reflection->getConstants() as $name => $value) {
            if (! is_string($value)) {
                continue;
            }
            $this->assertSame(
                strtolower($name),
                $value,
                "Константа {$name} не соответствует своему значению '{$value}'"
            );
        }
    }
}
