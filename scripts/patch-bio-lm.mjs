import fs from 'fs';

const htmlPath = 'e:/1/extracted/full-test-biology/index.html';
const snippetPath = 'e:/1/extracted/_tmp-lm-bio-7/level-map-biology/render-snippet.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let snippet = fs.readFileSync(snippetPath, 'utf8');
snippet = snippet.replace(/^\/\/[^\n]*\n\n/, '');

const start = html.indexOf('\t\t\tfunction lmMapHtml({ variantInfos');
const end = html.indexOf('\t\t\tfunction lmGrid4Html', start);
if (start < 0 || end < 0) throw new Error('markers not found');
html = html.slice(0, start) + snippet + '\n' + html.slice(end);

html = html.replace(
	'${lmMapHtml({ variantInfos, bossInfo, currentIdx })}',
	'${lmMapHtml({ variantInfos, bossInfo, currentIdx, stats })}'
);

const oldWire = `\t\t\t\tpicker.querySelectorAll('.lm-node[data-v]').forEach(btn => {
\t\t\t\t\tbtn.addEventListener('click', () => {
\t\t\t\t\t\tconst st = btn.dataset.state;
\t\t\t\t\t\tconst v = btn.dataset.v;
\t\t\t\t\t\tif (st === 'locked') {
\t\t\t\t\t\t\talert('Чтобы открыть этот узел, пройдите предыдущие с результатом ≥ 50% в части 1.');
\t\t\t\t\t\t\treturn;
\t\t\t\t\t\t}
\t\t\t\t\t\twindow.location.search = '?v=' + v;
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\tpicker.querySelectorAll('.lm-start-btn[data-v]').forEach(btn => {
\t\t\t\t\tbtn.addEventListener('click', e => {
\t\t\t\t\t\te.stopPropagation();
\t\t\t\t\t\twindow.location.search = '?v=' + btn.dataset.v;
\t\t\t\t\t});
\t\t\t\t});`;

const newWire = `\t\t\t\tfunction pdGoVariant(v, st) {
\t\t\t\t\tif (st === 'locked') {
\t\t\t\t\t\talert('Чтобы открыть этот узел, пройдите предыдущие с результатом ≥ 50% в части 1.');
\t\t\t\t\t\treturn;
\t\t\t\t\t}
\t\t\t\t\twindow.location.search = '?v=' + v;
\t\t\t\t}
\t\t\t\tpicker.querySelectorAll('.pd-node[data-v]').forEach(el => {
\t\t\t\t\tif (el.dataset.state === 'locked') return;
\t\t\t\t\tel.addEventListener('click', e => {
\t\t\t\t\t\tif (e.target.closest('.pd-cta')) return;
\t\t\t\t\t\tpdGoVariant(el.dataset.v, el.dataset.state);
\t\t\t\t\t});
\t\t\t\t\tel.addEventListener('keydown', e => {
\t\t\t\t\t\tif (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pdGoVariant(el.dataset.v, el.dataset.state); }
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\tpicker.querySelectorAll('.pd-cta[data-v]').forEach(btn => {
\t\t\t\t\tbtn.addEventListener('click', e => {
\t\t\t\t\t\te.stopPropagation();
\t\t\t\t\t\tpdGoVariant(btn.dataset.v, 'current');
\t\t\t\t\t});
\t\t\t\t});`;

if (!html.includes(oldWire)) throw new Error('old wire block not found');
html = html.replace(oldWire, newWire);

fs.writeFileSync(htmlPath, html);
console.log('patched js ok');
