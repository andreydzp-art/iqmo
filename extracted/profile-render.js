/**
 * IQMO profile — отрисовка секций v5 из IqmoProfileData.build().
 */
(function (global) {
	'use strict';

	var ICONS = {
		star: '<path d="M12 2 14.4 8.6 21 9l-5.2 4.5L17.2 21 12 17.3 6.8 21l1.4-7.5L3 9l6.6-.4z"/>',
		book: '<path d="M5 3h14v18l-7-3-7 3z"/>',
		flame: '<path d="M13 2s4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s-2 1-3 4a6 6 0 0 0 12 0c0-5-6-10-6-10z"/>',
		trophy: '<path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4z"/>',
		medal: '<path d="M12 2 14 9h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>',
		target: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4"/>',
		spark: '<path d="M13 2 3 14h7l-1 8 11-13h-7z"/>',
		crown: '<path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4zm-3 2h2v2H4a2 2 0 0 1-2-2zm18 0h2a2 2 0 0 1-2 2h-2V6h2zM7 20h10v2H7z"/>'
	};

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function fmtDate(ts) {
		if (!ts) return '';
		try {
			return new Date(ts).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
		} catch (e) {
			return '';
		}
	}

	function memberSinceLabel(ts) {
		if (!ts) return 'в IQMO';
		var days = Math.max(1, Math.floor((Date.now() - ts * 1000) / 86400000));
		return 'с ' + fmtDate(ts * 1000) + ' · ' + days + ' ' + (days === 1 ? 'день' : days < 5 ? 'дня' : 'дней') + ' в IQMO';
	}

	function displayNameFromEmailPlaceholder(d) {
		if (d.email && global.IqmoProfileData && IqmoProfileData.displayNameFromEmail) {
			return IqmoProfileData.displayNameFromEmail({ email: d.email });
		}
		return 'Ученик IQMO';
	}

	function renderXpGuide() {
		return (
			'<section class="prof-xp-guide">' +
			'<details class="prof-xp-guide__panel">' +
			'<summary><span class="prof-xp-guide__title">Как качается XP</span>' +
			'<span class="prof-xp-guide__hint">уровни · серии · карта вариантов</span></summary>' +
			'<div class="prof-xp-guide__body">' +
			'<ul class="prof-xp-guide__list">' +
			'<li><b>Задания в тестах</b> — XP за верные ответы. Полный вариант даёт больше, чем разминка или быстрый тест.</li>' +
			'<li><b>Карта глав</b> — разовый бонус за узел при ≥50% в части&nbsp;1 (от +50 XP за шаг до +550 за босса).</li>' +
			'<li><b>Серия дней</b> — чем дольше закрываете дневную цель подряд, тем выше множитель к XP (до&nbsp;+18%).</li>' +
			'<li><b>Визит и активность</b> — +10 XP за первый заход в день и небольшие порции за время в тренажёре.</li>' +
			'<li><b>50 уровней</b> — пороги растут нелинейно; XP копится суммарно и не сгорает.</li>' +
			'</ul>' +
			'<p class="prof-xp-guide__note">XP — мотивация, а не оценка на экзамене. Главный результат — освоение тем и уверенность на ОГЭ.</p>' +
			'</div></details></section>'
		);
	}

	function renderHero(p) {
		var d = p.profileData;
		var sig = p.socialSignals || [];
		var chips = sig.map(function (s) {
			var cls = s.kind === 'top' ? 'top' : s.kind === 'ahead' ? 'ahead' : 'rank';
			return '<span class="h-chip ' + cls + '">' + s.text + '</span>';
		}).join('');
		var avatarInner = d.avatarUrl
			? '<img src="' + esc(d.avatarUrl) + '" alt="" width="172" height="172" />'
			: '<div class="av-initials" aria-hidden="true">' + esc(d.initials) + '</div>';
		var xpMax = d.nextLevel ? d.xpLevelMax : d.xpCurrent;
		var xpRange = d.nextLevel
			? IqmoProfileData.fmtPts(d.xpCurrent) + ' / ' + IqmoProfileData.fmtPts(xpMax) + ' XP'
			: IqmoProfileData.fmtPts(d.xpCurrent) + ' XP';
		var nextLbl = d.nextLevel
			? 'следующий уровень — <b style="color:var(--ink-2);">' + d.nextLevel + ' · «' + esc(d.levelTitle) + '»</b>'
			: 'максимальный уровень';
		return (
			'<section class="hero">' +
			'<div class="hero-deco"><span class="hero-particle p1"></span><span class="hero-particle p2"></span><span class="hero-particle p3"></span></div>' +
			'<div class="hero-inner">' +
			'<div class="av-wrap" data-frame="' + esc(d.equippedFrame || '') + '" aria-label="Уровень ' + d.level + '">' +
			'<div class="av-track" style="background:conic-gradient(from -90deg,#6366f1 0%,#7c3aed ' + d.xpPct + '%,rgba(15,18,38,.06) ' + d.xpPct + '%,rgba(15,18,38,.06) 100%)"></div>' +
			'<div class="av-img">' + avatarInner + '</div>' +
			'<div class="lvl-chip"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>LVL ' + d.level + '</div>' +
			'</div>' +
			'<div><div class="h-name-row">' +
			'<h1 class="h-name">' + esc(d.name) + '</h1>' +
			'<span class="h-handle">' + esc(d.profileId) + '</span>' +
			'</div>' +
			'<div class="h-status">' + chips +
			'<span class="h-meta">' + memberSinceLabel(d.memberSince) + '</span></div>' +
			'<div class="xp-block"><div class="xp-head">' +
			'<span class="xp-curr"><span class="xp-eye">Опыт</span><span class="xp-num">' + xpRange + '</span></span>' +
			'<span class="xp-next">' + nextLbl + '</span></div>' +
			'<div class="xp-bar" role="progressbar" aria-valuenow="' + d.xpPct + '" aria-valuemin="0" aria-valuemax="100">' +
			'<div class="xp-fill" style="width:' + d.xpPct + '%"></div></div>' +
			'<div class="xp-foot"><span>+' + IqmoProfileData.fmtPts(d.weekXp) + ' XP за неделю</span>' +
			(d.nextLevel ? '<span class="xp-untill"><span class="dot-gold"></span>до уровня ' + d.nextLevel + ' — <b style="color:var(--gold-deep);">' + IqmoProfileData.fmtPts(d.xpToNext) + ' XP</b></span>' : '') +
			'</div></div></div>' +
			'<div class="h-quick">' +
			'<div class="qstat streak"><div class="q-ico"><svg viewBox="0 0 24 24">' + ICONS.flame + '</svg></div>' +
			'<div class="q-val">' + d.streakDays + '<span class="small">дн</span></div><div class="q-lbl">Серия</div></div>' +
			'<div class="qstat rank"><div class="q-ico"><svg viewBox="0 0 24 24">' + ICONS.trophy + '</svg></div>' +
			'<div class="q-val">#' + d.leagueRank + '</div><div class="q-lbl">Лига</div>' +
			(d.leagueDelta ? '<div class="q-delta">▲ ' + d.leagueDelta + '</div>' : '') + '</div>' +
			'<div class="qstat course"><div class="q-ico"><svg viewBox="0 0 24 24"><path d="M12 2 2 7v10l10 5 10-5V7z" opacity=".4"/><path d="M12 2 2 7l10 5 10-5z"/></svg></div>' +
			'<div class="q-val">' + d.coursePct + '<span class="small">%</span></div><div class="q-lbl">Курс</div></div>' +
			'<div class="qstat accuracy"><div class="q-ico"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2zm0 4v6l4 4 1.4-1.4L13 11.2V6z"/></svg></div>' +
			'<div class="q-val">' + (d.accuracyPct != null ? d.accuracyPct : '—') + (d.accuracyPct != null ? '<span class="small">%</span>' : '') + '</div><div class="q-lbl">Точность</div></div>' +
			'</div></div></section>'
		);
	}

	function renderGoals(goals) {
		return (
			'<section class="nextrow">' +
			goals.map(function (g) {
				return (
					'<div class="ngoal ' + g.kind + (g.primary ? ' is--primary' : '') + '">' +
					'<div class="ng-top"><div class="ng-ico"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg></div>' +
					'<div class="ng-eye">' + esc(g.eye) + '</div></div>' +
					'<div class="ng-text"><span class="num-big">' + esc(g.big) + '</span> ' + esc(g.text) + '</div>' +
					'<div class="ng-bar"><i style="width:' + g.pct + '%"></i></div>' +
					'<div class="ng-foot">' + g.foot + '</div></div>'
				);
			}).join('') +
			'</section>'
		);
	}

	function rarityLabel(r) {
		if (r === 'legend') return '★ Легендарная';
		if (r === 'epic') return '◆ Эпическая';
		if (r === 'rare') return '◇ Редкая';
		return 'Обычная';
	}

	function renderAchievements(list) {
		var earned = list.filter(function (a) { return a.unlocked; }).length;
		var cards = list.map(function (a) {
			var cls = a.locked ? 'locked' : a.rarity;
			var icon = ICONS[a.icon] || ICONS.star;
			var date = a.earnedAt ? fmtDate(a.earnedAt) : 'закрыто';
			return (
				'<article class="ach ' + cls + '" tabindex="0">' +
				(a.pctEarned != null ? '<span class="a-pct">' + a.pctEarned + '%</span>' : '') +
				'<div class="a-art"><svg viewBox="0 0 24 24">' + icon + '</svg></div>' +
				'<div class="a-name">' + esc(a.title) + '</div>' +
				'<div class="a-rar">' + rarityLabel(a.rarity) + '</div>' +
				'<div class="a-meta">' + esc(date) + '</div>' +
				'<div class="a-tip"><div class="tt-name">' + esc(a.title) + '</div><div class="tt-desc">' + esc(a.desc) + '</div>' +
				'<div class="tt-meta"><span>' + rarityLabel(a.rarity) + '</span><span>' + (a.pctEarned != null ? a.pctEarned + '% игроков' : '') + '</span></div></div>' +
				'</article>'
			);
		}).join('');
		return (
			'<section><div class="sec-head"><div><div class="sec-eye">Коллекция</div><h2 class="sec-title">Награды и достижения</h2></div></div>' +
			'<div class="panel ach-panel"><div class="ach-toolbar"><div class="ach-counter">' +
			'<span><span class="cnt-big">' + earned + '</span> / ' + list.length + ' получено</span></div></div>' +
			'<div class="ach-grid">' + cards + '</div></div></section>'
		);
	}

	function renderActivity(events) {
		var rows = events.map(function (ev) {
			var pills = (ev.pills || []).map(function (p) {
				return '<span class="ev-pill ' + p.kind + '">' + esc(p.value) + '</span>';
			}).join('');
			return (
				'<div class="ev ' + esc(ev.type) + '">' +
				'<div class="ev-dot"><svg viewBox="0 0 24 24"><path d="M5 3h14v18l-7-3-7 3z"/></svg></div>' +
				'<div class="ev-text">' + ev.text + pills + '</div>' +
				'<div class="ev-time">' + esc(ev.time || '') + '</div></div>'
			);
		}).join('');
		return (
			'<section><div class="sec-head"><div><div class="sec-eye">Лента</div><h2 class="sec-title">Последняя активность</h2></div></div>' +
			'<div class="panel feed"><div class="feed-head"><h3 style="display:inline-block;">События</h3></div>' +
			'<div class="feed-list">' + rows + '</div></div></section>'
		);
	}

	function renderStats(stats) {
		var cards = stats.map(function (s) {
			return (
				'<div class="stat ' + s.kind + '">' +
				(s.top ? '<span class="s-top">' + esc(s.top) + '</span>' : '') +
				'<div class="s-ico"><svg viewBox="0 0 24 24"><path d="M5 3h14v18l-7-3-7 3z"/></svg></div>' +
				'<div class="s-val">' + esc(s.value) + (s.unit ? '<span class="unit">' + esc(s.unit) + '</span>' : '') + '</div>' +
				'<div class="s-lbl">' + esc(s.label) + '</div>' +
				(s.delta ? '<div class="s-delta">' + s.delta + '</div>' : '') +
				'</div>'
			);
		}).join('');
		return (
			'<section><div class="sec-head"><div><div class="sec-eye">Цифры</div><h2 class="sec-title">Статистика</h2></div></div>' +
			'<div class="panel stats"><div class="stats-grid">' + cards + '</div></div></section>'
		);
	}

	function renderSubjects(list) {
		var cards = list.map(function (c) {
			var letter = c.slug === 'biology' ? 'Б' : 'Х';
			var cls = c.slug === 'biology' ? 'bio' : 'chem';
			var meta = c.meta.map(function (m) {
				return '<span>' + esc(m.label) + ' <b>' + esc(m.value) + '</b></span>';
			}).join('');
			return (
				'<article class="course ' + cls + '">' +
				'<div class="c-head"><div class="c-left"><div class="c-ico ' + cls + '">' + letter + '</div>' +
				'<div><h3 class="c-name">' + esc(c.name) + '</h3><div class="c-sub">' + esc(c.sub) + '</div></div></div>' +
				'<span class="c-lvl"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>LVL ' + c.level + '</span></div>' +
				'<div class="c-bar-wrap"><div class="c-bar"><i style="width:' + c.pct + '%"></i></div><div class="c-pct">' + c.pct + '%</div></div>' +
				'<div class="c-meta">' + meta + '</div>' +
				(c.topSignal ? '<span class="c-top">' + esc(c.topSignal.text) + '</span>' : '') +
				'<p style="margin:12px 0 0;font-size:12px"><a class="sec-link" href="' + esc(c.href) + '">К предмету →</a></p>' +
				'</article>'
			);
		}).join('');
		return (
			'<section><div class="sec-head"><div><div class="sec-eye">Курсы</div><h2 class="sec-title">Прогресс по предметам</h2></div></div>' +
			'<div class="courses">' + cards + '</div></section>'
		);
	}

	function renderCollectibles(list) {
		var cards = list.map(function (f) {
			var cls = f.locked ? 'locked' : f.rarity;
			var initials = 'IQ';
			var foot = f.locked && f.progress
				? '<span class="frame-action">Активно</span><span class="frame-state">' + f.progress.current + ' / ' + f.progress.total + '</span>'
				: f.locked
					? '<span class="frame-state">ещё не получено</span>'
					: '<a class="frame-action" href="#" data-frame-equip="' + esc(f.id) + '">' + (f.equipped ? 'Снять' : 'Надеть') + '</a>' +
					  (f.pctOwned != null ? '<span class="frame-state">' + f.pctOwned + '% игроков</span>' : '');
			return (
				'<article class="frame ' + cls + '">' +
				(f.equipped ? '<span class="equipped-tag">Надета</span>' : '') +
				'<div class="frame-preview"><div class="preview-av">' + initials + '</div></div>' +
				'<span class="frame-rar">' + rarityLabel(f.rarity) + '</span>' +
				'<h3 class="frame-name">' + esc(f.name) + '</h3>' +
				'<p class="frame-desc">' + esc(f.desc) + '</p>' +
				'<div class="frame-foot">' + foot + '</div></article>'
			);
		}).join('');
		return (
			'<section><div class="sec-head"><div><div class="sec-eye">Редкие предметы</div>' +
			'<h2 class="sec-title">Коллекционные рамки и сезонные награды</h2></div></div>' +
			'<div class="panel rare"><div class="rare-grid">' + cards + '</div></div></section>'
		);
	}

	function renderSettingsGuest() {
		return (
			'<div class="prof-guest-banner iqmo-only-guest">' +
			'Прогресс хранится в этом браузере. <a href="/login.html">Войдите</a>, чтобы синхронизировать XP и достижения между устройствами.' +
			'</div>'
		);
	}

	function renderSettingsAccount(profileId, profileData) {
		var d = profileData || {};
		var storedName = global.IqmoProfileData && IqmoProfileData.readStoredDisplayName
			? IqmoProfileData.readStoredDisplayName()
			: null;
		var nameInputVal = storedName || '';
		var nameHint = storedName
			? 'Сохранено в этом браузере' + (d.isAuthed ? ' и синхронизируется после входа' : '')
			: (d.isAuthed ? 'По умолчанию — из e-mail. Можно задать своё.' : 'По умолчанию — «Ученик IQMO». Можно задать своё.');
		var pubLink = profileId
			? '<div class="prof-settings__box iqmo-only-authed"><h3 style="margin:0 0 8px;font-size:14px">Публичная ссылка</h3>' +
			  '<p style="font-size:12px;color:var(--muted);margin:0 0 10px">Можно отправить друзьям — e-mail и настройки не показываются.</p>' +
			  '<p style="margin:0 0 10px;font-family:\'JetBrains Mono\',monospace;font-size:12px">' +
			  '<a href="/profile/' + esc(profileId) + '" id="prof-public-link">/profile/' + esc(profileId) + '</a></p>' +
			  '<button type="button" class="btn btn--ghost" id="prof-copy-link" data-copy-href="/profile/' + esc(profileId) + '">Копировать ссылку</button></div>'
			: '';
		return (
			'<section class="prof-settings" id="prof-account">' +
			'<h2>Аккаунт и данные</h2>' +
			'<p>Управление сессией и локальным прогрессом. Сброс затрагивает только данные по химии в этом браузере.</p>' +
			'<div class="prof-settings__grid">' +
			'<div class="prof-settings__box prof-settings__box--wide">' +
			'<h3 style="margin:0 0 8px;font-size:14px">Имя в профиле</h3>' +
			'<p style="font-size:12px;color:var(--muted);margin:0 0 12px">' + esc(nameHint) + '</p>' +
			'<form class="prof-name-form" id="prof-name-form">' +
			'<input type="text" class="prof-name-input" id="prof-display-name" maxlength="32" ' +
			'placeholder="' + esc(d.isAuthed ? displayNameFromEmailPlaceholder(d) : 'Ученик IQMO') + '" ' +
			'value="' + esc(nameInputVal) + '" autocomplete="nickname" />' +
			'<button type="submit" class="btn btn--ghost" id="prof-save-name">Сохранить</button>' +
			'</form>' +
			'<p id="prof-name-status" class="stat-label" style="margin-top:8px" hidden></p></div>' +
			'<div class="prof-settings__box"><h3 style="margin:0 0 8px;font-size:14px">Сброс прогресса</h3>' +
			'<p style="font-size:12px;color:var(--muted);margin:0 0 12px">Очистить iqmo-chem-* (и на сервере, если вы вошли).</p>' +
			'<button type="button" class="btn btn--danger" id="prof-reset">Сбросить данные химии</button></div>' +
			'<div class="prof-settings__box iqmo-only-authed"><h3 style="margin:0 0 8px;font-size:14px">Сессии</h3>' +
			'<p style="font-size:12px;color:var(--muted);margin:0 0 12px">Завершить вход на всех устройствах.</p>' +
			'<button type="button" class="btn btn--ghost" id="prof-logout-everywhere">Выйти на всех устройствах</button>' +
			'<p id="prof-logout-everywhere-status" class="stat-label" style="margin-top:8px" hidden></p></div>' +
			'<div class="prof-settings__box iqmo-only-authed"><h3 style="margin:0 0 8px;font-size:14px">Удаление аккаунта</h3>' +
			'<p style="font-size:12px;color:var(--muted);margin:0 0 12px">Безвозвратно: e-mail, пароль и прогресс на сервере.</p>' +
			'<button type="button" class="btn btn--danger" id="prof-delete-account">Удалить аккаунт</button>' +
			'<p id="prof-delete-status" class="stat-label" style="margin-top:8px" hidden></p></div>' +
			pubLink +
			'</div></section>'
		);
	}

	function renderPublicBanner(data) {
		var pid = data.profileId || (data.profileData && data.profileData.profileId) || '';
		var viewer = data.viewerMe;
		var ownId = viewer && viewer.id != null
			? 'IQ-' + String(viewer.id).padStart(4, '0')
			: null;
		var isOwn = ownId && ownId === pid;
		return (
			'<div class="prof-public-banner">' +
			'<div><strong>Публичный профиль</strong> <span class="prof-public-id">' + esc(pid) + '</span></div>' +
			(isOwn ? '<a class="sec-link" href="/profile/">Мой кабинет →</a>' : '<a class="sec-link" href="/profile/">Мой профиль</a>') +
			(data.publicNotice ? '<p class="prof-public-note">' + esc(data.publicNotice) + '</p>' : '') +
			'</div>'
		);
	}

	function renderError(message) {
		return (
			'<div class="prof-error">' +
			'<h1 style="margin:0 0 8px;font-size:22px">' + esc(message) + '</h1>' +
			'<p style="margin:0;color:var(--muted)"><a href="/profile/">Вернуться в свой профиль</a></p></div>'
		);
	}

	function render(data) {
		var root = document.getElementById('prof-root');
		if (!root || !data) return;
		var isPublic = !!data.isPublic;
		var profileId = data.profileData && data.profileData.profileId;
		var settingsBlock = isPublic ? '' : renderSettingsGuest() + renderSettingsAccount(profileId, data.profileData);
		root.innerHTML =
			(isPublic ? renderPublicBanner(data) : '') +
			renderHero(data) +
			renderGoals(data.nextGoalsData) +
			(isPublic ? '' : renderXpGuide()) +
			settingsBlock +
			renderAchievements(data.achievementsData) +
			'<div class="row-2">' + renderActivity(data.activityData) + renderStats(data.statsData) + '</div>' +
			renderSubjects(data.subjectsProgressData) +
			(isPublic ? '' : renderCollectibles(data.collectiblesData || [])) +
			'<p class="footnote">Уровни, рамки и значки — дополнительная мотивация, а не учебный результат. Главная цель — освоение тем и подготовка к экзамену.</p>';

		var navAv = document.getElementById('nav-avatar');
		if (navAv && data.profileData) {
			navAv.textContent = String(data.profileData.level);
			navAv.setAttribute('title', 'Уровень ' + data.profileData.level);
		}
	}

	function bindCollectibles() {
		document.addEventListener('click', function (e) {
			var t = e.target.closest('[data-frame-equip]');
			if (!t) return;
			e.preventDefault();
			var id = t.getAttribute('data-frame-equip');
			try {
				var cur = localStorage.getItem('iqmo-equipped-frame');
				if (cur === id) localStorage.removeItem('iqmo-equipped-frame');
				else localStorage.setItem('iqmo-equipped-frame', id);
			} catch (err) {}
			if (global.IqmoProfileApp && IqmoProfileApp.refresh) IqmoProfileApp.refresh();
		});
	}

	global.IqmoProfileRender = {
		render: render,
		renderError: renderError,
		bindCollectibles: bindCollectibles
	};
})(typeof window !== 'undefined' ? window : global);
