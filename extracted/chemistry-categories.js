// Категории тренировки по химии ОГЭ (кодификатор, разделы 1–19)
// Пока вопросы для категорий не подключены — статусы "coming".
(function () {
	'use strict';

	var cats = [
		{
			id: 1,
			title: 'Атомы и молекулы. Химический элемент. Простые и сложные вещества',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 10001; i <= 10078; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 2,
			title: 'Периодический закон и Периодическая система элементов',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 30001; i <= 30065; i++) out.push(i);
				return out;
			})()
		},
		// Кат. 3: задания из chemistry-bank.js (типичные «установите соответствие» + ввод по валентности в высших оксидах).
		// Файл chemistry-cat03-source.js — это периодика → категория 2 (30001–30065), не путать с id категории 3.
		{
			id: 3,
			title: 'Валентность и степени окисления химических элементов',
			status: 'ready',
			qids: [
				4, 104, 204, 304, 404, 604, 704, 804, 904, 1004, 1104, 1204, 1304, 1404, 1504, 1604, 1704, 1804, 1904,
				2004, 2104, 2203, 2204, 2304, 2404
			]
		},
		{
			id: 4,
			title: 'Строение молекул. Химическая связь',
			status: 'ready',
			qids: (function () {
				var out = [];
				// 40001–40022: chemistry-cat04-source.js; 40023–40052: chemistry-cat04-custom-source.js
				for (var i = 40001; i <= 40052; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 5,
			title: 'Строение электронных оболочек. Закономерности изменения свойств элементов',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 50001; i <= 50064; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 6,
			title: 'Простые и сложные вещества. Неорганические вещества',
			status: 'ready',
			qids: (function () {
				var out = [];
				// 60001–60016: chemistry-cat06-source.js; 60017–60056: chemistry-cat06-custom-source.js
				for (var i = 60001; i <= 60056; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 7,
			title: 'Химические свойства простых веществ. Химические свойства оксидов',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 70001; i <= 70023; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 8,
			title: 'Химические свойства простых и сложных неорганических веществ',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 80001; i <= 80020; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 9,
			title: 'Химические свойства простых и сложных веществ',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 93001; i <= 93098; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 10,
			title: 'Химические реакции и уравнения',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 100001; i <= 100036; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 11,
			title: 'Условия и признаки протекания химических реакций',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 94001; i <= 94079; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 12,
			title: 'Электролиты и неэлектролиты. Катионы и анионы',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 95001; i <= 95052; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 13,
			title: 'Реакции ионного обмена и условия их осуществления',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 96001; i <= 96126; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 14,
			title: 'Окислительно-восстановительные реакции',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 140001; i <= 140059; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 15,
			title: 'Безопасность в лаборатории. Смеси. Химическое загрязнение',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 97001; i <= 97057; i++) out.push(i);
				return out;
			})()
		},
		{
			id: 16,
			title: 'Среда водных растворов. Качественные реакции неорганических соединений',
			status: 'ready',
			qids: (function () {
				var out = [];
				for (var i = 98001; i <= 98066; i++) out.push(i);
				return out;
			})()
		},
		
	];

	window.CHEMISTRY_CATEGORIES = cats;
})();

