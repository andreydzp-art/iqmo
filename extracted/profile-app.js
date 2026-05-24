/**
 * IQMO profile — инициализация, аккаунт, sync, публичный режим.
 */
(function (global) {
	'use strict';

	var meUser = null;
	var publicProfileId = null;

	function parsePublicProfileId() {
		try {
			var m = global.location.pathname.match(/^\/profile\/IQ-(\d+)\/?$/i);
			if (!m) return null;
			return 'IQ-' + String(parseInt(m[1], 10)).padStart(4, '0');
		} catch (e) {
			return null;
		}
	}

	function refresh() {
		if (!global.IqmoProfileData || !global.IqmoProfileRender) return;
		var data = IqmoProfileData.build(meUser);
		IqmoProfileRender.render(data);
		syncProfAuthVisibility(!!(meUser && meUser.id != null));
		tryCelebrate(data);
	}

	function syncProfAuthVisibility(loggedIn) {
		document.querySelectorAll('#prof-root .iqmo-only-authed').forEach(function (el) {
			if (loggedIn) el.removeAttribute('hidden');
			else el.setAttribute('hidden', '');
		});
		document.querySelectorAll('#prof-root .iqmo-only-guest').forEach(function (el) {
			if (loggedIn) el.setAttribute('hidden', '');
			else el.removeAttribute('hidden');
		});
	}

	function tryCelebrate(data) {
		try {
			if (
				data.snap &&
				data.snap.badges &&
				data.snap.badges.three_tests &&
				global.ChemProgress &&
				ChemProgress.consumeProfileCelebration &&
				ChemProgress.consumeProfileCelebration('three_tests')
			) {
				iqmoBadgeFireworks();
			}
		} catch (e) {}
	}

	function iqmoBadgeFireworks() {
		function toast(msg) {
			var t = document.createElement('div');
			t.setAttribute('role', 'status');
			t.textContent = msg;
			t.style.cssText =
				'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:10001;' +
				'background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;padding:12px 20px;' +
				'border-radius:14px;font-weight:700;font-size:14px;box-shadow:0 12px 36px rgba(79,70,229,.42);';
			document.body.appendChild(t);
			setTimeout(function () {
				t.style.opacity = '0';
				t.style.transition = 'opacity .45s ease';
				setTimeout(function () { t.remove(); }, 460);
			}, 2600);
		}
		try {
			if (global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
				toast('Награда «Тройка тестов»!');
				return;
			}
		} catch (eR) {}
		toast('Награда «Тройка тестов»!');
	}

	function bindAccountHandlers() {
		if (bindAccountHandlers._bound) return;
		bindAccountHandlers._bound = true;

		document.addEventListener('click', async function (e) {
			var copyBtn = e.target.closest('#prof-copy-link');
			if (copyBtn) {
				var href = copyBtn.getAttribute('data-copy-href') || '';
				var url = href ? (global.location.origin + href) : '';
				try {
					if (navigator.clipboard && navigator.clipboard.writeText) {
						await navigator.clipboard.writeText(url);
					} else {
						prompt('Скопируйте ссылку:', url);
					}
					copyBtn.textContent = 'Скопировано';
					setTimeout(function () { copyBtn.textContent = 'Копировать ссылку'; }, 1800);
				} catch (errCopy) {}
				return;
			}

			var resetBtn = e.target.closest('#prof-reset');
			if (resetBtn) {
				if (!confirm('Удалить все данные IQMO по химии в этом браузере (и на сервере, если вы вошли)?')) return;
				var CHEM_PREFIXES = ['iqmo-chem-', 'iqmo:chem:'];
				try {
					for (var i = localStorage.length - 1; i >= 0; i--) {
						var k = localStorage.key(i);
						if (!k) continue;
						for (var p = 0; p < CHEM_PREFIXES.length; p++) {
							if (k.indexOf(CHEM_PREFIXES[p]) === 0) {
								localStorage.removeItem(k);
								break;
							}
						}
					}
				} catch (err) {
					alert('Ошибка: ' + (err.message || err));
					return;
				}
				try {
					if (global.IqmoSync && IqmoSync.isAuthed && IqmoSync.isAuthed()) {
						await fetch('/api/profile/state', {
							method: 'PUT',
							credentials: 'include',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ baseRevision: null, keys: {} })
						});
					}
				} catch (e2) {}
				location.reload();
				return;
			}

			var logoutBtn = e.target.closest('#prof-logout-everywhere');
			if (logoutBtn) {
				if (!confirm('Завершить сессии на всех устройствах? На этом устройстве вход тоже будет завершён.')) return;
				logoutBtn.disabled = true;
				var logoutStatus = document.getElementById('prof-logout-everywhere-status');
				if (logoutStatus) {
					logoutStatus.hidden = false;
					logoutStatus.textContent = 'Завершаем сессии…';
				}
				try {
					var r = await fetch('/api/auth/logout-everywhere', {
						method: 'POST',
						credentials: 'include',
						headers: { Accept: 'application/json' }
					});
					if (!r.ok) {
						if (logoutStatus) logoutStatus.textContent = 'Не удалось (HTTP ' + r.status + ').';
						logoutBtn.disabled = false;
						return;
					}
				} catch (eLE) {
					if (logoutStatus) logoutStatus.textContent = 'Сеть недоступна.';
					logoutBtn.disabled = false;
					return;
				}
				wipeLocalUserData();
				location.href = '/login.html';
				return;
			}

			var deleteBtn = e.target.closest('#prof-delete-account');
			if (deleteBtn) {
				if (!confirm('Удалить аккаунт без возможности восстановления?')) return;
				var typed = prompt('Введите слово УДАЛИТЬ заглавными буквами:');
				var deleteStatus = document.getElementById('prof-delete-status');
				if (typed !== 'УДАЛИТЬ') {
					if (deleteStatus) {
						deleteStatus.hidden = false;
						deleteStatus.textContent = 'Подтверждение не получено.';
					}
					return;
				}
				deleteBtn.disabled = true;
				if (deleteStatus) {
					deleteStatus.hidden = false;
					deleteStatus.textContent = 'Удаляем…';
				}
				try {
					var rDel = await fetch('/api/auth/me', {
						method: 'DELETE',
						credentials: 'include',
						headers: { Accept: 'application/json' }
					});
					if (!rDel.ok) {
						if (deleteStatus) deleteStatus.textContent = 'Не удалось (HTTP ' + rDel.status + ').';
						deleteBtn.disabled = false;
						return;
					}
				} catch (e3) {
					if (deleteStatus) deleteStatus.textContent = 'Сеть недоступна.';
					deleteBtn.disabled = false;
					return;
				}
				wipeLocalUserData();
				location.href = '/';
			}
		});
	}

	function wipeLocalUserData() {
		var WIPE_PREFIXES = ['iqmo-chem-', 'iqmo-bio-', 'iqmo:chem:', 'iqmo_purchase_', 'iqmo_express_start_'];
		var WIPE_KEYS = ['iqmo-analytics-queue-v1', 'iqmo-regnudge-dismissed-at', 'iqmo-last-uid', 'iqmo_auth_hint'];
		try {
			for (var i = localStorage.length - 1; i >= 0; i--) {
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
				if (matched) localStorage.removeItem(k);
			}
		} catch (e) {}
	}

	async function fetchMe() {
		try {
			var r = await fetch('/api/me', { credentials: 'include', cache: 'no-store' });
			if (!r.ok) return null;
			return await r.json();
		} catch (e) {
			return null;
		}
	}

	async function loadPublicProfile(profileId) {
		var root = document.getElementById('prof-root');
		try {
			var r = await fetch('/api/profile/' + encodeURIComponent(profileId), { cache: 'no-store' });
			if (!r.ok) {
				if (root && global.IqmoProfileRender && IqmoProfileRender.renderError) {
					root.innerHTML = IqmoProfileRender.renderError(r.status === 404 ? 'Профиль не найден' : 'Не удалось загрузить профиль');
				}
				return;
			}
			var data = await r.json();
			data.viewerMe = meUser;
			if (global.IqmoProfileRender) IqmoProfileRender.render(data);
			document.title = 'IQMO — Профиль ' + profileId;
		} catch (eLoad) {
			if (root && global.IqmoProfileRender && IqmoProfileRender.renderError) {
				root.innerHTML = IqmoProfileRender.renderError('Сеть недоступна');
			}
		}
	}

	async function init() {
		if (global.IqmoProfileRender && IqmoProfileRender.bindCollectibles) {
			IqmoProfileRender.bindCollectibles();
		}
		publicProfileId = parsePublicProfileId();
		meUser = await fetchMe();
		bindAccountHandlers();

		if (publicProfileId) {
			await loadPublicProfile(publicProfileId);
			return;
		}

		refresh();
		global.addEventListener('iqmo-sync', refresh);
		global.addEventListener('iqmo-sync-ready', refresh);
	}

	global.IqmoProfileApp = {
		init: init,
		refresh: refresh,
		parsePublicProfileId: parsePublicProfileId
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})(typeof window !== 'undefined' ? window : global);
