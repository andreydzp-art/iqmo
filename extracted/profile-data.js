/**
 * IQMO profile — сбор данных для страницы профиля.
 * Моки помечены mock: true; заменяются API позже.
 */
(function (global) {
	'use strict';

	var CHEM_TOPICS = [
		{ key: 'iqmo-chem-topic01-subtopics', n: 6, label: '01 · Периодическая система' },
		{ key: 'iqmo-chem-topic02-subtopics', n: 6, label: '02 · Строение атома' },
		{ key: 'iqmo-chem-topic03-subtopics', n: 7, label: '03 · Химическая связь' },
		{ key: 'iqmo-chem-topic04-subtopics', n: 6, label: '04 · Классы неорганики' },
		{ key: 'iqmo-chem-topic05-subtopics', n: 6, label: '05 · Реакции' },
		{ key: 'iqmo-chem-topic06-subtopics', n: 6, label: '06 · Растворы' },
		{ key: 'iqmo-chem-topic07-subtopics', n: 6, label: '07 · Металлы' },
		{ key: 'iqmo-chem-topic08-subtopics', n: 7, label: '08 · Неметаллы' },
		{ key: 'iqmo-chem-topic09-subtopics', n: 7, label: '09 · Органика' },
		{ key: 'iqmo-chem-topic10-subtopics', n: 7, label: '10 · Экология' }
	];

	var CH1_VARIANT_IDS = [1, 2, 3, 4, 5, 6, 7];

	var ACHIEVEMENT_CATALOG = [
		{ id: 'welcome', title: 'Старт', desc: 'Первый визит в IQMO.', rarity: 'common', icon: 'star' },
		{ id: 'three_tests', title: 'Тройка тестов', desc: 'Завершено 3 учтённых теста.', rarity: 'common', icon: 'book' },
		{ id: 'streak7', title: 'Неделя ритма', desc: '7 дней подряд с закрытой дневной целью.', rarity: 'epic', icon: 'flame' },
		{ id: 'chem_stage1', title: 'Этап 1 · Химия', desc: 'Все 7 вариантов главы 1 по химии.', rarity: 'epic', icon: 'trophy' },
		{ id: 'bio_stage1', title: 'Этап 1 · Биология', desc: 'Все 7 вариантов главы 1 по биологии.', rarity: 'epic', icon: 'trophy' },
		{ id: 'ten_tests', title: 'Десятка', desc: '10 завершённых попыток.', rarity: 'rare', icon: 'medal' },
		{ id: 'perfect_run', title: 'Без ошибок', desc: '100% при ≥5 вопросах в зачёте.', rarity: 'rare', icon: 'target' },
		{ id: 'topic_star', title: 'Мастер темы', desc: 'Полностью освоена хотя бы одна тема.', rarity: 'rare', icon: 'spark' },
		{ id: 'final_sprint', title: 'Финишный рывок', desc: 'Максимальный уровень (50).', rarity: 'legend', icon: 'crown' }
	];

	var COLLECTIBLES_CATALOG = [
		{ id: 'gold-crown', name: 'Золотая корона', desc: 'За лучшую неделю в личной лиге.', rarity: 'legend', locked: true, progress: null },
		{ id: 'violet-aura', name: 'Фиолетовая аура', desc: 'За прохождение этапа 1 по двум предметам.', rarity: 'epic', locked: true, progress: null },
		{ id: 'blue-ring', name: 'Синий контур', desc: 'За серию 7 дней без перерыва.', rarity: 'rare', locked: false, progress: null },
		{ id: 'may-storm', name: 'Майская гроза', desc: 'Сезонная награда — 7 дней подряд с закрытой дневной целью.', rarity: 'epic', locked: true, progress: { current: 0, total: 7, label: 'серия' } }
	];

	function lsGet(key, fallback) {
		try {
			var raw = localStorage.getItem(key);
			if (raw == null) return fallback;
			return JSON.parse(raw);
		} catch (e) {
			return fallback;
		}
	}

	function fmtPts(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	function profileIdFromUser(me, anonId) {
		if (me && me.id != null) return 'IQ-' + String(me.id).padStart(4, '0');
		if (anonId) {
			var h = 0;
			for (var i = 0; i < anonId.length; i++) h = (h * 31 + anonId.charCodeAt(i)) >>> 0;
			return 'IQ-' + String(h % 10000).padStart(4, '0');
		}
		return 'IQ-0000';
	}

	function displayNameFromMe(me) {
		if (!me || !me.email) return 'Ученик IQMO';
		var local = String(me.email).split('@')[0] || 'Ученик';
		local = local.replace(/[._-]+/g, ' ').trim();
		if (!local) return 'Ученик IQMO';
		return local.split(/\s+/).map(function (w) {
			return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
		}).join(' ');
	}

	function starsForPercent(p) {
		var n = Number(p);
		if (!Number.isFinite(n)) return 0;
		if (n >= 90) return 3;
		if (n >= 70) return 2;
		if (n >= 50) return 1;
		return 0;
	}

	function readVariantBest(prefix, id) {
		try {
			var raw = localStorage.getItem(prefix + id);
			if (!raw) return null;
			var s = JSON.parse(raw);
			if (!s || !s.finished) return null;
			var part1 = s.part1Percent != null ? Number(s.part1Percent) : null;
			var pct = part1 != null ? part1 : (s.percent != null ? Number(s.percent) : null);
			if (pct == null) pct = 50;
			return {
				finished: true,
				part1Percent: pct,
				passed: pct >= 50,
				stars: starsForPercent(pct)
			};
		} catch (e) {
			return null;
		}
	}

	function summarizeVariants(prefix, ids) {
		var passed = 0;
		var finished = 0;
		var totalStars = 0;
		var maxStars = ids.length * 3;
		var pctSum = 0;
		var pctCount = 0;
		for (var i = 0; i < ids.length; i++) {
			var b = readVariantBest(prefix, ids[i]);
			if (!b) continue;
			finished++;
			if (b.passed) passed++;
			totalStars += b.stars;
			pctSum += b.part1Percent;
			pctCount++;
		}
		return {
			passed: passed,
			finished: finished,
			total: ids.length,
			stars: totalStars,
			maxStars: maxStars,
			avgPart1: pctCount ? Math.round(pctSum / pctCount) : 0
		};
	}

	function initials(name) {
		var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
		if (!parts.length) return 'IQ';
		if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
		return (parts[0][0] + parts[1][0]).toUpperCase();
	}

	function readTopicPct(key, n) {
		try {
			var raw = localStorage.getItem(key);
			if (!raw) return null;
			var a = JSON.parse(raw);
			if (!Array.isArray(a)) return null;
			var done = 0;
			var partial = 0;
			for (var i = 0; i < n; i++) {
				var v = a[i] === 2 ? 2 : a[i] === 1 ? 1 : 0;
				if (v === 2) done++;
				else if (v === 1) partial++;
			}
			var pct = Math.min(100, Math.round((done * 100 + partial * 45) / n));
			return { pct: pct, done: done, partial: partial };
		} catch (e) {
			return null;
		}
	}

	function chemTopicsSummary() {
		var sum = 0;
		var count = 0;
		var doneTopics = 0;
		for (var i = 0; i < CHEM_TOPICS.length; i++) {
			var t = CHEM_TOPICS[i];
			var st = readTopicPct(t.key, t.n);
			if (st) {
				sum += st.pct;
				count++;
				if (st.done >= t.n) doneTopics++;
			}
		}
		return {
			avgPct: count ? Math.round(sum / count) : 0,
			doneTopics: doneTopics,
			totalTopics: CHEM_TOPICS.length
		};
	}

	function modeRu(mode) {
		if (mode === 'warmup') return 'Разминка';
		if (mode === 'trial') return 'Пробник';
		if (mode === 'full') return 'Полный вариант';
		if (mode === 'quick') return 'Быстрый тест';
		return 'Тренировка';
	}

	function buildActivityFeed(snap) {
		var events = [];
		if (global.ChemProgress && ChemProgress.getLastAttempt) {
			var la = ChemProgress.getLastAttempt();
			if (la && la.finishedAt) {
				var subj = la.subject === 'biology' ? 'биологии' : 'химии';
				var pct = la.percent != null ? la.percent : '';
				events.push({
					type: 'test',
					text: 'Завершён <b>' + modeRu(la.mode) + '</b>' +
						(la.variantTitle ? ' · ' + la.variantTitle : '') +
						' по ' + subj,
					pills: pct !== '' ? [{ kind: 'pct', value: pct + '%' }] : [],
					time: ChemProgress.formatRelativeTime(la.finishedAt)
				});
			}
		}
		var badges = (snap && snap.badges) || {};
		var order = ['final_sprint', 'chem_stage1', 'bio_stage1', 'streak7', 'perfect_run', 'ten_tests', 'three_tests', 'topic_star', 'welcome'];
		for (var b = 0; b < order.length; b++) {
			var bid = order[b];
			if (!badges[bid]) continue;
			var cat = ACHIEVEMENT_CATALOG.find(function (x) { return x.id === bid; });
			if (!cat) continue;
			events.push({
				type: 'badge',
				text: 'Получена награда <b>«' + cat.title + '»</b>',
				pills: [{ kind: 'xp', value: '+50 XP' }],
				time: ChemProgress && ChemProgress.formatRelativeTime
					? ChemProgress.formatRelativeTime(badges[bid])
					: ''
			});
		}
		try {
			var streak = lsGet('iqmo-chem-streak', { days: 0 });
			if (streak && streak.days >= 3) {
				events.push({
					type: 'streak',
					text: 'Серия дней: <b>' + streak.days + ' дней подряд</b>',
					pills: [],
					time: 'на этой неделе'
				});
			}
		} catch (eS) {}
		if (events.length < 3) {
			events.push({
				type: 'complete',
				text: 'Продолжайте тренировки — здесь появится история прогресса.',
				pills: [],
				time: ''
			});
		}
		return events.slice(0, 8);
	}

	function buildAchievements(snap) {
		var earned = (snap && snap.badges) || {};
		return ACHIEVEMENT_CATALOG.map(function (cat) {
			var ts = earned[cat.id];
			var unlocked = !!ts;
			return {
				id: cat.id,
				title: cat.title,
				desc: cat.desc,
				rarity: cat.rarity,
				icon: cat.icon,
				pctEarned: unlocked ? null : null,
				unlocked: unlocked,
				earnedAt: unlocked ? ts : null,
				locked: !unlocked
			};
		});
	}

	function buildCollectibles(snap) {
		var equipped = null;
		try {
			equipped = localStorage.getItem('iqmo-equipped-frame');
		} catch (e) {}
		var streakDays = 0;
		try {
			streakDays = (lsGet('iqmo-chem-streak', {}) || {}).days || 0;
		} catch (e2) {}
		var badges = (snap && snap.badges) || {};
		var league = snap && snap.league ? snap.league : { rank: 1 };
		var weekPts = snap && snap.week ? snap.week.points : 0;
		return COLLECTIBLES_CATALOG.map(function (c) {
			var item = Object.assign({}, c);
			if (c.id === 'blue-ring') {
				item.locked = streakDays < 7;
			}
			if (c.id === 'gold-crown') {
				item.locked = !(league.rank <= 1 && weekPts > 0);
			}
			if (c.id === 'violet-aura') {
				item.locked = !(badges.chem_stage1 && badges.bio_stage1);
			}
			if (c.id === 'may-storm' && c.progress) {
				item.locked = streakDays < 7;
				item.progress = {
					current: Math.min(streakDays, c.progress.total),
					total: c.progress.total,
					label: c.progress.label
				};
			}
			item.equipped = equipped === c.id;
			return item;
		});
	}

	function buildSubjectsProgress(snap, lv) {
		var bioV = summarizeVariants('iqmo-bio-v-', CH1_VARIANT_IDS);
		var chemV = summarizeVariants('iqmo-chem-v-', CH1_VARIANT_IDS);
		var chemTopics = chemTopicsSummary();
		var bioPct = CH1_VARIANT_IDS.length
			? Math.round((bioV.passed / CH1_VARIANT_IDS.length) * 100)
			: 0;
		var chemMapPct = CH1_VARIANT_IDS.length
			? Math.round((chemV.passed / CH1_VARIANT_IDS.length) * 100)
			: 0;
		var chemPct = Math.max(chemMapPct, chemTopics.avgPct);
		return [
			{
				slug: 'biology',
				name: 'Биология',
				sub: 'ОГЭ · карта уровней · глава 1',
				level: lv.current,
				pct: bioPct,
				status: bioPct >= 100 ? 'done' : bioPct > 0 ? 'progress' : 'new',
				meta: [
					{ label: 'вариантов', value: bioV.passed + ' / ' + CH1_VARIANT_IDS.length },
					{ label: 'звёзды', value: bioV.stars + ' / ' + bioV.maxStars }
				],
				topSignal: bioV.passed > 0
					? { text: 'ср. ' + bioV.avgPart1 + '% по части 1' }
					: null,
				href: '/full-test-biology/'
			},
			{
				slug: 'chemistry',
				name: 'Химия',
				sub: 'ОГЭ · 10 тем · ' + chemTopics.totalTopics + ' разделов',
				level: lv.current,
				pct: chemPct,
				status: chemPct >= 100 ? 'done' : chemPct > 0 ? 'progress' : 'new',
				meta: [
					{ label: 'тем', value: chemTopics.doneTopics + ' / ' + chemTopics.totalTopics },
					{ label: 'вариантов', value: chemV.passed + ' / ' + CH1_VARIANT_IDS.length },
					{ label: 'звёзды', value: chemV.stars + ' / ' + chemV.maxStars }
				],
				topSignal: chemV.passed > 0
					? { text: 'ср. ' + chemV.avgPart1 + '% по части 1' }
					: null,
				href: '/subject-chemistry/'
			}
		];
	}

	function buildNextGoals(snap) {
		var lv = snap.level || { current: 1, xpToNext: 200, progressFrac: 0 };
		var streak = lsGet('iqmo-chem-streak', { days: 0 }) || { days: 0 };
		var goal = snap.goal && snap.goal.target ? snap.goal.target : 10;
		var today = snap.daily ? snap.daily.tasksDone || 0 : 0;
		var league = snap.league || { rank: 1, gapToPrev: 0 };
		return [
			{
				kind: 'gold',
				primary: true,
				eye: 'До нового уровня',
				big: fmtPts(lv.xpToNext || 0) + ' XP',
				text: 'до уровня ' + (lv.current + 1) + ' «' + (snap.levelTitle || '') + '»',
				foot: lv.current >= 50 ? 'Максимальный уровень' : '≈ ещё несколько вариантов',
				pct: Math.round((lv.progressFrac || 0) * 100)
			},
			{
				kind: 'streak',
				primary: false,
				eye: 'Награда за серию',
				big: Math.max(0, 7 - (streak.days || 0)) + ' дн.',
				text: 'до бонуса 7 дней подряд',
				foot: 'награда: <b>значок «Неделя ритма»</b>',
				pct: Math.min(100, Math.round(((streak.days || 0) / 7) * 100))
			},
			{
				kind: 'badge',
				primary: false,
				eye: 'Дневная цель',
				big: Math.max(0, goal - today) + ' задач',
				text: 'до закрытия цели на сегодня',
				foot: 'сегодня: <b>' + today + ' / ' + goal + '</b>',
				pct: goal ? Math.min(100, Math.round((today / goal) * 100)) : 0
			},
			{
				kind: 'league',
				primary: false,
				eye: 'Лига недели',
				big: league.gapToPrev ? '+' + league.gapToPrev + ' XP' : '—',
				text: league.rank <= 1 ? 'лучшая неделя за период' : 'до места выше в лиге',
				foot: 'место <b>' + league.rank + ' / ' + league.size + '</b>',
				pct: league.size > 1 ? Math.max(10, 100 - league.rank * 8) : 50
			}
		];
	}

	function buildStats(snap) {
		var ast = snap.attemptStats || { total: 0 };
		var tasks = snap.totalTasksLifetime || 0;
		var ms = snap.totalActiveMs || 0;
		var hours = Math.floor(ms / 3600000);
		var mins = Math.round((ms % 3600000) / 60000);
		var streak = lsGet('iqmo-chem-streak', { days: 0 }) || { days: 0 };
		var la = global.ChemProgress && ChemProgress.getLastAttempt ? ChemProgress.getLastAttempt() : null;
		var avg = snap.accuracyAverage != null
			? snap.accuracyAverage
			: (la && la.percent != null ? la.percent : null);
		var avgLabel = snap.accuracyAverage != null
			? 'среднее по ' + (ast.total || 0) + ' попыткам'
			: 'последняя попытка';
		return [
			{ kind: 'solved', top: null, value: String(tasks || ast.total || 0), unit: '', label: 'Решено задач', delta: snap.week ? 'за неделю +' + (snap.week.points || 0) + ' XP' : '' },
			{ kind: 'score', top: null, value: avg != null ? String(avg) : '—', unit: avg != null ? '%' : '', label: 'Средний результат', delta: avgLabel },
			{ kind: 'hours', top: null, value: String(hours), unit: hours ? 'ч' : 'мин', label: 'Часов учёбы', delta: hours ? '+' + mins + 'м' : String(mins) + ' мин всего' },
			{ kind: 'best', top: null, value: String(streak.days || 0), unit: 'дн', label: 'Текущая серия', delta: 'лучшая серия' },
			{ kind: 'subject', top: null, value: la && la.subject === 'biology' ? 'Био' : 'Хим', unit: '', label: 'Последний предмет', delta: la ? modeRu(la.mode) : '—' },
			{ kind: 'accuracy', top: null, value: avg != null ? String(avg) : '—', unit: avg != null ? '%' : '', label: 'Точность ответа', delta: avgLabel }
		];
	}

	function buildSocialSignals(snap, subjects) {
		var signals = [];
		if (snap && snap.level) {
			signals.push({ kind: 'rank', text: 'Ранг «' + (snap.levelTitle || 'Старт') + '»' });
		}
		var bio = subjects.find(function (s) { return s.slug === 'biology'; });
		if (bio && bio.pct > 0) {
			var bioMeta = bio.meta && bio.meta[0] ? bio.meta[0].value : '';
			signals.push({ kind: 'top', text: 'Биология · ' + bioMeta });
		}
		var chem = subjects.find(function (s) { return s.slug === 'chemistry'; });
		if (chem && chem.pct > 0) {
			signals.push({ kind: 'ahead', text: 'Химия · ' + Math.round(chem.pct) + '% курса' });
		}
		signals.push({
			kind: 'ahead',
			text: 'Лига ' + (snap.league ? snap.league.rank : 1) + ' / ' + (snap.league ? snap.league.size : 1)
		});
		return signals;
	}

	/**
	 * @param {{ id?: number, email?: string, created_at?: number }|null} meUser
	 */
	function build(meUser) {
		if (global.ChemProgress && ChemProgress.ensureAnonId) {
			try { ChemProgress.ensureAnonId(); } catch (e) {}
		}
		var snap = global.ChemProgress && ChemProgress.getGamificationSnapshot
			? ChemProgress.getGamificationSnapshot()
			: {};
		var lv = snap.level || { current: 1, xpToNext: 200, progressFrac: 0, minXpThisLevel: 0, nextThreshold: 200 };
		var anonId = null;
		try { anonId = localStorage.getItem('iqmo-chem-anon-id'); } catch (eA) {}
		var name = displayNameFromMe(meUser);
		var subjects = buildSubjectsProgress(snap, lv);
		var coursePct = subjects.length
			? Math.round(subjects.reduce(function (s, x) { return s + x.pct; }, 0) / subjects.length)
			: 0;
		var equippedFrame = null;
		try {
			var ef = localStorage.getItem('iqmo-equipped-frame');
			if (ef) {
				var col = COLLECTIBLES_CATALOG.find(function (c) { return c.id === ef; });
				equippedFrame = col ? col.rarity : ef;
			}
		} catch (eF) {}

		var minXp = lv.minXpThisLevel || 0;
		var maxXp = lv.nextThreshold != null ? lv.nextThreshold : minXp + 200;
		var curXp = snap.totalPoints || 0;
		var accuracyPct = snap.accuracyAverage != null
			? snap.accuracyAverage
			: (function () {
				var la = global.ChemProgress && ChemProgress.getLastAttempt ? ChemProgress.getLastAttempt() : null;
				return la && la.percent != null ? la.percent : null;
			})();

		return {
			profileData: {
				name: name,
				initials: initials(name),
				profileId: profileIdFromUser(meUser, anonId),
				isAuthed: !!(meUser && meUser.id),
				email: meUser && meUser.email ? meUser.email : null,
				level: lv.current,
				levelTitle: snap.levelTitle || 'Старт',
				nextLevel: lv.current >= 50 ? null : lv.current + 1,
				nextLevelTitle: snap.levelTitle || '',
				xpCurrent: curXp,
				xpLevelMin: minXp,
				xpLevelMax: maxXp,
				xpToNext: lv.xpToNext || 0,
				xpPct: Math.round((lv.progressFrac || 0) * 100),
				weekXp: snap.week ? snap.week.points : 0,
				streakDays: (lsGet('iqmo-chem-streak', {}) || {}).days || 0,
				leagueRank: snap.league ? snap.league.rank : 1,
				leagueSize: snap.league ? snap.league.size : 1,
				leagueDelta: snap.league && snap.league.rank > 1 ? 1 : 0,
				coursePct: coursePct,
				accuracyPct: accuracyPct,
				equippedFrame: equippedFrame,
				memberSince: meUser && meUser.created_at ? meUser.created_at : null,
				avatarUrl: null
			},
			socialSignals: buildSocialSignals(snap, subjects),
			nextGoalsData: buildNextGoals(snap),
			achievementsData: buildAchievements(snap),
			activityData: buildActivityFeed(snap),
			statsData: buildStats(snap),
			subjectsProgressData: subjects,
			collectiblesData: buildCollectibles(snap),
			snap: snap
		};
	}

	global.IqmoProfileData = {
		build: build,
		ACHIEVEMENT_CATALOG: ACHIEVEMENT_CATALOG,
		fmtPts: fmtPts
	};
})(typeof window !== 'undefined' ? window : global);
