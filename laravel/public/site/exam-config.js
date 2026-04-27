// exam-config.js — длительность экзамена по предметам (ОГЭ), минуты
(function () {
	var T = {
		chemistry: { fullTestMinutes: 180, trialMinutes: 25 },
		biology: { fullTestMinutes: 180, trialMinutes: 25 },
		physics: { fullTestMinutes: 180, trialMinutes: 25 },
		math: { fullTestMinutes: 180, trialMinutes: 25 },
		russian: { fullTestMinutes: 180, trialMinutes: 25 }
	};

	function norm(key) {
		return (key || 'chemistry').toLowerCase();
	}

	window.IQMO_EXAM_TIMERS = T;

	/**
	 * @param {string} subjectKey — chemistry | biology | ...
	 * @param {'full'|'trial'} mode
	 * @returns {number} минут
	 */
	window.getExamTimerMinutes = function (subjectKey, mode) {
		var s = T[norm(subjectKey)] || T.chemistry;
		if (mode === 'trial') return s.trialMinutes;
		return s.fullTestMinutes;
	};
})();
