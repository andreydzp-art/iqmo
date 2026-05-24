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

	function nodePassed(vi) {
		if (!vi) return false;
		if (vi.state === 'done') return true;
		return !!(vi.best && vi.best.percent >= 50);
	}

	function countPassed(infos) {
		var n = 0;
		(infos || []).forEach(function (vi) {
			if (nodePassed(vi)) n++;
		});
		return n;
	}

	global.IqmoLevelMapState = { normalize: normalize, nodePassed: nodePassed, countPassed: countPassed };
})(typeof window !== 'undefined' ? window : global);
