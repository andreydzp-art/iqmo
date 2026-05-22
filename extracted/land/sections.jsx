/* global React */
// IQMO School — section components.
// Uses globals from ui.jsx: Ic, Mascot, Pill, ProgressBar, DashboardMock.

const { Ic, Mascot, Pill, ProgressBar, DashboardMock } = window.IQMO_UI;

// ── Nav ───────────────────────────────────────────────────────────────
function Nav({ narrow, onCta }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="logo">
          <span className="logo-mark">IQ</span>
          IQMO <span style={{ color: 'var(--ink-3)', fontWeight: 600 }}>School</span>
        </div>
        <div className="nav-links">
          <a href="#how">Как это работает</a>
          <a href="#compare">Сравнение</a>
          <a href="#price">Цена</a>
          <a href="#trust">Программа</a>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!narrow && (
            <a className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 14 }} href="/login.html">
              Войти
            </a>
          )}
          <button className="btn btn-accent" style={{ padding: '10px 16px', fontSize: 14 }} onClick={onCta}>
            Попробовать бесплатно
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── 1 · Hero ──────────────────────────────────────────────────────────
function Hero({ narrow, price, headline, onCta }) {
  return (
    <section className="section hero">
      <div className="hero-bg"/>
      <div className="wrap hero-grid">
        <div className="hero-content">
          <div className="price-pill" style={{ marginBottom: 6 }}>
            <span className="chip">−85%</span>
            <span><b className="strike">от 2 000 ₽</b> за урок репетитора</span>
          </div>

          <h1 className="display" style={{ marginTop: 18 }}>
            {headline.split('|').map((part, i) => (
              i === 1
                ? <span key={i} className="hl">{part}</span>
                : <React.Fragment key={i}>{part}</React.Fragment>
            ))}
          </h1>

          <p className="lead">
            Интерактивные задания, геймификация, система уровней и подготовка к&nbsp;ОГЭ,
            от&nbsp;которой ребёнок не&nbsp;может оторваться&nbsp;— как&nbsp;от хорошей игры.
          </p>

          <div className="hero-cta">
            <button type="button" className="btn btn-accent btn-lg" onClick={onCta}>
              Попробовать бесплатно {React.cloneElement(Ic.arrow, { width: 18, height: 18 })}
            </button>
            <a className="btn btn-ghost btn-lg" href="/express-chemistry.html">
              {React.cloneElement(Ic.play, { width: 14, height: 14 })} Посмотреть демо · 90&nbsp;сек
            </a>
          </div>

          <div className="hero-meta">
            <span className="hero-meta-item">
              <span style={{ display: 'inline-flex', color: 'var(--success)' }}>{React.cloneElement(Ic.check, { width: 14, height: 14 })}</span>
              Первая неделя — <strong>0 ₽</strong>
            </span>
            <span className="hero-meta-item">
              <span style={{ display: 'inline-flex', color: 'var(--success)' }}>{React.cloneElement(Ic.check, { width: 14, height: 14 })}</span>
              Без привязки карты
            </span>
            <span className="hero-meta-item">
              <span style={{ display: 'inline-flex', color: 'var(--success)' }}>{React.cloneElement(Ic.check, { width: 14, height: 14 })}</span>
              Отмена в&nbsp;один клик
            </span>
          </div>

          {/* Inline trust strip */}
          <div style={{
            marginTop: 36,
            display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap',
            paddingTop: 24, borderTop: '1px solid var(--hairline)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: -8 }}>
              {['#7C3AED', '#22D3EE', '#F472B6', '#10B981'].map((c, i) => (
                <span key={i} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${c}, color-mix(in oklab, ${c} 60%, #fff))`,
                  border: '2px solid var(--bg)',
                  marginLeft: i === 0 ? 0 : -10,
                  display: 'inline-block',
                  boxShadow: '0 2px 6px rgba(0,0,0,.08)',
                }}/>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.35 }}>
              <strong style={{ color: 'var(--ink)' }}>12&nbsp;400+ учеников</strong> уже готовятся к&nbsp;ОГЭ.<br/>
              Средний рост баллов&nbsp;— <strong style={{ color: 'var(--success)' }}>+2.4</strong> за&nbsp;3&nbsp;месяца.
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <DashboardMock narrow={narrow}/>
        </div>
      </div>
    </section>
  );
}

// ── 2 · Problem ───────────────────────────────────────────────────────
function Problem() {
  const items = [
    { icon: Ic.ghost,      title: 'Ребёнок не хочет заниматься',
      text: 'YouTube, TikTok, игры — что угодно, лишь бы не учебники. Знакомо?' },
    { icon: Ic.money,      title: 'Репетиторы дорогие',
      text: '2 000–4 000 ₽ за час. За 3 месяца до экзамена — это 60–120 тысяч.' },
    { icon: Ic.hourglass,  title: 'Подготовка хаотичная',
      text: 'Учебники, сайты, тесты, видео — всё разное. Нет системы и прогресса.' },
    { icon: Ic.clock,      title: 'Времени всё меньше',
      text: 'До ОГЭ остаётся 5–7 месяцев. А заниматься «по вечерам» уже не работает.' },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Знакомо?</span>
          <h2 className="title">Почему подготовка <span className="hl">пробуксовывает</span></h2>
          <p className="lead">
            Большинство родителей 8–9&nbsp;класса проходят через одно и&nbsp;то&nbsp;же. Дело не&nbsp;в ребёнке&nbsp;—
            дело в&nbsp;том, как устроен формат.
          </p>
        </div>
        <div className="problem-grid">
          {items.map((it, i) => (
            <div key={i} className="problem-card">
              <div className="glyph">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3 · Why IQMO is different ─────────────────────────────────────────
function WhyDifferent({ narrow }) {
  return (
    <section className="section section-soft" id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Платформа</span>
          <h2 className="title">Сделано как&nbsp;игра. Учит&nbsp;как&nbsp;школа.</h2>
          <p className="lead">
            Внутри&nbsp;— система уровней, опыта, ежедневных серий и&nbsp;достижений.
            Ребёнок сам открывает приложение&nbsp;— потому что хочет «допройти» тему.
          </p>
        </div>

        <div className="feature-grid">
          {/* Big featured tile */}
          <div className="feature-card tall" style={{
            background: 'linear-gradient(160deg, #0f0a26 0%, #1f1450 100%)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,.08)',
            minHeight: 360,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <Pill tone="glass">Геймификация</Pill>
            <h3 style={{ color: '#fff', fontSize: 28 }}>Каждое задание&nbsp;— это XP, уровень и&nbsp;разблокировка темы</h3>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 14 }}>
              Прогресс виден моментально. Серия из&nbsp;7&nbsp;дней даёт бустер.
              Сложные задачи&nbsp;— открываются после освоения базовых.
            </p>

            <div style={{ marginTop: 'auto', display: 'grid', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,.6)', marginBottom: 6 }}>
                  <span>Уровень 12 → 13</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>2 480 / 3 200 XP</span>
                </div>
                <div style={{ height: 10, background: 'rgba(255,255,255,.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    width: '77%', height: '100%',
                    background: 'linear-gradient(90deg, var(--accent), var(--accent-3))',
                    boxShadow: '0 0 16px color-mix(in oklab, var(--accent) 50%, transparent)',
                  }}/>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { ico: Ic.flame,   label: '18 дней',  color: 'var(--warn)' },
                  { ico: Ic.bolt,    label: '+340 XP',  color: 'var(--accent-2)' },
                  { ico: Ic.trophy,  label: '12 ачивок', color: 'var(--accent-3)' },
                ].map((c, i) => (
                  <div key={i} style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: 12,
                    color: '#fff', fontSize: 12, fontWeight: 600,
                  }}>
                    <span style={{ color: c.color, display: 'inline-flex' }}>
                      {React.cloneElement(c.ico, { width: 14, height: 14 })}
                    </span>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {[
            { badge: 'Мгновенно',  icon: Ic.spark,      title: 'Моментальная проверка',
              text: 'Ребёнок видит ошибку сразу, а не через неделю. Запоминается в 3 раза лучше.' },
            { badge: 'Разбор',     icon: Ic.brain,      title: 'Работа над ошибками',
              text: 'Каждая ошибка превращается в карточку. Алгоритм возвращает её, пока тема не закроется.' },
            { badge: 'Аналитика',  icon: Ic.chart,      title: 'Прогресс по темам',
              text: 'Видно, где «дыра» — алгебра, геометрия, реальная математика. Родитель видит то же.' },
            { badge: 'Адаптация',  icon: Ic.layers,     title: 'Уровни сложности',
              text: 'Сначала базовые задания, потом — настоящие задачи ОГЭ. Без скачков и фрустрации.' },
            { badge: 'Мобильно',   icon: Ic.controller, title: '15 минут — и всё',
              text: 'Короткие сессии вместо двухчасовых «уроков». В метро, перед сном, на перемене.' },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <span className="badge">{f.badge}</span>
              <div style={{ marginTop: 14, color: 'var(--accent)' }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4 · Comparison ────────────────────────────────────────────────────
function Comparison({ price }) {
  const tutorBad = [
    'От 2 000 до 4 000 ₽ за один час',
    'Качество зависит от конкретного преподавателя',
    'Сложно подобрать удобное время',
    'Скучный формат «как в школе»',
    'Только 1–2 раза в неделю',
    'Нет понятной аналитики прогресса',
  ];
  const usGood = [
    `Всего ${price} ₽ за неделю — безлимитно`,
    'Единая программа, выстроенная под ОГЭ',
    'Доступ 24/7: с телефона, ноутбука, планшета',
    'Геймификация — XP, уровни, ачивки, серии',
    'Можно заниматься хоть каждый день по 15 минут',
    'Подробная аналитика для ребёнка и родителя',
  ];
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Сравнение</span>
          <h2 className="title">Один час репетитора&nbsp;— или <span className="hl">целая неделя подготовки</span></h2>
          <p className="lead">Цифры говорят сами за себя.</p>
        </div>

        <div className="compare">
          <div className="compare-col tutor">
            <span className="tag">Репетитор</span>
            <h3>Классическое решение</h3>
            <div className="price-line">
              2 000–4 000 ₽ <span className="unit">/ один час</span>
            </div>
            <ul>
              {tutorBad.map((t, i) => (
                <li key={i}>
                  <span className="ic">{Ic.x}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="compare-col us">
            <span className="tag">IQMO School</span>
            <h3>Современная платформа</h3>
            <div className="price-line">
              {price} ₽ <span className="unit">/ неделя безлимитно</span>
            </div>
            <ul>
              {usGood.map((t, i) => (
                <li key={i}>
                  <span className="ic">{Ic.check}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{
              marginTop: 22,
              padding: '14px 16px',
              borderRadius: 14,
              background: 'color-mix(in oklab, var(--accent) 10%, transparent)',
              border: '1px dashed color-mix(in oklab, var(--accent) 40%, transparent)',
              fontSize: 14, color: 'var(--ink-2)',
            }}>
              За цену <b>одного</b> часа репетитора ребёнок получает{' '}
              <b style={{ color: 'var(--accent)' }}>7–14 недель</b> ежедневной подготовки на&nbsp;IQMO.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5 · How children actually use it ─────────────────────────────────
function HowUsed() {
  return (
    <section className="section section-soft">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Реальные сценарии</span>
          <h2 className="title">Так дети действительно <span className="hl">учатся</span></h2>
          <p className="lead">
            Не «сядь и&nbsp;готовься два часа», а&nbsp;несколько коротких сессий в&nbsp;день&nbsp;— между делом.
            И&nbsp;это работает.
          </p>
        </div>

        <div className="scenarios">
          <div className="scenario-card dark">
            <Pill tone="glass">21:47 · перед сном</Pill>
            <div>
              <p className="quote">«Ещё одно задание, и&nbsp;уровень дойдёт до&nbsp;13»</p>
              <p className="meta" style={{ marginTop: 10 }}>
                Ребёнок открывает приложение сам, чтобы добить серию.
                Это не&nbsp;«заставить учиться»&nbsp;— это привычка.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Pill tone="glass">🔥 серия 18 дней</Pill>
              <Pill tone="glass">⚡ +120 XP сегодня</Pill>
            </div>
          </div>

          <div className="scenario-card">
            <Pill tone="accent">07:42 · по дороге в школу</Pill>
            <div>
              <p className="quote">5&nbsp;задач из&nbsp;части&nbsp;1 за&nbsp;время автобуса</p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 10 }}>
                Короткие задания идеально влезают в&nbsp;15&nbsp;минут.
                Никакого «нужно сесть и&nbsp;собраться».
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Pill tone="success">+45 XP · правильно</Pill>
              <Pill tone="warn">+10 XP · разбор</Pill>
            </div>
          </div>

          <div className="scenario-card">
            <Pill tone="accent">19:10 · после школы</Pill>
            <div>
              <p className="quote">Раздел «Геометрия» открылся на&nbsp;72%</p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 10 }}>
                Видно, где «провал» по&nbsp;темам. Платформа сама подсовывает то, в&nbsp;чём ребёнок слаб.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <ProgressBar value={72} label="Геометрия" color="var(--accent)"/>
              <ProgressBar value={91} label="Алгебра"   color="var(--success)"/>
              <ProgressBar value={48} label="Реальная математика" color="var(--warn)"/>
            </div>
          </div>

          <div className="scenario-card dark">
            <Pill tone="glass">Суббота · 11:20</Pill>
            <div>
              <p className="quote">Соревнование с&nbsp;самим&nbsp;собой</p>
              <p className="meta" style={{ marginTop: 10 }}>
                Ребёнок видит свою прошлую неделю и&nbsp;пытается её&nbsp;побить.
                Никакого давления извне&nbsp;— только внутренний интерес.
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
              padding: 12, borderRadius: 12,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>Прошлая неделя</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>540 XP</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>Эта неделя</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--accent-2)' }}>720 XP <span style={{ fontSize: 12, color: 'var(--success)' }}>+33%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 6 · Trust / program ───────────────────────────────────────────────
function Trust() {
  return (
    <section className="section" id="trust">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Программа</span>
          <h2 className="title">Прямое попадание <span className="hl">в&nbsp;структуру&nbsp;ОГЭ</span></h2>
          <p className="lead">
            Программа собрана учителями математики и&nbsp;экспертами ФИПИ.
            Каждая задача&nbsp;— это формат, который реально встретится на&nbsp;экзамене.
          </p>
        </div>

        <div className="stats" style={{ marginBottom: 28 }}>
          <div className="stat"><span className="num">26</span><span className="lbl">типов задач ОГЭ</span></div>
          <div className="stat"><span className="num">3 800+</span><span className="lbl">задач в&nbsp;банке</span></div>
          <div className="stat"><span className="num">+2.4</span><span className="lbl">средний прирост баллов</span></div>
          <div className="stat"><span className="num">94%</span><span className="lbl">сдают на&nbsp;«4» и&nbsp;«5»</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }} className="trust-grid">
          {/* Program coverage card */}
          <div className="card" style={{ padding: 26 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
              <div>
                <h3 className="sub" style={{ marginBottom: 4 }}>Карта подготовки ОГЭ · Математика</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>Ребёнок видит, где он&nbsp;«просел», и&nbsp;куда идти дальше.</p>
              </div>
              <Pill tone="success">{React.cloneElement(Ic.check, { width: 12, height: 12 })} 18/26 тем</Pill>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {[
                ['Часть 1 · Алгебра',            91, 'var(--success)'],
                ['Часть 1 · Геометрия',          72, 'var(--accent)'],
                ['Часть 1 · Реальная математика', 48, 'var(--warn)'],
                ['Часть 2 · Сложные задачи',     22, 'var(--accent-3)'],
              ].map(([label, value, color]) => (
                <ProgressBar key={label} value={value} label={label} color={color}/>
              ))}
            </div>
          </div>

          {/* Mistake review system */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="trust-sub">
            <div className="card" style={{ padding: 24 }}>
              <Pill tone="warn">{React.cloneElement(Ic.brain, { width: 14, height: 14 })} Разбор ошибок</Pill>
              <h3 className="sub" style={{ marginTop: 12, marginBottom: 8 }}>Каждая ошибка возвращается</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 16 }}>
                Алгоритм держит «трудные» темы под прицелом и&nbsp;возвращает их&nbsp;до тех пор,
                пока ребёнок не&nbsp;закроет тему уверенно.
              </p>
              <div style={{ display: 'grid', gap: 8 }}>
                {[
                  ['Квадратные уравнения',  'возврат через 1 день',  'var(--danger)'],
                  ['Площадь треугольника', 'возврат через 3 дня',   'var(--warn)'],
                  ['Проценты',              'тема закрыта',           'var(--success)'],
                ].map(([t, m, c]) => (
                  <div key={t} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px', borderRadius: 10,
                    background: 'var(--bg-soft)',
                    fontSize: 13,
                  }}>
                    <span style={{ color: 'var(--ink-2)' }}>{t}</span>
                    <span style={{ color: c, fontWeight: 600, fontSize: 12 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <Pill tone="accent">{React.cloneElement(Ic.shield, { width: 14, height: 14 })} Родителю</Pill>
              <h3 className="sub" style={{ marginTop: 12, marginBottom: 8 }}>Прозрачный прогресс</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 16 }}>
                Раз в&nbsp;неделю&nbsp;— письмо: что прошёл ребёнок, где сложности,
                и&nbsp;что повторить перед пробником.
              </p>
              <div style={{
                padding: 14, borderRadius: 12,
                background: 'linear-gradient(160deg, color-mix(in oklab, var(--accent) 8%, var(--bg-soft)) 0%, var(--bg-soft) 100%)',
                border: '1px solid var(--hairline)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Отчёт за&nbsp;неделю</div>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4, fontFamily: 'var(--font-display)' }}>
                  Прошёл 47 задач · 8 ч&nbsp;20 м
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
                  <span>📈 <b style={{ color: 'var(--ink)' }}>+12%</b> точность</span>
                  <span>🔥 <b style={{ color: 'var(--ink)' }}>7</b> дней серии</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .iqmo .trust-sub { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ── 7 · Pricing ───────────────────────────────────────────────────────
function Pricing({ price, onCta }) {
  return (
    <section className="section" id="price">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Цена</span>
          <h2 className="title">Один час репетитора&nbsp;— или <span className="hl">целая неделя</span> подготовки?</h2>
          <p className="lead">Дешевле, чем доставка одного кофе.</p>
        </div>

        <div className="price-grid">
          {/* big price card */}
          <div className="price-card">
            <Pill tone="glass">⭐ Самый популярный план</Pill>
            <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="number">{price}<span className="ruble">₽</span></span>
            </div>
            <div className="per">в&nbsp;неделю · доступ ко&nbsp;всему</div>

            <ul>
              <li>Безлимитные задания и&nbsp;все темы ОГЭ</li>
              <li>Геймификация: уровни, XP, ачивки, серии</li>
              <li>Аналитика и&nbsp;разбор ошибок</li>
              <li>Еженедельный отчёт для родителя</li>
              <li>Доступ с&nbsp;телефона, планшета, ноутбука</li>
              <li>Отмена в&nbsp;один клик в&nbsp;любой момент</li>
            </ul>

            <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-accent btn-lg" style={{ background: '#fff', color: 'var(--accent)' }} onClick={onCta}>
                Начать бесплатно {React.cloneElement(Ic.arrow, { width: 18, height: 18 })}
              </button>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', alignSelf: 'center', maxWidth: 180 }}>
                Первая неделя&nbsp;— 0&nbsp;₽. Карту привязывать не&nbsp;нужно.
              </div>
            </div>
          </div>

          {/* "vs" math card */}
          <div className="vs-card">
            <h3 className="sub" style={{ marginBottom: 14 }}>За эту цену вы&nbsp;экономите</h3>
            <div className="vs-row">
              <span className="what">1&nbsp;занятие репетитора (1&nbsp;час)</span>
              <span className="amt" style={{ color: 'var(--danger)' }}>−2 500 ₽</span>
            </div>
            <div className="vs-row">
              <span className="what">Кофе с&nbsp;доставкой</span>
              <span className="amt" style={{ color: 'var(--danger)' }}>−380 ₽</span>
            </div>
            <div className="vs-row">
              <span className="what">Подписка на&nbsp;игру / стриминг</span>
              <span className="amt" style={{ color: 'var(--danger)' }}>−599 ₽</span>
            </div>
            <div className="vs-row">
              <span className="what" style={{ fontWeight: 700, color: 'var(--ink)' }}>IQMO School · 1 неделя</span>
              <span className="amt" style={{ color: 'var(--accent)' }}>{price} ₽</span>
            </div>

            <div style={{
              marginTop: 22, padding: 18, borderRadius: 16,
              background: 'color-mix(in oklab, var(--success) 8%, var(--bg-soft))',
              border: '1px solid color-mix(in oklab, var(--success) 25%, transparent)',
            }}>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>За&nbsp;3&nbsp;месяца подготовки родители экономят</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800,
                letterSpacing: '-0.03em', color: 'var(--success)', marginTop: 4,
              }}>
                72 000 ₽
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>
                по сравнению с&nbsp;2 занятиями репетитора в&nbsp;неделю
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 8 · Final CTA ─────────────────────────────────────────────────────
function FinalCTA({ onCta }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="final">
          <span className="eyebrow" style={{ position: 'relative' }}>Готовы начать?</span>
          <h2 className="title" style={{ marginTop: 14, fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Пусть ребёнок готовится к&nbsp;ОГЭ <span className="hl">с&nbsp;интересом</span>,<br/>
            а&nbsp;не&nbsp;через давление.
          </h2>
          <p className="lead" style={{ margin: '16px auto 0' }}>
            Первая неделя&nbsp;— бесплатно. Без привязки карты. Отмена в&nbsp;один клик.
          </p>
          <div className="row">
            <button type="button" className="btn btn-accent btn-lg" onClick={onCta}>
              Начать бесплатно {React.cloneElement(Ic.arrow, { width: 18, height: 18 })}
            </button>
            <a className="btn btn-ghost btn-lg" href="/">
              {React.cloneElement(Ic.play, { width: 14, height: 14 })} Посмотреть платформу
            </a>
          </div>
        </div>

        <footer>
          <div>© IQMO School · 2026</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="mailto:support@iqmo.ru">Контакты</a>
            <a href="/docs/oferta.pdf" target="_blank" rel="noopener">Оферта</a>
            <a href="/docs/privacy_policy.pdf" target="_blank" rel="noopener">Политика</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

// ── Sticky mobile CTA ─────────────────────────────────────────────────
function StickyCTA({ price, onCta }) {
  return (
    <div className="sticky-cta">
      <div className="left">
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{price} ₽/нед</div>
        <div className="p">первая неделя <b>0 ₽</b> · без карты</div>
      </div>
      <button type="button" className="btn btn-accent" onClick={onCta}>Попробовать</button>
    </div>
  );
}

window.IQMO_SECTIONS = {
  Nav, Hero, Problem, WhyDifferent, Comparison, HowUsed, Trust, Pricing, FinalCTA, StickyCTA,
};
