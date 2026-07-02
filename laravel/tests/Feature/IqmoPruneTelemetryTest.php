<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\Concerns\UsesIqmoSqlite;
use Tests\TestCase;

/**
 * iqmo:prune-telemetry (E15): удаляет устаревшую телеметрию воронки/присутствия
 * и НЕ трогает analytics_events. Гоняется на in-memory sqlite.
 */
final class IqmoPruneTelemetryTest extends TestCase
{
    use UsesIqmoSqlite;

    protected function setUp(): void
    {
        parent::setUp();

        $this->useIqmoSqlite();
        config([
            'iqmo.retention.quiz_events_days' => 180,
            'iqmo.retention.quiz_sessions_days' => 180,
            'iqmo.retention.live_activity_days' => 30,
        ]);

        Schema::connection('iqmo')->create('quiz_events', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('occurred_at_ms');
        });
        Schema::connection('iqmo')->create('quiz_sessions', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('last_seen_at_ms');
        });
        Schema::connection('iqmo')->create('live_activity_events', function ($table): void {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('created_at');
        });
    }

    protected function tearDown(): void
    {
        foreach (['quiz_events', 'quiz_sessions', 'live_activity_events'] as $t) {
            Schema::connection('iqmo')->dropIfExists($t);
        }

        parent::tearDown();
    }

    private function seedRows(): void
    {
        $now = (int) (microtime(true) * 1000);
        $day = 86_400_000;

        // quiz_events: одна свежая (10 дн.), одна древняя (200 дн. > 180).
        DB::connection('iqmo')->table('quiz_events')->insert([
            ['occurred_at_ms' => $now - 10 * $day],
            ['occurred_at_ms' => $now - 200 * $day],
        ]);
        // quiz_sessions: свежая (30 дн.), древняя (200 дн.).
        DB::connection('iqmo')->table('quiz_sessions')->insert([
            ['last_seen_at_ms' => $now - 30 * $day],
            ['last_seen_at_ms' => $now - 200 * $day],
        ]);
        // live_activity: свежая (5 дн.), устаревшая (40 дн. > 30).
        DB::connection('iqmo')->table('live_activity_events')->insert([
            ['created_at' => $now - 5 * $day],
            ['created_at' => $now - 40 * $day],
        ]);
    }

    public function test_prune_removes_only_stale_rows(): void
    {
        $this->seedRows();

        $this->artisan('iqmo:prune-telemetry')->assertExitCode(0);

        $this->assertSame(1, DB::connection('iqmo')->table('quiz_events')->count());
        $this->assertSame(1, DB::connection('iqmo')->table('quiz_sessions')->count());
        $this->assertSame(1, DB::connection('iqmo')->table('live_activity_events')->count());
    }

    public function test_dry_run_deletes_nothing(): void
    {
        $this->seedRows();

        $this->artisan('iqmo:prune-telemetry', ['--dry-run' => true])->assertExitCode(0);

        $this->assertSame(2, DB::connection('iqmo')->table('quiz_events')->count());
        $this->assertSame(2, DB::connection('iqmo')->table('quiz_sessions')->count());
        $this->assertSame(2, DB::connection('iqmo')->table('live_activity_events')->count());
    }

    public function test_zero_days_disables_pruning_for_that_table(): void
    {
        config(['iqmo.retention.quiz_events_days' => 0]);
        $this->seedRows();

        $this->artisan('iqmo:prune-telemetry')->assertExitCode(0);

        // quiz_events отключён — обе строки остаются.
        $this->assertSame(2, DB::connection('iqmo')->table('quiz_events')->count());
        // Остальные подрезаны как обычно.
        $this->assertSame(1, DB::connection('iqmo')->table('quiz_sessions')->count());
    }
}
