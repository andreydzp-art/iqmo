// ============================================================
// IQMO — Features (Why IQMO is different)
// ============================================================
const Features = () => {
  const features = [
    {
      icon: IconBolt, color: "indigo",
      title: "Мгновенная проверка",
      text: "Ребёнок видит результат за&nbsp;секунду — без&nbsp;ожидания учителя.",
    },
    {
      icon: IconBrain, color: "violet",
      title: "Работа над ошибками",
      text: "Каждое неверное решение разбирается с&nbsp;объяснением шаг&nbsp;за&nbsp;шагом.",
    },
    {
      icon: IconWand, color: "mint",
      title: "Адаптивная практика",
      text: "Алгоритм подбирает задания под&nbsp;слабые места ученика.",
    },
    {
      icon: IconChart, color: "indigo",
      title: "Прозрачная аналитика",
      text: "Видно прогресс по&nbsp;темам, точность и&nbsp;скорость — родителю тоже.",
    },
    {
      icon: IconLayers, color: "violet",
      title: "Короткие сессии",
      text: "По&nbsp;10–15 минут — формат, который не&nbsp;утомляет после школы.",
    },
    {
      icon: IconUnlock, color: "mint",
      title: "Открываемый контент",
      text: "Новые темы и&nbsp;уровни открываются по&nbsp;мере прогресса.",
    },
  ];

  return (
    <section className="section" id="features" style={{ position: "relative", overflow: "hidden" }}>
      <div className="aurora aurora-mint"/>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 32, marginBottom: 56, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 660 }}>
            <div className="eyebrow">
              <span className="dot"/>
              Чем IQMO отличается
            </div>
            <h2 className="h-xl" style={{ marginTop: 22 }}>
              Всё, что нужно для подготовки <span className="gradient-text">в&nbsp;одном продукте</span>
            </h2>
          </div>
          <p className="lead" style={{ maxWidth: 380 }}>
            Платформа, в&nbsp;которой объединены тренажёр, аналитика и&nbsp;игровая мотивация — без&nbsp;десятков вкладок и&nbsp;сложных интерфейсов.
          </p>
        </div>

        {/* Hero feature card */}
        <FeatureSpotlight/>

        {/* Feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 24 }} className="features-grid">
          {features.map((f, i) => {
            const grad = f.color === "mint"  ? "linear-gradient(135deg, #10B981, #34D399)" :
                         f.color === "amber" ? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
                         f.color === "rose"  ? "linear-gradient(135deg, #F43F5E, #FB7185)" :
                         f.color === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" :
                                               "linear-gradient(135deg, #6366F1, #818CF8)";
            return (
              <div key={i} className="card feature-card">
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: grad, color: "white",
                  display: "grid", placeItems: "center", marginBottom: 18,
                  boxShadow: "0 12px 24px -10px rgba(99,102,241,.45), inset 0 1px 0 rgba(255,255,255,.3)",
                }}><f.icon size={22} stroke={2}/></div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-.015em", marginBottom: 8 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-600)", lineHeight: 1.5 }}
                     dangerouslySetInnerHTML={{ __html: f.text }}/>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .feature-card {
          padding: 26px;
          border-radius: 24px;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 50px -22px rgba(99,102,241,.25);
        }
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ============================================================
// Spotlight feature — task-solving UI mockup
// ============================================================
const FeatureSpotlight = () => {
  const [selected, setSelected] = React.useState(1);
  const opts = [
    { v: 0, l: "x = 4 и x = −1" },
    { v: 1, l: "x = 3 и x = −2", correct: true },
    { v: 2, l: "x = 2 и x = −3" },
    { v: 3, l: "x = 5 и x = −1" },
  ];

  return (
    <div className="spotlight-grid">
      {/* Mockup */}
      <div className="spotlight-mock card" style={{
        padding: 24, borderRadius: 28,
        background: "linear-gradient(160deg, white 0%, #F8F9FE 100%)",
        boxShadow: "0 30px 60px -25px rgba(15,23,42,.18)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ padding: "6px 12px", borderRadius: 999, background: "var(--indigo-50)", color: "var(--indigo-600)", fontSize: 11, fontWeight: 800, letterSpacing: ".04em", textTransform: "uppercase" }}>
              ОГЭ · Математика
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600 }}>Задание 8 из 12</div>
          </div>
          <StreakBadge days={47}/>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 4, marginBottom: 22 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 6, borderRadius: 999,
              background: i < 7 ? "linear-gradient(90deg, #10B981, #34D399)" : i === 7 ? "var(--indigo-500)" : "#EEF1F8",
              boxShadow: i === 7 ? "0 0 10px rgba(99,102,241,.5)" : "none",
            }}/>
          ))}
        </div>

        {/* Question */}
        <div style={{ fontSize: 13, color: "var(--ink-500)", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".04em" }}>
          Решите уравнение
        </div>
        <div style={{
          padding: "20px 24px", borderRadius: 16,
          background: "white",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28,
          color: "var(--ink-900)", letterSpacing: "-.01em",
          marginBottom: 18,
          textAlign: "center",
        }}>
          x² − x − 6 = 0
        </div>

        {/* Options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {opts.map(o => {
            const isSelected = selected === o.v;
            const isCorrect = isSelected && o.correct;
            return (
              <button key={o.v} onClick={() => setSelected(o.v)} style={{
                padding: "14px 16px", borderRadius: 14,
                background: isCorrect ? "linear-gradient(135deg, #ECFDF5, #D1FAE5)" : isSelected ? "var(--indigo-50)" : "white",
                border: isCorrect ? "1.5px solid var(--mint-400)" : isSelected ? "1.5px solid var(--indigo-400)" : "1px solid var(--border-strong)",
                color: isCorrect ? "var(--mint-600)" : "var(--ink-800)",
                fontWeight: 700, fontSize: 15,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 10, textAlign: "left",
                transition: "all .2s ease",
                cursor: "pointer",
                boxShadow: isCorrect ? "0 12px 24px -10px rgba(16,185,129,.4)" : "none",
              }}>
                <span>{o.l}</span>
                {isCorrect && <IconCheck size={18} stroke={2.5}/>}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {opts.find(o => o.v === selected)?.correct && (
          <div style={{
            marginTop: 16, padding: 14, borderRadius: 14,
            background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
            border: "1px solid var(--mint-300)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "linear-gradient(135deg, #10B981, #34D399)",
              display: "grid", placeItems: "center", color: "white",
              flexShrink: 0,
            }}>
              <IconCheck size={20} stroke={2.5}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--mint-600)" }}>Правильно! +45 XP</div>
              <div style={{ fontSize: 12, color: "var(--ink-600)", marginTop: 2 }}>По&nbsp;теореме Виета: x₁&nbsp;+&nbsp;x₂&nbsp;=&nbsp;1, x₁&nbsp;·&nbsp;x₂&nbsp;=&nbsp;−6.</div>
            </div>
            <XPChip value="+45" tone="mint" style={{ padding: "6px 12px", fontSize: 13 }}/>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="spotlight-copy">
        <h3 className="h-lg">
          Каждое задание — <span className="gradient-text">микро-сессия</span> с&nbsp;мгновенной обратной связью
        </h3>
        <p className="lead" style={{ marginTop: 18 }}>
          Никаких длинных текстов и&nbsp;ожидания. Ребёнок видит решение, получает XP, разбирает ошибку — и&nbsp;идёт дальше. Подготовка ощущается как&nbsp;уровни в&nbsp;игре, а&nbsp;не&nbsp;как&nbsp;домашнее задание.
        </p>

        <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
          {[
            { i: IconCheck, t: "Объяснение к&nbsp;каждому ответу", c: "mint" },
            { i: IconBolt,  t: "Микро-награды за&nbsp;каждый шаг", c: "indigo" },
            { i: IconTarget,t: "Точная фокусировка на&nbsp;ошибках ребёнка", c: "violet" },
          ].map((r,i) => {
            const grad = r.c === "mint"  ? "linear-gradient(135deg, #10B981, #34D399)" :
                         r.c === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" :
                                           "linear-gradient(135deg, #6366F1, #818CF8)";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: grad, color: "white",
                  display: "grid", placeItems: "center", flexShrink: 0,
                  boxShadow: "0 8px 16px -6px rgba(99,102,241,.4)",
                }}><r.i size={18} stroke={2.2}/></div>
                <div style={{ fontSize: 16, color: "var(--ink-800)", fontWeight: 600 }}
                     dangerouslySetInnerHTML={{ __html: r.t }}/>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .spotlight-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .spotlight-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </div>
  );
};

window.Features = Features;
