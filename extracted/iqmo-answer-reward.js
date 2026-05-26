/**
 * IQMO — расчёт XP и фраз за один ответ в тесте.
 * Один questionId + attemptId → начисление только один раз (контроль в iqmo-test-feedback.js).
 */
(function (global) {
	'use strict';

	var PHRASES = {
		correct: ['Отлично!', 'Верно!', 'Сильно!', 'Красиво!', 'Точно!', 'Хороший ход!', 'Есть контакт!', 'Так держать!'],
		wrong: ['Почти!', 'Не страшно, разберёмся', 'Ошибка — это часть тренировки', 'Запомним и повторим позже', 'Хорошая попытка', 'Сейчас закрепим'],
		streak: ['Серия растёт!', 'Уже лучше!', 'Хороший ритм!', 'Пошёл разгон!', 'Держишь темп!'],
		speedFast: ['Быстрый ответ!', 'Отличный темп!', 'Решено быстро!', 'Реакция огонь!'],
		speedMid: ['Хороший темп!'],
		streak5: 'Отличная серия!',
		streak10: 'Невероятно!'
	};

	function pick(arr) {
		if (!arr || !arr.length) return '';
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function speedBonusFor(ms) {
		var t = Math.max(0, Number(ms) || 0);
		if (t <= 5000) return { xp: 5, tier: 'fast', label: 'Быстрый ответ' };
		if (t <= 12000) return { xp: 3, tier: 'mid', label: 'Хороший темп' };
		return { xp: 0, tier: 'slow', label: '' };
	}

	function streakBonusFor(streak) {
		var s = Math.max(0, Math.floor(Number(streak) || 0));
		if (s >= 10) return { xp: 10, milestone: 10 };
		if (s >= 5) return { xp: 5, milestone: 5 };
		if (s >= 3) return { xp: 3, milestone: 3 };
		return { xp: 0, milestone: 0 };
	}

	/**
	 * @param {{ isCorrect: boolean, answerTimeMs: number, correctStreak: number, isTopicPerfect?: boolean }} p
	 */
	function calculateAnswerReward(p) {
		var isCorrect = !!p.isCorrect;
		var answerTimeMs = Math.max(0, Number(p.answerTimeMs) || 0);
		var correctStreak = Math.max(0, Math.floor(Number(p.correctStreak) || 0));
		var isTopicPerfect = !!p.isTopicPerfect;

		var baseXP = isCorrect ? 10 : 2;
		var speedBonus = 0;
		var speedMeta = speedBonusFor(answerTimeMs);
		var streakBonus = 0;
		var streakMilestone = 0;
		var topicBonus = 0;

		if (isCorrect) {
			speedBonus = speedMeta.xp;
			var sb = streakBonusFor(correctStreak);
			streakBonus = sb.xp;
			streakMilestone = sb.milestone;
		}
		if (isTopicPerfect) topicBonus = 15;

		return {
			totalXP: baseXP + speedBonus + streakBonus + topicBonus,
			baseXP: baseXP,
			speedBonus: speedBonus,
			streakBonus: streakBonus,
			topicBonus: topicBonus,
			speedTier: speedMeta.tier,
			speedLabel: speedMeta.label,
			streakMilestone: streakMilestone
		};
	}

	function buildFeedbackCopy(opts) {
		opts = opts || {};
		var isCorrect = !!opts.isCorrect;
		var reward = opts.reward || {};
		var streak = Math.max(0, Number(opts.correctStreak) || 0);
		var headline = isCorrect ? pick(PHRASES.correct) : pick(PHRASES.wrong);

		if (isCorrect && reward.streakMilestone === 10) {
			headline = PHRASES.streak10;
		} else if (isCorrect && reward.streakMilestone === 5) {
			headline = PHRASES.streak5;
		}

		var chips = [];
		if (isCorrect && streak >= 2) {
			chips.push({ icon: '🔥', text: 'Серия: ' + streak + ' подряд' });
		}
		if (isCorrect && reward.speedBonus > 0 && reward.speedLabel) {
			var speedPhrase = reward.speedTier === 'fast' ? pick(PHRASES.speedFast) : pick(PHRASES.speedMid);
			chips.push({ icon: '⚡', text: speedPhrase + ' +' + reward.speedBonus + ' XP' });
		} else if (isCorrect && reward.speedBonus > 0) {
			chips.push({ icon: '⚡', text: reward.speedLabel + ' +' + reward.speedBonus + ' XP' });
		}
		if (isCorrect && reward.streakBonus > 0 && reward.streakMilestone) {
			chips.push({ icon: '🔥', text: 'Бонус серии +' + reward.streakBonus + ' XP' });
		}
		if (reward.topicBonus > 0) {
			chips.push({ icon: '🎯', text: 'Без ошибок по теме +' + reward.topicBonus + ' XP' });
		}

		var sub = '';
		if (!isCorrect && opts.correctLabel) {
			sub = 'Правильный ответ: ' + opts.correctLabel;
		}
		if (!isCorrect) {
			chips.push({ icon: '🧠', text: 'Добавлено в работу над ошибками' });
		}

		return { headline: headline, chips: chips, sub: sub };
	}

	global.IqmoAnswerReward = {
		PHRASES: PHRASES,
		pick: pick,
		calculateAnswerReward: calculateAnswerReward,
		buildFeedbackCopy: buildFeedbackCopy,
		speedBonusFor: speedBonusFor,
		streakBonusFor: streakBonusFor
	};
})(typeof window !== 'undefined' ? window : global);
