/**
 * Блок «Обсуждение главы» — готовый social-layer для hub-страниц.
 * HTML/CSS/логика из discussion-block/ без переименования классов.
 */
(function (global) {
	'use strict';

	var AV = '/assets/avatars/';

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
			+ '<div class="soc-list is-collapsed">'
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
			+ _item('iq-2210.png', 'IQ-2210', '14 ч назад', 'там подвох в формуле — пересчитай моли, и всё сойдётся', false, [
				['❤️', 6, false], ['🔥', 2, false]
			], 0, true)
			+ _item('iq-9973.png', 'IQ-9973', 'вчера', 'момент с реакциями — топ объяснение, нигде такого не видел', false, [
				['❤️', 11, false]
			], 0, true)
			+ _item('iq-1842.png', 'IQ-1842', 'вчера', 'прошёл босса с 5 попытки, но оно того 🙏', true, [
				['🔥', 6, false], ['❤️', 4, false]
			], 0, true)
			+ _item('iq-5521.png', 'IQ-5521', '2 дня назад', 'спасибо за подсказку про моли, вытянул 15 задание', false, [
				['❤️', 14, false], ['🔥', 3, false]
			], 0, true)
			+ _item('iq-1024.png', 'IQ-1024', '2 дня назад', 'вариант 12 забрал 1.5 часа жизни, но разобрался', false, [
				['🔥', 5, false], ['😭', 2, false]
			], 2, true)
			+ _item('iq-1337.png', 'IQ-1337', '3 дня назад', 'лучшая глава за всю платформу, не меняйте задания', false, [
				['❤️', 19, false], ['🔥', 6, false]
			], 0, true)
			+ _item('iq-4408.png', 'IQ-4408', '4 дня назад', 'с третьего раза прошёл, но было приятно 🙂', false, [
				['❤️', 4, false], ['🔥', 2, false]
			], 0, true)
			+ '</div>'
			+ '<div class="soc-foot">'
			+ '<button class="soc-more" type="button" data-target=".soc-list">Показать ещё 7 ↓</button>'
			+ '<button class="soc-write" type="button">'
			+ '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
			+ 'Поделитесь впечатлением о главе…'
			+ '</button>'
			+ '</div>'
			+ '</section>';
	}

	function _item(avatar, name, time, text, online, reacts, replies, extra) {
		var cls = 'soc-item' + (extra ? ' is-extra' : '');
		var avCls = 'soc-avatar' + (online ? ' is-online' : '');
		var reactHtml = reacts.map(function (r) {
			var mine = r[2] ? ' is-mine' : '';
			return '<button class="soc-react' + mine + '" type="button"><span class="em">' + r[0] + '</span> ' + r[1] + '</button>';
		}).join('');
		reactHtml += '<button class="soc-react soc-react-add" type="button" aria-label="Добавить реакцию">＋</button>';
		var repliesHtml = '';
		if (replies) {
			var word = replies === 1 ? 'ответ' : (replies >= 2 && replies <= 4 ? 'ответа' : 'ответов');
			repliesHtml = '<button class="soc-replies" type="button"><span class="em">💬</span> ' + replies + ' ' + word + '</button>';
		}
		return ''
			+ '<article class="' + cls + '">'
			+ '<div class="' + avCls + '" aria-hidden="true"><img src="' + AV + avatar + '" alt="" /></div>'
			+ '<div>'
			+ '<div class="soc-meta"><span class="soc-name">' + name + '</span>'
			+ '<span class="soc-dot" aria-hidden="true"></span>'
			+ '<span class="soc-time">' + time + '</span></div>'
			+ '<p class="soc-text">' + text + '</p>'
			+ '<div class="soc-actions">' + reactHtml + repliesHtml + '</div>'
			+ '</div>'
			+ '</article>';
	}

	function init(root) {
		root = root || document;

		root.querySelectorAll('.soc-more').forEach(function (btn) {
			if (btn.dataset.socBound) return;
			btn.dataset.socBound = '1';
			btn.addEventListener('click', function () {
				var sel = btn.getAttribute('data-target');
				var list = sel ? btn.closest('.soc-card').querySelector(sel) : null;
				if (!list) return;
				list.classList.remove('is-collapsed');
				btn.style.display = 'none';
			});
		});

		root.querySelectorAll('.soc-sort').forEach(function (grp) {
			if (grp.dataset.socBound) return;
			grp.dataset.socBound = '1';
			grp.addEventListener('click', function (e) {
				var b = e.target.closest('button');
				if (!b) return;
				grp.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
				b.classList.add('is-active');
			});
		});

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

	global.IqmoChapterDiscussion = { html: html, init: init };
})(typeof window !== 'undefined' ? window : this);
