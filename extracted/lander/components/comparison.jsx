// ============================================================
// IQMO — Comparison (Tutor vs IQMO)
// ============================================================
const Comparison = () => {
  const tutor = [
    { i: IconX, t: "2 000 – 4 000 ₽ за один час" },
    { i: IconX, t: "1–2 занятия в неделю по расписанию" },
    { i: IconX, t: "Скучный формат: монолог и тетрадь" },
    { i: IconX, t: "Зависимость от одного преподавателя" },
    { i: IconX, t: "Сложно состыковать со школой и&nbsp;кружками" },
    { i: IconX, t: "Стресс перед каждым занятием" },
    { i: IconX, t: "Нет аналитики и&nbsp;прогресса" },
    { i: IconX, t: "Между занятиями — ничего" },
  ];
  const iqmo = [
    { i: IconCheck, t: "299 ₽ в&nbsp;неделю — фиксированная цена" },
    { i: IconCheck, t: "Безлимитная практика 24/7" },
    { i: IconCheck, t: "Игровой формат с&nbsp;XP, стриками и&nbsp;уровнями" },
    { i: IconCheck, t: "Адаптивная система — учится вместе с&nbsp;ребёнком" },
    { i: IconCheck, t: "В&nbsp;телефоне в&nbsp;любой момент" },
    { i: IconCheck, t: "Ребёнок сам хочет открыть приложение" },
    { i: IconCheck, t: "Прозрачная статистика по&nbsp;темам" },
    { i: IconCheck, t: "Серия каждый день — стрик не&nbsp;даёт бросить" },
  ];

  return (
    <section className="section" id="comparison" style={{ position: "relative", overflow: "hidden" }}>
      <div className="aurora"/>
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ margin: "0 auto" }}>
            <span className="dot"/>
            Сравнение
          </div>
          <h2 className="h-xl" style={{ marginTop: 22 }}>
            Час репетитора или <span className="gradient-text">неделя подготовки</span> в&nbsp;IQMO?
          </h2>
          <p className="lead" style={{ margin: "18px auto 0", textAlign: "center" }}>
            Считаем честно. Месяц занятий с&nbsp;репетитором — это 16&nbsp;000–32&nbsp;000&nbsp;₽. Месяц в&nbsp;IQMO — 1&nbsp;196&nbsp;₽ и&nbsp;практика каждый день.
          </p>
        </div>

        <div className="cmp-grid">
          {/* Tutor card */}
          <div className="cmp-card cmp-tutor">
            <div className="cmp-card__body">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "var(--ink-100)", color: "var(--ink-500)",
                    display: "grid", placeItems: "center",
                  }}><IconUsers size={22} stroke={2}/></div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-700)", letterSpacing: "-.02em" }}>Репетитор</div>
                    <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600, marginTop: 2 }}>классический формат</div>
                  </div>
                </div>
                <div style={{
                  padding: "5px 10px", borderRadius: 999,
                  background: "var(--ink-50)", color: "var(--ink-500)",
                  fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
                  border: "1px solid var(--border-strong)",
                }}>Дорого</div>
              </div>

              <div style={{
                padding: "18px 20px", borderRadius: 18,
                background: "var(--ink-50)",
                border: "1px solid var(--border)",
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>стоимость</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 38, color: "var(--ink-700)", letterSpacing: "-.03em", textDecoration: "line-through", textDecorationColor: "rgba(244,63,94,.5)", textDecorationThickness: 3 }}>2 000 – 4 000 ₽</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-500)", fontWeight: 600, marginTop: 2 }}>за&nbsp;один час занятия</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tutor.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--ink-100)", color: "var(--ink-500)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <r.i size={12} stroke={2.5}/>
                    </div>
                    <span style={{ fontSize: 14, color: "var(--ink-600)", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: r.t }}/>
                  </div>
                ))}
              </div>

              <div className="cmp-card__cta-spacer" aria-hidden="true">
                <span>Попробовать бесплатно</span>
              </div>
            </div>
          </div>

          {/* IQMO — dominating card */}
          <div className="cmp-card cmp-iqmo">
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, rgba(99,102,241,.92) 0%, rgba(124,58,237,.92) 50%, rgba(168,85,247,.92) 100%)",
              zIndex: 0,
            }}/>
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: "radial-gradient(ellipse at 80% 10%, rgba(255,255,255,.18), transparent 50%), radial-gradient(ellipse at 0% 90%, rgba(16,185,129,.25), transparent 60%)",
              pointerEvents: "none",
            }}/>
            {/* Decorative grid */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}/>

            <div className="cmp-card__body" style={{ position: "relative", zIndex: 1, color: "white" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,.18)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,.25)",
                    color: "white",
                    display: "grid", placeItems: "center",
                  }}><IconSparkle size={20} stroke={2}/></div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "white", letterSpacing: "-.02em" }}>IQMO School</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)", fontWeight: 600, marginTop: 2 }}>геймифицированная подготовка</div>
                  </div>
                </div>
                <div style={{
                  padding: "5px 10px", borderRadius: 999,
                  background: "linear-gradient(135deg, #10B981, #34D399)",
                  fontSize: 10, fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase",
                  boxShadow: "0 8px 18px -6px rgba(16,185,129,.6)",
                }}>Рекомендуем</div>
              </div>

              <div style={{
                padding: "18px 20px", borderRadius: 18,
                background: "rgba(255,255,255,.10)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,.18)",
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em" }}>стоимость</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 48, color: "white", letterSpacing: "-.035em", lineHeight: 1 }}>299 ₽</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,.75)", fontWeight: 600 }}>/ неделя</span>
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", fontWeight: 600, marginTop: 6 }}>
                  в <strong style={{ color: "white" }}>10 раз дешевле</strong> одного занятия с&nbsp;репетитором
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {iqmo.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "linear-gradient(135deg, #10B981, #34D399)",
                      color: "white",
                      display: "grid", placeItems: "center", flexShrink: 0,
                      boxShadow: "0 4px 10px -2px rgba(16,185,129,.5)",
                    }}>
                      <r.i size={12} stroke={2.8}/>
                    </div>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,.95)", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: r.t }}/>
                  </div>
                ))}
              </div>

              <div className="cmp-card__cta">
                <button type="button" data-open-register data-cta-source="comparison" className="cmp-card__cta-btn">
                  Попробовать бесплатно <IconArrow size={16} stroke={2.5}/>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Savings strip */}
        <div className="card" style={{
          marginTop: 28, padding: "22px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
          background: "linear-gradient(135deg, #ECFDF5, #F0FDF4)",
          border: "1px solid var(--mint-300)",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "linear-gradient(135deg, #10B981, #34D399)",
              color: "white", display: "grid", placeItems: "center",
              boxShadow: "var(--sh-glow-mint)",
            }}>
              <IconRocket size={24} stroke={2}/>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em" }}>
                Экономия за&nbsp;учебный год — до&nbsp;<span style={{ color: "var(--mint-600)" }}>147&nbsp;000&nbsp;₽</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-600)", marginTop: 4 }}>
                32 занятия по&nbsp;3&nbsp;000&nbsp;₽ = 96&nbsp;000&nbsp;₽ в&nbsp;год. IQMO — 14&nbsp;352&nbsp;₽. И&nbsp;ребёнок занимается не&nbsp;2&nbsp;раза, а&nbsp;каждый день.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cmp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }
        .cmp-card {
          padding: 28px;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .cmp-card__body {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
        }
        .cmp-card__cta {
          margin-top: auto;
          padding-top: 24px;
        }
        .cmp-card__cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 22px;
          border-radius: 999px;
          background: white;
          color: var(--indigo-700);
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 14px 30px -10px rgba(0,0,0,.3);
          border: 0;
          cursor: pointer;
          transition: transform .15s ease;
        }
        .cmp-card__cta-spacer {
          margin-top: auto;
          padding-top: 24px;
          visibility: hidden;
          pointer-events: none;
          user-select: none;
        }
        .cmp-card__cta-spacer span {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 22px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.2;
        }
        .cmp-tutor {
          background: white;
          border: 1px solid var(--border);
          box-shadow: var(--sh-sm);
        }
        .cmp-iqmo {
          border-radius: 28px;
          box-shadow: 0 40px 80px -30px rgba(99,102,241,.55), 0 20px 40px -20px rgba(124,58,237,.4);
        }
        @media (max-width: 900px) {
          .cmp-grid { grid-template-columns: 1fr; gap: 16px; }
          .cmp-card__cta-spacer { display: none; }
        }
      `}</style>
    </section>
  );
};

window.Comparison = Comparison;
