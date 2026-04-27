// Демонстрационные данные админ-аналитики (MVP). Заменяются API позже.
(function () {
	'use strict';

	function clone(x) {
		return JSON.parse(JSON.stringify(x));
	}

	const BASE = {
		kpis: [
			{ id: 'dau', label: 'DAU', value: '1 842', delta: '+6,2%', trend: 'up', hint: 'Уникальные пользователи за вчера' },
			{ id: 'mau_dau', label: 'MAU / DAU', value: '4,1', delta: 'стабильно', trend: 'flat', hint: 'Отношение месячной и дневной аудитории' },
			{ id: 'metrika_users', label: 'Посетители · Я.Метрика (мок)', value: '2 340', delta: 'уникальные за 7 дн. (демо)', trend: 'flat', hint: 'В бою: ym:s:users по API. Здесь — заглушка, если /api/admin/overview недоступен' },
			{ id: 'new_users', label: 'Новые за период', value: '3 105', delta: '+12%', trend: 'up', hint: 'Первый визит / регистрация' },
			{ id: 'online', label: 'Онлайн сейчас', value: '127', delta: 'оценка', trend: 'flat', hint: 'Активность за последние 3 мин (мок)' },
			{ id: 'started', label: 'Тестов начато', value: '4 920', delta: '+4%', trend: 'up', hint: 'Все типы тестов' },
			{ id: 'completed', label: 'Тестов завершено', value: '3 881', delta: '+3%', trend: 'up', hint: 'Успешное завершение' },
			{ id: 'completion', label: 'Completion rate', value: '78,9%', delta: '−0,4 п.п.', trend: 'down', hint: 'Завершено / начато' },
			{ id: 'avg_score', label: 'Средний результат', value: '64%', delta: '+1,1 п.п.', trend: 'up', hint: 'По всем завершённым попыткам' },
			{ id: 'session', label: 'Средняя сессия', value: '18 мин', delta: '124 сессий', trend: 'up', hint: 'Медиана длительности сессии (события одного пользователя с разрывом ≤ 30 мин)' },
			{ id: 'time_in_test', label: 'Время в тесте', value: '12 мин 30 с', delta: '38 тестов', trend: 'up', hint: 'Медиана интервала (chem.attempt_complete − chem.attempt_start) по совпавшим attemptId' },
			{ id: 'funnel_drop', label: 'Узкое место воронки', value: 'Начало → конец теста', delta: '−34%', trend: 'down', hint: 'Максимальный отвал за неделю' },
			{ id: 'review_flag', label: 'Вопросов на проверку', value: '14', delta: '+2', trend: 'up', hint: 'Правило: высокий % ошибок при n≥50' },
			{ id: 'mistakes_users', label: 'Работа над ошибками', value: '612', delta: '+8%', trend: 'up', hint: 'Уникальные пользователи (за базовый период)' }
		],
		funnel: [
			{ step: 'Аккаунтов в базе', users: 10000, pct: 100 },
			{ step: 'Просмотрели тему', users: 6200, pct: 62 },
			{ step: 'Начали тест', users: 4100, pct: 41 },
			{ step: 'Завершили тест', users: 3180, pct: 31.8 },
			{ step: 'С непустым банком ошибок', users: 980, pct: 9.8 }
		],
		topQuestions: [
			{ qid: 10042, topic: 'Атомы и молекулы', wrongPct: 78, shows: 1240, avgSec: 145, flag: true },
			{ qid: 30018, topic: 'Периодическая система', wrongPct: 71, shows: 980, avgSec: 132, flag: true },
			{ qid: 40007, topic: 'Химическая связь', wrongPct: 69, shows: 856, avgSec: 118, flag: false },
			{ qid: 50031, topic: 'Электронные оболочки', wrongPct: 66, shows: 1102, avgSec: 156, flag: true },
			{ qid: 2204, topic: 'Валентность и ст. окисления', wrongPct: 64, shows: 2105, avgSec: 89, flag: false }
		],
		subjectsSnapshot: [
			{ key: 'chemistry', name: 'Химия', users: 4200, avgPct: 64, activityShare: 42 },
			{ key: 'biology', name: 'Биология', users: 1800, avgPct: 58, activityShare: 18 },
			{ key: 'physics', name: 'Физика', users: 1500, avgPct: 55, activityShare: 15 },
			{ key: 'math', name: 'Математика', users: 1200, avgPct: 52, activityShare: 12 },
			{ key: 'russian', name: 'Русский', users: 900, avgPct: 61, activityShare: 9 }
		],
		eventsHealth: {
			total: 18420,
			distinctUsers: 1842,
			lastEventMs: Date.now() - 4 * 60 * 1000,
			byType: { view: 9210, start: 4520, complete: 3360 }
		}
	};

	function fmtInt(n) {
		return String(Math.max(0, Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
	}

	/**
	 * BASE — объёмы за 7 дней (неделя).
	 * days: 1 | 7 | 14 | 30 — масштаб объёмов: days/7.
	 */
	function scaleForPeriod(data, days) {
		const out = clone(data);
		const volMul = days / 7;
		const dauRow = BASE.kpis.find((x) => x.id === 'dau');
		const baseUnique =
			parseInt(String(dauRow ? dauRow.value : '1842').replace(/\u202f/g, '').replace(/\s/g, ''), 10) || 1842;

		const mauDauByDays = {
			7: { value: '4,1', delta: 'стабильно', trend: 'flat', hint: 'MAU / DAU за 7 дней (мок)' },
			14: { value: '3,9', delta: '−0,2', trend: 'down', hint: 'MAU / DAU за 14 дней (мок)' },
			30: { value: '4,3', delta: '+0,2', trend: 'up', hint: 'MAU / DAU за 30 дней (мок)' }
		};

		const periodHint =
			days === 1 ? 'за сегодня' : days === 7 ? 'за 7 дней' : days === 14 ? 'за 14 дней' : 'за 30 дней';

		out.kpis = out.kpis.map((k) => {
			const copy = { ...k };

			if (k.id === 'dau') {
				if (days === 1) {
					copy.label = 'Активных сегодня';
					copy.hint = 'Уникальные пользователи за текущие сутки';
					copy.value = fmtInt(Math.max(1, Math.round(baseUnique / 7)));
				} else {
					copy.label = 'Уникальных за период';
					copy.hint = 'Уникальные пользователи за выбранные ' + days + ' дн.';
					copy.value = fmtInt(Math.round(baseUnique * volMul));
				}
				return copy;
			}

			if (k.id === 'mau_dau') {
				if (days === 1) {
					copy.label = 'MAU / DAU';
					copy.value = '—';
					copy.delta = 'н/д';
					copy.trend = 'flat';
					copy.hint = 'Нужен период от 7 дней';
				} else {
					const m = mauDauByDays[days] || mauDauByDays[7];
					copy.label = 'MAU / DAU';
					copy.value = m.value;
					copy.delta = m.delta;
					copy.trend = m.trend;
					copy.hint = m.hint;
				}
				return copy;
			}

			if (k.id === 'metrika_users') {
				copy.label = 'Посетители · Я.Метрика (мок)';
				if (days === 1) {
					copy.value = fmtInt(340);
					copy.delta = 'уникальные за сегодня (демо)';
					copy.hint = 'Счётчик с сайта (мок: живые данные через YANDEX_METRIKA_OAUTH_TOKEN)';
				} else {
					const baseM = 2340 * (days / 7);
					copy.value = fmtInt(Math.max(1, Math.round(baseM)));
					copy.delta = 'уникальные за ' + days + ' дн. (мок)';
					copy.hint = 'Уникальные посетители за период (мок; в бою — API Метрики)';
				}
				return copy;
			}

			if (k.id === 'mistakes_users') {
				copy.label = 'Работа над ошибками';
				copy.hint = 'Уникальные пользователи, открывшие раздел (' + periodHint + ')';
			}

			if (k.id === 'funnel_drop') {
				copy.hint = 'Максимальный отвал ' + periodHint + ' (мок)';
			}

			if (k.id === 'new_users') {
				copy.hint = 'Первый визит / регистрация (' + periodHint + ')';
			}

			if (k.id === 'started' || k.id === 'completed') {
				copy.hint = (k.id === 'started' ? 'Все типы тестов' : 'Успешное завершение') + ' (' + periodHint + ')';
			}

			if (k.id === 'online') return copy;
			if (k.id === 'review_flag') return copy;
			if (k.id === 'completion' || k.id === 'avg_score') return copy;
			if (k.id === 'funnel_drop' || k.id === 'time_in_test' || k.id === 'session') return copy;

			const num = String(copy.value).replace(/\u202f/g, ' ').replace(/\s/g, '');
			if (/^\d+$/.test(num)) {
				copy.value = fmtInt(parseInt(num, 10) * volMul);
			}
			return copy;
		});

		out.funnel = out.funnel.map((row) => ({
			...row,
			users: Math.max(1, Math.round(row.users * volMul))
		}));

		out.topQuestions = out.topQuestions.map((q) => ({
			...q,
			shows: Math.max(1, Math.round(q.shows * volMul))
		}));

		out.subjectsSnapshot = out.subjectsSnapshot.map((s) => ({
			...s,
			users: Math.max(1, Math.round(s.users * volMul))
		}));

		if (out.eventsHealth) {
			const eh = out.eventsHealth;
			out.eventsHealth = {
				total: Math.max(0, Math.round(eh.total * volMul)),
				distinctUsers: Math.max(0, Math.round(eh.distinctUsers * Math.min(1.4, volMul))),
				lastEventMs: eh.lastEventMs,
				byType: {
					view: Math.max(0, Math.round(eh.byType.view * volMul)),
					start: Math.max(0, Math.round(eh.byType.start * volMul)),
					complete: Math.max(0, Math.round(eh.byType.complete * volMul))
				}
			};
		}

		return out;
	}

	const ALLOWED_PERIODS = [1, 7, 14, 30];

	/** Учебная эффективность (мок). В проде: когорты по попыткам, qid→тема, события банка ошибок. */
	const LEARNING_BASE = {
		kpis: [
			{
				id: 'repeat_lift',
				label: 'Прирост после повторов',
				value: '+8,4 п.п.',
				delta: 'к 1-й сессии',
				trend: 'up',
				hint: 'Средний прирост % верных: 2–4-я сессия vs первая (темы с ≥3 завершёнными сессиями)'
			},
			{
				id: 'quality_hold',
				label: 'Удержание качества',
				value: '71%',
				delta: 'через 7 дн.',
				trend: 'flat',
				hint: 'Доля тем, где результат не просел >5 п.п. спустя неделю после тренировки'
			},
			{
				id: 'users_growing',
				label: 'Учеников с заметным ростом',
				value: '54%',
				delta: '+2 п.п.',
				trend: 'up',
				hint: 'Доля пользователей с ростом ≥5 п.п. хотя бы по одной теме'
			},
			{
				id: 'stuck_topics',
				label: '«Застрявших» тем на активного',
				value: '1,8',
				delta: 'в среднем',
				trend: 'flat',
				hint: 'Темы без роста при ≥4 сессиях по теме (только активные пользователи)'
			}
		],
		fastestTopics: [
			{ topic: 'Валентность и степени окисления', growthPct: 14.2, sessions: 428, minN: 96 },
			{ topic: 'Строение электронных оболочек', growthPct: 12.1, sessions: 512, minN: 112 },
			{ topic: 'Химическая связь', growthPct: 10.6, sessions: 390, minN: 88 },
			{ topic: 'Периодический закон и ПСХЭ', growthPct: 9.8, sessions: 605, minN: 140 }
		],
		stagnantTopics: [
			{ topic: 'Растворы. Электролитическая диссоциация', avgPct: 52, deltaPct: -1.2, sessions: 318 },
			{ topic: 'Классы неорганических соединений', avgPct: 48, deltaPct: 0.4, sessions: 276 },
			{ topic: 'Качественные реакции на органику', avgPct: 41, deltaPct: -0.8, sessions: 184 },
			{ topic: 'Расчёты по уравнениям реакций', avgPct: 55, deltaPct: 0.1, sessions: 241 }
		],
		mistakeFix: {
			medianAttempts: 2,
			p75Attempts: 4,
			unresolvedPct: 17,
			hint: 'До первого верного ответа после попадания в «работу над ошибками». Не исправили — без верного ответа за период.'
		}
	};

	function getLearningEffectiveness(days) {
		let d = Number(days);
		if (!ALLOWED_PERIODS.includes(d)) d = 7;
		const volMul = d / 7;

		const kpis = clone(LEARNING_BASE.kpis).map((k) => ({ ...k }));
		if (d === 1) {
			kpis.forEach((k) => {
				k.value = '—';
				k.delta = 'н/д';
				k.trend = 'flat';
				k.hint = 'Нужен период от 7 дней, чтобы сравнивать сессии и динамику.';
			});
		} else if (d === 14) {
			kpis[0].value = '+9,1 п.п.';
			kpis[1].value = '73%';
			kpis[2].value = '56%';
			kpis[3].value = '1,6';
		} else if (d === 30) {
			kpis[0].value = '+10,2 п.п.';
			kpis[1].value = '69%';
			kpis[2].value = '59%';
			kpis[3].value = '1,5';
		}

		const fastestTopics = clone(LEARNING_BASE.fastestTopics).map((row) => ({
			...row,
			sessions: Math.max(8, Math.round(row.sessions * volMul)),
			minN: Math.max(24, Math.round(row.minN * Math.min(1.2, volMul))),
			growthPct: Math.round((row.growthPct + (d >= 30 ? 1.2 : d >= 14 ? 0.6 : 0)) * 10) / 10
		}));

		const stagnantTopics = clone(LEARNING_BASE.stagnantTopics).map((row) => ({
			...row,
			sessions: Math.max(6, Math.round(row.sessions * volMul)),
			avgPct: Math.max(35, Math.min(72, row.avgPct + (d === 1 ? 0 : d >= 30 ? -1 : 0))),
			deltaPct: Math.round((row.deltaPct + (d >= 14 ? 0.3 : 0)) * 10) / 10
		}));

		const m = clone(LEARNING_BASE.mistakeFix);
		if (d === 1) {
			m.medianAttempts = 2;
			m.p75Attempts = 4;
			m.unresolvedPct = 22;
		} else if (d === 7) {
			m.medianAttempts = 2;
			m.p75Attempts = 4;
			m.unresolvedPct = 17;
		} else if (d === 14) {
			m.medianAttempts = 2;
			m.p75Attempts = 5;
			m.unresolvedPct = 16;
		} else {
			m.medianAttempts = 3;
			m.p75Attempts = 5;
			m.unresolvedPct = 14;
		}

		const periodLabel =
			d === 1 ? 'сегодня' : d === 7 ? '7 дней' : d === 14 ? '14 дней' : '30 дней';

		return {
			days: d,
			periodLabel,
			kpis,
			fastestTopics,
			stagnantTopics,
			mistakeFix: m
		};
	}

	window.ADMIN_ANALYTICS_MOCK = {
		ALLOWED_PERIODS,
		getDataset(days) {
			let d = Number(days);
			if (!ALLOWED_PERIODS.includes(d)) d = 7;
			return scaleForPeriod(BASE, d);
		},
		getLearningEffectiveness
	};
})();
