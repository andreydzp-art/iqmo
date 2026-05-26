/**
 * IQMO — мотивационный слой XP на странице теста (UI как в test-runner-v4.js).
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

	function getQcard() {
		return document.getElementById('q-card');
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

	function popXp(anchor, amount) {
		var qcard = getQcard();
		if (!qcard || !anchor || !anchor.getBoundingClientRect) return;
		var rect = anchor.getBoundingClientRect();
		var cardRect = qcard.getBoundingClientRect();
		var el = document.createElement('div');
		el.className = 'xp-pop';
		el.textContent = '+' + amount + ' XP';
		el.style.left = rect.right - cardRect.left - 80 + 'px';
		el.style.top = rect.top - cardRect.top + rect.height / 2 - 10 + 'px';
		qcard.appendChild(el);
		setTimeout(function () {
			if (el.parentNode) el.remove();
		}, 1300);
	}

	function spawnParticles(anchor, n) {
		var qcard = getQcard();
		if (!qcard || !anchor || !anchor.getBoundingClientRect) return;
		var rect = anchor.getBoundingClientRect();
		var cardRect = qcard.getBoundingClientRect();
		var cx = rect.left - cardRect.left + 24;
		var cy = rect.top - cardRect.top + rect.height / 2;
		var i;
		for (i = 0; i < n; i++) {
			var p = document.createElement('div');
			p.className = 'particle';
			var angle = Math.PI * (1.2 + Math.random() * 0.6) * -1;
			var dist = 60 + Math.random() * 70;
			var dx = Math.cos(angle) * dist;
			var dy = Math.sin(angle) * dist;
			p.style.left = cx + 'px';
			p.style.top = cy + 'px';
			p.style.background = ['#fbbf24', '#f59e0b', '#fde68a', '#34d399'][i % 4];
			p.style.boxShadow = '0 0 10px currentColor';
			qcard.appendChild(p);
			p.animate(
				[
					{ transform: 'translate(0,0) scale(1)', opacity: 1 },
					{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.4)', opacity: 0 }
				],
				{ duration: 700 + Math.random() * 250, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
			).onfinish = function () {
				if (p.parentNode) p.remove();
			};
		}
	}

	function flyCoin(anchor) {
		var xpBank = $('xp-bank');
		if (!xpBank || !anchor || !anchor.getBoundingClientRect) return;
		var bankRect = xpBank.getBoundingClientRect();
		var anchorRect = anchor.getBoundingClientRect();
		var startX = anchorRect.left + anchorRect.width * 0.5;
		var startY = anchorRect.top + anchorRect.height * 0.5;
		var endX = bankRect.left + 26;
		var endY = bankRect.top + 70;
		var midX = (startX + endX) / 2 + (Math.random() * 40 - 20);
		var midY = Math.min(startY, endY) - 60;

		var coin = document.createElement('div');
		coin.className = 'xp-coin';
		coin.style.left = startX - 8 + 'px';
		coin.style.top = startY - 8 + 'px';
		document.body.appendChild(coin);

		coin.animate(
			[
				{ transform: 'translate(0,0) scale(1)', offset: 0, opacity: 1 },
				{
					transform: 'translate(' + (midX - startX) + 'px,' + (midY - startY) + 'px) scale(1.05)',
					offset: 0.5,
					opacity: 1
				},
				{
					transform: 'translate(' + (endX - startX) + 'px,' + (endY - startY) + 'px) scale(.55)',
					offset: 1,
					opacity: 0.9
				}
			],
			{ duration: 650, easing: 'cubic-bezier(.5,.1,.3,1)', fill: 'forwards' }
		).onfinish = function () {
			coin.remove();
			var num = $('xp-bank-num');
			if (num) {
				num.classList.remove('is-bumped');
				void num.offsetWidth;
				num.classList.add('is-bumped');
				setTimeout(function () {
					num.classList.remove('is-bumped');
				}, 220);
			}
		};
	}

	function bumpRing() {
		var ring = $('lvl-ring');
		if (!ring) return;
		ring.classList.remove('is-bumped');
		void ring.offsetWidth;
		ring.classList.add('is-bumped');
	}

	function ripple(anchor, e) {
		if (!anchor) return;
		var rect = anchor.getBoundingClientRect();
		var x = e && e.clientX ? e.clientX - rect.left : rect.width / 2;
		var y = e && e.clientY ? e.clientY - rect.top : rect.height / 2;
		var r = document.createElement('span');
		r.className = 'opt-ripple';
		r.style.left = x + 'px';
		r.style.top = y + 'px';
		r.style.width = r.style.height = Math.max(rect.width, rect.height) * 0.6 + 'px';
		anchor.appendChild(r);
		setTimeout(function () {
			if (r.parentNode) r.remove();
		}, 560);
	}

	function refreshOptions(q, answers) {
		var card = getQcard();
		if (!card || !q) return;
		var opts = card.querySelectorAll('.opt');
		if (!opts.length) return;
		if (q.type === 'multi') {
			var set = new Set(Array.isArray(answers[q.id]) ? answers[q.id] : []);
			opts.forEach(function (o) {
				var id = o.dataset.opt || o.dataset.id;
				o.classList.toggle('is-selected', set.has(id));
			});
		} else if (q.type === 'single') {
			var picked = answers[q.id];
			opts.forEach(function (o) {
				var id = o.dataset.opt || o.dataset.id;
				o.classList.toggle('is-selected', id === picked);
			});
		}
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
		if (anchor) {
			popXp(anchor, xp);
			spawnParticles(anchor, 8);
			flyCoin(anchor);
		}
		bumpRing();
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
		_milestonesShown = {};
		var num = $('xp-bank-num');
		var bar = $('xp-bank-bar');
		var delta = $('xp-bank-delta');
		if (num) num.textContent = '0';
		if (bar) bar.style.width = '0%';
		if (delta) {
			delta.textContent = '+0 XP';
			delta.classList.remove('is-on');
		}
	}

	global.IqmoTestRunnerRewards = {
		onFirstAnswer: onFirstAnswer,
		onAnswerChanged: onAnswerChanged,
		maybeMilestone: maybeMilestone,
		reset: reset,
		ripple: ripple,
		refreshOptions: refreshOptions
	};
})(typeof window !== 'undefined' ? window : global);
