/* global React */
// IQMO School — landing components
// All components live in one Babel script so they share scope cleanly.
// The exported Landing component renders the entire one-page site.
// It receives all tweak values; the parent renders Landing twice
// (desktop / mobile) in a design canvas with shared tweaks.

// ── Icons ─────────────────────────────────────────────────────────────
const Ic = {
  bolt:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"/></svg>,
  flame:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-4 0-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  star:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6-5.4-2.9L6.6 19.8l1-6L3.2 9.5l6.1-.9L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  check:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x:       <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg>,
  play:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8L7 4Z"/></svg>,
  arrow:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  money:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7h16v10H4z M8 12h8 M12 9v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  clock:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  ghost:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12a7 7 0 1 1 14 0v9l-3-2-2 2-2-2-2 2-2-2-3 2v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="15" cy="11" r="1" fill="currentColor"/></svg>,
  hourglass:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 3h12 M6 21h12 M7 3c0 5 5 5 5 9s-5 4-5 9 M17 3c0 5-5 5-5 9s5 4 5 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  controller:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="11" rx="5" stroke="currentColor" strokeWidth="1.7"/><path d="M7 12h3 M8.5 10.5v3 M15 12h.01 M17.5 13.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  trophy:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z M5 5h2v3a2 2 0 0 1-2-2V5Z M19 5h-2v3a2 2 0 0 0 2-2V5Z M9 20h6 M12 14v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  brain:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 4 3 3 0 0 0 4 3V4Z M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 4 3 3 0 0 1-4 3V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  spark:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5 18 18 M18 6l-2.5 2.5 M8.5 15.5 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  chart:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 19h16 M7 16V9 M12 16V5 M17 16v-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  shield:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3 4 6v6c0 4 3 7 8 9 5-2 8-5 8-9V6l-8-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  layers:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 18l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
};

// ── Mascot: friendly tiny owl/orb (geometric, not stock) ──────────────
function Mascot({ size = 64, mood = 'happy' }) {
  return (
    <svg className="iqmo-mascot" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)"/>
          <stop offset="100%" stopColor="var(--accent-3)"/>
        </linearGradient>
        <radialGradient id="mg2" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <circle cx="32" cy="34" r="26" fill="url(#mg)"/>
      <circle cx="32" cy="34" r="26" fill="url(#mg2)"/>
      {/* ear tufts */}
      <path d="M12 18 L18 28 L22 18 Z" fill="url(#mg)" opacity=".9"/>
      <path d="M52 18 L46 28 L42 18 Z" fill="url(#mg)" opacity=".9"/>
      {/* eyes */}
      <circle cx="24" cy="32" r="7" fill="#fff"/>
      <circle cx="40" cy="32" r="7" fill="#fff"/>
      <circle cx="25" cy="33" r="3.2" fill="#0a0420"/>
      <circle cx="41" cy="33" r="3.2" fill="#0a0420"/>
      <circle cx="26" cy="32" r="1.1" fill="#fff"/>
      <circle cx="42" cy="32" r="1.1" fill="#fff"/>
      {/* beak */}
      <path d="M30 41 L34 41 L32 45 Z" fill="#F4B731"/>
      {/* smile / cheek */}
      {mood === 'happy' && <path d="M28 48 q4 3 8 0" stroke="rgba(255,255,255,.75)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>}
    </svg>
  );
}

// ── UI atoms ──────────────────────────────────────────────────────────
function Pill({ children, tone = 'accent', style }) {
  const tones = {
    accent:  { bg: 'color-mix(in oklab, var(--accent) 14%, transparent)',  fg: 'var(--accent)' },
    success: { bg: 'color-mix(in oklab, var(--success) 16%, transparent)', fg: 'var(--success)' },
    warn:    { bg: 'color-mix(in oklab, var(--warn) 18%, transparent)',    fg: 'var(--warn)' },
    ink:     { bg: 'var(--bg-soft)',                                       fg: 'var(--ink-2)' },
    glass:   { bg: 'rgba(255,255,255,.08)',                                fg: '#fff' },
  };
  const t = tones[tone] || tones.accent;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 12, fontWeight: 700, letterSpacing: '-0.005em',
      ...style,
    }}>{children}</span>
  );
}

