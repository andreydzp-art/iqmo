#!/usr/bin/env node
// Одноразовый скрипт: после копии biology-страниц в mathematics-папки —
// прогнать массовые лексические замены (BIOLOGY→MATHEMATICS, --bio-→--math- и т.п.).
// SEO-теги, специфичные для биологии комментарии и текст «В реальном ОГЭ по биологии…»
// поправим точечно через StrReplace, после этого скрипта.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const FILES = [
	'extracted/subject-mathematics/index.html',
	'extracted/full-test-mathematics/index.html',
	'extracted/full-test-mathematics/chapter-2/index.html',
	'extracted/full-test-mathematics/chapter-2/variant/1/index.html',
];

// Порядок важен: длинные/составные паттерны идут раньше своих частей.
const REPLACEMENTS = [
	// JS-идентификаторы (только глобальные, остальные не используются).
	[/window\.BIOLOGY_QUESTIONS/g, 'window.MATHEMATICS_QUESTIONS'],
	[/window\.BIOLOGY_VARIANTS/g, 'window.MATHEMATICS_VARIANTS'],
	[/BIOLOGY_QUESTIONS/g, 'MATHEMATICS_QUESTIONS'],
	[/BIOLOGY_VARIANTS/g, 'MATHEMATICS_VARIANTS'],
	// Файлы скриптов.
	[/\/biology-bank\.js/g, '/mathematics-bank.js'],
	[/\/biology-variants\.js/g, '/mathematics-variants.js'],
	// Пути URL и каталогов.
	[/\/full-test-biology\b/g, '/full-test-mathematics'],
	[/\/subject-biology\b/g, '/subject-mathematics'],
	[/full-test-biology/g, 'full-test-mathematics'],
	[/subject-biology/g, 'subject-mathematics'],
	// data-* и значения JS-литералов.
	[/data-exam-subject="biology"/g, 'data-exam-subject="mathematics"'],
	[/'biology'/g, "'mathematics'"],
	[/"biology"/g, '"mathematics"'],
	// localStorage и runtime keys.
	[/iqmo-bio-/g, 'iqmo-math-'],
	[/iqmo-bio\b/g, 'iqmo-math'],
	// CSS-токены и subj-mark классы.
	[/--bio-1\b/g, '--math-1'],
	[/--bio-2\b/g, '--math-2'],
	[/--bio-50\b/g, '--math-50'],
	[/--bio-100\b/g, '--math-100'],
	[/subj-ico--bio\b/g, 'subj-ico--math'],
	[/\.subj-ico--bio\b/g, '.subj-ico--math'],
	// Локализация — без \b, потому что в JS regex \b не работает для кириллицы.
	// Порядок: длинные/составные формы → короткие, чтобы избежать частичного совпадения.
	[/биологической/g, 'математической'],
	[/биологическим/g, 'математическим'],
	[/биологический/g, 'математический'],
	[/Биологии/g, 'Математики'],
	[/Биологию/g, 'Математику'],
	[/Биологией/g, 'Математикой'],
	[/Биология/g, 'Математика'],
	[/биологии/g, 'математики'],
	[/биологию/g, 'математику'],
	[/биологией/g, 'математикой'],
	[/биология/g, 'математика'],
	[/биологом/g, 'математиком'],
	[/Магистр биологии/g, 'Магистр математики'],
	// Префикс лога/коммента.
	[/full-test-biology'/g, "full-test-mathematics'"],
];

let changed = 0;
for (const rel of FILES) {
	const path = resolve(ROOT, rel);
	let text = readFileSync(path, 'utf8');
	const before = text;
	for (const [pattern, replacement] of REPLACEMENTS) {
		text = text.replace(pattern, replacement);
	}
	if (text !== before) {
		writeFileSync(path, text, 'utf8');
		console.log(`[rebrand] ${rel} — обновлён`);
		changed++;
	} else {
		console.log(`[rebrand] ${rel} — без изменений`);
	}
}
console.log(`[rebrand] всего изменено файлов: ${changed}`);
