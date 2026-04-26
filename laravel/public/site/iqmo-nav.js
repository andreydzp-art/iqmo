/**
 * Единая шапка: Вход / Профиль / Выйти в зависимости от IQMO-сессии (/api/me).
 * Разметка: #iqmo-nav-login, #iqmo-nav-profile (hidden по умолчанию), #iqmo-nav-logout (hidden).
 * Опционально: .iqmo-only-authed + hidden — только для вошедших.
 * Опционально: .iqmo-only-guest — только для гостей (скрывается после входа).
 */
(function () {
	function ensureHiddenCss() {
		if (document.getElementById('iqmo-nav-hidden-fix')) return;
		var s = document.createElement('style');
		s.id = 'iqmo-nav-hidden-fix';
		s.textContent = '[hidden]{display:none!important}';
		document.head.appendChild(s);
	}

	async function run() {
		ensureHiddenCss();

		var loggedIn = false;
		try {
			var ac = new AbortController();
			var tid = setTimeout(function () {
				try {
					ac.abort();
				} catch (e0) {}
			}, 6000);
			var mr;
			try {
				mr = await fetch('/api/me', {
					credentials: 'include',
					cache: 'no-store',
					headers: { Accept: 'application/json' },
					signal: ac.signal
				});
			} finally {
				clearTimeout(tid);
			}
			if (mr.ok) {
				var ct = (mr.headers.get('content-type') || '').toLowerCase();
				if (ct.indexOf('application/json') !== -1) {
					var j = await mr.json();
					loggedIn = typeof j.email === 'string' && j.email.length > 0;
				}
			}
		} catch (e) {}

		var loginBtn = document.getElementById('iqmo-nav-login');
		var profBtn = document.getElementById('iqmo-nav-profile');
		var logoutBtn = document.getElementById('iqmo-nav-logout');

		if (loggedIn) {
			if (profBtn) profBtn.removeAttribute('hidden');
			if (logoutBtn) logoutBtn.removeAttribute('hidden');
			if (loginBtn) loginBtn.setAttribute('hidden', '');
		} else {
			if (profBtn) profBtn.setAttribute('hidden', '');
			if (logoutBtn) logoutBtn.setAttribute('hidden', '');
			if (loginBtn) loginBtn.removeAttribute('hidden');
		}

		if (logoutBtn && !logoutBtn.dataset.iqmoLogoutBound) {
			logoutBtn.dataset.iqmoLogoutBound = '1';
			logoutBtn.addEventListener('click', async function () {
				try {
					await fetch('/api/auth/logout', {
						method: 'POST',
						credentials: 'include',
						headers: { Accept: 'application/json' }
					});
				} catch (e2) {}
				location.reload();
			});
		}

		document.querySelectorAll('.iqmo-only-authed').forEach(function (el) {
			if (loggedIn) el.removeAttribute('hidden');
			else el.setAttribute('hidden', '');
		});

		document.querySelectorAll('.iqmo-only-guest').forEach(function (el) {
			if (loggedIn) el.setAttribute('hidden', '');
			else el.removeAttribute('hidden');
		});

		return loggedIn;
	}

	window.__iqmoAuthReady = run();

	// iqmo-sync.js подтверждает сессию позже; без повторной проверки шапка могла остаться «Вход».
	window.addEventListener('iqmo-sync-ready', function () {
		window.__iqmoAuthReady.then(function (navAuthed) {
			var syncAuthed = !!(window.IqmoSync && typeof window.IqmoSync.isAuthed === 'function' && window.IqmoSync.isAuthed());
			if (navAuthed !== syncAuthed) {
				window.__iqmoAuthReady = run();
			}
		});
	});
})();
