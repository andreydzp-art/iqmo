/**
 * One-off helper: insert iqmo-base.css link and strip duplicated :root/reset blocks
 * from static HTML. Safe to re-run on already-patched files (no-op).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const EX = path.join(ROOT, 'extracted');

const MANROPE_RE = /(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Manrope[^"]*" rel="stylesheet" \/>)/;

const LINK_TAG = '\n\t\t<link rel="stylesheet" href="./iqmo-base.css?v=1" />';

/** Standard block ending with .container 1220px (topic, full-test, trial, subject prefix) */
const BLOCK_1220 =
	/\n\t\t\t:root \{[\s\S]*?\n\t\t\t\.container \{ width: 100%; max-width: 1220px; margin: 0 auto; padding: 0 24px; \}/;

const HIDDEN_LINE = /\n\t\t\t\[hidden\] \{ display: none !important; \}/g;

function hasBase(s) {
	return s.includes('iqmo-base.css');
}

function insertLinkAfterManrope(s) {
	if (hasBase(s)) return s;
	return s.replace(MANROPE_RE, '$1' + LINK_TAG);
}

// --- 10 topic pages ---
const topics = [
	'topic-atom-structure.html',
	'topic-chemical-bond.html',
	'topic-chemical-reactions.html',
	'topic-inorganic-classes.html',
	'topic-life-ecology.html',
	'topic-metals-compounds.html',
	'topic-nonmetals-compounds.html',
	'topic-organic-substances.html',
	'topic-periodic-table.html',
	'topic-solutions-dissociation.html',
];
for (const f of topics) {
	const p = path.join(EX, f);
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	if (BLOCK_1220.test(s)) {
		s = s.replace(BLOCK_1220, '');
	}
	s = s.replace(HIDDEN_LINE, '');
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched', f);
}

// --- trial + full-test (1220, JetBrains in URL - still Manrope first link) ---
for (const f of ['trial-chemistry.html', 'full-test-chemistry.html']) {
	const p = path.join(EX, f);
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	if (BLOCK_1220.test(s)) {
		s = s.replace(BLOCK_1220, '');
	}
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched', f);
}

// --- subject-chemistry: :root..container, ul, and [hidden] before .cru ---
const subjectPath = path.join(EX, 'subject-chemistry.html');
{
	let s = fs.readFileSync(subjectPath, 'utf8');
	s = insertLinkAfterManrope(s);
	const subBlock =
		/\n\t\t\t:root \{[\s\S]*?\n\t\t\th1, h2, h3, h4, p \{ margin: 0; \}\n\n\t\t\t\.container \{ width: 100%; max-width: 1220px; margin: 0 auto; padding: 0 24px; \}/;
	if (subBlock.test(s)) s = s.replace(subBlock, '');
	s = s.replace(
		/\n\t\t\t\/\* `\.btn \{ display: inline-flex \}` перебивает нативный `\[hidden\]`[\s\S]*?\n\t\t\t\[hidden\] \{[\s\S]*?\n\t\t\t\}/,
		'\n',
	);
	fs.writeFileSync(subjectPath, s, 'utf8');
	console.log('patched subject-chemistry.html');
}

// --- index: multiline, h1-h3 p only, no h4 in old block ---
{
	const p = path.join(EX, 'index.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const idxBlock =
		/\n\t\t\t:root \{[\s\S]*?\n\t\t\th1,\n\t\t\th2,\n\t\t\th3,\n\t\t\tp \{[\s\S]*?\n\t\t\t\}\n\t\t\t\.container \{[\s\S]*?\n\t\t\t\}/;
	if (idxBlock.test(s)) s = s.replace(idxBlock, '');
	s = s.replace(
		/\n\t\t\t\/\* `\.btn \{ display: inline-flex \}` иначе перебивает нативный `\[hidden\]` \*\/\n\t\t\t\[hidden\] \{[\s\S]*?\n\t\t\t\}/,
		'',
	);
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched index.html');
}

// --- profile ---
{
	const p = path.join(EX, 'profile.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const profBlock =
		/\n\t\t\t:root \{[\s\S]*?\n\t\t\th1,\n\t\t\th2,\n\t\t\th3,\n\t\t\tp \{[\s\S]*?\n\t\t\t\}\n\n\t\t\t\.container \{[\s\S]*?\n\t\t\t\}/;
	if (profBlock.test(s)) s = s.replace(profBlock, '');
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched profile.html');
}

// --- legal (smaller :root) ---
{
	const p = path.join(EX, 'legal.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const legBlock =
		/\n\t\t\t:root \{[\s\S]*?\n\t\t\t\}\n\t\t\*\n\t\t\*\s*\{[\s\S]*?\n\t\t\}\n\t\t\thtml,[\s\S]*?\n\t\t\}\n\t\t\ta \{[\s\S]*?\n\t\t\}\n\t\t\tbutton[\s\S]*?\n\t\t\}\n\t\th1,[\s\S]*?\n\t\t\}\n\n\t\t\t\.container \{[\s\S]*?\n\t\t\}/;
	if (legBlock.test(s)) s = s.replace(legBlock, '');
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched legal.html');
}

// --- express: manrope, main.min, style ---
{
	const p = path.join(EX, 'express-chemistry.html');
	let s = fs.readFileSync(p, 'utf8');
	if (!hasBase(s)) {
		s = s.replace(
			/(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Manrope[^"]*" rel="stylesheet" \/>)/,
			'$1' + LINK_TAG,
		);
	}
	const exBlock =
		/\n\t\t\t:root \{[\s\S]*?\n\t\t\ta \{ color: inherit; text-decoration: none; \}\n\n\t\t\t\.container \{ width: 100%; max-width: 1220px; margin: 0 auto; padding: 0 24px; \}/;
	if (exBlock.test(s)) s = s.replace(exBlock, '\n');
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched express-chemistry.html');
}

// --- admin: ../iqmo-base.css ---
{
	const p = path.join(EX, 'admin', 'index.html');
	let s = fs.readFileSync(p, 'utf8');
	if (!s.includes('iqmo-base.css')) {
		s = s.replace(
			/(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Manrope[^"]*" rel="stylesheet" \/>)/,
			'$1\n\t\t<link rel="stylesheet" href="../iqmo-base.css?v=1" />',
		);
	}
	const adBlock =
		/\n\t\t\t:root \{[\s\S]*?--sidebar-w: 252px;\n\t\t\t\}\n\t\t\*\n\t\t\*\s*\{[\s\S]*?box-sizing: border-box;\n\t\t\}\n\t\thtml,[\s\S]*?button[\s\S]*?background: none;\n\t\t\}\n/;
	if (adBlock.test(s)) {
		s = s.replace(
			adBlock,
			'\n\t\t\t:root {\n\t\t\t\t--sidebar-w: 252px;\n\t\t\t}\n\t\t\t/* Админка: своё тело страницы (не колонка как на витрине) */\n\t\t\tbody {\n\t\t\t\tfont-size: 15px;\n\t\t\t\tline-height: 1.5;\n\t\t\t\tdisplay: block;\n\t\t\t}\n',
		);
	}
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched admin/index.html');
}

// --- category: compact :root, body one-liner, .container 980 ---
{
	const p = path.join(EX, 'category-chemistry.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const catBlock =
		/\n\t\t\t:root\{[\s\S]*?--shadow:[^;]+;\n\t\t\t\}\n\t\t\*\{box-sizing:border-box\}\n\t\thtml,body\{margin:0;padding:0\}\n\t\tbody\{font-family:'Manrope',system-ui,-apple-system,sans-serif;color:var\(--ink\);background:var\(--bg\);font-size:16px;line-height:1.5;min-height:100vh\}\n\t\ta\{color:inherit;text-decoration:none\}\n\t\t\t\.container\{width:100%;max-width:980px;margin:0 auto;padding:0 24px\}/;
	if (catBlock.test(s)) {
		s = s.replace(
			catBlock,
			'\n\t\t\t.container { max-width: 980px; }\n',
		);
	}
	s = s.replace(
		/\n\t\t\t\[hidden\]\{display:none!important\}/,
		'',
	);
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched category-chemistry.html');
}

// --- warmup: wide :root with extras (now in base) + .container 760 + p { margin } ---
{
	const p = path.join(EX, 'warmup-chemistry.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const wu = /\n\t\t\t:root \{[\s\S]*?--shadow:[^;]+;\n\t\t\t\}\n\t\t\*\n\t\t\*\n\t\t\*\s*\{[^}]+\}[\s\S]*?\n\t\t\thtml, body \{ margin: 0; padding: 0; \}\n\t\tbody \{[\s\S]*?flex-direction: column;\n\t\t\}\n\t\ta \{ color: inherit; text-decoration: none; \}\n\t\tbutton \{[\s\S]*?\n\t\t\}\n\t\tp \{ margin: 0; \}\n\n\t\t\t\.container \{ width: 100%; max-width: 760px; margin: 0 auto; padding: 0 24px; \}/;
	if (wu.test(s)) {
		s = s.replace(
			wu,
			'\n\t\t\t.container { max-width: 760px; }\n',
		);
	}
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched warmup-chemistry.html');
}

// --- mistakes: extra :root + .container 760 + h1-h3 p ---
{
	const p = path.join(EX, 'mistakes-chemistry.html');
	let s = fs.readFileSync(p, 'utf8');
	s = insertLinkAfterManrope(s);
	const m = /\n\t\t\t:root \{[\s\S]*?--shadow:[^;]+;\n\t\t\t\}\n\t\t\*\n\t\t\*\n\t\t\*\s*\{[^}]+\}[\s\S]*?\n\t\t\thtml, body \{ margin: 0; padding: 0; \}\n\t\tbody \{[\s\S]*?flex-direction: column;\n\t\t\}\n\t\ta \{ color: inherit; text-decoration: none; \}\n\t\tbutton \{[\s\S]*?\n\t\t\}\n\t\tp \{ margin: 0; \}\n\t\th1, h2, h3 \{ margin: 0; \}\n\n\t\t\t\.container \{ width: 100%; max-width: 760px; margin: 0 auto; padding: 0 24px; \}/;
	if (m.test(s)) s = s.replace(m, '\n\t\t\t.container { max-width: 760px; }\n');
	fs.writeFileSync(p, s, 'utf8');
	console.log('patched mistakes-chemistry.html');
}

console.log('done');
