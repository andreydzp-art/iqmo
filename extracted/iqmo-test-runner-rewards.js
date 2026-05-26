/**
 * IQMO — мотивационный слой XP на странице теста (только UI, без проверки ответов).
 */
(function (global) {
	'use strict';

	var SESSION_GOAL = 300;
	var _sessionXp = 0;
	var _combo = 0;
	var _firstRewarded = {};
	var _milestonesShown = {};

	var XP = {
		single: 12,
		multi: 8,
		match: 6,
		input: 10,
		open: 18,
		written: 18
	};

	function $(id) {
		return document.getElementById(id);
	}

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	function showToast(msg, xp) {
		var toast = $('toast');
		var txt = $('toast-text');
		var xpEl = $('toast-xp');
		if (!toast || !txt) return;
		txt.textContent = msg;
		if (xpEl) {
			if (xp) {
				xpEl.textContent = '+' + xp + ' XP';
				xpEl.hidden = false;
			} else xpEl.hidden = true;
		}
		toast.classList.add('is-on');
		clearTimeout(showToast._t);
		showToast._t = setTimeout(function () {
			toast.classList.remove('is-on');
		}, 1700);
	}

	function flashCombo(n) {
		var el = $('combo-flash');
		var num = $('combo-flash-n');
		if (!el || !num) return;
		num.textContent = '×' + n;
		el.classList.add('is-on');
		setTimeout(function () {
			el.classList.remove('is-on');
		}, 950);
	}

	function tickNumber(el, from, to, dur) {
		if (!el) return;
		var start = performance.now();
		function frame(now) {
			var t = Math.min(1, (now - start) / dur);
			var k = 1 - Math.pow(1 - t, 3);
			el.textContent = String(Math.round(from + (to - from) * k));
			if (t < 1) requestAnimationFrame(frame);
			else el.textContent = String(to);
		}
		requestAnimationFrame(frame);
	}

	function addToBank(amount) {
		var from = _sessionXp;
		var to = _sessionXp + amount;
		_sessionXp = to;
		var delta = $('xp-bank-delta');
		var bar = $('xp-bank-bar');
		var num = $('xp-bank-num');
		if (delta) {
			delta.textContent = '+' + amount + ' XP';
			delta.classList.add('is-on');
			clearTimeout(addToBank._t);
			addToBank._t = setTimeout(function () {
				delta.classList.remove('is-on');
			}, 1500);
		}
		if (bar) bar.style.width = Math.min(100, Math.round((to / SESSION_GOAL) * 100)) + '%';
		if (num) {
			tickNumber(num, from, to, 700);
			num.classList.remove('is-bumped');
			void num.offsetWidth;
			num.classList.add('is-bumped');
			setTimeout(function () {
				num.classList.remove('is-bumped');
			}, 220);
		}
		var comboN = $('combo-n');
		var psCombo = $('ps-combo');
		if (comboN) comboN.textContent = String(_combo);
		if (psCombo) psCombo.textContent = String(_combo);
	}

	function bumpCombo() {
		_combo++;
		if (_combo > 0 && _combo % 5 === 0) flashCombo(_combo);
	}

	function onFirstAnswer(q, anchor) {
		if (!q || _firstRewarded[q.id]) return;
		_firstRewarded[q.id] = true;
		var xp = XP[q.type] || 8;
		bumpCombo();
		addToBank(xp);
		showToast('Ответ сохранён', xp);
		try {
			if (global.ChemProgress && typeof ChemProgress.awardXp === 'function') {
				ChemProgress.awardXp(xp, 'test_runner_ui', 0);
			}
			if (global.IqmoTestRunnerLayout && IqmoTestRunnerLayout.syncPlayer) {
				IqmoTestRunnerLayout.syncPlayer();
			}
		} catch (e) {}
	}

	function onAnswerChanged(q) {
		if (!q || !_firstRewarded[q.id]) return;
		showToast('Ответ изменён', 0);
	}

	function maybeMilestone(taskNum) {
		var total = global.IQMO_RUNNER_TOTAL || 0;
		var marks = [5, 10, 15, 20];
		if (marks.indexOf(taskNum) === -1) return;
		if (total && taskNum > total) return;
		if (_milestonesShown[taskNum]) return;
		_milestonesShown[taskNum] = true;
		try {
			if (typeof global.fireMilestone === 'function') global.fireMilestone(taskNum);
		} catch (e) {}
	}

	function reset() {
		_sessionXp = 0;
		_combo = 0;
		_firstRewarded = {};
	}

	global.IqmoTestRunnerRewards = {
		onFirstAnswer: onFirstAnswer,
		onAnswerChanged: onAnswerChanged,
		maybeMilestone: maybeMilestone,
		reset: reset
	};
})(typeof window !== 'undefined' ? window : global);
