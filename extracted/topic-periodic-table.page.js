// Полная таблица 1–118: длинный вариант (7 периодов + ряды f-элементов).
// У каждой ячейки явные grid-row / grid-column — без пустых «квадратиков».
const METALLOID_Z = new Set([5, 14, 32, 33, 51, 52]);
const NOBLE_Z = new Set([2, 10, 18, 36, 54, 86, 118]);

const SYMBOLS = [
	'',
	'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
	'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
	'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
	'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
	'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn',
	'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
	'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb',
	'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
	'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th',
	'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm',
	'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds',
	'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];

const NAMES_RU = [
	'',
	'Водород', 'Гелий', 'Литий', 'Бериллий', 'Бор', 'Углерод', 'Азот', 'Кислород', 'Фтор', 'Неон',
	'Натрий', 'Магний', 'Алюминий', 'Кремний', 'Фосфор', 'Сера', 'Хлор', 'Аргон', 'Калий', 'Кальций',
	'Скандий', 'Титан', 'Ванадий', 'Хром', 'Марганец', 'Железо', 'Кобальт', 'Никель', 'Медь', 'Цинк',
	'Галлий', 'Германий', 'Мышьяк', 'Селен', 'Бром', 'Криптон', 'Рубидий', 'Стронций', 'Иттрий', 'Цирконий',
	'Ниобий', 'Молибден', 'Технеций', 'Рутений', 'Родий', 'Палладий', 'Серебро', 'Кадмий', 'Индий', 'Олово',
	'Сурьма', 'Теллур', 'Йод', 'Ксенон', 'Цезий', 'Барий', 'Лантан', 'Церий', 'Празеодим', 'Неодим',
	'Прометий', 'Самарий', 'Европий', 'Гадолиний', 'Тербий', 'Диспрозий', 'Гольмий', 'Эрбий', 'Тулий', 'Иттербий',
	'Лютеций', 'Гафний', 'Тантал', 'Вольфрам', 'Рений', 'Осмий', 'Иридий', 'Платина', 'Золото', 'Ртуть',
	'Таллий', 'Свинец', 'Висмут', 'Полоний', 'Астат', 'Радон', 'Франций', 'Радий', 'Актиний', 'Торий',
	'Протактиний', 'Уран', 'Нептуний', 'Плутоний', 'Америций', 'Кюрий', 'Берклий', 'Калифорний', 'Эйнштейний', 'Фермий',
	'Менделевий', 'Нобелий', 'Лоренсий', 'Резерфордий', 'Дубний', 'Сиборгий', 'Борий', 'Хассий', 'Мейтнерий', 'Дармштадтий',
	'Рентгений', 'Коперниций', 'Нихоний', 'Флеровий', 'Московий', 'Ливерморий', 'Теннессин', 'Оганесон'
];

const MASS = [
	0,
	1.008, 4.003, 6.94, 9.012, 10.81, 12.01, 14.01, 16.00, 19.00, 20.18,
	22.99, 24.31, 26.98, 28.09, 30.97, 32.07, 35.45, 39.95, 39.10, 40.08,
	44.96, 47.87, 50.94, 52.00, 54.94, 55.85, 58.93, 58.69, 63.55, 65.38,
	69.72, 72.63, 74.92, 78.97, 79.90, 83.80, 85.47, 87.62, 88.91, 91.22,
	92.91, 95.96, 98, 101.07, 102.91, 106.42, 107.87, 112.41, 114.82, 118.71,
	121.76, 127.60, 126.90, 131.29, 132.91, 137.33, 138.91, 140.12, 140.91, 144.24,
	145, 150.36, 151.96, 157.25, 158.93, 162.50, 164.93, 167.26, 168.93, 173.05,
	174.97, 178.49, 180.95, 183.84, 186.21, 190.23, 192.22, 195.08, 196.97, 200.59,
	204.38, 207.2, 208.98, 209, 210, 222, 223, 226, 227, 232.04,
	231.04, 238.03, 237, 244, 243, 247, 247, 251, 252, 257,
	258, 259, 266, 267, 268, 269, 270, 269, 278, 281,
	282, 285, 286, 289, 290, 293, 294, 294
];

/** Конфигурация и ст. окисления — развёрнуто для типичных элементов ОГЭ; остальным подставляется «—». */
const DETAIL = {
	1: { config: '1s¹', ox: '+1, −1' },
	2: { config: '1s²', ox: '0' },
	3: { config: '[He] 2s¹', ox: '+1' },
	4: { config: '[He] 2s²', ox: '+2' },
	5: { config: '[He] 2s² 2p¹', ox: '+3' },
	6: { config: '[He] 2s² 2p²', ox: '+4, +2, −4' },
	7: { config: '[He] 2s² 2p³', ox: '−3, +3, +5' },
	8: { config: '[He] 2s² 2p⁴', ox: '−2' },
	9: { config: '[He] 2s² 2p⁵', ox: '−1' },
	10: { config: '[He] 2s² 2p⁶', ox: '0' },
	11: { config: '[Ne] 3s¹', ox: '+1' },
	12: { config: '[Ne] 3s²', ox: '+2' },
	13: { config: '[Ne] 3s² 3p¹', ox: '+3' },
	14: { config: '[Ne] 3s² 3p²', ox: '+4, −4' },
	15: { config: '[Ne] 3s² 3p³', ox: '+5, +3, −3' },
	16: { config: '[Ne] 3s² 3p⁴', ox: '+6, +4, −2' },
	17: { config: '[Ne] 3s² 3p⁵', ox: '−1, +1, +3, +5, +7' },
	18: { config: '[Ne] 3s² 3p⁶', ox: '0' },
	19: { config: '[Ar] 4s¹', ox: '+1' },
	20: { config: '[Ar] 4s²', ox: '+2' },
	26: { config: '[Ar] 3d⁶ 4s²', ox: '+2, +3' },
	29: { config: '[Ar] 3d¹⁰ 4s¹', ox: '+1, +2' },
	30: { config: '[Ar] 3d¹⁰ 4s²', ox: '+2' },
	35: { config: '[Ar] 3d¹⁰ 4s² 4p⁵', ox: '−1, +1, +5' },
	38: { config: '[Kr] 5s²', ox: '+2' },
	53: { config: '[Kr] 4d¹⁰ 5s² 5p⁵', ox: '−1, +1, +5, +7' },
	56: { config: '[Xe] 6s²', ox: '+2' }
};

const RICH_HINTS = {
	1: 'Входит в большинство органических соединений. Первый элемент таблицы.',
	2: 'Благородный газ. В ОГЭ встречается как пример инертного газа.',
	3: 'Щелочной металл. Самый лёгкий металл.',
	4: 'Щелочноземельный. Амфотерные соединения.',
	5: 'Неметалл с металлоидными свойствами.',
	6: 'Основа органики. Аллотропы: алмаз, графит.',
	7: 'В ОГЭ часто — в аммиаке (NH₃), нитратах.',
	8: 'Самый распространённый элемент земной коры.',
	9: 'Самый электроотрицательный элемент.',
	10: 'Благородный газ.',
	11: 'Щелочной металл. В ОГЭ — NaOH, NaCl, Na₂CO₃.',
	12: 'Щелочноземельный. Горит ярким белым пламенем.',
	13: 'Амфотерный металл. Al₂O₃ и Al(OH)₃ — амфотерны.',
	14: 'В ОГЭ: SiO₂ (нерастворимый в воде кислотный оксид).',
	15: 'В ОГЭ: P₂O₅, H₃PO₄, фосфаты.',
	16: 'В ОГЭ: H₂SO₄, H₂S, SO₂, SO₃.',
	17: 'В ОГЭ: HCl, хлориды, диспропорционирует в щёлочи.',
	18: 'Благородный газ.',
	19: 'Щелочной металл. KOH — сильное основание.',
	20: 'Щелочноземельный. CaCO₃ — мел, известняк.',
	26: 'Переходный металл. В ОГЭ: Fe + HCl → FeCl₂ + H₂.',
	29: 'Переходный металл. Cu стоит правее H — с HCl не реагирует.',
	30: 'ZnO и Zn(OH)₂ — амфотерны.',
	35: 'Br₂ при н. у. — жидкость; среди галогенов типичный жидкий неметалл (ртуть — жидкий металл).',
	38: 'Щелочноземельный.',
	53: 'Твёрдый неметалл. Возгоняется при нагревании.',
	56: 'Щелочноземельный. BaSO₄ — нерастворимая соль (качественная реакция).'
};

function elemCategory(z, group, fRow) {
	if (fRow) return 'f';
	if (NOBLE_Z.has(z)) return 'noble';
	if (METALLOID_Z.has(z)) return 'metalloid';
	if (group >= 13) return 'p';
	if (group >= 3 && group <= 12) return 'd';
	return 's';
}

function groupLabel(group, fRow) {
	if (fRow) return 'f-ряд';
	if (group === 18) return '18 (благородные газы)';
	if (group <= 2) return group + ' (s-блок)';
	if (group <= 12) return group + ' (d-блок)';
	return group + ' (p-блок)';
}

function buildElements() {
	const list = [];
	const push = (z, gridRow, group, fRow) => {
		const hint = RICH_HINTS[z] || 'Для ОГЭ достаточно ориентироваться по периоду, группе и типичным степеням окисления.';
		const period = fRow ? (z >= 58 && z <= 71 ? 6 : 7) : gridRow;
		const det = DETAIL[z];
		list.push({
			z,
			sym: SYMBOLS[z],
			name: NAMES_RU[z],
			p: period,
			g: fRow ? null : group,
			row: gridRow,
			col: group,
			cat: elemCategory(z, group, fRow),
			mass: MASS[z],
			config: det ? det.config : '—',
			gr: groupLabel(group, fRow),
			ox: det ? det.ox : 'см. справочник',
			hint
		});
	};

	push(1, 1, 1, false);
	push(2, 1, 18, false);

	const earlyP = [1, 2, 13, 14, 15, 16, 17, 18];
	for (let i = 0; i < 8; i++) {
		push(3 + i, 2, earlyP[i], false);
		push(11 + i, 3, earlyP[i], false);
	}

	function periodMainRow(period, z0) {
		const zs = [z0, z0 + 1];
		for (let k = 0; k < 10; k++) zs.push(z0 + 2 + k);
		for (let k = 0; k < 6; k++) zs.push(z0 + 2 + 10 + k);
		zs.forEach((z, i) => {
			const col = i < 2 ? i + 1 : i + 1;
			push(z, period, col, false);
		});
	}

	periodMainRow(4, 19);
	periodMainRow(5, 37);
	const p6main = [55, 56, 57];
	for (let z = 72; z <= 86; z++) p6main.push(z);
	p6main.forEach((z, i) => push(z, 6, i + 1, false));

	const p7main = [87, 88, 89];
	for (let z = 104; z <= 118; z++) p7main.push(z);
	p7main.forEach((z, i) => push(z, 7, i + 1, false));

	for (let i = 0; i < 14; i++) {
		push(58 + i, 8, 4 + i, true);
		push(90 + i, 9, 4 + i, true);
	}

	list.sort((a, b) => a.z - b.z);
	return list;
}

const ELEMENTS = buildElements();
const elemByZ = {};
ELEMENTS.forEach(function (e) {
	elemByZ[e.z] = e;
});

const ptable = document.getElementById('ptable-grid');
const elemCardSlot = document.getElementById('elem-card-slot');

function renderTable() {
	ptable.innerHTML = '';
	ELEMENTS.forEach(function (e) {
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'elem is--' + e.cat;
		btn.dataset.z = String(e.z);
		btn.style.gridRow = String(e.row);
		btn.style.gridColumn = String(e.col);
		const shortName = e.name.length > 9 ? e.name.slice(0, 8) + '…' : e.name;
		btn.innerHTML =
			'<div class="elem__z">' +
			e.z +
			'</div><div class="elem__sym">' +
			e.sym +
			'</div><div class="elem__name">' +
			shortName +
			'</div>';
		btn.setAttribute('aria-label', e.name + ', порядковый номер ' + e.z);
		btn.setAttribute('title', e.name + ' (Z = ' + e.z + ')');
		btn.addEventListener('click', function () {
			showElement(e.z);
		});
		ptable.appendChild(btn);
	});
}

function elemTypeRu(cat) {
	if (cat === 'noble') return 'благородный газ';
	if (cat === 'metalloid') return 'металлоид';
	return cat + '-элемент';
}

function showElement(z) {
	ptable.querySelectorAll('.elem').forEach(function (el) {
		el.classList.remove('is--active');
	});
	const btn = ptable.querySelector('[data-z="' + z + '"]');
	if (btn) btn.classList.add('is--active');
	const e = elemByZ[z];
	if (!e) return;
	elemCardSlot.innerHTML = `
		<div class="elem-card">
			<div class="elem-card__big">
				<div class="elem-card__big-z">${e.z}</div>
				<div class="elem-card__big-sym">${e.sym}</div>
				<div class="elem-card__big-mass">${e.mass}</div>
			</div>
			<div>
				<div class="elem-card__name">${e.name}</div>
				<div class="elem-card__tags">
					<span class="elem-card__tag">${e.gr}</span>
					<span class="elem-card__tag">${e.p} период</span>
					<span class="elem-card__tag">${elemTypeRu(e.cat)}</span>
				</div>
				<div class="elem-card__props">
					<div class="elem-card__prop"><div class="elem-card__prop-label">Конфигурация</div><div class="elem-card__prop-value">${e.config}</div></div>
					<div class="elem-card__prop"><div class="elem-card__prop-label">Ст. окисления</div><div class="elem-card__prop-value">${e.ox}</div></div>
					<div class="elem-card__prop"><div class="elem-card__prop-label">Атомная масса</div><div class="elem-card__prop-value">${e.mass}</div></div>
				</div>
				<div class="elem-card__hint">💡 ${e.hint}</div>
			</div>
		</div>
	`;
}

renderTable();
showElement(8); // кислород — типичный пример для темы
(function () {
	var g = document.getElementById('ptable-grid');
	if (!g || typeof console === 'undefined' || !console.warn) return;
	var n = g.querySelectorAll('button.elem').length;
	if (n !== 118) {
		console.warn('[IQMO] Ожидалось 118 элементов в таблице, сейчас:', n, '— сделайте жёсткое обновление (Ctrl+F5).');
	}
})();

// ---- подтемы + hero (localStorage + данные тренажёра) ----
const SUBTOPIC_LS = 'iqmo-chem-topic01-subtopics';
const N_SUB = 6;
const SUBTOPIC_ITEMS = [
	{ name: 'Фокус ОГЭ: слоты 1–3', scroll: '#oge-focus' },
	{ name: 'Шпаргалка и алгоритм для теста ОГЭ', scroll: '#oge-cheat' },
	{ name: 'Интерактивная таблица: периоды и группы', scroll: '#ptable-section' },
	{ name: 'Теория: структура таблицы и закономерности', scroll: '#theory' },
	{ name: 'Определение элемента по схеме строения атома', scroll: '#theory' },
	{ name: 'Высшие оксиды и летучие водородные соединения', scroll: '#theory' }
];

function readSubtopicState() {
	try {
		const raw = localStorage.getItem(SUBTOPIC_LS);
		if (!raw) return Array(N_SUB).fill(0);
		const a = JSON.parse(raw);
		if (!Array.isArray(a)) return Array(N_SUB).fill(0);
		const mapped = a.map(function (x) { return x === 2 ? 2 : x === 1 ? 1 : 0; });
		if (mapped.length < N_SUB) return mapped.concat(Array(N_SUB - mapped.length).fill(0));
		if (mapped.length > N_SUB) return mapped.slice(0, N_SUB);
		return mapped;
	} catch (e) {
		return Array(N_SUB).fill(0);
	}
}
function saveSubtopicState(st) {
	try {
		localStorage.setItem(SUBTOPIC_LS, JSON.stringify(st));
	} catch (e) {}
}
function subtopicClass(st) {
	if (st === 2) return 'is--done';
	if (st === 1) return 'is--partial';
	return '';
}
function renderSubtopics() {
	const root = document.getElementById('subtopics-root');
	if (!root) return;
	const st = readSubtopicState();
	root.innerHTML = SUBTOPIC_ITEMS.map(function (item, i) {
		const status = st[i];
		const cls = subtopicClass(status);
		let checkInner = '';
		if (status === 2) {
			checkInner =
				'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
		} else if (status === 1) {
			checkInner =
				'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';
		}
		const meta = status === 2 ? 'освоено' : status === 1 ? 'в процессе' : 'не отмечено';
		return (
			'<div class="subtopic-row">' +
			'<button type="button" class="subtopic ' +
			cls +
			'" data-idx="' +
			i +
			'" aria-label="' +
			'Статус подтемы: ' +
			meta +
			'. Нажмите, чтобы изменить.' +
			'">' +
			'<span class="subtopic__check">' +
			checkInner +
			'</span>' +
			'<span class="subtopic__name">' +
			item.name +
			'</span>' +
			'<span class="subtopic__meta">' +
			meta +
			'</span>' +
			'<span class="subtopic__go" aria-hidden="true">→</span>' +
			'</button>' +
			'<a href="' +
			item.scroll +
			'" class="btn btn--ghost" style="padding:9px 14px; font-size:13px;">К разделу</a>' +
			'</div>'
		);
	}).join('');
	root.querySelectorAll('.subtopic[data-idx]').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var idx = parseInt(btn.getAttribute('data-idx'), 10);
			var cur = readSubtopicState();
			cur[idx] = (cur[idx] + 1) % 3;
			saveSubtopicState(cur);
			renderSubtopics();
			updateHeroFromSubtopics();
		});
	});
}
function updateHeroFromSubtopics() {
	var st = readSubtopicState();
	var done = st.filter(function (x) {
		return x === 2;
	}).length;
	var partial = st.filter(function (x) {
		return x === 1;
	}).length;
	var pct = Math.min(100, Math.round((done * 100 + partial * 45) / N_SUB));
	var valEl = document.getElementById('thero-progress-value');
	var fillEl = document.getElementById('thero-progress-fill');
	var subEl = document.getElementById('thero-progress-sub');
	var extraEl = document.getElementById('thero-progress-extra');
	if (valEl) {
		valEl.textContent =
			done +
			' из ' +
			N_SUB +
			' освоено' +
			(partial ? ' · ' + partial + ' в процессе' : '');
	}
	if (fillEl) fillEl.style.width = pct + '%';
	var sub = '';
	var extra = '';
	if (window.ChemProgress) {
		var la = ChemProgress.getLastAttempt();
		if (la && la.subject === 'chemistry') {
			sub =
				'Последний тест: ' +
				la.correct +
				'/' +
				la.total +
				' (' +
				la.percent +
				'%) · ' +
				ChemProgress.formatRelativeTime(la.finishedAt);
		}
	}
	if (!sub) sub = 'Пройдите разминку или вариант — здесь появится сводка по баллам.';
	if (window.MistakesStore && window.ChemTopicMap) {
		var n = MistakesStore.list().filter(function (m) {
			return ChemTopicMap.get(m.qid).slug === 'periodic';
		}).length;
		if (n > 0) {
			var m10 = n % 10,
				m100 = n % 100;
			var ew =
				m10 === 1 && m100 !== 11
					? 'ошибка'
					: m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)
						? 'ошибки'
						: 'ошибок';
			extra = 'В банке по заданиям темы 01: ' + n + ' ' + ew;
		}
	}
	if (subEl) subEl.textContent = sub;
	if (extraEl) extraEl.textContent = extra || '';
}
renderSubtopics();
updateHeroFromSubtopics();
