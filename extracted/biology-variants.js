// biology-variants.js — варианты полного ОГЭ по биологии (как chemistry-variants).
// Вариант 1: 21 задание из biology-bank.js (qid 1–21). Остальные — в разработке.
window.BIOLOGY_VARIANTS = (function () {
	const variants = [];
	variants.push({
		id: 1,
		title: 'Вариант 1',
		qids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
		status: 'ready',
	});
	for (let i = 2; i <= 29; i++) {
		variants.push({
			id: i,
			title: 'Вариант ' + i,
			qids: [],
			status: 'coming',
		});
	}
	return variants;
})();
