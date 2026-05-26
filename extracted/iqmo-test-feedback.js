/**
 * IQMO — UI и поток feedback после ответа в полном варианте / тесте.
 */
(function (global) {
	'use strict';

	var AUTO_NEXT_MS = 850;
	var MISTAKE_SOURCE = 'full';

	function ensureFb(state) {
		if (!state.feedback) {
			state.feedback = {
				byQ: {},
				streak: 0,
				bestStreak: 0,
				sessionWrong: 0,
				topicBonusAwarded: false
			};
		}
		return state.feedback;
	}

	function isGradable(q) {
		return q && q.type !== 'written' && q.type !== 'open';
	}

	function formatCorrectLabel(q, correct) {
		if (q.type === 'single' || q.type === 'multi') {
			var ids = Array.isArray(correct) ? correct : (correct != null ? [correct] : []);
			return ids.map(String).sort().join(', ');
		}
		if (q.type === 'match' && Array.isArray(correct)) {
			return correct.join(', ');
		}
		if (Array.isArray(correct)) return correct.join(' / ');
		return String(correct == null ? '' : correct);
	}

	function getCorrectOptionIds(q) {
		var c = q.correct;
		if (q.type === 'single') return c != null ? [String(c)] : [];
		if (q.type === 'multi') return Array.isArray(c) ? c.map(String) : [];
		return [];
	}

	function countGradable(questions) {
		var n = 0;
		(questions || []).forEach(function (q) {
			if (isGradable(q)) n++;
		});
		return n;
	}

	function countGradableAnswered(questions, state) {
		var n = 0;
		(questions || []).forEach(function (q) {
			if (!isGradable(q)) return;
			var meta = state.feedback && state.feedback.byQ[q.id];
			if (meta && meta.awarded) n++;
		});
		return n;
	}

	function xpSnapshot() {
		try {
			if (global.ChemProgress && ChemProgress.getGamificationSnapshot) {
				var s = ChemProgress.getGamificationSnapshot();
				return (s && s.totalPoints) || 0;
			}
		} catch (e) {}
		return 0;
	}

	var _confettiPromise = null;
	function loadConfetti() {
		if (_confettiPromise) return _confettiPromise;
		_confettiPromise = new Promise(function (resolve) {
			if (typeof global.confetti === 'function') return resolve(global.confetti);
			var s = document.createElement('script');
			s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
			s.async = true;
			s.onload = function () { resolve(global.confetti); };
			s.onerror = function () { resolve(null); };
			document.head.appendChild(s);
		});
		return _confettiPromise;
	}

	function fireConfettiLight() {
		try {
			if (global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		} catch (eR) {}
		loadConfetti().then(function (c) {
			if (!c) return;
			try {
				c({
					particleCount: 42,
					spread: 58,
					startVelocity: 28,
					origin: { y: 0.72 },
					colors: ['#4f46e5', '#7c3aed', '#10b981', '#38bdf8']
				});
			} catch (e) {}
		});
	}

	function dispatchXpUpdated(detail) {
		try {
			global.dispatchEvent(new CustomEvent('iqmo-xp-updated', { detail: detail || {} }));
		} catch (e) {}
	}

	function renderFeedbackCard(elSlot, copy, reward, isCorrect) {
		if (!elSlot) return;
		var chipsHtml = (copy.chips || [])
			.map(function (c) {
				return '<span class="answer-feedback__chip">' + c.icon + ' ' + esc(c.text) + '</span>';
			})
			.join('');
		elSlot.innerHTML =
			'<div class="answer-feedback ' + (isCorrect ? 'is--ok' : 'is--wrong') + '" role="status">' +
			'<div class="answer-feedback__row">' +
			'<div class="answer-feedback__head">' +
			'<span class="answer-feedback__icon" aria-hidden="true">' + (isCorrect ? '✅' : '❌') + '</span>' +
			'<span>' + esc(copy.headline) + '</span></div>' +
			'<span class="answer-feedback__xp">+' + reward.totalXP + ' XP</span></div>' +
			(copy.sub ? '<div class="answer-feedback__sub">' + esc(copy.sub) + '</div>' : '') +
			(chipsHtml ? '<div class="answer-feedback__chips">' + chipsHtml + '</div>' : '') +
			'</div>';
	}

	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function applyOptionReveal(elCard, q, given, status) {
		if (!elCard || (q.type !== 'single' && q.type !== 'multi')) return;
		var correctSet = new Set(getCorrectOptionIds(q));
		var pickedSet = new Set(Array.isArray(given) ? given.map(String) : given != null ? [String(given)] : []);
		var opts = elCard.querySelector('.options');
		if (opts) opts.classList.add('is--locked');
		elCard.querySelectorAll('.option').forEach(function (el) {
			var id = el.dataset.id;
			el.classList.remove('is--checked');
			var isCorr = correctSet.has(id);
			var isPick = pickedSet.has(id);
			el.classList.remove('is--reveal-correct', 'is--reveal-wrong', 'is--reveal-dim');
			if (isCorr) el.classList.add('is--reveal-correct');
			else if (isPick && status !== 'ok') el.classList.add('is--reveal-wrong');
			else el.classList.add('is--reveal-dim');
		});
	}

	function setFootAwaiting(elCard, awaiting) {
		var foot = elCard && elCard.querySelector('.q-foot');
		if (!foot) return;
		foot.classList.toggle('is--await-reveal', !!awaiting);
		var btn = elCard.querySelector('#btn-next');
		if (btn && awaiting) btn.disabled = true;
	}

	function enableNext(elCard) {
		var foot = elCard && elCard.querySelector('.q-foot');
		if (foot) foot.classList.remove('is--await-reveal');
		var btn = elCard && elCard.querySelector('#btn-next');
		if (btn) btn.disabled = false;
	}

	/**
	 * @param {object} ctx
	 */
	function revealAndReward(ctx) {
		var q = ctx.q;
		var state = ctx.state;
		var saveState = ctx.saveState;
		var elCard = ctx.elCard;
		var checkResult = ctx.checkResult;
		var questions = ctx.questions || [];
		var subject = ctx.subject || 'chemistry';

		if (!isGradable(q)) return false;

		var fb = ensureFb(state);
		var qid = q.id;
		var status = checkResult.status;
		var isCorrect = status === 'ok';
		var given = checkResult.given;

		var existing = fb.byQ[qid];
		if (existing && existing.awarded) {
			applyOptionReveal(elCard, q, given, status);
			renderFeedbackCard(
				elCard.querySelector('#answer-feedback-slot'),
				existing.copy || { headline: isCorrect ? 'Верно!' : 'Почти!', chips: [], sub: '' },
				existing.reward,
				isCorrect
			);
			enableNext(elCard);
			state._answerPhase = 'rewardShown';
			return true;
		}

		var answerTimeMs = Math.max(0, Date.now() - (state._questionStartedAt || Date.now()));
		var prevStreak = fb.streak;
		if (isCorrect) {
			fb.streak = prevStreak + 1;
		} else {
			fb.streak = 0;
			fb.sessionWrong += 1;
		}
		fb.bestStreak = Math.max(fb.bestStreak, fb.streak);

		var gradableTotal = countGradable(questions);
		var answeredGradable = countGradableAnswered(questions, state) + 1;
		var isLastGradable = answeredGradable >= gradableTotal;
		var isTopicPerfect = isLastGradable && isCorrect && fb.sessionWrong === 0 && !fb.topicBonusAwarded;

		var reward = global.IqmoAnswerReward.calculateAnswerReward({
			isCorrect: isCorrect,
			answerTimeMs: answerTimeMs,
			correctStreak: fb.streak,
			isTopicPerfect: isTopicPerfect
		});

		if (isTopicPerfect) fb.topicBonusAwarded = true;

		var copy = global.IqmoAnswerReward.buildFeedbackCopy({
			isCorrect: isCorrect,
			reward: reward,
			correctStreak: fb.streak,
			correctLabel: formatCorrectLabel(q, q.correct)
		});

		var xpBefore = xpSnapshot();
		var levelBefore =
			global.ChemProgress && ChemProgress.getLevelDetail
				? ChemProgress.getLevelDetail(xpBefore)
				: null;

		try {
			if (global.ChemProgress && ChemProgress.awardXp) {
				ChemProgress.awardXp(reward.totalXP, 'answer_' + (isCorrect ? 'ok' : 'try'), isCorrect ? 1 : 0);
			}
		} catch (eXp) {}

		var xpAfter = xpSnapshot();
		var levelAfter =
			global.ChemProgress && ChemProgress.getLevelDetail
				? ChemProgress.getLevelDetail(xpAfter)
				: null;

		if (!isCorrect) {
			try {
				if (global.MistakesStore && MistakesStore.add) {
					MistakesStore.add(qid, MISTAKE_SOURCE);
				}
			} catch (eM) {}
		}

		fb.byQ[qid] = {
			awarded: true,
			isCorrect: isCorrect,
			reward: reward,
			copy: copy,
			answerTimeMs: answerTimeMs,
			at: Date.now()
		};

		state._answerPhase = 'rewardShown';
		applyOptionReveal(elCard, q, given, status);
		renderFeedbackCard(elCard.querySelector('#answer-feedback-slot'), copy, reward, isCorrect);
		enableNext(elCard);
		saveState();

		dispatchXpUpdated({
			added: reward.totalXP,
			total: xpAfter,
			subject: subject
		});

		if (isCorrect && (reward.streakMilestone === 5 || reward.streakMilestone === 10 || isTopicPerfect)) {
			fireConfettiLight();
		}

		if (levelBefore && levelAfter && levelAfter.level > levelBefore.level && ctx.onLevelUp) {
			try {
				ctx.onLevelUp(levelAfter.level, levelAfter.title || '');
			} catch (eLu) {}
		}

		return true;
	}

	function onQuestionShow(state) {
		state._questionStartedAt = Date.now();
		state._answerPhase = 'idle';
	}

	function isRevealed(state, q) {
		var fb = state.feedback;
		return !!(fb && fb.byQ && fb.byQ[q.id] && fb.byQ[q.id].awarded);
	}

	function tryReveal(ctx) {
		var q = ctx.q;
		if (!isGradable(q)) {
			enableNext(ctx.elCard);
			return false;
		}
		var given = ctx.state.answers[q.id];
		var status = ctx.checkAnswerStatic(q, given);
		return revealAndReward({
			q: q,
			state: ctx.state,
			saveState: ctx.saveState,
			elCard: ctx.elCard,
			checkResult: { status: status, given: given, correct: q.correct },
			questions: ctx.questions,
			subject: ctx.subject,
			onLevelUp: ctx.onLevelUp
		});
	}

	function matchComplete(q, given) {
		if (!Array.isArray(q.matchLeft)) return false;
		var arr = Array.isArray(given) ? given : [];
		for (var i = 0; i < q.matchLeft.length; i++) {
			if (!arr[i]) return false;
		}
		return true;
	}

	function wireGradableQuestion(ctx) {
		var q = ctx.q;
		var state = ctx.state;
		var saveState = ctx.saveState;
		var elCard = ctx.elCard;
		var renderAll = ctx.renderAll;

		setFootAwaiting(elCard, !isRevealed(state, q));

		if (isRevealed(state, q)) {
			var given = state.answers[q.id];
			var status = ctx.checkAnswerStatic(q, given);
			revealAndReward({
				q: q,
				state: state,
				saveState: saveState,
				elCard: elCard,
				checkResult: { status: status, given: given, correct: q.correct },
				questions: ctx.questions,
				subject: ctx.subject,
				onLevelUp: ctx.onLevelUp
			});
		}

		if (q.type === 'single') {
			elCard.querySelectorAll('.option').forEach(function (el) {
				el.addEventListener('click', function () {
					if (isRevealed(state, q)) return;
					state.answers[q.id] = el.dataset.id;
					saveState();
					tryReveal(ctx);
				});
			});
			return;
		}

		if (q.type === 'multi') {
			var isMulti = true;
			elCard.querySelectorAll('.option').forEach(function (el) {
				el.addEventListener('click', function () {
					if (isRevealed(state, q)) return;
					var id = el.dataset.id;
					var cur = new Set(Array.isArray(state.answers[q.id]) ? state.answers[q.id] : []);
					if (cur.has(id)) cur.delete(id);
					else {
						if (q.pickCount && cur.size >= q.pickCount) {
							cur.delete(cur.values().next().value);
						}
						cur.add(id);
					}
					state.answers[q.id] = Array.from(cur);
					saveState();
					var picked = state.answers[q.id];
					var need = q.pickCount || (Array.isArray(q.correct) ? q.correct.length : 1);
					if (Array.isArray(picked) && picked.length >= need) tryReveal(ctx);
					else {
						elCard.querySelectorAll('.option').forEach(function (o) {
							var ps = new Set(state.answers[q.id] || []);
							o.classList.toggle('is--checked', ps.has(o.dataset.id));
						});
						ctx.renderNav && ctx.renderNav();
					}
				});
			});
			return;
		}

		if (q.type === 'input') {
			var input = elCard.querySelector('#ans-input');
			var btnCheck = elCard.querySelector('#btn-check-answer');
			function submitInput() {
				if (isRevealed(state, q)) return;
				if (!input || !String(input.value || '').trim()) return;
				state.answers[q.id] = input.value.trim();
				saveState();
				tryReveal(ctx);
			}
			if (input) {
				input.addEventListener('input', function () {
					if (isRevealed(state, q)) return;
					state.answers[q.id] = input.value.trim();
					saveState();
					if (ctx.renderNav) ctx.renderNav();
				});
				input.addEventListener('keydown', function (e) {
					if (e.key === 'Enter') {
						e.preventDefault();
						submitInput();
					}
				});
			}
			if (btnCheck) btnCheck.addEventListener('click', submitInput);
			return;
		}

		if (q.type === 'match') {
			elCard.querySelectorAll('.match__select').forEach(function (sel) {
				sel.addEventListener('change', function () {
					if (isRevealed(state, q)) return;
					var cur = Array.isArray(state.answers[q.id]) ? state.answers[q.id].slice() : [];
					cur[Number(sel.dataset.idx)] = sel.value;
					state.answers[q.id] = cur;
					saveState();
					if (matchComplete(q, cur)) tryReveal(ctx);
					else if (ctx.renderNav) ctx.renderNav();
				});
			});
		}
	}

	function inputCheckButtonHtml() {
		return '<button type="button" class="btn btn--ghost" id="btn-check-answer">Проверить ответ</button>';
	}

	function feedbackSlotHtml() {
		return '<div id="answer-feedback-slot"></div>';
	}

	global.IqmoTestFeedback = {
		AUTO_NEXT_MS: AUTO_NEXT_MS,
		isGradable: isGradable,
		ensureFb: ensureFb,
		onQuestionShow: onQuestionShow,
		isRevealed: isRevealed,
		feedbackSlotHtml: feedbackSlotHtml,
		inputCheckButtonHtml: inputCheckButtonHtml,
		wireGradableQuestion: wireGradableQuestion,
		tryReveal: tryReveal,
		revealAndReward: revealAndReward,
		applyOptionReveal: applyOptionReveal
	};
})(typeof window !== 'undefined' ? window : global);
