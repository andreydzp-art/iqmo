/* IQMO · v3 — тёмная игровая сцена.
 * + буквы A/B/C/D на вариантах
 * + ripple при клике + частицы XP при ответе
 */
(function(){
  'use strict';
  var Q = window.QUESTIONS;
  var INIT = window.INITIAL_STATE;

  var state = {
    cur: INIT.currentIndex,
    ans: Object.assign({}, INIT.answers),
    postponed: new Set(INIT.postponed),
    visited: new Set(INIT.visited),
    remaining: INIT.remainingSec,
    total: INIT.durationSec,
    xp: 1248,
    xpToNext: 2000,
    combo: 3,
    sessionXp: 0,
    sessionGoal: 300
  };

  var LETTERS = ['1','2','3','4','5','6','7','8','9','10'];

  var $ = function(s){ return document.querySelector(s); };
  var grid = $('#qgrid');
  var qcard = $('#qcard');
  var timerEl = $('#timer');
  var timerTxt = $('#timer-text');
  var fillEl = $('#ps-fill');
  var psDone = $('#ps-done');
  var psCombo = $('#ps-combo');
  var gridNow = $('#grid-now');
  var toast = $('#toast');
  var toastTxt = $('#toast-text');
  var toastXp = $('#toast-xp');
  var lvlRing = $('#lvl-ring');
  var playerXpEl = $('#player-xp');
  var comboFlash = $('#combo-flash');
  var comboFlashN = $('#combo-flash-n');
  var comboN = $('#combo-n');
  var xpBank = $('#xp-bank');
  var xpBankNum = $('#xp-bank-num');
  var xpBankBar = $('#xp-bank-bar');
  var xpBankDelta = $('#xp-bank-delta');

  function pad(n){ return n < 10 ? '0'+n : ''+n; }
  function fmtTime(s){
    s = Math.max(0, s|0);
    var h = (s/3600)|0; s -= h*3600;
    var m = (s/60)|0;   s -= m*60;
    return pad(h)+':'+pad(m)+':'+pad(s);
  }
  function isEmpty(a){
    if (a === undefined || a === null) return true;
    if (Array.isArray(a)) return a.length === 0;
    if (typeof a === 'object') return Object.keys(a).length === 0;
    if (typeof a === 'string') return a.trim().length === 0;
    return false;
  }
  function statusOf(i){
    if (i === state.cur) return 'is-current';
    if (state.ans[i] !== undefined && !isEmpty(state.ans[i])) return 'is-answered';
    if (state.postponed.has(i)) return 'is-postponed';
    return 'is-pending';
  }
  function nFmt(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  /* FEEDBACK ---------------------------------------------------- */
  function showToast(msg, xp){
    toastTxt.textContent = msg;
    if (xp){ toastXp.textContent = '+' + xp + ' XP'; toastXp.style.display = 'inline'; }
    else { toastXp.style.display = 'none'; }
    toast.classList.add('is-on');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ toast.classList.remove('is-on'); }, 1700);
  }
  function popXp(anchor, amount){
    var rect = anchor.getBoundingClientRect();
    var cardRect = qcard.getBoundingClientRect();
    var el = document.createElement('div');
    el.className = 'xp-pop';
    el.textContent = amount + ' XP';
    el.style.left = (rect.right - cardRect.left - 80) + 'px';
    el.style.top  = (rect.top - cardRect.top + rect.height/2 - 10) + 'px';
    qcard.appendChild(el);
    setTimeout(function(){ el.remove(); }, 1300);
  }
  function spawnParticles(anchor, n){
    var rect = anchor.getBoundingClientRect();
    var cardRect = qcard.getBoundingClientRect();
    var cx = rect.left - cardRect.left + 24;
    var cy = rect.top  - cardRect.top  + rect.height/2;
    for (var i = 0; i < n; i++){
      var p = document.createElement('div');
      p.className = 'particle';
      var angle = (Math.PI * (1.2 + Math.random() * .6)) * -1; // upper-left fan
      var dist = 60 + Math.random() * 70;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      p.style.left = cx + 'px';
      p.style.top  = cy + 'px';
      p.style.background = ['#fbbf24','#f59e0b','#fde68a','#34d399'][i % 4];
      p.style.boxShadow = '0 0 10px currentColor';
      p.style.color = p.style.background;
      qcard.appendChild(p);
      p.animate(
        [
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.4)', opacity: 0 }
        ],
        { duration: 700 + Math.random()*250, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
      ).onfinish = function(){ p.remove(); };
    }
  }
  function ripple(anchor, e){
    var rect = anchor.getBoundingClientRect();
    var x = (e && e.clientX) ? e.clientX - rect.left : rect.width / 2;
    var y = (e && e.clientY) ? e.clientY - rect.top  : rect.height / 2;
    var r = document.createElement('span');
    r.className = 'opt-ripple';
    r.style.left = x + 'px';
    r.style.top  = y + 'px';
    r.style.width = r.style.height = Math.max(rect.width, rect.height) * 0.6 + 'px';
    anchor.appendChild(r);
    setTimeout(function(){ r.remove(); }, 560);
  }
  function bumpRing(){
    lvlRing.classList.remove('is-bumped');
    void lvlRing.offsetWidth;
    lvlRing.classList.add('is-bumped');
  }
  function flashCombo(n){
    comboFlashN.textContent = '×' + n;
    comboFlash.classList.add('is-on');
    setTimeout(function(){ comboFlash.classList.remove('is-on'); }, 950);
  }
  function awardXp(amount, anchor){
    state.xp += amount;
    playerXpEl.textContent = nFmt(state.xp);
    var pct = Math.min(100, Math.round((state.xp / state.xpToNext) * 100));
    lvlRing.style.setProperty('--xp', pct);
    bumpRing();
    if (anchor){ popXp(anchor, amount); spawnParticles(anchor, 8); flyCoin(anchor); }
    addToBank(amount);
  }

  /* XP BANK ------------------------------------------------ */
  function addToBank(amount){
    var from = state.sessionXp;
    var to = state.sessionXp + amount;
    state.sessionXp = to;

    // delta chip
    if (xpBankDelta){
      xpBankDelta.textContent = '+' + amount + ' XP';
      xpBankDelta.classList.add('is-on');
      clearTimeout(addToBank._t);
      addToBank._t = setTimeout(function(){ xpBankDelta.classList.remove('is-on'); }, 1500);
    }
    // bar
    var pct = Math.min(100, Math.round((to / state.sessionGoal) * 100));
    xpBankBar.style.width = pct + '%';

    // numeric tick
    tickNumber(xpBankNum, from, to, 700);
    xpBankNum.classList.remove('is-bumped');
    void xpBankNum.offsetWidth;
    xpBankNum.classList.add('is-bumped');
    setTimeout(function(){ xpBankNum.classList.remove('is-bumped'); }, 220);
  }
  function tickNumber(el, from, to, dur){
    var start = performance.now();
    function frame(now){
      var t = Math.min(1, (now - start) / dur);
      // easeOutCubic
      var k = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * k);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = to;
    }
    requestAnimationFrame(frame);
  }
  function flyCoin(anchor){
    var bankRect = xpBank.getBoundingClientRect();
    var anchorRect = anchor.getBoundingClientRect();
    var startX = anchorRect.left + anchorRect.width * 0.5;
    var startY = anchorRect.top  + anchorRect.height * 0.5;
    // land near the XP number
    var endX = bankRect.left + 26;
    var endY = bankRect.top  + 70;

    var coin = document.createElement('div');
    coin.className = 'xp-coin';
    coin.style.left = (startX - 8) + 'px';
    coin.style.top  = (startY - 8) + 'px';
    document.body.appendChild(coin);

    // arc via mid-point
    var midX = (startX + endX) / 2 + (Math.random() * 40 - 20);
    var midY = Math.min(startY, endY) - 60;

    coin.animate(
      [
        { transform: 'translate(0,0) scale(1)', offset: 0, opacity: 1 },
        { transform: 'translate(' + (midX - startX) + 'px,' + (midY - startY) + 'px) scale(1.05)', offset: 0.5, opacity: 1 },
        { transform: 'translate(' + (endX - startX) + 'px,' + (endY - startY) + 'px) scale(.55)', offset: 1, opacity: .9 }
      ],
      { duration: 650, easing: 'cubic-bezier(.5,.1,.3,1)', fill: 'forwards' }
    ).onfinish = function(){
      coin.remove();
      // ping the bank on arrival
      xpBankNum.classList.remove('is-bumped');
      void xpBankNum.offsetWidth;
      xpBankNum.classList.add('is-bumped');
      setTimeout(function(){ xpBankNum.classList.remove('is-bumped'); }, 220);
    };
  }
  function bumpCombo(){
    state.combo++;
    comboN.textContent = state.combo;
    psCombo.textContent = state.combo;
    if (state.combo > 0 && state.combo % 5 === 0) flashCombo(state.combo);
  }

  /* GRID ---------------------------------------------------- */
  function renderGrid(){
    grid.innerHTML = '';
    for (var i = 0; i < Q.length; i++){
      var b = document.createElement('button');
      b.className = 'qchip ' + statusOf(i);
      b.type = 'button';
      b.textContent = (i+1);
      b.setAttribute('data-i', i);
      b.setAttribute('aria-label', 'Задание ' + (i+1));
      b.addEventListener('click', onChip);
      grid.appendChild(b);
    }
    gridNow.textContent = state.cur + 1;
  }
  function onChip(){
    var i = +this.getAttribute('data-i');
    var n = i + 1;
    if (window.fireMilestone && (n === 5 || n === 10 || n === 15 || n === 20)){
      window.fireMilestone(n);
    }
    goTo(i);
  }
  function updateProgress(){
    var answered = 0;
    for (var i = 0; i < Q.length; i++){
      if (state.ans[i] !== undefined && !isEmpty(state.ans[i])) answered++;
    }
    var pct = Math.max(5, (answered / Q.length) * 100);
    fillEl.style.width = pct + '%';
    psDone.textContent = answered;
  }

  /* TIMER ---------------------------------------------------- */
  function tick(){
    state.remaining = Math.max(0, state.remaining - 1);
    timerTxt.textContent = fmtTime(state.remaining);
    timerEl.classList.remove('warn','danger');
    if (state.remaining <= 300) timerEl.classList.add('danger');
    else if (state.remaining <= 900) timerEl.classList.add('warn');
    if (state.remaining === 0) openModal('#modal-finish');
  }

  /* QUESTION RENDER ---------------------------------------------------- */
  function renderQuestion(){
    state.visited.add(state.cur);
    var q = Q[state.cur];
    var kindLabel = ({
      'single':        'один ответ',
      'multi':         'несколько ответов',
      'match':         'соответствие',
      'sequence':      'последовательность',
      'short':         'краткий ответ',
      'extended':      'развёрнутый ответ',
      'image-single':  'один ответ · рисунок',
      'table-multi':   'несколько ответов · таблица'
    })[q.kind] || 'задание';

    qcard.setAttribute('data-no', pad(state.cur + 1));

    var html = ''
      + '<div class="qhead">'
      +   '<div class="qmeta">'
      +     '<span class="qmeta-tag"><span class="dot"></span>Задание ' + (state.cur+1) + ' / ' + Q.length + '</span>'
      +     '<span class="qmeta-tag kind">' + kindLabel + '</span>'
      +   '</div>'
      +   '<button class="postpone-btn' + (state.postponed.has(state.cur) ? ' is-on' : '') + '" id="btn-postpone">'
      +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
      +     (state.postponed.has(state.cur) ? 'Снять отметку' : 'Отложить')
      +   '</button>'
      + '</div>'
      + '<h1 class="qtitle">' + q.title + '</h1>'
      + '<div class="qbody">' + q.body + '</div>';

    if (q.kind === 'single' || q.kind === 'image-single'){
      if (q.kind === 'image-single' && q.imageLabel){
        html += '<div class="qimage">' + q.imageLabel + '</div>';
      }
      html += renderSingle(q);
    } else if (q.kind === 'multi' || q.kind === 'table-multi'){
      if (q.kind === 'table-multi' && q.table){
        html += renderTable(q.table);
      }
      html += renderMulti(q);
    } else if (q.kind === 'match'){
      html += renderMatch(q);
    } else if (q.kind === 'sequence'){
      html += renderSequence(q);
    } else if (q.kind === 'short'){
      html += renderShort(q);
    } else if (q.kind === 'extended'){
      html += renderExtended(q);
    }

    html += ''
      + '<div class="qfoot">'
      +   '<button class="qbtn ghost" id="btn-prev"' + (state.cur === 0 ? ' disabled' : '') + '>'
      +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
      +     'Назад'
      +   '</button>'
      +   '<button class="qbtn primary" id="btn-next">'
      +     (state.cur === Q.length - 1 ? 'К завершению' : 'Следующее')
      +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
      +   '</button>'
      + '</div>';

    qcard.innerHTML = html;
    wire();
  }

  function renderSingle(q){
    var picked = state.ans[state.cur];
    var s = '<div class="options">';
    for (var i = 0; i < q.options.length; i++){
      var sel = (picked === i);
      s += '<button class="opt' + (sel ? ' is-selected' : '') + '" data-opt="'+i+'" type="button">'
        +   '<span class="opt-letter">' + (LETTERS[i] || (i+1)) + '</span>'
        +   '<span class="opt-text">' + q.options[i] + '</span>'
        +   '<span class="opt-check"></span>'
        + '</button>';
    }
    s += '</div>';
    return s;
  }
  function renderMulti(q){
    var picked = state.ans[state.cur] || [];
    var s = '<div class="options">';
    for (var i = 0; i < q.options.length; i++){
      var sel = picked.indexOf(i) !== -1;
      s += '<button class="opt is-multi' + (sel ? ' is-selected' : '') + '" data-mopt="'+i+'" type="button">'
        +   '<span class="opt-letter">' + (LETTERS[i] || (i+1)) + '</span>'
        +   '<span class="opt-text">' + q.options[i] + '</span>'
        +   '<span class="opt-check"></span>'
        + '</button>';
    }
    s += '</div>';
    return s;
  }
  function renderMatch(q){
    var picked = state.ans[state.cur] || {};
    var s = '<div class="match-grid">';
    for (var i = 0; i < q.prompts.length; i++){
      var p = q.prompts[i];
      var val = picked[p.lbl] || '';
      s += '<div class="match-row">'
        +   '<div class="match-prompt">'
        +     '<span class="lbl">'+p.lbl+'</span>'
        +     '<span class="txt">'+p.text+'</span>'
        +   '</div>'
        +   '<select class="match-select' + (val ? ' has-value' : '') + '" data-match="'+p.lbl+'">'
        +     '<option value="">—</option>';
      for (var j = 0; j < q.pool.length; j++){
        var k = q.pool[j].key;
        s += '<option value="'+k+'"' + (val === k ? ' selected' : '') + '>'+k+'</option>';
      }
      s += '</select></div>';
    }
    s += '</div>';
    s += '<div class="match-options">'
      +   '<div class="match-options-h">' + (q.poolHead || 'Варианты') + '</div>'
      +   '<div class="match-options-list">';
    for (var k = 0; k < q.pool.length; k++){
      s += '<div class="mol"><span class="key">'+q.pool[k].key+'</span><span>'+q.pool[k].text+'</span></div>';
    }
    s += '</div></div>';
    return s;
  }
  function renderSequence(q){
    var picked = state.ans[state.cur] || [];
    var s = '<div class="match-grid">';
    for (var i = 0; i < q.items.length; i++){
      var val = picked[i] || '';
      s += '<div class="match-row">'
        +   '<div class="match-prompt">'
        +     '<span class="lbl">' + (i+1) + '</span>'
        +     '<span class="txt" style="font-weight:600;">место №' + (i+1) + ' в последовательности</span>'
        +   '</div>'
        +   '<select class="match-select' + (val ? ' has-value' : '') + '" data-seq="'+i+'">'
        +     '<option value="">—</option>';
      for (var j = 0; j < q.items.length; j++){
        s += '<option value="'+(j+1)+'"' + (val === String(j+1) ? ' selected' : '') + '>'+(j+1)+'</option>';
      }
      s += '</select></div>';
    }
    s += '</div>';
    s += '<div class="match-options">'
      +   '<div class="match-options-h">Этапы (расставьте по порядку)</div>'
      +   '<div class="match-options-list">';
    for (var k = 0; k < q.items.length; k++){
      s += '<div class="mol"><span class="key">'+(k+1)+'</span><span>'+q.items[k]+'</span></div>';
    }
    s += '</div></div>';
    return s;
  }
  function renderShort(q){
    var val = state.ans[state.cur] || '';
    return '<div class="short-row">'
      +   '<input class="short-input" id="short-input" type="text" placeholder="'+(q.placeholder||'')+'" value="'+escAttr(val)+'" />'
      +   '<span class="short-hint">'+(q.hint||'')+'</span>'
      + '</div>';
  }
  function renderExtended(q){
    var val = state.ans[state.cur] || '';
    return '<div class="extended-wrap">'
      +   '<textarea class="extended-input" id="extended-input" placeholder="'+escAttr(q.placeholder||'')+'">'+escHtml(val)+'</textarea>'
      +   '<div class="extended-meta"><span>Свободная форма · черновик сохраняется автоматически</span><span><b id="ext-count">'+val.length+'</b> / 2000</span></div>'
      + '</div>';
  }
  function renderTable(t){
    var s = '<div class="qtable"><table><thead><tr>';
    for (var i = 0; i < t.head.length; i++) s += '<th>'+t.head[i]+'</th>';
    s += '</tr></thead><tbody>';
    for (var r = 0; r < t.rows.length; r++){
      s += '<tr>';
      for (var c = 0; c < t.rows[r].length; c++){
        s += '<td class="'+(c>0?'num':'')+'">'+t.rows[r][c]+'</td>';
      }
      s += '</tr>';
    }
    s += '</tbody></table></div>';
    return s;
  }
  function escHtml(s){ return String(s).replace(/[&<>]/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]; }); }
  function escAttr(s){ return String(s).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'})[c]; }); }

  /* WIRING ---------------------------------------------------- */
  function wire(){
    var bp = $('#btn-postpone'); if (bp) bp.addEventListener('click', togglePostpone);
    var bn = $('#btn-next'); if (bn) bn.addEventListener('click', next);
    var bv = $('#btn-prev'); if (bv && !bv.disabled) bv.addEventListener('click', prev);

    // single
    qcard.querySelectorAll('[data-opt]').forEach(function(el){
      el.addEventListener('click', function(e){
        ripple(el, e);
        var i = +el.getAttribute('data-opt');
        var first = state.ans[state.cur] === undefined;
        state.ans[state.cur] = i;
        state.postponed.delete(state.cur);
        qcard.querySelectorAll('.opt').forEach(function(o){ o.classList.remove('is-selected'); });
        el.classList.add('is-selected');
        refreshChip();
        if (first){ awardXp(12, el); bumpCombo(); showToast('Ответ записан', 12); }
        else showToast('Ответ изменён');
      });
    });
    // multi
    qcard.querySelectorAll('[data-mopt]').forEach(function(el){
      el.addEventListener('click', function(e){
        ripple(el, e);
        var i = +el.getAttribute('data-mopt');
        var cur = (state.ans[state.cur] || []).slice();
        var first = cur.length === 0;
        var ix = cur.indexOf(i);
        if (ix === -1) cur.push(i); else cur.splice(ix,1);
        state.ans[state.cur] = cur;
        if (cur.length > 0) state.postponed.delete(state.cur);
        el.classList.toggle('is-selected');
        refreshChip();
        if (first && cur.length > 0){ awardXp(8, el); bumpCombo(); showToast('Засчитан вариант', 8); }
      });
    });
    // match
    qcard.querySelectorAll('[data-match]').forEach(function(el){
      el.addEventListener('change', function(){
        var lbl = el.getAttribute('data-match');
        var cur = Object.assign({}, state.ans[state.cur] || {});
        var first = Object.keys(cur).length === 0;
        if (el.value === '') delete cur[lbl]; else cur[lbl] = el.value;
        state.ans[state.cur] = cur;
        if (Object.keys(cur).length > 0) state.postponed.delete(state.cur);
        el.classList.toggle('has-value', !!el.value);
        refreshChip();
        if (first && el.value){ awardXp(6, el); bumpCombo(); showToast('Сопоставление сохранено', 6); }
      });
    });
    // sequence
    qcard.querySelectorAll('[data-seq]').forEach(function(el){
      el.addEventListener('change', function(){
        var i = +el.getAttribute('data-seq');
        var cur = (state.ans[state.cur] || []).slice();
        var first = !cur.some(function(v){return !!v;});
        cur[i] = el.value;
        state.ans[state.cur] = cur;
        if (cur.some(function(v){return !!v;})) state.postponed.delete(state.cur);
        el.classList.toggle('has-value', !!el.value);
        refreshChip();
        if (first && el.value){ awardXp(6, el); bumpCombo(); showToast('Позиция сохранена', 6); }
      });
    });
    // short
    var sh = $('#short-input');
    if (sh){
      var firstShort = !state.ans[state.cur];
      sh.addEventListener('input', function(){
        state.ans[state.cur] = sh.value;
        if (sh.value.trim()) state.postponed.delete(state.cur);
        refreshChip();
      });
      sh.addEventListener('blur', function(){
        if (sh.value.trim() && firstShort){
          awardXp(10, sh); bumpCombo(); showToast('Ответ сохранён', 10);
          firstShort = false;
        }
      });
    }
    // extended
    var ext = $('#extended-input');
    if (ext){
      var cnt = $('#ext-count');
      var firstExt = !state.ans[state.cur];
      ext.addEventListener('input', function(){
        if (ext.value.length > 2000) ext.value = ext.value.slice(0,2000);
        state.ans[state.cur] = ext.value;
        if (ext.value.trim()) state.postponed.delete(state.cur);
        if (cnt) cnt.textContent = ext.value.length;
        refreshChip();
      });
      ext.addEventListener('blur', function(){
        if (ext.value.trim() && firstExt){
          awardXp(18, ext); bumpCombo(); showToast('Развёрнутый ответ сохранён', 18);
          firstExt = false;
        }
      });
    }
  }

  function refreshChip(){
    var chip = grid.querySelector('[data-i="'+state.cur+'"]');
    if (chip) chip.className = 'qchip ' + statusOf(state.cur);
    updateProgress();
  }
  function togglePostpone(){
    if (state.postponed.has(state.cur)){ state.postponed.delete(state.cur); showToast('Отметка снята'); }
    else { state.postponed.add(state.cur); showToast('Задание отложено'); }
    renderGrid(); renderQuestion();
  }
  function next(){
    if (state.cur < Q.length - 1) animateTo(function(){ goTo(state.cur + 1); });
    else { refreshFinishStats(); openModal('#modal-finish'); }
  }
  function prev(){ if (state.cur > 0) animateTo(function(){ goTo(state.cur - 1); }); }
  function animateTo(cb){
    qcard.classList.add('is-leaving');
    setTimeout(function(){
      cb();
      qcard.classList.add('is-entering');
      void qcard.offsetWidth;
      qcard.classList.remove('is-leaving','is-entering');
    }, 200);
  }
  function goTo(i){
    state.cur = i;
    state.visited.add(i);
    renderGrid();
    renderQuestion();
    updateProgress();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  /* MODALS ---------------------------------------------------- */
  function openModal(sel){ var m = $(sel); if (m) m.classList.add('is-open'); }
  function closeModal(m){ m.classList.remove('is-open'); }
  document.querySelectorAll('.modal-scrim').forEach(function(scrim){
    scrim.addEventListener('click', function(e){ if (e.target === scrim) closeModal(scrim); });
    scrim.querySelectorAll('[data-close]').forEach(function(b){
      b.addEventListener('click', function(){ closeModal(scrim); });
    });
  });
  $('#btn-abort').addEventListener('click', function(){ openModal('#modal-abort'); });
  $('#confirm-abort').addEventListener('click', function(){ closeModal($('#modal-abort')); showToast('Тест прерван (демо)'); });
  $('#btn-finish').addEventListener('click', function(){ refreshFinishStats(); openModal('#modal-finish'); });
  $('#confirm-finish').addEventListener('click', function(){
    closeModal($('#modal-finish'));
    showToast('Тест завершён · переход к разбору', Math.round(state.xp * .1));
  });
  function refreshFinishStats(){
    var answered = 0, postponedReal = 0;
    for (var i = 0; i < Q.length; i++){
      if (state.ans[i] !== undefined && !isEmpty(state.ans[i])) answered++;
    }
    state.postponed.forEach(function(i){
      if (state.ans[i] === undefined || isEmpty(state.ans[i])) postponedReal++;
    });
    var pending = Q.length - answered - postponedReal;
    $('#mf-answered').textContent = answered;
    $('#mf-postponed').textContent = postponedReal;
    $('#mf-pending').textContent = pending;
  }

  /* KEYBOARD ---------------------------------------------------- */
  document.addEventListener('keydown', function(e){
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return;
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Escape') document.querySelectorAll('.modal-scrim.is-open').forEach(closeModal);
    else {
      // A B C D shortcuts for single-answer
      var q = Q[state.cur];
      if (q.kind === 'single' || q.kind === 'image-single'){
        var k = e.key.toUpperCase();
        var idx = LETTERS.indexOf(k);
        if (idx === -1 && e.key >= '1' && e.key <= '9') idx = +e.key - 1;
        if (idx >= 0 && idx < q.options.length){
          var opt = qcard.querySelector('[data-opt="'+idx+'"]');
          if (opt) opt.click();
        }
      }
    }
  });

  /* BOOT ---------------------------------------------------- */
  timerTxt.textContent = fmtTime(state.remaining);
  renderGrid();
  renderQuestion();
  updateProgress();
  setInterval(tick, 1000);
})();
