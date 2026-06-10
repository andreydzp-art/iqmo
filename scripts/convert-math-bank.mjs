#!/usr/bin/env node
// Конвертер: oge_math.js (несколько batch-источников) → mathematics-bank.js + mathematics-variants.js.
//
// Особенности:
//   • Поддерживает несколько BATCHES (каждый — свой oge_math.js со своим маппингом
//     orig variant → итоговый id и со своим imagePrefix для изображений).
//   • qid = (id - 1) * 25 + type — стабильный, прогрессы пользователей не съезжают.
//   • Задания 20–25 (part === 2) → type:'written', maxPoints:2, self-check.
//   • Задания 1–19 → 'input' или 'single' (если answer — единичная цифра + есть options).
//   • OVERRIDES по qid точечно правят авторские ошибки (см. teplica qid=3).
//
// Использование (из корня репо):
//   node scripts/convert-math-bank.mjs
// Скрипт ожидает оба архива распакованными (см. BATCHES.path ниже).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ============================================================================
// Конфигурация batch-ей.
// При получении нового архива от автора — добавляем сюда новую запись.
// ============================================================================
//
// remap: orig variant в файле → итоговый id в банке (стабильный для qid).
// imagePrefix: префикс к именам картинок при сохранении в /img/mathematics/.
//   Пустой prefix '' = имена остаются как в архиве (используется для batch 1,
//   у которого уникальные `v1_..v20_*` имена). Для batch 2 имена `v1_..v5_*`
//   конфликтуют с batch 1, поэтому добавляем 'b2_' и в имена файлов, и в
//   ссылки внутри `body` заданий.
const BATCHES = [
	{
		name: 'batch-1 (files (3).zip)',
		path: 'E:\\1\\_math-archive-3\\oge_math.js',
		imagesDir: 'E:\\1\\_math-archive-3\\images\\images',
		imagePrefix: '',
		remap: {
			6: 1, 7: 2, 8: 3, 9: 4, 10: 5,
			1: 6, 2: 7, 3: 8, 4: 9, 5: 10,
			11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16,
			18: 17, 19: 18, 20: 19,
		},
	},
	{
		name: 'batch-2 (oge_math_1-5.js)',
		path: 'E:\\1\\_math-1-5\\oge_math.js',
		imagesDir: 'E:\\1\\_math-1-5\\images\\images',
		imagePrefix: 'b2_',
		remap: {
			1: 20, 2: 21, 3: 22, 4: 23, 5: 24,
		},
	},
];

const OUT_BANK = resolve(ROOT, 'extracted/mathematics-bank.js');
const OUT_VARIANTS = resolve(ROOT, 'extracted/mathematics-variants.js');
const OUT_IMG_DIR = resolve(ROOT, 'extracted/img/mathematics');

const TYPE_TITLES = {
	1: 'Практическое задание',
	2: 'Практическое задание',
	3: 'Практическое задание',
	4: 'Практическое задание',
	5: 'Практическое задание',
	6: 'Дроби и арифметика',
	7: 'Числовая прямая',
	8: 'Степени и корни',
	9: 'Уравнение',
	10: 'Вероятность',
	11: 'Графики и формулы',
	12: 'Формула',
	13: 'Неравенство',
	14: 'Прогрессия и последовательности',
	15: 'Треугольник',
	16: 'Окружность и квадрат',
	17: 'Ромб',
	18: 'Трапеция',
	19: 'Геометрические утверждения',
	20: 'Часть 2 · Уравнение',
	21: 'Часть 2 · Текстовая задача',
	22: 'Часть 2 · График функции',
	23: 'Часть 2 · Планиметрия (вычисление)',
	24: 'Часть 2 · Планиметрия (доказательство)',
	25: 'Часть 2 · Планиметрия (вычисление)',
};

