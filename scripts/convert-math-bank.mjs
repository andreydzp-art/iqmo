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

const SRC = process.argv[2] || 'E:\\1\\_math-archive-3\\oge_math.js';
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
// VARIANT_REMAP — карта «исходный variant в oge_math.js» → «итоговый id в банке».
//
// История:
//   • Первый архив (10.06.2026) содержал варианты 6–10 → выложили под id 1–5.
//   • Второй архив добавил варианты 1–5 и 11–20 (вариант 17 неполный, пропущен).
//
// Стабильность qid: задание qid = (id - 1) * 25 + orig.type. Пользовательские
// прогрессы привязаны к qid, поэтому id 1–5 (бывшие orig 6–10) НЕ ТРОГАЕМ —
// новые варианты добавляем под id 6 и далее. Когда автор пришлёт ещё —
// расширь карту, не меняя уже опубликованных пар.
const VARIANT_REMAP = {
	// Уже опубликованные (id 1–5):
	6: 1,
	7: 2,
	8: 3,
	9: 4,
	10: 5,
	// Добавлены 10.06.2026 из архива files (3).zip (id 6–10):
	1: 6,
	2: 7,
	3: 8,
	4: 9,
	5: 10,
	// Добавлены 10.06.2026 (id 11–16):
	11: 11,
	12: 12,
	13: 13,
	14: 14,
	15: 15,
	16: 16,
	// orig 17 неполный (только задания 11–25), пропускаем — оставляем coming.
	// orig 18–20 → id 17–19:
	18: 17,
	19: 18,
	20: 19,
};

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

// --- 5b. Точечные исправления авторских данных (overrides). ----------------
// Если в исходном oge_math.js обнаружена ошибка (например, расходящиеся
// answer и explanation — см. задачу 3 варианта 1, где answer="112500" при
// разборе "5·4,5 м² = 225000 см²"), фиксируем её здесь, чтобы она пережила
// повторные конвертации. Ключ — qid в выходном банке.
const OVERRIDES = {
	// Задача 3, вариант 1 (orig variant 6): площадь основания теплицы.
	// 5 м × 4,5 м = 22,5 м² = 225000 см²; авторские 112500 — опечатка.
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
// Сгенерировано scripts/convert-math-bank.mjs из oge_math.js.
//   • VARIANT_REMAP в скрипте задаёт пары «orig variant → итоговый id».
//   • qid = (id - 1)*25 + type, уникален и стабилен (см. историю VARIANT_REMAP).
//   • Задания 20–25 (часть 2) → type:'written', maxPoints:2 (self-check на экране результатов).
//   • Картинки лежат в /img/mathematics/ (имена с префиксом v\${origVariant}_).
window.MATHEMATICS_QUESTIONS = [
${bank.map(serializeQuestion).join(',\n')},
];
`;

// Дописываем заглушки до round-числа (как у biology — до id 29), чтобы карта
// уровней не «прыгала» при добавлении новых ready-вариантов.
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
