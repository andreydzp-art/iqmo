// Heuristic audit script (NOT wired into CI): for `input`-type questions
// with a fully numeric `correct` (e.g. ordering tasks), extract digits
// mentioned in `hint` in the order they appear and compare with `correct`.
// A mismatch indicates the answer key MAY be out of sync with its own
// explanation.
//
// Caveats — this heuristic produces false positives when:
//   - hint mentions atomic numbers / electron counts / unrelated digits
//     ("Si (14) < Al (13) < Mg (12)" — здесь 14/13/12 это не порядок);
//   - hint описывает компоненты ответа в обратном порядке ("заряд 20,
//     период 4" при ответе X=4 Y=20 → 420);
//   - hint вообще не дублирует все цифры ответа.
//
// Поэтому скрипт запускается ВРУЧНУЮ время от времени (или после массовых
// правок банка), и каждый репорт нужно глазами проверять. Реальные баги
// типа qid=26 биологии (опыт Сакса, correct '153642' vs логика '156342')
// он ловит надёжно — это и есть основная цель.
//
// Usage: node scripts/check-hint-vs-correct.mjs

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const banks = [
	{ path: 'extracted/biology-bank.js', global: 'BIOLOGY_QUESTIONS' },
	{ path: 'extracted/chemistry-bank.js', global: 'CHEMISTRY_QUESTIONS' },
];

let problems = 0;

for (const { path: rel, global } of banks) {
	const src = fs.readFileSync(path.resolve(rel), 'utf8');
	const ctx = { window: {} };
	vm.createContext(ctx);
	vm.runInContext(src + `;this.__bank = window.${global};`, ctx);
	const bank = ctx.__bank;
	if (!Array.isArray(bank)) {
		console.error(`[hint-check] ${rel}: bank window.${global} not found`);
		process.exit(2);
	}

	for (const q of bank) {
		if (q.type !== 'input') continue;
		if (typeof q.correct !== 'string') continue;
		if (!/^\d{3,}$/.test(q.correct)) continue;
		if (typeof q.hint !== 'string') continue;

		const correctDigits = q.correct.split('');
		const allowed = new Set(correctDigits);
		const fromHint = q.hint
			.split('')
			.filter((ch) => allowed.has(ch));

		// hint обычно дублирует цифры (например, "1) ... 1) ..." внутри
		// расшифровки), поэтому сравниваем только уникальную последовательность
		// первого появления каждой цифры.
		const seen = new Set();
		const firstAppearance = [];
		for (const ch of fromHint) {
			if (!seen.has(ch)) {
				seen.add(ch);
				firstAppearance.push(ch);
			}
		}

		// если hint не упоминает все цифры — пропускаем (неинформативно)
		if (firstAppearance.length !== correctDigits.length) continue;

		const projected = firstAppearance.join('');
		if (projected !== q.correct) {
			problems++;
			console.error(
				`[MISMATCH] ${rel} qid=${q.id} title="${q.title || ''}"`
			);
			console.error(`   correct (answer key): ${q.correct}`);
			console.error(`   hint sequence       : ${projected}`);
		}
	}
}

if (problems > 0) {
	console.error(`\nFound ${problems} mismatch(es) between correct and hint.`);
	process.exit(1);
}
console.log('hint-vs-correct: OK (no mismatches found)');
