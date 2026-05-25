/**
 * IQMO — аватары профиля (пресеты + свой файл, без «пола» в UI).
 * Хранение: localStorage `iqmo-avatar-v1`, синк на сервер через iqmo-sync.
 */
(function (global) {
	'use strict';

	var STORAGE_KEY = 'iqmo-avatar-v1';
	var CUSTOMIZED_KEY = 'iqmo-avatar-customized-v1';
	var MAX_BYTES = 2 * 1024 * 1024;
	var MAX_EDGE = 512;
	var ALLOWED_TYPES = { 'image/jpeg': 1, 'image/png': 1, 'image/webp': 1 };

	var PRESET_URL = {
		default: '/assets/avatars/avatar-default.png',
		boy: '/assets/avatars/avatar-boy.png',
		girl: '/assets/avatars/avatar-girl.png'
	};

	function lsGet() {
		try {
			var raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return null;
			return JSON.parse(raw);
		} catch (e) {
			return null;
		}
	}

	function lsSet(state) {
		try {
			if (!state) localStorage.removeItem(STORAGE_KEY);
			else localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (e) {
			return false;
		}
		return true;
	}

	function normalizeState(raw) {
		if (!raw || typeof raw !== 'object') return { preset: 'default' };
		var preset = raw.preset;
		if (preset === 'custom' && raw.custom && String(raw.custom).indexOf('data:image/') === 0) {
			return { preset: 'custom', custom: String(raw.custom) };
		}
		if (PRESET_URL[preset]) return { preset: preset };
		return { preset: 'default' };
	}

	function read() {
		return normalizeState(lsGet());
	}

	function save(state) {
		return lsSet(normalizeState(state));
	}

	function markCustomized() {
		try { localStorage.setItem(CUSTOMIZED_KEY, '1'); } catch (e) {}
	}

	function isPristine() {
		try {
			if (localStorage.getItem(CUSTOMIZED_KEY) === '1') return false;
			var raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return true;
			var s = normalizeState(JSON.parse(raw));
			return s.preset === 'default';
		} catch (e) {
			return true;
		}
	}

	function uploadLabel() {
		return read().preset === 'custom' ? 'Заменить свой аватар' : 'Загрузить свой';
	}

	function getUrl(state) {
		var s = normalizeState(state || read());
		if (s.preset === 'custom' && s.custom) return s.custom;
		return PRESET_URL[s.preset] || PRESET_URL.default;
	}

	function setPreset(preset) {
		if (!PRESET_URL[preset]) preset = 'default';
		save({ preset: preset });
		if (preset !== 'default') markCustomized();
		return getUrl({ preset: preset });
	}

	function fileToDataUrl(file) {
		return new Promise(function (resolve, reject) {
			if (!file || !ALLOWED_TYPES[file.type]) {
				reject(new Error('type'));
				return;
			}
			if (file.size > MAX_BYTES) {
				reject(new Error('size'));
				return;
			}
			var reader = new FileReader();
			reader.onload = function () {
				var img = new Image();
				img.onload = function () {
					var w = img.naturalWidth || img.width;
					var h = img.naturalHeight || img.height;
					if (!w || !h) {
						reject(new Error('decode'));
						return;
					}
					var scale = Math.min(1, MAX_EDGE / Math.max(w, h));
					var cw = Math.max(1, Math.round(w * scale));
					var ch = Math.max(1, Math.round(h * scale));
					var canvas = document.createElement('canvas');
					canvas.width = cw;
					canvas.height = ch;
					var ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, cw, ch);
					var outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
					var q = outType === 'image/jpeg' ? 0.88 : undefined;
					try {
						resolve(canvas.toDataURL(outType, q));
					} catch (eC) {
						reject(eC);
					}
				};
				img.onerror = function () { reject(new Error('decode')); };
				img.src = reader.result;
			};
			reader.onerror = function () { reject(new Error('read')); };
			reader.readAsDataURL(file);
		});
	}

	function setCustomFromFile(file) {
		return fileToDataUrl(file).then(function (dataUrl) {
			if (dataUrl.length > 900000) {
				return Promise.reject(new Error('size'));
			}
			save({ preset: 'custom', custom: dataUrl });
			markCustomized();
			return dataUrl;
		});
	}

	/** URL из JSON строки profile_state (публичный профиль / API). */
	function urlFromStoredJson(raw) {
		if (raw == null || raw === '') return PRESET_URL.default;
		try {
			var parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
			return getUrl(parsed);
		} catch (e) {
			return PRESET_URL.default;
		}
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	/**
	 * @param {HTMLElement} el
	 * @param {{ url?: string, fallbackText?: string, imgClass?: string, title?: string }} opts
	 */
	function paint(el, opts) {
		if (!el) return;
		opts = opts || {};
		var url = opts.url || getUrl();
		var fb = opts.fallbackText != null ? String(opts.fallbackText) : '';
		var title = opts.title || '';
		if (title) el.setAttribute('title', title);
		el.classList.add('iqmo-av--has-img');
		el.innerHTML =
			'<img class="' + (opts.imgClass || 'iqmo-av-img') + '" src="' + esc(url) + '" alt="" decoding="async" />' +
			(fb ? '<span class="iqmo-av-fallback" aria-hidden="true">' + esc(fb) + '</span>' : '');
	}

	function paintNavAndCards() {
		var url = getUrl();
		var nav = document.getElementById('nav-avatar');
		var snap = global.ChemProgress && ChemProgress.getGamificationSnapshot
			? ChemProgress.getGamificationSnapshot()
			: {};
		var lvl = (snap.level && snap.level.current) || 1;
		var fb = String(lvl);
		var title = 'Уровень ' + lvl;
		if (nav) paint(nav, { url: url, fallbackText: fb, title: title, imgClass: 'iqmo-av-img iqmo-av-img--nav' });
		var pc = document.getElementById('pc-avatar');
		if (pc) paint(pc, { url: url, fallbackText: fb, title: title, imgClass: 'iqmo-av-img iqmo-av-img--pcard' });
	}

	function ensureCss() {
		if (document.getElementById('iqmo-avatar-css')) return;
		var s = document.createElement('style');
		s.id = 'iqmo-avatar-css';
		s.textContent =
			'.iqmo-av--has-img{position:relative;overflow:hidden;padding:0!important}' +
			'.iqmo-av--has-img .iqmo-av-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block}' +
			'.iqmo-av--has-img .iqmo-av-fallback{display:none}' +
			'.iqmo-av-img--nav{border-radius:999px}' +
			'.pcard__avatar.iqmo-av--has-img,.topnav .avatar.iqmo-av--has-img{background:transparent!important;color:transparent!important}';
		document.head.appendChild(s);
	}

	function syncProfileDom(url) {
		url = url || getUrl();
		var heroImg = document.querySelector('[data-avatar-hero-img]');
		if (heroImg) heroImg.src = url;
		var badge = document.querySelector('.iqmo-hero .av-cam-badge');
		if (badge && !isPristine()) badge.classList.remove('is-hint');
		paintNavAndCards();
		var ach = document.querySelector('.prof-ach-avatar');
		if (ach) ach.src = url;
	}

	global.IqmoAvatar = {
		STORAGE_KEY: STORAGE_KEY,
		CUSTOMIZED_KEY: CUSTOMIZED_KEY,
		PRESET_URL: PRESET_URL,
		MAX_BYTES: MAX_BYTES,
		read: read,
		save: save,
		getUrl: getUrl,
		setPreset: setPreset,
		setCustomFromFile: setCustomFromFile,
		urlFromStoredJson: urlFromStoredJson,
		isPristine: isPristine,
		uploadLabel: uploadLabel,
		syncProfileDom: syncProfileDom,
		paint: paint,
		paintNavAndCards: paintNavAndCards,
		ensureCss: ensureCss
	};

	ensureCss();
})(typeof window !== 'undefined' ? window : global);
