/**
 * Рендер карточки вопроса в разметке прототипа (Прохождение теста.html).
 */
(function (global) {
	'use strict';

	function isActive() {
		return document.documentElement.classList.contains('is--runner-v4');
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function padNo(n) {
		return n < 10 ? '0' + n : String(n);
	}

	function optionsHtml(q, pickedSet) {
		var isMulti = q.type === 'multi';
		var letters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
		var html = '<div class="options" data-role="options" data-multi="' + (isMulti ? '1' : '0') + '">';
		(q.options || []).forEach(function (o, i) {
			var sel = pickedSet.has(o.id);
			html +=
				'<button type="button" class="opt' +
				(isMulti ? ' is-multi' : '') +
				(sel ? ' is-selected' : '') +
				'" data-opt="' +
				esc(o.id) +
				'" data-id="' +
				esc(o.id) +
				'">' +
				'<span class="opt-letter">' +
				esc(letters[i] || o.id) +
				'</span>' +
				'<span class="opt-text">' +
				o.label +
				'</span>' +
				'<span class="opt-check" aria-hidden="true"></span>' +
				'</button>';
		});
		return html + '</div>';
	}

	function questionCardHtml(params) {
		var q = params.q;
		var cur = params.current;
		var total = params.total;
		var flagged = params.flagged;
		var kindLabel = params.kindLabel;
		var inputHtml = params.inputHtml;
		var bodyHtml = params.bodyHtml;
		var isLast = cur >= total - 1;

		return (
			'<div class="qhead">' +
			'<div class="qmeta">' +
			'<span class="qmeta-tag"><span class="dot"></span>Задание ' +
			(cur + 1) +
			' / ' +
			total +
			'</span>' +
			'<span class="qmeta-tag kind">' +
			esc(kindLabel) +
			'</span>' +
			'</div>' +
			'<button type="button" class="postpone-btn' +
			(flagged ? ' is-on' : '') +
			'" id="btn-flag">' +
			'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' +
			(flagged ? 'Снять отметку' : 'Отложить задание') +
			'</button>' +
			'</div>' +
			'<h1 class="qtitle">' +
			esc(q.title) +
			'</h1>' +
			'<div class="qbody">' +
			bodyHtml +
			'</div>' +
			inputHtml +
			'<div class="qfoot">' +
			(cur > 0
				? '<button type="button" class="qbtn ghost" id="btn-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Назад</button>'
				: '<span></span>') +
			'<button type="button" class="qbtn primary" id="btn-next">' +
			(isLast ? 'К завершению' : 'Следующее') +
			'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>' +
			'</div>'
		);
	}

	global.IqmoTestRunnerRender = {
		isActive: isActive,
		padNo: padNo,
		optionsHtml: optionsHtml,
		questionCardHtml: questionCardHtml
	};
})(typeof window !== 'undefined' ? window : global);
