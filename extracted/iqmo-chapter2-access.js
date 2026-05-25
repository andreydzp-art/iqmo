/**
 * Гард Главы 2: та же модель «Глава 1», что и на карте уровней full-test-*
 * (химия: первые 7 ready; биология: первые 7 записей списка вариантов).
 */
(function (global) {
	'use strict';

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

	function gmVariantBest(bankArr, lsPrefix, v) {
		try {
			var raw = localStorage.getItem(lsPrefix + v.id);
			if (!raw) return null;
			var s = JSON.parse(raw);
			if (!s || !s.finished) return null;
			var storedPct = s.part1Percent != null ? Number(s.part1Percent)
				: (s.percent != null ? Number(s.percent) : null);
			var ok = 0;
			var total = 0;
			(v.qids || []).forEach(function (qid) {
				var q = null;
				for (var i = 0; i < bankArr.length; i++) {
					if (bankArr[i].id === qid) {
						q = bankArr[i];
						break;
					}
				}
				if (!q || q.type === 'written') return;
				total++;
				var given = s.answers ? s.answers[q.id] : undefined;
				if (checkAnswerStatic(q, given) === 'ok') ok++;
			});
			if (!total) {
				if (storedPct == null || !isFinite(storedPct)) return null;
				return { ok: Math.round(storedPct), total: 100, percent: storedPct };
			}
			var computed = Math.round((100 * ok) / total);
			var percent = (computed > 0 || storedPct == null || !isFinite(storedPct))
				? computed
				: storedPct;
			return { ok: ok, total: total, percent: percent };
		} catch (e) {
			return null;
		}
	}

	function passAtLeast50(bankArr, lsPrefix, v) {
		var b = gmVariantBest(bankArr, lsPrefix, v);
		return b && b.percent >= 50 ? b : null;
	}

	function gmStarsForPercent(percent) {
		if (percent >= 90) return 3;
		if (percent >= 70) return 2;
		if (percent >= 50) return 1;
		return 0;
	}

	function gmXpForMapNode(nodeIndex, isBoss, percent) {
		if (global.IqmoLevelMapXp) {
			return IqmoLevelMapXp.xpForPassedNode(nodeIndex, isBoss, percent);
		}
		if (percent == null || percent < 50) return 0;
		if (isBoss) return 50 * 7 + 200;
		return 50 * (nodeIndex + 1);
	}

	function gmXpForVariant(percent) {
		if (percent == null || percent < 50) return 0;
		return 100;
	}

	function getChapterSliceChemistry() {
		var all = global.CHEMISTRY_VARIANTS || [];
		var ready = all.filter(function (v) {
			return v.status === 'ready';
		});
		if (ready.length < 7) return null;
		return ready.slice(0, 7);
	}

	function getChapterSliceBiology() {
		var all = global.BIOLOGY_VARIANTS || [];
		if (all.length < 7) return null;
		return all.slice(0, 7);
	}

	function getBankAndPrefix(subject) {
		if (subject === 'biology') {
			return {
				bank: global.BIOLOGY_QUESTIONS || [],
				ls: 'iqmo-bio-v-',
				attemptsKey: 'iqmo-bio-attempts',
			};
		}
		return {
			bank: global.CHEMISTRY_QUESTIONS || [],
			ls: 'iqmo-chem-v-',
			attemptsKey: 'iqmo-chem-attempts',
		};
	}

	var REGULAR_COUNT = 6;

	function slotPassedForAccess(bp, slots, boss, idx) {
		if (passAtLeast50(bp.bank, bp.ls, slots[idx])) return true;
		// Цепочка: если пройден более поздний узел или босс — ранние тоже зачтены
		// (localStorage раннего варианта мог пропасть при обновлении банка).
		var j;
		for (j = idx + 1; j < slots.length; j++) {
			if (passAtLeast50(bp.bank, bp.ls, slots[j])) return true;
		}
		return !!passAtLeast50(bp.bank, bp.ls, boss);
	}

	function isChapter1Complete(subject) {
		var slice =
			subject === 'biology' ? getChapterSliceBiology() : getChapterSliceChemistry();
		if (!slice || slice.length < 7) return false;
		var bp = getBankAndPrefix(subject);
		var slots = slice.slice(0, 6);
		var boss = slice[6];
		var i;
		if (subject === 'biology') {
			for (i = 0; i < slots.length; i++) {
				if (slots[i].status !== 'ready') return false;
			}
			if (boss.status !== 'ready') return false;
		}
		// Совпадает с hub: победа над боссом = глава 1 завершена.
		if (passAtLeast50(bp.bank, bp.ls, boss)) return true;
		for (i = 0; i < slots.length; i++) {
			if (!slotPassedForAccess(bp, slots, boss, i)) return false;
		}
		return false;
	}

	function chapter1ArchiveSummary(subject) {
		var slice =
			subject === 'biology' ? getChapterSliceBiology() : getChapterSliceChemistry();
		if (!slice) return null;
		var bp = getBankAndPrefix(subject);
		var totalStars = 0;
		var maxStars = 0;
		var totalXp = 0;
		var scoreSum = 0;
		var scored = 0;
		var passed = 0;
		slice.forEach(function (v, i) {
			if (subject === 'biology' && v.status !== 'ready') return;
			var p = passAtLeast50(bp.bank, bp.ls, v);
			if (!p) return;
			var st = gmStarsForPercent(p.percent);
			totalStars += st;
			maxStars += 3;
			totalXp += gmXpForMapNode(i < REGULAR_COUNT ? i : 0, i >= REGULAR_COUNT, p.percent);
			scoreSum += p.percent;
			scored++;
			if (st >= 1) passed++;
		});
		return {
			nodeCount: slice.filter(function (v) {
				return subject !== 'biology' || v.status === 'ready';
			}).length,
			passedVariants: passed,
			totalStars: totalStars,
			maxStars: maxStars,
			avgPercent: scored ? Math.round(scoreSum / scored) : 0,
			xpTotal: totalXp,
		};
	}

	function getBossVariant(subject) {
		var slice =
			subject === 'biology' ? getChapterSliceBiology() : getChapterSliceChemistry();
		return slice && slice.length >= 7 ? slice[6] : null;
	}

	function chapter1BossPassedAt(subject) {
		var boss = getBossVariant(subject);
		if (!boss) return null;
		var key = getBankAndPrefix(subject).attemptsKey;
		try {
			var attempts = JSON.parse(localStorage.getItem(key) || '{}') || {};
			var a = attempts[boss.id];
			if (a && a.passedAt) return a.passedAt;
		} catch (e) {}
		return null;
	}

	global.IqmoChapter2Access = {
		isChapter1Complete: isChapter1Complete,
		chapter1ArchiveSummary: chapter1ArchiveSummary,
		getBossVariant: getBossVariant,
		chapter1BossPassedAt: chapter1BossPassedAt,
		gmStarsForPercent: gmStarsForPercent,
		gmXpForVariant: gmXpForVariant,
		gmXpForMapNode: gmXpForMapNode,
	};
})(typeof window !== 'undefined' ? window : this);
