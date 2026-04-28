import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const extracted = join(root, 'extracted');

const baseCss = readFileSync(join(extracted, 'iqmo-base.css'), 'utf8');
let html = readFileSync(join(extracted, 'index.html'), 'utf8');

html = html.replace(
	/<link rel="stylesheet" href="\.\/iqmo-base\.css\?v=1" \/>\s*/,
	`<style>\n/* === iqmo-base.css (встроено) === */\n${baseCss}\n</style>\n`
);

{
	const startMark = '<!-- Yandex.Metrika counter -->';
	const endMark = '<!-- /Yandex.Metrika counter -->';
	const s = html.indexOf(startMark);
	const e = html.indexOf(endMark);
	if (s !== -1 && e !== -1 && e > s) {
		html = html.slice(0, s) + html.slice(e + endMark.length);
	}
}

for (const tag of [
	'<script src="./iqmo-sync.js"></script>',
	'<script src="./chem-progress.js"></script>',
	'<script src="./iqmo-nav.js"></script>',
	'<script src="./iqmo-regnudge.js?v=3"></script>',
]) {
	html = html.split(tag).join('');
}

html = html.replace(
	'<head>',
	'<head>\n\t<!-- Standalone для предпросмотра: стили встроены, внешние скрипты IQMO убраны; шрифт Manrope по ссылке Google Fonts -->'
);

const out = join(extracted, 'index-standalone-design.html');
writeFileSync(out, html, 'utf8');
console.log('Wrote', out, '(' + Buffer.byteLength(html, 'utf8') + ' bytes)');
