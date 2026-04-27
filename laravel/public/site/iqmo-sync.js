// Синхронизация ключей localStorage с префиксом iqmo-chem-* на сервер (после входа).
// Требует, чтобы сайт открывался с того же хоста, что и API (см. server/index.js), не file://
(function () {
	'use strict';

	const PREFIX = 'iqmo-chem-';
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

	try {
		const proto = Storage.prototype;
		const origSet = proto.setItem;
		const origRemove = proto.removeItem;
		const origClear = proto.clear;
		proto.setItem = function (key, val) {
			origSet.call(this, key, val);
			if (typeof key === 'string' && key.indexOf(PREFIX) === 0) markDirty();
		};
		proto.removeItem = function (key) {
			origRemove.call(this, key);
			if (typeof key === 'string' && key.indexOf(PREFIX) === 0) markDirty();
		};
		proto.clear = function () {
			origClear.call(this);
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

			const st = await fetch(API + '/api/profile/state', { credentials: 'include' });
			if (!st.ok) return;
			const j = await st.json();
			const local = collectKeys();
			const serverKeys = j.keys || {};
			const serverEmpty = Object.keys(serverKeys).length === 0;
			if (serverEmpty && Object.keys(local).length > 0) {
				lastKnownRevision = j.revision;
				await pushState(true);
			} else {
				applyKeys(serverKeys);
				lastKnownRevision = j.revision;
			}

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
