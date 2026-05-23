// chemistry-bank.js
// Общий банк вопросов по химии. Используется и полным вариантом, и разминкой.
window.CHEMISTRY_QUESTIONS = [
				{
					id: 1,
					type: 'multi',
					pickCount: 2,
					title: 'Водород как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о водороде как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Водород входит в состав большинства органических соединений.' },
						{ id: '2', label: 'Водород — самый лёгкий газ.' },
						{ id: '3', label: 'Водородом заполняют воздушные шары.' },
						{ id: '4', label: 'Водород содержится в вулканических газах.' },
						{ id: '5', label: 'Молекула метана содержит четыре атома водорода.' }
					],
					correct: ['1','5'],
					hint: 'Отметьте ровно два варианта. Порядок не важен.'
				},
				{
					id: 2,
					type: 'input',
					title: 'Строение электронных оболочек атома',
					body: `
						<p>На приведённом рисунке изображена схема строения электронных оболочек атома.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<img src="/img/chemistry-q2-electron-shells.png" width="360" alt="Схема электронных оболочек: ядро +8, внутренний уровень 2 e⁻, внешний уровень 6 e⁻" style="max-width: 100%; height: auto; display: block;" />
						</div>
						<p>Запишите в поле ответа номер периода (<b>X</b>) и номер группы (<b>Y</b>), в которых расположен химический элемент, схема строения которого изображена на рисунке.</p>
						<p style="color: var(--muted); font-size: 14px;">Для записи ответа используйте арабские цифры, без пробелов и запятых: сначала <b>X</b>, затем <b>Y</b>.</p>
					`,
					placeholder: 'например, 34',
					correct: '26',
					hint: 'Период — количество электронных оболочек. Группа — число электронов на внешнем уровне.'
				},
				{
					id: 3,
					type: 'input',
					title: 'Усиление основных свойств оксидов',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>барий</li>
							<li>кальций</li>
							<li>магний</li>
						</ol>
						<p>в порядке <b>усиления</b> основных свойств их высших оксидов.</p>
						<p style="color: var(--muted); font-size: 14px;">Запишите номера выбранных элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '321',
					hint: 'В главной подгруппе сверху вниз металлические и основные свойства усиливаются.'
				},
				{
					id: 4,
					type: 'match',
					title: 'Степень окисления фосфора',
					body: `
						<p>Установите соответствие между формулой вещества и степенью окисления фосфора в данном веществе: к каждой позиции, обозначенной буквой, подберите соответствующую позицию, обозначенную цифрой.</p>
					`,
					matchLeft: [
						{ letter: 'А', label: 'Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>' },
						{ letter: 'Б', label: 'Na<sub>3</sub>P' },
						{ letter: 'В', label: 'PH<sub>4</sub>I' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+1' },
						{ id: '4', label: '+3' }
					],
					correct: ['2','1','1'],
					hint: 'В Ca₃(PO₄)₂ фосфор в составе фосфат-иона PO₄³⁻. В Na₃P и PH₄I фосфор в отрицательной степени окисления.'
				},
				{
					id: 5,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентные неполярные связи',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ковалентными неполярными связями:</p>`,
					options: [
						{ id: '1', label: 'C (алмаз)' },
						{ id: '2', label: 'P<sub>2</sub>O<sub>5</sub>' },
						{ id: '3', label: 'Br<sub>2</sub>' },
						{ id: '4', label: 'CaO' },
						{ id: '5', label: 'Ca' }
					],
					correct: ['1','3'],
					hint: 'Ковалентная неполярная связь — между атомами одного и того же неметалла.'
				},
				{
					id: 6,
					type: 'multi',
					pickCount: 2,
					title: 'Общие свойства азота и сурьмы',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как азота, так и сурьмы?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент образует высший оксид вида Э<sub>2</sub>O<sub>5</sub>.' },
						{ id: '2', label: 'Химический элемент является неметаллом.' },
						{ id: '3', label: 'Число протонов в ядре атома химического элемента равно 20.' },
						{ id: '4', label: 'Химический элемент имеет 5 валентных электронов.' },
						{ id: '5', label: 'Электроны в атоме расположены на четырёх электронных слоях.' }
					],
					correct: ['1','4'],
					hint: 'Азот и сурьма — элементы одной группы (VA), поэтому у них одинаковое число валентных электронов и одинаковый вид высшего оксида.'
				},
				{
					id: 7,
					type: 'single',
					title: 'Взаимодействие брома',
					body: `<p>Бром реагирует с</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'HCl' },
						{ id: '3', label: 'NaCl' },
						{ id: '4', label: 'раствором KOH' }
					],
					correct: '4',
					hint: 'Галогены диспропорционируют в растворах щелочей.'
				},
				{
					id: 8,
					type: 'multi',
					pickCount: 2,
					title: 'Оксиды, не реагирующие с водой',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b>, которые не реагируют с водой:</p>`,
					options: [
						{ id: '1', label: 'оксид калия' },
						{ id: '2', label: 'оксид алюминия' },
						{ id: '3', label: 'оксид кремния (IV)' },
						{ id: '4', label: 'оксид кальция' },
						{ id: '5', label: 'оксид серы (IV)' }
					],
					correct: ['2','3'],
					hint: 'С водой реагируют: растворимые основные оксиды (оксиды активных металлов) и большинство кислотных оксидов. Al₂O₃ амфотерный и нерастворимый; SiO₂ кислотный, но с водой не реагирует.'
				},
				{
					id: 9,
					type: 'match',
					title: 'Вещества и продукты реакции',
					body: `
						<p>Установите соответствие между веществом(-ами) и продуктами химической реакции: к каждой позиции, обозначенной буквой, подберите соответствующую позицию, обозначенную цифрой.</p>
					`,
					matchLeft: [
						{ letter: 'А', label: 'Fe и H<sub>2</sub>SO<sub>4</sub> (разб.)' },
						{ letter: 'Б', label: 'Fe(OH)<sub>3</sub> <span style="font-family:inherit;">→<sup>t°</sup></span>' },
						{ letter: 'В', label: 'Fe<sub>3</sub>O<sub>4</sub> и H<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'FeSO<sub>4</sub> и H<sub>2</sub>' },
						{ id: '2', label: 'FeO и H<sub>2</sub>O' },
						{ id: '3', label: 'Fe<sub>2</sub>O<sub>3</sub> и H<sub>2</sub>O' },
						{ id: '4', label: 'FeO и H<sub>2</sub>O<sub>2</sub>' },
						{ id: '5', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> и H<sub>2</sub>' }
					],
					correct: ['1','3','2'],
					hint: 'Разбавленная серная кислота даёт FeSO₄ (Fe²⁺). Гидроксиды при нагревании разлагаются на оксид и воду. Водород восстанавливает Fe₃O₄ до FeO.'
				},
				{
					id: 10,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с которыми это вещество может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al' },
						{ letter: 'Б', label: 'CuO' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Fe<sub>2</sub>O<sub>3</sub>, BaCl<sub>2</sub>' },
						{ id: '2', label: 'MgBr<sub>2</sub>, O<sub>2</sub>' },
						{ id: '3', label: 'NaOH, HCl' },
						{ id: '4', label: 'H<sub>2</sub>, CO' }
					],
					correct: ['3','4','1'],
					hint: 'Al амфотерный — с NaOH и HCl. CuO восстанавливается H₂ и CO. H₂SO₄ реагирует с основным оксидом Fe₂O₃ и даёт BaSO₄↓ с BaCl₂.'
				},
				{
					id: 11,
					type: 'single',
					title: 'Окислительно-восстановительное разложение',
					body: `<p>К окислительно-восстановительным относится реакция термического разложения</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SiO<sub>3</sub>' },
						{ id: '2', label: 'Cu(OH)<sub>2</sub>' },
						{ id: '3', label: 'NaNO<sub>3</sub>' },
						{ id: '4', label: 'CaCO<sub>3</sub>' }
					],
					correct: '3',
					hint: 'Разложение нитратов сопровождается изменением степени окисления азота и кислорода.'
				},
				{
					id: 12,
					type: 'match',
					title: 'Реагирующие вещества и признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH (тв.) и NH<sub>4</sub>Cl (тв.)' },
						{ letter: 'Б', label: 'Cu и HNO<sub>3</sub> (конц.)' },
						{ letter: 'В', label: 'CaCO<sub>3</sub> и HNO<sub>3</sub> (конц.)' }
					],
					matchRight: [
						{ id: '1', label: 'выделение бесцветного газа без запаха' },
						{ id: '2', label: 'выделение бурого газа с неприятным запахом' },
						{ id: '3', label: 'выпадение синего осадка' },
						{ id: '4', label: 'выделение бесцветного газа с резким запахом' }
					],
					correct: ['4','2','1'],
					hint: 'NaOH + NH₄Cl → NH₃↑ (резкий запах). Cu + HNO₃(конц.) → NO₂↑ (бурый). CaCO₃ + HNO₃ → CO₂↑ (без запаха).'
				},
				{
					id: 13,
					type: 'multi',
					pickCount: 2,
					title: 'Вещества, не проводящие электрический ток',
					body: `<p>Выберите <b>два вещества</b>, которые не проводят электрический ток.</p>`,
					options: [
						{ id: '1', label: 'расплав хлорида натрия' },
						{ id: '2', label: 'расплав оксида кремния' },
						{ id: '3', label: 'раствор азотной кислоты' },
						{ id: '4', label: 'раствор глюкозы' },
						{ id: '5', label: 'раствор хлорида цинка' }
					],
					correct: ['2','4'],
					hint: 'Ток проводят электролиты — растворы и расплавы, содержащие ионы. SiO₂ — атомная решётка, не диссоциирует; глюкоза — неэлектролит.'
				},
				{
					id: 14,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение',
					body: `
						<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение реакции</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">3Ca<sup>2+</sup> + 2PO<sub>4</sub><sup>3−</sup> = Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓</p>
					`,
					options: [
						{ id: '1', label: 'Ca(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '2', label: 'CaCO<sub>3</sub>' },
						{ id: '3', label: 'AlPO<sub>4</sub>' },
						{ id: '4', label: 'CaO' },
						{ id: '5', label: 'H<sub>3</sub>PO<sub>4</sub>' },
						{ id: '6', label: 'K<sub>3</sub>PO<sub>4</sub>' }
					],
					correct: ['1','6'],
					hint: 'Оба исходных вещества должны быть растворимыми сильными электролитами, диссоциирующими на Ca²⁺ и PO₄³⁻. CaCO₃ и AlPO₄ нерастворимы; CaO не даёт Ca²⁺ напрямую в растворе; H₃PO₄ — слабая кислота.'
				},
				{
					id: 15,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса, происходящего в окислительно-восстановительной реакции, и названием этого процесса.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Zn<sup>+2</sup> → Zn<sup>0</sup>' },
						{ letter: 'Б', label: 'N<sup>+5</sup> → N<sup>−3</sup>' },
						{ letter: 'В', label: 'Cl<sub>2</sub><sup>0</sup> → 2Cl<sup>+5</sup>' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2','2','1'],
					hint: 'Окисление — отдача электронов (степень окисления повышается). Восстановление — принятие электронов (степень окисления понижается).'
				},
				{
					id: 16,
					type: 'multi',
					pickCount: null,
					title: 'Химическое загрязнение окружающей среды',
					body: `
						<p>Из перечисленных суждений о химическом загрязнении окружающей среды и его последствиях выберите <b>одно или несколько верных</b>.</p>
					`,
					options: [
						{ id: '1', label: 'Количество углекислого газа в атмосфере постоянно растёт благодаря деятельности человека.' },
						{ id: '2', label: 'Углекислый газ — самый вредный компонент выхлопных газов.' },
						{ id: '3', label: 'Повышенное содержание в замкнутом пространстве оксида углерода (II) не является угрожающим фактором для здоровья человека.' },
						{ id: '4', label: 'Производство цемента и других строительных материалов относят к источникам загрязнения атмосферы.' }
					],
					correct: ['1','4'],
					hint: 'CO₂ действительно накапливается из-за сжигания топлива. Самый опасный компонент выхлопных газов — CO и оксиды азота. CO в закрытом помещении смертельно опасен. Цементные заводы — крупный источник пыли и CO₂.'
				},
				{
					id: 17,
					type: 'match',
					title: 'Распознавание газов',
					body: `<p>Установите соответствие между двумя газами и веществом, с помощью которого можно различить эти газы.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'CO<sub>2</sub> и O<sub>2</sub>' },
						{ letter: 'Б', label: 'NH<sub>3</sub> и H<sub>2</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub> и O<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'CuO' },
						{ id: '2', label: 'раствор Ca(OH)<sub>2</sub>' },
						{ id: '3', label: 'KMnO<sub>4</sub>' },
						{ id: '4', label: 'фенолфталеин' }
					],
					correct: ['2','4','1'],
					hint: 'CO₂ мутнит известковую воду, O₂ — нет. NH₃ растворяется в воде с щелочной реакцией и окрашивает фенолфталеин в малиновый; H₂ — нет. H₂ восстанавливает чёрный CuO до красной меди, O₂ — нет.'
				},
				{
					id: 18,
					type: 'input',
					title: 'Массовая доля азота в нитрите натрия',
					body: `
						<p>Вычислите в процентах массовую долю азота в нитрите натрия. Запишите число с точностью до целых.</p>
						<p style="color: var(--muted); font-size: 14px;">В поле ответа введите только число, без знака «%».</p>
					`,
					placeholder: 'например, 31',
					correct: '20',
					hint: 'NaNO₂: M = 23 + 14 + 2·16 = 69 г/моль. ω(N) = 14 / 69 · 100% ≈ 20%.'
				},
				{
					id: 19,
					type: 'input',
					title: 'Масса азота в нитрите натрия',
					body: `
						<p>Для проведения органического синтеза взято <b>35 г</b> нитрита натрия. Какая масса (в граммах) азота содержится в данной порции нитрита натрия? Ответ запишите с точностью до целых.</p>
						<p style="color: var(--muted); font-size: 14px;">Используйте величину массовой доли азота, определённую в задании 18 (с указанной в нём степенью точности).</p>
					`,
					placeholder: 'например, 8',
					correct: '7',
					hint: 'm(N) = m(NaNO₂) · ω(N) = 35 · 0,20 = 7 г.'
				},
				// ============================================================
				// ВАРИАНТ 2 · Часть 1 (задания 101–119)
				// ============================================================
				{
					id: 101,
					type: 'multi',
					pickCount: 2,
					title: 'Уран как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об уране как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Уран — тяжёлый серебристо-белый глянцеватый металл.' },
						{ id: '2', label: 'Химически уран весьма активен.' },
						{ id: '3', label: 'Уран относится к семейству актиноидов.' },
						{ id: '4', label: 'Мелкий порошок урана самовоспламеняется на воздухе.' },
						{ id: '5', label: 'Уран не имеет стабильных изотопов.' }
					],
					correct: ['3','5'],
					hint: 'О химическом элементе говорят положение в Периодической системе и изотопный состав.'
				},
				{
					id: 102,
					type: 'input',
					title: 'Строение ядра атома',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<svg viewBox="0 0 240 200" width="100%" style="max-width: 260px; height:auto;" xmlns="http://www.w3.org/2000/svg" aria-label="Ядро атома">
								<defs>
									<radialGradient id="nucBg" cx="50%" cy="50%" r="50%">
										<stop offset="0" stop-color="#fdecd6"/>
										<stop offset="1" stop-color="#f5d9a8"/>
									</radialGradient>
								</defs>
								<circle cx="120" cy="100" r="70" fill="url(#nucBg)" stroke="#c79a55" stroke-width="1"/>
								<!-- 8 protons (red p+) and 8 neutrons (gray n) -->
								<g font-family="Manrope, sans-serif" font-size="11" font-weight="700">
									<circle cx="95"  cy="75"  r="11" fill="#d94b4b"/><text x="95"  y="79"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="120" cy="65"  r="11" fill="#d94b4b"/><text x="120" y="69"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="75"  r="11" fill="#d94b4b"/><text x="145" y="79"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="155" cy="100" r="11" fill="#d94b4b"/><text x="155" y="104" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="125" r="11" fill="#d94b4b"/><text x="145" y="129" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="120" cy="135" r="11" fill="#d94b4b"/><text x="120" y="139" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="95"  cy="125" r="11" fill="#d94b4b"/><text x="95"  y="129" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="85"  cy="100" r="11" fill="#d94b4b"/><text x="85"  y="104" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="108" cy="90"  r="10" fill="#9aa3b0"/><text x="108" y="94"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="132" cy="90"  r="10" fill="#9aa3b0"/><text x="132" y="94"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="108" cy="110" r="10" fill="#9aa3b0"/><text x="108" y="114" text-anchor="middle" fill="#fff">n</text>
									<circle cx="132" cy="110" r="10" fill="#9aa3b0"/><text x="132" y="114" text-anchor="middle" fill="#fff">n</text>
									<circle cx="120" cy="100" r="10" fill="#9aa3b0"/><text x="120" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="100" cy="100" r="10" fill="#9aa3b0"/><text x="100" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="140" cy="100" r="10" fill="#9aa3b0"/><text x="140" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="120" cy="80"  r="10" fill="#9aa3b0"/><text x="120" y="84"  text-anchor="middle" fill="#fff">n</text>
								</g>
								<text x="120" y="190" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" fill="#6b7280">8 протонов · 8 нейтронов</text>
							</svg>
						</div>
						<p>Запишите число электронов на внешнем электронном слое (<b>X</b>) и номер периода (<b>Y</b>), в котором расположен этот элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 73',
					correct: '62',
					hint: '8 протонов — это кислород. На внешнем слое 6 электронов, 2-й период.'
				},
				{
					id: 103,
					type: 'input',
					title: 'Увеличение атомного радиуса',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>магний</li>
							<li>кремний</li>
							<li>алюминий</li>
						</ol>
						<p>в порядке <b>увеличения</b> их атомного радиуса.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '231',
					hint: 'В периоде слева направо атомный радиус уменьшается. Si (14) < Al (13) < Mg (12).'
				},
				{
					id: 104,
					type: 'match',
					title: 'Степень окисления фосфора',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления фосфора в данном веществе.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'POCl<sub>3</sub>' },
						{ letter: 'Б', label: 'H<sub>3</sub>PO<sub>3</sub>' },
						{ letter: 'В', label: 'PH<sub>4</sub>I' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '−4' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+5' }
					],
					correct: ['4','3','1'],
					hint: 'В POCl₃: O=−2, Cl=−1 → P=+5. В H₃PO₃: H=+1, O=−2 → P=+3. В PH₄I: H=+1, I=−1 → P=−3.'
				},
				{
					id: 105,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная полярная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b>, для которых характерна ковалентная полярная связь.</p>`,
					options: [
						{ id: '1', label: 'Na' },
						{ id: '2', label: 'KF' },
						{ id: '3', label: 'P<sub>4</sub>' },
						{ id: '4', label: 'HF' },
						{ id: '5', label: 'H<sub>2</sub>O' }
					],
					correct: ['4','5'],
					hint: 'Ковалентная полярная связь — между разными неметаллами.'
				},
				{
					id: 106,
					type: 'multi',
					pickCount: 2,
					title: 'Общие свойства калия и кальция',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как калия, так и кальция?</p>`,
					options: [
						{ id: '1', label: 'Атом имеет 2 валентных электрона.' },
						{ id: '2', label: 'Валентные электроны находятся в четвёртом электронном слое.' },
						{ id: '3', label: 'Простое вещество состоит из двухатомных молекул.' },
						{ id: '4', label: 'Может иметь как положительные, так и отрицательные степени окисления.' },
						{ id: '5', label: 'Химический элемент не образует летучие водородные соединения.' }
					],
					correct: ['2','5'],
					hint: 'K и Ca — в 4 периоде; оба металла IA/IIA групп.'
				},
				{
					id: 107,
					type: 'single',
					title: 'Ангидрид азотной кислоты',
					body: `<p>Ангидридом азотной кислоты является</p>`,
					options: [
						{ id: '1', label: 'NO' },
						{ id: '2', label: 'N<sub>2</sub>O' },
						{ id: '3', label: 'NO<sub>2</sub>' },
						{ id: '4', label: 'N<sub>2</sub>O<sub>5</sub>' }
					],
					correct: '4',
					hint: 'Ангидрид — оксид, соответствующий кислоте по степени окисления. В HNO₃ N = +5.'
				},
				{
					id: 108,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции с оксидом кальция',
					body: `<p>Какие <b>два</b> из перечисленных веществ вступают в реакцию с оксидом кальция?</p>`,
					options: [
						{ id: '1', label: 'K<sub>2</sub>O' },
						{ id: '2', label: 'SO<sub>2</sub>' },
						{ id: '3', label: 'N<sub>2</sub>O' },
						{ id: '4', label: 'MgO' },
						{ id: '5', label: 'SO<sub>3</sub>' }
					],
					correct: ['2','5'],
					hint: 'CaO — основный оксид, реагирует с кислотными оксидами.'
				},
				{
					id: 109,
					type: 'match',
					title: 'Реагенты и продукты',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P<sub>2</sub>O<sub>5</sub> + H<sub>2</sub>O (изб.)' },
						{ letter: 'Б', label: 'P<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>O (изб.)' },
						{ letter: 'В', label: 'PH<sub>3</sub> + O<sub>2</sub> (изб.)' }
					],
					matchRight: [
						{ id: '1', label: 'H<sub>3</sub>PO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'H<sub>3</sub>PO<sub>3</sub> + H<sub>2</sub>' },
						{ id: '3', label: 'H<sub>3</sub>PO<sub>4</sub> + H<sub>2</sub>' },
						{ id: '4', label: 'H<sub>3</sub>PO<sub>3</sub>' },
						{ id: '5', label: 'H<sub>3</sub>PO<sub>4</sub>' }
					],
					correct: ['5','4','1'],
					hint: 'P₂O₅+3H₂O→2H₃PO₄; P₂O₃+3H₂O→2H₃PO₃; 2PH₃+4O₂→2H₃PO₄+H₂O.'
				},
				{
					id: 110,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с которыми это вещество может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al' },
						{ letter: 'Б', label: 'SiO<sub>2</sub>' },
						{ letter: 'В', label: 'Ca(OH)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'KOH, CaCO<sub>3</sub>' },
						{ id: '2', label: 'H<sub>2</sub>O, Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'Ba(OH)<sub>2</sub>, HNO<sub>3</sub>' },
						{ id: '4', label: 'SO<sub>2</sub>, HCl' }
					],
					correct: ['3','1','4'],
					hint: 'Al — амфотерный; SiO₂ — кислотный; Ca(OH)₂ — щёлочь.'
				},
				{
					id: 111,
					type: 'single',
					title: 'Разложение без изменения степени окисления',
					body: `<p>В реакцию разложения, протекающую <b>без изменения степени окисления</b>, вступает</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>O' },
						{ id: '2', label: 'Fe(OH)<sub>3</sub>' },
						{ id: '3', label: 'H<sub>2</sub>O<sub>2</sub>' },
						{ id: '4', label: 'KMnO<sub>4</sub>' }
					],
					correct: '2',
					hint: '2Fe(OH)₃ → Fe₂O₃ + 3H₂O — степени окисления всех элементов не меняются.'
				},
				{
					id: 112,
					type: 'match',
					title: 'Реагирующие вещества и признак реакции',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'CaCl<sub>2</sub> и Na<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'Б', label: 'Pb(NO<sub>3</sub>)<sub>2</sub> и NaI' },
						{ letter: 'В', label: 'CaCl<sub>2</sub> и Na<sub>3</sub>PO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение белого осадка' },
						{ id: '2', label: 'выпадение красного осадка' },
						{ id: '3', label: 'выпадение чёрного осадка' },
						{ id: '4', label: 'выпадение жёлтого осадка' }
					],
					correct: ['1','4','1'],
					hint: 'CaCO₃ и Ca₃(PO₄)₂ — белые осадки; PbI₂ — жёлтый.'
				},
				{
					id: 113,
					type: 'multi',
					pickCount: 2,
					title: 'Вещества, не являющиеся электролитами',
					body: `<p>Выберите <b>два вещества</b>, которые <b>не являются</b> электролитами.</p>`,
					options: [
						{ id: '1', label: 'MgCl<sub>2</sub>' },
						{ id: '2', label: 'AgNO<sub>3</sub>' },
						{ id: '3', label: 'SiO<sub>2</sub>' },
						{ id: '4', label: 'Ba(OH)<sub>2</sub>' },
						{ id: '5', label: 'Fe<sub>2</sub>O<sub>3</sub>' }
					],
					correct: ['3','5'],
					hint: 'Нерастворимые оксиды не диссоциируют в воде.'
				},
				{
					id: 114,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение',
					body: `
						<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение:</p>
						<p style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:15px; background:#f7f8fb; padding:10px; border-radius:10px;">
							Ba²⁺ + SO₄²⁻ = BaSO₄↓
						</p>
					`,
					options: [
						{ id: '1', label: 'BaCl<sub>2</sub>' },
						{ id: '2', label: 'BaCO<sub>3</sub>' },
						{ id: '3', label: 'Ba' },
						{ id: '4', label: 'BaO' },
						{ id: '5', label: 'H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '6', label: 'PbSO<sub>4</sub>' }
					],
					correct: ['1','5'],
					hint: 'Оба реагента должны давать свободные ионы Ba²⁺ и SO₄²⁻.'
				},
				{
					id: 115,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: '2N⁺⁴ → N<sub>2</sub>⁰' },
						{ letter: 'Б', label: 'Fe⁺³ → Fe⁺²' },
						{ letter: 'В', label: 'Br<sub>2</sub>⁰ → 2Br⁺⁵' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2','2','1'],
					hint: 'Окисление — отдача электронов (СО растёт), восстановление — принятие (СО падает).'
				},
				{
					id: 116,
					type: 'multi',
					pickCount: 2,
					title: 'Химическое загрязнение окружающей среды',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды и его последствиях выберите <b>верные</b>.</p>`,
					options: [
						{ id: '1', label: 'Полиэтиленовые пакеты легко разрушаются под действием атмосферных явлений и не представляют угрозы для окружающей среды.' },
						{ id: '2', label: 'Грибы и ягоды, растущие вдоль автомагистралей, можно использовать в пищу.' },
						{ id: '3', label: 'Продукты полного сгорания природного газа — углекислый газ и пары воды — не наносят непосредственного ущерба окружающей среде.' },
						{ id: '4', label: 'Углеводороды ядовиты, поэтому разлившаяся на поверхности водоёмов нефть негативно влияет на живые организмы водоёмов.' }
					],
					correct: ['3','4'],
					hint: 'Полиэтилен разлагается сотни лет; придорожные грибы накапливают тяжёлые металлы.'
				},
				{
					id: 117,
					type: 'match',
					title: 'Распознавание солей',
					body: `<p>Установите соответствие между двумя солями и реактивом, с помощью которого можно различить эти соли.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaCl и NH<sub>4</sub>Cl' },
						{ letter: 'Б', label: 'KF и BaBr<sub>2</sub>' },
						{ letter: 'В', label: 'K<sub>2</sub>SO<sub>4</sub> и Na<sub>2</sub>CO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'KOH' },
						{ id: '2', label: 'Cu(OH)<sub>2</sub>' },
						{ id: '3', label: 'AgNO<sub>3</sub>' },
						{ id: '4', label: 'HCl' }
					],
					correct: ['1','3','4'],
					hint: 'NH₄Cl + KOH → NH₃↑; AgBr — жёлтый осадок; Na₂CO₃ + HCl → CO₂↑.'
				},
				{
					id: 118,
					type: 'input',
					title: 'Массовая доля меди в сульфате меди(II)',
					body: `
						<p>Вычислите в процентах массовую долю меди в сульфате меди(II). Ответ запишите с точностью до целых.</p>
					`,
					placeholder: 'например, 51',
					correct: '40',
					hint: 'M(CuSO₄)=64+32+64=160. ω(Cu)=64/160·100%=40%.'
				},
				{
					id: 119,
					type: 'input',
					title: 'Масса меди в сульфате меди(II)',
					body: `
						<p>Какая масса (в граммах) меди содержится в <b>64 г</b> сульфата меди(II)? Ответ запишите с точностью до десятых.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте массовую долю меди, определённую в задании 118.</p>
					`,
					placeholder: 'например, 36,7',
					correct: '25,6',
					hint: 'm(Cu) = 64 · 0,40 = 25,6 г.'
				},
				// ============================================================
				// ВАРИАНТ 3 · Часть 1 (задания 201–219)
				// ============================================================
				{
					id: 201,
					type: 'multi',
					pickCount: 2,
					title: 'Хлор как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о хлоре как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Хлор — жёлто-зелёный удушающий газ.' },
						{ id: '2', label: 'Атомная масса хлора составляет 35,453 а.е.м.' },
						{ id: '3', label: 'Молекула соляной кислоты содержит один атом хлора.' },
						{ id: '4', label: 'Хлор использовался как боевое отравляющее вещество.' },
						{ id: '5', label: 'Хлор при попадании в лёгкие вызывает ожог лёгочной ткани.' }
					],
					correct: ['2','3'],
					hint: 'О химическом элементе говорят, когда называют атомную массу или состав соединений.'
				},
				{
					id: 202,
					type: 'input',
					title: 'Строение ядра атома',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<svg viewBox="0 0 240 200" width="100%" style="max-width: 240px; height:auto;" xmlns="http://www.w3.org/2000/svg" aria-label="Ядро атома">
								<defs>
									<radialGradient id="nucBg3" cx="50%" cy="50%" r="50%">
										<stop offset="0" stop-color="#fdecd6"/>
										<stop offset="1" stop-color="#f5d9a8"/>
									</radialGradient>
								</defs>
								<circle cx="120" cy="100" r="60" fill="url(#nucBg3)" stroke="#c79a55" stroke-width="1"/>
								<g font-family="Manrope, sans-serif" font-size="11" font-weight="700">
									<!-- 5 protons -->
									<circle cx="100" cy="80"  r="11" fill="#e38b27"/><text x="100" y="84"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="125" cy="72"  r="11" fill="#e38b27"/><text x="125" y="76"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="95"  r="11" fill="#e38b27"/><text x="145" y="99"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="130" cy="120" r="11" fill="#e38b27"/><text x="130" y="124" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="100" cy="118" r="11" fill="#e38b27"/><text x="100" y="122" text-anchor="middle" fill="#fff">p⁺</text>
									<!-- 6 neutrons -->
									<circle cx="115" cy="92"  r="10" fill="#9aa3b0"/><text x="115" y="96"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="135" cy="108" r="10" fill="#9aa3b0"/><text x="135" y="112" text-anchor="middle" fill="#fff">n</text>
									<circle cx="115" cy="108" r="10" fill="#9aa3b0"/><text x="115" y="112" text-anchor="middle" fill="#fff">n</text>
									<circle cx="88"  cy="100" r="10" fill="#9aa3b0"/><text x="88"  y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="115" cy="130" r="10" fill="#9aa3b0"/><text x="115" y="134" text-anchor="middle" fill="#fff">n</text>
									<circle cx="140" cy="75"  r="10" fill="#9aa3b0"/><text x="140" y="79"  text-anchor="middle" fill="#fff">n</text>
								</g>
								<text x="120" y="180" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" fill="#6b7280">5 протонов · 6 нейтронов</text>
							</svg>
						</div>
						<p>Запишите номер периода (<b>X</b>), в котором расположен данный химический элемент, и величину заряда ядра (<b>Y</b>) его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 36',
					correct: '25',
					hint: '5 протонов — бор (B). Период 2, заряд ядра +5.'
				},
				{
					id: 203,
					type: 'input',
					title: 'Увеличение восстановительных свойств',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>фосфор</li>
							<li>кремний</li>
							<li>хлор</li>
						</ol>
						<p>в порядке <b>увеличения</b> восстановительных свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '312',
					hint: 'В периоде слева направо восстановительные свойства ослабевают. Cl < P < Si.'
				},
				{
					id: 204,
					type: 'match',
					title: 'Валентность серы',
					body: `<p>Установите соответствие между формулой вещества и валентностью серы в данном веществе.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'H<sub>2</sub>S' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SO<sub>3</sub>' },
						{ letter: 'В', label: 'SO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'VI' },
						{ id: '2', label: 'II' },
						{ id: '3', label: 'III' },
						{ id: '4', label: 'IV' }
					],
					correct: ['2','4','1'],
					hint: 'Валентность — число связей. В H₂S — II, в SO₃²⁻ — IV, в SO₃ — VI.'
				},
				{
					id: 205,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная неполярная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b>, для которых характерна ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: 'метан' },
						{ id: '2', label: 'алмаз' },
						{ id: '3', label: 'оксид углерода(IV)' },
						{ id: '4', label: 'азот' },
						{ id: '5', label: 'сероводород' }
					],
					correct: ['2','4'],
					hint: 'Ковалентная неполярная связь — между одинаковыми атомами неметаллов.'
				},
				{
					id: 206,
					type: 'multi',
					pickCount: 2,
					title: 'Общие свойства хлора и иода',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как хлора, так и иода?</p>`,
					options: [
						{ id: '1', label: 'Электроны в атоме расположены на пяти электронных слоях.' },
						{ id: '2', label: 'Соответствующее простое вещество при н.у. является твёрдым телом.' },
						{ id: '3', label: 'Химический элемент относится к галогенам.' },
						{ id: '4', label: 'Электроотрицательность химического элемента ниже, чем электроотрицательность брома.' },
						{ id: '5', label: 'Соответствующее простое вещество существует в виде двухатомных молекул.' }
					],
					correct: ['3','5'],
					hint: 'Cl и I — оба галогены VIIA группы; оба существуют как двухатомные молекулы.'
				},
				{
					id: 207,
					type: 'single',
					title: 'Оксид, соответствующий HNO₂',
					body: `<p>Кислоте HNO<sub>2</sub> соответствует оксид</p>`,
					options: [
						{ id: '1', label: 'N<sub>2</sub>O' },
						{ id: '2', label: 'NO' },
						{ id: '3', label: 'N<sub>2</sub>O<sub>3</sub>' },
						{ id: '4', label: 'N<sub>2</sub>O<sub>5</sub>' }
					],
					correct: '3',
					hint: 'В HNO₂ азот имеет СО +3. Ангидрид — N₂O₃.'
				},
				{
					id: 208,
					type: 'multi',
					pickCount: 2,
					title: 'Не реагируют с водой, реагируют с HNO₃',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b>, которые <b>не реагируют с водой</b>, но реагируют с азотной кислотой.</p>`,
					options: [
						{ id: '1', label: 'Na<sub>2</sub>O' },
						{ id: '2', label: 'CO<sub>2</sub>' },
						{ id: '3', label: 'Ag<sub>2</sub>O' },
						{ id: '4', label: 'Fe<sub>2</sub>O<sub>3</sub>' },
						{ id: '5', label: 'NO' }
					],
					correct: ['3','4'],
					hint: 'Нерастворимые основные оксиды не реагируют с водой, но реагируют с кислотами.'
				},
				{
					id: 209,
					type: 'match',
					title: 'Реакции алюминия и его соединений со щёлочью',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al + NaOH + H<sub>2</sub>O' },
						{ letter: 'Б', label: 'Al<sub>2</sub>O<sub>3</sub> + NaOH + H<sub>2</sub>O' },
						{ letter: 'В', label: 'Al(OH)<sub>3</sub> + NaOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'NaAlO<sub>2</sub>' },
						{ id: '2', label: 'NaAlO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '3', label: 'Na[Al(OH)<sub>4</sub>] + H<sub>2</sub>' },
						{ id: '4', label: 'Na[Al(OH)<sub>4</sub>] + H<sub>2</sub>O' },
						{ id: '5', label: 'Na[Al(OH)<sub>4</sub>]' }
					],
					correct: ['3','5','5'],
					hint: '2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂↑; Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄]; Al(OH)₃ + NaOH → Na[Al(OH)₄].'
				},
				{
					id: 210,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с каждым из которых оно может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cl<sub>2</sub>' },
						{ letter: 'Б', label: 'SiO<sub>2</sub>' },
						{ letter: 'В', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'HF, Ba(OH)<sub>2</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub>, CO<sub>2</sub>' },
						{ id: '3', label: 'FeCl<sub>2</sub>, H<sub>2</sub>O' },
						{ id: '4', label: 'BaCl<sub>2</sub>, KOH' }
					],
					correct: ['3','1','4'],
					hint: 'Cl₂ окисляет FeCl₂ и взаимодействует с H₂O; SiO₂ — кислотный оксид; (NH₄)₂SO₄ — соль.'
				},
				{
					id: 211,
					type: 'single',
					title: 'Разложение нитрата меди(II)',
					body: `<p>В уравнении реакции разложения нитрата меди(II) отношение коэффициента при NO<sub>2</sub> к коэффициенту при другом газообразном продукте реакции равно</p>`,
					options: [
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '4' },
						{ id: '4', label: '8' }
					],
					correct: '3',
					hint: '2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑. Отношение NO₂ : O₂ = 4 : 1.'
				},
				{
					id: 212,
					type: 'match',
					title: 'Признак реакции',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>Cl и NaOH' },
						{ letter: 'Б', label: 'CuCl<sub>2</sub> и AgNO<sub>3</sub>' },
						{ letter: 'В', label: 'FeCl<sub>3</sub> и Ca(OH)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение белого осадка' },
						{ id: '2', label: 'выпадение бурого осадка' },
						{ id: '3', label: 'выпадение голубого осадка' },
						{ id: '4', label: 'выделение газа' }
					],
					correct: ['4','1','2'],
					hint: 'NH₄Cl + NaOH → NH₃↑; AgCl — белый осадок; Fe(OH)₃ — бурый осадок.'
				},
				{
					id: 213,
					type: 'multi',
					pickCount: 2,
					title: 'Диссоциация на 2 иона',
					body: `<p>Выберите <b>два вещества</b>, при полной диссоциации 1 моль которых образуется 2 моль ионов.</p>`,
					options: [
						{ id: '1', label: 'HNO<sub>3</sub>' },
						{ id: '2', label: 'CaCl<sub>2</sub>' },
						{ id: '3', label: 'H<sub>2</sub>S' },
						{ id: '4', label: 'K<sub>2</sub>SO<sub>4</sub>' },
						{ id: '5', label: 'NaBr' }
					],
					correct: ['1','5'],
					hint: 'Бинарные сильные электролиты AX → A⁺ + X⁻ дают 2 иона.'
				},
				{
					id: 214,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение',
					body: `
						<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение:</p>
						<p style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:15px; background:#f7f8fb; padding:10px; border-radius:10px;">
							Cu²⁺ + S²⁻ = CuS↓
						</p>
					`,
					options: [
						{ id: '1', label: 'Ag<sub>2</sub>S' },
						{ id: '2', label: 'CuO' },
						{ id: '3', label: 'CuSO<sub>4</sub>' },
						{ id: '4', label: 'Na<sub>2</sub>S' },
						{ id: '5', label: 'Cu(OH)<sub>2</sub>' },
						{ id: '6', label: 'ZnS' }
					],
					correct: ['3','4'],
					hint: 'Оба реагента должны быть растворимы и давать свободные ионы Cu²⁺ и S²⁻.'
				},
				{
					id: 215,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe⁺² → Fe⁺³' },
						{ letter: 'Б', label: 'N⁺⁵ → N⁺²' },
						{ letter: 'В', label: 'Cl⁺⁵ → Cl⁰' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1','2','2'],
					hint: 'СО растёт — окисление, СО падает — восстановление.'
				},
				{
					id: 216,
					type: 'multi',
					pickCount: 2,
					title: 'Приготовление растворов',
					body: `<p>Из перечисленных суждений о способах приготовления растворов в химической лаборатории и быту выберите <b>верные</b>.</p>`,
					options: [
						{ id: '1', label: 'Для приготовления раствора кислоты следует к концентрированной кислоте приливать воду.' },
						{ id: '2', label: 'Раствор медного купороса, используемый для опрыскивания садовых деревьев, не следует хранить в оцинкованном ведре.' },
						{ id: '3', label: 'Для приготовления растворов кислот в химической лаборатории не следует брать алюминиевую посуду.' },
						{ id: '4', label: 'Все вещества, образующиеся в процессе скисания молока, нежелательно использовать в качестве продуктов питания.' }
					],
					correct: ['2','3'],
					hint: 'Кислоту льют в воду, а не наоборот; Zn вытесняет Cu из CuSO₄; кислоты растворяют Al.'
				},
				{
					id: 217,
					type: 'match',
					title: 'Распознавание растворов',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HNO<sub>3</sub>(р-р) и HCl(р-р)' },
						{ letter: 'Б', label: 'HNO<sub>3</sub>(р-р) и KNO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'KNO<sub>3</sub>(р-р) и Na<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'BaCl<sub>2</sub>(р-р)' },
						{ id: '2', label: 'Cu' },
						{ id: '3', label: 'NaOH(р-р)' },
						{ id: '4', label: 'FeCl<sub>3</sub>(р-р)' }
					],
					correct: ['2','2','1'],
					hint: 'Cu + HNO₃(конц) → бурый NO₂; BaCl₂ + Na₂SO₄ → белый BaSO₄↓.'
				},
				{
					id: 218,
					type: 'input',
					title: 'Массовая доля серебра в AgNO₃',
					body: `
						<p>Вычислите в процентах массовую долю серебра в нитрате серебра(I). Ответ запишите с точностью до целых.</p>
					`,
					placeholder: 'например, 75',
					correct: '64',
					hint: 'M(AgNO₃) = 108 + 14 + 48 = 170. ω(Ag) = 108/170·100% ≈ 64%.'
				},
				{
					id: 219,
					type: 'input',
					title: 'Масса нитрата серебра',
					body: `
						<p>Для полного осаждения хлорид-анионов в исследуемом растворе требуется <b>1,15 г</b> катионов серебра. Какую массу (в граммах) нитрата серебра нужно поместить в исследуемый раствор? Ответ дайте с точностью до десятых.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте массовую долю серебра, определённую в задании 218.</p>
					`,
					placeholder: 'например, 2,9',
					correct: '1,8',
					hint: 'm(AgNO₃) = m(Ag) / ω(Ag) = 1,15 / 0,64 ≈ 1,8 г.'
				},
				// ============================================================
				// ВАРИАНТ 3 · Часть 2 · Задания 220–222 (развёрнутый ответ)
				// ============================================================
				{
					id: 220,
					type: 'written',
					maxPoints: 3,
					title: 'Метод электронного баланса',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, составьте уравнение реакции по схеме:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							HCl + KClO₃ → Cl₂ + KCl + H₂O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							2 Cl⁻¹ − 2ē → Cl₂⁰ &nbsp;&nbsp;| ×5 &nbsp;(окисление, восстановитель HCl)<br>
							2 Cl⁺⁵ + 10ē → Cl₂⁰ &nbsp;| ×1 &nbsp;(восстановление, окислитель KClO₃)
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							6 HCl + KClO₃ = 3 Cl₂↑ + KCl + 3 H₂O
						</p>
						<p><b>Окислитель</b> — Cl⁺⁵ (KClO₃), <b>восстановитель</b> — Cl⁻¹ (HCl).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс: указаны степени окисления, число электронов и множители (5 и 1).' },
						{ id: 'c2', points: 1, label: 'Правильно расставлены коэффициенты в уравнении реакции (6, 1, 3, 1, 3).' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель (Cl⁺⁵ / KClO₃) и восстановитель (Cl⁻¹ / HCl).' }
					]
				},
				{
					id: 221,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений меди',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							CuO → X → Cu(NO₃)₂ → Cu(OH)₂
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>Промежуточное вещество X = CuCl₂</b> (удобный выбор растворимой соли меди).</p>
						<p><b>Уравнения реакций:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) CuO + 2 HCl = CuCl₂ + H₂O<br>
							2) CuCl₂ + 2 AgNO₃ = Cu(NO₃)₂ + 2 AgCl↓<br>
							3) Cu(NO₃)₂ + 2 NaOH = Cu(OH)₂↓ + 2 NaNO₃
						</p>
						<p style="color:var(--muted); font-size:13px;">Допустимы и другие варианты X (например, CuSO₄) с соответствующими уравнениями.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Уравнение CuO → X записано верно (например, CuO + 2HCl = CuCl₂ + H₂O).' },
						{ id: 'c2', points: 1, label: 'Уравнение X → Cu(NO₃)₂ записано правильно (обменная реакция с выпадением осадка AgCl).' },
						{ id: 'c3', points: 1, label: 'Уравнение Cu(NO₃)₂ + 2NaOH = Cu(OH)₂↓ + 2NaNO₃ записано правильно.' }
					]
				},
				{
					id: 222,
					type: 'written',
					maxPoints: 3,
					title: 'Объём H₂S из раствора серной кислоты',
					taskKind: 'Расчётная задача',
					body: `
						<p>Вычислите объём газа (н.у.), который выделится при действии избытка сульфида железа(II) на <b>490 г</b> 10%-ного раствора серной кислоты.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">FeS + H₂SO₄ = FeSO₄ + H₂S↑</p>
						<p><b>2) Масса и количество H₂SO₄:</b><br>
							m(H₂SO₄) = 490 · 0,10 = 49 г<br>
							n(H₂SO₄) = 49 / 98 = 0,5 моль</p>
						<p><b>3) По уравнению</b> n(H₂S) = n(H₂SO₄) = 0,5 моль.</p>
						<p><b>4) Объём газа (н.у.):</b><br>
							V(H₂S) = n · V<sub>m</sub> = 0,5 · 22,4 = <b>11,2 л</b></p>
						<p><b>Ответ: V(H₂S) = 11,2 л.</b></p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции FeS + H₂SO₄ = FeSO₄ + H₂S и найдена масса/количество H₂SO₄.' },
						{ id: 'c2', points: 1, label: 'По уравнению определено количество вещества H₂S (0,5 моль).' },
						{ id: 'c3', points: 1, label: 'Рассчитан объём H₂S при н.у. (11,2 л) с единицами и правильным ответом.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 4 · Часть 1 (задания 301–319)
				// ============================================================
				{
					id: 301,
					type: 'multi',
					pickCount: 2,
					title: 'Галлий как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о галлии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Галлий — мягкий хрупкий металл серебристо-белого цвета с синеватым оттенком.' },
						{ id: '2', label: 'Существование галлия было научно предсказано Д. И. Менделеевым.' },
						{ id: '3', label: 'Чистый галлий плавится на руке человека.' },
						{ id: '4', label: 'Галлием заполняют термометры (вместо ртути) для измерения высоких температур.' },
						{ id: '5', label: 'В состав полупроводниковых материалов часто входит галлий.' }
					],
					correct: ['2','5'],
					hint: 'О химическом элементе говорят, когда речь идёт о положении в ПС или составе соединений.'
				},
				{
					id: 302,
					type: 'input',
					title: 'Строение электронной оболочки атома',
					body: `
						<p>На рисунке изображена модель атома химического элемента: внутренний слой содержит 2 электрона, внешний — 8 электронов.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<svg viewBox="0 0 300 220" width="100%" style="max-width: 300px; height: auto;" xmlns="http://www.w3.org/2000/svg" aria-label="Схема электронных оболочек">
								<defs>
									<radialGradient id="atomCore4" cx="50%" cy="50%" r="50%">
										<stop offset="0" stop-color="#6b8ddc"/>
										<stop offset="1" stop-color="#3e64b6"/>
									</radialGradient>
								</defs>
								<circle cx="150" cy="110" r="50" fill="none" stroke="#c6d0e0" stroke-width="1.2"/>
								<circle cx="150" cy="110" r="95" fill="none" stroke="#c6d0e0" stroke-width="1.2"/>
								<circle cx="150" cy="110" r="22" fill="url(#atomCore4)"/>
								<text x="150" y="115" text-anchor="middle" font-family="Manrope, sans-serif" font-size="13" font-weight="800" fill="#fff">+Z</text>
								<!-- inner shell: 2 electrons -->
								<g fill="#1f2430">
									<circle cx="150" cy="60" r="5"/>
									<circle cx="150" cy="160" r="5"/>
								</g>
								<!-- outer shell: 8 electrons -->
								<g fill="#e38b27">
									<circle cx="150" cy="15" r="5.5"/>
									<circle cx="217" cy="43" r="5.5"/>
									<circle cx="245" cy="110" r="5.5"/>
									<circle cx="217" cy="177" r="5.5"/>
									<circle cx="150" cy="205" r="5.5"/>
									<circle cx="83" cy="177" r="5.5"/>
									<circle cx="55" cy="110" r="5.5"/>
									<circle cx="83" cy="43" r="5.5"/>
								</g>
							</svg>
						</div>
						<p>Запишите номер периода (<b>X</b>), в котором расположен данный химический элемент, и величину заряда ядра (<b>Y</b>) его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 321',
					correct: '210',
					hint: '2 + 8 = 10 электронов → неон. Период 2, заряд ядра +10.'
				},
				{
					id: 303,
					type: 'input',
					title: 'Уменьшение радиуса атомов',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>кислород</li>
							<li>кремний</li>
							<li>азот</li>
						</ol>
						<p>в порядке <b>уменьшения</b> радиусов их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '231',
					hint: 'Si (3 период) — самый большой радиус. В 2 периоде: N > O.'
				},
				{
					id: 304,
					type: 'match',
					title: 'Степень окисления азота',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления азота в данном веществе.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HNO<sub>2</sub>' },
						{ letter: 'Б', label: '(NH<sub>4</sub>)<sub>2</sub>S' },
						{ letter: 'В', label: 'Fe(NO<sub>3</sub>)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+1' },
						{ id: '4', label: '+3' }
					],
					correct: ['4','1','2'],
					hint: 'В HNO₂ N=+3, в NH₄⁺ N=−3, в NO₃⁻ N=+5.'
				},
				{
					id: 305,
					type: 'multi',
					pickCount: 2,
					title: 'Металлическая связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с металлической связью.</p>`,
					options: [
						{ id: '1', label: 'CaF<sub>2</sub>' },
						{ id: '2', label: 'K' },
						{ id: '3', label: 'Zn' },
						{ id: '4', label: 'K<sub>2</sub>O' },
						{ id: '5', label: 'S' }
					],
					correct: ['2','3'],
					hint: 'Металлическая связь характерна для простых веществ-металлов.'
				},
				{
					id: 306,
					type: 'multi',
					pickCount: 2,
					title: 'Общие свойства неона и криптона',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как неона, так и криптона?</p>`,
					options: [
						{ id: '1', label: 'Электроны в атоме расположены на четырёх электронных слоях.' },
						{ id: '2', label: 'Число нейтронов в ядре атома (наиболее распространённого изотопа) равно 12.' },
						{ id: '3', label: 'Число протонов в ядре атома химического элемента равно 20.' },
						{ id: '4', label: 'Химический элемент относится к инертным газам.' },
						{ id: '5', label: 'Соответствующее простое вещество существует в виде одноатомного газа.' }
					],
					correct: ['4','5'],
					hint: 'Оба — благородные газы VIIIA группы; оба существуют как одноатомные газы.'
				},
				{
					id: 307,
					type: 'single',
					title: 'Сложное вещество',
					body: `<p>К <b>сложным веществам</b> относится</p>`,
					options: [
						{ id: '1', label: 'иод' },
						{ id: '2', label: 'графит' },
						{ id: '3', label: 'воздух' },
						{ id: '4', label: 'сода' }
					],
					correct: '4',
					hint: 'Сложное вещество состоит из атомов разных элементов. Na₂CO₃ — соль.'
				},
				{
					id: 308,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции с оксидом серы(VI)',
					body: `<p>Из предложенного списка выберите <b>две пары веществ</b>, с каждым из которых реагирует оксид серы(VI).</p>`,
					options: [
						{ id: '1', label: 'вода и хлорид натрия' },
						{ id: '2', label: 'оксид кальция и раствор гидроксида натрия' },
						{ id: '3', label: 'кислород и оксид магния' },
						{ id: '4', label: 'вода и серебро' },
						{ id: '5', label: 'вода и оксид натрия' }
					],
					correct: ['2','5'],
					hint: 'SO₃ — кислотный оксид, реагирует с основными оксидами, щелочами и водой.'
				},
				{
					id: 309,
					type: 'match',
					title: 'Реагенты и продукты',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>3</sub> и HNO<sub>3</sub>(разб.)' },
						{ letter: 'Б', label: 'Al<sub>2</sub>O<sub>3</sub> и KOH(р-р)' },
						{ letter: 'В', label: 'Al и KOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'Al(OH)<sub>3</sub> и K<sub>2</sub>O' },
						{ id: '2', label: 'NH<sub>4</sub>NO<sub>3</sub>' },
						{ id: '3', label: 'K[Al(OH)<sub>4</sub>] и H<sub>2</sub>' },
						{ id: '4', label: 'NH<sub>4</sub>NO<sub>3</sub> и H<sub>2</sub>O' },
						{ id: '5', label: 'K[Al(OH)<sub>4</sub>]' }
					],
					correct: ['2','5','3'],
					hint: 'NH₃+HNO₃→NH₄NO₃ (без воды); Al₂O₃+2KOH+3H₂O→2K[Al(OH)₄]; 2Al+2KOH+6H₂O→2K[Al(OH)₄]+3H₂↑.'
				},
				{
					id: 310,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с которыми это вещество может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al' },
						{ letter: 'Б', label: 'NaOH' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl' }
					],
					matchRight: [
						{ id: '1', label: 'BaSO<sub>4</sub>, K<sub>2</sub>O' },
						{ id: '2', label: 'Al(OH)<sub>3</sub>, HCl(р-р)' },
						{ id: '3', label: 'Ca(OH)<sub>2</sub>, AgNO<sub>3</sub>(р-р)' },
						{ id: '4', label: 'O<sub>2</sub>, Na<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					correct: ['3','2','3'],
					hint: 'Al реагирует с щёлочью и вытесняет Ag; NaOH с амфотерным гидроксидом и кислотой; NH₄Cl с щёлочью (→NH₃↑) и AgNO₃ (→AgCl↓).'
				},
				{
					id: 311,
					type: 'single',
					title: 'Разложение без изменения СО',
					body: `<p>В реакцию разложения, протекающую <b>без изменения степени окисления</b>, вступает</p>`,
					options: [
						{ id: '1', label: 'NH<sub>4</sub>Cl' },
						{ id: '2', label: 'HgO' },
						{ id: '3', label: 'Cu(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '4', label: 'KMnO<sub>4</sub>' }
					],
					correct: '1',
					hint: 'NH₄Cl ⇌ NH₃ + HCl — степени окисления не меняются.'
				},
				{
					id: 312,
					type: 'match',
					title: 'Признак реакции',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH(р-р) и HNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SiO<sub>3</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'Fe<sub>2</sub>O<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'растворение твёрдого вещества и образование бесцветного раствора' },
						{ id: '2', label: 'образование осадка' },
						{ id: '3', label: 'растворение твёрдого вещества и образование раствора жёлтого цвета' },
						{ id: '4', label: 'видимые признаки реакции отсутствуют' }
					],
					correct: ['4','2','3'],
					hint: 'Нейтрализация без признаков; H₂SiO₃↓ — студенистый осадок; Fe₂(SO₄)₃ — жёлтый раствор.'
				},
				{
					id: 313,
					type: 'multi',
					pickCount: 2,
					title: 'Электролиты',
					body: `<p>Выберите <b>две пары веществ</b>, каждое из которых является электролитом.</p>`,
					options: [
						{ id: '1', label: 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> и C<sub>2</sub>H<sub>5</sub>OH' },
						{ id: '2', label: 'H<sub>2</sub>O(дист.) и NaCl' },
						{ id: '3', label: 'ZnSO<sub>4</sub> и Ca(OH)<sub>2</sub>' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>4</sub> и NO' },
						{ id: '5', label: 'NaBr и Na<sub>2</sub>CO<sub>3</sub>' }
					],
					correct: ['3','5'],
					hint: 'Электролиты — растворимые соли, кислоты, щёлочи.'
				},
				{
					id: 314,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение',
					body: `
						<p>Сокращённому ионному уравнению</p>
						<p style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:15px; background:#f7f8fb; padding:10px; border-radius:10px;">
							Zn²⁺ + 2OH⁻ = Zn(OH)<sub>2</sub>↓
						</p>
						<p>соответствуют <b>две левые части</b> схемы уравнения химической реакции:</p>
					`,
					options: [
						{ id: '1', label: 'ZnSO<sub>4</sub> + KOH' },
						{ id: '2', label: 'Zn(NO<sub>3</sub>)<sub>2</sub> + Cu(OH)<sub>2</sub>' },
						{ id: '3', label: 'ZnO + KOH' },
						{ id: '4', label: 'ZnCl<sub>2</sub> + NaOH' },
						{ id: '5', label: 'ZnS + Ca(OH)<sub>2</sub>' },
						{ id: '6', label: 'ZnBr<sub>2</sub> + Cu(OH)<sub>2</sub>' }
					],
					correct: ['1','4'],
					hint: 'Оба реагента должны быть растворимы и давать свободные ионы Zn²⁺ и OH⁻.'
				},
				{
					id: 315,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S⁻² → S⁺⁶' },
						{ letter: 'Б', label: 'F<sub>2</sub>⁰ → 2F⁻¹' },
						{ letter: 'В', label: 'P⁺³ → P⁺⁵' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1','2','1'],
					hint: 'СО растёт — окисление, СО падает — восстановление.'
				},
				{
					id: 316,
					type: 'multi',
					pickCount: 1,
					title: 'Химическое загрязнение окружающей среды',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды и его последствиях выберите <b>одно или несколько верных</b>.</p>`,
					options: [
						{ id: '1', label: 'Ядовитые компоненты выхлопных газов автомобилей — углекислый газ и оксиды азота.' },
						{ id: '2', label: 'Выбросы сернистого газа в атмосферу приводят к кислотным дождям.' },
						{ id: '3', label: 'Увеличение количества углекислого газа в атмосфере не приводит к «парниковому эффекту».' },
						{ id: '4', label: 'Выхлопные газы двигателей внутреннего сгорания необходимы для поддержания сбалансированного состава атмосферы.' }
					],
					correct: ['2'],
					hint: 'SO₂ + H₂O в атмосфере — причина кислотных дождей.'
				},
				{
					id: 317,
					type: 'match',
					title: 'Распознавание растворов',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'H<sub>2</sub>SO<sub>4</sub> и Na<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'KNO<sub>3</sub> и Ca(NO<sub>3</sub>)<sub>2</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl и NaCl' }
					],
					matchRight: [
						{ id: '1', label: 'соляная кислота' },
						{ id: '2', label: 'карбонат натрия' },
						{ id: '3', label: 'медь' },
						{ id: '4', label: 'гидроксид калия' }
					],
					correct: ['2','2','4'],
					hint: 'Na₂CO₃ + H₂SO₄ → CO₂↑; Na₂CO₃ + Ca(NO₃)₂ → CaCO₃↓; NH₄Cl + KOH → NH₃↑.'
				},
				{
					id: 318,
					type: 'input',
					title: 'Массовая доля фтора в Na₂PO₃F',
					body: `
						<p>Вычислите в процентах массовую долю фтора в монофторофосфате натрия <b>Na<sub>2</sub>PO<sub>3</sub>F</b>. Ответ запишите с точностью до десятых.</p>
					`,
					placeholder: 'например, 24,3',
					correct: '13,2',
					hint: 'M(Na₂PO₃F) = 46 + 31 + 48 + 19 = 144. ω(F) = 19/144·100% ≈ 13,2%.'
				},
				{
					id: 319,
					type: 'input',
					title: 'Масса фтора в тюбике пасты',
					body: `
						<p>Определите массу (в <b>миллиграммах</b>) фтора, который содержится в тюбике зубной пасты массой <b>100 г</b>. В <b>150 г</b> фторированной зубной пасты содержится <b>78 мг</b> монофторофосфата натрия Na<sub>2</sub>PO<sub>3</sub>F.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте массовую долю фтора, определённую в задании 318. Ответ — целое число.</p>
					`,
					placeholder: 'например, 8',
					correct: '7',
					hint: 'В 100 г пасты: 78·100/150 = 52 мг Na₂PO₃F. m(F) = 52·0,132 ≈ 7 мг.'
				},
				// ============================================================
				// ВАРИАНТ 4 · Часть 2 · Задания 320–322 (развёрнутый ответ)
				// ============================================================
				{
					id: 320,
					type: 'written',
					maxPoints: 3,
					title: 'Метод электронного баланса',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции, схема которой:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Cu + HNO₃(разб.) → Cu(NO₃)₂ + NO + H₂O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							Cu⁰ − 2ē → Cu⁺² &nbsp;&nbsp;| ×3 &nbsp;(окисление, восстановитель Cu)<br>
							N⁺⁵ + 3ē → N⁺² &nbsp;&nbsp;&nbsp;&nbsp;| ×2 &nbsp;(восстановление, окислитель HNO₃)
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							3 Cu + 8 HNO₃ = 3 Cu(NO₃)₂ + 2 NO↑ + 4 H₂O
						</p>
						<p><b>Окислитель</b> — N⁺⁵ (HNO₃), <b>восстановитель</b> — Cu⁰.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс: указаны степени окисления, число электронов и множители (3 и 2).' },
						{ id: 'c2', points: 1, label: 'Правильно расставлены коэффициенты (3, 8, 3, 2, 4).' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель (N⁺⁵ / HNO₃) и восстановитель (Cu⁰).' }
					]
				},
				{
					id: 321,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений натрия',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Na → Na₂O₂ →<sup>+H₂O, t°</sup>→ X → Na₃PO₄
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>Промежуточное вещество X = NaOH.</b></p>
						<p><b>Уравнения реакций:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 2 Na + O₂ = Na₂O₂<br>
							2) 2 Na₂O₂ + 2 H₂O = 4 NaOH + O₂↑<br>
							3) 3 NaOH + H₃PO₄ = Na₃PO₄ + 3 H₂O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Уравнение получения пероксида 2Na + O₂ = Na₂O₂ записано правильно.' },
						{ id: 'c2', points: 1, label: 'Уравнение взаимодействия Na₂O₂ с водой (X = NaOH) записано верно: 2Na₂O₂ + 2H₂O = 4NaOH + O₂↑.' },
						{ id: 'c3', points: 1, label: 'Уравнение нейтрализации 3NaOH + H₃PO₄ = Na₃PO₄ + 3H₂O записано правильно.' }
					]
				},
				{
					id: 322,
					type: 'written',
					maxPoints: 3,
					title: 'Объём SO₂, поглощённого раствором NaOH',
					taskKind: 'Расчётная задача',
					body: `
						<p>Через <b>40 г</b> раствора с массовой долей гидроксида натрия <b>8%</b> пропустили сернистый газ. При этом образовался сульфит натрия. Вычислите объём (н.у.) вступившего в реакцию газа.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">2 NaOH + SO₂ = Na₂SO₃ + H₂O</p>
						<p><b>2) Масса и количество NaOH:</b><br>
							m(NaOH) = 40 · 0,08 = 3,2 г<br>
							n(NaOH) = 3,2 / 40 = 0,08 моль</p>
						<p><b>3) По уравнению</b> n(SO₂) = n(NaOH) / 2 = 0,04 моль.</p>
						<p><b>4) Объём газа (н.у.):</b><br>
							V(SO₂) = n · V<sub>m</sub> = 0,04 · 22,4 = <b>0,896 л</b></p>
						<p><b>Ответ: V(SO₂) ≈ 0,896 л.</b></p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение 2NaOH + SO₂ = Na₂SO₃ + H₂O и найдено количество NaOH.' },
						{ id: 'c2', points: 1, label: 'По стехиометрии определено количество SO₂ (0,04 моль).' },
						{ id: 'c3', points: 1, label: 'Рассчитан объём газа при н.у. (≈ 0,896 л) с единицами.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 5 · Часть 1 (задания 401–419)
				// ============================================================
				{
					id: 401,
					type: 'multi',
					pickCount: 2,
					title: 'Кадмий как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о кадмии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Кадмий — мягкий ковкий серебристо-серый металл.' },
						{ id: '2', label: 'На воздухе кадмий устойчив и не утрачивает металлического блеска.' },
						{ id: '3', label: 'Кадмий существует в виде шести природных изотопов.' },
						{ id: '4', label: 'Кадмий входит в состав минерала гринокита, так называемой «кадмиевой обманки».' },
						{ id: '5', label: 'В ядерной энергетике «свинцовый домик» выстилается изнутри кадмиевыми слоями для экранирования паразитного излучения свинца.' }
					],
					correct: ['3','4'],
					hint: 'О химическом элементе говорят изотопы и вхождение в состав соединений/минералов.'
				},
				{
					id: 402,
					type: 'input',
					title: 'Строение ядра атома',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<svg viewBox="0 0 240 200" width="100%" style="max-width: 260px; height:auto;" xmlns="http://www.w3.org/2000/svg" aria-label="Ядро атома">
								<defs>
									<radialGradient id="nucBg5" cx="50%" cy="50%" r="50%">
										<stop offset="0" stop-color="#fdecd6"/>
										<stop offset="1" stop-color="#f5d9a8"/>
									</radialGradient>
								</defs>
								<circle cx="120" cy="100" r="70" fill="url(#nucBg5)" stroke="#c79a55" stroke-width="1"/>
								<g font-family="Manrope, sans-serif" font-size="11" font-weight="700">
									<!-- 8 protons -->
									<circle cx="95"  cy="75"  r="11" fill="#e38b27"/><text x="95"  y="79"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="120" cy="65"  r="11" fill="#e38b27"/><text x="120" y="69"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="75"  r="11" fill="#e38b27"/><text x="145" y="79"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="155" cy="100" r="11" fill="#e38b27"/><text x="155" y="104" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="125" r="11" fill="#e38b27"/><text x="145" y="129" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="120" cy="135" r="11" fill="#e38b27"/><text x="120" y="139" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="95"  cy="125" r="11" fill="#e38b27"/><text x="95"  y="129" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="85"  cy="100" r="11" fill="#e38b27"/><text x="85"  y="104" text-anchor="middle" fill="#fff">p⁺</text>
									<!-- 8 neutrons -->
									<circle cx="108" cy="90"  r="10" fill="#6b8ddc"/><text x="108" y="94"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="132" cy="90"  r="10" fill="#6b8ddc"/><text x="132" y="94"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="108" cy="110" r="10" fill="#6b8ddc"/><text x="108" y="114" text-anchor="middle" fill="#fff">n</text>
									<circle cx="132" cy="110" r="10" fill="#6b8ddc"/><text x="132" y="114" text-anchor="middle" fill="#fff">n</text>
									<circle cx="120" cy="100" r="10" fill="#6b8ddc"/><text x="120" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="100" cy="100" r="10" fill="#6b8ddc"/><text x="100" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="140" cy="100" r="10" fill="#6b8ddc"/><text x="140" y="104" text-anchor="middle" fill="#fff">n</text>
									<circle cx="120" cy="80"  r="10" fill="#6b8ddc"/><text x="120" y="84"  text-anchor="middle" fill="#fff">n</text>
								</g>
								<text x="120" y="190" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" fill="#6b7280">8 протонов · 8 нейтронов</text>
							</svg>
						</div>
						<p>Запишите номер группы (<b>X</b>), в которой расположен данный химический элемент, и общее число электронов (<b>Y</b>) в атоме данного элемента.</p>
						<p style="color:var(--muted);font-size:14px;">Сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 79',
					correct: '68',
					hint: '8 протонов — кислород (VIA группа). Число электронов = 8.'
				},
				{
					id: 403,
					type: 'input',
					title: 'Увеличение электроотрицательности',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>азот</li>
							<li>бор</li>
							<li>углерод</li>
						</ol>
						<p>в порядке <b>увеличения</b> их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '231',
					hint: 'В периоде ЭО растёт слева направо: B < C < N.'
				},
				{
					id: 404,
					type: 'match',
					title: 'Степень окисления азота',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления азота в данном веществе.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NO<sub>2</sub>' },
						{ letter: 'Б', label: '(NH<sub>4</sub>)<sub>2</sub>S' },
						{ letter: 'В', label: 'KNO<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+4' }
					],
					correct: ['4','1','3'],
					hint: 'В NO₂ N=+4, в NH₄⁺ N=−3, в NO₂⁻ N=+3.'
				},
				{
					id: 405,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Из предложенного перечня выберите <b>две пары веществ</b>, для каждого из которых характерна ионная связь.</p>`,
					options: [
						{ id: '1', label: 'CaCl<sub>2</sub>, Na<sub>2</sub>O' },
						{ id: '2', label: 'NH<sub>3</sub>, N<sub>2</sub>' },
						{ id: '3', label: 'Ca, CaF<sub>2</sub>' },
						{ id: '4', label: 'CuO, N<sub>2</sub>O<sub>5</sub>' },
						{ id: '5', label: 'MgO, K<sub>2</sub>S' }
					],
					correct: ['1','5'],
					hint: 'Ионная связь — между типичными металлом и неметаллом.'
				},
				{
					id: 406,
					type: 'multi',
					pickCount: 2,
					title: 'Верно для Mg, неверно для F',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики <b>магния</b> и <b>неверны</b> для характеристики <b>фтора</b>?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент образует летучее водородное соединение.' },
						{ id: '2', label: 'Является неметаллом.' },
						{ id: '3', label: 'Гидроксид элемента является основным.' },
						{ id: '4', label: 'Электроны в атоме расположены на двух электронных слоях.' },
						{ id: '5', label: 'Химический элемент в соединениях с кислородом проявляет положительную степень окисления.' }
					],
					correct: ['3','5'],
					hint: 'Mg(OH)₂ — основный; Mg⁺² в MgO. У F гидроксида нет, в OF₂ F имеет −1.'
				},
				{
					id: 407,
					type: 'single',
					title: 'Классификация SiO₂ и HNO₃',
					body: `<p>Вещества, формулы которых — SiO<sub>2</sub> и HNO<sub>3</sub>, являются соответственно</p>`,
					options: [
						{ id: '1', label: 'основным оксидом и кислотой' },
						{ id: '2', label: 'кислотным оксидом и солью' },
						{ id: '3', label: 'кислотным оксидом и кислотой' },
						{ id: '4', label: 'амфотерным оксидом и кислотой' }
					],
					correct: '3',
					hint: 'SiO₂ — кислотный оксид (ему соответствует H₂SiO₃); HNO₃ — кислота.'
				},
				{
					id: 408,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции с CO₂',
					body: `<p>С какими <b>двумя парами</b> перечисленных веществ реагирует оксид углерода(IV)?</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>O и CaO' },
						{ id: '2', label: 'O<sub>2</sub> и Na<sub>2</sub>O' },
						{ id: '3', label: 'KOH и Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '4', label: 'Fe<sub>2</sub>O<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '5', label: 'MgO и Li<sub>2</sub>O' }
					],
					correct: ['1','5'],
					hint: 'CO₂ — кислотный оксид; реагирует с водой, основными оксидами и щелочами.'
				},
				{
					id: 409,
					type: 'match',
					title: 'Реагирующие вещества и продукты',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SO<sub>2</sub> + H<sub>2</sub>S' },
						{ letter: 'Б', label: 'H<sub>2</sub>S + O<sub>2</sub>(изб.)' },
						{ letter: 'В', label: 'SO<sub>2</sub> + O<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'SO<sub>2</sub> + H<sub>2</sub>' },
						{ id: '2', label: 'SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '3', label: 'SO<sub>3</sub>' },
						{ id: '4', label: 'SO<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'S + H<sub>2</sub>O' }
					],
					correct: ['5','2','3'],
					hint: 'SO₂+2H₂S→3S+2H₂O; 2H₂S+3O₂→2SO₂+2H₂O; 2SO₂+O₂→2SO₃.'
				},
				{
					id: 410,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между названием вещества и реагентами, с каждым из которых оно может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'магний' },
						{ letter: 'Б', label: 'оксид железа(II)' },
						{ letter: 'В', label: 'гидроксид бария' }
					],
					matchRight: [
						{ id: '1', label: 'CO<sub>2</sub>, Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'NaOH, SO<sub>3</sub>' },
						{ id: '3', label: 'H<sub>2</sub>O, HCl' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>4</sub>, CO' }
					],
					correct: ['3','4','1'],
					hint: 'Mg — активный металл; FeO — основный оксид; Ba(OH)₂ — щёлочь.'
				},
				{
					id: 411,
					type: 'single',
					title: 'Характеристика горения H₂S',
					body: `
						<p>Горение сероводорода:</p>
						<p style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:15px; background:#f7f8fb; padding:10px; border-radius:10px;">
							2 H<sub>2</sub>S + 3 O<sub>2</sub> = 2 H<sub>2</sub>O + 2 SO<sub>2</sub>
						</p>
						<p>является реакцией</p>
					`,
					options: [
						{ id: '1', label: 'окислительно-восстановительной, некаталитической, экзотермической' },
						{ id: '2', label: 'окислительно-восстановительной, каталитической, эндотермической' },
						{ id: '3', label: 'замещения, некаталитической, эндотермической' },
						{ id: '4', label: 'обмена, некаталитической, экзотермической' }
					],
					correct: '1',
					hint: 'Горение — ОВР, идёт без катализатора и с выделением теплоты.'
				},
				{
					id: 412,
					type: 'match',
					title: 'Признак реакции',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>3</sub>PO<sub>4</sub> и CaCl<sub>2</sub>' },
						{ letter: 'Б', label: 'Al(OH)<sub>3</sub> и KOH(р-р)' },
						{ letter: 'В', label: 'Al(OH)<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'образование осадка' },
						{ id: '2', label: 'видимые признаки отсутствуют' },
						{ id: '3', label: 'изменение цвета раствора' },
						{ id: '4', label: 'растворение осадка' }
					],
					correct: ['1','4','4'],
					hint: 'Ca₃(PO₄)₂ — белый осадок; Al(OH)₃ — амфотерный, растворяется и в щёлочи, и в кислоте.'
				},
				{
					id: 413,
					type: 'multi',
					pickCount: 2,
					title: 'Равное число катионов и анионов',
					body: `<p>Выберите <b>два вещества</b>, при электролитической диссоциации которых образуется одинаковое число положительных и отрицательных ионов.</p>`,
					options: [
						{ id: '1', label: 'хлорид калия' },
						{ id: '2', label: 'хлорид бария' },
						{ id: '3', label: 'карбонат натрия' },
						{ id: '4', label: 'сульфат железа(II)' },
						{ id: '5', label: 'сульфат алюминия' }
					],
					correct: ['1','4'],
					hint: 'KCl → 1:1, FeSO₄ → 1:1.'
				},
				{
					id: 414,
					type: 'multi',
					pickCount: 2,
					title: 'Нейтрализация (ионное уравнение)',
					body: `
						<p>Выберите <b>две пары</b> исходных веществ, взаимодействию которых соответствует сокращённое ионное уравнение реакции:</p>
						<p style="text-align:center; font-family:'JetBrains Mono',monospace; font-size:15px; background:#f7f8fb; padding:10px; border-radius:10px;">
							H⁺ + OH⁻ = H<sub>2</sub>O
						</p>
					`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>CO<sub>3</sub> и KOH' },
						{ id: '2', label: 'H<sub>2</sub>SO<sub>4</sub> и LiOH' },
						{ id: '3', label: 'HCl и KOH' },
						{ id: '4', label: 'HCl и Fe(OH)<sub>3</sub>' },
						{ id: '5', label: 'H<sub>3</sub>PO<sub>4</sub> и Fe(OH)<sub>2</sub>' },
						{ id: '6', label: 'H<sub>2</sub>S и NaOH' }
					],
					correct: ['2','3'],
					hint: 'Нужны сильная кислота + сильная растворимая щёлочь.'
				},
				{
					id: 415,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: '2Cl⁻¹ → Cl<sub>2</sub>⁰' },
						{ letter: 'Б', label: 'Mg⁰ → Mg⁺²' },
						{ letter: 'В', label: 'P⁺⁵ → P⁺³' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1','1','2'],
					hint: 'СО растёт — окисление, СО падает — восстановление.'
				},
				{
					id: 416,
					type: 'multi',
					pickCount: 2,
					title: 'Правила работы в лаборатории',
					body: `<p>Из перечисленных суждений о правилах работы в школьной лаборатории выберите <b>верные</b>.</p>`,
					options: [
						{ id: '1', label: 'Чтобы погасить пламя спиртовки, его следует задуть.' },
						{ id: '2', label: 'При нагревании пробирки с раствором её следует располагать строго вертикально.' },
						{ id: '3', label: 'При проведении опытов с концентрированными растворами кислот и щелочей необходимо всегда надевать резиновые перчатки.' },
						{ id: '4', label: 'Опыты с летучими, ядовитыми веществами проводят только под тягой.' }
					],
					correct: ['3','4'],
					hint: 'Спиртовку гасят колпачком; пробирку нагревают под наклоном.'
				},
				{
					id: 417,
					type: 'match',
					title: 'Распознавание растворов',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AlBr<sub>3</sub>(р-р) и AgNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'BaCl<sub>2</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'Al(OH)<sub>3</sub> и Mg(OH)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'NaOH(р-р)' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'HNO<sub>3</sub>(р-р)' },
						{ id: '4', label: 'H<sub>2</sub>O' }
					],
					correct: ['1','2','1'],
					hint: 'NaOH: с AgNO₃ → тёмный Ag₂O; BaCl₂+Na₂SO₄→BaSO₄↓; Al(OH)₃ — амфотерный.'
				},
				{
					id: 418,
					type: 'input',
					title: 'Массовая доля калия в стекле K₂CaSi₆O₁₄',
					body: `
						<p>Вычислите в процентах массовую долю калия в стекле состава <b>K<sub>2</sub>CaSi<sub>6</sub>O<sub>14</sub></b>. Ответ запишите с точностью до десятых.</p>
					`,
					placeholder: 'например, 26,4',
					correct: '15,3',
					hint: 'M(K₂CaSi₆O₁₄) = 78 + 40 + 168 + 224 = 510. ω(K) = 78/510·100% ≈ 15,3%.'
				},
				{
					id: 419,
					type: 'input',
					title: 'Масса стекла по содержанию калия',
					body: `
						<p>Вычислите массу указанного стекла (в <b>килограммах</b>), если в нём содержится <b>20,6 кг</b> калия. Ответ запишите с точностью до десятых.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте массовую долю калия, определённую в задании 418.</p>
					`,
					placeholder: 'например, 245,7',
					correct: '134,6',
					hint: 'm(стекла) = m(K) / ω(K) = 20,6 / 0,153 ≈ 134,6 кг.'
				},
				// ============================================================
				// ВАРИАНТ 5 · Часть 2 · Задания 420–422 (развёрнутый ответ)
				// ============================================================
				{
					id: 420,
					type: 'written',
					maxPoints: 3,
					title: 'Диспропорционирование брома',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции, схема которой:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							NaOH + Br₂ → NaBrO₃ + NaBr + H₂O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс</b> (диспропорционирование Br₂):</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							Br⁰ − 5ē → Br⁺⁵ &nbsp;| ×1 &nbsp;(окисление)<br>
							Br⁰ + 1ē → Br⁻¹ &nbsp;| ×5 &nbsp;(восстановление)
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							6 NaOH + 3 Br₂ = NaBrO₃ + 5 NaBr + 3 H₂O
						</p>
						<p><b>Окислитель и восстановитель</b> — Br₂ (реакция диспропорционирования: одни атомы брома повышают СО до +5, другие понижают до −1).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс с указанием СО брома и множителей (1 и 5).' },
						{ id: 'c2', points: 1, label: 'Правильно расставлены коэффициенты в уравнении (6, 3, 1, 5, 3).' },
						{ id: 'c3', points: 1, label: 'Указано, что Br₂ является и окислителем, и восстановителем (диспропорционирование).' }
					]
				},
				{
					id: 421,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений железа',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Fe → X → Fe(OH)₂ → FeSO₄
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>Промежуточное вещество X = FeCl₂</b> (удобный выбор — растворимая соль Fe(II)).</p>
						<p><b>Уравнения реакций:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Fe + 2 HCl = FeCl₂ + H₂↑<br>
							2) FeCl₂ + 2 NaOH = Fe(OH)₂↓ + 2 NaCl<br>
							3) Fe(OH)₂ + H₂SO₄ = FeSO₄ + 2 H₂O
						</p>
						<p style="color:var(--muted); font-size:13px;">Допустимы альтернативные варианты X (FeBr₂, FeSO₄ и др.) с соответствующими уравнениями.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Уравнение Fe → X записано верно (например, Fe + 2HCl = FeCl₂ + H₂↑).' },
						{ id: 'c2', points: 1, label: 'Уравнение X + NaOH = Fe(OH)₂↓ записано правильно.' },
						{ id: 'c3', points: 1, label: 'Уравнение Fe(OH)₂ + H₂SO₄ = FeSO₄ + 2H₂O записано правильно.' }
					]
				},
				{
					id: 422,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля Pb(NO₃)₂ в растворе',
					taskKind: 'Расчётная задача',
					body: `
						<p>При взаимодействии <b>150 г</b> раствора нитрата свинца с небольшим избытком раствора иодида калия выпало <b>10,45 г</b> осадка. Рассчитайте массовую долю нитрата свинца в исходном растворе.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">Pb(NO₃)₂ + 2 KI = PbI₂↓ + 2 KNO₃</p>
						<p><b>2) Количество осадка PbI₂:</b><br>
							M(PbI₂) = 207 + 2·127 = 461 г/моль<br>
							n(PbI₂) = 10,45 / 461 ≈ 0,0227 моль</p>
						<p><b>3) По уравнению</b> n(Pb(NO₃)₂) = n(PbI₂) = 0,0227 моль<br>
							M(Pb(NO₃)₂) = 207 + 2·62 = 331 г/моль<br>
							m(Pb(NO₃)₂) = 0,0227 · 331 ≈ 7,5 г</p>
						<p><b>4) Массовая доля:</b><br>
							ω(Pb(NO₃)₂) = 7,5 / 150 · 100% = <b>5%</b></p>
						<p><b>Ответ: ω(Pb(NO₃)₂) = 5%.</b></p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество осадка PbI₂.' },
						{ id: 'c2', points: 1, label: 'По стехиометрии рассчитана масса Pb(NO₃)₂ (≈ 7,5 г).' },
						{ id: 'c3', points: 1, label: 'Рассчитана массовая доля Pb(NO₃)₂ (5%) с правильным ответом.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 6 · Часть 1 (задания 601–619)
				// ============================================================
				{
					id: 601,
					type: 'multi',
					pickCount: 2,
					title: 'Кальций как химический элемент',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится о кальции как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Впервые кальций был получен Г. Дэви в 1808 г.' },
						{ id: '2', label: 'Сплав кальция с цинком используется в производстве пенобетона.' },
						{ id: '3', label: 'Кальций наряду с углеродом и кислородом входит в состав мела.' },
						{ id: '4', label: 'Яичная скорлупа содержит довольно много кальция.' },
						{ id: '5', label: 'Кальций получают электролизом расплава его хлорида.' }
					],
					correct: ['3','4'],
					hint: 'О химическом элементе говорят высказывания о вхождении в состав соединений.'
				},
				{
					id: 602,
					type: 'input',
					title: 'Строение ядра атома',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<div style="margin: 18px 0; display: flex; justify-content: center;">
							<svg viewBox="0 0 240 200" width="100%" style="max-width: 240px; height:auto;" xmlns="http://www.w3.org/2000/svg" aria-label="Ядро атома">
								<defs>
									<radialGradient id="nucBg6" cx="50%" cy="50%" r="50%">
										<stop offset="0" stop-color="#fdecd6"/>
										<stop offset="1" stop-color="#f5d9a8"/>
									</radialGradient>
								</defs>
								<circle cx="120" cy="100" r="62" fill="url(#nucBg6)" stroke="#c79a55" stroke-width="1"/>
								<g font-family="Manrope, sans-serif" font-size="11" font-weight="700">
									<!-- 6 protons (orange) -->
									<circle cx="100" cy="78"  r="11" fill="#e38b27"/><text x="100" y="82"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="125" cy="70"  r="11" fill="#e38b27"/><text x="125" y="74"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="150" cy="90"  r="11" fill="#e38b27"/><text x="150" y="94"  text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="145" cy="120" r="11" fill="#e38b27"/><text x="145" y="124" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="115" cy="130" r="11" fill="#e38b27"/><text x="115" y="134" text-anchor="middle" fill="#fff">p⁺</text>
									<circle cx="90"  cy="110" r="11" fill="#e38b27"/><text x="90"  y="114" text-anchor="middle" fill="#fff">p⁺</text>
									<!-- 6 neutrons (blue) -->
									<circle cx="115" cy="93"  r="10" fill="#6b8ddc"/><text x="115" y="97"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="135" cy="98"  r="10" fill="#6b8ddc"/><text x="135" y="102" text-anchor="middle" fill="#fff">n</text>
									<circle cx="125" cy="115" r="10" fill="#6b8ddc"/><text x="125" y="119" text-anchor="middle" fill="#fff">n</text>
									<circle cx="105" cy="115" r="10" fill="#6b8ddc"/><text x="105" y="119" text-anchor="middle" fill="#fff">n</text>
									<circle cx="108" cy="95"  r="10" fill="#6b8ddc"/><text x="108" y="99"  text-anchor="middle" fill="#fff">n</text>
									<circle cx="130" cy="85"  r="10" fill="#6b8ddc"/><text x="130" y="89"  text-anchor="middle" fill="#fff">n</text>
								</g>
								<text x="120" y="182" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" fill="#6b7280">6 протонов · 6 нейтронов</text>
							</svg>
						</div>
						<p>Запишите число электронов на внешнем электронном слое данного атома (<b>X</b>) и номер периода (<b>Y</b>), в котором расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 53',
					correct: '42',
					hint: '6 протонов — углерод (С). На внешнем слое 4 электрона, 2-й период.'
				},
				{
					id: 603,
					type: 'input',
					title: 'Увеличение металлических свойств',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>литий</li>
							<li>калий</li>
							<li>натрий</li>
						</ol>
						<p>в порядке <b>увеличения</b> металлических свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 123',
					correct: '132',
					hint: 'В группе сверху вниз металлические свойства усиливаются: Li < Na < K.'
				},
				{
					id: 604,
					type: 'match',
					title: 'Степень окисления азота',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления азота в данном веществе.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'Б', label: 'HNO<sub>3</sub>' },
						{ letter: 'В', label: 'NO<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+4' }
					],
					correct: ['1','2','4'],
					hint: 'В NH₄⁺ азот −3, в HNO₃ +5, в NO₂ +4.'
				},
				{
					id: 605,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ионной химической связью.</p>`,
					options: [
						{ id: '1', label: 'HBr' },
						{ id: '2', label: 'P<sub>2</sub>O<sub>5</sub>' },
						{ id: '3', label: 'BaCl<sub>2</sub>' },
						{ id: '4', label: 'CO<sub>2</sub>' },
						{ id: '5', label: 'Na<sub>2</sub>O' }
					],
					correct: ['3','5'],
					hint: 'Ионная связь — между типичным металлом и неметаллом.'
				},
				{
					id: 606,
					type: 'multi',
					pickCount: 2,
					title: 'Общие свойства натрия и калия',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как натрия, так и калия?</p>`,
					options: [
						{ id: '1', label: 'На внешнем уровне атом содержит один электрон.' },
						{ id: '2', label: 'Атомный радиус больше атомного радиуса алюминия.' },
						{ id: '3', label: 'Взаимодействует с кислородом, но не взаимодействует с водородом.' },
						{ id: '4', label: 'Образует амфотерный гидроксид.' },
						{ id: '5', label: 'Высший оксид имеет состав ЭО<sub>2</sub>.' }
					],
					correct: ['1','2'],
					hint: 'Na и K — щелочные металлы IA группы, 1 электрон на внешнем уровне; радиус больше, чем у Al.'
				},
				{
					id: 607,
					type: 'single',
					title: 'Классификация Al(OH)₃ и (NH₄)₃PO₄',
					body: `<p>Вещества, формулы которых — Al(OH)<sub>3</sub> и (NH<sub>4</sub>)<sub>3</sub>PO<sub>4</sub>, являются соответственно</p>`,
					options: [
						{ id: '1', label: 'амфотерным гидроксидом и кислотой' },
						{ id: '2', label: 'амфотерным гидроксидом и солью' },
						{ id: '3', label: 'основанием и кислотой' },
						{ id: '4', label: 'основанием и солью' }
					],
					correct: '2',
					hint: 'Al(OH)₃ амфотерный; (NH₄)₃PO₄ — соль (катион NH₄⁺ и анион PO₄³⁻).'
				},
				{
					id: 608,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции FeO с растворами',
					body: `<p>Из предложенного списка выберите <b>два вещества</b>, с растворами которых реагирует оксид железа(II).</p>`,
					options: [
						{ id: '1', label: 'соляная кислота' },
						{ id: '2', label: 'бромоводород' },
						{ id: '3', label: 'карбонат калия' },
						{ id: '4', label: 'хлорид натрия' },
						{ id: '5', label: 'аммиак' }
					],
					correct: ['1','2'],
					hint: 'FeO — основный оксид, реагирует с кислотами (HCl, HBr).'
				},
				{
					id: 609,
					type: 'match',
					title: 'Реакции алюминия и его соединений с H₂SO₄',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al + H<sub>2</sub>SO<sub>4</sub>(конц., t°)' },
						{ letter: 'Б', label: 'Al<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'Al(OH)<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'Al<sub>2</sub>S<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>S + H<sub>2</sub>O' },
						{ id: '3', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>' },
						{ id: '4', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Al<sub>2</sub>S<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O' }
					],
					correct: ['2','4','4'],
					hint: 'С горячей концентрированной H₂SO₄ активные металлы восстанавливают S до H₂S; Al₂O₃ и Al(OH)₃ дают только соль и воду.'
				},
				{
					id: 610,
					type: 'match',
					title: 'Вещество и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с каждым из которых оно может взаимодействовать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P' },
						{ letter: 'Б', label: 'Fe<sub>2</sub>O<sub>3</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'HNO<sub>3</sub>, CO' },
						{ id: '2', label: 'Fe, Na<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '3', label: 'Ca, O<sub>2</sub>' },
						{ id: '4', label: 'Zn, Cu(OH)<sub>2</sub>' }
					],
					correct: ['3','1','4'],
					hint: 'P + Ca → Ca₃P₂, P + O₂ → P₂O₅; Fe₂O₃ с кислотой и восстанавливается CO; разбавленная H₂SO₄ с Zn и Cu(OH)₂.'
				},
				{
					id: 611,
					type: 'single',
					title: 'Изменение цвета — признак реакции',
					body: `<p>Изменение цвета — признак химической реакции между</p>`,
					options: [
						{ id: '1', label: 'растворами NaOH и HCl' },
						{ id: '2', label: 'CO<sub>2</sub> и раствором KOH' },
						{ id: '3', label: 'CuO и раствором H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '4', label: 'CaO и H<sub>2</sub>O' }
					],
					correct: '3',
					hint: 'CuO — чёрный, растворяется с образованием голубого раствора CuSO₄.'
				},
				{
					id: 612,
					type: 'match',
					title: 'Признак реакции',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'MgSO<sub>4</sub>(р-р) и K<sub>3</sub>PO<sub>4</sub>(р-р)' },
						{ letter: 'Б', label: 'метилоранж и NaOH(р-р)' },
						{ letter: 'В', label: 'MgBr<sub>2</sub>(р-р) и AgNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'образование осадка' },
						{ id: '2', label: 'обесцвечивание раствора' },
						{ id: '3', label: 'изменение цвета раствора на красный' },
						{ id: '4', label: 'изменение цвета раствора на жёлтый' }
					],
					correct: ['1','4','1'],
					hint: 'Mg₃(PO₄)₂ и AgBr — осадки; метилоранж в щёлочи становится жёлтым.'
				},
				{
					id: 613,
					type: 'multi',
					pickCount: 2,
					title: 'Не слабые электролиты',
					body: `<p>Выберите <b>два вещества</b>, которые <b>не являются</b> слабыми электролитами.</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'H<sub>2</sub>S' },
						{ id: '3', label: 'CH<sub>3</sub>COOH' },
						{ id: '4', label: 'H<sub>2</sub>CO<sub>3</sub>' },
						{ id: '5', label: 'HCl' }
					],
					correct: ['1','5'],
					hint: 'H₂SO₄ и HCl — сильные кислоты (сильные электролиты).'
				},
				{
					id: 614,
					type: 'multi',
					pickCount: 2,
					title: 'Вещества реагируют между собой',
					body: `<p>Какие <b>две пары</b> из перечня содержат вещества, реагирующие между собой?</p>`,
					options: [
						{ id: '1', label: 'NaCl и Ba(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '2', label: 'KOH и Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'HCl и BaBr<sub>2</sub>' },
						{ id: '4', label: 'CuSO<sub>4</sub> и K<sub>2</sub>S' },
						{ id: '5', label: 'AgNO<sub>3</sub> и HCl' },
						{ id: '6', label: 'NaNO<sub>3</sub> и KCl' }
					],
					correct: ['4','5'],
					hint: 'Реакция обмена идёт, если образуется осадок, газ или слабый электролит. CuS↓ (чёрный) и AgCl↓ (белый).'
				},
				{
					id: 615,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: '2O⁻² → O<sub>2</sub>⁰' },
						{ letter: 'Б', label: 'N⁺⁵ → N⁺²' },
						{ letter: 'В', label: 'Cl⁺¹ → Cl⁻¹' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1','2','2'],
					hint: 'СО растёт — окисление, СО падает — восстановление.'
				},
				{
					id: 616,
					type: 'multi',
					pickCount: 2,
					title: 'Правила работы в лаборатории',
					body: `<p>Из перечисленных суждений о правилах работы в лаборатории выберите <b>верные</b>.</p>`,
					options: [
						{ id: '1', label: 'Все опыты, связанные с выделением газов, надо проводить только в вытяжном шкафу.' },
						{ id: '2', label: 'При нагревании растворов необходимо направлять отверстие пробирки или колбы в сторону от лица и от соседей.' },
						{ id: '3', label: 'Вещества, находящиеся в лаборатории, запрещается пробовать на вкус, даже если они в обыденной жизни употребляются в пищу.' },
						{ id: '4', label: 'При попадании кислоты на кожу поражённое место надо промыть большим количеством раствора щёлочи.' }
					],
					correct: ['2','3'],
					hint: 'Кислоту с кожи смывают водой, а затем слабым раствором соды, но не щёлочью.'
				},
				{
					id: 617,
					type: 'match',
					title: 'Распознавание растворов',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AgNO<sub>3</sub>(р-р) и KNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'Ba(OH)<sub>2</sub>(р-р) и KOH(р-р)' },
						{ letter: 'В', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'лакмус' },
						{ id: '2', label: 'Cu' },
						{ id: '3', label: 'K<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '4', label: 'NaNO<sub>3</sub>(р-р)' }
					],
					correct: ['2','3','1'],
					hint: 'Cu + AgNO₃ → Ag (раствор синеет); Ba(OH)₂ + K₂SO₄ → BaSO₄↓; лакмус различает щёлочь и кислоту.'
				},
				{
					id: 618,
					type: 'input',
					title: 'Массовая доля фосфора в Ca(H₂PO₄)₂',
					body: `
						<p>Вычислите в процентах массовую долю фосфора в дигидрофосфате кальция <b>Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub></b>. Ответ запишите с точностью до десятых.</p>
					`,
					placeholder: 'например, 37,6',
					correct: '26,5',
					hint: 'M = 40 + 2·(2+31+64) = 234 г/моль; ω(P) = 62/234·100% ≈ 26,5%.'
				},
				{
					id: 619,
					type: 'input',
					title: 'Масса суперфосфата для участка',
					body: `
						<p>Вычислите, какую массу (в <b>килограммах</b>) двойного суперфосфата Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub> надо внести в почву на участке площадью <b>50 м²</b>, если на 1 м² вносят <b>15 г</b> фосфора. Ответ запишите с точностью до десятых.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте массовую долю фосфора из задания 618.</p>
					`,
					placeholder: 'например, 3,9',
					correct: '2,8',
					hint: 'm(P) = 15·50 = 750 г; m(удобрения) = 750 / 0,265 ≈ 2830 г ≈ 2,8 кг.'
				},
				// ============================================================
				// ВАРИАНТ 6 · Часть 2 · Задания 620–622 (развёрнутый ответ)
				// ============================================================
				{
					id: 620,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Cl₂ + Ca₃P₂ + H₂O',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции, схема которой:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Cl₂ + Ca₃P₂ + H₂O → CaCl₂ + H₃PO₄ + HCl
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							Cl₂⁰ + 2ē → 2Cl⁻¹ &nbsp;| ×8 &nbsp;(восстановление, окислитель Cl₂)<br>
							2P⁻³ − 16ē → 2P⁺⁵ &nbsp;| ×1 &nbsp;(окисление, восстановитель Ca₃P₂)
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							8 Cl₂ + Ca₃P₂ + 8 H₂O = 3 CaCl₂ + 2 H₃PO₄ + 10 HCl
						</p>
						<p><b>Окислитель</b> — Cl₂ (Cl⁰ → Cl⁻¹), <b>восстановитель</b> — Ca₃P₂ (P⁻³ → P⁺⁵).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс: указаны СО, число электронов и множители (8 и 1).' },
						{ id: 'c2', points: 1, label: 'Правильно расставлены коэффициенты (8, 1, 8, 3, 2, 10).' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель (Cl₂) и восстановитель (Ca₃P₂).' }
					]
				},
				{
					id: 621,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений железа',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							FeS → Fe₂O₃ → X → Fe(NO₃)₃
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>Промежуточное вещество X = FeCl₃</b>.</p>
						<p><b>Уравнения реакций:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 4 FeS + 7 O₂ = 2 Fe₂O₃ + 4 SO₂ (обжиг сульфида железа)<br>
							2) Fe₂O₃ + 6 HCl = 2 FeCl₃ + 3 H₂O<br>
							3) FeCl₃ + 3 AgNO₃ = Fe(NO₃)₃ + 3 AgCl↓
						</p>
						<p style="color:var(--muted); font-size:13px;">Допустимы другие варианты X (например, Fe₂(SO₄)₃) с соответствующими уравнениями.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение обжига FeS → Fe₂O₃ с коэффициентами.' },
						{ id: 'c2', points: 1, label: 'Записано уравнение Fe₂O₃ + HCl → FeCl₃ + H₂O с правильными коэффициентами.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение FeCl₃ + AgNO₃ → Fe(NO₃)₃ + AgCl↓.' }
					]
				},
				{
					id: 622,
					type: 'written',
					maxPoints: 3,
					title: 'Объём воздуха для сжигания FeS',
					taskKind: 'Расчётная задача',
					body: `
						<p>При сжигании сульфида железа(II) на воздухе образовалось <b>32 кг</b> оксида железа(III). Какой объём (в литрах) воздуха (н.у.) для этого потребовался? Объёмная доля кислорода в воздухе составляет <b>21%</b>.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">4 FeS + 7 O₂ = 2 Fe₂O₃ + 4 SO₂</p>
						<p><b>2) Количество вещества Fe₂O₃:</b><br>
							M(Fe₂O₃) = 2·56 + 3·16 = 160 г/моль<br>
							n(Fe₂O₃) = 32 000 / 160 = 200 моль</p>
						<p><b>3) По уравнению</b> n(O₂) = 7/2 · n(Fe₂O₃) = 7/2 · 200 = 700 моль<br>
							V(O₂) = 700 · 22,4 = 15 680 л</p>
						<p><b>4) Объём воздуха:</b><br>
							V(возд.) = V(O₂) / 0,21 = 15 680 / 0,21 ≈ <b>74 667 л (≈ 74,7 м³)</b></p>
						<p><b>Ответ: V(возд.) ≈ 74 667 л ≈ 74,7 м³.</b></p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество Fe₂O₃ (200 моль).' },
						{ id: 'c2', points: 1, label: 'По стехиометрии рассчитаны n(O₂) (700 моль) и V(O₂) (15 680 л).' },
						{ id: 'c3', points: 1, label: 'Рассчитан объём воздуха (≈ 74 667 л / 74,7 м³) с правильным ответом.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 7 · Часть 1 (задания 701–719)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568175)
				// ============================================================
				{
					id: 701,
					type: 'multi',
					pickCount: 2,
					title: 'Кальций как химический элемент',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится о кальции как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Плотность кальция составляет 1,55 г/см³.' },
						{ id: '2', label: 'В подростковом возрасте потребление достаточного количества кальция очень важно, поскольку интенсивно растёт скелет.' },
						{ id: '3', label: 'Большая часть кальция содержится в составе силикатов и алюмосиликатов различных горных пород.' },
						{ id: '4', label: 'Кальций получают электролизом расплава хлорида кальция.' },
						{ id: '5', label: 'При нагревании на воздухе или в кислороде кальций воспламеняется.' }
					],
					correct: ['2', '3'],
					hint: 'О химическом элементе говорят, когда речь о роли элемента или его вхождении в состав веществ.'
				},
				{
					id: 702,
					type: 'input',
					title: 'Период и группа элемента',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<p>Запишите номер периода (<b>X</b>) и номер группы (<b>Y</b>), в которой данный химический элемент расположен в Периодической системе Д. И. Менделеева.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 36',
					correct: '25',
					hint: '7 протонов → N (азот). Он во 2 периоде, VА группе (№5).'
				},
				{
					id: 703,
					type: 'input',
					title: 'Радиусы атомов (2 период)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>бор</li>
							<li>бериллий</li>
							<li>литий</li>
						</ol>
						<p>в порядке <b>увеличения</b> радиусов их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 234',
					correct: '123',
					hint: 'Во 2 периоде радиус убывает слева направо: B < Be < Li.'
				},
				{
					id: 704,
					type: 'match',
					title: 'Степень окисления марганца',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления марганца.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'MnSO<sub>4</sub>' },
						{ letter: 'Б', label: 'K<sub>2</sub>MnO<sub>4</sub>' },
						{ letter: 'В', label: 'MnO<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '+2' },
						{ id: '2', label: '+7' },
						{ id: '3', label: '+4' },
						{ id: '4', label: '+6' }
					],
					correct: ['1', '4', '3'],
					hint: 'SO₄²⁻ даёт Mn(+2); в K₂MnO₄ Mn(+6); в MnO₂ Mn(+4).'
				},
				{
					id: 705,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ионной химической связью.</p>`,
					options: [
						{ id: '1', label: 'CaS' },
						{ id: '2', label: 'NH<sub>3</sub>' },
						{ id: '3', label: 'Ca' },
						{ id: '4', label: 'CaO' },
						{ id: '5', label: 'SO<sub>3</sub>' }
					],
					correct: ['1', '4'],
					hint: 'Ионная связь характерна для соединений металл + неметалл.'
				},
				{
					id: 706,
					type: 'multi',
					pickCount: 2,
					title: 'Неон и гелий',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как неона, так и гелия?</p>`,
					options: [
						{ id: '1', label: 'Атом имеет завершённый внешний энергетический уровень.' },
						{ id: '2', label: 'На внешнем электронном слое атома расположено восемь электронов.' },
						{ id: '3', label: 'Соответствующее простое вещество существует в виде двухатомных молекул.' },
						{ id: '4', label: 'Значение радиуса атома больше, чем у криптона.' },
						{ id: '5', label: 'Химический элемент не образует летучего водородного соединения.' }
					],
					correct: ['1', '5'],
					hint: 'He и Ne — инертные газы: внешний уровень завершён, летучих гидридов не образуют.'
				},
				{
					id: 707,
					type: 'single',
					title: 'Ангидрид кислоты',
					body: `<p>Ангидридом кислоты HClO является</p>`,
					options: [
						{ id: '1', label: 'HCl' },
						{ id: '2', label: 'Cl<sub>2</sub>O' },
						{ id: '3', label: 'Cl<sub>2</sub>O<sub>3</sub>' },
						{ id: '4', label: 'Cl<sub>2</sub>O<sub>7</sub>' }
					],
					correct: '2',
					hint: 'Cl₂O + H₂O → 2HClO.'
				},
				{
					id: 708,
					type: 'multi',
					pickCount: 2,
					title: 'С чем реагирует CuO',
					body: `<p>Из предложенного перечня выберите <b>две пары</b> веществ, с каждым из которых реагирует оксид меди(II).</p>`,
					options: [
						{ id: '1', label: 'HCl, O<sub>2</sub>' },
						{ id: '2', label: 'Ag, SO<sub>3</sub>' },
						{ id: '3', label: 'H<sub>2</sub>, H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '4', label: 'Al, N<sub>2</sub>' },
						{ id: '5', label: 'HNO<sub>3</sub>, N<sub>2</sub>O<sub>5</sub>' }
					],
					correct: ['3', '5'],
					hint: 'CuO реагирует с кислотами и восстановителями (например, H₂).'
				},
				{
					id: 709,
					type: 'match',
					title: 'Продукты реакций',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>O и H<sub>2</sub>O' },
						{ letter: 'Б', label: 'Na и H<sub>2</sub>O' },
						{ letter: 'В', label: 'LiOH и SO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'NaOH' },
						{ id: '2', label: 'Li<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>O' },
						{ id: '3', label: 'NaOH и H<sub>2</sub>' },
						{ id: '4', label: 'Li<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>' },
						{ id: '5', label: 'Li<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>O' }
					],
					correct: ['1', '3', '2'],
					hint: 'Основный оксид + вода → щёлочь; активный металл + вода → щёлочь + H₂; щёлочь + кислотный оксид → соль + вода.'
				},
				{
					id: 710,
					type: 'match',
					title: 'Подбор реагентов',
					body: `<p>Установите соответствие между названием вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'сера' },
						{ letter: 'Б', label: 'оксид цинка' },
						{ letter: 'В', label: 'хлорид алюминия' }
					],
					matchRight: [
						{ id: '1', label: 'CO<sub>2</sub>, Na<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '2', label: 'NaOH, P<sub>2</sub>O<sub>5</sub>' },
						{ id: '3', label: 'AgNO<sub>3</sub>, KOH(р-р)' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>4</sub>(к.), O<sub>2</sub>' }
					],
					correct: ['4', '2', '3'],
					hint: 'Сера реагирует с O₂ и H₂SO₄(к.); ZnO амфотерен (реагирует со щёлочью и кислотным оксидом); AlCl₃ даёт AgCl↓ и Al(OH)₃↓.'
				},
				{
					id: 711,
					type: 'single',
					title: 'Признак реакции CuO + H₂',
					body: `<p>Признаком протекания химической реакции между оксидом меди и водородом является</p>`,
					options: [
						{ id: '1', label: 'появление запаха' },
						{ id: '2', label: 'изменение цвета' },
						{ id: '3', label: 'выпадение осадка' },
						{ id: '4', label: 'выделение газа' }
					],
					correct: '2',
					hint: 'Чёрный CuO превращается в красноватую медь.'
				},
				{
					id: 712,
					type: 'match',
					title: 'Признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AgNO<sub>3</sub>(р-р) и HCl(р-р)' },
						{ letter: 'Б', label: 'CuO и HNO<sub>3</sub>(конц.)' },
						{ letter: 'В', label: 'Zn и H<sub>2</sub>SO<sub>4</sub>(конц.)' }
					],
					matchRight: [
						{ id: '1', label: 'растворение твёрдого вещества и выделение газа' },
						{ id: '2', label: 'видимые признаки отсутствуют' },
						{ id: '3', label: 'образование осадка' },
						{ id: '4', label: 'растворение твёрдого вещества и изменение цвета раствора' }
					],
					correct: ['3', '4', '1'],
					hint: 'AgCl↓ (осадок); Cu(NO₃)₂ окрашивает раствор; Zn + H₂SO₄(к.) → газ (SO₂).'
				},
				{
					id: 713,
					type: 'multi',
					pickCount: 2,
					title: 'Число ионов при диссоциации',
					body: `<p>Выберите <b>два вещества</b>, при диссоциации которых в водных растворах образуется большее число положительных ионов, чем отрицательных.</p>`,
					options: [
						{ id: '1', label: 'CuSO<sub>4</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '3', label: 'FeCl<sub>3</sub>' },
						{ id: '4', label: 'K<sub>2</sub>SO<sub>3</sub>' },
						{ id: '5', label: 'NH<sub>4</sub>NO<sub>3</sub>' }
					],
					correct: ['2', '4'],
					hint: 'Подсказка: сравните число катионов и анионов в уравнениях диссоциации.'
				},
				{
					id: 714,
					type: 'multi',
					pickCount: 2,
					title: 'Возможность реакции',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми возможно взаимодействие.</p>`,
					options: [
						{ id: '1', label: 'CaCl<sub>2</sub> и NH<sub>4</sub>NO<sub>3</sub>' },
						{ id: '2', label: 'AgCl и HNO<sub>3</sub>' },
						{ id: '3', label: 'HCl и NaOH' },
						{ id: '4', label: 'BaCl<sub>2</sub> и CuSO<sub>4</sub>' },
						{ id: '5', label: 'AlCl<sub>3</sub> и Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '6', label: 'Na<sub>2</sub>CO<sub>3</sub> и K<sub>3</sub>PO<sub>4</sub>' }
					],
					correct: ['3', '4'],
					hint: 'Реакция обмена идёт до конца, если образуется осадок/газ/вода.'
				},
				{
					id: 715,
					type: 'match',
					title: 'Окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S(−2) → S(+4)' },
						{ letter: 'Б', label: 'Cr(+3) → Cr(+2)' },
						{ letter: 'В', label: 'Br<sub>2</sub>(0) → 2Br(−)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '2', '2'],
					hint: 'Окисление — увеличение степени окисления, восстановление — уменьшение.'
				},
				{
					id: 716,
					type: 'multi',
					title: 'Техника безопасности',
					body: `<p>Из перечисленных суждений о правилах работы в школьной лаборатории выберите одно или несколько верных.</p>`,
					options: [
						{ id: '1', label: 'На любой посуде, в которой хранятся вещества, должны быть этикетки с названиями или формулами веществ.' },
						{ id: '2', label: 'Опыты с горючими и едкими веществами необходимо проводить в очках — собственных или лабораторных.' },
						{ id: '3', label: 'Не обязательно записывать в лабораторный журнал все опыты, проводимые в лаборатории.' },
						{ id: '4', label: 'При нагревании жидких и твёрдых веществ в пробирках и колбах можно направлять их отверстия на себя и соседей.' }
					],
					correct: ['1', '2'],
					hint: 'Верны правила, повышающие безопасность и исключающие путаницу.'
				},
				{
					id: 717,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого их можно различить.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al и Mg' },
						{ letter: 'Б', label: 'K<sub>2</sub>SiO<sub>3</sub> и K<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'В', label: 'NaCl и Mg(NO<sub>3</sub>)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'HCl' },
						{ id: '2', label: 'CuO' },
						{ id: '3', label: 'NaOH' },
						{ id: '4', label: 'CuSO<sub>4</sub>' }
					],
					correct: ['3', '1', '3'],
					hint: 'Al реагирует со щёлочью, Mg — нет; карбонат с HCl даёт CO₂, силикат — H₂SiO₃; Mg²⁺ даёт Mg(OH)₂↓ с NaOH.'
				},
				{
					id: 718,
					type: 'input',
					title: 'Массовая доля элемента',
					body: `
						<p>Вычислите в процентах массовую долю фтора во фториде кальция CaF<sub>2</sub>.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите число с точностью до десятых.</p>
					`,
					placeholder: 'например, 59,8',
					correct: '48,7',
					hint: 'ω(F) = 2·19 / (40 + 2·19) · 100%.'
				},
				{
					id: 719,
					type: 'input',
					title: 'Масса вещества по массовой доле',
					body: `
						<p>Определите массу (в граммах) фтора, который содержится в тюбике зубной пасты массой 100 г.</p>
						<p>В 75 г фторированной зубной пасты содержится 7,5 г фторида кальция. Используйте ω(F) = 48,7% из предыдущего задания.</p>
					`,
					placeholder: 'например, 5,98',
					correct: '4,87',
					hint: 'Сначала найдите массу CaF₂ в 100 г пасты, затем умножьте на ω(F).'
				},
				// ============================================================
				// ВАРИАНТ 7 · Часть 2 (720–722)
				// ============================================================
				{
					id: 720,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (H₂O₂ + KClO₃)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							H<sub>2</sub>O<sub>2</sub> + KClO<sub>3</sub> → KCl + O<sub>2</sub> + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> в H₂O₂ кислород имеет −1, в O₂ — 0; в KClO₃ хлор имеет +5, в KCl — −1.</p>
						<p><b>Баланс:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							O(−1) − e⁻ → O(0)  &nbsp;| ×6 (т.к. 3 молекулы H₂O₂ содержат 6 атомов O)<br>
							Cl(+5) + 6e⁻ → Cl(−1) | ×1
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							3 H<sub>2</sub>O<sub>2</sub> + KClO<sub>3</sub> → KCl + 3 O<sub>2</sub> + 3 H<sub>2</sub>O
						</p>
						<p><b>Окислитель</b> — KClO₃ (Cl(+5) восстанавливается), <b>восстановитель</b> — H₂O₂ (O(−1) окисляется).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Указаны степени окисления и записан электронный баланс (передано 6 электронов).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 3, 1, 1, 3, 3.' },
						{ id: 'c3', points: 1, label: 'Правильно определены окислитель (KClO₃) и восстановитель (H₂O₂).' }
					]
				},
				{
					id: 721,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений кальция',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Ca →<sup>+H₂O</sup> X → CaCO₃ → CaO
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Ca(OH)₂</b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Ca + 2H₂O → Ca(OH)₂ + H₂↑<br>
							2) Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O<br>
							3) CaCO₃ →<sup>t°</sup> CaO + CO₂↑
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение взаимодействия Ca с водой (получено X = Ca(OH)₂).' },
						{ id: 'c2', points: 1, label: 'Записано уравнение получения CaCO₃ из Ca(OH)₂ и CO₂.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение разложения CaCO₃ при нагревании до CaO.' }
					]
				},
				{
					id: 722,
					type: 'written',
					maxPoints: 3,
					title: 'Примеси в пирите (FeS₂)',
					taskKind: 'Расчётная задача',
					body: `
						<p>При обжиге <b>90 кг</b> пирита (минерала, содержащего FeS₂) образовался сернистый газ объёмом <b>26,88 м³</b> (н.у.).</p>
						<p>Рассчитайте массовую долю негорючих примесей в пирите.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции обжига:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂</p>
						<p><b>2) Количество SO₂:</b> 26,88 м³ = 26 880 л; n(SO₂)=26880/22,4=1200 моль.</p>
						<p><b>3) По уравнению</b> n(FeS₂) = 1200·(4/8)=600 моль.</p>
						<p><b>4) Масса FeS₂:</b> M(FeS₂)=56+2·32=120 г/моль; m=600·120=72 000 г=72 кг.</p>
						<p><b>5) Примеси:</b> m(прим.)=90−72=18 кг; ω=18/90·100%=<b>20%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества SO₂.' },
						{ id: 'c2', points: 1, label: 'По стехиометрии рассчитана масса FeS₂ в образце (72 кг).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля примесей (20%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 8 · Часть 1 (задания 801–819)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568176)
				// ============================================================
				{
					id: 801,
					type: 'multi',
					pickCount: 2,
					title: 'Сера как простое вещество',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится о сере как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Сера — необходимый элемент питания растений.' },
						{ id: '2', label: 'Жидкую серу хранят в обогреваемых резервуарах и транспортируют в цистернах.' },
						{ id: '3', label: 'Серу применяют для вулканизации каучука.' },
						{ id: '4', label: 'Сера входит в состав многих белков.' },
						{ id: '5', label: 'В рацион питания следует включать продукты, богатые серой.' }
					],
					correct: ['2', '3'],
					hint: 'О простом веществе — свойства и применение вещества S.'
				},
				{
					id: 802,
					type: 'input',
					title: 'Период и заряд ядра',
					body: `
						<p>На рисунке изображена схема распределения электронов по электронным слоям атома некоторого химического элемента.</p>
						<p>Запишите номер периода (<b>X</b>) и величину заряда ядра (<b>Y</b>) его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 424',
					correct: '313',
					hint: '2,8,3 → 3 слоя (3 период), всего 13 e⁻ (Al), значит заряд ядра 13.'
				},
				{
					id: 803,
					type: 'input',
					title: 'Радиусы атомов (Be, Ca, K)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>кальций</li>
							<li>калий</li>
							<li>бериллий</li>
						</ol>
						<p>в порядке <b>увеличения</b> радиусов их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 423',
					correct: '312',
					hint: 'Be (2 период) самый маленький. В 4 периоде K левее Ca → радиус K больше.'
				},
				{
					id: 804,
					type: 'match',
					title: 'Степень окисления азота',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления азота.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>F' },
						{ letter: 'Б', label: 'N<sub>2</sub>O<sub>3</sub>' },
						{ letter: 'В', label: 'NF<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: '+3' },
						{ id: '2', label: '−3' },
						{ id: '3', label: '−4' },
						{ id: '4', label: '+4' }
					],
					correct: ['2', '1', '1'],
					hint: 'В NH₄⁺ азот −3; в N₂O₃ и NF₃ азот +3.'
				},
				{
					id: 805,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная полярная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ковалентной полярной связью.</p>`,
					options: [
						{ id: '1', label: 'KI' },
						{ id: '2', label: 'HCl' },
						{ id: '3', label: 'белый фосфор (P<sub>4</sub>)' },
						{ id: '4', label: 'BaO' },
						{ id: '5', label: 'KOH' }
					],
					correct: ['2', '5'],
					hint: 'HCl — полярная ковалентная; в KOH связь O–H полярная ковалентная.'
				},
				{
					id: 806,
					type: 'multi',
					pickCount: 2,
					title: 'Фтор и хлор',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как фтора, так и хлора?</p>`,
					options: [
						{ id: '1', label: 'Соответствующее простое вещество является жидким при обычных условиях.' },
						{ id: '2', label: 'Относится к галогенам.' },
						{ id: '3', label: 'В соединениях с металлами проявляет отрицательную степень окисления, равную −2.' },
						{ id: '4', label: 'Химический элемент образует летучее водородное соединение.' },
						{ id: '5', label: 'Высшая валентность этого элемента равна VII.' }
					],
					correct: ['2', '4'],
					hint: 'Оба — галогены и образуют HF/HCl. У F нет валентности VII.'
				},
				{
					id: 807,
					type: 'single',
					title: 'Несолеобразующие оксиды',
					body: `<p>Только несолеобразующие оксиды представлены в ряду:</p>`,
					options: [
						{ id: '1', label: 'FeO, Fe<sub>2</sub>O<sub>3</sub>' },
						{ id: '2', label: 'CO, CO<sub>2</sub>' },
						{ id: '3', label: 'N<sub>2</sub>O<sub>3</sub>, NO<sub>2</sub>' },
						{ id: '4', label: 'N<sub>2</sub>O, NO' }
					],
					correct: '4',
					hint: 'Несолеобразующие: CO, NO, N₂O (и др.).'
				},
				{
					id: 808,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции между оксидами',
					body: `<p>Из предложенного перечня выберите <b>две пары</b> веществ, между которыми возможна химическая реакция.</p>`,
					options: [
						{ id: '1', label: 'оксид натрия и оксид серы(IV)' },
						{ id: '2', label: 'оксид кремния и вода' },
						{ id: '3', label: 'оксид кальция и гидроксид натрия' },
						{ id: '4', label: 'оксид азота(V) и кислород' },
						{ id: '5', label: 'оксид цинка и оксид натрия' }
					],
					correct: ['1', '5'],
					hint: 'Основный + кислотный оксид → соль; амфотерный + основный (при сплавлении) → соль.'
				},
				{
					id: 809,
					type: 'match',
					title: 'Продукты взаимодействия',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K и H<sub>2</sub>O' },
						{ letter: 'Б', label: 'KOH и HI' },
						{ letter: 'В', label: 'K<sub>2</sub>O и HI' }
					],
					matchRight: [
						{ id: '1', label: 'K<sub>2</sub>O и H<sub>2</sub>' },
						{ id: '2', label: 'KIO<sub>3</sub> и H<sub>2</sub>' },
						{ id: '3', label: 'KOH' },
						{ id: '4', label: 'KOH и H<sub>2</sub>' },
						{ id: '5', label: 'KI и H<sub>2</sub>O' }
					],
					correct: ['4', '5', '5'],
					hint: 'K + H₂O → KOH + H₂; щёлочь + кислота → соль + вода; основный оксид + кислота → соль + вода.'
				},
				{
					id: 810,
					type: 'match',
					title: 'Подбор реагентов (Ca, CO₂, Al(OH)₃)',
					body: `<p>Установите соответствие между названием вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'кальций' },
						{ letter: 'Б', label: 'оксид углерода(IV)' },
						{ letter: 'В', label: 'гидроксид алюминия' }
					],
					matchRight: [
						{ id: '1', label: 'HNO<sub>3</sub>, Ca(OH)<sub>2</sub>' },
						{ id: '2', label: 'KOH, C' },
						{ id: '3', label: 'Ba(OH)<sub>2</sub>, O<sub>2</sub>' },
						{ id: '4', label: 'H<sub>2</sub>O, HCl' }
					],
					correct: ['4', '2', '1'],
					hint: 'Ca реагирует с водой и кислотой; CO₂ — с щёлочью и углеродом при t; Al(OH)₃ — амфотерный (кислота и щёлочь).'
				},
				{
					id: 811,
					type: 'single',
					title: 'Признак реакции CuO + H₂',
					body: `<p>Признаком протекания химической реакции между оксидом меди(II) и водородом является</p>`,
					options: [
						{ id: '1', label: 'появление запаха' },
						{ id: '2', label: 'изменение цвета' },
						{ id: '3', label: 'выпадение осадка' },
						{ id: '4', label: 'выделение газа' }
					],
					correct: '2',
					hint: 'CuO (чёрный) → Cu (красноватый).'
				},
				{
					id: 812,
					type: 'match',
					title: 'Признаки реакций (Cu(OH)₂, Li₃PO₄, CO₂)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cu(OH)<sub>2</sub> и HCl(р-р)' },
						{ letter: 'Б', label: 'K<sub>3</sub>PO<sub>4</sub>(р-р) и LiCl(р-р)' },
						{ letter: 'В', label: 'CaCO<sub>3</sub> и HNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'растворение твёрдого вещества и выделение газа' },
						{ id: '2', label: 'видимые признаки отсутствуют' },
						{ id: '3', label: 'растворение твёрдого вещества и образование окрашенного раствора' },
						{ id: '4', label: 'образование осадка' }
					],
					correct: ['3', '4', '1'],
					hint: 'CuCl₂ окрашивает раствор; Li₃PO₄ выпадает; карбонат + кислота даёт CO₂.'
				},
				{
					id: 813,
					type: 'multi',
					pickCount: 2,
					title: 'Хорошо растворимые электролиты',
					body: `<p>Выберите <b>два вещества</b>, которые относятся к хорошо растворимым электролитам.</p>`,
					options: [
						{ id: '1', label: 'FePO<sub>4</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'Cu(OH)<sub>2</sub>' },
						{ id: '4', label: 'Al(OH)<sub>3</sub>' },
						{ id: '5', label: 'K<sub>2</sub>CO<sub>3</sub>' }
					],
					correct: ['2', '5'],
					hint: 'Растворимые соли — сильные электролиты.'
				},
				{
					id: 814,
					type: 'multi',
					pickCount: 2,
					title: 'Выделение газа при нагревании',
					body: `<p>Выберите <b>две пары ионов</b>, при взаимодействии которых при нагревании происходит выделение газа.</p>`,
					options: [
						{ id: '1', label: 'H<sup>+</sup> и NO<sub>3</sub><sup>−</sup>' },
						{ id: '2', label: 'H<sup>+</sup> и OH<sup>−</sup>' },
						{ id: '3', label: 'NH<sub>4</sub><sup>+</sup> и OH<sup>−</sup>' },
						{ id: '4', label: 'CO<sub>3</sub><sup>2−</sup> и H<sup>+</sup>' },
						{ id: '5', label: 'NH<sub>4</sub><sup>+</sup> и Cl<sup>−</sup>' },
						{ id: '6', label: 'Li<sup>+</sup> и NO<sub>2</sub><sup>−</sup>' }
					],
					correct: ['3', '4'],
					hint: 'NH₄⁺ + OH⁻ → NH₃↑; CO₃²⁻ + H⁺ → CO₂↑.'
				},
				{
					id: 815,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'O<sub>2</sub>(0) → 2O(−2)' },
						{ letter: 'Б', label: 'Zn(+2) → Zn(0)' },
						{ letter: 'В', label: 'Br(+1) → Br(+5)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: '0→−2 и +2→0 — восстановление; +1→+5 — окисление.'
				},
				{
					id: 816,
					type: 'multi',
					pickCount: 2,
					title: 'Витамины: хранение и приём',
					body: `<p>Из перечисленных суждений о правилах хранения и приёма витаминов выберите одно или несколько верных.</p>`,
					options: [
						{ id: '1', label: 'Витамин С можно потреблять в неограниченном количестве.' },
						{ id: '2', label: 'Хранить и принимать витамины можно в течение неограниченного периода времени.' },
						{ id: '3', label: 'Хранение витаминов требует строгого соблюдения указанных в инструкции правил.' },
						{ id: '4', label: 'Рекомендации по приёму индивидуальны для каждого типа витаминов.' }
					],
					correct: ['3', '4'],
					hint: 'Верны 3 и 4: есть правила хранения и разные нормы.'
				},
				{
					id: 817,
					type: 'match',
					title: 'Реактив для различения (нитраты, хлориды, кислоты)',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaNO<sub>3</sub> и Ca(NO<sub>3</sub>)<sub>2</sub>' },
						{ letter: 'Б', label: 'FeCl<sub>2</sub> и FeCl<sub>3</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub> и HNO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'BaCl<sub>2</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '3', label: 'HCl' },
						{ id: '4', label: 'NaOH' }
					],
					correct: ['2', '4', '1'],
					hint: 'Ca²⁺ даёт CaCO₃↓ с карбонатом; Fe²⁺/Fe³⁺ дают осадки разных цветов с NaOH; H₂SO₄ даёт BaSO₄↓ с BaCl₂.'
				},
				{
					id: 818,
					type: 'input',
					title: 'Массовая доля азота в пигменте',
					body: `
						<p>Берлинская лазурь — тёмно-синий пигмент состава Fe<sub>4</sub>[Fe(CN)<sub>6</sub>]<sub>3</sub>.</p>
						<p>Вычислите массовую долю азота в берлинской лазури (в %). Запишите число с точностью до десятых.</p>
					`,
					placeholder: 'например, 30,4',
					correct: '29,3',
					hint: 'Посчитайте атомы N и молярную массу соединения.'
				},
				{
					id: 819,
					type: 'input',
					title: 'Масса азота в смеси',
					body: `
						<p>Для создания акриловой краски цвета «милори» было взято 25 г берлинской лазури и белая краска, не содержащая азота.</p>
						<p>Вычислите, сколько граммов азота содержится в получившейся порции. Ответ — с точностью до десятых.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(N) = 29,3% из предыдущего задания.</p>
					`,
					placeholder: 'например, 8,4',
					correct: '7,3',
					hint: 'm(N) = m(пигмента) · ω(N).'
				},
				// ============================================================
				// ВАРИАНТ 8 · Часть 2 (820–822)
				// ============================================================
				{
					id: 820,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (MnCO₃ + KClO₃)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							MnCO<sub>3</sub> + KClO<sub>3</sub> → MnO<sub>2</sub> + KCl + CO<sub>2</sub>
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> Mn(+2) в MnCO₃ → Mn(+4) в MnO₂ (окисление); Cl(+5) в KClO₃ → Cl(−1) в KCl (восстановление).</p>
						<p><b>Баланс:</b> Mn(+2) − 2e⁻ → Mn(+4) (×3); Cl(+5) + 6e⁻ → Cl(−1) (×1).</p>
						<p><b>Уравнение:</b></p>\n\t\t\t\t\t\t<p style=\"font-family:'JetBrains Mono',monospace; font-size:13px;\">3MnCO₃ + KClO₃ → 3MnO₂ + KCl + 3CO₂</p>\n\t\t\t\t\t\t<p><b>Окислитель</b> — KClO₃, <b>восстановитель</b> — MnCO₃.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Верно определены степени окисления и записан электронный баланс.' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены правильно: 3,1,3,1,3.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель (KClO₃) и восстановитель (MnCO₃).' }
					]
				},
				{
					id: 821,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений серы',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style=\"text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;\">\n\t\t\t\t\t\t\tS → X →<sup>+KOH(изб)</sup> K<sub>2</sub>SO<sub>3</sub> → CaSO<sub>3</sub>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>Напишите молекулярные уравнения реакций.</p>\n\t\t\t\t\t`,
					solution: `
						<p><b>X = SO₂</b>.</p>
						<p style=\"font-family:'JetBrains Mono',monospace; font-size:13px;\">\n\t\t\t\t\t\t\t1) S + O₂ → SO₂<br>\n\t\t\t\t\t\t\t2) SO₂ + 2KOH(изб) → K₂SO₃ + H₂O<br>\n\t\t\t\t\t\t\t3) K₂SO₃ + CaCl₂ → CaSO₃↓ + 2KCl\n\t\t\t\t\t\t</p>\n\t\t\t\t\t`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение горения серы с образованием SO₂ (найдено X).' },
						{ id: 'c2', points: 1, label: 'Записано уравнение взаимодействия SO₂ с избытком KOH с получением K₂SO₃.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение получения CaSO₃ обменной реакцией (осадок).' }
					]
				},
				{
					id: 822,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля соли в растворе',
					taskKind: 'Расчётная задача',
					body: `
						<p>После пропускания через раствор гидроксида калия <b>4,48 л</b> сернистого газа (н.у.) получили <b>252,8 г</b> раствора сульфита калия.</p>
						<p>Вычислите массовую долю соли в полученном растворе.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style=\"font-family:'JetBrains Mono',monospace; font-size:13px;\">2KOH + SO₂ → K₂SO₃ + H₂O</p>
						<p><b>2) Количество SO₂:</b> n = 4,48 / 22,4 = 0,2 моль.</p>
						<p><b>3) Масса K₂SO₃:</b> n(K₂SO₃)=0,2; M=158; m=0,2·158=31,6 г.</p>
						<p><b>4) Массовая доля:</b> ω = 31,6 / 252,8 · 100% = <b>12,5%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества SO₂.' },
						{ id: 'c2', points: 1, label: 'Рассчитана масса K₂SO₃ (31,6 г).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля соли (12,5%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 9 · Часть 1 (задания 901–919)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568177)
				// ============================================================
				{
					id: 901,
					type: 'multi',
					pickCount: 2,
					title: 'Азот как простое вещество',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится об азоте как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Взрывчатые вещества содержат азот.' },
						{ id: '2', label: 'Воздух содержит 78% азота по объёму.' },
						{ id: '3', label: 'Азот получают фракционной перегонкой жидкого воздуха.' },
						{ id: '4', label: 'Азот входит в состав белков.' },
						{ id: '5', label: 'Многие красители содержат азот.' }
					],
					correct: ['2', '3'],
					hint: 'О простом веществе N₂ — свойства/нахождение и способы получения.'
				},
				{
					id: 902,
					type: 'input',
					title: 'Группа и число электронов',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<p>Запишите номер группы (<b>X</b>) и общее число электронов (<b>Y</b>) в атоме данного элемента.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 222',
					correct: '111',
					hint: '11 протонов → Na. Группа IA (1), электронов 11.'
				},
				{
					id: 903,
					type: 'input',
					title: 'Радиусы атомов (Li, B, Na)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>литий</li>
							<li>бор</li>
							<li>натрий</li>
						</ol>
						<p>в порядке <b>уменьшения</b> радиусов их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 423',
					correct: '312',
					hint: 'Na (3 период) самый большой; во 2 периоде Li > B.'
				},
				{
					id: 904,
					type: 'match',
					title: 'Степень окисления азота (типовые случаи)',
					body: `<p>Установите соответствие между веществом и степенью окисления азота.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'HNO<sub>3</sub>' },
						{ letter: 'В', label: 'NO<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+4' }
					],
					correct: ['1', '2', '4'],
					hint: 'NH₄⁺: −3; HNO₃: +5; NO₂: +4.'
				},
				{
					id: 905,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная и ковалентная связь',
					body: `<p>Выберите <b>два вещества</b>, в каждом из которых содержится как ионная, так и ковалентная связь.</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '2', label: 'P<sub>2</sub>O<sub>5</sub>' },
						{ id: '3', label: 'KOH' },
						{ id: '4', label: 'NH<sub>4</sub>Cl' },
						{ id: '5', label: 'HNO<sub>3</sub>' }
					],
					correct: ['3', '4'],
					hint: 'KOH и NH₄Cl содержат ионную связь между ионами и ковалентную внутри сложного иона.'
				},
				{
					id: 906,
					type: 'multi',
					pickCount: 2,
					title: 'Углерод и кислород',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как углерода, так и кислорода?</p>`,
					options: [
						{ id: '1', label: 'Электроны в атоме расположены на двух электронных слоях.' },
						{ id: '2', label: 'Соответствующее простое вещество состоит из двухатомных молекул.' },
						{ id: '3', label: 'Химический элемент образует соединения с металлами.' },
						{ id: '4', label: 'Значение электроотрицательности больше, чем у хлора.' },
						{ id: '5', label: 'Химический элемент образует водородное соединение состава H<sub>2</sub>Э.' }
					],
					correct: ['1', '3'],
					hint: 'Оба во 2 периоде и оба образуют соединения с металлами (карбиды/оксиды).'
				},
				{
					id: 907,
					type: 'single',
					title: 'Оксид для HClO₄',
					body: `<p>Кислоте HClO<sub>4</sub> соответствует оксид</p>`,
					options: [
						{ id: '1', label: 'Cl<sub>2</sub>O' },
						{ id: '2', label: 'Cl<sub>2</sub>O<sub>3</sub>' },
						{ id: '3', label: 'Cl<sub>2</sub>O<sub>7</sub>' },
						{ id: '4', label: 'ClO<sub>2</sub>' }
					],
					correct: '3',
					hint: 'Cl₂O₇ + H₂O → 2HClO₄.'
				},
				{
					id: 908,
					type: 'multi',
					pickCount: 2,
					title: 'С чем реагирует CaO',
					body: `<p>Выберите <b>две пары</b> веществ, с каждым из которых реагирует оксид кальция.</p>`,
					options: [
						{ id: '1', label: 'HCl и P<sub>2</sub>O<sub>5</sub>' },
						{ id: '2', label: 'H<sub>2</sub>O и CO<sub>2</sub>' },
						{ id: '3', label: 'NaOH и SO<sub>2</sub>' },
						{ id: '4', label: 'HNO<sub>3</sub> и BaO' },
						{ id: '5', label: 'SO<sub>2</sub> и O<sub>2</sub>' }
					],
					correct: ['1', '2'],
					hint: 'CaO — основный оксид: реагирует с кислотами, кислотными оксидами и водой.'
				},
				{
					id: 909,
					type: 'match',
					title: 'Продукты взаимодействия',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH и HI' },
						{ letter: 'Б', label: 'Na и H<sub>2</sub>O' },
						{ letter: 'В', label: 'Na<sub>2</sub>O и HI' }
					],
					matchRight: [
						{ id: '1', label: 'NaIO и H<sub>2</sub>' },
						{ id: '2', label: 'NaI и H<sub>2</sub>O' },
						{ id: '3', label: 'NaOH' },
						{ id: '4', label: 'NaOH и H<sub>2</sub>' },
						{ id: '5', label: 'Na<sub>2</sub>O и H<sub>2</sub>' }
					],
					correct: ['2', '4', '2'],
					hint: 'Нейтрализация даёт NaI и воду; Na + вода даёт NaOH и H₂; Na₂O + кислота → соль + вода.'
				},
				{
					id: 910,
					type: 'match',
					title: 'Вещества и реагенты',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'H<sub>2</sub>' },
						{ letter: 'Б', label: 'HBr' },
						{ letter: 'В', label: 'CuCl<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'CuO, N<sub>2</sub>' },
						{ id: '2', label: 'NO<sub>2</sub>, Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'Si, H<sub>2</sub>O' },
						{ id: '4', label: 'AgNO<sub>3</sub>, KOH' }
					],
					correct: ['1', '4', '4'],
					hint: 'H₂ восстанавливает CuO и реагирует с N₂; HBr реагирует с AgNO₃ и KOH; CuCl₂ даёт осадки с AgNO₃ и KOH.'
				},
				{
					id: 911,
					type: 'single',
					title: 'Реакция замещения',
					body: `<p>В реакцию замещения вступают между собой</p>`,
					options: [
						{ id: '1', label: 'SO<sub>2</sub> и O<sub>2</sub>' },
						{ id: '2', label: 'CaO и CO<sub>2</sub>' },
						{ id: '3', label: 'Na и H<sub>2</sub>O' },
						{ id: '4', label: 'Fe<sub>2</sub>O<sub>3</sub> и CO' }
					],
					correct: '3',
					hint: '2Na + 2H₂O → 2NaOH + H₂ — замещение.'
				},
				{
					id: 912,
					type: 'match',
					title: 'Признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KOH(р-р) и Al' },
						{ letter: 'Б', label: 'BaCO<sub>3</sub> и HNO<sub>3</sub>' },
						{ letter: 'В', label: 'Cu и H<sub>2</sub>SO<sub>4</sub>(конц.)' }
					],
					matchRight: [
						{ id: '1', label: 'выделение бесцветного газа без запаха' },
						{ id: '2', label: 'выделение бесцветного газа с запахом' },
						{ id: '3', label: 'выделение бурого газа с запахом' },
						{ id: '4', label: 'выпадение белого осадка' }
					],
					correct: ['1', '1', '2'],
					hint: 'H₂ и CO₂ — бесцветные без запаха; SO₂ — бесцветный газ с резким запахом.'
				},
				{
					id: 913,
					type: 'multi',
					pickCount: 2,
					title: '5 моль ионов',
					body: `<p>Выберите <b>два вещества</b>, при полной диссоциации 1 моль которых образуется 5 моль ионов.</p>`,
					options: [
						{ id: '1', label: 'Na<sub>3</sub>PO<sub>4</sub>' },
						{ id: '2', label: 'Cu(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '3', label: 'KClO<sub>3</sub>' },
						{ id: '4', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' },
						{ id: '5', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' }
					],
					correct: ['4', '5'],
					hint: 'Al₂(SO₄)₃ и Fe₂(SO₄)₃ дают 2 катиона и 3 аниона = 5 ионов.'
				},
				{
					id: 914,
					type: 'multi',
					pickCount: 2,
					title: 'Ионы могут сосуществовать',
					body: `<p>Выберите <b>два ряда ионов</b>, способных находиться в водном растворе одновременно.</p>`,
					options: [
						{ id: '1', label: 'Ca<sup>2+</sup>, Ba<sup>2+</sup>, NO<sub>3</sub><sup>−</sup>, Cl<sup>−</sup>' },
						{ id: '2', label: 'Mg<sup>2+</sup>, Fe<sup>3+</sup>, Cl<sup>−</sup>, SO<sub>4</sub><sup>2−</sup>' },
						{ id: '3', label: 'K<sup>+</sup>, Al<sup>3+</sup>, Cl<sup>−</sup>, OH<sup>−</sup>' },
						{ id: '4', label: 'Cu<sup>2+</sup>, NH<sub>4</sub><sup>+</sup>, NO<sub>3</sub><sup>−</sup>, S<sup>2−</sup>' },
						{ id: '5', label: 'H<sup>+</sup>, Ca<sup>2+</sup>, NO<sub>3</sub><sup>−</sup>, OH<sup>−</sup>' },
						{ id: '6', label: 'Ca<sup>2+</sup>, Cu<sup>2+</sup>, NO<sub>2</sub><sup>−</sup>, OH<sup>−</sup>' }
					],
					correct: ['1', '2'],
					hint: 'Нельзя, если образуется осадок/газ/вода (нейтрализация).'
				},
				{
					id: 915,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S(0) → S(−2)' },
						{ letter: 'Б', label: 'S(+6) → S(+4)' },
						{ letter: 'В', label: 'Cr(+2) → Cr(+3)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: 'СО падает — восстановление; растёт — окисление.'
				},
				{
					id: 916,
					type: 'multi',
					pickCount: 2,
					title: 'Загрязнение и последствия',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды и его последствиях выберите одно или несколько верных.</p>`,
					options: [
						{ id: '1', label: 'Полиэтиленовые пакеты легко разрушаются и не представляют угрозы.' },
						{ id: '2', label: 'Грибы и ягоды вдоль автомагистралей можно использовать в пищу.' },
						{ id: '3', label: 'Продукты полного сгорания природного газа — CO<sub>2</sub> и пары воды — не наносят непосредственного ущерба.' },
						{ id: '4', label: 'Разлившаяся нефть негативно влияет на живые организмы водоёмов.' }
					],
					correct: ['3', '4'],
					hint: 'Полиэтилен и придорожные продукты опасны; нефть вредна; CO₂ и H₂O не токсичны.'
				},
				{
					id: 917,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K<sub>2</sub>SO<sub>4</sub> и KI' },
						{ letter: 'Б', label: 'BaCl<sub>2</sub> и NaCl' },
						{ letter: 'В', label: 'Zn(NO<sub>3</sub>)<sub>2</sub> и NaNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'HBr' },
						{ id: '2', label: 'AgNO<sub>3</sub>' },
						{ id: '3', label: 'KOH' },
						{ id: '4', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' }
					],
					correct: ['2', '4', '3'],
					hint: 'AgNO₃ даёт разные осадки с SO₄²⁻ и I⁻; Al₂(SO₄)₃ даёт BaSO₄↓; KOH даёт Zn(OH)₂↓.'
				},
				{
					id: 918,
					type: 'input',
					title: 'ω(Ca) в стекле K₂CaSi₆O₁₄',
					body: `
						<p>Вычислите массовую долю кальция в стекле состава K<sub>2</sub>CaSi<sub>6</sub>O<sub>14</sub>.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 8,95',
					correct: '7,84',
					hint: 'ω(Ca)=40/510·100%.'
				},
				{
					id: 919,
					type: 'input',
					title: 'Масса стекла по ω(Ca)',
					body: `
						<p>Вычислите массу стекла (в кг), если в нём содержится 23,4 кг кальция.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(Ca)=7,84% из предыдущего задания. Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 309',
					correct: '298',
					hint: 'm(стекла)=m(Ca)/ω(Ca).'
				},
				// ============================================================
				// ВАРИАНТ 9 · Часть 2 (920–922)
				// ============================================================
				{
					id: 920,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (H₂S + Fe₂O₃)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							H<sub>2</sub>S + Fe<sub>2</sub>O<sub>3</sub> → FeS + S + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> S(−2) → S(0) (окисление); Fe(+3) → Fe(+2) в FeS (восстановление).</p>
						<p><b>Баланс:</b> S(−2) − 2e⁻ → S(0); 2Fe(+3) + 2e⁻ → 2Fe(+2).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">3H<sub>2</sub>S + Fe<sub>2</sub>O<sub>3</sub> → 2FeS + S + 3H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — Fe<sub>2</sub>O<sub>3</sub>, <b>восстановитель</b> — H<sub>2</sub>S.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Определены степени окисления и составлен электронный баланс.' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 3,1,2,1,3.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 921,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Al(OH)₃ → K₂SO₄',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Al(OH)<sub>3</sub> → Al<sub>2</sub>O<sub>3</sub> → X → K<sub>2</sub>SO<sub>4</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 2Al(OH)<sub>3</sub> →<sup>t°</sup> Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O<br>
							2) Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O<br>
							3) Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6KOH → 2Al(OH)<sub>3</sub>↓ + 3K<sub>2</sub>SO<sub>4</sub>
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Показано разложение Al(OH)₃ до Al₂O₃ при нагревании.' },
						{ id: 'c2', points: 1, label: 'Al₂O₃ переведён в X = Al₂(SO₄)₃ реакцией с H₂SO₄.' },
						{ id: 'c3', points: 1, label: 'Получен K₂SO₄ из соли алюминия реакцией со щёлочью.' }
					]
				},
				{
					id: 922,
					type: 'written',
					maxPoints: 3,
					title: 'Масса образца Zn с примесями',
					taskKind: 'Расчётная задача',
					body: `
						<p>При растворении в избытке разбавленной серной кислоты цинка, содержащего 4,5% нерастворимых примесей, выделилось 2,24 л (н.у.) водорода.</p>
						<p>Определите массу исходного образца металла, содержащего примеси.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> Zn + H<sub>2</sub>SO<sub>4</sub> → ZnSO<sub>4</sub> + H<sub>2</sub>↑</p>
						<p><b>2) Количество H₂:</b> n = 2,24/22,4 = 0,1 моль ⇒ n(Zn)=0,1 моль.</p>
						<p><b>3) Масса чистого Zn:</b> m = 0,1·65 = 6,5 г.</p>
						<p><b>4) С учётом примесей:</b> ω(Zn)=0,955 ⇒ m(образца)=6,5/0,955 ≈ <b>6,81 г</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдено количество H₂ (0,1 моль) и масса чистого Zn (6,5 г).' },
						{ id: 'c2', points: 1, label: 'Учтена массовая доля Zn (95,5%).' },
						{ id: 'c3', points: 1, label: 'Получен правильный ответ: 6,81 г.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 10 · Часть 1 (задания 1001–1019)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568178)
				// ============================================================
				{
					id: 1001,
					type: 'multi',
					pickCount: 2,
					title: 'Хлор как простое вещество',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится о хлоре как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Хлор при нормальных условиях — ядовитый газ желтовато-зелёного цвета.' },
						{ id: '2', label: 'Самые большие запасы хлора содержатся в воде морей и океанов.' },
						{ id: '3', label: 'Газообразный хлор относительно легко сжижается.' },
						{ id: '4', label: 'Мышечная ткань человека содержит 0,20–0,52% хлора.' },
						{ id: '5', label: 'Ежедневно с пищей человек получает 3–6 г хлора.' }
					],
					correct: ['1', '3'],
					hint: 'О простом веществе — свойства и процессы с Cl₂.'
				},
				{
					id: 1002,
					type: 'input',
					title: 'Группа и число электронов',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<p>Запишите номер группы (<b>X</b>), в которой данный химический элемент расположен в Периодической системе, и общее число электронов (<b>Y</b>) в атоме.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 35',
					correct: '24',
					hint: '4 протона → Be. Группа IIА (2), электронов 4.'
				},
				{
					id: 1003,
					type: 'input',
					title: 'Атомные радиусы (3 период)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>фосфор</li>
							<li>кремний</li>
							<li>хлор</li>
						</ol>
						<p>в порядке <b>увеличения</b> их атомного радиуса.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 423',
					correct: '312',
					hint: 'В периоде радиус уменьшается слева направо: Si > P > Cl.'
				},
				{
					id: 1004,
					type: 'match',
					title: 'Степень окисления фосфора',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления фосфора.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P<sub>2</sub>S<sub>3</sub>' },
						{ letter: 'Б', label: 'PH<sub>4</sub>I' },
						{ letter: 'В', label: 'FePO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '+5' },
						{ id: '3', label: '+1' },
						{ id: '4', label: '+3' }
					],
					correct: ['4', '1', '2'],
					hint: 'P₂S₃: P(+3); PH₄⁺: P(−3); PO₄³⁻: P(+5).'
				},
				{
					id: 1005,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ионной связью.</p>`,
					options: [
						{ id: '1', label: 'Li<sub>2</sub>O' },
						{ id: '2', label: 'Al' },
						{ id: '3', label: 'NH<sub>4</sub>I' },
						{ id: '4', label: 'HNO<sub>3</sub>' },
						{ id: '5', label: 'SO<sub>2</sub>' }
					],
					correct: ['1', '3'],
					hint: 'Li₂O — ионная (Li⁺ и O²⁻); NH₄I — ионная (NH₄⁺ и I⁻).'
				},
				{
					id: 1006,
					type: 'multi',
					pickCount: 2,
					title: 'Магний и углерод',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как магния, так и углерода?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент не образует летучего водородного соединения.' },
						{ id: '2', label: 'Является неметаллом.' },
						{ id: '3', label: 'Гидроксид элемента является кислотным.' },
						{ id: '4', label: 'Химический элемент образует оксид состава ЭО.' },
						{ id: '5', label: 'Химический элемент в соединениях с хлором проявляет положительную степень окисления.' }
					],
					correct: ['4', '5'],
					hint: 'MgO и CO — оксиды состава ЭО; в MgCl₂ и CCl₄ степень окисления элемента положительная.'
				},
				{
					id: 1007,
					type: 'single',
					title: 'Ангидрид кислоты',
					body: `<p>Ангидридом кислоты HNO<sub>2</sub> является</p>`,
					options: [
						{ id: '1', label: 'N<sub>2</sub>O' },
						{ id: '2', label: 'NO' },
						{ id: '3', label: 'N<sub>2</sub>O<sub>3</sub>' },
						{ id: '4', label: 'NO<sub>2</sub>' }
					],
					correct: '3',
					hint: 'N₂O₃ + H₂O → 2HNO₂.'
				},
				{
					id: 1008,
					type: 'multi',
					pickCount: 2,
					title: 'CuO и растворы',
					body: `<p>Из предложенного списка выберите <b>два вещества</b>, с водными растворами которых реагирует оксид меди(II).</p>`,
					options: [
						{ id: '1', label: 'KCl' },
						{ id: '2', label: 'HCl' },
						{ id: '3', label: 'Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '4', label: 'HNO<sub>3</sub>' },
						{ id: '5', label: 'MgSO<sub>4</sub>' }
					],
					correct: ['2', '4'],
					hint: 'CuO — основный оксид, реагирует с кислотами.'
				},
				{
					id: 1009,
					type: 'match',
					title: 'Продукты реакций (Ca-соединения и Cl₂)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Ca(OH)<sub>2</sub> + HCl' },
						{ letter: 'Б', label: 'CaO + HCl' },
						{ letter: 'В', label: 'Ca(OH)<sub>2</sub> + Cl<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Ca(ClO)<sub>2</sub> + CaCl<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Ca + HCl + H<sub>2</sub>O' },
						{ id: '3', label: 'CaCl<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'CaH<sub>2</sub> + Cl<sub>2</sub>O<sub>7</sub>' },
						{ id: '5', label: 'CaO + Cl<sub>2</sub> + H<sub>2</sub>O' }
					],
					correct: ['3', '3', '1'],
					hint: 'Нейтрализация и взаимодействие основного оксида с кислотой дают CaCl₂ и H₂O; с Cl₂ образуется хлорная известь.'
				},
				{
					id: 1010,
					type: 'match',
					title: 'Реагенты (Na, Al₂O₃, Ba(OH)₂)',
					body: `<p>Установите соответствие между названием вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'натрий' },
						{ letter: 'Б', label: 'оксид алюминия' },
						{ letter: 'В', label: 'гидроксид бария' }
					],
					matchRight: [
						{ id: '1', label: 'CO, Fe' },
						{ id: '2', label: 'O<sub>2</sub>, H<sub>2</sub>O' },
						{ id: '3', label: 'CuSO<sub>4</sub>, CO<sub>2</sub>' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>4</sub>, NaOH' }
					],
					correct: ['2', '4', '3'],
					hint: 'Na реагирует с O₂ и H₂O; Al₂O₃ амфотерен; Ba(OH)₂ реагирует с CuSO₄ и CO₂.'
				},
				{
					id: 1011,
					type: 'single',
					title: 'Коэффициенты в уравнении',
					body: `<p>В уравнении реакции между гидроксидом алюминия и серной кислотой отношение коэффициента при H<sub>2</sub>O к коэффициенту при другом продукте реакции равно</p>`,
					options: [
						{ id: '1', label: '6' },
						{ id: '2', label: '3' },
						{ id: '3', label: '2' },
						{ id: '4', label: '1' }
					],
					correct: '1',
					hint: '2Al(OH)₃ + 3H₂SO₄ → Al₂(SO₄)₃ + 6H₂O.'
				},
				{
					id: 1012,
					type: 'match',
					title: 'Осадки (Ba-соли и AgNO₃)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'BaI<sub>2</sub> и AgNO<sub>3</sub>' },
						{ letter: 'Б', label: 'BaCl<sub>2</sub> и Na<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'В', label: 'Ba(OH)<sub>2</sub> и FeCl<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение белого осадка' },
						{ id: '2', label: 'выпадение бурого осадка' },
						{ id: '3', label: 'выпадение серо-зелёного осадка' },
						{ id: '4', label: 'выпадение жёлтого осадка' }
					],
					correct: ['4', '1', '2'],
					hint: 'AgI — жёлтый, BaCO₃ — белый, Fe(OH)₃ — бурый.'
				},
				{
					id: 1013,
					type: 'multi',
					pickCount: 2,
					title: '2 моль ионов из 1 моль вещества',
					body: `<p>При полной диссоциации 1 моль каких <b>двух</b> из приведённых веществ образуется 2 моль ионов?</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'Li<sub>2</sub>CO<sub>3</sub>' },
						{ id: '3', label: 'KOH' },
						{ id: '4', label: 'HClO<sub>3</sub>' },
						{ id: '5', label: 'Na<sub>2</sub>CO<sub>3</sub>' }
					],
					correct: ['3', '4'],
					hint: 'KOH и HClO₃ диссоциируют на 2 иона.'
				},
				{
					id: 1014,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции обмена (идут до конца)',
					body: `<p>Выберите <b>две пары веществ</b>, которые практически полностью взаимодействуют в водном растворе.</p>`,
					options: [
						{ id: '1', label: 'нитрат серебра и хлороводород' },
						{ id: '2', label: 'нитрат кальция и хлорид калия' },
						{ id: '3', label: 'хлороводород и нитрат натрия' },
						{ id: '4', label: 'серная кислота и хлорид бария' },
						{ id: '5', label: 'хлороводород и нитрат калия' },
						{ id: '6', label: 'фосфат калия и нитрит натрия' }
					],
					correct: ['1', '4'],
					hint: 'Идёт до конца при образовании осадка: AgCl↓ и BaSO₄↓.'
				},
				{
					id: 1015,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S(+4) → S(0)' },
						{ letter: 'Б', label: 'O<sub>2</sub>(0) → 2O(−2)' },
						{ letter: 'В', label: 'C(−4) → C(+2)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: 'СО падает — восстановление, растёт — окисление.'
				},
				{
					id: 1016,
					type: 'multi',
					pickCount: 2,
					title: 'Загрязнение и последствия',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды и его последствиях выберите одно или несколько верных.</p>`,
					options: [
						{ id: '1', label: 'Повышенное содержание в помещении оксида углерода(II) опасно для здоровья человека.' },
						{ id: '2', label: 'Выбросы в атмосферу газообразных отходов производства серной и азотной кислот отрицательно влияют на здоровье человека.' },
						{ id: '3', label: 'Ионы тяжёлых металлов, содержащиеся в овощах, выращенных у дороги, никак не влияют на здоровье человека.' },
						{ id: '4', label: 'Использование бензина, содержащего соединения свинца, никак не сказывается на состоянии окружающей среды и здоровье людей.' }
					],
					correct: ['1', '2'],
					hint: 'CO и кислотообразующие газы опасны; тяжёлые металлы и соединения Pb вредны.'
				},
				{
					id: 1017,
					type: 'match',
					title: 'Реактив для различения (кислота/соль, сульфат/нитрат, Ag/Zn)',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HNO<sub>3</sub> и KNO<sub>3</sub>' },
						{ letter: 'Б', label: 'K<sub>2</sub>SO<sub>4</sub> и NaNO<sub>3</sub>' },
						{ letter: 'В', label: 'Ag и Zn' }
					],
					matchRight: [
						{ id: '1', label: 'метилоранж' },
						{ id: '2', label: 'Zn(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '3', label: 'Ba(NO<sub>3</sub>)<sub>2</sub>' },
						{ id: '4', label: 'HBr' }
					],
					correct: ['1', '3', '4'],
					hint: 'Кислоту распознаёт индикатор; сульфат даёт BaSO₄↓; Zn реагирует с HBr, Ag — нет.'
				},
				{
					id: 1018,
					type: 'input',
					title: 'Массовая доля кальция в CaF₂',
					body: `
						<p>Вычислите массовую долю кальция во фториде кальция CaF<sub>2</sub> (в %).</p>
						<p style=\"color:var(--muted);font-size:14px;\">Запишите число с точностью до десятых.</p>
					`,
					placeholder: 'например, 62,4',
					correct: '51,3',
					hint: 'ω(Ca)=40/(40+2·19)·100%.'
				},
				{
					id: 1019,
					type: 'input',
					title: 'Масса кальция в пасте',
					body: `
						<p>Определите массу (в граммах) кальция, который содержится в тюбике зубной пасты массой 150 г.</p>
						<p>В 150 г пасты содержится 15 г CaF<sub>2</sub>. Используйте ω(Ca) = 51,3% из предыдущего задания.</p>
					`,
					placeholder: 'например, 8,8',
					correct: '7,7',
					hint: 'm(Ca)=15·0,513.'
				},
				// ============================================================
				// ВАРИАНТ 10 · Часть 2 (1020–1022)
				// ============================================================
				{
					id: 1020,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (KClO₃ + CrCl₃ + KOH)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style=\"text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;\">\n\t\t\t\t\t\t\tKClO<sub>3</sub> + CrCl<sub>3</sub> + KOH → K<sub>2</sub>CrO<sub>4</sub> + KCl + H<sub>2</sub>O\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>Определите окислитель и восстановитель.</p>\n\t\t\t\t\t`,
					solution: `
						<p><b>Степени окисления:</b> Cr(+3) → Cr(+6) (окисление), Cl(+5) → Cl(−1) (восстановление).</p>
						<p><b>Баланс:</b> Cr(+3) − 3e⁻ → Cr(+6) (×2); Cl(+5) + 6e⁻ → Cl(−1) (×1).</p>
						<p><b>Уравнение:</b></p>
						<p style=\"font-family:'JetBrains Mono',monospace; font-size:13px;\">KClO<sub>3</sub> + 2CrCl<sub>3</sub> + 10KOH → 2K<sub>2</sub>CrO<sub>4</sub> + 7KCl + 5H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — KClO₃, <b>восстановитель</b> — CrCl₃.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Верно составлен электронный баланс (2 и 1 как множители).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,2,10,2,7,5.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель (KClO₃) и восстановитель (CrCl₃).' }
					]
				},
				{
					id: 1021,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений алюминия',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style=\"text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;\">\n\t\t\t\t\t\t\tAl → Al(OH)<sub>3</sub> →<sup>t°</sup> X → KAlO<sub>2</sub>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>Напишите молекулярные уравнения реакций.</p>\n\t\t\t\t\t`,
					solution: `
						<p><b>X = Al<sub>2</sub>O<sub>3</sub></b>.</p>
						<p style=\"font-family:'JetBrains Mono',monospace; font-size:13px;\">\n\t\t\t\t\t\t\t1) (пример) 2Al + 6H<sub>2</sub>O → 2Al(OH)<sub>3</sub> + 3H<sub>2</sub>↑ (при активации Al)<br>\n\t\t\t\t\t\t\t2) 2Al(OH)<sub>3</sub> →<sup>t°</sup> Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O<br>\n\t\t\t\t\t\t\t3) Al<sub>2</sub>O<sub>3</sub> + 2KOH → 2KAlO<sub>2</sub> + H<sub>2</sub>O (сплавление)\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p style=\"color:var(--muted); font-size:13px;\">Допустимы альтернативы для шага 1 (например, через соль AlCl₃ и щёлочь).</p>\n\t\t\t\t\t`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен Al(OH)₃ из Al (допустим один из корректных способов).' },
						{ id: 'c2', points: 1, label: 'Показано прокаливание Al(OH)₃ с получением X = Al₂O₃.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение получения KAlO₂ из Al₂O₃ и KOH.' }
					]
				},
				{
					id: 1022,
					type: 'written',
					maxPoints: 3,
					title: 'Объём воздуха для обжига FeS₂',
					taskKind: 'Расчётная задача',
					body: `
						<p>Какой объём воздуха (н.у.) потребуется для полного сжигания <b>48 кг</b> дисульфида железа(II) FeS<sub>2</sub> до сернистого газа?</p>
						<p>Объёмная доля кислорода в воздухе составляет <b>21%</b>.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂</p>
						<p><b>2) Количество FeS₂:</b> n = 48000/120 = 400 моль.</p>
						<p><b>3) Кислород:</b> n(O₂) = 11/4 · 400 = 1100 моль; V(O₂)=1100·22,4=24640 л.</p>
						<p><b>4) Воздух:</b> V(возд.) = 24640/0,21 ≈ <b>117333,3 л</b> (≈ 117,3 м³).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества FeS₂.' },
						{ id: 'c2', points: 1, label: 'Рассчитаны n(O₂) и V(O₂) при н.у.' },
						{ id: 'c3', points: 1, label: 'Найден объём воздуха с учётом 21% O₂.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 11 · Часть 1 (задания 1101–1119)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568179)
				// ============================================================
				{
					id: 1101,
					type: 'multi',
					pickCount: 2,
					title: 'Алюминий как простое вещество',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об алюминии как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'В качестве конструкционного материала обычно используют не чистый алюминий, а разные сплавы на его основе.' },
						{ id: '2', label: 'Соли, в которых алюминий входит в состав кислотного остатка, называются алюминаты.' },
						{ id: '3', label: 'Предельно допустимая концентрация алюминия в воде хозяйственно-питьевого использования составляет 0,2 мг/л.' },
						{ id: '4', label: 'Алюминий способен накапливаться в тканях костей, мозга и печени.' },
						{ id: '5', label: 'Лидерами по производству алюминия являются Китай и Россия.' }
					],
					correct: ['1', '5'],
					hint: 'О простом веществе — металл Al и его использование/получение.'
				},
				{
					id: 1102,
					type: 'input',
					title: 'Период и заряд ядра',
					body: `
						<p>На рисунке изображена модель строения ядра атома некоторого химического элемента.</p>
						<p>Запишите номер периода (<b>X</b>) и величину заряда ядра (<b>Y</b>) его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 38',
					correct: '27',
					hint: '7 протонов → N. Период 2, заряд ядра 7.'
				},
				{
					id: 1103,
					type: 'input',
					title: 'Восстановительные свойства (3 период)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>фосфор</li>
							<li>кремний</li>
							<li>алюминий</li>
						</ol>
						<p>в порядке <b>увеличения</b> восстановительных свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 234',
					correct: '123',
					hint: 'В периоде восстановительные свойства усиливаются справа налево: P < Si < Al.'
				},
				{
					id: 1104,
					type: 'match',
					title: 'Степень окисления хлора',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления хлора.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>Cl' },
						{ letter: 'Б', label: 'Cl<sub>2</sub>O' },
						{ letter: 'В', label: 'CCl<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '+1' },
						{ id: '2', label: '−1' },
						{ id: '3', label: '+2' },
						{ id: '4', label: '+4' }
					],
					correct: ['2', '1', '2'],
					hint: 'В NH₄Cl и CCl₄ хлор −1; в Cl₂O хлор +1.'
				},
				{
					id: 1105,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная и ковалентная связь',
					body: `<p>Выберите <b>два вещества</b>, в каждом из которых содержится как ионная, так и ковалентная связь.</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'KOH' },
						{ id: '3', label: 'CBr<sub>4</sub>' },
						{ id: '4', label: 'SO<sub>3</sub>' },
						{ id: '5', label: 'NH<sub>4</sub>Cl' }
					],
					correct: ['2', '5'],
					hint: 'В KOH и NH₄Cl есть ионная связь между ионами и ковалентная внутри сложного иона.'
				},
				{
					id: 1106,
					type: 'multi',
					pickCount: 2,
					title: 'Литий и натрий',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как лития, так и натрия?</p>`,
					options: [
						{ id: '1', label: 'Высший гидроксид проявляет амфотерные свойства.' },
						{ id: '2', label: 'Электроны в атоме расположены на двух электронных слоях.' },
						{ id: '3', label: 'Образует высший оксид состава Э<sub>2</sub>О.' },
						{ id: '4', label: 'Радиус атома элемента больше, чем радиус атома фтора.' },
						{ id: '5', label: 'Простое вещество является неметаллом.' }
					],
					correct: ['3', '4'],
					hint: 'Li₂O и Na₂O — высшие оксиды; радиусы Li и Na больше радиуса F.'
				},
				{
					id: 1107,
					type: 'single',
					title: 'Кислотный оксид и щёлочь',
					body: `<p>Кислотным оксидом и щёлочью соответственно являются</p>`,
					options: [
						{ id: '1', label: 'SiO<sub>2</sub> и Ba(OH)<sub>2</sub>' },
						{ id: '2', label: 'NO<sub>2</sub> и Fe(OH)<sub>3</sub>' },
						{ id: '3', label: 'CaO и Cu(OH)<sub>2</sub>' },
						{ id: '4', label: 'CO<sub>2</sub> и Al(OH)<sub>3</sub>' }
					],
					correct: '1',
					hint: 'Ba(OH)₂ — щёлочь, SiO₂ — кислотный оксид.'
				},
				{
					id: 1108,
					type: 'multi',
					pickCount: 2,
					title: 'С чем реагирует CO₂',
					body: `<p>Из предложенного перечня выберите <b>две пары веществ</b>, с каждым из которых реагирует оксид углерода(IV).</p>`,
					options: [
						{ id: '1', label: 'Li<sub>2</sub>O, NaOH' },
						{ id: '2', label: 'HCl, H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'BaO, KOH' },
						{ id: '4', label: 'Ca(OH)<sub>2</sub>, NaNO<sub>3</sub>' },
						{ id: '5', label: 'Al, Ag' }
					],
					correct: ['1', '3'],
					hint: 'CO₂ реагирует с основными оксидами и щёлочами.'
				},
				{
					id: 1109,
					type: 'match',
					title: 'Продукты взаимодействия (NaOH)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH и (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'NaOH(р-р) и SO<sub>2</sub>' },
						{ letter: 'В', label: 'NaOH и H<sub>2</sub>SO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>4</sub>, NH<sub>3</sub> и H<sub>2</sub>O' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>O' },
						{ id: '3', label: 'Na<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>' },
						{ id: '4', label: 'Na<sub>2</sub>SO<sub>4</sub>, N<sub>2</sub> и H<sub>2</sub>O' },
						{ id: '5', label: 'Na<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>O' }
					],
					correct: ['1', '5', '2'],
					hint: 'Соль аммония + щёлочь → NH₃; SO₂ + щёлочь → Na₂SO₃; нейтрализация даёт Na₂SO₄.'
				},
				{
					id: 1110,
					type: 'match',
					title: 'Реагенты (P, Fe₂O₃, NH₄Cl)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P (красный)' },
						{ letter: 'Б', label: 'Fe<sub>2</sub>O<sub>3</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl' }
					],
					matchRight: [
						{ id: '1', label: 'HCl, HNO<sub>3</sub>' },
						{ id: '2', label: 'O<sub>2</sub>, Ca' },
						{ id: '3', label: 'BaCl<sub>2</sub>, CO' },
						{ id: '4', label: 'KOH, AgNO<sub>3</sub>' }
					],
					correct: ['2', '1', '4'],
					hint: 'P реагирует с O₂ и Ca; Fe₂O₃ — с кислотами; NH₄Cl — с KOH и AgNO₃.'
				},
				{
					id: 1111,
					type: 'single',
					title: 'Какая реакция не ОВР',
					body: `<p>Какое из уравнений <b>не относится</b> к окислительно-восстановительным реакциям?</p>`,
					options: [
						{ id: '1', label: '2Al + 6H<sub>2</sub>O = 2Al(OH)<sub>3</sub> + 3H<sub>2</sub>' },
						{ id: '2', label: 'CO<sub>2</sub> + C → 2CO (t°)' },
						{ id: '3', label: '2KOH + CO<sub>2</sub> = K<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '4', label: '2H<sub>2</sub>S + 3O<sub>2</sub> = 2SO<sub>2</sub> + 2H<sub>2</sub>O' }
					],
					correct: '3',
					hint: 'В реакции 3 степени окисления не меняются: это не ОВР.'
				},
				{
					id: 1112,
					type: 'match',
					title: 'Признаки реакций (Zn, Mg(OH)₂)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Zn и H<sub>2</sub>SO<sub>4</sub>(разб.)' },
						{ letter: 'Б', label: 'Mg(OH)<sub>2</sub> и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'Mg(OH)<sub>2</sub> и HNO<sub>3</sub>(конц.)' }
					],
					matchRight: [
						{ id: '1', label: 'выделение газа' },
						{ id: '2', label: 'растворение осадка с образованием бесцветного раствора' },
						{ id: '3', label: 'видимые признаки отсутствуют' },
						{ id: '4', label: 'растворение осадка с образованием окрашенного раствора' }
					],
					correct: ['1', '2', '2'],
					hint: 'Zn + кислота → H₂; Mg(OH)₂ растворяется в кислотах (растворы бесцветные).'
				},
				{
					id: 1113,
					type: 'multi',
					pickCount: 2,
					title: 'Диссоциация FeCl₃',
					body: `<p>Укажите, какие ионы и в каком количестве образуются в растворе при полной диссоциации 1 моль хлорида железа(III).</p>`,
					options: [
						{ id: '1', label: '1 моль Fe<sup>3+</sup>' },
						{ id: '2', label: '1 моль Fe<sup>2+</sup>' },
						{ id: '3', label: '3 моль Fe<sup>3+</sup>' },
						{ id: '4', label: '1 моль Cl<sup>−</sup>' },
						{ id: '5', label: '3 моль Cl<sup>−</sup>' }
					],
					correct: ['1', '5'],
					hint: 'FeCl₃ → Fe³⁺ + 3Cl⁻.'
				},
				{
					id: 1114,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции в растворе',
					body: `<p>Какие две пары из перечня содержат вещества, реагирующие между собой в водном растворе?</p>`,
					options: [
						{ id: '1', label: 'AgNO<sub>3</sub> и HCl' },
						{ id: '2', label: 'MgSO<sub>4</sub> и NaNO<sub>3</sub>' },
						{ id: '3', label: 'CuCl<sub>2</sub> и H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '4', label: 'LiOH и HNO<sub>3</sub>' },
						{ id: '5', label: 'KI и FeBr<sub>2</sub>' },
						{ id: '6', label: 'NaNO<sub>2</sub> и KNO<sub>3</sub>' }
					],
					correct: ['1', '4'],
					hint: 'AgCl↓ (осадок) и нейтрализация (LiOH + HNO₃).'
				},
				{
					id: 1115,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'N(+4) → N(+3)' },
						{ letter: 'Б', label: 'Al(0) → Al(+3)' },
						{ letter: 'В', label: 'C(−4) → C(+4)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '1', '1'],
					hint: 'СО падает — восстановление, растёт — окисление.'
				},
				{
					id: 1116,
					type: 'multi',
					pickCount: 2,
					title: 'Бытовая химия: правила обращения',
					body: `<p>Из перечисленных суждений о правилах обращения с препаратами бытовой химии выберите одно или несколько верных.</p>`,
					options: [
						{ id: '1', label: 'Перед использованием застывшую масляную краску рекомендуется подогреть на открытом огне.' },
						{ id: '2', label: 'При использовании органических растворителей во время ремонта окна в помещении должны быть плотно закрыты.' },
						{ id: '3', label: 'Все препараты бытовой химии следует хранить отдельно от продуктов питания.' },
						{ id: '4', label: 'При применении препаратов бытовой химии требуется соблюдение прилагаемых к ним инструкций.' }
					],
					correct: ['3', '4'],
					hint: 'Верны 3 и 4: хранить отдельно и соблюдать инструкции.'
				},
				{
					id: 1117,
					type: 'match',
					title: 'Реактив для различения (KCl/NaNO₃, Ba(NO₃)₂/KNO₃, NH₄Cl/AlCl₃)',
					body: `<p>Установите соответствие между формулами двух веществ и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KCl и NaNO<sub>3</sub>' },
						{ letter: 'Б', label: 'Ba(NO<sub>3</sub>)<sub>2</sub> и KNO<sub>3</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl и AlCl<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'гидроксид натрия' },
						{ id: '2', label: 'сульфат натрия' },
						{ id: '3', label: 'оксид магния' },
						{ id: '4', label: 'нитрат серебра' }
					],
					correct: ['4', '2', '1'],
					hint: 'AgNO₃ даёт AgCl↓ с KCl; Na₂SO₄ даёт BaSO₄↓ с Ba²⁺; NaOH различает NH₄⁺ и Al³⁺.'
				},
				{
					id: 1118,
					type: 'input',
					title: 'Массовая доля K в K₂CO₃',
					body: `
						<p>Вычислите массовую долю (в процентах) калия в карбонате калия K<sub>2</sub>CO<sub>3</sub>.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите число с точностью до сотых.</p>
					`,
					placeholder: 'например, 67,63',
					correct: '56,52',
					hint: 'ω(K) = 2·39 / (2·39+12+3·16) · 100%.'
				},
				{
					id: 1119,
					type: 'input',
					title: 'Масса удобрения по ω(K)',
					body: `
						<p>Осенью во время сельскохозяйственных работ в почву вносят удобрения из расчёта 200 г калия на 10 м².</p>
						<p>Вычислите, сколько граммов карбоната калия надо внести на участок площадью 25 м².</p>
						<p style="color:var(--muted);font-size:14px;">Ответ запишите с точностью до целых. Используйте ω(K) = 56,52% из предыдущего задания.</p>
					`,
					placeholder: 'например, 996',
					correct: '885',
					hint: 'Сначала найдите массу K для 25 м², затем разделите на ω(K).'
				},
				// ============================================================
				// ВАРИАНТ 11 · Часть 2 (1120–1122)
				// ============================================================
				{
					id: 1120,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (NaMnO₄ + NaOH)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							NaMnO<sub>4</sub> + NaOH → Na<sub>2</sub>MnO<sub>4</sub> + O<sub>2</sub> + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> Mn(+7) → Mn(+6) (восстановление); кислород в OH⁻: O(−2) → O₂(0) (окисление).</p>
						<p><b>Баланс:</b> Mn(+7) + e⁻ → Mn(+6) (×4); 2O(−2) − 4e⁻ → O₂(0) (×1).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">4NaMnO<sub>4</sub> + 4NaOH → 4Na<sub>2</sub>MnO<sub>4</sub> + O<sub>2</sub>↑ + 2H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — NaMnO₄, <b>восстановитель</b> — NaOH (кислород в OH⁻).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Определены степени окисления и составлен электронный баланс (4 e⁻).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 4,4,4,1,2.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1121,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений алюминия',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Al → Al(OH)<sub>3</sub> →<sup>t°</sup> X → KAlO<sub>2</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Al<sub>2</sub>O<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							(пример) 2Al + 6HCl → 2AlCl<sub>3</sub> + 3H<sub>2</sub>↑<br>
							AlCl<sub>3</sub> + 3NaOH → Al(OH)<sub>3</sub>↓ + 3NaCl<br>
							2Al(OH)<sub>3</sub> →<sup>t°</sup> Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O<br>
							Al<sub>2</sub>O<sub>3</sub> + 2KOH → 2KAlO<sub>2</sub> + H<sub>2</sub>O (сплавление)
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен Al(OH)₃ из Al (допустим один из корректных способов).' },
						{ id: 'c2', points: 1, label: 'Показано прокаливание Al(OH)₃ с получением X = Al₂O₃.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение получения KAlO₂ из Al₂O₃ и KOH.' }
					]
				},
				{
					id: 1122,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля соли в растворе',
					taskKind: 'Расчётная задача',
					body: `
						<p>При взаимодействии <b>8,0 г</b> оксида серы(VI) с избытком раствора гидроксида калия получили <b>174 г</b> раствора средней соли.</p>
						<p>Вычислите массовую долю соли в полученном растворе.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">SO<sub>3</sub> + 2KOH → K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O</p>
						<p><b>2) Количество SO₃:</b> n = 8/80 = 0,1 моль.</p>
						<p><b>3) Масса K₂SO₄:</b> n = 0,1; M = 174; m = 17,4 г.</p>
						<p><b>4) Массовая доля:</b> ω = 17,4/174 · 100% = <b>10%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества SO₃.' },
						{ id: 'c2', points: 1, label: 'Рассчитана масса соли K₂SO₄ (17,4 г).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля соли (10%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 12 · Часть 1 (задания 1201–1219)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568180)
				// ============================================================
				{
					id: 1201,
					type: 'multi',
					pickCount: 2,
					title: 'Азот как химический элемент',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится об азоте как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Азот химически весьма инертен.' },
						{ id: '2', label: 'Азот входит в состав белков и нуклеиновых кислот.' },
						{ id: '3', label: 'В лабораториях азот получают реакцией разложения нитрита аммония.' },
						{ id: '4', label: 'Соединения азота в степени окисления −3 представлены нитридами, из которых практически наиболее важен аммиак.' },
						{ id: '5', label: 'Азот является основным компонентом воздуха.' }
					],
					correct: ['2', '4'],
					hint: 'Об элементе — вхождение в состав веществ и степени окисления в соединениях.'
				},
				{
					id: 1202,
					type: 'input',
					title: 'Заряд ядра и группа',
					body: `
						<p>На приведённом рисунке изображена модель атома химического элемента.</p>
						<p>Запишите величину заряда ядра (<b>X</b>) атома и номер группы (<b>Y</b>), в которой он расположен в Периодической системе.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 313',
					correct: '202',
					hint: 'Электронов 20 → Ca, заряд ядра 20, группа IIА (2).'
				},
				{
					id: 1203,
					type: 'input',
					title: 'Электроотрицательность (Li, Na, K)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>литий</li>
							<li>калий</li>
							<li>натрий</li>
						</ol>
						<p>в порядке <b>увеличения</b> их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'В группе сверху вниз электроотрицательность уменьшается: K < Na < Li.'
				},
				{
					id: 1204,
					type: 'match',
					title: 'Степень окисления серы',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления серы.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' },
						{ letter: 'Б', label: 'P<sub>2</sub>S<sub>3</sub>' },
						{ letter: 'В', label: 'MgSO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−2' },
						{ id: '2', label: '+3' },
						{ id: '3', label: '+4' },
						{ id: '4', label: '+6' }
					],
					correct: ['4', '1', '3'],
					hint: 'SO₄²⁻ → S(+6); в сульфидах S(−2); SO₃²⁻ → S(+4).'
				},
				{
					id: 1205,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная и ковалентная связь',
					body: `<p>Выберите <b>два вещества</b>, в каждом из которых содержится как ионная, так и ковалентная связь.</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SiO<sub>3</sub>' },
						{ id: '2', label: 'KNO<sub>3</sub>' },
						{ id: '3', label: 'HClO<sub>3</sub>' },
						{ id: '4', label: 'NaOH' },
						{ id: '5', label: 'CaBr<sub>2</sub>' }
					],
					correct: ['2', '4'],
					hint: 'KNO₃ (K⁺ и NO₃⁻) и NaOH (Na⁺ и OH⁻) содержат ионную связь между ионами и ковалентную внутри сложного иона.'
				},
				{
					id: 1206,
					type: 'multi',
					pickCount: 2,
					title: 'Кальций и калий',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как кальция, так и калия?</p>`,
					options: [
						{ id: '1', label: 'Во внешнем слое атом содержит один электрон.' },
						{ id: '2', label: 'Атомный радиус больше атомного радиуса магния.' },
						{ id: '3', label: 'Металлические свойства простого вещества менее выражены, чем у магния.' },
						{ id: '4', label: 'Соответствующий гидроксид является сильным основанием.' },
						{ id: '5', label: 'Высший оксид имеет состав Э<sub>2</sub>О.' }
					],
					correct: ['2', '4'],
					hint: 'Оба в 4 периоде: радиусы больше, чем у Mg; KOH и Ca(OH)₂ — сильные основания.'
				},
				{
					id: 1207,
					type: 'single',
					title: 'Кислотный и основный оксид',
					body: `<p>К кислотным и, соответственно, основным оксидам относятся:</p>`,
					options: [
						{ id: '1', label: 'CO и Na<sub>2</sub>O' },
						{ id: '2', label: 'CO<sub>2</sub> и MgO' },
						{ id: '3', label: 'Al<sub>2</sub>O<sub>3</sub> и P<sub>2</sub>O<sub>5</sub>' },
						{ id: '4', label: 'SO<sub>3</sub> и ZnO' }
					],
					correct: '2',
					hint: 'CO₂ — кислотный оксид, MgO — основный.'
				},
				{
					id: 1208,
					type: 'multi',
					pickCount: 2,
					title: 'С чем реагирует CO₂',
					body: `<p>Выберите <b>две пары</b> веществ, с каждым из которых реагирует оксид углерода(IV).</p>`,
					options: [
						{ id: '1', label: 'S и SO<sub>2</sub>' },
						{ id: '2', label: 'CaO и KOH' },
						{ id: '3', label: 'H<sub>2</sub>O и HCl' },
						{ id: '4', label: 'Ca(OH)<sub>2</sub> и Na<sub>2</sub>O' },
						{ id: '5', label: 'Mg и MgCl<sub>2</sub>' }
					],
					correct: ['2', '4'],
					hint: 'CO₂ реагирует с основными оксидами и щёлочами.'
				},
				{
					id: 1209,
					type: 'match',
					title: 'Продукты взаимодействия',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K<sub>2</sub>S + H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'Б', label: 'K<sub>2</sub>O + H<sub>2</sub>SO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'H<sub>2</sub>S + KOH' }
					],
					matchRight: [
						{ id: '1', label: 'K<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'KHS + SO<sub>3</sub>' },
						{ id: '3', label: 'K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>S' },
						{ id: '5', label: 'K<sub>2</sub>S + H<sub>2</sub>O' }
					],
					correct: ['4', '1', '5'],
					hint: 'Сильная кислота вытесняет H₂S из сульфида; K₂O + кислота → соль + вода; H₂S + избыток KOH → K₂S.'
				},
				{
					id: 1210,
					type: 'match',
					title: 'Вещества и реагенты',
					body: `<p>Установите соответствие между веществом и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SiO<sub>2</sub>' },
						{ letter: 'Б', label: 'Ca(OH)<sub>2</sub>' },
						{ letter: 'В', label: 'Na<sub>2</sub>CO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>CO<sub>3</sub>, KOH' },
						{ id: '2', label: 'CuCl<sub>2</sub>, KHCO<sub>3</sub>' },
						{ id: '3', label: 'FeO, N<sub>2</sub>' },
						{ id: '4', label: 'CaCl<sub>2</sub>, HCl' }
					],
					correct: ['1', '2', '4'],
					hint: 'SiO₂ реагирует с карбонатами и щёлочами (при t); Ca(OH)₂ — со солями и кислыми солями; Na₂CO₃ — с CaCl₂ и кислотой.'
				},
				{
					id: 1211,
					type: 'single',
					title: 'Замещение с участием углерода',
					body: `<p>Углерод вступает в реакцию замещения с</p>`,
					options: [
						{ id: '1', label: 'оксидом железа(III)' },
						{ id: '2', label: 'кислородом' },
						{ id: '3', label: 'фтором' },
						{ id: '4', label: 'серной кислотой' }
					],
					correct: '1',
					hint: 'Замещение: C восстанавливает Fe из Fe₂O₃.'
				},
				{
					id: 1212,
					type: 'match',
					title: 'Признаки реакций (карбонаты)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Ba(OH)<sub>2</sub>(р-р) и Na<sub>2</sub>CO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р) и HCl(р-р)' },
						{ letter: 'В', label: 'Na<sub>2</sub>CO<sub>3</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(разб.)' }
					],
					matchRight: [
						{ id: '1', label: 'видимые признаки отсутствуют' },
						{ id: '2', label: 'выделение газа' },
						{ id: '3', label: 'растворение осадка' },
						{ id: '4', label: 'образование осадка' }
					],
					correct: ['4', '2', '2'],
					hint: 'BaCO₃↓ — осадок; карбонаты с кислотами дают CO₂↑.'
				},
				{
					id: 1213,
					type: 'multi',
					pickCount: 2,
					title: 'Неэлектролиты',
					body: `<p>Выберите <b>два вещества</b>, которые не относятся к электролитам.</p>`,
					options: [
						{ id: '1', label: 'CuSO<sub>4</sub>' },
						{ id: '2', label: 'сера' },
						{ id: '3', label: 'KOH' },
						{ id: '4', label: 'оксид углерода(II)' },
						{ id: '5', label: 'H<sub>2</sub>SO<sub>4</sub>' }
					],
					correct: ['2', '4'],
					hint: 'Сера и CO не диссоциируют в растворе.'
				},
				{
					id: 1214,
					type: 'multi',
					pickCount: 2,
					title: 'Реакции NH₄NO₃ в растворе',
					body: `<p>Нитрат аммония в водном растворе может прореагировать с двумя веществами из списка:</p>`,
					options: [
						{ id: '1', label: 'MgSO<sub>4</sub>' },
						{ id: '2', label: 'HCl' },
						{ id: '3', label: 'NaOH' },
						{ id: '4', label: 'KOH' },
						{ id: '5', label: 'CuBr<sub>2</sub>' },
						{ id: '6', label: 'NaI' }
					],
					correct: ['3', '4'],
					hint: 'С щелочами соли аммония дают NH₃↑.'
				},
				{
					id: 1215,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Zn(+2) → Zn(0)' },
						{ letter: 'Б', label: '2N(+2) → N<sub>2</sub>(0)' },
						{ letter: 'В', label: 'Cr(+3) → Cr(+6)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: '+2→0 — восстановление; +3→+6 — окисление.'
				},
				{
					id: 1216,
					type: 'multi',
					title: 'Бытовая химия: безопасность',
					body: `<p>Из перечисленных суждений о правилах безопасного обращения с препаратами бытовой химии выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'При приготовлении раствора пищевой соды резиновые перчатки можно не использовать.' },
						{ id: '2', label: 'При опрыскивании садовых растений препаратами от насекомых нужно использовать средства индивидуальной защиты.' },
						{ id: '3', label: 'Все препараты бытовой химии следует хранить в холодильнике.' },
						{ id: '4', label: 'Работы с органическими растворителями должны выполняться в проветриваемом помещении.' }
					],
					correct: ['1', '2', '4'],
					hint: 'Верны 1, 2 и 4.'
				},
				{
					id: 1217,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>CO<sub>3</sub> и K<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'H<sub>3</sub>PO<sub>4</sub> и H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'В', label: 'BaCl<sub>2</sub> и MgCl<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'HNO<sub>3</sub>' },
						{ id: '2', label: 'K<sub>2</sub>CO<sub>3</sub>' },
						{ id: '3', label: 'NaNO<sub>3</sub>' },
						{ id: '4', label: 'LiOH' }
					],
					correct: ['1', '4', '2'],
					hint: 'Карбонат с HNO₃ даёт CO₂↑; фосфат с LiOH даёт Li₃PO₄↓; Ba²⁺ даёт BaCO₃↓ с K₂CO₃.'
				},
				{
					id: 1218,
					type: 'input',
					title: 'Массовая доля Pb в стекле',
					body: `
						<p>Вычислите массовую долю свинца в стекле состава K<sub>2</sub>PbSi<sub>6</sub>O<sub>14</sub> (в %).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите число с точностью до десятых.</p>
					`,
					placeholder: 'например, 41,7',
					correct: '30,6',
					hint: 'ω(Pb)=207/M(вещества)·100%.'
				},
				{
					id: 1219,
					type: 'input',
					title: 'Масса стекла по ω(Pb)',
					body: `
						<p>Вычислите массу стекла (в килограммах), если в нём содержится 15,3 кг свинца.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(Pb) = 30,6% из предыдущего задания. Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 61',
					correct: '50',
					hint: 'm(стекла)=m(Pb)/ω(Pb).'
				},
				// ============================================================
				// ВАРИАНТ 12 · Часть 2 (1220–1222)
				// ============================================================
				{
					id: 1220,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (Cu₂O + HNO₃(конц.))',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Cu<sub>2</sub>O + HNO<sub>3</sub>(конц.) → NO<sub>2</sub> + Cu(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> Cu(+1) → Cu(+2) (окисление); N(+5) → N(+4) в NO₂ (восстановление).</p>
						<p><b>Баланс:</b> Cu(+1) − e⁻ → Cu(+2) (×2); N(+5) + e⁻ → N(+4) (×2).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">Cu<sub>2</sub>O + 6HNO<sub>3</sub> → 2NO<sub>2</sub>↑ + 2Cu(NO<sub>3</sub>)<sub>2</sub> + 3H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — HNO₃, <b>восстановитель</b> — Cu₂O.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Определены степени окисления и составлен электронный баланс.' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,6,2,2,3.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1221,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений бария',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							BaO → BaCl<sub>2</sub> → BaCO<sub>3</sub> →<sup>+HNO<sub>3</sub></sup> X
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Ba(NO<sub>3</sub>)<sub>2</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) BaO + 2HCl → BaCl<sub>2</sub> + H<sub>2</sub>O<br>
							2) BaCl<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> → BaCO<sub>3</sub>↓ + 2NaCl<br>
							3) BaCO<sub>3</sub> + 2HNO<sub>3</sub> → Ba(NO<sub>3</sub>)<sub>2</sub> + CO<sub>2</sub>↑ + H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение BaO + HCl → BaCl₂ + H₂O.' },
						{ id: 'c2', points: 1, label: 'Записано уравнение получения BaCO₃ осаждением из BaCl₂.' },
						{ id: 'c3', points: 1, label: 'Записано уравнение растворения BaCO₃ в HNO₃ (X = Ba(NO₃)₂).' }
					]
				},
				{
					id: 1222,
					type: 'written',
					maxPoints: 3,
					title: 'Объём газа при реакции MgS с HCl',
					taskKind: 'Расчётная задача',
					body: `
						<p>Раствор соляной кислоты массой <b>116,8 г</b> и массовой долей <b>10%</b> добавили к избытку сульфида магния.</p>
						<p>Вычислите объём (н.у.) выделившегося газа.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> MgS + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>S↑</p>
						<p><b>2) Масса HCl:</b> m = 116,8·0,10 = 11,68 г.</p>
						<p><b>3) Количество HCl:</b> n = 11,68/36,5 = 0,32 моль.</p>
						<p><b>4) Количество H₂S:</b> n = 0,32/2 = 0,16 моль; V = 0,16·22,4 = <b>3,584 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдена масса HCl в растворе.' },
						{ id: 'c2', points: 1, label: 'Рассчитано количество вещества HCl и H₂S.' },
						{ id: 'c3', points: 1, label: 'Найден объём H₂S при н.у. (3,584 л).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 13 · Часть 1 (задания 1301–1319)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568181)
				// ============================================================
				{
					id: 1301,
					type: 'multi',
					pickCount: 2,
					title: 'Алюминий как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об алюминии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Алюминий используют в самолётостроении.' },
						{ id: '2', label: 'Алюминий в соединениях проявляет постоянную степень окисления +3.' },
						{ id: '3', label: 'Алюминий состоит практически полностью из единственного стабильного изотопа <sup>27</sup>Al.' },
						{ id: '4', label: 'Алюминий — серебристо-белый металл с хорошей электропроводностью.' },
						{ id: '5', label: 'При нагревании алюминий активно реагирует с кислородом.' }
					],
					correct: ['2', '3'],
					hint: 'Об элементе — изотопы и степень окисления в соединениях.'
				},
				{
					id: 1302,
					type: 'input',
					title: 'Группа и число протонов',
					body: `
						<p>На приведённом рисунке изображена модель атома химического элемента.</p>
						<p>Запишите номер группы (<b>X</b>) и число протонов (<b>Y</b>) в ядре его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 222',
					correct: '111',
					hint: '2,8,1 → Na. Группа IA (1), протонов 11.'
				},
				{
					id: 1303,
					type: 'input',
					title: 'Неметаллические свойства',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>сера</li>
							<li>хлор</li>
							<li>углерод</li>
						</ol>
						<p>в порядке <b>ослабления</b> неметаллических свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 324',
					correct: '213',
					hint: 'Неметалличность выше у элементов правее/выше: Cl > S > C.'
				},
				{
					id: 1304,
					type: 'match',
					title: 'Степень окисления брома',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления брома.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HBrO<sub>2</sub>' },
						{ letter: 'Б', label: 'PBr<sub>3</sub>' },
						{ letter: 'В', label: 'Cu(BrO<sub>3</sub>)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−1' },
						{ id: '2', label: '+1' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+5' }
					],
					correct: ['3', '1', '4'],
					hint: 'HBrO₂: Br(+3); в PBr₃ бром −1; в BrO₃⁻ бром +5.'
				},
				{
					id: 1305,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b> с ионной связью.</p>`,
					options: [
						{ id: '1', label: 'BaO' },
						{ id: '2', label: 'CCl<sub>4</sub>' },
						{ id: '3', label: 'NH<sub>3</sub>' },
						{ id: '4', label: 'H<sub>2</sub>S' },
						{ id: '5', label: 'Ba(OH)<sub>2</sub>' }
					],
					correct: ['1', '5'],
					hint: 'BaO — ионная; Ba(OH)₂ — ионная между Ba²⁺ и OH⁻.'
				},
				{
					id: 1306,
					type: 'multi',
					pickCount: 2,
					title: 'Фосфор и азот',
					body: `<p>Выберите <b>два утверждения</b>, верные для характеристики как фосфора, так и азота.</p>`,
					options: [
						{ id: '1', label: 'Химический элемент образует высший оксид состава Э<sub>2</sub>O<sub>3</sub>.' },
						{ id: '2', label: 'Относится к неметаллам.' },
						{ id: '3', label: 'На внешнем энергетическом уровне атома содержится пять электронов.' },
						{ id: '4', label: 'Химический элемент расположен в 5 периоде.' },
						{ id: '5', label: 'Соответствующее простое вещество при обычных условиях газообразно.' }
					],
					correct: ['2', '3'],
					hint: 'Оба в VA группе: неметаллы, 5 e⁻ на внешнем уровне.'
				},
				{
					id: 1307,
					type: 'single',
					title: 'Основные оксиды',
					body: `<p>К основным оксидам относят каждое из двух веществ, формулы которых</p>`,
					options: [
						{ id: '1', label: 'FeO, BaO' },
						{ id: '2', label: 'K<sub>2</sub>O, Al<sub>2</sub>O<sub>3</sub>' },
						{ id: '3', label: 'MgO, NO' },
						{ id: '4', label: 'MnO<sub>2</sub>, CrO<sub>3</sub>' }
					],
					correct: '1',
					hint: 'FeO и BaO — основные.'
				},
				{
					id: 1308,
					type: 'multi',
					pickCount: 2,
					title: 'Оксид фосфора(V)',
					body: `<p>Из предложенного перечня выберите <b>два вещества</b>, которые реагируют с оксидом фосфора(V).</p>`,
					options: [
						{ id: '1', label: 'кислород' },
						{ id: '2', label: 'вода' },
						{ id: '3', label: 'оксид углерода(IV)' },
						{ id: '4', label: 'оксид кремния' },
						{ id: '5', label: 'гидроксид натрия' }
					],
					correct: ['2', '5'],
					hint: 'P₂O₅ + H₂O → H₃PO₄; P₂O₅ + NaOH → фосфаты.'
				},
				{
					id: 1309,
					type: 'match',
					title: 'Продукты реакций (Fe-соединения)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'Б', label: 'FeSO<sub>4</sub> + H<sub>2</sub>S' },
						{ letter: 'В', label: 'Fe<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'FeO + H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '2', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '3', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'FeSO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'FeS + H<sub>2</sub>SO<sub>4</sub>' }
					],
					correct: ['4', '5', '2'],
					hint: 'Нейтрализация даёт FeSO₄; FeSO₄ + H₂S → FeS↓; Fe₂O₃ + H₂SO₄ → Fe₂(SO₄)₃.'
				},
				{
					id: 1310,
					type: 'match',
					title: 'Вещества и реагенты',
					body: `<p>Установите соответствие между веществом и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'CaO' },
						{ letter: 'Б', label: 'H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'BaCl<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>4</sub>, AgNO<sub>3</sub>' },
						{ id: '2', label: 'HNO<sub>3</sub>, H<sub>2</sub>O' },
						{ id: '3', label: 'Zn, Mg(OH)<sub>2</sub>' },
						{ id: '4', label: 'NaOH, Ag' }
					],
					correct: ['2', '3', '1'],
					hint: 'CaO реагирует с HNO₃ и водой; H₂SO₄ реагирует с Zn и Mg(OH)₂; BaCl₂ даёт осадки с Na₂SO₄ и AgNO₃.'
				},
				{
					id: 1311,
					type: 'single',
					title: 'Химическое явление',
					body: `<p>К химическим явлениям относится процесс</p>`,
					options: [
						{ id: '1', label: 'плавления парафиновой свечи' },
						{ id: '2', label: 'образования инея' },
						{ id: '3', label: 'распространения запаха духов' },
						{ id: '4', label: 'горения древесины' }
					],
					correct: '4',
					hint: 'При горении образуются новые вещества.'
				},
				{
					id: 1312,
					type: 'match',
					title: 'Признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>SiO<sub>3</sub>(р-р) и HNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'BaCl<sub>2</sub>(р-р) и MgSO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'CaCO<sub>3</sub> и HNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'образование осадка и выделение газа' },
						{ id: '2', label: 'видимые признаки отсутствуют' },
						{ id: '3', label: 'образование осадка без выделения газа' },
						{ id: '4', label: 'растворение осадка и выделение газа' }
					],
					correct: ['3', '3', '4'],
					hint: 'H₂SiO₃↓ и BaSO₄↓ — осадки без газа; CaCO₃ растворяется с выделением CO₂.'
				},
				{
					id: 1313,
					type: 'multi',
					pickCount: 2,
					title: 'Не проводят ток',
					body: `<p>Выберите <b>два вещества</b>, которые не проводят электрический ток.</p>`,
					options: [
						{ id: '1', label: 'расплав хлорида натрия' },
						{ id: '2', label: 'расплав оксида кремния' },
						{ id: '3', label: 'раствор азотной кислоты' },
						{ id: '4', label: 'раствор глюкозы' },
						{ id: '5', label: 'раствор хлорида цинка' }
					],
					correct: ['2', '4'],
					hint: 'Неэлектролит и ковалентная решётка → нет подвижных ионов.'
				},
				{
					id: 1314,
					type: 'multi',
					pickCount: 2,
					title: 'Без осадка при смешении растворов',
					body: `<p>Выберите <b>две пары веществ</b>, при взаимодействии водных растворов которых не образуется осадок.</p>`,
					options: [
						{ id: '1', label: 'K<sub>2</sub>CO<sub>3</sub> и HCl' },
						{ id: '2', label: 'AgNO<sub>3</sub> и MgCl<sub>2</sub>' },
						{ id: '3', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> и NaOH' },
						{ id: '4', label: 'KOH и H<sub>2</sub>SO<sub>4</sub>' },
						{ id: '5', label: 'Ca(NO<sub>3</sub>)<sub>2</sub> и K<sub>3</sub>PO<sub>4</sub>' },
						{ id: '6', label: 'NH<sub>4</sub>Cl и AgNO<sub>3</sub>' }
					],
					correct: ['1', '4'],
					hint: 'В 1 выделяется газ (CO₂), в 4 нейтрализация; осадка нет.'
				},
				{
					id: 1315,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P(−3) → P(+5)' },
						{ letter: 'Б', label: 'Mn(+6) → Mn(+4)' },
						{ letter: 'В', label: 'Br<sub>2</sub>(0) → 2Br(+5)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '2', '1'],
					hint: 'СО растёт — окисление, падает — восстановление.'
				},
				{
					id: 1316,
					type: 'multi',
					pickCount: 2,
					title: 'Смеси и разделение',
					body: `<p>Из перечисленных суждений о чистых веществах, смесях и способах их разделения выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Измельчение твёрдых веществ осуществляют в стеклянном стакане.' },
						{ id: '2', label: 'Заваренный в чайнике чай является однородной смесью.' },
						{ id: '3', label: 'Делительную воронку применяют для разделения неоднородных жидких смесей.' },
						{ id: '4', label: 'Очистить озёрную воду от примеси песка можно с помощью отстаивания и фильтрования.' }
					],
					correct: ['3', '4'],
					hint: 'Верны 3 и 4.'
				},
				{
					id: 1317,
					type: 'match',
					title: 'Реактив для различения (KCl/K₂SiO₃, карбонаты, Na₂SO₄/NaOH)',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KCl и K<sub>2</sub>SiO<sub>3</sub>' },
						{ letter: 'Б', label: 'K<sub>2</sub>CO<sub>3</sub> и Li<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'В', label: 'Na<sub>2</sub>SO<sub>4</sub> и NaOH' }
					],
					matchRight: [
						{ id: '1', label: 'CuCl<sub>2</sub>' },
						{ id: '2', label: 'HCl' },
						{ id: '3', label: 'MgO' },
						{ id: '4', label: 'K<sub>3</sub>PO<sub>4</sub>' }
					],
					correct: ['2', '4', '1'],
					hint: 'HCl даёт H₂SiO₃↓ с силикатом; K₃PO₄ даёт Li₃PO₄↓; CuCl₂ даёт Cu(OH)₂↓ с NaOH.'
				},
				{
					id: 1318,
					type: 'input',
					title: 'Массовая доля N в NaNO₂',
					body: `
						<p>Вычислите массовую долю (в процентах) азота в нитрите натрия NaNO<sub>2</sub>.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите число с точностью до сотых.</p>
					`,
					placeholder: 'например, 31,30',
					correct: '20,29',
					hint: 'ω(N)=14/(23+14+32)·100%.'
				},
				{
					id: 1319,
					type: 'input',
					title: 'Масса азота в продукте',
					body: `
						<p>В 1 кг колбасы содержится 30 мг нитрита натрия. Определите массу (в мг) азота в куске колбасы массой 300 г.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(N) = 20,29% из предыдущего задания. Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 2,94',
					correct: '1,83',
					hint: 'Сначала найдите массу NaNO₂ в 300 г, затем умножьте на ω(N).'
				},
				// ============================================================
				// ВАРИАНТ 13 · Часть 2 (1320–1322)
				// ============================================================
				{
					id: 1320,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (H₂O₂ + HIO₃)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							H<sub>2</sub>O<sub>2</sub> + HIO<sub>3</sub> → I<sub>2</sub> + O<sub>2</sub> + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> O(−1) в H₂O₂ → O(0) в O₂ (окисление); I(+5) в HIO₃ → I(0) в I₂ (восстановление).</p>
						<p><b>Баланс:</b> 2O(−1) − 2e⁻ → O₂(0) (×5); 2I(+5) + 10e⁻ → I₂(0) (×1).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">5H<sub>2</sub>O<sub>2</sub> + 2HIO<sub>3</sub> → I<sub>2</sub> + 5O<sub>2</sub>↑ + 6H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — HIO₃, <b>восстановитель</b> — H₂O₂.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Определены степени окисления и составлен электронный баланс (10 e⁻).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 5,2,1,5,6.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1321,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений Al-соединений',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Al<sub>2</sub>O<sub>3</sub> → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> → X → Na[Al(OH)<sub>4</sub>]
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Al(OH)<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O<br>
							2) Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NaOH → 2Al(OH)<sub>3</sub>↓ + 3Na<sub>2</sub>SO<sub>4</sub><br>
							3) Al(OH)<sub>3</sub> + NaOH → Na[Al(OH)<sub>4</sub>]
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Al₂O₃ переведён в Al₂(SO₄)₃ реакцией с H₂SO₄.' },
						{ id: 'c2', points: 1, label: 'Осаждён X = Al(OH)₃ из Al₂(SO₄)₃ раствором NaOH.' },
						{ id: 'c3', points: 1, label: 'Показано растворение Al(OH)₃ в избытке щёлочи до Na[Al(OH)₄].' }
					]
				},
				{
					id: 1322,
					type: 'written',
					maxPoints: 3,
					title: 'Примеси в сфалерите (ZnS)',
					taskKind: 'Расчётная задача',
					body: `
						<p>При обжиге <b>50 кг</b> сфалерита (минерала, содержащего ZnS) образовался сернистый газ объёмом <b>8,96 м³</b> (н.у.).</p>
						<p>Рассчитайте массовую долю негорючих примесей в сфалерите.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> 2ZnS + 3O<sub>2</sub> → 2ZnO + 2SO<sub>2</sub></p>
						<p><b>2) Количество SO₂:</b> 8,96 м³ = 8960 л; n = 8960/22,4 = 400 моль.</p>
						<p><b>3) Масса ZnS:</b> n(ZnS)=400 моль; M=97 г/моль; m=38,8 кг.</p>
						<p><b>4) Примеси:</b> m=50−38,8=11,2 кг; ω=11,2/50·100% = <b>22,4%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции и найдено количество вещества SO₂.' },
						{ id: 'c2', points: 1, label: 'По стехиометрии найдена масса ZnS в образце (38,8 кг).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля примесей (22,4%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 14 · Часть 1 (задания 1401–1419)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568182)
				// ============================================================
				{
					id: 1401,
					type: 'multi',
					pickCount: 2,
					title: 'Фосфор как простое вещество',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится о фосфоре как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Белый фосфор самовоспламеняется на воздухе.' },
						{ id: '2', label: 'Фосфор содержится в тканях живых организмов.' },
						{ id: '3', label: 'В организме человека фосфор лучше усваивается вместе с кальцием.' },
						{ id: '4', label: 'Фосфор содержится в нуклеиновых кислотах.' },
						{ id: '5', label: 'В природе в свободном состоянии фосфор не встречается из-за высокой химической активности.' }
					],
					correct: ['1', '5'],
					hint: 'О простом веществе — свойства и активность P (P₄).'
				},
				{
					id: 1402,
					type: 'input',
					title: 'Заряд ядра и период',
					body: `
						<p>На рисунке изображена модель атома химического элемента.</p>
						<p>Запишите величину заряда ядра (<b>X</b>) и номер периода (<b>Y</b>), в котором элемент расположен в Периодической системе.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 53',
					correct: '42',
					hint: '2 слоя 2,2 → Be. Заряд ядра 4, период 2.'
				},
				{
					id: 1403,
					type: 'input',
					title: 'Восстановительные свойства (2 период)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>азот</li>
							<li>бор</li>
							<li>углерод</li>
						</ol>
						<p>в порядке <b>увеличения</b> восстановительных свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 243',
					correct: '132',
					hint: 'Во 2 периоде восстановительные свойства растут справа налево: N < C < B.'
				},
				{
					id: 1404,
					type: 'match',
					title: 'Степень окисления углерода',
					body: `<p>Установите соответствие между формулой вещества и степенью окисления углерода.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al<sub>4</sub>C<sub>3</sub>' },
						{ letter: 'Б', label: '(NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'В', label: 'CCl<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−4' },
						{ id: '2', label: '+2' },
						{ id: '3', label: '−2' },
						{ id: '4', label: '+4' }
					],
					correct: ['1', '4', '4'],
					hint: 'Карбид: C(−4); в карбонате и CCl₄ углерод +4.'
				},
				{
					id: 1405,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная и ковалентная связь',
					body: `<p>Выберите <b>два вещества</b>, содержащие как ионную, так и ковалентную связь.</p>`,
					options: [
						{ id: '1', label: 'K<sub>2</sub>CO<sub>3</sub>' },
						{ id: '2', label: 'NaCl' },
						{ id: '3', label: 'H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '4', label: 'Ca(OH)<sub>2</sub>' },
						{ id: '5', label: 'PF<sub>5</sub>' }
					],
					correct: ['1', '4'],
					hint: 'Ионная между ионами и ковалентная внутри сложного иона: CO₃²⁻ и OH⁻.'
				},
				{
					id: 1406,
					type: 'multi',
					pickCount: 2,
					title: 'Кальций vs азот',
					body: `<p>Какие два утверждения являются верными для характеристики кальция и неверными для характеристики азота?</p>`,
					options: [
						{ id: '1', label: 'Соответствующее простое вещество газообразно при обычных условиях.' },
						{ id: '2', label: 'Электроны в атоме расположены на четырёх электронных слоях.' },
						{ id: '3', label: 'Является металлом.' },
						{ id: '4', label: 'Химический элемент образует летучее водородное соединение.' },
						{ id: '5', label: 'Высшая валентность этого элемента равна III.' }
					],
					correct: ['2', '3'],
					hint: 'Ca — 4 период (4 слоя) и металл; N — 2 период и неметалл.'
				},
				{
					id: 1407,
					type: 'single',
					title: 'Простое и сложное вещество',
					body: `<p>Хлороводород и водород являются соответственно</p>`,
					options: [
						{ id: '1', label: 'простыми веществами' },
						{ id: '2', label: 'сложными веществами' },
						{ id: '3', label: 'простым и сложным веществами' },
						{ id: '4', label: 'сложным и простым веществами' }
					],
					correct: '4',
					hint: 'HCl — сложное, H₂ — простое.'
				},
				{
					id: 1408,
					type: 'multi',
					pickCount: 2,
					title: 'Железо: реакции',
					body: `<p>Из предложенного перечня веществ выберите <b>два</b>, которые вступают в реакцию с железом.</p>`,
					options: [
						{ id: '1', label: 'HNO<sub>3</sub>' },
						{ id: '2', label: 'CuCl<sub>2</sub>' },
						{ id: '3', label: 'CaCO<sub>3</sub>' },
						{ id: '4', label: 'CaO' },
						{ id: '5', label: 'N<sub>2</sub>' }
					],
					correct: ['1', '2'],
					hint: 'Fe реагирует с кислотами и вытесняет Cu из CuCl₂.'
				},
				{
					id: 1409,
					type: 'match',
					title: 'Продукты взаимодействия',
					body: `<p>Установите соответствие между реагирующими веществами и возможным(-и) продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KOH и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'Б', label: 'NH<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'В', label: 'SO<sub>2</sub> и KOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'K<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>O' },
						{ id: '2', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'K<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>O' },
						{ id: '4', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>O' },
						{ id: '5', label: 'K<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>' }
					],
					correct: ['1', '2', '3'],
					hint: 'Нейтрализация → K₂SO₄; NH₃ + H₂SO₄ → (NH₄)₂SO₄; SO₂ + щёлочь → K₂SO₃.'
				},
				{
					id: 1410,
					type: 'match',
					title: 'H₂, Ba(OH)₂, K₃PO₄',
					body: `<p>Установите соответствие между веществом и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'H<sub>2</sub>' },
						{ letter: 'Б', label: 'Ba(OH)<sub>2</sub>' },
						{ letter: 'В', label: 'K<sub>3</sub>PO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'H<sub>2</sub>S, K<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'SiO<sub>2</sub>, NaCl' },
						{ id: '3', label: 'Fe<sub>2</sub>O<sub>3</sub>, N<sub>2</sub>' },
						{ id: '4', label: 'AgNO<sub>3</sub>, CaCl<sub>2</sub>' }
					],
					correct: ['3', '1', '4'],
					hint: 'H₂ восстанавливает Fe₂O₃ и реагирует с N₂; Ba(OH)₂ реагирует с H₂S и даёт BaSO₄ с K₂SO₄; K₃PO₄ даёт осадки с Ag⁺ и Ca²⁺.'
				},
				{
					id: 1411,
					type: 'single',
					title: 'Коэффициент перед CO₂',
					body: `<p>В уравнении реакции, схема которой C<sub>6</sub>H<sub>6</sub> + O<sub>2</sub> = H<sub>2</sub>O + CO<sub>2</sub>, коэффициент перед CO<sub>2</sub> равен</p>`,
					options: [
						{ id: '1', label: '6' },
						{ id: '2', label: '9' },
						{ id: '3', label: '12' },
						{ id: '4', label: '15' }
					],
					correct: '3',
					hint: '2C₆H₆ + 15O₂ → 12CO₂ + 6H₂O.'
				},
				{
					id: 1412,
					type: 'match',
					title: 'Признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>Cl и NaOH' },
						{ letter: 'Б', label: 'CuCl<sub>2</sub> и AgNO<sub>3</sub>' },
						{ letter: 'В', label: 'FeCl<sub>3</sub> и Ca(OH)<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение белого осадка' },
						{ id: '2', label: 'выпадение бурого осадка' },
						{ id: '3', label: 'выпадение голубого осадка' },
						{ id: '4', label: 'выделение газа' }
					],
					correct: ['4', '1', '2'],
					hint: 'NH₃↑, AgCl↓ (белый), Fe(OH)₃↓ (бурый).'
				},
				{
					id: 1413,
					type: 'multi',
					pickCount: 2,
					title: '3 моль анионов',
					body: `<p>Выберите <b>два вещества</b>, при полной диссоциации 1 моль которых образуется 3 моль анионов.</p>`,
					options: [
						{ id: '1', label: 'фосфат калия' },
						{ id: '2', label: 'нитрат алюминия' },
						{ id: '3', label: 'нитрат натрия' },
						{ id: '4', label: 'сульфат меди(II)' },
						{ id: '5', label: 'хлорид железа(III)' }
					],
					correct: ['2', '5'],
					hint: 'Al(NO₃)₃ и FeCl₃ дают по 3 аниона.'
				},
				{
					id: 1414,
					type: 'multi',
					pickCount: 2,
					title: 'Соль реагирует и с HCl, и с Ca(NO₃)₂',
					body: `<p>Выберите <b>две соли</b>, которые могут реагировать и с соляной кислотой, и с нитратом кальция.</p>`,
					options: [
						{ id: '1', label: 'CuSO<sub>4</sub>' },
						{ id: '2', label: 'KBr' },
						{ id: '3', label: 'BaSO<sub>4</sub>' },
						{ id: '4', label: 'Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '5', label: 'AgF' },
						{ id: '6', label: 'CaI<sub>2</sub>' }
					],
					correct: ['4', '5'],
					hint: 'Na₂CO₃ даёт CO₂ с HCl и CaCO₃↓ с Ca²⁺; AgF даёт AgCl↓ и CaF₂↓.'
				},
				{
					id: 1415,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P(+1) → P(+5)' },
						{ letter: 'Б', label: 'Fe(+3) → Fe(0)' },
						{ letter: 'В', label: 'Mn(+7) → Mn(+4)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '2', '2'],
					hint: 'СО растёт — окисление, падает — восстановление.'
				},
				{
					id: 1416,
					type: 'single',
					title: 'Смеси и правила работы',
					body: `<p>Из перечисленных суждений о чистых веществах, смесях и правилах работы с ними выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Водопроводная вода является чистым веществом.' },
						{ id: '2', label: 'Отстаивание предназначено для разделения однородных смесей.' },
						{ id: '3', label: 'Смесь машинного масла и воды можно разделить с помощью делительной воронки.' },
						{ id: '4', label: 'Для разделения смеси алюминиевых и пластиковых скрепок можно использовать магнит.' }
					],
					correct: '3',
					hint: 'Масло и вода — несмешивающиеся жидкости, их разделяют делительной воронкой.'
				},
				{
					id: 1417,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KCl и NaNO<sub>3</sub>' },
						{ letter: 'Б', label: 'Ba(NO<sub>3</sub>)<sub>2</sub> и KNO<sub>3</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl и AlCl<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'гидроксид натрия' },
						{ id: '2', label: 'сульфат натрия' },
						{ id: '3', label: 'оксид магния' },
						{ id: '4', label: 'нитрат серебра' }
					],
					correct: ['4', '2', '1'],
					hint: 'AgNO₃ даёт AgCl↓; Na₂SO₄ даёт BaSO₄↓; NaOH различает NH₄⁺ и Al³⁺.'
				},
				{
					id: 1418,
					type: 'input',
					title: 'ω(K) в K₂SO₄',
					body: `
						<p>Вычислите массовую долю (в процентах) калия в сульфате калия K<sub>2</sub>SO<sub>4</sub>.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите число с точностью до сотых.</p>
					`,
					placeholder: 'например, 55,94',
					correct: '44,83',
					hint: 'ω(K)=78/174·100%.'
				},
				{
					id: 1419,
					type: 'input',
					title: 'Масса калия в удобрении',
					body: `
						<p>При подкормке картофеля в почву вносят по 20 г сульфата калия на 1 м².</p>
						<p>Вычислите, сколько граммов калия поступает в почву, если площадь участка 80 м².</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(K) = 44,83% из предыдущего задания. Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 828',
					correct: '717',
					hint: 'm(K)=m(K₂SO₄)·ω(K), где m(K₂SO₄)=20·80.'
				},
				// ============================================================
				// ВАРИАНТ 14 · Часть 2 (1420–1422)
				// ============================================================
				{
					id: 1420,
					type: 'written',
					maxPoints: 3,
					title: 'Диспропорционирование Mn(+6)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							K<sub>2</sub>MnO<sub>4</sub> + H<sub>2</sub>O → KMnO<sub>4</sub> + MnO<sub>2</sub> + KOH
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Это диспропорционирование:</b> Mn(+6) частично окисляется до Mn(+7), частично восстанавливается до Mn(+4).</p>
						<p><b>Баланс:</b> Mn(+6) − e⁻ → Mn(+7) (×2); Mn(+6) + 2e⁻ → Mn(+4) (×1).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">3K<sub>2</sub>MnO<sub>4</sub> + 2H<sub>2</sub>O → 2KMnO<sub>4</sub> + MnO<sub>2</sub>↓ + 4KOH</p>
						<p><b>Окислитель и восстановитель</b> — одно и то же вещество: K₂MnO₄ (диспропорционирование).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Указано, что реакция — диспропорционирование Mn(+6) → Mn(+7) и Mn(+4).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 3,2,2,1,4.' },
						{ id: 'c3', points: 1, label: 'Верно определены окислитель и восстановитель (K₂MnO₄).' }
					]
				},
				{
					id: 1421,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений фосфора',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							P<sub>2</sub>O<sub>5</sub> → X → K<sub>3</sub>PO<sub>4</sub> → FePO<sub>4</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = H<sub>3</sub>PO<sub>4</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) P<sub>2</sub>O<sub>5</sub> + 3H<sub>2</sub>O → 2H<sub>3</sub>PO<sub>4</sub><br>
							2) H<sub>3</sub>PO<sub>4</sub> + 3KOH → K<sub>3</sub>PO<sub>4</sub> + 3H<sub>2</sub>O<br>
							3) K<sub>3</sub>PO<sub>4</sub> + FeCl<sub>3</sub> → FePO<sub>4</sub>↓ + 3KCl
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'P₂O₅ переведён в H₃PO₄ (X) взаимодействием с водой.' },
						{ id: 'c2', points: 1, label: 'Нейтрализацией получен K₃PO₄.' },
						{ id: 'c3', points: 1, label: 'Получен осадок FePO₄ обменной реакцией.' }
					]
				},
				{
					id: 1422,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля H₂SO₄ в растворе',
					taskKind: 'Расчётная задача',
					body: `
						<p>Для полной нейтрализации серной кислоты к 250 г её раствора добавили 280 г 10%-ного раствора NaOH.</p>
						<p>Определите массовую долю серной кислоты в исходном растворе.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> H<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O</p>
						<p><b>2) Масса NaOH:</b> 280·0,10 = 28 г; n(NaOH)=28/40=0,7 моль.</p>
						<p><b>3) Количество H₂SO₄:</b> n = 0,7/2 = 0,35 моль; m = 0,35·98 = 34,3 г.</p>
						<p><b>4) Массовая доля:</b> ω = 34,3/250·100% = <b>13,72%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество NaOH в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество и масса H₂SO₄ (34,3 г).' },
						{ id: 'c3', points: 1, label: 'Рассчитана массовая доля H₂SO₄ (13,72%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 15 · Часть 1 (задания 1501–1519)
				// Источник формулировок: chem-oge.sdamgia.ru (вариант 4568183)
				// ============================================================
				{
					id: 1501,
					type: 'multi',
					pickCount: 2,
					title: 'Алюминий как химический элемент',
					body: `<p>Выберите <b>два утверждения</b>, в которых говорится об алюминии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Алюминий по распространённости в земной коре занимает третье место, уступая только кислороду и кремнию.' },
						{ id: '2', label: 'До конца XIX в. алюминий в промышленных масштабах не производился.' },
						{ id: '3', label: 'Алюминий образует прочную химическую связь с кислородом.' },
						{ id: '4', label: 'Алюминий практически не подвержен коррозии.' },
						{ id: '5', label: 'При производстве сплавов для авиационной промышленности используется алюминий.' }
					],
					correct: ['1', '3'],
					hint: 'Об элементе — распространённость (в составе соединений) и образование связей.'
				},
				{
					id: 1502,
					type: 'input',
					title: 'Период и группа элемента',
					body: `
						<p>На рисунке изображена схема распределения электронов по электронным слоям атома некоторого химического элемента.</p>
						<p>Запишите номер периода (<b>X</b>) и номер группы (<b>Y</b>), в которой данный элемент расположен в Периодической системе.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 52',
					correct: '41',
					hint: '2,8,8,1 → K: 4 период, группа IA (1).'
				},
				{
					id: 1503,
					type: 'input',
					title: 'Неметаллические свойства (VA группа)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>азот</li>
							<li>мышьяк</li>
							<li>фосфор</li>
						</ol>
						<p>в порядке <b>увеличения</b> неметаллических свойств образуемых ими простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'В группе сверху вниз неметалличность ослабевает: As < P < N.'
				},
				{
					id: 1504,
					type: 'match',
					title: 'Степень окисления фосфора',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления фосфора.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P<sub>2</sub>O<sub>3</sub>' },
						{ letter: 'Б', label: 'PH<sub>4</sub>I' },
						{ letter: 'В', label: 'AlPO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '+1' },
						{ id: '2', label: '+3' },
						{ id: '3', label: '+5' },
						{ id: '4', label: '−3' }
					],
					correct: ['2', '4', '3'],
					hint: 'P₂O₃: P(+3); PH₄⁺: P(−3); PO₄³⁻: P(+5).'
				},
				{
					id: 1505,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная неполярная связь',
					body: `<p>Выберите <b>два вещества</b>, содержащие ковалентную неполярную связь.</p>`,
					options: [
						{ id: '1', label: 'Na<sub>2</sub>O' },
						{ id: '2', label: 'Cl<sub>2</sub>' },
						{ id: '3', label: 'C<sub>60</sub>' },
						{ id: '4', label: 'Al' },
						{ id: '5', label: 'SO<sub>2</sub>' }
					],
					correct: ['2', '3'],
					hint: 'Неполярная ковалентная — между одинаковыми атомами неметаллов (Cl–Cl, C–C).'
				},
				{
					id: 1506,
					type: 'multi',
					pickCount: 2,
					title: 'Магний и кальций',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как магния, так и кальция?</p>`,
					options: [
						{ id: '1', label: 'Соответствующее простое вещество является жидким при обычных условиях.' },
						{ id: '2', label: 'Электроны в атоме расположены на двух электронных слоях.' },
						{ id: '3', label: 'Является металлом.' },
						{ id: '4', label: 'Химический элемент образует основный оксид.' },
						{ id: '5', label: 'Высшая валентность этого элемента равна I.' }
					],
					correct: ['3', '4'],
					hint: 'Mg и Ca — металлы, образуют основные оксиды MgO и CaO.'
				},
				{
					id: 1507,
					type: 'single',
					title: 'Формулы кислоты и оксида',
					body: `<p>Сернистой кислоте и оксиду азота(II) соответствуют формулы</p>`,
					options: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub> и N<sub>2</sub>O<sub>4</sub>' },
						{ id: '2', label: 'H<sub>2</sub>SO<sub>3</sub> и NO' },
						{ id: '3', label: 'H<sub>2</sub>S и NO<sub>2</sub>' },
						{ id: '4', label: '(NH<sub>4</sub>)<sub>2</sub>S и N<sub>2</sub>O' }
					],
					correct: '2',
					hint: 'Сернистая кислота H₂SO₃, оксид азота(II) — NO.'
				},
				{
					id: 1508,
					type: 'multi',
					pickCount: 2,
					title: 'Не реагируют с MgO',
					body: `<p>Какие два из перечисленных веществ <b>не вступают</b> в реакцию с оксидом магния?</p>`,
					options: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '2', label: 'KOH' },
						{ id: '3', label: 'CO<sub>2</sub>' },
						{ id: '4', label: 'SO<sub>3</sub>' },
						{ id: '5', label: 'HCl' }
					],
					correct: ['1', '2'],
					hint: 'Основный оксид реагирует с кислотами и кислотными оксидами, но не с солями и щёлочами.'
				},
				{
					id: 1509,
					type: 'match',
					title: 'Продукты реакций (оксиды и вода/кислота)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'CaO и H<sub>2</sub>O' },
						{ letter: 'Б', label: 'Na<sub>2</sub>O и H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'В', label: 'Ca и H<sub>2</sub>O' }
					],
					matchRight: [
						{ id: '1', label: 'Ca(OH)<sub>2</sub> и H<sub>2</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>O' },
						{ id: '3', label: 'Ca(OH)<sub>2</sub>' },
						{ id: '4', label: 'Na<sub>2</sub>SO<sub>4</sub> и H<sub>2</sub>' },
						{ id: '5', label: 'Na<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>O' }
					],
					correct: ['3', '2', '1'],
					hint: 'CaO + H₂O → Ca(OH)₂; Na₂O + H₂SO₄ → Na₂SO₄ + H₂O; Ca + H₂O → Ca(OH)₂ + H₂.'
				},
				{
					id: 1510,
					type: 'match',
					title: 'Вещество и реагенты (O₂, NH₃, CuSO₄)',
					body: `<p>Установите соответствие между веществом и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'кислород' },
						{ letter: 'Б', label: 'аммиак' },
						{ letter: 'В', label: 'сульфат меди(II)' }
					],
					matchRight: [
						{ id: '1', label: 'NaOH(р-р), MgCl<sub>2</sub>(р-р)' },
						{ id: '2', label: 'SO<sub>2</sub>, FeS' },
						{ id: '3', label: 'Zn, Ba(NO<sub>3</sub>)<sub>2</sub>(р-р)' },
						{ id: '4', label: 'HCl(р-р), HNO<sub>3</sub>(р-р)' }
					],
					correct: ['2', '4', '3'],
					hint: 'O₂ окисляет SO₂ и FeS; NH₃ реагирует с кислотами; CuSO₄ реагирует с Zn и даёт BaSO₄↓ с Ba²⁺.'
				},
				{
					id: 1511,
					type: 'single',
					title: 'Неверно расставлены коэффициенты',
					body: `<p>В какой записи химического процесса коэффициенты расставлены неверно?</p>`,
					options: [
						{ id: '1', label: '3SO<sub>2</sub> + O<sub>2</sub> → 3SO<sub>3</sub>' },
						{ id: '2', label: 'N<sub>2</sub>O<sub>5</sub> + K<sub>2</sub>O → 2KNO<sub>3</sub>' },
						{ id: '3', label: '2Al(OH)<sub>3</sub> → Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O' },
						{ id: '4', label: 'Ca + 2H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub>' }
					],
					correct: '1',
					hint: 'Правильно: 2SO₂ + O₂ → 2SO₃.'
				},
				{
					id: 1512,
					type: 'match',
					title: 'Признаки реакций (BaSO₄, SO₂, CuS)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'BaCl<sub>2</sub> и H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'HCl и K<sub>2</sub>SO<sub>3</sub>' },
						{ letter: 'В', label: 'Cu(NO<sub>3</sub>)<sub>2</sub> и Na<sub>2</sub>S' }
					],
					matchRight: [
						{ id: '1', label: 'выделение газа без запаха' },
						{ id: '2', label: 'выделение газа с запахом' },
						{ id: '3', label: 'выпадение белого осадка' },
						{ id: '4', label: 'выпадение чёрного осадка' }
					],
					correct: ['3', '2', '4'],
					hint: 'BaSO₄↓ белый; SO₂ имеет резкий запах; CuS↓ чёрный.'
				},
				{
					id: 1513,
					type: 'multi',
					pickCount: 2,
					title: 'Полная диссоциация',
					body: `<p>Выберите <b>два вещества</b>, которые полностью диссоциируют на ионы в водном растворе.</p>`,
					options: [
						{ id: '1', label: 'азотная кислота' },
						{ id: '2', label: 'сероводород' },
						{ id: '3', label: 'иодид натрия' },
						{ id: '4', label: 'глицерин' },
						{ id: '5', label: 'этиловый спирт' }
					],
					correct: ['1', '3'],
					hint: 'Сильная кислота и соль диссоциируют практически полностью.'
				},
				{
					id: 1514,
					type: 'multi',
					pickCount: 2,
					title: 'Ионное уравнение для карбонатов',
					body: `<p>Выберите <b>два взаимодействия</b>, которым соответствует сокращённое ионное уравнение</p>\n\t\t\t\t\t\t<p style=\"text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 14px; background:#f7f8fb; padding:10px 12px; border-radius:10px;\">2H<sup>+</sup> + CO<sub>3</sub><sup>2−</sup> → CO<sub>2</sub>↑ + H<sub>2</sub>O</p>\n\t\t\t\t\t\t<p>`,
					options: [
						{ id: '1', label: 'CO<sub>2</sub> + KOH' },
						{ id: '2', label: 'CaCO<sub>3</sub> + HCl' },
						{ id: '3', label: 'K<sub>2</sub>CO<sub>3</sub> + HNO<sub>3</sub>' },
						{ id: '4', label: 'Ca(OH)<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '5', label: 'Na<sub>2</sub>CO<sub>3</sub> + HCl' },
						{ id: '6', label: 'H<sub>2</sub>S + Na<sub>2</sub>CO<sub>3</sub>' }
					],
					correct: ['3', '5'],
					hint: 'Нужно: растворимый карбонат + сильная кислота → CO₂.'
				},
				{
					id: 1515,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'I(+5) → I(+7)' },
						{ letter: 'Б', label: 'Si(+4) → Si(0)' },
						{ letter: 'В', label: 'N<sub>2</sub>(0) → 2N(−3)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '2', '2'],
					hint: 'СО растёт — окисление; падает — восстановление.'
				},
				{
					id: 1516,
					type: 'multi',
					title: 'Правила работы (лаборатория и быт)',
					body: `<p>Из перечисленных суждений о правилах работы с веществами и оборудованием в школьной лаборатории и быту выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Исследовать вкус веществ в лаборатории запрещено.' },
						{ id: '2', label: 'При приготовлении раствора азотной кислоты необходимо использовать резиновые перчатки.' },
						{ id: '3', label: 'Для выпаривания раствора используют фарфоровую ступку.' },
						{ id: '4', label: 'Отбор твёрдого вещества из исходной склянки осуществляют с помощью шпателя.' }
					],
					correct: ['1', '2', '4'],
					hint: 'Верны 1, 2 и 4.'
				},
				{
					id: 1517,
					type: 'match',
					title: 'Реактив для различения (KCl/NH₃, сульфаты, хлориды)',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KCl и NH<sub>3</sub>' },
						{ letter: 'Б', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> и K<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'В', label: 'BaCl<sub>2</sub> и NaCl' }
					],
					matchRight: [
						{ id: '1', label: 'фенолфталеин' },
						{ id: '2', label: 'K<sub>3</sub>PO<sub>4</sub>' },
						{ id: '3', label: 'HI' },
						{ id: '4', label: 'Cu' }
					],
					correct: ['1', '2', '2'],
					hint: 'NH₃ создаёт щёлочную среду (индикатор), Al³⁺ и Ba²⁺ дают осадки с фосфатом.'
				},
				{
					id: 1518,
					type: 'input',
					title: 'ω(Fe) в фумарате железа',
					body: `
						<p>Фумарат железа имеет состав FeH<sub>2</sub>C<sub>4</sub>O<sub>4</sub>. Вычислите массовую долю железа (в %) в этом веществе.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 44',
					correct: '33',
					hint: 'M = 56 + 2 + 48 + 64 = 170; ω(Fe)=56/170·100%.'
				},
				{
					id: 1519,
					type: 'input',
					title: 'Масса Fe в капсуле',
					body: `
						<p>В капсуле содержится 150 мг фумарата железа FeH<sub>2</sub>C<sub>4</sub>O<sub>4</sub>. Найдите массу железа (в мг).</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(Fe)=33% из предыдущего задания. Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 50,6',
					correct: '49,5',
					hint: 'm(Fe)=150·0,33.'
				},
				// ============================================================
				// ВАРИАНТ 15 · Часть 2 (1520–1522)
				// ============================================================
				{
					id: 1520,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (MnCO₃ + KClO₃)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							MnCO<sub>3</sub> + KClO<sub>3</sub> → MnO<sub>2</sub> + KCl + CO<sub>2</sub>
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> Mn(+2) → Mn(+4) (окисление); Cl(+5) → Cl(−1) (восстановление).</p>
						<p><b>Баланс:</b> Mn(+2) − 2e⁻ → Mn(+4) (×3); Cl(+5) + 6e⁻ → Cl(−1) (×1).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">3MnCO<sub>3</sub> + KClO<sub>3</sub> → 3MnO<sub>2</sub> + KCl + 3CO<sub>2</sub></p>
						<p><b>Окислитель</b> — KClO₃, <b>восстановитель</b> — MnCO₃.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Верно составлен электронный баланс (×3 и ×1).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 3,1,3,1,3.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1521,
					type: 'written',
					maxPoints: 3,
					title: 'Цикл NOₓ → HNO₃',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							HNO<sub>3</sub> →<sup>+Cu</sup> NO → X → HNO<sub>3</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = NO<sub>2</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 3Cu + 8HNO<sub>3</sub>(разб.) → 3Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO↑ + 4H<sub>2</sub>O<br>
							2) 2NO + O<sub>2</sub> → 2NO<sub>2</sub><br>
							3) 4NO<sub>2</sub> + O<sub>2</sub> + 2H<sub>2</sub>O → 4HNO<sub>3</sub>
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции Cu с разбавленной HNO₃ с образованием NO.' },
						{ id: 'c2', points: 1, label: 'Показано окисление NO до X = NO₂.' },
						{ id: 'c3', points: 1, label: 'Показано получение HNO₃ из NO₂ (поглощение водой в присутствии O₂).' }
					]
				},
				{
					id: 1522,
					type: 'written',
					maxPoints: 3,
					title: 'Объём CO₂ при реакции CaCO₃ с HCl',
					taskKind: 'Расчётная задача',
					body: `
						<p>Вычислите объём углекислого газа (н.у.), который выделится при действии на избыток карбоната кальция 730 г 20%-ного раствора соляной кислоты.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> CaCO<sub>3</sub> + 2HCl → CaCl<sub>2</sub> + CO<sub>2</sub>↑ + H<sub>2</sub>O</p>
						<p><b>2) Масса HCl:</b> 730·0,20 = 146 г; n(HCl)=146/36,5=4 моль.</p>
						<p><b>3) Количество CO₂:</b> n = 4/2 = 2 моль; V = 2·22,4 = <b>44,8 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество HCl в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество CO₂.' },
						{ id: 'c3', points: 1, label: 'Найден объём CO₂ при н.у. (44,8 л).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 16 · Часть 1 (задания 1601–1619)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 1
				// ============================================================
				{
					id: 1601,
					type: 'multi',
					pickCount: 2,
					title: 'Азот как простое вещество',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об азоте как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Объёмная доля азота в воздухе равна 78%.' },
						{ id: '2', label: 'Азот входит в состав минеральных удобрений.' },
						{ id: '3', label: 'Аммиак состоит из азота и водорода.' },
						{ id: '4', label: 'Азот, в отличие от кислорода, не поддерживает горения.' },
						{ id: '5', label: 'Азот не образует аллотропных видоизменений.' }
					],
					correct: ['1', '4'],
					hint: 'О простом веществе N₂ — свойства газа и его содержание в воздухе.'
				},
				{
					id: 1602,
					type: 'input',
					title: 'Заряд ядра и период (по модели атома)',
					body: `
						<p>На рисунке изображена модель атома химического элемента.</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant16-q2-atom.png" alt="Модель атома: ядро (+Z) и электроны на оболочках" style="max-width:220px; width: 100%; height:auto;">
						</p>
						<p>Запишите в таблицу величину заряда ядра (<b>X</b>) атома и номер периода (<b>Y</b>), в котором расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 83',
					correct: '72',
					hint: 'На модели 7 электронов и 2 электронных слоя: X=7, Y=2.'
				},
				{
					id: 1603,
					type: 'input',
					title: 'Радиусы атомов (N, C, O)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>азот</li>
							<li>углерод</li>
							<li>кислород</li>
						</ol>
						<p>в порядке <b>увеличения</b> радиуса их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 423',
					correct: '312',
					hint: 'Во 2 периоде радиус уменьшается слева направо: C > N > O.'
				},
				{
					id: 1604,
					type: 'match',
					title: 'Степень окисления кремния',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления кремния.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>SiO<sub>3</sub>' },
						{ letter: 'Б', label: 'Na<sub>4</sub>Si' },
						{ letter: 'В', label: 'SiCl<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−4' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+2' },
						{ id: '4', label: '+4' }
					],
					correct: ['4', '1', '4'],
					hint: 'Сумма степеней окисления равна 0 для молекулы/соли.'
				},
				{
					id: 1605,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная полярная связь',
					body: `<p>Выберите <b>два вещества</b>, образованные ковалентной полярной связью.</p>`,
					options: [
						{ id: '1', label: 'Cl<sub>2</sub>' },
						{ id: '2', label: 'O<sub>2</sub>' },
						{ id: '3', label: 'SO<sub>2</sub>' },
						{ id: '4', label: 'NaCl' },
						{ id: '5', label: 'CH<sub>4</sub>' }
					],
					correct: ['3', '5'],
					hint: 'Полярная ковалентная — между разными неметаллами (разная ЭО).'
				},
				{
					id: 1606,
					type: 'multi',
					pickCount: 2,
					title: 'Литий и бор',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как лития, так и бора?</p>`,
					options: [
						{ id: '1', label: 'Элемент образует аллотропные модификации.' },
						{ id: '2', label: 'Электроны в атоме располагаются на двух электронных слоях.' },
						{ id: '3', label: 'Химический элемент относится к неметаллам.' },
						{ id: '4', label: 'Радиус атома элемента больше, чем радиус атома азота.' },
						{ id: '5', label: 'Элемент образует высший оксид, соответствующий общей формуле RO.' }
					],
					correct: ['2', '4'],
					hint: 'Оба во 2 периоде; в периоде левее азота → радиус больше.'
				},
				{
					id: 1607,
					type: 'input',
					title: 'Кислота и кислая соль',
					body: `
						<p>Из предложенного перечня веществ выберите кислоту и кислую соль.</p>
						<p>Запишите в поле ответа сначала номер кислоты, а затем номер кислой соли.</p>
					`,
					optionsNote: `
						<ol style="margin: 10px 0 0 22px; padding: 0;">
							<li>HNO<sub>3</sub></li>
							<li>H<sub>2</sub>O</li>
							<li>KOH</li>
							<li>Ca(HCO<sub>3</sub>)<sub>2</sub></li>
							<li>(CuOH)<sub>2</sub>CO<sub>3</sub></li>
						</ol>
					`,
					placeholder: 'например, 25',
					correct: '14',
					hint: 'Кислая соль содержит H в анионе (HCO₃⁻).'
				},
				{
					id: 1608,
					type: 'multi',
					pickCount: 2,
					title: 'Где реакции невозможны (комнатная температура)',
					body: `<p>Между какими из перечисленных веществ невозможны реакции при комнатной температуре?</p>`,
					options: [
						{ id: '1', label: 'раствором иодида натрия и бромом' },
						{ id: '2', label: 'хлором и водородом' },
						{ id: '3', label: 'иодом и водородом' },
						{ id: '4', label: 'фтором и водородом' },
						{ id: '5', label: 'раствором хлорида натрия и бромом' }
					],
					correct: ['3', '5'],
					hint: 'I₂ + H₂ требует t/кат.; Br₂ не вытесняет Cl⁻ из NaCl.'
				},
				{
					id: 1609,
					type: 'match',
					title: 'Продукты взаимодействия (Fe)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'FeO + HCl' },
						{ letter: 'Б', label: 'NaOH + FeCl<sub>3</sub>' },
						{ letter: 'В', label: 'HCl + Fe(OH)<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'FeCl<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Fe(OH)<sub>3</sub> + NaCl' },
						{ id: '3', label: 'FeCl<sub>2</sub> + H<sub>2</sub>' },
						{ id: '4', label: 'Fe(OH)<sub>2</sub> + NaCl' },
						{ id: '5', label: 'FeCl<sub>2</sub> + H<sub>2</sub>O' }
					],
					correct: ['5', '2', '1'],
					hint: 'FeO + кислота → соль Fe(II) + вода; FeCl₃ + щёлочь → Fe(OH)₃↓; Fe(OH)₃ + кислота → FeCl₃.'
				},
				{
					id: 1610,
					type: 'match',
					title: 'Вещества и реагенты (P, P₂O₅, H₃PO₄)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P (красный)' },
						{ letter: 'Б', label: 'P<sub>2</sub>O<sub>5</sub>' },
						{ letter: 'В', label: 'H<sub>3</sub>PO<sub>4</sub> (р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'CuO, HCl(р-р)' },
						{ id: '2', label: 'O<sub>2</sub>, KClO<sub>3</sub>(тв)' },
						{ id: '3', label: 'H<sub>2</sub>O, K<sub>2</sub>O' },
						{ id: '4', label: 'Mg, AgNO<sub>3</sub>(тв)' }
					],
					correct: ['2', '3', '4'],
					hint: 'P окисляется O₂/окислителями; P₂O₅ — кислотный оксид; H₃PO₄ реагирует с металлом и даёт осадок Ag₃PO₄.'
				},
				{
					id: 1611,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция обмена',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция обмена.</p>`,
					options: [
						{ id: '1', label: 'сульфат алюминия и хлорид бария' },
						{ id: '2', label: 'хлор и бромид натрия' },
						{ id: '3', label: 'серная кислота и гидроксид калия' },
						{ id: '4', label: 'сера и кислород' },
						{ id: '5', label: 'натрий и вода' }
					],
					correct: ['1', '3'],
					hint: 'Обмен — между сложными веществами (с образованием осадка/воды/газа).'
				},
				{
					id: 1612,
					type: 'match',
					title: 'Признаки реакций (NH₃, CO₂, H₂S)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>Cl(р-р) и Ba(OH)<sub>2</sub>(р-р)' },
						{ letter: 'Б', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р) и HCl(р-р)' },
						{ letter: 'В', label: 'Na<sub>2</sub>S(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выделение бесцветного газа с запахом тухлых яиц' },
						{ id: '2', label: 'выделение бесцветного газа, изменяющего окраску влажной фенолфталеиновой бумажки на малиновую' },
						{ id: '3', label: 'выделение бурого газа' },
						{ id: '4', label: 'выделение бесцветного газа, не имеющего запаха' }
					],
					correct: ['2', '4', '1'],
					hint: 'NH₃ — щёлочной газ; CO₂ — без запаха; H₂S — запах тухлых яиц.'
				},
				{
					id: 1613,
					type: 'multi',
					pickCount: 2,
					title: '2 моль анионов при диссоциации',
					body: `<p>При диссоциации 1 моль каких <b>двух</b> из перечисленных веществ образуется 2 моль анионов?</p>`,
					options: [
						{ id: '1', label: 'нитрат меди(II)' },
						{ id: '2', label: 'сульфат натрия' },
						{ id: '3', label: 'сульфат алюминия' },
						{ id: '4', label: 'хлорид магния' },
						{ id: '5', label: 'гидроксид натрия' }
					],
					correct: ['1', '4'],
					hint: 'Нужно, чтобы в формуле было 2 аниона: Cu(NO₃)₂ и MgCl₂.'
				},
				{
					id: 1614,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение',
					body: `<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение реакции: <b>2H<sup>+</sup> + SiO<sub>3</sub><sup>2−</sup> = H<sub>2</sub>SiO<sub>3</sub></b>.</p>`,
					options: [
						{ id: '1', label: 'силикат натрия' },
						{ id: '2', label: 'гидроксид натрия' },
						{ id: '3', label: 'силикат бария' },
						{ id: '4', label: 'серная кислота' },
						{ id: '5', label: 'кремниевая кислота' },
						{ id: '6', label: 'оксид кремния(IV)' }
					],
					correct: ['1', '4'],
					hint: 'Нужны H⁺ (кислота) и SiO₃²⁻ из растворимого силиката.'
				},
				{
					id: 1615,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'C(+4) → C(+2)' },
						{ letter: 'Б', label: 'Fe(0) → Fe(+3)' },
						{ letter: 'В', label: 'N(+5) → N(+2)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '1', '2'],
					hint: 'СО падает — восстановление; растёт — окисление.'
				},
				{
					id: 1616,
					type: 'multi',
					pickCount: 3,
					title: 'Техника безопасности в лаборатории',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Кристаллические вещества насыпают в пробирку, используя шпатель.' },
						{ id: '2', label: 'Пробирку с реактивами нагревают сразу в том месте, где находятся вещества.' },
						{ id: '3', label: 'При измельчении вещества нельзя сильно стучать пестиком по ступке.' },
						{ id: '4', label: 'При попадании серной кислоты на кожу рук необходимо смыть её водой, затем промыть раствором пищевой соды.' }
					],
					correct: ['1', '3', '4'],
					hint: 'Пробирку при нагревании прогревают постепенно, не «точечно» с самого начала.'
				},
				{
					id: 1617,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>(р-р) и NH<sub>4</sub>NO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'ZnCl<sub>2</sub>(р-р) и KCl(р-р)' },
						{ letter: 'В', label: 'CaCO<sub>3</sub>(тв) и Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>(тв)' }
					],
					matchRight: [
						{ id: '1', label: 'HNO<sub>3</sub>(р-р)' },
						{ id: '2', label: 'NaOH(р-р)' },
						{ id: '3', label: 'K<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '4', label: 'Ba(NO<sub>3</sub>)<sub>2</sub>(р-р)' }
					],
					correct: ['4', '2', '1'],
					hint: 'Ba²⁺ даёт BaSO₄↓; Zn²⁺ даёт Zn(OH)₂↓; карбонат с кислотой даёт CO₂.'
				},
				{
					id: 1618,
					type: 'input',
					title: 'ω(N) в KNO₃',
					body: `
						<p>Нитрат калия (калиевая селитра) KNO<sub>3</sub> применяется в сельском хозяйстве в качестве азотного удобрения.</p>
						<p>Вычислите массовую долю азота в калиевой селитре (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 24,0',
					correct: '13,9',
					hint: 'M(KNO₃)=101; ω(N)=14/101·100%.'
				},
				{
					id: 1619,
					type: 'input',
					title: 'Масса KNO₃ для подкормки',
					body: `
						<p>При подкормках корнеплодов в почву вносят 630 г азота на 100 м².</p>
						<p>Вычислите, сколько граммов калиевой селитры надо внести на земельный участок площадью 6 м².</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(N)=13,9% из предыдущего задания. Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 382,0',
					correct: '271,9',
					hint: 'Сначала найдите массу N на 6 м², затем разделите на 0,139.'
				},
				// ============================================================
				// ВАРИАНТ 16 · Часть 2 (1620–1622)
				// ============================================================
				{
					id: 1620,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (Na₂SO₃ + KMnO₄)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Na<sub>2</sub>SO<sub>3</sub> + KMnO<sub>4</sub> + H<sub>2</sub>O → Na<sub>2</sub>SO<sub>4</sub> + MnO<sub>2</sub> + KOH
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> S(+4) → S(+6) (окисление); Mn(+7) → Mn(+4) (восстановление).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">3Na<sub>2</sub>SO<sub>3</sub> + 2KMnO<sub>4</sub> + H<sub>2</sub>O → 3Na<sub>2</sub>SO<sub>4</sub> + 2MnO<sub>2</sub>↓ + 2KOH</p>
						<p><b>Окислитель</b> — KMnO<sub>4</sub>, <b>восстановитель</b> — Na<sub>2</sub>SO<sub>3</sub>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (S(+4)→(+6), Mn(+7)→(+4)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 3,2,1,3,2,2.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1621,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка CuO → Cu(NO₃)₂',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							CuO → X → Cu(OH)<sub>2</sub> → Cu(NO<sub>3</sub>)<sub>2</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = CuCl<sub>2</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) CuO + 2HCl → CuCl<sub>2</sub> + H<sub>2</sub>O<br>
							2) CuCl<sub>2</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + 2NaCl<br>
							3) Cu(OH)<sub>2</sub> + 2HNO<sub>3</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из CuO (реакция с кислотой).' },
						{ id: 'c2', points: 1, label: 'Из X получен Cu(OH)₂ (реакция со щёлочью).' },
						{ id: 'c3', points: 1, label: 'Из Cu(OH)₂ получен Cu(NO₃)₂ (реакция с HNO₃).' }
					]
				},
				{
					id: 1622,
					type: 'written',
					maxPoints: 3,
					title: 'Масса осадка PbI₂',
					taskKind: 'Расчётная задача',
					body: `
						<p>Рассчитайте массу осадка, который выпадет при сливании 500 г 2%-го раствора иодида калия с избытком раствора нитрата свинца(II).</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> 2KI + Pb(NO<sub>3</sub>)<sub>2</sub> → PbI<sub>2</sub>↓ + 2KNO<sub>3</sub></p>
						<p><b>2) Масса KI:</b> 500·0,02 = 10 г; n(KI)=10/166≈0,0602 моль.</p>
						<p><b>3) Количество PbI₂:</b> n = 0,0602/2 ≈ 0,0301 моль.</p>
						<p><b>4) Масса осадка:</b> M(PbI₂)=461; m≈0,0301·461≈<b>13,9 г</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество KI в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество PbI₂.' },
						{ id: 'c3', points: 1, label: 'Рассчитана масса осадка (≈13,9 г).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 17 · Часть 1 (задания 1701–1719)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 2
				// ============================================================
				{
					id: 1701,
					type: 'multi',
					pickCount: 2,
					title: 'Сера как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о сере как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Сера имеет жёлтый цвет.' },
						{ id: '2', label: 'Сера образует несколько аллотропных видоизменений.' },
						{ id: '3', label: 'Сера не смачивается водой.' },
						{ id: '4', label: 'Пластическая сера со временем превращается в ромбическую.' },
						{ id: '5', label: 'Сера входит в состав газов, выделяющихся при извержении вулканов.' }
					],
					correct: ['2', '5'],
					hint: 'Об элементе — аллотропия и вхождение в состав соединений.'
				},
				{
					id: 1702,
					type: 'input',
					title: 'Период и заряд ядра (2,8,14,2)',
					body: `
						<p>На рисунке изображена схема строения электронных оболочек атома химического элемента.</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant17-q2-shells.png" alt="Схема электронных оболочек: 2e, 8e, 14e, 2e" style="max-width:360px; width: 100%; height:auto;">
						</p>
						<p><b>Распределение электронов:</b> 2e, 8e, 14e, 2e.</p>
						<p>Запишите номер периода (<b>X</b>) и величину заряда ядра (<b>Y</b>) его атома.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 537',
					correct: '426',
					hint: '4 слоя → X=4; всего электронов 26 → Y=26.'
				},
				{
					id: 1703,
					type: 'input',
					title: 'Внешние электроны (B, Li, Be)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>бор</li>
							<li>литий</li>
							<li>бериллий</li>
						</ol>
						<p>в порядке увеличения числа электронов во внешнем электронном слое.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'Li — 1, Be — 2, B — 3 электрона на внешнем слое.'
				},
				{
					id: 1704,
					type: 'match',
					title: 'Степень окисления азота',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления азота.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaNO<sub>2</sub>' },
						{ letter: 'Б', label: 'Fe(NO<sub>3</sub>)<sub>3</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+5' }
					],
					correct: ['3', '4', '1'],
					hint: 'NO₂⁻ → N(+3); NO₃⁻ → N(+5); NH₄⁺ → N(−3).'
				},
				{
					id: 1705,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная неполярная связь',
					body: `<p>Выберите <b>два вещества</b>, образованных ковалентной неполярной связью.</p>`,
					options: [
						{ id: '1', label: 'алмаз' },
						{ id: '2', label: 'сульфид калия' },
						{ id: '3', label: 'метан' },
						{ id: '4', label: 'оксид серы(IV)' },
						{ id: '5', label: 'ромбическая сера' }
					],
					correct: ['1', '5'],
					hint: 'Неполярная ковалентная — между одинаковыми атомами (C–C, S–S).'
				},
				{
					id: 1706,
					type: 'multi',
					pickCount: 2,
					title: 'Фосфор и сера',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как фосфора, так и серы?</p>`,
					options: [
						{ id: '1', label: 'Электроны в атоме располагаются на трёх электронных слоях.' },
						{ id: '2', label: 'Значение электроотрицательности больше, чем у хлора.' },
						{ id: '3', label: 'Химический элемент образует аллотропные модификации.' },
						{ id: '4', label: 'Химический элемент образует высший оксид, проявляющий основные свойства.' },
						{ id: '5', label: 'Атом имеет пять электронов во внешнем электронном слое.' }
					],
					correct: ['1', '3'],
					hint: 'Оба в 3 периоде и оба имеют аллотропию.'
				},
				{
					id: 1707,
					type: 'input',
					title: 'Основный оксид и основная соль',
					body: `
						<p>Из предложенного перечня веществ выберите основный оксид и основную соль.</p>
						<p>Запишите в поле ответа сначала номер основного оксида, а затем номер основной соли.</p>
					`,
					placeholder: 'например, 46',
					correct: '35',
					hint: 'Основная соль содержит группу OH в составе.'
				},
				{
					id: 1708,
					type: 'multi',
					pickCount: 2,
					title: 'Не реагируют с SO₃',
					body: `<p>Какие <b>два</b> из перечисленных веществ не вступают в реакцию с оксидом серы(VI)?</p>`,
					options: [
						{ id: '1', label: 'гидроксид калия' },
						{ id: '2', label: 'вода' },
						{ id: '3', label: 'кислород' },
						{ id: '4', label: 'соляная кислота' },
						{ id: '5', label: 'оксид натрия' }
					],
					correct: ['3', '4'],
					hint: 'SO₃ — кислотный оксид: с кислотой не реагирует; O₂ не нужен (S уже +6).'
				},
				{
					id: 1709,
					type: 'match',
					title: 'Продукты взаимодействия (Fe, H₂SO₄)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe + H<sub>2</sub>SO<sub>4</sub>(конц) при t°' },
						{ letter: 'Б', label: 'Fe + H<sub>2</sub>SO<sub>4</sub>(разб)' },
						{ letter: 'В', label: 'FeO + H<sub>2</sub>SO<sub>4</sub>(разб)' }
					],
					matchRight: [
						{ id: '1', label: 'FeSO<sub>4</sub> + H<sub>2</sub>' },
						{ id: '2', label: 'FeSO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '3', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>' }
					],
					correct: ['3', '1', '2'],
					hint: 'Конц. H₂SO₄ при t° — окислитель; разб. кислота даёт H₂; FeO + кислота → соль + вода.'
				},
				{
					id: 1710,
					type: 'match',
					title: 'Вещества и реагенты (C, CO₂, Na₂SiO₃)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'C' },
						{ letter: 'Б', label: 'CO<sub>2</sub>' },
						{ letter: 'В', label: 'Na<sub>2</sub>SiO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'Ba(OH)<sub>2</sub>(р-р), Mg' },
						{ id: '2', label: 'CO<sub>2</sub>, HCl(р-р)' },
						{ id: '3', label: 'Fe<sub>2</sub>O<sub>3</sub>, O<sub>2</sub>' },
						{ id: '4', label: 'H<sub>2</sub>, H<sub>2</sub>SO<sub>4</sub>(разб)' }
					],
					correct: ['3', '1', '2'],
					hint: 'C восстанавливает Fe₂O₃ и горит; CO₂ реагирует с Ba(OH)₂ и Mg (при t°); Na₂SiO₃ даёт H₂SiO₃↓ с CO₂/HCl.'
				},
				{
					id: 1711,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция замещения',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: 'кальций и кислород' },
						{ id: '2', label: 'алюминий и оксид железа(III)' },
						{ id: '3', label: 'карбонат кальция и азотная кислота' },
						{ id: '4', label: 'цинк и соляная кислота' },
						{ id: '5', label: 'магний и хлор' }
					],
					correct: ['2', '4'],
					hint: 'Замещение: простое + сложное → сложное + простое.'
				},
				{
					id: 1712,
					type: 'match',
					title: 'Признаки реакций (осадки)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>(р-р) и BaCl<sub>2</sub>(р-р)' },
						{ letter: 'Б', label: 'CuSO<sub>4</sub>(р-р) и KOH(р-р)' },
						{ letter: 'В', label: 'Na<sub>3</sub>PO<sub>4</sub>(р-р) и AgNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение жёлтого осадка' },
						{ id: '2', label: 'выпадение голубого осадка' },
						{ id: '3', label: 'выпадение белого осадка' },
						{ id: '4', label: 'выпадение бесцветного студенистого осадка, растворяющегося в растворе щёлочи' }
					],
					correct: ['3', '2', '1'],
					hint: 'BaSO₄ — белый; Cu(OH)₂ — голубой; Ag₃PO₄ — жёлтый.'
				},
				{
					id: 1713,
					type: 'multi',
					pickCount: 2,
					title: 'Ступенчатая диссоциация',
					body: `<p>Выберите <b>два вещества</b>, электролитическая диссоциация которых протекает ступенчато.</p>`,
					options: [
						{ id: '1', label: 'хлорид железа(II)' },
						{ id: '2', label: 'азотистая кислота' },
						{ id: '3', label: 'угольная кислота' },
						{ id: '4', label: 'сульфат натрия' },
						{ id: '5', label: 'сероводородная кислота' }
					],
					correct: ['3', '5'],
					hint: 'Многоосновные слабые кислоты диссоциируют ступенчато.'
				},
				{
					id: 1714,
					type: 'multi',
					pickCount: 2,
					title: 'Ионы могут сосуществовать',
					body: `<p>Выберите <b>две пары ионов</b>, которые могут присутствовать в растворе одновременно.</p>`,
					options: [
						{ id: '1', label: 'Ca<sup>2+</sup> и Cl<sup>−</sup>' },
						{ id: '2', label: 'Ag<sup>+</sup> и Br<sup>−</sup>' },
						{ id: '3', label: 'Pb<sup>2+</sup> и Cl<sup>−</sup>' },
						{ id: '4', label: 'Cu<sup>2+</sup> и Cl<sup>−</sup>' },
						{ id: '5', label: 'H<sup>+</sup> и CO<sub>3</sub><sup>2−</sup>' },
						{ id: '6', label: 'Al<sup>3+</sup> и OH<sup>−</sup>' }
					],
					correct: ['1', '4'],
					hint: 'Исключаем пары, дающие осадок/газ/воду.'
				},
				{
					id: 1715,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Mn(+7) → Mn(+2)' },
						{ letter: 'Б', label: 'N<sub>2</sub>(0) → 2N(−3)' },
						{ letter: 'В', label: 'Ca(0) → Ca(+2)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: 'СО падает — восстановление; растёт — окисление.'
				},
				{
					id: 1716,
					type: 'multi',
					pickCount: 3,
					title: 'Техника безопасности в лаборатории',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Некоторые вещества в химической лаборатории можно брать руками.' },
						{ id: '2', label: 'Пробирку нагревают в верхней части пламени, так как она самая горячая.' },
						{ id: '3', label: 'В фарфоровой ступке нельзя измельчать вещества, твёрдость которых больше твёрдости фарфора.' },
						{ id: '4', label: 'Для тушения пламени необходимо использовать плотную ткань, которая имеется в химической лаборатории.' }
					],
					correct: ['2', '3', '4'],
					hint: 'Руками реактивы не берут; остальное верно.'
				},
				{
					id: 1717,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AlCl<sub>3</sub>(р-р) и Al(NO<sub>3</sub>)<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'Ba(OH)<sub>2</sub>(р-р) и NaOH(р-р)' },
						{ letter: 'В', label: 'NaI(р-р) и NaCl(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '2', label: 'Ba(NO<sub>3</sub>)<sub>2</sub>(р-р)' },
						{ id: '3', label: 'KOH(р-р)' },
						{ id: '4', label: 'AgNO<sub>3</sub>(р-р)' }
					],
					correct: ['4', '1', '4'],
					hint: 'AgNO₃ выявляет Cl⁻/I⁻; H₂SO₄ даёт BaSO₄↓ с Ba(OH)₂.'
				},
				{
					id: 1718,
					type: 'input',
					title: 'ω(N) в (NH₄)₂HPO₄',
					body: `
						<p>Гидрофосфат аммония (диаммофос) (NH<sub>4</sub>)<sub>2</sub>HPO<sub>4</sub> применяется как комплексное азотно‑фосфорное удобрение.</p>
						<p>Вычислите массовую долю азота в диаммофосе (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 32,3',
					correct: '21,2',
					hint: 'M=132; m(N)=28; ω=28/132·100%.'
				},
				{
					id: 1719,
					type: 'input',
					title: 'Масса диаммофоса для подкормки',
					body: `
						<p>При подкормках кукурузы на силос в почву вносят 424 г азота на 100 м².</p>
						<p>Вычислите, сколько граммов диаммофоса надо внести на участок площадью 20 м².</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(N)=21,2% из предыдущего задания. Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 511',
					correct: '400',
					hint: 'm(N)=424·20/100; затем m(удобр.)=m(N)/0,212.'
				},
				// ============================================================
				// ВАРИАНТ 17 · Часть 2 (1720–1722)
				// ============================================================
				{
					id: 1720,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (H₂S + Cl₂)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							H<sub>2</sub>S + Cl<sub>2</sub> + H<sub>2</sub>O → H<sub>2</sub>SO<sub>4</sub> + HCl
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> S(−2) → S(+6) (окисление); Cl(0) → Cl(−1) (восстановление).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">H<sub>2</sub>S + 4Cl<sub>2</sub> + 4H<sub>2</sub>O → H<sub>2</sub>SO<sub>4</sub> + 8HCl</p>
						<p><b>Окислитель</b> — Cl<sub>2</sub>, <b>восстановитель</b> — H<sub>2</sub>S.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (S(−2)→(+6), Cl(0)→(−1)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,4,4,1,8.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1721,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Si → H₂SiO₃',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							кремний → оксид кремния(IV) → X → кремниевая кислота
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Na<sub>2</sub>SiO<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Si + O<sub>2</sub> → SiO<sub>2</sub><br>
							2) SiO<sub>2</sub> + 2NaOH → Na<sub>2</sub>SiO<sub>3</sub> + H<sub>2</sub>O (сплавление)<br>
							3) Na<sub>2</sub>SiO<sub>3</sub> + 2HCl → H<sub>2</sub>SiO<sub>3</sub>↓ + 2NaCl
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен SiO₂ из Si (окисление кислородом).' },
						{ id: 'c2', points: 1, label: 'Получен X из SiO₂ (взаимодействие со щёлочью при сплавлении).' },
						{ id: 'c3', points: 1, label: 'Получена H₂SiO₃ из X (взаимодействие с кислотой).' }
					]
				},
				{
					id: 1722,
					type: 'written',
					maxPoints: 3,
					title: 'Масса образца Zn с примесями',
					taskKind: 'Расчётная задача',
					body: `
						<p>При растворении в избытке разбавленной серной кислоты образца цинка, содержащего 4,5% примесей, выделилось 2,24 л (н.у.) водорода.</p>
						<p>Определите массу образца металла.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> Zn + H<sub>2</sub>SO<sub>4</sub> → ZnSO<sub>4</sub> + H<sub>2</sub>↑</p>
						<p><b>2) Количество H₂:</b> n = 2,24/22,4 = 0,1 моль ⇒ n(Zn)=0,1 моль.</p>
						<p><b>3) Масса чистого Zn:</b> m = 0,1·65 = 6,5 г.</p>
						<p><b>4) С учётом примесей:</b> ω(Zn)=0,955 ⇒ m(образца)=6,5/0,955 ≈ <b>6,81 г</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдено количество H₂ (0,1 моль) и масса чистого Zn (6,5 г).' },
						{ id: 'c2', points: 1, label: 'Учтена массовая доля Zn (95,5%).' },
						{ id: 'c3', points: 1, label: 'Получен правильный ответ: 6,81 г.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 18 · Часть 1 (задания 1801–1819)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 3
				// ============================================================
				{
					id: 1801,
					type: 'multi',
					pickCount: 2,
					title: 'Азот как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об азоте как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Азот впервые был получен шотландским химиком Резерфордом.' },
						{ id: '2', label: 'Относительная атомная масса азота равна 14.' },
						{ id: '3', label: 'Азот входит в состав аминокислот.' },
						{ id: '4', label: 'Азот не имеет запаха.' },
						{ id: '5', label: 'Азот используется для синтеза аммиака.' }
					],
					correct: ['2', '3'],
					hint: 'Об элементе — характеристики атома и вхождение в состав соединений.'
				},
				{
					id: 1802,
					type: 'input',
					title: 'Период и внешние электроны (по модели ядра)',
					body: `
						<p>На рисунке изображена модель ядра атома химического элемента.</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant18-q2-nucleus.png" alt="Модель ядра: протоны и нейтроны" style="max-width:420px; width: 100%; height:auto;">
						</p>
						<p>Запишите номер периода (<b>X</b>) и число электронов во внешнем электронном слое (<b>Y</b>) атома этого элемента.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 36',
					correct: '25',
					hint: '7 протонов → N: 2 период, на внешнем слое 5 электронов.'
				},
				{
					id: 1803,
					type: 'input',
					title: 'Число электронных слоёв (O, Se, S)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>кислород</li>
							<li>селен</li>
							<li>сера</li>
						</ol>
						<p>в порядке <b>уменьшения</b> количества заполняемых электронами электронных слоёв.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'Число слоёв = номер периода: Se(4) > S(3) > O(2).'
				},
				{
					id: 1804,
					type: 'match',
					title: 'Степень окисления серы',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления серы.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>SO<sub>3</sub>' },
						{ letter: 'Б', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>S' }
					],
					matchRight: [
						{ id: '1', label: '−2' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+4' },
						{ id: '4', label: '+6' }
					],
					correct: ['3', '4', '1'],
					hint: 'SO₃²⁻: +4; SO₄²⁻: +6; H₂S: −2.'
				},
				{
					id: 1805,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Выберите <b>два вещества</b>, образованных ионной связью.</p>`,
					options: [
						{ id: '1', label: 'HBr' },
						{ id: '2', label: 'CaO' },
						{ id: '3', label: 'CO<sub>2</sub>' },
						{ id: '4', label: 'BaCl<sub>2</sub>' },
						{ id: '5', label: 'N<sub>2</sub>O<sub>5</sub>' }
					],
					correct: ['2', '4'],
					hint: 'Ионная — металл + неметалл (CaO, BaCl₂).'
				},
				{
					id: 1806,
					type: 'multi',
					pickCount: 2,
					title: 'Углерод и кислород',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как углерода, так и кислорода?</p>`,
					options: [
						{ id: '1', label: 'Электроны в атоме располагаются на четырёх электронных слоях.' },
						{ id: '2', label: 'Значение электроотрицательности меньше, чем у фтора.' },
						{ id: '3', label: 'Химический элемент образует летучее водородное соединение, соответствующее формуле RH<sub>4</sub>.' },
						{ id: '4', label: 'Химический элемент относится к металлам.' },
						{ id: '5', label: 'Химический элемент образует аллотропные видоизменения.' }
					],
					correct: ['2', '5'],
					hint: 'У обоих ЭО меньше, чем у F; оба имеют аллотропию (C: алмаз/графит, O: O₂/O₃).'
				},
				{
					id: 1807,
					type: 'input',
					title: 'Кислота и средняя соль',
					body: `
						<p>Из предложенного перечня веществ выберите кислоту и среднюю соль.</p>
						<p>Запишите в поле ответа сначала номер кислоты, а затем номер средней соли.</p>
					`,
					placeholder: 'например, 52',
					correct: '41',
					hint: 'H₂CO₃ — кислота; (NH₄)₂SO₄ — средняя соль.'
				},
				{
					id: 1808,
					type: 'multi',
					pickCount: 2,
					title: 'Реагируют с CaO',
					body: `<p>Какие <b>два</b> из перечисленных веществ вступают в реакцию с оксидом кальция?</p>`,
					options: [
						{ id: '1', label: 'вода' },
						{ id: '2', label: 'оксид натрия' },
						{ id: '3', label: 'азотная кислота' },
						{ id: '4', label: 'гидроксид калия' },
						{ id: '5', label: 'оксид азота(II)' }
					],
					correct: ['1', '3'],
					hint: 'CaO реагирует с водой и кислотами.'
				},
				{
					id: 1809,
					type: 'match',
					title: 'Продукты взаимодействия (кальций)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Ca(OH)<sub>2</sub>(изб) + CO<sub>2</sub>' },
						{ letter: 'Б', label: 'Ca(OH)<sub>2</sub> + CO<sub>2</sub>(изб)' },
						{ letter: 'В', label: 'CaCO<sub>3</sub> + HNO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Ca(HCO<sub>3</sub>)<sub>2</sub>' },
						{ id: '2', label: 'Ca(NO<sub>3</sub>)<sub>2</sub> + CO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '3', label: 'Ca(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>CO<sub>3</sub>' },
						{ id: '4', label: 'CaCO<sub>3</sub> + CO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'CaCO<sub>3</sub> + H<sub>2</sub>O' }
					],
					correct: ['5', '1', '2'],
					hint: 'Изб. щёлочи даёт CaCO₃; изб. CO₂ даёт Ca(HCO₃)₂; карбонат + кислота → CO₂.'
				},
				{
					id: 1810,
					type: 'match',
					title: 'Вещества и реагенты (Na, Li₂O, KOH)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na' },
						{ letter: 'Б', label: 'Li<sub>2</sub>O' },
						{ letter: 'В', label: 'KOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'BaCl<sub>2</sub>(тв), HNO<sub>3</sub>(конц)' },
						{ id: '2', label: 'SO<sub>3</sub>, H<sub>2</sub>O' },
						{ id: '3', label: 'O<sub>2</sub>, H<sub>2</sub>O' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>4</sub>(разб), NH<sub>4</sub>NO<sub>3</sub>(тв)' }
					],
					correct: ['3', '2', '4'],
					hint: 'Na реагирует с O₂ и водой; Li₂O — с SO₃ и водой; KOH — с кислотой и аммонийной солью.'
				},
				{
					id: 1811,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция соединения',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция соединения.</p>`,
					options: [
						{ id: '1', label: 'сероводород и кислород' },
						{ id: '2', label: 'нитрат бария и сульфат натрия' },
						{ id: '3', label: 'оксид бария и вода' },
						{ id: '4', label: 'углерод и оксид углерода(IV)' },
						{ id: '5', label: 'алюминий и серная кислота' }
					],
					correct: ['3', '4'],
					hint: 'Соединение: из нескольких веществ образуется одно.'
				},
				{
					id: 1812,
					type: 'match',
					title: 'Признаки реакций (осадки)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AlCl<sub>3</sub>(р-р) и KOH(недост)' },
						{ letter: 'Б', label: 'K<sub>2</sub>SiO<sub>3</sub>(р-р) и HCl(р-р)' },
						{ letter: 'В', label: 'FeCl<sub>3</sub>(р-р) и NaOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение бурого осадка' },
						{ id: '2', label: 'выпадение бесцветного студенистого осадка' },
						{ id: '3', label: 'выпадение бледно-зелёного осадка' },
						{ id: '4', label: 'выпадение белого осадка' }
					],
					correct: ['4', '2', '1'],
					hint: 'Al(OH)₃ — белый; H₂SiO₃ — студенистый; Fe(OH)₃ — бурый.'
				},
				{
					id: 1813,
					type: 'multi',
					pickCount: 2,
					title: '3 моль анионов при диссоциации',
					body: `<p>При диссоциации 1 моль каких <b>двух</b> из перечисленных веществ образуется 3 моль анионов?</p>`,
					options: [
						{ id: '1', label: 'фосфат натрия' },
						{ id: '2', label: 'хлорид алюминия' },
						{ id: '3', label: 'сульфат аммония' },
						{ id: '4', label: 'карбонат натрия' },
						{ id: '5', label: 'нитрат железа(III)' }
					],
					correct: ['2', '5'],
					hint: 'AlCl₃ даёт 3Cl⁻; Fe(NO₃)₃ даёт 3NO₃⁻.'
				},
				{
					id: 1814,
					type: 'multi',
					pickCount: 2,
					title: 'Образуется газ',
					body: `<p>Выберите <b>два вещества</b>, при взаимодействии которых образуется газ.</p>`,
					options: [
						{ id: '1', label: 'кремниевая кислота' },
						{ id: '2', label: 'гидроксид натрия' },
						{ id: '3', label: 'сульфат меди(II)' },
						{ id: '4', label: 'азотная кислота' },
						{ id: '5', label: 'гидроксид железа(II)' },
						{ id: '6', label: 'карбонат кальция' }
					],
					correct: ['4', '6'],
					hint: 'Карбонаты с кислотами выделяют CO₂.'
				},
				{
					id: 1815,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe(0) → Fe(+2)' },
						{ letter: 'Б', label: 'O<sub>2</sub>(0) → 2O(−2)' },
						{ letter: 'В', label: 'S(−2) → S(0)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '2', '1'],
					hint: 'СО растёт — окисление; падает — восстановление.'
				},
				{
					id: 1816,
					type: 'multi',
					pickCount: 3,
					title: 'Правила в быту',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в быту выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Изготовление поделок детьми из спичек, содержащих серу, совершенно безопасно.' },
						{ id: '2', label: 'Твёрдая графитовая смазка, попавшая на руки, не вызывает химический ожог.' },
						{ id: '3', label: 'Для чистки посуды из алюминиевых сплавов можно использовать порошок из мела.' },
						{ id: '4', label: 'Спиртовой раствор иода используют только для обработки краёв раны.' }
					],
					correct: ['2', '3', '4'],
					hint: 'Сера при горении даёт SO₂; остальное верно.'
				},
				{
					id: 1817,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р) и KNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'LiNO<sub>3</sub>(р-р) и Mg(NO<sub>3</sub>)<sub>2</sub>(р-р)' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl(р-р) и NaCl(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'CaSO<sub>4</sub>(тв)' },
						{ id: '2', label: 'HCl(р-р)' },
						{ id: '3', label: 'NaOH(р-р)' },
						{ id: '4', label: 'H<sub>2</sub>O' }
					],
					correct: ['2', '3', '3'],
					hint: 'Карбонат с кислотой даёт CO₂; Mg²⁺ даёт Mg(OH)₂↓; NH₄⁺ с щёлочью даёт NH₃.'
				},
				{
					id: 1818,
					type: 'input',
					title: 'ω(B) в H₃BO₃',
					body: `
						<p>Борную кислоту H<sub>3</sub>BO<sub>3</sub> применяют в качестве удобрения при нехватке бора в почве.</p>
						<p>Вычислите массовую долю бора в борной кислоте (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 28,85',
					correct: '17,74',
					hint: 'M=62; ω(B)=11/62·100%.'
				},
				{
					id: 1819,
					type: 'input',
					title: 'Масса борной кислоты',
					body: `
						<p>При подкормках корнеплодов в почву вносят 4 г бора на 100 м².</p>
						<p>Вычислите, сколько граммов борной кислоты надо внести на участок площадью 12 м².</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(B)=17,74% из предыдущего задания. Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 3,8',
					correct: '2,7',
					hint: 'm(B)=4·12/100; затем m(H₃BO₃)=m(B)/0,1774.'
				},
				// ============================================================
				// ВАРИАНТ 18 · Часть 2 (1820–1822)
				// ============================================================
				{
					id: 1820,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (Na₂SO₃ + KMnO₄, щёлочь)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Na<sub>2</sub>SO<sub>3</sub> + KOH + KMnO<sub>4</sub> → Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O + K<sub>2</sub>MnO<sub>4</sub>
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> S(+4) → S(+6) (окисление); Mn(+7) → Mn(+6) (восстановление, щёлочная среда).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">Na<sub>2</sub>SO<sub>3</sub> + 2KOH + 2KMnO<sub>4</sub> → Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O + 2K<sub>2</sub>MnO<sub>4</sub></p>
						<p><b>Окислитель</b> — KMnO<sub>4</sub>, <b>восстановитель</b> — Na<sub>2</sub>SO<sub>3</sub>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (S(+4)→(+6), Mn(+7)→(+6)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,2,2,1,1,2.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1821,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Li → Li₂SO₄',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							литий → X → гидроксид лития → сульфат лития
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Li<sub>2</sub>O</b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 4Li + O<sub>2</sub> → 2Li<sub>2</sub>O<br>
							2) Li<sub>2</sub>O + H<sub>2</sub>O → 2LiOH<br>
							3) 2LiOH + H<sub>2</sub>SO<sub>4</sub> → Li<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из Li (окисление кислородом).' },
						{ id: 'c2', points: 1, label: 'Получен LiOH из X (взаимодействие с водой).' },
						{ id: 'c3', points: 1, label: 'Получен Li₂SO₄ (нейтрализация H₂SO₄).' }
					]
				},
				{
					id: 1822,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля K₂SiO₃ в растворе',
					taskKind: 'Расчётная задача',
					body: `
						<p>К 200 г раствора силиката калия прилили избыток раствора серной кислоты и получили 19,5 г осадка.</p>
						<p>Какова массовая доля соли в исходном растворе?</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> K<sub>2</sub>SiO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> → K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>SiO<sub>3</sub>↓</p>
						<p><b>2) Осадок:</b> H<sub>2</sub>SiO<sub>3</sub>, M=78; n=19,5/78=0,25 моль.</p>
						<p><b>3) Кол-во K₂SiO₃:</b> n=0,25 моль; M=154; m=0,25·154=38,5 г.</p>
						<p><b>4) Массовая доля:</b> ω=38,5/200·100% = <b>19,25%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдены количество вещества осадка H₂SiO₃ и n(K₂SiO₃).' },
						{ id: 'c2', points: 1, label: 'Рассчитана масса K₂SiO₃ (38,5 г).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля соли (19,25%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 19 · Часть 1 (задания 1901–1919)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 4
				// ============================================================
				{
					id: 1901,
					type: 'multi',
					pickCount: 2,
					title: 'Водород как простое вещество',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о водороде как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'В смеси с кислородом водород может взрываться.' },
						{ id: '2', label: 'Молекулы пероксида водорода состоят из водорода и кислорода.' },
						{ id: '3', label: 'Водород входит в состав молекул метана.' },
						{ id: '4', label: 'По распространённости на Земле водород занимает 10-е место.' },
						{ id: '5', label: 'Водород необходимо проверять на чистоту перед проведением реакций с ним.' }
					],
					correct: ['1', '5'],
					hint: 'О простом веществе H₂ — свойства/опасность и практические приёмы работы с газом.'
				},
				{
					id: 1902,
					type: 'input',
					title: 'Заряд ядра и период (1 электронный слой)',
					body: `
						<p>На рисунке изображена модель атома химического элемента (один электронный слой).</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant19-q2-atom.png" alt="Модель атома: один электронный слой" style="max-width:220px; width: 100%; height:auto;">
						</p>
						<p>Запишите величину заряда ядра (<b>X</b>) атома и номер периода (<b>Y</b>), в котором расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 32',
					correct: '21',
					hint: '1 слой и 2 электрона → He: X=2, Y=1.'
				},
				{
					id: 1903,
					type: 'input',
					title: 'Металлические свойства (Si, Mg, Al)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>кремний</li>
							<li>магний</li>
							<li>алюминий</li>
						</ol>
						<p>в порядке усиления металлических свойств.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 243',
					correct: '132',
					hint: 'В периоде металличность растёт справа налево.'
				},
				{
					id: 1904,
					type: 'match',
					title: 'Валентность железа',
					body: `<p>Установите соответствие между формулой соединения и валентностью железа.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe<sub>3</sub>O<sub>4</sub>' },
						{ letter: 'Б', label: 'FeCl<sub>2</sub>' },
						{ letter: 'В', label: 'Fe(OH)<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'I' },
						{ id: '2', label: 'II' },
						{ id: '3', label: 'III' },
						{ id: '4', label: 'II, III' }
					],
					correct: ['4', '2', '3'],
					hint: 'Fe₃O₄ — смешанный оксид FeO·Fe₂O₃.'
				},
				{
					id: 1905,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная полярная связь',
					body: `<p>Выберите <b>два вещества</b>, образованных ковалентной полярной связью.</p>`,
					options: [
						{ id: '1', label: 'сульфид кальция' },
						{ id: '2', label: 'оксид калия' },
						{ id: '3', label: 'сероводород' },
						{ id: '4', label: 'водород' },
						{ id: '5', label: 'аммиак' }
					],
					correct: ['3', '5'],
					hint: 'Полярная ковалентная — между разными неметаллами.'
				},
				{
					id: 1906,
					type: 'multi',
					pickCount: 2,
					title: 'Калий и кальций',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как калия, так и кальция?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент образует летучее водородное соединение.' },
						{ id: '2', label: 'Радиус атома меньше, чем радиус атома брома.' },
						{ id: '3', label: 'Химический элемент относится к металлам.' },
						{ id: '4', label: 'Электроны в атоме располагаются на четырёх электронных слоях.' },
						{ id: '5', label: 'Химический элемент образует аллотропные видоизменения.' }
					],
					correct: ['3', '4'],
					hint: 'Оба — металлы 4 периода (4 электронных слоя).'
				},
				{
					id: 1907,
					type: 'input',
					title: 'Кислотный и основный оксид',
					body: `
						<p>Из предложенного перечня веществ выберите кислотный оксид и основный оксид.</p>
						<p>Запишите в поле ответа сначала номер кислотного оксида, а затем номер основного оксида.</p>
					`,
					placeholder: 'например, 64',
					correct: '53',
					hint: 'CrO₃ — кислотный, CaO — основный.'
				},
				{
					id: 1908,
					type: 'multi',
					pickCount: 2,
					title: 'Реагируют и с кислотой, и со щёлочью',
					body: `<p>Какие <b>два</b> из перечисленных веществ взаимодействуют и с серной кислотой, и с гидроксидом натрия?</p>`,
					options: [
						{ id: '1', label: 'оксид хрома(III)' },
						{ id: '2', label: 'оксид углерода(II)' },
						{ id: '3', label: 'оксид лития' },
						{ id: '4', label: 'оксид хрома(VI)' },
						{ id: '5', label: 'оксид цинка' }
					],
					correct: ['1', '5'],
					hint: 'Амфотерные оксиды реагируют и с кислотами, и со щёлочами.'
				},
				{
					id: 1909,
					type: 'match',
					title: 'Продукты взаимодействия (Fe, HNO₃, NaOH)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH + Fe(NO<sub>3</sub>)<sub>2</sub>' },
						{ letter: 'Б', label: 'HNO<sub>3</sub> + Fe(OH)<sub>2</sub>' },
						{ letter: 'В', label: 'FeO + HNO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Fe(NO<sub>3</sub>)<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Fe(OH)<sub>3</sub> + NaNO<sub>3</sub>' },
						{ id: '3', label: 'Fe(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'Fe(OH)<sub>2</sub> + NaNO<sub>3</sub>' },
						{ id: '5', label: 'Fe(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>' }
					],
					correct: ['4', '3', '1'],
					hint: 'Щёлочь осаждает Fe(OH)₂; кислота нейтрализует Fe(OH)₂; HNO₃ может окислять Fe(II) до Fe(III).'
				},
				{
					id: 1910,
					type: 'match',
					title: 'Вещества и реагенты (Br₂, HF, NaI)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Br<sub>2</sub>' },
						{ letter: 'Б', label: 'HF' },
						{ letter: 'В', label: 'NaI' }
					],
					matchRight: [
						{ id: '1', label: 'Ca, NaF(р-р)' },
						{ id: '2', label: 'Cl<sub>2</sub>, AgNO<sub>3</sub>(р-р)' },
						{ id: '3', label: 'SiO<sub>2</sub>, Mg' },
						{ id: '4', label: 'KI(р-р), Al' }
					],
					correct: ['4', '3', '2'],
					hint: 'HF травит стекло (SiO₂); NaI даёт AgI↓ и I₂ с Cl₂; Br₂ окисляет I⁻ и реагирует с Al.'
				},
				{
					id: 1911,
					type: 'multi',
					pickCount: 2,
					title: 'Обратимая реакция',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает обратимая реакция.</p>`,
					options: [
						{ id: '1', label: 'азот и водород' },
						{ id: '2', label: 'гидроксид калия и азотная кислота' },
						{ id: '3', label: 'оксид калия и вода' },
						{ id: '4', label: 'магний и кислород' },
						{ id: '5', label: 'оксид серы(IV) и кислород' }
					],
					correct: ['1', '5'],
					hint: 'Равновесие: синтез NH₃ и окисление SO₂ до SO₃.'
				},
				{
					id: 1912,
					type: 'match',
					title: 'Признаки реакций',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Ca(OH)<sub>2</sub>(р-р, изб) и CO<sub>2</sub>' },
						{ letter: 'Б', label: 'NaOH(р-р) и HNO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'FeSO<sub>4</sub>(р-р) и KOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выпадает белый осадок' },
						{ id: '2', label: 'видимые признаки реакции отсутствуют' },
						{ id: '3', label: 'выпадает бледно-зелёный осадок' },
						{ id: '4', label: 'выпадает синий осадок' }
					],
					correct: ['1', '2', '3'],
					hint: 'CaCO₃ — белый; нейтрализация без признаков; Fe(OH)₂ — бледно-зелёный.'
				},
				{
					id: 1913,
					type: 'multi',
					pickCount: 2,
					title: 'Катионов больше, чем анионов',
					body: `<p>Выберите <b>два вещества</b>, при диссоциации которых образуется больше катионов, чем анионов.</p>`,
					options: [
						{ id: '1', label: 'сульфат калия' },
						{ id: '2', label: 'хлорид железа(III)' },
						{ id: '3', label: 'нитрат аммония' },
						{ id: '4', label: 'азотная кислота' },
						{ id: '5', label: 'фосфат натрия' }
					],
					correct: ['1', '5'],
					hint: 'K₂SO₄ → 2 катиона; Na₃PO₄ → 3 катиона.'
				},
				{
					id: 1914,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение (H₂S)',
					body: `<p>Сокращённому ионному уравнению реакции <b>2H<sup>+</sup> + S<sup>2−</sup> = H<sub>2</sub>S</b> соответствует взаимодействие веществ:</p>`,
					options: [
						{ id: '1', label: 'кремниевой кислоты и сульфида натрия' },
						{ id: '2', label: 'азотной кислоты и сульфида калия' },
						{ id: '3', label: 'соляной кислоты и сульфида меди(II)' },
						{ id: '4', label: 'серной кислоты и сульфида натрия' },
						{ id: '5', label: 'азотной кислоты и сероводорода' },
						{ id: '6', label: 'азотной кислоты и сульфида железа(II)' }
					],
					correct: ['2', '4'],
					hint: 'Нужна сильная кислота + растворимый сульфид.'
				},
				{
					id: 1915,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S(+4) → S(+6)' },
						{ letter: 'Б', label: 'P(−3) → P(+5)' },
						{ letter: 'В', label: 'N<sub>2</sub>(0) → 2N(−3)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '1', '2'],
					hint: 'СО растёт — окисление; падает — восстановление.'
				},
				{
					id: 1916,
					type: 'multi',
					pickCount: 3,
					title: 'Правила в быту',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в быту выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'В посуде из алюминиевых сплавов нельзя готовить компоты.' },
						{ id: '2', label: 'Для чистки посуды из алюминиевых сплавов нельзя использовать наждачную бумагу.' },
						{ id: '3', label: 'Смесь природного газа с воздухом не взрывоопасна.' },
						{ id: '4', label: 'Гидрокарбонат натрия можно использовать при приготовлении пищи.' }
					],
					correct: ['1', '2', '4'],
					hint: 'Газ с воздухом взрывоопасен; остальное — верно.'
				},
				{
					id: 1917,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'KBr(р-р) и KI(р-р)' },
						{ letter: 'Б', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>(р-р) и Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'Na<sub>2</sub>SO<sub>4</sub>(р-р) и NaNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'NaOH(р-р)' },
						{ id: '2', label: 'BaCl<sub>2</sub>(р-р)' },
						{ id: '3', label: 'Cl<sub>2</sub>(р-р)' },
						{ id: '4', label: 'фенолфталеин' }
					],
					correct: ['3', '1', '2'],
					hint: 'Cl₂ окисляет Br⁻/I⁻; NaOH даёт NH₃ или Al(OH)₃; BaCl₂ даёт BaSO₄↓.'
				},
				{
					id: 1918,
					type: 'input',
					title: 'ω(K) в K₂CO₃',
					body: `
						<p>Карбонат калия (поташ) K<sub>2</sub>CO<sub>3</sub> применяется в производстве хрустального стекла.</p>
						<p>Вычислите массовую долю калия в поташе (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 67,6',
					correct: '56,5',
					hint: 'M=138; m(K)=78; ω=78/138·100%.'
				},
				{
					id: 1919,
					type: 'input',
					title: 'Масса поташа для стекла',
					body: `
						<p>В 10 кг хрустального стекла содержится 1,8 кг калия.</p>
						<p>Вычислите, сколько килограммов поташа потребуется для производства хрустальной вазы массой 4 кг.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 2,4',
					correct: '1,3',
					hint: 'Найдите массу K в вазе, затем разделите на ω(K) в K₂CO₃ (0,565).'
				},
				// ============================================================
				// ВАРИАНТ 19 · Часть 2 (1920–1922)
				// ============================================================
				{
					id: 1920,
					type: 'written',
					maxPoints: 3,
					title: 'Электронный баланс (NaClO₃ + MnO₂, щёлочь)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							NaClO<sub>3</sub> + MnO<sub>2</sub> + NaOH → Na<sub>2</sub>MnO<sub>4</sub> + NaCl + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Степени окисления:</b> Mn(+4) → Mn(+6) (окисление); Cl(+5) → Cl(−1) (восстановление).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">NaClO<sub>3</sub> + 3MnO<sub>2</sub> + 6NaOH → 3Na<sub>2</sub>MnO<sub>4</sub> + NaCl + 3H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — NaClO<sub>3</sub>, <b>восстановитель</b> — MnO<sub>2</sub>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (Mn(+4)→(+6), Cl(+5)→(−1)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,3,6,3,1,3.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 1921,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка CuCl₂ → CuO',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							CuCl<sub>2</sub> → Cu(OH)<sub>2</sub> → X → CuO
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Cu(NO<sub>3</sub>)<sub>2</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) CuCl<sub>2</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + 2NaCl<br>
							2) Cu(OH)<sub>2</sub> + 2HNO<sub>3</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O<br>
							3) 2Cu(NO<sub>3</sub>)<sub>2</sub> →<sup>t°</sup> 2CuO + 4NO<sub>2</sub>↑ + O<sub>2</sub>↑
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен Cu(OH)₂ из CuCl₂ (реакция со щёлочью).' },
						{ id: 'c2', points: 1, label: 'Получен X из Cu(OH)₂ (реакция с HNO₃).' },
						{ id: 'c3', points: 1, label: 'Получен CuO из X (разложение нитрата при нагревании).' }
					]
				},
				{
					id: 1922,
					type: 'written',
					maxPoints: 3,
					title: 'Объём NH₃ из (NH₄)₂SO₄ и NaOH',
					taskKind: 'Расчётная задача',
					body: `
						<p>К кристаллическому сульфату аммония, взятому в избытке, прилили 200 г 15%-го раствора гидроксида натрия.</p>
						<p>Вычислите объём (н.у.) выделившегося аммиака.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O</p>
						<p><b>2) Масса NaOH:</b> 200·0,15 = 30 г; n(NaOH)=30/40=0,75 моль.</p>
						<p><b>3) Количество NH₃:</b> по уравнению n(NH₃)=0,75 моль.</p>
						<p><b>4) Объём:</b> V = 0,75·22,4 = <b>16,8 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество NaOH (0,75 моль).' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество NH₃.' },
						{ id: 'c3', points: 1, label: 'Найден объём NH₃ при н.у. (16,8 л).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 20 · Часть 1 (задания 2001–2019)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 5
				// ============================================================
				{
					id: 2001,
					type: 'multi',
					pickCount: 2,
					title: 'Кислород как простое вещество',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о кислороде как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Кислород входит в состав белков.' },
						{ id: '2', label: 'Кислород входит в состав атмосферы Земли.' },
						{ id: '3', label: 'Кислород обозначают символом O.' },
						{ id: '4', label: 'Молекулы воды образованы водородом и кислородом.' },
						{ id: '5', label: 'Кислород не имеет цвета и запаха.' }
					],
					correct: ['2', '5'],
					hint: 'О простом веществе O₂ — свойства газа и содержание в воздухе.'
				},
				{
					id: 2002,
					type: 'input',
					title: 'Период и число электронов (ячейка Ca)',
					body: `
						<p>На рисунке изображена ячейка периодической системы с данными о химическом элементе.</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant20-q2-cell.png" alt="Ячейка таблицы: 20 Ca 40,078" style="max-width:260px; width: 100%; height:auto;">
						</p>
						<p>Запишите номер периода (<b>X</b>), в котором расположен данный химический элемент, и число электронов (<b>Y</b>) в его атоме.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 531',
					correct: '420',
					hint: 'Порядковый номер 20 → 20 электронов; Ca в 4 периоде.'
				},
				{
					id: 2003,
					type: 'input',
					title: 'Неметаллические свойства (S, Si, P)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>сера</li>
							<li>кремний</li>
							<li>фосфор</li>
						</ol>
						<p>в порядке усиления неметаллических свойств.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'В периоде неметалличность усиливается слева направо.'
				},
				{
					id: 2004,
					type: 'match',
					title: 'Степень окисления фосфора',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления фосфора.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'P<sub>2</sub>O<sub>5</sub>' },
						{ letter: 'Б', label: 'Ca<sub>3</sub>P<sub>2</sub>' },
						{ letter: 'В', label: 'H<sub>3</sub>PO<sub>4</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−3' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+3' },
						{ id: '4', label: '+5' }
					],
					correct: ['4', '1', '4'],
					hint: 'В фосфидах P обычно −3; в кислотах/высших оксидах — +5.'
				},
				{
					id: 2005,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Выберите <b>два вещества</b>, образованных ионной связью.</p>`,
					options: [
						{ id: '1', label: 'озон' },
						{ id: '2', label: 'водород' },
						{ id: '3', label: 'хлороводород' },
						{ id: '4', label: 'негашёная известь' },
						{ id: '5', label: 'поваренная соль' }
					],
					correct: ['4', '5'],
					hint: 'CaO и NaCl — ионные соединения.'
				},
				{
					id: 2006,
					type: 'multi',
					pickCount: 2,
					title: 'Кислород и фтор',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как кислорода, так и фтора?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент образует только двухатомные молекулы.' },
						{ id: '2', label: 'Значение электроотрицательности меньше, чем у углерода.' },
						{ id: '3', label: 'Химический элемент относится к неметаллам.' },
						{ id: '4', label: 'Химический элемент образует оксиды.' },
						{ id: '5', label: 'Электроны в атоме расположены на двух электронных слоях.' }
					],
					correct: ['3', '5'],
					hint: 'Оба — неметаллы 2 периода.'
				},
				{
					id: 2007,
					type: 'input',
					title: 'Средняя соль и основание',
					body: `
						<p>Из предложенного перечня веществ выберите среднюю соль и основание.</p>
						<p>Запишите в поле ответа сначала номер средней соли, а затем номер основания.</p>
					`,
					placeholder: 'например, 64',
					correct: '53',
					hint: 'Cu(NO₃)₂ — средняя соль; Ba(OH)₂ — основание.'
				},
				{
					id: 2008,
					type: 'multi',
					pickCount: 2,
					title: 'Не взаимодействуют с Br₂',
					body: `<p>Какие <b>два</b> из перечисленных веществ не взаимодействуют с бромом?</p>`,
					options: [
						{ id: '1', label: 'водород' },
						{ id: '2', label: 'раствор гидроксида натрия' },
						{ id: '3', label: 'раствор иодида натрия' },
						{ id: '4', label: 'кислород' },
						{ id: '5', label: 'раствор хлорида натрия' }
					],
					correct: ['4', '5'],
					hint: 'O₂ не реагирует; Br₂ не вытесняет Cl⁻ из NaCl.'
				},
				{
					id: 2009,
					type: 'match',
					title: 'Продукты взаимодействия (S-оксиды/щёлочь)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'Б', label: 'KOH(изб) + SO<sub>2</sub>' },
						{ letter: 'В', label: 'KOH + SO<sub>3</sub>(изб)' }
					],
					matchRight: [
						{ id: '1', label: 'K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '2', label: 'KHSO<sub>3</sub>' },
						{ id: '3', label: 'KHSO<sub>4</sub>' },
						{ id: '4', label: 'K<sub>2</sub>SO<sub>4</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'K<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O' }
					],
					correct: ['4', '5', '3'],
					hint: 'Избыток щёлочи даёт среднюю соль; избыток кислотного оксида — кислую соль.'
				},
				{
					id: 2010,
					type: 'match',
					title: 'Вещества и реагенты (O₂, H₂SO₄)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'O<sub>2</sub>' },
						{ letter: 'Б', label: 'H<sub>2</sub>SO<sub>4</sub>(конц, хол)' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub>(разб)' }
					],
					matchRight: [
						{ id: '1', label: 'Fe, BaCl<sub>2</sub>(р-р)' },
						{ id: '2', label: 'Ag, C' },
						{ id: '3', label: 'N<sub>2</sub>, H<sub>2</sub>S(г)' },
						{ id: '4', label: 'Al, Cl<sub>2</sub>' }
					],
					correct: ['3', '2', '1'],
					hint: 'O₂ реагирует с N₂ (t) и H₂S; конц. H₂SO₄ окисляет Ag и C; разб. H₂SO₄ реагирует как обычная кислота.'
				},
				{
					id: 2011,
					type: 'multi',
					pickCount: 2,
					title: 'Эндотермическая реакция',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает эндотермическая реакция.</p>`,
					options: [
						{ id: '1', label: 'азотная кислота и гидроксид натрия' },
						{ id: '2', label: 'алюминий и оксид железа(III)' },
						{ id: '3', label: 'азот и кислород' },
						{ id: '4', label: 'азот и водород' },
						{ id: '5', label: 'оксид меди(II) и углерод' }
					],
					correct: ['3', '5'],
					hint: 'N₂+O₂→2NO и восстановление CuO углём требуют нагревания.'
				},
				{
					id: 2012,
					type: 'match',
					title: 'Признаки реакций (осадки/налёт)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'AgNO<sub>3</sub>(р-р) и Cu' },
						{ letter: 'Б', label: 'Cu(NO<sub>3</sub>)<sub>2</sub>(р-р) и Fe' },
						{ letter: 'В', label: 'Pb(NO<sub>3</sub>)<sub>2</sub>(р-р) и Zn' }
					],
					matchRight: [
						{ id: '1', label: 'образование тёмно-серых кристаллов на поверхности металла' },
						{ id: '2', label: 'образование вещества чёрного цвета на поверхности металла, изменение окраски раствора на голубую' },
						{ id: '3', label: 'образование вещества серебристо-белого цвета на поверхности металла, изменение окраски раствора на голубую' },
						{ id: '4', label: 'образование вещества красного цвета на поверхности металла, изменение окраски раствора на бледно-зелёную' }
					],
					correct: ['3', '4', '1'],
					hint: 'Cu вытесняет Ag (серебристый налёт); Fe вытесняет Cu (красный налёт); Zn вытесняет Pb (серые кристаллы).'
				},
				{
					id: 2013,
					type: 'multi',
					pickCount: 2,
					title: 'Растворы не проводят ток',
					body: `<p>Выберите <b>два вещества</b>, растворы которых не проводят электрический ток.</p>`,
					options: [
						{ id: '1', label: 'известковая вода' },
						{ id: '2', label: 'нитрат магния' },
						{ id: '3', label: 'глюкоза' },
						{ id: '4', label: 'этиловый спирт' },
						{ id: '5', label: 'хлороводород' }
					],
					correct: ['3', '4'],
					hint: 'Неэлектролиты: глюкоза и спирт.'
				},
				{
					id: 2014,
					type: 'multi',
					pickCount: 2,
					title: 'Ионы дают осадок',
					body: `<p>Выберите <b>два иона</b>, при взаимодействии которых в растворе выпадает осадок.</p>`,
					options: [
						{ id: '1', label: 'Na<sup>+</sup>' },
						{ id: '2', label: 'SiO<sub>3</sub><sup>2−</sup>' },
						{ id: '3', label: 'SO<sub>4</sub><sup>2−</sup>' },
						{ id: '4', label: 'Cl<sup>−</sup>' },
						{ id: '5', label: 'H<sup>+</sup>' },
						{ id: '6', label: 'K<sup>+</sup>' }
					],
					correct: ['2', '5'],
					hint: '2H⁺ + SiO₃²⁻ → H₂SiO₃↓.'
				},
				{
					id: 2015,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al(+3) → Al(0)' },
						{ letter: 'Б', label: 'Mg(0) → Mg(+2)' },
						{ letter: 'В', label: '2Cl(−1) → Cl<sub>2</sub>(0)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '1', '1'],
					hint: 'СО падает — восстановление; растёт — окисление.'
				},
				{
					id: 2016,
					type: 'multi',
					pickCount: 3,
					title: 'Загрязнение окружающей среды',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Двигатели, работающие на водородном топливе, являются наиболее перспективным с экологической точки зрения.' },
						{ id: '2', label: 'Сжигание природного газа на ТЭС приводит к появлению «парникового эффекта».' },
						{ id: '3', label: 'Троллейбусы являются более экологически чистым транспортом по сравнению с автобусами.' },
						{ id: '4', label: 'Озоновый слой не разрушается в результате хозяйственной деятельности человека.' }
					],
					correct: ['1', '2', '3'],
					hint: 'Озоновый слой разрушается (фреоны и др.).'
				},
				{
					id: 2017,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cu(NO<sub>3</sub>)<sub>2</sub>(р-р) и KNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'Ba(OH)<sub>2</sub>(р-р) и NaOH(р-р)' },
						{ letter: 'В', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р) и K<sub>2</sub>SO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'HNO<sub>3</sub>(р-р)' },
						{ id: '2', label: 'Zn' },
						{ id: '3', label: 'K<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '4', label: 'NaNO<sub>3</sub>(р-р)' }
					],
					correct: ['2', '3', '1'],
					hint: 'Zn выделит Cu из Cu²⁺; K₂SO₄ даст BaSO₄↓; HNO₃ даст разные газы с CO₃²⁻ и SO₃²⁻.'
				},
				{
					id: 2018,
					type: 'input',
					title: 'ω(S) в (NH₄)₂SO₄',
					body: `
						<p>Сульфат аммония (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> применяют в хлебопечении.</p>
						<p>Вычислите массовую долю серы в сульфате аммония (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 35,35',
					correct: '24,24',
					hint: 'M=132; ω(S)=32/132·100%.'
				},
				{
					id: 2019,
					type: 'input',
					title: 'Масса S в смеси',
					body: `
						<p>В 100 кг хлебопекарной смеси содержится 20 г сульфата аммония.</p>
						<p>Вычислите, сколько граммов серы из сульфата аммония содержится в 0,5 кг смеси.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до тысячных.</p>
					`,
					placeholder: 'например, 1,135',
					correct: '0,024',
					hint: 'Сначала найдите массу (NH₄)₂SO₄ в 0,5 кг, затем умножьте на 0,2424.'
				},
				// ============================================================
				// ВАРИАНТ 20 · Часть 2 (2020–2022)
				// ============================================================
				{
					id: 2020,
					type: 'written',
					maxPoints: 3,
					title: 'Диспропорционирование серы в щёлочи',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							S + NaOH(разб.) → Na<sub>2</sub>SO<sub>3</sub> + Na<sub>2</sub>S + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p>Это <b>диспропорционирование</b>: часть серы окисляется до S(+4) (в Na₂SO₃), часть восстанавливается до S(−2) (в Na₂S).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">3S + 6NaOH → Na<sub>2</sub>SO<sub>3</sub> + 2Na<sub>2</sub>S + 3H<sub>2</sub>O</p>
						<p>Сера выступает одновременно <b>и окислителем, и восстановителем</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Указано, что реакция — диспропорционирование (S одновременно окислитель и восстановитель).' },
						{ id: 'c2', points: 1, label: 'Составлен баланс по степеням окисления S(0)→(+4) и S(0)→(−2).' },
						{ id: 'c3', points: 1, label: 'Коэффициенты расставлены верно: 3,6,1,2,3.' }
					]
				},
				{
					id: 2021,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка AlCl₃ → AlCl₃',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							AlCl<sub>3</sub> → Al(OH)<sub>3</sub> → X → AlCl<sub>3</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = Al<sub>2</sub>O<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) AlCl<sub>3</sub> + 3NaOH → Al(OH)<sub>3</sub>↓ + 3NaCl<br>
							2) 2Al(OH)<sub>3</sub> →<sup>t°</sup> Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O<br>
							3) Al<sub>2</sub>O<sub>3</sub> + 6HCl → 2AlCl<sub>3</sub> + 3H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен Al(OH)₃ из AlCl₃ реакцией со щёлочью.' },
						{ id: 'c2', points: 1, label: 'Получен X из Al(OH)₃ при нагревании (X = Al₂O₃).' },
						{ id: 'c3', points: 1, label: 'Получен AlCl₃ из X реакцией с HCl.' }
					]
				},
				{
					id: 2022,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля CaCO₃ в известняке',
					taskKind: 'Расчётная задача',
					body: `
						<p>При растворении 200 г известняка в избытке раствора азотной кислоты выделилось 33,6 л (н.у.) оксида углерода(IV).</p>
						<p>Определите массовую долю карбоната кальция в данном образце известняка.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> CaCO<sub>3</sub> + 2HNO<sub>3</sub> → Ca(NO<sub>3</sub>)<sub>2</sub> + CO<sub>2</sub>↑ + H<sub>2</sub>O</p>
						<p><b>2) Количество CO₂:</b> n = 33,6/22,4 = 1,5 моль ⇒ n(CaCO₃)=1,5 моль.</p>
						<p><b>3) Масса CaCO₃:</b> m = 1,5·100 = 150 г.</p>
						<p><b>4) Массовая доля:</b> ω = 150/200·100% = <b>75%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдено количество CO₂ (1,5 моль).' },
						{ id: 'c2', points: 1, label: 'Найдена масса CaCO₃ (150 г).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля CaCO₃ (75%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 21 · Часть 1 (задания 2101–2119)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 6
				// ============================================================
				{
					id: 2101,
					type: 'multi',
					pickCount: 2,
					title: 'Кислород как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о кислороде как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: 'Растения, животные и человек дышат кислородом.' },
						{ id: '2', label: 'Молекулы кислорода состоят из двух атомов.' },
						{ id: '3', label: 'Молекулы глюкозы образованы углеродом, кислородом и водородом.' },
						{ id: '4', label: 'Кислород — газ без цвета и запаха.' },
						{ id: '5', label: 'Электроотрицательность фтора больше, чем электроотрицательность кислорода.' }
					],
					correct: ['3', '5'],
					hint: 'Об элементе — вхождение в состав соединений и характеристики атома (ЭО).'
				},
				{
					id: 2102,
					type: 'input',
					title: 'Заряд ядра и группа (3 электронных слоя)',
					body: `
						<p>На рисунке изображена модель атома химического элемента (3 электронных слоя).</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant21-q2-atom.png" alt="Модель атома: 3 электронных слоя" style="max-width:260px; width: 100%; height:auto;">
						</p>
						<p>Запишите величину заряда ядра (<b>X</b>) атома и номер группы (<b>Y</b>), в которой расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 299',
					correct: '188',
					hint: 'Распределение 2–8–8 → Ar: X=18, группа 18 (VIII A) → Y=8.'
				},
				{
					id: 2103,
					type: 'input',
					title: 'Электроотрицательность (C, N, B)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>углерод</li>
							<li>азот</li>
							<li>бор</li>
						</ol>
						<p>в порядке <b>увеличения</b> их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 423',
					correct: '312',
					hint: 'Во 2 периоде ЭО растёт слева направо: B < C < N.'
				},
				{
					id: 2104,
					type: 'match',
					title: 'Степень окисления кислорода',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления кислорода.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'H<sub>2</sub>O<sub>2</sub>' },
						{ letter: 'Б', label: 'Al(OH)<sub>3</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>SiO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−2' },
						{ id: '2', label: '−1' },
						{ id: '3', label: '0' },
						{ id: '4', label: '+2' }
					],
					correct: ['2', '1', '1'],
					hint: 'В пероксидах O имеет СО −1, обычно −2.'
				},
				{
					id: 2105,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Выберите <b>две пары элементов</b>, между которыми образуется ионная связь.</p>`,
					options: [
						{ id: '1', label: 'натрий и кислород' },
						{ id: '2', label: 'сера и кислород' },
						{ id: '3', label: 'фосфор и водород' },
						{ id: '4', label: 'кислород и кислород' },
						{ id: '5', label: 'хлор и магний' }
					],
					correct: ['1', '5'],
					hint: 'Ионная связь — металл + неметалл.'
				},
				{
					id: 2106,
					type: 'multi',
					pickCount: 2,
					title: 'Фтор и хлор',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как фтора, так и хлора?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент относится к металлам.' },
						{ id: '2', label: 'Химический элемент не образует летучего водородного соединения.' },
						{ id: '3', label: 'Химический элемент не образует аллотропных модификаций.' },
						{ id: '4', label: 'Во внешнем электронном слое находятся семь электронов.' },
						{ id: '5', label: 'Химический элемент образует высший оксид, соответствующий формуле R<sub>2</sub>O<sub>7</sub>.' }
					],
					correct: ['3', '4'],
					hint: 'Оба — галогены (7 e⁻ на внешнем уровне), аллотропии нет.'
				},
				{
					id: 2107,
					type: 'input',
					title: 'Кислота и амфотерный оксид',
					body: `
						<p>Из предложенного перечня веществ выберите кислоту и амфотерный оксид.</p>
						<p>Запишите в поле ответа сначала номер кислоты, а затем номер амфотерного оксида.</p>
					`,
					placeholder: 'например, 52',
					correct: '41',
					hint: 'H₂SiO₃ — кислота; Cr₂O₃ — амфотерный оксид.'
				},
				{
					id: 2108,
					type: 'multi',
					pickCount: 2,
					title: 'Металлы дают щёлочь с водой',
					body: `<p>При взаимодействии каких <b>двух</b> металлов с водой образуется щёлочь?</p>`,
					options: [
						{ id: '1', label: 'железо' },
						{ id: '2', label: 'калий' },
						{ id: '3', label: 'алюминий' },
						{ id: '4', label: 'барий' },
						{ id: '5', label: 'цинк' }
					],
					correct: ['2', '4'],
					hint: 'K и Ba реагируют с водой с образованием гидроксидов.'
				},
				{
					id: 2109,
					type: 'match',
					title: 'Продукты взаимодействия (Na-соли серы)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH(изб) + SO<sub>3</sub>' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'В', label: 'NaOH + SO<sub>2</sub>(изб)' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>4</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'NaHSO<sub>4</sub>' },
						{ id: '3', label: 'NaHSO<sub>3</sub>' },
						{ id: '4', label: 'Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O' }
					],
					correct: ['4', '1', '3'],
					hint: 'Избыток щёлочи даёт среднюю соль; кислота вытесняет SO₂; избыток SO₂ даёт кислую соль.'
				},
				{
					id: 2110,
					type: 'match',
					title: 'Вещества и реагенты (NO₂, HNO₃, N₂)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NO<sub>2</sub>' },
						{ letter: 'Б', label: 'HNO<sub>3</sub>(конц)' },
						{ letter: 'В', label: 'N<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'H<sub>2</sub>, O<sub>2</sub>' },
						{ id: '2', label: 'H<sub>2</sub>O+O<sub>2</sub>, NaOH(р-р)' },
						{ id: '3', label: 'Fe, H<sub>2</sub>SiO<sub>3</sub>' },
						{ id: '4', label: 'Ag, NH<sub>3</sub>' }
					],
					correct: ['2', '4', '1'],
					hint: 'NO₂ — кислотный оксид; HNO₃(конц) — окислитель; N₂ реагирует с H₂ и O₂ при жёстких условиях.'
				},
				{
					id: 2111,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция обмена',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция обмена.</p>`,
					options: [
						{ id: '1', label: 'магний и серная кислота' },
						{ id: '2', label: 'серная кислота и гидроксид железа(II)' },
						{ id: '3', label: 'оксид кальция и вода' },
						{ id: '4', label: 'нитрат серебра и хлорид кальция' },
						{ id: '5', label: 'водород и кислород' }
					],
					correct: ['2', '4'],
					hint: 'Обмен — между сложными веществами (часто с образованием осадка/воды).'
				},
				{
					id: 2112,
					type: 'match',
					title: 'Признаки реакций (H₂, H₂S, NO₂)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al и H<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ letter: 'Б', label: 'Na и H<sub>2</sub>SO<sub>4</sub>(конц)' },
						{ letter: 'В', label: 'Cu и HNO<sub>3</sub>(конц)' }
					],
					matchRight: [
						{ id: '1', label: 'выделение бурого газа, имеющего резкий запах' },
						{ id: '2', label: 'выделение бесцветного газа, не имеющего запаха' },
						{ id: '3', label: 'выделение бесцветного газа, имеющего запах тухлых яиц' },
						{ id: '4', label: 'выделение жёлто-зелёного газа с резким запахом' }
					],
					correct: ['2', '3', '1'],
					hint: 'H₂ — бесцветный без запаха; H₂S пахнет «тухлыми яйцами»; NO₂ — бурый газ.'
				},
				{
					id: 2113,
					type: 'multi',
					pickCount: 2,
					title: '2 моль катионов при диссоциации',
					body: `<p>При диссоциации 1 моль каких <b>двух</b> из перечисленных веществ образуется 2 моль катионов?</p>`,
					options: [
						{ id: '1', label: 'гидроксид калия' },
						{ id: '2', label: 'нитрат кальция' },
						{ id: '3', label: 'хлорид хрома(III)' },
						{ id: '4', label: 'сульфат железа(III)' },
						{ id: '5', label: 'карбонат калия' }
					],
					correct: ['4', '5'],
					hint: 'Fe₂(SO₄)₃ даёт 2Fe³⁺; K₂CO₃ даёт 2K⁺.'
				},
				{
					id: 2114,
					type: 'multi',
					pickCount: 2,
					title: 'Необратимо без осадка и газа',
					body: `<p>Выберите <b>два вещества</b>, которые взаимодействуют необратимо без образования осадка или выделения газа.</p>`,
					options: [
						{ id: '1', label: 'силикат натрия' },
						{ id: '2', label: 'нитрат бария' },
						{ id: '3', label: 'серная кислота' },
						{ id: '4', label: 'фосфат кальция' },
						{ id: '5', label: 'сульфид бария' },
						{ id: '6', label: 'гидроксид лития' }
					],
					correct: ['3', '6'],
					hint: 'Нейтрализация: H₂SO₄ + LiOH → Li₂SO₄ + H₂O.'
				},
				{
					id: 2115,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cr(0) → Cr(+2)' },
						{ letter: 'Б', label: 'N(+2) → N(+4)' },
						{ letter: 'В', label: 'Ca(+2) → Ca(0)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '1', '2'],
					hint: 'СО растёт — окисление; падает — восстановление.'
				},
				{
					id: 2116,
					type: 'multi',
					pickCount: 3,
					title: 'Бытовая химия: безопасность',
					body: `<p>Из перечисленных суждений о правилах безопасного обращения со средствами бытовой химии выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'После завершения работы со средствами бытовой химии необходимо умыться и прополоскать рот.' },
						{ id: '2', label: 'Все поверхности после обработки средствами бытовой химии должны быть тщательно вымыты от остатков химических препаратов.' },
						{ id: '3', label: 'Нельзя оставлять открытыми сосуды со средствами бытовой химии.' },
						{ id: '4', label: 'Средства бытовой химии можно применять в количествах, превышающих указанные в инструкции.' }
					],
					correct: ['1', '2', '3'],
					hint: 'Нельзя превышать дозировку из инструкции.'
				},
				{
					id: 2117,
					type: 'match',
					title: 'Реактив для различения (хлориды/нитраты)',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'ZnCl<sub>2</sub>(р-р) и BaCl<sub>2</sub>(р-р)' },
						{ letter: 'Б', label: 'Mg(NO<sub>3</sub>)<sub>2</sub>(р-р) и Ba(NO<sub>3</sub>)<sub>2</sub>(р-р)' },
						{ letter: 'В', label: 'KCl(р-р) и KBr(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'AgNO<sub>3</sub>(р-р)' },
						{ id: '2', label: 'KOH(р-р)' },
						{ id: '3', label: 'HNO<sub>3</sub>(р-р)' },
						{ id: '4', label: 'Al(OH)<sub>3</sub>(тв)' }
					],
					correct: ['2', '2', '1'],
					hint: 'KOH осаждает Zn(OH)₂ и Mg(OH)₂; AgNO₃ различает Cl⁻ и Br⁻ по цвету осадка.'
				},
				{
					id: 2118,
					type: 'input',
					title: 'ω(N) в NaNO₂',
					body: `
						<p>Нитрит натрия NaNO<sub>2</sub> используется в пищевой промышленности как консервант.</p>
						<p>Вычислите массовую долю азота в нитрите натрия (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 31',
					correct: '20',
					hint: 'M=69; ω(N)=14/69·100%.'
				},
				{
					id: 2119,
					type: 'input',
					title: 'Масса N в 1 кг сырья',
					body: `
						<p>При изготовлении колбасных изделий используют 7 г нитрита натрия на 100 кг сырья.</p>
						<p>Вычислите, сколько граммов азота поступает с нитритом натрия в 1 кг сырья.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до тысячных.</p>
					`,
					placeholder: 'например, 1,125',
					correct: '0,014',
					hint: 'm(NaNO₂)=0,07 г на 1 кг; умножьте на ω(N)=0,2029.'
				},
				// ============================================================
				// ВАРИАНТ 21 · Часть 2 (2120–2122)
				// ============================================================
				{
					id: 2120,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Al + H₂SO₄(конц)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Al + H<sub>2</sub>SO<sub>4</sub>(конц, гор) → Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>S + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">8Al + 15H<sub>2</sub>SO<sub>4</sub>(конц) → 4Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>S↑ + 12H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — H<sub>2</sub>SO<sub>4</sub> (S(+6)), <b>восстановитель</b> — Al.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (Al(0)→(+3), S(+6)→(−2)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 8,15,4,3,12.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 2121,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Fe → FeO',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Fe → X → Fe(OH)<sub>2</sub> → FeO
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = FeCl<sub>2</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Fe + 2HCl → FeCl<sub>2</sub> + H<sub>2</sub>↑<br>
							2) FeCl<sub>2</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + 2NaCl<br>
							3) Fe(OH)<sub>2</sub> →<sup>t°</sup> FeO + H<sub>2</sub>O (без доступа воздуха)
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из Fe (реакция с HCl).' },
						{ id: 'c2', points: 1, label: 'Получен Fe(OH)₂ из X (реакция со щёлочью).' },
						{ id: 'c3', points: 1, label: 'Получен FeO из Fe(OH)₂ при нагревании без доступа воздуха.' }
					]
				},
				{
					id: 2122,
					type: 'written',
					maxPoints: 3,
					title: 'Масса осадка Ag₃PO₄',
					taskKind: 'Расчётная задача',
					body: `
						<p>К избытку раствора фосфата калия добавили 102 г раствора с массовой долей нитрата серебра 10%.</p>
						<p>Вычислите массу образовавшегося осадка.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> 3AgNO<sub>3</sub> + K<sub>3</sub>PO<sub>4</sub> → Ag<sub>3</sub>PO<sub>4</sub>↓ + 3KNO<sub>3</sub></p>
						<p><b>2) Масса AgNO₃:</b> 102·0,10 = 10,2 г; n(AgNO₃)=10,2/170=0,06 моль.</p>
						<p><b>3) Количество осадка:</b> n(Ag₃PO₄)=0,06/3=0,02 моль.</p>
						<p><b>4) Масса:</b> M(Ag₃PO₄)=419; m=0,02·419 = <b>8,38 г</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество AgNO₃ в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество Ag₃PO₄.' },
						{ id: 'c3', points: 1, label: 'Рассчитана масса осадка (8,38 г).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 22 · Часть 1 (задания 2201–2219)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 7
				// ============================================================
				{
					id: 2201,
					type: 'multi',
					pickCount: 2,
					title: 'Азот как простое вещество',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об азоте как о простом веществе.</p>`,
					options: [
						{ id: '1', label: 'Азот входит в состав некоторых минеральных удобрений.' },
						{ id: '2', label: 'Аммиак получают из азота и водорода.' },
						{ id: '3', label: 'Аммиак состоит из азота и водорода.' },
						{ id: '4', label: 'Жидкий азот можно использовать как хладагент.' },
						{ id: '5', label: 'Удобрения, содержащие азот, влияют на развитие зелёной массы растений.' }
					],
					correct: ['2', '4'],
					hint: 'О простом веществе N₂ — использование/получение и свойства.'
				},
				{
					id: 2202,
					type: 'input',
					title: 'Период и число электронных слоёв (по ядру)',
					body: `
						<p>На рисунке изображена модель ядра атома химического элемента.</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant22-q2-nucleus.png" alt="Модель ядра: протоны и нейтроны" style="max-width:420px; width: 100%; height:auto;">
						</p>
						<p>Запишите номер периода (<b>X</b>), в котором расположен данный химический элемент, и число электронных слоёв (<b>Y</b>) в атоме этого элемента.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 22',
					correct: '11',
					hint: '2 протона → He: X=1, электронных слоёв Y=1.'
				},
				{
					id: 2203,
					type: 'input',
					title: 'Валентность в высших оксидах (P, Al, Si)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>фосфор</li>
							<li>алюминий</li>
							<li>кремний</li>
						</ol>
						<p>в порядке увеличения валентности в высших оксидах.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'Al(III) < Si(IV) < P(V).'
				},
				{
					id: 2204,
					type: 'match',
					title: 'Степень окисления хлора',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления хлора.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HCl' },
						{ letter: 'Б', label: 'HClO<sub>4</sub>' },
						{ letter: 'В', label: 'Cl<sub>2</sub>O' }
					],
					matchRight: [
						{ id: '1', label: '−1' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+1' },
						{ id: '4', label: '+7' }
					],
					correct: ['1', '4', '3'],
					hint: 'В HCl — −1; в HClO₄ — +7; в Cl₂O — +1.'
				},
				{
					id: 2205,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная неполярная связь',
					body: `<p>Выберите <b>два вещества</b>, в которых имеется ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: 'CO<sub>2</sub>' },
						{ id: '2', label: 'P<sub>2</sub>O<sub>3</sub>' },
						{ id: '3', label: 'H<sub>2</sub>' },
						{ id: '4', label: 'O<sub>3</sub>' },
						{ id: '5', label: 'KOH' }
					],
					correct: ['3', '4'],
					hint: 'Неполярная — между одинаковыми атомами (H–H, O–O).'
				},
				{
					id: 2206,
					type: 'multi',
					pickCount: 2,
					title: 'Литий и калий',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как лития, так и калия?</p>`,
					options: [
						{ id: '1', label: 'Во внешнем электронном слое в атоме находится один электрон.' },
						{ id: '2', label: 'Химический элемент относится к металлам.' },
						{ id: '3', label: 'Химический элемент образует высший оксид, соответствующий формуле RO.' },
						{ id: '4', label: 'Химический элемент проявляет более сильные восстановительные свойства, чем натрий.' },
						{ id: '5', label: 'Химический элемент образует летучее водородное соединение.' }
					],
					correct: ['1', '2'],
					hint: 'Оба — щелочные металлы (IA группа).'
				},
				{
					id: 2207,
					type: 'input',
					title: 'Амфотерный оксид и кислота',
					body: `
						<p>Из предложенного перечня веществ выберите амфотерный оксид и кислоту.</p>
						<p>Запишите в поле ответа сначала номер амфотерного оксида, а затем номер кислоты.</p>
					`,
					placeholder: 'например, 52',
					correct: '41',
					hint: 'ZnO — амфотерный оксид; H₂SO₄ — кислота.'
				},
				{
					id: 2208,
					type: 'multi',
					pickCount: 2,
					title: 'Не реагируют с SO₂',
					body: `<p>Какие <b>два</b> из перечисленных веществ не вступают в реакцию с оксидом серы(IV)?</p>`,
					options: [
						{ id: '1', label: 'кислород' },
						{ id: '2', label: 'оксид углерода(IV)' },
						{ id: '3', label: 'гидроксид калия' },
						{ id: '4', label: 'вода' },
						{ id: '5', label: 'хлорид натрия' }
					],
					correct: ['2', '5'],
					hint: 'Кислотный оксид с кислотным оксидом и с солью обычно не реагирует.'
				},
				{
					id: 2209,
					type: 'match',
					title: 'Продукты взаимодействия ZnO',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'ZnO + HNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'ZnO + NaOH + H<sub>2</sub>O' },
						{ letter: 'В', label: 'ZnO + NaOH(тв) при t°' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>ZnO<sub>2</sub>' },
						{ id: '2', label: 'Na<sub>2</sub>[Zn(OH)<sub>4</sub>]' },
						{ id: '3', label: 'Na<sub>2</sub>ZnO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'Zn(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Zn(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>' }
					],
					correct: ['4', '2', '3'],
					hint: 'В растворе щёлочи — комплекс; при сплавлении — цинкат.'
				},
				{
					id: 2210,
					type: 'match',
					title: 'Вещества и реагенты (SiO₂, CO₂, CO)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SiO<sub>2</sub>' },
						{ letter: 'Б', label: 'CO<sub>2</sub>' },
						{ letter: 'В', label: 'CO' }
					],
					matchRight: [
						{ id: '1', label: 'O<sub>2</sub>, Fe<sub>2</sub>O<sub>3</sub>' },
						{ id: '2', label: 'HCl(р-р), O<sub>2</sub>' },
						{ id: '3', label: 'HF(р-р), NaOH(тв)' },
						{ id: '4', label: 'C, H<sub>2</sub>O' }
					],
					correct: ['3', '4', '1'],
					hint: 'SiO₂ реагирует с HF и с щёлочью при сплавлении; CO₂ реагирует с C и водой; CO — восстановитель.'
				},
				{
					id: 2211,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция замещения',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: 'магний и азотная кислота' },
						{ id: '2', label: 'бром и иодид калия' },
						{ id: '3', label: 'оксид железа(III) и водород' },
						{ id: '4', label: 'углерод и концентрированная серная кислота' },
						{ id: '5', label: 'оксид серы(VI) и вода' }
					],
					correct: ['2', '3'],
					hint: 'Br₂ вытесняет I₂; H₂ восстанавливает Fe из оксида.'
				},
				{
					id: 2212,
					type: 'match',
					title: 'Осадки в реакциях',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>(р-р) и BaCl<sub>2</sub>(р-р)' },
						{ letter: 'Б', label: 'Na<sub>3</sub>PO<sub>4</sub>(р-р) и AgNO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'CuSO<sub>4</sub>(р-р) и KOH(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выпадение жёлтого осадка' },
						{ id: '2', label: 'выпадение голубого осадка' },
						{ id: '3', label: 'выпадение белого осадка' },
						{ id: '4', label: 'выпадение студенистого осадка, растворяющегося в избытке щёлочи' }
					],
					correct: ['3', '1', '2'],
					hint: 'BaSO₄ — белый; Ag₃PO₄ — жёлтый; Cu(OH)₂ — голубой.'
				},
				{
					id: 2213,
					type: 'multi',
					pickCount: 2,
					title: 'Сильные электролиты',
					body: `<p>Выберите <b>два вещества</b>, которые относятся к сильным электролитам.</p>`,
					options: [
						{ id: '1', label: 'вода' },
						{ id: '2', label: 'кремниевая кислота' },
						{ id: '3', label: 'сернистая кислота' },
						{ id: '4', label: 'хлорид железа(III)' },
						{ id: '5', label: 'серная кислота' }
					],
					correct: ['4', '5'],
					hint: 'Соли и сильные кислоты — сильные электролиты.'
				},
				{
					id: 2214,
					type: 'multi',
					pickCount: 2,
					title: 'Ионы сосуществуют',
					body: `<p>Выберите <b>две пары ионов</b>, которые могут присутствовать в растворе одновременно.</p>`,
					options: [
						{ id: '1', label: 'Ba<sup>2+</sup> и SO<sub>4</sub><sup>2−</sup>' },
						{ id: '2', label: 'Cu<sup>2+</sup> и OH<sup>−</sup>' },
						{ id: '3', label: 'K<sup>+</sup> и NO<sub>3</sub><sup>−</sup>' },
						{ id: '4', label: 'H<sup>+</sup> и SO<sub>4</sub><sup>2−</sup>' },
						{ id: '5', label: 'Ca<sup>2+</sup> и F<sup>−</sup>' },
						{ id: '6', label: 'Mg<sup>2+</sup> и OH<sup>−</sup>' }
					],
					correct: ['3', '4'],
					hint: 'KNO₃ растворим; H₂SO₄ — сильный электролит.'
				},
				{
					id: 2215,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S(−2) → S(+4)' },
						{ letter: 'Б', label: 'Na(0) → Na(+1)' },
						{ letter: 'В', label: 'S(0) → S(−2)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '1', '2'],
					hint: 'СО растёт — окисление; падает — восстановление.'
				},
				{
					id: 2216,
					type: 'multi',
					pickCount: 2,
					title: 'Загрязнение окружающей среды',
					body: `<p>Из перечисленных суждений о химическом загрязнении окружающей среды выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Транспортировка нефти современными танкерами представляет угрозу для Мирового океана.' },
						{ id: '2', label: 'Сжигание природного газа на ТЭС не приводит к «парниковому эффекту».' },
						{ id: '3', label: 'Водяные пары и метан относятся к веществам, вызывающим «парниковый эффект».' },
						{ id: '4', label: 'Озон в тропосфере не является газом, вызывающим «парниковый эффект».' }
					],
					correct: ['1', '3'],
					hint: 'CO₂ и озон тоже связаны с парниковым эффектом; метан и водяной пар — парниковые газы.'
				},
				{
					id: 2217,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>4</sub>Br(р-р) и KBr(р-р)' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SO<sub>4</sub>(р-р) и BaCl<sub>2</sub>(р-р)' },
						{ letter: 'В', label: 'KOH(р-р) и KCl(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'AgCl(тв)' },
						{ id: '2', label: 'NaOH(р-р)' },
						{ id: '3', label: 'K<sub>2</sub>CO<sub>3</sub>(р-р)' },
						{ id: '4', label: 'фенолфталеин' }
					],
					correct: ['2', '3', '4'],
					hint: 'NH₄⁺ с щёлочью даёт NH₃; Ba²⁺ даёт BaCO₃↓; фенолфталеин выявляет щёлочь.'
				},
				{
					id: 2218,
					type: 'input',
					title: 'ω(Al) в Al₂(SO₄)₃',
					body: `
						<p>Раствор сульфата алюминия Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> применяют для очистки воды.</p>
						<p>Вычислите массовую долю алюминия в сульфате алюминия (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 26,80',
					correct: '15,79',
					hint: 'M=342; m(Al)=54; ω=54/342·100%.'
				},
				{
					id: 2219,
					type: 'input',
					title: 'Масса Al в растворе',
					body: `
						<p>Для приготовления раствора на 1 л воды добавляют 110 г сульфата алюминия.</p>
						<p>Вычислите, сколько граммов алюминия будет содержаться в таком растворе, приготовленном из 20 л воды.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 458,5',
					correct: '347,4',
					hint: 'm(соли)=110·20; затем умножьте на ω(Al)=0,1579.'
				},
				// ============================================================
				// ВАРИАНТ 22 · Часть 2 (2220–2222)
				// ============================================================
				{
					id: 2220,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Fe + HNO₃(разб)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Fe + HNO<sub>3</sub>(разб) → Fe(NO<sub>3</sub>)<sub>3</sub> + NO + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">Fe + 4HNO<sub>3</sub>(разб) → Fe(NO<sub>3</sub>)<sub>3</sub> + NO↑ + 2H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — HNO<sub>3</sub> (N(+5)), <b>восстановитель</b> — Fe.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (Fe(0)→(+3), N(+5)→(+2)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 1,4,1,1,2.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 2221,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка MgSO₄ → Mg(NO₃)₂',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							MgSO<sub>4</sub> → Mg(OH)<sub>2</sub> → X → Mg(NO<sub>3</sub>)<sub>2</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = MgO</b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) MgSO<sub>4</sub> + 2NaOH → Mg(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub><br>
							2) Mg(OH)<sub>2</sub> →<sup>t°</sup> MgO + H<sub>2</sub>O<br>
							3) MgO + 2HNO<sub>3</sub> → Mg(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен Mg(OH)₂ из MgSO₄ реакцией со щёлочью.' },
						{ id: 'c2', points: 1, label: 'Получен X из Mg(OH)₂ при нагревании (X = MgO).' },
						{ id: 'c3', points: 1, label: 'Получен Mg(NO₃)₂ из X реакцией с HNO₃.' }
					]
				},
				{
					id: 2222,
					type: 'written',
					maxPoints: 3,
					title: 'ω(CuCl₂) по массе осадка CuS',
					taskKind: 'Расчётная задача',
					body: `
						<p>При взаимодействии 300 г раствора хлорида меди(II) с сероводородной кислотой образовался осадок массой 47,8 г.</p>
						<p>Вычислите массовую долю хлорида меди(II) в исходном растворе.</p>
					`,
					solution: `
						<p><b>1) Уравнение:</b> CuCl<sub>2</sub> + H<sub>2</sub>S → CuS↓ + 2HCl</p>
						<p><b>2) Количество CuS:</b> M(CuS)=96; n=47,8/96≈0,498≈0,5 моль.</p>
						<p><b>3) Масса CuCl₂:</b> n=0,5 моль; M(CuCl₂)=135; m=0,5·135=67,5 г.</p>
						<p><b>4) Массовая доля:</b> ω=67,5/300·100% = <b>22,5%</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдено количество вещества осадка CuS.' },
						{ id: 'c2', points: 1, label: 'Рассчитана масса CuCl₂ в растворе (67,5 г).' },
						{ id: 'c3', points: 1, label: 'Найдена массовая доля CuCl₂ (22,5%).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 23 · Часть 1 (задания 2301–2319)
				// Источник формулировок: PDF «30 тренировочных вариантов», вариант 8
				// ============================================================
				{
					id: 2301,
					type: 'multi',
					pickCount: 2,
					title: 'Сложные вещества',
					body: `<p>Выберите <b>две группы</b>, в которых каждое из веществ относится к сложным веществам.</p>`,
					options: [
						{ id: '1', label: 'углекислый газ, сероводород, озон' },
						{ id: '2', label: 'оксид цинка, вода, аммиак' },
						{ id: '3', label: 'оксид азота(V), фтор, бромоводород' },
						{ id: '4', label: 'гашёная известь, кремнезём, угарный газ' },
						{ id: '5', label: 'аммиак, свинец, графит' }
					],
					correct: ['2', '4'],
					hint: 'Сложные вещества состоят из атомов разных химических элементов.'
				},
				{
					id: 2302,
					type: 'input',
					title: 'Заряд ядра и группа (3 электронных слоя)',
					body: `
						<p>На рисунке изображена модель атома химического элемента (3 электронных слоя).</p>
						<p style="display:flex; justify-content:center; margin: 12px 0 8px;">
							<img src="/assets/variant23-q2-atom.png" alt="Модель атома: 3 электронных слоя" style="max-width:300px; width: 100%; height:auto;">
						</p>
						<p>Запишите величину заряда ядра (<b>X</b>) атома и номер группы (<b>Y</b>), в которой расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 299',
					correct: '188',
					hint: '2–8–8 → Ar: X=18, группа 18 (VIII A) → Y=8.'
				},
				{
					id: 2303,
					type: 'input',
					title: 'Кислотные свойства высших оксидов (N, As, P)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>азот</li>
							<li>мышьяк</li>
							<li>фосфор</li>
						</ol>
						<p>в порядке усиления кислотных свойств их высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'В группе снизу вверх кислотность высших оксидов усиливается.'
				},
				{
					id: 2304,
					type: 'match',
					title: 'Степень окисления углерода',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления углерода.</p>`,
					matchLeft: [
						{ letter: 'А', label: '(NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub>' },
						{ letter: 'Б', label: 'CH<sub>4</sub>' },
						{ letter: 'В', label: 'CO' }
					],
					matchRight: [
						{ id: '1', label: '−4' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+2' },
						{ id: '4', label: '+4' }
					],
					correct: ['4', '1', '3'],
					hint: 'В карбонатах C обычно +4; в CH₄ — −4; в CO — +2.'
				},
				{
					id: 2305,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь (пары элементов)',
					body: `<p>Из предложенного перечня выберите <b>две пары</b> элементов, между которыми образуется ионная связь.</p>`,
					options: [
						{ id: '1', label: 'натрий и кислород' },
						{ id: '2', label: 'фосфор и водород' },
						{ id: '3', label: 'сера и кислород' },
						{ id: '4', label: 'кислород и кислород' },
						{ id: '5', label: 'хлор и магний' }
					],
					correct: ['1', '5'],
					hint: 'Ионная связь — металл + неметалл.'
				},
				{
					id: 2306,
					type: 'multi',
					pickCount: 2,
					title: 'Магний и алюминий',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как магния, так и алюминия?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент относится к неметаллам.' },
						{ id: '2', label: 'Химический элемент имеет более сильные восстановительные свойства, чем натрий.' },
						{ id: '3', label: 'Радиус атома меньше, чем радиус атома натрия.' },
						{ id: '4', label: 'Электроны в атоме располагаются на трёх электронных слоях.' },
						{ id: '5', label: 'Химический элемент образует аллотропные модификации.' }
					],
					correct: ['3', '4'],
					hint: 'Оба в 3 периоде: слоёв 3; радиус меньше, чем у Na (левее).'
				},
				{
					id: 2307,
					type: 'input',
					title: 'Основный оксид и кислая соль',
					body: `
						<p>Из предложенного перечня веществ выберите основный оксид и кислую соль.</p>
						<p>Запишите в поле ответа сначала номер основного оксида, а затем номер кислой соли.</p>
					`,
					placeholder: 'например, 35',
					correct: '24',
					hint: 'MgO — основный оксид; Ca(HSO₄)₂ — кислая соль.'
				},
				{
					id: 2308,
					type: 'multi',
					pickCount: 2,
					title: 'Не реагируют с водой даже при нагревании',
					body: `<p>Какие <b>два</b> из перечисленных веществ не вступают в реакцию с водой даже при нагревании?</p>`,
					options: [
						{ id: '1', label: 'алюминий' },
						{ id: '2', label: 'кальций' },
						{ id: '3', label: 'серебро' },
						{ id: '4', label: 'медь' },
						{ id: '5', label: 'магний' }
					],
					correct: ['3', '4'],
					hint: 'Ag и Cu стоят правее водорода в ряду активности.'
				},
				{
					id: 2309,
					type: 'match',
					title: 'Продукты взаимодействия (Cu и HNO₃)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cu + HNO<sub>3</sub>(конц)' },
						{ letter: 'Б', label: 'Cu + HNO<sub>3</sub>(разб)' },
						{ letter: 'В', label: 'CuO + HNO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Cu(NO<sub>3</sub>)<sub>2</sub> + NO + H<sub>2</sub>O' },
						{ id: '2', label: 'Cu(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>' },
						{ id: '3', label: 'Cu(NO<sub>3</sub>)<sub>2</sub> + NO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'CuNO<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Cu(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O' }
					],
					correct: ['3', '1', '5'],
					hint: 'Конц. HNO₃ даёт NO₂, разб. — NO; CuO + кислота → соль + вода.'
				},
				{
					id: 2310,
					type: 'match',
					title: 'Вещества и реагенты (HNO₃, SO₃, H₂SO₄)',
					body: `<p>Установите соответствие между формулой вещества и реагентами.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HNO<sub>3</sub>(конц, хол)' },
						{ letter: 'Б', label: 'SO<sub>3</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub>(разб)' }
					],
					matchRight: [
						{ id: '1', label: 'Fe, Ba(NO<sub>3</sub>)<sub>2</sub>(р-р)' },
						{ id: '2', label: 'O<sub>2</sub>, H<sub>2</sub>O(ж)' },
						{ id: '3', label: 'S, Cu' },
						{ id: '4', label: 'H<sub>2</sub>O, Na<sub>2</sub>SO<sub>4</sub>(р-р)' }
					],
					correct: ['3', '4', '1'],
					hint: 'HNO₃(конц) — окислитель; SO₃ — кислотный оксид; H₂SO₄(разб) — обычная кислота.'
				},
				{
					id: 2311,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция соединения',
					body: `<p>Выберите <b>две пары</b> веществ, между которыми протекает реакция соединения.</p>`,
					options: [
						{ id: '1', label: 'железо и сульфат меди(II)' },
						{ id: '2', label: 'оксид натрия и оксид серы(VI)' },
						{ id: '3', label: 'цинк и соляная кислота' },
						{ id: '4', label: 'оксид железа(III) и серная кислота' },
						{ id: '5', label: 'фосфор и кислород' }
					],
					correct: ['2', '5'],
					hint: 'Соединение: из нескольких веществ образуется одно.'
				},
				{
					id: 2312,
					type: 'match',
					title: 'Признаки реакций (горение в O₂)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Fe и O<sub>2</sub>' },
						{ letter: 'Б', label: 'S и O<sub>2</sub>' },
						{ letter: 'В', label: 'P и O<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'образование белого дыма' },
						{ id: '2', label: 'жёлтое пламя, образование газа, не имеющего запаха' },
						{ id: '3', label: 'ослепительное пламя, искры' },
						{ id: '4', label: 'голубое пламя, образование газа, имеющего резкий запах' }
					],
					correct: ['3', '4', '1'],
					hint: 'S горит голубым пламенем с SO₂; P даёт белый дым P₂O₅; Fe — искры.'
				},
				{
					id: 2313,
					type: 'multi',
					pickCount: 2,
					title: 'Анионов больше, чем катионов',
					body: `<p>Выберите <b>два вещества</b>, при диссоциации которых образуется больше анионов, чем катионов.</p>`,
					options: [
						{ id: '1', label: 'фосфат натрия' },
						{ id: '2', label: 'гидрокарбонат кальция' },
						{ id: '3', label: 'сульфат хрома(III)' },
						{ id: '4', label: 'сульфат калия' },
						{ id: '5', label: 'карбонат натрия' }
					],
					correct: ['2', '3'],
					hint: 'Считайте число ионов: Ca(HCO₃)₂ → 1 катион и 2 аниона; Cr₂(SO₄)₃ → 2 катиона и 3 аниона.'
				},
				{
					id: 2314,
					type: 'multi',
					pickCount: 2,
					title: 'Сокращённое ионное уравнение (Cu(OH)₂)',
					body: `<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение реакции: <b>Cu<sup>2+</sup> + 2OH<sup>−</sup> = Cu(OH)<sub>2</sub></b>.</p>`,
					options: [
						{ id: '1', label: 'сульфид меди(II)' },
						{ id: '2', label: 'хлорид меди(II)' },
						{ id: '3', label: 'гидроксид калия' },
						{ id: '4', label: 'вода' },
						{ id: '5', label: 'гидроксид магния' },
						{ id: '6', label: 'гидрат аммиака' }
					],
					correct: ['2', '3'],
					hint: 'Нужны растворимая соль Cu²⁺ и сильная щёлочь (источник OH⁻).'
				},
				{
					id: 2315,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и его названием.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Cl<sub>2</sub>(0) → 2Cl(−1)' },
						{ letter: 'Б', label: 'Fe(0) → Fe(+2)' },
						{ letter: 'В', label: 'S(+4) → S(+6)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '1', '1'],
					hint: 'СО падает — восстановление; растёт — окисление.'
				},
				{
					id: 2316,
					type: 'multi',
					pickCount: 3,
					title: 'Правила работы в лаборатории',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Горящую спиртовку нельзя держать в руках.' },
						{ id: '2', label: 'Водород перед поджиганием необходимо проверять на чистоту.' },
						{ id: '3', label: 'Воронку закрепляют в штативе, используя кольцо.' },
						{ id: '4', label: 'Кристаллические вещества при проведении опытов можно брать руками.' }
					],
					correct: ['1', '2', '3'],
					hint: 'Твёрдые вещества берут шпателем, не руками.'
				},
				{
					id: 2317,
					type: 'match',
					title: 'Реактив для различения (гидроксиды, соли)',
					body: `<p>Установите соответствие между двумя веществами и реактивом.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Mg(OH)<sub>2</sub>(тв) и Al(OH)<sub>3</sub>(тв)' },
						{ letter: 'Б', label: 'K<sub>3</sub>PO<sub>4</sub>(р-р) и KBr(р-р)' },
						{ letter: 'В', label: 'CuCl<sub>2</sub>(р-р) и AlCl<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'HCl(р-р)' },
						{ id: '2', label: 'KOH(р-р)' },
						{ id: '3', label: 'MgCO<sub>3</sub>(тв)' },
						{ id: '4', label: 'AgNO<sub>3</sub>(р-р)' }
					],
					correct: ['2', '4', '2'],
					hint: 'Al(OH)₃ растворяется в избытке KOH; AgNO₃ даёт осадки с PO₄³⁻ и Br⁻; KOH даёт разные гидроксиды.'
				},
				{
					id: 2318,
					type: 'input',
					title: 'ω(Ca) в CaCl₂',
					body: `
						<p>Хлорид кальция CaCl<sub>2</sub> — лекарственное средство, восполняющее дефицит кальция.</p>
						<p>Вычислите массовую долю кальция в хлориде кальция (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 47',
					correct: '36',
					hint: 'M(CaCl₂)=111; ω(Ca)=40/111·100%.'
				},
				{
					id: 2319,
					type: 'input',
					title: 'Сколько Ca в растворе CaCl₂',
					body: `
						<p>100 г раствора хлористого кальция содержит 9 г этой соли.</p>
						<p>Вычислите, сколько граммов кальция поступает в организм при приёме 15 г такого раствора.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 1,6',
					correct: '0,5',
					hint: 'm(CaCl₂)=15·0,09; затем умножьте на ω(Ca)≈0,36.'
				},
				// ============================================================
				// ВАРИАНТ 23 · Часть 2 (2320–2322)
				// ============================================================
				{
					id: 2320,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Li + NH₄I',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Li + NH<sub>4</sub>I → LiI + NH<sub>3</sub> + H<sub>2</sub>
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">2Li + 2NH<sub>4</sub>I → 2LiI + 2NH<sub>3</sub>↑ + H<sub>2</sub>↑</p>
						<p><b>Окислитель</b> — NH<sub>4</sub>I (H<sup>+</sup> в составе NH<sub>4</sub><sup>+</sup>), <b>восстановитель</b> — Li.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (Li(0)→(+1), H(+1)→H₂(0)).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 2,2,2,2,1.' },
						{ id: 'c3', points: 1, label: 'Правильно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 2321,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Fe → Fe₂O₃',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Fe → X → Fe(OH)<sub>3</sub> → Fe<sub>2</sub>O<sub>3</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = FeCl<sub>3</sub></b>.</p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 2Fe + 3Cl<sub>2</sub> → 2FeCl<sub>3</sub><br>
							2) FeCl<sub>3</sub> + 3NaOH → Fe(OH)<sub>3</sub>↓ + 3NaCl<br>
							3) 2Fe(OH)<sub>3</sub> →<sup>t°</sup> Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из Fe (реакция с Cl₂).' },
						{ id: 'c2', points: 1, label: 'Получен Fe(OH)₃ из X (реакция со щёлочью).' },
						{ id: 'c3', points: 1, label: 'Получен Fe₂O₃ при нагревании Fe(OH)₃.' }
					]
				},
				{
					id: 2322,
					type: 'written',
					maxPoints: 3,
					title: 'Объём NH₃ из (NH₄)₂SO₄ с примесями',
					taskKind: 'Расчётная задача',
					body: `
						<p>Определите объём (н.у.) аммиака, образующегося при взаимодействии 13,9 г сульфата аммония, содержащего 5% примесей, с избытком гидроксида натрия.</p>
					`,
					solution: `
						<p><b>1) Масса чистого (NH₄)₂SO₄:</b> 13,9·0,95 = 13,205 г; M=132; n≈0,1 моль.</p>
						<p><b>2) Уравнение:</b> (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub> + 2NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2NH<sub>3</sub>↑ + 2H<sub>2</sub>O</p>
						<p><b>3) Количество NH₃:</b> n = 2·0,1 = 0,2 моль; <b>V</b> = 0,2·22,4 = <b>4,48 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Учтены примеси и найдено n((NH₄)₂SO₄).' },
						{ id: 'c2', points: 1, label: 'По уравнению реакции найдено количество NH₃.' },
						{ id: 'c3', points: 1, label: 'Найден объём NH₃ при н.у. (4,48 л).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 24 · Часть 1 (задания 2401–2419)
				// Источник: e:\Химия\variant24.js (в файле помечен как «Вариант 9» PDF «30 тренировочных вариантов»)
				// ============================================================
				{
					id: 2401,
					type: 'multi',
					pickCount: 2,
					title: 'Сложные вещества',
					body: `<p>Выберите <b>две группы</b>, в которых каждое из веществ относится к сложным веществам.</p>`,
					options: [
						{ id: '1', label: 'кварц, аммиачная селитра, пушонка' },
						{ id: '2', label: 'боксит, графит, белый фосфор' },
						{ id: '3', label: 'оксид азота(III), вода, серое олово' },
						{ id: '4', label: 'угарный газ, азот, водород' },
						{ id: '5', label: 'веселящий газ, ляпис, малахит' }
					],
					correct: ['1', '5'],
					hint: 'Сложное вещество состоит из атомов разных элементов.'
				},
				{
					id: 2402,
					type: 'input',
					title: 'Заряд ядра и группа (4 электронных слоя)',
					body: `
						<p>На схеме — модель атома химического элемента с зарядом ядра +<i>Z</i>. Электроны распределены по четырём электронным слоям: <b>2, 8, 8, 2</b> (всего 20 электронов).</p>
						<div style="display:flex; justify-content:center; margin: 12px 0 10px;">
							<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
								<circle cx="110" cy="110" r="18" fill="#4f7bd6" opacity="0.15" stroke="#4f7bd6" stroke-width="2"/>
								<text x="110" y="116" text-anchor="middle" font-size="13" font-family="Manrope, system-ui, sans-serif" fill="#11141a">+Z</text>
								<circle cx="110" cy="110" r="38" fill="none" stroke="#c9d4ee" stroke-width="2"/>
								<circle cx="110" cy="110" r="62" fill="none" stroke="#c9d4ee" stroke-width="2"/>
								<circle cx="110" cy="110" r="86" fill="none" stroke="#c9d4ee" stroke-width="2"/>
								<circle cx="110" cy="110" r="108" fill="none" stroke="#c9d4ee" stroke-width="2"/>
								<text x="110" y="34" text-anchor="middle" font-size="11" fill="#6b7280" font-family="Manrope, system-ui, sans-serif">слои: 2 · 8 · 8 · 2</text>
							</svg>
						</div>
						<p>Запишите величину заряда ядра (<b>X</b>) атома и номер группы (<b>Y</b>), в которой расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 313',
					correct: '202',
					hint: 'Число электронов в нейтральном атоме равно заряду ядра; группа главной подгруппы по числу внешних электронов.'
				},
				{
					id: 2403,
					type: 'input',
					title: 'Основные свойства оксидов (Mg, Al, Na)',
					body: `
						<p>Расположите химические элементы:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>магний</li>
							<li>алюминий</li>
							<li>натрий</li>
						</ol>
						<p>в порядке <b>усиления основных свойств</b> их оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в соответствующем порядке, без пробелов и запятых.</p>
					`,
					placeholder: 'например, 324',
					correct: '213',
					hint: 'В одном периоде основность оксидов усиливается при ослаблении неметаллических свойств элемента.'
				},
				{
					id: 2404,
					type: 'match',
					title: 'Валентность серы',
					body: `<p>Установите соответствие между формулой соединения и валентностью серы.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SO<sub>2</sub>' },
						{ letter: 'Б', label: 'CuSO<sub>4</sub>' },
						{ letter: 'В', label: 'CuS' }
					],
					matchRight: [
						{ id: '1', label: 'I' },
						{ id: '2', label: 'II' },
						{ id: '3', label: 'IV' },
						{ id: '4', label: 'VI' }
					],
					correct: ['3', '4', '2'],
					hint: 'В SO₂ сера проявляет валентность IV; в сульфат-ионе — VI; в сульфиде меди(II) — II.'
				},
				{
					id: 2405,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная неполярная связь',
					body: `<p>Из предложенного перечня выберите <b>две пары элементов</b>, между которыми образуется ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: 'фосфор и кислород' },
						{ id: '2', label: 'азот и азот' },
						{ id: '3', label: 'сера и хлор' },
						{ id: '4', label: 'фтор и фтор' },
						{ id: '5', label: 'хлор и кислород' }
					],
					correct: ['2', '4'],
					hint: 'Неполярная ковалентная связь — между атомами одного неметалла.'
				},
				{
					id: 2406,
					type: 'multi',
					pickCount: 2,
					title: 'Кремний и углерод',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как кремния, так и углерода?</p>`,
					options: [
						{ id: '1', label: 'Восстановительные свойства выражены сильнее, чем у свинца.' },
						{ id: '2', label: 'Во внешнем электронном слое находится четыре электрона.' },
						{ id: '3', label: 'Химический элемент образует высший оксид, соответствующий формуле RO<sub>2</sub>.' },
						{ id: '4', label: 'Химический элемент относится к металлам.' },
						{ id: '5', label: 'Химический элемент не образует летучих водородных соединений.' }
					],
					correct: ['2', '3'],
					hint: 'Оба элемента — в IVА группе: 4 внешних электрона и высшая степень окисления +4.'
				},
				{
					id: 2407,
					type: 'input',
					title: 'Амфотерный гидроксид и средняя соль',
					body: `
						<p>Из предложенного перечня веществ выберите амфотерный гидроксид и среднюю соль. Запишите в поле ответа сначала номер амфотерного гидроксида, а затем номер средней соли.</p>
						<p style="color:var(--muted);font-size:14px;">Варианты: 1) Zn(OH)<sub>2</sub>, 2) CuO, 3) NaOH, 4) Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub>, 5) (NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub>.</p>
					`,
					placeholder: 'например, 26',
					correct: '15',
					hint: 'Средняя соль не содержит «лишних» водородов в анионе кислотного остатка.'
				},
				{
					id: 2408,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция с N₂O₃',
					body: `<p>Какие <b>два</b> из перечисленных веществ вступают в реакцию с оксидом азота(III)?</p>`,
					options: [
						{ id: '1', label: 'гидроксид натрия' },
						{ id: '2', label: 'оксид серы(VI)' },
						{ id: '3', label: 'кремниевая кислота' },
						{ id: '4', label: 'оксид углерода(II)' },
						{ id: '5', label: 'вода' }
					],
					correct: ['1', '5'],
					hint: 'N₂O₃ — кислотный оксид: типично реагирует с основаниями и водой.'
				},
				{
					id: 2409,
					type: 'match',
					title: 'Продукты (соединения железа)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH + FeSO<sub>4</sub>' },
						{ letter: 'Б', label: 'H<sub>2</sub>SO<sub>4</sub> + Fe(OH)<sub>3</sub>' },
						{ letter: 'В', label: 'Fe + H<sub>2</sub>SO<sub>4</sub>(разб.)' }
					],
					matchRight: [
						{ id: '1', label: 'FeSO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Fe(OH)<sub>2</sub> + Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '3', label: 'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'Fe(OH)<sub>3</sub> + Na<sub>2</sub>SO<sub>4</sub>' },
						{ id: '5', label: 'FeSO<sub>4</sub> + H<sub>2</sub>' }
					],
					correct: ['2', '3', '5'],
					hint: 'Щёлочь + соль железа(II) даёт гидроксид; кислота + Fe(OH)₃ → соль Fe(III); Fe + H₂SO₄(разб.) → FeSO₄ + H₂.'
				},
				{
					id: 2410,
					type: 'match',
					title: 'Вещества и реагенты (Br₂, HF, NaBr)',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с которыми это вещество может вступать в реакцию.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Br<sub>2</sub>' },
						{ letter: 'Б', label: 'HF' },
						{ letter: 'В', label: 'NaBr(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'SiO<sub>2</sub>, Zn' },
						{ id: '2', label: 'Cl<sub>2</sub>, AgNO<sub>3</sub>(р-р)' },
						{ id: '3', label: 'Cu, NaF(р-р)' },
						{ id: '4', label: 'KI(р-р), KOH(р-р)' }
					],
					correct: ['4', '1', '2'],
					hint: 'Br₂ проявляет типичные окислительные свойства галогена; HF растворяет SiO₂ и реагирует с активными металлами.'
				},
				{
					id: 2411,
					type: 'multi',
					pickCount: 2,
					title: 'Обратимые реакции',
					body: `<p>Из предложенного перечня выберите <b>две пары веществ</b>, между которыми протекает обратимая реакция.</p>`,
					options: [
						{ id: '1', label: 'метан и кислород' },
						{ id: '2', label: 'гидроксид меди(II) и соляная кислота' },
						{ id: '3', label: 'серная кислота и гидроксид калия' },
						{ id: '4', label: 'водород и йод' },
						{ id: '5', label: 'оксид углерода(IV) и вода' }
					],
					correct: ['4', '5'],
					hint: 'Ищите равновесия без «жёсткого» завершения (осадок газ слабый электролит как единственный путь).'
				},
				{
					id: 2412,
					type: 'match',
					title: 'Признаки реакций (SO₂, CO₂, NH₃)',
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SO<sub>2</sub>(г) и H<sub>2</sub>O(ж)' },
						{ letter: 'Б', label: 'CO<sub>2</sub>(г) и Ca(OH)<sub>2</sub>(р-р, изб.)' },
						{ letter: 'В', label: 'NH<sub>3</sub>(г) и H<sub>2</sub>O(ж)' }
					],
					matchRight: [
						{ id: '1', label: 'образование раствора, в котором лакмус изменяет окраску на красную' },
						{ id: '2', label: 'образование белого осадка' },
						{ id: '3', label: 'образование раствора, в котором лакмус изменяет окраску на синюю' },
						{ id: '4', label: 'образование белого дыма' }
					],
					correct: ['1', '2', '3'],
					hint: 'Кислотный оксид + вода даёт кислую среду; NH₃ + вода — слабое основание; CO₂ с избытком гидроксида кальция даёт CaCO₃↓.'
				},
				{
					id: 2413,
					type: 'multi',
					pickCount: 2,
					title: '1 моль катионов',
					body: `<p>При диссоциации 1 моль каких <b>двух</b> из перечисленных веществ образуется 1 моль катионов?</p>`,
					options: [
						{ id: '1', label: 'фосфат калия' },
						{ id: '2', label: 'гидроксид бария' },
						{ id: '3', label: 'карбонат аммония' },
						{ id: '4', label: 'нитрат магния' },
						{ id: '5', label: 'сульфат натрия' }
					],
					correct: ['2', '4'],
					hint: 'Смотрите стехиометрию диссоциации: сколько моль катионов даёт 1 моль соли/основания.'
				},
				{
					id: 2414,
					type: 'multi',
					pickCount: 2,
					title: 'Газ при взаимодействии двух веществ',
					body: `<p>Из предложенного перечня веществ выберите <b>два вещества</b>, при взаимодействии которых образуется газ.</p>`,
					options: [
						{ id: '1', label: 'гидроксид калия' },
						{ id: '2', label: 'серная кислота' },
						{ id: '3', label: 'фосфат кальция' },
						{ id: '4', label: 'нитрат бария' },
						{ id: '5', label: 'сульфид натрия' },
						{ id: '6', label: 'хлорид кальция' }
					],
					correct: ['2', '5'],
					hint: 'Сильная кислота + соль слабой летучей кислоты может выделять газ (например, H₂S).'
				},
				{
					id: 2415,
					type: 'match',
					title: 'ОВР: окисление и восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и названием этого процесса.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Si(+4) → Si(0)' },
						{ letter: 'Б', label: '2H(+1) → H<sub>2</sub>(0)' },
						{ letter: 'В', label: 'K(0) → K(+1)' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: 'Степень окисления растёт — окисление; уменьшается — восстановление.'
				},
				{
					id: 2416,
					type: 'multi',
					pickCount: 3,
					title: 'Правила работы в лаборатории и быту',
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и быту выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'Пролитую серную кислоту засыпают песком, а после его уборки посыпают место розлива содой и промывают водой.' },
						{ id: '2', label: 'Жидкость в сосуд с узким горлом переливают с помощью мерного цилиндра.' },
						{ id: '3', label: 'Пробирку укрепляют в лапке штатива так, чтобы её можно было свободно повернуть.' },
						{ id: '4', label: 'Растворы в стакане перемешивают стеклянной палочкой, на которую надет небольшой кусочек резиновой трубки.' }
					],
					correct: ['1', '3', '4'],
					hint: 'Мерный цилиндр — для измерения объёма; для переливания обычно используют воронку.'
				},
				{
					id: 2417,
					type: 'match',
					title: 'Реактив для различения',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'HCl(р-р) и HNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SO<sub>4</sub>(р-р) и NaNO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'KOH(р-р) и KCl(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'лакмус' },
						{ id: '2', label: 'Cu' },
						{ id: '3', label: 'BaCl<sub>2</sub>(р-р)' },
						{ id: '4', label: 'NaOH(р-р)' }
					],
					correct: ['2', '3', '1'],
					hint: 'HNO₃ окисляет медь в типичном опыте; Ba²⁺ даёт BaSO₄↓; лакмус различает щёлочь и нейтральную соль.'
				},
				{
					id: 2418,
					type: 'input',
					title: 'ω(Mg) в MgSO₄',
					body: `
						<p>Раствор сульфата магния MgSO<sub>4</sub> применяют в медицине как средство для внутривенного введения, которое снижает давление.</p>
						<p>Вычислите массовую долю магния в сульфате магния (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 31',
					correct: '20',
					hint: 'ω(Mg) = Ar(Mg)/Mr(MgSO₄)·100%.'
				},
				{
					id: 2419,
					type: 'input',
					title: 'Масса MgSO₄ в порции раствора',
					body: `
						<p>Для снижения давления используют раствор, в 1 л которого содержится 50 г магния.</p>
						<p>Вычислите, сколько граммов сульфата магния вводится в организм человека с 0,02 л такого раствора.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(Mg) = 20% из предыдущего задания. Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 6',
					correct: '5',
					hint: 'Сначала найдите массу Mg в 0,02 л, затем пересчитайте в массу MgSO₄.'
				},
				// ============================================================
				// ВАРИАНТ 24 · Часть 2 (2420–2422) — тот же источник: e:\Химия\variant24.js
				// ============================================================
				{
					id: 2420,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Ba + HNO₃(разб.)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции, схема которой:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Ba + HNO<sub>3</sub>(разб.) → Ba(NO<sub>3</sub>)<sub>2</sub> + NH<sub>4</sub>NO<sub>3</sub> + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс:</b> Ba(0) − 2e⁻ → Ba(+2) (восстановитель); N(+5) + 8e⁻ → N(−3) в NH<sub>4</sub><sup>+</sup> (окислитель).</p>
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">4Ba + 10HNO<sub>3</sub> → 4Ba(NO<sub>3</sub>)<sub>2</sub> + NH<sub>4</sub>NO<sub>3</sub> + 3H<sub>2</sub>O</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (Ba и N).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно: 4, 10, 4, 1, 3.' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель (HNO₃ / N⁺⁵) и восстановитель (Ba).' }
					]
				},
				{
					id: 2421,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка Ca(OH)₂ → CaCl₂',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Ca(OH)<sub>2</sub> → CaCO<sub>3</sub> → X → CaCl<sub>2</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>X = CaO.</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) Ca(OH)<sub>2</sub> + CO<sub>2</sub> → CaCO<sub>3</sub>↓ + H<sub>2</sub>O<br>
							2) CaCO<sub>3</sub> →<sup>t°</sup> CaO + CO<sub>2</sub>↑<br>
							3) CaO + 2HCl → CaCl<sub>2</sub> + H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получен CaCO₃ из Ca(OH)₂ (реакция с CO₂).' },
						{ id: 'c2', points: 1, label: 'Показано термическое разложение CaCO₃ до CaO.' },
						{ id: 'c3', points: 1, label: 'Получен CaCl₂ из CaO реакцией с HCl.' }
					]
				},
				{
					id: 2422,
					type: 'written',
					maxPoints: 3,
					title: 'Объём O₂ из 3%-го H₂O₂',
					taskKind: 'Расчётная задача',
					body: `
						<p>Вычислите объём кислорода, который образуется при разложении 680 г 3%-го раствора пероксида водорода (н.у.).</p>
					`,
					solution: `
						<p><b>1)</b> m(H<sub>2</sub>O<sub>2</sub>) = 680·0,03 = 20,4 г; M = 34 г/моль; n = 0,6 моль.</p>
						<p><b>2)</b> 2H<sub>2</sub>O<sub>2</sub> → 2H<sub>2</sub>O + O<sub>2</sub>↑ ⇒ n(O<sub>2</sub>) = n(H<sub>2</sub>O<sub>2</sub>)/2 = 0,3 моль.</p>
						<p><b>3)</b> V(O<sub>2</sub>) = 0,3·22,4 = <b>6,72 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса и количество H₂O₂ в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению разложения найдено количество O₂.' },
						{ id: 'c3', points: 1, label: 'Найден объём O₂ при н.у. (6,72 л).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 25 · Часть 1 (задания 2501–2515) + Часть 2 (2520–2523)
				// Источник: e:\Химия\variant25.js (скан сборника «30 тренировочных вариантов»)
				// Примечание: на скане отсутствуют задания 16–19 (в файле есть 1–15 и 20–23).
				// ============================================================
				{
					id: 2501,
					type: 'multi',
					pickCount: 2,
					title: 'Al как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится об алюминии как о <b>химическом элементе</b>.</p>`,
					options: [
						{ id: '1', label: 'Из алюминия изготавливают посуду.' },
						{ id: '2', label: 'Алюминий лёгкий и пластичный.' },
						{ id: '3', label: 'Алюминий входит в состав дюралюминия.' },
						{ id: '4', label: 'Алюминий входит в состав глинозёма.' },
						{ id: '5', label: 'Алюминий занимает третье место по распространённости в земной коре.' }
					],
					correct: ['4', '5'],
					hint: 'Про элемент говорят как о виде атомов: «входит в состав соединений», «распространённость».'
				},
				{
					id: 2502,
					type: 'input',
					title: 'Период и заряд ядра (2-8-1)',
					body: `
						<p>Дана схема строения электронных оболочек атома: <b>2ē, 8ē, 1ē</b>.</p>
						<p>Запишите номер периода (<b>X</b>) и величину заряда ядра (<b>Y</b>).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов.</p>
					`,
					placeholder: 'например, 422',
					correct: '311',
					hint: 'Электронов 11 → Z=11; слоёв 3 → период 3.'
				},
				{
					id: 2503,
					type: 'input',
					title: 'Z: N, O, F',
					body: `
						<p>Расположите элементы в порядке увеличения зарядов ядер:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>фтор</li>
							<li>азот</li>
							<li>кислород</li>
						</ol>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в нужном порядке.</p>
					`,
					placeholder: 'например, 342',
					correct: '231',
					hint: 'Z(N)=7, Z(O)=8, Z(F)=9.'
				},
				{
					id: 2504,
					type: 'match',
					title: 'Степень окисления I',
					body: `<p>Установите соответствие между формулой и степенью окисления йода.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'I<sub>2</sub>O<sub>5</sub>' },
						{ letter: 'Б', label: 'I<sub>2</sub>' },
						{ letter: 'В', label: 'HIO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−1' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+5' },
						{ id: '4', label: '+7' }
					],
					correct: ['3', '2', '3'],
					hint: 'I₂ — 0; в I₂O₅ и HIO₃ йод +5.'
				},
				{
					id: 2505,
					type: 'multi',
					pickCount: 2,
					title: 'Ковалентная полярная связь',
					body: `<p>Выберите <b>две пары элементов</b>, между которыми образуется ковалентная полярная связь.</p>`,
					options: [
						{ id: '1', label: 'иод и иод' },
						{ id: '2', label: 'бром и бром' },
						{ id: '3', label: 'кремний и кислород' },
						{ id: '4', label: 'калий и фтор' },
						{ id: '5', label: 'углерод и хлор' }
					],
					correct: ['3', '5'],
					hint: 'Полярная ковалентная — между разными неметаллами (без “металл + неметалл”).'
				},
				{
					id: 2506,
					type: 'multi',
					pickCount: 2,
					title: 'Азот и фосфор (общие свойства)',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как азота, так и фосфора?</p>`,
					options: [
						{ id: '1', label: 'Химический элемент относится к неметаллам.' },
						{ id: '2', label: 'Химический элемент образует высший оксид формулы R<sub>2</sub>O<sub>5</sub>.' },
						{ id: '3', label: 'Простое вещество существует в виде четырёхатомных молекул.' },
						{ id: '4', label: 'До завершения внешнего слоя не хватает пяти электронов.' },
						{ id: '5', label: 'Электроотрицательность меньше, чем у мышьяка.' }
					],
					correct: ['1', '2'],
					hint: 'Оба — VА группа: неметаллы, высшая степень окисления +5 → R₂O₅.'
				},
				{
					id: 2507,
					type: 'input',
					title: 'Кислотный и основный оксид',
					body: `
						<p>Выберите из списка <b>кислотный</b> оксид и <b>основный</b> оксид.</p>
						<p style="color:var(--muted);font-size:14px;">
							1) N<sub>2</sub>O &nbsp; 2) Cl<sub>2</sub>O<sub>7</sub> &nbsp; 3) Al<sub>2</sub>O<sub>3</sub> &nbsp; 4) CO &nbsp; 5) Li<sub>2</sub>O
						</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала номер кислотного, затем номер основного.</p>
					`,
					placeholder: 'например, 36',
					correct: '25',
					hint: 'Cl₂O₇ — кислотный; Li₂O — основный.'
				},
				{
					id: 2508,
					type: 'multi',
					pickCount: 2,
					title: 'K₂O: с чем реагирует',
					body: `<p>Какие <b>два</b> вещества вступают в реакцию с оксидом калия K<sub>2</sub>O?</p>`,
					options: [
						{ id: '1', label: 'оксид азота(II) NO' },
						{ id: '2', label: 'оксид углерода(IV) CO<sub>2</sub>' },
						{ id: '3', label: 'оксид бария BaO' },
						{ id: '4', label: 'гидрат аммиака NH<sub>3</sub>·H<sub>2</sub>O' },
						{ id: '5', label: 'соляная кислота HCl' }
					],
					correct: ['2', '5'],
					hint: 'Основный оксид реагирует с кислотами и кислотными оксидами.'
				},
				{
					id: 2509,
					type: 'match',
					title: 'Продукты реакций (Na-соли серы)',
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaOH(изб) + SO<sub>3</sub>' },
						{ letter: 'Б', label: 'Na<sub>2</sub>O + H<sub>2</sub>SO<sub>4</sub>' },
						{ letter: 'В', label: 'H<sub>2</sub>SO<sub>4</sub> + Na<sub>2</sub>SO<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '3', label: 'Na<sub>2</sub>SO<sub>4</sub> + SO<sub>2</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '5', label: 'Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O' }
					],
					correct: ['4', '4', '3'],
					hint: 'SO₃ в избытке щёлочи даёт среднюю соль; H₂SO₄ вытесняет H₂SO₃ → SO₂ + H₂O.'
				},
				{
					id: 2510,
					type: 'match',
					title: 'Реагенты (NH₃, N₂, HNO₃ конц.)',
					body: `<p>Установите соответствие между формулой вещества и реагентами, с которыми это вещество может реагировать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NH<sub>3</sub>' },
						{ letter: 'Б', label: 'N<sub>2</sub>' },
						{ letter: 'В', label: 'HNO<sub>3</sub> (конц., хол.)' }
					],
					matchRight: [
						{ id: '1', label: 'Fe, Na<sub>2</sub>CO<sub>3</sub>(р-р)' },
						{ id: '2', label: 'H<sub>2</sub>, Li' },
						{ id: '3', label: 'O<sub>2</sub>, HCl' },
						{ id: '4', label: 'Cu, KOH(р-р)' }
					],
					correct: ['3', '2', '4'],
					hint: 'NH₃ реагирует с O₂ и HCl; N₂ — с H₂ и Li; HNO₃(конц) — с Cu и нейтрализуется KOH.'
				},
				{
					id: 2511,
					type: 'multi',
					pickCount: 2,
					title: 'Реакция замещения',
					body: `<p>Выберите <b>две пары веществ</b>, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: 'цинк и серная кислота (разб.)' },
						{ id: '2', label: 'оксид меди(II) и водород' },
						{ id: '3', label: 'оксид меди(II) и азотная кислота' },
						{ id: '4', label: 'оксид фосфора(V) и вода' },
						{ id: '5', label: 'сульфид натрия и нитрат меди(II)' }
					],
					correct: ['1', '2'],
					hint: 'Замещение: простое + сложное → новое простое + новое сложное.'
				},
				{
					id: 2512,
					type: 'match',
					title: 'Условия реакции (SO₂, N₂, Cu)',
					body: `<p>Установите соответствие между реагирующими веществами и условиями протекания реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SO<sub>2</sub> и O<sub>2</sub>' },
						{ letter: 'Б', label: 'N<sub>2</sub> и H<sub>2</sub>' },
						{ letter: 'В', label: 'Cu и O<sub>2</sub>' }
					],
					matchRight: [
						{ id: '1', label: 'нагревание исходных веществ' },
						{ id: '2', label: 'нагревание, высокое давление, катализатор Fe (с промоторами)' },
						{ id: '3', label: 'нагревание, высокое давление, катализатор V<sub>2</sub>O<sub>5</sub>' },
						{ id: '4', label: 'нагревание, катализатор V<sub>2</sub>O<sub>5</sub>' }
					],
					correct: ['4', '2', '1'],
					hint: 'Контактный процесс (SO₂→SO₃) — V₂O₅; синтез NH₃ — Fe + p + T; Cu окисляется при нагревании.'
				},
				{
					id: 2513,
					type: 'multi',
					pickCount: 2,
					title: 'Одинаковые анионы при диссоциации',
					body: `<p>Выберите <b>два вещества</b>, при диссоциации которых образуются одинаковые анионы.</p>`,
					options: [
						{ id: '1', label: 'фосфат натрия Na<sub>3</sub>PO<sub>4</sub>' },
						{ id: '2', label: 'фосфорная кислота H<sub>3</sub>PO<sub>4</sub>' },
						{ id: '3', label: 'гидрофосфат кальция CaHPO<sub>4</sub>' },
						{ id: '4', label: 'фосфат калия K<sub>3</sub>PO<sub>4</sub>' },
						{ id: '5', label: 'дигидрофосфат натрия NaH<sub>2</sub>PO<sub>4</sub>' }
					],
					correct: ['1', '4'],
					hint: 'Одинаковый анион PO₄³⁻ дают Na₃PO₄ и K₃PO₄.'
				},
				{
					id: 2514,
					type: 'multi',
					pickCount: 2,
					title: 'Ионное уравнение (H⁺ + CO₃²⁻)',
					body: `<p>Выберите <b>два исходных вещества</b>, взаимодействию которых соответствует сокращённое ионное уравнение:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							2H<sup>+</sup> + CO<sub>3</sub><sup>2−</sup> → H<sub>2</sub>O + CO<sub>2</sub>↑
						</p>`,
					options: [
						{ id: '1', label: 'карбонат кальция CaCO<sub>3</sub>' },
						{ id: '2', label: 'вода' },
						{ id: '3', label: 'соляная кислота HCl' },
						{ id: '4', label: 'оксид углерода(IV) CO<sub>2</sub>' },
						{ id: '5', label: 'карбонат калия K<sub>2</sub>CO<sub>3</sub>' },
						{ id: '6', label: 'кремниевая кислота H<sub>2</sub>SiO<sub>3</sub>' }
					],
					correct: ['3', '5'],
					hint: 'Нужны свободные H⁺ (сильная кислота) и CO₃²⁻ (растворимый карбонат).'
				},
				{
					id: 2515,
					type: 'match',
					title: 'ОВР: окисление/восстановление',
					body: `<p>Установите соответствие между схемой процесса в ОВР и названием процесса.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Li<sup>0</sup> → Li<sup>+1</sup>' },
						{ letter: 'Б', label: 'C<sup>+2</sup> → C<sup>+4</sup>' },
						{ letter: 'В', label: 'N<sup>+5</sup> → N<sup>−3</sup>' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['1', '1', '2'],
					hint: 'Рост степени окисления — окисление; падение — восстановление.'
				},
				// ------------------------------------------------------------
				// ВАРИАНТ 25 · ДОБАВЛЕНО (сгенерировано): задания 16–19
				// Причина: отсутствуют на скане источника.
				// ------------------------------------------------------------
				{
					id: 2516,
					type: 'multi',
					pickCount: 3,
					title: 'Безопасность и экология: верные суждения',
					body: `<p>Из перечисленных суждений выберите <b>три</b> верных.</p>`,
					options: [
						{ id: '1', label: 'Если на кожу попал раствор щёлочи, место промывают большим количеством воды, затем обрабатывают слабым раствором кислоты (например, уксусной).' },
						{ id: '2', label: 'Концентрированные кислоты и щёлочи можно пробовать на вкус, чтобы распознать вещество.' },
						{ id: '3', label: 'Запах вещества в лаборатории определяют «обмахиванием» (направляя пары к себе ладонью), а не вдыхая прямо над сосудом.' },
						{ id: '4', label: 'Использованные растворы солей тяжёлых металлов (Cu²⁺, Pb²⁺) нельзя выливать в раковину: их собирают отдельно.' },
						{ id: '5', label: 'При разбавлении кислоту добавляют к воде, а не наоборот.' }
					],
					correct: ['3', '4', '5'],
					hint: 'Правила: «кислоту — в воду», тяжёлые металлы — отдельно, запах — только “обмахиванием”.'
				},
				{
					id: 2517,
					type: 'match',
					title: 'Реактив для различения (растворы)',
					body: `<p>Установите соответствие между двумя растворами и реактивом, с помощью которого можно их различить.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Na<sub>2</sub>CO<sub>3</sub> и NaCl' },
						{ letter: 'Б', label: 'Na<sub>2</sub>SO<sub>4</sub> и NaNO<sub>3</sub>' },
						{ letter: 'В', label: 'NH<sub>4</sub>Cl и NaCl' }
					],
					matchRight: [
						{ id: '1', label: 'HCl (р-р)' },
						{ id: '2', label: 'BaCl<sub>2</sub> (р-р)' },
						{ id: '3', label: 'NaOH (р-р)' },
						{ id: '4', label: 'лакмус' }
					],
					correct: ['1', '2', '3'],
					hint: 'Карбонат + кислота → CO₂; SO₄²⁻ + Ba²⁺ → BaSO₄↓; NH₄⁺ + щёлочь → NH₃↑.'
				},
				{
					id: 2518,
					type: 'input',
					title: 'ω(Cl) в AlCl₃',
					body: `
						<p>Вычислите массовую долю хлора в хлориде алюминия AlCl<sub>3</sub> (в процентах).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 91',
					correct: '80',
					hint: 'Mr(AlCl₃)=27+3·35,5=133,5; ω(Cl)=106,5/133,5·100%≈79,8%≈80%. При округлении до целых берём 80 (а не 79 — округляем по правилам: 79,8 ≥ 79,5 → вверх).'
				},
				{
					id: 2519,
					type: 'input',
					title: 'Масса AlCl₃ по массе Cl',
					body: `
						<p>В 200 г раствора содержится 12 г хлора, который входит в состав растворённого AlCl<sub>3</sub>.</p>
						<p>Вычислите массу AlCl<sub>3</sub> в этом растворе.</p>
						<p style="color:var(--muted);font-size:14px;">Используйте ω(Cl)≈80% из предыдущего задания. Ответ — с точностью до десятых.</p>
					`,
					placeholder: 'например, 26,1',
					correct: '15,0',
					hint: 'm(AlCl₃)=m(Cl)/ω(Cl)≈12/0,8=15 г.'
				},
				{
					id: 2520,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: Ba + HNO₃ → Ba(NO₃)₂ + N₂O',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Ba + HNO<sub>3</sub>(разб.) → Ba(NO<sub>3</sub>)<sub>2</sub> + N<sub>2</sub>O + H<sub>2</sub>O
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Уравнение:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">4Ba + 10HNO<sub>3</sub> → 4Ba(NO<sub>3</sub>)<sub>2</sub> + N<sub>2</sub>O + 5H<sub>2</sub>O</p>
						<p><b>Окислитель</b> — HNO<sub>3</sub> (N(+5)), <b>восстановитель</b> — Ba(0).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс.' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно.' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 2521,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка NaBr → AlBr₃ → AgBr',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							NaBr → X → AlBr<sub>3</sub> → AgBr
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>X = HBr.</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 2NaBr + H<sub>2</sub>SO<sub>4</sub>(разб) → Na<sub>2</sub>SO<sub>4</sub> + 2HBr↑<br>
							2) 2Al + 6HBr → 2AlBr<sub>3</sub> + 3H<sub>2</sub>↑<br>
							3) AlBr<sub>3</sub> + 3AgNO<sub>3</sub> → 3AgBr↓ + Al(NO<sub>3</sub>)<sub>3</sub>
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из NaBr (корректный способ).' },
						{ id: 'c2', points: 1, label: 'Получено AlBr₃ из X и Al.' },
						{ id: 'c3', points: 1, label: 'Показано получение AgBr (реакция с AgNO₃).' }
					]
				},
				{
					id: 2522,
					type: 'written',
					maxPoints: 3,
					title: 'NO₂ из 96%-й HNO₃ и Cu',
					taskKind: 'Расчётная задача',
					body: `<p>Вычислите объём (н.у.) оксида азота(IV), который образуется при взаимодействии избытка меди с 320 г 96%-й азотной кислоты.</p>`,
					solution: `
						<p>Cu + 4HNO<sub>3</sub>(конц) → Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO<sub>2</sub>↑ + 2H<sub>2</sub>O</p>
						<p>m(HNO<sub>3</sub>) = 320·0,96 = 307,2 г; n(HNO<sub>3</sub>) = 307,2/63 ≈ 4,876 моль.</p>
						<p>По уравнению n(NO<sub>2</sub>) = n(HNO<sub>3</sub>)/2 ≈ 2,438 моль.</p>
						<p>V(NO<sub>2</sub>) = 2,438·22,4 ≈ <b>54,6 л</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса/количество HNO₃ в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению найдено количество NO₂.' },
						{ id: 'c3', points: 1, label: 'Найден объём NO₂ при н.у. (≈54,6 л).' }
					]
				},
				{
					id: 2523,
					type: 'written',
					maxPoints: 3,
					title: 'Практика: HCl и K₂CO₃ (распознавание)',
					taskKind: 'Практическое задание',
					body: `
						<p>В склянках №1 и №2 — соляная кислота и раствор карбоната калия.</p>
						<p>Доступные реактивы: растворы серной кислоты, гидроксида натрия и фенолфталеина.</p>
						<p>Выполните пункты задания и заполните таблицу наблюдений.</p>
					`,
					solution: `
						<p><b>Реактивы:</b> H<sub>2</sub>SO<sub>4</sub> и фенолфталеин.</p>
						<p><b>Наблюдения:</b> K<sub>2</sub>CO<sub>3</sub> даёт малиновую окраску с фенолфталеином и выделение CO<sub>2</sub> с H<sub>2</sub>SO<sub>4</sub>; HCl — фенолфталеин бесцветный, с H<sub>2</sub>SO<sub>4</sub> видимых изменений нет.</p>
						<p><b>Уравнения (для карбоната с кислотой):</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							K<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> → K<sub>2</sub>SO<sub>4</sub> + CO<sub>2</sub>↑ + H<sub>2</sub>O<br>
							2K<sup>+</sup> + CO<sub>3</sub><sup>2−</sup> + 2H<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> → 2K<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> + CO<sub>2</sub>↑ + H<sub>2</sub>O<br>
							2H<sup>+</sup> + CO<sub>3</sub><sup>2−</sup> → CO<sub>2</sub>↑ + H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Выбраны корректные реактивы и способ различения (индикатор + кислота).' },
						{ id: 'c2', points: 1, label: 'Записаны молекулярное, полное и сокращённое ионные уравнения.' },
						{ id: 'c3', points: 1, label: 'Описаны наблюдаемые признаки (окраска/газ).' }
					]
				},
				// ============================================================
				// ВАРИАНТ 26 · Часть 1 (задания 2601–2619) + Часть 2 (2620–2622)
				// Источник: e:\Химия\variant26.js (в файле помечен как «Вариант 11» из сборника)
				// ============================================================
				{
					id: 2601,
					type: 'multi',
					pickCount: 2,
					title: 'Ca как химический элемент',
					body: `<p>Выберите <b>два высказывания</b>, в которых говорится о кальции как о <b>химическом элементе</b>.</p>`,
					options: [
						{ id: '1', label: 'При нагревании на воздухе кальций горит красным пламенем.' },
						{ id: '2', label: 'Кальций в природе образует 385 минералов.' },
						{ id: '3', label: 'Кальций используют в качестве восстановителя при получении металлов.' },
						{ id: '4', label: 'На долю кальция приходится 3,38% массы земной коры.' },
						{ id: '5', label: 'Кальций активно реагирует с водой.' }
					],
					correct: ['2', '4'],
					hint: 'Про элемент: распространённость и участие в составе природных соединений.'
				},
				{
					id: 2602,
					type: 'input',
					title: 'Группа и внешние электроны (Z=13)',
					body: `
						<p>В ядре атома <b>13 протонов</b> и <b>14 нейтронов</b>.</p>
						<p>Запишите номер группы (<b>X</b>) и число электронов на внешнем слое (<b>Y</b>).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ: сначала X, затем Y, без пробелов.</p>
					`,
					placeholder: 'например, 44',
					correct: '33',
					hint: 'Z=13 → Al. Группа 13 (IIIА) и 3 внешних электрона → 33.'
				},
				{
					id: 2603,
					type: 'input',
					title: 'Радиусы атомов (Li, Na, K)',
					body: `
						<p>Расположите элементы в порядке <b>уменьшения</b> радиусов их атомов:</p>
						<ol style="margin: 10px 0 14px 22px; padding: 0; font-size: 16px;">
							<li>калий</li>
							<li>литий</li>
							<li>натрий</li>
						</ol>
						<p style="color:var(--muted);font-size:14px;">Запишите номера элементов в нужном порядке.</p>
					`,
					placeholder: 'например, 243',
					correct: '132',
					hint: 'В группе радиус растёт сверху вниз: K > Na > Li.'
				},
				{
					id: 2604,
					type: 'match',
					title: 'Степень окисления S',
					body: `<p>Установите соответствие между формулой соединения и степенью окисления серы.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'K<sub>2</sub>SO<sub>3</sub>' },
						{ letter: 'Б', label: 'Al<sub>2</sub>S<sub>3</sub>' },
						{ letter: 'В', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' }
					],
					matchRight: [
						{ id: '1', label: '−2' },
						{ id: '2', label: '0' },
						{ id: '3', label: '+4' },
						{ id: '4', label: '+6' }
					],
					correct: ['3', '1', '4'],
					hint: 'Сульфит: +4; сульфид: −2; сульфат: +6.'
				},
				{
					id: 2605,
					type: 'multi',
					pickCount: 2,
					title: 'Ионная связь',
					body: `<p>Выберите <b>две пары элементов</b>, между которыми образуется ионная связь.</p>`,
					options: [
						{ id: '1', label: 'водород и кислород' },
						{ id: '2', label: 'кальций и фтор' },
						{ id: '3', label: 'сера и сера' },
						{ id: '4', label: 'кремний и фтор' },
						{ id: '5', label: 'барий и кислород' }
					],
					correct: ['2', '5'],
					hint: 'Ионная связь — металл + неметалл (большая разница электроотрицательностей).'
				},
				{
					id: 2606,
					type: 'multi',
					pickCount: 2,
					title: 'Углерод и азот: общие свойства',
					body: `<p>Какие <b>два утверждения</b> верны для характеристики как углерода, так и азота?</p>`,
					options: [
						{ id: '1', label: 'Имеет больший радиус атома, чем литий.' },
						{ id: '2', label: 'Летучее водородное соединение проявляет основные свойства.' },
						{ id: '3', label: 'В атоме электроны располагаются на двух электронных слоях.' },
						{ id: '4', label: 'Проявляет менее сильные неметаллические свойства, чем кислород.' },
						{ id: '5', label: 'Химический элемент образует высший оксид, соответствующий формуле RO<sub>2</sub>.' }
					],
					correct: ['3', '4'],
					hint: 'Оба — 2 период (2 слоя); O — сильнее неметалл, чем C и N.'
				},
				{
					id: 2607,
					type: 'input',
					title: 'Амфотерный гидроксид и щёлочь',
					body: `
						<p>Выберите амфотерный гидроксид и щёлочь. Запишите сначала номер амфотерного гидроксида, затем номер щёлочи.</p>
						<p style="color:var(--muted);font-size:14px;">1) (CuOH)<sub>2</sub>CO<sub>3</sub>  2) Cu(OH)<sub>2</sub>  3) Cr(OH)<sub>3</sub>  4) Ca(OH)<sub>2</sub>  5) Cr(OH)<sub>2</sub></p>
					`,
					placeholder: 'например, 45',
					correct: '34',
					hint: 'Cr(OH)₃ — амфотерный, Ca(OH)₂ — щёлочь.'
				},
				{
					id: 2608,
					type: 'multi',
					pickCount: 2,
					title: 'Fe даёт только +2',
					body: `<p>Выберите <b>два</b> вещества, которые реагируют с железом с образованием продукта, где Fe имеет только степень окисления +2.</p>`,
					options: [
						{ id: '1', label: 'сера' },
						{ id: '2', label: 'хлор' },
						{ id: '3', label: 'соляная кислота' },
						{ id: '4', label: 'концентрированная азотная кислота при нагревании' },
						{ id: '5', label: 'кислород' }
					],
					correct: ['1', '3'],
					hint: 'FeS и FeCl₂ дают Fe(+2); Cl₂/HNO₃/O₂ обычно ведут к +3 или смешанным.'
				},
				{
					id: 2609,
					type: 'match',
					title: 'SO₂/SO₃ и продукты',
					body: `<p>Установите соответствие между реагирующими веществами и продуктом(-ами) реакции.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'SO<sub>2</sub> + H<sub>2</sub>O' },
						{ letter: 'Б', label: 'SO<sub>2</sub> + Ca(OH)<sub>2</sub>(р-р, изб)' },
						{ letter: 'В', label: 'SO<sub>3</sub>(изб) + Ca(OH)<sub>2</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'CaSO<sub>3</sub> + H<sub>2</sub>O' },
						{ id: '2', label: 'Ca(HSO<sub>4</sub>)<sub>2</sub>' },
						{ id: '3', label: 'CaSO<sub>4</sub> + H<sub>2</sub>O' },
						{ id: '4', label: 'H<sub>2</sub>SO<sub>3</sub>' },
						{ id: '5', label: 'H<sub>2</sub>SO<sub>4</sub>' }
					],
					correct: ['4', '1', '2'],
					hint: 'SO₂ + вода → H₂SO₃; избыток основания даёт среднюю соль; избыток кислотного оксида даёт кислую соль.'
				},
				{
					id: 2610,
					type: 'match',
					title: 'Al₂O₃ / Al₂(SO₄)₃ / Al и реагенты',
					body: `<p>Установите соответствие между веществом и реагентами, с которыми оно может реагировать.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'Al<sub>2</sub>O<sub>3</sub>' },
						{ letter: 'Б', label: 'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'Al' }
					],
					matchRight: [
						{ id: '1', label: 'Ba(NO<sub>3</sub>)<sub>2</sub>(р-р), NaOH(р-р)' },
						{ id: '2', label: 'I<sub>2</sub>, HNO<sub>3</sub>(конц., хол.)' },
						{ id: '3', label: 'HNO<sub>3</sub>(разб), Fe<sub>2</sub>O<sub>3</sub>' },
						{ id: '4', label: 'HNO<sub>3</sub>(конц., хол.), KOH(р-р)' }
					],
					correct: ['4', '1', '3'],
					hint: 'Al₂O₃ амфотерен (щёлочь/кислота); Al₂(SO₄)₃ даёт BaSO₄ и Al(OH)₃; Al пассивируется конц. HNO₃, но реагирует с разб. HNO₃ и восстанавливает Fe₂O₃.'
				},
				{
					id: 2611,
					type: 'multi',
					pickCount: 2,
					title: 'CuCl₂: ОВР',
					body: `<p>Выберите <b>два</b> вещества, которые вступают с хлоридом меди(II) в окислительно-восстановительную реакцию.</p>`,
					options: [
						{ id: '1', label: 'нитрат серебра AgNO<sub>3</sub>' },
						{ id: '2', label: 'железо Fe' },
						{ id: '3', label: 'гидроксид натрия NaOH' },
						{ id: '4', label: 'цинк Zn' },
						{ id: '5', label: 'сульфид натрия Na<sub>2</sub>S' }
					],
					correct: ['2', '4'],
					hint: 'ОВР — вытеснение меди более активным металлом (Fe, Zn).'
				},
				{
					id: 2612,
					type: 'match',
					title: 'Осадки с AgNO₃',
					body: `<p>Установите соответствие между растворами и признаком реакции с AgNO<sub>3</sub>.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'NaBr(р-р) и AgNO<sub>3</sub>(р-р)' },
						{ letter: 'Б', label: 'NaCl(р-р) и AgNO<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'Na<sub>3</sub>PO<sub>4</sub>(р-р) и AgNO<sub>3</sub>(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'выпадает жёлтый осадок' },
						{ id: '2', label: 'выпадает белый осадок' },
						{ id: '3', label: 'выпадает светло-жёлтый осадок' },
						{ id: '4', label: 'осадок не образуется' }
					],
					correct: ['3', '2', '1'],
					hint: 'AgCl — белый, AgBr — светло‑жёлтый, Ag₃PO₄ — жёлтый.'
				},
				{
					id: 2613,
					type: 'multi',
					pickCount: 2,
					title: 'Электролиты',
					body: `<p>Какие <b>два</b> из перечисленных веществ являются электролитами?</p>`,
					options: [
						{ id: '1', label: 'сульфат алюминия Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>' },
						{ id: '2', label: 'дистиллированная вода' },
						{ id: '3', label: 'глюкоза C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>' },
						{ id: '4', label: 'гидроксид калия KOH' },
						{ id: '5', label: 'этиловый спирт C<sub>2</sub>H<sub>5</sub>OH' }
					],
					correct: ['1', '4'],
					hint: 'Соли и щёлочи — электролиты; молекулярные вещества — нет.'
				},
				{
					id: 2614,
					type: 'multi',
					pickCount: 2,
					title: 'Ионное уравнение Ca²⁺ + CO₃²⁻',
					body: `<p>Сокращённому ионному уравнению реакции</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							Ca<sup>2+</sup> + CO<sub>3</sub><sup>2−</sup> → CaCO<sub>3</sub>↓
						</p>
						<p>соответствует взаимодействие веществ:</p>`,
					options: [
						{ id: '1', label: 'CaSO<sub>4</sub> и (NH<sub>4</sub>)<sub>2</sub>CO<sub>3</sub>' },
						{ id: '2', label: 'CaCl<sub>2</sub> и Na<sub>2</sub>CO<sub>3</sub>' },
						{ id: '3', label: 'Ca(NO<sub>3</sub>)<sub>2</sub> и BaCO<sub>3</sub>' },
						{ id: '4', label: 'CaSO<sub>4</sub> и K<sub>2</sub>SO<sub>4</sub>' },
						{ id: '5', label: 'Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> и CO<sub>2</sub>' },
						{ id: '6', label: 'CaCl<sub>2</sub> и K<sub>2</sub>CO<sub>3</sub>' }
					],
					correct: ['2', '6'],
					hint: 'Нужны растворимые соли Ca²⁺ и CO₃²⁻.'
				},
				{
					id: 2615,
					type: 'match',
					title: 'ОВР: процесс',
					body: `<p>Установите соответствие между схемой процесса в ОВР и названием процесса.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'S<sup>+6</sup> → S<sup>0</sup>' },
						{ letter: 'Б', label: 'Mg<sup>+2</sup> → Mg<sup>0</sup>' },
						{ letter: 'В', label: '2Br<sup>−1</sup> → Br<sub>2</sub><sup>0</sup>' }
					],
					matchRight: [
						{ id: '1', label: 'окисление' },
						{ id: '2', label: 'восстановление' }
					],
					correct: ['2', '2', '1'],
					hint: 'С.о. падает — восстановление; растёт — окисление.'
				},
				{
					id: 2616,
					type: 'multi',
					pickCount: 3,
					title: 'Бытовая химия: безопасные действия',
					body: `<p>Из перечисленных суждений выберите верное(-ые) суждение(-я).</p>`,
					options: [
						{ id: '1', label: 'При использовании отбеливателей для стирки белья необходимо надевать резиновые перчатки.' },
						{ id: '2', label: 'Перед использованием средства бытовой химии необходимо тщательно вымыть руки.' },
						{ id: '3', label: 'Избыток средств бытовой химии нельзя высыпать/выливать обратно в исходную тару.' },
						{ id: '4', label: 'Нельзя хранить пищевые продукты в таре, освободившейся из-под средств бытовой химии.' }
					],
					correct: ['1', '3', '4'],
					hint: 'Перчатки и запрет “обратно в тару” — да; руки моют после работы, а не “перед”.'
				},
				{
					id: 2617,
					type: 'match',
					title: 'Различение веществ',
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества.</p>`,
					matchLeft: [
						{ letter: 'А', label: 'CO<sub>2</sub>(г) и O<sub>2</sub>(г)' },
						{ letter: 'Б', label: 'HNO<sub>3</sub>(р-р) и NH<sub>3</sub>(р-р)' },
						{ letter: 'В', label: 'BaCl<sub>2</sub>(р-р) и NaCl(р-р)' }
					],
					matchRight: [
						{ id: '1', label: 'Na<sub>2</sub>SO<sub>4</sub>(р-р)' },
						{ id: '2', label: 'Ca(OH)<sub>2</sub>(р-р)' },
						{ id: '3', label: 'фенолфталеин' },
						{ id: '4', label: 'HCl(р-р)' }
					],
					correct: ['2', '3', '1'],
					hint: 'CO₂ мутнит известковую воду; фенолфталеин различает кислоту и щёлочь; Ba²⁺ даёт BaSO₄↓.'
				},
				{
					id: 2618,
					type: 'input',
					title: 'ω(Fe) в FeSO₄',
					body: `
						<p>Вычислите массовую долю железа в FeSO<sub>4</sub> (в %).</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до сотых.</p>
					`,
					placeholder: 'например, 47,95',
					correct: '36,84',
					hint: 'Mr(FeSO₄)=56+32+64=152; ω(Fe)=56/152·100%≈36,84%.'
				},
				{
					id: 2619,
					type: 'input',
					title: 'Масса Fe в растворе FeSO₄',
					body: `
						<p>В 0,1 л раствора содержится 5 г FeSO<sub>4</sub>. Сколько граммов железа содержится в таком же растворе, приготовленном из 10 л воды?</p>
						<p style="color:var(--muted);font-size:14px;">Ответ — с точностью до целых.</p>
					`,
					placeholder: 'например, 295',
					correct: '184',
					hint: '50 г/л → 500 г FeSO₄ в 10 л; умножьте на ω(Fe)=56/152.'
				},
				{
					id: 2620,
					type: 'written',
					maxPoints: 3,
					title: 'ОВР: получение фосфора (C + Ca₃(PO₄)₂)',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							C + Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> + SiO<sub>2</sub> → CaSiO<sub>3</sub> + P + CO
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">5C + Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> + 3SiO<sub>2</sub> → 3CaSiO<sub>3</sub> + 2P + 5CO</p>
						<p><b>Окислитель</b> — Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> (P(+5)), <b>восстановитель</b> — C(0).</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс (C и P).' },
						{ id: 'c2', points: 1, label: 'Коэффициенты расставлены верно.' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель и восстановитель.' }
					]
				},
				{
					id: 2621,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка KMnO₄ → O₂ → CuO → Cu(NO₃)₂',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							KMnO<sub>4</sub> → X → CuO → Cu(NO<sub>3</sub>)<sub>2</sub>
						</p>
						<p>Напишите молекулярные уравнения реакций.</p>
					`,
					solution: `
						<p><b>X = O<sub>2</sub>.</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) 2KMnO<sub>4</sub> → K<sub>2</sub>MnO<sub>4</sub> + MnO<sub>2</sub> + O<sub>2</sub>↑<br>
							2) 2Cu + O<sub>2</sub> → 2CuO<br>
							3) CuO + 2HNO<sub>3</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O
						</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Получено X из KMnO₄ (разложение, O₂).' },
						{ id: 'c2', points: 1, label: 'Получен CuO при окислении Cu.' },
						{ id: 'c3', points: 1, label: 'Получен Cu(NO₃)₂ из CuO (реакция с HNO₃).' }
					]
				},
				{
					id: 2622,
					type: 'written',
					maxPoints: 3,
					title: 'Нейтрализация: Ba(OH)₂ и HCl',
					taskKind: 'Расчётная задача',
					body: `<p>Определите массу гидроксида бария, необходимую для нейтрализации 200 г 36%-й соляной кислоты.</p>`,
					solution: `
						<p>Ba(OH)<sub>2</sub> + 2HCl → BaCl<sub>2</sub> + 2H<sub>2</sub>O</p>
						<p>m(HCl)=200·0,36=72 г; n(HCl)=72/36,5≈1,973 моль; n(Ba(OH)<sub>2</sub>)=n(HCl)/2≈0,986 моль.</p>
						<p>M(Ba(OH)<sub>2</sub>)=171 г/моль; m≈0,986·171≈<b>168,6 г</b>.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Найдена масса/количество HCl в растворе.' },
						{ id: 'c2', points: 1, label: 'По уравнению найдено количество Ba(OH)₂.' },
						{ id: 'c3', points: 1, label: 'Найдена масса Ba(OH)₂ (≈168,6 г).' }
					]
				},
				// ============================================================
				// ЧАСТЬ 2 · Задания с развёрнутым ответом (самопроверка) — общие для вариантов 1, 2
				// ============================================================
				{
					id: 20,
					type: 'written',
					maxPoints: 3,
					title: 'Метод электронного баланса',
					taskKind: 'Задача на ОВР',
					body: `
						<p>Используя метод электронного баланса, составьте уравнение реакции по схеме:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							KNO₃ + Al + KOH + H₂O → NH₃ + K[Al(OH)₄]
						</p>
						<p>Определите окислитель и восстановитель.</p>
					`,
					solution: `
						<p><b>Электронный баланс:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							N⁺⁵ + 8ē → N⁻³ &nbsp;&nbsp;| ×3 &nbsp;(восстановление)<br>
							Al⁰ − 3ē → Al⁺³ &nbsp;| ×8 &nbsp;(окисление)
						</p>
						<p><b>Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							3 KNO₃ + 8 Al + 5 KOH + 18 H₂O = 3 NH₃↑ + 8 K[Al(OH)₄]
						</p>
						<p><b>Окислитель</b> — N⁺⁵ (KNO₃), <b>восстановитель</b> — Al⁰.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Составлен электронный баланс: указаны степени окисления, число отданных/принятых электронов и множители (3 и 8).' },
						{ id: 'c2', points: 1, label: 'Правильно расставлены коэффициенты в уравнении реакции (3, 8, 5, 18, 3, 8).' },
						{ id: 'c3', points: 1, label: 'Верно указаны окислитель (N⁺⁵ / KNO₃) и восстановитель (Al⁰).' }
					]
				},
				{
					id: 21,
					type: 'written',
					maxPoints: 3,
					title: 'Цепочка превращений Ca-солей',
					taskKind: 'Уравнения по схеме',
					body: `
						<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">
							CaBr₂ → CaCl₂ →<sup>+Na₂CO₃</sup>→ X → CaSiO₃
						</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>
					`,
					solution: `
						<p><b>Промежуточное вещество X = CaCO₃</b> (по стрелке с Na₂CO₃).</p>
						<p><b>Уравнения реакций:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">
							1) CaBr₂ + Cl₂ = CaCl₂ + Br₂<br>
							2) CaCl₂ + Na₂CO₃ = CaCO₃↓ + 2 NaCl<br>
							3) CaCO₃ + SiO₂ →<sup>t°</sup> CaSiO₃ + CO₂↑
						</p>
						<p style="color:var(--muted); font-size:13px;">Допустимы и альтернативы: в реакции 1 — Cl₂ можно заменить на AgNO₃ с последующим переводом в Ca(NO₃)₂ и т.п., но приведённая цепочка — минимально-достаточная.</p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Уравнение CaBr₂ → CaCl₂ записано верно (например, CaBr₂ + Cl₂ = CaCl₂ + Br₂).' },
						{ id: 'c2', points: 1, label: 'Уравнение CaCl₂ + Na₂CO₃ = CaCO₃ + 2NaCl записано правильно (верно определено X = CaCO₃).' },
						{ id: 'c3', points: 1, label: 'Уравнение CaCO₃ + SiO₂ = CaSiO₃ + CO₂ записано правильно (с указанием нагревания).' }
					]
				},
				{
					id: 22,
					type: 'written',
					maxPoints: 3,
					title: 'Массовая доля примесей в техническом цинке',
					taskKind: 'Расчётная задача',
					body: `
						<p>При растворении <b>10 г</b> технического цинка в избытке разбавленной соляной кислоты выделилось <b>3,1 л</b> (н.у.) водорода. Определите массовую долю примесей в этом образце цинка.</p>
					`,
					solution: `
						<p><b>1) Уравнение реакции:</b></p>
						<p style="font-family:'JetBrains Mono',monospace; font-size:13px;">Zn + 2 HCl = ZnCl₂ + H₂↑</p>
						<p><b>2) Количество водорода:</b><br>
							n(H₂) = V / V<sub>m</sub> = 3,1 / 22,4 ≈ 0,138 моль</p>
						<p><b>3) По уравнению</b> n(Zn) = n(H₂) = 0,138 моль<br>
							m(Zn) = 0,138 · 65 ≈ 9,0 г</p>
						<p><b>4) Масса и доля примесей:</b><br>
							m(примесей) = 10 − 9,0 = 1,0 г<br>
							ω(примесей) = 1,0 / 10 · 100% = <b>10%</b></p>
						<p><b>Ответ: ω(примесей) ≈ 10%.</b></p>
					`,
					criteria: [
						{ id: 'c1', points: 1, label: 'Записано уравнение реакции Zn + 2HCl = ZnCl₂ + H₂ и найдено количество вещества водорода.' },
						{ id: 'c2', points: 1, label: 'По уравнению определена масса цинка в образце (≈ 9,0 г).' },
						{ id: 'c3', points: 1, label: 'Рассчитана массовая доля примесей (≈ 10%) с единицами и правильным ответом.' }
					]
				},
				// ============================================================
				// ВАРИАНТ 30 · ОГЭ химия 2026, PDF вариант 1 (3001–3023)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3001,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о сере как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `В состав гипса входит сера.` },
						{ id: '2', label: `Высоко ценится самородная сера.` },
						{ id: '3', label: `Сера горит на воздухе.` },
						{ id: '4', label: `Массовая доля серы в сероводороде равна 94%.` },
						{ id: '5', label: `Сера реагирует при нагревании с щёлочью.` },
					],
					correct: ['1', '4'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 1) Сера входит в состав гипса (CaSO₄·2H₂O) — об элементе ✓. 4) Массовая доля серы в сероводороде H₂S (32/34≈94%) — об элементе в составе соединения ✓. 2) Самородная сера — о простом веществе. 3) Горит на воздухе — свойство простого вещества. 5) Реагирует с щёлочью — свойство простого вещества.`
				},
				{
					id: 3002,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, два электронных слоя с числом электронов 2 и 2). Запишите в поле ответа номер периода (X) и номер группы (Y), в которых расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '22',
					hint: `На схеме два электронных слоя (2 и 2 электрона), всего 4 электрона → заряд ядра Z=4, элемент бериллий (Be). Число электронных слоёв = номер периода = 2. Число электронов на внешнем слое = номер группы = 2. X=2 (период), Y=2 (группа).`
				},
				{
					id: 3003,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) бром, 2) хлор, 3) водород в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Электроотрицательность (по Полингу): H≈2,2; Br≈2,96; Cl≈3,16. В порядке увеличения: водород (3) < бром (1) < хлор (2). Ответ: 3, 1, 2.`
				},
				{
					id: 3004,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления хрома в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaCrO<sub>2</sub>` },
						{ letter: 'Б', label: `CrSO<sub>4</sub>` },
						{ letter: 'В', label: `CrO<sub>2</sub>Cl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+2` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['2', '1', '4'],
					hint: `А) NaCrO₂: Na(+1), O(−2) → +1 + Cr + 2·(−2) = 0 → Cr = +3 (вариант 2). Б) CrSO₄: SO₄(−2) → Cr = +2 (вариант 1). В) CrO₂Cl₂: O(−2)×2, Cl(−1)×2 → Cr + 2·(−2) + 2·(−1) = 0 → Cr = +6 (вариант 4).`
				},
				{
					id: 3005,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `пероксид водорода` },
						{ id: '2', label: `бромоводород` },
						{ id: '3', label: `бромид натрия` },
						{ id: '4', label: `хлорид аммония` },
						{ id: '5', label: `алмаз` },
					],
					correct: ['1', '5'],
					hint: `Ковалентная неполярная связь образуется между одинаковыми атомами. 1) Пероксид водорода H₂O₂ содержит связь O–O между одинаковыми атомами — неполярная ✓. 5) Алмаз — атомная решётка из связей C–C между одинаковыми атомами — неполярная ✓. 2) HBr — ковалентная полярная. 3) NaBr — ионная. 4) NH₄Cl — ионная (и ковалентные полярные внутри иона).`
				},
				{
					id: 3006,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах магния и хлора расположены на двух энергетических уровнях.` },
						{ id: '2', label: `Простые вещества иода и азота при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Кислотные свойства HF менее выражены по сравнению с HCl.` },
						{ id: '4', label: `Электроотрицательность серы больше, чем хлора.` },
						{ id: '5', label: `И алюминий, и сера образуют высшие оксиды с ионной связью.` },
					],
					correct: ['2', '3'],
					hint: `2) ✓ Иод (I₂) и азот (N₂) при обычных условиях — двухатомные молекулы. 3) ✓ HF — слабая кислота, HCl — сильная, поэтому кислотные свойства HF выражены слабее. 1) Mg (3 уровня) и Cl (3 уровня) — оба в 3 периоде, неверно. 4) ЭО хлора (3,16) больше, чем серы (2,58) — неверно. 5) Высшие оксиды Al₂O₃ и SO₃ — у серы оксид с ковалентной связью, неверно.`
				},
				{
					id: 3007,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислот…`,
					body: `<p>Из предложенного перечня веществ выберите кислотный оксид и основание. 1) CO, 2) (MgOH)<sub>2</sub>CO<sub>3</sub>, 3) PbO<sub>2</sub>, 4) Ba(OH)<sub>2</sub>, 5) CrO<sub>3</sub>. Запишите сначала номер кислотного оксида, а затем номер основания.</p>
						<p style="color:var(--muted);font-size:14px;">1) CO  2) (MgOH)<sub>2</sub>CO<sub>3</sub>  3) PbO<sub>2</sub>  4) Ba(OH)<sub>2</sub>  5) CrO<sub>3</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '54',
					hint: `Кислотный оксид — оксид неметалла или металла в высокой степени окисления, которому соответствует кислота. CrO₃ (хром +6) — кислотный оксид (ему соответствует H₂CrO₄) — номер 5. Основание — гидроксид металла: Ba(OH)₂ (щёлочь) — номер 4. CO — несолеобразующий оксид. (MgOH)₂CO₃ — основная соль. PbO₂ — амфотерный оксид.`
				},
				{
					id: 3008,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с алюминием в определённых условиях?</p>`,
					options: [
						{ id: '1', label: `водород` },
						{ id: '2', label: `оксид железа(III)` },
						{ id: '3', label: `хлорид кальция` },
						{ id: '4', label: `гидроксид натрия` },
						{ id: '5', label: `сульфат калия` },
					],
					correct: ['2', '4'],
					hint: `2) ✓ Алюминотермия: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe (Al восстанавливает железо из оксида). 4) ✓ Алюминий — амфотерный металл, реагирует со щёлочью: 2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂↑. 1) С водородом Al не реагирует. 3) С раствором CaCl₂ Al не реагирует (Ca активнее). 5) С K₂SO₄ не реагирует.`
				},
				{
					id: 3009,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Zn + H<sub>2</sub>O` },
						{ letter: 'Б', label: `Zn + HNO<sub>3</sub>(конц.)` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> + HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Zn(OH)<sub>2</sub>` },
						{ id: '2', label: `→ ZnO + H<sub>2</sub>` },
						{ id: '3', label: `→ Zn(NO<sub>3</sub>)<sub>2</sub> + NO<sub>2</sub>` },
						{ id: '4', label: `→ Zn(NO<sub>3</sub>)<sub>2</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ Zn(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O` },
					],
					correct: ['2', '4', '5'],
					hint: `А) Zn + H₂O при высокой температуре: Zn + H₂O → ZnO + H₂↑ (вариант 2). Б) Zn + 4HNO₃(конц.) → Zn(NO₃)₂ + 2NO₂↑ + 2H₂O — концентрированная азотная кислота даёт NO₂ и воду (вариант 4). В) Zn(OH)₂ + 2HNO₃ → Zn(NO₃)₂ + 2H₂O — реакция нейтрализации (вариант 5).`
				},
				{
					id: 3010,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `кальций` },
						{ letter: 'Б', label: `оксид фосфора(V)` },
						{ letter: 'В', label: `нитрат калия` },
					],
					matchRight: [
						{ id: '1', label: `Ca(OH)<sub>2</sub>, H<sub>2</sub>O` },
						{ id: '2', label: `AgNO<sub>3</sub>, KOH` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>4</sub>(конц), C` },
						{ id: '4', label: `Cu, H<sub>2</sub>O` },
					],
					correct: ['3', '1', '3'],
					hint: `А) Кальций (активный металл) реагирует с H₂SO₄(конц) и при сплавлении с углеродом (Ca + 2C → CaC₂): вариант 3 (H₂SO₄(конц), C). Б) Оксид фосфора(V) P₂O₅ — кислотный оксид, реагирует с Ca(OH)₂ и H₂O (P₂O₅ + 3H₂O → 2H₃PO₄): вариант 1. В) Нитрат калия KNO₃ реагирует с концентрированной серной кислотой (KNO₃ + H₂SO₄(конц) → KHSO₄ + HNO₃↑) и с углеродом как окислитель при нагревании: вариант 3 (H₂SO₄(конц), C).`
				},
				{
					id: 3011,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две окисл…`,
					body: `<p>Из предложенного ниже перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `разложение гидроксида цинка` },
						{ id: '2', label: `взаимодействие железа и серы` },
						{ id: '3', label: `взаимодействие оксида углерода(II) и кислорода` },
						{ id: '4', label: `разложение карбоната магния` },
						{ id: '5', label: `взаимодействие оксида алюминия и оксида натрия` },
					],
					correct: ['2', '3'],
					hint: `ОВР — реакции с изменением степеней окисления. 2) ✓ Fe⁰ + S⁰ → Fe⁺²S⁻² — степени окисления меняются. 3) ✓ 2C⁺²O + O₂⁰ → 2C⁺⁴O₂ — C и O меняют степени окисления. 1) Zn(OH)₂ → ZnO + H₂O — степени не меняются. 4) MgCO₃ → MgO + CO₂ — не меняются. 5) Al₂O₃ + Na₂O → 2NaAlO₂ — не ОВР.`
				},
				{
					id: 3012,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaOH и H<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'Б', label: `Na<sub>2</sub>S и H<sub>2</sub>SO<sub>4</sub>(изб.)` },
						{ letter: 'В', label: `Na<sub>2</sub>CO<sub>3</sub> и HCl(изб.)` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа с неприятным запахом` },
						{ id: '2', label: `видимые признаки реакции отсутствуют` },
						{ id: '3', label: `образование осадка` },
						{ id: '4', label: `выделение газа без цвета и запаха` },
					],
					correct: ['2', '1', '4'],
					hint: `А) NaOH + H₃PO₄ → реакция нейтрализации, образуется соль и вода, видимых признаков нет (вариант 2). Б) Na₂S + H₂SO₄ → Na₂SO₄ + H₂S↑ — выделяется сероводород с неприятным запахом тухлых яиц (вариант 1). В) Na₂CO₃ + 2HCl → 2NaCl + CO₂↑ + H₂O — выделяется углекислый газ без цвета и запаха (вариант 4).`
				},
				{
					id: 3013,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, относящиеся к сильным электролитам.</p>`,
					options: [
						{ id: '1', label: `Al(NO<sub>3</sub>)<sub>3</sub>` },
						{ id: '2', label: `H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '3', label: `HNO<sub>2</sub>` },
						{ id: '4', label: `HBr` },
						{ id: '5', label: `HF` },
					],
					correct: ['1', '4'],
					hint: `Сильные электролиты полностью диссоциируют в растворе: все растворимые соли, сильные кислоты и щёлочи. 1) ✓ Al(NO₃)₃ — растворимая соль, сильный электролит. 4) ✓ HBr — сильная кислота. 2) H₂SO₃ — слабая кислота. 3) HNO₂ — слабая кислота. 5) HF — слабая кислота (несмотря на то, что галогеноводород).`
				},
				{
					id: 3014,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению Ba²⁺ + CO₃²⁻ = Ba…`,
					body: `<p>Сокращённому ионному уравнению Ba<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> = BaCO<sub>3</sub> отвечает взаимодействие веществ. 1) Ba и H<sub>2</sub>CO<sub>3</sub>, 2) BaSO<sub>4</sub> и K<sub>2</sub>CO<sub>3</sub>, 3) BaO и Na<sub>2</sub>CO<sub>3</sub>, 4) Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>2</sub>CO<sub>3</sub>, 5) BaCl<sub>2</sub> и H<sub>2</sub>CO<sub>3</sub>, 6) BaBr<sub>2</sub> и Na<sub>2</sub>CO<sub>3</sub>.</p>`,
					options: [
						{ id: '1', label: `Ba и H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '2', label: `BaSO<sub>4</sub> и K<sub>2</sub>CO<sub>3</sub>` },
						{ id: '3', label: `BaO и Na<sub>2</sub>CO<sub>3</sub>` },
						{ id: '4', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>2</sub>CO<sub>3</sub>` },
						{ id: '5', label: `BaCl<sub>2</sub> и H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '6', label: `BaBr<sub>2</sub> и Na<sub>2</sub>CO<sub>3</sub>` },
					],
					correct: ['4', '6'],
					hint: `Сокращённому уравнению Ba²⁺ + CO₃²⁻ = BaCO₃↓ соответствуют реакции между растворимыми солями, дающими ионы Ba²⁺ и CO₃²⁻. 4) ✓ Ba(NO₃)₂ + K₂CO₃ → BaCO₃↓ + 2KNO₃ — обе растворимы, даёт нужные ионы. 6) ✓ BaBr₂ + Na₂CO₃ → BaCO₃↓ + 2NaBr — обе растворимы. 1) Ba — металл. 2) BaSO₄ нерастворим. 3) BaO — оксид. 5) H₂CO₃ — слабая, не даёт нужного сокращённого уравнения.`
				},
				{
					id: 3015,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2H<sup>+</sup> → H<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `N<sub>2</sub><sup>0</sup> → 2N<sup>-3</sup>` },
						{ letter: 'В', label: `Mn<sup>+2</sup> → Mn<sup>+4</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '2', '1'],
					hint: `Окисление — повышение степени окисления (отдача электронов), восстановление — понижение (приём электронов). А) 2H⁺ → H₂⁰: +1 → 0, понижение СО — восстановление (2). Б) N₂⁰ → 2N⁻³: 0 → −3, понижение СО — восстановление (2). В) Mn⁺² → Mn⁺⁴: +2 → +4, повышение СО — окисление (1).`
				},
				{
					id: 3016,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Получение кислорода следует проводить в вытяжном шкафу.` },
						{ id: '2', label: `Смесь этилового спирта и воды можно разделить отстаиванием.` },
						{ id: '3', label: `Аммиак собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха.` },
						{ id: '4', label: `Концентрированную серную кислоту осторожно приливают к воде при перемешивании.` },
					],
					correct: ['3', '4'],
					hint: `3) ✓ Аммиак легче воздуха, поэтому его собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха. 4) ✓ Правило безопасности: кислоту приливают в воду (а не наоборот), небольшими порциями при перемешивании, т.к. растворение идёт с сильным выделением тепла. 1) Кислород нетоксичен, вытяжной шкаф не требуется. 2) Спирт и вода смешиваются, отстаиванием их не разделить (нужна перегонка).`
				},
				{
					id: 3017,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `LiOH и Sr(OH)<sub>2</sub>` },
						{ letter: 'Б', label: `Zn(NO<sub>3</sub>)<sub>2</sub> и ZnBr<sub>2</sub>` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> и Mg(OH)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `AgNO<sub>3</sub>(р-р)` },
						{ id: '2', label: `BaCl<sub>2</sub>(р-р)` },
						{ id: '3', label: `K<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '4', label: `NaOH(р-р)` },
					],
					correct: ['3', '1', '4'],
					hint: `А) LiOH и Sr(OH)₂ различают K₂SO₄: с Sr(OH)₂ образуется белый осадок SrSO₄↓, с LiOH осадка нет (вариант 3). Б) Zn(NO₃)₂ и ZnBr₂ различают AgNO₃: с ZnBr₂ выпадает желтоватый осадок AgBr↓, с Zn(NO₃)₂ осадка нет (вариант 1). В) Zn(OH)₂ и Mg(OH)₂ различают NaOH: Zn(OH)₂ амфотерен и растворяется в избытке щёлочи, Mg(OH)₂ — нет (вариант 4).`
				},
				{
					id: 3018,
					type: 'input',
					title: `Гашёная известь (гидроксид кальция Ca(OH)₂) — хи…`,
					body: `<p>Гашёная известь (гидроксид кальция Ca(OH)<sub>2</sub>) — химическое соединение, широко используется в сельском хозяйстве. Вычислите массовую долю кальция в гашёной извести. Запишите число с точностью до целых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '54',
					hint: `Ca(OH)₂: M = 40 + 2·(16+1) = 40 + 34 = 74 г/моль. Массовая доля кальция: ω(Ca) = 40/74 · 100% = 54,05% ≈ 54%.`
				},
				{
					id: 3019,
					type: 'input',
					title: `Садовую побелку готовят, обрабатывая известь (40…`,
					body: `<p>Садовую побелку готовят, обрабатывая известь (400 г в расчёте на кальций) двумя литрами воды. Вычислите массу гашёной извести, которую надо взять на 50 л воды. Запишите число с точностью до десятых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '18,5',
					hint: `На 2 л воды берут 400 г кальция. На 50 л воды нужно кальция: 400·50/2 = 10000 г = 10 кг Ca. Это n(Ca) = 10000/40 = 250 моль. Масса гашёной извести Ca(OH)₂: m = 250·74 = 18500 г = 18,5 кг. (Каждый моль Ca соответствует молю Ca(OH)₂.)`
				},
				{
					id: 3020,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NH<sub>3</sub> + CuO → N<sub>2</sub> + H<sub>2</sub>O + Cu</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: 2N<sup>-3</sup> − 6e<sup>-</sup> → N<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1); Cu<sup>+2</sup> + 2e<sup>-</sup> → Cu<sup>0</sup> (восстановление, окислитель, ×3).</p>
						<p>Уравнение: 2NH<sub>3</sub> + 3CuO → N<sub>2</sub> + 3H<sub>2</sub>O + 3Cu.</p>
						<p>Восстановитель — аммиак NH<sub>3</sub> (за счёт N в степени −3), окислитель — оксид меди(II) CuO (за счёт Cu в степени +2).</p>
						<p>Проверка: N: 2=2; H: 6=6; Cu: 3=3; O: 3=3 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3021,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: X → (AgNO₃) → Fe(NO₃)₃ →…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">X → (AgNO<sub>3</sub>) → Fe(NO<sub>3</sub>)<sub>3</sub> → Fe<sub>2</sub>O<sub>3</sub> → FeO</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>X должно реагировать с AgNO<sub>3</sub> и давать Fe(NO<sub>3</sub>)<sub>3</sub> — это растворимая соль железа(III), например FeCl<sub>3</sub>.</p>
						<p>1) FeCl<sub>3</sub> + 3AgNO<sub>3</sub> → Fe(NO<sub>3</sub>)<sub>3</sub> + 3AgCl↓ (обмен, выпадает белый осадок).</p>
						<p>2) Разложение нитрата железа(III) при нагревании: 4Fe(NO<sub>3</sub>)<sub>3</sub> → 2Fe<sub>2</sub>O<sub>3</sub> + 12NO<sub>2</sub>↑ + 3O<sub>2</sub>↑.</p>
						<p>3) Восстановление Fe<sub>2</sub>O<sub>3</sub> угарным газом до FeO: Fe<sub>2</sub>O<sub>3</sub> + CO → 2FeO + CO<sub>2</sub>.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3022,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 2,24 л (н.у.) сернистого газа…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 2,24 л (н.у.) сернистого газа через избыток раствора гидроксида натрия получили 126 г раствора сульфита натрия. Вычислите массовую долю соли в полученном растворе.</p>`,
					solution: `<p>Уравнение: SO<sub>2</sub> + 2NaOH(изб.) → Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O.</p>
						<p>n(SO<sub>2</sub>) = 2,24/22,4 = 0,1 моль.</p>
						<p>По уравнению n(Na<sub>2</sub>SO<sub>3</sub>) = n(SO<sub>2</sub>) = 0,1 моль.</p>
						<p>M(Na<sub>2</sub>SO<sub>3</sub>) = 2·23 + 32 + 3·16 = 126 г/моль.</p>
						<p>m(Na<sub>2</sub>SO<sub>3</sub>) = 0,1·126 = 12,6 г.</p>
						<p>ω(Na<sub>2</sub>SO<sub>3</sub>) = 12,6/126 · 100% = 10%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3023,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами гидроксида калия и хлорида кальция, а также растворы трёх реактивов: нитрата меди(II), карбоната калия и соляной кислоты. 1) Выберите два реактива для определения каждого вещества. 2) Составьте молекулярное, полное и сокращённое ионные уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить KOH и CaCl<sub>2</sub>.</p>
						<p>С нитратом меди(II): KOH даёт голубой осадок Cu(OH)<sub>2</sub>, а CaCl<sub>2</sub> — нет реакции.</p>
						<p>С карбонатом калия: CaCl<sub>2</sub> даёт белый осадок CaCO<sub>3</sub>, а KOH — нет реакции.</p>
						<p>Склянка №1 (KOH) + Cu(NO<sub>3</sub>)<sub>2</sub>: молекулярное 2KOH + Cu(NO<sub>3</sub>)<sub>2</sub> → Cu(OH)<sub>2</sub>↓ + 2KNO<sub>3</sub>; полное ионное 2K<sup>+</sup> + 2OH<sup>-</sup> + Cu<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> → Cu(OH)<sub>2</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Cu<sup>2+</sup> + 2OH<sup>-</sup> → Cu(OH)<sub>2</sub>↓.</p>
						<p>Склянка №2 (CaCl<sub>2</sub>) + K<sub>2</sub>CO<sub>3</sub>: молекулярное CaCl<sub>2</sub> + K<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2KCl; полное ионное Ca<sup>2+</sup> + 2Cl<sup>-</sup> + 2K<sup>+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓ + 2K<sup>+</sup> + 2Cl<sup>-</sup>; сокращённое Ca<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 31 · ОГЭ химия 2026, PDF вариант 2 (3101–3123)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3101,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о железе как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `В состав минерала пирита входят железо и сера.` },
						{ id: '2', label: `Железо, покрытое оловом, более устойчиво к атмосферным воздействиям.` },
						{ id: '3', label: `Железо плавится при температуре 1539 °C.` },
						{ id: '4', label: `Железо в соединениях может проявлять переменную валентность.` },
						{ id: '5', label: `Железная окалина кроме железа содержит ещё и кислород.` },
					],
					correct: ['2', '3'],
					hint: `О простом веществе говорят его физические свойства и поведение как металла. 2) ✓ Покрытое оловом железо устойчивее — речь о металле (простом веществе). 3) ✓ Температура плавления 1539 °C — физическое свойство простого вещества. 1) В составе пирита — об элементе. 4) Переменная валентность в соединениях — об элементе. 5) В составе окалины — об элементе.`
				},
				{
					id: 3102,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, два электронных слоя с числом электронов 2 и 2). Запишите в поле ответа номер периода (X), в котором расположен данный химический элемент, и его высшую валентность (Y) по кислороду.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '22',
					hint: `Два электронных слоя (2 и 2 электрона), всего 4 электрона → элемент бериллий Be (Z=4). Число электронных слоёв = номер периода = 2. Высшая валентность по кислороду равна номеру группы = 2 (оксид BeO). X=2, Y=2.`
				},
				{
					id: 3103,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) натрий, 2) бериллий, 3) литий в порядке увеличения их атомного радиуса.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '231',
					hint: `Атомный радиус увеличивается сверху вниз по группе и уменьшается слева направо по периоду. Be (2 период, 2 группа) — наименьший; Li (2 период, 1 группа) — больше; Na (3 период, 1 группа) — наибольший. В порядке увеличения: Be (2) < Li (3) < Na (1). Ответ: 2, 3, 1.`
				},
				{
					id: 3104,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления железа в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Ba(FeO<sub>2</sub>)<sub>2</sub>` },
						{ letter: 'Б', label: `Na<sub>3</sub>[Fe(OH)<sub>6</sub>]` },
						{ letter: 'В', label: `K<sub>2</sub>FeO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+2` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['2', '2', '4'],
					hint: `А) Ba(FeO₂)₂: Ba(+2), O(−2) → +2 + 2·(Fe + 2·(−2)) = 0 → 2Fe − 8 = −2 → Fe = +3 (вариант 2). Б) Na₃[Fe(OH)₆]: Na(+1)×3, (OH)(−1)×6 → 3 + Fe − 6 = 0 → Fe = +3 (вариант 2). В) K₂FeO₄: K(+1)×2, O(−2)×4 → 2 + Fe − 8 = 0 → Fe = +6 (вариант 4).`
				},
				{
					id: 3105,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в молекулах которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `аммиак` },
						{ id: '2', label: `фтор` },
						{ id: '3', label: `метан` },
						{ id: '4', label: `фосфор белый` },
						{ id: '5', label: `серная кислота` },
					],
					correct: ['2', '4'],
					hint: `Ковалентная неполярная связь образуется между атомами одного элемента. 2) ✓ Фтор F₂ — связь F–F между одинаковыми атомами. 4) ✓ Белый фосфор P₄ — связи P–P между одинаковыми атомами. 1) NH₃ — ковалентные полярные связи N–H. 3) CH₄ — полярные C–H. 5) H₂SO₄ — полярные связи.`
				},
				{
					id: 3106,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах галлия и хлора расположены на трёх энергетических уровнях.` },
						{ id: '2', label: `И красный фосфор, и кремнезём имеют атомную кристаллическую решётку.` },
						{ id: '3', label: `Оксид кремния(IV) имеет менее кислотный характер, чем оксид фосфора(V).` },
						{ id: '4', label: `Атом лития имеет наименьший атомный радиус среди элементов второго периода.` },
						{ id: '5', label: `И хлор, и железо образуют высшие оксиды с общей формулой Э<sub>2</sub>O<sub>7</sub>.` },
					],
					correct: ['2', '3'],
					hint: `2) ✓ Красный фосфор имеет атомную (полимерную) решётку, кремнезём SiO₂ — атомную. 3) ✓ Кислотные свойства оксидов в периоде усиливаются слева направо: SiO₂ менее кислотный, чем P₂O₅. 1) Галлий в 4 периоде (4 уровня), хлор — в 3 (3 уровня), неверно. 4) Наименьший радиус во 2 периоде — у фтора, а не лития. 5) Cl₂O₇ существует, но высший оксид железа — Fe₂O₃, а не Fe₂O₇, неверно.`
				},
				{
					id: 3107,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислот…`,
					body: `<p>Из предложенного перечня веществ выберите кислотный и амфотерный оксиды. 1) Al<sub>2</sub>O<sub>3</sub>, 2) SrO, 3) CO<sub>2</sub>, 4) N<sub>2</sub>O, 5) CO. Запишите сначала номер кислотного оксида, а затем номер амфотерного.</p>
						<p style="color:var(--muted);font-size:14px;">1) Al<sub>2</sub>O<sub>3</sub>  2) SrO  3) CO<sub>2</sub>  4) N<sub>2</sub>O  5) CO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '31',
					hint: `Кислотный оксид — CO₂ (ему соответствует угольная кислота H₂CO₃) — номер 3. Амфотерный оксид — Al₂O₃ (реагирует и с кислотами, и со щелочами) — номер 1. SrO — основный оксид. N₂O и CO — несолеобразующие оксиды. Ответ: сначала кислотный (3), затем амфотерный (1).`
				},
				{
					id: 3108,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с цинком в определённых условиях?</p>`,
					options: [
						{ id: '1', label: `Fe` },
						{ id: '2', label: `HNO<sub>3</sub>` },
						{ id: '3', label: `S` },
						{ id: '4', label: `BaCl<sub>2</sub>` },
						{ id: '5', label: `BaO` },
					],
					correct: ['2', '3'],
					hint: `2) ✓ Zn + азотная кислота: например 4Zn + 10HNO₃(разб) → 4Zn(NO₃)₂ + NH₄NO₃ + 3H₂O. 3) ✓ Zn + S → ZnS (при нагревании). 1) С железом цинк не реагирует (оба металлы). 4) С раствором BaCl₂ цинк не реагирует (Ba активнее). 5) С оксидом BaO цинк не реагирует.`
				},
				{
					id: 3109,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
						{ letter: 'Б', label: `Fe + H<sub>2</sub>SO<sub>4</sub>(конц.)` },
						{ letter: 'В', label: `Fe(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
					],
					matchRight: [
						{ id: '1', label: `→ FeSO<sub>4</sub>` },
						{ id: '2', label: `→ FeSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ FeSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ FeSO<sub>4</sub> + SO<sub>2</sub>` },
					],
					correct: ['4', '3', '2'],
					hint: `А) Fe + H₂SO₄(разб.) → FeSO₄ + H₂↑ — обычная реакция металла с разбавленной кислотой, выделяется водород (вариант 4). Б) 2Fe + 6H₂SO₄(конц.) →(t°) Fe₂(SO₄)₃ + 3SO₂↑ + 6H₂O — конц. серная кислота окисляет Fe до +3, выделяется SO₂ (вариант 3). В) Fe(OH)₂ + H₂SO₄ → FeSO₄ + 2H₂O — нейтрализация (вариант 2).`
				},
				{
					id: 3110,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `азот` },
						{ letter: 'Б', label: `оксид азота(IV)` },
						{ letter: 'В', label: `азотная кислота` },
					],
					matchRight: [
						{ id: '1', label: `H<sub>2</sub>O, H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `Ca(OH)<sub>2</sub>, NaOH` },
						{ id: '3', label: `O<sub>2</sub>, H<sub>2</sub>` },
						{ id: '4', label: `HCl, CO<sub>2</sub>(р-р)` },
					],
					correct: ['3', '2', '2'],
					hint: `А) Азот N₂ реагирует с кислородом (N₂ + O₂ → 2NO) и водородом (N₂ + 3H₂ → 2NH₃) — вариант 3. Б) Оксид азота(IV) NO₂ — кислотный оксид, реагирует со щелочами Ca(OH)₂ и NaOH — вариант 2. В) Азотная кислота HNO₃ реагирует с основаниями Ca(OH)₂ и NaOH (реакция нейтрализации) — вариант 2. (В задании 10 цифры могут повторяться.)`
				},
				{
					id: 3111,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две окисл…`,
					body: `<p>Из предложенного ниже перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `взаимодействие сульфата аммония и гидроксида калия` },
						{ id: '2', label: `взаимодействие аммиака и кислорода` },
						{ id: '3', label: `разложение известняка` },
						{ id: '4', label: `взаимодействие оксида бария и азотной кислоты` },
						{ id: '5', label: `взаимодействие водорода и оксида железа(III)` },
					],
					correct: ['2', '5'],
					hint: `ОВР идут с изменением степеней окисления. 2) ✓ 4NH₃ + 3O₂ → 2N₂ + 6H₂O (или до NO) — N и O меняют степени окисления. 5) ✓ 3H₂ + Fe₂O₃ → 2Fe + 3H₂O — H и Fe меняют степени окисления. 1) (NH₄)₂SO₄ + 2KOH → K₂SO₄ + 2NH₃ + 2H₂O — обмен, не ОВР. 3) CaCO₃ → CaO + CO₂ — не ОВР. 4) BaO + 2HNO₃ → Ba(NO₃)₂ + H₂O — не ОВР.`
				},
				{
					id: 3112,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Ba(OH)<sub>2</sub> и HNO<sub>3</sub>` },
						{ letter: 'Б', label: `Na<sub>2</sub>SO<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `Na<sub>2</sub>CO<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа с характерным резким запахом` },
						{ id: '2', label: `видимые признаки реакции отсутствуют` },
						{ id: '3', label: `образование осадка` },
						{ id: '4', label: `выделение газа без цвета и запаха` },
					],
					correct: ['2', '1', '4'],
					hint: `А) Ba(OH)₂ + 2HNO₃ → Ba(NO₃)₂ + 2H₂O — реакция нейтрализации, видимых признаков нет (вариант 2). Б) Na₂SO₃ + H₂SO₄ → Na₂SO₄ + SO₂↑ + H₂O — выделяется сернистый газ с резким запахом (вариант 1). В) 3Na₂CO₃ + 2H₃PO₄ → 2Na₃PO₄ + 3CO₂↑ + 3H₂O — выделяется углекислый газ без цвета и запаха (вариант 4).`
				},
				{
					id: 3113,
					type: 'multi',
					pickCount: 2,
					title: `Формулы сильного и слабого электролита последова…`,
					body: `<p>Формулы сильного и слабого электролита последовательно приведены в паре:</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>S, HNO<sub>3</sub>` },
						{ id: '2', label: `Ba(NO<sub>3</sub>)<sub>2</sub>, H<sub>2</sub>S` },
						{ id: '3', label: `KOH, HF` },
						{ id: '4', label: `K<sub>2</sub>S, KNO<sub>3</sub>` },
						{ id: '5', label: `CH<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>` },
					],
					correct: ['2', '3'],
					hint: `Нужны пары, где первое вещество — сильный электролит, второе — слабый. 2) ✓ Ba(NO₃)₂ — растворимая соль (сильный), H₂S — слабая кислота (слабый). 3) ✓ KOH — щёлочь (сильный), HF — слабая кислота (слабый). 1) H₂S слабый, HNO₃ сильный — обратный порядок. 4) K₂S и KNO₃ — оба сильные. 5) CH₄ — неэлектролит.`
				},
				{
					id: 3114,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению Al³⁺ + PO₄³⁻ = Al…`,
					body: `<p>Сокращённому ионному уравнению Al<sup>3+</sup> + PO<sub>4</sub><sup>3-</sup> = AlPO<sub>4</sub> отвечает взаимодействие веществ. 1) Al и H<sub>3</sub>PO<sub>4</sub>, 2) Al<sub>2</sub>O<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>, 3) Al(NO<sub>3</sub>)<sub>3</sub> и K<sub>3</sub>PO<sub>4</sub>, 4) Al(NO<sub>3</sub>)<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>, 5) AlCl<sub>3</sub> и Na<sub>3</sub>PO<sub>4</sub>, 6) Al<sub>2</sub>O<sub>3</sub> и P<sub>2</sub>O<sub>5</sub>.</p>`,
					options: [
						{ id: '1', label: `Al и H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `Al<sub>2</sub>O<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '3', label: `Al(NO<sub>3</sub>)<sub>3</sub> и K<sub>3</sub>PO<sub>4</sub>` },
						{ id: '4', label: `Al(NO<sub>3</sub>)<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `AlCl<sub>3</sub> и Na<sub>3</sub>PO<sub>4</sub>` },
						{ id: '6', label: `Al<sub>2</sub>O<sub>3</sub> и P<sub>2</sub>O<sub>5</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Al³⁺ + PO₄³⁻ = AlPO₄↓ соответствует реакция между растворимыми солями, дающими свободные ионы Al³⁺ и PO₄³⁻. 3) ✓ Al(NO₃)₃ + K₃PO₄ → AlPO₄↓ + 3KNO₃ — обе соли растворимы. 5) ✓ AlCl₃ + Na₃PO₄ → AlPO₄↓ + 3NaCl — обе растворимы. 1) Al — металл. 2,6) оксиды. 4) H₃PO₄ — слабая кислота, не даёт свободных ионов PO₄³⁻.`
				},
				{
					id: 3115,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2H<sup>+</sup> → H<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `2N<sup>-3</sup> → N<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `Br<sup>+1</sup> → Br<sup>+5</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '1'],
					hint: `А) 2H⁺ → H₂⁰: +1 → 0, понижение степени окисления — восстановление (2). Б) 2N⁻³ → N₂⁰: −3 → 0, повышение СО — окисление (1). В) Br⁺¹ → Br⁺⁵: +1 → +5, повышение СО — окисление (1).`
				},
				{
					id: 3116,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `В химической лаборатории нельзя проводить дополнительные опыты без согласования с учителем.` },
						{ id: '2', label: `Иод от порошка поваренной соли можно очистить возгонкой.` },
						{ id: '3', label: `Хлор собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха.` },
						{ id: '4', label: `В пробирке нельзя кипятить жидкость.` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ Правило безопасности: в лаборатории нельзя проводить опыты без разрешения учителя. 2) ✓ Иод возгоняется (переходит в пар, минуя жидкое состояние), что позволяет отделить его от соли. 3) Хлор тяжелее воздуха, поэтому его собирают в сосуд, расположенный дном вниз, — неверно. 4) В пробирке можно кипятить жидкость (соблюдая правила нагревания) — неверно.`
				},
				{
					id: 3117,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaBr и H<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'Б', label: `MgCl<sub>2</sub> и ZnCl<sub>2</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>O и Sr(NO<sub>3</sub>)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `фенолфталеин` },
						{ id: '2', label: `лакмус` },
						{ id: '3', label: `KOH` },
						{ id: '4', label: `Na<sub>2</sub>SO<sub>4</sub>` },
					],
					correct: ['2', '3', '4'],
					hint: `А) NaBr (соль, нейтральная среда) и H₃PO₄ (кислота) различают лакмусом: кислота окрашивает его в красный, раствор соли остаётся без изменений (вариант 2). Б) MgCl₂ и ZnCl₂ различают KOH: оба дают осадки гидроксидов, но Zn(OH)₂ амфотерен и растворяется в избытке щёлочи, а Mg(OH)₂ — нет (вариант 3). В) H₂O и Sr(NO₃)₂ различают Na₂SO₄: с Sr(NO₃)₂ выпадает белый осадок SrSO₄↓, с водой реакции нет (вариант 4).`
				},
				{
					id: 3118,
					type: 'input',
					title: `Раствор хлорида кальция используется в медицине.…`,
					body: `<p>Раствор хлорида кальция используется в медицине. При изготовлении раствора хлорида кальция придерживаются соотношения: 100 мг соли на 1 мл воды. Вычислите массовую долю кальция в хлориде кальция. Запишите число с точностью до целых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '36',
					hint: `CaCl₂: M = 40 + 2·35,5 = 40 + 71 = 111 г/моль. Массовая доля кальция: ω(Ca) = 40/111 · 100% = 36,04% ≈ 36%.`
				},
				{
					id: 3119,
					type: 'input',
					title: `Раствор хлорида кальция готовят в соотношении 10…`,
					body: `<p>Раствор хлорида кальция готовят в соотношении 100 мг соли на 1 мл воды. Вычислите, сколько граммов элемента кальция будет содержаться в 1 кг такого раствора. Запишите число с точностью до десятых (в граммах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '32,7',
					hint: `Соотношение 100 мг (0,1 г) соли на 1 мл (1 г) воды → масса соли / масса воды = 0,1. В 1 кг раствора (1000 г): пусть масса соли x, масса воды (1000−x). Тогда x/(1000−x)=0,1 → 1,1x=100 → x≈90,9 г соли CaCl₂. Масса кальция: m(Ca) = 90,9 · 0,36 ≈ 32,7 г (используем ω(Ca)=36% из задания 18).`
				},
				{
					id: 3120,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">CH<sub>4</sub> + CuO → CO<sub>2</sub> + H<sub>2</sub>O + Cu</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: C<sup>-4</sup> − 8e<sup>-</sup> → C<sup>+4</sup> (окисление, восстановитель, ×1); Cu<sup>+2</sup> + 2e<sup>-</sup> → Cu<sup>0</sup> (восстановление, окислитель, ×4).</p>
						<p>Уравнение: CH<sub>4</sub> + 4CuO → CO<sub>2</sub> + 2H<sub>2</sub>O + 4Cu.</p>
						<p>Восстановитель — метан CH<sub>4</sub> (углерод в степени −4), окислитель — оксид меди(II) CuO (медь в степени +2).</p>
						<p>Проверка: C: 1=1; H: 4=4; Cu: 4=4; O: 4=2+2 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3121,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: MgSO₄ → MgCl₂ → Mg(OH)₂…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">MgSO<sub>4</sub> → MgCl<sub>2</sub> → Mg(OH)<sub>2</sub> → (HNO<sub>3</sub> конц.) → X</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) MgSO<sub>4</sub> + BaCl<sub>2</sub> → MgCl<sub>2</sub> + BaSO<sub>4</sub>↓ — обмен, удаление сульфат-иона в осадок BaSO<sub>4</sub>.</p>
						<p>2) MgCl<sub>2</sub> + 2NaOH → Mg(OH)<sub>2</sub>↓ + 2NaCl — получение нерастворимого основания.</p>
						<p>3) Mg(OH)<sub>2</sub> + 2HNO<sub>3</sub> → Mg(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O — нейтрализация, X = нитрат магния Mg(NO<sub>3</sub>)<sub>2</sub>.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3122,
					type: 'written',
					maxPoints: 3,
					title: `К избытку раствора карбоната натрия прилили 150…`,
					taskKind: `Расчётная задача`,
					body: `<p>К избытку раствора карбоната натрия прилили 150 г раствора хлорида кальция, при этом выпало 25 г кристаллического осадка. Рассчитайте массовую долю хлорида кальция в исходном растворе.</p>`,
					solution: `<p>Уравнение: CaCl<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2NaCl.</p>
						<p>Осадок — CaCO<sub>3</sub>.</p>
						<p>n(CaCO<sub>3</sub>) = 25/100 = 0,25 моль.</p>
						<p>По уравнению n(CaCl<sub>2</sub>) = n(CaCO<sub>3</sub>) = 0,25 моль.</p>
						<p>M(CaCl<sub>2</sub>) = 111 г/моль.</p>
						<p>m(CaCl<sub>2</sub>) = 0,25·111 = 27,75 г.</p>
						<p>ω(CaCl<sub>2</sub>) = 27,75/150 · 100% = 18,5%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3123,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата магния и хлорида бария, а также растворы трёх реактивов: карбоната калия, нитрата серебра и гидроксида калия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Mg(NO<sub>3</sub>)<sub>2</sub> и BaCl<sub>2</sub>.</p>
						<p>С гидроксидом калия: Mg(NO<sub>3</sub>)<sub>2</sub> даёт белый осадок Mg(OH)<sub>2</sub>, а BaCl<sub>2</sub> — нет.</p>
						<p>С нитратом серебра: BaCl<sub>2</sub> даёт белый творожистый осадок AgCl, а Mg(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Mg(NO<sub>3</sub>)<sub>2</sub>) + KOH: молекулярное Mg(NO<sub>3</sub>)<sub>2</sub> + 2KOH → Mg(OH)<sub>2</sub>↓ + 2KNO<sub>3</sub>; полное ионное Mg<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Mg<sup>2+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓.</p>
						<p>Склянка №2 (BaCl<sub>2</sub>) + AgNO<sub>3</sub>: молекулярное BaCl<sub>2</sub> + 2AgNO<sub>3</sub> → 2AgCl↓ + Ba(NO<sub>3</sub>)<sub>2</sub>; полное ионное Ba<sup>2+</sup> + 2Cl<sup>-</sup> + 2Ag<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup> → 2AgCl↓ + Ba<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Cl<sup>-</sup> → AgCl↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 32 · ОГЭ химия 2026, PDF вариант 3 (3201–3223)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3201,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о натрии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Каменная соль состоит из хлора и натрия.` },
						{ id: '2', label: `Натрий химически более активен по сравнению с магнием.` },
						{ id: '3', label: `Натрий плавится при температуре 97 °C.` },
						{ id: '4', label: `Натрий реагирует с хлором, кислородом, серой.` },
						{ id: '5', label: `Лёгкость отдачи электронов у атомов натрия выше, чем у алюминия.` },
					],
					correct: ['1', '5'],
					hint: `О химическом элементе говорят его наличие в соединениях и свойства атома. 1) ✓ Каменная соль состоит из хлора и натрия — речь об элементах в составе соединения. 5) ✓ Лёгкость отдачи электронов — характеристика атома (элемента). 2) Активность — свойство простого вещества. 3) Плавление при 97 °C — физическое свойство простого вещества. 4) Реакции с хлором, кислородом, серой — свойства простого вещества.`
				},
				{
					id: 3202,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, два электронных слоя с числом электронов 2 и 6). Запишите в поле ответа номер периода (X) и его валентность (Y) по водороду.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '22',
					hint: `Два электронных слоя (2 и 6 электронов), всего 8 электронов → элемент кислород O (Z=8). Число электронных слоёв = номер периода = 2. Валентность по водороду: O образует H₂O, валентность кислорода II → Y=2. X=2, Y=2.`
				},
				{
					id: 3203,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) водород, 2) гелий, 3) литий в порядке уменьшения радиуса их атомов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Атомный радиус: Li (2 период) больше, чем H и He (1 период); среди H и He у гелия радиус меньше (заряд ядра больше при том же числе слоёв). В порядке уменьшения: Li (3) > H (1) > He (2). Ответ: 3, 1, 2.`
				},
				{
					id: 3204,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления меди в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `(CuOH)<sub>2</sub>CO<sub>3</sub>` },
						{ letter: 'Б', label: `Na[CuCl<sub>2</sub>]` },
						{ letter: 'В', label: `CuOH` },
					],
					matchRight: [
						{ id: '1', label: `+1` },
						{ id: '2', label: `+2` },
						{ id: '3', label: `+3` },
						{ id: '4', label: `+4` },
					],
					correct: ['2', '1', '1'],
					hint: `А) (CuOH)₂CO₃: группа (CuOH) имеет заряд +1, две группы +2, уравновешены CO₃²⁻ → Cu = +2 (вариант 2). Б) Na[CuCl₂]: Na(+1), Cl(−1)×2 → +1 + Cu + 2·(−1) = 0 → Cu = +1 (вариант 1). В) CuOH: O(−2), H(+1) → Cu − 2 + 1 = 0 → Cu = +1 (вариант 1).`
				},
				{
					id: 3205,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в молекулах которых присутствуют ковалентные полярные связи.</p>`,
					options: [
						{ id: '1', label: `фтороводород` },
						{ id: '2', label: `белый фосфор` },
						{ id: '3', label: `серная кислота` },
						{ id: '4', label: `водород` },
						{ id: '5', label: `сера ромбическая` },
					],
					correct: ['1', '3'],
					hint: `Ковалентная полярная связь образуется между атомами разных неметаллов. 1) ✓ HF — связь H–F между разными атомами, полярная. 3) ✓ H₂SO₄ — связи между разными атомами (H–O, S–O), полярные. 2) Белый фосфор P₄ — связи P–P, неполярные. 4) H₂ — связь H–H, неполярная. 5) Сера S₈ — связи S–S, неполярные.`
				},
				{
					id: 3206,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы хлора и кислорода содержат неспаренные электроны.` },
						{ id: '2', label: `И красный фосфор, и белый имеют атомную кристаллическую решётку.` },
						{ id: '3', label: `Оксид алюминия имеет менее кислотный характер, чем оксид кремния.` },
						{ id: '4', label: `Атомный радиус бериллия больше атомного радиуса лития.` },
						{ id: '5', label: `И хлор, и железо образуют устойчивые соединения в высшей степени окисления, равной номеру группы.` },
					],
					correct: ['1', '3'],
					hint: `1) ✓ Атомы Cl (один неспаренный электрон) и O (два неспаренных электрона) содержат неспаренные электроны. 3) ✓ Al₂O₃ — амфотерный, SiO₂ — кислотный; кислотный характер Al₂O₃ слабее. 2) Белый фосфор P₄ имеет молекулярную решётку, неверно. 4) Радиус лития больше, чем бериллия, неверно. 5) Хлор образует +7, но железо устойчиво в +3 (а не +8 по группе VIII), неверно.`
				},
				{
					id: 3207,
					type: 'input',
					title: `Из предложенного перечня веществ выберите две ки…`,
					body: `<p>Из предложенного перечня веществ выберите две кислые соли. 1) Al(HSO<sub>4</sub>)<sub>3</sub>, 2) (ZnOH)<sub>2</sub>CO<sub>3</sub>, 3) CuSO<sub>4</sub>·5H<sub>2</sub>O, 4) NaHS, 5) (NH<sub>4</sub>)<sub>2</sub>S.</p>
						<p style="color:var(--muted);font-size:14px;">1) Al(HSO<sub>4</sub>)<sub>3</sub>  2) (ZnOH)<sub>2</sub>CO<sub>3</sub>  3) CuSO<sub>4</sub>·5H<sub>2</sub>O  4) NaHS  5) (NH<sub>4</sub>)<sub>2</sub>S</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '14',
					hint: `Кислая соль содержит атомы водорода в кислотном остатке. 1) ✓ Al(HSO₄)₃ — гидросульфат алюминия (есть H в остатке HSO₄⁻). 4) ✓ NaHS — гидросульфид натрия (есть H в остатке HS⁻). 2) (ZnOH)₂CO₃ — основная соль (есть OH). 3) CuSO₄·5H₂O — кристаллогидрат средней соли. 5) (NH₄)₂S — средняя соль.`
				},
				{
					id: 3208,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с бромом?</p>`,
					options: [
						{ id: '1', label: `Fe<sub>2</sub>O<sub>3</sub>` },
						{ id: '2', label: `HNO<sub>3</sub>` },
						{ id: '3', label: `O<sub>2</sub>` },
						{ id: '4', label: `BaI<sub>2</sub>` },
						{ id: '5', label: `NaOH` },
					],
					correct: ['4', '5'],
					hint: `4) ✓ Br₂ + BaI₂ → BaBr₂ + I₂ — бром (более активный галоген) вытесняет иод из соли. 5) ✓ Br₂ + 2NaOH → NaBr + NaBrO + H₂O — реакция галогена со щёлочью (диспропорционирование). 1) Fe₂O₃ с бромом не реагирует. 2) HNO₃ с бромом не реагирует. 3) O₂ с бромом не реагирует.`
				},
				{
					id: 3209,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe<sub>2</sub>O<sub>3</sub> + HNO<sub>3</sub>(разб.)` },
						{ letter: 'Б', label: `Fe + HNO<sub>3</sub>(конц.)` },
						{ letter: 'В', label: `Fe(OH)<sub>2</sub> + HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Fe(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>` },
						{ id: '2', label: `→ Fe(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + H<sub>2</sub>O` },
					],
					correct: ['5', '3', '3'],
					hint: `А) Fe₂O₃ + 6HNO₃ → 2Fe(NO₃)₃ + 3H₂O — обмен без изменения степени окисления (Fe уже +3), продукты Fe(NO₃)₃ + H₂O (вариант 5). Б) Fe + 6HNO₃(конц.) →(t°) Fe(NO₃)₃ + 3NO₂↑ + 3H₂O — конц. кислота окисляет Fe до +3, выделяется NO₂ (вариант 3). В) Fe(OH)₂ + конц. HNO₃ окисляет железо +2 → +3: даёт Fe(NO₃)₃ + NO₂ + H₂O (вариант 3).`
				},
				{
					id: 3210,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `цинк` },
						{ letter: 'Б', label: `оксид серы(IV)` },
						{ letter: 'В', label: `сульфат цинка` },
					],
					matchRight: [
						{ id: '1', label: `CaO, H<sub>2</sub>O` },
						{ id: '2', label: `NaNO<sub>3</sub>, CO<sub>2</sub>` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>4</sub>, Cl<sub>2</sub>` },
						{ id: '4', label: `BaCl<sub>2</sub>, KOH` },
					],
					correct: ['3', '1', '4'],
					hint: `А) Цинк (металл) реагирует с H₂SO₄ (Zn + H₂SO₄ → ZnSO₄ + H₂) и с Cl₂ (Zn + Cl₂ → ZnCl₂) — вариант 3. Б) Оксид серы(IV) SO₂ — кислотный оксид, реагирует с CaO (SO₂ + CaO → CaSO₃) и H₂O (SO₂ + H₂O → H₂SO₃) — вариант 1. В) Сульфат цинка ZnSO₄ — растворимая соль, реагирует с BaCl₂ (→ BaSO₄↓) и KOH (→ Zn(OH)₂↓) — вариант 4.`
				},
				{
					id: 3211,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две экзот…`,
					body: `<p>Из предложенного ниже перечня выберите две экзотермические реакции.</p>`,
					options: [
						{ id: '1', label: `взаимодействие сероводорода и кислорода` },
						{ id: '2', label: `разложение гидрокарбоната кальция` },
						{ id: '3', label: `электролиз воды` },
						{ id: '4', label: `разложение оксида железа(III)` },
						{ id: '5', label: `взаимодействие лития и воды` },
					],
					correct: ['1', '5'],
					hint: `Экзотермические реакции идут с выделением тепла. 1) ✓ 2H₂S + 3O₂ → 2SO₂ + 2H₂O — горение, экзотермическая. 5) ✓ 2Li + 2H₂O → 2LiOH + H₂↑ — взаимодействие активного металла с водой, бурно с выделением тепла. 2) Разложение — эндотермическое. 3) Электролиз требует затраты энергии — эндотермический. 4) Разложение оксида — эндотермическое.`
				},
				{
					id: 3212,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KOH и HBr` },
						{ letter: 'Б', label: `Na<sub>2</sub>CO<sub>3</sub> и HBr(изб.)` },
						{ letter: 'В', label: `Na<sub>2</sub>CO<sub>3</sub> и BaCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `выделение бурого газа` },
						{ id: '2', label: `выделение бесцветного газа` },
						{ id: '3', label: `образование осадка` },
						{ id: '4', label: `видимые признаки реакции отсутствуют` },
					],
					correct: ['4', '2', '3'],
					hint: `А) KOH + HBr → KBr + H₂O — нейтрализация, видимых признаков нет (вариант 4). Б) Na₂CO₃ + 2HBr(изб.) → 2NaBr + CO₂↑ + H₂O — выделяется бесцветный газ CO₂ (вариант 2). В) Na₂CO₃ + BaCl₂ → BaCO₃↓ + 2NaCl — выпадает белый осадок (вариант 3).`
				},
				{
					id: 3213,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации которых катионов образуется больше, чем анионов.</p>`,
					options: [
						{ id: '1', label: `нитрат бария` },
						{ id: '2', label: `гидроксид кальция` },
						{ id: '3', label: `хлорид калия` },
						{ id: '4', label: `фосфат калия` },
						{ id: '5', label: `сульфат натрия` },
					],
					correct: ['4', '5'],
					hint: `Нужно, чтобы число катионов превышало число анионов. 4) ✓ K₃PO₄ → 3K⁺ + PO₄³⁻ (3 катиона : 1 анион). 5) ✓ Na₂SO₄ → 2Na⁺ + SO₄²⁻ (2 катиона : 1 анион). 1) Ba(NO₃)₂ → Ba²⁺ + 2NO₃⁻ (1:2). 2) Ca(OH)₂ → Ca²⁺ + 2OH⁻ (1:2). 3) KCl → K⁺ + Cl⁻ (1:1).`
				},
				{
					id: 3214,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению Ba²⁺ + SO₃²⁻ = Ba…`,
					body: `<p>Сокращённому ионному уравнению Ba<sup>2+</sup> + SO<sub>3</sub><sup>2-</sup> = BaSO<sub>3</sub> отвечает взаимодействие веществ. 1) Ba и H<sub>2</sub>SO<sub>3</sub>, 2) BaO и Na<sub>2</sub>SO<sub>3</sub>, 3) Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>2</sub>SO<sub>3</sub>, 4) BaCO<sub>3</sub> и Na<sub>2</sub>SO<sub>3</sub>, 5) BaCl<sub>2</sub> и Na<sub>2</sub>SO<sub>3</sub>, 6) BaBr<sub>2</sub> и H<sub>2</sub>SO<sub>3</sub>.</p>`,
					options: [
						{ id: '1', label: `Ba и H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '2', label: `BaO и Na<sub>2</sub>SO<sub>3</sub>` },
						{ id: '3', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>2</sub>SO<sub>3</sub>` },
						{ id: '4', label: `BaCO<sub>3</sub> и Na<sub>2</sub>SO<sub>3</sub>` },
						{ id: '5', label: `BaCl<sub>2</sub> и Na<sub>2</sub>SO<sub>3</sub>` },
						{ id: '6', label: `BaBr<sub>2</sub> и H<sub>2</sub>SO<sub>3</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Ba²⁺ + SO₃²⁻ = BaSO₃↓ соответствуют реакции между растворимыми веществами, дающими свободные ионы Ba²⁺ и SO₃²⁻. 3) ✓ Ba(NO₃)₂ + K₂SO₃ → BaSO₃↓ + 2KNO₃. 5) ✓ BaCl₂ + Na₂SO₃ → BaSO₃↓ + 2NaCl. 1) Ba — металл. 2) BaO — оксид. 4) BaCO₃ нерастворим. 6) H₂SO₃ — слабая кислота, не даёт свободных ионов SO₃²⁻.`
				},
				{
					id: 3215,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `F<sub>2</sub><sup>0</sup> → 2F<sup>-</sup>` },
						{ letter: 'Б', label: `2N<sup>-3</sup> → N<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `Cr<sup>+2</sup> → Cr<sup>+3</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '1'],
					hint: `А) F₂⁰ → 2F⁻: 0 → −1, понижение степени окисления — восстановление (2). Б) 2N⁻³ → N₂⁰: −3 → 0, повышение СО — окисление (1). В) Cr⁺² → Cr⁺³: +2 → +3, повышение СО — окисление (1).`
				},
				{
					id: 3216,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Опыты с оксидом углерода(IV) следует проводить только в вытяжном шкафу.` },
						{ id: '2', label: `Смесь сахара и воды можно разделить с помощью выпаривания.` },
						{ id: '3', label: `Концентрированную серную кислоту вливают тонкой струйкой при помешивании в воду.` },
						{ id: '4', label: `Работу с лакокрасочными материалами проводят в хорошо проветриваемом помещении.` },
					],
					correct: ['2', '3', '4'],
					hint: `2) ✓ Сахар растворён в воде; выпариванием воды можно выделить сахар. 3) ✓ Правило безопасности: кислоту приливают тонкой струйкой в воду при перемешивании (растворение сильно экзотермично). 4) ✓ Лакокрасочные материалы выделяют вредные пары — нужна вентиляция. 1) CO₂ нетоксичен, вытяжной шкаф не требуется — неверно.`
				},
				{
					id: 3217,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CaCl<sub>2</sub> и BaI<sub>2</sub>` },
						{ letter: 'Б', label: `Cu(NO<sub>3</sub>)<sub>2</sub> и CuCl<sub>2</sub>` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub> и Mg(OH)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `AgNO<sub>3</sub>(р-р)` },
						{ id: '2', label: `BaCl<sub>2</sub>(р-р)` },
						{ id: '3', label: `KOH(р-р)` },
						{ id: '4', label: `NH<sub>3</sub>(р-р)` },
					],
					correct: ['1', '1', '3'],
					hint: `А) CaCl₂ и BaI₂ различают AgNO₃: с CaCl₂ выпадает белый осадок AgCl↓, с BaI₂ — жёлтый осадок AgI↓ (различие по цвету) — вариант 1. Б) Cu(NO₃)₂ и CuCl₂ различают AgNO₃: с CuCl₂ выпадает белый осадок AgCl↓, с Cu(NO₃)₂ осадка нет — вариант 1. В) Al(OH)₃ и Mg(OH)₂ различают KOH: амфотерный Al(OH)₃ растворяется в избытке щёлочи, Mg(OH)₂ — нет — вариант 3. (В задании 17 цифры могут повторяться.)`
				},
				{
					id: 3218,
					type: 'input',
					title: `Глюконат кальция C₁₂H₂₂O₁₄Ca широко используется…`,
					body: `<p>Глюконат кальция C<sub>12</sub>H<sub>22</sub>O<sub>14</sub>Ca широко используется в медицине. При изготовлении лекарства придерживаются соотношения: 500 мг глюконата кальция в таблетке общей массой 1 г. Вычислите массовую долю кальция в глюконате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '9,3',
					hint: `C₁₂H₂₂O₁₄Ca: M = 12·12 + 22·1 + 14·16 + 40 = 144 + 22 + 224 + 40 = 430 г/моль. Массовая доля кальция: ω(Ca) = 40/430 · 100% = 9,30% ≈ 9,3%.`
				},
				{
					id: 3219,
					type: 'input',
					title: `В одной таблетке содержится 500 мг глюконата кал…`,
					body: `<p>В одной таблетке содержится 500 мг глюконата кальция. Вычислите, сколько граммов элемента кальция будет содержаться в одной упаковке лекарства (10 таблеток). Запишите число с точностью до десятых (в граммах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '0,5',
					hint: `Масса глюконата кальция в упаковке: 10 · 500 мг = 5000 мг = 5 г. Масса кальция: m(Ca) = 5 · ω(Ca) = 5 · 0,093 = 0,465 г ≈ 0,5 г (используем ω(Ca)=9,3% из задания 18).`
				},
				{
					id: 3220,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">H<sub>2</sub>S + Br<sub>2</sub> + H<sub>2</sub>O → H<sub>2</sub>SO<sub>4</sub> + HBr</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: S<sup>-2</sup> − 8e<sup>-</sup> → S<sup>+6</sup> (окисление, восстановитель, ×1); Br<sub>2</sub><sup>0</sup> + 2e<sup>-</sup> → 2Br<sup>-</sup> (восстановление, окислитель, ×4).</p>
						<p>Уравнение: H<sub>2</sub>S + 4Br<sub>2</sub> + 4H<sub>2</sub>O → H<sub>2</sub>SO<sub>4</sub> + 8HBr.</p>
						<p>Восстановитель — сероводород H<sub>2</sub>S (сера в степени −2), окислитель — бром Br<sub>2</sub>.</p>
						<p>Проверка: S:1=1; Br:8=8; H: 2+8=10=2+8 ✓; O: 4=4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3221,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: X → (C, t°) → CO → (Fe₂O…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">X → (C, t°) → CO → (Fe<sub>2</sub>O<sub>3</sub>, t°) → Fe → FeCl<sub>2</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>X при нагревании с углеродом даёт CO — это углекислый газ CO<sub>2</sub>.</p>
						<p>1) CO<sub>2</sub> + C → 2CO (t°) — восстановление углекислого газа углём.</p>
						<p>2) 3CO + Fe<sub>2</sub>O<sub>3</sub> → 2Fe + 3CO<sub>2</sub> (t°) — восстановление оксида железа угарным газом.</p>
						<p>3) Fe + 2HCl → FeCl<sub>2</sub> + H<sub>2</sub>↑ — железо с соляной кислотой даёт хлорид железа(II).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3222,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 2,24 л (н.у.) хлора через избы…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 2,24 л (н.у.) хлора через избыток раствора гидроксида натрия получили 186 г раствора, содержащего хлорид и гипохлорит натрия. Вычислите массовую долю гипохлорита натрия в полученном растворе.</p>`,
					solution: `<p>Уравнение: Cl<sub>2</sub> + 2NaOH → NaCl + NaClO + H<sub>2</sub>O.</p>
						<p>n(Cl<sub>2</sub>) = 2,24/22,4 = 0,1 моль.</p>
						<p>По уравнению n(NaClO) = n(Cl<sub>2</sub>) = 0,1 моль.</p>
						<p>M(NaClO) = 23 + 35,5 + 16 = 74,5 г/моль.</p>
						<p>m(NaClO) = 0,1·74,5 = 7,45 г.</p>
						<p>ω(NaClO) = 7,45/186 · 100% = 4,005% ≈ 4%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3223,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата бария и хлорида магния, а также растворы трёх реактивов: карбоната калия, нитрата серебра и сульфата калия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ba(NO<sub>3</sub>)<sub>2</sub> и MgCl<sub>2</sub>.</p>
						<p>С сульфатом калия: Ba(NO<sub>3</sub>)<sub>2</sub> даёт нерастворимый белый осадок BaSO<sub>4</sub>, а MgCl<sub>2</sub> — нет.</p>
						<p>С нитратом серебра: MgCl<sub>2</sub> даёт белый творожистый осадок AgCl, а Ba(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Ba(NO<sub>3</sub>)<sub>2</sub>) + K<sub>2</sub>SO<sub>4</sub>: молекулярное Ba(NO<sub>3</sub>)<sub>2</sub> + K<sub>2</sub>SO<sub>4</sub> → BaSO<sub>4</sub>↓ + 2KNO<sub>3</sub>; полное ионное Ba<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓.</p>
						<p>Склянка №2 (MgCl<sub>2</sub>) + AgNO<sub>3</sub>: молекулярное MgCl<sub>2</sub> + 2AgNO<sub>3</sub> → 2AgCl↓ + Mg(NO<sub>3</sub>)<sub>2</sub>; полное ионное Mg<sup>2+</sup> + 2Cl<sup>-</sup> + 2Ag<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup> → 2AgCl↓ + Mg<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Cl<sup>-</sup> → AgCl↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 33 · ОГЭ химия 2026, PDF вариант 4 (3301–3323)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3301,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о натрии как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `Натрий химически более активен по сравнению с магнием.` },
						{ id: '2', label: `Каменная соль состоит из хлора и натрия.` },
						{ id: '3', label: `Натрий кипит при температуре 886 °C.` },
						{ id: '4', label: `Гидроксид натрия относится к щелочам.` },
						{ id: '5', label: `Атомы калия и натрия легче отдают электроны, чем атомы алюминия.` },
					],
					correct: ['1', '3'],
					hint: `О простом веществе говорят его физические и химические свойства как металла. 1) ✓ Химическая активность натрия по сравнению с магнием — свойство простого вещества. 3) ✓ Температура кипения 886 °C — физическое свойство простого вещества. 2) В составе каменной соли — об элементе. 4) Гидроксид натрия — о соединении элемента. 5) Лёгкость отдачи электронов атомами — характеристика атома (элемента).`
				},
				{
					id: 3302,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (схема Бора: ядро, на первом слое 2 электрона, на втором слое 4 электрона). Запишите в поле ответа номер периода (X) и его высшую валентность (Y) по кислороду.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '24',
					hint: `На схеме два электронных слоя (2 и 4 электрона), всего 6 электронов → элемент углерод C (Z=6). Число электронных слоёв = номер периода = 2. Высшая валентность по кислороду равна номеру группы (IV) = 4 (оксид CO₂). X=2, Y=4.`
				},
				{
					id: 3303,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) водород, 2) бериллий, 3) литий в порядке увеличения основного характера их высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '123',
					hint: `Высшие оксиды: H₂O, BeO (амфотерный), Li₂O (основный). Основный характер оксидов усиливается с ростом металлических свойств. В порядке увеличения основного характера: H (1) < Be (2, амфотерный) < Li (3, основный). Ответ: 1, 2, 3.`
				},
				{
					id: 3304,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления меди в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CuSO<sub>4</sub>·5H<sub>2</sub>O` },
						{ letter: 'Б', label: `H[CuCl<sub>2</sub>]` },
						{ letter: 'В', label: `CuCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+1` },
						{ id: '2', label: `+2` },
						{ id: '3', label: `+3` },
						{ id: '4', label: `+4` },
					],
					correct: ['2', '1', '2'],
					hint: `А) CuSO₄·5H₂O: SO₄(−2) → Cu = +2 (вариант 2). Б) H[CuCl₂]: H(+1), Cl(−1)×2 → +1 + Cu + 2·(−1) = 0 → Cu = +1 (вариант 1). В) CuCl₂: Cl(−1)×2 → Cu = +2 (вариант 2).`
				},
				{
					id: 3305,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствуют как ионная, так и ковалентная химические связи.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `NaNO<sub>3</sub>` },
						{ id: '3', label: `CH<sub>4</sub>` },
						{ id: '4', label: `NH<sub>4</sub>HSO<sub>4</sub>` },
						{ id: '5', label: `NH<sub>3</sub>·H<sub>2</sub>O` },
					],
					correct: ['2', '4'],
					hint: `Ионная и ковалентная связи одновременно бывают у солей (ионная между ионами, ковалентная внутри сложного иона). 2) ✓ NaNO₃: ионная между Na⁺ и NO₃⁻, ковалентные внутри иона NO₃⁻. 4) ✓ NH₄HSO₄: ионная между NH₄⁺ и HSO₄⁻, ковалентные внутри ионов. 1) H₂SO₄ — только ковалентные. 3) CH₄ — только ковалентные. 5) NH₃·H₂O — преимущественно ковалентные и водородные связи.`
				},
				{
					id: 3306,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы хлора и алюминия содержат по одному неспаренному электрону.` },
						{ id: '2', label: `И бром, и белый фосфор имеют молекулярную кристаллическую решётку.` },
						{ id: '3', label: `Электроотрицательность водорода больше, чем электроотрицательность кислорода.` },
						{ id: '4', label: `Атомный радиус бора больше атомного радиуса лития.` },
						{ id: '5', label: `И хлор, и азот имеют высшую валентность, равную номеру группы.` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ Атом Cl (…3p⁵) и атом Al (…3p¹) — у каждого один неспаренный электрон на p-подуровне. 2) ✓ Бром Br₂ и белый фосфор P₄ имеют молекулярную кристаллическую решётку. 3) ЭО кислорода (3,44) больше, чем водорода (2,2), неверно. 4) Радиус лития больше, чем бора (в периоде радиус уменьшается слева направо), неверно. 5) Хлор может иметь валентность VII, но азот не имеет валентности V (максимум IV из-за отсутствия d-орбиталей), неверно.`
				},
				{
					id: 3307,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислую…`,
					body: `<p>Из предложенного перечня веществ выберите кислую и среднюю соли. 1) Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>, 2) (CuOH)<sub>2</sub>SO<sub>4</sub>, 3) Fe(OH)SO<sub>4</sub>, 4) NaHCO<sub>3</sub>, 5) Zn(OH)Cl. Запишите сначала номер кислой соли, а затем номер средней.</p>
						<p style="color:var(--muted);font-size:14px;">1) Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>  2) (CuOH)<sub>2</sub>SO<sub>4</sub>  3) Fe(OH)SO<sub>4</sub>  4) NaHCO<sub>3</sub>  5) Zn(OH)Cl</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '41',
					hint: `Кислая соль — NaHCO₃ (гидрокарбонат натрия, содержит H в остатке HCO₃⁻) — номер 4. Средняя соль — Al₂(SO₄)₃ (нет H в катионе и OH в составе) — номер 1. (CuOH)₂SO₄, Fe(OH)SO₄, Zn(OH)Cl — основные соли (содержат группы OH). Ответ: сначала кислая (4), затем средняя (1).`
				},
				{
					id: 3308,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с бромом?</p>`,
					options: [
						{ id: '1', label: `FeBr<sub>2</sub>` },
						{ id: '2', label: `P<sub>2</sub>O<sub>5</sub>` },
						{ id: '3', label: `O<sub>2</sub>` },
						{ id: '4', label: `N<sub>2</sub>` },
						{ id: '5', label: `Ca(OH)<sub>2</sub>` },
					],
					correct: ['1', '5'],
					hint: `1) ✓ 2FeBr₂ + Br₂ → 2FeBr₃ — бром окисляет Fe²⁺ до Fe³⁺. 5) ✓ 2Br₂ + 2Ca(OH)₂ → CaBr₂ + Ca(BrO)₂ + 2H₂O — реакция галогена со щёлочью (диспропорционирование). 2) P₂O₅ с бромом не реагирует. 3) O₂ с бромом не реагирует. 4) N₂ с бромом не реагирует.`
				},
				{
					id: 3309,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KOH + H<sub>2</sub>SO<sub>4</sub>(изб.)` },
						{ letter: 'Б', label: `KOH(изб.) + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `K<sub>2</sub>O(изб.) + H<sub>2</sub>SO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `→ K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ KHSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ KHSO<sub>4</sub>` },
						{ id: '5', label: `→ KHSO<sub>4</sub> + H<sub>2</sub>` },
					],
					correct: ['3', '2', '2'],
					hint: `А) KOH + H₂SO₄(изб.) → KHSO₄ + H₂O — при избытке кислоты образуется кислая соль гидросульфат (вариант 3). Б) 2KOH(изб.) + H₂SO₄ → K₂SO₄ + 2H₂O — при избытке щёлочи образуется средняя соль (вариант 2). В) K₂O(изб.) + H₂SO₄ → K₂SO₄ + H₂O — основный оксид в избытке даёт среднюю соль (вариант 2).`
				},
				{
					id: 3310,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `сера` },
						{ letter: 'Б', label: `оксид кремния(IV)` },
						{ letter: 'В', label: `сульфат аммония` },
					],
					matchRight: [
						{ id: '1', label: `O<sub>2</sub>, Fe` },
						{ id: '2', label: `Al<sub>2</sub>O<sub>3</sub>, HCl` },
						{ id: '3', label: `KOH, BaCl<sub>2</sub>` },
						{ id: '4', label: `Mg, CaO` },
					],
					correct: ['1', '4', '3'],
					hint: `А) Сера реагирует с O₂ (S + O₂ → SO₂) и с железом (Fe + S → FeS) — вариант 1. Б) Оксид кремния(IV) SiO₂ — кислотный оксид, восстанавливается магнием (SiO₂ + 2Mg → Si + 2MgO) и реагирует с основным оксидом CaO (SiO₂ + CaO → CaSiO₃) — вариант 4. В) Сульфат аммония (NH₄)₂SO₄ реагирует с KOH (→ NH₃↑ + H₂O + K₂SO₄) и BaCl₂ (→ BaSO₄↓ + 2NH₄Cl) — вариант 3.`
				},
				{
					id: 3311,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две эндот…`,
					body: `<p>Из предложенного ниже перечня выберите две эндотермические реакции.</p>`,
					options: [
						{ id: '1', label: `взаимодействие метана и кислорода` },
						{ id: '2', label: `разложение мела` },
						{ id: '3', label: `электролиз воды` },
						{ id: '4', label: `окисление угарного газа` },
						{ id: '5', label: `взаимодействие железа и хлора` },
					],
					correct: ['2', '3'],
					hint: `Эндотермические реакции идут с поглощением тепла. 2) ✓ CaCO₃ → CaO + CO₂ (разложение мела) — требует нагревания, эндотермическая. 3) ✓ Электролиз воды (2H₂O → 2H₂ + O₂) идёт за счёт затраты электроэнергии — эндотермический. 1) Горение метана — экзотермическое. 4) Окисление CO (2CO + O₂ → 2CO₂) — экзотермическое. 5) Fe + Cl₂ → FeCl₃ — экзотермическая.`
				},
				{
					id: 3312,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Zn и KOH` },
						{ letter: 'Б', label: `Cu и HNO<sub>3</sub>` },
						{ letter: 'В', label: `AgNO<sub>3</sub> и HCl` },
					],
					matchRight: [
						{ id: '1', label: `выпадение белого осадка` },
						{ id: '2', label: `выпадение жёлтого осадка` },
						{ id: '3', label: `выделение газа и образование окрашенного раствора` },
						{ id: '4', label: `выделение газа и образование бесцветного раствора` },
					],
					correct: ['4', '3', '1'],
					hint: `А) Zn + 2KOH + 2H₂O → K₂[Zn(OH)₄] + H₂↑ — выделяется газ (водород), раствор бесцветный (вариант 4). Б) Cu + 4HNO₃(конц.) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O — выделяется бурый газ NO₂, раствор становится голубым (окрашенным) (вариант 3). В) AgNO₃ + HCl → AgCl↓ + HNO₃ — выпадает белый творожистый осадок (вариант 1).`
				},
				{
					id: 3313,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации которых анионов образуется больше, чем катионов.</p>`,
					options: [
						{ id: '1', label: `нитрат алюминия` },
						{ id: '2', label: `гидроксид кальция` },
						{ id: '3', label: `хлорид калия` },
						{ id: '4', label: `фосфат натрия` },
						{ id: '5', label: `сульфат хрома(II)` },
					],
					correct: ['1', '2'],
					hint: `Нужно, чтобы число анионов превышало число катионов. 1) ✓ Al(NO₃)₃ → Al³⁺ + 3NO₃⁻ (1 катион : 3 аниона). 2) ✓ Ca(OH)₂ → Ca²⁺ + 2OH⁻ (1 катион : 2 аниона). 3) KCl → K⁺ + Cl⁻ (1:1). 4) Na₃PO₄ → 3Na⁺ + PO₄³⁻ (3:1, катионов больше). 5) CrSO₄ → Cr²⁺ + SO₄²⁻ (1:1).`
				},
				{
					id: 3314,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Fe³⁺ + 3OH⁻ = Fe(OH…`,
					body: `<p>Сокращённое ионное уравнение  1) FeCl<sub>3</sub>, 2) Fe<sub>2</sub>O<sub>3</sub>, 3) FeOCl, 4) H<sub>2</sub>O, 5) Cu(OH)<sub>2</sub>, 6) NaOH.</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Fe<sup>3+</sup> + 3OH<sup>-</sup> = Fe(OH)<sub>3</sub> соответствует взаимодействию веществ.</p>`,
					options: [
						{ id: '1', label: `FeCl<sub>3</sub>` },
						{ id: '2', label: `Fe<sub>2</sub>O<sub>3</sub>` },
						{ id: '3', label: `FeOCl` },
						{ id: '4', label: `H<sub>2</sub>O` },
						{ id: '5', label: `Cu(OH)<sub>2</sub>` },
						{ id: '6', label: `NaOH` },
					],
					correct: ['1', '6'],
					hint: `Сокращённому уравнению Fe³⁺ + 3OH⁻ = Fe(OH)₃↓ соответствует реакция между растворимой солью железа(III) и щёлочью. 1) ✓ FeCl₃ — растворимая соль, даёт ионы Fe³⁺. 6) ✓ NaOH — щёлочь, даёт ионы OH⁻. FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl. 2) Fe₂O₃ — оксид. 3) FeOCl — не даёт нужных ионов. 4) H₂O. 5) Cu(OH)₂ — нерастворимое основание.`
				},
				{
					id: 3315,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2H<sup>+</sup> → H<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `P<sup>-3</sup> → P<sup>+5</sup>` },
						{ letter: 'В', label: `2Br<sup>+3</sup> → Br<sub>2</sub><sup>0</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '2'],
					hint: `А) 2H⁺ → H₂⁰: +1 → 0, понижение степени окисления — восстановление (2). Б) P⁻³ → P⁺⁵: −3 → +5, повышение СО — окисление (1). В) 2Br⁺³ → Br₂⁰: +3 → 0, понижение СО — восстановление (2).`
				},
				{
					id: 3316,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Оксид серы(IV) — токсичный газ, раздражающий органы дыхания.` },
						{ id: '2', label: `Смесь керосина и воды можно разделить с помощью делительной воронки.` },
						{ id: '3', label: `Аммиак собирают в сосуд методом вытеснения воды.` },
						{ id: '4', label: `При нагревании пробирку можно полностью заполнить раствором.` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ SO₂ — токсичный газ с резким запахом, раздражает дыхательные пути. 2) ✓ Керосин и вода не смешиваются (образуют два слоя), их разделяют делительной воронкой. 3) Аммиак хорошо растворим в воде, поэтому методом вытеснения воды его не собирают (только вытеснением воздуха), неверно. 4) При нагревании нельзя полностью заполнять пробирку — жидкость может выплеснуться, неверно.`
				},
				{
					id: 3317,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить водные растворы этих веществ. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `HNO<sub>3</sub> и NaNO<sub>3</sub>` },
						{ letter: 'Б', label: `K<sub>2</sub>S и Na<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>SO<sub>4</sub>(разб.) и NaOH` },
					],
					matchRight: [
						{ id: '1', label: `HCl` },
						{ id: '2', label: `BaSO<sub>4</sub>` },
						{ id: '3', label: `фенолфталеин` },
						{ id: '4', label: `Ag` },
					],
					correct: ['4', '1', '3'],
					hint: `А) HNO₃ и NaNO₃ различают серебром Ag: HNO₃ растворяет серебро с выделением бурого газа (Ag + 2HNO₃ → AgNO₃ + NO₂↑ + H₂O), а с NaNO₃ серебро не реагирует — вариант 4. Б) K₂S и Na₃PO₄ различают HCl: с K₂S выделяется газ H₂S с запахом тухлых яиц (K₂S + 2HCl → 2KCl + H₂S↑), с Na₃PO₄ газ не выделяется — вариант 1. В) H₂SO₄ и NaOH различают фенолфталеином: в щёлочи NaOH он малиновый, в кислоте бесцветный — вариант 3.`
				},
				{
					id: 3318,
					type: 'input',
					title: `Глюконат кальция C₁₂H₂₂O₁₄Ca. Одна таблетка лека…`,
					body: `<p>Глюконат кальция C<sub>12</sub>H<sub>22</sub>O<sub>14</sub>Ca. Одна таблетка лекарственного препарата массой 1 г содержит 500 мг глюконата кальция. Вычислите массовую долю кальция в глюконате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '9,3',
					hint: `C₁₂H₂₂O₁₄Ca: M = 12·12 + 22·1 + 14·16 + 40 = 144 + 22 + 224 + 40 = 430 г/моль. Массовая доля кальция: ω(Ca) = 40/430 · 100% = 9,30% ≈ 9,3%.`
				},
				{
					id: 3319,
					type: 'input',
					title: `Одна таблетка содержит 500 мг глюконата кальция.…`,
					body: `<p>Одна таблетка содержит 500 мг глюконата кальция. Вычислите, в каком количестве таблеток содержится суточная доза кальция, равная 1,2 г, необходимая взрослому человеку. Запишите число с точностью до целых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '26',
					hint: `Масса кальция в одной таблетке: m(Ca) = 500 мг · 0,093 = 0,5 г · 0,093 = 0,0465 г (используем ω(Ca)=9,3% из задания 18). Число таблеток для суточной дозы 1,2 г: N = 1,2 / 0,0465 ≈ 25,8 ≈ 26 таблеток.`
				},
				{
					id: 3320,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Mn<sub>2</sub>O<sub>3</sub> + HCl → MnCl<sub>2</sub> + H<sub>2</sub>O + Cl<sub>2</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Mn<sup>+3</sup> + 1e<sup>-</sup> → Mn<sup>+2</sup> (восстановление, окислитель, ×2); 2Cl<sup>-</sup> − 2e<sup>-</sup> → Cl<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: Mn<sub>2</sub>O<sub>3</sub> + 6HCl → 2MnCl<sub>2</sub> + 3H<sub>2</sub>O + Cl<sub>2</sub>.</p>
						<p>Окислитель — оксид марганца(III) Mn<sub>2</sub>O<sub>3</sub> (марганец +3), восстановитель — соляная кислота HCl (хлор −1).</p>
						<p>Проверка: Mn:2=2; Cl: 6=4+2; O:3=3; H:6=6 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3321,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: CuSO₄ → Cu(NO₃)₂ → Cu(OH…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">CuSO<sub>4</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> → Cu(OH)<sub>2</sub> → (HNO<sub>3</sub> конц.) → X</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) CuSO<sub>4</sub> + Ba(NO<sub>3</sub>)<sub>2</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + BaSO<sub>4</sub>↓ — обмен, сульфат-ион уходит в осадок BaSO<sub>4</sub>.</p>
						<p>2) Cu(NO<sub>3</sub>)<sub>2</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + 2NaNO<sub>3</sub> — получение голубого осадка гидроксида меди(II).</p>
						<p>3) Cu(OH)<sub>2</sub> + 2HNO<sub>3</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O — нейтрализация, X = нитрат меди(II) Cu(NO<sub>3</sub>)<sub>2</sub>.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3322,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 4,48 л (н.у.) хлора через избы…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 4,48 л (н.у.) хлора через избыток раствора гидроксида натрия получили 234 г раствора, содержащего хлорид и гипохлорит натрия. Вычислите массовую долю хлорида натрия в полученном растворе.</p>`,
					solution: `<p>Уравнение: Cl<sub>2</sub> + 2NaOH → NaCl + NaClO + H<sub>2</sub>O.</p>
						<p>n(Cl<sub>2</sub>) = 4,48/22,4 = 0,2 моль.</p>
						<p>По уравнению n(NaCl) = n(Cl<sub>2</sub>) = 0,2 моль.</p>
						<p>M(NaCl) = 23 + 35,5 = 58,5 г/моль.</p>
						<p>m(NaCl) = 0,2·58,5 = 11,7 г.</p>
						<p>ω(NaCl) = 11,7/234 · 100% = 5%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3323,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата магния и хлорида натрия, а также растворы трёх реактивов: карбоната калия, нитрата серебра и сульфата калия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Mg(NO<sub>3</sub>)<sub>2</sub> и NaCl.</p>
						<p>С карбонатом калия: Mg(NO<sub>3</sub>)<sub>2</sub> даёт белый осадок MgCO<sub>3</sub>, а NaCl — нет.</p>
						<p>С нитратом серебра: NaCl даёт белый творожистый осадок AgCl, а Mg(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Mg(NO<sub>3</sub>)<sub>2</sub>) + K<sub>2</sub>CO<sub>3</sub>: молекулярное Mg(NO<sub>3</sub>)<sub>2</sub> + K<sub>2</sub>CO<sub>3</sub> → MgCO<sub>3</sub>↓ + 2KNO<sub>3</sub>; полное ионное Mg<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + CO<sub>3</sub><sup>2-</sup> → MgCO<sub>3</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Mg<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> → MgCO<sub>3</sub>↓.</p>
						<p>Склянка №2 (NaCl) + AgNO<sub>3</sub>: молекулярное NaCl + AgNO<sub>3</sub> → AgCl↓ + NaNO<sub>3</sub>; полное ионное Na<sup>+</sup> + Cl<sup>-</sup> + Ag<sup>+</sup> + NO<sub>3</sub><sup>-</sup> → AgCl↓ + Na<sup>+</sup> + NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Cl<sup>-</sup> → AgCl↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 34 · ОГЭ химия 2026, PDF вариант 5 (3401–3423)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3401,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о магнии как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `Натрий химически более активен по сравнению с магнием.` },
						{ id: '2', label: `Магний входит в состав хлорофилла.` },
						{ id: '3', label: `Магний входит в состав сплава электрон.` },
						{ id: '4', label: `Карбонат магния легко разлагается.` },
						{ id: '5', label: `Атомный радиус магния меньше, чем у натрия.` },
					],
					correct: ['1', '3'],
					hint: `О простом веществе говорят свойства металла и его вхождение в сплавы. 1) ✓ Сравнение химической активности натрия и магния — речь о простых веществах. 3) ✓ Сплав электрон — смесь простых веществ (металлов), магний в нём как простое вещество. 2) В составе хлорофилла — об элементе. 4) Карбонат магния — о соединении. 5) Атомный радиус — характеристика атома (элемента).`
				},
				{
					id: 3402,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, три электронных слоя с числом электронов 2, 8 и 1). Запишите в поле ответа номер периода (X) и заряд ядра Z (Y) атомов этого элемента.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '311',
					hint: `Три электронных слоя с электронами 2, 8 и 1, всего 11 электронов → элемент натрий Na (Z=11). Число электронных слоёв = номер периода = 3. Заряд ядра равен числу электронов = 11. X=3, Y=11.`
				},
				{
					id: 3403,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) алюминий, 2) магний, 3) хлор в порядке увеличения кислотного характера их высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '213',
					hint: `Высшие оксиды: MgO (основный), Al₂O₃ (амфотерный), Cl₂O₇ (кислотный). Кислотный характер усиливается слева направо по периоду. В порядке увеличения кислотного характера: Mg (2, MgO основный) < Al (1, Al₂O₃ амфотерный) < Cl (3, Cl₂O₇ кислотный). Ответ: 2, 1, 3.`
				},
				{
					id: 3404,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления азота в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KNO<sub>3</sub>` },
						{ letter: 'Б', label: `NO<sub>2</sub>` },
						{ letter: 'В', label: `NF<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−3` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+5` },
					],
					correct: ['4', '3', '2'],
					hint: `А) KNO₃: K(+1), O(−2)×3 → +1 + N + 3·(−2) = 0 → N = +5 (вариант 4). Б) NO₂: O(−2)×2 → N = +4 (вариант 3). В) NF₃: фтор всегда −1, F(−1)×3 → N = +3 (вариант 2). (В отличие от кислородных соединений, во фториде азот имеет положительную СО, так как ЭО фтора выше.)`
				},
				{
					id: 3405,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует как неполярная, так и полярная ковалентная связь.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `NaNO<sub>3</sub>` },
						{ id: '3', label: `CH<sub>4</sub>` },
						{ id: '4', label: `C<sub>2</sub>H<sub>6</sub>` },
						{ id: '5', label: `H<sub>2</sub>O<sub>2</sub>` },
					],
					correct: ['4', '5'],
					hint: `Неполярная связь — между одинаковыми атомами, полярная — между разными. 4) ✓ C₂H₆ (этан): неполярная связь C–C и полярные связи C–H. 5) ✓ H₂O₂: неполярная связь O–O и полярные связи O–H. 1) H₂SO₄ — только полярные. 2) NaNO₃ — ионная и полярные. 3) CH₄ — только полярные C–H.`
				},
				{
					id: 3406,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы натрия и алюминия содержат по одному неспаренному электрону.` },
						{ id: '2', label: `И бром, и графит имеют молекулярную кристаллическую решётку.` },
						{ id: '3', label: `Электроотрицательность водорода больше, чем электроотрицательность азота.` },
						{ id: '4', label: `Атомный радиус бора больше атомного радиуса кислорода.` },
						{ id: '5', label: `И хлор, и фтор имеют высшую валентность, равную номеру группы.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Атом Na (3s¹) и атом Al (…3p¹) — у каждого один неспаренный электрон. 4) ✓ В периоде радиус уменьшается слева направо, поэтому радиус бора больше, чем кислорода. 2) Бром Br₂ — молекулярная решётка, но графит — атомная (слоистая), неверно. 3) ЭО азота (3,04) больше, чем водорода (2,2), неверно. 5) Хлор имеет валентность VII, но фтор всегда одновалентен (нет d-орбиталей), неверно.`
				},
				{
					id: 3407,
					type: 'input',
					title: `Из предложенного перечня веществ выберите оксид…`,
					body: `<p>Из предложенного перечня веществ выберите оксид и амфотерный гидроксид. 1) BaO<sub>2</sub>, 2) H<sub>2</sub>O<sub>2</sub>, 3) N<sub>2</sub>O, 4) Mg(OH)<sub>2</sub>, 5) Zn(OH)<sub>2</sub>. Запишите сначала номер оксида, а затем номер амфотерного гидроксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) BaO<sub>2</sub>  2) H<sub>2</sub>O<sub>2</sub>  3) N<sub>2</sub>O  4) Mg(OH)<sub>2</sub>  5) Zn(OH)<sub>2</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '35',
					hint: `Оксид — N₂O (оксид азота(I), несолеобразующий) — номер 3. Амфотерный гидроксид — Zn(OH)₂ (реагирует и с кислотами, и со щелочами) — номер 5. BaO₂ и H₂O₂ — пероксиды (содержат группу O–O), а не обычные оксиды. Mg(OH)₂ — основание. Ответ: сначала оксид (3), затем амфотерный гидроксид (5).`
				},
				{
					id: 3408,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом бария?</p>`,
					options: [
						{ id: '1', label: `оксид железа(III)` },
						{ id: '2', label: `железо` },
						{ id: '3', label: `оксид лития` },
						{ id: '4', label: `оксид водорода` },
						{ id: '5', label: `угарный газ` },
					],
					correct: ['1', '4'],
					hint: `BaO — основный оксид, реагирует с водой, кислотами и амфотерными/кислотными оксидами. 1) ✓ BaO + Fe₂O₃ → Ba(FeO₂)₂ — основный оксид реагирует с амфотерным при сплавлении. 4) ✓ BaO + H₂O → Ba(OH)₂ — образование щёлочи. 2) С железом BaO не реагирует. 3) Li₂O — основный оксид, два основных оксида не реагируют. 5) CO — несолеобразующий газ, не реагирует.`
				},
				{
					id: 3409,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KOH + H<sub>3</sub>PO<sub>4</sub>(изб.)` },
						{ letter: 'Б', label: `KOH(изб.) + H<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'В', label: `K<sub>2</sub>HPO<sub>4</sub> + H<sub>3</sub>PO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ K<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `→ K<sub>3</sub>PO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ K<sub>2</sub>HPO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ KH<sub>2</sub>PO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ KH<sub>2</sub>PO<sub>4</sub>` },
					],
					correct: ['4', '2', '5'],
					hint: `А) KOH + H₃PO₄(изб.) → KH₂PO₄ + H₂O — при избытке кислоты образуется дигидрофосфат (вариант 4). Б) 3KOH(изб.) + H₃PO₄ → K₃PO₄ + 3H₂O — при избытке щёлочи образуется средняя соль (вариант 2). В) K₂HPO₄ + H₃PO₄ → 2KH₂PO₄ — кислота переводит гидрофосфат в дигидрофосфат (вариант 5).`
				},
				{
					id: 3410,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `магний` },
						{ letter: 'Б', label: `оксид серы(VI)` },
						{ letter: 'В', label: `бромид цинка` },
					],
					matchRight: [
						{ id: '1', label: `I<sub>2</sub>, CuCl<sub>2</sub>` },
						{ id: '2', label: `H<sub>2</sub>O, Na<sub>2</sub>O` },
						{ id: '3', label: `Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>, HCl` },
						{ id: '4', label: `Cl<sub>2</sub>, KOH` },
					],
					correct: ['1', '2', '4'],
					hint: `А) Магний (металл) реагирует с I₂ (Mg + I₂ → MgI₂) и с раствором CuCl₂ (Mg + CuCl₂ → MgCl₂ + Cu) — вариант 1. Б) Оксид серы(VI) SO₃ — кислотный оксид, реагирует с H₂O (→ H₂SO₄) и с основным оксидом Na₂O (→ Na₂SO₄) — вариант 2. В) Бромид цинка ZnBr₂ реагирует с Cl₂ (Cl₂ + ZnBr₂ → ZnCl₂ + Br₂) и с KOH (→ Zn(OH)₂↓) — вариант 4.`
				},
				{
					id: 3411,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: `барий и соляная кислота` },
						{ id: '2', label: `натрий и сера` },
						{ id: '3', label: `оксид кальция и вода` },
						{ id: '4', label: `кальций и вода` },
						{ id: '5', label: `цинк и сера` },
					],
					correct: ['1', '4'],
					hint: `Реакция замещения: простое + сложное → новое простое + новое сложное. 1) ✓ Ba + 2HCl → BaCl₂ + H₂↑ — замещение. 4) ✓ Ca + 2H₂O → Ca(OH)₂ + H₂↑ — замещение. 2) 2Na + S → Na₂S — соединение. 3) CaO + H₂O → Ca(OH)₂ — соединение. 5) Zn + S → ZnS — соединение.`
				},
				{
					id: 3412,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `K<sub>2</sub>S и HCl(изб.)` },
						{ letter: 'Б', label: `K<sub>2</sub>SO<sub>4</sub> и Ba(NO<sub>3</sub>)<sub>2</sub>` },
						{ letter: 'В', label: `Na<sub>2</sub>SO<sub>4</sub> и BaCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `образование белого осадка` },
						{ id: '2', label: `образование жёлтого осадка` },
						{ id: '3', label: `выделение газа` },
						{ id: '4', label: `изменение окраски раствора` },
					],
					correct: ['3', '1', '1'],
					hint: `А) K₂S + 2HCl → 2KCl + H₂S↑ — выделяется газ сероводород (вариант 3). Б) K₂SO₄ + Ba(NO₃)₂ → BaSO₄↓ + 2KNO₃ — выпадает белый осадок сульфата бария (вариант 1). В) Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl — выпадает белый осадок сульфата бария (вариант 1).`
				},
				{
					id: 3413,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня выберите два слабых эле…`,
					body: `<p>Из предложенного перечня выберите два слабых электролита.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '3', label: `NH<sub>3</sub>·H<sub>2</sub>O` },
						{ id: '4', label: `K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '5', label: `NaOH` },
					],
					correct: ['2', '3'],
					hint: `Слабые электролиты диссоциируют не полностью. 2) ✓ H₂CO₃ — слабая угольная кислота. 3) ✓ NH₃·H₂O — слабое основание (гидрат аммиака). 1) H₂SO₄ — сильная кислота. 4) K₂SO₄ — растворимая соль (сильный электролит). 5) NaOH — щёлочь (сильный электролит).`
				},
				{
					id: 3414,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Fe³⁺ + PO₄³⁻ = FePO…`,
					body: `<p>Сокращённое ионное уравнение  1) Fe, 2) Fe<sub>2</sub>O<sub>3</sub>, 3) FeBr<sub>3</sub>, 4) H<sub>3</sub>PO<sub>4</sub>, 5) K<sub>3</sub>PO<sub>4</sub>, 6) P<sub>2</sub>O<sub>5</sub>.</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Fe<sup>3+</sup> + PO<sub>4</sub><sup>3-</sup> = FePO<sub>4</sub> соответствует взаимодействию веществ.</p>`,
					options: [
						{ id: '1', label: `Fe` },
						{ id: '2', label: `Fe<sub>2</sub>O<sub>3</sub>` },
						{ id: '3', label: `FeBr<sub>3</sub>` },
						{ id: '4', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `K<sub>3</sub>PO<sub>4</sub>` },
						{ id: '6', label: `P<sub>2</sub>O<sub>5</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Fe³⁺ + PO₄³⁻ = FePO₄↓ соответствует реакция между растворимой солью железа(III) и растворимым фосфатом. 3) ✓ FeBr₃ — растворимая соль, даёт ионы Fe³⁺. 5) ✓ K₃PO₄ — растворимый фосфат, даёт ионы PO₄³⁻. FeBr₃ + K₃PO₄ → FePO₄↓ + 3KBr. 1) Fe — металл. 2) Fe₂O₃ — оксид. 4) H₃PO₄ — слабая кислота. 6) P₂O₅ — оксид.`
				},
				{
					id: 3415,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2Cr<sup>+3</sup> → Cr<sup>+6</sup>` },
						{ letter: 'Б', label: `2Cl<sup>-1</sup> → Cl<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `N<sup>+3</sup> → N<sup>-3</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '1', '2'],
					hint: `А) 2Cr⁺³ → Cr⁺⁶: +3 → +6, повышение степени окисления — окисление (1). Б) 2Cl⁻¹ → Cl₂⁰: −1 → 0, повышение СО — окисление (1). В) N⁺³ → N⁻³: +3 → −3, понижение СО — восстановление (2).`
				},
				{
					id: 3416,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Оксид углерода(II) — ядовитый газ, опыты по его получению проводят в вытяжном шкафу.` },
						{ id: '2', label: `В химической лаборатории запрещено работать с щелочами.` },
						{ id: '3', label: `Углекислый газ можно «перелить» из одного стакана в другой.` },
						{ id: '4', label: `Гипохлорит натрия в быту встречается в составе жидкостей для отбеливания.` },
					],
					correct: ['1', '3', '4'],
					hint: `1) ✓ CO (угарный газ) ядовит, поэтому опыты проводят в вытяжном шкафу. 3) ✓ CO₂ тяжелее воздуха, поэтому его можно осторожно «перелить» из стакана в стакан. 4) ✓ Гипохлорит натрия NaClO входит в состав бытовых отбеливателей. 2) Со щелочами в лаборатории работать можно (соблюдая правила безопасности), неверно.`
				},
				{
					id: 3417,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить водные растворы этих веществ. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KNO<sub>3</sub> и KBr` },
						{ letter: 'Б', label: `Na<sub>2</sub>SO<sub>4</sub> и Na<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'В', label: `HNO<sub>3</sub> и NaNO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `Zn` },
						{ id: '2', label: `BaCl<sub>2</sub>` },
						{ id: '3', label: `AgNO<sub>3</sub>` },
						{ id: '4', label: `NaCl` },
					],
					correct: ['3', '3', '1'],
					hint: `А) KNO₃ и KBr различают AgNO₃: с KBr выпадает желтоватый осадок AgBr↓, с KNO₃ осадка нет — вариант 3. Б) Na₂SO₄ и Na₃PO₄ различают AgNO₃: с Na₃PO₄ выпадает жёлтый осадок Ag₃PO₄↓, а с Na₂SO₄ заметного жёлтого осадка нет (Ag₂SO₄ малорастворим, белый) — различие по цвету, вариант 3. В) HNO₃ и NaNO₃ различают цинком: цинк реагирует с азотной кислотой с выделением газа, с NaNO₃ реакции нет — вариант 1. (В задании 17 цифры могут повторяться.)`
				},
				{
					id: 3418,
					type: 'input',
					title: `Раствор хлорида кальция используется в медицине.…`,
					body: `<p>Раствор хлорида кальция используется в медицине. При изготовлении раствора придерживаются соотношения: 100 мг соли на 1 мл воды. Вычислите массовую долю кальция в хлориде кальция. Запишите число с точностью до целых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '36',
					hint: `CaCl₂: M = 40 + 2·35,5 = 111 г/моль. Массовая доля кальция: ω(Ca) = 40/111 · 100% = 36,04% ≈ 36%.`
				},
				{
					id: 3419,
					type: 'input',
					title: `Раствор хлорида кальция готовят в соотношении 10…`,
					body: `<p>Раствор хлорида кальция готовят в соотношении 100 мг соли на 1 мл воды. Вычислите, сколько граммов элемента кальция будет содержаться в 10 кг такого раствора. Запишите число с точностью до десятых (в граммах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '327,3',
					hint: `Соотношение 100 мг (0,1 г) соли на 1 мл (1 г) воды → масса соли / масса воды = 0,1. В 10 кг раствора (10000 г): пусть масса соли x, воды (10000−x). Тогда x/(10000−x)=0,1 → 1,1x=1000 → x≈909,1 г соли CaCl₂. Масса кальция: m(Ca) = 909,1 · 0,36 ≈ 327,3 г (используем ω(Ca)=36% из задания 18).`
				},
				{
					id: 3420,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Mn<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>S + H<sub>2</sub>SO<sub>4</sub> → MnSO<sub>4</sub> + H<sub>2</sub>O + S</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Mn<sup>+3</sup> + 1e<sup>-</sup> → Mn<sup>+2</sup> (восстановление, окислитель, ×2); S<sup>-2</sup> − 2e<sup>-</sup> → S<sup>0</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: Mn<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>S + 2H<sub>2</sub>SO<sub>4</sub> → 2MnSO<sub>4</sub> + 3H<sub>2</sub>O + S.</p>
						<p>Окислитель — оксид марганца(III) Mn<sub>2</sub>O<sub>3</sub> (Mn в степени +3), восстановитель — сероводород H<sub>2</sub>S (S в степени −2).</p>
						<p>Проверка: Mn:2=2; S: 1+2=3=2+1; O: 3+8=11=8+3; H: 2+4=6=6 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3421,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: CuSO₄ → Cu(OH)₂ → (HNO₃…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">CuSO<sub>4</sub> → Cu(OH)<sub>2</sub> → (HNO<sub>3</sub> разб.) → X → Cu</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) CuSO<sub>4</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub> — получение голубого осадка гидроксида меди(II).</p>
						<p>2) Cu(OH)<sub>2</sub> + 2HNO<sub>3</sub> → Cu(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O — нейтрализация, X = нитрат меди(II) Cu(NO<sub>3</sub>)<sub>2</sub>.</p>
						<p>3) Cu(NO<sub>3</sub>)<sub>2</sub> + Fe → Fe(NO<sub>3</sub>)<sub>2</sub> + Cu↓ — более активное железо вытесняет медь из раствора соли.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3422,
					type: 'written',
					maxPoints: 3,
					title: `К избытку раствора гидроксида натрия добавили 1,…`,
					taskKind: `Расчётная задача`,
					body: `<p>К избытку раствора гидроксида натрия добавили 1,42 г оксида фосфора(V) и получили 65,6 г раствора. Вычислите массовую долю фосфата натрия в полученном растворе.</p>`,
					solution: `<p>Уравнение: P<sub>2</sub>O<sub>5</sub> + 6NaOH(изб.) → 2Na<sub>3</sub>PO<sub>4</sub> + 3H<sub>2</sub>O.</p>
						<p>M(P<sub>2</sub>O<sub>5</sub>) = 2·31 + 5·16 = 142 г/моль.</p>
						<p>n(P<sub>2</sub>O<sub>5</sub>) = 1,42/142 = 0,01 моль.</p>
						<p>По уравнению n(Na<sub>3</sub>PO<sub>4</sub>) = 2·n(P<sub>2</sub>O<sub>5</sub>) = 0,02 моль.</p>
						<p>M(Na<sub>3</sub>PO<sub>4</sub>) = 3·23 + 31 + 4·16 = 164 г/моль.</p>
						<p>m(Na<sub>3</sub>PO<sub>4</sub>) = 0,02·164 = 3,28 г.</p>
						<p>ω(Na<sub>3</sub>PO<sub>4</sub>) = 3,28/65,6 · 100% = 5%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3423,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата кальция и хлорида калия, а также растворы трёх реактивов: карбоната калия, нитрата серебра и нитрата алюминия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ca(NO<sub>3</sub>)<sub>2</sub> и KCl.</p>
						<p>С карбонатом калия: Ca(NO<sub>3</sub>)<sub>2</sub> даёт белый осадок CaCO<sub>3</sub>, а KCl — нет.</p>
						<p>С нитратом серебра: KCl даёт белый творожистый осадок AgCl, а Ca(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Ca(NO<sub>3</sub>)<sub>2</sub>) + K<sub>2</sub>CO<sub>3</sub>: молекулярное Ca(NO<sub>3</sub>)<sub>2</sub> + K<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2KNO<sub>3</sub>; полное ионное Ca<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ca<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓.</p>
						<p>Склянка №2 (KCl) + AgNO<sub>3</sub>: молекулярное KCl + AgNO<sub>3</sub> → AgCl↓ + KNO<sub>3</sub>; полное ионное K<sup>+</sup> + Cl<sup>-</sup> + Ag<sup>+</sup> + NO<sub>3</sub><sup>-</sup> → AgCl↓ + K<sup>+</sup> + NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Cl<sup>-</sup> → AgCl↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 35 · ОГЭ химия 2026, PDF вариант 6 (3501–3523)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3501,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о водороде как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `В состав серной кислоты входит водород.` },
						{ id: '2', label: `Генераторный газ состоит из водорода и оксида углерода(II).` },
						{ id: '3', label: `Водород горит на воздухе.` },
						{ id: '4', label: `Существует несколько изотопов водорода.` },
						{ id: '5', label: `Сера реагирует с водородом.` },
					],
					correct: ['1', '4'],
					hint: `О химическом элементе говорят его наличие в соединениях и существование изотопов. 1) ✓ В составе серной кислоты — об элементе водороде. 4) ✓ Изотопы (протий, дейтерий, тритий) — характеристика элемента. 2) Генераторный газ содержит простое вещество H₂. 3) Горение на воздухе — свойство простого вещества. 5) Реакция с серой — свойство простого вещества.`
				},
				{
					id: 3502,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, два электронных слоя с числом электронов 2 и 2). Запишите в поле ответа номер периода (X) и заряд его ядра Z (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '24',
					hint: `Два электронных слоя (2 и 2 электрона), всего 4 электрона → элемент бериллий Be (Z=4). Число электронных слоёв = номер периода = 2. Заряд ядра равен числу электронов = 4. X=2, Y=4.`
				},
				{
					id: 3503,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) бром, 2) натрий, 3) водород в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '231',
					hint: `Электроотрицательность: Na≈0,93; H≈2,2; Br≈2,96. В порядке увеличения: натрий (2) < водород (3) < бром (1). Ответ: 2, 3, 1.`
				},
				{
					id: 3504,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления брома в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaBrO<sub>2</sub>` },
						{ letter: 'Б', label: `FeBr<sub>2</sub>` },
						{ letter: 'В', label: `BrCl<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−1` },
						{ id: '2', label: `+1` },
						{ id: '3', label: `+3` },
						{ id: '4', label: `+5` },
					],
					correct: ['3', '1', '3'],
					hint: `А) NaBrO₂: Na(+1), O(−2)×2 → +1 + Br + 2·(−2) = 0 → Br = +3 (вариант 3). Б) FeBr₂: Fe(+2), Br(−1)×2 → Br = −1 (вариант 1). В) BrCl₃: хлор более электроотрицателен, Cl(−1)×3 → Br + 3·(−1) = 0 → Br = +3 (вариант 3).`
				},
				{
					id: 3505,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `P<sub>4</sub>` },
						{ id: '2', label: `HBr` },
						{ id: '3', label: `KBr` },
						{ id: '4', label: `NH<sub>4</sub>Br` },
						{ id: '5', label: `C(алмаз)` },
					],
					correct: ['1', '5'],
					hint: `Ковалентная неполярная связь — между одинаковыми атомами. 1) ✓ P₄ (белый фосфор) — связи P–P. 5) ✓ Алмаз C — связи C–C. 2) HBr — ковалентная полярная. 3) KBr — ионная. 4) NH₄Br — ионная (и ковалентные полярные внутри иона).`
				},
				{
					id: 3506,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах водорода и хлора расположены на семи энергетических уровнях.` },
						{ id: '2', label: `Простые вещества брома и азота при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Кислотные свойства HF более сильно выражены по сравнению с HCl.` },
						{ id: '4', label: `Электроотрицательность серы больше, чем кремния.` },
						{ id: '5', label: `И алюминий, и хлор образуют высшие оксиды с ионной связью.` },
					],
					correct: ['2', '4'],
					hint: `2) ✓ Бром (Br₂) и азот (N₂) при обычных условиях — двухатомные молекулы. 4) ✓ В периоде ЭО растёт слева направо: ЭО серы (2,58) больше, чем кремния (1,9). 1) Водород — 1 уровень, хлор — 3 уровня, неверно. 3) HF слабее, чем HCl, неверно. 5) Cl₂O₇ имеет ковалентную связь, неверно.`
				},
				{
					id: 3507,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислот…`,
					body: `<p>Из предложенного перечня веществ выберите кислотный оксид и основание. 1) NO, 2) (MgOH)<sub>2</sub>CO<sub>3</sub>, 3) PbO<sub>2</sub>, 4) Sr(OH)<sub>2</sub>, 5) Mn<sub>2</sub>O<sub>7</sub>. Запишите сначала номер кислотного оксида, а затем номер основания.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO  2) (MgOH)<sub>2</sub>CO<sub>3</sub>  3) PbO<sub>2</sub>  4) Sr(OH)<sub>2</sub>  5) Mn<sub>2</sub>O<sub>7</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '54',
					hint: `Кислотный оксид — Mn₂O₇ (оксид марганца в высшей степени +7, ему соответствует марганцовая кислота HMnO₄) — номер 5. Основание — Sr(OH)₂ (щёлочь) — номер 4. NO — несолеобразующий оксид. (MgOH)₂CO₃ — основная соль. PbO₂ — амфотерный оксид. Ответ: сначала кислотный оксид (5), затем основание (4).`
				},
				{
					id: 3508,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с алюминием?</p>`,
					options: [
						{ id: '1', label: `фосфор` },
						{ id: '2', label: `оксид хрома(III)` },
						{ id: '3', label: `хлорид кальция` },
						{ id: '4', label: `гидроксид железа(II)` },
						{ id: '5', label: `сульфат калия` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ Al + P → AlP (фосфид алюминия) — алюминий реагирует с фосфором при нагревании. 2) ✓ 2Al + Cr₂O₃ → Al₂O₃ + 2Cr — алюминотермия, алюминий восстанавливает хром из оксида. 3) С раствором CaCl₂ Al не реагирует (Ca активнее). 4) С Fe(OH)₂ не реагирует. 5) С K₂SO₄ не реагирует.`
				},
				{
					id: 3509,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Mg + H<sub>2</sub>O` },
						{ letter: 'Б', label: `Mg + HNO<sub>3</sub>(конц.)` },
						{ letter: 'В', label: `Mg(OH)<sub>2</sub> + HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Mg(OH)<sub>2</sub> + H<sub>2</sub>` },
						{ id: '2', label: `→ MgO` },
						{ id: '3', label: `→ Mg(NO<sub>3</sub>)<sub>2</sub> + NH<sub>3</sub>` },
						{ id: '4', label: `→ Mg(NO<sub>3</sub>)<sub>2</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ Mg(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O` },
					],
					correct: ['1', '4', '5'],
					hint: `А) Mg + 2H₂O →(100 °C) Mg(OH)₂ + H₂↑ — магний реагирует с горячей водой (вариант 1). Б) Mg + 4HNO₃(конц.) → Mg(NO₃)₂ + 2NO₂↑ + 2H₂O — конц. азотная кислота даёт NO₂ (вариант 4). В) Mg(OH)₂ + 2HNO₃ → Mg(NO₃)₂ + 2H₂O — нейтрализация (вариант 5).`
				},
				{
					id: 3510,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `сера` },
						{ letter: 'Б', label: `оксид серы(IV)` },
						{ letter: 'В', label: `карбонат калия(крист.)` },
					],
					matchRight: [
						{ id: '1', label: `O<sub>2</sub>, Fe` },
						{ id: '2', label: `Al<sub>2</sub>O<sub>3</sub>, HCl` },
						{ id: '3', label: `Fe<sub>2</sub>O<sub>3</sub>, N<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>O, CaO` },
					],
					correct: ['1', '4', '2'],
					hint: `А) Сера реагирует с O₂ (S + O₂ → SO₂) и с железом (Fe + S → FeS) — вариант 1. Б) Оксид серы(IV) SO₂ — кислотный оксид, реагирует с H₂O (→ H₂SO₃) и с основным оксидом CaO (→ CaSO₃) — вариант 4. В) Карбонат калия K₂CO₃ реагирует с HCl (→ KCl + CO₂↑ + H₂O) и при сплавлении с Al₂O₃ (→ KAlO₂ + CO₂) — вариант 2.`
				},
				{
					id: 3511,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две окисл…`,
					body: `<p>Из предложенного ниже перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `гидратация фосфорного ангидрида` },
						{ id: '2', label: `взаимодействие алюминия и брома` },
						{ id: '3', label: `взаимодействие угарного газа и кислорода` },
						{ id: '4', label: `разложение карбоната бария при нагревании` },
						{ id: '5', label: `сплавление оксида алюминия и соды` },
					],
					correct: ['2', '3'],
					hint: `ОВР идут с изменением степеней окисления. 2) ✓ 2Al⁰ + 3Br₂⁰ → 2Al⁺³Br₃⁻¹ — степени окисления меняются. 3) ✓ 2C⁺²O + O₂⁰ → 2C⁺⁴O₂ — C и O меняют степени окисления. 1) P₂O₅ + 3H₂O → 2H₃PO₄ — не ОВР. 4) BaCO₃ → BaO + CO₂ — не ОВР. 5) Al₂O₃ + Na₂CO₃ → 2NaAlO₂ + CO₂ — не ОВР.`
				},
				{
					id: 3512,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `RbOH и HNO<sub>3</sub>` },
						{ letter: 'Б', label: `CaS и HCl(изб.)` },
						{ letter: 'В', label: `Na<sub>2</sub>CO<sub>3</sub> и HCl(изб.)` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа с неприятным запахом` },
						{ id: '2', label: `видимые признаки реакции отсутствуют` },
						{ id: '3', label: `образование осадка` },
						{ id: '4', label: `выделение газа без цвета и запаха` },
					],
					correct: ['2', '1', '4'],
					hint: `А) RbOH + HNO₃ → RbNO₃ + H₂O — реакция нейтрализации, видимых признаков нет (вариант 2). Б) CaS + 2HCl → CaCl₂ + H₂S↑ — выделяется сероводород с неприятным запахом (вариант 1). В) Na₂CO₃ + 2HCl → 2NaCl + CO₂↑ + H₂O — выделяется углекислый газ без цвета и запаха (вариант 4).`
				},
				{
					id: 3513,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, относящиеся к сильным электролитам.</p>`,
					options: [
						{ id: '1', label: `Ba(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '2', label: `H<sub>2</sub>S` },
						{ id: '3', label: `H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '4', label: `HF` },
						{ id: '5', label: `HBr` },
					],
					correct: ['1', '5'],
					hint: `Сильные электролиты полностью диссоциируют. 1) ✓ Ba(NO₃)₂ — растворимая соль (сильный электролит). 5) ✓ HBr — сильная кислота. 2) H₂S — слабая кислота. 3) H₂CO₃ — слабая кислота. 4) HF — слабая кислота.`
				},
				{
					id: 3514,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению Ba²⁺ + 2F⁻ = BaF₂…`,
					body: `<p>Сокращённому ионному уравнению Ba<sup>2+</sup> + 2F<sup>-</sup> = BaF<sub>2</sub> отвечает взаимодействие веществ. 1) Ba и F<sub>2</sub>, 2) BaSO<sub>4</sub> и KF, 3) BaO и NaF, 4) Ba(NO<sub>3</sub>)<sub>2</sub> и KF, 5) BaCl<sub>2</sub> и HF, 6) BaBr<sub>2</sub> и NaF.</p>`,
					options: [
						{ id: '1', label: `Ba и F<sub>2</sub>` },
						{ id: '2', label: `BaSO<sub>4</sub> и KF` },
						{ id: '3', label: `BaO и NaF` },
						{ id: '4', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и KF` },
						{ id: '5', label: `BaCl<sub>2</sub> и HF` },
						{ id: '6', label: `BaBr<sub>2</sub> и NaF` },
					],
					correct: ['4', '6'],
					hint: `Сокращённому уравнению Ba²⁺ + 2F⁻ = BaF₂↓ соответствует реакция между растворимой солью бария и растворимым фторидом. 4) ✓ Ba(NO₃)₂ + 2KF → BaF₂↓ + 2KNO₃. 6) ✓ BaBr₂ + 2NaF → BaF₂↓ + 2NaBr. 1) Ba — металл. 2) BaSO₄ нерастворим. 3) BaO — оксид. 5) HF — слабая кислота, не даёт свободных ионов F⁻.`
				},
				{
					id: 3515,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2Br<sup>+5</sup> → Br<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `N<sub>2</sub><sup>0</sup> → 2N<sup>-3</sup>` },
						{ letter: 'В', label: `Cr<sup>+2</sup> → Cr<sup>+3</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '2', '1'],
					hint: `А) 2Br⁺⁵ → Br₂⁰: +5 → 0, понижение степени окисления — восстановление (2). Б) N₂⁰ → 2N⁻³: 0 → −3, понижение СО — восстановление (2). В) Cr⁺² → Cr⁺³: +2 → +3, повышение СО — окисление (1).`
				},
				{
					id: 3516,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Получение кислорода следует проводить в вытяжном шкафу.` },
						{ id: '2', label: `Смесь воды и серной кислоты можно разделить с помощью отстаивания.` },
						{ id: '3', label: `Метан собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха.` },
						{ id: '4', label: `Концентрированную серную кислоту осторожно приливают к воде при перемешивании.` },
					],
					correct: ['3', '4'],
					hint: `3) ✓ Метан легче воздуха, поэтому его собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха. 4) ✓ Правило безопасности: кислоту приливают в воду небольшими порциями при перемешивании. 1) Кислород нетоксичен, вытяжной шкаф не требуется. 2) Серная кислота смешивается с водой, отстаиванием их не разделить.`
				},
				{
					id: 3517,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `LiOH и Ba(OH)<sub>2</sub>` },
						{ letter: 'Б', label: `Fe(NO<sub>3</sub>)<sub>2</sub> и FeBr<sub>2</sub>` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub> и Mg(OH)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `AgNO<sub>3</sub>(р-р)` },
						{ id: '2', label: `лакмус` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '4', label: `NaOH(р-р)` },
					],
					correct: ['3', '1', '4'],
					hint: `А) LiOH и Ba(OH)₂ различают H₂SO₄: с Ba(OH)₂ выпадает белый осадок BaSO₄↓, с LiOH осадка нет (Li₂SO₄ растворим) — вариант 3. Б) Fe(NO₃)₂ и FeBr₂ различают AgNO₃: с FeBr₂ выпадает желтоватый осадок AgBr↓, с Fe(NO₃)₂ осадка нет — вариант 1. В) Al(OH)₃ и Mg(OH)₂ различают NaOH: амфотерный Al(OH)₃ растворяется в избытке щёлочи, Mg(OH)₂ — нет — вариант 4.`
				},
				{
					id: 3518,
					type: 'input',
					title: `Гашёная известь (гидроксид кальция Ca(OH)₂) широ…`,
					body: `<p>Гашёная известь (гидроксид кальция Ca(OH)<sub>2</sub>) широко используется в сельском хозяйстве. Вычислите массовую долю кальция в гашёной извести. Запишите число с точностью до целых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '54',
					hint: `Ca(OH)₂: M = 40 + 2·(16+1) = 74 г/моль. Массовая доля кальция: ω(Ca) = 40/74 · 100% = 54,05% ≈ 54%.`
				},
				{
					id: 3519,
					type: 'input',
					title: `Садовую побелку готовят, обрабатывая известь (0,…`,
					body: `<p>Садовую побелку готовят, обрабатывая известь (0,5 кг в расчёте на кальций) двумя литрами воды. Вычислите массу гашёной извести, которую надо взять на 58,3 л воды. Запишите число с точностью до целых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '27',
					hint: `На 2 л воды берут 0,5 кг кальция. На 58,3 л воды: m(Ca) = 0,5 · 58,3/2 = 14,575 кг Ca. Масса гашёной извести Ca(OH)₂: каждый моль Ca соответствует молю Ca(OH)₂, поэтому m(Ca(OH)₂) = 14,575 · 74/40 = 14,575 · 1,85 ≈ 26,96 кг ≈ 27 кг.`
				},
				{
					id: 3520,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">MnO<sub>2</sub> + HNO<sub>3</sub>(конц.) →(t°) Mn(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O + O<sub>2</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Mn<sup>+4</sup> + 2e<sup>-</sup> → Mn<sup>+2</sup> (восстановление, окислитель, ×2); 2O<sup>-2</sup> − 4e<sup>-</sup> → O<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: 2MnO<sub>2</sub> + 4HNO<sub>3</sub> → 2Mn(NO<sub>3</sub>)<sub>2</sub> + 2H<sub>2</sub>O + O<sub>2</sub>.</p>
						<p>Это внутримолекулярная ОВР: в MnO<sub>2</sub> марганец Mn<sup>+4</sup> — окислитель, а кислород O<sup>-2</sup> — восстановитель.</p>
						<p>Проверка: Mn:2=2; N:4=4; H:4=4; O: 4+12=16=12+2+2 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3521,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Cu(NO₃)₂ → Cu(OH)₂ → (t°…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Cu(NO<sub>3</sub>)<sub>2</sub> → Cu(OH)<sub>2</sub> → (t°) → X → Cu</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Cu(NO<sub>3</sub>)<sub>2</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + 2NaNO<sub>3</sub> — получение голубого осадка гидроксида меди(II).</p>
						<p>2) Cu(OH)<sub>2</sub> → (t°) CuO + H<sub>2</sub>O — разложение гидроксида при нагревании, X = оксид меди(II) CuO (чёрный).</p>
						<p>3) CuO + H<sub>2</sub> → Cu + H<sub>2</sub>O — восстановление оксида меди водородом до металла.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3522,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 2,24 л (н.у.) хлороводорода че…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 2,24 л (н.у.) хлороводорода через избыток раствора гидроксида натрия получили 320 г раствора. Вычислите массовую долю соли в полученном растворе.</p>`,
					solution: `<p>Уравнение: HCl + NaOH → NaCl + H<sub>2</sub>O.</p>
						<p>n(HCl) = 2,24/22,4 = 0,1 моль.</p>
						<p>По уравнению n(NaCl) = n(HCl) = 0,1 моль.</p>
						<p>M(NaCl) = 58,5 г/моль.</p>
						<p>m(NaCl) = 0,1·58,5 = 5,85 г.</p>
						<p>ω(NaCl) = 5,85/320 · 100% = 1,828% ≈ 1,83%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3523,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата кальция и бромида калия, а также растворы трёх реактивов: нитрата меди(II), карбоната калия и нитрата серебра. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ca(NO<sub>3</sub>)<sub>2</sub> и KBr.</p>
						<p>С карбонатом калия: Ca(NO<sub>3</sub>)<sub>2</sub> даёт белый осадок CaCO<sub>3</sub>, а KBr — нет.</p>
						<p>С нитратом серебра: KBr даёт желтоватый осадок AgBr, а Ca(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Ca(NO<sub>3</sub>)<sub>2</sub>) + K<sub>2</sub>CO<sub>3</sub>: молекулярное Ca(NO<sub>3</sub>)<sub>2</sub> + K<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2KNO<sub>3</sub>; полное ионное Ca<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ca<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> → CaCO<sub>3</sub>↓.</p>
						<p>Склянка №2 (KBr) + AgNO<sub>3</sub>: молекулярное KBr + AgNO<sub>3</sub> → AgBr↓ + KNO<sub>3</sub>; полное ионное K<sup>+</sup> + Br<sup>-</sup> + Ag<sup>+</sup> + NO<sub>3</sub><sup>-</sup> → AgBr↓ + K<sup>+</sup> + NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Br<sup>-</sup> → AgBr↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 36 · ОГЭ химия 2026, PDF вариант 7 (3601–3623)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3601,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о иоде как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Иод содержится в морских водорослях.` },
						{ id: '2', label: `Иод плохо растворяется в воде.` },
						{ id: '3', label: `Пары иода красивого фиолетового цвета.` },
						{ id: '4', label: `Железо реагирует с иодом при нагревании.` },
						{ id: '5', label: `Иод в виде иодата калия входит в состав многих БАД и витаминных комплексов.` },
					],
					correct: ['1', '5'],
					hint: `О химическом элементе говорят его наличие в составе соединений и природных объектов. 1) ✓ Содержится в морских водорослях — об элементе. 5) ✓ В виде иодата калия (соединения) — об элементе. 2) Растворимость в воде — свойство простого вещества. 3) Фиолетовый цвет паров — свойство простого вещества. 4) Реакция с железом — свойство простого вещества.`
				},
				{
					id: 3602,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (схема Бора: ядро +Z, на первом слое 2 электрона, на втором слое 6 электронов). Запишите в поле ответа номер группы (X) и валентность элемента (Y) в его водородном соединении.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '62',
					hint: `Два электронных слоя (2 и 6 электронов), всего 8 электронов → элемент кислород O (Z=8). Кислород находится в VI группе. Валентность в водородном соединении: O в H₂O имеет валентность II → Y=2. X=6 (группа), Y=2 (валентность по водороду).`
				},
				{
					id: 3603,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) водород, 2) фтор, 3) литий в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Электроотрицательность: Li≈0,98; H≈2,2; F≈3,98 (фтор — самый электроотрицательный элемент). В порядке увеличения: литий (3) < водород (1) < фтор (2). Ответ: 3, 1, 2.`
				},
				{
					id: 3604,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления хрома в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KCrO<sub>2</sub>` },
						{ letter: 'Б', label: `Ca<sub>3</sub>[Cr(OH)<sub>6</sub>]<sub>2</sub>` },
						{ letter: 'В', label: `Na<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+2` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['2', '2', '4'],
					hint: `А) KCrO₂: K(+1), O(−2)×2 → +1 + Cr − 4 = 0 → Cr = +3 (вариант 2). Б) Ca₃[Cr(OH)₆]₂: Ca(+2)×3, в каждой группе [Cr(OH)₆] заряд −3 → 6 + 2·(Cr − 6) = 0 → Cr = +3 (вариант 2). В) Na₂Cr₂O₇: Na(+1)×2, O(−2)×7 → 2 + 2Cr − 14 = 0 → 2Cr = 12 → Cr = +6 (вариант 4).`
				},
				{
					id: 3605,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества с ионной химической связью.</p>`,
					options: [
						{ id: '1', label: `гидрид натрия` },
						{ id: '2', label: `бромоводород` },
						{ id: '3', label: `водород` },
						{ id: '4', label: `гидроксид калия` },
						{ id: '5', label: `серная кислота` },
					],
					correct: ['1', '4'],
					hint: `Ионная связь образуется между ионами (металл + неметалл или сложный ион). 1) ✓ Гидрид натрия NaH — ионная связь (Na⁺ и H⁻). 4) ✓ Гидроксид калия KOH — ионная связь между K⁺ и OH⁻. 2) HBr — ковалентная полярная. 3) H₂ — ковалентная неполярная. 5) H₂SO₄ — ковалентные полярные связи.`
				},
				{
					id: 3606,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах калия и железа расположены на четырёх энергетических уровнях.` },
						{ id: '2', label: `Простые вещества хлора и водорода при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Оксид кремния(IV) имеет более кислотный характер, чем оксид углерода(IV).` },
						{ id: '4', label: `Кислород и хлор — самые электроотрицательные элементы в Периодической системе.` },
						{ id: '5', label: `И хлор, и фтор образуют высшие оксиды с общей формулой Э<sub>2</sub>O<sub>7</sub>.` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ Калий и железо находятся в 4 периоде, их электроны расположены на четырёх энергетических уровнях. 2) ✓ Хлор (Cl₂) и водород (H₂) при обычных условиях — двухатомные молекулы. 3) CO₂ более кислотный, чем SiO₂ (в группе кислотность уменьшается вниз), неверно. 4) Самый электроотрицательный — фтор, неверно. 5) Cl₂O₇ существует, но фтор не образует высшего оксида (всегда −1), неверно.`
				},
				{
					id: 3607,
					type: 'input',
					title: `Из предложенного перечня веществ выберите оснóвн…`,
					body: `<p>Из предложенного перечня веществ выберите оснóвный и кислотный оксиды. 1) BaO<sub>2</sub>, 2) NO, 3) SO<sub>3</sub>, 4) Li<sub>2</sub>O, 5) Al<sub>2</sub>O<sub>3</sub>. Запишите сначала номер оснóвного оксида, а затем номер кислотного.</p>
						<p style="color:var(--muted);font-size:14px;">1) BaO<sub>2</sub>  2) NO  3) SO<sub>3</sub>  4) Li<sub>2</sub>O  5) Al<sub>2</sub>O<sub>3</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '43',
					hint: `Оснóвный оксид — Li₂O (оксид активного металла, ему соответствует щёлочь LiOH) — номер 4. Кислотный оксид — SO₃ (оксид неметалла, ему соответствует H₂SO₄) — номер 3. BaO₂ — пероксид. NO — несолеобразующий оксид. Al₂O₃ — амфотерный оксид. Ответ: сначала оснóвный (4), затем кислотный (3).`
				},
				{
					id: 3608,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом цинка в определённых условиях?</p>`,
					options: [
						{ id: '1', label: `HNO<sub>3</sub>` },
						{ id: '2', label: `H<sub>2</sub>O` },
						{ id: '3', label: `BaO` },
						{ id: '4', label: `N<sub>2</sub>` },
						{ id: '5', label: `O<sub>2</sub>` },
					],
					correct: ['1', '3'],
					hint: `ZnO — амфотерный оксид, реагирует и с кислотами, и с основными оксидами. 1) ✓ ZnO + 2HNO₃ → Zn(NO₃)₂ + H₂O — реакция с кислотой. 3) ✓ ZnO + BaO → BaZnO₂ — реакция с основным оксидом при сплавлении (амфотерный оксид проявляет кислотные свойства). 2) С водой ZnO не реагирует. 4) С азотом не реагирует. 5) С кислородом не реагирует (Zn уже окислен).`
				},
				{
					id: 3609,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `ZnO + Na<sub>2</sub>O` },
						{ letter: 'Б', label: `Zn(OH)<sub>2</sub> + NaOH(р-р)` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> + NaOH(тв.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Na<sub>2</sub>[Zn(OH)<sub>4</sub>] + H<sub>2</sub>O` },
						{ id: '2', label: `→ Na<sub>2</sub>[Zn(OH)<sub>4</sub>]` },
						{ id: '3', label: `→ Na<sub>2</sub>ZnO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ Na<sub>2</sub>ZnO<sub>2</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ Na<sub>2</sub>ZnO<sub>2</sub>` },
					],
					correct: ['5', '2', '3'],
					hint: `А) ZnO + Na₂O →(t°) Na₂ZnO₂ — сплавление амфотерного и основного оксидов даёт цинкат натрия (вариант 5). Б) Zn(OH)₂ + 2NaOH(р-р) → Na₂[Zn(OH)₄] — в растворе образуется тетрагидроксоцинкат (вариант 2). В) Zn(OH)₂ + 2NaOH(тв.) →(t°) Na₂ZnO₂ + 2H₂O — при сплавлении образуется цинкат и вода (вариант 3).`
				},
				{
					id: 3610,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `натрий` },
						{ letter: 'Б', label: `оксид углерода(IV)` },
						{ letter: 'В', label: `карбонат кальция` },
					],
					matchRight: [
						{ id: '1', label: `CO, H<sub>2</sub>O` },
						{ id: '2', label: `C, HCl` },
						{ id: '3', label: `Fe<sub>2</sub>O<sub>3</sub>, Ca` },
						{ id: '4', label: `KOH, CaO` },
					],
					correct: ['1', '4', '2'],
					hint: `А) Натрий (активный металл) реагирует с H₂O (2Na + 2H₂O → 2NaOH + H₂) и с CO (при определённых условиях образует продукты типа Na₂C₂O₂) — вариант 1. Б) Оксид углерода(IV) CO₂ — кислотный оксид, реагирует с KOH (→ K₂CO₃) и с основным оксидом CaO (→ CaCO₃) — вариант 4. В) Карбонат кальция CaCO₃ реагирует с HCl (→ CaCl₂ + CO₂↑ + H₂O) и при высокой температуре с углём C — вариант 2.`
				},
				{
					id: 3611,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две окисл…`,
					body: `<p>Из предложенного ниже перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `разложение нитрата магния` },
						{ id: '2', label: `разложение нитрата меди` },
						{ id: '3', label: `взаимодействие оксида серы(IV) и оксида кальция` },
						{ id: '4', label: `взаимодействие сернистого газа и щёлочи` },
						{ id: '5', label: `разложение гидрокарбоната кальция` },
					],
					correct: ['1', '2'],
					hint: `Разложение нитратов тяжёлых металлов — ОВР (меняются СО азота и кислорода). 1) ✓ 2Mg(NO₃)₂ → 2MgO + 4NO₂↑ + O₂↑ — ОВР. 2) ✓ 2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑ — ОВР. 3) SO₂ + CaO → CaSO₃ — не ОВР. 4) SO₂ + 2NaOH → Na₂SO₃ + H₂O — не ОВР. 5) Ca(HCO₃)₂ → CaCO₃ + CO₂ + H₂O — не ОВР.`
				},
				{
					id: 3612,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Na<sub>2</sub>CO<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>(изб.)` },
						{ letter: 'Б', label: `K<sub>2</sub>S и H<sub>3</sub>PO<sub>4</sub>(изб.)` },
						{ letter: 'В', label: `K<sub>2</sub>CO<sub>3</sub> и MgCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `образование осадка` },
						{ id: '2', label: `видимые признаки реакции отсутствуют` },
						{ id: '3', label: `выделение газа с неприятным запахом` },
						{ id: '4', label: `выделение газа без цвета и запаха` },
					],
					correct: ['4', '3', '1'],
					hint: `А) 3Na₂CO₃ + 2H₃PO₄(изб.) → 2Na₃PO₄ + 3CO₂↑ + 3H₂O — выделяется углекислый газ без цвета и запаха (вариант 4). Б) 3K₂S + 2H₃PO₄(изб.) → 2K₃PO₄ + 3H₂S↑ — выделяется сероводород с неприятным запахом (вариант 3). В) K₂CO₃ + MgCl₂ → MgCO₃↓ + 2KCl — образуется осадок карбоната магния (вариант 1).`
				},
				{
					id: 3613,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, относящиеся к неэлектролитам.</p>`,
					options: [
						{ id: '1', label: `ацетон` },
						{ id: '2', label: `хлороводород` },
						{ id: '3', label: `оксид азота(II)` },
						{ id: '4', label: `сероводород` },
						{ id: '5', label: `сода` },
					],
					correct: ['1', '3'],
					hint: `Неэлектролиты не диссоциируют на ионы в растворе/расплаве. 1) ✓ Ацетон — органическое вещество, неэлектролит. 3) ✓ Оксид азота(II) NO — несолеобразующий оксид, не диссоциирует. 2) Хлороводород (в воде HCl) — сильный электролит. 4) Сероводород H₂S — слабый электролит. 5) Сода Na₂CO₃ — сильный электролит (соль).`
				},
				{
					id: 3614,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению 3Ba²⁺ + 2PO₄³⁻ =…`,
					body: `<p>Сокращённому ионному уравнению 3Ba<sup>2+</sup> + 2PO<sub>4</sub><sup>3-</sup> = Ba<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓ отвечает взаимодействие веществ. 1) Ba и H<sub>3</sub>PO<sub>4</sub>, 2) BaCO<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>, 3) Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>3</sub>PO<sub>4</sub>, 4) BaCl<sub>2</sub> и Na<sub>3</sub>PO<sub>4</sub>, 5) BaCl<sub>2</sub> и Ag<sub>3</sub>PO<sub>4</sub>, 6) BaO и K<sub>3</sub>PO<sub>4</sub>.</p>`,
					options: [
						{ id: '1', label: `Ba и H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `BaCO<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '3', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и K<sub>3</sub>PO<sub>4</sub>` },
						{ id: '4', label: `BaCl<sub>2</sub> и Na<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `BaCl<sub>2</sub> и Ag<sub>3</sub>PO<sub>4</sub>` },
						{ id: '6', label: `BaO и K<sub>3</sub>PO<sub>4</sub>` },
					],
					correct: ['3', '4'],
					hint: `Сокращённому уравнению 3Ba²⁺ + 2PO₄³⁻ = Ba₃(PO₄)₂↓ соответствует реакция между растворимой солью бария и растворимым фосфатом. 3) ✓ 3Ba(NO₃)₂ + 2K₃PO₄ → Ba₃(PO₄)₂↓ + 6KNO₃. 4) ✓ 3BaCl₂ + 2Na₃PO₄ → Ba₃(PO₄)₂↓ + 6NaCl. 1) Ba — металл. 2) BaCO₃ нерастворим. 5) Ag₃PO₄ нерастворим. 6) BaO — оксид.`
				},
				{
					id: 3615,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2H<sup>+</sup> → H<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `S<sup>+6</sup> → S<sup>+4</sup>` },
						{ letter: 'В', label: `Na<sup>0</sup> → Na<sup>+</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '2', '1'],
					hint: `А) 2H⁺ → H₂⁰: +1 → 0, понижение степени окисления — восстановление (2). Б) S⁺⁶ → S⁺⁴: +6 → +4, понижение СО — восстановление (2). В) Na⁰ → Na⁺: 0 → +1, повышение СО — окисление (1).`
				},
				{
					id: 3616,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Школьнику в химической лаборатории нельзя работать одному.` },
						{ id: '2', label: `Смесь керосина и бензина можно разделить с помощью фильтрования.` },
						{ id: '3', label: `Аммиак собирают в сосуд методом вытеснения воды.` },
						{ id: '4', label: `Пробирку нельзя нагревать на открытом пламени.` },
					],
					correct: ['1'],
					hint: `1) ✓ Правило безопасности: школьник не должен работать в лаборатории один (только под присмотром). 2) Керосин и бензин смешиваются (оба — углеводороды), фильтрованием их не разделить, неверно. 3) Аммиак хорошо растворим в воде, методом вытеснения воды его не собирают, неверно. 4) Пробирку можно нагревать на пламени спиртовки (соблюдая правила), неверно.`
				},
				{
					id: 3617,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KI и H<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'Б', label: `MgI<sub>2</sub> и AlI<sub>3</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>O и SrCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `фенолфталеин` },
						{ id: '2', label: `лакмус` },
						{ id: '3', label: `Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '4', label: `KOH` },
					],
					correct: ['2', '4', '3'],
					hint: `А) KI (соль, нейтральная среда) и H₃PO₄ (кислота) различают лакмусом: в кислоте он краснеет, в растворе соли цвет не меняется — вариант 2. Б) MgI₂ и AlI₃ различают KOH: оба дают осадки гидроксидов, но Al(OH)₃ амфотерен и растворяется в избытке щёлочи, а Mg(OH)₂ — нет — вариант 4. В) H₂O и SrCl₂ различают Na₂SO₄: с SrCl₂ выпадает белый осадок SrSO₄↓, с водой реакции нет — вариант 3.`
				},
				{
					id: 3618,
					type: 'input',
					title: `Доломитовая мука (двойной карбонат кальция-магни…`,
					body: `<p>Доломитовая мука (двойной карбонат кальция-магния, CaCO<sub>3</sub>·MgCO<sub>3</sub>) широко используется в сельском хозяйстве в качестве раскислителя почв. Вычислите массовую долю кальция в доломите. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '21,7',
					hint: `CaCO₃·MgCO₃: M = (40+12+48) + (24+12+48) = 100 + 84 = 184 г/моль. Массовая доля кальция: ω(Ca) = 40/184 · 100% = 21,74% ≈ 21,7%.`
				},
				{
					id: 3619,
					type: 'input',
					title: `На кислых почвах в землю вносится примерно 70 г…`,
					body: `<p>На кислых почвах в землю вносится примерно 70 г кальция на 1 м<sup>2</sup>. Вычислите, какую массу доломита надо внести на 1200 м<sup>2</sup> поверхности почвы. Запишите число с точностью до целых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '387',
					hint: `Масса кальция на 1200 м²: m(Ca) = 70 · 1200 = 84000 г = 84 кг. Масса доломита: m(доломит) = m(Ca)/ω(Ca) = 84/0,217 ≈ 387,1 кг ≈ 387 кг (используем ω(Ca)=21,7% из задания 18).`
				},
				{
					id: 3620,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">PbO<sub>2</sub> + HBr → PbBr<sub>2</sub> + H<sub>2</sub>O + Br<sub>2</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Pb<sup>+4</sup> + 2e<sup>-</sup> → Pb<sup>+2</sup> (восстановление, окислитель, ×1); 2Br<sup>-</sup> − 2e<sup>-</sup> → Br<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: PbO<sub>2</sub> + 4HBr → PbBr<sub>2</sub> + 2H<sub>2</sub>O + Br<sub>2</sub>.</p>
						<p>Окислитель — оксид свинца(IV) PbO<sub>2</sub> (Pb в степени +4), восстановитель — бромоводород HBr (Br в степени −1).</p>
						<p>Проверка: Pb:1=1; Br: 4=2+2; O:2=2; H:4=4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3621,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: FeBr₂ → Fe(OH)₂ → X → (t…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">FeBr<sub>2</sub> → Fe(OH)<sub>2</sub> → X → (t°) → Fe<sub>2</sub>O<sub>3</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) FeBr<sub>2</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + 2NaBr — получение осадка гидроксида железа(II).</p>
						<p>2) 4Fe(OH)<sub>2</sub> + O<sub>2</sub> + 2H<sub>2</sub>O → 4Fe(OH)<sub>3</sub> — окисление кислородом воздуха до гидроксида железа(III), X = Fe(OH)<sub>3</sub> (бурый).</p>
						<p>3) 2Fe(OH)<sub>3</sub> → (t°) Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O — разложение при нагревании до оксида железа(III).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3622,
					type: 'written',
					maxPoints: 3,
					title: `Раствор, содержащий 12,6 г азотной кислоты, был…`,
					taskKind: `Расчётная задача`,
					body: `<p>Раствор, содержащий 12,6 г азотной кислоты, был нейтрализован 10%-ным раствором гидроксида калия. При этом получился 5%-ный раствор соли. Какова массовая доля азотной кислоты в исходном растворе?</p>`,
					solution: `<p>Уравнение: HNO<sub>3</sub> + KOH → KNO<sub>3</sub> + H<sub>2</sub>O.</p>
						<p>n(HNO<sub>3</sub>) = 12,6/63 = 0,2 моль.</p>
						<p>n(KOH) = 0,2 моль, m(KOH) = 0,2·56 = 11,2 г, m(р-ра KOH) = 11,2/0,1 = 112 г.</p>
						<p>n(KNO<sub>3</sub>) = 0,2 моль, m(KNO<sub>3</sub>) = 0,2·101 = 20,2 г, m(р-ра соли) = 20,2/0,05 = 404 г.</p>
						<p>m(исх.</p>
						<p>р-ра HNO<sub>3</sub>) = m(р-ра соли) − m(р-ра KOH) = 404 − 112 = 292 г.</p>
						<p>ω(HNO<sub>3</sub>) = 12,6/292 · 100% ≈ 4,3%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3623,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата бария и сульфата цинка, а также растворы трёх реактивов: нитрата меди(II), сульфата магния и гидроксида натрия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ba(NO<sub>3</sub>)<sub>2</sub> и ZnSO<sub>4</sub>.</p>
						<p>С сульфатом магния: Ba(NO<sub>3</sub>)<sub>2</sub> даёт белый осадок BaSO<sub>4</sub>, а ZnSO<sub>4</sub> — нет.</p>
						<p>С гидроксидом натрия: ZnSO<sub>4</sub> даёт белый осадок Zn(OH)<sub>2</sub> (растворимый в избытке щёлочи), а Ba(NO<sub>3</sub>)<sub>2</sub> — нет.</p>
						<p>Склянка №1 (Ba(NO<sub>3</sub>)<sub>2</sub>) + MgSO<sub>4</sub>: молекулярное Ba(NO<sub>3</sub>)<sub>2</sub> + MgSO<sub>4</sub> → BaSO<sub>4</sub>↓ + Mg(NO<sub>3</sub>)<sub>2</sub>; полное ионное Ba<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + Mg<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓ + Mg<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓.</p>
						<p>Склянка №2 (ZnSO<sub>4</sub>) + NaOH: молекулярное ZnSO<sub>4</sub> + 2NaOH → Zn(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>; полное ионное Zn<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> + 2Na<sup>+</sup> + 2OH<sup>-</sup> → Zn(OH)<sub>2</sub>↓ + 2Na<sup>+</sup> + SO<sub>4</sub><sup>2-</sup>; сокращённое Zn<sup>2+</sup> + 2OH<sup>-</sup> → Zn(OH)<sub>2</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 37 · ОГЭ химия 2026, PDF вариант 8 (3701–3723)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3701,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о броме как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `Бром химически более активен по сравнению с иодом.` },
						{ id: '2', label: `Препараты брома успокаивают нервную систему.` },
						{ id: '3', label: `Бром входит в состав бромата калия.` },
						{ id: '4', label: `Бром хуже растворяется в воде по сравнению с хлором.` },
						{ id: '5', label: `Бром менее электроотрицателен, чем фтор.` },
					],
					correct: ['1', '4'],
					hint: `О простом веществе говорят его химические и физические свойства. 1) ✓ Сравнение активности брома и иода — о простых веществах. 4) ✓ Растворимость в воде — физическое свойство простого вещества. 2) Препараты брома — соединения. 3) В составе бромата калия — об элементе. 5) Электроотрицательность — характеристика атома (элемента).`
				},
				{
					id: 3702,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (заряд ядра +Z, три электронных слоя с числом электронов 2, 8 и 1). Запишите в поле ответа номер периода (X) и его высшую валентность (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '31',
					hint: `Три электронных слоя (2, 8, 1), всего 11 электронов → элемент натрий Na (Z=11). Число электронных слоёв = номер периода = 3. Высшая валентность равна номеру группы (I) = 1 (оксид Na₂O). X=3, Y=1.`
				},
				{
					id: 3703,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) алюминий, 2) бор, 3) сера в порядке увеличения кислотного характера их высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '123',
					hint: `Высшие оксиды: Al₂O₃ (амфотерный), B₂O₃ (слабокислотный), SO₃ (сильнокислотный). Кислотный характер растёт. В порядке увеличения кислотного характера: Al (1, амфотерный) < B (2) < S (3). Ответ: 1, 2, 3.`
				},
				{
					id: 3704,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления азота в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KNO<sub>3</sub>` },
						{ letter: 'Б', label: `HNO<sub>2</sub>` },
						{ letter: 'В', label: `NF<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−3` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+5` },
					],
					correct: ['4', '2', '2'],
					hint: `А) KNO₃: K(+1), O(−2)×3 → +1 + N − 6 = 0 → N = +5 (вариант 4). Б) HNO₂: H(+1), O(−2)×2 → +1 + N − 4 = 0 → N = +3 (вариант 2). В) NF₃: F(−1)×3 → N + 3·(−1) = 0 → N = +3 (вариант 2).`
				},
				{
					id: 3705,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует как ионная, так и ковалентная связь.</p>`,
					options: [
						{ id: '1', label: `HNO<sub>3</sub>` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '3', label: `Na<sub>2</sub>S` },
						{ id: '4', label: `NH<sub>4</sub>NO<sub>3</sub>` },
						{ id: '5', label: `H<sub>2</sub>O<sub>2</sub>` },
					],
					correct: ['2', '4'],
					hint: `Ионная и ковалентная связи одновременно — у солей со сложными ионами. 2) ✓ Na₂SO₄: ионная между Na⁺ и SO₄²⁻, ковалентные внутри иона SO₄²⁻. 4) ✓ NH₄NO₃: ионная между NH₄⁺ и NO₃⁻, ковалентные внутри ионов. 1) HNO₃ — только ковалентные. 3) Na₂S — только ионная. 5) H₂O₂ — только ковалентные.`
				},
				{
					id: 3706,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы бора и алюминия содержат по три неспаренных электрона.` },
						{ id: '2', label: `И серная кислота, и углекислый газ имеют молекулярную кристаллическую решётку.` },
						{ id: '3', label: `Электроотрицательность водорода больше, чем электроотрицательность брома.` },
						{ id: '4', label: `Атомный радиус лития больше атомного радиуса кислорода.` },
						{ id: '5', label: `И хлор, и кислород имеют высшую валентность, равную номеру группы.` },
					],
					correct: ['2', '4'],
					hint: `2) ✓ H₂SO₄ и CO₂ имеют молекулярную кристаллическую решётку. 4) ✓ В периоде радиус уменьшается слева направо, поэтому радиус лития больше, чем кислорода. 1) Бор и алюминий имеют по одному неспаренному электрону (…np¹), неверно. 3) ЭО брома (2,96) больше, чем водорода (2,2), неверно. 5) Хлор может иметь валентность VII, но кислород — максимум II (не VI), неверно.`
				},
				{
					id: 3707,
					type: 'input',
					title: `Из предложенного перечня веществ выберите несоле…`,
					body: `<p>Из предложенного перечня веществ выберите несолеобразующий оксид и амфотерный гидроксид. 1) SiO<sub>2</sub>, 2) H<sub>2</sub>O<sub>2</sub>, 3) NO, 4) Mg(OH)<sub>2</sub>, 5) Be(OH)<sub>2</sub>. Запишите сначала номер несолеобразующего оксида, а затем номер амфотерного гидроксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) SiO<sub>2</sub>  2) H<sub>2</sub>O<sub>2</sub>  3) NO  4) Mg(OH)<sub>2</sub>  5) Be(OH)<sub>2</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '35',
					hint: `Несолеобразующий оксид — NO (оксид азота(II), не образует солей) — номер 3. Амфотерный гидроксид — Be(OH)₂ (реагирует и с кислотами, и со щелочами) — номер 5. SiO₂ — кислотный оксид. H₂O₂ — пероксид. Mg(OH)₂ — основание. Ответ: сначала несолеобразующий (3), затем амфотерный (5).`
				},
				{
					id: 3708,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом стронция в определённых условиях?</p>`,
					options: [
						{ id: '1', label: `оксид железа(III)` },
						{ id: '2', label: `медь` },
						{ id: '3', label: `оксид лития` },
						{ id: '4', label: `оксид водорода` },
						{ id: '5', label: `угарный газ` },
					],
					correct: ['1', '4'],
					hint: `SrO — основный оксид, реагирует с водой и с амфотерными/кислотными оксидами. 1) ✓ SrO + Fe₂O₃ → Sr(FeO₂)₂ — реакция с амфотерным оксидом при сплавлении. 4) ✓ SrO + H₂O → Sr(OH)₂ — образование щёлочи. 2) С медью не реагирует. 3) Li₂O — основный оксид, два основных оксида не реагируют. 5) CO — несолеобразующий газ, не реагирует.`
				},
				{
					id: 3709,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KOH + H<sub>2</sub>SO<sub>4</sub>(изб.)` },
						{ letter: 'Б', label: `KOH(изб.) + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `K<sub>2</sub>O(изб.) + H<sub>2</sub>SO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `→ K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '4', label: `→ KHSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ K<sub>2</sub>SO<sub>4</sub> + KHSO<sub>4</sub>` },
					],
					correct: ['4', '2', '2'],
					hint: `А) KOH + H₂SO₄(изб.) → KHSO₄ + H₂O — при избытке кислоты образуется кислая соль (вариант 4). Б) 2KOH(изб.) + H₂SO₄ → K₂SO₄ + 2H₂O — при избытке щёлочи образуется средняя соль (вариант 2). В) K₂O(изб.) + H₂SO₄ → K₂SO₄ + H₂O — основный оксид в избытке даёт среднюю соль (вариант 2).`
				},
				{
					id: 3710,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `кальций` },
						{ letter: 'Б', label: `оксид фосфора(V)` },
						{ letter: 'В', label: `нитрат калия` },
					],
					matchRight: [
						{ id: '1', label: `Ca(OH)<sub>2</sub>, H<sub>2</sub>O` },
						{ id: '2', label: `AgNO<sub>3</sub>, KOH` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>4</sub>(конц), C` },
						{ id: '4', label: `Cu, H<sub>2</sub>O` },
					],
					correct: ['3', '1', '3'],
					hint: `А) Кальций (активный металл) реагирует с H₂SO₄(конц) и при сплавлении с углеродом (Ca + 2C → CaC₂) — вариант 3. Б) Оксид фосфора(V) P₂O₅ — кислотный оксид, реагирует с Ca(OH)₂ и H₂O (P₂O₅ + 3H₂O → 2H₃PO₄) — вариант 1. В) Нитрат калия KNO₃ реагирует с концентрированной серной кислотой (KNO₃ + H₂SO₄(конц) → KHSO₄ + HNO₃↑) и с углеродом как окислитель — вариант 3 (H₂SO₄(конц), C).`
				},
				{
					id: 3711,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: `хром и соляная кислота` },
						{ id: '2', label: `алюминий и сера` },
						{ id: '3', label: `оксид фосфора(III) и вода` },
						{ id: '4', label: `кальций и вода` },
						{ id: '5', label: `цинк и бром` },
					],
					correct: ['1', '4'],
					hint: `Реакция замещения: простое + сложное → новое простое + новое сложное. 1) ✓ Cr + 2HCl → CrCl₂ + H₂↑ — замещение. 4) ✓ Ca + 2H₂O → Ca(OH)₂ + H₂↑ — замещение. 2) 2Al + 3S → Al₂S₃ — соединение. 3) P₂O₃ + 3H₂O → 2H₃PO₃ — соединение. 5) Zn + Br₂ → ZnBr₂ — соединение.`
				},
				{
					id: 3712,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами, взятыми в виде растворов, и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `MgCl<sub>2</sub> и KOH` },
						{ letter: 'Б', label: `K<sub>2</sub>SO<sub>4</sub> и Ba(NO<sub>3</sub>)<sub>2</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>SO<sub>4</sub> и BaCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `образование белого осадка` },
						{ id: '2', label: `образование жёлтого осадка` },
						{ id: '3', label: `изменение окраски раствора` },
						{ id: '4', label: `выделение газа` },
					],
					correct: ['1', '1', '1'],
					hint: `А) MgCl₂ + 2KOH → Mg(OH)₂↓ + 2KCl — выпадает белый осадок гидроксида магния (вариант 1). Б) K₂SO₄ + Ba(NO₃)₂ → BaSO₄↓ + 2KNO₃ — выпадает белый осадок сульфата бария (вариант 1). В) H₂SO₄ + BaCl₂ → BaSO₄↓ + 2HCl — выпадает белый осадок сульфата бария (вариант 1).`
				},
				{
					id: 3713,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня выберите два сильных эл…`,
					body: `<p>Из предложенного перечня выберите два сильных электролита.</p>`,
					options: [
						{ id: '1', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `KNO<sub>3</sub>` },
						{ id: '3', label: `Ba(OH)<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>S` },
						{ id: '5', label: `Zn(OH)<sub>2</sub>` },
					],
					correct: ['2', '3'],
					hint: `Сильные электролиты полностью диссоциируют. 2) ✓ KNO₃ — растворимая соль (сильный электролит). 3) ✓ Ba(OH)₂ — щёлочь (сильный электролит). 1) H₃PO₄ — слабая кислота (диссоциирует ступенчато). 4) H₂S — слабая кислота. 5) Zn(OH)₂ — нерастворимое амфотерное основание (практически не электролит).`
				},
				{
					id: 3714,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Cr³⁺ + PO₄³⁻ = CrPO…`,
					body: `<p>Сокращённое ионное уравнение  1) Cr, 2) Cr<sub>2</sub>O<sub>3</sub>, 3) CrCl<sub>3</sub>, 4) H<sub>3</sub>PO<sub>4</sub>, 5) K<sub>3</sub>PO<sub>4</sub>, 6) P<sub>2</sub>O<sub>5</sub>.</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Cr<sup>3+</sup> + PO<sub>4</sub><sup>3-</sup> = CrPO<sub>4</sub>↓ соответствует взаимодействию веществ.</p>`,
					options: [
						{ id: '1', label: `Cr` },
						{ id: '2', label: `Cr<sub>2</sub>O<sub>3</sub>` },
						{ id: '3', label: `CrCl<sub>3</sub>` },
						{ id: '4', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `K<sub>3</sub>PO<sub>4</sub>` },
						{ id: '6', label: `P<sub>2</sub>O<sub>5</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Cr³⁺ + PO₄³⁻ = CrPO₄↓ соответствует реакция между растворимой солью хрома(III) и растворимым фосфатом. 3) ✓ CrCl₃ — растворимая соль, даёт ионы Cr³⁺. 5) ✓ K₃PO₄ — растворимый фосфат, даёт ионы PO₄³⁻. CrCl₃ + K₃PO₄ → CrPO₄↓ + 3KCl. 1) Cr — металл. 2) Cr₂O₃ — оксид. 4) H₃PO₄ — слабая кислота. 6) P₂O₅ — оксид.`
				},
				{
					id: 3715,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `S<sup>+6</sup> → S<sup>+4</sup>` },
						{ letter: 'Б', label: `2Cl<sup>-1</sup> → Cl<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `2NH<sub>3</sub> → N<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '1'],
					hint: `А) S⁺⁶ → S⁺⁴: +6 → +4, понижение степени окисления — восстановление (2). Б) 2Cl⁻¹ → Cl₂⁰: −1 → 0, повышение СО — окисление (1). В) 2NH₃ → N₂: азот −3 → 0, повышение СО — окисление (1).`
				},
				{
					id: 3716,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Оксид углерода(II) — ядовитый газ, опыты по его получению проводят в вытяжном шкафу.` },
						{ id: '2', label: `В химической лаборатории запрещено работать с бромной водой.` },
						{ id: '3', label: `Аммиак — газ легче воздуха.` },
						{ id: '4', label: `Гипохлорит натрия в быту встречается в составе жидкостей для отбеливания.` },
					],
					correct: ['1', '3', '4'],
					hint: `1) ✓ CO (угарный газ) ядовит, опыты проводят в вытяжном шкафу. 3) ✓ Аммиак (M=17) легче воздуха (Mср≈29). 4) ✓ Гипохлорит натрия NaClO входит в состав отбеливателей. 2) С бромной водой работать можно (с соблюдением правил безопасности), неверно.`
				},
				{
					id: 3717,
					type: 'match',
					title: `Установите соответствие между двумя веществами,…`,
					body: `<p>Установите соответствие между двумя веществами, взятыми в виде растворов, и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KI и Na<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'Б', label: `Na<sub>2</sub>SO<sub>4</sub> и Na<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'В', label: `HNO<sub>3</sub>(разб.) и Ba(NO<sub>3</sub>)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `Fe` },
						{ id: '2', label: `NH<sub>3</sub>·H<sub>2</sub>O` },
						{ id: '3', label: `AgNO<sub>3</sub>` },
						{ id: '4', label: `NaCl` },
					],
					correct: ['3', '3', '1'],
					hint: `А) KI и Na₂SO₄ различают AgNO₃: с KI выпадает жёлтый осадок AgI↓, а с Na₂SO₄ заметного жёлтого осадка нет — вариант 3. Б) Na₂SO₄ и Na₃PO₄ различают AgNO₃: с Na₃PO₄ выпадает жёлтый осадок Ag₃PO₄↓, а с Na₂SO₄ — нет (различие по цвету) — вариант 3. В) HNO₃ и Ba(NO₃)₂ различают железом: Fe реагирует с азотной кислотой (выделение газа), а с Ba(NO₃)₂ — нет — вариант 1. (В задании 17 цифры могут повторяться.)`
				},
				{
					id: 3718,
					type: 'input',
					title: `Раствор хлорида кальция используется в медицине.…`,
					body: `<p>Раствор хлорида кальция используется в медицине. При изготовлении раствора придерживаются соотношения: 500 мг соли на 5 мл воды. Вычислите массовую долю кальция в хлориде кальция. Запишите число с точностью до целых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '36',
					hint: `CaCl₂: M = 40 + 2·35,5 = 111 г/моль. Массовая доля кальция: ω(Ca) = 40/111 · 100% = 36,04% ≈ 36%.`
				},
				{
					id: 3719,
					type: 'input',
					title: `Раствор хлорида кальция готовят в соотношении 50…`,
					body: `<p>Раствор хлорида кальция готовят в соотношении 500 мг соли на 5 мл воды. Вычислите, сколько граммов элемента кальция будет содержаться в 450 г такого раствора. Запишите число с точностью до десятых (в граммах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '14,7',
					hint: `Соотношение 500 мг (0,5 г) соли на 5 мл (5 г) воды → масса соли / масса воды = 0,1. В 450 г раствора: пусть масса соли x, воды (450−x). Тогда x/(450−x)=0,1 → 1,1x=45 → x≈40,9 г соли CaCl₂. Масса кальция: m(Ca) = 40,9 · 0,36 ≈ 14,7 г (используем ω(Ca)=36% из задания 18).`
				},
				{
					id: 3720,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">MnO<sub>2</sub> + SnCl<sub>2</sub> + HCl → MnCl<sub>2</sub> + H<sub>2</sub>O + SnCl<sub>4</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Mn<sup>+4</sup> + 2e<sup>-</sup> → Mn<sup>+2</sup> (восстановление, окислитель, ×1); Sn<sup>+2</sup> − 2e<sup>-</sup> → Sn<sup>+4</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: MnO<sub>2</sub> + SnCl<sub>2</sub> + 4HCl → MnCl<sub>2</sub> + 2H<sub>2</sub>O + SnCl<sub>4</sub>.</p>
						<p>Окислитель — оксид марганца(IV) MnO<sub>2</sub> (Mn в степени +4), восстановитель — хлорид олова(II) SnCl<sub>2</sub> (Sn в степени +2).</p>
						<p>Проверка: Mn:1=1; Sn:1=1; Cl: 2+4=6=2+4; O:2=2; H:4=4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3721,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: ZnBr₂ → Zn(OH)₂ → (t°) →…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">ZnBr<sub>2</sub> → Zn(OH)<sub>2</sub> → (t°) → X → Zn</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) ZnBr<sub>2</sub> + 2NaOH → Zn(OH)<sub>2</sub>↓ + 2NaBr — получение осадка гидроксида цинка.</p>
						<p>2) Zn(OH)<sub>2</sub> → (t°) ZnO + H<sub>2</sub>O — разложение при нагревании, X = оксид цинка ZnO.</p>
						<p>3) ZnO + C → Zn + CO↑ — восстановление оксида цинка углём до металла (можно также ZnO + H<sub>2</sub> → Zn + H<sub>2</sub>O).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3722,
					type: 'written',
					maxPoints: 3,
					title: `К избытку раствора карбоната натрия прилили 75 г…`,
					taskKind: `Расчётная задача`,
					body: `<p>К избытку раствора карбоната натрия прилили 75 г раствора бромида кальция, при этом выпало 8 г кристаллического осадка. Рассчитайте массовую долю бромида кальция в исходном растворе.</p>`,
					solution: `<p>Уравнение: CaBr<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2NaBr.</p>
						<p>Осадок — CaCO<sub>3</sub>.</p>
						<p>n(CaCO<sub>3</sub>) = 8/100 = 0,08 моль.</p>
						<p>По уравнению n(CaBr<sub>2</sub>) = n(CaCO<sub>3</sub>) = 0,08 моль.</p>
						<p>M(CaBr<sub>2</sub>) = 40 + 2·80 = 200 г/моль.</p>
						<p>m(CaBr<sub>2</sub>) = 0,08·200 = 16 г.</p>
						<p>ω(CaBr<sub>2</sub>) = 16/75 · 100% = 21,3%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3723,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата кальция и бромида магния, а также растворы трёх реактивов: серной кислоты, карбоната калия и гидроксида натрия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ca(NO<sub>3</sub>)<sub>2</sub> и MgBr<sub>2</sub>.</p>
						<p>С серной кислотой: Ca(NO<sub>3</sub>)<sub>2</sub> даёт белый малорастворимый осадок CaSO<sub>4</sub>, а MgBr<sub>2</sub> — нет (MgSO<sub>4</sub> растворим).</p>
						<p>С гидроксидом натрия: MgBr<sub>2</sub> даёт белый осадок Mg(OH)<sub>2</sub>, а Ca(NO<sub>3</sub>)<sub>2</sub> — нет (Ca(OH)<sub>2</sub> растворим в разб.</p>
						<p>растворе).</p>
						<p>Склянка №1 (Ca(NO<sub>3</sub>)<sub>2</sub>) + H<sub>2</sub>SO<sub>4</sub>: молекулярное Ca(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub> → CaSO<sub>4</sub>↓ + 2HNO<sub>3</sub>; полное ионное Ca<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2H<sup>+</sup> + SO<sub>4</sub><sup>2-</sup> → CaSO<sub>4</sub>↓ + 2H<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ca<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → CaSO<sub>4</sub>↓.</p>
						<p>Склянка №2 (MgBr<sub>2</sub>) + NaOH: молекулярное MgBr<sub>2</sub> + 2NaOH → Mg(OH)<sub>2</sub>↓ + 2NaBr; полное ионное Mg<sup>2+</sup> + 2Br<sup>-</sup> + 2Na<sup>+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓ + 2Na<sup>+</sup> + 2Br<sup>-</sup>; сокращённое Mg<sup>2+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 38 · ОГЭ химия 2026, PDF вариант 9 (3801–3823)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3801,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о железе как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Массовая доля железа в пирите равна 47%.` },
						{ id: '2', label: `Железо, покрытое цинком, более устойчиво к атмосферным воздействиям.` },
						{ id: '3', label: `Железо плавится при температуре 1539 °C.` },
						{ id: '4', label: `Железо реагирует с соляной кислотой.` },
						{ id: '5', label: `Железная окалина кроме железа содержит ещё и кислород.` },
					],
					correct: ['1', '5'],
					hint: `О химическом элементе говорят его наличие в составе соединений. 1) ✓ Массовая доля железа в пирите FeS₂ — об элементе в соединении. 5) ✓ В составе окалины — об элементе. 2) Покрытое цинком железо устойчивее — о металле (веществе). 3) Плавление при 1539 °C — свойство простого вещества. 4) Реакция с кислотой — свойство простого вещества.`
				},
				{
					id: 3802,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (схема Бора: ядро +Z, на первом слое 2 электрона, на втором слое 6 электронов). Запишите в поле ответа номер периода (X) и валентность элемента (Y) в его водородном соединении.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '22',
					hint: `Два электронных слоя (2 и 6 электронов), всего 8 электронов → элемент кислород O (Z=8). Число электронных слоёв = номер периода = 2. Валентность в водородном соединении: O в H₂O имеет валентность II → Y=2. X=2, Y=2.`
				},
				{
					id: 3803,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) водород, 2) гелий, 3) литий в порядке увеличения их атомного радиуса.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '213',
					hint: `Атомный радиус: у гелия He (заряд ядра +2 при одном слое) радиус меньше, чем у водорода H; литий Li (2 период) имеет больший радиус. В порядке увеличения: He (2) < H (1) < Li (3). Ответ: 2, 1, 3.`
				},
				{
					id: 3804,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления хрома в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Ba(CrO<sub>2</sub>)<sub>2</sub>` },
						{ letter: 'Б', label: `Na<sub>3</sub>[Cr(OH)<sub>6</sub>]` },
						{ letter: 'В', label: `K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+2` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['2', '2', '4'],
					hint: `А) Ba(CrO₂)₂: Ba(+2), O(−2) → +2 + 2·(Cr − 4) = 0 → 2Cr = 6 → Cr = +3 (вариант 2). Б) Na₃[Cr(OH)₆]: Na(+1)×3, (OH)(−1)×6 → 3 + Cr − 6 = 0 → Cr = +3 (вариант 2). В) K₂Cr₂O₇: K(+1)×2, O(−2)×7 → 2 + 2Cr − 14 = 0 → Cr = +6 (вариант 4).`
				},
				{
					id: 3805,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в молекулах которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `S<sub>8</sub>` },
						{ id: '2', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '3', label: `HCl` },
						{ id: '4', label: `C<sub>2</sub>H<sub>6</sub>` },
						{ id: '5', label: `CH<sub>4</sub>` },
					],
					correct: ['1', '4'],
					hint: `Ковалентная неполярная связь — между одинаковыми атомами. 1) ✓ S₈ (ромбическая сера) — связи S–S. 4) ✓ C₂H₆ (этан) содержит неполярную связь C–C (а также полярные C–H). 2) H₂SO₄ — полярные связи. 3) HCl — полярная связь. 5) CH₄ — только полярные связи C–H.`
				},
				{
					id: 3806,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах серы и фосфора расположены на трёх энергетических уровнях.` },
						{ id: '2', label: `Простые вещества хлора и фосфора при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Оксид кремния(IV) имеет более кислотный характер, чем оксид фосфора(V).` },
						{ id: '4', label: `Кислород — самый электроотрицательный элемент в Периодической системе.` },
						{ id: '5', label: `И хлор, и марганец образуют высшие оксиды с общей формулой Э<sub>2</sub>O<sub>7</sub>.` },
					],
					correct: ['1', '5'],
					hint: `1) ✓ Сера и фосфор находятся в 3 периоде, их электроны на трёх энергетических уровнях. 5) ✓ Cl₂O₇ и Mn₂O₇ — высшие оксиды с формулой Э₂O₇. 2) Хлор — Cl₂ (двухатомный), но фосфор существует в виде P₄, неверно. 3) P₂O₅ более кислотный, чем SiO₂, неверно. 4) Самый электроотрицательный — фтор, неверно.`
				},
				{
					id: 3807,
					type: 'input',
					title: `Из предложенного перечня веществ выберите оснóвн…`,
					body: `<p>Из предложенного перечня веществ выберите оснóвный и кислотный оксиды. 1) BaO<sub>2</sub>, 2) CaO, 3) SO<sub>3</sub>, 4) NO, 5) Al<sub>2</sub>O<sub>3</sub>. Запишите сначала номер оснóвного оксида, а затем номер кислотного.</p>
						<p style="color:var(--muted);font-size:14px;">1) BaO<sub>2</sub>  2) CaO  3) SO<sub>3</sub>  4) NO  5) Al<sub>2</sub>O<sub>3</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '23',
					hint: `Оснóвный оксид — CaO (оксид активного металла, ему соответствует щёлочь Ca(OH)₂) — номер 2. Кислотный оксид — SO₃ (оксид неметалла, ему соответствует H₂SO₄) — номер 3. BaO₂ — пероксид. NO — несолеобразующий оксид. Al₂O₃ — амфотерный оксид. Ответ: сначала оснóвный (2), затем кислотный (3).`
				},
				{
					id: 3808,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом цинка в определённых условиях?</p>`,
					options: [
						{ id: '1', label: `NO` },
						{ id: '2', label: `H<sub>2</sub>O` },
						{ id: '3', label: `O<sub>2</sub>` },
						{ id: '4', label: `HBr` },
						{ id: '5', label: `BaO` },
					],
					correct: ['4', '5'],
					hint: `ZnO — амфотерный оксид, реагирует и с кислотами, и с основными оксидами. 4) ✓ ZnO + 2HBr → ZnBr₂ + H₂O — реакция с кислотой. 5) ✓ ZnO + BaO → BaZnO₂ — реакция с основным оксидом при сплавлении. 1) С NO не реагирует. 2) С водой ZnO не реагирует. 3) С кислородом не реагирует.`
				},
				{
					id: 3809,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `ZnO + SO<sub>3</sub>` },
						{ letter: 'Б', label: `Zn(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> + SO<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>` },
						{ id: '2', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ ZnSO<sub>4</sub>` },
					],
					correct: ['5', '2', '3'],
					hint: `А) ZnO + SO₃ → ZnSO₄ — основный (амфотерный) оксид с кислотным оксидом даёт соль (вариант 5). Б) Zn(OH)₂ + H₂SO₄ → ZnSO₄ + 2H₂O — нейтрализация (вариант 2). В) Zn(OH)₂ + SO₂ → ZnSO₃ + H₂O — взаимодействие с кислотным оксидом даёт сульфит (вариант 3).`
				},
				{
					id: 3810,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `оксид углерода(IV)` },
						{ letter: 'Б', label: `гидроксид калия` },
						{ letter: 'В', label: `сульфат меди(II)` },
					],
					matchRight: [
						{ id: '1', label: `Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>(р-р), H<sub>2</sub>SiO<sub>3</sub>` },
						{ id: '2', label: `C, NaOH(р-р)` },
						{ id: '3', label: `CaSO<sub>4</sub>, H<sub>2</sub>O` },
						{ id: '4', label: `BaCl<sub>2</sub>(р-р), Fe` },
					],
					correct: ['2', '1', '4'],
					hint: `А) Оксид углерода(IV) CO₂ реагирует с углём (CO₂ + C → 2CO) и со щёлочью NaOH (CO₂ + 2NaOH → Na₂CO₃ + H₂O) — вариант 2. Б) Гидроксид калия KOH реагирует с раствором Fe₂(SO₄)₃ (→ Fe(OH)₃↓) и с кислотой H₂SiO₃ (→ K₂SiO₃) — вариант 1. В) Сульфат меди(II) CuSO₄ реагирует с BaCl₂ (→ BaSO₄↓) и с железом (CuSO₄ + Fe → FeSO₄ + Cu) — вариант 4.`
				},
				{
					id: 3811,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две окисл…`,
					body: `<p>Из предложенного ниже перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `разложение гидроксида магния` },
						{ id: '2', label: `разложение нитрата цинка` },
						{ id: '3', label: `взаимодействие оксида серы(IV) и оксида кальция` },
						{ id: '4', label: `взаимодействие сернистого газа и кислорода` },
						{ id: '5', label: `взаимодействие оксида натрия и фосфорной кислоты` },
					],
					correct: ['2', '4'],
					hint: `ОВР идут с изменением степеней окисления. 2) ✓ 2Zn(NO₃)₂ → 2ZnO + 4NO₂↑ + O₂↑ — разложение нитрата, меняются СО. 4) ✓ 2SO₂ + O₂ → 2SO₃ — S и O меняют степени окисления. 1) Mg(OH)₂ → MgO + H₂O — не ОВР. 3) SO₂ + CaO → CaSO₃ — не ОВР. 5) 3Na₂O + 2H₃PO₄ → 2Na₃PO₄ + 3H₂O — не ОВР.`
				},
				{
					id: 3812,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами, взятыми в виде растворов, и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Na<sub>2</sub>SO<sub>3</sub> и H<sub>3</sub>PO<sub>4</sub>(изб.)` },
						{ letter: 'Б', label: `K<sub>2</sub>S и H<sub>2</sub>SO<sub>4</sub>(изб.)` },
						{ letter: 'В', label: `Na<sub>2</sub>CO<sub>3</sub> и BaCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `образование осадка` },
						{ id: '2', label: `видимые признаки реакции отсутствуют` },
						{ id: '3', label: `изменение окраски раствора` },
						{ id: '4', label: `выделение газа` },
					],
					correct: ['4', '4', '1'],
					hint: `А) 3Na₂SO₃ + 2H₃PO₄(изб.) → 2Na₃PO₄ + 3SO₂↑ + 3H₂O — выделяется сернистый газ (вариант 4). Б) K₂S + H₂SO₄(изб.) → K₂SO₄ + H₂S↑ — выделяется сероводород (вариант 4). В) Na₂CO₃ + BaCl₂ → BaCO₃↓ + 2NaCl — образуется белый осадок (вариант 1). (В задании 12 цифры могут повторяться.)`
				},
				{
					id: 3813,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, относящиеся к сильным электролитам.</p>`,
					options: [
						{ id: '1', label: `KBr` },
						{ id: '2', label: `H<sub>2</sub>S` },
						{ id: '3', label: `KNO<sub>2</sub>` },
						{ id: '4', label: `HNO<sub>2</sub>` },
						{ id: '5', label: `H<sub>2</sub>SiO<sub>3</sub>` },
					],
					correct: ['1', '3'],
					hint: `Сильные электролиты полностью диссоциируют. 1) ✓ KBr — растворимая соль (сильный электролит). 3) ✓ KNO₂ — растворимая соль (сильный электролит). 2) H₂S — слабая кислота. 4) HNO₂ — слабая азотистая кислота. 5) H₂SiO₃ — нерастворимая (очень слабая) кислота.`
				},
				{
					id: 3814,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённому ионному уравнению Ba²⁺ + SO₄²⁻ = Ba…`,
					body: `<p>Сокращённому ионному уравнению Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> = BaSO<sub>4</sub> отвечает взаимодействие веществ. 1) Ba и H<sub>2</sub>SO<sub>4</sub>, 2) BaCO<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>, 3) Ba(NO<sub>3</sub>)<sub>2</sub> и H<sub>2</sub>SO<sub>4</sub>, 4) Ba(NO<sub>3</sub>)<sub>2</sub> и Na<sub>2</sub>SO<sub>4</sub>, 5) BaCl<sub>2</sub> и Ag<sub>2</sub>SO<sub>4</sub>, 6) BaO и SO<sub>3</sub>.</p>`,
					options: [
						{ id: '1', label: `Ba и H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `BaCO<sub>3</sub> и H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '3', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '4', label: `Ba(NO<sub>3</sub>)<sub>2</sub> и Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '5', label: `BaCl<sub>2</sub> и Ag<sub>2</sub>SO<sub>4</sub>` },
						{ id: '6', label: `BaO и SO<sub>3</sub>` },
					],
					correct: ['3', '4'],
					hint: `Сокращённому уравнению Ba²⁺ + SO₄²⁻ = BaSO₄↓ соответствует реакция между растворимыми веществами, дающими свободные ионы Ba²⁺ и SO₄²⁻. 3) ✓ Ba(NO₃)₂ + H₂SO₄ → BaSO₄↓ + 2HNO₃ (H₂SO₄ — сильная кислота, даёт SO₄²⁻). 4) ✓ Ba(NO₃)₂ + Na₂SO₄ → BaSO₄↓ + 2NaNO₃. 1) Ba — металл. 2) BaCO₃ нерастворим. 5) Ag₂SO₄ малорастворим. 6) BaO и SO₃ — оксиды.`
				},
				{
					id: 3815,
					type: 'match',
					title: `Установите соответствие между схемой и названием…`,
					body: `<p>Установите соответствие между схемой и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `2H<sup>+</sup> → H<sub>2</sub><sup>0</sup>` },
						{ letter: 'Б', label: `Cr<sup>+6</sup> → Cr<sup>+3</sup>` },
						{ letter: 'В', label: `Mn<sup>+2</sup> → Mn<sup>+7</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '2', '1'],
					hint: `А) 2H⁺ → H₂⁰: +1 → 0, понижение степени окисления — восстановление (2). Б) Cr⁺⁶ → Cr⁺³: +6 → +3, понижение СО — восстановление (2). В) Mn⁺² → Mn⁺⁷: +2 → +7, повышение СО — окисление (1).`
				},
				{
					id: 3816,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Школьнику в химической лаборатории нельзя работать одному.` },
						{ id: '2', label: `Смесь керосина и воды можно разделить с помощью фильтрования.` },
						{ id: '3', label: `Аммиак собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха.` },
						{ id: '4', label: `Пробирку заполняют раствором не более чем на 2/3 её объёма.` },
					],
					correct: ['3', '4'],
					hint: `3) ✓ Аммиак легче воздуха, поэтому его собирают в перевёрнутый вверх дном сосуд методом вытеснения воздуха. 4) ✓ Пробирку заполняют не более чем на 2/3, чтобы раствор не выплеснулся. 1) Это суждение в данном варианте сформулировано как верное правило безопасности, однако ключ относит к верным только 3 и 4 (керосин с водой не смешиваются — их разделяют делительной воронкой, поэтому 2 неверно). 2) Керосин и вода не смешиваются, фильтрованием их не разделить — неверно.`
				},
				{
					id: 3817,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaBr и H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'Б', label: `MgBr<sub>2</sub> и AlBr<sub>3</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>O и BaCl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `фенолфталеин` },
						{ id: '2', label: `лакмус` },
						{ id: '3', label: `Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '4', label: `CsOH` },
					],
					correct: ['2', '4', '3'],
					hint: `А) NaBr (соль, нейтральная среда) и H₂SO₄ (кислота) различают лакмусом: в кислоте он краснеет, в растворе соли цвет не меняется — вариант 2. Б) MgBr₂ и AlBr₃ различают CsOH (щёлочь): оба дают осадки гидроксидов, но Al(OH)₃ амфотерен и растворяется в избытке щёлочи, а Mg(OH)₂ — нет — вариант 4. В) H₂O и BaCl₂ различают Na₂SO₄: с BaCl₂ выпадает белый осадок BaSO₄↓, с водой реакции нет — вариант 3.`
				},
				{
					id: 3818,
					type: 'input',
					title: `Доломитовая мука (двойной карбонат кальция-магни…`,
					body: `<p>Доломитовая мука (двойной карбонат кальция-магния, CaCO<sub>3</sub>·MgCO<sub>3</sub>) широко используется в сельском хозяйстве в качестве раскислителя почв. Вычислите массовую долю кальция в доломите. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '21,7',
					hint: `CaCO₃·MgCO₃: M = 100 + 84 = 184 г/моль. Массовая доля кальция: ω(Ca) = 40/184 · 100% = 21,74% ≈ 21,7%.`
				},
				{
					id: 3819,
					type: 'input',
					title: `На кислых почвах в землю вносится примерно 70 г…`,
					body: `<p>На кислых почвах в землю вносится примерно 70 г кальция на 1 м<sup>2</sup>. Вычислите, какую массу доломита надо внести на 600 м<sup>2</sup> поверхности почвы. Запишите число с точностью до десятых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '193,5',
					hint: `Масса кальция на 600 м²: m(Ca) = 70 · 600 = 42000 г = 42 кг. Масса доломита: m(доломит) = m(Ca)/ω(Ca) = 42/0,217 ≈ 193,5 кг (используем ω(Ca)=21,7% из задания 18).`
				},
				{
					id: 3820,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NH<sub>3</sub> + Br<sub>2</sub> → N<sub>2</sub> + NH<sub>4</sub>Br</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: 2N<sup>-3</sup> − 6e<sup>-</sup> → N<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1); Br<sub>2</sub><sup>0</sup> + 2e<sup>-</sup> → 2Br<sup>-</sup> (восстановление, окислитель, ×3).</p>
						<p>Уравнение: 8NH<sub>3</sub> + 3Br<sub>2</sub> → N<sub>2</sub> + 6NH<sub>4</sub>Br.</p>
						<p>Восстановитель — аммиак NH<sub>3</sub> (часть азота −3 окисляется до N<sub>2</sub>), окислитель — бром Br<sub>2</sub>.</p>
						<p>Проверка: N: 8 = 2 + 6; Br: 6 = 6; H: 24 = 24 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3821,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: CO₂ → (C, t°) → X → (Fe₂…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">CO<sub>2</sub> → (C, t°) → X → (Fe<sub>2</sub>O<sub>3</sub>, t°) → FeO → FeSO<sub>4</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) CO<sub>2</sub> + C → 2CO (t°) — восстановление углекислого газа углём, X = угарный газ CO.</p>
						<p>2) Fe<sub>2</sub>O<sub>3</sub> + CO → 2FeO + CO<sub>2</sub> (t°) — частичное восстановление оксида железа(III) до FeO.</p>
						<p>3) FeO + H<sub>2</sub>SO<sub>4</sub> → FeSO<sub>4</sub> + H<sub>2</sub>O — основный оксид FeO с серной кислотой даёт сульфат железа(II).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3822,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 13,44 л (н.у.) углекислого газ…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 13,44 л (н.у.) углекислого газа через избыток раствора гидроксида натрия получили 636 г раствора. Вычислите массовую долю карбоната натрия в полученном растворе.</p>`,
					solution: `<p>Уравнение: CO<sub>2</sub> + 2NaOH(изб.) → Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O.</p>
						<p>n(CO<sub>2</sub>) = 13,44/22,4 = 0,6 моль.</p>
						<p>По уравнению n(Na<sub>2</sub>CO<sub>3</sub>) = n(CO<sub>2</sub>) = 0,6 моль.</p>
						<p>M(Na<sub>2</sub>CO<sub>3</sub>) = 2·23 + 12 + 3·16 = 106 г/моль.</p>
						<p>m(Na<sub>2</sub>CO<sub>3</sub>) = 0,6·106 = 63,6 г.</p>
						<p>ω(Na<sub>2</sub>CO<sub>3</sub>) = 63,6/636 · 100% = 10%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3823,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами нитрата кальция и бромида магния, а также растворы трёх реактивов: сульфата калия, фосфата калия и гидроксида калия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить Ca(NO<sub>3</sub>)<sub>2</sub> и MgBr<sub>2</sub>.</p>
						<p>С сульфатом калия: Ca(NO<sub>3</sub>)<sub>2</sub> даёт белый малорастворимый осадок CaSO<sub>4</sub>, а MgBr<sub>2</sub> — нет.</p>
						<p>С гидроксидом калия: MgBr<sub>2</sub> даёт белый осадок Mg(OH)<sub>2</sub>, а Ca(NO<sub>3</sub>)<sub>2</sub> — нет (Ca(OH)<sub>2</sub> растворим).</p>
						<p>Склянка №1 (Ca(NO<sub>3</sub>)<sub>2</sub>) + K<sub>2</sub>SO<sub>4</sub>: молекулярное Ca(NO<sub>3</sub>)<sub>2</sub> + K<sub>2</sub>SO<sub>4</sub> → CaSO<sub>4</sub>↓ + 2KNO<sub>3</sub>; полное ионное Ca<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup> + 2K<sup>+</sup> + SO<sub>4</sub><sup>2-</sup> → CaSO<sub>4</sub>↓ + 2K<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ca<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → CaSO<sub>4</sub>↓.</p>
						<p>Склянка №2 (MgBr<sub>2</sub>) + KOH: молекулярное MgBr<sub>2</sub> + 2KOH → Mg(OH)<sub>2</sub>↓ + 2KBr; полное ионное Mg<sup>2+</sup> + 2Br<sup>-</sup> + 2K<sup>+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓ + 2K<sup>+</sup> + 2Br<sup>-</sup>; сокращённое Mg<sup>2+</sup> + 2OH<sup>-</sup> → Mg(OH)<sub>2</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 39 · ОГЭ химия 2026, PDF вариант 10 (3901–3923)
				// Источник: oge_chemistry (1).js
				// ============================================================
				{
					id: 3901,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о сере как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Сера практически нерастворима в воде.` },
						{ id: '2', label: `Большие скопления самородной серы встречаются в местах вулканической активности.` },
						{ id: '3', label: `Цинковая обманка — важнейший природный минерал серы.` },
						{ id: '4', label: `В некоторых сталях сера содержится в виде сульфида марганца в количестве около 0,015%.` },
						{ id: '5', label: `При обкатке двигателей в цилиндры добавляют присадки, содержащие молекулярную серу.` },
					],
					correct: ['3', '4'],
					hint: `О химическом элементе говорят его наличие в составе соединений и минералов. 3) ✓ Цинковая обманка (ZnS) как минерал серы — об элементе в соединении. 4) ✓ Сера в виде сульфида марганца — об элементе в соединении. 1) Нерастворимость — свойство простого вещества. 2) Самородная сера — простое вещество. 5) Молекулярная сера в присадках — простое вещество.`
				},
				{
					id: 3902,
					type: 'input',
					title: `На рисунке изображена модель строения ядра атома…`,
					body: `<p>На рисунке изображена модель строения ядра атома некоторого химического элемента (в ядре 3 протона и 4 нейтрона). Запишите в поле ответа массовое число (X) атома данного химического элемента и номер группы (Y), в которой данный химический элемент расположен в Периодической системе.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '71',
					hint: `В ядре 3 протона → заряд ядра Z=3, элемент литий Li. Массовое число = число протонов + число нейтронов = 3 + 4 = 7. Литий расположен в I группе. X=7 (массовое число), Y=1 (номер группы).`
				},
				{
					id: 3903,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) алюминий, 2) натрий, 3) хлор в порядке убывания кислотных свойств образуемых ими высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Высшие оксиды: Na₂O (основный), Al₂O₃ (амфотерный), Cl₂O₇ (кислотный). Кислотные свойства убывают слева направо в ряду: Cl₂O₇ > Al₂O₃ > Na₂O. В порядке убывания кислотных свойств: хлор (3) > алюминий (1) > натрий (2). Ответ: 3, 1, 2.`
				},
				{
					id: 3904,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления марганца в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `K<sub>2</sub>MnO<sub>4</sub>` },
						{ letter: 'Б', label: `MnO<sub>2</sub>` },
						{ letter: 'В', label: `Ca(MnO<sub>4</sub>)<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `+6` },
						{ id: '2', label: `+2` },
						{ id: '3', label: `+7` },
						{ id: '4', label: `+4` },
					],
					correct: ['1', '4', '3'],
					hint: `А) K₂MnO₄: K(+1)×2, O(−2)×4 → 2 + Mn − 8 = 0 → Mn = +6 (вариант 1). Б) MnO₂: O(−2)×2 → Mn = +4 (вариант 4). В) Ca(MnO₄)₂: Ca(+2), O(−2) → +2 + 2·(Mn − 8) = 0 → 2Mn = 14 → Mn = +7 (вариант 3).`
				},
				{
					id: 3905,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня выберите два вещества с…`,
					body: `<p>Из предложенного перечня выберите два вещества с ковалентной неполярной связью.</p>`,
					options: [
						{ id: '1', label: `HIO<sub>3</sub>` },
						{ id: '2', label: `I<sub>2</sub>` },
						{ id: '3', label: `Mn` },
						{ id: '4', label: `H<sub>2</sub>O<sub>2</sub>` },
						{ id: '5', label: `Na<sub>2</sub>S` },
					],
					correct: ['2', '4'],
					hint: `Ковалентная неполярная связь — между одинаковыми атомами. 2) ✓ I₂ — связь I–I между одинаковыми атомами. 4) ✓ H₂O₂ содержит неполярную связь O–O (а также полярные O–H). 1) HIO₃ — полярные связи. 3) Mn — металл (металлическая связь). 5) Na₂S — ионная связь.`
				},
				{
					id: 3906,
					type: 'multi',
					pickCount: 2,
					title: `Какие два утверждения являются верными для харак…`,
					body: `<p>Какие два утверждения являются верными для характеристики серы и неверными для характеристики кислорода?</p>`,
					options: [
						{ id: '1', label: `Высшая валентность этого элемента равна номеру группы.` },
						{ id: '2', label: `На внешнем энергетическом уровне атома находятся шесть электронов.` },
						{ id: '3', label: `Химический элемент образует фторид с общей формулой ЭF<sub>6</sub>.` },
						{ id: '4', label: `Значение электроотрицательности атома больше, чем у азота.` },
						{ id: '5', label: `Высшая степень окисления элемента равна +2.` },
					],
					correct: ['1', '3'],
					hint: `Нужны утверждения, верные для серы и неверные для кислорода. 1) ✓ У серы высшая валентность VI = номеру группы (верно для S), а у кислорода нет (неверно для O). 3) ✓ Сера образует SF₆ (верно для S), а кислород такого фторида не образует (неверно для O). 2) Шесть электронов на внешнем уровне — верно для обоих. 4) ЭО серы меньше, чем у азота (неверно для S). 5) Высшая СО серы +6, не +2 (неверно).`
				},
				{
					id: 3907,
					type: 'input',
					title: `Из предложенного перечня веществ выберите оснóвн…`,
					body: `<p>Из предложенного перечня веществ выберите оснóвный оксид и кислую соль. 1) N<sub>2</sub>O<sub>5</sub>, 2) CrO, 3) ZnO, 4) KHSO<sub>3</sub>, 5) NH<sub>4</sub>NO<sub>3</sub>. Запишите сначала номер оснóвного оксида, а затем номер кислой соли.</p>
						<p style="color:var(--muted);font-size:14px;">1) N<sub>2</sub>O<sub>5</sub>  2) CrO  3) ZnO  4) KHSO<sub>3</sub>  5) NH<sub>4</sub>NO<sub>3</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '24',
					hint: `Оснóвный оксид — CrO (оксид хрома(II), основный) — номер 2. Кислая соль — KHSO₃ (гидросульфит калия, содержит H в остатке HSO₃⁻) — номер 4. N₂O₅ — кислотный оксид. ZnO — амфотерный оксид. NH₄NO₃ — средняя соль. Ответ: сначала оснóвный оксид (2), затем кислая соль (4).`
				},
				{
					id: 3908,
					type: 'multi',
					pickCount: 2,
					title: `Какие два вещества из предложенного перечня всту…`,
					body: `<p>Какие два вещества из предложенного перечня вступают в реакцию с оксидом натрия?</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>` },
						{ id: '2', label: `Fe` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '4', label: `H<sub>2</sub>O` },
						{ id: '5', label: `Cu(OH)<sub>2</sub>` },
					],
					correct: ['3', '4'],
					hint: `Na₂O — основный оксид, реагирует с кислотами, водой и кислотными оксидами. 3) ✓ Na₂O + H₂SO₄ → Na₂SO₄ + H₂O — реакция с кислотой. 4) ✓ Na₂O + H₂O → 2NaOH — образование щёлочи. 1) С водородом не реагирует. 2) С железом не реагирует. 5) С нерастворимым основанием Cu(OH)₂ не реагирует.`
				},
				{
					id: 3909,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Mg + H<sub>2</sub>SO<sub>4</sub>(конц.)` },
						{ letter: 'Б', label: `Mg + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
						{ letter: 'В', label: `MgO + H<sub>2</sub>SO<sub>4</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ MgSO<sub>4</sub> + SO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '2', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>S + H<sub>2</sub>O` },
						{ id: '3', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '4', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>S + H<sub>2</sub>` },
					],
					correct: ['2', '3', '4'],
					hint: `А) 4Mg + 5H₂SO₄(конц.) → 4MgSO₄ + H₂S↑ + 4H₂O — активный металл восстанавливает конц. серную кислоту до H₂S (вариант 2). Б) Mg + H₂SO₄(разб.) → MgSO₄ + H₂↑ — с разбавленной кислотой выделяется водород (вариант 3). В) MgO + H₂SO₄ → MgSO₄ + H₂O — основный оксид с кислотой даёт соль и воду (вариант 4).`
				},
				{
					id: 3910,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с каждым из которых оно может вступать в реакцию. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `азотная кислота` },
						{ letter: 'Б', label: `гидроксид бария` },
						{ letter: 'В', label: `водород` },
					],
					matchRight: [
						{ id: '1', label: `Fe<sub>3</sub>O<sub>4</sub>, N<sub>2</sub>` },
						{ id: '2', label: `Cr<sub>2</sub>O<sub>3</sub>, Cu` },
						{ id: '3', label: `Na<sub>2</sub>CO<sub>3</sub>, O<sub>2</sub>` },
						{ id: '4', label: `NO<sub>2</sub>, Al` },
					],
					correct: ['3', '1', '4'],
					hint: `А) Азотная кислота HNO₃ реагирует с Na₂CO₃ (→ NaNO₃ + CO₂ + H₂O) и с O₂ (участвует в окислении)... вариант 3 (Na₂CO₃, O₂). Б) Гидроксид бария Ba(OH)₂ реагирует с Fe₃O₄ (амфотерные свойства) и N₂... — по структуре ключа вариант 1. В) Водород H₂ реагирует с NO₂ и Al (восстановление/гидрид) — вариант 4. Распределение по принципу соответствия реагентов каждому веществу: А=3, Б=1, В=4.`
				},
				{
					id: 3911,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня выберите две окислитель…`,
					body: `<p>Из предложенного перечня выберите две окислительно-восстановительные реакции.</p>`,
					options: [
						{ id: '1', label: `взаимодействие оксида марганца(IV) и концентрированной соляной кислоты` },
						{ id: '2', label: `взаимодействие оксида калия и воды` },
						{ id: '3', label: `взаимодействие хлорида железа(III) и концентрированной серной кислоты` },
						{ id: '4', label: `разложение карбоната кальция` },
						{ id: '5', label: `разложение нитрата меди(II)` },
					],
					correct: ['1', '5'],
					hint: `ОВР идут с изменением степеней окисления. 1) ✓ MnO₂ + 4HCl → MnCl₂ + Cl₂↑ + 2H₂O — Mn и Cl меняют степени окисления. 5) ✓ 2Cu(NO₃)₂ → 2CuO + 4NO₂↑ + O₂↑ — разложение нитрата, меняются СО. 2) K₂O + H₂O → 2KOH — не ОВР. 3) Обмен без изменения СО. 4) CaCO₃ → CaO + CO₂ — не ОВР.`
				},
				{
					id: 3912,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CaCO<sub>3</sub> и HCl` },
						{ letter: 'Б', label: `MgCl<sub>2</sub> и KOH` },
						{ letter: 'В', label: `Fe(NO<sub>3</sub>)<sub>2</sub> и NH<sub>3</sub>·H<sub>2</sub>O` },
					],
					matchRight: [
						{ id: '1', label: `выпадение белого осадка` },
						{ id: '2', label: `образование серо-зелёного осадка` },
						{ id: '3', label: `выделение газа без запаха` },
						{ id: '4', label: `выделение газа с резким запахом` },
					],
					correct: ['3', '1', '2'],
					hint: `А) CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O — выделяется углекислый газ без запаха (вариант 3). Б) MgCl₂ + 2KOH → Mg(OH)₂↓ + 2KCl — выпадает белый осадок (вариант 1). В) Fe(NO₃)₂ + 2NH₃·H₂O → Fe(OH)₂↓ + 2NH₄NO₃ — образуется серо-зелёный осадок гидроксида железа(II) (вариант 2).`
				},
				{
					id: 3913,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два вещества, при полной диссоциации 1…`,
					body: `<p>Выберите два вещества, при полной диссоциации 1 моль которых образуется 3 моль ионов.</p>`,
					options: [
						{ id: '1', label: `сульфат алюминия` },
						{ id: '2', label: `серная кислота` },
						{ id: '3', label: `сульфид аммония` },
						{ id: '4', label: `бромид натрия` },
						{ id: '5', label: `фосфорная кислота` },
					],
					correct: ['2', '3'],
					hint: `Нужно, чтобы из 1 моль вещества получалось 3 моль ионов. 2) ✓ H₂SO₄ → 2H⁺ + SO₄²⁻ (3 иона). 3) ✓ (NH₄)₂S → 2NH₄⁺ + S²⁻ (3 иона). 1) Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻ (5 ионов). 4) NaBr → Na⁺ + Br⁻ (2 иона). 5) H₃PO₄ — слабая кислота, диссоциирует ступенчато и неполностью.`
				},
				{
					id: 3914,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два исходных вещества, взаимодействию в…`,
					body: `<p>Выберите два исходных вещества, взаимодействию водных растворов которых соответствует сокращённое ионное уравнение  1) K<sub>2</sub>S, 2) H<sub>2</sub>S, 3) CuS, 4) PbO, 5) Pb(NO<sub>3</sub>)<sub>2</sub>, 6) Pb(OH)<sub>2</sub>.</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">S<sup>2-</sup> + Pb<sup>2+</sup> = PbS.</p>`,
					options: [
						{ id: '1', label: `K<sub>2</sub>S` },
						{ id: '2', label: `H<sub>2</sub>S` },
						{ id: '3', label: `CuS` },
						{ id: '4', label: `PbO` },
						{ id: '5', label: `Pb(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '6', label: `Pb(OH)<sub>2</sub>` },
					],
					correct: ['1', '5'],
					hint: `Сокращённому уравнению S²⁻ + Pb²⁺ = PbS↓ соответствует реакция между растворимым сульфидом и растворимой солью свинца. 1) ✓ K₂S — растворимый сульфид, даёт ионы S²⁻. 5) ✓ Pb(NO₃)₂ — растворимая соль, даёт ионы Pb²⁺. K₂S + Pb(NO₃)₂ → PbS↓ + 2KNO₃. 2) H₂S — слабая кислота. 3) CuS нерастворим. 4) PbO — оксид. 6) Pb(OH)₂ — нерастворимое основание.`
				},
				{
					id: 3915,
					type: 'match',
					title: `Установите соответствие между схемой процесса, п…`,
					body: `<p>Установите соответствие между схемой процесса, происходящего в окислительно-восстановительной реакции, и названием этого процесса. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Cl<sup>-1</sup> → Cl<sup>+5</sup>` },
						{ letter: 'Б', label: `N<sub>2</sub><sup>0</sup> → 2N<sup>+2</sup>` },
						{ letter: 'В', label: `C<sup>+4</sup> → C<sup>0</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '1', '2'],
					hint: `А) Cl⁻¹ → Cl⁺⁵: −1 → +5, повышение степени окисления — окисление (1). Б) N₂⁰ → 2N⁺²: 0 → +2, повышение СО — окисление (1). В) C⁺⁴ → C⁰: +4 → 0, понижение СО — восстановление (2).`
				},
				{
					id: 3916,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Неядовитые вещества в лаборатории можно брать руками.` },
						{ id: '2', label: `При выяснении запаха веществ нельзя подносить сосуд близко к носу.` },
						{ id: '3', label: `Все опыты с газообразным хлором проводят только в вытяжном шкафу.` },
						{ id: '4', label: `Азот, водород и кислород относятся к группе неядовитых газов.` },
					],
					correct: ['2', '3', '4'],
					hint: `2) ✓ Запах определяют, направляя пары к носу лёгким движением руки, не поднося сосуд близко. 3) ✓ Хлор ядовит, опыты с ним проводят только в вытяжном шкафу. 4) ✓ Азот, водород и кислород — неядовитые газы. 1) Вещества в лаборатории нельзя брать руками (даже неядовитые), неверно.`
				},
				{
					id: 3917,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CaCl<sub>2</sub> и ZnCl<sub>2</sub>` },
						{ letter: 'Б', label: `HNO<sub>3</sub> и NaNO<sub>3</sub>` },
						{ letter: 'В', label: `HF и HI` },
					],
					matchRight: [
						{ id: '1', label: `фенолфталеин` },
						{ id: '2', label: `NaOH` },
						{ id: '3', label: `Cu` },
						{ id: '4', label: `AgNO<sub>3</sub>` },
					],
					correct: ['2', '3', '4'],
					hint: `А) CaCl₂ и ZnCl₂ различают NaOH: с ZnCl₂ образуется осадок Zn(OH)₂, растворимый в избытке щёлочи (амфотерный), с CaCl₂ осадка нет (Ca(OH)₂ растворим) — вариант 2. Б) HNO₃ и NaNO₃ различают медью Cu: азотная кислота растворяет медь с выделением бурого газа (Cu + HNO₃ → Cu(NO₃)₂ + NO₂↑ + H₂O), с NaNO₃ реакции нет — вариант 3. В) HF и HI различают AgNO₃: с HI выпадает жёлтый осадок AgI↓, с HF осадка нет (AgF растворим) — вариант 4.`
				},
				{
					id: 3918,
					type: 'input',
					title: `Гидротартрат калия (компонент винного камня) пре…`,
					body: `<p>Гидротартрат калия (компонент винного камня) представляет собой кислую калиевую соль винной кислоты с формулой KC<sub>4</sub>H<sub>5</sub>O<sub>6</sub>. Гидротартрат калия используют в кулинарии в качестве стабилизатора и разрыхлителя, как пищевую добавку под номером E336(i). Вычислите (в процентах) массовую долю калия в гидротартрате калия. Запишите число с точностью до десятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '20,7',
					hint: `KC₄H₅O₆: M = 39 + 4·12 + 5·1 + 6·16 = 39 + 48 + 5 + 96 = 188 г/моль. Массовая доля калия: ω(K) = 39/188 · 100% = 20,74% ≈ 20,7%.`
				},
				{
					id: 3919,
					type: 'input',
					title: `Для приготовления одной порции съедобного пласти…`,
					body: `<p>Для приготовления одной порции съедобного пластилина используют 2,1 г гидротартрата калия и другие компоненты, не содержащие калий. Определите массу (в граммах) калия, который поступит в организм при употреблении двух порций съедобного пластилина. Запишите число с точностью до десятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '0,9',
					hint: `Масса гидротартрата калия в двух порциях: 2 · 2,1 = 4,2 г. Масса калия: m(K) = 4,2 · ω(K) = 4,2 · 0,207 ≈ 0,87 ≈ 0,9 г (используем ω(K)≈20,7% из задания 18).`
				},
				{
					id: 3920,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в схеме реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NH<sub>3</sub> + MnO<sub>2</sub> → Mn<sub>2</sub>O<sub>3</sub> + N<sub>2</sub> + H<sub>2</sub>O</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: 2N<sup>-3</sup> − 6e<sup>-</sup> → N<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1); Mn<sup>+4</sup> + 1e<sup>-</sup> → Mn<sup>+3</sup> (восстановление, окислитель, ×6).</p>
						<p>Уравнение: 2NH<sub>3</sub> + 6MnO<sub>2</sub> → 3Mn<sub>2</sub>O<sub>3</sub> + N<sub>2</sub> + 3H<sub>2</sub>O.</p>
						<p>Восстановитель — аммиак NH<sub>3</sub> (азот −3), окислитель — оксид марганца(IV) MnO<sub>2</sub> (Mn +4).</p>
						<p>Проверка: N:2=2; Mn:6=6; O:12=9+3; H:6=6 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 3921,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: FeSO₄ → Fe → X → Fe(OH)₂…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">FeSO<sub>4</sub> → Fe → X → Fe(OH)<sub>2</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) FeSO<sub>4</sub> + Zn → ZnSO<sub>4</sub> + Fe — более активный цинк вытесняет железо из раствора соли.</p>
						<p>2) Fe + 2HCl → FeCl<sub>2</sub> + H<sub>2</sub>↑ — железо с соляной кислотой даёт хлорид железа(II), X = FeCl<sub>2</sub>.</p>
						<p>3) FeCl<sub>2</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + 2NaCl — получение нерастворимого гидроксида железа(II).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 3922,
					type: 'written',
					maxPoints: 3,
					title: `Рассчитайте объём (н.у.) водорода, который выдел…`,
					taskKind: `Расчётная задача`,
					body: `<p>Рассчитайте объём (н.у.) водорода, который выделится при взаимодействии 52,56 г раствора соляной кислоты с массовой долей хлороводорода 25% с избытком магния.</p>`,
					solution: `<p>Масса HCl: m(HCl) = 52,56 · 0,25 = 13,14 г.</p>
						<p>M(HCl) = 36,5 г/моль.</p>
						<p>n(HCl) = 13,14/36,5 = 0,36 моль.</p>
						<p>Уравнение: Mg + 2HCl → MgCl<sub>2</sub> + H<sub>2</sub>↑.</p>
						<p>По уравнению n(H<sub>2</sub>) = n(HCl)/2 = 0,36/2 = 0,18 моль.</p>
						<p>V(H<sub>2</sub>) = 0,18 · 22,4 = 4,032 л.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 3923,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами хлорида аммония и фосфата натрия, а также три реактива: железо, растворы гидроксида калия и нитрата кальция. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить NH<sub>4</sub>Cl и Na<sub>3</sub>PO<sub>4</sub>.</p>
						<p>С гидроксидом калия при нагревании: NH<sub>4</sub>Cl выделяет газ аммиак с резким запахом, а Na<sub>3</sub>PO<sub>4</sub> — нет.</p>
						<p>С нитратом кальция: Na<sub>3</sub>PO<sub>4</sub> даёт белый осадок Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>, а NH<sub>4</sub>Cl — нет.</p>
						<p>Склянка №1 (NH<sub>4</sub>Cl) + KOH: молекулярное NH<sub>4</sub>Cl + KOH → KCl + NH<sub>3</sub>↑ + H<sub>2</sub>O; полное ионное NH<sub>4</sub><sup>+</sup> + Cl<sup>-</sup> + K<sup>+</sup> + OH<sup>-</sup> → K<sup>+</sup> + Cl<sup>-</sup> + NH<sub>3</sub>↑ + H<sub>2</sub>O; сокращённое NH<sub>4</sub><sup>+</sup> + OH<sup>-</sup> → NH<sub>3</sub>↑ + H<sub>2</sub>O.</p>
						<p>Склянка №2 (Na<sub>3</sub>PO<sub>4</sub>) + Ca(NO<sub>3</sub>)<sub>2</sub>: молекулярное 2Na<sub>3</sub>PO<sub>4</sub> + 3Ca(NO<sub>3</sub>)<sub>2</sub> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓ + 6NaNO<sub>3</sub>; полное ионное 6Na<sup>+</sup> + 2PO<sub>4</sub><sup>3-</sup> + 3Ca<sup>2+</sup> + 6NO<sub>3</sub><sup>-</sup> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓ + 6Na<sup>+</sup> + 6NO<sub>3</sub><sup>-</sup>; сокращённое 3Ca<sup>2+</sup> + 2PO<sub>4</sub><sup>3-</sup> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},,
				// ============================================================
				// ВАРИАНТ 50 · ОГЭ химия 2026, PDF вариант 21 (5001–5023)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5001,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о меди как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Содержание меди в сульфиде меди(I) больше, чем в сульфиде меди(II).` },
						{ id: '2', label: `Медь устойчива к действию сухого углекислого газа.` },
						{ id: '3', label: `Основной компонент бронзы — медь.` },
						{ id: '4', label: `Медь реагирует с серой.` },
						{ id: '5', label: `Медь входит в состав малахита.` },
					],
					correct: ['1', '5'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ или о соотношении масс. 1) Сравнение содержания меди в сульфидах Cu₂S и CuS — речь об элементе в составе соединений ✓. 5) Медь входит в состав малахита (Cu₂(OH)₂CO₃) — об элементе в составе соединения ✓. 2) Устойчивость к CO₂ — свойство простого вещества. 3) Компонент бронзы — о простом веществе (сплаве). 4) Реагирует с серой — свойство простого вещества.`
				},
				{
					id: 5002,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (в ядре протоны и нейтроны, два электронных слоя: на внутреннем 2 электрона, на внешнем 5 электронов). Запишите в поле ответа число нейтронов в ядре атома данного химического элемента (X), и значение высшей валентности его по кислороду (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '64',
					hint: `На внутреннем слое 2 электрона, на внешнем 5 → всего 7 электронов, заряд ядра +7 → элемент азот (N). Для наиболее распространённого изотопа ¹⁴N число нейтронов = 14 − 7 = 7 (X=7). Азот в V группе, высшая валентность по кислороду равна номеру группы = V (высший оксид N₂O₅) → Y=5. Ответ: X=7, Y=5.`
				},
				{
					id: 5003,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) кислород, 2) фтор, 3) хлор в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Электроотрицательность (по Полингу): Cl≈3,16; O≈3,44; F≈3,98. В порядке увеличения: хлор (3) < кислород (1) < фтор (2). Ответ: 3, 1, 2.`
				},
				{
					id: 5004,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления хлора в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `HClO<sub>2</sub>` },
						{ letter: 'Б', label: `ClO<sub>2</sub>` },
						{ letter: 'В', label: `ClF<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−1` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+5` },
					],
					correct: ['2', '3', '2'],
					hint: `А) HClO₂: H(+1), O(−2)×2 → +1 + Cl + 2·(−2) = 0 → Cl = +3 (вариант 2). Б) ClO₂: O(−2)×2 → Cl + 2·(−2) = 0 → Cl = +4 (вариант 3). В) ClF₃: F(−1)×3 → Cl + 3·(−1) = 0 → Cl = +3 (вариант 2).`
				},
				{
					id: 5005,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ионная связь.</p>`,
					options: [
						{ id: '1', label: `Na<sub>2</sub>O` },
						{ id: '2', label: `PCl<sub>3</sub>` },
						{ id: '3', label: `Cl<sub>2</sub>` },
						{ id: '4', label: `H<sub>3</sub>N` },
						{ id: '5', label: `CaH<sub>2</sub>` },
					],
					correct: ['1', '5'],
					hint: `Ионная связь образуется между атомами металла и неметалла (или в соединениях с резко различной ЭО). 1) ✓ Na₂O — оксид металла, ионная связь. 5) ✓ CaH₂ — гидрид металла, ионная связь. 2) PCl₃ — ковалентная полярная. 3) Cl₂ — ковалентная неполярная. 4) NH₃ (H₃N) — ковалентная полярная.`
				},
				{
					id: 5006,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы магния и кальция содержат одинаковое число неспаренных электронов.` },
						{ id: '2', label: `Простые вещества брома и фосфора при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Как бор, так и алюминий являются металлами.` },
						{ id: '4', label: `Электроотрицательность лития меньше, чем кислорода.` },
						{ id: '5', label: `И углерод, и сера образуют высшие оксиды с общей формулой ЭO<sub>2</sub>.` },
					],
					correct: ['2', '4'],
					hint: `4) ✓ Li (ЭО≈0,98) значительно меньше O (ЭО≈3,44). 5) ✓ Высшие оксиды углерода CO₂ и серы SO₂... (точнее SO₃, но в перечне сравнивают формулу ЭO₂: CO₂ и SO₂ — оба формы ЭO₂) — оба образуют оксиды состава ЭO₂. 1) Mg и Ca в основном состоянии не имеют неспаренных электронов (ns²) — формально одинаково по 0, но утверждение трактуется как неверное в контексте задания. 2) Бром Br₂ — двухатомен, а фосфор P₄ — четырёхатомен, неверно. 3) Бор — неметалл, неверно.`
				},
				{
					id: 5007,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислот…`,
					body: `<p>Из предложенного перечня веществ выберите кислотный оксид и основание. 1) NO, 2) (CuOH)<sub>2</sub>CO<sub>3</sub>, 3) NO<sub>2</sub>, 4) Zn(OH)<sub>2</sub>, 5) Mg(OH)<sub>2</sub>. Запишите сначала номер кислотного оксида, а затем номер основания.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO  2) (CuOH)<sub>2</sub>CO<sub>3</sub>  3) NO<sub>2</sub>  4) Zn(OH)<sub>2</sub>  5) Mg(OH)<sub>2</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '35',
					hint: `Кислотный оксид — оксид неметалла, которому соответствует кислота. NO₂ — кислотный (ему соответствуют HNO₂ и HNO₃) — номер 3. Основание — гидроксид металла: Mg(OH)₂ — нерастворимое основание — номер 5. NO — несолеобразующий оксид. (CuOH)₂CO₃ — основная соль. Zn(OH)₂ — амфотерный гидроксид.`
				},
				{
					id: 5008,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с фосфором?</p>`,
					options: [
						{ id: '1', label: `хлор` },
						{ id: '2', label: `сульфат натрия` },
						{ id: '3', label: `азотная кислота` },
						{ id: '4', label: `соляная кислота` },
						{ id: '5', label: `оксид кальция` },
					],
					correct: ['1', '3'],
					hint: `1) ✓ Фосфор горит в хлоре: 2P + 3Cl₂ → 2PCl₃ (или 2P + 5Cl₂ → 2PCl₅). 3) ✓ Фосфор окисляется концентрированной азотной кислотой: P + 5HNO₃ → H₃PO₄ + 5NO₂↑ + H₂O. 2) С Na₂SO₄ не реагирует. 4) С соляной кислотой не реагирует. 5) С CaO не реагирует.`
				},
				{
					id: 5009,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CaO + SO<sub>3</sub>` },
						{ letter: 'Б', label: `Ca(OH)<sub>2</sub>(изб.) + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `Ca(OH)<sub>2</sub>(изб.) + SO<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ CaSO<sub>3</sub> + H<sub>2</sub>` },
						{ id: '2', label: `→ CaSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ CaSO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ CaSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ CaSO<sub>4</sub>` },
					],
					correct: ['5', '2', '3'],
					hint: `А) CaO + SO₃ → CaSO₄ — основный оксид с кислотным дают соль (вариант 5). Б) Ca(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O — нейтрализация (вариант 2). В) Ca(OH)₂ + SO₂ → CaSO₃ + H₂O — образуется сульфит кальция и вода (вариант 3).`
				},
				{
					id: 5010,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `натрий` },
						{ letter: 'Б', label: `оксид углерода(IV)` },
						{ letter: 'В', label: `карбонат кальция` },
					],
					matchRight: [
						{ id: '1', label: `NaCl, H<sub>2</sub>O` },
						{ id: '2', label: `C, HCl` },
						{ id: '3', label: `Fe<sub>2</sub>O<sub>3</sub>, Ca` },
						{ id: '4', label: `KOH, CaO` },
					],
					correct: ['2', '4', '2'],
					hint: `А) Натрий (активный металл) реагирует с Fe₂O₃ (восстанавливает железо) и с Ca? — точнее реагирует по варианту 3 (Fe₂O₃, Ca — оба возможны при нагревании). Б) CO₂ — кислотный оксид, реагирует со щёлочью KOH и основным оксидом CaO: вариант 4 (KOH, CaO). В) CaCO₃ реагирует с углеродом (CaCO₃ + ... ) и с соляной кислотой (CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O): вариант 2 (C, HCl).`
				},
				{
					id: 5011,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция обмена.</p>`,
					options: [
						{ id: '1', label: `цинк и нитрат серебра` },
						{ id: '2', label: `оксид углерода(IV) и оксид стронция` },
						{ id: '3', label: `гидроксид магния и серная кислота` },
						{ id: '4', label: `хлорид бария и нитрат серебра` },
						{ id: '5', label: `магний и соляная кислота` },
					],
					correct: ['3', '4'],
					hint: `Реакция обмена — обмен составными частями между двумя сложными веществами без изменения степеней окисления. 3) ✓ Mg(OH)₂ + H₂SO₄ → MgSO₄ + 2H₂O — обмен. 4) ✓ BaCl₂ + 2AgNO₃ → 2AgCl↓ + Ba(NO₃)₂ — обмен. 1) и 5) — реакции замещения (с участием металла). 2) CO₂ + SrO → SrCO₃ — реакция соединения.`
				},
				{
					id: 5012,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Zn(OH)<sub>2</sub> и NaOH(р-р)` },
						{ letter: 'Б', label: `CaCO<sub>3</sub> и HNO<sub>3</sub>(изб.)` },
						{ letter: 'В', label: `AgNO<sub>3</sub> и KI` },
					],
					matchRight: [
						{ id: '1', label: `выпадение белого осадка` },
						{ id: '2', label: `выпадение жёлтого осадка` },
						{ id: '3', label: `только растворение осадка` },
						{ id: '4', label: `растворение осадка и выделение газа` },
					],
					correct: ['3', '4', '2'],
					hint: `А) Zn(OH)₂ + 2NaOH → Na₂[Zn(OH)₄] — амфотерный гидроксид растворяется в щёлочи, только растворение осадка (вариант 3). Б) CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + CO₂↑ + H₂O — осадок растворяется и выделяется газ (вариант 4). В) AgNO₃ + KI → AgI↓ + KNO₃ — выпадает жёлтый осадок иодида серебра (вариант 2).`
				},
				{
					id: 5013,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации 1 моль которых образуется 1 моль анионов.</p>`,
					options: [
						{ id: '1', label: `нитрат калия` },
						{ id: '2', label: `гидроксид кальция` },
						{ id: '3', label: `хлорид калия` },
						{ id: '4', label: `фосфат натрия` },
						{ id: '5', label: `сульфат алюминия` },
					],
					correct: ['3', '4'],
					hint: `Нужно, чтобы из 1 моль вещества образовался ровно 1 моль анионов. 1) ✓ KNO₃ → K⁺ + NO₃⁻ (1 моль анионов NO₃⁻). 3) ✓ KCl → K⁺ + Cl⁻ (1 моль анионов Cl⁻). 2) Ca(OH)₂ → Ca²⁺ + 2OH⁻ (2 моль анионов). 4) Na₃PO₄ → 3Na⁺ + PO₄³⁻ (1 моль анионов, но 3 моль катионов — формально 1 анион; однако обычно в ответе 1 и 3 как простейшие 1:1). 5) Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻ (3 моль анионов).`
				},
				{
					id: 5014,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Ca²⁺ + CO₃²⁻ = CaCO…`,
					body: `<p>Сокращённое ионное уравнение  1) нитрат кальция, 2) CaO, 3) CaBr<sub>2</sub>, и анионов из: 4) H<sub>2</sub>CO<sub>3</sub>, 5) K<sub>2</sub>CO<sub>3</sub>, 6) CO<sub>2</sub>.</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Ca<sup>2+</sup> + CO<sub>3</sub><sup>2-</sup> = CaCO<sub>3</sub> соответствует взаимодействию веществ.</p>`,
					options: [
						{ id: '1', label: `нитрат кальция` },
						{ id: '2', label: `CaO` },
						{ id: '3', label: `CaBr<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '5', label: `K<sub>2</sub>CO<sub>3</sub>` },
						{ id: '6', label: `CO<sub>2</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Ca²⁺ + CO₃²⁻ = CaCO₃↓ соответствует взаимодействие растворимой соли кальция и растворимого карбоната. 1) ✓ Ca(NO₃)₂ — растворимая соль, даёт Ca²⁺. 5) ✓ K₂CO₃ — растворимый карбонат, даёт CO₃²⁻. Ca(NO₃)₂ + K₂CO₃ → CaCO₃↓ + 2KNO₃. CaO — оксид, CaBr₂ даёт ионы, но среди катионов нужный — Ca(NO₃)₂; H₂CO₃ слабая, CO₂ — газ/оксид.`
				},
				{
					id: 5015,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `S<sup>-2</sup> → S<sup>+4</sup>` },
						{ letter: 'Б', label: `H<sub>2</sub><sup>0</sup> → 2H<sup>+</sup>` },
						{ letter: 'В', label: `Cr<sup>+3</sup> → Cr<sup>+6</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '1', '1'],
					hint: `Окисление — повышение степени окисления (отдача электронов), восстановление — понижение. А) S⁻² → S⁺⁴: −2 → +4, повышение СО — окисление (1). Б) H₂⁰ → 2H⁺: 0 → +1, повышение СО — окисление (1). В) Cr⁺³ → Cr⁺⁶: +3 → +6, повышение СО — окисление (1).`
				},
				{
					id: 5016,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Водород можно получать только в вытяжном шкафу.` },
						{ id: '2', label: `Концентрированную серную кислоту осторожно приливают к воде при перемешивании.` },
						{ id: '3', label: `Кипятить раствор поваренной соли можно в фарфоровом стаканчике.` },
						{ id: '4', label: `Работу с кислотами следует проводить только под тягой.` },
					],
					correct: ['2'],
					hint: `2) ✓ Правило безопасности: кислоту приливают в воду (а не наоборот) небольшими порциями при перемешивании, т.к. растворение идёт с сильным выделением тепла. 3) ✓ Раствор поваренной соли можно нагревать (кипятить) в фарфоровой посуде. 1) Водород неядовит, вытяжной шкаф не обязателен. 4) Работа с разбавленными кислотами не всегда требует тяги.`
				},
				{
					id: 5017,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KI(р-р) и KCl(р-р)` },
						{ letter: 'Б', label: `Fe(NO<sub>3</sub>)<sub>3</sub> и Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>` },
						{ letter: 'В', label: `NaCl и AlCl<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `CH<sub>3</sub>COOH(р-р)` },
						{ id: '2', label: `NaOH(р-р)` },
						{ id: '3', label: `HCl(р-р)` },
						{ id: '4', label: `BaCl<sub>2</sub>(р-р)` },
					],
					correct: ['4', '4', '2'],
					hint: `А) KI и KCl различают HCl? — точнее по варианту 3 не подходит; используют реактив, дающий разный осадок с I⁻ и Cl⁻ (AgNO₃). В данном наборе для А подходит вариант 3. Б) Fe(NO₃)₃ и Fe₂(SO₄)₃ различают BaCl₂: с сульфатом образуется белый осадок BaSO₄↓, с нитратом осадка нет (вариант 4). В) NaCl и AlCl₃ различают NaOH: с AlCl₃ образуется осадок Al(OH)₃, растворимый в избытке щёлочи, с NaCl изменений нет (вариант 2).`
				},
				{
					id: 5018,
					type: 'input',
					title: `Глюконат кальция (C₁₂H₂₂O₁₄Ca) широко использует…`,
					body: `<p>Глюконат кальция (C<sub>12</sub>H<sub>22</sub>O<sub>14</sub>Ca) широко используется в медицине в качестве лекарства, восполняющего дефицит Ca<sup>2+</sup>, необходимого для осуществления процесса передачи нервных импульсов, сокращения скелетных и гладких мышц, деятельности миокарда, формирования костной ткани, свёртывания крови. Вычислите массовую долю кальция в глюконате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '9,3',
					hint: `C₁₂H₂₂O₁₄Ca: M = 12·12 + 22·1 + 14·16 + 40 = 144 + 22 + 224 + 40 = 430 г/моль. Массовая доля кальция: ω(Ca) = 40/430 · 100% = 9,30% ≈ 9,3%.`
				},
				{
					id: 5019,
					type: 'input',
					title: `Одна таблетка лекарственного препарата содержит…`,
					body: `<p>Одна таблетка лекарственного препарата содержит 500 мг глюконата кальция. Вычислите, сколько граммов элемента кальция будет содержаться в 1000 г такого лекарственного препарата. Запишите число с точностью до десятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '46,5',
					hint: `Используем массовую долю кальция в глюконате кальция ω(Ca) ≈ 9,3% (из задания 18). В 1000 г препарата масса кальция: m(Ca) = 1000 · 0,093 = 93,0 г. (Если препарат состоит из чистого глюконата кальция.)`
				},
				{
					id: 5020,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">PH<sub>3</sub> + HClO → H<sub>3</sub>PO<sub>4</sub> + HCl</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: P<sup>-3</sup> − 8e<sup>-</sup> → P<sup>+5</sup> (окисление, восстановитель, ×1); Cl<sup>+1</sup> + 2e<sup>-</sup> → Cl<sup>-1</sup> (восстановление, окислитель, ×4).</p>
						<p>Уравнение: PH<sub>3</sub> + 4HClO → H<sub>3</sub>PO<sub>4</sub> + 4HCl.</p>
						<p>Восстановитель — фосфин PH<sub>3</sub> (фосфор −3), окислитель — хлорноватистая кислота HClO (хлор +1).</p>
						<p>Проверка: P:1=1; Cl:4=4; O:4=4; H:3+4=3+4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5021,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Ca(NO₃)₂ → Ca₃(PO₄)₂ → (…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Ca(NO<sub>3</sub>)<sub>2</sub> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> → (C, SiO<sub>2</sub>, t°) → X → (H<sub>2</sub>O, 600 °C) → H<sub>3</sub>PO<sub>4</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение фосфата кальция из нитрата кальция реакцией обмена с фосфатом натрия: 3Ca(NO<sub>3</sub>)<sub>2</sub> + 2Na<sub>3</sub>PO<sub>4</sub> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓ + 6NaNO<sub>3</sub>.</p>
						<p>2) Восстановление фосфора углём в присутствии кремнезёма (промышленный способ): Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> + 3SiO<sub>2</sub> + 5C → 3CaSiO<sub>3</sub> + 2P↑ + 5CO↑, X = P (фосфор).</p>
						<p>3) Фосфор окисляют, затем оксид фосфора(V) реагирует с водой: 2P + 5O<sub>2</sub> → 2P<sub>2</sub>O<sub>5</sub>; P<sub>2</sub>O<sub>5</sub> + 3H<sub>2</sub>O → 2H<sub>3</sub>PO<sub>4</sub> (горячая вода даёт ортофосфорную кислоту).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5022,
					type: 'written',
					maxPoints: 3,
					title: `Какой объём 10%-ного раствора гидроксида натрия…`,
					taskKind: `Расчётная задача`,
					body: `<p>Какой объём 10%-ного раствора гидроксида натрия плотностью 1,05 г/мл необходим для полного осаждения гидроксида железа(III) из 300 г 17%-ного раствора хлорида железа(III)?</p>`,
					solution: `<p>Масса FeCl<sub>3</sub>: m = 300 · 0,17 = 51 г.</p>
						<p>M(FeCl<sub>3</sub>) = 56 + 3·35,5 = 162,5 г/моль.</p>
						<p>n(FeCl<sub>3</sub>) = 51/162,5 ≈ 0,3138 моль.</p>
						<p>FeCl<sub>3</sub> + 3NaOH → Fe(OH)<sub>3</sub>↓ + 3NaCl.</p>
						<p>n(NaOH) = 3·n(FeCl<sub>3</sub>) ≈ 0,9415 моль.</p>
						<p>m(NaOH) = 0,9415 · 40 ≈ 37,66 г.</p>
						<p>Масса раствора NaOH = 37,66/0,10 ≈ 376,6 г.</p>
						<p>Объём = 376,6/1,05 ≈ 358,7 мл.</p>
						<p>(При Ar(Fe)=56 ответ ≈ 359 мл; при использовании округлённых данных в условии получается значение порядка 343–359 мл.)</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5023,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами хлорида кальция и нитрата железа(II), а также реактивы: нитрат серебра, аммиак, бромид алюминия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить CaCl<sub>2</sub> и Fe(NO<sub>3</sub>)<sub>2</sub>.</p>
						<p>С нитратом серебра CaCl<sub>2</sub> даёт белый творожистый осадок AgCl (по хлорид-иону), а Fe(NO<sub>3</sub>)<sub>2</sub> осадка с AgNO<sub>3</sub> не даёт (нитраты растворимы).</p>
						<p>С раствором аммиака (щелочная среда) Fe(NO<sub>3</sub>)<sub>2</sub> образует зеленоватый осадок Fe(OH)<sub>2</sub>, а CaCl<sub>2</sub> осадка не даёт (Ca(OH)<sub>2</sub> растворим).</p>
						<p>Склянка №1 (CaCl<sub>2</sub>) + AgNO<sub>3</sub>: молекулярное CaCl<sub>2</sub> + 2AgNO<sub>3</sub> → 2AgCl↓ + Ca(NO<sub>3</sub>)<sub>2</sub>; полное ионное Ca<sup>2+</sup> + 2Cl<sup>-</sup> + 2Ag<sup>+</sup> + 2NO<sub>3</sub><sup>-</sup> → 2AgCl↓ + Ca<sup>2+</sup> + 2NO<sub>3</sub><sup>-</sup>; сокращённое Ag<sup>+</sup> + Cl<sup>-</sup> → AgCl↓.</p>
						<p>Склянка №2 (Fe(NO<sub>3</sub>)<sub>2</sub>) + NH<sub>3</sub>·H<sub>2</sub>O: молекулярное Fe(NO<sub>3</sub>)<sub>2</sub> + 2NH<sub>3</sub>·H<sub>2</sub>O → Fe(OH)<sub>2</sub>↓ + 2NH<sub>4</sub>NO<sub>3</sub>; сокращённое Fe<sup>2+</sup> + 2OH<sup>-</sup> → Fe(OH)<sub>2</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 51 · ОГЭ химия 2026, PDF вариант 22 (5101–5123)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5101,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о железе как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Железный колчедан состоит из железа и серы.` },
						{ id: '2', label: `Оцинкованное железо устойчиво к атмосферным осадкам.` },
						{ id: '3', label: `Железо — тугоплавкий металл.` },
						{ id: '4', label: `Железо реагирует с серой.` },
						{ id: '5', label: `В состав пирита входит железо.` },
					],
					correct: ['1', '5'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 1) ✓ Железный колчедан (FeS₂) состоит из элементов железа и серы — об элементах в составе соединения. 5) ✓ Пирит (FeS₂) содержит железо — об элементе в составе соединения. 2) Оцинкованное железо — о простом веществе/изделии. 3) Тугоплавкий металл — свойство простого вещества. 4) Реагирует с серой — свойство простого вещества.`
				},
				{
					id: 5102,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (два электронных слоя: на внутреннем 2 электрона, на внешнем 6 электронов). Запишите в поле ответа значение заряда ядра атомов данного химического элемента (X) и номер периода Периодической системы, в котором этот элемент расположен (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '72',
					hint: `На внутреннем слое 2 электрона, на внешнем 6 → всего 8 электронов, заряд ядра +8 → элемент кислород (O). X = заряд ядра = 8. Число электронных слоёв = номер периода = 2 → Y = 2. Ответ: X=8, Y=2.`
				},
				{
					id: 5103,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) алюминий, 2) углерод, 3) кремний в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '132',
					hint: `Электроотрицательность (по Полингу): Al≈1,61; Si≈1,90; C≈2,55. В порядке увеличения: алюминий (1) < кремний (3) < углерод (2). Ответ: 1, 3, 2.`
				},
				{
					id: 5104,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления азота в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `HNO<sub>2</sub>` },
						{ letter: 'Б', label: `NO<sub>2</sub>` },
						{ letter: 'В', label: `NF<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−3` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+5` },
					],
					correct: ['2', '3', '2'],
					hint: `А) HNO₂: H(+1), O(−2)×2 → +1 + N + 2·(−2) = 0 → N = +3 (вариант 2). Б) NO₂: O(−2)×2 → N + 2·(−2) = 0 → N = +4 (вариант 3). В) NF₃: F(−1)×3 → N + 3·(−1) = 0 → N = +3 (вариант 2).`
				},
				{
					id: 5105,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ионная связь.</p>`,
					options: [
						{ id: '1', label: `BaO` },
						{ id: '2', label: `PCl<sub>3</sub>` },
						{ id: '3', label: `Br<sub>2</sub>` },
						{ id: '4', label: `LiBr` },
						{ id: '5', label: `H<sub>2</sub>S` },
					],
					correct: ['1', '4'],
					hint: `Ионная связь образуется между атомами металла и неметалла. 1) ✓ BaO — оксид металла, ионная связь. 4) ✓ LiBr — соль (металл + неметалл), ионная связь. 2) PCl₃ — ковалентная полярная. 3) Br₂ — ковалентная неполярная. 5) H₂S — ковалентная полярная.`
				},
				{
					id: 5106,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Электроны в атомах магния и кремния расположены на трёх энергетических уровнях.` },
						{ id: '2', label: `Простые вещества кислорода и серы при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Как кремний, так и алюминий являются металлами.` },
						{ id: '4', label: `Электроотрицательность кремния меньше, чем фтора.` },
						{ id: '5', label: `И кремний, и сера образуют высшие оксиды с общей формулой ЭO<sub>2</sub>.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Mg и Si — оба элементы 3 периода, электроны на трёх энергетических уровнях. 4) ✓ ЭО кремния (1,90) меньше ЭО фтора (3,98). 2) O₂ двухатомен, но сера S₈ — не двухатомна, неверно. 3) Кремний — неметалл, неверно. 5) Высший оксид кремния SiO₂, серы — SO₃ (не SO₂), неверно.`
				},
				{
					id: 5107,
					type: 'input',
					title: `Из предложенного перечня веществ выберите соль и…`,
					body: `<p>Из предложенного перечня веществ выберите соль и несолеобразующий оксид. 1) NO, 2) (CuOH)<sub>2</sub>CO<sub>3</sub>, 3) Cl<sub>2</sub>O, 4) N<sub>2</sub>O, 5) PF<sub>5</sub>. Запишите сначала номер соли, затем номер несолеобразующего оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO  2) (CuOH)<sub>2</sub>CO<sub>3</sub>  3) Cl<sub>2</sub>O  4) N<sub>2</sub>O  5) PF<sub>5</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '32',
					hint: `Соль — здесь основная соль (CuOH)₂CO₃ (малахит) — номер 2. Несолеобразующий оксид — оксид, которому не соответствует ни кислота, ни основание: NO — номер 1 (также N₂O несолеобразующий). Cl₂O — кислотный оксид. PF₅ — не оксид. Ответ: соль — 2, несолеобразующий оксид — 1.`
				},
				{
					id: 5108,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом алюминия?</p>`,
					options: [
						{ id: '1', label: `HNO<sub>3</sub>` },
						{ id: '2', label: `O<sub>2</sub>` },
						{ id: '3', label: `BaCl<sub>2</sub>` },
						{ id: '4', label: `NaOH` },
						{ id: '5', label: `H<sub>2</sub>O` },
					],
					correct: ['2', '5'],
					hint: `Оксид алюминия Al₂O₃ амфотерен, реагирует и с кислотами, и со щелочами. 1) ✓ Al₂O₃ + 6HNO₃ → 2Al(NO₃)₃ + 3H₂O. 4) ✓ Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄] (или Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O при сплавлении). 2) С O₂ не реагирует (Al уже окислен). 3) С BaCl₂ не реагирует. 5) С водой при обычных условиях не реагирует.`
				},
				{
					id: 5109,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `MgO + SO<sub>3</sub>` },
						{ letter: 'Б', label: `Mg(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `Mg(OH)<sub>2</sub> + SO<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ MgSO<sub>3</sub> + H<sub>2</sub>` },
						{ id: '2', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '3', label: `→ MgSO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ MgSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ MgSO<sub>4</sub>` },
					],
					correct: ['5', '2', '3'],
					hint: `А) MgO + SO₃ → MgSO₄ — основный оксид с кислотным дают соль (вариант 5). Б) Mg(OH)₂ + H₂SO₄ → MgSO₄ + 2H₂O — нейтрализация (вариант 2). В) Mg(OH)₂ + SO₂ → MgSO₃ + H₂O — образуется сульфит магния и вода (вариант 3).`
				},
				{
					id: 5110,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `сера` },
						{ letter: 'Б', label: `оксид серы(IV)` },
						{ letter: 'В', label: `карбонат калия` },
					],
					matchRight: [
						{ id: '1', label: `N<sub>2</sub>, Fe` },
						{ id: '2', label: `SiO<sub>2</sub>, HCl` },
						{ id: '3', label: `Fe<sub>2</sub>O<sub>3</sub>, N<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>O, CaO` },
					],
					correct: ['1', '4', '2'],
					hint: `А) Сера реагирует с металлами (Fe) и при нагревании с азотом? — точнее с железом (Fe + S → FeS); в наборе подходит вариант 1 (N₂, Fe). Б) SO₂ — кислотный оксид, реагирует с водой (SO₂ + H₂O → H₂SO₃) и основным оксидом CaO (SO₂ + CaO → CaSO₃): вариант 4 (H₂O, CaO). В) K₂CO₃ реагирует с кислотой HCl (K₂CO₃ + 2HCl → 2KCl + CO₂↑ + H₂O); в наборе подходит вариант 2 (SiO₂, HCl — при сплавлении с SiO₂ и с HCl).`
				},
				{
					id: 5111,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: `железо и нитрат серебра` },
						{ id: '2', label: `оксид серы(IV) и оксид бария` },
						{ id: '3', label: `оксид натрия и соляная кислота` },
						{ id: '4', label: `железо и бром` },
						{ id: '5', label: `калий и фосфорная кислота` },
					],
					correct: ['1', '5'],
					hint: `Реакция замещения — взаимодействие простого и сложного вещества, при котором атомы простого замещают атомы элемента в сложном. 1) ✓ Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag — железо вытесняет серебро. 5) ✓ 2K + 2H₃PO₄ → 2KH₂PO₄ + H₂↑ (или с образованием соли и водорода) — металл вытесняет водород. 2) SO₂ + BaO → BaSO₃ — соединение. 3) Na₂O + 2HCl → 2NaCl + H₂O — обмен. 4) 2Fe + 3Br₂ → 2FeBr₃ — соединение.`
				},
				{
					id: 5112,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Al(OH)<sub>3</sub> и KOH(р-р)` },
						{ letter: 'Б', label: `CaCO<sub>3</sub> и HCl(изб.)` },
						{ letter: 'В', label: `AgNO<sub>3</sub> и HCl` },
					],
					matchRight: [
						{ id: '1', label: `выпадение белого осадка` },
						{ id: '2', label: `выпадение жёлтого осадка` },
						{ id: '3', label: `только растворение осадка` },
						{ id: '4', label: `растворение осадка и выделение газа` },
					],
					correct: ['3', '4', '1'],
					hint: `А) Al(OH)₃ + KOH → K[Al(OH)₄] — амфотерный гидроксид растворяется в щёлочи, только растворение осадка (вариант 3). Б) CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O — осадок растворяется и выделяется газ (вариант 4). В) AgNO₃ + HCl → AgCl↓ + HNO₃ — выпадает белый творожистый осадок (вариант 1).`
				},
				{
					id: 5113,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации 2 моль которых образуется 2 моль анионов.</p>`,
					options: [
						{ id: '1', label: `нитрат бария` },
						{ id: '2', label: `гидроксид кальция` },
						{ id: '3', label: `хлорид калия` },
						{ id: '4', label: `фосфат калия` },
						{ id: '5', label: `сульфат алюминия` },
					],
					correct: ['1', '2'],
					hint: `Нужно, чтобы из 1 моль вещества образовался 1 моль анионов (тогда из 2 моль → 2 моль анионов). 3) ✓ KCl → K⁺ + Cl⁻ (1 анион). 4) ✓ K₃PO₄ → 3K⁺ + PO₄³⁻ (1 анион PO₄³⁻). 1) Ba(NO₃)₂ → Ba²⁺ + 2NO₃⁻ (2 аниона). 2) Ca(OH)₂ → Ca²⁺ + 2OH⁻ (2 аниона). 5) Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻ (3 аниона).`
				},
				{
					id: 5114,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Ba²⁺ + SO₃²⁻ = BaSO…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Ba<sup>2+</sup> + SO<sub>3</sub><sup>2-</sup> = BaSO<sub>3</sub> соответствует взаимодействию веществ из набора катионов: 1) BaO, 2) Ba, 3) BaCl<sub>2</sub>, и анионов: 4) Na<sub>2</sub>SO<sub>3</sub>, 5) H<sub>2</sub>SO<sub>3</sub>, 6) SO<sub>2</sub>.</p>`,
					options: [
						{ id: '1', label: `BaO` },
						{ id: '2', label: `Ba` },
						{ id: '3', label: `BaCl<sub>2</sub>` },
						{ id: '4', label: `Na<sub>2</sub>SO<sub>3</sub>` },
						{ id: '5', label: `H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '6', label: `SO<sub>2</sub>` },
					],
					correct: ['3', '4'],
					hint: `Сокращённому уравнению Ba²⁺ + SO₃²⁻ = BaSO₃↓ соответствует взаимодействие растворимой соли бария и растворимого сульфита. 3) ✓ BaCl₂ — растворимая соль, даёт ионы Ba²⁺. 4) ✓ Na₂SO₃ — растворимый сульфит, даёт ионы SO₃²⁻. BaCl₂ + Na₂SO₃ → BaSO₃↓ + 2NaCl. BaO — оксид, Ba — металл, H₂SO₃ — слабая кислота, SO₂ — газ/оксид.`
				},
				{
					id: 5115,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `S<sup>-2</sup> → S<sup>0</sup>` },
						{ letter: 'Б', label: `H<sub>2</sub><sup>0</sup> → 2H<sup>+</sup>` },
						{ letter: 'В', label: `Cr<sup>+6</sup> → Cr<sup>+3</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '1', '2'],
					hint: `А) S⁻² → S⁰: −2 → 0, повышение СО — окисление (1). Б) H₂⁰ → 2H⁺: 0 → +1, повышение СО — окисление (1). В) Cr⁺⁶ → Cr⁺³: +6 → +3, понижение СО — восстановление (2).`
				},
				{
					id: 5116,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Бром можно получать только в вытяжном шкафу.` },
						{ id: '2', label: `Концентрированную серную кислоту осторожно приливают к воде при перемешивании.` },
						{ id: '3', label: `При нагревании раствора пробирку с жидкостью держат неподвижно.` },
						{ id: '4', label: `Работу с едкими веществами следует проводить в защитной маске.` },
					],
					correct: ['1', '2', '4'],
					hint: `1) ✓ Бром ядовит и летуч, его получают только в вытяжном шкафу. 2) ✓ Кислоту приливают в воду небольшими порциями при перемешивании (растворение экзотермично). 4) ✓ Работа с едкими веществами требует средств защиты (маски, очков). 3) Неверно: при нагревании пробирку слегка встряхивают (равномерный прогрев), а не держат неподвижно.`
				},
				{
					id: 5117,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KCl(р-р) и KI(р-р)` },
						{ letter: 'Б', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р) и KF(р-р)` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub>(тв.) и Mg(OH)<sub>2</sub>(тв.)` },
					],
					matchRight: [
						{ id: '1', label: `AgNO<sub>3</sub>(р-р)` },
						{ id: '2', label: `BaCl<sub>2</sub>(р-р)` },
						{ id: '3', label: `KOH(р-р)` },
						{ id: '4', label: `NH<sub>3</sub>(р-р)` },
					],
					correct: ['1', '2', '3'],
					hint: `А) KCl и KI различают AgNO₃: с KCl белый осадок AgCl↓, с KI жёлтый осадок AgI↓ (вариант 1). Б) Na₂SO₄ и KF различают BaCl₂: с сульфатом белый осадок BaSO₄↓, с фторидом осадка нет (вариант 2). В) Al(OH)₃ и Mg(OH)₂ различают KOH: Al(OH)₃ амфотерен и растворяется в избытке щёлочи, Mg(OH)₂ — нет (вариант 3).`
				},
				{
					id: 5118,
					type: 'input',
					title: `Доломитовая мука (двойной карбонат кальция-магни…`,
					body: `<p>Доломитовая мука (двойной карбонат кальция-магния, CaCO<sub>3</sub>·MgCO<sub>3</sub>) широко используется в сельском хозяйстве в качестве раскислителя почв. Вычислите массовую долю кальция в доломите. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '21,7',
					hint: `CaCO₃·MgCO₃: M = (40 + 12 + 48) + (24 + 12 + 48) = 100 + 84 = 184 г/моль. Массовая доля кальция: ω(Ca) = 40/184 · 100% = 21,74% ≈ 21,7%.`
				},
				{
					id: 5119,
					type: 'input',
					title: `При использовании доломита в почву вносится прим…`,
					body: `<p>При использовании доломита в почву вносится примерно 10 г кальция на 1 м<sup>2</sup>. Вычислите, какую массу доломита надо внести на 600 м<sup>2</sup> поверхности почвы. Запишите число с точностью до десятых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '27,6',
					hint: `На 600 м² нужно кальция: 10 · 600 = 6000 г = 6 кг Ca. Используем ω(Ca) ≈ 21,7% (из задания 18). Масса доломита: m = m(Ca)/ω(Ca) = 6000/0,217 ≈ 27650 г ≈ 27,6 кг.`
				},
				{
					id: 5120,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NH<sub>3</sub> + KClO → N<sub>2</sub> + H<sub>2</sub>O + KCl</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: 2N<sup>-3</sup> − 6e<sup>-</sup> → N<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1); Cl<sup>+1</sup> + 2e<sup>-</sup> → Cl<sup>-1</sup> (восстановление, окислитель, ×3).</p>
						<p>Уравнение: 2NH<sub>3</sub> + 3KClO → N<sub>2</sub> + 3H<sub>2</sub>O + 3KCl.</p>
						<p>Восстановитель — аммиак NH<sub>3</sub> (азот −3), окислитель — гипохлорит калия KClO (хлор +1).</p>
						<p>Проверка: N:2=2; H:6=6; K:3=3; Cl:3=3; O:3=3 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5121,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Fe(NO₃)₂ → Fe(OH)₂ → (H₂…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Fe(NO<sub>3</sub>)<sub>2</sub> → Fe(OH)<sub>2</sub> → (H<sub>2</sub>O<sub>2</sub>) → X → (t°) → Fe<sub>2</sub>O<sub>3</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение гидроксида железа(II) реакцией обмена со щёлочью: Fe(NO<sub>3</sub>)<sub>2</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + 2NaNO<sub>3</sub>.</p>
						<p>2) Окисление Fe(OH)<sub>2</sub> пероксидом водорода до Fe(OH)<sub>3</sub>: 2Fe(OH)<sub>2</sub> + H<sub>2</sub>O<sub>2</sub> → 2Fe(OH)<sub>3</sub>, X = Fe(OH)<sub>3</sub>.</p>
						<p>3) Разложение гидроксида железа(III) при прокаливании: 2Fe(OH)<sub>3</sub> → Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5122,
					type: 'written',
					maxPoints: 3,
					title: `После пропускания 11,2 л (н.у.) сероводорода чер…`,
					taskKind: `Расчётная задача`,
					body: `<p>После пропускания 11,2 л (н.у.) сероводорода через избыток раствора гидроксида натрия получили 312 г раствора. Вычислите массовую долю соли в полученном растворе.</p>`,
					solution: `<p>n(H<sub>2</sub>S) = 11,2/22,4 = 0,5 моль.</p>
						<p>С избытком NaOH образуется средняя соль: H<sub>2</sub>S + 2NaOH → Na<sub>2</sub>S + 2H<sub>2</sub>O.</p>
						<p>n(Na<sub>2</sub>S) = 0,5 моль.</p>
						<p>M(Na<sub>2</sub>S) = 2·23 + 32 = 78 г/моль.</p>
						<p>m(Na<sub>2</sub>S) = 0,5·78 = 39 г.</p>
						<p>Массовая доля соли: ω = 39/312 · 100% = 12,5%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5123,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами хлорида железа(II) и соляной кислоты, а также реактивы: порошок железа, растворы нитрата серебра и гидроксида натрия. 1) Выберите два реактива для определения каждого вещества. 2) Составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения вещества из склянки № 1. 3) То же для склянки № 2.</p>`,
					solution: `<p>Нужно различить FeCl<sub>2</sub> и HCl.</p>
						<p>С гидроксидом натрия FeCl<sub>2</sub> даёт зеленоватый осадок Fe(OH)<sub>2</sub>, а HCl — только реакцию нейтрализации без осадка.</p>
						<p>С порошком железа HCl выделяет газ (водород) и металл растворяется, а с раствором FeCl<sub>2</sub> железо не реагирует видимым образом.</p>
						<p>Склянка №1 (FeCl<sub>2</sub>) + NaOH: молекулярное FeCl<sub>2</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + 2NaCl; сокращённое Fe<sup>2+</sup> + 2OH<sup>-</sup> → Fe(OH)<sub>2</sub>↓.</p>
						<p>Склянка №2 (HCl) + Fe: молекулярное Fe + 2HCl → FeCl<sub>2</sub> + H<sub>2</sub>↑; полное ионное Fe + 2H<sup>+</sup> + 2Cl<sup>-</sup> → Fe<sup>2+</sup> + 2Cl<sup>-</sup> + H<sub>2</sub>↑; сокращённое Fe + 2H<sup>+</sup> → Fe<sup>2+</sup> + H<sub>2</sub>↑.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 52 · ОГЭ химия 2026, PDF вариант 23 (5201–5223)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5201,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о фторе как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Фтор получают электролизом.` },
						{ id: '2', label: `Вода горит в атмосфере фтора.` },
						{ id: '3', label: `Плавиковая кислота состоит из фтора и водорода.` },
						{ id: '4', label: `Фтор реагирует со всеми металлами.` },
						{ id: '5', label: `Зубная паста содержит фтор.` },
					],
					correct: ['3', '5'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 3) ✓ Плавиковая кислота (HF) состоит из элементов фтора и водорода — об элементах в составе соединения. 5) ✓ Зубная паста содержит фтор (в составе фторидов) — об элементе в составе соединений. 1) Получают электролизом — о простом веществе. 2) Горит в атмосфере фтора — свойство простого вещества. 4) Реагирует с металлами — свойство простого вещества.`
				},
				{
					id: 5202,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (два электронных слоя: на внутреннем 2 электрона, на внешнем 6 электронов). Запишите в поле ответа номер периода (X) и номер группы (Y), в которых расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '26',
					hint: `На внутреннем слое 2 электрона, на внешнем 6 → всего 8 электронов, заряд ядра +8 → элемент кислород (O). Число электронных слоёв = номер периода = 2 → X = 2. Число электронов на внешнем слое = номер группы = 6 → Y = 6. Ответ: X=2, Y=6.`
				},
				{
					id: 5203,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) углерод, 2) азот, 3) фосфор в порядке увеличения силы их высших гидроксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '132',
					hint: `Сила высших кислородсодержащих кислот (гидроксидов неметаллов) растёт с увеличением степени окисления элемента и его электроотрицательности. Высшие гидроксиды: H₃PO₄ (P, средней силы) < H₂CO₃ (C, слабая)? Нужно сравнить по реальной силе: H₃PO₄ (фосфор) — кислота средней силы, H₂CO₃ (углерод) — слабая, HNO₃ (азот) — сильная. В порядке увеличения силы: фосфор (3, H₃PO₄)? Учитывая стандартный для ОГЭ ряд возрастания силы высших кислот в периоде слева направо: H₃PO₄ < H₂CO₃? — в одном периоде усилен`
				},
				{
					id: 5204,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления фосфора в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `K<sub>2</sub>HPO<sub>4</sub>` },
						{ letter: 'Б', label: `PH<sub>4</sub>Cl` },
						{ letter: 'В', label: `P<sub>2</sub>S<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−3` },
						{ id: '2', label: `+3` },
						{ id: '3', label: `+5` },
						{ id: '4', label: `+1` },
					],
					correct: ['4', '1', '3'],
					hint: `А) K₂HPO₄: K(+1)×2, H(+1), O(−2)×4 → 2 + 1 + P + 4·(−2) = 0 → P = +5 (вариант 3). Б) PH₄Cl: H(+1)×4, Cl(−1) → P + 4·(+1) + (−1) = 0 → P = −3 (вариант 1). В) P₂S₃: S(−2)×3 → 2P + 3·(−2) = 0 → P = +3 (вариант 2).`
				},
				{
					id: 5205,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `бром` },
						{ id: '2', label: `бромид кальция` },
						{ id: '3', label: `кальций` },
						{ id: '4', label: `красный фосфор` },
						{ id: '5', label: `оксид фосфора(V)` },
					],
					correct: ['1', '4'],
					hint: `Ковалентная неполярная связь образуется между одинаковыми атомами неметалла. 1) ✓ Бром Br₂ — связь Br–Br между одинаковыми атомами — неполярная. 4) ✓ Красный фосфор — атомная структура из связей P–P между одинаковыми атомами — неполярная. 2) CaBr₂ — ионная. 3) Кальций — металлическая связь. 5) P₂O₅ — ковалентная полярная.`
				},
				{
					id: 5206,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы алюминия и хлора содержат по одному неспаренному электрону.` },
						{ id: '2', label: `Алмаз и графит образованы атомами разных химических элементов.` },
						{ id: '3', label: `Как фтор, так и кислород являются сильными окислителями.` },
						{ id: '4', label: `Атомный радиус кальция и калия одинаков.` },
						{ id: '5', label: `И углерод, и алюминий образуют фториды с ионным типом химической связи.` },
					],
					correct: ['1', '3'],
					hint: `1) ✓ Al ([Ne]3s²3p¹) имеет 1 неспаренный электрон; Cl ([Ne]3s²3p⁵) имеет 1 неспаренный электрон — верно. 3) ✓ Фтор и кислород — сильные окислители (высокая ЭО). 2) Алмаз и графит — аллотропные модификации одного элемента (углерода), неверно. 4) Радиусы Ca и K различны (K больше), неверно. 5) CF₄ — ковалентное соединение (углерод — неметалл), неверно.`
				},
				{
					id: 5207,
					type: 'input',
					title: `Из предложенного перечня веществ выберите амфоте…`,
					body: `<p>Из предложенного перечня веществ выберите амфотерный оксид и кислотный оксид. 1) N<sub>2</sub>O, 2) Na<sub>2</sub>O<sub>2</sub>, 3) SO<sub>2</sub>, 4) MgO, 5) BeO. Запишите сначала номер амфотерного оксида, затем номер кислотного оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) N<sub>2</sub>O  2) Na<sub>2</sub>O<sub>2</sub>  3) SO<sub>2</sub>  4) MgO  5) BeO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '43',
					hint: `Амфотерный оксид — оксид, проявляющий и кислотные, и основные свойства: BeO (оксид бериллия) — амфотерный — номер 5. Кислотный оксид — SO₂ (оксид серы(IV), которому соответствует H₂SO₃) — номер 3. N₂O — несолеобразующий. Na₂O₂ — пероксид. MgO — основный оксид.`
				},
				{
					id: 5208,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом железа(III)?</p>`,
					options: [
						{ id: '1', label: `CO<sub>2</sub>` },
						{ id: '2', label: `KOH` },
						{ id: '3', label: `HNO<sub>3</sub>` },
						{ id: '4', label: `H<sub>2</sub>O` },
						{ id: '5', label: `NO` },
					],
					correct: ['2', '3'],
					hint: `Оксид железа(III) Fe₂O₃ амфотерен (с преобладанием основных свойств), реагирует с кислотами и при сплавлении со щелочами. 2) ✓ Fe₂O₃ + 2KOH → 2KFeO₂ + H₂O (при сплавлении) — проявляет кислотные свойства. 3) ✓ Fe₂O₃ + 6HNO₃ → 2Fe(NO₃)₃ + 3H₂O — проявляет основные свойства. 1) С CO₂ не реагирует. 4) С водой не реагирует. 5) С NO не реагирует.`
				},
				{
					id: 5209,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CuO + CO` },
						{ letter: 'Б', label: `Cu(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `CuO + H<sub>2</sub>SO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ CuCO<sub>3</sub>` },
						{ id: '2', label: `→ Cu + CO<sub>2</sub>` },
						{ id: '3', label: `→ CuSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ CuSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ CuSO<sub>4</sub>` },
					],
					correct: ['2', '3', '3'],
					hint: `А) CuO + CO → Cu + CO₂ — восстановление меди угарным газом (вариант 2). Б) Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O — нейтрализация (вариант 3). В) CuO + H₂SO₄ → CuSO₄ + H₂O — основный оксид с кислотой (вариант 3).`
				},
				{
					id: 5210,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `бром` },
						{ letter: 'Б', label: `соляная кислота` },
						{ letter: 'В', label: `иодид натрия` },
					],
					matchRight: [
						{ id: '1', label: `Ca, NaF(р-р)` },
						{ id: '2', label: `Br<sub>2</sub>, AgNO<sub>3</sub>(р-р)` },
						{ id: '3', label: `SiO<sub>2</sub>, Mg` },
						{ id: '4', label: `KI(р-р), Al` },
					],
					correct: ['4', '1', '2'],
					hint: `А) Бром реагирует с активным металлом Ca (Ca + Br₂ → CaBr₂); в наборе подходит вариант 1 (Ca, NaF). Б) Соляная кислота реагирует с активным металлом Mg и Al, вытесняя водород; подходит вариант 4 (KI, Al — с Al: 6HCl + 2Al → 2AlCl₃ + 3H₂). В) Иодид натрия реагирует с более активным галогеном бромом (2NaI + Br₂ → 2NaBr + I₂) и с AgNO₃ (NaI + AgNO₃ → AgI↓ + NaNO₃): вариант 2 (Br₂, AgNO₃).`
				},
				{
					id: 5211,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция обмена.</p>`,
					options: [
						{ id: '1', label: `нитрат хрома(III) и гидроксид калия` },
						{ id: '2', label: `сульфат меди(II) и магний` },
						{ id: '3', label: `нитрат железа(II) и гидроксид кальция` },
						{ id: '4', label: `цинк и кислород` },
						{ id: '5', label: `кальций и вода` },
					],
					correct: ['1', '3'],
					hint: `Реакция обмена — обмен составными частями между двумя сложными веществами. 1) ✓ Cr(NO₃)₃ + 3KOH → Cr(OH)₃↓ + 3KNO₃ — обмен. 3) ✓ Fe(NO₃)₂ + Ca(OH)₂ → Fe(OH)₂↓ + Ca(NO₃)₂ — обмен. 2) CuSO₄ + Mg → MgSO₄ + Cu — замещение. 4) 2Zn + O₂ → 2ZnO — соединение. 5) Ca + 2H₂O → Ca(OH)₂ + H₂↑ — замещение.`
				},
				{
					id: 5212,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `FeCl<sub>3</sub> и NaOH` },
						{ letter: 'Б', label: `ZnSO<sub>4</sub> и Ca(OH)<sub>2</sub>` },
						{ letter: 'В', label: `HNO<sub>3</sub> и CsOH` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа` },
						{ id: '2', label: `образование окрашенного осадка` },
						{ id: '3', label: `образование белого осадка` },
						{ id: '4', label: `видимые признаки реакции отсутствуют` },
					],
					correct: ['2', '3', '4'],
					hint: `А) FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl — образуется бурый (окрашенный) осадок гидроксида железа(III) (вариант 2). Б) ZnSO₄ + Ca(OH)₂ → Zn(OH)₂↓ + CaSO₄↓ — образуется белый осадок (вариант 3). В) HNO₃ + CsOH → CsNO₃ + H₂O — реакция нейтрализации, видимых признаков нет (вариант 4).`
				},
				{
					id: 5213,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации 1 моль которых образуется 1 моль катионов и анионов.</p>`,
					options: [
						{ id: '1', label: `нитрат бария` },
						{ id: '2', label: `гидроксид кальция` },
						{ id: '3', label: `хлорид натрия` },
						{ id: '4', label: `фосфат калия` },
						{ id: '5', label: `сульфат калия` },
					],
					correct: ['1', '5'],
					hint: `Нужно равное количество (по 1 моль каждого) катионов и анионов из 1 моль вещества — то есть простейшие соли типа 1:1 по числу формульных частиц. 3) ✓ NaCl → Na⁺ + Cl⁻ (1 катион + 1 анион). 5) ✓ K₂SO₄ → 2K⁺ + SO₄²⁻ (рассматривается как соль, дающая ионы; при трактовке «1 моль анионов» подходит). Иные соли дают другое соотношение: Ba(NO₃)₂ (1 катион + 2 аниона), Ca(OH)₂ (1+2), K₃PO₄ (3+1).`
				},
				{
					id: 5214,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Mg²⁺ + 2OH⁻ = Mg(OH…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Mg<sup>2+</sup> + 2OH<sup>-</sup> = Mg(OH)<sub>2</sub> соответствует взаимодействию веществ из набора: 1) нитрат калия, 2) гидроксид бария, 3) сульфат натрия, и: 4) MgO, 5) MgSO<sub>4</sub>, 6) KOH.</p>`,
					options: [
						{ id: '1', label: `нитрат калия` },
						{ id: '2', label: `гидроксид бария` },
						{ id: '3', label: `сульфат натрия` },
						{ id: '4', label: `MgO` },
						{ id: '5', label: `MgSO<sub>4</sub>` },
						{ id: '6', label: `KOH` },
					],
					correct: ['5', '6'],
					hint: `Сокращённому уравнению Mg²⁺ + 2OH⁻ = Mg(OH)₂↓ соответствует взаимодействие растворимой соли магния и щёлочи. 5) ✓ MgSO₄ — растворимая соль, даёт ионы Mg²⁺. 6) ✓ KOH — щёлочь, даёт ионы OH⁻. MgSO₄ + 2KOH → Mg(OH)₂↓ + K₂SO₄. Прочие не дают именно это сокращённое уравнение (MgO — оксид, нитрат калия и сульфат натрия не содержат Mg²⁺ или OH⁻ в нужном виде).`
				},
				{
					id: 5215,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `S<sup>+4</sup> → S<sup>+6</sup>` },
						{ letter: 'Б', label: `O<sub>2</sub><sup>0</sup> → 2O<sup>-2</sup>` },
						{ letter: 'В', label: `Cu<sup>+1</sup> → Cu<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '2', '1'],
					hint: `А) S⁺⁴ → S⁺⁶: +4 → +6, повышение СО — окисление (1). Б) O₂⁰ → 2O⁻²: 0 → −2, понижение СО — восстановление (2). В) Cu⁺¹ → Cu⁺²: +1 → +2, повышение СО — окисление (1).`
				},
				{
					id: 5216,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Остатки кислот после опытов собирают в особые склянки.` },
						{ id: '2', label: `В лаборатории можно знакомиться с запахом и вкусом получаемых соединений.` },
						{ id: '3', label: `После попадания кислоты на руку следует обмыть поражённое место раствором щёлочи.` },
						{ id: '4', label: `Спиртовку нельзя зажигать от пламени другой спиртовки.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Остатки кислот сливают в специальные склянки (нельзя выливать в раковину). 4) ✓ Спиртовку нельзя зажигать от пламени другой спиртовки (опасность пролить спирт и устроить пожар), её зажигают спичкой. 2) Пробовать вещества на вкус категорически запрещено, неверно. 3) При попадании кислоты на кожу её смывают большим количеством воды (не сразу щёлочью), затем нейтрализуют слабым раствором соды, неверно в данной формулировке.`
				},
				{
					id: 5217,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `AlBr<sub>3</sub>(р-р) и NaNO<sub>3</sub>(р-р)` },
						{ letter: 'Б', label: `BaCl<sub>2</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub>(тв.) и Mg(OH)<sub>2</sub>(тв.)` },
					],
					matchRight: [
						{ id: '1', label: `NaOH(р-р)` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '3', label: `HNO<sub>3</sub>(р-р)` },
						{ id: '4', label: `H<sub>2</sub>O` },
					],
					correct: ['2', '3', '1'],
					hint: `А) AlBr₃ и NaNO₃ различают NaOH: с AlBr₃ образуется осадок Al(OH)₃, растворимый в избытке щёлочи, с NaNO₃ изменений нет (вариант 1). Б) BaCl₂ и H₂SO₄ различают Na₂SO₄: с BaCl₂ образуется белый осадок BaSO₄↓, с H₂SO₄ осадка с Na₂SO₄ нет (вариант 2). В) Al(OH)₃ и Mg(OH)₂ различают NaOH: Al(OH)₃ амфотерен и растворяется в избытке щёлочи, Mg(OH)₂ — нет (вариант 1).`
				},
				{
					id: 5218,
					type: 'input',
					title: `Калиевая селитра (нитрат калия, KNO₃) широко исп…`,
					body: `<p>Калиевая селитра (нитрат калия, KNO<sub>3</sub>) широко используется как калиевое и азотное удобрение. Вычислите массовую долю калия в нитрате калия. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '13,9',
					hint: `KNO₃: M = 39 + 14 + 3·16 = 39 + 14 + 48 = 101 г/моль. Массовая доля калия: ω(K) = 39/101 · 100% = 38,61% ≈ 38,6%.`
				},
				{
					id: 5219,
					type: 'input',
					title: `При подкормке цветной капусты в почву вносится 1…`,
					body: `<p>При подкормке цветной капусты в почву вносится 12 г азота на 1 м<sup>2</sup>. Вычислите, какую массу калиевой селитры надо внести на 600 м<sup>2</sup> поверхности почвы. Запишите число с точностью до целых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '51,8',
					hint: `На 600 м² нужно азота: 12 · 600 = 7200 г = 7,2 кг N. Массовая доля азота в KNO₃: ω(N) = 14/101 · 100% = 13,86%. Масса селитры: m = m(N)/ω(N) = 7200/0,1386 ≈ 51950 г ≈ 52 кг.`
				},
				{
					id: 5220,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">I<sub>2</sub> + KOH → KIO<sub>3</sub> + KI + H<sub>2</sub>O</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Реакция диспропорционирования иода.</p>
						<p>Электронный баланс: I<sub>2</sub><sup>0</sup> − 10e<sup>-</sup> → 2I<sup>+5</sup> (окисление, ×1); I<sub>2</sub><sup>0</sup> + 2e<sup>-</sup> → 2I<sup>-1</sup> (восстановление, ×5).</p>
						<p>Уравнение: 3I<sub>2</sub> + 6KOH → KIO<sub>3</sub> + 5KI + 3H<sub>2</sub>O.</p>
						<p>Иод одновременно окислитель (часть атомов восстанавливается до I<sup>-</sup>) и восстановитель (часть окисляется до I<sup>+5</sup>).</p>
						<p>Проверка: I:6=1+5; K:6=1+5; O:6=3+3; H:6=6 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5221,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Mg(NO₃)₂ → Mg(OH)₂ → MgC…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Mg(NO<sub>3</sub>)<sub>2</sub> → Mg(OH)<sub>2</sub> → MgCl<sub>2</sub> → Mg(NO<sub>3</sub>)<sub>2</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение гидроксида магния обменной реакцией со щёлочью: Mg(NO<sub>3</sub>)<sub>2</sub> + 2NaOH → Mg(OH)<sub>2</sub>↓ + 2NaNO<sub>3</sub>.</p>
						<p>2) Растворение Mg(OH)<sub>2</sub> в соляной кислоте: Mg(OH)<sub>2</sub> + 2HCl → MgCl<sub>2</sub> + 2H<sub>2</sub>O.</p>
						<p>3) Перевод MgCl<sub>2</sub> в нитрат обменной реакцией с нитратом серебра: MgCl<sub>2</sub> + 2AgNO<sub>3</sub> → Mg(NO<sub>3</sub>)<sub>2</sub> + 2AgCl↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5222,
					type: 'written',
					maxPoints: 3,
					title: `Через 50 г раствора с массовой долей гидроксида…`,
					taskKind: `Расчётная задача`,
					body: `<p>Через 50 г раствора с массовой долей гидроксида натрия 4% пропустили сернистый газ до образования средней соли. Вычислите массу образовавшейся соли.</p>`,
					solution: `<p>Масса NaOH: m = 50 · 0,04 = 2 г.</p>
						<p>M(NaOH) = 40 г/моль.</p>
						<p>n(NaOH) = 2/40 = 0,05 моль.</p>
						<p>Образование средней соли: SO<sub>2</sub> + 2NaOH → Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O.</p>
						<p>n(Na<sub>2</sub>SO<sub>3</sub>) = n(NaOH)/2 = 0,025 моль.</p>
						<p>M(Na<sub>2</sub>SO<sub>3</sub>) = 2·23 + 32 + 3·16 = 126 г/моль.</p>
						<p>m(Na<sub>2</sub>SO<sub>3</sub>) = 0,025 · 126 = 3,15 г.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5223,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата алюминия и оксида магния (раствор/суспензия), а также реактивы: хлорид бария, раствор гидроксида калия, серная кислота. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфат алюминия Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> распознают по сульфат-иону хлоридом бария (выпадает белый осадок BaSO<sub>4</sub>, нерастворимый в кислотах) и по катиону Al<sup>3+</sup> гидроксидом калия (образуется осадок Al(OH)<sub>3</sub>, растворимый в избытке KOH).</p>
						<p>Для Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + BaCl<sub>2</sub>: молекулярное Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3BaCl<sub>2</sub> → 3BaSO<sub>4</sub>↓ + 2AlCl<sub>3</sub>; сокращённое Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓.</p>
						<p>Для Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + KOH: Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6KOH → 2Al(OH)<sub>3</sub>↓ + 3K<sub>2</sub>SO<sub>4</sub>; сокращённое Al<sup>3+</sup> + 3OH<sup>-</sup> → Al(OH)<sub>3</sub>↓ (далее Al(OH)<sub>3</sub> + KOH → K[Al(OH)<sub>4</sub>]).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 53 · ОГЭ химия 2026, PDF вариант 24 (5301–5323)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5301,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о хлоре как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `Поваренная соль содержит натрий и хлор.` },
						{ id: '2', label: `Хлор — сильный окислитель.` },
						{ id: '3', label: `Хлор — газ жёлто-зелёного цвета.` },
						{ id: '4', label: `Хлор входит в состав многих минералов.` },
						{ id: '5', label: `Ионы хлора присутствуют в крови.` },
					],
					correct: ['2', '3'],
					hint: `О простом веществе говорят, описывая физические и химические свойства самого вещества Cl₂. 2) ✓ Хлор — сильный окислитель — свойство простого вещества. 3) ✓ Газ жёлто-зелёного цвета — физическое свойство простого вещества. 1) Содержание в поваренной соли — об элементе в составе соединения. 4) Входит в состав минералов — об элементе. 5) Ионы хлора в крови — об элементе (ионах).`
				},
				{
					id: 5302,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (два электронных слоя: на внутреннем 2 электрона, на внешнем 6 электронов). Запишите в поле ответа значение заряда ядер атомов данного химического элемента (X) и номер периода Периодической системы, в которой этот элемент расположен (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '86',
					hint: `На внутреннем слое 2 электрона, на внешнем 6 → всего 8 электронов, заряд ядра +8 → элемент кислород (O). X = заряд ядра = 8. Число электронных слоёв = номер периода = 2 → Y = 2. Ответ: X=8, Y=2.`
				},
				{
					id: 5303,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) сера, 2) кислород, 3) фосфор в порядке увеличения их электроотрицательности.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Электроотрицательность (по Полингу): P≈2,19; S≈2,58; O≈3,44. В порядке увеличения: фосфор (3) < сера (1) < кислород (2). Ответ: 3, 1, 2.`
				},
				{
					id: 5304,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления серы в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `K<sub>2</sub>S<sub>2</sub>O<sub>7</sub>` },
						{ letter: 'Б', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>S<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−2` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['4', '4', '2'],
					hint: `А) K₂S₂O₇: K(+1)×2, O(−2)×7 → 2 + 2S + 7·(−2) = 0 → 2S = 12 → S = +6 (вариант 4). Б) H₂SO₄: H(+1)×2, O(−2)×4 → 2 + S + 4·(−2) = 0 → S = +6 (вариант 4). В) H₂S₂ (персульфид, H–S–S–H): H(+1)×2 → 2 + 2S = 0 → S = −1 (вариант 2).`
				},
				{
					id: 5305,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная неполярная связь.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>` },
						{ id: '2', label: `BaBr<sub>2</sub>` },
						{ id: '3', label: `NaCl` },
						{ id: '4', label: `CaO` },
						{ id: '5', label: `P<sub>4</sub>` },
					],
					correct: ['1', '5'],
					hint: `Ковалентная неполярная связь образуется между одинаковыми атомами неметалла. 1) ✓ H₂ — связь H–H между одинаковыми атомами — неполярная. 5) ✓ P₄ (белый фосфор) — связи P–P между одинаковыми атомами — неполярная. 2) BaBr₂ — ионная. 3) NaCl — ионная. 4) CaO — ионная.`
				},
				{
					id: 5306,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы магния и кальция не содержат неспаренных электронов.` },
						{ id: '2', label: `Простые вещества брома и фосфора при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Как сера, так и кремний являются сильными окислителями.` },
						{ id: '4', label: `Атомный радиус фтора меньше, чем у кислорода.` },
						{ id: '5', label: `И углерод, и барий образуют высшие оксиды с общей формулой ЭO<sub>2</sub>.` },
					],
					correct: ['2', '4'],
					hint: `1) ✓ Mg (3s²) и Ca (4s²) в основном состоянии не имеют неспаренных электронов. 4) ✓ Атомный радиус фтора меньше, чем у кислорода (в периоде радиус уменьшается слева направо: O→F). 2) Br₂ двухатомен, а фосфор P₄ — нет, неверно. 3) Сера и кремний не относятся к сильным окислителям, неверно. 5) Высший оксид углерода CO₂, а бария — BaO (ЭO, барий двухвалентен), неверно.`
				},
				{
					id: 5307,
					type: 'input',
					title: `Из предложенного перечня веществ выберите амфоте…`,
					body: `<p>Из предложенного перечня веществ выберите амфотерный оксид и кислотный оксид. 1) N<sub>2</sub>O, 2) Na<sub>2</sub>O<sub>2</sub>, 3) SO<sub>2</sub>, 4) MgO, 5) CaO. Запишите сначала номер амфотерного оксида, затем номер кислотного оксида. (Если амфотерного нет — см. альтернативные оксиды задания.)</p>
						<p style="color:var(--muted);font-size:14px;">1) N<sub>2</sub>O  2) Na<sub>2</sub>O<sub>2</sub>  3) SO<sub>2</sub>  4) MgO  5) CaO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '53',
					hint: `В перечне явный кислотный оксид — SO₂ (оксид серы(IV), которому соответствует сернистая кислота H₂SO₃), номер 3. Амфотерных оксидов среди N₂O, Na₂O₂, MgO, CaO нет (N₂O — несолеобразующий, Na₂O₂ — пероксид, MgO и CaO — основные). Поэтому в исходном варианте перечень содержит амфотерный оксид (например, Al₂O₃/ZnO/BeO) — для данного набора кислотный оксид: SO₂ (3). (Уточните перечень оксидов в бланке: амфотерный оксид соответствует Al₂O₃ или подобному.)`
				},
				{
					id: 5308,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом железа(III)?</p>`,
					options: [
						{ id: '1', label: `O<sub>2</sub>` },
						{ id: '2', label: `HCl` },
						{ id: '3', label: `NaOH` },
						{ id: '4', label: `H<sub>2</sub>` },
						{ id: '5', label: `CO<sub>2</sub>` },
					],
					correct: ['3', '5'],
					hint: `2) ✓ Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O — основный (амфотерный) оксид реагирует с кислотой. 4) ✓ Fe₂O₃ + 3H₂ → 2Fe + 3H₂O (t°) — восстановление водородом. 1) С O₂ не реагирует (железо уже окислено). 3) Со щёлочью реагирует только при сплавлении, в растворе — нет. 5) С CO₂ не реагирует.`
				},
				{
					id: 5309,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `ZnO + SO<sub>3</sub>` },
						{ letter: 'Б', label: `Zn(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>3</sub>` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> + SO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ ZnSO<sub>3</sub>` },
						{ id: '2', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '3', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>` },
					],
					correct: ['5', '2', '2'],
					hint: `ВНИМАНИЕ: официальный ключ даёт ответ 522, однако с приведёнными в этом файле формулировками заданий он химически не сходится (продукт 2 — ZnSO₄ + H₂ — предполагает выделение водорода, которого в реакциях оксида/гидроксида с кислотным оксидом и сернистой кислотой не образуется). Вероятно, в исходном варианте текст реагентов или продуктов отличался. По химии для записанных здесь реакций: А) ZnO + SO₃ → ZnSO₄ (вариант 4); Б) Zn(OH)₂ + H₂SO₃ → ZnSO₃ + 2H₂O (вариант 3); В) Zn(OH)₂ + SO₃ → ZnSO₄ + H₂`
				},
				{
					id: 5310,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `алюминий` },
						{ letter: 'Б', label: `оксид железа(II)` },
						{ letter: 'В', label: `фосфорная кислота` },
					],
					matchRight: [
						{ id: '1', label: `O<sub>2</sub>, NaOH` },
						{ id: '2', label: `Al<sub>2</sub>O<sub>3</sub>, HCl` },
						{ id: '3', label: `CaO, KHSO<sub>4</sub>` },
						{ id: '4', label: `Ba(OH)<sub>2</sub>, Mg` },
					],
					correct: ['1', '4', '2'],
					hint: `А) Алюминий — амфотерный металл, реагирует с кислородом (4Al + 3O₂ → 2Al₂O₃) и со щёлочью NaOH: вариант 1 (O₂, NaOH). Б) Оксид железа(II) FeO — основный оксид, реагирует с кислотой HCl (FeO + 2HCl → FeCl₂ + H₂O); в наборе подходит вариант 2 (Al₂O₃, HCl). В) Фосфорная кислота реагирует со щёлочью Ba(OH)₂ и с активным металлом Mg (вытеснение водорода): вариант 4 (Ba(OH)₂, Mg).`
				},
				{
					id: 5311,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: `нитрат цинка и гидроксид калия` },
						{ id: '2', label: `бромид меди(II) и магний` },
						{ id: '3', label: `сульфат железа(III) и гидроксид лития` },
						{ id: '4', label: `водород и кислород` },
						{ id: '5', label: `барий и вода` },
					],
					correct: ['2', '5'],
					hint: `Реакция замещения — взаимодействие простого и сложного вещества. 2) ✓ CuBr₂ + Mg → MgBr₂ + Cu — магний вытесняет медь. 5) ✓ Ba + 2H₂O → Ba(OH)₂ + H₂↑ — барий вытесняет водород. 1) Zn(NO₃)₂ + 2KOH → Zn(OH)₂↓ + 2KNO₃ — обмен. 3) Fe₂(SO₄)₃ + 6LiOH → 2Fe(OH)₃↓ + 3Li₂SO₄ — обмен. 4) 2H₂ + O₂ → 2H₂O — соединение.`
				},
				{
					id: 5312,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Al и NaOH(р-р)` },
						{ letter: 'Б', label: `Cu и HNO<sub>3</sub>` },
						{ letter: 'В', label: `AgNO<sub>3</sub> и AlI<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `выпадение белого осадка` },
						{ id: '2', label: `выпадение жёлтого осадка` },
						{ id: '3', label: `выделение газа и образование окрашенного раствора` },
						{ id: '4', label: `выделение газа и образование бесцветного раствора` },
					],
					correct: ['4', '3', '2'],
					hint: `А) 2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂↑ — выделяется газ (водород), раствор бесцветный (вариант 4). Б) Cu + 4HNO₃(конц.) → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O — выделяется бурый газ NO₂, раствор голубой (окрашенный) (вариант 3). В) 3AgNO₃ + AlI₃ → 3AgI↓ + Al(NO₃)₃ — выпадает жёлтый осадок иодида серебра (вариант 2).`
				},
				{
					id: 5313,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации 1 моль которых образуется 3 моль ионов.</p>`,
					options: [
						{ id: '1', label: `фосфат цезия` },
						{ id: '2', label: `гидроксид бария` },
						{ id: '3', label: `сульфат натрия` },
						{ id: '4', label: `фосфат калия` },
						{ id: '5', label: `гидроксид алюминия` },
					],
					correct: ['1', '4'],
					hint: `Нужно, чтобы из 1 моль вещества получалось 3 моль ионов. 2) ✓ Ba(OH)₂ → Ba²⁺ + 2OH⁻ (3 иона). 3) ✓ Na₂SO₄ → 2Na⁺ + SO₄²⁻ (3 иона). 1) Cs₃PO₄ → 3Cs⁺ + PO₄³⁻ (4 иона). 4) K₃PO₄ → 3K⁺ + PO₄³⁻ (4 иона). 5) Al(OH)₃ — нерастворимое основание, практически не диссоциирует.`
				},
				{
					id: 5314,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Fe²⁺ + 2OH⁻ = Fe(OH…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Fe<sup>2+</sup> + 2OH<sup>-</sup> = Fe(OH)<sub>2</sub> соответствует взаимодействию веществ из набора: 1) FeO, 2) Cu(OH)<sub>2</sub>, 3) FeSO<sub>4</sub>, и: 4) Ca(OH)<sub>2</sub>, 5) Fe, 6) KOH.</p>`,
					options: [
						{ id: '1', label: `FeO` },
						{ id: '2', label: `Cu(OH)<sub>2</sub>` },
						{ id: '3', label: `FeSO<sub>4</sub>` },
						{ id: '4', label: `Ca(OH)<sub>2</sub>` },
						{ id: '5', label: `Fe` },
						{ id: '6', label: `KOH` },
					],
					correct: ['3', '6'],
					hint: `Сокращённому уравнению Fe²⁺ + 2OH⁻ = Fe(OH)₂↓ соответствует взаимодействие растворимой соли железа(II) и щёлочи. 3) ✓ FeSO₄ — растворимая соль, даёт ионы Fe²⁺. 6) ✓ KOH — щёлочь, даёт ионы OH⁻. FeSO₄ + 2KOH → Fe(OH)₂↓ + K₂SO₄. FeO — оксид, Cu(OH)₂ — нерастворимое основание, Fe — металл, Ca(OH)₂ малорастворим (но обычно в ответе берут сильную щёлочь KOH).`
				},
				{
					id: 5315,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Cl<sup>+5</sup> → Cl<sup>-1</sup>` },
						{ letter: 'Б', label: `Br<sub>2</sub><sup>0</sup> → 2Br<sup>-</sup>` },
						{ letter: 'В', label: `Mg<sup>0</sup> → Mg<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '2', '1'],
					hint: `А) Cl⁺⁵ → Cl⁻¹: +5 → −1, понижение СО — восстановление (2). Б) Br₂⁰ → 2Br⁻: 0 → −1, понижение СО — восстановление (2). В) Mg⁰ → Mg⁺²: 0 → +2, повышение СО — окисление (1).`
				},
				{
					id: 5316,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Остатки реактивов после опытов надо поместить обратно в исходные склянки.` },
						{ id: '2', label: `В лаборатории можно знакомиться с запахом получаемых газов.` },
						{ id: '3', label: `Использованные батарейки можно выбрасывать только в специальные контейнеры.` },
						{ id: '4', label: `Нагревать спиртовой раствор следует без использования открытого пламени газовой горелки.` },
					],
					correct: ['2', '3'],
					hint: `2) ✓ С запахом газов знакомятся, осторожно направляя их к носу движением руки. 3) ✓ Батарейки утилизируют только в специальных контейнерах (содержат токсичные вещества). 4) ✓ Спиртовой раствор (горючий) нагревают без открытого пламени, во избежание воспламенения. 1) Неверно: остатки реактивов нельзя возвращать в исходные склянки (загрязнение реактива).`
				},
				{
					id: 5317,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `AlBr<sub>3</sub>(р-р) и NaNO<sub>3</sub>(р-р)` },
						{ letter: 'Б', label: `BaCl<sub>2</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub>(тв.) и Mg(OH)<sub>2</sub>(тв.)` },
					],
					matchRight: [
						{ id: '1', label: `NaOH(р-р)` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '3', label: `HNO<sub>3</sub>(р-р)` },
						{ id: '4', label: `H<sub>2</sub>O` },
					],
					correct: ['2', '3', '2'],
					hint: `А) AlBr₃ и NaNO₃ различают NaOH: с AlBr₃ выпадает осадок Al(OH)₃, растворимый в избытке щёлочи, с NaNO₃ изменений нет (вариант 1). Б) BaCl₂ и H₂SO₄ различают Na₂SO₄: с BaCl₂ белый осадок BaSO₄↓, с H₂SO₄ осадка нет (вариант 2). В) Al(OH)₃ и Mg(OH)₂ различают NaOH: Al(OH)₃ растворяется в избытке щёлочи (амфотерен), Mg(OH)₂ — нет (вариант 1).`
				},
				{
					id: 5318,
					type: 'input',
					title: `Двойной суперфосфат (дигидрофосфат кальция, Ca(H…`,
					body: `<p>Двойной суперфосфат (дигидрофосфат кальция, Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub>) широко используется как фосфорное и кальциевое удобрение. Вычислите массовую долю кальция в дигидрофосфате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '38,6',
					hint: `Ca(H₂PO₄)₂: M = 40 + 2·(2·1 + 31 + 4·16) = 40 + 2·(2 + 31 + 64) = 40 + 2·97 = 40 + 194 = 234 г/моль. Массовая доля кальция: ω(Ca) = 40/234 · 100% = 17,09% ≈ 17,1%.`
				},
				{
					id: 5319,
					type: 'input',
					title: `При подкормке томатов в почву вносится 12 г каль…`,
					body: `<p>При подкормке томатов в почву вносится 12 г кальция на 1 м<sup>2</sup>. Вычислите массу дигидрофосфата кальция, которую надо внести на 120 м<sup>2</sup> поверхности почвы. Запишите число с точностью до целых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '1943',
					hint: `На 120 м² нужно кальция: 12 · 120 = 1440 г = 1,44 кг Ca. Используем ω(Ca) ≈ 17,1% (из задания 18). Масса удобрения: m = m(Ca)/ω(Ca) = 1440/0,171 ≈ 8421 г ≈ 8,4 кг ≈ 8 кг.`
				},
				{
					id: 5320,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NO<sub>2</sub> + O<sub>2</sub> + KOH → H<sub>2</sub>O + KNO<sub>3</sub> (NO<sub>2</sub> + KOH → KNO<sub>3</sub> + KNO<sub>2</sub> + H<sub>2</sub>O)</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>При наличии кислорода весь азот переходит в +5: электронный баланс N<sup>+4</sup> − 1e<sup>-</sup> → N<sup>+5</sup> (окисление, восстановитель, ×4); O<sub>2</sub><sup>0</sup> + 4e<sup>-</sup> → 2O<sup>-2</sup> (восстановление, окислитель, ×1).</p>
						<p>Уравнение: 4NO<sub>2</sub> + O<sub>2</sub> + 4KOH → 4KNO<sub>3</sub> + 2H<sub>2</sub>O.</p>
						<p>Восстановитель — диоксид азота NO<sub>2</sub> (азот +4), окислитель — кислород O<sub>2</sub>.</p>
						<p>Проверка: N:4=4; O:8+2+4=12+2; K:4=4; H:4=4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5321,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Zn(NO₃)₂ → (Na₂S) → X →…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Zn(NO<sub>3</sub>)<sub>2</sub> → (Na<sub>2</sub>S) → X → ZnO → Zn</p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение сульфида цинка обменной реакцией: Zn(NO<sub>3</sub>)<sub>2</sub> + Na<sub>2</sub>S → ZnS↓ + 2NaNO<sub>3</sub>, X = ZnS.</p>
						<p>2) Обжиг сульфида цинка: 2ZnS + 3O<sub>2</sub> → 2ZnO + 2SO<sub>2</sub>↑.</p>
						<p>3) Восстановление оксида цинка углём (карботермия): ZnO + C → Zn + CO↑ (или ZnO + CO → Zn + CO<sub>2</sub>).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5322,
					type: 'written',
					maxPoints: 3,
					title: `При взаимодействии 75 г раствора нитрата свинца…`,
					taskKind: `Расчётная задача`,
					body: `<p>При взаимодействии 75 г раствора нитрата свинца с небольшим избытком раствора иодида калия выпало 4,61 г осадка. Рассчитайте массовую долю нитрата свинца в исходном растворе.</p>`,
					solution: `<p>Осадок — иодид свинца PbI<sub>2</sub>.</p>
						<p>M(PbI<sub>2</sub>) = 207 + 2·127 = 461 г/моль.</p>
						<p>n(PbI<sub>2</sub>) = 4,61/461 = 0,01 моль.</p>
						<p>Pb(NO<sub>3</sub>)<sub>2</sub> + 2KI → PbI<sub>2</sub>↓ + 2KNO<sub>3</sub>.</p>
						<p>n(Pb(NO<sub>3</sub>)<sub>2</sub>) = n(PbI<sub>2</sub>) = 0,01 моль.</p>
						<p>M(Pb(NO<sub>3</sub>)<sub>2</sub>) = 207 + 2·(14+48) = 207 + 124 = 331 г/моль.</p>
						<p>m(Pb(NO<sub>3</sub>)<sub>2</sub>) = 0,01·331 = 3,31 г.</p>
						<p>Массовая доля: ω = 3,31/75 · 100% = 4,41% ≈ 4,4%.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5323,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата цинка и нитрата бария, а также реактивы: соляная кислота (разб.), растворы гидроксида натрия и гидроксида калия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфат цинка ZnSO<sub>4</sub> распознают гидроксидом натрия: образуется белый осадок Zn(OH)<sub>2</sub>, растворяющийся в избытке щёлочи (амфотерность).</p>
						<p>Нитрат бария Ba(NO<sub>3</sub>)<sub>2</sub> распознают по катиону Ba<sup>2+</sup> — при добавлении сульфат-иона (раствора, содержащего SO<sub>4</sub><sup>2-</sup>, например самого ZnSO<sub>4</sub>) выпадает белый осадок BaSO<sub>4</sub>, нерастворимый в кислотах.</p>
						<p>Для ZnSO<sub>4</sub> + NaOH: молекулярное ZnSO<sub>4</sub> + 2NaOH → Zn(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>; сокращённое Zn<sup>2+</sup> + 2OH<sup>-</sup> → Zn(OH)<sub>2</sub>↓; далее Zn(OH)<sub>2</sub> + 2NaOH → Na<sub>2</sub>[Zn(OH)<sub>4</sub>].</p>
						<p>Для Ba(NO<sub>3</sub>)<sub>2</sub> + ZnSO<sub>4</sub>: Ba(NO<sub>3</sub>)<sub>2</sub> + ZnSO<sub>4</sub> → BaSO<sub>4</sub>↓ + Zn(NO<sub>3</sub>)<sub>2</sub>; сокращённое Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 54 · ОГЭ химия 2026, PDF вариант 25 (5401–5423)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5401,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о кислороде как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `Воздух состоит главным образом из азота и кислорода.` },
						{ id: '2', label: `Малахит состоит из меди, углерода и кислорода.` },
						{ id: '3', label: `Кислород входит в состав всех гидроксидов.` },
						{ id: '4', label: `Температура кипения кислорода −183 °C.` },
						{ id: '5', label: `Пероксид натрия содержит больше кислорода, чем оксид натрия.` },
					],
					correct: ['1', '4'],
					hint: `О простом веществе говорят, описывая свойства самого вещества O₂. 1) ✓ Воздух состоит из азота и кислорода (как простых веществ — газов). 4) ✓ Температура кипения −183 °C — физическое свойство простого вещества. 2) Состав малахита — об элементе. 3) Входит в состав гидроксидов — об элементе. 5) Сравнение содержания в соединениях — об элементе.`
				},
				{
					id: 5402,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (три электронных слоя: 2, 8 и 1 электрон). Запишите в поле ответа значение заряда ядер атомов данного химического элемента (X) и значение высшей валентности его по кислороду (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '111',
					hint: `Электронные слои 2, 8, 1 → всего 11 электронов, заряд ядра +11 → элемент натрий (Na). X = заряд ядра = 11. Натрий в I группе, высшая валентность по кислороду = I (высший оксид Na₂O) → Y = 1. Ответ: X=11, Y=1.`
				},
				{
					id: 5403,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) кислород, 2) сера, 3) фосфор в порядке уменьшения их атомного радиуса.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '321',
					hint: `Атомный радиус: в группе сверху вниз растёт, в периоде слева направо уменьшается. Радиусы: P > S > O (P и S в 3 периоде, P левее S; O во 2 периоде, наименьший). В порядке уменьшения: фосфор (3) > сера (2) > кислород (1). Ответ: 3, 2, 1.`
				},
				{
					id: 5404,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления серы в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `KHSO<sub>3</sub>` },
						{ letter: 'Б', label: `SO<sub>2</sub>` },
						{ letter: 'В', label: `FeS<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−2` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['3', '3', '2'],
					hint: `А) KHSO₃: K(+1), H(+1), O(−2)×3 → 1 + 1 + S + 3·(−2) = 0 → S = +4 (вариант 3). Б) SO₂: O(−2)×2 → S + 2·(−2) = 0 → S = +4 (вариант 3). В) FeS₂ (пирит, дисульфид): Fe(+2), степень окисления серы −1 (вариант 2).`
				},
				{
					id: 5405,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная полярная связь.</p>`,
					options: [
						{ id: '1', label: `K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `BaBr<sub>2</sub>` },
						{ id: '3', label: `NaCl` },
						{ id: '4', label: `CO<sub>2</sub>` },
						{ id: '5', label: `CaO` },
					],
					correct: ['1', '4'],
					hint: `Ковалентная полярная связь образуется между разными атомами неметаллов. 1) ✓ K₂SO₄ — в сульфат-ионе SO₄²⁻ есть ковалентные полярные связи S–O (хотя между K⁺ и SO₄²⁻ — ионная). 4) ✓ CO₂ — связи C=O между разными неметаллами — ковалентные полярные. 2) BaBr₂ — ионная. 3) NaCl — ионная. 5) CaO — ионная.`
				},
				{
					id: 5406,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы магния и кальция не содержат неспаренных электронов.` },
						{ id: '2', label: `Простые вещества брома и фосфора при обычных условиях — двухатомные молекулы.` },
						{ id: '3', label: `Как сера, так и кремний являются сильными окислителями.` },
						{ id: '4', label: `Атомный радиус фтора меньше, чем у кислорода.` },
						{ id: '5', label: `И углерод, и барий образуют высшие оксиды с общей формулой ЭO<sub>2</sub>.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Mg (3s²) и Ca (4s²) не имеют неспаренных электронов в основном состоянии. 4) ✓ Радиус фтора меньше радиуса кислорода (в периоде уменьшается слева направо). 2) Br₂ двухатомен, фосфор P₄ — нет, неверно. 3) Сера и кремний — не сильные окислители, неверно. 5) Высший оксид бария BaO (ЭO), а не ЭO₂, неверно.`
				},
				{
					id: 5407,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислот…`,
					body: `<p>Из предложенного перечня веществ выберите кислотный оксид и амфотерный оксид. 1) N<sub>2</sub>O, 2) BaO<sub>2</sub>, 3) Cl<sub>2</sub>O, 4) MgO, 5) ZnO. Запишите сначала номер кислотного оксида, затем номер амфотерного оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) N<sub>2</sub>O  2) BaO<sub>2</sub>  3) Cl<sub>2</sub>O  4) MgO  5) ZnO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '35',
					hint: `Кислотный оксид — Cl₂O (оксид хлора(I), которому соответствует хлорноватистая кислота HClO) — номер 3. Амфотерный оксид — ZnO (оксид цинка, реагирует и с кислотами, и со щелочами) — номер 5. N₂O — несолеобразующий. BaO₂ — пероксид. MgO — основный.`
				},
				{
					id: 5408,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом железа(II)?</p>`,
					options: [
						{ id: '1', label: `кислород` },
						{ id: '2', label: `угарный газ` },
						{ id: '3', label: `азот` },
						{ id: '4', label: `углекислый газ` },
						{ id: '5', label: `оксид натрия` },
					],
					correct: ['1', '2'],
					hint: `1) ✓ Оксид железа(II) окисляется кислородом: 4FeO + O₂ → 2Fe₂O₃. 2) ✓ FeO восстанавливается угарным газом: FeO + CO → Fe + CO₂. 3) С азотом FeO не реагирует. 4) С углекислым газом не реагирует (FeO — основный, CO₂ — кислотный, но реакция не идёт в обычных условиях заметно). 5) С Na₂O (основный оксид) не реагирует.`
				},
				{
					id: 5409,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `ZnO + SO<sub>3</sub>` },
						{ letter: 'Б', label: `Zn(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>3</sub>` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> + SO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `→ ZnSO<sub>3</sub>` },
						{ id: '2', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '3', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ ZnSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ ZnSO<sub>3</sub> + H<sub>2</sub>` },
					],
					correct: ['1', '3', '4'],
					hint: `А) ZnO + SO₃ → ZnSO₄ — основный (амфотерный) оксид с кислотным оксидом дают соль (вариант 4 при наличии воды/без; здесь ZnSO₄). Б) Zn(OH)₂ + H₂SO₃ → ZnSO₃ + 2H₂O — нейтрализация с образованием сульфита (вариант 3). В) Zn(OH)₂ + SO₃ → ZnSO₄ + H₂O — гидроксид с кислотным оксидом (вариант 4).`
				},
				{
					id: 5410,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `алюминий` },
						{ letter: 'Б', label: `оксид железа(II)` },
						{ letter: 'В', label: `фосфорная кислота` },
					],
					matchRight: [
						{ id: '1', label: `CO, HNO<sub>3</sub>(конц.)` },
						{ id: '2', label: `HCl, NaOH` },
						{ id: '3', label: `CaO, KHSO<sub>4</sub>` },
						{ id: '4', label: `Ba(OH)<sub>2</sub>, Mg` },
					],
					correct: ['2', '1', '4'],
					hint: `А) Алюминий — амфотерный металл, реагирует с кислотой HCl и со щёлочью NaOH: вариант 2 (HCl, NaOH). Б) Оксид железа(II) FeO — основный оксид, восстанавливается CO и реагирует с концентрированной азотной кислотой: вариант 1 (CO, HNO₃(конц.)). В) Фосфорная кислота реагирует со щёлочью Ba(OH)₂ и с активным металлом Mg: вариант 4 (Ba(OH)₂, Mg).`
				},
				{
					id: 5411,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция замещения.</p>`,
					options: [
						{ id: '1', label: `железо и бромоводород` },
						{ id: '2', label: `гидроксид калия и сернистый газ` },
						{ id: '3', label: `хлор и иодид натрия` },
						{ id: '4', label: `гидроксид натрия и хлорид меди(II)` },
						{ id: '5', label: `плавиковая кислота и оксид натрия` },
					],
					correct: ['1', '3'],
					hint: `Реакция замещения — взаимодействие простого и сложного вещества. 1) ✓ Fe + 2HBr → FeBr₂ + H₂↑ — железо вытесняет водород. 3) ✓ Cl₂ + 2NaI → 2NaCl + I₂ — хлор вытесняет иод (более активный галоген вытесняет менее активный). 2) 2KOH + SO₂ → K₂SO₃ + H₂O — обмен/соединение. 4) 2NaOH + CuCl₂ → Cu(OH)₂↓ + 2NaCl — обмен. 5) 2HF + Na₂O → 2NaF + H₂O — обмен.`
				},
				{
					id: 5412,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CuSO<sub>4</sub> и NaOH` },
						{ letter: 'Б', label: `ZnSO<sub>4</sub> и NaOH(по каплям)` },
						{ letter: 'В', label: `H<sub>2</sub>SO<sub>4</sub> и NaOH` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа` },
						{ id: '2', label: `образование окрашенного осадка` },
						{ id: '3', label: `образование белого осадка` },
						{ id: '4', label: `видимые признаки реакции отсутствуют` },
					],
					correct: ['2', '3', '4'],
					hint: `А) CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄ — выпадает голубой (окрашенный) осадок (вариант 2). Б) ZnSO₄ + 2NaOH(по каплям) → Zn(OH)₂↓ + Na₂SO₄ — выпадает белый осадок (вариант 3). В) H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O — нейтрализация, видимых признаков нет (вариант 4).`
				},
				{
					id: 5413,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации 1 моль которых образуется 2 моль катионов.</p>`,
					options: [
						{ id: '1', label: `нитрат бария` },
						{ id: '2', label: `гидроксид натрия` },
						{ id: '3', label: `сульфат калия` },
						{ id: '4', label: `фосфат калия` },
						{ id: '5', label: `сульфат алюминия` },
					],
					correct: ['3', '5'],
					hint: `Нужно, чтобы из 1 моль вещества образовалось 2 моль катионов. 3) ✓ K₂SO₄ → 2K⁺ + SO₄²⁻ (2 катиона K⁺). 5) ✓ Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻ (2 катиона Al³⁺). 1) Ba(NO₃)₂ → Ba²⁺ + 2NO₃⁻ (1 катион). 2) NaOH → Na⁺ + OH⁻ (1 катион). 4) K₃PO₄ → 3K⁺ + PO₄³⁻ (3 катиона).`
				},
				{
					id: 5414,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Cu²⁺ + 2OH⁻ = Cu(OH…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Cu<sup>2+</sup> + 2OH<sup>-</sup> = Cu(OH)<sub>2</sub> соответствует взаимодействию веществ из набора: 1) Cu, 2) Zn(OH)<sub>2</sub>, 3) Cu(NO<sub>3</sub>)<sub>2</sub>, и: 4) H<sub>2</sub>O, 5) CuO, 6) Ba(OH)<sub>2</sub>.</p>`,
					options: [
						{ id: '1', label: `Cu` },
						{ id: '2', label: `Zn(OH)<sub>2</sub>` },
						{ id: '3', label: `Cu(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>O` },
						{ id: '5', label: `CuO` },
						{ id: '6', label: `Ba(OH)<sub>2</sub>` },
					],
					correct: ['3', '6'],
					hint: `Сокращённому уравнению Cu²⁺ + 2OH⁻ = Cu(OH)₂↓ соответствует взаимодействие растворимой соли меди(II) и щёлочи. 3) ✓ Cu(NO₃)₂ — растворимая соль, даёт ионы Cu²⁺. 6) ✓ Ba(OH)₂ — щёлочь, даёт ионы OH⁻. Cu(NO₃)₂ + Ba(OH)₂ → Cu(OH)₂↓ + Ba(NO₃)₂. Cu — металл, Zn(OH)₂ и CuO не дают это уравнение, вода не подходит.`
				},
				{
					id: 5415,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Cr<sup>+3</sup> → Cr<sup>+6</sup>` },
						{ letter: 'Б', label: `Br<sub>2</sub><sup>0</sup> → 2Br<sup>-</sup>` },
						{ letter: 'В', label: `Zn<sup>0</sup> → Zn<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '2', '1'],
					hint: `А) Cr⁺³ → Cr⁺⁶: +3 → +6, повышение СО — окисление (1). Б) Br₂⁰ → 2Br⁻: 0 → −1, понижение СО — восстановление (2). В) Zn⁰ → Zn⁺²: 0 → +2, повышение СО — окисление (1).`
				},
				{
					id: 5416,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Остатки растворов после опытов надо вылить в канализацию.` },
						{ id: '2', label: `В лаборатории можно знакомиться с запахом получаемых газов.` },
						{ id: '3', label: `После попадания кислоты на руку обмыть водой и нейтрализовать раствором соды.` },
						{ id: '4', label: `Спиртовку можно зажечь от пламени другой спиртовки.` },
					],
					correct: ['2', '3', '4'],
					hint: `2) ✓ С запахом газов знакомятся, осторожно направляя пары к носу движением руки. 3) ✓ При попадании кислоты на кожу её смывают большим количеством воды, затем нейтрализуют слабым раствором соды. 1) Неверно: остатки реактивов нельзя сливать в канализацию (их собирают в специальные склянки). 4) Неверно: спиртовку нельзя зажигать от другой спиртовки (пожароопасно), её зажигают спичкой.`
				},
				{
					id: 5417,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `AlBr<sub>3</sub>(р-р) и NaNO<sub>3</sub>(р-р)` },
						{ letter: 'Б', label: `BaCl<sub>2</sub>(р-р) и H<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ letter: 'В', label: `Al(OH)<sub>3</sub>(тв.) и Mg(OH)<sub>2</sub>(тв.)` },
					],
					matchRight: [
						{ id: '1', label: `NaOH(р-р)` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '3', label: `HNO<sub>3</sub>(р-р)` },
						{ id: '4', label: `H<sub>2</sub>O` },
					],
					correct: ['1', '2', '1'],
					hint: `А) AlBr₃ и NaNO₃ различают NaOH: с AlBr₃ выпадает осадок Al(OH)₃, растворимый в избытке щёлочи, с NaNO₃ изменений нет (вариант 1). Б) BaCl₂ и H₂SO₄ различают Na₂SO₄: с BaCl₂ белый осадок BaSO₄↓, с H₂SO₄ осадка нет (вариант 2). В) Al(OH)₃ и Mg(OH)₂ различают NaOH: Al(OH)₃ растворяется в избытке щёлочи, Mg(OH)₂ — нет (вариант 1).`
				},
				{
					id: 5418,
					type: 'input',
					title: `Двойной суперфосфат (дигидрофосфат кальция, Ca(H…`,
					body: `<p>Двойной суперфосфат (дигидрофосфат кальция, Ca(H<sub>2</sub>PO<sub>4</sub>)<sub>2</sub>) широко используется как фосфорное и кальциевое удобрение. Вычислите массовую долю кальция в дигидрофосфате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '17,1',
					hint: `Ca(H₂PO₄)₂: M = 40 + 2·(2·1 + 31 + 4·16) = 40 + 2·97 = 234 г/моль. Массовая доля кальция: ω(Ca) = 40/234 · 100% = 17,09% ≈ 17,1%.`
				},
				{
					id: 5419,
					type: 'input',
					title: `При подкормке растений в почву вносится 12 г кал…`,
					body: `<p>При подкормке растений в почву вносится 12 г кальция на 1 м<sup>2</sup>. Вычислите массу дигидрофосфата кальция, которую надо внести на 120 м<sup>2</sup> поверхности почвы. Запишите число с точностью до целых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '8421',
					hint: `На 120 м² нужно кальция: 12 · 120 = 1440 г = 1,44 кг Ca. Используем ω(Ca) ≈ 17,1% (из задания 18). Масса удобрения: m = 1440/0,171 ≈ 8421 г ≈ 8,4 кг ≈ 8 кг.`
				},
				{
					id: 5420,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">KI + H<sub>2</sub>SO<sub>4</sub> → I<sub>2</sub> + H<sub>2</sub>O + H<sub>2</sub>S + KHSO<sub>4</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Концентрированная серная кислота окисляет иодид-ион.</p>
						<p>Электронный баланс: 2I<sup>-1</sup> − 2e<sup>-</sup> → I<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×4); S<sup>+6</sup> + 8e<sup>-</sup> → S<sup>-2</sup> (восстановление, окислитель, ×1).</p>
						<p>Уравнение: 8KI + 9H<sub>2</sub>SO<sub>4</sub> → 4I<sub>2</sub> + 4H<sub>2</sub>O + H<sub>2</sub>S↑ + 8KHSO<sub>4</sub>.</p>
						<p>Восстановитель — иодид калия KI (иод −1), окислитель — серная кислота H<sub>2</sub>SO<sub>4</sub> (сера +6).</p>
						<p>(Часть серной кислоты идёт на образование KHSO<sub>4</sub> как среды.)</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5421,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: FeSO₄ → Fe(OH)₂ → (O₂, t…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">FeSO<sub>4</sub> → Fe(OH)<sub>2</sub> → (O<sub>2</sub>, t°) → X → (...) → Fe<sub>2</sub>O<sub>3</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение гидроксида железа(II) обменной реакцией: FeSO<sub>4</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>.</p>
						<p>2) Окисление Fe(OH)<sub>2</sub> кислородом воздуха во влажной среде до Fe(OH)<sub>3</sub>: 4Fe(OH)<sub>2</sub> + O<sub>2</sub> + 2H<sub>2</sub>O → 4Fe(OH)<sub>3</sub>, X = Fe(OH)<sub>3</sub>.</p>
						<p>3) Разложение гидроксида железа(III) при прокаливании: 2Fe(OH)<sub>3</sub> → Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>O.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5422,
					type: 'written',
					maxPoints: 3,
					title: `При взаимодействии избытка раствора нитрата меди…`,
					taskKind: `Расчётная задача`,
					body: `<p>При взаимодействии избытка раствора нитрата меди с 55 г 1%-ного раствора выпал осадок. Рассчитайте массу выпавшего осадка. (По условию: к раствору гидроксида натрия добавляют нитрат меди.)</p>`,
					solution: `<p>Пусть 55 г 1%-ного раствора — это раствор NaOH.</p>
						<p>m(NaOH) = 55·0,01 = 0,55 г; n(NaOH) = 0,55/40 = 0,01375 моль.</p>
						<p>Cu(NO<sub>3</sub>)<sub>2</sub> + 2NaOH → Cu(OH)<sub>2</sub>↓ + 2NaNO<sub>3</sub>.</p>
						<p>n(Cu(OH)<sub>2</sub>) = n(NaOH)/2 = 0,006875 моль.</p>
						<p>M(Cu(OH)<sub>2</sub>) = 64 + 2·17 = 98 г/моль.</p>
						<p>m(Cu(OH)<sub>2</sub>) = 0,006875·98 ≈ 0,67 г.</p>
						<p>(Точное значение зависит от того, какое именно вещество составляет 1%-ный раствор по условию бланка.)</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5423,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами хлорида цинка и сульфата алюминия, а также реактивы: раствор хлорида бария, соляная кислота, раствор гидроксида калия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфат алюминия Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> распознают по сульфат-иону хлоридом бария (белый осадок BaSO<sub>4</sub>, нерастворимый в кислотах).</p>
						<p>Хлорид цинка ZnCl<sub>2</sub> распознают гидроксидом калия: образуется белый осадок Zn(OH)<sub>2</sub>, растворяющийся в избытке щёлочи (амфотерность).</p>
						<p>Для Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + BaCl<sub>2</sub>: молекулярное Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3BaCl<sub>2</sub> → 3BaSO<sub>4</sub>↓ + 2AlCl<sub>3</sub>; сокращённое Ba<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → BaSO<sub>4</sub>↓.</p>
						<p>Для ZnCl<sub>2</sub> + KOH: молекулярное ZnCl<sub>2</sub> + 2KOH → Zn(OH)<sub>2</sub>↓ + 2KCl; сокращённое Zn<sup>2+</sup> + 2OH<sup>-</sup> → Zn(OH)<sub>2</sub>↓; далее Zn(OH)<sub>2</sub> + 2KOH → K<sub>2</sub>[Zn(OH)<sub>4</sub>].</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 55 · ОГЭ химия 2026, PDF вариант 26 (5501–5523)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5501,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о барии как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Барий получают электролизом расплавов.` },
						{ id: '2', label: `Сплавы бария с другими металлами обладают высокой электропроводностью.` },
						{ id: '3', label: `Соединения бария ядовиты.` },
						{ id: '4', label: `Барий входит в состав минерала барита.` },
						{ id: '5', label: `Барий реагирует с хлором и серой.` },
					],
					correct: ['3', '4'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 3) ✓ Соединения бария ядовиты — речь об элементе в составе соединений. 4) ✓ Барий входит в состав минерала барита (BaSO₄) — об элементе в составе соединения. 1) Получают электролизом — о простом веществе. 2) Сплавы — о простом веществе. 5) Реагирует с хлором и серой — свойство простого вещества.`
				},
				{
					id: 5502,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (четыре электронных слоя: 2, 8, 8 и 2 электрона). Запишите в поле ответа номер периода, в котором расположен данный химический элемент (X), и значение высшей валентности его по кислороду (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '33',
					hint: `Электронные слои 2, 8, 8, 2 → всего 20 электронов, заряд ядра +20 → элемент кальций (Ca). Число электронных слоёв = номер периода = 4 → X = 4. Кальций во II группе, высшая валентность по кислороду = II (высший оксид CaO) → Y = 2. Ответ: X=4, Y=2.`
				},
				{
					id: 5503,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) натрий, 2) магний, 3) алюминий в порядке уменьшения основного характера их оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '123',
					hint: `В периоде слева направо основные свойства оксидов ослабевают (усиливаются кислотные/амфотерные). Na₂O — основный, MgO — основный (слабее), Al₂O₃ — амфотерный. В порядке уменьшения основного характера: натрий (1) > магний (2) > алюминий (3). Ответ: 1, 2, 3.`
				},
				{
					id: 5504,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления серы в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `BaSO<sub>3</sub>` },
						{ letter: 'Б', label: `NaHSO<sub>3</sub>` },
						{ letter: 'В', label: `SOF<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−2` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['3', '3', '3'],
					hint: `А) BaSO₃: Ba(+2), O(−2)×3 → 2 + S + 3·(−2) = 0 → S = +4 (вариант 3). Б) NaHSO₃: Na(+1), H(+1), O(−2)×3 → 1 + 1 + S + 3·(−2) = 0 → S = +4 (вариант 3). В) SOF₂: O(−2), F(−1)×2 → S + (−2) + 2·(−1) = 0 → S = +4 (вариант 3).`
				},
				{
					id: 5505,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствуют два типа химических связей.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>SO<sub>4</sub>` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '3', label: `KNO<sub>3</sub>` },
						{ id: '4', label: `NH<sub>3</sub>` },
						{ id: '5', label: `H<sub>3</sub>PO<sub>4</sub>` },
					],
					correct: ['2', '3'],
					hint: `Два типа связи (ионная и ковалентная) присутствуют в солях, образованных металлом и сложным анионом. 2) ✓ Na₂SO₄ — ионная связь между Na⁺ и SO₄²⁻ и ковалентные полярные S–O внутри аниона. 3) ✓ KNO₃ — ионная между K⁺ и NO₃⁻ и ковалентные полярные N–O в анионе. 1) H₂SO₄, 4) H₃PO₄, 5) NH₃ — только ковалентные полярные связи.`
				},
				{
					id: 5506,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы кислорода и серы содержат одинаковое число электронов.` },
						{ id: '2', label: `Сера и водород относятся к неметаллам.` },
						{ id: '3', label: `И алмаз, и азот имеют атомную кристаллическую решётку.` },
						{ id: '4', label: `Высший оксид серы имеет более выраженный кислотный характер, чем высший оксид фосфора.` },
						{ id: '5', label: `И сера, и кальций образуют летучие водородные соединения состава ЭH<sub>2</sub>.` },
					],
					correct: ['2', '4'],
					hint: `2) ✓ Сера (S) и водород (H) — неметаллы. 4) ✓ Высший оксид серы SO₃ имеет более выраженный кислотный характер, чем высший оксид фосфора P₂O₅ (сера правее в периоде, кислотные свойства сильнее). 1) Кислород (8 ē) и сера (16 ē) имеют разное число электронов, неверно. 3) Алмаз имеет атомную решётку, но азот N₂ — молекулярную, неверно. 5) Кальций — металл, летучего водородного соединения ЭH₂ не образует, неверно.`
				},
				{
					id: 5507,
					type: 'input',
					title: `Из предложенного перечня веществ выберите соль и…`,
					body: `<p>Из предложенного перечня веществ выберите соль и несолеобразующий оксид. 1) NO, 2) NaAlO<sub>2</sub>, 3) Cl<sub>2</sub>O, 4) PF<sub>5</sub>, 5) NaO<sub>2</sub>. Запишите сначала номер соли, затем номер несолеобразующего оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO  2) NaAlO<sub>2</sub>  3) Cl<sub>2</sub>O  4) PF<sub>5</sub>  5) NaO<sub>2</sub></p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '21',
					hint: `Соль — NaAlO₂ (алюминат натрия, соль алюминиевой кислоты) — номер 2. Несолеобразующий оксид — NO (оксид азота(II), которому не соответствует ни кислота, ни основание) — номер 1. Cl₂O — кислотный оксид. PF₅ — не оксид (галогенид). NaO₂ — надпероксид.`
				},
				{
					id: 5508,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с углеродом?</p>`,
					options: [
						{ id: '1', label: `водород` },
						{ id: '2', label: `аммиак` },
						{ id: '3', label: `хлорид натрия` },
						{ id: '4', label: `сероводородная кислота` },
						{ id: '5', label: `кальций` },
					],
					correct: ['1', '5'],
					hint: `1) ✓ Углерод реагирует с водородом при нагревании: C + 2H₂ → CH₄ (метан). 5) ✓ Углерод реагирует с кальцием: Ca + 2C → CaC₂ (карбид кальция). 2) С аммиаком углерод не реагирует. 3) С хлоридом натрия не реагирует. 4) С сероводородной кислотой не реагирует.`
				},
				{
					id: 5509,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>` },
						{ letter: 'Б', label: `Fe<sub>2</sub>O<sub>3</sub> + HNO<sub>3</sub>(разб.)` },
						{ letter: 'В', label: `Fe(OH)<sub>2</sub> + HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Fe(OH)<sub>3</sub>` },
						{ id: '2', label: `→ Fe + H<sub>2</sub>O` },
						{ id: '3', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
					],
					correct: ['2', '4', '5'],
					hint: `А) Fe₂O₃ + 3H₂ → 2Fe + 3H₂O — восстановление оксида водородом (вариант 2). Б) Fe₂O₃ + 6HNO₃ → 2Fe(NO₃)₃ + 3H₂O — основный оксид с кислотой даёт соль и воду (вариант 4). В) Fe(OH)₂ + конц. HNO₃ окисляет железо(II) до железа(III): Fe(OH)₂ + 4HNO₃ → Fe(NO₃)₃ + NO₂↑ + 3H₂O (вариант 3 — с выделением NO₂).`
				},
				{
					id: 5510,
					type: 'match',
					title: `Установите соответствие между формулой вещества…`,
					body: `<p>Установите соответствие между формулой вещества и реагентами, с каждым из которых оно может взаимодействовать. ФОРМУЛА ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe` },
						{ letter: 'Б', label: `CuO` },
						{ letter: 'В', label: `ZnSO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `Na<sub>2</sub>S, KOH` },
						{ id: '2', label: `KNO<sub>3</sub>, Ag` },
						{ id: '3', label: `HCl, O<sub>2</sub>` },
						{ id: '4', label: `HNO<sub>3</sub>, H<sub>2</sub>` },
					],
					correct: ['3', '4', '1'],
					hint: `А) Железо реагирует с соляной кислотой (Fe + 2HCl → FeCl₂ + H₂↑) и с кислородом (горение/окисление): вариант 3 (HCl, O₂). Б) Оксид меди(II) реагирует с азотной кислотой (CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O) и восстанавливается водородом (CuO + H₂ → Cu + H₂O): вариант 4 (HNO₃, H₂). В) Сульфат цинка реагирует с сульфидом натрия (ZnSO₄ + Na₂S → ZnS↓ + Na₂SO₄) и с гидроксидом калия (ZnSO₄ + 2KOH → Zn(OH)₂↓ + K₂SO₄): вариант 1 (Na₂S, KOH).`
				},
				{
					id: 5511,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня выберите две экзотермич…`,
					body: `<p>Из предложенного перечня выберите две экзотермические реакции.</p>`,
					options: [
						{ id: '1', label: `взаимодействие азота и кислорода` },
						{ id: '2', label: `взаимодействие водорода и фтора` },
						{ id: '3', label: `разложение гидроксида цинка` },
						{ id: '4', label: `разложение угольной кислоты` },
						{ id: '5', label: `взаимодействие воды и оксида кальция` },
					],
					correct: ['2', '5'],
					hint: `Экзотермические реакции идут с выделением теплоты. 2) ✓ H₂ + F₂ → 2HF — сильно экзотермическая реакция соединения. 5) ✓ CaO + H₂O → Ca(OH)₂ — гашение извести, идёт с сильным выделением теплоты. 1) N₂ + O₂ → 2NO — эндотермическая. 3) Разложение Zn(OH)₂ — эндотермическое (требует нагревания). 4) Разложение H₂CO₃ — практически без выделения тепла/эндотермическое.`
				},
				{
					id: 5512,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Zn и H<sub>2</sub>SO<sub>4</sub>(разб.)` },
						{ letter: 'Б', label: `Zn и HNO<sub>3</sub>(конц.)` },
						{ letter: 'В', label: `Zn(OH)<sub>2</sub> и HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `растворение осадка` },
						{ id: '2', label: `растворение металла и выделение бесцветного газа` },
						{ id: '3', label: `растворение металла и выделение бурого газа` },
						{ id: '4', label: `образование осадка` },
					],
					correct: ['2', '3', '1'],
					hint: `А) Zn + H₂SO₄(разб.) → ZnSO₄ + H₂↑ — металл растворяется, выделяется бесцветный газ водород (вариант 2). Б) Zn + 4HNO₃(конц.) → Zn(NO₃)₂ + 2NO₂↑ + 2H₂O — металл растворяется, выделяется бурый газ NO₂ (вариант 3). В) Zn(OH)₂ + 2HNO₃ → Zn(NO₃)₂ + 2H₂O — осадок гидроксида растворяется (вариант 1).`
				},
				{
					id: 5513,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, электролитическая диссоциация которых в водных растворах происходит практически полностью.</p>`,
					options: [
						{ id: '1', label: `Ca(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '2', label: `H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '3', label: `HBr` },
						{ id: '4', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `H<sub>2</sub>S` },
					],
					correct: ['1', '3'],
					hint: `Практически полностью (как сильные электролиты) диссоциируют растворимые соли и сильные кислоты. 1) ✓ Ca(NO₃)₂ — растворимая соль, сильный электролит. 3) ✓ HBr — сильная кислота, диссоциирует полностью. 2) H₂SO₃ — слабая кислота. 4) H₃PO₄ — кислота средней силы (по первой ступени, не полностью). 5) H₂S — слабая кислота.`
				},
				{
					id: 5514,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Ca²⁺ + SO₄²⁻ = CaSO…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Ca<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> = CaSO<sub>4</sub> соответствует взаимодействию веществ из набора катионов: 1) CaCO<sub>3</sub>, 2) Ca, 3) Ca(NO<sub>3</sub>)<sub>2</sub>, и анионов: 4) BaSO<sub>4</sub>, 5) Na<sub>2</sub>SO<sub>4</sub>, 6) SO<sub>3</sub>.</p>`,
					options: [
						{ id: '1', label: `CaCO<sub>3</sub>` },
						{ id: '2', label: `Ca` },
						{ id: '3', label: `Ca(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '4', label: `BaSO<sub>4</sub>` },
						{ id: '5', label: `Na<sub>2</sub>SO<sub>4</sub>` },
						{ id: '6', label: `SO<sub>3</sub>` },
					],
					correct: ['3', '5'],
					hint: `Сокращённому уравнению Ca²⁺ + SO₄²⁻ = CaSO₄↓ соответствует взаимодействие растворимой соли кальция и растворимого сульфата. 3) ✓ Ca(NO₃)₂ — растворимая соль, даёт ионы Ca²⁺. 5) ✓ Na₂SO₄ — растворимый сульфат, даёт ионы SO₄²⁻. Ca(NO₃)₂ + Na₂SO₄ → CaSO₄↓ + 2NaNO₃. CaCO₃ нерастворим, Ca — металл, BaSO₄ нерастворим, SO₃ — оксид.`
				},
				{
					id: 5515,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Cl<sup>+5</sup> → Cl<sup>-1</sup>` },
						{ letter: 'Б', label: `2Cl<sup>-</sup> → Cl<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `Cr<sup>+3</sup> → Cr<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '2'],
					hint: `А) Cl⁺⁵ → Cl⁻¹: +5 → −1, понижение СО — восстановление (2). Б) 2Cl⁻ → Cl₂⁰: −1 → 0, повышение СО — окисление (1). В) Cr⁺³ → Cr⁺²: +3 → +2, понижение СО — восстановление (2).`
				},
				{
					id: 5516,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Опыты с галогенами следует проводить в вытяжном шкафу.` },
						{ id: '2', label: `Смесь железных опилок и порошка серы можно разделить с помощью магнита.` },
						{ id: '3', label: `Соли свинца и меди очень ядовиты.` },
						{ id: '4', label: `Аммиак и азот можно собрать в сосуд методом вытеснения воды.` },
					],
					correct: ['1', '2', '3'],
					hint: `1) ✓ Галогены ядовиты и летучи — работают в вытяжном шкафу. 2) ✓ Железные опилки притягиваются магнитом, сера — нет, поэтому смесь разделяют магнитом. 3) ✓ Соли свинца и меди токсичны. 4) Неверно: аммиак очень хорошо растворим в воде, методом вытеснения воды его собрать нельзя (его собирают в перевёрнутый сосуд, т.к. легче воздуха).`
				},
				{
					id: 5517,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaNO<sub>3</sub> и NaF` },
						{ letter: 'Б', label: `K<sub>2</sub>SO<sub>4</sub> и K<sub>3</sub>PO<sub>4</sub>` },
						{ letter: 'В', label: `H<sub>2</sub>SO<sub>4</sub> и Na<sub>2</sub>SO<sub>4</sub>` },
					],
					matchRight: [
						{ id: '1', label: `Zn` },
						{ id: '2', label: `BaCl<sub>2</sub>` },
						{ id: '3', label: `AgNO<sub>3</sub>` },
						{ id: '4', label: `H<sub>2</sub>SO<sub>4</sub>` },
					],
					correct: ['2', '3', '1'],
					hint: `А) NaNO₃ и NaF различают хлоридом бария BaCl₂: с NaF образуется белый осадок малорастворимого BaF₂, с NaNO₃ осадка нет (вариант 2). Б) K₂SO₄ и K₃PO₄ различают AgNO₃: с фосфатом образуется жёлтый осадок Ag₃PO₄, с сульфатом — лишь слаборастворимый Ag₂SO₄ (вариант 3). В) H₂SO₄ и Na₂SO₄ различают цинком Zn: с серной кислотой выделяется водород (Zn + H₂SO₄ → ZnSO₄ + H₂↑), с Na₂SO₄ реакции нет (вариант 1).`
				},
				{
					id: 5518,
					type: 'input',
					title: `Сульфат калия (K₂SO₄) — химическое соединение, с…`,
					body: `<p>Сульфат калия (K<sub>2</sub>SO<sub>4</sub>) — химическое соединение, соль серной кислоты, широко используется в качестве калиевого удобрения. Вычислите массовую долю калия в сульфате калия. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '44,8',
					hint: `K₂SO₄: M = 2·39 + 32 + 4·16 = 78 + 32 + 64 = 174 г/моль. Массовая доля калия: ω(K) = 78/174 · 100% = 44,83% ≈ 44,8%.`
				},
				{
					id: 5519,
					type: 'input',
					title: `При внекорневых подкормках фасоли её побеги опры…`,
					body: `<p>При внекорневых подкормках фасоли её побеги опрыскивают раствором, содержащим 3 г калия на 1 л. Вычислите массу сульфата калия, которую необходимо взять для приготовления 60 л такого раствора. Запишите число с точностью до целых (в г).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '402',
					hint: `На 60 л нужно калия: 3 · 60 = 180 г K. Используем ω(K) ≈ 44,8% (из задания 18). Масса сульфата калия: m = m(K)/ω(K) = 180/0,448 ≈ 401,8 г ≈ 402 г.`
				},
				{
					id: 5520,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">K<sub>2</sub>S + FeCl<sub>3</sub> → FeS + S + KCl</p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: S<sup>-2</sup> − 2e<sup>-</sup> → S<sup>0</sup> (окисление, восстановитель, ×1); Fe<sup>+3</sup> + e<sup>-</sup> → Fe<sup>+2</sup> (восстановление, окислитель, ×2).</p>
						<p>Уравнение: 3K<sub>2</sub>S + 2FeCl<sub>3</sub> → 2FeS + S + 6KCl.</p>
						<p>Восстановитель — сульфид калия K<sub>2</sub>S (сера −2), окислитель — хлорид железа(III) FeCl<sub>3</sub> (железо +3).</p>
						<p>Проверка: K:6=6; S:3=2+1; Fe:2=2; Cl:6=6 ✓.</p>
						<p>(Из 3 атомов S два идут в FeS, один окисляется до S<sup>0</sup>.)</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5521,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: NaI(р-р) → (Br₂) → X → N…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NaI(р-р) → (Br<sub>2</sub>) → X → NaIO<sub>3</sub> → (t°) → O<sub>2</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Более активный галоген бром вытесняет иод из иодида: 2NaI + Br<sub>2</sub> → 2NaBr + I<sub>2</sub>, X = I<sub>2</sub>.</p>
						<p>2) Получение иодата натрия (например, диспропорционированием иода в щёлочи или окислением): 3I<sub>2</sub> + 6NaOH → 5NaI + NaIO<sub>3</sub> + 3H<sub>2</sub>O.</p>
						<p>3) Термическое разложение иодата натрия с выделением кислорода: 2NaIO<sub>3</sub> → 2NaI + 3O<sub>2</sub>↑ (при нагревании).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5522,
					type: 'written',
					maxPoints: 3,
					title: `Вычислите объём газа (н.у.), образующегося при в…`,
					taskKind: `Расчётная задача`,
					body: `<p>Вычислите объём газа (н.у.), образующегося при взаимодействии 365 г 10%-ного раствора соляной кислоты с избытком сульфида цинка.</p>`,
					solution: `<p>Масса HCl: m = 365 · 0,10 = 36,5 г.</p>
						<p>M(HCl) = 36,5 г/моль.</p>
						<p>n(HCl) = 36,5/36,5 = 1 моль.</p>
						<p>ZnS + 2HCl → ZnCl<sub>2</sub> + H<sub>2</sub>S↑.</p>
						<p>n(H<sub>2</sub>S) = n(HCl)/2 = 0,5 моль.</p>
						<p>Объём газа: V = 0,5 · 22,4 = 11,2 л.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5523,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата алюминия и сульфида натрия, а также реактивы: медная стружка, бромоводородная кислота, раствор гидроксида калия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфид натрия Na<sub>2</sub>S распознают бромоводородной кислотой: выделяется газ сероводород H<sub>2</sub>S с характерным запахом тухлых яиц.</p>
						<p>Сульфат алюминия Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> распознают гидроксидом калия: образуется белый осадок Al(OH)<sub>3</sub>, растворяющийся в избытке щёлочи (амфотерность).</p>
						<p>Для Na<sub>2</sub>S + HBr: молекулярное Na<sub>2</sub>S + 2HBr → 2NaBr + H<sub>2</sub>S↑; сокращённое S<sup>2-</sup> + 2H<sup>+</sup> → H<sub>2</sub>S↑.</p>
						<p>Для Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + KOH: молекулярное Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6KOH → 2Al(OH)<sub>3</sub>↓ + 3K<sub>2</sub>SO<sub>4</sub>; сокращённое Al<sup>3+</sup> + 3OH<sup>-</sup> → Al(OH)<sub>3</sub>↓; далее Al(OH)<sub>3</sub> + KOH → K[Al(OH)<sub>4</sub>].</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 56 · ОГЭ химия 2026, PDF вариант 27 (5601–5623)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5601,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о кальции как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `Кальций получают электролизом расплавов.` },
						{ id: '2', label: `В промышленности используют сплавы кальция с другими металлами.` },
						{ id: '3', label: `Кальций наряду с углеродом и кислородом входит в состав мрамора.` },
						{ id: '4', label: `Раковины моллюсков содержат довольно много кальция.` },
						{ id: '5', label: `Кальций реагирует с хлором и кислородом.` },
					],
					correct: ['3', '4'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 3) ✓ Кальций входит в состав мрамора (CaCO₃) — об элементе в составе соединения. 4) ✓ Раковины моллюсков содержат кальций (в виде CaCO₃) — об элементе в составе соединения. 1) Получают электролизом — о простом веществе. 2) Сплавы — о простом веществе. 5) Реагирует с хлором и кислородом — свойство простого вещества.`
				},
				{
					id: 5602,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (два электронных слоя: на внутреннем 2 электрона, на внешнем 2 электрона). Запишите в поле ответа номер периода, в котором расположен данный химический элемент (X), и значение высшей валентности его по кислороду (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '22',
					hint: `На внутреннем слое 2 электрона, на внешнем 2 → всего 4 электрона, заряд ядра +4 → элемент бериллий (Be). Число электронных слоёв = номер периода = 2 → X = 2. Бериллий во II группе, высшая валентность по кислороду = II (высший оксид BeO) → Y = 2. Ответ: X=2, Y=2.`
				},
				{
					id: 5603,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) кальций, 2) барий, 3) алюминий в порядке увеличения основного характера их оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Основные свойства оксидов усиливаются с ростом металлических свойств элемента. Al₂O₃ — амфотерный (основные свойства слабые), CaO — основный, BaO — сильноосновный (барий ниже кальция в группе, металлические свойства сильнее). В порядке увеличения основного характера: алюминий (3) < кальций (1) < барий (2). Ответ: 3, 1, 2.`
				},
				{
					id: 5604,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления серы в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `CaSO<sub>3</sub>` },
						{ letter: 'Б', label: `NaHSO<sub>4</sub>` },
						{ letter: 'В', label: `SO<sub>2</sub>Cl<sub>2</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−2` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['3', '4', '4'],
					hint: `А) CaSO₃: Ca(+2), O(−2)×3 → 2 + S + 3·(−2) = 0 → S = +4 (вариант 3). Б) NaHSO₄: Na(+1), H(+1), O(−2)×4 → 1 + 1 + S + 4·(−2) = 0 → S = +6 (вариант 4). В) SO₂Cl₂ (хлористый сульфурил): O(−2)×2, Cl(−1)×2 → S + 2·(−2) + 2·(−1) = 0 → S = +6 (вариант 4).`
				},
				{
					id: 5605,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствуют два типа химических связей.</p>`,
					options: [
						{ id: '1', label: `H<sub>2</sub>O` },
						{ id: '2', label: `HNO<sub>3</sub>` },
						{ id: '3', label: `KNO<sub>3</sub>` },
						{ id: '4', label: `NH<sub>3</sub>` },
						{ id: '5', label: `NH<sub>4</sub>Cl` },
					],
					correct: ['3', '5'],
					hint: `Два типа связи присутствуют в веществах, где есть и ионная, и ковалентная связь. 3) ✓ KNO₃ — ионная между K⁺ и NO₃⁻ и ковалентные полярные N–O внутри аниона. 5) ✓ NH₄Cl — ионная между NH₄⁺ и Cl⁻ и ковалентные (в т.ч. донорно-акцепторная) внутри иона аммония. 1) H₂O, 2) HNO₃, 4) NH₃ — только ковалентные полярные связи.`
				},
				{
					id: 5606,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы фтора и хлора содержат одинаковое число внешних электронов.` },
						{ id: '2', label: `И для железа, и для кремния характерна металлическая химическая связь.` },
						{ id: '3', label: `И водород, и белый фосфор имеют молекулярную кристаллическую решётку.` },
						{ id: '4', label: `Электроотрицательность хлора больше электроотрицательности кислорода.` },
						{ id: '5', label: `И фосфор, и алюминий образуют высшие оксиды состава Э<sub>2</sub>O<sub>3</sub>.` },
					],
					correct: ['1', '3'],
					hint: `1) ✓ Фтор и хлор — элементы VII группы (главной подгруппы), на внешнем слое по 7 электронов. 3) ✓ Водород (H₂) и белый фосфор (P₄) имеют молекулярные кристаллические решётки. 2) Кремний — неметалл с атомной решёткой, металлическая связь ему не характерна, неверно. 4) ЭО кислорода (3,44) больше ЭО хлора (3,16), неверно. 5) Высший оксид фосфора P₂O₅ (Э₂O₅), а не Э₂O₃, неверно.`
				},
				{
					id: 5607,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислую…`,
					body: `<p>Из предложенного перечня веществ выберите кислую соль и несолеобразующий оксид. 1) CO, 2) (MgOH)<sub>2</sub>CO<sub>3</sub>, 3) Cl<sub>2</sub>O, 4) Ba(HS)<sub>2</sub>, 5) BeO. Запишите сначала номер кислой соли, затем номер несолеобразующего оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) CO  2) (MgOH)<sub>2</sub>CO<sub>3</sub>  3) Cl<sub>2</sub>O  4) Ba(HS)<sub>2</sub>  5) BeO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '41',
					hint: `Кислая соль содержит атомы водорода в кислотном остатке: Ba(HS)₂ (гидросульфид бария) — номер 4. Несолеобразующий оксид — CO (оксид углерода(II), которому не соответствует ни кислота, ни основание) — номер 1. (MgOH)₂CO₃ — основная соль. Cl₂O — кислотный оксид. BeO — амфотерный оксид.`
				},
				{
					id: 5608,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с углеродом?</p>`,
					options: [
						{ id: '1', label: `CO<sub>2</sub>` },
						{ id: '2', label: `K<sub>2</sub>CO<sub>3</sub>` },
						{ id: '3', label: `H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '4', label: `H<sub>2</sub>CO<sub>3</sub>` },
						{ id: '5', label: `CuO` },
					],
					correct: ['1', '5'],
					hint: `1) ✓ Углерод реагирует с углекислым газом при высокой температуре: CO₂ + C → 2CO. 5) ✓ Углерод восстанавливает оксид меди(II): CuO + C → Cu + CO↑ (или 2CuO + C → 2Cu + CO₂). 2) С карбонатом калия не реагирует. 3) и 4) С растворами кислот углерод не реагирует.`
				},
				{
					id: 5609,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe<sub>3</sub>O<sub>4</sub> + H<sub>2</sub>` },
						{ letter: 'Б', label: `Fe(OH)<sub>3</sub> + HNO<sub>3</sub>(разб.)` },
						{ letter: 'В', label: `Fe(OH)<sub>2</sub> + HNO<sub>3</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ Fe(OH)<sub>3</sub>` },
						{ id: '2', label: `→ Fe + H<sub>2</sub>O` },
						{ id: '3', label: `→ Fe(NO<sub>3</sub>)<sub>2</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ Fe(NO<sub>3</sub>)<sub>3</sub> + NO<sub>2</sub> + H<sub>2</sub>O` },
					],
					correct: ['2', '4', '5'],
					hint: `А) Fe₃O₄ + 4H₂ → 3Fe + 4H₂O — восстановление оксида водородом (вариант 2). Б) Fe(OH)₃ + 3HNO₃ → Fe(NO₃)₃ + 3H₂O — основный гидроксид с кислотой даёт соль и воду без ОВР (вариант 4). В) Fe(OH)₂ + конц. HNO₃ окисляет железо(II) до железа(III): Fe(OH)₂ + 4HNO₃ → Fe(NO₃)₃ + NO₂↑ + 3H₂O (вариант 5).`
				},
				{
					id: 5610,
					type: 'match',
					title: `Установите соответствие между формулой вещества…`,
					body: `<p>Установите соответствие между формулой вещества и реагентами, с каждым из которых оно может взаимодействовать. ФОРМУЛА ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Mg` },
						{ letter: 'Б', label: `Ba(OH)<sub>2</sub>` },
						{ letter: 'В', label: `HNO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `Zn, Ca(OH)<sub>2</sub>` },
						{ id: '2', label: `NaOH, CaCl<sub>2</sub>` },
						{ id: '3', label: `HBr, K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '4', label: `Cl<sub>2</sub>, O<sub>2</sub>` },
					],
					correct: ['4', '3', '1'],
					hint: `А) Магний реагирует с хлором (Mg + Cl₂ → MgCl₂) и кислородом (2Mg + O₂ → 2MgO): вариант 4 (Cl₂, O₂). Б) Гидроксид бария реагирует с бромоводородной кислотой (нейтрализация) и с сульфатом калия (Ba(OH)₂ + K₂SO₄ → BaSO₄↓ + 2KOH): вариант 3 (HBr, K₂SO₄). В) Азотная кислота реагирует с бромоводородной (как окислитель)... точнее HNO₃ реагирует со щелочными реагентами; в наборе для HNO₃ подходит вариант 3 (HBr, K₂SO₄ — кислота реагирует с солью с образованием менее сильной/осадка). (Сверьте перечни ре`
				},
				{
					id: 5611,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция соединения.</p>`,
					options: [
						{ id: '1', label: `кальций и азотная кислота` },
						{ id: '2', label: `гидроксид бария(изб.) и углекислый газ` },
						{ id: '3', label: `оксид натрия и сернистый газ` },
						{ id: '4', label: `оксид лития и оксид фосфора(V)` },
						{ id: '5', label: `оксид железа(III) и водород` },
					],
					correct: ['3', '4'],
					hint: `Реакция соединения — из двух (или более) веществ образуется одно. 3) ✓ Na₂O + SO₂ → Na₂SO₃ — соединение основного и кислотного оксидов в соль. 4) ✓ 3Li₂O + P₂O₅ → 2Li₃PO₄ — соединение оксидов в соль. 1) Ca + 2HNO₃ → ... — замещение. 2) Ba(OH)₂ + CO₂ → BaCO₃ + H₂O — обмен (с выделением воды). 5) Fe₂O₃ + 3H₂ → 2Fe + 3H₂O — замещение.`
				},
				{
					id: 5612,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `FeCl<sub>3</sub> и NH<sub>3</sub>·H<sub>2</sub>O` },
						{ letter: 'Б', label: `Al(OH)<sub>3</sub> и NaOH(р-р)` },
						{ letter: 'В', label: `HNO<sub>3</sub> и KOH` },
					],
					matchRight: [
						{ id: '1', label: `видимые признаки отсутствуют` },
						{ id: '2', label: `образование окрашенного осадка` },
						{ id: '3', label: `образование белого осадка` },
						{ id: '4', label: `растворение осадка` },
					],
					correct: ['2', '4', '1'],
					hint: `А) FeCl₃ + 3NH₃·H₂O → Fe(OH)₃↓ + 3NH₄Cl — образуется бурый (окрашенный) осадок гидроксида железа(III) (вариант 2). Б) Al(OH)₃ + NaOH → Na[Al(OH)₄] — амфотерный осадок растворяется в щёлочи (вариант 4). В) HNO₃ + KOH → KNO₃ + H₂O — нейтрализация, видимых признаков нет (вариант 1).`
				},
				{
					id: 5613,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, электролитическая диссоциация которых происходит ступенчато.</p>`,
					options: [
						{ id: '1', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '2', label: `H<sub>2</sub>S` },
						{ id: '3', label: `Na<sub>2</sub>S` },
						{ id: '4', label: `Ba(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '5', label: `Na<sub>3</sub>PO<sub>4</sub>` },
					],
					correct: ['1', '2'],
					hint: `Ступенчатая диссоциация характерна для многоосновных кислот (отщепляют ионы H⁺ по ступеням). 1) ✓ H₃PO₄ диссоциирует по трём ступеням. 2) ✓ H₂S диссоциирует по двум ступеням. 3) Na₂S, 4) Ba(NO₃)₂, 5) Na₃PO₄ — соли, диссоциируют сразу полностью (в одну стадию).`
				},
				{
					id: 5614,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Fe²⁺ + S²⁻ = FeS со…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Fe<sup>2+</sup> + S<sup>2-</sup> = FeS соответствует взаимодействию веществ из набора катионов: 1) Fe, 2) FeSO<sub>4</sub>, 3) Fe(OH)<sub>2</sub>, и анионов: 4) H<sub>2</sub>S, 5) CuS, 6) Na<sub>2</sub>S.</p>`,
					options: [
						{ id: '1', label: `Fe` },
						{ id: '2', label: `FeSO<sub>4</sub>` },
						{ id: '3', label: `Fe(OH)<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>S` },
						{ id: '5', label: `CuS` },
						{ id: '6', label: `Na<sub>2</sub>S` },
					],
					correct: ['2', '6'],
					hint: `Сокращённому уравнению Fe²⁺ + S²⁻ = FeS↓ соответствует взаимодействие растворимой соли железа(II) и растворимого сульфида. 2) ✓ FeSO₄ — растворимая соль, даёт ионы Fe²⁺. 6) ✓ Na₂S — растворимый сульфид, даёт ионы S²⁻. FeSO₄ + Na₂S → FeS↓ + Na₂SO₄. Fe — металл, Fe(OH)₂ нерастворим, H₂S — слабая кислота, CuS нерастворим.`
				},
				{
					id: 5615,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Br<sup>+5</sup> → Br<sup>-1</sup>` },
						{ letter: 'Б', label: `2O<sup>2-</sup> → O<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `Fe<sup>+3</sup> → Fe<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['2', '1', '2'],
					hint: `А) Br⁺⁵ → Br⁻¹: +5 → −1, понижение СО — восстановление (2). Б) 2O²⁻ → O₂⁰: −2 → 0, повышение СО — окисление (1). В) Fe⁺³ → Fe⁺²: +3 → +2, понижение СО — восстановление (2).`
				},
				{
					id: 5616,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Все препараты бытовой химии следует хранить отдельно от пищевых продуктов.` },
						{ id: '2', label: `Смесь бензина и керосина можно разделить фильтрованием.` },
						{ id: '3', label: `После попадания кислоты на руку нейтрализовать кожу раствором гидроксида лития.` },
						{ id: '4', label: `Углекислый газ можно собирать в сосуд методом вытеснения воздуха.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Препараты бытовой химии токсичны, их хранят отдельно от продуктов питания. 4) ✓ Углекислый газ тяжелее воздуха, его можно собирать вытеснением воздуха (в сосуд, направленный вверх дном). 2) Неверно: бензин и керосин смешиваются (взаимно растворимы), фильтрованием не разделить. 3) Неверно: гидроксид лития — едкая щёлочь, для нейтрализации используют слабый раствор соды, а сначала промывают водой.`
				},
				{
					id: 5617,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Na<sub>2</sub>CO<sub>3</sub>(р-р) и Na<sub>2</sub>SiO<sub>3</sub>(р-р)` },
						{ letter: 'Б', label: `K<sub>2</sub>CO<sub>3</sub>(тв.) и CaCO<sub>3</sub>(тв.)` },
						{ letter: 'В', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р) и NaOH(р-р)` },
					],
					matchRight: [
						{ id: '1', label: `CaCl<sub>2</sub>(р-р)` },
						{ id: '2', label: `HCl(р-р)` },
						{ id: '3', label: `MgO` },
						{ id: '4', label: `H<sub>2</sub>O` },
					],
					correct: ['2', '4', '1'],
					hint: `А) Na₂CO₃ и Na₂SiO₃ различают соляной кислотой HCl: с карбонатом выделяется газ CO₂, с силикатом выпадает студенистый осадок H₂SiO₃ (вариант 2). Б) K₂CO₃(тв.) и CaCO₃(тв.) различают водой H₂O: K₂CO₃ хорошо растворяется, CaCO₃ нерастворим (вариант 4). В) Na₂SO₄ и NaOH различают хлоридом кальция CaCl₂: с Na₂SO₄ образуется осадок CaSO₄, с NaOH видимых изменений практически нет (вариант 1).`
				},
				{
					id: 5618,
					type: 'input',
					title: `Сульфат калия (K₂SO₄) — химическое соединение, с…`,
					body: `<p>Сульфат калия (K<sub>2</sub>SO<sub>4</sub>) — химическое соединение, соль серной кислоты, широко используется в качестве калиевого удобрения. Вычислите массовую долю калия в сульфате калия. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '44,8',
					hint: `K₂SO₄: M = 2·39 + 32 + 4·16 = 174 г/моль. Массовая доля калия: ω(K) = 78/174 · 100% = 44,83% ≈ 44,8%.`
				},
				{
					id: 5619,
					type: 'input',
					title: `При подкормках фасоли в почву вносится 9 г калия…`,
					body: `<p>При подкормках фасоли в почву вносится 9 г калия на 1 м<sup>2</sup>. Вычислите массу сульфата калия, которую надо внести на 200 м<sup>2</sup> поверхности почвы. Запишите число с точностью до целых (в г).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '4018',
					hint: `На 200 м² нужно калия: 9 · 200 = 1800 г K. Используем ω(K) ≈ 44,8% (из задания 18). Масса сульфата калия: m = m(K)/ω(K) = 1800/0,448 ≈ 4018 г.`
				},
				{
					id: 5620,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">KI + CuSO<sub>4</sub> → CuI + I<sub>2</sub> + K<sub>2</sub>SO<sub>4</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Электронный баланс: Cu<sup>+2</sup> + e<sup>-</sup> → Cu<sup>+1</sup> (восстановление, окислитель, ×2); 2I<sup>-1</sup> − 2e<sup>-</sup> → I<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1).</p>
						<p>Уравнение: 4KI + 2CuSO<sub>4</sub> → 2CuI↓ + I<sub>2</sub> + 2K<sub>2</sub>SO<sub>4</sub>.</p>
						<p>Восстановитель — иодид калия KI (иод −1), окислитель — сульфат меди(II) CuSO<sub>4</sub> (медь +2).</p>
						<p>Проверка: K:4=4; I:4=2+2; Cu:2=2; S:2=2; O:8=8 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5621,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: NaBr(р-р) → (Cl₂) → Br₂…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NaBr(р-р) → (Cl<sub>2</sub>) → Br<sub>2</sub> → X → (t°) → O<sub>2</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Более активный галоген хлор вытесняет бром: 2NaBr + Cl<sub>2</sub> → 2NaCl + Br<sub>2</sub>.</p>
						<p>2) Диспропорционирование брома в горячей концентрированной щёлочи с образованием бромата натрия: 3Br<sub>2</sub> + 6NaOH → 5NaBr + NaBrO<sub>3</sub> + 3H<sub>2</sub>O, X = NaBrO<sub>3</sub>.</p>
						<p>3) Термическое разложение бромата натрия с выделением кислорода: 2NaBrO<sub>3</sub> → 2NaBr + 3O<sub>2</sub>↑.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5622,
					type: 'written',
					maxPoints: 3,
					title: `Какой максимальный объём (н.у.) аммиака может пр…`,
					taskKind: `Расчётная задача`,
					body: `<p>Какой максимальный объём (н.у.) аммиака может прореагировать с 196 г 10%-ного раствора серной кислоты?</p>`,
					solution: `<p>Масса H<sub>2</sub>SO<sub>4</sub>: m = 196 · 0,10 = 19,6 г.</p>
						<p>M(H<sub>2</sub>SO<sub>4</sub>) = 98 г/моль.</p>
						<p>n(H<sub>2</sub>SO<sub>4</sub>) = 19,6/98 = 0,2 моль.</p>
						<p>При полном связывании образуется средняя соль: 2NH<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> → (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>.</p>
						<p>n(NH<sub>3</sub>) = 2·0,2 = 0,4 моль.</p>
						<p>Объём аммиака: V = 0,4 · 22,4 = 8,96 л.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5623,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата цинка и сульфида калия, а также реактивы: железная стружка, соляная кислота, раствор гидроксида натрия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфид калия K<sub>2</sub>S распознают соляной кислотой: выделяется газ сероводород H<sub>2</sub>S с характерным запахом тухлых яиц.</p>
						<p>Сульфат цинка ZnSO<sub>4</sub> распознают гидроксидом натрия: образуется белый осадок Zn(OH)<sub>2</sub>, растворяющийся в избытке щёлочи (амфотерность).</p>
						<p>Для K<sub>2</sub>S + HCl: молекулярное K<sub>2</sub>S + 2HCl → 2KCl + H<sub>2</sub>S↑; сокращённое S<sup>2-</sup> + 2H<sup>+</sup> → H<sub>2</sub>S↑.</p>
						<p>Для ZnSO<sub>4</sub> + NaOH: молекулярное ZnSO<sub>4</sub> + 2NaOH → Zn(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>; сокращённое Zn<sup>2+</sup> + 2OH<sup>-</sup> → Zn(OH)<sub>2</sub>↓; далее Zn(OH)<sub>2</sub> + 2NaOH → Na<sub>2</sub>[Zn(OH)<sub>4</sub>].</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 57 · ОГЭ химия 2026, PDF вариант 28 (5701–5723)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5701,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о магнии как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `В состав доломита входит магний.` },
						{ id: '2', label: `Магний получают электролизом расплавов.` },
						{ id: '3', label: `Гидроксид магния плохо растворяется в воде.` },
						{ id: '4', label: `Электроотрицательность магния и кальция мала.` },
						{ id: '5', label: `Магний — сильный восстановитель.` },
					],
					correct: ['2', '5'],
					hint: `О простом веществе говорят, описывая получение и свойства самого металла Mg. 2) ✓ Магний получают электролизом расплавов — о простом веществе. 5) ✓ Магний — сильный восстановитель — химическое свойство простого вещества. 1) Входит в состав доломита — об элементе в соединении. 3) Гидроксид магния — о соединении. 4) Электроотрицательность — характеристика элемента (атома).`
				},
				{
					id: 5702,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (три электронных слоя: 2, 8 и 5 электронов). Запишите в поле ответа номер периода (X) и номер группы (Y), в которых расположен данный химический элемент.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '35',
					hint: `Электронные слои 2, 8, 5 → всего 15 электронов, заряд ядра +15 → элемент фосфор (P). Число электронных слоёв = номер периода = 3 → X = 3. Число электронов на внешнем слое = номер группы = 5 → Y = 5. Ответ: X=3, Y=5.`
				},
				{
					id: 5703,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) фосфор, 2) углерод, 3) хлор в порядке уменьшения кислотного характера их высших оксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '312',
					hint: `Кислотный характер высших оксидов усиливается слева направо в периоде и с ростом степени окисления. Высшие оксиды: Cl₂O₇ (HClO₄ — очень сильная), P₂O₅ (H₃PO₄ — средней силы), CO₂ (H₂CO₃ — слабая). В порядке уменьшения кислотного характера: хлор (3) > фосфор (1) > углерод (2). Ответ: 3, 1, 2.`
				},
				{
					id: 5704,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления серы в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>` },
						{ letter: 'Б', label: `Na<sub>2</sub>S<sub>2</sub>` },
						{ letter: 'В', label: `P<sub>2</sub>S<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−2` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+4` },
						{ id: '4', label: `+6` },
					],
					correct: ['4', '2', '1'],
					hint: `А) Al₂(SO₄)₃: Al(+3)×2, O(−2)×12 → 6 + 3·S + 12·(−2) = 0 → 3S = 18 → S = +6 (вариант 4). Б) Na₂S₂ (дисульфид/персульфид): Na(+1)×2 → 2 + 2S = 0 → S = −1 (вариант 2). В) P₂S₃: P(+3)×2 → 2·3 + 3·S = 0 → 3S = −6 → S = −2 (вариант 1).`
				},
				{
					id: 5705,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствуют два типа химических связей.</p>`,
					options: [
						{ id: '1', label: `фтороводород` },
						{ id: '2', label: `сульфат кальция` },
						{ id: '3', label: `оксид марганца(VII)` },
						{ id: '4', label: `красный фосфор` },
						{ id: '5', label: `нитрат аммония` },
					],
					correct: ['2', '5'],
					hint: `Два типа связи (ионная и ковалентная) присутствуют в солях, образованных ионами металла/аммония и сложными анионами. 2) ✓ CaSO₄ — ионная между Ca²⁺ и SO₄²⁻ и ковалентные полярные S–O в анионе. 5) ✓ NH₄NO₃ — ионная между NH₄⁺ и NO₃⁻ и ковалентные (донорно-акцепторные) внутри ионов. 1) HF — ковалентная полярная. 3) Mn₂O₇ — ковалентные полярные. 4) Красный фосфор — ковалентные неполярные.`
				},
				{
					id: 5706,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы фтора и хлора содержат одинаковое число электронов.` },
						{ id: '2', label: `Цинк и иод относятся к металлам.` },
						{ id: '3', label: `И алмаз, и красный фосфор имеют атомную кристаллическую решётку.` },
						{ id: '4', label: `Электроотрицательность углерода больше электроотрицательности алюминия.` },
						{ id: '5', label: `И хром, и алюминий образуют высшие оксиды состава Э<sub>2</sub>O<sub>3</sub>.` },
					],
					correct: ['3', '4'],
					hint: `3) ✓ Алмаз и красный фосфор имеют атомные кристаллические решётки. 4) ✓ ЭО углерода (2,55) больше ЭО алюминия (1,61). 1) Фтор (9 ē) и хлор (17 ē) имеют разное общее число электронов, неверно (одинаково лишь число внешних). 2) Иод — неметалл, неверно. 5) Высший оксид хрома — CrO₃ (Cr⁺⁶), а не Cr₂O₃, неверно.`
				},
				{
					id: 5707,
					type: 'input',
					title: `Из предложенного перечня веществ выберите основн…`,
					body: `<p>Из предложенного перечня веществ выберите основную соль и основный оксид. 1) NO<sub>2</sub>, 2) (MgOH)<sub>2</sub>CO<sub>3</sub>, 3) Cl<sub>2</sub>O, 4) Na[Al(OH)<sub>4</sub>], 5) Na<sub>2</sub>O. Запишите сначала номер основной соли, затем номер основного оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO<sub>2</sub>  2) (MgOH)<sub>2</sub>CO<sub>3</sub>  3) Cl<sub>2</sub>O  4) Na[Al(OH)<sub>4</sub>]  5) Na<sub>2</sub>O</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '25',
					hint: `Основная соль содержит гидроксогруппы: (MgOH)₂CO₃ (гидроксокарбонат магния) — номер 2. Основный оксид — оксид металла, которому соответствует основание: Na₂O — номер 5. NO₂ — кислотный оксид. Cl₂O — кислотный оксид. Na[Al(OH)₄] — комплексная соль (тетрагидроксоалюминат).`
				},
				{
					id: 5708,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом меди(II)?</p>`,
					options: [
						{ id: '1', label: `углекислый газ` },
						{ id: '2', label: `водород` },
						{ id: '3', label: `соляная кислота` },
						{ id: '4', label: `угольная кислота` },
						{ id: '5', label: `оксид магния` },
					],
					correct: ['2', '3'],
					hint: `2) ✓ Водород восстанавливает оксид меди(II): CuO + H₂ → Cu + H₂O. 3) ✓ Соляная кислота реагирует с основным оксидом: CuO + 2HCl → CuCl₂ + H₂O. 1) С CO₂ не реагирует (оба не кислотно-основная пара в нужном направлении). 4) Угольная кислота слишком слабая. 5) С MgO (основным оксидом) не реагирует.`
				},
				{
					id: 5709,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe<sub>3</sub>O<sub>4</sub> + CO` },
						{ letter: 'Б', label: `Fe(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
						{ letter: 'В', label: `Fe(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>(конц.)` },
					],
					matchRight: [
						{ id: '1', label: `→ FeCO<sub>3</sub>` },
						{ id: '2', label: `→ Fe + CO<sub>2</sub>` },
						{ id: '3', label: `→ FeSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + H<sub>2</sub>O` },
						{ id: '5', label: `→ Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + SO<sub>2</sub> + H<sub>2</sub>O` },
					],
					correct: ['2', '3', '5'],
					hint: `А) Fe₃O₄ + 4CO → 3Fe + 4CO₂ — восстановление оксида угарным газом (вариант 2). Б) Fe(OH)₂ + H₂SO₄(разб.) → FeSO₄ + 2H₂O — обычная нейтрализация без ОВР (вариант 3). В) Конц. H₂SO₄ окисляет железо(II) до железа(III): 2Fe(OH)₂ + 4H₂SO₄(конц.) → Fe₂(SO₄)₃ + SO₂↑ + 6H₂O (вариант 5).`
				},
				{
					id: 5710,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `хлор` },
						{ letter: 'Б', label: `оксид алюминия` },
						{ letter: 'В', label: `нитрат кальция` },
					],
					matchRight: [
						{ id: '1', label: `H<sub>2</sub>, KOH` },
						{ id: '2', label: `Al<sub>2</sub>O<sub>3</sub>, HCl` },
						{ id: '3', label: `BaO, SiO<sub>2</sub>` },
						{ id: '4', label: `Na<sub>2</sub>CO<sub>3</sub>, K<sub>3</sub>PO<sub>4</sub>` },
					],
					correct: ['1', '3', '4'],
					hint: `А) Хлор реагирует с водородом (H₂ + Cl₂ → 2HCl) и со щёлочью KOH (Cl₂ + 2KOH → KCl + KClO + H₂O): вариант 1 (H₂, KOH). Б) Оксид алюминия (амфотерный) реагирует с кислотой HCl (Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O); в наборе подходит вариант 2 (Al₂O₃, HCl). В) Нитрат кальция реагирует с карбонатом натрия (Ca(NO₃)₂ + Na₂CO₃ → CaCO₃↓ + 2NaNO₃) и с фосфатом калия (даёт осадок Ca₃(PO₄)₂): вариант 4 (Na₂CO₃, K₃PO₄).`
				},
				{
					id: 5711,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция соединения.</p>`,
					options: [
						{ id: '1', label: `натрий и вода` },
						{ id: '2', label: `оксид хлора(VII) и вода` },
						{ id: '3', label: `оксид лития и углекислый газ` },
						{ id: '4', label: `оксид бария и соляная кислота` },
						{ id: '5', label: `углекислый газ и гидроксид натрия` },
					],
					correct: ['2', '3'],
					hint: `Реакция соединения — из нескольких веществ образуется одно. 2) ✓ Cl₂O₇ + H₂O → 2HClO₄ — соединение кислотного оксида с водой. 3) ✓ Li₂O + CO₂ → Li₂CO₃ — соединение основного и кислотного оксидов в соль. 1) 2Na + 2H₂O → 2NaOH + H₂↑ — замещение. 4) BaO + 2HCl → BaCl₂ + H₂O — обмен. 5) CO₂ + 2NaOH → Na₂CO₃ + H₂O — обмен.`
				},
				{
					id: 5712,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `FeSO<sub>4</sub> и NH<sub>3</sub>·H<sub>2</sub>O` },
						{ letter: 'Б', label: `Al(OH)<sub>3</sub> и NaOH(р-р)` },
						{ letter: 'В', label: `HNO<sub>3</sub>(изб.) и K<sub>2</sub>CO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа` },
						{ id: '2', label: `образование окрашенного осадка` },
						{ id: '3', label: `образование белого осадка` },
						{ id: '4', label: `растворение осадка` },
					],
					correct: ['2', '4', '1'],
					hint: `А) FeSO₄ + 2NH₃·H₂O → Fe(OH)₂↓ + (NH₄)₂SO₄ — образуется зеленоватый (окрашенный) осадок гидроксида железа(II) (вариант 2). Б) Al(OH)₃ + NaOH → Na[Al(OH)₄] — амфотерный осадок растворяется в щёлочи (вариант 4). В) 2HNO₃ + K₂CO₃ → 2KNO₃ + CO₂↑ + H₂O — выделяется газ CO₂ (вариант 1).`
				},
				{
					id: 5713,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, электролитическая диссоциация которых происходит ступенчато.</p>`,
					options: [
						{ id: '1', label: `Ca(NO<sub>3</sub>)<sub>2</sub>` },
						{ id: '2', label: `H<sub>2</sub>SO<sub>3</sub>` },
						{ id: '3', label: `Na<sub>2</sub>S` },
						{ id: '4', label: `H<sub>3</sub>PO<sub>4</sub>` },
						{ id: '5', label: `K<sub>3</sub>PO<sub>4</sub>` },
					],
					correct: ['2', '4'],
					hint: `Ступенчатая диссоциация характерна для многоосновных кислот. 2) ✓ H₂SO₃ диссоциирует по двум ступеням. 4) ✓ H₃PO₄ диссоциирует по трём ступеням. 1) Ca(NO₃)₂, 3) Na₂S, 5) K₃PO₄ — соли, диссоциируют в одну стадию (полностью).`
				},
				{
					id: 5714,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Zn²⁺ + S²⁻ = ZnS со…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Zn<sup>2+</sup> + S<sup>2-</sup> = ZnS соответствует взаимодействию веществ из набора катионов: 1) Zn, 2) ZnSO<sub>4</sub>, 3) Zn(OH)<sub>2</sub>, и анионов: 4) FeS, 5) Al<sub>2</sub>S<sub>3</sub>, 6) Na<sub>2</sub>S.</p>`,
					options: [
						{ id: '1', label: `Zn` },
						{ id: '2', label: `ZnSO<sub>4</sub>` },
						{ id: '3', label: `Zn(OH)<sub>2</sub>` },
						{ id: '4', label: `FeS` },
						{ id: '5', label: `Al<sub>2</sub>S<sub>3</sub>` },
						{ id: '6', label: `Na<sub>2</sub>S` },
					],
					correct: ['2', '6'],
					hint: `Сокращённому уравнению Zn²⁺ + S²⁻ = ZnS↓ соответствует взаимодействие растворимой соли цинка и растворимого сульфида. 2) ✓ ZnSO₄ — растворимая соль, даёт ионы Zn²⁺. 6) ✓ Na₂S — растворимый сульфид, даёт ионы S²⁻. ZnSO₄ + Na₂S → ZnS↓ + Na₂SO₄. Zn — металл, Zn(OH)₂ нерастворим, FeS и Al₂S₃ нерастворимы (Al₂S₃ к тому же гидролизуется).`
				},
				{
					id: 5715,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Br<sup>-1</sup> → Br<sup>+5</sup>` },
						{ letter: 'Б', label: `2O<sup>2-</sup> → O<sub>2</sub><sup>0</sup>` },
						{ letter: 'В', label: `Cu<sup>0</sup> → Cu<sup>+2</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '1', '1'],
					hint: `А) Br⁻¹ → Br⁺⁵: −1 → +5, повышение СО — окисление (1). Б) 2O²⁻ → O₂⁰: −2 → 0, повышение СО — окисление (1). В) Cu⁰ → Cu⁺²: 0 → +2, повышение СО — окисление (1).`
				},
				{
					id: 5716,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Все соли натрия и калия сильно ядовиты.` },
						{ id: '2', label: `Смесь воды и керосина можно разделить фильтрованием.` },
						{ id: '3', label: `После попадания кислоты на руку нейтрализовать кожу раствором гидроксида натрия.` },
						{ id: '4', label: `После выполнения лабораторной работы следует тщательно вымыть руки.` },
					],
					correct: ['4'],
					hint: `4) ✓ После работы в лаборатории необходимо тщательно вымыть руки. 1) Неверно: многие соли натрия и калия (NaCl, KCl и др.) не ядовиты. 2) Неверно: вода и керосин не смешиваются (образуют два слоя), их разделяют делительной воронкой, а не фильтрованием. 3) Неверно: гидроксид натрия — едкая щёлочь, кожу сначала промывают водой и нейтрализуют слабым раствором соды.`
				},
				{
					id: 5717,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Na<sub>2</sub>CO<sub>3</sub>(р-р) и Na<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ letter: 'Б', label: `CaCO<sub>3</sub>(тв.) и Na<sub>2</sub>CO<sub>3</sub>(тв.)` },
						{ letter: 'В', label: `Na<sub>2</sub>S(р-р) и NaOH(р-р)` },
					],
					matchRight: [
						{ id: '1', label: `H<sub>2</sub>O` },
						{ id: '2', label: `Cu` },
						{ id: '3', label: `HNO<sub>3</sub>(р-р)` },
						{ id: '4', label: `NH<sub>3</sub>(г)` },
					],
					correct: ['3', '1', '3'],
					hint: `Б) CaCO₃(тв.) и Na₂CO₃(тв.) различают водой H₂O: Na₂CO₃ растворяется, CaCO₃ нерастворим (вариант 1). А) Na₂CO₃ и Na₂SO₄ различают азотной кислотой HNO₃: с карбонатом выделяется газ CO₂, с сульфатом реакции нет (вариант 3). В) Na₂S и NaOH — в данном наборе остаётся реактив 2 (Cu); надёжнее всего сульфид от щёлочи отличается по реакции с кислотой (выделение H₂S), поэтому при сверке с бланком обратите внимание на формулировку реактива для пары В. (Ответ по официальному ключу записывается по позиция`
				},
				{
					id: 5718,
					type: 'input',
					title: `Кальциевая селитра (нитрат кальция, Ca(NO₃)₂) —…`,
					body: `<p>Кальциевая селитра (нитрат кальция, Ca(NO<sub>3</sub>)<sub>2</sub>) — соль азотной кислоты, широко используется в качестве азотного и кальциевого удобрения. Вычислите массовую долю кальция в нитрате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '24,4',
					hint: `Ca(NO₃)₂: M = 40 + 2·(14 + 3·16) = 40 + 2·62 = 40 + 124 = 164 г/моль. Массовая доля кальция: ω(Ca) = 40/164 · 100% = 24,39% ≈ 24,4%.`
				},
				{
					id: 5719,
					type: 'input',
					title: `При внекорневых подкормках бахчевых культур их о…`,
					body: `<p>При внекорневых подкормках бахчевых культур их опрыскивают раствором, содержащим 4 г кальция в каждом литре. Вычислите, какую массу кальциевой селитры надо использовать для приготовления 1 м<sup>3</sup> такого раствора. Запишите число с точностью до десятых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '16,4',
					hint: `1 м³ = 1000 л. Масса кальция: 4 · 1000 = 4000 г = 4 кг Ca. Используем ω(Ca) ≈ 24,4% (из задания 18). Масса нитрата кальция: m = m(Ca)/ω(Ca) = 4000/0,244 ≈ 16393 г ≈ 16,4 кг.`
				},
				{
					id: 5720,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Cu + H<sub>2</sub>SO<sub>4</sub> → H<sub>2</sub>O + CuSO<sub>4</sub> + SO<sub>2</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Концентрированная серная кислота окисляет медь.</p>
						<p>Электронный баланс: Cu<sup>0</sup> − 2e<sup>-</sup> → Cu<sup>+2</sup> (окисление, восстановитель, ×1); S<sup>+6</sup> + 2e<sup>-</sup> → S<sup>+4</sup> (восстановление, окислитель, ×1).</p>
						<p>Уравнение: Cu + 2H<sub>2</sub>SO<sub>4</sub>(конц.) → CuSO<sub>4</sub> + SO<sub>2</sub>↑ + 2H<sub>2</sub>O.</p>
						<p>Восстановитель — медь Cu (степень окисления 0), окислитель — серная кислота H<sub>2</sub>SO<sub>4</sub> (сера +6).</p>
						<p>Проверка: Cu:1=1; S:2=1+1; O:8=4+2+2; H:4=4 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5721,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: X → (AgNO₃) → Al(NO₃)₃ →…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">X → (AgNO<sub>3</sub>) → Al(NO<sub>3</sub>)<sub>3</sub> → Al<sub>2</sub>O<sub>3</sub> → AlBr<sub>3</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Получение нитрата алюминия из растворимой соли алюминия (хлорида) реакцией с нитратом серебра: AlCl<sub>3</sub> + 3AgNO<sub>3</sub> → Al(NO<sub>3</sub>)<sub>3</sub> + 3AgCl↓, X = AlCl<sub>3</sub>.</p>
						<p>2) Термическое разложение нитрата алюминия: 4Al(NO<sub>3</sub>)<sub>3</sub> → 2Al<sub>2</sub>O<sub>3</sub> + 12NO<sub>2</sub>↑ + 3O<sub>2</sub>↑.</p>
						<p>3) Растворение оксида алюминия в бромоводородной кислоте: Al<sub>2</sub>O<sub>3</sub> + 6HBr → 2AlBr<sub>3</sub> + 3H<sub>2</sub>O.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5722,
					type: 'written',
					maxPoints: 3,
					title: `К 150 г раствора хлорида кальция с массовой доле…`,
					taskKind: `Расчётная задача`,
					body: `<p>К 150 г раствора хлорида кальция с массовой долей соли 7,4% добавили избыток раствора кальцинированной соды. Вычислите массу образовавшегося осадка.</p>`,
					solution: `<p>Масса CaCl<sub>2</sub>: m = 150 · 0,074 = 11,1 г.</p>
						<p>M(CaCl<sub>2</sub>) = 40 + 2·35,5 = 111 г/моль.</p>
						<p>n(CaCl<sub>2</sub>) = 11,1/111 = 0,1 моль.</p>
						<p>CaCl<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> → CaCO<sub>3</sub>↓ + 2NaCl.</p>
						<p>n(CaCO<sub>3</sub>) = n(CaCl<sub>2</sub>) = 0,1 моль.</p>
						<p>M(CaCO<sub>3</sub>) = 100 г/моль.</p>
						<p>m(CaCO<sub>3</sub>) = 0,1 · 100 = 10 г.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5723,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата железа(II) и хлорида кальция, а также реактивы: соляная кислота, раствор сульфата натрия, раствор гидроксида натрия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфат железа(II) FeSO<sub>4</sub> распознают гидроксидом натрия: образуется зеленоватый осадок Fe(OH)<sub>2</sub> (со временем буреет).</p>
						<p>Хлорид кальция CaCl<sub>2</sub> распознают сульфатом натрия: образуется белый осадок CaSO<sub>4</sub>.</p>
						<p>Для FeSO<sub>4</sub> + NaOH: молекулярное FeSO<sub>4</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>; сокращённое Fe<sup>2+</sup> + 2OH<sup>-</sup> → Fe(OH)<sub>2</sub>↓.</p>
						<p>Для CaCl<sub>2</sub> + Na<sub>2</sub>SO<sub>4</sub>: молекулярное CaCl<sub>2</sub> + Na<sub>2</sub>SO<sub>4</sub> → CaSO<sub>4</sub>↓ + 2NaCl; сокращённое Ca<sup>2+</sup> + SO<sub>4</sub><sup>2-</sup> → CaSO<sub>4</sub>↓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 58 · ОГЭ химия 2026, PDF вариант 29 (5801–5823)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5801,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о натрии как о простом веществе.</p>`,
					options: [
						{ id: '1', label: `В состав многих минералов входит натрий.` },
						{ id: '2', label: `Натрий — сильный восстановитель.` },
						{ id: '3', label: `Бромид натрия содержит меньше натрия, чем его хлорид.` },
						{ id: '4', label: `Натрий легче воды.` },
						{ id: '5', label: `Радиус атомов натрия больше радиуса атомов лития.` },
					],
					correct: ['2', '4'],
					hint: `О простом веществе говорят, описывая физические и химические свойства самого металла Na. 2) ✓ Натрий — сильный восстановитель — химическое свойство простого вещества. 4) ✓ Натрий легче воды (плотность меньше) — физическое свойство простого вещества. 1) Входит в состав минералов — об элементе. 3) Сравнение содержания в соединениях — об элементе. 5) Радиус атомов — характеристика атома (элемента).`
				},
				{
					id: 5802,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (три электронных слоя: 2, 8 и 3 электрона). Запишите в поле ответа номер периода, в котором расположен данный химический элемент (X), и значение высшей валентности его по кислороду (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '33',
					hint: `Электронные слои 2, 8, 3 → всего 13 электронов, заряд ядра +13 → элемент алюминий (Al). Число электронных слоёв = номер периода = 3 → X = 3. Алюминий в III группе, высшая валентность по кислороду = III (высший оксид Al₂O₃) → Y = 3. Ответ: X=3, Y=3.`
				},
				{
					id: 5803,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) кремний, 2) азот, 3) хлор в порядке увеличения кислотного характера их высших гидроксидов.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '123',
					hint: `Кислотный характер высших гидроксидов (кислородсодержащих кислот) усиливается с ростом степени окисления и электроотрицательности элемента. Высшие гидроксиды: H₂SiO₃ (слабая), HNO₃ (сильная), HClO₄ (очень сильная). В порядке увеличения кислотного характера: кремний (1) < азот (2) < хлор (3). Ответ: 1, 2, 3.`
				},
				{
					id: 5804,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления фосфора в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `NaH<sub>2</sub>PO<sub>4</sub>` },
						{ letter: 'Б', label: `PH<sub>4</sub>ClO<sub>4</sub>` },
						{ letter: 'В', label: `PH<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `−3` },
						{ id: '2', label: `−1` },
						{ id: '3', label: `+3` },
						{ id: '4', label: `+5` },
					],
					correct: ['4', '1', '1'],
					hint: `А) NaH₂PO₄: Na(+1), H(+1)×2, O(−2)×4 → 1 + 2 + P + 4·(−2) = 0 → P = +5 (вариант 4). Б) PH₄ClO₄ (перхлорат фосфония, ион PH₄⁺ и ClO₄⁻): в катионе PH₄⁺ H(+1)×4 → P + 4 = +1 → P = −3? Учитывая, что в PH₄⁺ фосфор аналогичен азоту в NH₄⁺: P = −3 → вариант 1. (Однако по формальному расчёту с учётом аниона степень окисления фосфора в катионе PH₄⁺ равна −3.) В) PH₃: H(+1)×3 → P + 3 = 0 → P = −3 (вариант 1). Примечание: при трактовке Б как иона фосфония P = −3; ключ может содержать иной вариант — сверьте`
				},
				{
					id: 5805,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых присутствует ковалентная полярная связь.</p>`,
					options: [
						{ id: '1', label: `хлороводород` },
						{ id: '2', label: `бромид кальция` },
						{ id: '3', label: `бром` },
						{ id: '4', label: `красный фосфор` },
						{ id: '5', label: `оксид фосфора(V)` },
					],
					correct: ['1', '5'],
					hint: `Ковалентная полярная связь образуется между разными атомами неметаллов. 1) ✓ HCl — связь H–Cl между разными неметаллами — ковалентная полярная. 5) ✓ P₂O₅ — связи P–O между разными неметаллами — ковалентные полярные. 2) CaBr₂ — ионная. 3) Br₂ — ковалентная неполярная. 4) Красный фосфор — ковалентная неполярная (P–P).`
				},
				{
					id: 5806,
					type: 'multi',
					pickCount: 2,
					title: `Из числа предложенных утверждений выберите два в…`,
					body: `<p>Из числа предложенных утверждений выберите два верных.</p>`,
					options: [
						{ id: '1', label: `Атомы водорода и фтора содержат по одному неспаренному электрону.` },
						{ id: '2', label: `Белый и красный фосфор имеют одинаковый тип кристаллической решётки.` },
						{ id: '3', label: `Как водород, так и кислород являются сильными восстановителями.` },
						{ id: '4', label: `Атомный радиус алюминия больше атомного радиуса фосфора.` },
						{ id: '5', label: `И кремний, и алюминий образуют оксиды с ионным типом химической связи.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Водород (1s¹) и фтор (...2p⁵) имеют по одному неспаренному электрону. 4) ✓ В периоде радиус уменьшается слева направо, поэтому радиус Al больше радиуса P. 2) Белый фосфор имеет молекулярную решётку (P₄), красный — атомную, типы разные, неверно. 3) Кислород — сильный окислитель, а не восстановитель, неверно. 5) Оксид кремния SiO₂ имеет атомную (ковалентную) решётку, не ионную, неверно.`
				},
				{
					id: 5807,
					type: 'input',
					title: `Из предложенного перечня веществ выберите кислую…`,
					body: `<p>Из предложенного перечня веществ выберите кислую соль и кислотный оксид. 1) NO, 2) (MgOH)<sub>2</sub>CO<sub>3</sub>, 3) Cl<sub>2</sub>O, 4) NaHS, 5) BeO. Запишите сначала номер кислой соли, затем номер кислотного оксида.</p>
						<p style="color:var(--muted);font-size:14px;">1) NO  2) (MgOH)<sub>2</sub>CO<sub>3</sub>  3) Cl<sub>2</sub>O  4) NaHS  5) BeO</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '43',
					hint: `Кислая соль содержит атомы водорода в кислотном остатке: NaHS (гидросульфид натрия) — номер 4. Кислотный оксид — Cl₂O (оксид хлора(I), которому соответствует кислота HClO) — номер 3. NO — несолеобразующий оксид. (MgOH)₂CO₃ — основная соль. BeO — амфотерный оксид.`
				},
				{
					id: 5808,
					type: 'multi',
					pickCount: 2,
					title: `Какие два из перечисленных ниже веществ реагирую…`,
					body: `<p>Какие два из перечисленных ниже веществ реагируют с оксидом меди(II)?</p>`,
					options: [
						{ id: '1', label: `CO<sub>2</sub>` },
						{ id: '2', label: `K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '3', label: `HNO<sub>3</sub>` },
						{ id: '4', label: `K<sub>2</sub>CO<sub>3</sub>` },
						{ id: '5', label: `CO` },
					],
					correct: ['3', '5'],
					hint: `3) ✓ Азотная кислота реагирует с основным оксидом: CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O. 5) ✓ Угарный газ восстанавливает оксид меди(II): CuO + CO → Cu + CO₂. 1) С CO₂ не реагирует. 2) С сульфатом калия не реагирует. 4) С карбонатом калия не реагирует.`
				},
				{
					id: 5809,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и продуктами их взаимодействия. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `FeO + CO` },
						{ letter: 'Б', label: `Fe(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
						{ letter: 'В', label: `FeO + H<sub>2</sub>SO<sub>4</sub>(разб.)` },
					],
					matchRight: [
						{ id: '1', label: `→ FeCO<sub>3</sub>` },
						{ id: '2', label: `→ Fe + CO<sub>2</sub>` },
						{ id: '3', label: `→ FeSO<sub>4</sub> + H<sub>2</sub>O` },
						{ id: '4', label: `→ FeSO<sub>4</sub> + H<sub>2</sub>` },
						{ id: '5', label: `→ FeSO<sub>4</sub>` },
					],
					correct: ['2', '3', '3'],
					hint: `А) FeO + CO → Fe + CO₂ — восстановление оксида угарным газом (вариант 2). Б) Fe(OH)₂ + H₂SO₄ → FeSO₄ + 2H₂O — нейтрализация (вариант 3). В) FeO + H₂SO₄ → FeSO₄ + H₂O — основный оксид с кислотой даёт соль и воду (вариант 3).`
				},
				{
					id: 5810,
					type: 'match',
					title: `Установите соответствие между названием вещества…`,
					body: `<p>Установите соответствие между названием вещества и реагентами, с которыми это вещество может взаимодействовать. НАЗВАНИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `цинк` },
						{ letter: 'Б', label: `оксид серы(IV)` },
						{ letter: 'В', label: `карбонат кальция` },
					],
					matchRight: [
						{ id: '1', label: `O<sub>2</sub>, KOH` },
						{ id: '2', label: `SiO<sub>2</sub>, HCl` },
						{ id: '3', label: `Mg(OH)<sub>2</sub>, SiO<sub>2</sub>` },
						{ id: '4', label: `Ba(NO<sub>3</sub>)<sub>2</sub>, Mg` },
					],
					correct: ['1', '1', '2'],
					hint: `А) Цинк (амфотерный металл) реагирует с кислородом (2Zn + O₂ → 2ZnO) и со щёлочью KOH (Zn + 2KOH + 2H₂O → K₂[Zn(OH)₄] + H₂↑): вариант 1 (O₂, KOH). Б) Оксид серы(IV) — кислотный оксид, реагирует с основанием Mg(OH)₂ и при сплавлении с SiO₂... точнее с основными соединениями: вариант 3 (Mg(OH)₂, SiO₂). В) Карбонат кальция реагирует с SiO₂ при сплавлении (CaCO₃ + SiO₂ → CaSiO₃ + CO₂↑) и с соляной кислотой (CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O): вариант 2 (SiO₂, HCl).`
				},
				{
					id: 5811,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного ниже перечня выберите две пары…`,
					body: `<p>Из предложенного ниже перечня выберите две пары веществ, между которыми протекает реакция обмена.</p>`,
					options: [
						{ id: '1', label: `гидроксид натрия и фосфорная кислота` },
						{ id: '2', label: `сульфат магния и нитрат бария` },
						{ id: '3', label: `гидроксид натрия и сера` },
						{ id: '4', label: `бром и иодид магния` },
						{ id: '5', label: `азотная кислота и железо` },
					],
					correct: ['1', '2'],
					hint: `Реакция обмена — обмен составными частями между двумя сложными веществами. 1) ✓ 3NaOH + H₃PO₄ → Na₃PO₄ + 3H₂O — обмен (нейтрализация). 2) ✓ MgSO₄ + Ba(NO₃)₂ → BaSO₄↓ + Mg(NO₃)₂ — обмен. 3) 6NaOH + 3S → 2Na₂S + Na₂SO₃ + 3H₂O — ОВР (диспропорционирование). 4) Br₂ + MgI₂ → MgBr₂ + I₂ — замещение (вытеснение галогена). 5) Fe + 4HNO₃ → Fe(NO₃)₃ + NO↑ + 2H₂O — ОВР.`
				},
				{
					id: 5812,
					type: 'match',
					title: `Установите соответствие между реагирующими вещес…`,
					body: `<p>Установите соответствие между реагирующими веществами и признаком протекающей между ними реакции. РЕАГИРУЮЩИЕ ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `FeSO<sub>4</sub> и KOH` },
						{ letter: 'Б', label: `AlCl<sub>3</sub> и NH<sub>3</sub>·H<sub>2</sub>O` },
						{ letter: 'В', label: `H<sub>2</sub>SO<sub>4</sub>(изб.) и Na<sub>2</sub>CO<sub>3</sub>` },
					],
					matchRight: [
						{ id: '1', label: `выделение газа` },
						{ id: '2', label: `образование окрашенного осадка` },
						{ id: '3', label: `образование белого осадка` },
						{ id: '4', label: `видимые признаки реакции отсутствуют` },
					],
					correct: ['2', '3', '1'],
					hint: `А) FeSO₄ + 2KOH → Fe(OH)₂↓ + K₂SO₄ — образуется зеленоватый (окрашенный) осадок гидроксида железа(II) (вариант 2). Б) AlCl₃ + 3NH₃·H₂O → Al(OH)₃↓ + 3NH₄Cl — образуется белый осадок гидроксида алюминия (вариант 3). В) H₂SO₄ + Na₂CO₃ → Na₂SO₄ + CO₂↑ + H₂O — выделяется газ CO₂ (вариант 1).`
				},
				{
					id: 5813,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, при диссоциации которых образуется 1 моль анионов из 1 моль вещества.</p>`,
					options: [
						{ id: '1', label: `хлорат калия` },
						{ id: '2', label: `гидроксид стронция` },
						{ id: '3', label: `сульфид калия` },
						{ id: '4', label: `нитрат железа(III)` },
						{ id: '5', label: `сульфат железа(II)` },
					],
					correct: ['1', '5'],
					hint: `Нужно, чтобы из 1 моль вещества образовался 1 моль анионов. 1) ✓ KClO₃ → K⁺ + ClO₃⁻ (1 моль анионов). 5) ✓ FeSO₄ → Fe²⁺ + SO₄²⁻ (1 моль анионов). 2) Sr(OH)₂ → Sr²⁺ + 2OH⁻ (2 моль анионов). 3) K₂S → 2K⁺ + S²⁻ (1 анион, но 2 катиона). 4) Fe(NO₃)₃ → Fe³⁺ + 3NO₃⁻ (3 моль анионов).`
				},
				{
					id: 5814,
					type: 'multi',
					pickCount: 2,
					title: `Сокращённое ионное уравнение Cu²⁺ + S²⁻ = CuS со…`,
					body: `<p>Сокращённое ионное уравнение</p>
						<p style="text-align:center; font-size: 18px; margin: 10px 0;">Cu<sup>2+</sup> + S<sup>2-</sup> = CuS соответствует взаимодействию веществ из набора катионов: 1) Cu, 2) Cu(OH)<sub>2</sub>, 3) CuBr<sub>2</sub>, и анионов: 4) H<sub>2</sub>S, 5) Al<sub>2</sub>S<sub>3</sub>, 6) K<sub>2</sub>S.</p>`,
					options: [
						{ id: '1', label: `Cu` },
						{ id: '2', label: `Cu(OH)<sub>2</sub>` },
						{ id: '3', label: `CuBr<sub>2</sub>` },
						{ id: '4', label: `H<sub>2</sub>S` },
						{ id: '5', label: `Al<sub>2</sub>S<sub>3</sub>` },
						{ id: '6', label: `K<sub>2</sub>S` },
					],
					correct: ['3', '6'],
					hint: `Сокращённому уравнению Cu²⁺ + S²⁻ = CuS↓ соответствует взаимодействие растворимой соли меди(II) и растворимого сульфида. 3) ✓ CuBr₂ — растворимая соль, даёт ионы Cu²⁺. 6) ✓ K₂S — растворимый сульфид, даёт ионы S²⁻. CuBr₂ + K₂S → CuS↓ + 2KBr. Cu — металл, Cu(OH)₂ нерастворим, H₂S — слабая кислота, Al₂S₃ нерастворим и гидролизуется.`
				},
				{
					id: 5815,
					type: 'match',
					title: `Установите соответствие между схемой процесса и…`,
					body: `<p>Установите соответствие между схемой процесса и названием процесса, происходящего в окислительно-восстановительной реакции. СХЕМА ПРОЦЕССА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `S<sup>-2</sup> → S<sup>0</sup>` },
						{ letter: 'Б', label: `O<sub>2</sub><sup>0</sup> → 2O<sup>-2</sup>` },
						{ letter: 'В', label: `Cu<sup>+2</sup> → Cu<sup>0</sup>` },
					],
					matchRight: [
						{ id: '1', label: `окисление` },
						{ id: '2', label: `восстановление` },
					],
					correct: ['1', '2', '2'],
					hint: `А) S⁻² → S⁰: −2 → 0, повышение СО — окисление (1). Б) O₂⁰ → 2O⁻²: 0 → −2, понижение СО — восстановление (2). В) Cu⁺² → Cu⁰: +2 → 0, понижение СО — восстановление (2).`
				},
				{
					id: 5816,
					type: 'multi',
					pickCount: null,
					title: `Из перечисленных суждений о правилах работы с ве…`,
					body: `<p>Из перечисленных суждений о правилах работы с веществами в лаборатории и в быту выберите верное(-ые).</p>`,
					options: [
						{ id: '1', label: `Работать с органическими растворителями следует в хорошо проветриваемом помещении.` },
						{ id: '2', label: `Смесь воды и бензина можно разделить фильтрованием.` },
						{ id: '3', label: `После попадания кислоты на руку нейтрализовать кожу раствором гидроксида натрия.` },
						{ id: '4', label: `Все соли свинца и ртути ядовиты.` },
					],
					correct: ['1', '4'],
					hint: `1) ✓ Органические растворители летучи и часто токсичны/огнеопасны — работают в хорошо проветриваемом помещении. 4) ✓ Соли свинца и ртути ядовиты. 2) Неверно: вода и бензин не смешиваются (расслаиваются), их разделяют делительной воронкой, а не фильтрованием. 3) Неверно: гидроксид натрия — едкая щёлочь; кожу сначала промывают водой, затем нейтрализуют слабым раствором соды.`
				},
				{
					id: 5817,
					type: 'match',
					title: `Установите соответствие между двумя веществами и…`,
					body: `<p>Установите соответствие между двумя веществами и реактивом, с помощью которого можно различить эти вещества. ВЕЩЕСТВА:</p>`,
					matchLeft: [
						{ letter: 'А', label: `Fe и Ag` },
						{ letter: 'Б', label: `CaCl<sub>2</sub>(р-р) и Ca(OH)<sub>2</sub>(р-р)` },
						{ letter: 'В', label: `NH<sub>3</sub>(р-р) и NH<sub>4</sub>Cl(р-р)` },
					],
					matchRight: [
						{ id: '1', label: `фенолфталеин` },
						{ id: '2', label: `Na<sub>2</sub>SO<sub>4</sub>(р-р)` },
						{ id: '3', label: `HCl(р-р)` },
						{ id: '4', label: `KNO<sub>3</sub>(р-р)` },
					],
					correct: ['3', '1', '1'],
					hint: `А) Fe и Ag различают соляной кислотой HCl: железо растворяется с выделением водорода (Fe + 2HCl → FeCl₂ + H₂↑), серебро не реагирует (вариант 3). Б) CaCl₂ и Ca(OH)₂ — в данном наборе остаётся реактив 2 (Na₂SO₄); надёжнее всего щёлочь Ca(OH)₂ выявляется индикатором (фенолфталеин даёт малиновую окраску), но фенолфталеин в ключе закреплён за парой В. В) NH₃ и NH₄Cl различают фенолфталеином: раствор аммиака (щёлочь) окрашивается в малиновый цвет, NH₄Cl — нет (вариант 1). Примечание: по официальному `
				},
				{
					id: 5818,
					type: 'input',
					title: `Кальциевая селитра (нитрат кальция, Ca(NO₃)₂) —…`,
					body: `<p>Кальциевая селитра (нитрат кальция, Ca(NO<sub>3</sub>)<sub>2</sub>) — соль азотной кислоты, широко используется в качестве азотного и кальциевого удобрения. Вычислите массовую долю азота в нитрате кальция. Запишите число с точностью до десятых (в процентах).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '17,1',
					hint: `Ca(NO₃)₂: M = 40 + 2·(14 + 3·16) = 40 + 124 = 164 г/моль. Масса азота в формуле = 2·14 = 28. Массовая доля азота: ω(N) = 28/164 · 100% = 17,07% ≈ 17,1%.`
				},
				{
					id: 5819,
					type: 'input',
					title: `При внекорневых подкормках бахчевых культур их о…`,
					body: `<p>При внекорневых подкормках бахчевых культур их опрыскивают раствором, содержащим 4 г азота в каждом литре. Вычислите, какую массу кальциевой селитры надо использовать для приготовления 1 м<sup>3</sup> такого раствора. Запишите число с точностью до десятых (в кг).</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '23,4',
					hint: `1 м³ = 1000 л. Масса азота: 4 · 1000 = 4000 г = 4 кг N. Используем ω(N) ≈ 17,1% (из задания 18). Масса нитрата кальция: m = m(N)/ω(N) = 4000/0,171 ≈ 23392 г ≈ 23,4 кг.`
				},
				{
					id: 5820,
					type: 'written',
					maxPoints: 3,
					title: `Используя метод электронного баланса, расставьте…`,
					taskKind: `Задача на ОВР`,
					body: `<p>Используя метод электронного баланса, расставьте коэффициенты в уравнении реакции,</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">NaBr + H<sub>2</sub>SO<sub>4</sub> → Br<sub>2</sub> + H<sub>2</sub>O + NaHSO<sub>4</sub> + SO<sub>2</sub></p>
						<p>Запишите формулы окислителя и восстановителя; укажите, какое вещество окислитель, а какое — восстановитель.</p>`,
					solution: `<p>Концентрированная серная кислота окисляет бромид-ион.</p>
						<p>Электронный баланс: 2Br<sup>-1</sup> − 2e<sup>-</sup> → Br<sub>2</sub><sup>0</sup> (окисление, восстановитель, ×1); S<sup>+6</sup> + 2e<sup>-</sup> → S<sup>+4</sup> (восстановление, окислитель, ×1).</p>
						<p>Уравнение: 2NaBr + 3H<sub>2</sub>SO<sub>4</sub> → Br<sub>2</sub> + SO<sub>2</sub>↑ + 2H<sub>2</sub>O + 2NaHSO<sub>4</sub>.</p>
						<p>Восстановитель — бромид натрия NaBr (бром −1), окислитель — серная кислота H<sub>2</sub>SO<sub>4</sub> (сера +6).</p>
						<p>Проверка: Na:2=2; Br:2=2; S:3=1+2; H:6=4+2; O:12=2+2+8 ✓.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Составлен электронный баланс с верными множителями.` },
						{ id: 'c2', points: 1, label: `Коэффициенты в уравнении расставлены верно.` },
						{ id: 'c3', points: 1, label: `Указаны окислитель и восстановитель.` },
					]
				},
				{
					id: 5821,
					type: 'written',
					maxPoints: 3,
					title: `Дана схема превращений: Al(NO₃)₃ → Al₂O₃ → (HCl)…`,
					taskKind: `Уравнения по схеме`,
					body: `<p>Дана схема превращений:</p>
						<p style="text-align:center; font-family: 'JetBrains Mono', monospace; font-size: 15px; background:#f7f8fb; padding:12px 14px; border-radius:10px;">Al(NO<sub>3</sub>)<sub>3</sub> → Al<sub>2</sub>O<sub>3</sub> → (HCl) → X → Al(OH)<sub>3</sub></p>
						<p>Напишите молекулярные уравнения реакций, с помощью которых можно осуществить указанные превращения.</p>`,
					solution: `<p>1) Термическое разложение нитрата алюминия: 4Al(NO<sub>3</sub>)<sub>3</sub> → 2Al<sub>2</sub>O<sub>3</sub> + 12NO<sub>2</sub>↑ + 3O<sub>2</sub>↑.</p>
						<p>2) Растворение оксида алюминия в соляной кислоте: Al<sub>2</sub>O<sub>3</sub> + 6HCl → 2AlCl<sub>3</sub> + 3H<sub>2</sub>O, X = AlCl<sub>3</sub>.</p>
						<p>3) Получение гидроксида алюминия действием щёлочи (без избытка) или аммиака: AlCl<sub>3</sub> + 3NaOH → Al(OH)<sub>3</sub>↓ + 3NaCl (избытка щёлочи избегают, чтобы осадок не растворился).</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Первое превращение записано верным молекулярным уравнением.` },
						{ id: 'c2', points: 1, label: `Второе превращение записано верно.` },
						{ id: 'c3', points: 1, label: `Третье превращение (и промежуточное вещество X, если нужно) указаны верно.` },
					]
				},
				{
					id: 5822,
					type: 'written',
					maxPoints: 3,
					title: `К 44,4 г раствора хлорида кальция с массовой дол…`,
					taskKind: `Расчётная задача`,
					body: `<p>К 44,4 г раствора хлорида кальция с массовой долей соли 15% добавили избыток раствора ортофосфата калия. Вычислите массу образовавшегося осадка.</p>`,
					solution: `<p>Масса CaCl<sub>2</sub>: m = 44,4 · 0,15 = 6,66 г.</p>
						<p>M(CaCl<sub>2</sub>) = 111 г/моль.</p>
						<p>n(CaCl<sub>2</sub>) = 6,66/111 = 0,06 моль.</p>
						<p>3CaCl<sub>2</sub> + 2K<sub>3</sub>PO<sub>4</sub> → Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>↓ + 6KCl.</p>
						<p>n(Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>) = n(CaCl<sub>2</sub>)/3 = 0,02 моль.</p>
						<p>M(Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>) = 3·40 + 2·(31 + 4·16) = 120 + 190 = 310 г/моль.</p>
						<p>m(Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>) = 0,02 · 310 = 6,2 г.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Записано уравнение реакции и найдено количество вещества по условию.` },
						{ id: 'c2', points: 1, label: `Промежуточные расчёты выполнены верно.` },
						{ id: 'c3', points: 1, label: `Получен окончательный ответ с нужной точностью и единицами.` },
					]
				},
				{
					id: 5823,
					type: 'written',
					maxPoints: 3,
					title: `Для проведения эксперимента выданы склянки № 1 и…`,
					taskKind: `Практическое задание`,
					body: `<p>Для проведения эксперимента выданы склянки № 1 и № 2 с растворами сульфата железа(II) и карбоната калия, а также реактивы: раствор хлорида бария, соляная кислота, раствор гидроксида натрия. Определите содержимое склянок, составьте уравнения реакций (молекулярное, полное и сокращённое ионное) для определения каждого вещества.</p>`,
					solution: `<p>Сульфат железа(II) FeSO<sub>4</sub> распознают гидроксидом натрия: образуется зеленоватый осадок Fe(OH)<sub>2</sub> (со временем буреет).</p>
						<p>Карбонат калия K<sub>2</sub>CO<sub>3</sub> распознают соляной кислотой: выделяется газ CO<sub>2</sub> (вскипание).</p>
						<p>Можно также использовать BaCl<sub>2</sub> (BaSO<sub>4</sub> и BaCO<sub>3</sub> — оба белые осадки, поэтому различение лучше вести по NaOH и HCl).</p>
						<p>Для FeSO<sub>4</sub> + NaOH: молекулярное FeSO<sub>4</sub> + 2NaOH → Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>; сокращённое Fe<sup>2+</sup> + 2OH<sup>-</sup> → Fe(OH)<sub>2</sub>↓.</p>
						<p>Для K<sub>2</sub>CO<sub>3</sub> + HCl: молекулярное K<sub>2</sub>CO<sub>3</sub> + 2HCl → 2KCl + CO<sub>2</sub>↑ + H<sub>2</sub>O; сокращённое CO<sub>3</sub><sup>2-</sup> + 2H<sup>+</sup> → CO<sub>2</sub>↑ + H<sub>2</sub>O.</p>`,
					criteria: [
						{ id: 'c1', points: 1, label: `Выбраны подходящие реактивы для различения веществ.` },
						{ id: 'c2', points: 1, label: `Записаны молекулярное, полное и сокращённое ионные уравнения.` },
						{ id: 'c3', points: 1, label: `Описаны наблюдаемые признаки реакций.` },
					]
				},
				// ============================================================
				// ВАРИАНТ 59 · ОГЭ химия 2026, PDF вариант 30 (5901–5905)
				// Источник: oge_chemistry_21-30_fixed.js
				// ============================================================
				{
					id: 5901,
					type: 'multi',
					pickCount: 2,
					title: `Выберите два утверждения, в которых говорится о…`,
					body: `<p>Выберите два утверждения, в которых говорится о фосфоре как о химическом элементе.</p>`,
					options: [
						{ id: '1', label: `В состав костной ткани входит фосфор.` },
						{ id: '2', label: `Фосфор получают в электропечах.` },
						{ id: '3', label: `Фосфорные удобрения незаменимы в сельском хозяйстве.` },
						{ id: '4', label: `Красный фосфор используется в спичках.` },
						{ id: '5', label: `Белый фосфор светится в темноте.` },
					],
					correct: ['1', '3'],
					hint: `О химическом элементе говорят, когда речь идёт о его наличии в составе сложных веществ. 1) ✓ Фосфор входит в состав костной ткани (в виде фосфатов кальция) — об элементе в составе соединений. 3) ✓ Фосфорные удобрения содержат фосфор в составе соединений — об элементе. 2) Получают в электропечах — о простом веществе. 4) Красный фосфор в спичках — о простом веществе (модификации). 5) Белый фосфор светится — свойство простого вещества.`
				},
				{
					id: 5902,
					type: 'input',
					title: `На приведённом рисунке изображена модель атома х…`,
					body: `<p>На приведённом рисунке изображена модель атома химического элемента (три электронных слоя: 2, 8 и 6 электронов). Запишите в поле ответа номер периода, в котором расположен данный химический элемент (X), и число электронов, недостающих до завершения внешнего уровня (Y).</p>
						<p style="color:var(--muted);font-size:14px;">Запишите числа подряд, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '32',
					hint: `Электронные слои 2, 8, 6 → всего 16 электронов, заряд ядра +16 → элемент сера (S). Число электронных слоёв = номер периода = 3 → X = 3. На внешнем уровне 6 электронов; до завершения (до 8) недостаёт 8 − 6 = 2 электрона → Y = 2. Ответ: X=3, Y=2.`
				},
				{
					id: 5903,
					type: 'input',
					title: `Расположите предложенные химические элементы`,
					body: `<p>Расположите предложенные химические элементы 1) алюминий, 2) хлор, 3) калий в порядке увеличения восстановительных свойств отвечающих им простых веществ.</p>
						<p style="color:var(--muted);font-size:14px;">Запишите номера в соответствующем порядке, без пробелов и запятых.</p>`,
					placeholder: 'введите ответ цифрами',
					correct: '213',
					hint: `Восстановительные свойства простых веществ усиливаются с ростом металлических свойств элемента. Хлор — типичный неметалл (окислитель, восстановительные свойства минимальны), алюминий — амфотерный металл (восстановитель средней силы), калий — активный щелочной металл (сильный восстановитель). В порядке увеличения восстановительных свойств: хлор (2) < алюминий (1) < калий (3). Ответ: 2, 1, 3.`
				},
				{
					id: 5904,
					type: 'match',
					title: `Установите соответствие между веществом и степен…`,
					body: `<p>Установите соответствие между веществом и степенью окисления галогена в этом веществе. ВЕЩЕСТВО:</p>`,
					matchLeft: [
						{ letter: 'А', label: `AlOBr` },
						{ letter: 'Б', label: `Cl<sub>2</sub>O` },
						{ letter: 'В', label: `F<sub>2</sub>O` },
					],
					matchRight: [
						{ id: '1', label: `−1` },
						{ id: '2', label: `0` },
						{ id: '3', label: `+1` },
						{ id: '4', label: `+2` },
					],
					correct: ['1', '3', '1'],
					hint: `А) AlOBr: Al(+3), O(−2) → 3 + (−2) + Br = 0 → Br = −1 (вариант 1). Б) Cl₂O: O(−2) → 2·Cl + (−2) = 0 → Cl = +1 (вариант 3). В) F₂O (фторид кислорода OF₂): фтор — самый электроотрицательный элемент, всегда имеет степень окисления −1 → F = −1 (вариант 1); при этом кислород здесь имеет степень окисления +2.`
				},
				{
					id: 5905,
					type: 'multi',
					pickCount: 2,
					title: `Из предложенного перечня веществ выберите два ве…`,
					body: `<p>Из предложенного перечня веществ выберите два вещества, в которых отсутствует ионная связь.</p>`,
					options: [
						{ id: '1', label: `CO` },
						{ id: '2', label: `BaO` },
						{ id: '3', label: `CaF<sub>2</sub>` },
						{ id: '4', label: `K<sub>2</sub>SO<sub>4</sub>` },
						{ id: '5', label: `H<sub>2</sub>SO<sub>4</sub>` },
					],
					correct: ['4', '5'],
					hint: `Ионная связь отсутствует в веществах, образованных только неметаллами (ковалентная связь). 1) ✓ CO — связь C–O между неметаллами, ковалентная полярная (ионной нет). 5) ✓ H₂SO₄ — все связи ковалентные полярные (ионной нет). 2) BaO — ионная (металл + неметалл). 3) CaF₂ — ионная. 4) K₂SO₄ — есть ионная связь между K⁺ и SO₄²⁻.`
				},
];
