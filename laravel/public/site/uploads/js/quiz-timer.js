(function () {
	var el = document.getElementById('quiz-timer');
	if (!el) return;
	var min = parseInt(el.getAttribute('data-timer'), 10);
	if (!min || min < 1) min = 20;
	var left = min * 60;
	var display = el.querySelector('.quiz-timer__display');
	var textNum = el.querySelector('.quiz-timer__inner-text');
	var progress = el.querySelector('.quiz-timer__progress');
	var r = 25;
	var circumference = 2 * Math.PI * r;

	function tick() {
		var m = Math.floor(left / 60);
		var s = left % 60;
		if (display) {
			display.innerHTML =
				String(m).padStart(2, '0') +
				':' +
				String(s).padStart(2, '0') +
				' <span>мин.</span>';
		}
		if (textNum) textNum.textContent = String(Math.max(0, Math.ceil(left / 60)));
		if (progress) {
			var totalSec = min * 60;
			var pct = totalSec > 0 ? left / totalSec : 0;
			progress.style.strokeDashoffset = String(circumference * (1 - pct));
		}
		if (left > 0) left--;
	}
	tick();
	setInterval(tick, 1000);
})();
