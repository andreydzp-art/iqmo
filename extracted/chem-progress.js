// chem-progress.js — попытки, баллы прогресса (XP), 50 уровней, активность в браузере (MVP, localStorage)
(function () {
	'use strict';

	const SCHEMA_VERSION = 2;
	const KEY_ANON = 'iqmo-chem-anon-id';
	const KEY_LAST = 'iqmo-chem-last-attempt';

	const KEY_DAILY_GOAL = 'iqmo-chem-daily-goal-v1';
	const KEY_DAILY = 'iqmo-chem-daily-v1';
	const KEY_WEEKLY = 'iqmo-chem-weekly-points-v1';
	const KEY_POINTS_TOTAL = 'iqmo-chem-progress-points-v1';
	const KEY_LEVEL = 'iqmo-chem-prep-stage-v1'; // { level:number 1..50, updatedAt }
	const KEY_STREAK = 'iqmo-chem-streak';
	const KEY_ACTIVITY = 'iqmo-chem-activity-v2';
	/** Суммарное время (мс) с открытой видимой вкладкой на страницах с учётом прогресса. */
	const KEY_TOTAL_ACTIVE_MS = 'iqmo-chem-total-active-ms-v1';
	/** Счётчики завершённых попыток по режимам: { warmup, trial, full, quick, other }. */
	const KEY_ATTEMPT_STATS = 'iqmo-chem-attempt-stats-v1';
	const KEY_TOTAL_TASKS = 'iqmo-chem-total-tasks-v1';
	const KEY_BADGES = 'iqmo-chem-badges-v1';
	/** Скользящее среднее процента по завершённым попыткам (для профиля). */
	const KEY_ACCURACY_STATS = 'iqmo-chem-accuracy-stats-v1';
	/** Очередь «покажи салют в профиле» после первого открытия награды. */
	const KEY_BADGE_CELEBRATE = 'iqmo-badge-celebrate-queue-v1';
	/** Уже начисленный step-XP карты уровней: { biology: { "1": 50 }, chemistry: { … } }. */
	const KEY_MAP_XP_CLAIMED = 'iqmo-chem-map-xp-claimed-v1';
	const KEY_MAP_XP_CLAIMED_LEGACY = 'iqmo-map-xp-claimed-v1';

	/** Чеклисты тем (все подтемы = 2 → веха «Мастер темы»). */
	const TOPIC_CHECKLIST = [
		{ key: 'iqmo-chem-topic01-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic02-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic03-subtopics', n: 7 },
		{ key: 'iqmo-chem-topic04-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic05-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic06-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic07-subtopics', n: 6 },
		{ key: 'iqmo-chem-topic08-subtopics', n: 7 },
		{ key: 'iqmo-chem-topic09-subtopics', n: 7 },
		{ key: 'iqmo-chem-topic10-subtopics', n: 7 }
	];

	const MAX_LEVEL = 50;
	const DAILY_VISIT_XP = 10;
	const ACTIVE_CHUNK_MS = 180000;
	const ACTIVE_XP_PER_CHUNK = 3;
	const MAX_ACTIVE_CHUNKS_PER_DAY = 14;
	const BEAT_INTERVAL_MS = 30000;
	const MAX_BEAT_DELTA_MS = 120000;

	/** Яндекс.Метрика (совпадает с кодом счётчика на страницах). */
	const IQMO_METRIKA_ID = 108770166;
	var iqmoCurrentAttemptId = null;

	function newAttemptId() {
		return (typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
			'at-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
	}

	function pushDataLayer(obj) {
		try {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(obj);
		} catch (e) {}
	}

	function reachMetrikaGoal(name, params) {
		if (typeof ym !== 'function' || !name) return;
		try {
			if (params && typeof params === 'object') ym(IQMO_METRIKA_ID, 'reachGoal', name, params);
			else ym(IQMO_METRIKA_ID, 'reachGoal', name);
		} catch (e) {}
	}

	const ANALYTICS_QUEUE_KEY = 'iqmo-analytics-queue-v1';
	const ANALYTICS_QUEUE_MAX = 200;
	const ANALYTICS_BATCH_MAX = 24;
	const ANALYTICS_TTL_MS = 7 * 86400000;
	let iqmoAnalyticsFlushing = false;

	function loadAnalyticsQueue() {
		try {
			const raw = localStorage.getItem(ANALYTICS_QUEUE_KEY);
			if (!raw) return [];
			const arr = JSON.parse(raw);
			if (!Array.isArray(arr)) return [];
			const cutoff = Date.now() - ANALYTICS_TTL_MS;
			return arr.filter(function (ev) {
				return ev && typeof ev === 'object' && Number.isFinite(ev.occurredAt) && ev.occurredAt >= cutoff;
			});
		} catch (e) {
			return [];
		}
	}

	function saveAnalyticsQueue(arr) {
		try {
			if (!arr || arr.length === 0) {
				localStorage.removeItem(ANALYTICS_QUEUE_KEY);
				return;
			}
			const trimmed = arr.length > ANALYTICS_QUEUE_MAX ? arr.slice(arr.length - ANALYTICS_QUEUE_MAX) : arr;
			localStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(trimmed));
		} catch (e) {}
	}

	// Subject → namespace для имён событий аналитики. Биология шлёт `bio.*`,
	// всё остальное (включая отсутствующий subject) — `chem.*` (исторический префикс).
	function eventNamespaceForSubject(subject) {
		var s = subject == null ? '' : String(subject).toLowerCase();
		return s === 'biology' || s === 'bio' ? 'bio' : 'chem';
	}

	function flushAnalyticsQueue() {
		if (iqmoAnalyticsFlushing || typeof fetch !== 'function') return;
		const queue = loadAnalyticsQueue();
		if (queue.length === 0) return;
		const batch = queue.slice(0, ANALYTICS_BATCH_MAX);
		const rest = queue.slice(batch.length);
		iqmoAnalyticsFlushing = true;
		saveAnalyticsQueue(rest);
		try {
			fetch('/api/analytics/events', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({ events: batch })
			})
				.then(function (r) {
					if (!r.ok && r.status >= 500) {
						const back = loadAnalyticsQueue();
						saveAnalyticsQueue(batch.concat(back));
					}
				})
				.catch(function () {
					const back = loadAnalyticsQueue();
					saveAnalyticsQueue(batch.concat(back));
				})
				.finally(function () {
					iqmoAnalyticsFlushing = false;
					if (rest.length > 0) {
						setTimeout(flushAnalyticsQueue, 250);
					}
				});
		} catch (e) {
			iqmoAnalyticsFlushing = false;
			const back = loadAnalyticsQueue();
			saveAnalyticsQueue(batch.concat(back));
		}
	}

	function sendAnalyticsEvents(events) {
		if (!Array.isArray(events) || events.length === 0) return;
		const queue = loadAnalyticsQueue();
		const merged = queue.concat(events);
		saveAnalyticsQueue(merged);
		flushAnalyticsQueue();
	}

	function flushAnalyticsBeacon() {
		const queue = loadAnalyticsQueue();
		if (queue.length === 0) return;
		const batch = queue.slice(0, ANALYTICS_BATCH_MAX);
		try {
			if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
				const blob = new Blob([JSON.stringify({ events: batch })], { type: 'application/json' });
				const ok = navigator.sendBeacon('/api/analytics/events', blob);
				if (ok) {
					const rest = queue.slice(batch.length);
					saveAnalyticsQueue(rest);
				}
			}
		} catch (e) {}
	}

	if (typeof window !== 'undefined') {
		try {
			window.addEventListener('pagehide', flushAnalyticsBeacon);
			document.addEventListener('visibilitychange', function () {
				if (document.visibilityState === 'hidden') flushAnalyticsBeacon();
			});
			window.addEventListener('online', flushAnalyticsQueue);
			setTimeout(flushAnalyticsQueue, 1000);
		} catch (e) {}
	}

	/**
	 * Старт попытки (тест): серверное событие chem.attempt_start + сохранение attemptId для complete.
	 * @param {object} o
	 * @param {string} o.mode
	 * @param {string} [o.attemptId] — свой id или сгенерируем
	 */
	function beginAttempt(o) {
		if (!o || !o.mode) return null;
		const attemptId = o.attemptId || newAttemptId();
		iqmoCurrentAttemptId = attemptId;
		const payload = {
			subject: o.subject || 'chemistry',
			mode: o.mode,
			label: o.label || '',
			variantId: o.variantId != null ? o.variantId : null,
			variantTitle: o.variantTitle || '',
			topicSlug: o.topicSlug || '',
			totalQuestions: o.totalQuestions != null ? o.totalQuestions : null,
			attemptId: attemptId
		};
		sendAnalyticsEvents([
			{
				event: eventNamespaceForSubject(payload.subject) + '.attempt_start',
				occurredAt: Date.now(),
				payload: payload
			}
		]);
		return attemptId;
	}

	/** Минимальный суммарный XP для достижения уровня L (L от 1 до 50). LEVEL_MIN_XP[0]=0 → уровень 1. */
	const LEVEL_MIN_XP = (function () {
		const arr = [0];
		let cum = 0;
		for (let k = 1; k < MAX_LEVEL; k++) {
			const step = Math.ceil(22 * Math.pow(k, 1.37));
			cum += step;
			arr.push(cum);
		}
		return arr;
	})();

	function dayKey(ts) {
		const d = new Date(typeof ts === 'number' ? ts : Date.now());
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	}

	function loadBadges() {
		const b = lsGet(KEY_BADGES, null);
		return b && typeof b === 'object' ? b : {};
	}

	function queueProfileCelebration(badgeId) {
		if (!badgeId) return;
		try {
			const raw = localStorage.getItem(KEY_BADGE_CELEBRATE);
			const arr = raw ? JSON.parse(raw) : [];
			if (!Array.isArray(arr)) return;
			if (arr.indexOf(badgeId) === -1) arr.push(badgeId);
			localStorage.setItem(KEY_BADGE_CELEBRATE, JSON.stringify(arr));
		} catch (e) {}
	}

	function consumeProfileCelebration(badgeId) {
		if (!badgeId) return false;
		try {
			const raw = localStorage.getItem(KEY_BADGE_CELEBRATE);
			let arr = raw ? JSON.parse(raw) : [];
			if (!Array.isArray(arr)) return false;
			const i = arr.indexOf(badgeId);
			if (i === -1) return false;
			arr.splice(i, 1);
			if (arr.length) localStorage.setItem(KEY_BADGE_CELEBRATE, JSON.stringify(arr));
			else localStorage.removeItem(KEY_BADGE_CELEBRATE);
			return true;
		} catch (e) {
			return false;
		}
	}

	function unlockBadge(id) {
		if (!id) return;
		const b = loadBadges();
		if (b[id]) return;
		b[id] = Date.now();
		lsSet(KEY_BADGES, b);
		if (id === 'three_tests') {
			try {
				queueProfileCelebration('three_tests');
			} catch (eQ) {}
		}
	}

	function migrateLegacyBadgeKeys() {
		const b = loadBadges();
		let changed = false;
		if (b.seven_day_goal && !b.streak7) {
			b.streak7 = b.seven_day_goal;
			delete b.seven_day_goal;
			changed = true;
		}
		if (changed) {
			lsSet(KEY_BADGES, b);
		}
	}

	function topicFullyMastered(key, n) {
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return false;
			const a = JSON.parse(raw);
			if (!Array.isArray(a)) return false;
			for (let i = 0; i < n; i++) {
				if (a[i] !== 2) return false;
			}
			return true;
		} catch (e) {
			return false;
		}
	}

	function maybeUnlockTopicStar() {
		for (let i = 0; i < TOPIC_CHECKLIST.length; i++) {
			const t = TOPIC_CHECKLIST[i];
			if (topicFullyMastered(t.key, t.n)) {
				unlockBadge('topic_star');
				return;
			}
		}
	}

	/** Все 7 вариантов 1-го этапа химии пройдены на ≥50% → веха chem_stage1. */
	function maybeUnlockChemStage1() {
		try {
			var CHEM_STAGE1_IDS = [1, 2, 3, 4, 5, 6, 7];
			for (var i = 0; i < CHEM_STAGE1_IDS.length; i++) {
				var raw = localStorage.getItem('iqmo-chem-v-' + CHEM_STAGE1_IDS[i]);
				if (!raw) return;
				var s = JSON.parse(raw);
				if (!s || !s.finished) return;
			}
			unlockBadge('chem_stage1');
		} catch (e) {}
	}

	/** Все 7 вариантов 1-го этапа биологии пройдены → веха bio_stage1. */
	function maybeUnlockBioStage1() {
		try {
			var BIO_STAGE1_IDS = [1, 2, 3, 4, 5, 6, 7];
			for (var i = 0; i < BIO_STAGE1_IDS.length; i++) {
				var raw = localStorage.getItem('iqmo-bio-v-' + BIO_STAGE1_IDS[i]);
				if (!raw) return;
				var s = JSON.parse(raw);
				if (!s || !s.finished) return;
			}
			unlockBadge('bio_stage1');
		} catch (e) {}
	}

	/** Подстановка вех и перенос старых ключей (seven_day_goal → streak7). */
	function syncRetroBadges() {
		migrateLegacyBadgeKeys();
		try {
			if (localStorage.getItem(KEY_ANON)) {
				unlockBadge('welcome');
			}
		} catch (e0) {}
		const st = lsGet(KEY_STREAK, null);
		if (st && (st.days || 0) >= 7) {
			unlockBadge('streak7');
		}
		const ast = loadAttemptStatsRaw();
		if (ast.total >= 3) {
			unlockBadge('three_tests');
		}
		if (ast.total >= 10) {
			unlockBadge('ten_tests');
		}
		const totalPts = Math.max(0, Number(lsGet(KEY_POINTS_TOTAL, 0)) || 0);
		const lv = computeLevelDetail(totalPts);
		if (lv.current >= MAX_LEVEL) {
			unlockBadge('final_sprint');
		}
		maybeUnlockTopicStar();
		maybeUnlockChemStage1();
		maybeUnlockBioStage1();
	}

	function weekKey(ts) {
		const d = new Date(typeof ts === 'number' ? ts : Date.now());
		const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
		const day = date.getUTCDay() || 7;
		date.setUTCDate(date.getUTCDate() + 4 - day);
		const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
		const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
		return date.getUTCFullYear() + '-W' + String(weekNo).padStart(2, '0');
	}

	function lsGet(key, fallback) {
		try {
			const raw = localStorage.getItem(key);
			if (!raw) return fallback;
			return JSON.parse(raw);
		} catch (e) {
			return fallback;
		}
	}

	function lsSet(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {}
	}

	function getLevelFromXp(xp) {
		const x = Math.max(0, Number(xp) || 0);
		let lvl = 1;
		for (let i = 1; i < MAX_LEVEL; i++) {
			if (x >= LEVEL_MIN_XP[i]) lvl = i + 1;
			else break;
		}
		return lvl;
	}

	function computeLevelDetail(totalPoints) {
		const xp = Math.max(0, Number(totalPoints) || 0);
		const current = getLevelFromXp(xp);
		const minXpThisLevel = LEVEL_MIN_XP[current - 1];
		const nextThreshold = current < MAX_LEVEL ? LEVEL_MIN_XP[current] : null;
		const xpInLevel = xp - minXpThisLevel;
		const span = nextThreshold != null ? nextThreshold - minXpThisLevel : 0;
		const xpToNext = nextThreshold != null ? Math.max(0, nextThreshold - xp) : 0;
		const progressFrac =
			nextThreshold != null && span > 0 ? Math.min(1, Math.max(0, xpInLevel / span)) : 1;
		return {
			current,
			minXpThisLevel,
			nextThreshold,
			xpInLevel,
			xpToNext,
			progressFrac,
			maxLevel: MAX_LEVEL
		};
	}

	const LEVEL_TITLES_RU = [
		'',
		'Новик', 'Ученик', 'Старт', 'Вход', 'Игрок',
		'Путь', 'Режим', 'Темп', 'Рывок', 'Сдвиг',
		'Контур', 'Баланс', 'Фокус', 'Ритм', 'Поток',
		'Вектор', 'Захват', 'Синхр', 'Навык', 'Драйв',
		'Точность', 'Расчёт', 'Логика', 'Система', 'Контроль',
		'Сборка', 'Предел', 'Опора', 'Сигнал', 'Ядро',
		'Влияние', 'Давление', 'Чтение', 'Прорыв', 'Захват',
		'Напор', 'Разбор', 'Анализ', 'Вынос', 'Штурм',
		'Элита', 'Мастер', 'Эксперт', 'Профи', 'Титан',
		'Вершина', 'Лидер', 'Легенд', 'Абсолют', 'Пик'
	];

	function levelTitleRu(level) {
		const l = Math.min(MAX_LEVEL, Math.max(1, Number(level) || 1));
		return LEVEL_TITLES_RU[l] || 'Новик';
	}

	function ensureDailyGoal() {
		const g = lsGet(KEY_DAILY_GOAL, null);
		if (g && g.type === 'tasks' && Number.isFinite(g.target) && g.target > 0) return g;
		const def = { type: 'tasks', target: 10 };
		lsSet(KEY_DAILY_GOAL, def);
		return def;
	}

	function migrateMapXpClaimedKey() {
		try {
			if (lsGet(KEY_MAP_XP_CLAIMED, null)) return;
			var legacy = lsGet(KEY_MAP_XP_CLAIMED_LEGACY, null);
			if (legacy) {
				lsSet(KEY_MAP_XP_CLAIMED, legacy);
				localStorage.removeItem(KEY_MAP_XP_CLAIMED_LEGACY);
			}
		} catch (e) {}
	}

	/** biology | bio → biology, всё остальное → chemistry (единый стандарт карты). */
	function normalizeMapSubject(subject) {
		var s = subject == null ? '' : String(subject).toLowerCase();
		return s === 'biology' || s === 'bio' ? 'biology' : 'chemistry';
	}

	function streakMultiplier() {
		try {
			const st = lsGet(KEY_STREAK, null) || { days: 0 };
			const d = Math.max(0, Number(st.days) || 0);
			return 1 + Math.min(0.18, d * 0.012);
		} catch (e) {
			return 1;
		}
	}

	function addPoints(mode, summary) {
		const correct = Number(summary.correct) || 0;
		const total = Number(summary.total) || 0;
		const percent = Number.isFinite(summary.percent)
			? Number(summary.percent)
			: total > 0
				? Math.round((correct / total) * 100)
				: 0;
		const itemsCount = Number(summary.itemsCount) || 0;

		let pts = 0;
		if (mode === 'warmup') {
			pts = Math.max(0, correct) * 2 + (itemsCount ? 5 : 0);
			if (percent >= 80) pts += 8;
		} else if (mode === 'trial') {
			pts = Math.max(0, correct) * 5 + 12;
			if (percent >= 50) pts += 18;
			if (percent >= 75) pts += 12;
		} else if (mode === 'full') {
			pts = Math.max(0, correct) * 8 + 28;
			if (summary.passedPart1) pts += 65;
			if (percent >= 70) pts += 24;
		} else if (mode === 'quick') {
			pts = Math.max(0, correct) * 4 + 10;
			if (percent >= 50) pts += 14;
			if (percent >= 80) pts += 12;
		} else {
			pts = Math.max(0, correct) * 3 + 4;
		}
		return Math.max(0, Math.round(pts * streakMultiplier()));
	}

	/**
	 * Step-XP карты (+50 за шаг 1, …, босс 550) — один раз за узел при ≥50% в части 1.
	 * @returns {number} XP к начислению (0 — не на карте, провал или уже получено).
	 */
	function computeMapStepAward(payload) {
		try {
			migrateMapXpClaimedKey();
			if (payload.mode !== 'full') return 0;
			if (typeof window.IqmoLevelMapXp === 'undefined') return 0;
			var subject = normalizeMapSubject(payload.subject);
			var vid = payload.variantId;
			if (vid == null) return 0;
			var pct = Number.isFinite(payload.part1Percent)
				? Math.round(Number(payload.part1Percent))
				: payload.passedPart1
					? 50
					: 0;
			if (pct < 50) return 0;
			var slotXp = IqmoLevelMapXp.xpForVariantId(subject, vid, pct);
			if (!slotXp) return 0;
			var claimed = lsGet(KEY_MAP_XP_CLAIMED, {});
			var sub = claimed[subject] || {};
			if (sub[String(vid)]) return 0;
			sub[String(vid)] = { xp: slotXp, at: Date.now() };
			claimed[subject] = sub;
			lsSet(KEY_MAP_XP_CLAIMED, claimed);
			return slotXp;
		} catch (e) {
			return 0;
		}
	}

	function tryMapStepXp(payload) {
		if (payload.mode !== 'full') return 0;
		var pct = Number.isFinite(payload.part1Percent)
			? Math.round(Number(payload.part1Percent))
			: payload.passedPart1
				? 50
				: 0;
		if (pct < 50) return 0;
		return computeMapStepAward(
			Object.assign({}, payload, { part1Percent: pct, passedPart1: true })
		);
	}

	/**
	 * Единая запись полного варианта (биология / химия / будущие предметы).
	 * @param {object} data
	 * @param {string} data.subject
	 * @param {number} data.variantId
	 * @param {object} data.scoring — результат computeScoring()
	 * @param {Array|null} [data.items]
	 */
	function recordFullVariantAttempt(data) {
		var scoring = data.scoring || {};
		var part1Percent = Number.isFinite(scoring.part1Percent)
			? Math.round(Number(scoring.part1Percent))
			: scoring.autoTotal > 0
				? Math.round((100 * scoring.autoPoints) / scoring.autoTotal)
				: 0;
		var passedPart1 = part1Percent >= 50;
		return recordAttempt({
			mode: 'full',
			subject: normalizeMapSubject(data.subject),
			variantId: data.variantId,
			variantTitle: data.variantTitle || '',
			label: data.label || ('Полный вариант · ' + (data.variantTitle || '')),
			correct: scoring.totalPoints != null ? scoring.totalPoints : 0,
			total: scoring.totalMax != null ? scoring.totalMax : 0,
			percent: scoring.percent,
			part1Percent: part1Percent,
			passedPart1: passedPart1,
			items: Array.isArray(data.items) ? data.items : null,
			attemptId: data.attemptId
		});
	}

	/**
	 * Доначислить step-XP за уже пройденные варианты (если раньше subject не передавался).
	 * @param {Array<{subject:string, variantId:number, part1Percent:number}>} entries
	 * @returns {number} суммарно начислено XP
	 */
	function syncPassedVariantsMapXp(entries) {
		if (!Array.isArray(entries) || !entries.length) return 0;
		var total = 0;
		for (var i = 0; i < entries.length; i++) {
			var e = entries[i];
			if (!e || e.variantId == null) continue;
			var pct = Number(e.part1Percent);
			if (!Number.isFinite(pct) || pct < 50) continue;
			var xp = computeMapStepAward({
				mode: 'full',
				subject: e.subject,
				variantId: e.variantId,
				part1Percent: pct,
				passedPart1: true
			});
			if (xp) {
				awardXp(xp, 'map_step', 0);
				total += xp;
			}
		}
		return total;
	}

	function updateDailyAndStreak(deltaTasks, deltaPoints) {
		const goal = ensureDailyGoal();
		const today = dayKey(Date.now());
		const daily = lsGet(KEY_DAILY, null);
		const cur = daily && daily.day === today ? daily : { day: today, tasksDone: 0, points: 0 };
		cur.tasksDone = Math.max(0, (Number(cur.tasksDone) || 0) + (Number(deltaTasks) || 0));
		cur.points = Math.max(0, (Number(cur.points) || 0) + (Number(deltaPoints) || 0));

		const wasCompleted = !!cur.completedAt;
		if (!wasCompleted && goal.type === 'tasks' && cur.tasksDone >= goal.target) {
			cur.completedAt = Date.now();
			let streak = lsGet(KEY_STREAK, null) || { days: 0, lastDay: null };
			const y = dayKey(Date.now() - 86400000);
			if (streak.lastDay === today) {
			} else if (streak.lastDay === y) {
				streak.days = (streak.days || 0) + 1;
				streak.lastDay = today;
			} else {
				streak.days = 1;
				streak.lastDay = today;
			}
			lsSet(KEY_STREAK, streak);
			if ((streak.days || 0) >= 7) {
				unlockBadge('streak7');
			}
		}

		lsSet(KEY_DAILY, cur);
		return { goal, daily: cur };
	}

	function updateWeekly(points) {
		const wk = weekKey(Date.now());
		const map = lsGet(KEY_WEEKLY, {}) || {};
		map[wk] = Math.max(0, (Number(map[wk]) || 0) + (Number(points) || 0));
		lsSet(KEY_WEEKLY, map);
		return { week: wk, points: map[wk], all: map };
	}

	function updateTotalPoints(points) {
		const total = Math.max(0, Number(lsGet(KEY_POINTS_TOTAL, 0)) || 0);
		const next = total + (Number(points) || 0);
		lsSet(KEY_POINTS_TOTAL, next);
		return next;
	}

	function persistLevel(totalPoints) {
		const d = computeLevelDetail(totalPoints);
		lsSet(KEY_LEVEL, { level: d.current, updatedAt: Date.now() });
		if (d.current >= MAX_LEVEL) {
			unlockBadge('final_sprint');
		}
		return d;
	}

	/**
	 * Начислить XP (тесты, визит, активное время и т.д.).
	 * @param {number} amount
	 * @param {string} [reason]
	 * @returns {{ total: number, added: number, level: object }}
	 */
	function awardXp(amount, reason, deltaTasks) {
		const n = Math.max(0, Math.round(Number(amount) || 0));
		const tasks = Math.max(0, Number(deltaTasks) || 0);
		let total = Number(lsGet(KEY_POINTS_TOTAL, 0)) || 0;
		if (tasks) {
			const prevT = Math.max(0, Number(lsGet(KEY_TOTAL_TASKS, 0)) || 0);
			const nextT = prevT + tasks;
			lsSet(KEY_TOTAL_TASKS, nextT);
		}
		if (n) {
			total = updateTotalPoints(n);
			updateWeekly(n);
		}
		if (n || tasks) {
			updateDailyAndStreak(tasks, n);
		}
		if (n) {
			persistLevel(total);
		}
		if (!n) {
			return { total, added: 0, level: computeLevelDetail(total), reason: reason || '' };
		}
		return { total, added: n, level: computeLevelDetail(total), reason: reason || '' };
	}

	function loadActivityState() {
		const today = dayKey();
		let a = lsGet(KEY_ACTIVITY, null);
		if (!a || a.day !== today) {
			a = {
				day: today,
				pendingMs: 0,
				chunksToday: 0,
				visitXp: false,
				lastBeat: Date.now()
			};
			lsSet(KEY_ACTIVITY, a);
		}
		if (typeof a.lastBeat !== 'number') a.lastBeat = Date.now();
		if (typeof a.pendingMs !== 'number') a.pendingMs = 0;
		if (typeof a.chunksToday !== 'number') a.chunksToday = 0;
		return a;
	}

	function maybeDailyVisitXp() {
		const a = loadActivityState();
		if (a.visitXp) return;
		a.visitXp = true;
		lsSet(KEY_ACTIVITY, a);
		awardXp(DAILY_VISIT_XP, 'daily_visit', 0);
	}

	function bumpAccuracyStats(percent) {
		const p = Math.round(Number(percent));
		if (!Number.isFinite(p)) return;
		const st = lsGet(KEY_ACCURACY_STATS, { sum: 0, count: 0 }) || { sum: 0, count: 0 };
		st.sum = (Number(st.sum) || 0) + p;
		st.count = (Number(st.count) || 0) + 1;
		lsSet(KEY_ACCURACY_STATS, st);
	}

	function getAccuracyAverage() {
		const st = lsGet(KEY_ACCURACY_STATS, { sum: 0, count: 0 }) || { sum: 0, count: 0 };
		const count = Number(st.count) || 0;
		if (!count) return null;
		return Math.round((Number(st.sum) || 0) / count);
	}

	function migrateAccuracyFromLast() {
		const st = lsGet(KEY_ACCURACY_STATS, { sum: 0, count: 0 }) || { sum: 0, count: 0 };
		if ((Number(st.count) || 0) > 0) return;
		try {
			const raw = localStorage.getItem(KEY_LAST);
			if (!raw) return;
			const o = JSON.parse(raw);
			if (o && o.percent != null) bumpAccuracyStats(o.percent);
		} catch (e) {}
	}

	function loadAttemptStatsRaw() {
		const st = lsGet(KEY_ATTEMPT_STATS, null);
		const byMode = { warmup: 0, trial: 0, full: 0, quick: 0, other: 0 };
		if (st && typeof st === 'object') {
			for (const k of Object.keys(byMode)) {
				byMode[k] = Math.max(0, Math.floor(Number(st[k]) || 0));
			}
		}
		let total = 0;
		for (const k of Object.keys(byMode)) total += byMode[k];
		return { byMode, total };
	}

	function bumpAttemptStats(mode) {
		const { byMode } = loadAttemptStatsRaw();
		const m =
			mode === 'warmup' || mode === 'trial' || mode === 'full' || mode === 'quick' ? mode : 'other';
		byMode[m] += 1;
		lsSet(KEY_ATTEMPT_STATS, byMode);
	}

	function addTotalActiveMs(deltaMs) {
		const d = Math.max(0, Math.floor(Number(deltaMs) || 0));
		if (!d) return;
		const cur = Math.max(0, Number(lsGet(KEY_TOTAL_ACTIVE_MS, 0)) || 0);
		lsSet(KEY_TOTAL_ACTIVE_MS, cur + d);
	}

	/** Для плитки «время на сайте» и отладки. */
	function formatActiveDurationRu(ms) {
		const m = Math.max(0, Math.floor(Number(ms) || 0));
		if (m < 60000) return m <= 0 ? '0 мин' : '< 1 мин';
		const min = Math.floor(m / 60000);
		if (min < 60) return min + ' мин';
		const h = Math.floor(min / 60);
		const r = min % 60;
		if (h < 48) return r ? h + ' ч ' + r + ' мин' : h + ' ч';
		const d = Math.floor(h / 24);
		const rh = h % 24;
		let s = d + ' дн.';
		if (rh) s += ' ' + rh + ' ч';
		if (r) s += ' ' + r + ' мин';
		return s;
	}

	function tickActivity() {
		if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
		const a = loadActivityState();
		const now = Date.now();
		const delta = Math.min(MAX_BEAT_DELTA_MS, Math.max(0, now - (a.lastBeat || now)));
		addTotalActiveMs(delta);
		a.lastBeat = now;
		a.pendingMs = (a.pendingMs || 0) + delta;

		while (a.pendingMs >= ACTIVE_CHUNK_MS && a.chunksToday < MAX_ACTIVE_CHUNKS_PER_DAY) {
			a.pendingMs -= ACTIVE_CHUNK_MS;
			a.chunksToday = (a.chunksToday || 0) + 1;
			awardXp(ACTIVE_XP_PER_CHUNK, 'active_time', 0);
		}
		lsSet(KEY_ACTIVITY, a);
	}

	let activityStarted = false;
	function startActivityTracking() {
		if (activityStarted || typeof window === 'undefined' || typeof document === 'undefined') return;
		activityStarted = true;
		maybeDailyVisitXp();
		tickActivity();
		document.addEventListener('visibilitychange', function () {
			if (document.visibilityState === 'visible') {
				const s = loadActivityState();
				s.lastBeat = Date.now();
				lsSet(KEY_ACTIVITY, s);
				maybeDailyVisitXp();
				tickActivity();
			}
		});
		setInterval(tickActivity, BEAT_INTERVAL_MS);
	}

	/** Дождаться облачной подтяжки localStorage (iqmo-sync.js), чтобы не начислить визит/время на старом снимке. */
	function scheduleStartActivityTracking() {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;
		function go() {
			startActivityTracking();
		}
		if (!window.__IQMO_SYNC__) {
			go();
			return;
		}
		let started = false;
		function goOnce() {
			if (started) return;
			started = true;
			go();
		}
		window.addEventListener(
			'iqmo-sync-ready',
			function () {
				goOnce();
			},
			{ once: true }
		);
		window.setTimeout(goOnce, 2800);
	}

	function getGamificationSnapshot() {
		syncRetroBadges();
		migrateAccuracyFromLast();
		const goal = ensureDailyGoal();
		const today = dayKey(Date.now());
		const daily = lsGet(KEY_DAILY, null);
		const curDaily = daily && daily.day === today ? daily : { day: today, tasksDone: 0, points: 0 };
		const weekly = lsGet(KEY_WEEKLY, {}) || {};
		const wk = weekKey(Date.now());
		const weekPts = Number(weekly[wk]) || 0;
		const totalPts = Number(lsGet(KEY_POINTS_TOTAL, 0)) || 0;
		const level = computeLevelDetail(totalPts);

		const keys = Object.keys(weekly).sort().slice(-12);
		const values = keys.map((k) => ({ k, p: Number(weekly[k]) || 0 }));
		const sorted = [...values].sort((a, b) => b.p - a.p);
		const pos = sorted.findIndex((x) => x.k === wk);
		const rank = pos >= 0 ? pos + 1 : 1;
		const size = Math.max(1, sorted.length || 1);
		const ahead = sorted[Math.max(0, rank - 2)];
		const gap = ahead && ahead.k !== wk ? Math.max(0, (ahead.p || 0) - weekPts + 1) : 0;

		const act = loadActivityState();
		const totalActiveMs = Math.max(0, Number(lsGet(KEY_TOTAL_ACTIVE_MS, 0)) || 0);
		const attemptStats = loadAttemptStatsRaw();
		const badges = loadBadges();
		const totalTasksLifetime = Math.max(0, Number(lsGet(KEY_TOTAL_TASKS, 0)) || 0);

		return {
			goal,
			daily: curDaily,
			week: { key: wk, points: weekPts },
			totalPoints: totalPts,
			totalActiveMs,
			attemptStats,
			badges,
			totalTasksLifetime,
			level,
			levelTitle: levelTitleRu(level.current),
			activity: {
				visitXpToday: !!act.visitXp,
				activeChunksToday: act.chunksToday || 0,
				activeChunksMax: MAX_ACTIVE_CHUNKS_PER_DAY
			},
			stage: {
				stage: level.current,
				maxStage: MAX_LEVEL,
				prevThreshold: level.minXpThisLevel,
				nextThreshold: level.nextThreshold != null ? level.nextThreshold : level.minXpThisLevel
			},
			league: { rank, size, gapToPrev: gap },
			accuracyAverage: getAccuracyAverage()
		};
	}

	function ensureAnonId() {
		migrateMapXpClaimedKey();
		let id = null;
		try {
			id = localStorage.getItem(KEY_ANON);
		} catch (e) {}
		if (!id) {
			id =
				(typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
				'an-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
			try {
				localStorage.setItem(KEY_ANON, id);
			} catch (e) {}
		}
		try {
			unlockBadge('welcome');
		} catch (eW) {}
		return id;
	}

	/**
	 * @param {object} data
	 * @param {'full'|'trial'|'warmup'|'quick'} data.mode
	 */
	function recordAttempt(data) {
		ensureAnonId();
		startActivityTracking();
		const total = Number(data.total) || 0;
		const correct = Number(data.correct) || 0;
		const percent =
			data.percent != null
				? Math.round(Number(data.percent))
				: total > 0
					? Math.round((correct / total) * 100)
					: 0;
		const finishedAt = Date.now();
		const attemptId = data.attemptId != null ? String(data.attemptId) : iqmoCurrentAttemptId;
		const payload = {
			schemaVersion: SCHEMA_VERSION,
			subject: normalizeMapSubject(data.subject || 'chemistry'),
			mode: data.mode,
			variantId: data.variantId != null ? data.variantId : null,
			variantTitle: data.variantTitle || '',
			label: data.label || '',
			correct,
			total,
			percent,
			passedPart1: !!data.passedPart1,
			part1Percent: data.part1Percent != null ? Math.round(Number(data.part1Percent)) : null,
			finishedAt: finishedAt,
			items: Array.isArray(data.items) ? data.items : null,
			attemptId: attemptId || null
		};
		try {
			localStorage.setItem(KEY_LAST, JSON.stringify(payload));
		} catch (e) {}

		try {
			bumpAttemptStats(payload.mode);
		} catch (e0) {}

		try {
			if (total > 0 || payload.percent != null) {
				bumpAccuracyStats(percent);
			}
		} catch (eAcc) {}

		try {
			const astAfter = loadAttemptStatsRaw();
			if (astAfter.total >= 3) {
				unlockBadge('three_tests');
			}
			if (astAfter.total >= 10) {
				unlockBadge('ten_tests');
			}
		} catch (e10) {}

		try {
			if (total >= 5 && correct === total && percent >= 100) {
				unlockBadge('perfect_run');
			}
		} catch (ePerf) {}

		try { maybeUnlockChemStage1(); } catch (eStage) {}
		try { maybeUnlockBioStage1(); } catch (eBioStage) {}

		try {
			const itemsCount = Array.isArray(payload.items) ? payload.items.length : 0;
			const mapPts = tryMapStepXp(payload);
			const pts = mapPts || addPoints(payload.mode, {
				correct: payload.correct,
				total: payload.total,
				percent: payload.percent,
				passedPart1: payload.passedPart1,
				itemsCount
			});
			awardXp(pts, mapPts ? 'map_step' : ('test_' + payload.mode), itemsCount);
		} catch (e2) {}

		try {
			(function sendAttemptCompleteAnalytics() {
				const items = Array.isArray(payload.items) ? payload.items : [];
				sendAnalyticsEvents([
					{
						event: eventNamespaceForSubject(payload.subject) + '.attempt_complete',
						occurredAt: finishedAt,
						payload: {
							subject: payload.subject,
							mode: payload.mode,
							label: payload.label,
							variantId: payload.variantId,
							variantTitle: payload.variantTitle,
							attemptId: attemptId || '',
							correct: payload.correct,
							total: payload.total,
							percent: payload.percent,
							passedPart1: payload.passedPart1,
							finishedAt: finishedAt,
							items: items.map(function (it) {
								return { qid: it && it.qid != null ? String(it.qid) : '', ok: !!it.ok };
							})
						}
					}
				]);
			})();
		} catch (e3) {}

		try {
			pushDataLayer({
				event: 'iqmo_test_complete',
				iqmo: {
					mode: payload.mode,
					subject: payload.subject,
					percent: payload.percent,
					correct: payload.correct,
					total: payload.total
				}
			});
			reachMetrikaGoal('test_complete', {
				mode: String(payload.mode),
				percent: payload.percent,
				subject: String(payload.subject)
			});
		} catch (e4) {}

		iqmoCurrentAttemptId = null;
	}

	function getLastAttempt() {
		try {
			const raw = localStorage.getItem(KEY_LAST);
			if (!raw) return null;
			const o = JSON.parse(raw);
			if (!o || typeof o !== 'object') return null;
			return o;
		} catch (e) {
			return null;
		}
	}

	function formatRelativeTime(ts) {
		const t = typeof ts === 'number' ? ts : Date.parse(ts);
		if (!t || Number.isNaN(t)) return '';
		const d = Date.now() - t;
		const mins = Math.floor(d / 60000);
		if (mins < 1) return 'только что';
		if (mins < 60) return mins + ' мин назад';
		const hours = Math.floor(mins / 60);
		if (hours < 24) return hours + ' ч назад';
		const days = Math.floor(hours / 24);
		if (days === 1) return 'вчера';
		if (days < 7) return days + ' дн. назад';
		return new Date(t).toLocaleDateString('ru-RU');
	}

	scheduleStartActivityTracking();

	document.addEventListener('DOMContentLoaded', function () {
		try {
			var slug = document.body && document.body.getAttribute('data-iqmo-topic');
			if (!slug) return;
			var subjectAttr = (document.body && document.body.getAttribute('data-iqmo-subject')) || 'chemistry';
			var sk = 'iqmo-topic-view-sent:' + slug;
			try {
				if (sessionStorage.getItem(sk)) return;
				sessionStorage.setItem(sk, '1');
			} catch (e0) {}
			sendAnalyticsEvents([
				{
					event: eventNamespaceForSubject(subjectAttr) + '.topic_view',
					occurredAt: Date.now(),
					payload: { subject: String(subjectAttr), topicSlug: String(slug) }
				}
			]);
			try {
				pushDataLayer({ event: 'iqmo_topic_view', iqmo: { topicSlug: String(slug) } });
				reachMetrikaGoal('topic_view', { topicSlug: String(slug) });
			} catch (e1) {}
		} catch (e2) {}
	});

	window.ChemProgress = {
		ensureAnonId,
		beginAttempt,
		recordAttempt,
		recordFullVariantAttempt,
		syncPassedVariantsMapXp,
		normalizeMapSubject,
		getLastAttempt,
		formatRelativeTime,
		formatActiveDurationRu,
		getGamificationSnapshot,
		awardXp,
		dayKey,
		getTotalActiveMs: function () {
			return Math.max(0, Number(lsGet(KEY_TOTAL_ACTIVE_MS, 0)) || 0);
		},
		getAttemptStats: loadAttemptStatsRaw,
		getBadges: loadBadges,
		consumeProfileCelebration,
		getTotalTasksLifetime: function () {
			return Math.max(0, Number(lsGet(KEY_TOTAL_TASKS, 0)) || 0);
		},
		getLevelDetail: function (totalXp) {
			return computeLevelDetail(totalXp);
		},
		// Алиас для обратной совместимости (используется на subject-pages).
		computeLevelDetail: function (totalXp) {
			return computeLevelDetail(totalXp);
		},
		getLevelTitle: levelTitleRu,
		MAX_LEVEL,
		startActivityTracking
	};
})();
