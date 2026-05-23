/**
 * Normalize level-map node states: progress cannot skip earlier slots.
 * Fixes display when localStorage for an early variant is missing but later ones are done.
 */
(function (global) {
	'use strict';

	function inferBest(vi, getRawBest) {
		if (vi.best) return;
		var raw = getRawBest(vi.v);
		vi.best = raw || { ok: 0, total: 1, percent: 50, inferred: true };
	}

	function normalize(variantInfos, bossInfo, getRawBest, isReady) {
		isReady = isReady || function () { return true; };
		for (var i = 0; i < variantInfos.length - 1; i++) {
			if (variantInfos[i + 1].state === 'done' && variantInfos[i].state !== 'done') {
				variantInfos[i].state = 'done';
				inferBest(variantInfos[i], getRawBest);
			}
		}
		if (bossInfo && bossInfo.state === 'done') {
			variantInfos.forEach(function (vi) {
				if (vi.state !== 'done') {
					vi.state = 'done';
					inferBest(vi, getRawBest);
				}
			});
		}
		for (var j = 0; j < variantInfos.length; j++) {
			var vi2 = variantInfos[j];
			if (isReady(vi2.v) && vi2.state !== 'done') return j;
		}
		return -1;
	}

	global.IqmoLevelMapState = { normalize: normalize };
})(typeof window !== 'undefined' ? window : global);
