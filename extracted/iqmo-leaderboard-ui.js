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
			'a.iqmo-lb-profile-link:focus-visible{outline:2px solid #6366f1;outline-offset:2px;border-radius:4px}';
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

	global.IqmoLeaderboardUi = {
		esc: esc,
		profileHref: profileHref,
		profileNameHtml: profileNameHtml
	};
})(typeof window !== 'undefined' ? window : global);
