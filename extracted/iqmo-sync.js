// Синхронизация ключей localStorage с префиксом iqmo-chem-* на сервер (после входа).
// Требует, чтобы сайт открывался с того же хоста, что и API (см. server/index.js), не file://
(function () {
	'use strict';

	const PREFIX = 'iqmo-chem-';
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

	window.__IQMO_SYNC__ = true;

	function markDirty() {
		clearTimeout(dirtyTimer);
		dirtyTimer = setTimeout(function () {
			pushState(false);
		}, 3500);
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
			if (typeof key === 'string' && key.indexOf(PREFIX) === 0) markDirty();
		};
		ls.removeItem = function (key) {
			origRemove(key);
			if (typeof key === 'string' && key.indexOf(PREFIX) === 0) markDirty();
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
				if (k && k.indexOf(PREFIX) === 0) out[k] = localStorage.getItem(k);
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
	//   iqmo-bio-*            — прогресс биологии (только локально, серверный sync ещё не реализован)
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
	const USER_SCOPED_KEYS = ['iqmo-analytics-queue-v1', 'iqmo-regnudge-dismissed-at'];

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

	function applyKeys(obj) {
		if (!obj || typeof obj !== 'object') return;
		const incoming = Object.keys(obj);
		const toRemove = [];
		try {
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (k && k.indexOf(PREFIX) === 0) toRemove.push(k);
			}
		} catch (e) {}
		for (let j = 0; j < toRemove.length; j++) {
			if (!Object.prototype.hasOwnProperty.call(obj, toRemove[j])) {
				try {
					localStorage.removeItem(toRemove[j]);
				} catch (e) {}
			}
		}
		for (let n = 0; n < incoming.length; n++) {
			const k = incoming[n];
			if (k.indexOf(PREFIX) !== 0) continue;
			try {
				const v = obj[k];
				if (v == null) localStorage.removeItem(k);
				else localStorage.setItem(k, String(v));
			} catch (e) {}
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

	async function pushState(force) {
		if (!authed) return;
		let keys = collectKeys();
		let r = await fetch(API + '/api/profile/state', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ baseRevision: lastKnownRevision, keys })
		});
		if (r.status === 401) return;
		if (r.status === 409) {
			let j = {};
			try {
				j = await r.json();
			} catch (e) {}
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
				body: JSON.stringify({ baseRevision: lastKnownRevision, keys })
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
			// устройстве. Если это разные аккаунты — локальные iqmo-chem-* нельзя
			// доверять (это прогресс ушедшего юзера), и нельзя пушить их на сервер
			// нового аккаунта. Сценарий, который этот блок предотвращает: админ
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

			setInterval(function () {
				pushState(false);
			}, 90000);

			window.addEventListener('beforeunload', function () {
				if (!authed) return;
				try {
					const keys = collectKeys();
					const body = JSON.stringify({ baseRevision: lastKnownRevision, keys });
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
			try {
				window.dispatchEvent(
					new CustomEvent('iqmo-sync-ready', { detail: { authed: authed } })
				);
			} catch (e2) {}
		}
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
