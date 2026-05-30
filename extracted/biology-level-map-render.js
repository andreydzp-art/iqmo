/**
 * Chemistry level-map renderer (pd/pf/pg design).
 * Used by full-test-chemistry hub and chapter-2.
 */
(function (global) {
	'use strict';

	let _mapCfg = null;

	const PD_CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.6L4 14.1 9 19l11-11-1.5-1.5z"/></svg>';
	const PD_LOCK_SVG = '<svg viewBox="0 0 24 24"><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 1 1 6 0v3H9z"/></svg>';
	const PD_STAR_PATH = 'M12 2l2.39 6.95H22l-6.2 4.51L18.18 22 12 17.5 5.82 22l2.38-8.54L2 8.95h7.61z';
	const PD_TROPHY_SVG = '<svg viewBox="0 0 24 24"><path d="M5 4h14v2a5 5 0 0 1-4 4.9V13a3 3 0 0 0 3 3v2H6v-2a3 3 0 0 0 3-3v-2.1A5 5 0 0 1 5 6V4z"/></svg>';

	function pdDifficultyLabel(idx) {
		if (idx <= 1) return 'лёгкая';
		if (idx <= 4) return 'средняя';
		return 'высокая';
	}

	function pdStarsHtml(filled) {
		let html = '<div class="pd-stars" aria-label="Звёзды: ' + filled + ' из 3">';
		for (let i = 1; i <= 3; i++) {
			const dim = i <= filled ? '' : ' style="opacity:.25"';
			html += '<svg viewBox="0 0 24 24"' + dim + '><path d="' + PD_STAR_PATH + '"/></svg>';
		}
		return html + '</div>';
	}

	function pdDecoHtml(chapterComplete) {
		if (chapterComplete) {
			return `
			<div class="pd-deco" aria-hidden="true">
		<svg class="pd-d1" viewBox="0 0 200 200">
			<g fill="none" stroke="#10b981" stroke-width="2.5">
				<ellipse cx="100" cy="100" rx="80" ry="30"/>
				<ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)"/>
				<ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)"/>
				<circle cx="100" cy="100" r="9" fill="#10b981"/>
				<circle cx="178" cy="100" r="4" fill="#10b981"/>
				<circle cx="60" cy="160" r="4" fill="#10b981"/>
				<circle cx="60" cy="40" r="4" fill="#10b981"/>
			</g>
		</svg>
		<svg class="pd-d2" viewBox="0 0 200 200">
			<g fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
				<path d="M70 30 L 70 80 L 40 160 Q 100 180 160 160 L 130 80 L 130 30 Z"/>
				<line x1="60" y1="30" x2="140" y2="30"/>
				<circle cx="80" cy="135" r="4" fill="#f59e0b"/>
				<circle cx="115" cy="145" r="3" fill="#f59e0b"/>
				<circle cx="95" cy="155" r="3" fill="#f59e0b"/>
			</g>
		</svg>
		<svg class="pd-d3" viewBox="0 0 200 200">
			<g fill="none" stroke="#b45309" stroke-width="2.5">
				<line x1="50" y1="60" x2="100" y2="100"/>
				<line x1="100" y1="100" x2="150" y2="60"/>
				<line x1="100" y1="100" x2="100" y2="160"/>
				<circle cx="50" cy="60" r="12" fill="#b45309" fill-opacity=".35"/>
				<circle cx="150" cy="60" r="12" fill="#b45309" fill-opacity=".35"/>
				<circle cx="100" cy="100" r="16" fill="#b45309" fill-opacity=".45"/>
				<circle cx="100" cy="160" r="12" fill="#b45309" fill-opacity=".35"/>
			</g>
		</svg>
		<svg class="pd-d4" viewBox="0 0 200 200">
			<g fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round">
				<path d="M80 20 L 80 150 Q 80 178 100 178 Q 120 178 120 150 L 120 20 Z"/>
				<line x1="74" y1="20" x2="126" y2="20"/>
				<line x1="80" y1="105" x2="120" y2="105"/>
				<circle cx="92" cy="155" r="4" fill="#fbbf24"/>
				<circle cx="108" cy="165" r="3" fill="#fbbf24"/>
			</g>
		</svg>
			</div>`;
		}
		return `
			<div class="pd-deco" aria-hidden="true">
		<svg class="pd-d1" viewBox="0 0 200 200">
			<g fill="none" stroke="#1e3a8a" stroke-width="2.5">
				<ellipse cx="100" cy="100" rx="80" ry="30"/>
				<ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(60 100 100)"/>
				<ellipse cx="100" cy="100" rx="80" ry="30" transform="rotate(120 100 100)"/>
				<circle cx="100" cy="100" r="9" fill="#1e3a8a"/>
				<circle cx="178" cy="100" r="4" fill="#1e3a8a"/>
				<circle cx="60" cy="160" r="4" fill="#1e3a8a"/>
				<circle cx="60" cy="40" r="4" fill="#1e3a8a"/>
			</g>
		</svg>
		<svg class="pd-d2" viewBox="0 0 200 200">
			<g fill="none" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round">
				<path d="M70 30 L 70 80 L 40 160 Q 100 180 160 160 L 130 80 L 130 30 Z"/>
				<line x1="60" y1="30" x2="140" y2="30"/>
				<circle cx="80" cy="135" r="4" fill="#0ea5e9"/>
				<circle cx="115" cy="145" r="3" fill="#0ea5e9"/>
				<circle cx="95" cy="155" r="3" fill="#0ea5e9"/>
			</g>
		</svg>
		<svg class="pd-d3" viewBox="0 0 200 200">
			<g fill="none" stroke="#0ea5e9" stroke-width="2.5">
				<line x1="50" y1="60" x2="100" y2="100"/>
				<line x1="100" y1="100" x2="150" y2="60"/>
				<line x1="100" y1="100" x2="100" y2="160"/>
				<circle cx="50" cy="60" r="12" fill="#0ea5e9" fill-opacity=".35"/>
				<circle cx="150" cy="60" r="12" fill="#0ea5e9" fill-opacity=".35"/>
				<circle cx="100" cy="100" r="16" fill="#0ea5e9" fill-opacity=".45"/>
				<circle cx="100" cy="160" r="12" fill="#0ea5e9" fill-opacity=".35"/>
			</g>
		</svg>
		<svg class="pd-d4" viewBox="0 0 200 200">
			<g fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
				<path d="M80 20 L 80 150 Q 80 178 100 178 Q 120 178 120 150 L 120 20 Z"/>
				<line x1="74" y1="20" x2="126" y2="20"/>
				<line x1="80" y1="105" x2="120" y2="105"/>
				<circle cx="92" cy="155" r="4" fill="#f59e0b"/>
				<circle cx="108" cy="165" r="3" fill="#f59e0b"/>
			</g>
		</svg>
			</div>`;
	}

	function chapterNodeCounts(variantInfos, bossInfo) {
		var passed = 0;
		(variantInfos || []).forEach(function (vi) {
			if (vi && vi.state === 'done') passed++;
		});
		if (bossInfo && bossInfo.state === 'done') passed++;
		return { passed: passed, total: (variantInfos || []).length + 1 };
	}

	function pdHeadHtml(cfg, stats, chapterComplete, chapterPassed, chapterTotal, ringPct, ringOffset) {
		const completedChip = chapterComplete
			? `<span class="pg-completed-chip">${PD_CHECK_SVG} Завершена</span>`
			: '';
		const subDone = chapterComplete
			? (cfg.chapterSubComplete || ('Все <b>' + chapterTotal + ' вариантов пройдены</b> · средний балл <b>' + stats.avgScore + '%</b>'))
			: (cfg.chapterSubInProgress || (chapterTotal + ' вариантов · сложность <b>повышенная</b>'));
		var progressLabel = chapterPassed + ' / ' + chapterTotal + ' пройдено';
		const ringGrad = chapterComplete ? 'pgRingGrad' : 'pfRingGrad';
		const ringStroke = chapterComplete ? '#fed7aa' : '#dbeafe';
		const metaRow = chapterComplete ? `
			<div class="pe-meta-row">
		<div class="pe-meta" title="XP за главу">
			<svg viewBox="0 0 24 24"><path fill="#fbbf24" d="${PD_STAR_PATH}"/></svg>
			<div class="pe-meta-text"><small>XP</small><b>+${_lmFmtNum(stats.totalXp)}</b></div>
		</div>
		<div class="pe-meta" title="Звёзды">
			<svg viewBox="0 0 24 24"><path fill="#fbbf24" d="${PD_STAR_PATH}"/></svg>
			<div class="pe-meta-text"><small>Звёзды</small><b>${stats.totalStars} / ${stats.maxStars}</b></div>
		</div>
			</div>` : `
			<div class="pd-legend">
		<span><i class="p"></i>Пройден</span>
		<span><i class="a"></i>Доступен</span>
		<span><i class="l"></i>Заблокирован</span>
		<span><i class="b"></i>Финал</span>
			</div>`;
		return `
			<header class="pd-head">
		<div>
			<span class="pd-eyebrow">${cfg.chapterEyebrow || 'Глава · Химия'}</span>
			<h2 class="pd-title">Карта уровней ${completedChip}</h2>
			<div class="pd-sub">${subDone}</div>
		</div>
		<div class="pd-head-right">
			<div class="pd-statpill" title="Прогресс главы">
				<div class="pd-ring" aria-hidden="true">
			<svg viewBox="0 0 36 36">
				<circle cx="18" cy="18" r="15" fill="none" stroke="${ringStroke}" stroke-width="3.5"/>
				<circle cx="18" cy="18" r="15" fill="none"
					stroke="url(#${ringGrad})" stroke-width="3.5"
					stroke-linecap="round"
					stroke-dasharray="94.25" stroke-dashoffset="${ringOffset}"
					transform="rotate(-90 18 18)"/>
				<defs>
					<linearGradient id="pfRingGrad" x1="0" x2="1" y1="0" y2="1">
				<stop offset="0" stop-color="#0ea5e9"/>
				<stop offset="1" stop-color="#f59e0b"/>
					</linearGradient>
					<linearGradient id="pgRingGrad" x1="0" x2="1" y1="0" y2="1">
				<stop offset="0" stop-color="#fbbf24"/>
				<stop offset="1" stop-color="#b45309"/>
					</linearGradient>
				</defs>
			</svg>
			<b>${ringPct}%</b>
				</div>
				<div class="pd-stat-meta">
			<small>Прогресс</small>
			<b>${progressLabel}</b>
				</div>
			</div>
			${metaRow}
		</div>
			</header>`;
	}

	function pdSvgHtml(chapterComplete) {
		if (chapterComplete) {
			return `
		<svg class="pd-svg" viewBox="0 0 1400 130" preserveAspectRatio="none" aria-hidden="true">
			<defs>
				<linearGradient id="pgPath" x1="0" x2="1" y1="0" y2="0">
			<stop offset="0" stop-color="#10b981"/>
			<stop offset="0.5" stop-color="#10b981"/>
			<stop offset="0.85" stop-color="#fbbf24"/>
			<stop offset="1" stop-color="#b45309"/>
				</linearGradient>
				<linearGradient id="pgPathSoft" x1="0" x2="1" y1="0" y2="0">
			<stop offset="0" stop-color="#10b981" stop-opacity=".22"/>
			<stop offset="0.6" stop-color="#10b981" stop-opacity=".22"/>
			<stop offset="1" stop-color="#b45309" stop-opacity=".22"/>
				</linearGradient>
				<filter id="pgGlow" x="-20%" y="-50%" width="140%" height="200%">
			<feGaussianBlur stdDeviation="3"/>
				</filter>
			</defs>
			<path id="pgRoute" d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
				fill="none" stroke="url(#pgPathSoft)" stroke-width="14" stroke-linecap="round" filter="url(#pgGlow)"/>
			<path d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
				fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>
			<path d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
				fill="none" stroke="url(#pgPath)" stroke-width="2.8" stroke-linecap="round" stroke-dasharray="2 9"/>
			<circle r="3.5" fill="#fbbf24">
				<animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#pgRoute"/></animateMotion>
			</circle>
			<circle r="2.5" fill="#10b981">
				<animateMotion dur="5s" begin="-1.6s" repeatCount="indefinite" rotate="auto"><mpath href="#pgRoute"/></animateMotion>
			</circle>
			<circle r="2" fill="#fde68a">
				<animateMotion dur="5s" begin="-3.2s" repeatCount="indefinite" rotate="auto"><mpath href="#pgRoute"/></animateMotion>
			</circle>
		</svg>`;
		}
		return `
			<svg class="pd-svg" viewBox="0 0 1400 130" preserveAspectRatio="none" aria-hidden="true">
		<defs>
			<linearGradient id="pfPath" x1="0" x2="1" y1="0" y2="0">
				<stop offset="0" stop-color="#10b981"/>
				<stop offset="0.18" stop-color="#0ea5e9"/>
				<stop offset="0.78" stop-color="#c4d4e9"/>
				<stop offset="1" stop-color="#b45309"/>
			</linearGradient>
			<linearGradient id="pfPathSoft" x1="0" x2="1" y1="0" y2="0">
				<stop offset="0" stop-color="#0ea5e9" stop-opacity=".18"/>
				<stop offset="0.5" stop-color="#0ea5e9" stop-opacity=".18"/>
				<stop offset="1" stop-color="#b45309" stop-opacity=".18"/>
			</linearGradient>
			<filter id="pfGlow" x="-20%" y="-50%" width="140%" height="200%">
				<feGaussianBlur stdDeviation="3"/>
			</filter>
		</defs>
		<path id="pfRoute" d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
			fill="none" stroke="url(#pfPathSoft)" stroke-width="14" stroke-linecap="round" filter="url(#pfGlow)"/>
		<path d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
			fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>
		<path d="M 90 78 C 220 30, 340 30, 460 70 S 700 110, 820 65 S 1060 30, 1180 70 S 1290 95, 1340 80"
			fill="none" stroke="url(#pfPath)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 9"/>
		<circle r="4" fill="#0ea5e9">
			<animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#pfRoute"/></animateMotion>
			<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite"/>
		</circle>
		<g transform="translate(1340 80)"><path d="M -6 -6 L 4 0 L -6 6 Z" fill="#b45309"/></g>
			</svg>`;
	}

	function pdNodeHtml(vi, idx, currentIdx) {
		const v = vi.v;
		const state = vi.state;
		const pdState = state === 'done' ? 'passed' : (state === 'current' ? 'active' : 'locked');
		const label = v.title || ('Вариант ' + v.id);
		const diff = vi.tier || pdDifficultyLabel(idx);
		let kicker = '<div class="pd-kicker">&nbsp;</div>';
		if (pdState === 'passed' && idx === 0) {
			kicker = '<div class="pd-kicker start"><svg viewBox="0 0 24 24" fill="currentColor"><path d="' + PD_STAR_PATH + '"/></svg> Старт главы</div>';
		} else if (pdState === 'active') {
			kicker = '<div class="pd-kicker now"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg> Ты здесь</div>';
		}
		let circleInner = '';
		if (pdState === 'locked') {
			circleInner = PD_LOCK_SVG;
		} else {
			circleInner = '<span class="num">' + v.id + '</span>';
			if (pdState === 'passed') {
				circleInner += '<span class="pd-check" aria-label="Пройден">' + PD_CHECK_SVG + '</span>';
			}
		}
		let body = '';
		if (pdState === 'passed' && vi.best) {
			const stars = _mapCfg.starsForPercent(vi.best.percent);
			const xp = global.IqmoLevelMapXp
				? IqmoLevelMapXp.xpForPassedNode(idx, false, vi.best.percent)
				: (_mapCfg.xpForVariant ? _mapCfg.xpForVariant(vi.best.percent) : 0);
			body = `
		<div class="pd-state passed">${PD_CHECK_SVG} Пройден · ${vi.best.percent}%</div>
		${pdStarsHtml(stars)}
		${xp ? '<span class="pd-xp">＋ ' + xp + ' XP</span>' : ''}`;
		} else if (pdState === 'active') {
			body = `
		<span class="pd-now"><i></i>Доступен сейчас</span>
		<button type="button" class="pd-cta" data-v="${v.id}">
			<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
			Начать вариант
			<svg class="pd-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
		</button>`;
		} else {
			body = '<div class="pd-state locked">Заблокирован</div>';
		}
		const dataAttrs = pdState !== 'locked'
			? ` data-v="${v.id}" data-state="${state}" role="button" tabindex="0"`
			: ` data-v="${v.id}" data-state="locked"`;
		return `
			<div class="pd-node ${pdState}"${dataAttrs}>
		${kicker}
		<div class="pd-circle">${circleInner}</div>
		<div class="pd-label">${label}</div>
		<div class="pd-meta">Сложность: <b>${diff}</b></div>
		${body}
			</div>`;
	}

	function pdBossNodeHtml(cfg, bossInfo, chapterComplete) {
		const v = bossInfo.v;
		const state = bossInfo.state;
		const bossName = cfg.bossName || 'Магистр химии';
		if (chapterComplete && bossInfo.best) {
			const stars = _mapCfg.starsForPercent(bossInfo.best.percent);
			const bossXp = global.IqmoLevelMapXp
				? IqmoLevelMapXp.xpForPassedNode(0, true, bossInfo.best.percent)
				: (_mapCfg.xpForVariant ? _mapCfg.xpForVariant(bossInfo.best.percent) : 550);
			return `
		<div class="pd-node boss passed" data-v="${v.id}" data-state="done" role="button" tabindex="0">
			<div class="pd-kicker boss" style="color:#0f9c5d">${PD_CHECK_SVG} Глава завершена</div>
			<div class="pd-bossCard">
				<span class="pe-shimmer" aria-hidden="true"></span>
				<div class="pe-sparkles" aria-hidden="true"><span class="sp"></span><span class="sp"></span><span class="sp"></span><span class="sp"></span></div>
				<div class="pd-bossTop">
			<span class="pd-finale">${PD_TROPHY_SVG} Супер-босс</span>
			<span class="pd-lockMini" aria-label="Побеждён">${PD_CHECK_SVG}</span>
				</div>
				<div class="pd-bossCircle">
			${PD_TROPHY_SVG}
			<span class="pe-victory-check" aria-label="Побеждён">${PD_CHECK_SVG}</span>
				</div>
				<div class="pd-bossName">${bossName}</div>
				<div class="pd-bossState">Побеждён · ${bossInfo.best.percent}%</div>
				<div class="pd-bossRewards">
			<span class="pd-reward got">${PD_CHECK_SVG} +${bossXp} XP</span>
			<span class="pd-reward got">${PD_CHECK_SVG} Бейдж</span>
			<span class="pd-reward got">${PD_CHECK_SVG} ${stars}★</span>
				</div>
			</div>
		</div>`;
		}
		const locked = state === 'locked';
		const current = state === 'current';
		const lockIcon = locked
			? '<span class="pd-lockMini" aria-label="Заблокирован">' + PD_LOCK_SVG + '</span>'
			: '';
		const bossStateTxt = locked ? 'Заблокирован' : (current ? 'Босс открыт' : 'Побеждён');
		// Текст-подсказку показываем тултипом на hover/focus самой карточки
		// босса. См. .pd-bossTip в chemistry-level-map.css (этот же файл
		// подключён и для биологии).
		const bossTip = locked
			? '<div class="pd-bossTip" role="tooltip">Откроется после прохождения предыдущих вариантов</div>'
			: '';
		const cta = current ? `
			<button type="button" class="pd-cta" data-v="${v.id}" style="margin-top:12px;width:100%;justify-content:center">
		<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
		Сразиться
		<svg class="pd-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</button>` : '';
		const dataAttrs = !locked ? ` data-v="${v.id}" data-state="${state}"` : ` data-v="${v.id}" data-state="locked"`;
		const kicker = '<div class="pd-kicker boss"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg> Финал главы</div>';
		const previewBossXp = global.IqmoLevelMapXp ? IqmoLevelMapXp.bossPreviewXp() : 550;
		return `
			<div class="pd-node boss${locked ? ' locked' : (current ? ' active' : ' passed')}"${dataAttrs}${!locked ? ' role="button" tabindex="0"' : ''}${locked ? ' tabindex="0"' : ''}>
		${kicker}
		<div class="pd-bossCard">
			<div class="pd-bossTop">
				<span class="pd-finale">${PD_TROPHY_SVG} Супер-босс</span>
				${lockIcon}
			</div>
			<div class="pd-bossCircle">
				<svg viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 11-13h-7z"/></svg>
			</div>
			<div class="pd-bossName">${bossName}</div>
			<div class="pd-bossState">${bossStateTxt}</div>
			<div class="pd-bossRewards">
				<span class="pd-reward"><svg viewBox="0 0 24 24"><path d="${PD_STAR_PATH}"/></svg> +${previewBossXp} XP</span>
				<span class="pd-reward">${PD_TROPHY_SVG} Бейдж</span>
			</div>
			${cta}
		</div>
		${bossTip}
			</div>`;
	}

	function pdFootHtml(cfg, variantInfos, bossInfo, currentIdx, stats, chapterComplete, chapterPassed, chapterTotal, meterPct) {
		const barCount = chapterPassed;
		const barTotal = chapterTotal;
		let nextHtml = '';
		if (chapterComplete) {
			nextHtml = `
		<div class="pg-recap">
			<svg viewBox="0 0 24 24"><path d="${PD_STAR_PATH}"/></svg>
			${cfg.completeRecapPrefix || 'Глава завершена'} · <b>${stats.totalStars} / ${stats.maxStars} звёзд</b> · средний <b>${stats.avgScore}%</b> · <b>+${_lmFmtNum(stats.totalXp)} XP</b>
		</div>
		<a class="pg-cta-replay" href="${cfg.completeCtaHref || '/subject-chemistry/'}">
			<svg viewBox="0 0 24 24"><path d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.74 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
			${cfg.completeCtaLabel || 'К предмету →'}
		</a>`;
		} else {
			let nextGoal = 'пройти следующий вариант';
			if (currentIdx >= 0) {
				const cur = variantInfos[currentIdx];
				const nxt = variantInfos[currentIdx + 1];
				const curLabel = cur.v.title || ('Вариант ' + cur.v.id);
				if (nxt) {
					const nxtLabel = nxt.v.title || ('Вариант ' + nxt.v.id);
					nextGoal = 'пройти <b>' + curLabel + '</b>, чтобы открыть <b>' + nxtLabel + '</b>';
				} else {
					const bossLabel = (cfg.bossName || bossInfo.v.title || ('Вариант ' + bossInfo.v.id));
					nextGoal = 'пройти <b>' + curLabel + '</b>, чтобы открыть <b>' + bossLabel + '</b>';
				}
			}
			const stepsLeft = chapterTotal - chapterPassed;
			nextHtml = '<div class="pd-next">Следующая цель: ' + nextGoal + ' · до финала <b>' + stepsLeft + ' ' + plural(stepsLeft, ['шаг', 'шага', 'шагов']) + '</b></div>';
		}
		return `
			<div class="pd-foot">
		<div class="pd-bar">
			<span>Прогресс главы</span>
			<div class="pd-meter" aria-label="${barCount} из ${barTotal}"><i style="width:${meterPct}%"></i></div>
			<b>${barCount} / ${barTotal}</b>
		</div>
		${nextHtml}
			</div>`;
	}

	function _lmFmtNum(n) {
		try { return Number(n).toLocaleString('ru-RU'); } catch (e) { return String(n); }
	}

	function buildMapHtml(cfg) {
		const { variantInfos, bossInfo, currentIdx, stats } = cfg;
		const chapterComplete = bossInfo.state === 'done';
		const ch = chapterNodeCounts(variantInfos, bossInfo);
		const ringPct = ch.total ? Math.round(100 * ch.passed / ch.total) : 0;
		const ringOffset = (94.25 * (1 - ringPct / 100)).toFixed(1);
		const meterPct = ch.total ? (100 * ch.passed / ch.total) : 0;
		const cardCls = chapterComplete ? 'map-card pd-card pf-card pg-card' : 'map-card pd-card pf-card';
		return `
			<section class="${cardCls}" aria-label="Карта уровней">
		${pdDecoHtml(chapterComplete)}
		${pdHeadHtml(cfg, stats, chapterComplete, ch.passed, ch.total, ringPct, ringOffset)}
		<div class="pd-map">
			${pdSvgHtml(chapterComplete)}
			<div class="pd-nodes">
				${variantInfos.map((vi, idx) => pdNodeHtml(vi, idx, currentIdx)).join('')}
				${pdBossNodeHtml(cfg, bossInfo, chapterComplete)}
			</div>
		</div>
		${pdFootHtml(cfg, variantInfos, bossInfo, currentIdx, stats, chapterComplete, ch.passed, ch.total, meterPct)}
			</section>`;
	}

	function plural(n, forms) {
		const a = Math.abs(n) % 100;
		const b = a % 10;
		if (a > 10 && a < 20) return forms[2];
		if (b > 1 && b < 5) return forms[1];
		if (b === 1) return forms[0];
		return forms[2];
	}

	function wireMap(host, cfg) {
		var onGo = cfg.onGo || function (v, st) {
			if (st === 'locked') {
				alert('Чтобы открыть этот узел, пройдите предыдущие с результатом ≥ 50% в части 1.');
				return;
			}
			if (cfg.baseUrl) global.location.href = cfg.baseUrl + v;
		};
		host.querySelectorAll('.pd-node[data-v]').forEach(function (el) {
			if (el.dataset.state === 'locked') return;
			el.addEventListener('click', function (e) {
				if (e.target.closest('.pd-cta')) return;
				onGo(el.dataset.v, el.dataset.state);
			});
			el.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onGo(el.dataset.v, el.dataset.state);
				}
			});
		});
		host.querySelectorAll('.pd-cta[data-v]').forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.stopPropagation();
				onGo(btn.dataset.v, 'current');
			});
		});
	}

	function render(host, cfg) {
		if (!host || !cfg) return;
		cfg.starsForPercent = cfg.starsForPercent || function (p) {
			if (p >= 90) return 3;
			if (p >= 70) return 2;
			if (p >= 50) return 1;
			return 0;
		};
		cfg.xpForVariant = cfg.xpForVariant || function (p) {
			if (p < 50) return 0;
			var xp = 100;
			if (p >= 80) xp += 50;
			if (p >= 90) xp += 50;
			return xp;
		};
		_mapCfg = cfg;
		host.innerHTML = buildMapHtml(cfg);
		wireMap(host, cfg);
	}

	global.IqmoBioLevelMap = { render: render, buildMapHtml: buildMapHtml };
})(typeof window !== 'undefined' ? window : global);
