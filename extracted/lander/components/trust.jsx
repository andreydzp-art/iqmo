// ============================================================
// IQMO — Trust & Results (testimonials, stats, screenshots)
// ============================================================
const Trust = () => {
  const reviews = [
    {
      avatar: "ЕВ", color: "violet",
      name: "Елена В.",
      role: "мама Артёма, 9 класс",
      stars: 5,
      text: "За&nbsp;три месяца сын впервые сам сел готовиться. Утром перед школой решает 5–10 заданий — у&nbsp;него стрик 62&nbsp;дня, и&nbsp;он&nbsp;ни&nbsp;разу его не&nbsp;пропустил.",
      tag: "Стаж: 4 месяца",
    },
    {
      avatar: "ОК", color: "mint",
      name: "Ольга К.",
      role: "мама Даши, 8 класс",
      stars: 5,
      text: "Раньше Даша готовилась урывками — то&nbsp;учебник, то&nbsp;тесты, без&nbsp;системы. Сейчас занимается каждый день по&nbsp;15&nbsp;минут, а&nbsp;её&nbsp;средний балл на&nbsp;пробниках вырос на&nbsp;2&nbsp;балла.",
      tag: "+2 балла на пробниках",
    },
    {
      avatar: "ДС", color: "indigo",
      name: "Дмитрий С.",
      role: "папа Кирилла, 9 класс",
      stars: 5,
      text: "Удивило, что сын начал обсуждать со&nbsp;мной математику за&nbsp;ужином — спрашивал про&nbsp;квадратные уравнения. После 8&nbsp;класса такого не&nbsp;было ни&nbsp;разу.",
      tag: "Новичок → Уровень 18",
    },
  ];

  return (
    <section className="section" id="trust" style={{ position: "relative", background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        {/* Stats row */}
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 64px" }}>
          <div className="eyebrow" style={{ margin: "0 auto" }}>
            <span className="dot"/>
            Родителям и&nbsp;ученикам можно доверять
          </div>
          <h2 className="h-xl" style={{ marginTop: 22 }}>
            Реальные результаты. <span className="gradient-text">Реальные семьи.</span>
          </h2>
        </div>

        {/* Big stats */}
        <div className="trust-stats">
          {[
            { v: "12 400+", l: "учеников учатся каждый день", c: "indigo" },
            { v: "3 800+", l: "заданий по реальным форматам ОГЭ", c: "violet" },
            { v: "+2.1", l: "балла к среднему результату пробников", c: "mint" },
            { v: "94%",  l: "учеников доходят до 30 дня серии", c: "amber" },
          ].map((s, i) => {
            const grad = s.c === "mint" ? "linear-gradient(135deg, #10B981, #34D399)" :
                         s.c === "amber"? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
                         s.c === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" :
                                          "linear-gradient(135deg, #6366F1, #818CF8)";
            return (
              <div key={i} className="trust-stat">
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700, fontSize: "clamp(36px, 4.5vw, 56px)",
                  letterSpacing: "-.035em", lineHeight: 1,
                  background: grad,
                  WebkitBackgroundClip: "text", backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>{s.v}</div>
                <div style={{ fontSize: 14, color: "var(--ink-600)", fontWeight: 600, marginTop: 12, maxWidth: 220 }}>
                  {s.l}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials masonry */}
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="card review-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Avatar initials={r.avatar} color={r.color} size={42}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink-900)" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500, marginTop: 1 }}>{r.role}</div>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <IconStar key={j} size={14} stroke={0} style={{ color: "#FBBF24", fill: "#FBBF24" }}/>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 15, color: "var(--ink-700)", lineHeight: 1.55 }}
                   dangerouslySetInnerHTML={{ __html: `«${r.text}»` }}/>
              <div style={{
                marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 10px", borderRadius: 999,
                background: "var(--mint-50)", color: "var(--mint-600)",
                fontSize: 12, fontWeight: 700,
                border: "1px solid var(--mint-300)",
              }}>
                <IconCheck size={12} stroke={2.5}/> {r.tag}
              </div>
            </div>
          ))}

          {/* Featured screenshot card */}
          <div className="card review-card review-spotlight">
            <div className="spotlight-inner">
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 10px", borderRadius: 999,
                  background: "var(--indigo-50)", color: "var(--indigo-600)",
                  fontSize: 11, fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase",
                  border: "1px solid var(--indigo-200)",
                  marginBottom: 16,
                }}>
                  <IconChart size={12} stroke={2.5}/> Аналитика прогресса
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, color: "var(--ink-900)", letterSpacing: "-.02em", lineHeight: 1.2 }}>
                  Прозрачный прогресс — родитель видит&nbsp;всё.
                </div>
                <div style={{ fontSize: 15, color: "var(--ink-600)", marginTop: 12, lineHeight: 1.55, maxWidth: 380 }}>
                  Темы, точность, время, ошибки. Без&nbsp;контроля&nbsp;— но&nbsp;со&nbsp;спокойствием.
                </div>
              </div>

              {/* Mini chart */}
              <div style={{ padding: 20, borderRadius: 16, background: "linear-gradient(180deg, #FAFAFE, white)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: ".04em" }}>Прогресс по&nbsp;темам</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--mint-600)" }}>+18% за&nbsp;месяц</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { n: "Уравнения", p: 86 },
                    { n: "Геометрия", p: 64 },
                    { n: "Функции",   p: 52 },
                    { n: "Текст. задачи", p: 78 },
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)", width: 110, flexShrink: 0 }}>{t.n}</div>
                      <div style={{ flex: 1, height: 8, borderRadius: 999, background: "#EEF1F8", overflow: "hidden" }}>
                        <div style={{ width: `${t.p}%`, height: "100%", background: "linear-gradient(90deg, #6366F1, #8B5CF6)", borderRadius: 999 }}/>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo-600)", width: 32, textAlign: "right" }}>{t.p}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trust-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding: 36px 0;
          margin-bottom: 56px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .trust-stat { text-align: left; }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          grid-auto-rows: 1fr;
        }
        .review-card {
          padding: 24px;
          border-radius: 22px;
          display: flex; flex-direction: column;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .review-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -16px rgba(15,23,42,.15);
        }
        .review-spotlight {
          background: linear-gradient(160deg, white, #F6F8FF);
          border: 1px solid var(--indigo-200);
          grid-column: span 3;
          padding: 36px;
        }
        .spotlight-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 1100px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
          .review-spotlight { grid-column: span 2; }
        }
        @media (max-width: 760px) {
          .spotlight-inner { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 700px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .review-spotlight { grid-column: span 1; }
          .trust-stats { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
      `}</style>
    </section>
  );
};

window.Trust = Trust;
