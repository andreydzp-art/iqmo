/* global ym */
// Registration modal for /land — same flow as main site homepage.
(function () {
  const IQMO_METRIKA_ID = 108770166;
  const modal = document.getElementById('register-modal');
  if (!modal) return;

  const form = document.getElementById('register-form');
  const done = document.getElementById('register-done');
  const closeBtn = document.getElementById('register-close');
  const backdrop = modal.querySelector('.modal__backdrop');
  const stepLabel = document.getElementById('step-label');
  const stepDots = document.querySelectorAll('#step-bar .modal__step-dot');
  const nextBtn = document.getElementById('step-next');
  const backBtn = document.getElementById('step-back');
  const steps = form.querySelectorAll('.modal__step');
  let cur = 0;

  function trackCta(source) {
    const goal = source === 'sticky' ? 'cta_free_trial_sticky' : 'cta_free_trial';
    try {
      if (typeof ym === 'function') ym(IQMO_METRIKA_ID, 'reachGoal', goal);
    } catch (_) {}
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: goal });
    } catch (_) {}
  }

  function subjectHref() {
    const subj = document.querySelector('[data-choice="subject"] .choice.is-on');
    const val = subj && subj.getAttribute('data-val');
    return val === 'bio' ? '/subject-biology/' : '/subject-chemistry/';
  }

  function open(source) {
    if (source) trackCta(source);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    cur = 0;
    setStep(0);
    form.hidden = false;
    done.hidden = true;
    form.reset();
    document.querySelectorAll('[data-choice]').forEach((g) => {
      g.querySelectorAll('.choice').forEach((c) => c.classList.remove('is-on'));
    });
    document.querySelector('[data-choice="grade"] [data-val="9"]').classList.add('is-on');
    document.querySelector('[data-choice="subject"] [data-val="chem"]').classList.add('is-on');
    document.querySelector('[data-choice="goal"] [data-val="4"]').classList.add('is-on');
    setTimeout(() => document.getElementById('reg-name').focus(), 60);
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setStep(i) {
    cur = i;
    steps.forEach((s, idx) => {
      s.hidden = idx !== i;
    });
    stepDots.forEach((d, idx) => {
      d.classList.toggle('is-active', idx === i);
      d.classList.toggle('is-done', idx < i);
    });
    stepLabel.textContent = `Шаг ${i + 1} из ${steps.length}`;
    backBtn.hidden = i === 0;
    nextBtn.textContent = i === steps.length - 1 ? 'Создать аккаунт →' : 'Продолжить';
  }

  function setError(field, msg) {
    const wrap = field.closest('.field');
    wrap.classList.toggle('has-error', !!msg);
    wrap.querySelector('.field__err').textContent = msg || '';
  }

  function validateStep1() {
    let ok = true;
    const name = document.getElementById('reg-name');
    const email = document.getElementById('reg-email');
    const pass = document.getElementById('reg-pass');
    if (!name.value.trim()) {
      setError(name, 'Укажите имя');
      ok = false;
    } else setError(name, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, 'Похоже, email с опечаткой');
      ok = false;
    } else setError(email, '');
    if (pass.value.length < 6) {
      setError(pass, 'Минимум 6 символов');
      ok = false;
    } else setError(pass, '');
    return ok;
  }

  window.IQMO_OPEN_REGISTER = open;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-register]');
    if (!btn) return;
    e.preventDefault();
    const source = btn.getAttribute('data-cta-source') || 'cta';
    open(source);
  });

  form.querySelectorAll('[data-choice]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const c = e.target.closest('.choice');
      if (!c) return;
      group.querySelectorAll('.choice').forEach((x) => x.classList.remove('is-on'));
      c.classList.add('is-on');
    });
  });

  backBtn.addEventListener('click', () => {
    if (cur > 0) setStep(cur - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (cur === 0) {
      if (!validateStep1()) return;
      setStep(1);
      return;
    }
    form.hidden = true;
    done.hidden = false;
    const href = subjectHref();
    const link = document.getElementById('register-done-link');
    if (link) link.setAttribute('href', href);
    setTimeout(() => {
      try {
        window.location.href = href;
      } catch (_) {}
    }, 1100);
  });

  form.addEventListener('submit', (e) => e.preventDefault());
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
})();
