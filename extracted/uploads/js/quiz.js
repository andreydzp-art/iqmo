(function () {
	if (document.querySelector('.quiz-hard')) return;
	var container = document.querySelector('.quiz .quiz__container');
	if (!container) return;
	var items = Array.prototype.slice.call(container.querySelectorAll('.quiz__item'));
	if (!items.length) return;

	var idx = items.findIndex(function (i) {
		return i.classList.contains('active');
	});
	if (idx < 0) {
		idx = 0;
		items[0].classList.add('active');
	}

	var counterEl = container.querySelector('.quiz__counter-active');
	var fillEl = container.querySelector('.quiz__progress-fill');
	var pctEl = container.querySelector('.quiz__percentage');
	var total = items.length;
	var prevBtn, nextBtn;

	function show(i) {
		idx = Math.max(0, Math.min(i, total - 1));
		items.forEach(function (el, j) {
			el.classList.toggle('active', j === idx);
		});
		if (counterEl) counterEl.textContent = String(idx + 1);
		if (fillEl) fillEl.style.width = Math.round(((idx + 1) / total) * 100) + '%';
		if (pctEl) pctEl.textContent = Math.round(((idx + 1) / total) * 100) + '%';
		if (prevBtn) prevBtn.disabled = idx === 0;
		if (nextBtn) nextBtn.disabled = idx >= total - 1;
	}

	var nav = container.querySelector('.quiz-nav-fallback');
	if (!nav) {
		nav = document.createElement('div');
		nav.className = 'quiz-nav-fallback';
		nav.innerHTML =
			'<button type="button" class="quiz-nav-fallback__ghost" data-dir="-1">← Назад</button><button type="button" data-dir="1">Далее →</button>';
		container.appendChild(nav);
	}
	prevBtn = nav.querySelector('[data-dir="-1"]');
	nextBtn = nav.querySelector('[data-dir="1"]');
	nav.addEventListener('click', function (e) {
		var btn = e.target.closest('button[data-dir]');
		if (!btn) return;
		show(idx + parseInt(btn.getAttribute('data-dir'), 10));
	});

	show(idx);
})();
