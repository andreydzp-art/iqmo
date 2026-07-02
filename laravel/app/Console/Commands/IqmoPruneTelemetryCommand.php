<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Ретеншен высокообъёмной телеметрии IQMO (E15).
 *
 * До этой команды ни одна из «журнальных» таблиц не чистилась — они росли
 * без предела (у quiz_sessions даже был заложен индекс idx_quiz_sessions_last_seen
 * под будущую чистку, но самой чистки не было). Под платным трафиком
 * Яндекс.Директа быстрее всего разрастается quiz_events (строка на каждый
 * вопрос каждой сессии).
 *
 * Чистим ТОЛЬКО эфемерную телеметрию воронки/присутствия:
 *   • quiz_events            (occurred_at_ms)
 *   • quiz_sessions          (last_seen_at_ms)
 *   • live_activity_events   (created_at)
 *
 * analytics_events НЕ трогаем намеренно: там лежат iqmo.purchase (выручка)
 * и агрегаты, на которых строится админ-аналитика (MAU за 30 дней, воронки).
 * Их ретеншен — отдельное бизнес-решение, не эфемерная телеметрия.
 *
 * Удаление батчами (портируемо для mysql/sqlite, без MySQL-only
 * `DELETE ... LIMIT`): выбираем пачку id и удаляем по whereIn, пока строки
 * не кончатся — так первый большой прогон не держит долгую блокировку.
 */
final class IqmoPruneTelemetryCommand extends Command
{
    protected $signature = 'iqmo:prune-telemetry
        {--dry-run : Только показать, сколько строк было бы удалено, без удаления}';

    protected $description = 'Удаляет устаревшую телеметрию воронки/присутствия (quiz_events, quiz_sessions, live_activity_events)';

    /** Размер батча удаления. */
    private const BATCH = 5000;

    public function handle(): int
    {
        $nowMs = (int) (microtime(true) * 1000);
        $dryRun = (bool) $this->option('dry-run');

        $targets = [
            ['table' => 'quiz_events', 'column' => 'occurred_at_ms', 'days' => (int) config('iqmo.retention.quiz_events_days', 180)],
            ['table' => 'quiz_sessions', 'column' => 'last_seen_at_ms', 'days' => (int) config('iqmo.retention.quiz_sessions_days', 180)],
            ['table' => 'live_activity_events', 'column' => 'created_at', 'days' => (int) config('iqmo.retention.live_activity_days', 30)],
        ];

        $total = 0;
        foreach ($targets as $t) {
            $days = $t['days'];
            if ($days <= 0) {
                $this->line("· {$t['table']}: ретеншен отключён (days<=0), пропуск");

                continue;
            }
            $cutoff = $nowMs - $days * 86_400_000;
            $deleted = $this->pruneTable($t['table'], $t['column'], $cutoff, $dryRun);
            $total += $deleted;
            $verb = $dryRun ? 'было бы удалено' : 'удалено';
            $this->line("· {$t['table']}: {$verb} {$deleted} (старше {$days} дн.)");
        }

        $this->info(($dryRun ? '[dry-run] ' : '')."Итого: {$total} строк.");

        return self::SUCCESS;
    }

    /**
     * Удаляет батчами строки старше $cutoff. Возвращает число удалённых
     * (или подлежащих удалению в dry-run).
     */
    private function pruneTable(string $table, string $column, int $cutoff, bool $dryRun): int
    {
        $conn = DB::connection('iqmo');

        if (! $conn->getSchemaBuilder()->hasTable($table)) {
            $this->warn("  таблица {$table} отсутствует — пропуск");

            return 0;
        }

        if ($dryRun) {
            return (int) $conn->table($table)->where($column, '<', $cutoff)->count();
        }

        $deleted = 0;
        do {
            $ids = $conn->table($table)
                ->where($column, '<', $cutoff)
                ->limit(self::BATCH)
                ->pluck('id')
                ->all();
            if ($ids === []) {
                break;
            }
            $deleted += $conn->table($table)->whereIn('id', $ids)->delete();
        } while (count($ids) === self::BATCH);

        return $deleted;
    }
}
