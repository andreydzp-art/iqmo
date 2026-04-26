/**
 * Cookie / personal-data consent banner.
 *
 * One-time bottom-of-page banner shown until the user accepts. Consent is
 * stored in localStorage (not in a cookie) so we don't need cookies to
 * remember that someone agreed to cookies — paradox-free.
 *
 * Storage:
 *   localStorage['iqmo-cookie-consent-v1'] = JSON.stringify({ ts, version: 1 })
 *
 * The version suffix lets us invalidate everyone's consent if our policy
 * materially changes — bump 'v1' to 'v2', and the next page load asks again.
 *
 * No external dependencies. Safe to run on any page.
 */
(function () {
	if (typeof document === 'undefined') return;

	var KEY = 'iqmo-cookie-consent-v1';
	var POLICY_URL = '/legal.html#privacy';

	function alreadyAccepted() {
		try {
			var raw = localStorage.getItem(KEY);
			if (!raw) return false;
			var obj = JSON.parse(raw);
			return obj && typeof obj === 'object' && obj.version === 1;
		} catch (e) {
			return false;
		}
	}

	function persistAcceptance() {
		try {
			localStorage.setItem(KEY, JSON.stringify({ version: 1, ts: Date.now() }));
		} catch (e) {}
	}

	function injectStyles() {
		if (document.getElementById('iqmo-cookie-banner-css')) return;
		var s = document.createElement('style');
		s.id = 'iqmo-cookie-banner-css';
		s.textContent = [
			'.iqmo-cookie-banner{',
			'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;',
			'background:#11141a;color:#fff;border-radius:14px;',
			'padding:14px 18px;display:flex;align-items:center;gap:14px;',
			"font-family:'Manrope',system-ui,-apple-system,sans-serif;font-size:14px;",
			'box-shadow:0 8px 32px rgba(17,20,26,0.25);',
			'max-width:920px;margin:0 auto;flex-wrap:wrap}',
			'.iqmo-cookie-banner__text{flex:1 1 320px;line-height:1.45}',
			'.iqmo-cookie-banner a{color:#9bb6ec;text-decoration:underline}',
			'.iqmo-cookie-banner__btn{',
			'background:#4f7bd6;color:#fff;border:0;border-radius:10px;',
			'padding:10px 18px;font-size:14px;font-weight:700;',
			"font-family:'Manrope',system-ui,-apple-system,sans-serif;cursor:pointer;",
			'transition:background .15s}',
			'.iqmo-cookie-banner__btn:hover{background:#3b65b8}',
			'@media (max-width:520px){',
			'.iqmo-cookie-banner{flex-direction:column;align-items:stretch;text-align:left}',
			'.iqmo-cookie-banner__btn{width:100%}',
			'}'
		].join('');
		(document.head || document.documentElement).appendChild(s);
	}

	function buildBanner() {
		var wrap = document.createElement('div');
		wrap.className = 'iqmo-cookie-banner';
		wrap.setAttribute('role', 'region');
		wrap.setAttribute('aria-label', 'Согласие на обработку cookies');

		var text = document.createElement('div');
		text.className = 'iqmo-cookie-banner__text';
		// User-visible copy: keep short and direct, link to the full policy.
		text.innerHTML =
			'Мы используем cookies и обрабатываем технические данные, чтобы сайт работал и мы понимали, как им пользуются. ' +
			'Продолжая, вы соглашаетесь с этим. Подробнее — в ' +
			'<a href="' +
			POLICY_URL +
			'" target="_blank" rel="noopener">Политике конфиденциальности</a>.';

		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'iqmo-cookie-banner__btn';
		btn.textContent = 'Принять';
		btn.addEventListener('click', function () {
			persistAcceptance();
			if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
		});

		wrap.appendChild(text);
		wrap.appendChild(btn);
		return wrap;
	}

	function show() {
		if (alreadyAccepted()) return;
		injectStyles();
		var node = buildBanner();
		document.body.appendChild(node);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', show, { once: true });
	} else {
		show();
	}
})();
