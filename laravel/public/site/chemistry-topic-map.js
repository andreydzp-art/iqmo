// chemistry-topic-map.js — тема по id вопроса (для «слабых мест» и ссылок на тренировку)
(function () {
	const LABELS = {
		periodic: 'Периодическая система и строение атома',
		reactions: 'Химические реакции',
		solutions: 'Растворы и электролитическая диссоциация',
		redox: 'ОВР и экология',
		stoichiometry: 'Расчёты и качественный анализ',
		part2: 'Часть 2 (развёрнутый ответ)',
		mixed: 'Смешанные темы'
	};

	/** @type {Record<number, string>} */
	const BY_QID = {
		1: 'periodic',
		2: 'periodic',
		3: 'periodic',
		4: 'periodic',
		5: 'periodic',
		6: 'periodic',
		7: 'reactions',
		8: 'reactions',
		9: 'reactions',
		10: 'reactions',
		11: 'reactions',
		12: 'reactions',
		13: 'solutions',
		14: 'solutions',
		15: 'redox',
		16: 'redox',
		17: 'stoichiometry',
		18: 'stoichiometry',
		19: 'stoichiometry',
		20: 'part2',
		21: 'part2',
		22: 'part2'
	};

	/** Какие номера заданий части 1 (слоты 1–22) попадают в разминку по slug темы курса */
	const WARMUP_QIDS_BY_TOPIC = {
		periodic: [1, 2, 3, 4, 5, 6],
		atom: [2, 4, 5, 6],
		/** Ковалентная (не)полярная, ионка vs молекула / электролиты — слоты части 1 в разных вариантах */
		bond: [5, 13],
		/** Классы неорганических веществ, номенклатура и схемы (часть 1, блок реакций) */
		classes: [8, 9, 10, 11],
		/** Химические реакции: типы, уравнения, схемы (слоты 7–12) */
		reactions: [7, 8, 9, 10, 11, 12],
		/** Растворы, электролиты, уравнения ЭДД (слоты 13–14) */
		solutions: [13, 14],
		/** Металлы и соединения, ряд активности, типовые реакции (слоты 17–19) */
		metals: [17, 18, 19],
		/** Неметаллы и соединения (акцент на слотах 9–12, пересекается с reactions) */
		nonmetals: [9, 10, 11, 12],
		/** Органические вещества (слоты 20–22 части 1; в карте вопроса — part2) */
		organic: [20, 21, 22],
		/** Химия в жизни и экология (слоты 15–16; в карте вопроса — redox) */
		ecology: [15, 16]
	};

	/** Параметр ?topic= для easy-test (как на статичных кнопках предмета) */
	const SLUG_TO_TRAIN_TOPIC = {
		periodic: 'inorganic',
		atom: 'inorganic',
		bond: 'inorganic',
		classes: 'reactions',
		reactions: 'reactions',
		solutions: 'solutions',
		metals: 'inorganic',
		nonmetals: 'reactions',
		organic: 'reactions',
		ecology: 'reactions',
		redox: 'reactions',
		stoichiometry: 'inorganic',
		part2: 'reactions',
		mixed: 'reactions'
	};

	function get(qid) {
		const slug = BY_QID[qid] || 'mixed';
		return { slug, label: LABELS[slug] || LABELS.mixed };
	}

	function trainTopicParam(slug) {
		return SLUG_TO_TRAIN_TOPIC[slug] || 'reactions';
	}

	/**
	 * Номер задания части 1 (1–22) из id вопроса в банке (1–22, 101–122, 201–222…).
	 * @param {number} qid
	 * @returns {number|null}
	 */
	function part1SlotFromQid(qid) {
		if (typeof qid !== 'number' || !Number.isFinite(qid)) return null;
		if (qid >= 1 && qid <= 22) return qid;
		const base = Math.floor((qid - 1) / 100) * 100;
		const slot = qid - base;
		if (slot >= 1 && slot <= 22) return slot;
		return null;
	}

	function warmupQids(slug) {
		const a = WARMUP_QIDS_BY_TOPIC[slug];
		return Array.isArray(a) ? a : null;
	}

	/** Разминка / страница темы: относится ли вопрос банка к выбранному slug курса */
	function belongsToWarmupTopic(qid, slug) {
		const list = WARMUP_QIDS_BY_TOPIC[slug];
		if (!list || !list.length) return get(qid).slug === slug;
		const slot = part1SlotFromQid(qid);
		if (slot != null) return list.indexOf(slot) !== -1;
		return list.indexOf(qid) !== -1;
	}

	/**
	 * Топ тем по банку ошибок MistakesStore
	 * @returns {{ slug: string, label: string, count: number, trainTopic: string }[]}
	 */
	function aggregateFromMistakes() {
		const list = (window.MistakesStore && window.MistakesStore.list()) || [];
		const bySlug = {};
		list.forEach(m => {
			if (!m || typeof m.qid !== 'number') return;
			const t = get(m.qid);
			const add = m.attempts && m.attempts > 0 ? m.attempts : 1;
			if (!bySlug[t.slug]) {
				bySlug[t.slug] = { slug: t.slug, label: t.label, count: 0, trainTopic: trainTopicParam(t.slug) };
			}
			bySlug[t.slug].count += add;
		});
		return Object.values(bySlug).sort((a, b) => b.count - a.count);
	}

	window.ChemTopicMap = {
		LABELS,
		get,
		trainTopicParam,
		part1SlotFromQid,
		warmupQids,
		belongsToWarmupTopic,
		aggregateFromMistakes
	};
})();
