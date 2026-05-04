// biology-variants.js — варианты полного ОГЭ по биологии (как chemistry-variants).
// Вариант 1: 21 задание из biology-bank.js (qid 1–21).
// Вариант 2: 23 задания (qid 22–33, 43, 44, 34–42). qid 43 — placeholder для
// позиции 13 (условие ещё не получено), qid 44 — «Орган слуха» (ОГЭ-14).
// Вариант 3: 21 задание (qid 45–65), интегрировано из variant3_bio.js.
// Вариант 4: 21 задание (qid 66–86), интегрировано из variant4_bio.js.
// Вариант 5: 21 задание (qid 87–107), вариант Решу ОГЭ № 4543664.
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
	variants.push({
		id: 3,
		title: 'Вариант 3',
		qids: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
		status: 'ready',
	});
	variants.push({
		id: 4,
		title: 'Вариант 4',
		qids: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
		status: 'ready',
	});
	variants.push({
		id: 5,
		title: 'Вариант 5',
		qids: [87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107],
		status: 'ready',
	});
	for (let i = 6; i <= 29; i++) {
		variants.push({
			id: i,
			title: 'Вариант ' + i,
			qids: [],
			status: 'coming',
		});
	}
	return variants;
})();
