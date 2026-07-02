<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Ретеншен эфемерной телеметрии воронки/присутствия (E15). Без него
// quiz_events / quiz_sessions / live_activity_events росли без предела.
// Требует запущенного `php artisan schedule:work` (или системного cron
// с `schedule:run` раз в минуту) на VPS.
Schedule::command('iqmo:prune-telemetry')
    ->dailyAt('03:30')
    ->withoutOverlapping();
