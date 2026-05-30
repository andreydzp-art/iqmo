/**
 * IQMO · OrbitDots — точки, вращающиеся вокруг центра орба.
 *
 * Семантика по умолчанию (актуальная): 1 точка = 1 день серии (streak).
 * Раньше точки считались по дням на платформе (daysSince(memberSince)),
 * но это путало пользователей: при streak=4 точек было ~27, и они резонно
 * спрашивали, «почему не 4». Сейчас вызывающая сторона (profile-render.js)
 * передаёт сюда уже готовое число (streakDays), а компонент остаётся
 * нейтральным к источнику.
 *
 * Используется на:
 *   - странице Profile (большой dark streak-orb 96px)
 *   - compact hero на Full Test страницах (мини-орб ~56px) — legacy.
 *     Сейчас Full Test тоже рендерит профильный hero, так что вызовы
 *     daysSince()/tooltipText() из этих страниц — dead code.
 *
 * API:
 *   IqmoOrbitDots.build(daysCount, { maxDots = 30 })
 *     → HTML-строка с N элементами <i style="--angle:Xdeg" data-i="i"></i>.
 *       Каждая <i> — точка, позиционируется через
 *       transform:rotate(var(--angle)) translateX(var(--orbit-r)).
 *       Контейнер вращается через CSS-анимацию.
 *
 *   IqmoOrbitDots.tierFor(daysCount, { maxDots = 30 })
 *     → 'big' | 'mid' | 'small' — поставь как data-orbit-tier на контейнер,
 *       чтобы CSS подобрал размер точек и свечение (1–7 → big,
 *       8–15 → mid, 16+ → small).
 *
 *   IqmoOrbitDots.tooltipText(daysCount, { maxDots = 30 })
 *     → legacy-tooltip про дни на платформе. В Profile-hero не зовётся —
 *       там tooltip формирует profile-render.js (streakTooltip), потому что
 *       текст должен говорить про серию, а не про дни в IQMO.
 *       При daysCount > maxDots возвращает «30+ дней».
 *
 *   IqmoOrbitDots.daysSince(memberSinceMs)
 *     → утилита: число дней с момента регистрации (legacy для full-test
 *       compact hero, не используется на Profile).
 *
 * Скорость вращения и стили орб-track задаются CSS на стороне страницы.
 */
(function (global) {
	'use strict';

	function pluralRu(n, forms) {
		var a = Math.abs(n) % 100;
		var b = a % 10;
		if (a > 10 && a < 20) return forms[2];
		if (b > 1 && b < 5) return forms[1];
		if (b === 1) return forms[0];
		return forms[2];
	}

	function clampDays(daysCount, opts) {
		var max = (opts && Number.isFinite(opts.maxDots)) ? opts.maxDots : 30;
		var n = Math.max(0, Math.round(Number(daysCount) || 0));
		return { capped: Math.min(max, n), raw: n, max: max };
	}

	function tier(n) {
		if (n <= 7) return 'big';
		if (n <= 15) return 'mid';
		return 'small';
	}

	function build(daysCount, opts) {
		var d = clampDays(daysCount, opts);
		var n = d.capped;
		if (n === 0) return '';
		var html = '';
		// Гарантированно-разные периоды для соседей. Раньше было
		//   dur = 22 + (i % 5) * 2.5  (диапазон 22..32s, шаг 2.5s)
		// — при streak=4 разница между самой быстрой и медленной
		// точкой всего ~7.5s за полный оборот, глазу казалось, что
		// точки крутятся «в строю». Сейчас:
		//   - спрэд 14..38s (≈2.7× разница, очень заметно за минуту);
		//   - порядок чередуется через простой шаффл по индексу,
		//     соседи никогда не дают близкие значения;
		//   - значения из фикс-таблицы → детерминированно при
		//     перерисовке, точки не «прыгают» при iqmo-sync.
		var DUR_TABLE = [14, 28, 18, 36, 22, 32, 16, 26, 20, 38];
		for (var i = 0; i < n; i++) {
			var angle = (i * 360 / n).toFixed(2);
			//   --dur  : длительность полного оборота (см. таблицу).
			//   --hue  : тон точки. Палитра 130..290 (мята → фиолет),
			//            раскидываем псевдо-случайно по золотому шагу 47.
			//   --pdel : сдвиг pulse-анимации, чтобы точки мерцали не
			//            в унисон.
			// Направление вращения общее для всех — по часовой стрелке
			// (см. CSS: --dir по умолчанию = 1). Раньше тут был alternating
			// (±1 по чётности), но это сбивало восприятие — пользователь
			// просил «исключительно по часовой».
			var dur = DUR_TABLE[i % DUR_TABLE.length];
			var hue = 130 + ((i * 47) % 160);
			var pdel = ((i * 0.37) % 2.4).toFixed(2);
			html += '<i style="' +
				'--angle:' + angle + 'deg;' +
				'--dur:' + dur + 's;' +
				'--hue:' + hue + ';' +
				'--pdel:-' + pdel + 's' +
				'" data-i="' + i + '"></i>';
		}
		return html;
	}

	function tierFor(daysCount, opts) {
		return tier(clampDays(daysCount, opts).capped);
	}

	function tooltipText(daysCount, opts) {
		var d = clampDays(daysCount, opts);
		var label = d.raw > d.max
			? d.max + '+ дней'
			: d.raw + ' ' + pluralRu(d.raw, ['день', 'дня', 'дней']);
		return 'Вы уже ' + label + ' в IQMO. Чем дольше учитесь, тем сильнее ваша серия.';
	}

	/**
	 * Считаем дни на платформе из created_at (мс из БД-конвенции IQMO).
	 * Если ts невалидный — вернём 0 (не показываем точки).
	 * Если ts валидный — минимум 1 день («ученик зарегистрировался сегодня —
	 * это уже его первый день в IQMO»), это совпадает с daysInIqmoShort
	 * в profile-render.js. Дальше — floor по суткам.
	 */
	function daysSince(memberSinceMs) {
		var ts = Number(memberSinceMs);
		if (!ts || !Number.isFinite(ts)) return 0;
		var d = Math.floor((Date.now() - ts) / 86400000);
		return Math.max(1, d);
	}

	global.IqmoOrbitDots = {
		build: build,
		tierFor: tierFor,
		tooltipText: tooltipText,
		daysSince: daysSince,
	};
})(typeof window !== 'undefined' ? window : globalThis);
