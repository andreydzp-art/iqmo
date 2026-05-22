// ============================================================
// IQMO — Pricing
// ============================================================
const Pricing = () => {
  const [plan, setPlan] = React.useState("year"); // week | month | year
  const PLANS = {
    week:  { label: "1 неделя",   price: 299,  per: "299 ₽ / неделя",  save: null,        billed: "Списание раз в&nbsp;неделю" },
    month: { label: "1 месяц",    price: 990,  per: "247 ₽ / неделя",  save: "−17%",      billed: "990 ₽ в&nbsp;месяц" },
    year:  { label: "12 месяцев", price: 7990, per: "153 ₽ / неделя",  save: "−48%",      billed: "7 990 ₽ за&nbsp;год · самый выгодный", best: true },
  };
  const current = PLANS[plan];

  return (
    <section className="section" id="pricing" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(139,92,246,.10), transparent 60%)",
      }}/>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ margin: "0 auto" }}>
            <span className="dot"/>
            Тариф
          </div>
          <h2 className="h-xl" style={{ marginTop: 22 }}>
            Один час репетитора <span style={{ color: "var(--ink-500)" }}>или</span><br/>
            <span className="gradient-text">целая неделя подготовки?</span>
          </h2>
          <p className="lead" style={{ margin: "18px auto 0", textAlign: "center" }}>
            Один тариф. Все предметы. Безлимитные задания. Игровая мотивация. Доступ с&nbsp;любого устройства.
          </p>
        </div>

        {/* Plan switcher */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", padding: 5, borderRadius: 999,
            background: "white", border: "1px solid var(--border)", boxShadow: "var(--sh-sm)",
            gap: 4, flexWrap: "wrap", justifyContent: "center",
          }}>
            {Object.entries(PLANS).map(([key, p]) => {
              const active = plan === key;
              return (
                <button key={key} onClick={() => setPlan(key)} style={{
                  padding: "10px 18px", borderRadius: 999,
                  background: active ? "var(--grad-primary)" : "transparent",
                  color: active ? "white" : "var(--ink-700)",
                  fontWeight: 700, fontSize: 14,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: active ? "0 8px 20px -8px rgba(99,102,241,.5)" : "none",
                  transition: "all .2s ease",
                }}>
                  {p.label}
                  {p.save && (
                    <span style={{
                      padding: "2px 7px", borderRadius: 999,
                      background: active ? "rgba(255,255,255,.22)" : "var(--mint-50)",
                      color: active ? "white" : "var(--mint-600)",
                      fontSize: 11, fontWeight: 800,
                    }}>{p.save}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pricing-grid">
          {/* Main pricing card */}
          <div className="pricing-card">
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, rgba(99,102,241,.04), rgba(139,92,246,.06))",
              borderRadius: 32,
            }}/>
            <div style={{ position: "relative" }}>
              {current.best && (
                <div style={{
                  position: "absolute", top: -14, right: 20,
                  padding: "6px 12px", borderRadius: 999,
                  background: "linear-gradient(135deg, #F59E0B, #FB7185)",
                  color: "white", fontSize: 11, fontWeight: 800,
                  letterSpacing: ".06em", textTransform: "uppercase",
                  boxShadow: "0 12px 24px -10px rgba(245,158,11,.6)",
                }}>★ Самый популярный</div>
              )}

              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em" }}>
                Тариф «Подготовка к&nbsp;ОГЭ»
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-500)", marginTop: 6 }}>
                Полный доступ к&nbsp;платформе без&nbsp;ограничений
              </div>

              {/* Price */}
              <div style={{ marginTop: 28, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(72px, 9vw, 120px)",
                  letterSpacing: "-.05em", lineHeight: 1,
                  background: "var(--grad-text)",
                  WebkitBackgroundClip: "text", backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {current.price.toLocaleString("ru")}&nbsp;₽
                </div>
                <div style={{ fontSize: 18, color: "var(--ink-500)", fontWeight: 600, paddingBottom: 14 }}>
                  / {plan === "week" ? "неделя" : plan === "month" ? "месяц" : "год"}
                </div>
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-600)", fontWeight: 600, marginTop: 8 }}>
                Эквивалент: <span style={{ color: "var(--ink-900)" }}>{current.per}</span>
                <span style={{ marginLeft: 8 }} dangerouslySetInnerHTML={{ __html: "· " + current.billed }}/>
              </div>

              {/* Features */}
              <div style={{
                marginTop: 28, padding: 22, borderRadius: 20,
                background: "white", border: "1px solid var(--border)",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px",
              }} className="pricing-features">
                {[
                  "Все 9 предметов ОГЭ",
                  "3 800+ заданий по&nbsp;форматам ОГЭ",
                  "Игровая система XP и&nbsp;стриков",
                  "Безлимит на&nbsp;всех устройствах",
                  "Аналитика для&nbsp;родителей",
                  "Адаптивная практика",
                  "Доступ к&nbsp;новым темам",
                  "Поддержка 7&nbsp;дней в&nbsp;неделю",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "linear-gradient(135deg, #10B981, #34D399)",
                      color: "white", display: "grid", placeItems: "center", flexShrink: 0,
                    }}><IconCheck size={12} stroke={2.8}/></div>
                    <span style={{ fontSize: 14, color: "var(--ink-800)", fontWeight: 500 }}
                          dangerouslySetInnerHTML={{ __html: f }}/>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="btn btn-primary btn-lg" style={{ flex: 1, minWidth: 200 }} data-open-register data-cta-source="pricing">
                  Попробовать бесплатно <IconArrow size={18} stroke={2.2}/>
                </button>
                <a href="/express-chemistry.html" className="btn btn-secondary btn-lg">
                  Посмотреть платформу
                </a>
              </div>
              <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-500)", display: "flex", alignItems: "center", gap: 8 }}>
                <IconShield size={14} stroke={2}/> 7 дней пробного периода · отмена в&nbsp;1 клик
              </div>
            </div>
          </div>

          {/* Side card: value comparison */}
          <div className="pricing-side">
            <div className="card" style={{ padding: 24, borderRadius: 24, background: "linear-gradient(160deg, #FFFBEB, #FEF3C7)", border: "1px solid var(--amber-300)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--ink-900)", letterSpacing: "-.015em" }}>
                Что это значит в&nbsp;деньгах?
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { l: "1 час репетитора",    v: "3 000 ₽", c: "var(--rose-500)" },
                  { l: "1 неделя в&nbsp;IQMO", v: "299 ₽",    c: "var(--mint-600)" },
                  { l: "Месяц с&nbsp;репетитором (8 занятий)", v: "24 000 ₽", c: "var(--rose-500)" },
                  { l: "Месяц в&nbsp;IQMO (28+ дней)", v: "990 ₽", c: "var(--mint-600)" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: i < 3 ? "1px dashed rgba(245,158,11,.3)" : "none" }}>
                    <span style={{ fontSize: 13, color: "var(--ink-700)", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: r.l }}/>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: r.c, letterSpacing: "-.01em" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{
              padding: 24, borderRadius: 24,
              background: "linear-gradient(160deg, #1A1F36, #2D3350)", color: "white", border: "1px solid rgba(255,255,255,.06)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "linear-gradient(135deg, #10B981, #34D399)",
                display: "grid", placeItems: "center",
                marginBottom: 14,
                boxShadow: "0 12px 24px -10px rgba(16,185,129,.5)",
              }}>
                <IconShield size={22} stroke={2}/>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "white", letterSpacing: "-.015em" }}>
                Гарантия: 7 дней бесплатно
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 8, lineHeight: 1.5 }}>
                Попробуйте платформу полную неделю. Если ребёнок не&nbsp;откроет приложение хотя&nbsp;бы 3&nbsp;раза&nbsp;— вернём деньги без&nbsp;вопросов.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
          align-items: start;
        }
        .pricing-card {
          padding: 36px;
          border-radius: 32px;
          background: white;
          border: 1px solid var(--border);
          box-shadow: 0 30px 60px -25px rgba(99,102,241,.18);
          position: relative;
        }
        .pricing-side {
          display: flex; flex-direction: column; gap: 16px;
        }
        @media (max-width: 980px) {
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

window.Pricing = Pricing;