function escHtml(s) {
	return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderBody(question, image, imagePrefix) {
	const paragraphs = String(question)
		.split(/\n{2,}/)
		.map((p) => '<p>' + escHtml(p.trim()).replace(/\n/g, '<br>') + '</p>')
		.join('');
	let figure = '';
	if (image) {
		const fname = imagePrefix + image;
		figure =
			'<figure class="q-figure">' +
			`<img class="q-figure__img" src="/img/mathematics/${fname}" alt="Иллюстрация к заданию ОГЭ по математике" loading="lazy" decoding="async" />` +
			'</figure>';
	}
	return paragraphs + figure;
}

function renderHint(explanation) {
	return String(explanation)
		.split(/\n+/)
		.map((p) => '<p>' + escHtml(p.trim()) + '</p>')
		.join('');
}

function pickType(item) {
	if (item.part === 2) return 'written';
	if (Array.isArray(item.options) && item.options.length > 0) {
		const ans = String(item.answer).trim();
		if (/^[1-9]\d?$/.test(ans) && ans.length === 1) return 'single';
		return 'input';
	}
	return 'input';
}

function pickCorrect(item) {
	return String(item.answer).trim();
}

function readBatch(batch) {
	if (!existsSync(batch.path)) {
		throw new Error(`[convert] не найден источник ${batch.name}: ${batch.path}`);
	}
	const raw = readFileSync(batch.path, 'utf8');
	const stripped = raw.replace(/if\s*\(typeof\s+module[\s\S]*?\}/m, '');
	const fn = new Function(stripped + '\n;return questions;');
	const questions = fn();
	if (!Array.isArray(questions)) throw new Error(`[convert] ${batch.name}: questions не массив`);
	console.log(`[convert] ${batch.name}: задач ${questions.length}`);
	return questions;
}

// ============================================================================
// Сборка банка.
// ============================================================================
const bank = [];
const variantsMap = new Map(); // id → array of qid
const imageRenames = []; // {srcDir, srcName, dstName}

for (const batch of BATCHES) {
	const questions = readBatch(batch);
	for (const orig of questions) {
		const newId = batch.remap[orig.variant];
		if (newId == null) {
			console.warn(`[convert] ${batch.name}: пропущено variant=${orig.variant} (нет в remap)`);
			continue;
		}
		const qid = (newId - 1) * 25 + orig.type;
		const type = pickType(orig);
		const item = {
			id: qid,
			type,
			title: TYPE_TITLES[orig.type] || `Задание №${orig.type}`,
			body: renderBody(orig.question, orig.image, batch.imagePrefix),
			hint: renderHint(orig.explanation),
		};
		if (type === 'written') {
			item.maxPoints = 2;
		} else {
			item.correct = pickCorrect(orig);
			if (Array.isArray(orig.options)) {
				item.options = orig.options.map((opt) =>
					String(opt).replace(/^\s*(?:[АA-Я])\)\s*/i, '').replace(/^\s*\d+\)\s*/, ''),
				);
			}
		}
		bank.push(item);

		if (orig.image) {
			imageRenames.push({
				srcDir: batch.imagesDir,
				srcName: orig.image,
				dstName: batch.imagePrefix + orig.image,
			});
		}
		if (!variantsMap.has(newId)) variantsMap.set(newId, []);
		variantsMap.get(newId).push(qid);
	}
}

// ============================================================================
// Точечные исправления авторских данных.
// ============================================================================
const OVERRIDES = {
	// qid=3: задача 3 варианта 1 (теплица). 5 м × 4,5 м = 22,5 м² = 225 000 см²;
	// авторские 112 500 — опечатка ровно вдвое.
	3: {
		correct: '225000',
		hint:
			'<p>Основание теплицы — прямоугольник со сторонами 5&nbsp;м (диаметр полуцилиндра) и 4,5&nbsp;м (длина). ' +
			'Площадь&nbsp;= 5&nbsp;·&nbsp;4,5&nbsp;=&nbsp;22,5&nbsp;м². ' +
			'Переводим в см²: 1&nbsp;м²&nbsp;=&nbsp;10&nbsp;000&nbsp;см², значит 22,5&nbsp;·&nbsp;10&nbsp;000&nbsp;=&nbsp;225&nbsp;000&nbsp;см².</p>',
	},
};

let overrideCount = 0;
for (const item of bank) {
	const o = OVERRIDES[item.id];
	if (!o) continue;
	for (const k of Object.keys(o)) item[k] = o[k];
	overrideCount++;
}
console.log(`[convert] применено overrides: ${overrideCount}`);

