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
		crown: '<path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4zm-3 2h2v2H4a2 2 0 0 1-2-2zm18 0h2a2 2 0 0 1-2 2h-2V6h2zM7 20h10v2H7z"/>',
		// Плоский silhouette-флакон 24×24, fill:#fff — для эпической
		// карточки «Первый этап по химии». Мы намеренно отказались от
		// богатой ref-сцены (.ach--illus): пользователь требует единый
		// .ach-шаблон у всей коллекции (XP-чип внизу на одной линии).
		flask: '<path d="M9 2h6v2h-1v4.6l4.7 9.3A3 3 0 0 1 16 22H8a3 3 0 0 1-2.7-4.1L10 8.6V4H9V2zm3 5.5L7.6 16h8.8L12 7.5z"/>',
		// Плоский лист 24×24, fill:#fff — для редкой карточки
		// «Первый этап по биологии». Тот же подход, единый .ach.
		leaf: '<path d="M20 3c-9 0-15 6-15 14 0 1.5.3 2.8.7 4l1.7-1.7C9 14.7 12.5 12 17 12c-4.5 1-8 4-10.6 8 1.4.7 3 1 4.6 1 7 0 12-5 12-12V3h-3z"/>'
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
		// users.created_at в БД уже в МИЛЛИСЕКУНДАХ (microtime(true) * 1000
		// в IqmoAuthController::register). Никакого * 1000 на фронте.
		var days = Math.max(1, Math.floor((Date.now() - ts) / 86400000));
		return 'с ' + fmtDate(ts) + ' · ' + days + ' ' + (days === 1 ? 'день' : days < 5 ? 'дня' : 'дней') + ' в IQMO';
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

	function pluralRu(n, forms) {
		var m10 = n % 10;
		var m100 = n % 100;
		if (m10 === 1 && m100 !== 11) return forms[0];
		if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
		return forms[2];
	}

	function streakLabel(n) {
		return pluralRu(n, ['день подряд', 'дня подряд', 'дней подряд']);
	}

	/**
	 * Подсказка для streak-орба. Раньше тут было «Вы уже N дней в IQMO»
	 * (точки = дни на портале), но это запутывало: при streak=4 точек было
	 * 27 — пользователь резонно спрашивал, почему не 4. Теперь 1 точка = 1
	 * день серии, и tooltip говорит ровно про это.
	 */
	function streakTooltip(streakDays) {
		var n = Math.max(0, Math.round(Number(streakDays) || 0));
		if (n === 0) {
			return 'Серия ещё не запущена. Закройте дневную цель — каждый день подряд добавит точку на орб.';
		}
		var capped = Math.min(30, n);
		var label = n > 30
			? '30+ ' + pluralRu(30, ['день', 'дня', 'дней'])
			: n + ' ' + pluralRu(n, ['день', 'дня', 'дней']);
		return 'Серия — ' + label + ' подряд. На орбе ' + capped +
			pluralRu(capped, [' точка', ' точки', ' точек']) +
			' — по одной за каждый день серии. Не теряй огонёк.';
	}

	function daysInIqmoLabel(ts) {
		if (!ts) return '';
		// ts уже в миллисекундах (БД-конвенция IQMO), см. memberSinceLabel().
		var days = Math.max(1, Math.floor((Date.now() - ts) / 86400000));
		return days + ' ' + pluralRu(days, ['день', 'дня', 'дней']) + ' в IQMO';
	}

	function streakMultLabel(days) {
		var d = Math.max(0, parseInt(days, 10) || 0);
		var m = 1 + Math.min(0.18, d * 0.012);
		return '×' + m.toFixed(2);
	}

	function avRingStyle(pct) {
		return avHoloRingStyle(pct);
	}

	function avHoloRingStyle(pct) {
		var p = Math.max(0, Math.min(100, parseInt(pct, 10) || 0));
		var mid = Math.round(p * 0.49);
		return (
			'background:conic-gradient(from -90deg,#0ea5e9 0%,#7c3aed ' + mid + '%,#db2777 ' + p +
			'%,rgba(15,18,38,.08) ' + p + '%,rgba(15,18,38,.08) 100%)'
		);
	}

	function pad2(n) {
		return String(Math.max(0, parseInt(n, 10) || 0)).padStart(2, '0');
	}

	function daysInIqmoShort(ts) {
		if (!ts) return '';
		// ts уже в миллисекундах (БД-конвенция IQMO), см. memberSinceLabel().
		var days = Math.max(1, Math.floor((Date.now() - ts) / 86400000));
		return days + ' ' + pluralRu(days, ['день', 'дня', 'дней']) + ' в IQMO';
	}

	function metaRankLineV3(signals, d) {
		return metaRankLine(signals, d);
	}

	function courseMetaLineV3(signals, d) {
		return courseMetaLine(signals, d);
	}

	function renderStreakCaps(days) {
		var d = Math.min(7, Math.max(0, parseInt(days, 10) || 0));
		var html = '';
		for (var i = 1; i <= 7; i++) {
			var cls = 'cap';
			if (i <= d) cls += ' on';
			if (d > 0 && d < 7 && i === d) cls += ' now';
			html += '<span class="' + cls + '" style="--cap-i:' + i + '"></span>';
		}
		return html;
	}

	function streakCardClass(days) {
		var d = Math.min(7, Math.max(0, parseInt(days, 10) || 0));
		var cls = 'streak';
		if (d > 0) cls += ' is-active';
		if (d >= 6 && d < 7) cls += ' is-near-reward';
		if (d >= 7) cls += ' is-complete';
		return cls;
	}

	function metaRankLine(signals, d) {
		var rank = (signals || []).find(function (s) { return s.kind === 'rank'; });
		if (rank) return esc(rank.text);
		return 'Ранг «' + esc(d.levelTitle || 'Старт') + '»';
	}

	function courseMetaLine(signals, d) {
		var top = (signals || []).find(function (s) { return s.kind === 'top'; });
		if (top) return esc(top.text);
		return esc(d.coursePct) + '% курса';
	}

	var CAM_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 4a3 3 0 0 0-3 3v1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-1V7a3 3 0 0 0-3-3H9zm0 2h6a1 1 0 0 1 1 1v1H8V7a1 1 0 0 1 1-1zm-2 5h10l-4.5 5.4L11 13l-2 2.4L7 13z"/></svg>';
	var PEN_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>';

	function renderHeroStatsRow(d, leagueDelta, accDelta, _courseDelta) {
		var accVal = d.accuracyPct != null ? String(d.accuracyPct) : '—';
		var accUnit = d.accuracyPct != null ? '<span class="unit">%</span>' : '';
		// «Курс · биология» убран — метрика считалась только по вариантам
		// главы 1 и для большинства пользователей всегда показывала 0%.
		// Сетка осталась 3-колоночной, чтобы плитки сохранили исходный
		// размер; третий слот пустой (slot--empty).
		return (
			'<div class="sec-row" role="group" aria-label="Краткая статистика">' +
			'<div class="qstat league"><div class="q-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4zM7 20h10v2H7z"/></svg></div>' +
			'<div class="q-body"><div class="q-val">#' + esc(d.leagueRank) + '</div><div class="q-lbl">Лига · неделя</div></div>' +
			(leagueDelta || '<div class="q-delta" aria-hidden="true"></div>') + '</div>' +
			'<div class="qstat acc"><div class="q-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2zm0 4v6l4 4 1.4-1.4L13 11.2V6z"/></svg></div>' +
			'<div class="q-body"><div class="q-val">' + accVal + accUnit + '</div><div class="q-lbl">Точность</div></div>' +
			(accDelta || '<div class="q-delta" aria-hidden="true"></div>') + '</div>' +
			'<div class="qstat slot--empty" aria-hidden="true"></div>' +
			'</div>'
		);
	}

	function renderNameRow(d, isPublic) {
		if (isPublic) {
			return (
				'<div class="h-name-row">' +
				'<h1 class="h-name">' + esc(d.name) + '</h1>' +
				'<span class="h-handle">' + esc(d.profileId) + '</span></div>'
			);
		}
		var stored = global.IqmoProfileData && IqmoProfileData.readStoredDisplayName
			? IqmoProfileData.readStoredDisplayName()
			: null;
		var inputVal = stored || d.name || '';
		return (
			'<div class="h-name-row">' +
			'<div class="h-name-view" id="prof-hero-name-view">' +
			'<h1 class="h-name" id="prof-hero-name">' + esc(d.name) + '</h1>' +
			'<button type="button" class="h-name-edit" data-name-edit aria-label="Изменить имя в профиле" title="Изменить имя">' + PEN_SVG + '</button>' +
			'</div>' +
			'<form class="h-name-edit-form" id="prof-hero-name-form" hidden>' +
			'<input type="text" class="h-name-edit-input" id="prof-hero-name-input" maxlength="32" ' +
			'value="' + esc(inputVal) + '" autocomplete="nickname" aria-label="Имя в профиле" placeholder="Ваше имя" />' +
			'<button type="submit" class="h-name-edit-save">Сохранить</button>' +
			'<button type="button" class="h-name-edit-cancel" data-name-cancel>Отмена</button>' +
			'</form>' +
			'<span class="h-handle">' + esc(d.profileId) + '</span></div>'
		);
	}

	function renderHero(p) {
		var d = p.profileData;
		var isPublic = !!p.isPublic;
		var sig = p.socialSignals || [];
		var streakDays = d.streakDays || 0;
		var xpPct = d.xpPct || 0;
		var gid = String(d.profileId || 'user').replace(/[^a-zA-Z0-9_-]/g, '');
		var avUrl = d.avatarUrl || (global.IqmoAvatar ? IqmoAvatar.getUrl() : '');
		var avatarInner = avUrl
			? '<img src="' + esc(avUrl) + '" alt="" data-avatar-hero-img decoding="async" />'
			: '<div class="av-initials" aria-hidden="true">' + esc(d.initials) + '</div>';
		var canEdit = !isPublic && global.IqmoAvatar;
		var hintCls = canEdit && IqmoAvatar.isPristine() ? ' is-hint' : '';
		var holoRing = avHoloRingStyle(xpPct);
		var avPctChip =
			'<div class="av-pct">' + xpPct + '%</div>' +
			'<div class="av-chip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>Ур. ' + d.level + '</div>';
		var avBlock = canEdit
			? (
				'<div class="av av--editable">' +
				'<div class="av-outer" style="' + holoRing + '"></div>' +
				'<div class="av-ticks" aria-hidden="true"></div>' +
				'<button type="button" class="av-hit" data-avatar-trigger aria-label="Сменить аватар">' +
				'<div class="av-img">' + avatarInner + '</div>' +
				'<span class="av-hover" aria-hidden="true"><span class="av-hover-txt">Сменить аватар</span></span>' +
				'<span class="av-cam-badge' + hintCls + '" aria-hidden="true">' + CAM_SVG + '</span>' +
				'</button>' + avPctChip + '</div>'
			)
			: (
				'<div class="av" aria-label="Уровень ' + d.level + '">' +
				'<div class="av-outer" style="' + holoRing + '"></div>' +
				'<div class="av-ticks" aria-hidden="true"></div>' +
				'<div class="av-img">' + avatarInner + '</div>' + avPctChip + '</div>'
			);
		var xpMax = d.nextLevel ? d.xpLevelMax : d.xpCurrent;
		var xpNums = IqmoProfileData.fmtPts(d.xpCurrent) + ' / ' + IqmoProfileData.fmtPts(xpMax);
		var xpEye = d.nextLevel
			? 'XP · ур. ' + d.level + ' → ' + d.nextLevel
			: 'XP · ур. ' + d.level;
		var xpNext = d.nextLevel
			? 'след.: <b>' + d.nextLevel + ' · «' + esc(d.levelTitle || '') + '»</b>'
			: 'макс. уровень';
		var xpUntil = d.nextLevel
			? 'Осталось ' + IqmoProfileData.fmtPts(d.xpToNext) + ' XP до ур. ' + d.nextLevel
			: '';
		var streakFill = Math.min(100, Math.round((Math.min(streakDays, 7) / 7) * 100));
		var daysLeft = Math.max(0, 7 - streakDays);
		var vaultTitle = 'Неделя ритма';
		if (global.IqmoProfileData && IqmoProfileData.ACHIEVEMENT_CATALOG) {
			var ach = IqmoProfileData.ACHIEVEMENT_CATALOG.find(function (a) { return a.id === 'streak7'; });
			if (ach) vaultTitle = String(ach.title).replace(/[«»]/g, '').trim();
		}
		var daysLeftWord = pluralRu(daysLeft, ['день', 'дня', 'дней']);
		var streakWarn = streakDays > 0
			? 'Серия заряжена — продли до конца дня <b>сегодня</b>'
			: 'Начните серию — закройте дневную цель';
		var leagueDelta = d.leagueDelta
			? '<div class="q-delta">▲ ' + d.leagueDelta + '</div>'
			: '';
		var accDelta = '';
		var courseDelta = '';
		var orbGradId = 'iqmo-orb-grad-' + gid;
		// Серия (streak) → точки на орбе (1 точка = 1 день подряд, max 30, потом «30+»).
		// Чем длиннее серия — тем компактнее точки (см. data-orbit-tier).
		var orbitDays = Math.max(0, Math.round(Number(streakDays) || 0));
		var orbitDotsHtml = global.IqmoOrbitDots ? IqmoOrbitDots.build(orbitDays) : '';
		var orbitTier = global.IqmoOrbitDots ? IqmoOrbitDots.tierFor(orbitDays) : 'big';
		var orbitTip = streakTooltip(orbitDays);
		// «Быстрое повторение» ведёт на предмет, в котором ученик активнее.
		var subjects = p && p.subjectsProgressData ? p.subjectsProgressData : null;
		var reviewHref = '/full-test-chemistry/';
		try {
			if (subjects && subjects.length) {
				var chem = subjects.find(function (s) { return s && (s.subject === 'chemistry' || s.id === 'chemistry'); });
				var bio = subjects.find(function (s) { return s && (s.subject === 'biology' || s.id === 'biology'); });
				var chemP = chem ? Number(chem.percent || chem.progress || 0) : 0;
				var bioP = bio ? Number(bio.percent || bio.progress || 0) : 0;
				if (bioP > chemP) reviewHref = '/full-test-biology/';
			}
		} catch (eRev) {}

		return (
			'<section class="iqmo-hero v3">' +
			'<div class="v3-deco"><span class="pp a"></span><span class="pp b"></span><span class="pp c"></span><span class="pp d"></span></div>' +
			'<div class="hero-inner">' +
			avBlock +
			'<div class="h-id">' +
			renderNameRow(d, isPublic) +
			'<div class="h-meta-row">' +
			'<span class="rank">' + metaRankLineV3(sig, d) + '</span>' +
			(d.memberSince ? '<span class="dot" aria-hidden="true"></span><span>' + esc(daysInIqmoShort(d.memberSince)) + '</span>' : '') +
			'</div>' +
			'<div class="xp">' +
			'<div class="xp-head">' +
			'<span class="xp-curr"><span class="eye">' + xpEye + '</span><span class="num">' + xpNums + '</span></span>' +
			'<span class="xp-next">' + xpNext + '</span></div>' +
			'<div class="xp-bar" role="progressbar" aria-valuenow="' + xpPct + '" aria-valuemin="0" aria-valuemax="100">' +
			'<div class="xp-fill" style="width:' + xpPct + '%"></div></div>' +
			'<div class="xp-foot">' +
			'<span>За неделю <b>+' + IqmoProfileData.fmtPts(d.weekXp) + ' XP</b></span>' +
			(xpUntil ? '<span class="untill">' + xpUntil + '</span>' : '<span class="untill"></span>') +
			'</div></div>' +
			renderHeroStatsRow(d, leagueDelta, accDelta, courseDelta) +
			'</div>' +
			'<div class="streak dark">' +
			'<span class="holo-border" aria-hidden="true"></span>' +
			'<div class="streak-top">' +
			'<span class="s-eye"><span class="pulse"></span>STREAK · ' + pad2(streakDays) + '</span>' +
			(streakDays > 0
				? '<span class="s-bonus" title="Декоративный бейдж серии">' +
					'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>' +
					'BONUS' +
				'</span>'
				: '') +
			'</div>' +
			'<div class="s-hero">' +
			'<div class="orb"' + (orbitTip ? ' tabindex="0" aria-label="' + esc(orbitTip) + '"' : '') + '>' +
			'<span class="orb-shell" aria-hidden="true"></span>' +
			'<span class="orb-orbit" aria-hidden="true" data-orbit-tier="' + orbitTier + '" data-orbit-days="' + orbitDays + '">' + orbitDotsHtml + '</span>' +
			(orbitTip ? '<span class="orb-tip" role="tooltip">' + esc(orbitTip) + '</span>' : '') +
			'<span class="orb-core">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true">' +
			'<defs><linearGradient id="' + orbGradId + '" x1="0" y1="0" x2="0" y2="1">' +
			'<stop offset="0%" stop-color="#86efac"/><stop offset="100%" stop-color="#0ea5e9"/>' +
			'</linearGradient></defs>' +
			'<path d="M13 2 5 14h6l-1 8 9-12h-6z" fill="none" stroke="url(#' + orbGradId + ')" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
			'</svg></span></div>' +
			'<div class="s-big">' +
			'<span class="num">' + streakDays + '</span>' +
			'<span class="lbl">' + streakLabel(streakDays) + '</span></div></div>' +
			'<div class="s-warn">' + streakWarn + '</div>' +
			'<div class="s-prog">' +
			'<div class="s-prog-bar" aria-label="' + streakDays + ' из 7 дней"><div class="s-prog-fill" style="width:' + streakFill + '%"></div></div>' +
			'<div class="s-prog-foot">' +
			'<span>' + pad2(Math.min(streakDays, 7)) + ' / 07 → <b>+' + daysLeft + ' ' + daysLeftWord + '</b></span>' +
			'<span class="rew"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4z"/></svg>' +
			esc(vaultTitle) + ' +200 XP</span></div></div>' +
			'<a class="s-cta" href="' + esc(reviewHref) + '">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>' +
			'▸ Быстрое повторение · 5 мин</a>' +
			'</div></div></section>'
		);
	}

	var REWARD_SHOP_UNLOCK = 15;
	var LOCK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

	function renderGoalCard(g) {
		return (
			'<div class="ng-top"><div class="ng-ico"><svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg></div>' +
			'<div class="ng-eye">' + esc(g.eye) + '</div></div>' +
			'<div class="ng-text"><span class="num-big">' + esc(g.big) + '</span> ' + esc(g.text) + '</div>' +
			'<div class="ng-bar"><i style="width:' + g.pct + '%"></i></div>' +
			'<div class="ng-foot">' + g.foot + '</div>'
		);
	}

	var GIFT_ICO_SVG =
		'<svg viewBox="0 0 24 24" aria-hidden="true">' +
		'<path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>' +
		'<path d="M4 7h16v5H4z"/>' +
		'<path d="M12 22V7"/>' +
		'<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>' +
		'<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>' +
		'</svg>';

	function renderRewardShopCard() {
		return (
			'<article class="ngoal reward-shop" tabindex="0" role="note" aria-label="Лавка наград — откроется с 15 уровня">' +
			'<span class="reward-shop__shimmer" aria-hidden="true"></span>' +
			'<span class="reward-shop__glow" aria-hidden="true"></span>' +
			'<span class="reward-shop__lock" aria-hidden="true">' + LOCK_SVG + '</span>' +
			'<div class="ng-top">' +
			'<div class="ng-ico">' + GIFT_ICO_SVG + '</div>' +
			'<span class="reward-shop__title">Лавка наград</span>' +
			'</div>' +
			'<div class="reward-shop__body">' +
			'<div class="reward-shop__copy">' +
			'<div class="ng-text">Обменивайте XP на реальные подарки</div>' +
			'<div class="ng-bar" aria-hidden="true"><i style="width:0"></i></div>' +
			'<div class="ng-foot">Откроется с ' + REWARD_SHOP_UNLOCK + ' уровня</div>' +
			'</div>' +
			'<div class="reward-shop__illus-wrap" aria-hidden="true">' +
			'<span class="reward-shop__illus-halo"></span>' +
			'<img class="reward-shop__illus" src="/site/assets/rewards-shop-bag.png" alt="" width="96" height="96" decoding="async" draggable="false" />' +
			'</div>' +
			'</div>' +
			'<div class="reward-shop__tip" role="tooltip">Достигните ' + REWARD_SHOP_UNLOCK + ' уровня, чтобы открыть магазин наград</div>' +
			'</article>'
		);
	}

	function renderGoals(goals, isPublic) {
		var cards = [];
		goals.forEach(function (g) {
			cards.push(
				'<div class="ngoal ' + g.kind + (g.primary ? ' is--primary' : '') + '">' +
				renderGoalCard(g) +
				'</div>'
			);
			if (g.primary && !isPublic) {
				cards.push(renderRewardShopCard());
			}
		});
		return (
			'<section class="nextrow' + (!isPublic ? ' nextrow--with-reward' : '') + '">' +
			cards.join('') +
			'</section>'
		);
	}

	function rarityLabel(r) {
		if (r === 'legend') return 'Легендарная';
		if (r === 'epic') return 'Эпическая';
		if (r === 'rare') return 'Редкая';
		if (r === 'myth') return 'Мифическая';
		return 'Обычная';
	}

	function rarityPrefix(r) {
		if (r === 'legend') return '★ ';
		if (r === 'epic') return '◆ ';
		if (r === 'rare') return '◇ ';
		if (r === 'myth') return '▲ ';
		return '';
	}

	function collectionGrade(earnedCount, total, legendRareCount) {
		if (!total) return '—';
		var pct = earnedCount / total;
		if (pct >= 0.9 || legendRareCount >= 4) return 'S';
		if (pct >= 0.7 || legendRareCount >= 3) return 'A+';
		if (pct >= 0.5 || legendRareCount >= 2) return 'A';
		if (pct >= 0.35) return 'B+';
		if (pct >= 0.2) return 'B';
		if (pct >= 0.1) return 'C';
		return 'D';
	}

	function achCardState(a) {
		if (a.unlocked) return 'earned';
		if (a.inProgress) return 'inprogress';
		return 'locked';
	}

	function renderAchievementCard(a) {
		var state = achCardState(a);
		// Единый LAYOUT (верх=редкость → центр=иконка/название → низ=XP),
		// но НЕ единый визуальный стиль:
		//   • обычные/легендарные → базовый .ach с круглой иконкой
		//     и компактным XP-чипом внизу (.a-xp, position:absolute);
		//   • эпические/редкие иллюстрированные коллекционные —
		//     .ach--illus с уникальным фоном (лавандовый/синий halo,
		//     hex-сцена, орбит-сфера с колбой/листом, золотой ободок
		//     при hover) и собственным reward-блоком .c-reward,
		//     который уже стоит внизу карточки в flex-flow.
		// Триггер — поле iconUrl в каталоге (см. profile-data.js).
		var hasIllus = !!a.iconUrl;
		if (hasIllus) return renderAchievementCardIllus(a, state);
		var cls = a.unlocked ? a.rarity : (a.rarity + ' locked');
		var icon = ICONS[a.icon] || ICONS.star;
		var artInner = '<svg viewBox="0 0 24 24">' + icon + '</svg>';
		var pctText = (a.pctRare != null) ? rarityPrefix(a.rarity) + a.pctRare + '%' : '';
		var rarText = rarityLabel(a.rarity);

		// Центральный блок: иконка стоит отдельно, тут — название
		// и контекст (прогресс / closed-метка). Для unlocked карточки
		// показываем только название.
		var centerBlock;
		if (a.unlocked) {
			centerBlock = '<div class="a-name">' + esc(a.title) + '</div>';
		} else if (a.inProgress && a.progress) {
			var pct = Math.max(0, Math.min(100, Math.round((a.progress.current / a.progress.target) * 100)));
			centerBlock = '<div class="a-name">' + esc(a.title) + '</div>' +
				'<div class="a-prog" aria-label="' + a.progress.current + ' из ' + a.progress.target + '">' +
				'<i style="width:' + pct + '%"></i></div>';
		} else {
			centerBlock = '<div class="a-name">' + esc(a.title) + '</div>' +
				'<div class="a-meta">закрыто</div>';
		}

		var tipMeta = '<span>+' + (a.xpReward || 0) + ' XP</span>' +
			'<span>' + (a.inProgress && a.progress ? (a.progress.current + ' / ' + a.progress.target) : rarText) + '</span>';

		// XP-чип внизу карточки. Логика «у всех на одном уровне» —
		// .a-xp position:absolute; bottom:12px (см. profile.css).
		// Для locked показываем дисклеймер «получите чтобы узнать»,
		// чтобы XP-секрет не раскрывался прежде времени, но место
		// под чип сохраняется (общий ритм коллекции).
		var xpBoltSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>';
		var xpChipHtml;
		if (a.unlocked || a.inProgress) {
			xpChipHtml = '<div class="a-xp">' +
				'<span class="a-xp-ico">' + xpBoltSvg + '</span>' +
				'<span class="a-xp-val">+' + (a.xpReward || 0) + ' XP</span>' +
				'<span class="a-xp-lbl">награда</span>' +
			'</div>';
		} else {
			xpChipHtml = '<div class="a-xp a-xp--locked">' +
				'<span class="a-xp-ico">' + xpBoltSvg + '</span>' +
				'<span class="a-xp-val">+' + (a.xpReward || 0) + ' XP</span>' +
				'<span class="a-xp-lbl">награда</span>' +
			'</div>';
		}

		return (
			'<article class="ach ' + cls + '" data-state="' + state + '" tabindex="0">' +
			(pctText ? '<span class="a-pct">' + esc(pctText) + '</span>' : '') +
			'<span class="a-rar a-rar--top">' + esc(rarText) + '</span>' +
			'<div class="a-tip">' +
				'<div class="tt-name">' + esc(a.title) + '</div>' +
				'<div class="tt-desc">' + esc(a.desc) + '</div>' +
				'<div class="tt-meta">' + tipMeta + '</div>' +
			'</div>' +
			'<div class="a-art">' + artInner + '</div>' +
			centerBlock +
			xpChipHtml +
			'</article>'
		);
	}

	/* Эпическая карточка «Первый этап по химии» — 1:1 с прототипом из
	   Cloud Design (см. /extracted/_ach-card-v3-import/shake-card/).
	   Разметка повторяет shake-card.html символ-в-символ; стили лежат
	   в /profile-shake-card.css. Карточка фиксированных 340×510 px,
	   а в нашу 1×1 ячейку коллекции она вписывается через CSS-обёртку
	   .ach--shake-host > .shake-scale (transform:scale, см. модуль).
	   Состояние (locked/inProgress/earned) тащим на host через
	   data-state — фильтр коллекции уже это понимает. */
	function renderAchievementCardShake(a, state) {
		var rar = a.rarity || 'epic';
		var rarText = rarityLabel(rar);

		var progPct = 0, progCur = 0, progTgt = 1;
		if (a.progress) {
			progCur = a.progress.current;
			progTgt = a.progress.target;
			progPct = Math.max(0, Math.min(100, Math.round((progCur / progTgt) * 100)));
		} else if (a.unlocked) {
			progPct = 100;
			progCur = 1;
			progTgt = 1;
		}

		var tipMeta = '<span>+' + (a.xpReward || 0) + ' XP</span>' +
			'<span>' + (a.inProgress && a.progress ? (progCur + ' / ' + progTgt) : rarText) + '</span>';

		// SVG-блоки взяты из shake-card.html. id градиентов уникальны,
		// чтобы не конфликтовать с другими SVG-defs на странице — наш
		// единственный экземпляр на профиль, так что хватает префикса
		// iqShake*.
		var hexSvg =
			'<svg viewBox="0 0 30 34" fill="none" stroke="#a78bfa" stroke-width="1.2">' +
				'<polygon points="15,2 28,9 28,25 15,32 2,25 2,9"/>' +
			'</svg>';

		var flaskSvg =
			'<svg class="flask" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="iqShakeGlassFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#c4b5fd" stop-opacity=".25"/>' +
						'<stop offset="55%" stop-color="#a78bfa" stop-opacity=".9"/>' +
						'<stop offset="100%" stop-color="#7c3aed"/>' +
					'</linearGradient>' +
					'<linearGradient id="iqShakeGlassEdge" x1="0" x2="1" y1="0" y2="1">' +
						'<stop offset="0%" stop-color="#ffffff"/>' +
						'<stop offset="100%" stop-color="#c4b5fd"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<rect x="26" y="6" width="12" height="14" rx="2" fill="none" stroke="url(#iqShakeGlassEdge)" stroke-width="2.2"/>' +
				'<rect x="24" y="4" width="16" height="3" rx="1.5" fill="#fff" opacity=".9"/>' +
				'<path d="M26 18 L26 26 L12 52 Q10 58 16 58 L48 58 Q54 58 52 52 L38 26 L38 18 Z" fill="url(#iqShakeGlassFill)" stroke="url(#iqShakeGlassEdge)" stroke-width="2.2" stroke-linejoin="round"/>' +
				'<path d="M18 44 Q32 40 46 44" fill="none" stroke="#ffffff" stroke-width="1.5" opacity=".6"/>' +
				'<circle cx="22" cy="50" r="1.8" fill="#ffffff" opacity=".9"/>' +
				'<circle cx="30" cy="52" r="1.2" fill="#ffffff" opacity=".75"/>' +
				'<circle cx="38" cy="49" r="1.5" fill="#ffffff" opacity=".85"/>' +
				'<circle cx="42" cy="54" r="1" fill="#ffffff" opacity=".7"/>' +
				'<path d="M30 22 L20 48" stroke="#ffffff" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>' +
			'</svg>';

		var checkSvg =
			'<svg class="check" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="iqShakeHexFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#ffffff"/>' +
						'<stop offset="100%" stop-color="#ede9fe"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="url(#iqShakeHexFill)" stroke="#c4b5fd" stroke-width="2"/>' +
				'<path d="M20 32 L29 41 L46 24" fill="none" stroke="#7c3aed" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
			'</svg>';

		var xpSvg = '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>';

		// Заголовок «Первый этап по химии» — переносим как в прототипе,
		// если в data есть точный заголовок-два-слова. Для других title
		// просто подаём как есть, без принудительного <br>.
		var titleHtml = esc(a.title);
		if (a.id === 'chem_stage1') {
			titleHtml = 'Первый этап<br/>по химии';
		}

		// Tooltip висит на host'е, не на .shake-card — иначе после CSS
		// scale он бы тоже сжался и стал нечитабелен.
		return (
			'<article class="ach ach--shake-host" data-state="' + state + '" tabindex="0">' +
				'<div class="shake-scale">' +
					'<div class="shake-card">' +
						'<div class="scene"></div>' +
						'<span class="rarity">' + esc(rarText) + '</span>' +
						'<div class="orb-stage">' +
							'<div class="hex h1" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="hex h2" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="hex h3" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="orb">' + flaskSvg + '</div>' +
							checkSvg +
							'<span class="ball b1" aria-hidden="true"></span>' +
							'<span class="ball b2" aria-hidden="true"></span>' +
							'<span class="ball b3" aria-hidden="true"></span>' +
							'<span class="ball b4" aria-hidden="true"></span>' +
						'</div>' +
						'<div class="title-block">' +
							'<h4 class="title">' + titleHtml + '</h4>' +
							'<div class="subtitle">' + esc(a.desc) + '</div>' +
						'</div>' +
						'<div class="divider"><span></span></div>' +
						'<div class="prog">' +
							'<div class="prog-row">' +
								'<span class="label">Прогресс</span>' +
								'<span class="count"><b>' + progCur + '</b><span class="sep">/</span>' + progTgt + '</span>' +
							'</div>' +
							'<div class="prog-bar"><i style="width:' + progPct + '%"></i></div>' +
						'</div>' +
						'<div class="reward">' +
							'<div class="reward-item">' +
								'<div class="reward-ico">' + xpSvg + '</div>' +
								'<div class="reward-text">' +
									'<span class="reward-val">+' + (a.xpReward || 0) + ' XP</span>' +
									'<span class="reward-lbl">Награда</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="a-tip">' +
					'<div class="tt-name">' + esc(a.title) + '</div>' +
					'<div class="tt-desc">' + esc(a.desc) + '</div>' +
					'<div class="tt-meta">' + tipMeta + '</div>' +
				'</div>' +
			'</article>'
		);
	}

	/* Карточка «Первый этап по биологии» (редкая, левитация).
	   Разметка повторяет /extracted/_ach-bio-card-import/bio-card/
	   bio-card.html символ-в-символ; стили — /profile-bio-card.css.
	   Вписываем фиксированные 340×510 в 2×2 ячейки коллекции через
	   transform:scale (как у shake/start). */
	function renderAchievementCardBio(a, state) {
		var rar = a.rarity || 'rare';
		var rarText = rarityLabel(rar);

		var progPct = 0, progCur = 0, progTgt = 1;
		if (a.progress) {
			progCur = a.progress.current;
			progTgt = a.progress.target;
			progPct = Math.max(0, Math.min(100, Math.round((progCur / progTgt) * 100)));
		} else if (a.unlocked) {
			progPct = 100;
			progCur = 1;
			progTgt = 1;
		}

		var tipMeta = '<span>+' + (a.xpReward || 0) + ' XP</span>' +
			'<span>' + (a.inProgress && a.progress ? (progCur + ' / ' + progTgt) : rarText) + '</span>';

		// SVG-блоки взяты из bio-card.html. id градиентов уникальны для
		// карточки (bioLeaf/bioHexFill — на странице такая одна).
		var hexSvg =
			'<svg viewBox="0 0 30 34" fill="none" stroke="#60a5fa" stroke-width="1.2">' +
				'<polygon points="15,2 28,9 28,25 15,32 2,25 2,9"/>' +
			'</svg>';

		var leafSvg =
			'<svg class="leaf" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="bioLeaf" x1="20" y1="8" x2="44" y2="56" gradientUnits="userSpaceOnUse">' +
						'<stop offset="0%"  stop-color="#bbf7d0"/>' +
						'<stop offset="50%" stop-color="#4ade80"/>' +
						'<stop offset="100%" stop-color="#16a34a"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<path d="M32 7 C19 19 17 41 32 57 C47 41 45 19 32 7 Z" fill="url(#bioLeaf)" stroke="#15803d" stroke-width="1.6" stroke-linejoin="round"/>' +
				'<path d="M32 12 L32 54" stroke="#15803d" stroke-width="2" opacity=".55" stroke-linecap="round"/>' +
				'<path d="M32 24 L23 19 M32 24 L41 19 M32 34 L22 30 M32 34 L42 30 M32 43 L25 40 M32 43 L39 40" stroke="#15803d" stroke-width="1.2" opacity=".4" stroke-linecap="round"/>' +
				'<path d="M27 16 C22 24 21 34 24 44" stroke="#ffffff" stroke-width="1.5" opacity=".45" stroke-linecap="round" fill="none"/>' +
			'</svg>';

		var checkSvg =
			'<svg class="check" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="bioHexFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#60a5fa"/>' +
						'<stop offset="100%" stop-color="#2563eb"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="url(#bioHexFill)" stroke="#93c5fd" stroke-width="2"/>' +
				'<path d="M20 32 L29 41 L46 24" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
			'</svg>';

		var xpSvg = '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>';

		// Заголовок в две строки, как в прототипе. Если ачивка из data
		// имеет ровно эти слова — рендерим с <br/> между «Первый этап» и
		// «по биологии». Иначе подаём как есть.
		var titleHtml = esc(a.title);
		if (a.id === 'bio_stage1') {
			titleHtml = 'Первый этап<br/>по биологии';
		}

		return (
			'<article class="ach ach--bio-host" data-state="' + state + '" tabindex="0">' +
				'<div class="bio-scale">' +
					'<div class="bio-card">' +
						'<div class="scene"></div>' +
						'<span class="rarity">' + esc(rarText) + '</span>' +
						'<div class="orb-stage">' +
							'<div class="hex h1" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="hex h2" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="hex h3" aria-hidden="true">' + hexSvg + '</div>' +
							'<div class="orb">' +
								leafSvg +
								'<span class="drop d1" aria-hidden="true"></span>' +
								'<span class="drop d2" aria-hidden="true"></span>' +
								'<span class="drop d3" aria-hidden="true"></span>' +
							'</div>' +
							checkSvg +
							'<span class="ball b1" aria-hidden="true"></span>' +
							'<span class="ball b2" aria-hidden="true"></span>' +
							'<span class="ball b3" aria-hidden="true"></span>' +
							'<span class="ball b4" aria-hidden="true"></span>' +
						'</div>' +
						'<div class="title-block">' +
							'<h4 class="title">' + titleHtml + '</h4>' +
							'<div class="subtitle">' + esc(a.desc) + '</div>' +
						'</div>' +
						'<div class="divider"><span></span></div>' +
						'<div class="prog">' +
							'<div class="prog-row">' +
								'<span class="label">Прогресс</span>' +
								'<span class="count"><b>' + progCur + '</b><span class="sep">/</span>' + progTgt + '</span>' +
							'</div>' +
							'<div class="prog-bar"><i style="width:' + progPct + '%"></i></div>' +
						'</div>' +
						'<div class="reward">' +
							'<div class="reward-item">' +
								'<div class="reward-ico">' + xpSvg + '</div>' +
								'<div class="reward-text">' +
									'<span class="reward-val">+' + (a.xpReward || 0) + ' XP</span>' +
									'<span class="reward-lbl">Награда</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="a-tip">' +
					'<div class="tt-name">' + esc(a.title) + '</div>' +
					'<div class="tt-desc">' + esc(a.desc) + '</div>' +
					'<div class="tt-meta">' + tipMeta + '</div>' +
				'</div>' +
			'</article>'
		);
	}

	/* Эпическая коллекционная карточка (full-bleed ref-card по прототипу
	   "Card Lab" v15). Используется для ачивок с iconUrl и занимает в
	   сетке 2×2 ячейки, чтобы прототип 340×510 поместился без сжатия.
	   Внутренние размеры через container query units → масштабируется
	   пропорционально на любом разрешении.
	   ВНИМАНИЕ: на текущий момент сюда не попадает ни одна ачивка из
	   каталога — chem_stage1 переехал в renderAchievementCardShake.
	   Оставляем как fallback для будущих illustrated-ачивок без
	   собственного card-style. */
	function renderAchievementCardIllus(a, state) {
		var rar = a.rarity || 'epic';
		var isBio = (a.id === 'bio_stage1');
		// .ach--bio — модификатор поверх .ach--illus в profile.css
		// (та же 1×1 ячейка, та же cqi-разметка, перекраска под биологию).
		var cls = ['ach', 'ach--illus', 'ach--ref', 'anim-shake'];
		if (isBio) cls.push('ach--bio');
		if (!a.unlocked) cls.push('locked');
		if (a.inProgress) cls.push('is-progress');
		if (a.unlocked) cls.push('is-earned');

		var rarText = rarityLabel(rar);
		// Процент-плашка слева сверху — единая «верхняя полка»
		// у всех карточек коллекции (правая часть — c-rar/a-rar).
		var pctText = (a.pctRare != null) ? rarityPrefix(rar) + a.pctRare + '%' : '';

		var progPct = 0, progCur = 0, progTgt = 1;
		if (a.progress) {
			progCur = a.progress.current;
			progTgt = a.progress.target;
			progPct = Math.max(0, Math.min(100, Math.round((progCur / progTgt) * 100)));
		} else if (a.unlocked) {
			progPct = 100;
			progCur = 1;
			progTgt = 1;
		}

		var tipMeta = '<span>+' + (a.xpReward || 0) + ' XP</span>' +
			'<span>' + (a.inProgress && a.progress ? (progCur + ' / ' + progTgt) : rarText) + '</span>';

		// Хексы рамки сцены — синие для био, фиолетовые для химии.
		var hexStroke = isBio ? '#60a5fa' : '#a78bfa';
		var hexSvg = '<svg viewBox="0 0 30 34" fill="none" stroke="' + hexStroke + '" stroke-width="1.2"><polygon points="15,2 28,9 28,25 15,32 2,25 2,9"/></svg>';

		// Центральный арт: химия → колба, биология → лист.
		// id градиентов уникальны для bio (bioRefLeaf), чтобы не перетереть
		// fill химической колбы (iqRefGlassFill) на одной странице.
		var flaskSvg =
			'<svg class="ref-flask" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="iqRefGlassFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#c4b5fd" stop-opacity=".25"/>' +
						'<stop offset="55%" stop-color="#a78bfa" stop-opacity=".9"/>' +
						'<stop offset="100%" stop-color="#7c3aed"/>' +
					'</linearGradient>' +
					'<linearGradient id="iqRefGlassEdge" x1="0" x2="1" y1="0" y2="1">' +
						'<stop offset="0%" stop-color="#ffffff"/>' +
						'<stop offset="100%" stop-color="#c4b5fd"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<rect x="26" y="6" width="12" height="14" rx="2" fill="none" stroke="url(#iqRefGlassEdge)" stroke-width="2.2"/>' +
				'<rect x="24" y="4" width="16" height="3" rx="1.5" fill="#fff" opacity=".9"/>' +
				'<path d="M26 18 L26 26 L12 52 Q10 58 16 58 L48 58 Q54 58 52 52 L38 26 L38 18 Z" fill="url(#iqRefGlassFill)" stroke="url(#iqRefGlassEdge)" stroke-width="2.2" stroke-linejoin="round"/>' +
				'<path d="M18 44 Q32 40 46 44" fill="none" stroke="#ffffff" stroke-width="1.5" opacity=".6"/>' +
				'<circle cx="22" cy="50" r="1.8" fill="#ffffff" opacity=".9"/>' +
				'<circle cx="30" cy="52" r="1.2" fill="#ffffff" opacity=".75"/>' +
				'<circle cx="38" cy="49" r="1.5" fill="#ffffff" opacity=".85"/>' +
				'<circle cx="42" cy="54" r="1" fill="#ffffff" opacity=".7"/>' +
				'<path d="M30 22 L20 48" stroke="#ffffff" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>' +
			'</svg>';

		var leafSvg =
			'<svg class="ref-flask ref-leaf" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="bioRefLeaf" x1="20" y1="8" x2="44" y2="56" gradientUnits="userSpaceOnUse">' +
						'<stop offset="0%"  stop-color="#bbf7d0"/>' +
						'<stop offset="50%" stop-color="#4ade80"/>' +
						'<stop offset="100%" stop-color="#16a34a"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<path d="M32 7 C19 19 17 41 32 57 C47 41 45 19 32 7 Z" fill="url(#bioRefLeaf)" stroke="#15803d" stroke-width="1.6" stroke-linejoin="round"/>' +
				'<path d="M32 12 L32 54" stroke="#15803d" stroke-width="2" opacity=".55" stroke-linecap="round"/>' +
				'<path d="M32 24 L23 19 M32 24 L41 19 M32 34 L22 30 M32 34 L42 30 M32 43 L25 40 M32 43 L39 40" stroke="#15803d" stroke-width="1.2" opacity=".4" stroke-linecap="round"/>' +
				'<path d="M27 16 C22 24 21 34 24 44" stroke="#ffffff" stroke-width="1.5" opacity=".45" stroke-linecap="round" fill="none"/>' +
			'</svg>';

		var orbInner = isBio ? leafSvg : flaskSvg;

		// Мини-чек в шестиграннике рядом с орбом — синий для био,
		// фиолетовый для химии. id градиента тоже уникальны.
		var checkSvg = isBio
			? '<svg class="ref-check" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="bioRefHexFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#60a5fa"/>' +
						'<stop offset="100%" stop-color="#2563eb"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="url(#bioRefHexFill)" stroke="#93c5fd" stroke-width="2"/>' +
				'<path d="M20 32 L29 41 L46 24" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
			'</svg>'
			: '<svg class="ref-check" viewBox="0 0 64 64" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="iqRefHexFill" x1="0" x2="0" y1="0" y2="1">' +
						'<stop offset="0%"  stop-color="#ffffff"/>' +
						'<stop offset="100%" stop-color="#ede9fe"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="url(#iqRefHexFill)" stroke="#c4b5fd" stroke-width="2"/>' +
				'<path d="M20 32 L29 41 L46 24" fill="none" stroke="#7c3aed" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
			'</svg>';

		var xpSvg = '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>';

		return (
			'<article class="' + cls.join(' ') + '" data-state="' + state + '" tabindex="0">' +
				'<div class="ref-scene" aria-hidden="true"></div>' +
				(pctText ? '<span class="a-pct">' + esc(pctText) + '</span>' : '') +
				'<span class="c-rar">' + esc(rarText) + '</span>' +
				'<div class="c-orb-stage">' +
					'<div class="float-hex fh1" aria-hidden="true">' + hexSvg + '</div>' +
					'<div class="float-hex fh2" aria-hidden="true">' + hexSvg + '</div>' +
					'<div class="float-hex fh3" aria-hidden="true">' + hexSvg + '</div>' +
					'<div class="ref-orb">' + orbInner + '</div>' +
					checkSvg +
					'<span class="float-ball fb1" aria-hidden="true"></span>' +
					'<span class="float-ball fb2" aria-hidden="true"></span>' +
					'<span class="float-ball fb3" aria-hidden="true"></span>' +
					'<span class="float-ball fb4" aria-hidden="true"></span>' +
				'</div>' +
				'<div class="c-title-block">' +
					'<h4 class="c-title">' + esc(a.title) + '</h4>' +
					'<div class="c-sub">' + esc(a.desc) + '</div>' +
				'</div>' +
				// FOOTER — буквально тот же компонент, что у обычной карты
				// «Неделя ритма»: тонкий .a-prog + компактный XP-чип .a-xp снизу.
				// Те же HTML-теги и CSS-классы → идентичные computed-размеры
				// (ширина/высота/padding чипа, длина полосы). Отличие только в
				// теме (фиолет=epic / синий=bio) — задаётся правилами
				// .ach--illus .a-xp в profile.css.
				// На illus-картах полосу показываем всегда, пока есть
				// a.progress и карта не unlocked — даже при current=0
				// (как было в старом .c-prog: пустая полоска = «ещё в начале»).
				((!a.unlocked && a.progress)
					? '<div class="a-prog" aria-label="' + progCur + ' из ' + progTgt + '"><i style="width:' + progPct + '%"></i></div>'
					: '') +
				'<div class="a-xp' + ((a.unlocked || a.inProgress) ? '' : ' a-xp--locked') + '">' +
					'<span class="a-xp-ico">' + xpSvg + '</span>' +
					'<span class="a-xp-val">+' + (a.xpReward || 0) + ' XP</span>' +
					'<span class="a-xp-lbl">награда</span>' +
				'</div>' +
				'<div class="a-tip">' +
					'<div class="tt-name">' + esc(a.title) + '</div>' +
					'<div class="tt-desc">' + esc(a.desc) + '</div>' +
					'<div class="tt-meta">' + tipMeta + '</div>' +
				'</div>' +
			'</article>'
		);
	}

	/* Карточка «Старт на портале» — 1:1 с прототипом из Cloud Design
	   (см. /extracted/_ach-start-card-import/start-card/). Разметка
	   повторяет start-card.html символ-в-символ; стили лежат в
	   /profile-start-card.css. Карточка фиксированных 340×510 px и
	   вписывается в 2×2 ячейки коллекции через CSS-обёртку
	   .ach--start-host > .start-scale (transform:scale, см. модуль).
	   В 1×1 ячейке (как было раньше) backpack/орб/искры ужимались
	   до 0.45× и теряли читаемость деталей. */
	function renderAchievementCardStart(a, state) {
		var rar = a.rarity || 'common';
		var rarText = rarityLabel(rar);

		var progPct = 0, progCur = 0, progTgt = 1;
		if (a.progress) {
			progCur = a.progress.current;
			progTgt = a.progress.target;
			progPct = Math.max(0, Math.min(100, Math.round((progCur / progTgt) * 100)));
		} else if (a.unlocked) {
			progPct = 100;
			progCur = 1;
			progTgt = 1;
		}

		var tipMeta = '<span>+' + (a.xpReward || 0) + ' XP</span>' +
			'<span>' + (a.inProgress && a.progress ? (progCur + ' / ' + progTgt) : rarText) + '</span>';

		// SVG рюкзака с уникальными id градиентов (sb-<ach.id>) — иначе
		// при двух start-card на странице первая «забирает» defs второй
		// и пейнт ломается. На профиле такой кейс не встречается, но
		// привычка дешевле дебага.
		var gid = 'sb-' + (a.id || 'start');
		var bagSvg =
			'<svg class="bag" viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
				'<defs>' +
					'<linearGradient id="' + gid + '-body" x1="32" y1="12" x2="32" y2="58" gradientUnits="userSpaceOnUse">' +
						'<stop offset="0%" stop-color="#ffffff"/>' +
						'<stop offset="100%" stop-color="#e6eaf2"/>' +
					'</linearGradient>' +
					'<linearGradient id="' + gid + '-pocket" x1="32" y1="34" x2="32" y2="56" gradientUnits="userSpaceOnUse">' +
						'<stop offset="0%" stop-color="#b3bace"/>' +
						'<stop offset="100%" stop-color="#8d96b2"/>' +
					'</linearGradient>' +
					'<linearGradient id="' + gid + '-strap" x1="0" y1="0" x2="0" y2="1">' +
						'<stop offset="0%" stop-color="#c7cddb"/>' +
						'<stop offset="100%" stop-color="#9aa2bd"/>' +
					'</linearGradient>' +
				'</defs>' +
				'<path d="M25 16 Q25 7 32 7 Q39 7 39 16" stroke="#c7cddb" stroke-width="3.4" stroke-linecap="round"/>' +
				'<path d="M22 18 Q14 22 15 36 L16 50" stroke="url(#' + gid + '-strap)" stroke-width="3.4" stroke-linecap="round"/>' +
				'<path d="M42 18 Q50 22 49 36 L48 50" stroke="url(#' + gid + '-strap)" stroke-width="3.4" stroke-linecap="round"/>' +
				'<rect x="14" y="15" width="36" height="43" rx="14" fill="url(#' + gid + '-body)" stroke="#d6dbe7" stroke-width="1.4"/>' +
				'<path d="M20 22 Q32 18 44 22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".7"/>' +
				'<text x="32" y="34" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="13" fill="#aeb6cc" letter-spacing=".5">IQ</text>' +
				'<path d="M21 41 Q21 35 27 35 L37 35 Q43 35 43 41 L43 51 Q43 56 37 56 L27 56 Q21 56 21 51 Z" fill="url(#' + gid + '-pocket)"/>' +
				'<rect x="26" y="44" width="12" height="3.2" rx="1.6" fill="#eef0f6" opacity=".85"/>' +
				'<path d="M25 39.5 Q32 37.5 39 39.5" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" opacity=".4"/>' +
			'</svg>';

		var xpSvg = '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>';

		// Tooltip висит на host'е (а не на .start-card), чтобы после
		// CSS scale не сжимался и читался одинаково на любой ширине.
		return (
			'<article class="ach ach--start-host" data-state="' + state + '" tabindex="0">' +
				'<div class="start-scale">' +
					'<div class="start-card">' +
						'<div class="scene"></div>' +
						'<span class="rarity">' + esc(rarText) + '</span>' +
						'<div class="orb-stage">' +
							'<div class="orb">' +
								'<span class="orbit"></span>' +
								bagSvg +
							'</div>' +
							'<span class="spark s1" aria-hidden="true"></span>' +
							'<span class="spark s2" aria-hidden="true"></span>' +
							'<span class="spark s3" aria-hidden="true"></span>' +
						'</div>' +
						'<div class="title-block">' +
							'<h4 class="title">' + esc(a.title) + '</h4>' +
							'<div class="subtitle">' + esc(a.desc) + '</div>' +
						'</div>' +
						'<div class="divider"><span></span></div>' +
						'<div class="prog">' +
							'<div class="prog-row">' +
								'<span class="label">Прогресс</span>' +
								'<span class="count"><b>' + progCur + '</b><span class="sep">/</span>' + progTgt + '</span>' +
							'</div>' +
							'<div class="prog-bar"><i style="width:' + progPct + '%"></i></div>' +
						'</div>' +
						'<div class="reward">' +
							'<div class="reward-item">' +
								'<div class="reward-ico">' + xpSvg + '</div>' +
								'<div class="reward-text">' +
									'<span class="reward-val">+' + (a.xpReward || 0) + ' XP</span>' +
									'<span class="reward-lbl">Награда</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="a-tip">' +
					'<div class="tt-name">' + esc(a.title) + '</div>' +
					'<div class="tt-desc">' + esc(a.desc) + '</div>' +
					'<div class="tt-meta">' + tipMeta + '</div>' +
				'</div>' +
			'</article>'
		);
	}

	function renderAchievements(list, avatarUrl) {
		var earned = list.filter(function (a) { return a.unlocked; }).length;
		var legendRare = list.filter(function (a) {
			return a.unlocked && (a.rarity === 'legend' || a.rarity === 'epic');
		}).length;
		var grade = collectionGrade(earned, list.length, legendRare);
		var inProgressCount = list.filter(function (a) { return a.inProgress; }).length;
		var lockedCount = list.filter(function (a) { return !a.unlocked && !a.inProgress; }).length;
		var avChip = avatarUrl
			? '<img class="prof-ach-avatar" src="' + esc(avatarUrl) + '" alt="" width="40" height="40" />'
			: '';
		var cards = list.map(renderAchievementCard).join('');

		return (
			'<section><div class="sec-head"><div class="sec-head-with-av">' + avChip +
			'<div><div class="sec-eye">Коллекция</div><h2 class="sec-title">Награды и достижения</h2></div></div>' +
			'<span class="sec-link" aria-hidden="true">Всего ' + list.length + ' достижений</span></div>' +
			'<div class="panel ach-panel">' +
				'<div class="ach-toolbar">' +
					'<div class="ach-counter">' +
						'<span><span class="cnt-big">' + earned + '</span> / ' + list.length + ' получено</span>' +
						'<span style="color:var(--muted-2);">·</span>' +
						'<span>редкость коллекции <span class="grade">' + esc(grade) + '</span></span>' +
					'</div>' +
					'<div class="ach-filter" role="tablist" data-ach-filter-bar>' +
						'<button type="button" class="is-on" data-filter="all" role="tab" aria-selected="true">Все <span class="cnt">' + list.length + '</span></button>' +
						'<button type="button" data-filter="earned" role="tab" aria-selected="false">Получено <span class="cnt">' + earned + '</span></button>' +
						'<button type="button" data-filter="inprogress" role="tab" aria-selected="false">В процессе <span class="cnt">' + inProgressCount + '</span></button>' +
						'<button type="button" data-filter="locked" role="tab" aria-selected="false">Закрыто <span class="cnt">' + lockedCount + '</span></button>' +
					'</div>' +
				'</div>' +
				'<div class="ach-grid" data-ach-filter="all">' + cards + '</div>' +
			'</div></section>'
		);
	}

	function bindAchievementsFilter() {
		var root = document.getElementById('prof-root');
		if (!root || root.__achFilterBound) return;
		root.__achFilterBound = true;
		root.addEventListener('click', function (ev) {
			var btn = ev.target && ev.target.closest && ev.target.closest('[data-ach-filter-bar] button[data-filter]');
			if (!btn) return;
			var bar = btn.closest('[data-ach-filter-bar]');
			var grid = bar && bar.parentNode && bar.parentNode.parentNode &&
				bar.parentNode.parentNode.querySelector('.ach-grid');
			if (!grid) return;
			bar.querySelectorAll('button[data-filter]').forEach(function (b) {
				var on = b === btn;
				b.classList.toggle('is-on', on);
				b.setAttribute('aria-selected', on ? 'true' : 'false');
			});
			grid.setAttribute('data-ach-filter', btn.getAttribute('data-filter') || 'all');
		});
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
		var nameDisplay = storedName || (d.isAuthed ? d.name : 'Ученик IQMO');
		var nameHint = storedName
			? 'Сохранено в этом браузере'
			: (d.isAuthed ? 'По умолчанию — из e-mail' : 'По умолчанию — «Ученик IQMO»');
		// SVG-иконки 24×24 для шапок карточек — стиль 1.6-stroke,
		// monoline, в цвет text-color (currentColor) чтобы совпадало
		// с .prof-card-acc--{kind} палитрой.
		var icoUser = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
			'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';
		var icoLock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
			'<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/><circle cx="12" cy="15.5" r="1.4" fill="currentColor"/></svg>';
		var icoGlobe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
			'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
		var icoLink = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
			'<path d="M9.5 14.5a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 0 0-5.7-5.7l-1 1"/>' +
			'<path d="M14.5 9.5a4 4 0 0 0-5.7 0l-3.3 3.3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';

		var pubLink = profileId
			? '<article class="prof-card-acc prof-card-acc--link iqmo-only-authed">' +
			  '<div class="prof-card-acc__head">' +
			  '<span class="prof-card-acc__ico">' + icoLink + '</span>' +
			  '<h3 class="prof-card-acc__title">Публичная ссылка</h3>' +
			  '</div>' +
			  '<p class="prof-card-acc__desc">Можно отправить друзьям — без e-mail и настроек.</p>' +
			  '<div class="prof-card-acc__row">' +
			  '<a href="/profile/' + esc(profileId) + '" id="prof-public-link" class="prof-card-acc__id">/profile/' + esc(profileId) + '</a>' +
			  '<button type="button" class="prof-card-acc__btn" id="prof-copy-link" data-copy-href="/profile/' + esc(profileId) + '">Копировать</button>' +
			  '</div>' +
			  '</article>'
			: '';
		return (
			'<section class="prof-settings prof-settings--cards" id="prof-account">' +
			'<header class="prof-settings__head">' +
			'<h2>Аккаунт и данные</h2>' +
			'<p>Управление сессией и именем в профиле.</p>' +
			'</header>' +
			'<div class="prof-settings__grid">' +
			// 1) Имя в профиле — display + edit-mode (toggle через data-mode)
			'<article class="prof-card-acc prof-card-acc--name" data-mode="display">' +
			'<div class="prof-card-acc__head">' +
			'<span class="prof-card-acc__ico">' + icoUser + '</span>' +
			'<h3 class="prof-card-acc__title">Имя в профиле</h3>' +
			'</div>' +
			'<div class="prof-card-acc__view">' +
			'<span class="prof-card-acc__name" id="prof-display-name-view">' + esc(nameDisplay) + '</span>' +
			'<button type="button" class="prof-card-acc__btn" id="prof-name-edit-toggle" aria-label="Редактировать имя">Редактировать</button>' +
			'</div>' +
			'<form class="prof-card-acc__edit prof-name-form" id="prof-name-form">' +
			'<input type="text" class="prof-name-input" id="prof-display-name" maxlength="32" ' +
			'placeholder="' + esc(d.isAuthed ? displayNameFromEmailPlaceholder(d) : 'Ученик IQMO') + '" ' +
			'value="' + esc(nameInputVal) + '" autocomplete="nickname" />' +
			'<div class="prof-card-acc__edit-actions">' +
			'<button type="submit" class="prof-card-acc__btn prof-card-acc__btn--primary" id="prof-save-name">Сохранить</button>' +
			'<button type="button" class="prof-card-acc__btn" id="prof-name-edit-cancel">Отмена</button>' +
			'</div>' +
			'</form>' +
			'<p class="prof-card-acc__hint">' + esc(nameHint) + '</p>' +
			'<p id="prof-name-status" class="stat-label" style="margin-top:8px" hidden></p>' +
			'</article>' +
			// 2) Сессии
			'<article class="prof-card-acc prof-card-acc--lock iqmo-only-authed">' +
			'<div class="prof-card-acc__head">' +
			'<span class="prof-card-acc__ico">' + icoLock + '</span>' +
			'<h3 class="prof-card-acc__title">Сессии</h3>' +
			'</div>' +
			'<p class="prof-card-acc__desc">Завершить вход на всех устройствах.</p>' +
			'<button type="button" class="prof-card-acc__btn" id="prof-logout-everywhere">Выйти на всех устройствах</button>' +
			'<p id="prof-logout-everywhere-status" class="stat-label" style="margin-top:8px" hidden></p>' +
			'</article>' +
			// 3) Живая активность
			'<article class="prof-card-acc prof-card-acc--live">' +
			'<div class="prof-card-acc__head">' +
			'<span class="prof-card-acc__ico">' + icoGlobe + '</span>' +
			'<h3 class="prof-card-acc__title">Живая активность</h3>' +
			'</div>' +
			'<p class="prof-card-acc__desc">Имя в ленте достижений (без фамилии и школы).</p>' +
			'<label class="prof-card-acc__toggle prof-live-opt">' +
			'<input type="checkbox" id="prof-live-activity-public" />' +
			'<span class="prof-card-acc__toggle-track" aria-hidden="true"></span>' +
			'<span class="prof-card-acc__toggle-text">Показывать в общей активности</span>' +
			'</label>' +
			'</article>' +
			// 4) Публичная ссылка (только для авторизованных)
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

	/** Обновляет цифры/полосы в шапке без пересоздания .orb-orbit (анимация точек не сбрасывается). */
	function patchHero(hero, p) {
		var d = p.profileData;
		if (!d || !hero) return;
		var sig = p.socialSignals || [];
		var streakDays = d.streakDays || 0;
		var xpPct = d.xpPct || 0;
		var avUrl = d.avatarUrl || (global.IqmoAvatar ? IqmoAvatar.getUrl() : '');
		var avOuter = hero.querySelector('.av-outer');
		if (avOuter) avOuter.setAttribute('style', avHoloRingStyle(xpPct));
		var avPct = hero.querySelector('.av-pct');
		if (avPct) avPct.textContent = xpPct + '%';
		var avChip = hero.querySelector('.av-chip');
		if (avChip) {
			avChip.innerHTML =
				'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>Ур. ' + d.level;
		}
		var avImg = hero.querySelector('[data-avatar-hero-img]');
		var avInitials = hero.querySelector('.av-initials');
		if (avUrl && avImg) {
			avImg.src = avUrl;
			if (avInitials) avInitials.remove();
		} else if (!avUrl && avImg) {
			avImg.remove();
			if (!avInitials) {
				var box = hero.querySelector('.av-img');
				if (box) {
					box.innerHTML = '<div class="av-initials" aria-hidden="true">' + esc(d.initials) + '</div>';
				}
			} else {
				avInitials.textContent = d.initials;
			}
		}
		var nameEl = hero.querySelector('#prof-hero-name');
		var nameForm = hero.querySelector('#prof-hero-name-form');
		if (nameEl && (!nameForm || nameForm.hidden)) nameEl.textContent = d.name;
		var handleEl = hero.querySelector('.h-handle');
		if (handleEl) handleEl.textContent = d.profileId;
		var rankEl = hero.querySelector('.h-meta-row .rank');
		if (rankEl) rankEl.innerHTML = metaRankLineV3(sig, d);
		// «Курс» убран из meta-row — patch только rank.
		var xpMax = d.nextLevel ? d.xpLevelMax : d.xpCurrent;
		var xpNums = IqmoProfileData.fmtPts(d.xpCurrent) + ' / ' + IqmoProfileData.fmtPts(xpMax);
		var xpEye = d.nextLevel
			? 'XP · ур. ' + d.level + ' → ' + d.nextLevel
			: 'XP · ур. ' + d.level;
		var xpNext = d.nextLevel
			? 'след.: <b>' + d.nextLevel + ' · «' + esc(d.levelTitle || '') + '»</b>'
			: 'макс. уровень';
		var xpUntil = d.nextLevel
			? 'Осталось ' + IqmoProfileData.fmtPts(d.xpToNext) + ' XP до ур. ' + d.nextLevel
			: '';
		var eyeEl = hero.querySelector('.xp-curr .eye');
		if (eyeEl) eyeEl.textContent = xpEye;
		var xpNumEl = hero.querySelector('.xp-curr .num');
		if (xpNumEl) xpNumEl.textContent = xpNums;
		var xpNextEl = hero.querySelector('.xp-next');
		if (xpNextEl) xpNextEl.innerHTML = xpNext;
		var xpBar = hero.querySelector('.xp-bar');
		var xpFill = hero.querySelector('.xp-fill');
		if (xpFill) xpFill.style.width = xpPct + '%';
		if (xpBar) {
			xpBar.setAttribute('aria-valuenow', String(xpPct));
		}
		var xpFoot = hero.querySelector('.xp-foot');
		if (xpFoot) {
			xpFoot.innerHTML =
				'<span>За неделю <b>+' + IqmoProfileData.fmtPts(d.weekXp) + ' XP</b></span>' +
				(xpUntil ? '<span class="untill">' + xpUntil + '</span>' : '<span class="untill"></span>');
		}
		var secRow = hero.querySelector('.h-id .sec-row');
		if (secRow) {
			var leagueDelta = d.leagueDelta ? '<div class="q-delta">▲ ' + d.leagueDelta + '</div>' : '';
			secRow.outerHTML = renderHeroStatsRow(d, leagueDelta, '', '');
		}
		var streakTop = hero.querySelector('.streak-top');
		if (streakTop) {
			var eyeStreak = streakTop.querySelector('.s-eye');
			if (eyeStreak) {
				eyeStreak.innerHTML = '<span class="pulse"></span>STREAK · ' + pad2(streakDays);
			}
			// Бейдж BONUS — чисто визуальный, без множителя.
			var bonus = streakTop.querySelector('.s-bonus');
			if (streakDays > 0) {
				var bonusHtml =
					'<span class="s-bonus" title="Декоративный бейдж серии">' +
					'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>' +
					'BONUS</span>';
				if (bonus) bonus.outerHTML = bonusHtml;
				else if (eyeStreak) eyeStreak.insertAdjacentHTML('afterend', bonusHtml);
			} else if (bonus) {
				bonus.remove();
			}
		}
		var sNum = hero.querySelector('.s-big .num');
		if (sNum) sNum.textContent = String(streakDays);
		// OrbitDots: пересоздаём содержимое .orb-orbit ТОЛЬКО если число дней
		// изменилось (data-orbit-days). Иначе CSS-анимация вращения сбросится
		// на каждом patchHero (а они идут по iqmo-sync довольно часто).
		var orbit = hero.querySelector('.orb-orbit');
		var orbEl = hero.querySelector('.orb');
		if (orbit && global.IqmoOrbitDots) {
			var newDays = Math.max(0, Math.round(Number(streakDays) || 0));
			var prevDays = Number(orbit.getAttribute('data-orbit-days'));
			if (!Number.isFinite(prevDays) || newDays !== prevDays) {
				orbit.innerHTML = IqmoOrbitDots.build(newDays);
				orbit.setAttribute('data-orbit-tier', IqmoOrbitDots.tierFor(newDays));
				orbit.setAttribute('data-orbit-days', String(newDays));
			}
			if (orbEl) {
				var tipText = streakTooltip(newDays);
				var tipEl = orbEl.querySelector('.orb-tip');
				if (tipEl) {
					tipEl.textContent = tipText;
				} else if (tipText) {
					var span = document.createElement('span');
					span.className = 'orb-tip';
					span.setAttribute('role', 'tooltip');
					span.textContent = tipText;
					orbEl.appendChild(span);
				}
				if (tipText) orbEl.setAttribute('aria-label', tipText);
			}
		}
		var sLbl = hero.querySelector('.s-big .lbl');
		if (sLbl) sLbl.textContent = streakLabel(streakDays);
		var sWarn = hero.querySelector('.s-warn');
		if (sWarn) {
			sWarn.innerHTML = streakDays > 0
				? 'Серия заряжена — продли до конца дня <b>сегодня</b>'
				: 'Начните серию — закройте дневную цель';
		}
		var streakFill = Math.min(100, Math.round((Math.min(streakDays, 7) / 7) * 100));
		var daysLeft = Math.max(0, 7 - streakDays);
		var vaultTitle = 'Неделя ритма';
		if (global.IqmoProfileData && IqmoProfileData.ACHIEVEMENT_CATALOG) {
			var ach = IqmoProfileData.ACHIEVEMENT_CATALOG.find(function (a) { return a.id === 'streak7'; });
			if (ach) vaultTitle = String(ach.title).replace(/[«»]/g, '').trim();
		}
		var daysLeftWord = pluralRu(daysLeft, ['день', 'дня', 'дней']);
		var progFill = hero.querySelector('.s-prog-fill');
		if (progFill) progFill.style.width = streakFill + '%';
		var progBar = hero.querySelector('.s-prog-bar');
		if (progBar) progBar.setAttribute('aria-label', streakDays + ' из 7 дней');
		var progFoot = hero.querySelector('.s-prog-foot');
		if (progFoot) {
			progFoot.innerHTML =
				'<span>' + pad2(Math.min(streakDays, 7)) + ' / 07 → <b>+' + daysLeft + ' ' + daysLeftWord + '</b></span>' +
				'<span class="rew"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4z"/></svg>' +
				esc(vaultTitle) + ' +200 XP</span>';
		}
	}

	function renderProfileTail(data) {
		var isPublic = !!data.isPublic;
		var profileId = data.profileData && data.profileData.profileId;
		var settingsBlock = isPublic ? '' : renderSettingsGuest() + renderSettingsAccount(profileId, data.profileData);
		return (
			(isPublic ? '' : renderXpGuide()) +
			renderGoals(data.nextGoalsData, isPublic) +
			renderAchievements(data.achievementsData, data.profileData && data.profileData.avatarUrl) +
			'<div class="row-2">' + renderActivity(data.activityData) + renderStats(data.statsData) + '</div>' +
			renderSubjects(data.subjectsProgressData) +
			(isPublic ? '' : renderCollectibles(data.collectiblesData || [])) +
			'<p class="footnote">Уровни, рамки и значки — дополнительная мотивация, а не учебный результат. Главная цель — освоение тем и подготовка к экзамену.</p>' +
			settingsBlock
		);
	}

	function paintNavAvatar(data) {
		if (!global.IqmoAvatar || !data.profileData) return;
		var navAv = document.getElementById('nav-avatar');
		if (!navAv) return;
		IqmoAvatar.paint(navAv, {
			url: data.profileData.avatarUrl,
			fallbackText: String(data.profileData.level),
			title: 'Уровень ' + data.profileData.level,
			imgClass: 'iqmo-av-img iqmo-av-img--nav'
		});
	}

	function render(data, options) {
		options = options || {};
		var root = document.getElementById('prof-root');
		if (!root || !data) return;
		var isPublic = !!data.isPublic;
		var existingHero = root.querySelector('.iqmo-hero.v3');

		if (options.preserveHero && existingHero && !isPublic) {
			patchHero(existingHero, data);
			var node = existingHero.nextSibling;
			while (node) {
				var next = node.nextSibling;
				node.remove();
				node = next;
			}
			var tail = document.createElement('div');
			tail.innerHTML = renderProfileTail(data);
			while (tail.firstChild) {
				root.appendChild(tail.firstChild);
			}
		} else {
			root.innerHTML =
				(isPublic ? renderPublicBanner(data) : '') +
				renderHero(data) +
				renderProfileTail(data);
		}

		paintNavAvatar(data);
	}

	function ensureAvatarSheet() {
		if (document.getElementById('iqmo-avatar-sheet')) return;
		var el = document.createElement('div');
		el.id = 'iqmo-avatar-sheet';
		el.hidden = true;
		el.innerHTML =
			'<div class="av-sheet-backdrop" data-avatar-close tabindex="-1"></div>' +
			'<div class="av-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="av-sheet-title">' +
			'<div class="av-sheet-handle" aria-hidden="true"></div>' +
			'<h2 class="av-sheet-title" id="av-sheet-title">Внешний вид профиля</h2>' +
			'<p class="av-sheet-sub">Выбери, как ты будешь выглядеть</p>' +
			'<div class="av-sheet-menu">' +
			'<button type="button" class="av-sheet-opt" data-avatar-preset="boy">' +
			'<span class="av-sheet-opt__thumb"><img src="' + IqmoAvatar.PRESET_URL.boy + '" alt="" /></span>' +
			'<span class="av-sheet-opt__txt"><span class="av-sheet-opt__em">👦</span> Мальчик</span></button>' +
			'<button type="button" class="av-sheet-opt" data-avatar-preset="girl">' +
			'<span class="av-sheet-opt__thumb"><img src="' + IqmoAvatar.PRESET_URL.girl + '" alt="" /></span>' +
			'<span class="av-sheet-opt__txt"><span class="av-sheet-opt__em">👧</span> Девочка</span></button>' +
			'<button type="button" class="av-sheet-opt av-sheet-opt--upload" data-avatar-upload-btn>' +
			'<span class="av-sheet-opt__thumb av-sheet-opt__thumb--upload"><span aria-hidden="true">⬆</span></span>' +
			'<span class="av-sheet-opt__txt" data-avatar-upload-label>Загрузить свой</span></button>' +
			'</div>' +
			'<input type="file" id="iqmo-avatar-file" accept="image/jpeg,image/png,image/webp" hidden />' +
			'<p class="av-sheet-hint">JPG, PNG или WebP · до 2&nbsp;МБ</p>' +
			'<p class="av-sheet-err" data-avatar-err role="alert"></p></div>';
		document.body.appendChild(el);
	}

	function syncSheetUi() {
		var sheet = document.getElementById('iqmo-avatar-sheet');
		if (!sheet || !global.IqmoAvatar) return;
		var cur = IqmoAvatar.read().preset || 'default';
		sheet.querySelectorAll('[data-avatar-preset]').forEach(function (btn) {
			var on = btn.getAttribute('data-avatar-preset') === cur;
			btn.classList.toggle('is-selected', on);
			btn.setAttribute('aria-pressed', on ? 'true' : 'false');
		});
		var up = sheet.querySelector('[data-avatar-upload-btn]');
		if (up) up.classList.toggle('is-selected', cur === 'custom');
		var lbl = sheet.querySelector('[data-avatar-upload-label]');
		if (lbl) lbl.textContent = IqmoAvatar.uploadLabel();
	}

	function openAvatarSheet() {
		ensureAvatarSheet();
		syncSheetUi();
		var sheet = document.getElementById('iqmo-avatar-sheet');
		if (!sheet) return;
		sheet.hidden = false;
		document.body.classList.add('iqmo-av-sheet-open');
		var first = sheet.querySelector('.av-sheet-opt');
		if (first) first.focus();
	}

	function closeAvatarSheet() {
		var sheet = document.getElementById('iqmo-avatar-sheet');
		if (!sheet) return;
		sheet.hidden = true;
		document.body.classList.remove('iqmo-av-sheet-open');
		var err = sheet.querySelector('[data-avatar-err]');
		if (err) err.textContent = '';
	}

	function avatarErrMsg(err) {
		if (err && err.message === 'type') return 'Подойдут только JPG, PNG или WebP.';
		if (err && err.message === 'size') return 'Файл слишком большой. Максимум 2 МБ.';
		return 'Не удалось загрузить изображение.';
	}

	function applyAvatarChoice(url) {
		IqmoAvatar.syncProfileDom(url);
		syncSheetUi();
	}

	function bindAvatarPicker() {
		if (bindAvatarPicker._bound || !global.IqmoAvatar) return;
		bindAvatarPicker._bound = true;
		ensureAvatarSheet();

		document.addEventListener('click', function (e) {
			if (e.target.closest('[data-avatar-trigger]')) {
				e.preventDefault();
				openAvatarSheet();
				return;
			}
			if (e.target.closest('[data-avatar-close]')) {
				e.preventDefault();
				closeAvatarSheet();
				return;
			}
			var presetBtn = e.target.closest('[data-avatar-preset]');
			if (presetBtn) {
				e.preventDefault();
				var preset = presetBtn.getAttribute('data-avatar-preset');
				var url = IqmoAvatar.setPreset(preset);
				var err = document.querySelector('[data-avatar-err]');
				if (err) err.textContent = '';
				applyAvatarChoice(url);
				closeAvatarSheet();
				return;
			}
			var uploadBtn = e.target.closest('[data-avatar-upload-btn]');
			if (uploadBtn) {
				e.preventDefault();
				var input = document.getElementById('iqmo-avatar-file');
				if (input) input.click();
			}
		});

		document.addEventListener('change', function (e) {
			if (e.target.id !== 'iqmo-avatar-file' || !e.target.files || !e.target.files[0]) return;
			var errEl = document.querySelector('[data-avatar-err]');
			IqmoAvatar.setCustomFromFile(e.target.files[0])
				.then(function (url) {
					if (errEl) errEl.textContent = '';
					applyAvatarChoice(url);
					closeAvatarSheet();
				})
				.catch(function (err) {
					if (errEl) errEl.textContent = avatarErrMsg(err);
				});
			e.target.value = '';
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && document.body.classList.contains('iqmo-av-sheet-open')) {
				closeAvatarSheet();
			}
		});
	}

	function closeHeroNameEdit() {
		var view = document.getElementById('prof-hero-name-view');
		var form = document.getElementById('prof-hero-name-form');
		if (view) view.hidden = false;
		if (form) form.hidden = true;
	}

	function bindNameEdit() {
		if (bindNameEdit._bound) return;
		bindNameEdit._bound = true;
		document.addEventListener('click', function (e) {
			var editBtn = e.target.closest('[data-name-edit]');
			if (editBtn) {
				e.preventDefault();
				var view = document.getElementById('prof-hero-name-view');
				var form = document.getElementById('prof-hero-name-form');
				var input = document.getElementById('prof-hero-name-input');
				var title = document.getElementById('prof-hero-name');
				if (!view || !form || !input) return;
				input.value = (title && title.textContent) ? title.textContent.trim() : input.value;
				view.hidden = true;
				form.hidden = false;
				input.focus();
				input.select();
				return;
			}
			if (e.target.closest('[data-name-cancel]')) {
				e.preventDefault();
				closeHeroNameEdit();
			}
		});
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
		renderHero: renderHero,
		patchHero: patchHero,
		renderError: renderError,
		bindCollectibles: bindCollectibles,
		bindAvatarPicker: bindAvatarPicker,
		bindNameEdit: bindNameEdit,
		bindAchievementsFilter: bindAchievementsFilter
	};
})(typeof window !== 'undefined' ? window : global);
