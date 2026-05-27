/**
 * Счётчик «онлайн в этом варианте» в stage (без ленты активности).
 */
(function (global) {
	'use strict';

	var POLL_MS = 22000;
	/** Показываем, пока API не вернул живой счётчик или запрос упал. */
	var FALLBACK_ONLINE = 72;

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
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
		if (!countEl) return;

		function apply(data) {
			if (!data) {
				countEl.textContent = fmtNum(FALLBACK_ONLINE);
				return;
			}
			var v = data.activeInVariant || data.activeInChapter || 0;
			countEl.textContent = v > 0 ? fmtNum(v) : fmtNum(FALLBACK_ONLINE);
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
	}

	global.IqmoTestRunnerPresence = { mount: mount, POLL_MS: POLL_MS };
})(typeof window !== 'undefined' ? window : global);
