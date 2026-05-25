/**
 * Единая логика «лучший результат варианта» (часть 1) из localStorage.
 * Используется картой уровней, главой 2, профилем и гардом доступа.
 */
(function (global) {
	'use strict';

	function storedPart1Percent(s) {
		if (!s || !s.finished) return null;
		var p = s.part1Percent != null ? Number(s.part1Percent)
			: (s.percent != null ? Number(s.percent) : null);
		return p != null && isFinite(p) ? p : null;
	}

	function checkAnswerStatic(q, given) {
		var correct = q.correct;
		var isEmpty =
			given === undefined ||
			given === '' ||
			(Array.isArray(given) && given.filter(function (x) { return x; }).length === 0);
		if (isEmpty) return 'skip';
		var norm = function (s) {
			return String(s)
				.trim()
				.toLowerCase()
				.replace(/\u00A0/g, ' ')
				.replace(/\s+/g, ' ')
				.replace(/\./g, ',');
		};
		if (q.type === 'input') {
			var variants = Array.isArray(correct) ? correct : [correct];
			return variants.some(function (v) {
				return norm(given) === norm(v);
			})
				? 'ok'
				: 'wrong';
		}
		if (Array.isArray(correct)) {
			if (q.type === 'match') {
				var g = Array.isArray(given) ? given.map(function (x) { return x || ''; }).join(',') : '';
				return g === correct.join(',') ? 'ok' : 'wrong';
			}
			var ga = Array.isArray(given) ? [].concat(given) : [];
			var g2 = ga.sort().join(',');
			var c2 = [].concat(correct).sort().join(',');
			return g2 === c2 ? 'ok' : 'wrong';
		}
		return norm(given) === norm(correct) ? 'ok' : 'wrong';
	}

	function findQuestion(bankArr, qid) {
		for (var i = 0; i < bankArr.length; i++) {
			if (bankArr[i].id === qid) return bankArr[i];
		}
		return null;
	}

	/**
	 * @param {object} state parsed localStorage snapshot
	 * @param {{ id: number, qids?: number[] }} variant
	 * @param {object[]} bankArr
	 * @param {function|undefined} checkAnswer optional checker (q, given) => 'ok'|'wrong'|'skip'
	 * @returns {{ ok: number, total: number, percent: number, fromStored?: boolean }|null}
	 */
	function fromState(state, variant, bankArr, checkAnswer) {
		if (!state || !state.finished || !variant) return null;
		checkAnswer = checkAnswer || checkAnswerStatic;
		var stored = storedPart1Percent(state);
		var ok = 0;
		var total = 0;
		(variant.qids || []).forEach(function (qid) {
			var q = findQuestion(bankArr, qid);
			if (!q || q.type === 'written') return;
			total++;
			var given = state.answers ? state.answers[q.id] : undefined;
			if (checkAnswer(q, given) === 'ok') ok++;
		});
		if (!total) {
			if (stored == null) return null;
			return { ok: Math.round(stored), total: 100, percent: stored, fromStored: true };
		}
		var computed = Math.round((100 * ok) / total);
		var percent = (computed > 0 || stored == null) ? computed : stored;
		return { ok: ok, total: total, percent: percent, fromStored: computed <= 0 && stored != null };
	}

	function readLocal(lsPrefix, variant, bankArr, checkAnswer) {
		try {
			var raw = localStorage.getItem(lsPrefix + variant.id);
			if (!raw) return null;
			return fromState(JSON.parse(raw), variant, bankArr, checkAnswer);
		} catch (e) {
			return null;
		}
	}

	function readLocalById(lsPrefix, variantId, findVariant, bankArr, checkAnswer) {
		var v = findVariant(variantId);
		if (!v) return null;
		return readLocal(lsPrefix, v, bankArr, checkAnswer);
	}

	function isPassed(best) {
		return !!(best && best.percent >= 50);
	}

	function finishedPassed(state, passThreshold) {
		if (!state || !state.finished) return false;
		var stored = storedPart1Percent(state);
		if (stored != null) return stored >= (passThreshold != null ? passThreshold : 50);
		return false;
	}

	global.IqmoVariantBest = {
		storedPart1Percent: storedPart1Percent,
		checkAnswerStatic: checkAnswerStatic,
		fromState: fromState,
		readLocal: readLocal,
		readLocalById: readLocalById,
		isPassed: isPassed,
		finishedPassed: finishedPassed
	};
})(typeof window !== 'undefined' ? window : global);
