/**
 * Блок «Обсуждение главы» — social-layer для hub-страниц.
 */
(function (global) {
	'use strict';

	var AV = '/assets/avatars/';
	var AVATAR_FILES = [
		'iq-1842.png', 'iq-5521.png', 'iq-1024.png', 'iq-1337.png',
		'iq-4408.png', 'iq-2210.png', 'iq-9973.png'
	];
	var STORAGE_KEY = 'iqmo-chapter-comments-v1';
	var DRAFT_KEY = 'iqmo-chapter-compose-draft-v1';
	var MIN_LEN = 2;
	var MAX_LEN = 280;

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function subjectFromPath() {
		return /chemistry/i.test(location.pathname) ? 'chemistry' : 'biology';
	}

	function chapterFromPath() {
		return /\/chapter-2\//i.test(location.pathname) ? '2' : '1';
	}

	function storageSlot(subject, chapter) {
		return subject + ':ch' + chapter;
	}

	function avatarForUid(uid) {
		var i = Math.abs(parseInt(uid, 10) || 0) % AVATAR_FILES.length;
		return AV + AVATAR_FILES[i];
	}

	function profileIdFromUid(uid) {
		return 'IQ-' + String(uid).padStart(4, '0');
	}

	function loadStored(subject, chapter) {
		try {
			var all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
			return Array.isArray(all[storageSlot(subject, chapter)]) ? all[storageSlot(subject, chapter)] : [];
		} catch (e) {
			return [];
		}
	}

	function saveStored(subject, chapter, list) {
		try {
			var all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
			all[storageSlot(subject, chapter)] = list;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
		} catch (e) {}
	}

	function timeLabel(ts) {
		var diff = Date.now() - (ts || Date.now());
		if (diff < 60000) return 'только что';
		var mins = Math.floor(diff / 60000);
		if (mins < 60) return mins + ' мин назад';
		var hrs = Math.floor(mins / 60);
		if (hrs < 24) return hrs + ' ч назад';
		return 'сегодня';
	}

	function html() {
		return ''
			+ '<section class="soc-card" aria-label="Обсуждение главы">'
			+ '<header class="soc-head">'
			+ '<div class="soc-titlewrap">'
			+ '<h2 class="soc-title"><span class="em" aria-hidden="true">💬</span> Обсуждение главы</h2>'
			+ '<span class="soc-count"><span class="soc-livedot" aria-hidden="true"></span> 14 учеников обсуждают</span>'
			+ '</div>'
			+ '<div class="soc-sort" role="tablist" aria-label="Сортировка">'
			+ '<button type="button" class="is-active" data-sort="top">Популярные</button>'
			+ '<button type="button" data-sort="new">Новые</button>'
			+ '</div>'
			+ '</header>'
			+ '<div class="soc-hints">'
			+ '<span class="soc-hint"><span class="em">👀</span><b>14</b> сейчас проходят</span>'
			+ '<span class="soc-hint"><span class="em">🔥</span><b>84%</b> со второго раза</span>'
			+ '<span class="soc-hint"><span class="em">💀</span>чаще ошибаются в&nbsp;<b>варианте&nbsp;6</b></span>'
			+ '</div>'
			+ '<div class="soc-list">'
			+ _item('iq-1842.png', 'IQ-1842', '2 ч назад', 'Босс жёстче чем в прошлой главе 💀', true, [
				['❤️', 12, true], ['💀', 4, false]
			], 2, false)
			+ _item('iq-5521.png', 'IQ-5521', '4 ч назад', '15 задание вообще не понял 😭', true, [
				['🔥', 8, false], ['😭', 3, false]
			], 5, false)
			+ _item('iq-1024.png', 'IQ-1024', '5 ч назад', 'После этой главы химия стала понятнее 🙌', false, [
				['❤️', 5, false], ['🔥', 2, false]
			], 0, false)
			+ _item('iq-1337.png', 'IQ-1337', '7 ч назад', 'вариант 9 с первого раза, я в шоке 🔥', true, [
				['🔥', 9, false], ['❤️', 3, false]
			], 1, false)
			+ _item('iq-4408.png', 'IQ-4408', '12 ч назад', 'кто проходит сейчас? давайте вместе добивать 💪', false, [
				['❤️', 7, false], ['🔥', 4, false]
			], 3, false)
			+ '</div>'
			+ '<div class="soc-foot">'
			+ '<button class="soc-write" type="button">'
			+ '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
			+ 'Поделитесь впечатлением о главе…'
			+ '</button>'
			+ '<div class="soc-compose" hidden>'
			+ '<textarea class="soc-compose-input" rows="2" maxlength="' + MAX_LEN + '" placeholder="Напишите пару слов о прохождении главы…"></textarea>'
			+ '<div class="soc-compose-bar">'
			+ '<button type="button" class="soc-compose-cancel">Отмена</button>'
			+ '<button type="button" class="soc-compose-send">Опубликовать</button>'
			+ '<span class="soc-compose-hint">Видят другие ученики этой главы</span>'
			+ '</div>'
			+ '</div>'
			+ '<p class="soc-login-hint" hidden>Войдите в аккаунт, чтобы оставить комментарий. <a href="/login.html">Войти</a></p>'
			+ '</div>'
			+ '</section>';
	}

	function _item(avatar, name, time, text, online, reacts, replies, extra, opts) {
		opts = opts || {};
		var cls = 'soc-item' + (extra ? ' is-extra' : '') + (opts.user ? ' is-user' : '');
		var avCls = 'soc-avatar' + (online ? ' is-online' : '');
		var avSrc = opts.avatarUrl || (AV + avatar);
		var reactHtml = reacts.map(function (r) {
			var mine = r[2] ? ' is-mine' : '';
			return '<button class="soc-react' + mine + '" type="button"><span class="em">' + r[0] + '</span> ' + r[1] + '</button>';
		}).join('');
		if (!opts.user) reactHtml += '<button class="soc-react soc-react-add" type="button" aria-label="Добавить реакцию">＋</button>';
		var repliesHtml = '';
		if (replies) {
			var word = replies === 1 ? 'ответ' : (replies >= 2 && replies <= 4 ? 'ответа' : 'ответов');
			repliesHtml = '<button class="soc-replies" type="button"><span class="em">💬</span> ' + replies + ' ' + word + '</button>';
		}
		return ''
			+ '<article class="' + cls + '"' + (opts.id ? ' data-soc-id="' + esc(opts.id) + '"' : '') + '>'
			+ '<div class="' + avCls + '" aria-hidden="true"><img src="' + esc(avSrc) + '" alt="" /></div>'
			+ '<div>'
			+ '<div class="soc-meta"><span class="soc-name">' + esc(name) + '</span>'
			+ '<span class="soc-dot" aria-hidden="true"></span>'
			+ '<span class="soc-time">' + esc(time) + '</span></div>'
			+ '<p class="soc-text">' + esc(text) + '</p>'
			+ '<div class="soc-actions">' + reactHtml + repliesHtml + '</div>'
			+ '</div>'
			+ '</article>';
	}

	function userItemHtml(comment) {
		return _item('', profileIdFromUid(comment.uid), timeLabel(comment.ts), comment.text, true, [
			['❤️', 0, false]
		], 0, false, {
			user: true,
			id: comment.id,
			avatarUrl: avatarForUid(comment.uid)
		});
	}

	function bindReactions(root) {
		root.querySelectorAll('.soc-react:not(.soc-react-add)').forEach(function (btn) {
			if (btn.dataset.socBound) return;
			btn.dataset.socBound = '1';
			btn.addEventListener('click', function () {
				var txt = btn.textContent.trim();
				var m = txt.match(/(\d+)/);
				if (!m) return;
				var n = parseInt(m[1], 10);
				var mine = btn.classList.toggle('is-mine');
				n += mine ? 1 : -1;
				btn.innerHTML = btn.innerHTML.replace(/(\d+)\s*$/, String(n));
			});
		});
	}

	function prependUserComments(card, subject, chapter) {
		var list = card.querySelector('.soc-list');
		if (!list) return;
		var stored = loadStored(subject, chapter);
		for (var i = stored.length - 1; i >= 0; i--) {
			var wrap = document.createElement('div');
			wrap.innerHTML = userItemHtml(stored[i]);
			var node = wrap.firstElementChild;
			if (node) list.insertBefore(node, list.firstChild);
		}
	}

	function saveDraft(subject, chapter, text) {
		try {
			sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
				subject: subject,
				chapter: chapter,
				text: text,
				ts: Date.now()
			}));
		} catch (e) {}
	}

	function clearDraft() {
		try { sessionStorage.removeItem(DRAFT_KEY); } catch (e) {}
	}

	function readDraft(subject, chapter) {
		try {
			var d = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null');
			if (!d || d.subject !== subject || d.chapter !== chapter) return '';
			if (Date.now() - (d.ts || 0) > 30 * 60 * 1000) {
				clearDraft();
				return '';
			}
			return String(d.text || '');
		} catch (e) {
			return '';
		}
	}

	function openCompose(card, subject, chapter, initialText) {
		var foot = card.querySelector('.soc-foot');
		var compose = card.querySelector('.soc-compose');
		var input = card.querySelector('.soc-compose-input');
		var loginHint = card.querySelector('.soc-login-hint');
		if (!foot || !compose || !input) return;
		if (loginHint) loginHint.hidden = true;
		foot.classList.add('is-composing');
		compose.hidden = false;
		input.value = initialText != null ? initialText : '';
		input.focus();
		if (subject && chapter && input.value) saveDraft(subject, chapter, input.value);
	}

	function closeCompose(card, subject, chapter) {
		var foot = card.querySelector('.soc-foot');
		var compose = card.querySelector('.soc-compose');
		var input = card.querySelector('.soc-compose-input');
		if (!foot || !compose) return;
		foot.classList.remove('is-composing');
		compose.hidden = true;
		if (input) input.value = '';
		clearDraft();
	}

	function showLoginHint(card) {
		var loginHint = card.querySelector('.soc-login-hint');
		if (loginHint) {
			loginHint.hidden = false;
			var next = encodeURIComponent(location.pathname + location.search);
			var link = loginHint.querySelector('a');
			if (link) link.href = '/login.html?next=' + next;
		}
	}

	function fetchMe() {
		return fetch('/api/me', { credentials: 'include', cache: 'no-store' })
			.then(function (r) { return r.ok ? r.json() : null; })
			.catch(function () { return null; });
	}

	function publishComment(card, subject, chapter, uid, text) {
		var list = card.querySelector('.soc-list');
		if (!list) return;
		var comment = {
			id: 'u-' + Date.now(),
			uid: uid,
			text: text,
			ts: Date.now()
		};
		var stored = loadStored(subject, chapter);
		stored.unshift(comment);
		saveStored(subject, chapter, stored);
		var wrap = document.createElement('div');
		wrap.innerHTML = userItemHtml(comment);
		var node = wrap.firstElementChild;
		if (node) list.insertBefore(node, list.firstChild);
		bindReactions(card);
		closeCompose(card, subject, chapter);
	}

	function init(root, opts) {
		root = root || document;
		opts = opts || {};
		var subject = opts.subject || subjectFromPath();
		var chapter = opts.chapter || chapterFromPath();

		root.querySelectorAll('.soc-card').forEach(function (card) {
			prependUserComments(card, subject, chapter);

			var draft = readDraft(subject, chapter);
			if (draft) {
				fetchMe().then(function (me) {
					if (me && me.id != null) openCompose(card, subject, chapter, draft);
				});
			}

			card.querySelectorAll('.soc-sort').forEach(function (grp) {
				if (grp.dataset.socBound) return;
				grp.dataset.socBound = '1';
				grp.addEventListener('click', function (e) {
					var b = e.target.closest('button');
					if (!b) return;
					grp.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
					b.classList.add('is-active');
				});
			});

			bindReactions(card);

			var writeBtn = card.querySelector('.soc-write');
			var cancelBtn = card.querySelector('.soc-compose-cancel');
			var sendBtn = card.querySelector('.soc-compose-send');
			var input = card.querySelector('.soc-compose-input');

			if (writeBtn && !writeBtn.dataset.socBound) {
				writeBtn.dataset.socBound = '1';
				writeBtn.addEventListener('click', function () {
					fetchMe().then(function (me) {
						if (!me || me.id == null) {
							showLoginHint(card);
							return;
						}
						openCompose(card, subject, chapter, readDraft(subject, chapter));
					});
				});
			}

			if (cancelBtn && !cancelBtn.dataset.socBound) {
				cancelBtn.dataset.socBound = '1';
				cancelBtn.addEventListener('click', function () {
					closeCompose(card, subject, chapter);
				});
			}

			if (sendBtn && input && !sendBtn.dataset.socBound) {
				sendBtn.dataset.socBound = '1';
				var submit = function () {
					var text = String(input.value || '').replace(/\s+/g, ' ').trim();
					if (text.length < MIN_LEN) {
						input.focus();
						return;
					}
					fetchMe().then(function (me) {
						if (!me || me.id == null) {
							closeCompose(card, subject, chapter);
							showLoginHint(card);
							return;
						}
						publishComment(card, subject, chapter, me.id, text);
					});
				};
				sendBtn.addEventListener('click', submit);
				input.addEventListener('input', function () {
					saveDraft(subject, chapter, input.value);
				});
				input.addEventListener('keydown', function (e) {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						submit();
					}
					if (e.key === 'Escape') closeCompose(card, subject, chapter);
				});
			}
		});
	}

	global.IqmoChapterDiscussion = { html: html, init: init };
})(typeof window !== 'undefined' ? window : this);
