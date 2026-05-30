/**

 * Гард Главы 2: та же модель «Глава 1», что и на карте уровней full-test-*

 * (химия: первые 7 ready; биология: первые 7 записей списка вариантов).

 * Требует /iqmo-variant-best.js до этого скрипта.

 */

(function (global) {

	'use strict';



	function gmVariantBest(bankArr, lsPrefix, v) {

		if (!global.IqmoVariantBest) return null;

		return IqmoVariantBest.readLocal(lsPrefix, v, bankArr);

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


