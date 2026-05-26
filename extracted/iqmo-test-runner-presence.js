/**
 * Компактный online + mini-ticker (как в архиве), только на ?v= тесте.
 */
(function (global) {
	'use strict';

	var POLL_MS = 22000;
	var TICKER_MS = 12000;

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function fetchTest(subject, variantId) {
		var ch = 'v' + String(variantId || '').replace(/\D/g, '');
		var qs = new URLSearchParams({ subject: subject || '', chapter: ch, limit: '10' });
		return fetch('/api/live-activity?' + qs.toString(), { credentials: 'same-origin', cache: 'no-store' })
			.then(function (r) {
				return r.ok ? r.json() : null;
			})
			.catch(function () {
				return null;
			});
	}

	function mount(opts) {
		opts = opts || {};
		var countEl = document.getElementById('runner-live-count');
		var tickerEl = document.getElementById('runner-live-ticker');
		if (!countEl) return;

		var lines = [];
		var idx = 0;

		function renderTicker() {
			if (!tickerEl || !lines.length) return;
			var ln = lines[idx++ % lines.length];
			tickerEl.innerHTML =
				'<span class="runner-live-ticker__ico">' +
				(ln.icon || '✨') +
				'</span><span>' +
				esc(ln.text) +
				'</span>';
			tickerEl.classList.add('is-on');
		}

		function apply(data) {
			if (!data) {
				countEl.textContent = '12';
				return;
			}
			var v = data.activeInVariant || data.activeInChapter || 0;
			if (v > 0) countEl.textContent = fmtNum(v);

			lines = [];
			(data.aggregates || []).forEach(function (a) {
				if (a.text) lines.push({ icon: a.icon || '🟢', text: a.text });
			});
			(data.events || []).slice(0, 6).forEach(function (ev) {
				if (ev.text) lines.push({ icon: ev.icon || '✨', text: ev.text });
			});
			if (!lines.length && v > 0) {
				lines.push({ icon: '🟢', text: fmtNum(v) + ' учеников сейчас в этом варианте' });
			}
			renderTicker();
		}

		function poll() {
			try {
				if (global.IqmoLiveActivity && IqmoLiveActivity.setPresence) {
					var ch = 'v' + String(opts.variantId || '').replace(/\D/g, '');
					IqmoLiveActivity.setPresence(opts.subject, ch);
				}
			} catch (eHb) {}
			return fetchTest(opts.subject, opts.variantId).then(apply);
		}

		poll();
		setInterval(poll, POLL_MS);
		if (tickerEl) {
			renderTicker();
			setInterval(renderTicker, TICKER_MS);
		}
	}

	global.IqmoTestRunnerPresence = { mount: mount, POLL_MS: POLL_MS };
})(typeof window !== 'undefined' ? window : global);
