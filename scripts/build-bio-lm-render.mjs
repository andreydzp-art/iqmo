import fs from 'fs';

const snippet = fs.readFileSync(
	'e:/1/extracted/_tmp-lm-bio-7/level-map-biology/render-snippet.js',
	'utf8'
);
let body = snippet.replace(/^\/\/[^\n]*\n\n/, '').replace(/\t\t\t/g, '\t');

body = body
	.replace(
		'function pdHeadHtml({ stats, chapterComplete, regularPassed, regularTotal, ringPct, ringOffset }) {',
		'function pdHeadHtml(cfg, stats, chapterComplete, regularPassed, regularTotal, ringPct, ringOffset) {'
	)
	.replace(
		'<span class="pd-eyebrow">Глава 1 · Биология</span>',
		'<span class="pd-eyebrow">' + '${cfg.chapterEyebrow}' + '</span>'
	)
	.replace(
		'const diff = pdDifficultyLabel(idx);',
		'const diff = vi.tier || pdDifficultyLabel(idx);'
	)
	.replace(
		"const bossName = 'Сложный вариант';",
		"const bossName = cfg.bossName || 'Сложный вариант';"
	)
	.replace(
		'function pdBossNodeHtml(bossInfo, chapterComplete) {',
		'function pdBossNodeHtml(cfg, bossInfo, chapterComplete) {'
	)
	.replace(
		'function pdFootHtml({ variantInfos, bossInfo, currentIdx, stats, chapterComplete, regularPassed, regularTotal, meterPct }) {',
		'function pdFootHtml(cfg, variantInfos, bossInfo, currentIdx, stats, chapterComplete, regularPassed, regularTotal, meterPct) {'
	)
	.replace(
		'Глава 1 завершена ·',
		'${cfg.completeRecapPrefix || "Глава завершена"} ·'
	)
	.replace(
		'<a class="pe-cta-replay" href="/full-test-biology/chapter-2/">',
		'<a class="pe-cta-replay" href="${cfg.completeCtaHref || "/subject-biology/"}">'
	)
	.replace(
		'К Главе 2 →',
		'${cfg.completeCtaLabel || "К предмету →"}'
	)
	.replace(
		'function lmMapHtml({ variantInfos, bossInfo, currentIdx, stats }) {',
		'function buildMapHtml(cfg) {\n\t\tconst { variantInfos, bossInfo, currentIdx, stats } = cfg;'
	)
	.replace(
		'${pdHeadHtml({ stats, chapterComplete, regularPassed, regularTotal, ringPct, ringOffset })}',
		'${pdHeadHtml(cfg, stats, chapterComplete, regularPassed, regularTotal, ringPct, ringOffset)}'
	)
	.replace(
		'${pdBossNodeHtml(bossInfo, chapterComplete)}',
		'${pdBossNodeHtml(cfg, bossInfo, chapterComplete)}'
	)
	.replace(
		'${pdFootHtml({ variantInfos, bossInfo, currentIdx, stats, chapterComplete, regularPassed, regularTotal, meterPct })}',
		'${pdFootHtml(cfg, variantInfos, bossInfo, currentIdx, stats, chapterComplete, regularPassed, regularTotal, meterPct)}'
	);

const pluralFn = `
\tfunction plural(n, forms) {
\t\tconst a = Math.abs(n) % 100;
\t\tconst b = a % 10;
\t\tif (a > 10 && a < 20) return forms[2];
\t\tif (b > 1 && b < 5) return forms[1];
\t\tif (b === 1) return forms[0];
\t\treturn forms[2];
\t}
`;

body = body.replace(
	/\t\t\tnextHtml = '<div class="pd-next">[^;]+;/,
	(match) => match.replace('_lmPlural', 'plural')
);

const out = `/**
 * Shared biology level-map renderer (pd/pe design).
 * Used by full-test-biology hub and chapter-2.
 */
(function (global) {
\t'use strict';

${body}

${pluralFn}

\tfunction wireMap(host, cfg) {
\t\tvar onGo = cfg.onGo || function (v, st) {
\t\t\tif (st === 'locked') {
\t\t\t\talert('Чтобы открыть этот узел, пройдите предыдущие с результатом ≥ 50% в части 1.');
\t\t\t\treturn;
\t\t\t}
\t\t\tif (cfg.baseUrl) global.location.href = cfg.baseUrl + v;
\t\t};
\t\thost.querySelectorAll('.pd-node[data-v]').forEach(function (el) {
\t\t\tif (el.dataset.state === 'locked') return;
\t\t\tel.addEventListener('click', function (e) {
\t\t\t\tif (e.target.closest('.pd-cta')) return;
\t\t\t\tonGo(el.dataset.v, el.dataset.state);
\t\t\t});
\t\t\tel.addEventListener('keydown', function (e) {
\t\t\t\tif (e.key === 'Enter' || e.key === ' ') {
\t\t\t\t\te.preventDefault();
\t\t\t\t\tonGo(el.dataset.v, el.dataset.state);
\t\t\t\t}
\t\t\t});
\t\t});
\t\thost.querySelectorAll('.pd-cta[data-v]').forEach(function (btn) {
\t\t\tbtn.addEventListener('click', function (e) {
\t\t\t\te.stopPropagation();
\t\t\t\tonGo(btn.dataset.v, 'current');
\t\t\t});
\t\t});
\t}

\tfunction render(host, cfg) {
\t\tif (!host || !cfg) return;
\t\tcfg.starsForPercent = cfg.starsForPercent || function (p) {
\t\t\tif (p >= 90) return 3;
\t\t\tif (p >= 70) return 2;
\t\t\tif (p >= 50) return 1;
\t\t\treturn 0;
\t\t};
\t\tcfg.xpForVariant = cfg.xpForVariant || function (p) {
\t\t\tif (p < 50) return 0;
\t\t\tvar xp = 100;
\t\t\tif (p >= 80) xp += 50;
\t\t\tif (p >= 90) xp += 50;
\t\t\treturn xp;
\t\t};
\t\t// alias for template helpers
\t\tvar gmStarsForPercent = cfg.starsForPercent;
\t\tvar gmXpForVariant = cfg.xpForVariant;
\t\thost.innerHTML = buildMapHtml(cfg);
\t\twireMap(host, cfg);
\t}

\tglobal.IqmoBioLevelMap = { render: render, buildMapHtml: buildMapHtml };
})(typeof window !== 'undefined' ? window : global);
`;

fs.writeFileSync('e:/1/extracted/biology-level-map-render.js', out);
console.log('written', out.length);
