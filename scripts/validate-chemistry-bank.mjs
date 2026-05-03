#!/usr/bin/env node
// Регрессионный валидатор для extracted/chemistry-bank.js.
//
// Защищает от двух классов багов:
//
//   1) LEAK: placeholder совпадает с correct — утечка ответа в input-полях.
//      Раньше у нас 108 из 115 input-вопросов имели `placeholder: 'например, 62'`
//      при `correct: '62'`. Юзер видел ответ ещё до отправки.
//
//   2) DUPLICATE_QID: повторяющиеся id в банке. Один и тот же qid
//      ломает chemistry-variants.js (variant.qids → bank lookup) и
//      gmVariantBest (повтор результата).
//
// Запуск:
//   node scripts/validate-chemistry-bank.mjs
// Exit code:
//   0 — всё чисто
//   1 — найдены проблемы (сообщения в stderr)
//
// Подключается в .github/workflows/deploy.yml ПЕРЕД sync-site.mjs:
// если кто-то закоммитит регрессию, деплой зафейлится с понятным сообщением.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bankPath = resolve(__dirname, '..', 'extracted', 'chemistry-bank.js');

const src = readFileSync(bankPath, 'utf8');

const errors = [];

// ── 1. Placeholder leak check ─────────────────────────────────────────────
// Паттерн: placeholder: 'например, X', \n correct: 'Y'.
// Захватываем X и Y и сравниваем — без AST, потому что банк это объектный
// литерал и весь синтаксис стабилен (мы его сами генерируем).
const phPattern = /placeholder:\s*'например,\s*([^']+)',\s*\r?\n\s*correct:\s*'([^']+)'/g;
let m;
let totalInputs = 0;
let leaks = 0;
while ((m = phPattern.exec(src)) !== null) {
	totalInputs++;
	const ph = m[1].trim();
	const correct = m[2].trim();
	if (ph === correct) {
		leaks++;
		// Сообщаем номер строки, чтобы быстро найти место. Считаем \n до
		// начала матча — это дешевле, чем парсить полную позицию.
		const line = src.slice(0, m.index).split('\n').length;
		errors.push(
			`LEAK at line ${line}: placeholder == correct == '${correct}' ` +
				`(см. extracted/chemistry-bank.js:${line})`
		);
	}
}

// ── 2. Duplicate qid check ────────────────────────────────────────────────
// Каждый объект-вопрос начинается с `id: <number>,`. Собираем все и ищем
// повторы.
const idPattern = /^\s*id:\s*(\d+),\s*$/gm;
const seen = new Map();
let im;
while ((im = idPattern.exec(src)) !== null) {
	const qid = parseInt(im[1], 10);
	const line = src.slice(0, im.index).split('\n').length;
	if (seen.has(qid)) {
		errors.push(
			`DUPLICATE_QID: id=${qid} встречается дважды (строки ${seen.get(qid)} и ${line})`
		);
	} else {
		seen.set(qid, line);
	}
}

// ── Итог ──────────────────────────────────────────────────────────────────
if (errors.length > 0) {
	console.error(`✗ chemistry-bank validation FAILED: ${errors.length} проблем(ы)`);
	console.error('');
	for (const e of errors) {
		console.error('  • ' + e);
	}
	console.error('');
	console.error(`Проверено: ${totalInputs} input-вопросов, ${seen.size} уникальных qid.`);
	process.exit(1);
}

console.log(
	`✓ chemistry-bank OK: ${totalInputs} input-вопросов без утечек, ${seen.size} уникальных qid.`
);
