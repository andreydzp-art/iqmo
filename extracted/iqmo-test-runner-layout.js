/**
 * IQMO — каркас страницы прохождения теста (v4).
 * Подменяет DOM в #exam-subbar и #test-root, не трогая логику ответов.
 */
(function (global) {
	'use strict';

	var OVERLAY_HTML =
		'<div class="modal-scrim" id="modal-abort" hidden>' +
		'<div class="modal"><h3>Прервать тест?</h3>' +
		'<p>Прогресс варианта сохранится в браузере. Вы сможете вернуться позже.</p>' +
		'<div class="modal-actions">' +
		'<button type="button" class="qbtn ghost" data-close>Отмена</button>' +
		'<button type="button" class="qbtn" id="confirm-abort" style="background:var(--rose);color:#fff;">Прервать</button>' +
		'</div></div></div>' +
		'<div class="toast" id="toast">' +
		'<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>' +
		'<span id="toast-text">Ответ сохранён</span>' +
		'<span class="xp" id="toast-xp" hidden>+12 XP</span></div>' +
		'<div class="combo-flash" id="combo-flash"><span id="combo-flash-n">×5</span><small>ответов подряд</small></div>' +
		'<canvas id="fx-canvas"></canvas>' +
		'<div class="milestone-card" id="milestone">' +
		'<span class="milestone-eyebrow">★ Рубеж пройден</span>' +
		'<div class="milestone-h" id="milestone-h"></div>' +
		'<p class="milestone-sub" id="milestone-sub"></p></div>';

	function stageHtml(opts) {
		var n = opts.questionCount || 0;
		var cur = (opts.currentIndex || 0) + 1;
		return (
			'<section class="stage runner-v4-stage">' +
			'<div class="stage-title">' +
			'<div class="stage-eyebrow">' +
			esc(opts.subjectEyebrow || '') +
			'</div>' +
			'<div class="stage-h">' +
			esc(opts.variantTitle || 'Полный вариант') +
			' <span class="v">№ ' +
			esc(String(opts.variantId || '')) +
			' · задание <span id="stage-cur">' +
			cur +
			'</span> / ' +
			n +
			'</span></div></div>' +
			'<div class="stage-spacer"></div>' +
			'<div class="live-pill" id="runner-live-pill">' +
			'<span class="live-badge"><span class="live-dot" aria-hidden="true"></span>Онлайн</span>' +
			'<span><span class="live-count num" id="runner-live-count">—</span> ' +
			'<span class="live-label">учеников в этом варианте</span></span></div>' +
			'<div class="timer-pill" id="timer">' +
			'<span class="timer-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5"/><path d="M9 2h6"/></svg>Осталось</span>' +
			'<span class="timer-val num" id="timer-val">00:00:00</span></div>' +
			'<button type="button" class="abort-btn" id="btn-quit-exam">' +
			'<span class="abort-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6 6 18M6 6l12 12"/></svg>Стоп</span>' +
			'<span>Прервать тест</span></button></section>'
		);
	}

	function layoutHtml(total) {
		return (
			'<div class="runner-v4-inner">' +
			'<div class="layout">' +
			'<aside class="hud">' +
			'<div class="player">' +
			'<div class="player-row">' +
			'<div class="lvl-ring" id="lvl-ring" style="--xp:42"><div class="lvl-ring-inner"><small>LVL</small><b id="player-lvl">—</b></div></div>' +
			'<div class="player-info"><div class="player-name" id="player-name">Ученик</div>' +
			'<div class="player-xp"><b class="num" id="player-xp">0</b> / <span class="num" id="player-xp-max">—</span> XP</div></div></div>' +
			'<div class="player-stats">' +
			'<div class="pstat streak"><div class="pstat-h">Дней подряд</div><div class="pstat-v"><span id="player-streak">0</span><span class="unit">дн.</span></div></div>' +
			'<div class="pstat combo"><div class="pstat-h">Ответов подряд</div><div class="pstat-v"><span id="combo-n">0</span><span class="unit">в ряд</span></div></div>' +
			'</div></div>' +
			'<div class="pad"><div class="pad-head"><h3>Задания</h3><span class="pad-now"><b class="num" id="grid-now">1</b> / <span id="total-count">0</span></span></div>' +
			'<div class="qgrid" id="nav-grid"></div>' +
			'<div class="legend">' +
			'<div class="legend-row"><span class="lg-dot current"></span>текущее</div>' +
			'<div class="legend-row"><span class="lg-dot answered"></span>отвечено</div>' +
			'<div class="legend-row"><span class="lg-dot postponed"></span>отложено</div>' +
			'<div class="legend-row"><span class="lg-dot pending"></span>не открыто</div>' +
			'</div></div>' +
			'<div class="xp-bank" id="xp-bank">' +
			'<div class="xp-bank-head"><span class="xp-bank-eyebrow">⚡ Заработано за сессию</span><span class="xp-bank-delta" id="xp-bank-delta">+0 XP</span></div>' +
			'<div class="xp-bank-total"><span class="xp-bank-num num" id="xp-bank-num">0</span><span class="xp-bank-unit">XP</span></div>' +
			'<div class="xp-bank-bar"><div class="xp-bank-bar-fill" id="xp-bank-bar" style="width:0%"></div></div>' +
			'<div class="xp-bank-foot">Цель сессии — <b>300 XP</b>.</div></div>' +
			'<div class="finish-card"><button type="button" class="finish-btn" id="btn-finish">' +
			'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5 9-11"/></svg>Завершить тест</button>' +
			'<p class="finish-help">После завершения откроется экран с баллами и разбором.</p></div>' +
			'</aside>' +
			'<main class="main">' +
			'<div class="progress-strip"><div class="ps-text"><span class="ps-lbl">Прогресс</span>' +
			'<span class="ps-val"><b class="num" id="answered-count">0</b> / <span id="ps-total">0</span> решено</span></div>' +
			'<div class="ps-bar"><div class="ps-bar-fill" id="pb-fill" style="width:0%"></div></div>' +
			'<div class="ps-streak"><span class="flame">🔥</span><span><b class="num" id="ps-combo">0</b> подряд</span></div></div>' +
			'<section class="qcard" id="q-card"></section></main></div></div>'
		);
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function ensureOverlays() {
		if (document.getElementById('fx-canvas')) return;
		var wrap = document.createElement('div');
		wrap.id = 'runner-v4-overlays';
		wrap.innerHTML = OVERLAY_HTML;
		document.body.appendChild(wrap);
	}

	function install(opts) {
		opts = opts || {};
		document.documentElement.classList.add('is--runner-v4');
		global.IQMO_RUNNER_TOTAL = opts.questionCount || 0;

		var examSub = document.getElementById('exam-subbar');
		if (examSub) {
			examSub.innerHTML =
				stageHtml(opts) +
				'<div class="runner-live-ticker" id="runner-live-ticker" aria-live="polite"></div>';
			examSub.classList.add('runner-v4-exam-subbar');
		}

		var testRoot = document.getElementById('test-root');
		if (testRoot) {
			testRoot.innerHTML = layoutHtml(opts.questionCount);
		}

		ensureOverlays();

		var total = opts.questionCount || 0;
		var psTotal = document.getElementById('ps-total');
		if (psTotal) psTotal.textContent = String(total);

		syncPlayer(opts);

		return {
			elCard: document.getElementById('q-card'),
			elNavGrid: document.getElementById('nav-grid'),
			elPb: document.getElementById('pb-fill'),
			elAnsweredCount: document.getElementById('answered-count'),
			elTotalCount: document.getElementById('total-count'),
			elGridNow: document.getElementById('grid-now'),
			elStageCur: document.getElementById('stage-cur'),
			elTimer: document.getElementById('timer'),
			elTimerVal: document.getElementById('timer-val'),
			elComboN: document.getElementById('combo-n'),
			elPsCombo: document.getElementById('ps-combo')
		};
	}

	function syncPlayer(opts) {
		opts = opts || {};
		var snap = null;
		try {
			if (global.ChemProgress && ChemProgress.getGamificationSnapshot) {
				snap = ChemProgress.getGamificationSnapshot();
			}
		} catch (e) {}
		var lvl = document.getElementById('player-lvl');
		var ring = document.getElementById('lvl-ring');
		var xpEl = document.getElementById('player-xp');
		var xpMax = document.getElementById('player-xp-max');
		var nameEl = document.getElementById('player-name');
		var streakEl = document.getElementById('player-streak');
		if (snap && snap.level) {
			if (lvl) lvl.textContent = String(snap.level.current);
			if (xpMax) xpMax.textContent = String(snap.level.xpToNext || 2000);
			if (xpEl) xpEl.textContent = fmtNum(snap.level.xpInLevel || 0);
			if (ring) {
				var pct = snap.level.xpToNext
					? Math.min(100, Math.round(((snap.level.xpInLevel || 0) / snap.level.xpToNext) * 100))
					: 0;
				ring.style.setProperty('--xp', pct);
			}
		}
		if (nameEl && opts.displayName) nameEl.textContent = opts.displayName;
		if (streakEl && opts.streakDays != null) streakEl.textContent = String(opts.streakDays);
	}

	function updateStageIndex(cur, total) {
		var el = document.getElementById('stage-cur');
		if (el) el.textContent = String(cur + 1);
		var gn = document.getElementById('grid-now');
		if (gn) gn.textContent = String(cur + 1);
	}

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	/** После finishTest: убрать «Прервать» и счётчик задания, оставить короткий заголовок */
	function showResultBar(opts) {
		opts = opts || {};
		var examSub = document.getElementById('exam-subbar');
		if (!examSub) return;
		examSub.classList.add('runner-v4-exam-subbar', 'runner-v4-result');
		examSub.innerHTML =
			'<section class="stage runner-v4-stage runner-v4-stage--result">' +
			'<div class="stage-title">' +
			'<div class="stage-eyebrow">' +
			esc(opts.subjectEyebrow || '') +
			'</div>' +
			'<div class="stage-h">' +
			esc(opts.variantTitle || 'Полный вариант') +
			' <span class="v">№ ' +
			esc(String(opts.variantId || '')) +
			'</span> · <span style="color:var(--green);font-weight:700">тест завершён</span></div>' +
			'</div></section>';
		hideRunnerFx();
	}

	function hideRunnerFx() {
		['toast', 'combo-flash', 'fx-canvas', 'milestone'].forEach(function (id) {
			var el = document.getElementById(id);
			if (el) el.style.display = 'none';
		});
	}

	global.IqmoTestRunnerLayout = {
		install: install,
		syncPlayer: syncPlayer,
		updateStageIndex: updateStageIndex,
		showResultBar: showResultBar,
		hideRunnerFx: hideRunnerFx
	};
})(typeof window !== 'undefined' ? window : global);
