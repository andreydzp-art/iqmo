#!/usr/bin/env node
// Одноразовый конвертер: oge_math.js (исходник пользователя) → mathematics-bank.js + mathematics-variants.js.
//
// Особенности:
//   • Перенумеровывает варианты 6→1, 7→2, 8→3, 9→4, 10→5 (просьба владельца).
//   • Внутри варианта qid идут 1..25, в общем банке qid = (variant-1)*25 + type, итого 1..125.
//   • Задания 20–25 (part:2) → type:'written', maxPoints:2, self-check на экране результатов.
//   • Задания 1–19 → type:'input' (число/строка цифр) или type:'single' (если есть options и answer — одна цифра).
//   • Все image: 'vN_*.png' рендерятся как <figure class="q-figure"><img src="/img/mathematics/...">.
//   • Текст question с \n → <p>...</p><p>...</p>; LaTeX-формул нет, только юникод (√, ², °, π).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SRC = process.argv[2] || 'C:\\Users\\user\\Downloads\\oge_math.js';
const OUT_BANK = resolve(ROOT, 'extracted/mathematics-bank.js');
const OUT_VARIANTS = resolve(ROOT, 'extracted/mathematics-variants.js');

// --- 1. Читаем исходник пользователя как обычный JS-модуль через eval. ----
// (Внутри SRC есть `const questions = [...]; module.exports = questions;`)
const srcRaw = readFileSync(SRC, 'utf8');
let questions;
{
	// Простейший способ: вырезать в исходнике финальный CJS-блок и подставить return.
	const stripped = srcRaw.replace(/if\s*\(typeof\s+module[\s\S]*?\}/m, '');
	const fn = new Function(stripped + '\n;return questions;');
	questions = fn();
}
if (!Array.isArray(questions)) {
	throw new Error('Исходный файл не вернул массив questions');
}
console.log(`[convert] прочитано задач: ${questions.length}`);

// --- 2. Заголовки заданий по номеру задания ОГЭ (тема). --------------------
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

// --- 3. Хелперы рендеринга. ------------------------------------------------
function escHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function renderBody(question, image) {
	// Разбиваем по \n\n на абзацы; одиночные \n → <br>.
	const paragraphs = String(question)
		.split(/\n{2,}/)
		.map((p) => '<p>' + escHtml(p.trim()).replace(/\n/g, '<br>') + '</p>')
		.join('');

	let figure = '';
	if (image) {
		figure =
			'<figure class="q-figure">' +
			`<img class="q-figure__img" src="/img/mathematics/${image}" alt="Иллюстрация к заданию ОГЭ по математике" loading="lazy" decoding="async" />` +
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

// --- 4. Определение типа задания. ------------------------------------------
function pickType(item) {
	if (item.part === 2) return 'written';
	if (Array.isArray(item.options) && item.options.length > 0) {
		const ans = String(item.answer).trim();
		if (/^[1-9]\d?$/.test(ans) && ans.length === 1) return 'single';
		// Многосимвольные ответы вида "213", "23", "13" — это либо соответствие, либо «несколько утверждений».
		// Тип 11 ОГЭ (соответствие графиков и функций) и тип 19 (несколько верных утверждений)
		// — в нашем UI остаются 'input' с проверкой строки цифр.
		return 'input';
	}
	return 'input';
}

function pickCorrect(item, type) {
	if (type === 'written') return null;
	const ans = String(item.answer).trim();
	if (type === 'single') {
		// answer вида "1", "2", "3", "4" — индекс выбранного варианта.
		return ans;
	}
	return ans;
}

// --- 5. Конвертация. -------------------------------------------------------
const VARIANT_REMAP = { 6: 1, 7: 2, 8: 3, 9: 4, 10: 5 };

const sortedQuestions = [...questions].sort((a, b) => {
	const va = VARIANT_REMAP[a.variant] ?? 99;
	const vb = VARIANT_REMAP[b.variant] ?? 99;
	if (va !== vb) return va - vb;
	return a.type - b.type;
});

const bank = [];
const variants = [];

for (const orig of sortedQuestions) {
	const newVariant = VARIANT_REMAP[orig.variant];
	if (newVariant == null) {
		console.warn(`[convert] пропущено задание variant=${orig.variant} (не в карте 6→1)`);
		continue;
	}
	const qid = (newVariant - 1) * 25 + orig.type;
	const type = pickType(orig);
	const item = {
		id: qid,
		type,
		title: TYPE_TITLES[orig.type] || `Задание №${orig.type}`,
		body: renderBody(orig.question, orig.image),
		hint: renderHint(orig.explanation),
	};
	if (type === 'written') {
		item.maxPoints = 2;
	} else {
		item.correct = pickCorrect(orig, type);
		if (Array.isArray(orig.options)) {
			// Сохраняем варианты так, как ожидает рендер biology (single → массив строк, перед которым ставится номер).
			// Опции уже идут с префиксом "1) ...", "2) ..." — у нас рендер biology генерирует свой номер,
			// поэтому вырезаем префикс "1) " чтобы избежать дублирования.
			item.options = orig.options.map((opt) => String(opt).replace(/^\s*(?:[АA-Я])\)\s*/i, '').replace(/^\s*\d+\)\s*/, ''));
		}
	}
	bank.push(item);
}

