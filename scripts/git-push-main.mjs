#!/usr/bin/env node
/**
 * Безопасный push в origin/main (для ручного запуска деплоя на VPS).
 * CI: `.github/workflows/deploy.yml` срабатывает на push в main.
 */
import { execSync } from 'node:child_process';

function run(cmd) {
	return execSync(cmd, { encoding: 'utf8' }).trim();
}

const branch = run('git branch --show-current');
if (branch !== 'main') {
	console.error(`[deploy:push] Отказ: сейчас ветка «${branch}», нужна main. Сделайте merge в main или checkout main.`);
	process.exit(1);
}

const status = run('git status --porcelain');
if (status) {
	console.error('[deploy:push] Отказ: есть незакоммиченные изменения. Закоммитьте или спрячьте их.');
	console.error(status);
	process.exit(1);
}

execSync('git push origin main', { stdio: 'inherit' });
