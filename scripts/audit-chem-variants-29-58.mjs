#!/usr/bin/env node
/**
 * Сверка correct в chemistry-bank.js с эталонными source-файлами
 * для site-вариантов 29–58.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function loadBank(rel) {
	const src = fs.readFileSync(path.join(root, rel), 'utf8');
	const ctx = { window: {} };
	vm.createContext(ctx);
	vm.runInContext(src + ';this.__bank = window.CHEMISTRY_QUESTIONS;', ctx);
	return ctx.__bank;
}

function loadVariants() {
	const src = fs.readFileSync(path.join(root, 'extracted/chemistry-variants.js'), 'utf8');
	const ctx = { window: {} };
	vm.createContext(ctx);
	vm.runInContext(src + ';this.__v = window.CHEMISTRY_VARIANTS;', ctx);
	return ctx.__v;
}

function loadSourceQuestions(filePath) {
	const src = fs.readFileSync(filePath, 'utf8');
	const ctx = {};
	vm.createContext(ctx);
	vm.runInContext(src + ';this.__q = typeof questions !== "undefined" ? questions : [];', ctx);
	return ctx.__q;
}

function bankAnswer(q) {
	if (Array.isArray(q.correct)) {
		if (q.type === 'multi' && q.pickCount === 2) {
			return [...q.correct].sort().join('');
		}
		return q.correct.join('');
	}
	return String(q.correct ?? '').replace(/%/g, '');
}

function sourceAnswer(ans, type) {
	const s = String(ans ?? '').replace(/%/g, '').trim();
	if (type === 1 && s.length === 2) {
		return [...s].sort().join('');
	}
	return s;
}

function pdfVariantForSite(siteId) {
	if (siteId === 29) return null; // дубликат варианта 12
	if (siteId >= 30 && siteId <= 39) return siteId - 29; // PDF 1–10
	if (siteId >= 40 && siteId <= 49) return siteId - 29; // PDF 11–20
	if (siteId >= 50 && siteId <= 58) return siteId - 29; // PDF 21–29
	return null;
}

const sources = {
	'1-10': loadSourceQuestions('C:/Users/user/Downloads/oge_chemistry.js'),
	'11-20': loadSourceQuestions('C:/Users/user/Downloads/oge_chemistry_11-20.js'),
	'21-29': loadSourceQuestions('C:/Users/user/Downloads/oge_chemistry_21-30_fixed.js'),
};

const sourceById = new Map();
for (const q of sources['1-10']) sourceById.set(q.id, q);
for (const q of sources['11-20']) sourceById.set(q.id, q);
for (const q of sources['21-29']) sourceById.set(q.id, q);

const bank = loadBank('extracted/chemistry-bank.js');
const bankById = new Map(bank.map((q) => [q.id, q]));
const variants = loadVariants().filter((v) => v.id >= 29 && v.id <= 58);

const issues = [];
const ok = [];

for (const v of variants) {
	const pdf = pdfVariantForSite(v.id);
	for (let i = 0; i < v.qids.length; i++) {
		const qid = v.qids[i];
		const taskNum = i + 1;
		const q = bankById.get(qid);
		if (!q) {
			issues.push({ variant: v.id, task: taskNum, qid, kind: 'MISSING_QID', detail: 'нет в банке' });
			continue;
		}
		if (q.type === 'open' || q.type === 'practical') continue;

		const bankAns = bankAnswer(q);
		let expected = null;
		let srcNote = '';

		if (v.id === 29) {
			// Самопроверка: hint должен согласовываться с correct для input/match/multi
			if (typeof q.hint === 'string') {
				const m = q.hint.match(/Ответ[^«]*«([^»]+)»/i) || q.hint.match(/ответ[^—]*—\s*«([^»]+)»/i);
				if (m) {
					let hintAns = m[1].replace(/\s/g, '');
					if (q.type === 'multi' && hintAns.length === 2) hintAns = [...hintAns].sort().join('');
					if (hintAns !== bankAns && hintAns.replace(/[.,]/g, '') !== bankAns) {
						issues.push({
							variant: v.id,
							task: taskNum,
							qid,
							kind: 'HINT_MISMATCH',
							bank: bankAns,
							expected: hintAns,
							title: q.title,
						});
					} else {
						ok.push({ variant: v.id, task: taskNum, qid, bank: bankAns });
					}
				} else {
					ok.push({ variant: v.id, task: taskNum, qid, bank: bankAns, note: 'no hint quote' });
				}
			}
			continue;
		}

		const srcId = pdf * 100 + taskNum;
		const src = sourceById.get(srcId);
		if (!src) {
			if (taskNum <= 19) {
				issues.push({ variant: v.id, task: taskNum, qid, kind: 'NO_SOURCE', detail: `srcId=${srcId}` });
			}
			continue;
		}
		expected = sourceAnswer(src.answer, src.type);
		if (expected !== bankAns) {
			issues.push({
				variant: v.id,
				task: taskNum,
				qid,
				kind: 'KEY_MISMATCH',
				bank: bankAns,
				expected,
				title: q.title,
				srcNote: src.explanation?.slice(0, 80),
			});
		} else {
			ok.push({ variant: v.id, task: taskNum, qid, bank: bankAns });
		}
	}
}

// Hint internal consistency for variants 30-58 (input 3+ digits)
for (const v of variants) {
	if (v.id === 29) continue;
	for (const qid of v.qids) {
		const q = bankById.get(qid);
		if (!q || q.type !== 'input') continue;
		if (typeof q.correct !== 'string' || !/^\d{3,}$/.test(q.correct)) continue;
		if (typeof q.hint !== 'string') continue;
		const correctDigits = q.correct.split('');
		const allowed = new Set(correctDigits);
		const fromHint = q.hint.split('').filter((ch) => allowed.has(ch));
		const seen = new Set();
		const first = [];
		for (const ch of fromHint) {
			if (!seen.has(ch)) {
				seen.add(ch);
				first.push(ch);
			}
		}
		if (first.length === correctDigits.length && first.join('') !== q.correct) {
			issues.push({
				variant: Math.floor(qid / 100),
				task: qid % 100,
				qid,
				kind: 'HINT_LOGIC',
				bank: q.correct,
				expected: first.join(''),
				title: q.title,
			});
		}
	}
}

console.log(`\n=== Аудит вариантов 29–58 ===`);
console.log(`Проверено совпадений с эталоном: ${ok.length}`);
console.log(`Проблем: ${issues.length}\n`);

if (issues.length) {
	const byKind = {};
	for (const i of issues) {
		(byKind[i.kind] ||= []).push(i);
	}
	for (const [kind, list] of Object.entries(byKind)) {
		console.log(`--- ${kind} (${list.length}) ---`);
		for (const i of list) {
			console.log(
				`  V${i.variant} №${i.task} qid=${i.qid}` +
					(i.bank != null ? ` bank=${i.bank}` : '') +
					(i.expected != null ? ` vs ${i.expected}` : '') +
					(i.detail ? ` (${i.detail})` : '') +
					(i.title ? ` «${i.title.slice(0, 50)}…»` : '')
			);
		}
	}
	process.exit(1);
}

console.log('OK: все числовые ответы 29–58 совпадают с эталонными source-файлами.');
