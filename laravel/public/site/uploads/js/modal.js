(function () {
	function openModal(id) {
		var m = id && document.getElementById(id);
		if (m) m.classList.add('is-open');
	}
	function closeModal(modal) {
		if (modal) modal.classList.remove('is-open');
	}
	document.addEventListener('click', function (e) {
		var btn = e.target.closest('.open-modal');
		if (btn && btn.dataset.modal) {
			e.preventDefault();
			openModal(btn.dataset.modal);
			return;
		}
		var close = e.target.closest('.modal__close');
		if (close) {
			closeModal(close.closest('.modal'));
			return;
		}
		if (e.target.classList.contains('modal__overlay')) {
			closeModal(e.target.closest('.modal'));
		}
	});
})();
