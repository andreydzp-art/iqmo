/* IQMO · Milestone fireworks
 * Срабатывает на каждое 5-е задание (5, 10, 15, 20).
 * Экспортирует window.fireMilestone(n).
 */
(function(global){
  'use strict';

  // Canvas/monument создаются в layout.install() ПОСЛЕ загрузки этого файла —
  // нельзя выходить из IIFE, если #fx-canvas ещё нет.
  var cv, ctx, dpr, particles, raf;
  var milestone, milestoneH, milestoneSub;
  var inited = false;

  function bindCanvas() {
    if (inited) return true;
    cv = document.getElementById('fx-canvas');
    if (!cv) return false;
    ctx = cv.getContext('2d');
    dpr = window.devicePixelRatio || 1;
    function resize(){
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    addEventListener('resize', resize);
    milestone = document.getElementById('milestone');
    milestoneH = document.getElementById('milestone-h');
    milestoneSub = document.getElementById('milestone-sub');
    inited = true;
    return true;
  }

  particles = [];
  raf = null;
  function loop(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (var i = particles.length - 1; i >= 0; i--){
      var p = particles[i];
      p.update();
      p.draw(ctx);
      if (!p.alive) particles.splice(i, 1);
    }
    if (particles.length) raf = requestAnimationFrame(loop);
    else raf = null;
  }
  function start(){ if (!raf) raf = requestAnimationFrame(loop); }

  // ---------- Milestone caption ----------
  function showMilestone(n){
    if (!bindCanvas()) return;
    var total = window.IQMO_RUNNER_TOTAL || 21;
    var meta = {
      5:  { h: 'Задание 5 из ' + total, sub: 'Пройдена <b>четверть варианта</b> — отличный темп!' },
      10: { h: 'Задание 10 из ' + total, sub: 'Уже <b>половина</b>. Продолжайте в том же духе.' },
      15: { h: 'Задание 15 из ' + total, sub: 'Три четверти позади. Финиш близко.' },
      20: { h: 'Задание 20 из ' + total, sub: 'Осталось <b>одно задание</b>. Финишная прямая!' }
    };
    var m = meta[n] || { h: 'Задание ' + n + ' из ' + total, sub: '' };
    if (milestoneH) milestoneH.textContent = m.h;
    if (milestoneSub) milestoneSub.innerHTML = m.sub;
    if (milestone){
      milestone.classList.add('is-on');
      clearTimeout(showMilestone._t);
      showMilestone._t = setTimeout(function(){ milestone.classList.remove('is-on'); }, 2400);
    }
  }

  // ---------- VARIANT 1: CONFETTI ----------
  function fxConfetti(){
    var COLORS = ['#c79330','#2f6bff','#1f9c6e','#f5cf6c','#e1a93f','#dbe5ff','#cde9da'];
    for (var i = 0; i < 160; i++){
      particles.push({
        x: Math.random() * innerWidth,
        y: -20 - Math.random() * 220,
        vx: (Math.random() - .5) * 2.5,
        vy: 2 + Math.random() * 3.5,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - .5) * .3,
        w: 7 + Math.random() * 7,
        h: 3 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1, alive: true,
        update: function(){
          this.x += this.vx; this.y += this.vy;
          this.vy += 0.05; this.vx *= 0.995;
          this.angle += this.vAngle;
          if (this.y > innerHeight + 50) this.alive = false;
          this.life -= 0.0015;
          if (this.life < 0) this.alive = false;
        },
        draw: function(c){
          c.save();
          c.translate(this.x, this.y);
          c.rotate(this.angle);
          c.globalAlpha = Math.max(0, Math.min(1, this.life));
          c.fillStyle = this.color;
          c.fillRect(-this.w/2, -this.h/2, this.w, this.h);
          c.restore();
        }
      });
    }
    start();
  }

  // ---------- VARIANT 2: LIGHT RAYS ----------
  function fxRays(){
    var cx = innerWidth / 2, cy = innerHeight / 2;
    var COLORS = ['#e1a93f', '#f5cf6c', '#c79330', '#fff8e2', '#2f6bff'];
    var rayCount = 14;
    var maxLen = Math.max(innerWidth, innerHeight) * 0.75;

    particles.push({
      x: cx, y: cy, r0: 0,
      life: 1, alive: true,
      update: function(){ this.r0 += 3; this.life -= 0.013; if (this.life < 0) this.alive = false; },
      draw: function(c){
        var R = 70 + this.r0 * 0.6;
        var grd = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, R);
        grd.addColorStop(0,   'rgba(255, 247, 212, ' + (this.life * .95) + ')');
        grd.addColorStop(.35, 'rgba(245, 207, 108, ' + (this.life * .55) + ')');
        grd.addColorStop(1,   'rgba(225, 169, 63, 0)');
        c.fillStyle = grd;
        c.beginPath(); c.arc(this.x, this.y, R, 0, Math.PI*2); c.fill();
      }
    });

    for (var i = 0; i < rayCount; i++){
      var ang = (Math.PI * 2 * i / rayCount) + (Math.random() - .5) * 0.06;
      particles.push({
        x: cx, y: cy, ang: ang,
        len: 0,
        maxLen: maxLen * (.7 + Math.random() * .4),
        width: 22 + Math.random() * 18,
        speed: maxLen / (28 + Math.random() * 8),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1, alive: true,
        update: function(){
          this.len += this.speed;
          if (this.len > this.maxLen) this.life -= 0.025;
          else this.life -= 0.005;
          if (this.life < 0) this.alive = false;
        },
        draw: function(c){
          c.save();
          c.globalAlpha = Math.max(0, this.life) * .85;
          c.translate(this.x, this.y);
          c.rotate(this.ang);
          var grd = c.createLinearGradient(0, 0, this.len, 0);
          grd.addColorStop(0, this.color);
          grd.addColorStop(.5, this.color);
          grd.addColorStop(1, 'rgba(255,255,255,0)');
          c.fillStyle = grd;
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(this.len, -this.width / 2);
          c.lineTo(this.len, this.width / 2);
          c.closePath();
          c.fill();
          c.restore();
        }
      });
    }
    for (var k = 0; k < 16; k++){
      var sang = Math.random() * Math.PI * 2;
      var ssp  = 2.5 + Math.random() * 3.5;
      particles.push({
        x: cx + (Math.random() - .5) * 30,
        y: cy + (Math.random() - .5) * 30,
        vx: Math.cos(sang) * ssp, vy: Math.sin(sang) * ssp,
        r: 1.6 + Math.random() * 1.6,
        color: ['#fff7d4', '#f5cf6c', '#e1a93f'][k % 3],
        life: 1, alive: true,
        update: function(){
          this.x += this.vx; this.y += this.vy;
          this.vx *= 0.96; this.vy *= 0.96;
          this.life -= 0.018;
          if (this.life < 0) this.alive = false;
        },
        draw: function(c){
          c.save();
          c.globalAlpha = Math.max(0, this.life);
          c.fillStyle = this.color;
          c.shadowColor = this.color; c.shadowBlur = 10;
          c.beginPath(); c.arc(this.x, this.y, this.r, 0, Math.PI*2); c.fill();
          c.restore();
        }
      });
    }
    start();
  }

  // ---------- VARIANT 3: STARS ----------
  function fxStars(){
    var cx = innerWidth / 2, cy = innerHeight / 2;
    var COLORS = ['#e1a93f','#c79330','#f5cf6c','#2f6bff','#1f9c6e'];
    for (var i = 0; i < 32; i++){
      var ang = Math.random() * Math.PI * 2;
      var sp  = 4 + Math.random() * 7;
      particles.push({
        x: cx + (Math.random() - .5) * 30,
        y: cy + (Math.random() - .5) * 30,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 1.5,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - .5) * .15,
        size: 7 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1, alive: true,
        update: function(){
          this.x += this.vx; this.y += this.vy;
          this.vy += 0.08; this.vx *= 0.99;
          this.rot += this.vRot;
          this.life -= 0.012;
          if (this.life < 0) this.alive = false;
        },
        draw: function(c){
          c.save();
          c.translate(this.x, this.y);
          c.rotate(this.rot);
          c.globalAlpha = Math.max(0, this.life);
          c.fillStyle = this.color;
          c.shadowColor = this.color; c.shadowBlur = 6;
          drawStar(c, 0, 0, 5, this.size, this.size/2.4);
          c.restore();
        }
      });
    }
    start();
  }
  function drawStar(c, cx, cy, spikes, outer, inner){
    var rot = Math.PI / 2 * 3;
    var step = Math.PI / spikes;
    c.beginPath();
    c.moveTo(cx, cy - outer);
    for (var i = 0; i < spikes; i++){
      c.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
      rot += step;
      c.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
      rot += step;
    }
    c.lineTo(cx, cy - outer);
    c.closePath();
    c.fill();
  }

  // ---------- VARIANT 4: FIREWORK BURSTS ----------
  function fxBursts(){
    var positions = [
      { x: innerWidth * .25, y: innerHeight * .35, d: 0,    color: '#e1a93f' },
      { x: innerWidth * .70, y: innerHeight * .30, d: 280,  color: '#2f6bff' },
      { x: innerWidth * .45, y: innerHeight * .55, d: 520,  color: '#1f9c6e' },
      { x: innerWidth * .82, y: innerHeight * .60, d: 800,  color: '#c79330' }
    ];
    positions.forEach(function(pos){
      setTimeout(function(){ spawnFirework(pos.x, pos.y, pos.color); }, pos.d);
    });
  }
  function spawnFirework(cx, cy, mainColor){
    var n = 40;
    var alt = ['#e1a93f','#f5cf6c','#fff','#dbe5ff'];
    for (var i = 0; i < n; i++){
      var ang = (Math.PI * 2 * i) / n + Math.random() * .1;
      var sp = 3 + Math.random() * 4;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp,
        r: 1.6 + Math.random() * 1.6,
        color: Math.random() < .4 ? alt[Math.floor(Math.random()*alt.length)] : mainColor,
        trail: [],
        life: 1, alive: true,
        update: function(){
          this.trail.push({x: this.x, y: this.y});
          if (this.trail.length > 7) this.trail.shift();
          this.x += this.vx; this.y += this.vy;
          this.vx *= 0.97; this.vy *= 0.97;
          this.vy += 0.08;
          this.life -= 0.018;
          if (this.life < 0) this.alive = false;
        },
        draw: function(c){
          c.save();
          for (var t = 0; t < this.trail.length; t++){
            c.globalAlpha = (t / this.trail.length) * this.life * .35;
            c.fillStyle = this.color;
            c.beginPath(); c.arc(this.trail[t].x, this.trail[t].y, this.r * .6, 0, Math.PI*2); c.fill();
          }
          c.globalAlpha = Math.max(0, this.life);
          c.fillStyle = this.color;
          c.shadowColor = this.color; c.shadowBlur = 10;
          c.beginPath(); c.arc(this.x, this.y, this.r, 0, Math.PI*2); c.fill();
          c.restore();
        }
      });
    }
    start();
  }

  // ---------- PUBLIC ----------
  // 5 → конфетти, 10 → лучи, 15 → звёзды, 20 → салют (как в архиве)
  var FX_MAP = { 5: fxConfetti, 10: fxRays, 15: fxStars, 20: fxBursts };
  function fireMilestone(n) {
    if (!bindCanvas()) return;
    var fn = FX_MAP[n];
    if (!fn) return;
    fn();
    showMilestone(n);
  }
  global.fireMilestone = fireMilestone;
  global.IqmoTestRunnerFx = { init: bindCanvas, fire: fireMilestone };
})(typeof window !== 'undefined' ? window : global);
