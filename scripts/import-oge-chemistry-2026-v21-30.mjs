#!/usr/bin/env node
/**
 * Импорт вариантов 21–30 из PDF «ОГЭ химия 2026» → site variants 50–59.
 * Источник: oge_chemistry_21-30_fixed.js
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SOURCE = process.argv[2] || 'C:/Users/user/Downloads/oge_chemistry_21-30_fixed.js';
const SITE_VARIANT_OFFSET = 29; // PDF variant N → site variant N + 29
const PDF_FIRST = 21;
const PDF_LAST = 30;
const SITE_FIRST = PDF_FIRST + SITE_VARIANT_OFFSET; // 50
const SITE_LAST = PDF_LAST + SITE_VARIANT_OFFSET; // 59
const SOURCE_LABEL = 'oge_chemistry_21-30_fixed.js';

const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-' };
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };

function chemHtml(text) {
	if (!text) return '';
	let s = String(text);
	s = s.replace(/([A-Za-zА-Яа-я])([₀-₉₊₋]+)/g, (_, el, sub) => {
		const digits = [...sub].map((c) => SUB[c] ?? c).join('');
		return `${el}<sub>${digits}</sub>`;
	});
	s = s.replace(/([₀-₉₊₋]+)/g, (sub) => {
		const digits = [...sub].map((c) => SUB[c] ?? c).join('');
		return `<sub>${digits}</sub>`;
	});
	s = s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+)/g, (sup) => {
		const digits = [...sup].map((c) => SUP[c] ?? c).join('');
		return `<sup>${digits}</sup>`;
	});
	s = s.replace(/→/g, '→');
	return s;
}

function tpl(s) {
	return '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
}

function extractIntro(question, hasOptions) {
	if (!hasOptions) return question.trim();
	const m = question.match(/\s1\)\s/);
	if (m && m.index > 20) return question.slice(0, m.index).trim();
	return question.trim();
}

function parseNumberedTail(text) {
	const items = [];
	const re = /(\d+)\)\s*([^]*?)(?=\s\d+\)\s|$)/g;
	let m;
	while ((m = re.exec(text)) !== null) {
		const label = m[2].trim().replace(/[.,;]+$/, '');
		items.push({ id: m[1], label: chemHtml(label) });
	}
	return items;
}

function parseMatchRight(question) {
	const colonIdx = question.lastIndexOf(':');
	const tail = colonIdx >= 0 ? question.slice(colonIdx + 1) : question;
	return parseNumberedTail(tail);
}

function answerDigits(answer) {
	return [...String(answer)].map((d) => d);
}

function shortTitle(question, maxLen = 48) {
	const clean = question.replace(/\s1\)\s.*$/, '').replace(/\sА\)\s.*$/, '');
	const t = clean.slice(0, maxLen).trim();
	return t.length < clean.length ? t + '…' : t;
}

function solutionFromExplanation(explanation) {
	const lines = explanation.split(/(?<=[.!])\s+/).filter(Boolean);
	const html = lines.map((l) => `<p>${chemHtml(l)}</p>`).join('\n\t\t\t\t\t\t');
	return html || `<p>${chemHtml(explanation)}</p>`;
}

function writtenCriteria(ogeType) {
	if (ogeType === 20) {
		return [
			{ id: 'c1', points: 1, label: 'Составлен электронный баланс с верными множителями.' },
			{ id: 'c2', points: 1, label: 'Коэффициенты в уравнении расставлены верно.' },
			{ id: 'c3', points: 1, label: 'Указаны окислитель и восстановитель.' },
		];
	}
	if (ogeType === 21) {
		return [
			{ id: 'c1', points: 1, label: 'Первое превращение записано верным молекулярным уравнением.' },
			{ id: 'c2', points: 1, label: 'Второе превращение записано верно.' },
			{ id: 'c3', points: 1, label: 'Третье превращение (и промежуточное вещество X, если нужно) указаны верно.' },
		];
	}
	if (ogeType === 22) {
		return [
			{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества по условию.' },
			{ id: 'c2', points: 1, label: 'Промежуточные расчёты выполнены верно.' },
			{ id: 'c3', points: 1, label: 'Получен окончательный ответ с нужной точностью и единицами.' },
		];
	}
	return [
		{ id: 'c1', points: 1, label: 'Выбраны подходящие реактивы для различения веществ.' },
		{ id: 'c2', points: 1, label: 'Записаны молекулярное, полное и сокращённое ионные уравнения.' },
		{ id: 'c3', points: 1, label: 'Описаны наблюдаемые признаки реакций.' },
	];
}

function writtenTaskKind(ogeType) {
	if (ogeType === 20) return 'Задача на ОВР';
	if (ogeType === 21) return 'Уравнения по схеме';
	if (ogeType === 22) return 'Расчётная задача';
	return 'Практическое задание';
}

function convertQuestion(q, siteVariant) {
	const id = siteVariant * 100 + q.type;
	const title = shortTitle(q.question);
	const hint = q.explanation.replace(/\n/g, ' ').slice(0, 500);
	const lines = [];

	if ([1, 5, 6, 8, 11, 13].includes(q.type)) {
		const pickCount = 2;
		const intro = extractIntro(q.question, true);
		const body = `<p>${chemHtml(intro)}</p>`;
		const opts = (q.options || []).map((label, i) => ({
			id: String(i + 1),
			label: chemHtml(label),
		}));
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'multi',\n\t\t\t\t\tpickCount: ${pickCount === null ? 'null' : pickCount},\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push('\t\t\t\t\toptions: [');
		for (const o of opts) {
			lines.push(`\t\t\t\t\t\t{ id: '${o.id}', label: ${tpl(o.label)} },`);
		}
		lines.push('\t\t\t\t\t],');
		lines.push(`\t\t\t\t\tcorrect: [${answerDigits(q.answer).map((d) => `'${d}'`).join(', ')}],`);
		lines.push(`\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type === 7) {
		const bodyParts = [`<p>${chemHtml(q.question)}</p>`];
		if (q.options?.length) {
			const list = q.options.map((o, i) => `${i + 1}) ${chemHtml(o)}`).join('  ');
			bodyParts.push(`<p style="color:var(--muted);font-size:14px;">${list}</p>`);
		}
		bodyParts.push('<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>');
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'input',\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(bodyParts.join('\n\t\t\t\t\t\t'))},`);
		lines.push(`\t\t\t\t\tplaceholder: 'введите ответ цифрами',\n\t\t\t\t\tcorrect: '${q.answer.replace(/%/g, '')}',\n\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type === 2 || q.type === 3) {
		const extra =
			q.type === 3
				? '<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>'
				: '<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>';
		const body = `<p>${chemHtml(q.question)}</p>\n\t\t\t\t\t\t${extra}`;
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'input',\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push(`\t\t\t\t\tplaceholder: 'введите ответ цифрами',\n\t\t\t\t\tcorrect: '${q.answer}',\n\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type === 14) {
		const ionMatch = q.question.match(/уравнение[^]*?([A-Za-z0-9²⁺⁻₀-₉₊₋]+[^.]*= [^.]+\.?)/i);
		let body;
		if (ionMatch) {
			body = `<p>${chemHtml(extractIntro(q.question, false).replace(ionMatch[1], '').trim())}</p>\n\t\t\t\t\t\t<p style="text-align:center; font-size: 18px; margin: 10px 0;">${chemHtml(ionMatch[1])}</p>`;
		} else {
			body = `<p>${chemHtml(q.question)}</p>`;
		}
		const opts = (q.options || []).map((label, i) => ({ id: String(i + 1), label: chemHtml(label) }));
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'multi',\n\t\t\t\t\tpickCount: 2,\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push('\t\t\t\t\toptions: [');
		for (const o of opts) {
			lines.push(`\t\t\t\t\t\t{ id: '${o.id}', label: ${tpl(o.label)} },`);
		}
		lines.push('\t\t\t\t\t],');
		lines.push(`\t\t\t\t\tcorrect: [${answerDigits(q.answer).map((d) => `'${d}'`).join(', ')}],`);
		lines.push(`\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if ([4, 9, 10, 12, 15, 17].includes(q.type)) {
		const introEnd = q.question.search(/\sА\)\s/);
		let intro =
			introEnd > 0 ? q.question.slice(0, introEnd).trim() : extractIntro(q.question, false);
		if (!intro.endsWith(':') && !intro.endsWith('.')) intro += '.';
		const letters = ['А', 'Б', 'В', 'Г'];
		const left = (q.options || []).map((label, i) => ({
			letter: letters[i],
			label: chemHtml(label),
		}));
		const right = parseMatchRight(q.question);
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'match',\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(`<p>${chemHtml(intro)}</p>`)},`);
		lines.push('\t\t\t\t\tmatchLeft: [');
		for (const l of left) {
			lines.push(`\t\t\t\t\t\t{ letter: '${l.letter}', label: ${tpl(l.label)} },`);
		}
		lines.push('\t\t\t\t\t],');
		lines.push('\t\t\t\t\tmatchRight: [');
		for (const r of right) {
			lines.push(`\t\t\t\t\t\t{ id: '${r.id}', label: ${tpl(r.label)} },`);
		}
		lines.push('\t\t\t\t\t],');
		lines.push(`\t\t\t\t\tcorrect: [${answerDigits(q.answer).map((d) => `'${d}'`).join(', ')}],`);
		lines.push(`\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type === 16) {
		const intro = extractIntro(q.question, true);
		const body = `<p>${chemHtml(intro)}</p>`;
		const opts = (q.options || []).map((label, i) => ({ id: String(i + 1), label: chemHtml(label) }));
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'multi',\n\t\t\t\t\tpickCount: null,\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push('\t\t\t\t\toptions: [');
		for (const o of opts) {
			lines.push(`\t\t\t\t\t\t{ id: '${o.id}', label: ${tpl(o.label)} },`);
		}
		lines.push('\t\t\t\t\t],');
		lines.push(`\t\t\t\t\tcorrect: [${answerDigits(q.answer).map((d) => `'${d}'`).join(', ')}],`);
		lines.push(`\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type === 18 || q.type === 19) {
		const body = `<p>${chemHtml(q.question)}</p>`;
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'input',\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push(`\t\t\t\t\tplaceholder: 'введите ответ цифрами',\n\t\t\t\t\tcorrect: '${q.answer.replace(/%/g, '')}',\n\t\t\t\t\thint: ${tpl(hint)}\n\t\t\t\t},`);
	} else if (q.type >= 20 && q.type <= 23) {
		let body = `<p>${chemHtml(q.question)}</p>`;
		if (q.type === 20) {
			const eq = q.question.match(/схема которой[:\s]+(.+?)\.\s*Запишите/is);
			if (eq) {
				body = `<p>${chemHtml(q.question.slice(0, eq.index).trim())}</p>\n\t\t\t\t\t\t<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">${chemHtml(eq[1].trim())}</p>\n\t\t\t\t\t\t<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`;
			}
		}
		if (q.type === 21) {
			const chain = q.question.match(/превращений[:\s]+(.+?)\.\s*Напишите/is);
			if (chain) {
				body = `<p>Дана схема превращений:</p>\n\t\t\t\t\t\t<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">${chemHtml(chain[1].trim())}</p>\n\t\t\t\t\t\t<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`;
			}
		}
		const criteria = writtenCriteria(q.type);
		lines.push(`\t\t\t\t{\n\t\t\t\t\tid: ${id},\n\t\t\t\t\ttype: 'written',\n\t\t\t\t\tmaxPoints: 3,\n\t\t\t\t\ttitle: ${tpl(title)},\n\t\t\t\t\ttaskKind: ${tpl(writtenTaskKind(q.type))},\n\t\t\t\t\tbody: ${tpl(body)},`);
		lines.push(`\t\t\t\t\tsolution: ${tpl(solutionFromExplanation(q.explanation))},`);
		lines.push('\t\t\t\t\tcriteria: [');
		for (const c of criteria) {
			lines.push(`\t\t\t\t\t\t{ id: '${c.id}', points: ${c.points}, label: ${tpl(c.label)} },`);
		}
		lines.push(`\t\t\t\t\t]\n\t\t\t\t},`);
	} else {
		throw new Error(`Unknown OGE type ${q.type} for id ${q.id}`);
	}

	return lines.join('\n');
}

// ── Load source ───────────────────────────────────────────────────────────
const srcText = readFileSync(SOURCE, 'utf8');
const arrMatch = srcText.match(/const questions = (\[[\s\S]*?\n\]);/);
if (!arrMatch) throw new Error('Cannot parse questions array from source file');
const questions = eval(arrMatch[1]);

const byPdfVariant = new Map();
for (const q of questions) {
	if (!byPdfVariant.has(q.variant)) byPdfVariant.set(q.variant, []);
	byPdfVariant.get(q.variant).push(q);
}

const blocks = [];
for (let pdfV = PDF_FIRST; pdfV <= PDF_LAST; pdfV++) {
	const siteV = pdfV + SITE_VARIANT_OFFSET;
	const qs = (byPdfVariant.get(pdfV) || []).sort((a, b) => a.type - b.type);
	if (!qs.length) {
		console.warn(`PDF variant ${pdfV}: no questions — skipped`);
		continue;
	}
	blocks.push(`\t\t\t\t// ============================================================`);
	blocks.push(`\t\t\t\t// ВАРИАНТ ${siteV} · ОГЭ химия 2026, PDF вариант ${pdfV} (${siteV * 100 + 1}–${siteV * 100 + qs[qs.length - 1].type})`);
	blocks.push(`\t\t\t\t// Источник: ${SOURCE_LABEL}`);
	blocks.push(`\t\t\t\t// ============================================================`);
	for (const q of qs) {
		blocks.push(convertQuestion(q, siteV));
	}
}

const bankPath = resolve(ROOT, 'extracted', 'chemistry-bank.js');
let bank = readFileSync(bankPath, 'utf8');
const marker = `// ВАРИАНТ ${SITE_FIRST} · ОГЭ химия 2026`;
if (bank.includes(marker)) {
	bank = bank.replace(
		new RegExp(`,\\n\\t\\t\\t\\t\\/\\/ =+\\n\\t\\t\\t\\t\\/\\/ ВАРИАНТ ${SITE_FIRST} · ОГЭ химия 2026[\\s\\S]*$`),
		'\n];\n'
	);
	writeFileSync(bankPath, bank);
	console.log(`Removed previous import block (variants ${SITE_FIRST}–${SITE_LAST}) for re-import.`);
}
bank = readFileSync(bankPath, 'utf8');
if (bank.includes(marker)) {
	console.log('Already imported — skipping bank patch.');
} else {
	bank = bank.replace(/\n];\s*$/, ',\n' + blocks.join('\n') + '\n];\n');
	writeFileSync(bankPath, bank);
	console.log(`Appended ${questions.length} questions to chemistry-bank.js`);
}

// ── Update variants list ──────────────────────────────────────────────────
const varPath = resolve(ROOT, 'extracted', 'chemistry-variants.js');
let varSrc = readFileSync(varPath, 'utf8');
const varMarker = `// Вариант ${SITE_FIRST} — ОГЭ химия 2026`;

const newVariants = [];
for (let pdfV = PDF_FIRST; pdfV <= PDF_LAST; pdfV++) {
	const siteV = pdfV + SITE_VARIANT_OFFSET;
	const qs = byPdfVariant.get(pdfV) || [];
	const types = qs.map((q) => q.type).sort((a, b) => a - b);
	const fullVariant = types.length === 23 && types[0] === 1 && types[22] === 23;
	if (fullVariant) {
		const qids = types.map((t) => siteV * 100 + t);
		newVariants.push(
			`\t// Вариант ${siteV} — ОГЭ химия 2026, PDF вариант ${pdfV}\n\tvariants.push({\n\t\tid: ${siteV},\n\t\ttitle: 'Вариант ${siteV}',\n\t\tqids: [${qids.join(',')}],\n\t\tstatus: 'ready'\n\t});`
		);
	} else if (qs.length) {
		console.warn(`Site variant ${siteV} (PDF ${pdfV}): only ${qs.length} tasks — left as coming`);
	}
}

if (varSrc.includes(varMarker)) {
	varSrc = varSrc.replace(
		new RegExp(`\\t\\/\\/ Вариант ${SITE_FIRST} — ОГЭ химия 2026[\\s\\S]*?\\tfor \\(let i = ${SITE_LAST + 1}`),
		`\tfor (let i = ${SITE_LAST + 1}`
	);
	writeFileSync(varPath, varSrc);
	console.log(`Reset variants ${SITE_FIRST}–${SITE_LAST} stubs for re-import.`);
}
varSrc = readFileSync(varPath, 'utf8');
if (varSrc.includes(varMarker)) {
	console.log('Variants already updated — skipping.');
} else {
	const readyBlock = newVariants.join('\n');
	varSrc = varSrc.replace(
		/\tfor \(let i = 40; i <= 60; i\+\+\) \{\n\t\tvariants\.push\(\{ id: i, title: 'Вариант ' \+ i, qids: \[\], status: 'coming' \}\);\n\t\}/,
		`\tfor (let i = 40; i <= 49; i++) {\n\t\tvariants.push({ id: i, title: 'Вариант ' + i, qids: [], status: 'coming' });\n\t}` +
			'\n' +
			readyBlock +
			`\n\tfor (let i = ${SITE_LAST}; i <= 60; i++) {\n\t\tvariants.push({ id: i, title: 'Вариант ' + i, qids: [], status: 'coming' });\n\t}`
	);
	writeFileSync(varPath, varSrc);
	console.log(`Updated chemistry-variants.js (variants ${SITE_FIRST}–${SITE_LAST - 1} ready)`);
}

console.log('Done. Run: node scripts/validate-chemistry-bank.mjs');
