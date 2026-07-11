// Синхронизация ключей localStorage iqmo-chem-* и iqmo-bio-* на сервер (после входа).
// Требует, чтобы сайт открывался с того же хоста, что и API (см. server/index.js), не file://
(function () {
	'use strict';

	const SYNC_PREFIXES = ['iqmo-chem-', 'iqmo-bio-', 'iqmo-avatar-'];

	function hasSyncPrefix(key) {
		if (typeof key !== 'string') return false;
		for (let i = 0; i < SYNC_PREFIXES.length; i++) {
			if (key.indexOf(SYNC_PREFIXES[i]) === 0) return true;
		}
		return false;
	}
	// Маркер «последний залогиненный пользователь» в этом браузере. Нужен для
	// изоляции прогресса между аккаунтами: без него localStorage остаётся от
	// предыдущего юзера, и при первом заходе нового аккаунта (state на сервере
	// пуст, локально — данные старого) `init()` бы запушил эти данные на новый
	// аккаунт. Перевели на отдельный ключ, а не на iqmo-chem-, чтобы он не
	// попал в reset «Сбросить данные химии» в профиле.
	const LAST_UID_KEY = 'iqmo-last-uid';
	const API = typeof window.__IQMO_API_BASE__ === 'string' ? window.__IQMO_API_BASE__ : '';

	let lastKnownRevision = null;
	let dirtyTimer = null;
	let authed = false;
	let initSettled = false;
	// UID, под которым эта вкладка стартовала (записывается в init() после
	// /api/me). Не меняется в течение жизни вкладки. Используется в двух
	// местах для защиты от stale-tab race (audit #4):
	//   1. (client-side) Перед каждым push сравниваем с актуальным значением
	//      localStorage[LAST_UID_KEY]. Если они разошлись — другая вкладка
	//      сменила пользователя, и эта вкладка stale: не push'им, иначе
	//      данные A уйдут под cookie B.
	//   2. (server-side) Включаем myUid в payload как expected_user_id;
	//      если на сервере request->user_id (из JWT cookie) с ним не
	//      совпадает, контроллер отвергает PUT с 409 user_mismatch.
	let myUid = null;
	let staleUid = false;

	window.__IQMO_SYNC__ = true;

	function markDirty() {
		clearTimeout(dirtyTimer);
		dirtyTimer = setTimeout(function () {
			pushState(false);
		}, 3500);
	}

	/** Незавершённый вариант (?v=N): не удалять при pull, пока сервер ещё не получил ключ. */
	function isInProgressTestVariantKey(k) {
		if (typeof k !== 'string' || !/^iqmo-(chem|bio)-v-\d+$/.test(k)) return false;
		try {
			var raw = localStorage.getItem(k);
			if (!raw) return false;
			var s = JSON.parse(raw);
			return !!(s && typeof s === 'object' && !s.finished);
		} catch (e) {
			return false;
		}
	}

	// Перехватываем мутации только у window.localStorage (instance-shadowing),
	// а не у Storage.prototype: иначе любой sessionStorage.clear()/setItem()
	// тоже будет триггерить markDirty() через общий прототип. Sync-у нужно
	// знать только о записи в долговременное хранилище — в sessionStorage
	// мы ничего не синхронизируем.
	try {
		const ls = window.localStorage;
		const origSet = ls.setItem.bind(ls);
		const origRemove = ls.removeItem.bind(ls);
		const origClear = ls.clear.bind(ls);
		ls.setItem = function (key, val) {
			origSet(key, val);
			if (!hasSyncPrefix(key)) return;
			if (isInProgressTestVariantKey(key)) {
				clearTimeout(dirtyTimer);
				dirtyTimer = setTimeout(function () {
					pushState(false);
				}, 800);
			} else markDirty();
		};
		ls.removeItem = function (key) {
			origRemove(key);
			if (hasSyncPrefix(key)) markDirty();
		};
		ls.clear = function () {
			origClear();
			markDirty();
		};
	} catch (e) {}

	function collectKeys() {
		const out = {};
		try {
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (k && hasSyncPrefix(k)) out[k] = localStorage.getItem(k);
			}
		} catch (e) {}
		return out;
	}

	// Все user-scoped ключи, которые нужно стирать при смене пользователя
	// и при logout. Сюда попадает не только iqmo-chem-* (синхронизируется
	// на сервер), но и iqmo-bio-* (живёт только локально — для биологии
	// серверный sync ещё не реализован, поэтому без локальной очистки
	// прогресс прошлого юзера протекал в новый аккаунт). Плюс несколько
	// точечных ключей: очередь аналитики (события прошлого юзера могли
	// быть отправлены от имени нового) и состояние регистрационного
	// nudge'а (новый юзер должен решать сам, дисмиссить ли).
	// Не трогаем iqmo_auth_hint и iqmo-last-uid — это служебные флаги,
	// ими управляют отдельные кодпути.
	// Префиксы и точечные ключи для wipe при logout / смене пользователя.
	// Если добавляешь сюда — синхронно дополняй такие же массивы в
	// iqmo-nav.js (logout) и в delete-обработчике в extracted/profile/index.html.
	// Префиксы покрывают:
	//   iqmo-chem-*           — прогресс химии (синкается на сервер)
	//   iqmo-bio-*            — прогресс биологии (синкается на сервер)
	//   iqmo:chem:*           — двоеточная схема (warmup-chemistry, iqmo:chem:catWrong:<id>)
	//   iqmo_purchase_*       — commerce-dedup (uploads/thank.html: iqmo_purchase_done_<date>, _id)
	//   iqmo_express_start_*  — easy-test express stage (uploads/easy-test.html)
	const USER_SCOPED_PREFIXES = [
		'iqmo-chem-',
		'iqmo-bio-',
		'iqmo:chem:',
		'iqmo_purchase_',
		'iqmo_express_start_'
	];
	const USER_SCOPED_KEYS = ['iqmo-analytics-queue-v1', 'iqmo-regnudge-dismissed-at', 'iqmo-avatar-v1', 'iqmo-avatar-customized-v1'];

	function isUserScopedKey(k) {
		if (typeof k !== 'string') return false;
		for (let i = 0; i < USER_SCOPED_PREFIXES.length; i++) {
			if (k.indexOf(USER_SCOPED_PREFIXES[i]) === 0) return true;
		}
		for (let j = 0; j < USER_SCOPED_KEYS.length; j++) {
			if (k === USER_SCOPED_KEYS[j]) return true;
		}
		return false;
	}

	function wipeUserScopedKeys() {
		try {
			const toRemove = [];
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (isUserScopedKey(k)) toRemove.push(k);
			}
			for (let j = 0; j < toRemove.length; j++) {
				localStorage.removeItem(toRemove[j]);
			}
		} catch (e) {}
	}

	// Stale-tab guard (audit #4). Эта вкладка считается stale, если другая
	// вкладка в этом браузере сменила залогиненного пользователя (logout +
	// login другого аккаунта без перезагрузки нашей вкладки). Сценарий:
	//   1. Tab A открыта и init() прошёл под user A → myUid = A.
	//   2. В tab B пользователь делает logout + login B. iqmo-nav.js
	//      стирает iqmo-last-uid (logout) → init() в tab B пишет B.
	//   3. Tab A об этом не знает — её JS уже инициализирован, cookie у
	//      браузера общая (теперь на B). Без guard'а её следующий push
	//      (interval/beforeunload) ушёл бы с keys A под cookie B → данные
	//      A залились бы в state B.
	// Двойная защита: client-side (этот guard) + server-side
	// (expected_user_id в payload, контроллер вернёт 409 user_mismatch).
	function isStale() {
		if (staleUid) return true;
		try {
			const stored = localStorage.getItem(LAST_UID_KEY);
			if (myUid != null && stored != null && String(stored) !== String(myUid)) {
				staleUid = true;
				return true;
			}
		} catch (e) {}
		return false;
	}

	function applyKeys(obj) {
		if (!obj || typeof obj !== 'object') return;

		for (let pi = 0; pi < SYNC_PREFIXES.length; pi++) {
			var prefix = SYNC_PREFIXES[pi];
			var serverHasPrefix = false;
			var incoming = Object.keys(obj);
			for (let i = 0; i < incoming.length; i++) {
				if (incoming[i].indexOf(prefix) === 0) {
					serverHasPrefix = true;
					break;
				}
			}

			// Сервер не прислал ни одного ключа префикса (bio раньше не синкалась) —
			// локальный прогресс по этому предмету не трогаем.
			if (!serverHasPrefix) continue;

			var toRemove = [];
			try {
				for (let j = 0; j < localStorage.length; j++) {
					var k = localStorage.key(j);
					if (k && k.indexOf(prefix) === 0 && !Object.prototype.hasOwnProperty.call(obj, k)) {
						if (isInProgressTestVariantKey(k)) continue;
						toRemove.push(k);
					}
				}
			} catch (e) {}
			for (let r = 0; r < toRemove.length; r++) {
				try {
					localStorage.removeItem(toRemove[r]);
				} catch (e2) {}
			}
			for (let n = 0; n < incoming.length; n++) {
				var key = incoming[n];
				if (key.indexOf(prefix) !== 0) continue;
				try {
					var v = obj[key];
					if (v == null) localStorage.removeItem(key);
					else localStorage.setItem(key, String(v));
				} catch (e3) {}
			}
		}
	}

	async function pullState() {
		const r = await fetch(API + '/api/profile/state', { credentials: 'include' });
		if (r.status === 401) return { ok: false, auth: false };
		if (!r.ok) return { ok: false };
		const j = await r.json();
		applyKeys(j.keys || {});
		lastKnownRevision = j.revision;
		try {
			window.dispatchEvent(new CustomEvent('iqmo-sync', { detail: { type: 'pull' } }));
		} catch (e) {}
		return { ok: true, revision: j.revision };
	}

	function buildPushBody(keys) {
		const body = { baseRevision: lastKnownRevision, keys: keys };
		// expected_user_id — server-side проверка на stale-tab race.
		// Бэкенд (IqmoProfileController::statePut) вернёт 409 user_mismatch,
		// если cookie на проде указывает на другой UID. Не отправляем при
		// myUid == null (то есть до завершения init или для гостей).
		if (myUid != null) body.expected_user_id = Number(myUid);
		return JSON.stringify(body);
	}

	// Сериализация push'ей (audit): 90s-interval, 3.5s-debounce (markDirty),
	// явный IqmoSync.pushState() раньше могли лететь одновременно, каждый со
	// своим baseRevision → 409-гонки и потеря обновлений. Мьютекс гарантирует
	// один PUT за раз; если во время него пришёл новый триггер — до-push
	// после завершения текущего (с уже обновлённым lastKnownRevision).
	let pushInFlight = null;
	let pushAgain = false;
	function pushState(force) {
		if (pushInFlight) {
			pushAgain = true;
			return pushInFlight;
		}
		pushInFlight = _pushStateImpl(force).finally(function () {
			pushInFlight = null;
			if (pushAgain) {
				pushAgain = false;
				pushState(false);
			}
		});
		return pushInFlight;
	}

	async function _pushStateImpl(force) {
		if (!authed) return;
		// Stale-tab guard. Если другая вкладка перелогинилась, наш push
		// уйдёт с данными старого юзера под cookie нового — защищаемся.
		if (isStale()) return;
		let keys = collectKeys();
		let r = await fetch(API + '/api/profile/state', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: buildPushBody(keys)
		});
		if (r.status === 401) return;
		if (r.status === 409) {
			let j = {};
			try {
				j = await r.json();
			} catch (e) {}
			// Сервер тоже ловит stale-tab (defense-in-depth). Если ответ —
			// user_mismatch, не пытаемся retry: cookie указывает не на нас,
			// retry с теми же expected_user_id даст ту же 409 — петля без
			// смысла. Просто отмечаем stale и выходим.
			if (j && j.error === 'user_mismatch') {
				staleUid = true;
				return;
			}
			if (j.server && j.server.keys) {
				applyKeys(j.server.keys);
				lastKnownRevision = j.server.revision;
				try {
					window.dispatchEvent(new CustomEvent('iqmo-sync', { detail: { type: 'conflict' } }));
				} catch (e) {}
			}
			keys = collectKeys();
			r = await fetch(API + '/api/profile/state', {
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: buildPushBody(keys)
			});
		}
		if (!r.ok) return;
		let j;
		try {
			j = await r.json();
		} catch (e) {
			return;
		}
		lastKnownRevision = j.revision;
		try {
			window.dispatchEvent(new CustomEvent('iqmo-sync', { detail: { type: 'push' } }));
		} catch (e) {}
	}

	async function init() {
		try {
			const me = await fetch(API + '/api/me', { credentials: 'include', cache: 'no-store' });
			authed = me.ok;
			if (!authed) return;

			// Кто сейчас залогинен и кто был залогинен в прошлый раз на этом
			// устройстве. Если это разные аккаунты — локальные iqmo-chem-* /
			// iqmo-bio-* нельзя доверять (это прогресс ушедшего юзера), и нельзя
			// пушить их на сервер нового аккаунта. Сценарий, который этот блок предотвращает: админ
			// разлогинился, регистрируется новый андроид@…; до фикса его профиль
			// сразу показывал XP/уровни/серию админа, потому что серверный state
			// был пуст, а локальный — нет, и init() заливал старое на новый аккаунт.
			let currentUid = null;
			try {
				const meData = await me.json();
				if (meData && meData.id != null) currentUid = String(meData.id);
			} catch (eMe) {}

			let userChanged = false;
			try {
				const lastUid = localStorage.getItem(LAST_UID_KEY);
				if (currentUid != null && lastUid != null && lastUid !== currentUid) {
					userChanged = true;
					wipeUserScopedKeys();
				}
			} catch (eLast) {}

			const st = await fetch(API + '/api/profile/state', { credentials: 'include' });
			if (!st.ok) return;
			const j = await st.json();
			const local = collectKeys();
			const serverKeys = j.keys || {};
			const serverEmpty = Object.keys(serverKeys).length === 0;
			// «Server пуст + local не пуст → push» оставляем только когда юзер
			// не менялся: это нормальный сценарий «гость накопил прогресс →
			// залогинился впервые → синхронизируем гостевой прогресс на аккаунт».
			// При смене юзера local уже очищен выше; всё равно идём в else-ветку
			// и принимаем сервер как источник правды (в т.ч. пустой → у нового
			// аккаунта чистый старт).
			if (serverEmpty && Object.keys(local).length > 0 && !userChanged) {
				lastKnownRevision = j.revision;
				await pushState(true);
			} else {
				applyKeys(serverKeys);
				lastKnownRevision = j.revision;
			}

			try {
				if (currentUid != null) localStorage.setItem(LAST_UID_KEY, currentUid);
			} catch (eUid) {}

			// Фиксируем UID этой вкладки до конца её жизни. Любое
			// несовпадение localStorage[LAST_UID_KEY] с myUid означает, что
			// другая вкладка успела перелогиниться (см. isStale).
			myUid = currentUid;

			// storage-event приходит в эту вкладку, когда ДРУГАЯ вкладка
			// меняет localStorage. В своей же вкладке он не fires. Нам
			// достаточно поймать момент logout/login в другой вкладке: там
			// меняется LAST_UID_KEY (writeback в init() новой вкладки) или
			// он удаляется (logout-handler в iqmo-nav.js). После этого
			// эта вкладка stale — push'ить нельзя.
			window.addEventListener('storage', function (ev) {
				if (!ev || ev.key !== LAST_UID_KEY) return;
				if (myUid == null) return;
				if (ev.newValue == null) {
					// Logout в другой вкладке стёр маркер.
					staleUid = true;
					return;
				}
				if (String(ev.newValue) !== String(myUid)) {
					// Другая вкладка залогинила другого юзера.
					staleUid = true;
				}
			});

			setInterval(function () {
				pushState(false);
			}, 90000);

			window.addEventListener('beforeunload', function () {
				if (!authed) return;
				if (isStale()) return;
				try {
					const keys = collectKeys();
					const body = buildPushBody(keys);
					fetch(API + '/api/profile/state', {
						method: 'PUT',
						credentials: 'include',
						headers: { 'Content-Type': 'application/json' },
						body: body,
						keepalive: true
					});
				} catch (e) {}
			});
		} catch (e) {
			authed = false;
		} finally {
			initSettled = true;
			try {
				window.dispatchEvent(
					new CustomEvent('iqmo-sync-ready', { detail: { authed: authed } })
				);
			} catch (e2) {}
		}
	}

	function whenReady() {
		if (initSettled) return Promise.resolve({ authed: authed });
		return new Promise(function (resolve) {
			window.addEventListener(
				'iqmo-sync-ready',
				function () {
					resolve({ authed: authed });
				},
				{ once: true }
			);
		});
	}

	window.IqmoSync = {
		collectKeys: collectKeys,
		applyKeys: applyKeys,
		pullState: pullState,
		pushState: function () {
			return pushState(true);
		},
		getRevision: function () {
			return lastKnownRevision;
		},
		isAuthed: function () {
			return authed;
		},
		whenReady: whenReady,
		refreshAuth: async function () {
			try {
				const me = await fetch(API + '/api/me', { credentials: 'include', cache: 'no-store' });
				authed = me.ok;
				return authed;
			} catch (e) {
				authed = false;
				return false;
			}
		}
	};

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
	else init();
})();
