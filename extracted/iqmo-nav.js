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

	var meResolve;
	window.__iqmoMe = new Promise(function (res) { meResolve = res; });
	function publishMe(data) {
		try { meResolve && meResolve(data || null); } catch (e) {}
		// Следующий вызов run() (после iqmo-sync-ready) должен переоткрыть Promise,
		// иначе мы залипнем на первом результате.
		window.__iqmoMe = Promise.resolve(data || null);
		meResolve = null;
	}

	async function run() {
		ensureHiddenCss();
		// Старая вёрстка: «Биология» в сайдбаре вела на index.html. Исправляем без перезаливки всей страницы.
		(function fixSidebarBiologyHref() {
			try {
				var a = document.querySelector('aside a.subjects__item.tone-bio')
					|| document.querySelector('a.subjects__item.tone-bio');
				if (!a) return;
				var h = (a.getAttribute('href') || '').trim();
				if (!h || /subject-biology/.test(h)) return;
				if (h.indexOf('index.html') !== -1) {
					a.setAttribute('href', '/subject-biology/');
				}
			} catch (eFix) {}
		})();

		var loggedIn = false;
		var meData = null;
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
					// Должно совпадать с iqmo-sync.js (там authed = me.ok): иначе шапка «Вход» при живой сессии.
					loggedIn = !(j && j.error);
					if (loggedIn) meData = j;
				}
			}
		} catch (e) {}
		publishMe(meData);

		// Anti-FOUC hint: запоминаем, был ли пользователь залогинен в прошлый раз,
		// и синхронно (до парса body) читаем этот флаг inline-скриптом в head, чтобы
		// сразу показать правильную шапку. См. правила [data-iqmo-auth] в iqmo-base.css.
		try {
			localStorage.setItem('iqmo_auth_hint', loggedIn ? '1' : '0');
		} catch (eHint) {}
		try {
			document.documentElement.setAttribute('data-iqmo-auth', loggedIn ? 'authed' : 'guest');
		} catch (eAttr) {}

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
				// Изоляция данных между аккаунтами: при logout стираем все
				// user-scoped ключи в localStorage. Иначе следующий
				// залогинившийся в этом браузере увидит чужой прогресс
				// (localStorage переживает logout). Списки должны
				// совпадать с iqmo-sync.js → wipeUserScopedKeys и с
				// delete-обработчиком в extracted/profile/index.html.
				// iqmo_auth_hint попадает сюда же (вместо setItem('0')):
				// после redirect/reload nav.js всё равно проставит '0',
				// а до того момента отсутствие ключа корректно даёт guest.
				try {
					var WIPE_PREFIXES = [
						'iqmo-chem-',
						'iqmo-bio-',
						'iqmo:chem:',
						'iqmo_purchase_',
						'iqmo_express_start_'
					];
					var WIPE_KEYS = [
						'iqmo-analytics-queue-v1',
						'iqmo-regnudge-dismissed-at',
						'iqmo-last-uid',
						'iqmo_auth_hint'
					];
					var toWipe = [];
					for (var i = 0; i < localStorage.length; i++) {
						var k = localStorage.key(i);
						if (!k) continue;
						var matched = false;
						for (var p = 0; p < WIPE_PREFIXES.length; p++) {
							if (k.indexOf(WIPE_PREFIXES[p]) === 0) { matched = true; break; }
						}
						if (!matched) {
							for (var q = 0; q < WIPE_KEYS.length; q++) {
								if (k === WIPE_KEYS[q]) { matched = true; break; }
							}
						}
						if (matched) toWipe.push(k);
					}
					for (var j = 0; j < toWipe.length; j++) {
						localStorage.removeItem(toWipe[j]);
					}
				} catch (eWipe) {}
				var redir = logoutBtn.getAttribute('data-iqmo-after-logout');
				if (redir) location.href = redir;
				else location.reload();
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

		// Навигация для авторизованных:
		//   • кнопка «Главная» в шапке: ведёт в первый предмет (учебный продукт, лендинг
		//     им бесполезен), а сам ярлык переименовываем в «К занятиям» — текст точнее
		//     описывает действие.
		//   • первая крошка «Главная» в breadcrumbs: дубль шапки → прячем вместе с «/».
		//     В HTML у ссылки и разделителя стоит .iqmo-only-guest — anti-FOUC до /api/me.
		// Промежуточная крошка «Предметы» сделана неактивным <span> прямо в HTML
		// (страницы списка предметов нет, ссылка везде вела бы на лендинг — что для
		// гостя выглядит как «второй раз главная»). Раньше тут был JS, который
		// конвертировал <a> в <span> только для авторизованных, и гость видел
		// бесполезную ссылку — теперь поведение одинаковое для всех.
		// Эвристика «своего предмета»: если URL уже в subject-/full-test-/category-/topic-
		// химии — ведём на химию, иначе на биологию (биология — первый предмет в сайдбаре).
		// Маркер `data-iqmo-keep-href` отключает подмену для конкретной ссылки на случай,
		// если где-то понадобится явный возврат на лендинг (например, Лого).
		if (loggedIn) {
			try {
				var preferred = '/subject-biology/';
				if (/(^|\/)(subject|full-test|category|topic)[-_].*chem/i.test(location.pathname)) {
					preferred = '/subject-chemistry/';
				}
				// Жёсткий список «домашних» URL: чтобы случайно не переписать ссылку
				// на статью с заголовком «Главная» в каком-нибудь будущем разделе.
				var HOME_HREF_RE = /^(\/|#|\.\/index(-[a-z0-9-]+)?\.html|\/index(-[a-z0-9-]+)?\.html|index(-[a-z0-9-]+)?\.html)$/i;
				var BREADCRUMB_SEL = 'nav.crumbs, nav[aria-label="breadcrumbs"], .breadcrumbs';

				// Найдём breadcrumbs-контейнеры и пометим их, чтобы потом не подменять
				// ссылки внутри (там «Главная» прячется, а не переименовывается).
				var crumbContainers = Array.from(document.querySelectorAll(BREADCRUMB_SEL));

				// Заменяем текстовый узел «Главная» на «К занятиям» — без потери svg/иконок.
				function relabelHomeTo(a, label) {
					var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null);
					var n;
					while ((n = w.nextNode())) {
						if (n.nodeValue && /главная/i.test(n.nodeValue)) {
							n.nodeValue = n.nodeValue.replace(/главная/i, label);
						}
					}
				}

				document.querySelectorAll('a').forEach(function (a) {
					if (a.dataset.iqmoKeepHref === '1') return;
					var text = (a.textContent || '').trim().toLowerCase();
					var href = (a.getAttribute('href') || '').trim();
					if (text === 'мои предметы' && HOME_HREF_RE.test(href)) {
						a.setAttribute('href', preferred);
						return;
					}
					if (text !== 'главная') return;
					if (!HOME_HREF_RE.test(href)) return;
					var inCrumbs = crumbContainers.some(function (c) { return c.contains(a); });
					if (inCrumbs) return;
					a.setAttribute('href', preferred);
					relabelHomeTo(a, 'К занятиям');
					a.setAttribute('aria-label', 'К занятиям');
				});

				// breadcrumbs: «Главная» прячем (она дублирует шапку — для авторизованного
				// пользователя бесполезна, переход уже есть в кнопке «К занятиям»).
				crumbContainers.forEach(function (nav) {
					nav.querySelectorAll('a').forEach(function (a) {
						if (a.dataset.iqmoKeepHref === '1') return;
						var text = (a.textContent || '').trim().toLowerCase();
						var href = (a.getAttribute('href') || '').trim();
						if (!HOME_HREF_RE.test(href)) return;
						if (text === 'главная') {
							a.style.display = 'none';
							var sep = a.nextElementSibling;
							if (sep && sep.classList && (sep.classList.contains('crumbs__sep') || sep.classList.contains('breadcrumbs__sep'))) {
								sep.style.display = 'none';
							}
						}
					});
				});
			} catch (eHome) {}
		}

		return loggedIn;
	}

	window.__iqmoAuthReady = run();

	// iqmo-sync.js подтверждает сессию позже; без повторной проверки шапка могла остаться «Вход».
	window.addEventListener('iqmo-sync-ready', function () {
		window.__iqmoAuthReady.then(function (navAuthed) {
			var syncAuthed = !!(window.IqmoSync && typeof window.IqmoSync.isAuthed === 'function' && window.IqmoSync.isAuthed());
			if (navAuthed !== syncAuthed) {
				window.__iqmoMe = new Promise(function (res) { meResolve = res; });
				window.__iqmoAuthReady = run();
			}
		});
	});
})();
