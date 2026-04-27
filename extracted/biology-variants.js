// biology-variants.js — варианты полного ОГЭ по биологии (как chemistry-variants: порядок и разблокировка).
// Пока все варианты в статусе «coming»; по мере наполнения biology-bank.js сюда добавятся qids и status: 'ready'.

window.BIOLOGY_VARIANTS = (function () {
	const variants = [];
	for (let i = 1; i <= 29; i++) {
		variants.push({
			id: i,
			title: 'Вариант ' + i,
			qids: [],
			status: 'coming',
		});
	}
	return variants;
})();
