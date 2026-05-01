// biology-variants.js — варианты полного ОГЭ по биологии (как chemistry-variants).
// Вариант 1: 21 задание из biology-bank.js (qid 1–21).
// Вариант 2: 23 задания (qid 22–33, 43, 44, 34–42). qid 43 — placeholder для
// позиции 13 (условие ещё не получено), qid 44 — «Орган слуха» (ОГЭ-14).
// Остальные варианты — в разработке.
window.BIOLOGY_VARIANTS = (function () {
	const variants = [];
	variants.push({
		id: 1,
		title: 'Вариант 1',
		qids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
		status: 'ready',
	});
	variants.push({
		id: 2,
		title: 'Вариант 2',
		qids: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 43, 44, 34, 35, 36, 37, 38, 39, 40, 41, 42],
		status: 'ready',
	});
	for (let i = 3; i <= 29; i++) {
		variants.push({
			id: i,
			title: 'Вариант ' + i,
			qids: [],
			status: 'coming',
		});
	}
	return variants;
})();
