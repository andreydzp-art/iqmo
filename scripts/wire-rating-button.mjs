// One-shot patch: добавляет рабочую кнопку «Рейтинг» (rating-button)
// на все страницы с верхним меню. До правки на /subject-biology/,
// /subject-chemistry/, /full-test-{bio,chem}/ и /full-test-{bio,chem}/chapter-2/
// в шапке висел неактивный <span class="is--disabled">Рейтинг</span>.
// Теперь:
//  • span подменяется на работающий <a class="rb-rating" data-rating-open ...>
//    с тем же оформлением, как на /profile/;
//  • в <head> подключается /rating-button.css;
//  • перед </body> вставляется один экземпляр модалки #ratingModal
//    + /rating-button.js + локальный sync со снапшотом ChemProgress
//    (тизер «Рейтинг откроется с 10 уровня» с прогрессом).
//
// Скрипт идемпотентный: если кнопка уже стоит, файл не трогаем.
//
// Запуск: `node scripts/wire-rating-button.mjs`

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PAGES = [
	'extracted/subject-biology/index.html',
	'extracted/subject-chemistry/index.html',
	'extracted/full-test-biology/index.html',
	'extracted/full-test-chemistry/index.html',
	'extracted/full-test-biology/chapter-2/index.html',
	'extracted/full-test-chemistry/chapter-2/index.html',
];

const DISABLED_SPAN =
	'<span class="is--disabled" title="Раздел «Рейтинг» появится позже" aria-disabled="true">Рейтинг</span>';

const ACTIVE_BUTTON =
	'<a href="#" class="rb-rating" data-rating-open aria-haspopup="dialog" aria-controls="ratingModal">' +
	'<span class="rb-rating__ico" aria-hidden="true">' +
	'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
	'<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/>' +
	'<path d="M17 5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4M7 5H5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/>' +
	'</svg>' +
	'</span>' +
	'<span class="rb-rating__text">Рейтинг</span>' +
	'<span class="rb-rating__badge">NEW</span>' +
	'</a>';

const CSS_LINK = '<link rel="stylesheet" href="/rating-button.css?v=1" />';

