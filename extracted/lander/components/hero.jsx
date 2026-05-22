// ============================================================
// IQMO — HERO (clean premium SaaS — text + one product visual)
// ============================================================
const Hero = () => {
  return (
    <section style={{ position: "relative", paddingTop: 32, paddingBottom: 120, overflow: "hidden", isolation: "isolate" }}>
      <HeroBackdrop />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-layout">
          {/* LEFT — copy */}
          <div className="hero-text-col">
            <div className="eyebrow">
              <span className="dot" />
              Готовимся к ОГЭ 2026 · набор открыт
            </div>

            <h1 className="hero-headline">
              Подготовка к&nbsp;ОГЭ <span className="gradient-text">без репетиторов</span> за&nbsp;299&nbsp;₽ в&nbsp;неделю
            </h1>

            <p className="hero-sub">
              Интерактивные задания, уровни и&nbsp;система мотивации&nbsp;— подготовка, которая действительно увлекает ребёнка.
            </p>

            <div className="hero-ctas">
              <button type="button" className="btn btn-primary" data-open-register data-cta-source="hero">
                Попробовать бесплатно <IconArrow size={16} stroke={2.2}/>
              </button>
              <a href="/express-chemistry.html" className="btn btn-secondary">
                <IconPlay size={14} stroke={2.2}/> Посмотреть платформу
              </a>
            </div>

            <div className="hero-trust">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex" }}>
                  {[
                    {i: "АП", c: "indigo"},
                    {i: "МК", c: "mint"},
                    {i: "ДС", c: "amber"},
                    {i: "ЕВ", c: "violet"},
                  ].map((a, i) => (
                    <div key={i} style={{ marginLeft: i === 0 ? 0 : -10 }}>
                      <Avatar initials={a.i} color={a.c} size={32} ring={true}/>
                    </div>
                  ))}
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {[1,2,3,4,5].map(i => (
                      <IconStar key={i} size={12} stroke={0} style={{ color: "#FBBF24", fill: "#FBBF24" }}/>
                    ))}
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-900)", marginLeft: 4 }}>4.9</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500, marginTop: 2 }}>
                    <strong style={{ color: "var(--ink-700)" }}>12&nbsp;400+</strong> учеников
                  </div>
                </div>
              </div>

              <div className="hero-divider"/>

              <div className="hero-stats">
                <div>
                  <div className="num">3 800+</div>
                  <div className="lbl">заданий</div>
                </div>
                <div>
                  <div className="num">9</div>
                  <div className="lbl">предметов</div>
                </div>
                <div>
                  <div className="num">−40 000 ₽</div>
                  <div className="lbl">экономия</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — ONE product window */}
          <ProductWindow/>
        </div>
      </div>

      <style>{`
        .hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 600px) 1fr;
          gap: 96px;
          align-items: center;
          padding-top: 20px;
        }
        .hero-text-col { padding: 16px 0; }
        .hero-headline {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(34px, 3.6vw, 68px);
          letter-spacing: -.028em;
          line-height: 1.06;
          color: var(--ink-900);
          margin-top: 24px;
          max-width: 600px;
        }
        .hero-sub {
          font-size: clamp(17px, 1.3vw, 20px);
          color: var(--ink-600);
          line-height: 1.55;
          margin-top: 24px;
          max-width: 520px;
        }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .hero-trust {
          display: flex; align-items: center; gap: 22px;
          margin-top: 40px; padding-top: 28px;
          border-top: 1px dashed var(--border-strong);
          flex-wrap: wrap;
        }
        .hero-divider { width: 1px; height: 28px; background: var(--border-strong); }
        .hero-stats { display: flex; gap: 22px; }
        .hero-stats .num {
          font-family: var(--font-display); font-weight: 700;
          font-size: 15px; color: var(--ink-900);
          letter-spacing: -.018em; line-height: 1;
        }
        .hero-stats .lbl {
          font-size: 11px; color: var(--ink-500); font-weight: 600;
          margin-top: 4px; letter-spacing: .02em;
        }
        @media (max-width: 1100px) {
          .hero-layout { grid-template-columns: 1fr; gap: 64px; }
          .hero-text-col { max-width: 620px; }
        }
        @media (max-width: 540px) {
          .hero-divider { display: none; }
          .hero-trust { gap: 16px; }
          .hero-stats { gap: 18px; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
};

// ============================================================
// HERO BACKDROP — single calm ambient gradient
// ============================================================
const HeroBackdrop = () => (
  <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage:
        "radial-gradient(ellipse 1000px 700px at 75% 30%, rgba(139,92,246,.18), transparent 60%)," +
        "radial-gradient(ellipse 900px 600px at 95% 80%, rgba(99,102,241,.14), transparent 60%)," +
        "radial-gradient(ellipse 600px 500px at 5% 10%, rgba(236,233,254,.55), transparent 65%)",
    }}/>
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0, height: 140,
      background: "linear-gradient(180deg, transparent, var(--bg) 90%)",
    }}/>
  </div>
);

// ============================================================
// PRODUCT WINDOW — single cohesive app preview
// ============================================================
const ProductWindow = () => {
  return (
    <div className="product-window-wrap">
      {/* ambient glow */}
      <div style={{
        position: "absolute", inset: "-12% -8% -10% -8%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,.22), transparent 60%)",
        filter: "blur(40px)",
        zIndex: 0,
      }}/>

      <div className="product-window">
        {/* Top bar */}
        <div className="pw-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" }}/>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" }}/>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27C840" }}/>
          </div>
          <div className="pw-tab">
            <div style={{ width: 14, height: 14, borderRadius: 4, background: "var(--grad-primary)" }}/>
            <span>iqmoschool.ru / dashboard</span>
          </div>
          <div style={{ width: 60 }}/>
        </div>

        {/* Body: sidebar + main */}
        <div className="pw-body">
          <aside className="pw-sidebar">
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "var(--grad-primary)",
              boxShadow: "0 6px 14px -4px rgba(99,102,241,.5)",
              display: "grid", placeItems: "center", color: "white",
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13,
              marginBottom: 14,
            }}>I</div>
            {[
              { I: IconHome,    active: true },
              { I: IconLayers },
              { I: IconChart },
              { I: IconTrophy },
              { I: IconUsers },
            ].map((n, i) => (
              <button key={i} className={`pw-nav ${n.active ? "is-active" : ""}`}>
                <n.I size={18} stroke={2}/>
              </button>
            ))}
            <div style={{ flex: 1 }}/>
            <Avatar initials="МК" color="violet" size={32}/>
          </aside>

          <main className="pw-main">
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600 }}>Добро пожаловать,</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em", marginTop: 4 }}>
                  Максим, 9 класс
                </div>
              </div>
              <StreakBadge days={47}/>
            </div>

            {/* Featured task card */}
            <div style={{
              padding: 22, borderRadius: 18,
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              color: "white",
              position: "relative", overflow: "hidden",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.18), 0 14px 28px -14px rgba(99,102,241,.45)",
            }}>
              <div style={{
                position: "absolute", right: -50, top: -50,
                width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,.16), transparent 70%)",
              }}/>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", opacity: .85, display: "flex", alignItems: "center", gap: 6 }}>
                  <IconTarget size={12} stroke={2.4}/> Задание дня · Математика
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, marginTop: 10, lineHeight: 1.25, letterSpacing: "-.015em" }}>
                  Квадратные уравнения · №14
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, opacity: .9 }}>
                    <IconClock size={13} stroke={2.2}/> 4 мин
                    <span style={{ opacity: .4 }}>·</span>
                    <IconBolt size={13} stroke={2.5}/> +45 XP
                  </div>
                  <div style={{
                    padding: "8px 14px", borderRadius: 999,
                    background: "white", color: "var(--indigo-600)",
                    fontWeight: 700, fontSize: 12,
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    Начать <IconArrow size={11} stroke={2.5}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Level + XP bar */}
            <div style={{ marginTop: 18 }}>
              <XPBar level={14} xp={1820} next={2400}/>
            </div>

            {/* Subjects grid */}
            <div className="pw-subjects">
              <SubjectTile icon={IconBrain}  name="Математика"   progress={72} tasks={1240} color="indigo" active />
              <SubjectTile icon={IconBook}   name="Русский язык" progress={58} tasks={980}  color="violet" />
              <SubjectTile icon={IconRocket} name="Физика"       progress={34} tasks={620}  color="mint" />
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .product-window-wrap {
          position: relative;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
        }
        .product-window {
          position: relative;
          z-index: 1;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow:
            0 60px 100px -30px rgba(15,23,42,.22),
            0 24px 48px -20px rgba(99,102,241,.16),
            inset 0 1px 0 rgba(255,255,255,.9);
          overflow: hidden;
        }
        .pw-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, #FBFBFE, #F6F7FB);
        }
        .pw-tab {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          border-radius: 8px;
          background: white;
          border: 1px solid var(--border);
          font-size: 12px; color: var(--ink-600); font-weight: 500;
          box-shadow: var(--sh-xs);
        }
        .pw-body {
          display: grid;
          grid-template-columns: 64px 1fr;
        }
        .pw-sidebar {
          display: flex; flex-direction: column; align-items: center;
          padding: 18px 0;
          gap: 6px;
          background: linear-gradient(180deg, #FAFAFE, #F4F5FB);
          border-right: 1px solid var(--border);
          min-height: 460px;
        }
        .pw-nav {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: grid; place-items: center;
          color: var(--ink-400);
          transition: background .15s ease, color .15s ease;
        }
        .pw-nav:hover { background: var(--ink-100); color: var(--ink-700); }
        .pw-nav.is-active {
          background: var(--indigo-50);
          color: var(--indigo-600);
          box-shadow: inset 0 0 0 1px var(--indigo-200);
        }
        .pw-main { padding: 24px 26px; }
        .pw-subjects {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 900px) {
          .pw-subjects { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .pw-body { grid-template-columns: 56px 1fr; }
          .pw-main { padding: 18px 16px; }
          .pw-topbar { padding: 12px 14px; }
        }
      `}</style>
    </div>
  );
};

window.Hero = Hero;