// ============================================================================
// Сборка списка вариантов.
// ============================================================================
bank.sort((a, b) => a.id - b.id);
const variantIds = [...variantsMap.keys()].sort((a, b) => a - b);
const variants = variantIds.map((id) => ({
	id,
	title: `Вариант ${id}`,
	qids: variantsMap.get(id).sort((a, b) => a - b),
	status: 'ready',
}));

console.log(`[convert] банк: ${bank.length} вопросов; вариантов ready: ${variants.length}`);

// ============================================================================
// Сериализация в JS.
// ============================================================================
function serializeQuestion(q) {
	const lines = ['\t{'];
	lines.push(`\t\tid: ${q.id},`);
	lines.push(`\t\ttype: ${JSON.stringify(q.type)},`);
	lines.push(`\t\ttitle: ${JSON.stringify(q.title)},`);
	lines.push(`\t\tbody: ${JSON.stringify(q.body)},`);
	if (q.options) lines.push(`\t\toptions: [${q.options.map((o) => JSON.stringify(o)).join(', ')}],`);
	if (q.correct != null) lines.push(`\t\tcorrect: ${JSON.stringify(q.correct)},`);
	if (q.maxPoints) lines.push(`\t\tmaxPoints: ${q.maxPoints},`);
	lines.push(`\t\thint: ${JSON.stringify(q.hint)},`);
	lines.push('\t}');
	return lines.join('\n');
}

const bankFile = `// mathematics-bank.js — банк вопросов ОГЭ по математике.
// Сгенерировано scripts/convert-math-bank.mjs из нескольких batch-источников.
//   • qid = (id - 1)*25 + type — стабилен между запусками (см. BATCHES.remap в скрипте).
//   • Задания 20–25 (часть 2) → type:'written', maxPoints:2 (self-check на экране результатов).
//   • Картинки лежат в /img/mathematics/ (имена с префиксом batch'а, если указан).
window.MATHEMATICS_QUESTIONS = [
${bank.map(serializeQuestion).join(',\n')},
];
`;

const COMING_UP_TO = 29;
const lastReadyId = variants.length ? variants[variants.length - 1].id : 0;
const comingTail = [];
for (let i = lastReadyId + 1; i <= COMING_UP_TO; i++) {
	comingTail.push(`\t{ id: ${i}, title: "Вариант ${i}", qids: [], status: "coming" }`);
}

const variantsFile = `// mathematics-variants.js — варианты ОГЭ по математике (см. mathematics-bank.js).
// Сгенерировано scripts/convert-math-bank.mjs. Карта уровней full-test-mathematics
// ожидает >= 7 вариантов в массиве (6 узлов + 1 финальный босс), поэтому к ready
// дописываются заглушки coming до id ${COMING_UP_TO}.
window.MATHEMATICS_VARIANTS = [
${variants
	.map(
		(v) =>
			`\t{ id: ${v.id}, title: ${JSON.stringify(v.title)}, qids: [${v.qids.join(', ')}], status: ${JSON.stringify(v.status)} }`,
	)
	.concat(comingTail)
	.join(',\n')},
];
`;

writeFileSync(OUT_BANK, bankFile, 'utf8');
writeFileSync(OUT_VARIANTS, variantsFile, 'utf8');
console.log(`[convert] записано: ${OUT_BANK}`);
console.log(`[convert] записано: ${OUT_VARIANTS}`);

// ============================================================================
// Выводим список переименований картинок (копированием займётся отдельный
// шаг — см. README в комментарии). Так конвертер остаётся идемпотентным
// и не трогает файловую систему вне `extracted/`.
// ============================================================================
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

mkdirSync(OUT_IMG_DIR, { recursive: true });
const seen = new Set();
let copied = 0;
let skipped = 0;
for (const r of imageRenames) {
	const key = r.dstName;
	if (seen.has(key)) { skipped++; continue; }
	seen.add(key);
	const src = join(r.srcDir, r.srcName);
	const dst = join(OUT_IMG_DIR, r.dstName);
	if (!existsSync(src)) {
		console.warn(`[convert] нет исходника картинки: ${src}`);
		continue;
	}
	copyFileSync(src, dst);
	copied++;
}
console.log(`[convert] картинок скопировано: ${copied}, пропущено (дубли): ${skipped}`);
