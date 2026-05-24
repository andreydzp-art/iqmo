/**
 * XP на карте уровней: +50 за каждый шаг, супер-босс = шаг 7 + 200 сверху.
 * Шаг 1 → 50, 2 → 100, …, 6 → 300, босс → 550.
 */
(function (global) {
	'use strict';

	var STEP_XP = 50;
	var BOSS_EXTRA = 200;
	var REGULAR_COUNT = 6;

	function xpForNodeIndex(nodeIndex, isBoss) {
		if (isBoss) return STEP_XP * (REGULAR_COUNT + 1) + BOSS_EXTRA;
		return STEP_XP * (nodeIndex + 1);
	}

	function xpForPassedNode(nodeIndex, isBoss, percent) {
		if (percent == null || percent < 50) return 0;
		return xpForNodeIndex(nodeIndex, isBoss);
	}

	function bossPreviewXp() {
		return xpForNodeIndex(0, true);
	}

	function getChapter1Slice(subject) {
		if (subject === 'biology') {
			var all = global.BIOLOGY_VARIANTS || [];
			return all.length >= 7 ? all.slice(0, 7) : null;
		}
		var ready = (global.CHEMISTRY_VARIANTS || []).filter(function (v) {
			return v.status === 'ready';
		});
		return ready.length >= 7 ? ready.slice(0, 7) : null;
	}

	var CH2_REGULAR = [8, 9, 10, 11, 12, 13];
	var CH2_BOSS = 14;

	function findMapSlot(subject, variantId) {
		var id = Number(variantId);
		if (!id) return null;
		var ch1 = getChapter1Slice(subject);
		if (ch1) {
			for (var i = 0; i < ch1.length; i++) {
				if (ch1[i].id === id) {
					return { chapter: 1, nodeIndex: i < REGULAR_COUNT ? i : REGULAR_COUNT, isBoss: i === REGULAR_COUNT };
				}
			}
		}
		for (var j = 0; j < CH2_REGULAR.length; j++) {
			if (CH2_REGULAR[j] === id) {
				return { chapter: 2, nodeIndex: j, isBoss: false };
			}
		}
		if (id === CH2_BOSS) {
			return { chapter: 2, nodeIndex: REGULAR_COUNT, isBoss: true };
		}
		return null;
	}

	function xpForVariantId(subject, variantId, percent) {
		var slot = findMapSlot(subject, variantId);
		if (!slot) return 0;
		return xpForPassedNode(slot.nodeIndex, slot.isBoss, percent);
	}

	function sumChapterXp(infos) {
		var total = 0;
		var nodePassed = global.IqmoLevelMapState && global.IqmoLevelMapState.nodePassed
			? global.IqmoLevelMapState.nodePassed
			: function (vi) {
				return vi && (vi.state === 'done' || (vi.best && vi.best.percent >= 50));
			};
		(infos || []).forEach(function (vi, idx) {
			if (!nodePassed(vi)) return;
			var pct = vi.best && vi.best.percent != null ? vi.best.percent : 50;
			total += xpForPassedNode(idx, !!vi.isBoss, pct);
		});
		return total;
	}

	global.IqmoLevelMapXp = {
		STEP_XP: STEP_XP,
		BOSS_EXTRA: BOSS_EXTRA,
		REGULAR_COUNT: REGULAR_COUNT,
		xpForNodeIndex: xpForNodeIndex,
		xpForPassedNode: xpForPassedNode,
		bossPreviewXp: bossPreviewXp,
		findMapSlot: findMapSlot,
		xpForVariantId: xpForVariantId,
		sumChapterXp: sumChapterXp,
	};
})(typeof window !== 'undefined' ? window : global);
