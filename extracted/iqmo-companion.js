/* iqmo-companion.js — «Спутник», мини-помощник на всех страницах.
   Подключается через <script src="/iqmo-companion.js"></script> после iqmo-nav.js.
   Определяет контекст страницы по URL и показывает уместные реплики.
   На full-test-* страницах НЕ подключается — там свой встроенный companion. */
(function () {
	'use strict';

	if (document.getElementById('iqmo-companion-css')) return;
	if (document.getElementById('gm-companion')) return;

	var s = document.createElement('style');
	s.id = 'iqmo-companion-css';
	s.textContent =
		'.iqmo-companion{position:fixed;right:20px;bottom:20px;display:flex;align-items:flex-end;gap:10px;z-index:9999;max-width:min(360px,calc(100% - 40px));pointer-events:none}' +
		'.iqmo-companion__bubble{background:#fff;border:1.5px solid var(--line,#e2e5ed);border-radius:16px 16px 16px 4px;padding:10px 14px;box-shadow:0 8px 24px -8px rgba(15,18,38,.18);font-size:13px;line-height:1.45;color:var(--ink-2,#3a3f4b);font-weight:500;max-width:280px;transform:translateX(20px);opacity:0;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .35s;pointer-events:auto;position:relative}' +
		'.iqmo-companion__bubble.is--shown{transform:translateX(0);opacity:1}' +
		'.iqmo-companion__bubble b{color:var(--primary,#4f46e5)}' +
		'.iqmo-companion__avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--primary,#4f46e5),#7c3aed);display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff;box-shadow:0 8px 18px -6px rgba(79,70,229,.45);flex-shrink:0;cursor:pointer;pointer-events:auto;transition:transform .15s}' +
		'.iqmo-companion__avatar:hover{transform:scale(1.06)}' +
		'.iqmo-companion__close{position:absolute;top:4px;right:6px;background:none;border:0;padding:2px 6px;font-size:14px;color:var(--muted,#8b8fa7);cursor:pointer;line-height:1}' +
		'.iqmo-companion__close:hover{color:var(--ink,#1a1d27)}' +
		'@media(max-width:720px){.iqmo-companion{right:12px;bottom:12px}.iqmo-companion__avatar{width:46px;height:46px;font-size:22px}}';
	document.head.appendChild(s);

	var _shown = {};
	var _hideTimer = null;
	var _dismissed = false;
	var _lines = {};
	var _lastLine = null;

	function ensureDOM() {
		if (document.getElementById('iqmo-companion')) return;
		var wrap = document.createElement('div');
		wrap.className = 'iqmo-companion';
		wrap.id = 'iqmo-companion';
		wrap.innerHTML =
			'<div class="iqmo-companion__bubble" id="iqmo-companion-bubble">' +
				'<button type="button" class="iqmo-companion__close" aria-label="\u0421\u043a\u0440\u044b\u0442\u044c">\u00d7</button>' +
				'<div id="iqmo-companion-text"></div>' +
			'</div>' +
			'<div class="iqmo-companion__avatar" id="iqmo-companion-avatar" title="\u0421\u043f\u0443\u0442\u043d\u0438\u043a">\ud83e\uddd1\u200d\ud83d\ude80</div>';
		document.body.appendChild(wrap);
		wrap.querySelector('.iqmo-companion__close').addEventListener('click', function () { hide(true); });
		wrap.querySelector('#iqmo-companion-avatar').addEventListener('click', function () {
			if (_dismissed) { _dismissed = false; }
			var b = document.getElementById('iqmo-companion-bubble');
			if (b && b.classList.contains('is--shown')) { hide(false); }
			else { say(null, { force: true, sticky: true }); }
		});
	}

	function say(key, opts) {
		if (_dismissed) return;
		opts = opts || {};
		if (key && !opts.force && _shown[key]) return;
		if (key) _shown[key] = true;
		ensureDOM();
		var line = key ? (_lines[key] || null) : _lastLine;
		if (!line) return;
		_lastLine = line;
		var bubble = document.getElementById('iqmo-companion-bubble');
		var text = document.getElementById('iqmo-companion-text');
		var avatar = document.getElementById('iqmo-companion-avatar');
		if (avatar) avatar.textContent = line.e;
		if (text) text.innerHTML = line.t;
		if (bubble) {
			bubble.classList.add('is--shown');
			if (!opts.sticky) {
				clearTimeout(_hideTimer);
				_hideTimer = setTimeout(function () { hide(false); }, 5500);
			}
		}
	}

	function hide(permanent) {
		var wrap = document.getElementById('iqmo-companion');
		if (!wrap) return;
		if (permanent) { _dismissed = true; wrap.remove(); return; }
		var b = document.getElementById('iqmo-companion-bubble');
		if (b) b.classList.remove('is--shown');
	}

	var path = location.pathname.replace(/\/+$/, '') || '/';
	var ctx = 'unknown';

	if (/\/subject-biology/.test(path))                ctx = 'subject-bio';
	else if (/\/subject-chemistry/.test(path))         ctx = 'subject-chem';
	else if (/\/profile/.test(path))                   ctx = 'profile';
	else if (/\/full-test-biology\/chapter-2/.test(path))   ctx = 'ch2-bio';
	else if (/\/full-test-chemistry\/chapter-2/.test(path)) ctx = 'ch2-chem';
	else if (/warmup-chemistry/.test(path))            ctx = 'warmup-chem';
	else if (/\/topic-/.test(path))                    ctx = 'topic';
	else if (path === '/' || path === '' || /\/index\.html$/.test(path) && !/\//.test(path.replace(/^\//, '').replace(/\/index\.html$/, '')))
		ctx = 'home';

	var ALL = {
		'subject-bio': {
			welcome: { e: '🧑‍🚀', t: 'Привет! Это твой дашборд по биологии. Нажми на вариант, чтобы начать тренировку.' },
			tip:     { e: '💡', t: 'Решай варианты по порядку — каждый следующий чуть сложнее.' }
		},
		'subject-chem': {
			welcome: { e: '🧑‍🚀', t: 'Привет! Вот твой дашборд по химии. Выбирай тему или вариант и вперёд!' },
			tip:     { e: '🔬', t: 'Не забывай про раздел «Мои ошибки» — там собраны задания, которые стоит повторить.' }
		},
		'profile': {
			welcome: { e: '🧑‍🚀', t: 'Это твой профиль. Здесь видны награды, уровень и статистика.' },
			tip:     { e: '🏆', t: 'Решай варианты, чтобы открывать новые награды и подниматься в рейтинге.' }
		},
		'ch2-bio': {
			welcome: { e: '🧑‍🚀', t: 'Глава 2 — задания с развёрнутым ответом. Тут оценивают логику и полноту ответа.' },
			tip:     { e: '✍️', t: 'Пиши чётко и по пунктам — эксперт проверяет каждый пункт отдельно.' }
		},
		'ch2-chem': {
			welcome: { e: '🧑‍🚀', t: 'Глава 2 по химии — задания с развёрнутым ответом. Не забывай уравнивать реакции!' },
			tip:     { e: '⚖️', t: 'Проверяй коэффициенты и заряды ионов перед отправкой.' }
		},
		'warmup-chem': {
			welcome: { e: '🧑‍🚀', t: 'Разминка! Короткие тематические блоки — идеально для повторения.' },
			tip:     { e: '💪', t: 'После разминки попробуй полный вариант — там больше XP!' }
		},
		'topic': {
			welcome: { e: '🧑‍🚀', t: 'Тематический тренажёр — отличный способ подтянуть слабые места.' },
			tip:     { e: '🎯', t: 'Решай по теме до тех пор, пока не перестанешь ошибаться.' }
		},
		'home': {
			welcome: { e: '🧑‍🚀', t: 'Добро пожаловать в <b>IQMO</b>! Выбери предмет и начни готовиться к ОГЭ.' }
		}
	};

	_lines = ALL[ctx] || {};
	if (!_lines.welcome) return;

	function boot() {
		say('welcome', { sticky: true, force: true });
		if (_lines.tip) {
			setTimeout(function () { say('tip'); }, 12000);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot);
	} else {
		setTimeout(boot, 300);
	}

	window.iqmoCompanion = { say: say, hide: hide, ensureDOM: ensureDOM };
})();