// Группируем по variant.
const byVariant = new Map();
for (const orig of sortedQuestions) {
	const newVariant = VARIANT_REMAP[orig.variant];
	if (newVariant == null) continue;
	if (!byVariant.has(newVariant)) byVariant.set(newVariant, []);
	byVariant.get(newVariant).push((newVariant - 1) * 25 + orig.type);
}
for (const [vid, qids] of [...byVariant.entries()].sort((a, b) => a[0] - b[0])) {
	variants.push({
		id: vid,
		title: `Вариант ${vid}`,
		qids: qids.sort((a, b) => a - b),
		status: 'ready',
	});
}

console.log(`[convert] выходной банк: ${bank.length} вопросов; вариантов: ${variants.length}`);

// --- 6. Сериализация в JS. -------------------------------------------------
function serializeQuestion(q) {
	const lines = ['\t{'];
	lines.push(`\t\tid: ${q.id},`);
	lines.push(`\t\ttype: ${JSON.stringify(q.type)},`);
	lines.push(`\t\ttitle: ${JSON.stringify(q.title)},`);
	lines.push(`\t\tbody: ${JSON.stringify(q.body)},`);
	if (q.options) {
		lines.push(`\t\toptions: [${q.options.map((o) => JSON.stringify(o)).join(', ')}],`);
	}
	if (q.correct != null) {
		lines.push(`\t\tcorrect: ${JSON.stringify(q.correct)},`);
	}
	if (q.maxPoints) {
		lines.push(`\t\tmaxPoints: ${q.maxPoints},`);
	}
	lines.push(`\t\thint: ${JSON.stringify(q.hint)},`);
	lines.push('\t}');
	return lines.join('\n');
}

const bankFile = `// mathematics-bank.js — банк вопросов ОГЭ по математике.
// Сгенерировано из oge_math.js (варианты 6–10) скриптом scripts/convert-math-bank.mjs.
//   • Варианты перенумерованы 6→1, 7→2, 8→3, 9→4, 10→5 (внутри текста заданий старая нумерация не упоминается).
//   • qid = (variant-1)*25 + type, итого 125 заданий.
//   • Задания 20–25 (часть 2) → type:'written', maxPoints:2 (self-check на экране результатов).
//   • Картинки лежат в /img/mathematics/.
window.MATHEMATICS_QUESTIONS = [
${bank.map(serializeQuestion).join(',\n')},
];
`;

const variantsFile = `// mathematics-variants.js — варианты ОГЭ по математике (см. mathematics-bank.js).
// Сгенерировано scripts/convert-math-bank.mjs из 5 готовых вариантов сборника (бывшие 6–10).
window.MATHEMATICS_VARIANTS = [
${variants
	.map(
		(v) =>
			`\t{ id: ${v.id}, title: ${JSON.stringify(v.title)}, qids: [${v.qids.join(', ')}], status: ${JSON.stringify(v.status)} }`,
	)
	.join(',\n')},
];
`;

writeFileSync(OUT_BANK, bankFile, 'utf8');
writeFileSync(OUT_VARIANTS, variantsFile, 'utf8');
console.log(`[convert] записано: ${OUT_BANK}`);
console.log(`[convert] записано: ${OUT_VARIANTS}`);
