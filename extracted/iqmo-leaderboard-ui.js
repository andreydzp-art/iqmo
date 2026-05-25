/**
 * Ссылки на публичные профили в блоках лидерборда (/profile/IQ-xxxx).
 */
(function (global) {
	'use strict';

	if (!document.getElementById('iqmo-lb-profile-link-css')) {
		var st = document.createElement('style');
		st.id = 'iqmo-lb-profile-link-css';
		st.textContent =
			'a.iqmo-lb-profile-link{color:inherit;text-decoration:none}' +
			'a.iqmo-lb-profile-link:hover{text-decoration:underline}' +
			'a.iqmo-lb-profile-link:focus-visible{outline:2px solid #6366f1;outline-offset:2px;border-radius:4px}' +
			'.pf__avatar--img{padding:0!important;overflow:hidden;background:transparent!important;color:transparent}' +
			'.pf__avatar--img img{width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block}';
		document.head.appendChild(st);
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function profileHref(it) {
		if (!it) return '';
		if (it.is_me) return '/profile/';
		if (it.profileId) return '/profile/' + it.profileId;
		if (it.uid != null) return '/profile/IQ-' + String(it.uid).padStart(4, '0');
		return '';
	}

	/**
	 * @param {{ is_me?: boolean, display?: string, uid?: number, profileId?: string }} it
	 * @param {{ className?: string, style?: string, tag?: string, link?: boolean }} opts
	 */
	function profileNameHtml(it, opts) {
		opts = opts || {};
		var tag = opts.tag || 'span';
		var cls = opts.className || '';
		var styleAttr = opts.style ? (' style="' + esc(opts.style) + '"') : '';
		var nameRaw = it.is_me ? 'Вы' : (it.display || 'user');
		var name = esc(nameRaw);
		var href = profileHref(it);
		if (href && opts.link !== false) {
			return '<a class="' + cls + ' iqmo-lb-profile-link"' + styleAttr + ' href="' + esc(href) + '">' + name + '</a>';
		}
		return '<' + tag + ' class="' + cls + '"' + styleAttr + '>' + name + '</' + tag + '>';
	}

	function avatarCellHtml(it, opts) {
		opts = opts || {};
		var seed = String((it && it.uid) || (it && it.display) || '');
		var isMe = !!(it && it.is_me);
		var url = it && it.avatarUrl;
		if (url) {
			return '<span class="pf__avatar pf__avatar--img"><img src="' + esc(url) + '" alt="" decoding="async" /></span>';
		}
		var palette = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#0ea371', '#a78bfa', '#0891b2', '#65a30d', '#d97706', '#db2777'];
		var h = 0;
		for (var i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
		var bg = isMe
			? 'linear-gradient(135deg,var(--primary),var(--violet))'
			: palette[Math.abs(h) % palette.length];
		var ini = ((it && it.initials) || '?').slice(0, 2);
		return '<span class="pf__avatar" style="background:' + bg + '">' + esc(ini) + '</span>';
	}

	global.IqmoLeaderboardUi = {
		esc: esc,
		profileHref: profileHref,
		profileNameHtml: profileNameHtml,
		avatarCellHtml: avatarCellHtml
	};
})(typeof window !== 'undefined' ? window : global);
