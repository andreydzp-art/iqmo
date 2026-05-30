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

	function refresh(fromSync) {
		if (!global.IqmoProfileData || !global.IqmoProfileRender) return;
		var data = IqmoProfileData.build(meUser);
		IqmoProfileRender.render(data, { preserveHero: !!fromSync });
		syncProfAuthVisibility(!!(meUser && meUser.id != null));
		syncLiveActivityProfile();
		tryCelebrate(data);
	}

	function syncLiveActivityProfile() {
		try {
			var pub = document.getElementById('prof-live-activity-public');
			if (pub && global.IqmoLiveActivity) {
				pub.checked = !!IqmoLiveActivity.readPublicOptIn();
			}
		} catch (eLive) {}
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
			if (!global.ChemProgress || !ChemProgress.consumeProfileCelebration) return;
			var lvl = data.profileData && data.profileData.level;
			var title = data.profileData && data.profileData.levelTitle;
			if (ChemProgress.consumeProfileCelebration('level_up')) {
				iqmoCelebrate('Уровень ' + (lvl || '') + (title ? ' · «' + title + '»' : '') + '!');
				return;
			}
			if (ChemProgress.consumeProfileCelebration('three_tests')) {
				iqmoCelebrate('Награда «Тройка тестов»!');
			}
		} catch (e) {}
	}

	var _profConfettiPromise = null;

	function loadConfetti() {
		if (_profConfettiPromise) return _profConfettiPromise;
		_profConfettiPromise = new Promise(function (resolve) {
			if (global.confetti) return resolve(global.confetti);
			var s = document.createElement('script');
			s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
			s.async = true;
			s.onload = function () { resolve(global.confetti); };
			s.onerror = function () { resolve(null); };
			document.head.appendChild(s);
		});
		return _profConfettiPromise;
	}

	function fireConfetti() {
		loadConfetti().then(function (c) {
			if (!c) return;
			c({
				particleCount: 90,
				spread: 72,
				origin: { y: 0.62 },
				colors: ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b']
			});
		});
	}

	function iqmoToast(msg) {
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

	function iqmoCelebrate(msg) {
		iqmoToast(msg);
		try {
			if (global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		} catch (eR) {}
		fireConfetti();
	}

	function bindAccountHandlers() {
		if (bindAccountHandlers._bound) return;
		bindAccountHandlers._bound = true;

		document.addEventListener('submit', function (e) {
			var form = e.target.closest('#prof-name-form, #prof-hero-name-form');
			if (!form) return;
			e.preventDefault();
			var input = form.id === 'prof-hero-name-form'
				? document.getElementById('prof-hero-name-input')
				: document.getElementById('prof-display-name');
			if (!input || !global.IqmoProfileData || !IqmoProfileData.saveDisplayName) return;
			var res = IqmoProfileData.saveDisplayName(input.value);
			if (!res.ok) {
				iqmoToast(res.error === 'invalid'
					? 'Имя: 2–32 символа, буквы, цифры, пробел или дефис'
					: 'Не удалось сохранить имя');
				return;
			}
			refresh();
			iqmoToast(res.name ? 'Имя в профиле обновлено' : 'Имя сброшено');
		});

		document.addEventListener('change', function (e) {
			var livePub = e.target.closest('#prof-live-activity-public');
			if (!livePub || !global.IqmoLiveActivity || !IqmoLiveActivity.setPublicOptIn) return;
			IqmoLiveActivity.setPublicOptIn(!!livePub.checked);
		});

		document.addEventListener('click', async function (e) {
			// Toggle inline-edit для имени в карточке «Имя в профиле».
			// Карточка имеет data-mode="display"|"edit"; кнопка
			// «Редактировать» переводит в edit, кнопка «Отмена» — обратно.
			var nameEditBtn = e.target.closest('#prof-name-edit-toggle');
			if (nameEditBtn) {
				var card = nameEditBtn.closest('.prof-card-acc--name');
				if (card) {
					card.setAttribute('data-mode', 'edit');
					var inp = card.querySelector('#prof-display-name');
					if (inp) { try { inp.focus(); inp.select(); } catch (e0) {} }
				}
				return;
			}
			var nameCancelBtn = e.target.closest('#prof-name-edit-cancel');
			if (nameCancelBtn) {
				var cardC = nameCancelBtn.closest('.prof-card-acc--name');
				if (cardC) cardC.setAttribute('data-mode', 'display');
				return;
			}

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
					setTimeout(function () { copyBtn.textContent = 'Копировать'; }, 1800);
				} catch (errCopy) {}
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
		});
	}

	function wipeLocalUserData() {
		var WIPE_PREFIXES = ['iqmo-chem-', 'iqmo-bio-', 'iqmo:chem:', 'iqmo_purchase_', 'iqmo_express_start_'];
		var WIPE_KEYS = ['iqmo-analytics-queue-v1', 'iqmo-regnudge-dismissed-at', 'iqmo-last-uid', 'iqmo_auth_hint', 'iqmo-avatar-v1', 'iqmo-avatar-customized-v1'];
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
		if (global.IqmoProfileRender && IqmoProfileRender.bindAvatarPicker) {
			IqmoProfileRender.bindAvatarPicker();
		}
		if (global.IqmoProfileRender && IqmoProfileRender.bindNameEdit) {
			IqmoProfileRender.bindNameEdit();
		}
		if (global.IqmoProfileRender && IqmoProfileRender.bindAchievementsFilter) {
			IqmoProfileRender.bindAchievementsFilter();
		}
		publicProfileId = parsePublicProfileId();
		meUser = await fetchMe();
		bindAccountHandlers();

		if (publicProfileId) {
			await loadPublicProfile(publicProfileId);
			return;
		}

		refresh(false);
		if (global.__IQMO_SYNC__) {
			global.addEventListener('iqmo-sync-ready', function () { refresh(true); }, { once: true });
		}
		global.addEventListener('iqmo-sync', function () { refresh(true); });
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
