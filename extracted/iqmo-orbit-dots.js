/**
 * IQMO · OrbitDots — точки, вращающиеся вокруг центра орба.
 * Количество точек = количеству дней пользователя на платформе
 * (даёт визуальное ощущение «персонаж развивается со временем»).
 *
 * Используется на:
 *   - странице Profile (большой dark streak-orb 96px)
 *   - compact hero на Full Test страницах (мини-орб ~56px)
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
 *     → строка для подсказки на hover («Вы уже N дней в IQMO…»).
 *       При daysCount > maxDots возвращает «30+ дней».
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
		for (var i = 0; i < n; i++) {
			var angle = (i * 360 / n).toFixed(2);
			html += '<i style="--angle:' + angle + 'deg" data-i="' + i + '"></i>';
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
