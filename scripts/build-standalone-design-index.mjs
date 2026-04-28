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

html = html.replace(
	'<head>',
	'<head>\n\t<!-- Одна HTML-страница для переноса: iqmo-base.css встроен; Метрика и внешние скрипты как в index.html -->'
);

const out = join(extracted, 'index-standalone-design.html');
writeFileSync(out, html, 'utf8');
console.log('Wrote', out, '(' + Buffer.byteLength(html, 'utf8') + ' bytes)');