function ProgressBar({ value, label, color = 'var(--accent)', height = 10, showValue = true }) {
  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>
          {label && <span>{label}</span>}
          {showValue && <span style={{ color: 'var(--ink-2)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{value}%</span>}
        </div>
      )}
      <div style={{ height, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          width: `${value}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}, color-mix(in oklab, ${color} 60%, var(--accent-3)))`,
          borderRadius: 999,
          boxShadow: `0 0 12px color-mix(in oklab, ${color} 50%, transparent)`,
        }}/>
      </div>
    </div>
  );
}

// ── Dashboard hero mockup ─────────────────────────────────────────────
// A tilted device with a layered IQMO dashboard. Built as a plain
// "phone window" with task UI inside — feels like a real product screen.
function DashboardMock({ narrow = false }) {
  return (
    <div className="device-wrap" style={{ width: '100%', maxWidth: narrow ? 360 : 560, position: 'relative' }}>
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: -40,
        background: 'radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)',
        filter: 'blur(20px)',
        zIndex: 0,
      }}/>

      {/* main app window */}
      <div className="device" style={{
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(180deg, #ffffff 0%, color-mix(in oklab, var(--accent) 4%, #ffffff) 100%)',
        borderRadius: 28,
        border: '1px solid var(--hairline)',
        boxShadow: '0 30px 80px -20px rgba(40,30,90,.35), 0 12px 30px -10px rgba(40,30,90,.18), inset 0 1px 0 rgba(255,255,255,.6)',
        padding: 16,
        transform: narrow ? 'none' : 'rotate(-1.2deg)',
        display: 'grid', gap: 12,
      }}>
        {/* window chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 4px' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 50, background: '#ff5f56' }}/>
            <span style={{ width: 9, height: 9, borderRadius: 50, background: '#ffbd2e' }}/>
            <span style={{ width: 9, height: 9, borderRadius: 50, background: '#27c93f' }}/>
          </div>
          <div style={{
            marginLeft: 'auto',
            fontSize: 11, color: 'var(--ink-4)',
            fontFamily: 'var(--font-mono)',
            background: 'var(--bg-soft)', padding: '3px 10px', borderRadius: 8,
            border: '1px solid var(--hairline)',
          }}>iqmoschool.ru · ОГЭ Математика</div>
        </div>

        {/* sidebar + body row */}
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '120px 1fr', gap: 12 }}>
          {/* sidebar */}
          {!narrow && (
            <aside style={{ display: 'grid', gap: 6, fontSize: 12 }}>
              {[
                ['Главная',    Ic.spark,    false],
                ['Задания',    Ic.bolt,     true],
                ['Прогресс',   Ic.chart,    false],
                ['Достижения', Ic.trophy,   false],
                ['Ошибки',     Ic.brain,    false],
              ].map(([label, icon, active]) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 10px', borderRadius: 10,
                  color: active ? 'var(--accent)' : 'var(--ink-3)',
                  background: active ? 'color-mix(in oklab, var(--accent) 10%, transparent)' : 'transparent',
                  fontWeight: active ? 700 : 500,
                }}>
                  <span style={{ display: 'inline-flex', width: 16, height: 16, opacity: active ? 1 : .8 }}>
                    {React.cloneElement(icon, { width: 16, height: 16 })}
                  </span>
                  {label}
                </div>
              ))}
            </aside>
          )}

          {/* main panel */}
          <div style={{ display: 'grid', gap: 10 }}>
            {/* greeting + xp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Mascot size={36}/>
              <div style={{ display: 'grid' }}>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>Привет, Лёша!</span>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.015em' }}>Уровень 12 · «Уравнения»</span>
              </div>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--warn)' }}>
                {React.cloneElement(Ic.flame, { width: 14, height: 14 })} 18 дней
              </span>
            </div>

            {/* XP progress card */}
            <div style={{ padding: 12, borderRadius: 14, background: 'var(--bg-soft)', border: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-3)', marginBottom: 6 }}>
                <span>XP до уровня 13</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>2 480 / 3 200</span>
              </div>
              <ProgressBar value={77} showValue={false} height={8} label={null}/>
            </div>

            {/* current task card */}
            <div style={{
              padding: 14, borderRadius: 16,
              background: '#fff',
              border: '1px solid var(--hairline)',
              boxShadow: '0 4px 14px rgba(40,30,90,.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Pill tone="accent" style={{ fontSize: 10, padding: '3px 8px' }}>Задание 14 · ОГЭ</Pill>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--ink-3)' }}>
                  {React.cloneElement(Ic.clock, { width: 13, height: 13 })} 02:14
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Решите уравнение: <span style={{ fontFamily: 'var(--font-mono)' }}>x² − 5x + 6 = 0</span>
              </p>
              <div style={{ display: 'grid', gap: 6 }}>
                {[
                  ['A', 'x = 1; x = 6',  false, false],
                  ['B', 'x = 2; x = 3',  true,  false],
                  ['C', 'x = −2; x = 3', false, false],
                  ['D', 'x = 0; x = 5',  false, true],
                ].map(([letter, text, correct, wrong]) => (
                  <div key={letter} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 10,
                    background: correct ? 'color-mix(in oklab, var(--success) 12%, transparent)'
                              : wrong   ? 'color-mix(in oklab, var(--danger) 8%, transparent)'
                              : 'var(--bg-soft)',
                    border: correct ? '1px solid color-mix(in oklab, var(--success) 35%, transparent)'
                          : wrong   ? '1px solid color-mix(in oklab, var(--danger) 25%, transparent)'
                          : '1px solid transparent',
                    fontSize: 12,
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 6,
                      background: correct ? 'var(--success)' : wrong ? 'var(--danger)' : 'var(--bg-card)',
                      color: (correct || wrong) ? '#fff' : 'var(--ink-3)',
                      display: 'grid', placeItems: 'center',
                      fontWeight: 700, fontSize: 10,
                      border: (correct || wrong) ? 'none' : '1px solid var(--hairline-2)',
                    }}>
                      {correct ? Ic.check : wrong ? Ic.x : letter}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-2)' }}>{text}</span>
                    {correct && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: 'var(--success)' }}>+45 XP</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                ['Решено', '247',  'var(--accent)'],
                ['Точность', '89%', 'var(--success)'],
                ['Серия', '18',    'var(--warn)'],
              ].map(([label, value, color]) => (
                <div key={label} style={{
                  padding: '10px 12px', borderRadius: 12,
                  background: 'var(--bg-soft)', border: '1px solid var(--hairline)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating achievement card */}
      <div className="float-card" style={{
        position: 'absolute',
        right: narrow ? -8 : -28, top: narrow ? 40 : 60,
        background: 'linear-gradient(160deg, #1c1340 0%, #3d1f8a 100%)',
        color: '#fff',
        borderRadius: 16,
        padding: '12px 14px',
        boxShadow: '0 18px 40px -10px rgba(40,30,90,.5)',
        zIndex: 2,
        transform: narrow ? 'rotate(2deg)' : 'rotate(3deg)',
        display: 'flex', alignItems: 'center', gap: 10,
        minWidth: 180,
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'linear-gradient(135deg, var(--accent-3), var(--warn))',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 4px 12px rgba(244,183,49,.5)',
        }}>{React.cloneElement(Ic.trophy, { width: 20, height: 20 })}</span>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>Новое достижение</div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>«Король уравнений»</div>
        </div>
      </div>

      {/* Floating streak chip */}
      <div className="float-card" style={{
        position: 'absolute',
        left: narrow ? -4 : -36, bottom: narrow ? -10 : 40,
        background: '#fff',
        color: 'var(--ink)',
        borderRadius: 14,
        padding: '10px 14px',
        boxShadow: '0 12px 28px -8px rgba(40,30,90,.25)',
        border: '1px solid var(--hairline)',
        zIndex: 2,
        transform: narrow ? 'rotate(-2deg)' : 'rotate(-4deg)',
        display: 'flex', alignItems: 'center', gap: 10,
        minWidth: 160,
      }}>
        <span style={{
          width: 30, height: 30, borderRadius: 10,
          background: 'color-mix(in oklab, var(--warn) 18%, transparent)',
          color: 'var(--warn)',
          display: 'grid', placeItems: 'center',
        }}>{React.cloneElement(Ic.flame, { width: 18, height: 18 })}</span>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Серия</div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em' }}>18 дней подряд</div>
        </div>
      </div>
    </div>
  );
}

window.IQMO_UI = { Ic, Mascot, Pill, ProgressBar, DashboardMock };
