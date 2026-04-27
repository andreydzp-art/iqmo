/**
 * IQMO Registration Nudge — карточка-предложение зарегистрироваться.
 *
 * Подключение: <script defer src="./iqmo-regnudge.js?v=3"></script>
 * перед </body>. На странице ничего больше не нужно: скрипт сам
 * инжектит и стиль, и markup.
 *
 * Поведение:
 *   - Запускает 30-секундный таймер только после того, как
 *     `window.__iqmoAuthReady` подтвердил, что пользователь — гость
 *     (см. iqmo-nav.js). Авторизованным попап не показываем вообще.
 *   - Модалка по центру экрана, полупрозрачный фон на весь вьюпорт.
 *   - После «Позже» / × — не показываем ещё 24 часа (localStorage).
 *   - Шлёт цели в Я.Метрику: regnudge_show / regnudge_click /
 *     regnudge_dismiss. Если целей в кабинете ещё нет — события всё
 *     равно собираются, но «Цели» в отчёте появятся только после
 *     создания JS-целей с теми же именами.
 *   - debug: ?regnudge=show в URL форсит немедленный показ
 *     без задержки и без проверки SUPPRESS — для ручной проверки.
 */
(function () {
	'use strict';

	var DELAY_MS = 30000;
	var SUPPRESS_HOURS = 24;
	var LS_KEY = 'iqmo-regnudge-dismissed-at';
	var YM_COUNTER = 108770166;
	var BODY_NO_SCROLL = 'regnudge-noscroll';

	if (document.getElementById('regnudge')) return;

	var url = (typeof window.location === 'object') ? String(window.location.search || '') : '';
	var debugForce = url.indexOf('regnudge=show') !== -1;

	function injectStyle() {
		if (document.getElementById('regnudge-style')) return;
		var css = ''
			+ 'body.' + BODY_NO_SCROLL + '{overflow:hidden;}'
			+ '.regnudge-wrap{position:fixed;inset:0;z-index:9999;box-sizing:border-box;'
			+ 'display:flex;align-items:center;justify-content:center;'
			+ 'padding:max(12px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right))'
			+ ' max(12px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));'
			+ 'opacity:0;visibility:hidden;pointer-events:none;'
			+ 'transition:opacity .32s ease,visibility .32s;}'
			+ '.regnudge-wrap.is--visible{opacity:1;visibility:visible;pointer-events:auto;}'
			+ '.regnudge__backdrop{position:absolute;inset:0;background:rgba(17,20,26,.5);z-index:0;}'
			+ '.regnudge{position:relative;z-index:1;'
			+ 'width:100%;max-width:400px;'
			+ 'background:#fff;border:1px solid var(--line,#e5e7eb);border-radius:16px;'
			+ 'box-shadow:0 24px 64px -16px rgba(17,20,26,.25),0 8px 24px -8px rgba(17,20,26,.12);'
			+ 'padding:20px 22px 18px;'
			+ 'transform:scale(.96) translateY(10px);opacity:0;'
			+ 'transition:transform .42s cubic-bezier(.2,.8,.2,1),opacity .35s ease;'
			+ 'font-family:inherit;max-height:min(90vh,720px);overflow-y:auto;'
			+ '-webkit-overflow-scrolling:touch;}'
			+ '.regnudge-wrap.is--visible .regnudge{transform:scale(1) translateY(0);opacity:1;}'
			+ '.regnudge__close{position:absolute;top:10px;right:10px;width:28px;height:28px;border-radius:8px;'
			+ 'background:none;border:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;'
			+ 'color:var(--muted,#7a8696);transition:background .15s,color .15s;z-index:2}'
			+ '.regnudge__close:hover{background:#f3f5f8;color:var(--ink,#11141a)}'
			+ '.regnudge__close svg{width:16px;height:16px}'
			+ '.regnudge__head{display:flex;align-items:center;gap:12px;margin-bottom:12px;padding-right:28px}'
			+ '.regnudge__icon{width:40px;height:40px;border-radius:10px;'
			+ 'background:linear-gradient(135deg,#e8f4ee 0%,#d6efe1 100%);'
			+ 'display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;font-size:22px}'
			+ '.regnudge__title{font-size:15px;font-weight:800;color:var(--ink,#11141a);line-height:1.25;margin:0}'
			+ '.regnudge__body{font-size:13.5px;line-height:1.5;color:var(--ink-2,#3c4858);margin:0 0 16px}'
			+ '.regnudge__perks{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}'
			+ '.regnudge__perk{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2,#3c4858)}'
			+ '.regnudge__perk svg{width:14px;height:14px;color:var(--green,#3ec37a);flex:0 0 auto}'
			+ '.regnudge__cta-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}'
			+ '.regnudge__cta{flex:1;min-width:0;display:inline-flex;align-items:center;justify-content:center;gap:6px;'
			+ 'background:var(--green,#3ec37a);color:#fff;padding:11px 16px;border-radius:10px;'
			+ 'font-weight:700;font-size:14px;text-decoration:none;'
			+ 'box-shadow:0 4px 12px -4px rgba(62,195,122,.45);transition:transform .15s,box-shadow .15s;'
			+ 'white-space:nowrap;}'
			+ '.regnudge__cta:hover{transform:translateY(-1px);box-shadow:0 8px 20px -4px rgba(62,195,122,.55)}'
			+ '.regnudge__later{background:none;border:0;cursor:pointer;font-size:13px;font-weight:600;'
			+ 'color:var(--muted,#7a8696);padding:10px 8px;transition:color .15s;}'
			+ '.regnudge__later:hover{color:var(--ink,#11141a)}'
			+ '@media (max-width:480px){.regnudge-wrap{padding:12px;}'
			+ '.regnudge{max-width:none;padding:16px 18px 14px;}'
			+ '.regnudge__cta{flex:1 1 100%;}}';
		var style = document.createElement('style');
		style.id = 'regnudge-style';
		style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	}

	function buildElement() {
		var wrap = document.createElement('div');
		wrap.className = 'regnudge-wrap iqmo-only-guest';
		wrap.id = 'regnudge';
		wrap.hidden = true;
		wrap.setAttribute('role', 'dialog');
		wrap.setAttribute('aria-modal', 'true');
		wrap.setAttribute('aria-labelledby', 'regnudge-title');
		wrap.setAttribute('aria-describedby', 'regnudge-body');
		wrap.innerHTML = ''
			+ '<div class="regnudge__backdrop" aria-hidden="true"></div>'
			+ '<aside class="regnudge" role="document">'
			+ '<button type="button" class="regnudge__close" id="regnudge-close" aria-label="Закрыть">'
			+ '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">'
			+ '<path d="M6 6l12 12M18 6L6 18"/></svg></button>'
			+ '<div class="regnudge__head">'
			+ '<span class="regnudge__icon" aria-hidden="true">🎯</span>'
			+ '<h3 class="regnudge__title" id="regnudge-title">Сохрани свой прогресс</h3>'
			+ '</div>'
			+ '<p class="regnudge__body" id="regnudge-body">'
			+ 'Зарегистрируйся за 30 секунд — и твои тесты, темы и серия дней останутся '
			+ 'с тобой даже на другом устройстве.</p>'
			+ '<div class="regnudge__perks">'
			+ '<div class="regnudge__perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
			+ 'stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
			+ '<polyline points="5 12 10 17 19 7"/></svg>Бесплатно, без карты</div>'
			+ '<div class="regnudge__perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
			+ 'stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
			+ '<polyline points="5 12 10 17 19 7"/></svg>Прогресс синхронизируется между устройствами</div>'
			+ '<div class="regnudge__perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
			+ 'stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'
			+ '<polyline points="5 12 10 17 19 7"/></svg>Рейтинг друзей и серия дней</div>'
			+ '</div>'
			+ '<div class="regnudge__cta-row">'
			+ '<a href="/login.html?next=/profile.html&register=1" class="regnudge__cta" id="regnudge-go">'
			+ 'Зарегистрироваться →</a>'
			+ '<button type="button" class="regnudge__later" id="regnudge-later">Позже</button>'
			+ '</div>'
			+ '</aside>';
		document.body.appendChild(wrap);
		return wrap;
	}

	function reachGoal(name) {
		try {
			if (typeof window.ym === 'function') window.ym(YM_COUNTER, 'reachGoal', name);
		} catch (e) { /* noop */ }
	}

	function shouldShow() {
		if (debugForce) return true;
		try {
			var raw = localStorage.getItem(LS_KEY);
			if (!raw) return true;
			var dismissedAt = parseInt(raw, 10);
			if (!dismissedAt) return true;
			return (Date.now() - dismissedAt) >= SUPPRESS_HOURS * 3600 * 1000;
		} catch (e) { return true; }
	}

	function rememberDismiss() {
		try { localStorage.setItem(LS_KEY, String(Date.now())); } catch (e) { /* noop */ }
	}

	function setBodyLock(on) {
		try {
			if (on) document.body.classList.add(BODY_NO_SCROLL);
			else document.body.classList.remove(BODY_NO_SCROLL);
		} catch (e) { /* noop */ }
	}

	function init() {
		injectStyle();
		var el = buildElement();
		var btnClose = el.querySelector('#regnudge-close');
		var btnLater = el.querySelector('#regnudge-later');
		var btnGo = el.querySelector('#regnudge-go');
		var backdrop = el.querySelector('.regnudge__backdrop');

		var shownAlready = false;
		var timerId = null;

		function dismiss() {
			rememberDismiss();
			el.classList.remove('is--visible');
			setTimeout(function () {
				el.hidden = true;
				setBodyLock(false);
			}, 500);
			reachGoal('regnudge_dismiss');
		}
		function show() {
			if (shownAlready || !shouldShow()) return;
			shownAlready = true;
			el.hidden = false;
			setBodyLock(true);
			requestAnimationFrame(function () {
				requestAnimationFrame(function () { el.classList.add('is--visible'); });
			});
			reachGoal('regnudge_show');
		}
		function abort() {
			if (timerId !== null) {
				clearTimeout(timerId);
				timerId = null;
			}
			if (!shownAlready && el.parentNode) {
				setBodyLock(false);
				el.parentNode.removeChild(el);
			}
		}

		if (btnClose) btnClose.addEventListener('click', dismiss);
		if (btnLater) btnLater.addEventListener('click', dismiss);
		if (backdrop) backdrop.addEventListener('click', dismiss);
		if (btnGo) btnGo.addEventListener('click', function () {
			rememberDismiss();
			setBodyLock(false);
			reachGoal('regnudge_click');
		});

		if (debugForce) {
			show();
			return;
		}

		var authReady = (typeof window.__iqmoAuthReady !== 'undefined')
			? window.__iqmoAuthReady
			: Promise.resolve(false);
		Promise.resolve(authReady).then(function (loggedIn) {
			if (loggedIn) { abort(); return; }
			if (!shouldShow()) { abort(); return; }
			timerId = setTimeout(show, DELAY_MS);
		}).catch(function () {
			if (!shouldShow()) return;
			timerId = setTimeout(show, DELAY_MS);
		});

		window.addEventListener('iqmo-sync-ready', function () {
			try {
				var syncAuthed = !!(window.IqmoSync
					&& typeof window.IqmoSync.isAuthed === 'function'
					&& window.IqmoSync.isAuthed());
				if (syncAuthed) abort();
			} catch (e) { /* noop */ }
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
