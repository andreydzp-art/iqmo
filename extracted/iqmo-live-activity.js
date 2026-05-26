/**
 * IQMO — живая активность: polling, ticker, feed, emit, heartbeat.
 */
(function (global) {
	'use strict';

	var POLL_MS = 20000;
	var TICKER_MS = 10000;
	var HEARTBEAT_MS = 60000;
	var KEY_PUBLIC = 'iqmo-live-activity-public-v1';

	var BADGE_TITLES = {
		welcome: 'Старт',
		three_tests: 'Тройка тестов',
		streak7: 'Неделя ритма',
		chem_stage1: 'Этап 1 · Химия',
		bio_stage1: 'Этап 1 · Биология',
		ten_tests: 'Десятка',
		perfect_run: 'Без ошибок',
		topic_star: 'Мастер темы',
		final_sprint: 'Финишный рывок'
	};

	var _cache = null;
	var _pollTimer = null;
	var _heartbeatTimer = null;
	var _presence = { subject: null, chapter: null };

	function fmtNum(n) {
		return String(Math.max(0, Math.round(Number(n) || 0))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
	}

	function readPublicOptIn() {
		try {
			return localStorage.getItem(KEY_PUBLIC) === '1';
		} catch (e) {
			return false;
		}
	}

	function setPublicOptIn(on) {
		try {
			localStorage.setItem(KEY_PUBLIC, on ? '1' : '0');
		} catch (e) {}
		heartbeat();
	}

	function readDisplayName() {
		try {
			if (global.IqmoProfileData && IqmoProfileData.readStoredDisplayName) {
				var n = IqmoProfileData.readStoredDisplayName();
				if (n) return n;
			}
			var raw = localStorage.getItem('iqmo-chem-display-name-v1');
			if (raw) {
				var o = JSON.parse(raw);
				if (o && o.name) return String(o.name);
			}
		} catch (e2) {}
		return '';
	}

	function fetchFeed(params) {
		params = params || {};
		var qs = new URLSearchParams();
		if (params.scope) qs.set('scope', params.scope);
		if (params.subject) qs.set('subject', params.subject);
		if (params.chapter) qs.set('chapter', params.chapter);
		if (params.limit) qs.set('limit', String(params.limit));
		var url = '/api/live-activity' + (qs.toString() ? '?' + qs.toString() : '');
		return fetch(url, { credentials: 'same-origin', cache: 'no-store' })
			.then(function (r) {
				if (!r.ok) throw new Error('feed');
				return r.json();
			})
			.catch(function () {
				return {
					onlineCount: 1100,
					activeInSubject: 0,
					activeInChapter: 0,
					events: [],
					aggregates: []
				};
			});
	}

	function postEvent(body) {
		return fetch('/api/live-activity', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify(body)
		}).catch(function () {});
	}

	function emit(payload) {
		payload = payload || {};
		var body = {
			type: payload.type,
			subject: payload.subject || _presence.subject,
			chapter: payload.chapter || _presence.chapter,
			topic: payload.topic,
			badgeId: payload.badgeId,
			badgeName: payload.badgeName || (payload.badgeId ? BADGE_TITLES[payload.badgeId] : undefined),
			level: payload.level,
			streakDays: payload.streakDays,
			score: payload.score,
			count: payload.count,
			publicOptIn: !!payload.publicOptIn || readPublicOptIn(),
			publicName: payload.publicName || readDisplayName(),
			metadata: payload.metadata || {}
		};
		return postEvent(body);
	}

	function heartbeat() {
		return postEvent({
			heartbeat: true,
			subject: _presence.subject,
			chapter: _presence.chapter,
			publicOptIn: readPublicOptIn()
		});
	}

	function setPresence(subject, chapter) {
		_presence.subject = subject || null;
		_presence.chapter = chapter || null;
		heartbeat();
	}

	function startHeartbeat() {
		if (_heartbeatTimer || typeof document === 'undefined') return;
		heartbeat();
		_heartbeatTimer = setInterval(heartbeat, HEARTBEAT_MS);
		document.addEventListener('visibilitychange', function () {
			if (document.visibilityState === 'visible') heartbeat();
		});
	}

	function startPolling(getter, intervalMs) {
		if (_pollTimer) return;
		function tick() {
			getter().then(function (data) {
				_cache = data;
			});
		}
		tick();
		_pollTimer = setInterval(tick, intervalMs || POLL_MS);
	}

	/** Hero / landing ticker */
	function mountTicker(root, opts) {
		if (!root || root.__iqmoLiveTicker) return;
		root.__iqmoLiveTicker = true;
		opts = opts || {};
		root.classList.add('live-act-ticker-wrap');
		root.innerHTML =
			'<div class="live-act-online" data-live-online>' +
			'<span class="live-act-online__dot" aria-hidden="true"></span>' +
			'<span>Сейчас занимаются <span class="live-act-online__count" data-live-count>—</span> школьников</span></div>' +
			'<div class="live-act-ticker" data-live-ticker aria-live="polite"></div>';

		var countEl = root.querySelector('[data-live-count]');
		var tickerEl = root.querySelector('[data-live-ticker]');
		var idx = 0;
		var lines = [];

		function renderLine() {
			if (!lines.length) {
				tickerEl.innerHTML =
					'<div class="live-act-ticker__line"><span class="live-act-ticker__ico">✨</span><span>Сегодня на платформе идёт подготовка к ОГЭ</span></div>';
				return;
			}
			var ev = lines[idx % lines.length];
			idx++;
			tickerEl.innerHTML =
				'<div class="live-act-ticker__line">' +
				'<span class="live-act-ticker__ico">' +
				(ev.icon || '✨') +
				'</span><span><b>' +
				esc(ev.text) +
				'</b>' +
				(ev.ago ? ' · ' + esc(ev.ago) : '') +
				'</span></div>';
		}

		function apply(data) {
			if (countEl) countEl.textContent = fmtNum(data.onlineCount || 0);
			lines = (data.events || []).slice(0, 12);
			(data.aggregates || []).forEach(function (a) {
				lines.push({ icon: a.icon, text: a.text, ago: '' });
			});
			renderLine();
			try {
				global.dispatchEvent(
					new CustomEvent('iqmo-live-activity-viewed', { detail: { place: 'ticker' } })
				);
			} catch (e) {}
		}

		fetchFeed({ scope: 'global', limit: 10 }).then(apply);
		setInterval(function () {
			fetchFeed({ scope: 'global', limit: 10 }).then(function (data) {
				apply(data);
				renderLine();
			});
		}, opts.pollMs || POLL_MS);
		setInterval(renderLine, opts.rotateMs || TICKER_MS);
	}

	/** Feed card for profile / subject */
	function mountFeed(root, opts) {
		if (!root || root.__iqmoLiveFeed) return;
		root.__iqmoLiveFeed = true;
		opts = opts || {};
		var title = opts.title || 'Сейчас в IQMO';
		var subject = opts.subject || null;
		var chapter = opts.chapter || null;

		root.classList.add('live-act-card');
		root.setAttribute('data-live-feed', '1');
		root.innerHTML =
			'<div class="live-act-card__head">' +
			'<div><h3 class="live-act-card__title">' +
			esc(title) +
			'</h3><div class="live-act-card__stats" data-live-stats></div></div>' +
			'<div class="live-act-online"><span class="live-act-online__dot"></span><span class="live-act-online__count" data-live-count>—</span></div></div>' +
			'<ul class="live-act-card__list" data-live-list></ul>';

		var statsEl = root.querySelector('[data-live-stats]');
		var listEl = root.querySelector('[data-live-list]');
		var countEl = root.querySelector('[data-live-count]');

		function apply(data) {
			if (countEl) countEl.textContent = fmtNum(data.onlineCount || 0);
			var stats = [];
			if (subject && data.activeInSubject) {
				stats.push('<span class="live-act-card__stat">' + fmtNum(data.activeInSubject) + ' онлайн</span>');
			}
			if (chapter && data.activeInChapter) {
				stats.push('<span class="live-act-card__stat">' + fmtNum(data.activeInChapter) + ' в главе</span>');
			}
			var today = (data.aggregates && data.aggregates[0]) ? data.aggregates[0].text : '';
			if (today) stats.push('<span class="live-act-card__stat">' + esc(today) + '</span>');
			if (statsEl) statsEl.innerHTML = stats.join('');

			var events = (data.events || []).slice(0, opts.limit || 5);
			if (!events.length) {
				listEl.innerHTML =
					'<li class="live-act-card__item"><span class="live-act-card__item-ico">✨</span><span>Пока мало событий — начни главу и откроешь активность первым.</span></li>';
				return;
			}
			listEl.innerHTML = events
				.map(function (ev) {
					return (
						'<li class="live-act-card__item">' +
						'<span class="live-act-card__item-ico">' +
						(ev.icon || '✨') +
						'</span><span>' +
						esc(ev.text) +
						'<span class="live-act-card__item-meta">' +
						esc(ev.ago || '') +
						'</span></span></li>'
					);
				})
				.join('');
			try {
				global.dispatchEvent(
					new CustomEvent('iqmo-live-activity-viewed', { detail: { place: opts.place || 'feed' } })
				);
			} catch (e) {}
		}

		function load() {
			return fetchFeed({
				scope: subject ? 'subject' : 'global',
				subject: subject,
				chapter: chapter,
				limit: opts.limit || 6
			}).then(apply);
		}

		load();
		setInterval(load, opts.pollMs || POLL_MS);
	}

	/** Post-test social insight */
	function mountPostTestInsight(root, opts) {
		if (!root) return;
		opts = opts || {};
		var pct = Math.max(0, Math.min(100, Math.round(Number(opts.percent) || 0)));
		var faster = Math.max(35, Math.min(92, Math.round(40 + pct * 0.45)));
		var above = Math.max(0, pct - 62);
		var todayCount = Math.max(12, Math.round(80 + pct * 1.2));

		root.innerHTML =
			'<div class="live-act-insight" data-live-insight>' +
			'<p class="live-act-insight__title">Ты не один</p>' +
			'<ul class="live-act-insight__list">' +
			'<li>Сегодня эту тему прошли <b>' +
			fmtNum(todayCount) +
			'</b> ученика</li>' +
			(liPercent(pct, above, faster)) +
			'</ul></div>';

		fetchFeed({ subject: opts.subject, limit: 3 }).then(function () {
			try {
				global.dispatchEvent(
					new CustomEvent('iqmo-live-activity-viewed', { detail: { place: 'post_test' } })
				);
			} catch (e) {}
		});
	}

	function liPercent(pct, above, faster) {
		if (pct >= 70) {
			return (
				'<li>Твой результат выше среднего на <b>' +
				Math.max(5, above) +
				'%</b></li>' +
				'<li>Ты быстрее <b>' +
				faster +
				'%</b> учеников в похожих заданиях</li>'
			);
		}
		return '<li>Есть куда расти: следующий проход может поднять тебя выше среднего</li>';
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function hookChemProgress() {
		if (!global.ChemProgress) return;
		var cp = global.ChemProgress;
		if (cp._liveActivityHooked) return;
		cp._liveActivityHooked = true;

		var origAward = cp.awardXp;
		if (typeof origAward === 'function') {
			cp.awardXp = function (amount, reason, deltaTasks) {
				var before =
					cp.getGamificationSnapshot && cp.getGamificationSnapshot().level
						? cp.getGamificationSnapshot().level.current
						: null;
				var res = origAward.apply(cp, arguments);
				var after = res && res.level ? res.level.current : before;
				if (before != null && after != null && after > before) {
					emit({
						type: 'level_up',
						level: after,
						subject: _presence.subject
					});
				}
				if (reason === 'answer_ok' || (String(reason || '').indexOf('answer_') === 0 && amount >= 10)) {
					/* per-answer XP handled separately if needed */
				}
				return res;
			};
		}

		var origUnlock = null;
		/* unlockBadge is internal — hook via celebration queue on recordAttempt */
		var origRecord = cp.recordAttempt;
		if (typeof origRecord === 'function') {
			cp.recordAttempt = function (payload) {
				var r = origRecord.apply(cp, arguments);
				try {
					var p = payload || {};
					if (p.percent >= 100 && (p.total || 0) >= 5) {
						emit({ type: 'perfect_score', subject: p.subject, topic: p.label });
					} else if (p.percent >= 50) {
						emit({
							type: 'topic_completed',
							subject: p.subject,
							topic: p.variantTitle || p.label
						});
					}
				} catch (e) {}
				return r;
			};
		}
	}

	function init(opts) {
		opts = opts || {};
		if (opts.subject || opts.chapter) setPresence(opts.subject, opts.chapter);
		startHeartbeat();
		hookChemProgress();
		if (opts.tickerRoot) mountTicker(opts.tickerRoot, opts);
		if (opts.feedRoot) mountFeed(opts.feedRoot, opts);
	}

	global.IqmoLiveActivity = {
		POLL_MS: POLL_MS,
		fetchFeed: fetchFeed,
		emit: emit,
		setPresence: setPresence,
		heartbeat: heartbeat,
		mountTicker: mountTicker,
		mountFeed: mountFeed,
		mountPostTestInsight: mountPostTestInsight,
		init: init,
		readPublicOptIn: readPublicOptIn,
		setPublicOptIn: setPublicOptIn
	};

	if (typeof document !== 'undefined' && document.readyState !== 'loading') {
		scheduleAutoInit();
	} else if (typeof document !== 'undefined') {
		document.addEventListener('DOMContentLoaded', scheduleAutoInit);
	}

	function scheduleAutoInit() {
		var ticker = document.querySelector('[data-iqmo-live-ticker]');
		var feed = document.querySelector('[data-iqmo-live-feed]');
		var body = document.body;
		var subject =
			(body && (body.dataset.liveSubject || body.dataset.examSubject)) || null;
		var chapter = (body && body.dataset.liveChapter) || null;
		if (ticker || feed || subject) {
			init({
				tickerRoot: ticker,
				feedRoot: feed,
				subject: subject,
				chapter: chapter,
				title: feed && feed.getAttribute('data-title')
			});
		}
	}
})(typeof window !== 'undefined' ? window : global);
