<?php

declare(strict_types=1);

namespace Tests\Concerns;

/**
 * Переключает соединение `iqmo` на in-memory sqlite для теста.
 *
 * Соединение `iqmo` в config/database.php захардкожено на MySQL (прод), а в
 * CI/локально MySQL нет. Раньше этот 6-строчный блок конфигурации дублировался
 * в каждом Feature-тесте, который ходит в `iqmo`. Трейт убирает дубль: тест
 * вызывает $this->useIqmoSqlite() в setUp() и дальше сам строит нужную схему
 * через Schema::connection('iqmo').
 */
trait UsesIqmoSqlite
{
    protected function useIqmoSqlite(): void
    {
        config(['database.connections.iqmo' => [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
            'foreign_key_constraints' => false,
        ]]);
    }
}