// Модалка-тизер «Рейтинг откроется с 10 уровня» (1:1 как в /profile/),
// плюс модальный sync со снапшотом ChemProgress, который пересчитывает
// прогресс до 10 уровня и текущий ранг ученика.
const MODAL_AND_SCRIPTS = `<!-- Модалка-тизер «Рейтинг откроется с 10 уровня». Лежит один раз на странице,
     открывается по любому [data-rating-open] / .rb-rating (см. rating-button.js). -->
<div class="rb-scrim" id="ratingModal"
     role="dialog" aria-modal="true" aria-hidden="true"
     aria-labelledby="rbTitle" aria-describedby="rbDesc"
     data-progress="0">
	<div class="rb-modal">
		<button class="rb-close" type="button" data-rating-close aria-label="Закрыть">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
		</button>
		<div class="rb-modal__hero">
			<div class="rb-trophy" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z"/>
					<path d="M17 5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4M7 5H5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/>
				</svg>
			</div>
			<h2 class="rb-modal__title" id="rbTitle">Рейтинг откроется с 10 уровня</h2>
			<p class="rb-modal__sub" id="rbDesc">
				Прокачивай XP, проходи варианты и сохраняй серию дней подряд. На 10 уровне ты сможешь попасть в рейтинг, сравнить себя с другими учениками и бороться за место в топе.
			</p>
		</div>
		<div class="rb-modal__body">
			<div class="rb-lvl-row">
				<div class="rb-lvl-chip" title="Текущий уровень">
					<span class="rb-lvl-chip__ico">1</span>
					<span class="rb-lvl-chip__label">сейчас</span>
					<span class="rb-lvl-chip__val">· Новик</span>
				</div>
				<div class="rb-lvl-target">
					до 10 уровня
					<b>2 120 XP</b>
				</div>
			</div>
			<div class="rb-progress" aria-label="Прогресс до 10 уровня">
				<div class="rb-progress__fill"></div>
			</div>
			<div class="rb-progress-ticks">
				<span>Уровень 1</span>
				<span>Уровень 10 · Рейтинг 🏆</span>
			</div>
			<div class="rb-perks">
				<div class="rb-perk">
					<div class="rb-perk__ico rb-perk__ico--a">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
					</div>
					<div class="rb-perk__text">Проходи <b>варианты и тесты</b> — это самый быстрый источник XP.</div>
				</div>
				<div class="rb-perk">
					<div class="rb-perk__ico rb-perk__ico--c">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 .8-2.8C8 9 6 11 6 14a6 6 0 0 0 12 0c0-5-5-8-5-12z"/></svg>
					</div>
					<div class="rb-perk__text">Держи <b>серию дней</b> — стрик даёт множитель к XP, до +18%.</div>
				</div>
				<div class="rb-perk">
					<div class="rb-perk__ico rb-perk__ico--b">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>
					</div>
					<div class="rb-perk__text">На <b>10 уровне</b> откроется рейтинг — лиги, топ недели и место среди учеников.</div>
				</div>
			</div>
		</div>
		<div class="rb-modal__foot">
			<button class="rb-cta" type="button" data-rating-close>
				Продолжить учиться
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
			</button>
			<button class="rb-cta-sub" type="button" data-rating-close>Напомнить, когда откроется</button>
		</div>
	</div>
</div>

<script src="/rating-button.js?v=1" defer></script>
<script>
/* Тизер «Рейтинг откроется с 10 уровня» — обвязка реальными данными
 * ученика. ChemProgress.computeLevelDetail() даёт текущий уровень и
 * прогресс, getLevelXp(10) — суммарный XP до 10 уровня. Если ученик
 * уже ≥ 10 — кнопку рейтинга прячем (модалка остаётся в DOM, но
 * открыть её нечем). Перерисовываем на iqmo-sync / iqmo-xp-updated. */
(function () {
	function fmtRu(n) {
		try { return Number(n).toLocaleString('ru-RU'); } catch (e) { return String(n); }
	}
	function syncRatingTeaser() {
		if (!window.ChemProgress) return;
		var btn = document.querySelector('.rb-rating');
		var modal = document.getElementById('ratingModal');
		if (!btn || !modal) return;
		var snap = ChemProgress.snapshot ? ChemProgress.snapshot() : null;
		var totalXp = snap && snap.totalPoints ? snap.totalPoints : 0;
		var lv = ChemProgress.computeLevelDetail(totalXp);
		var lvlNum = lv.current || 1;
		var lvlTitle = (ChemProgress.getLevelTitle && ChemProgress.getLevelTitle(lvlNum)) || '';
		var threshold10 = ChemProgress.getLevelXp ? ChemProgress.getLevelXp(10) : 2120;
		if (lvlNum >= 10) {
			btn.style.display = 'none';
			return;
		}
		btn.style.display = '';
		var xpToTen = Math.max(0, threshold10 - totalXp);
		var pct = threshold10 > 0 ? Math.round(Math.min(100, (totalXp / threshold10) * 100)) : 0;
		modal.dataset.progress = String(pct);
		var ico = modal.querySelector('.rb-lvl-chip__ico');
		if (ico) ico.textContent = String(lvlNum);
		var val = modal.querySelector('.rb-lvl-chip__val');
		if (val) val.textContent = '· ' + lvlTitle;
		var tgt = modal.querySelector('.rb-lvl-target b');
		if (tgt) tgt.textContent = fmtRu(xpToTen) + ' XP';
		if (window.RatingTeaser && window.RatingTeaser.setProgress) {
			window.RatingTeaser.setProgress(pct);
		}
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', syncRatingTeaser);
	} else {
		syncRatingTeaser();
	}
	window.addEventListener('iqmo-sync', syncRatingTeaser);
	window.addEventListener('iqmo-sync-ready', syncRatingTeaser);
	window.addEventListener('iqmo-xp-updated', syncRatingTeaser);
})();
</script>
`;

let totalChanged = 0;

for (const rel of PAGES) {
	const abs = resolve(ROOT, rel);
	let html;
	try {
		html = await readFile(abs, 'utf8');
	} catch (e) {
		console.error(`[wire-rating-button] missing: ${rel}`);
		continue;
	}

	const wasActive = html.includes('class="rb-rating"') || html.includes('id="ratingModal"');
	if (wasActive) {
		console.log(`[wire-rating-button] already wired: ${rel}`);
		continue;
	}

	if (!html.includes(DISABLED_SPAN)) {
		console.warn(`[wire-rating-button] no disabled span in: ${rel}`);
		continue;
	}

	// 1) Подменяем неактивный <span> на рабочую кнопку.
	html = html.replace(DISABLED_SPAN, ACTIVE_BUTTON);

	// 2) Подключаем /rating-button.css. Кладём после iqmo-topnav.css —
	//    стили модалки полагаются на токены из topnav (.pill-btn и т.п.
	//    не используем, но на всякий случай порядок сохраняем).
	if (!html.includes('/rating-button.css')) {
		html = html.replace(
			/(<link rel="stylesheet" href="\/iqmo-topnav\.css\?v=[^"]*" \/>)/,
			`$1\n${CSS_LINK}`,
		);
	}

	// 3) Вставляем модалку и скрипты прямо перед </body>. Используем
	//    последний </body> в файле, чтобы случайно не попасть внутрь
	//    template-литерала (на subject-* и full-test-* такого нет, но
	//    привычка дешевле дебага).
	const closeIdx = html.lastIndexOf('</body>');
	if (closeIdx === -1) {
		console.error(`[wire-rating-button] no </body> in: ${rel}`);
		continue;
	}
	html = html.slice(0, closeIdx) + MODAL_AND_SCRIPTS + html.slice(closeIdx);

	await writeFile(abs, html, 'utf8');
	totalChanged++;
	console.log(`[wire-rating-button] wired: ${rel}`);
}

console.log(`[wire-rating-button] done. files changed: ${totalChanged}/${PAGES.length}`);
