/**
 * IQMO — TestPresenceBar + TestLiveTicker (full-test pages only).
 * Does not touch question/answer/timer logic.
 */
(function (global) {
	'use strict';

	var POLL_MS = 22000;
	var TICKER_MS = 12000;
	var HEARTBEAT_MS = 45000;

	var SUBJECT_LABELS = {
		biology: 'биологию',
		chemistry: 'химию'
	};

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function pluralUchenik(n) {
		n = Math.abs(n) % 100;
		var n1 = n % 10;
		if (n > 10 && n < 20) return 'учеников';
		if (n1 > 1 && n1 < 5) return 'ученика';
		if (n1 === 1) return 'ученик';
		return 'учеников';
	}

	function fetchTestFeed(params) {
		var qs = new URLSearchParams();
		qs.set('scope', 'test');
		if (params.subject) qs.set('subject', params.subject);
		if (params.variant != null) qs.set('variant', String(params.variant));
		if (params.question) qs.set('question', String(params.question));
		qs.set('limit', String(params.limit || 10));
		var url = '/api/live-activity?' + qs.toString();
		return fetch(url, { credentials: 'same-origin', cache: 'no-store' })
			.then(function (r) {
				if (!r.ok) throw new Error('test-feed');
				return r.json();
			})
			.catch(function () {
				return fallbackFeed(params);
			});
	}

	function fallbackFeed(params) {
		var subLabel = SUBJECT_LABELS[params.subject] || 'предмет';
		return {
			activeInVariant: 8,
			activeInSubject: 42,
			activeOnQuestion: 3,
			todayInSubject: 120,
			events: [
				{ icon: '🏆', text: 'Алина получила бейдж «Без ошибок»', ago: '' },
				{ icon: '🔥', text: 'Никита сохранил серию 14 дней', ago: '' }
			],
			aggregates: [
				{ icon: '🟢', text: '8 учеников сейчас проходят этот вариант' },
				{ icon: '📘', text: 'Сегодня 120 учеников прошли ' + subLabel }
			]
		};
	}

	function chapterKey(variantId, question) {
		var ch = 'v' + variantId;
		if (question && question > 0) ch += '/q' + question;
		return ch;
	}

	function syncHeartbeat(live, subject, variantId, getQuestion) {
		if (!live || !live.setPresence) return;
		var q = getQuestion ? getQuestion() : null;
		live.setPresence(subject, chapterKey(variantId, q));
	}

	/** Compact online line (TestPresenceBar) */
	function mountPresenceBar(root, opts) {
		if (!root || root.__iqmoTestPresenceBar) return root;
		root.__iqmoTestPresenceBar = true;
		root.className = 'test-presence-bar';
		root.innerHTML =
			'<div class="test-presence-bar__main" data-tp-main>' +
			'<span class="test-presence-bar__dot" aria-hidden="true"></span>' +
			'<span data-tp-variant-line>Сейчас этот вариант проходят <span class="test-presence-bar__count" data-tp-variant-count>—</span> ' +
			pluralUchenik(0) +
			'</span></div>' +
			'<span class="test-presence-bar__hint" data-tp-question hidden></span>';
		return root;
	}

	/** Rotating activity line (TestLiveTicker) */
	function mountLiveTicker(root, opts) {
		if (!root || root.__iqmoTestTicker) return root;
		root.__iqmoTestTicker = true;
		root.className = 'test-presence-ticker';
		root.setAttribute('aria-live', 'polite');
		root.innerHTML = '<div class="test-presence-ticker__line" data-tp-ticker-line></div>';
		return root;
	}

	function buildTickerLines(data, opts) {
		var lines = [];
		var subLabel = opts.subjectLabel || SUBJECT_LABELS[opts.subject] || 'предмет';

		(data.aggregates || []).forEach(function (a) {
			if (a && a.text) lines.push({ icon: a.icon || '✨', text: a.text });
		});

		if (data.activeInVariant > 0) {
			var v = data.activeInVariant;
			lines.push({
				icon: '🟢',
				text:
					fmtNum(v) +
					' ' +
					pluralUchenik(v) +
					' сейчас ' +
					(opts.variantLabel || 'решают этот вариант')
			});
		}

		(data.events || []).slice(0, 8).forEach(function (ev) {
			if (ev && ev.text) lines.push({ icon: ev.icon || '✨', text: ev.text });
		});

		if (data.todayInSubject > 0) {
			var t = data.todayInSubject;
			lines.push({
				icon: '📘',
				text: 'Сегодня ' + fmtNum(t) + ' ' + pluralUchenik(t) + ' прошли ' + subLabel
			});
		}

		if (data.activeInSubject > 0) {
			var s = data.activeInSubject;
			lines.push({
				icon: '📘',
				text: fmtNum(s) + ' ' + pluralUchenik(s) + ' сейчас проходят ' + subLabel
			});
		}

		var seen = {};
		var out = [];
		lines.forEach(function (ln) {
			var key = (ln.icon || '') + '|' + ln.text;
			if (seen[key]) return;
			seen[key] = true;
			out.push(ln);
		});

		if (!out.length) {
			out.push({
				icon: '🟢',
				text: 'Сейчас этот вариант проходят несколько учеников — вы не один'
			});
		}

		return out;
	}

	function mount(wrap, opts) {
		if (!wrap || wrap.__iqmoTestPresence) return;
		opts = opts || {};
		if (!opts.subject || opts.variantId == null) return;

		wrap.__iqmoTestPresence = true;
		wrap.hidden = false;

		var barRoot = document.createElement('div');
		var tickerRoot = document.createElement('div');
		barRoot.id = 'test-presence-bar';
		tickerRoot.id = 'test-presence-ticker';
		wrap.appendChild(barRoot);
		wrap.appendChild(tickerRoot);

		mountPresenceBar(barRoot, opts);
		mountLiveTicker(tickerRoot, opts);

		var variantCountEl = barRoot.querySelector('[data-tp-variant-count]');
		var variantLineEl = barRoot.querySelector('[data-tp-variant-line]');
		var questionHintEl = barRoot.querySelector('[data-tp-question]');
		var tickerLineEl = tickerRoot.querySelector('[data-tp-ticker-line]');

		var tickerLines = [];
		var tickerIdx = 0;
		var lastData = null;

		function renderTickerLine() {
			if (!tickerLineEl || !tickerLines.length) return;
			var ln = tickerLines[tickerIdx % tickerLines.length];
			tickerIdx++;
			tickerLineEl.innerHTML =
				'<span class="test-presence-ticker__ico">' +
				(ln.icon || '✨') +
				'</span><span class="test-presence-ticker__text">' +
				esc(ln.text) +
				'</span>';
		}

		function applyBar(data) {
			lastData = data;
			var v = data.activeInVariant || 0;
			if (variantCountEl) variantCountEl.textContent = fmtNum(v);
			if (variantLineEl && v > 0) {
				variantLineEl.innerHTML =
					'Сейчас этот вариант проходят <span class="test-presence-bar__count">' +
					fmtNum(v) +
					'</span> ' +
					pluralUchenik(v);
			}

			var q = data.activeOnQuestion || 0;
			var qNum = opts.getQuestion ? opts.getQuestion() : null;
			if (questionHintEl && q > 0 && qNum) {
				questionHintEl.hidden = false;
				questionHintEl.textContent =
					fmtNum(q) + ' ' + pluralUchenik(q) + ' сейчас на вопросе №' + qNum;
			} else if (questionHintEl) {
				questionHintEl.hidden = true;
			}
		}

		function apply(data) {
			applyBar(data);
			tickerLines = buildTickerLines(data, opts);
			renderTickerLine();
		}

		function poll() {
			var q = opts.getQuestion ? opts.getQuestion() : null;
			var live = global.IqmoLiveActivity;
			syncHeartbeat(live, opts.subject, opts.variantId, opts.getQuestion);
			return fetchTestFeed({
				subject: opts.subject,
				variant: opts.variantId,
				question: q,
				limit: 10
			}).then(apply);
		}

		poll();
		var pollTimer = setInterval(poll, opts.pollMs || POLL_MS);
		var tickerTimer = setInterval(renderTickerLine, opts.tickerMs || TICKER_MS);
		var hbTimer = setInterval(function () {
			syncHeartbeat(global.IqmoLiveActivity, opts.subject, opts.variantId, opts.getQuestion);
		}, HEARTBEAT_MS);

		wrap._testPresenceDestroy = function () {
			clearInterval(pollTimer);
			clearInterval(tickerTimer);
			clearInterval(hbTimer);
		};

		/* Mobile: allow hiding ticker via swipe up on ticker */
		if (typeof window !== 'undefined' && 'ontouchstart' in window) {
			var startY = 0;
			tickerRoot.addEventListener(
				'touchstart',
				function (e) {
					startY = e.touches[0].clientY;
				},
				{ passive: true }
			);
			tickerRoot.addEventListener(
				'touchend',
				function (e) {
					var dy = e.changedTouches[0].clientY - startY;
					if (dy < -28) wrap.classList.add('is--ticker-hidden');
					if (dy > 28) wrap.classList.remove('is--ticker-hidden');
				},
				{ passive: true }
			);
		}

		return { refresh: poll, getData: function () { return lastData; } };
	}

	global.IqmoTestPresence = {
		POLL_MS: POLL_MS,
		TICKER_MS: TICKER_MS,
		mount: mount,
		mountPresenceBar: mountPresenceBar,
		mountLiveTicker: mountLiveTicker,
		fetchTestFeed: fetchTestFeed
	};
})(typeof window !== 'undefined' ? window : global);
