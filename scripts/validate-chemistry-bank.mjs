#!/usr/bin/env node
// Регрессионный валидатор для банков вопросов.
//
// Защищает от двух классов багов:
//
//   1) LEAK: placeholder совпадает с correct — утечка ответа в input-полях.
//      Раньше у нас 108 из 115 input-вопросов в chemistry имели
//      `placeholder: 'например, 62'` при `correct: '62'`. Юзер видел ответ
//      ещё до отправки. В biology placeholder обычно описательный
//      («введите ответ (слово)», «5 цифр подряд»), но проверка применяется
//      и к нему — на случай если кто-то положит совпадающий plaintext.
//
//   2) DUPLICATE_QID: повторяющиеся id в банке. Один и тот же qid ломает
//      chemistry-variants/biology-variants (variant.qids → bank lookup)
//      и gmVariantBest (повтор результата).
//
// Запуск:
//   node scripts/validate-chemistry-bank.mjs
// Exit code:
//   0 — всё чисто (по обоим банкам)
//   1 — найдены проблемы (сообщения в stderr)
//
// Подключается в .github/workflows/{deploy,test}.yml ПЕРЕД sync-site.mjs:
// если кто-то закоммитит регрессию, деплой зафейлится с понятным сообщением.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const banks = [
	{ path: resolve(__dirname, '..', 'extracted', 'chemistry-bank.js'), label: 'chemistry-bank' },
	{ path: resolve(__dirname, '..', 'extracted', 'biology-bank.js'), label: 'biology-bank' },
];

let totalErrors = 0;

for (const { path: bankPath, label } of banks) {
	const src = readFileSync(bankPath, 'utf8');

	const errors = [];

	// ── 1. Placeholder leak check ─────────────────────────────────────────
	// Паттерн: placeholder: '...', \n ... correct: '...'.
	// Захватываем PH и Y и сравниваем напрямую: совпадение строкой —
	// явная утечка вне зависимости от формата.
	// (chemistry: 'например, 62'; biology: 'введите ответ (слово)' и т.д.)
	const phPattern = /placeholder:\s*'([^']*)',\s*\r?\n\s*(?:textAnswer:[^,]+,\s*\r?\n\s*)?correct:\s*'([^']+)'/g;
	let m;
	let totalInputs = 0;
	let leaks = 0;
	while ((m = phPattern.exec(src)) !== null) {
		totalInputs++;
		const ph = m[1].trim();
		const correct = m[2].trim();
		// Игнорируем «описательные» placeholder'ы — leak имеет смысл только
		// если placeholder это фактический ответ (как 'например, 62' = 62).
		// Если placeholder содержит пробелы/слова-описания — это явно не leak.
		const phStripped = ph.replace(/^например,\s*/, '').trim();
		if (phStripped && phStripped === correct) {
			leaks++;
			const line = src.slice(0, m.index).split('\n').length;
			errors.push(
				`LEAK at line ${line}: placeholder == correct == '${correct}' ` +
					`(см. extracted/${label}.js:${line})`
			);
		}
	}

	// ── 2. Duplicate qid check ────────────────────────────────────────────
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

	if (errors.length > 0) {
		console.error(`✗ ${label} FAILED: ${errors.length} проблем(ы)`);
		for (const e of errors) console.error('  • ' + e);
		console.error(`  (проверено: ${totalInputs} input-вопросов, ${seen.size} уникальных qid)`);
		console.error('');
		totalErrors += errors.length;
	} else {
		console.log(
			`✓ ${label} OK: ${totalInputs} input-вопросов без утечек, ${seen.size} уникальных qid.`
		);
	}
}

if (totalErrors > 0) process.exit(1);
