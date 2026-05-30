// ============================================================
// IQMO — Pain points (4 cards, calm)
// ============================================================
const Pain = () => {
  const pains = [
    { icon: IconWand,  title: "Подготовка хаотичная и без системы",         text: "Учебники, сайты, тесты, видео — всё разное. Нет единой карты тем и понятного прогресса." },
    { icon: IconPhone, title: "YouTube и TikTok побеждают подготовку",     text: "Контент платформ ярче, динамичнее и доступнее в один тап." },
    { icon: IconClock, title: "После школы у ребёнка нет сил",            text: "Уставший девятиклассник не сядет вечером за толстый учебник." },
    { icon: IconShield,title: "Невозможно заставить заниматься",          text: "Любые уговоры заканчиваются ссорой — а результата всё нет." },
  ];

  return (
    <section className="section" id="pain" style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 64 }}>
          <div className="eyebrow">
            <span className="dot"/>
            Знакомая ситуация?
          </div>
          <h2 className="h-xl" style={{ marginTop: 24 }}>
            Каждый день вы пытаетесь заставить ребёнка готовиться к&nbsp;ОГЭ. <span style={{ color: "var(--ink-500)" }}>А он&nbsp;— не&nbsp;хочет.</span>
          </h2>
        </div>

        <div className="pain-grid">
          {pains.map((p, i) => (
            <div key={i} className="card pain-card">
              <div className="pain-icon">
                <p.icon size={22} stroke={1.8}/>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-.015em", lineHeight: 1.25, marginBottom: 10 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 15, color: "var(--ink-600)", lineHeight: 1.55 }}>
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pain-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .pain-card {
          padding: 28px;
          border-radius: 22px;
          background: linear-gradient(180deg, white, #FAFAFE);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .pain-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -22px rgba(15,23,42,.14);
        }
        .pain-icon {
          width: 46px; height: 46px;
          border-radius: 13px;
          background: var(--ink-50);
          color: var(--ink-700);
          display: grid; place-items: center;
          margin-bottom: 18px;
          border: 1px solid var(--border);
        }
        @media (max-width: 1100px) { .pain-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px)  { .pain-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

window.Pain = Pain;
