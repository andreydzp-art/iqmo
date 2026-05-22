// ============================================================
// IQMO — Gamification (LIGHT, premium edtech feel)
// ============================================================
const Gamification = () => {
  return (
    <section className="section" id="gamification" style={{
      position: "relative",
      background: "white",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
      padding: "140px 0",
    }}>
      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, marginBottom: 80 }}>
          <div className="eyebrow">
            <span className="dot"/>
            Что внутри платформы
          </div>
          <h2 className="h-xl" style={{ marginTop: 24 }}>
            Подготовка, к&nbsp;которой <span className="gradient-text">хочется возвращаться</span> каждый день
          </h2>
          <p className="lead" style={{ marginTop: 22, fontSize: 19 }}>
            IQMO превращает занятия в&nbsp;понятный, осязаемый прогресс. Каждое задание&nbsp;— шаг вперёд, а&nbsp;каждый день&nbsp;— часть привычки, которую ребёнок не&nbsp;хочет пропустить.
          </p>
        </div>

        {/* 3 calm light cards */}
        <div className="gam-light-grid">
          {/* Streak */}
          <div className="gam-light-card">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, #FFF1D6, #FFE4CF)",
                display: "grid", placeItems: "center",
                border: "1px solid rgba(245,158,11,.18)",
              }}>
                <IconFlame size={22} stroke={2} style={{ color: "var(--amber-500)" }}/>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--amber-600)", letterSpacing: ".06em", textTransform: "uppercase" }}>Серия</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em", marginTop: 2 }}>
                  Стрик — привычка
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "var(--ink-600)", lineHeight: 1.55, marginBottom: 24 }}>
              Каждый день занятий продлевает серию. Никто не&nbsp;хочет потерять 47 дней&nbsp;— ребёнок открывает приложение сам.
            </p>
            {/* Days row */}
            <div style={{ display: "flex", gap: 6 }}>
              {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map((d, i) => {
                const done = i < 6;
                const today = i === 6;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: "100%", height: 38, borderRadius: 10,
                      background: done ? "linear-gradient(180deg, #FBBF24, #F59E0B)" : today ? "white" : "var(--ink-50)",
                      border: today ? "1.5px dashed var(--amber-400)" : done ? "none" : "1px solid var(--border)",
                      display: "grid", placeItems: "center",
                      boxShadow: done ? "0 6px 14px -6px rgba(245,158,11,.45)" : "none",
                    }}>
                      {done && <IconFlame size={16} stroke={2.4} style={{ color: "white" }}/>}
                      {today && <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "var(--amber-600)" }}>сегодня</span>}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-500)" }}>{d}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="gam-light-card">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, #EEF0FF, #E9DAFF)",
                display: "grid", placeItems: "center",
                border: "1px solid rgba(124,58,237,.14)",
              }}>
                <IconBolt size={22} stroke={2} style={{ color: "var(--indigo-600)" }}/>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo-600)", letterSpacing: ".06em", textTransform: "uppercase" }}>Прогресс</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em", marginTop: 2 }}>
                  Видимый рост
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "var(--ink-600)", lineHeight: 1.55, marginBottom: 24 }}>
              Уровни, опыт и&nbsp;понятные шкалы вместо абстрактных оценок. Ребёнок видит, как далеко продвинулся.
            </p>
            <div>
              <XPBar level={14} xp={1820} next={2400}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, paddingTop: 16, borderTop: "1px dashed var(--border-strong)" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>За неделю</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-900)", marginTop: 3 }}>+540 XP</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>Точность</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--mint-600)", marginTop: 3 }}>89%</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="gam-light-card">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
                display: "grid", placeItems: "center",
                border: "1px solid rgba(16,185,129,.18)",
              }}>
                <IconTrophy size={22} stroke={2} style={{ color: "var(--mint-600)" }}/>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--mint-600)", letterSpacing: ".06em", textTransform: "uppercase" }}>Награды</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--ink-900)", letterSpacing: "-.02em", marginTop: 2 }}>
                  Маленькие победы
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "var(--ink-600)", lineHeight: 1.55, marginBottom: 24 }}>
              Десятки достижений за&nbsp;разные привычки и&nbsp;результаты. Учиться&nbsp;— приятно.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {[
                { i: IconFlame,  c: "linear-gradient(135deg, #F59E0B, #FB7185)" },
                { i: IconBolt,   c: "linear-gradient(135deg, #10B981, #34D399)" },
                { i: IconTarget, c: "linear-gradient(135deg, #6366F1, #8B5CF6)" },
                { i: IconStar,   c: "linear-gradient(135deg, #FBBF24, #FCD34D)" },
              ].map((a, i) => (
                <div key={i} style={{
                  aspectRatio: "1", borderRadius: 14,
                  background: a.c, color: "white",
                  display: "grid", placeItems: "center",
                  boxShadow: "0 8px 18px -8px rgba(99,102,241,.35)",
                }}><a.i size={20} stroke={2}/></div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 14, fontWeight: 600 }}>
              <strong style={{ color: "var(--ink-900)" }}>18 из 60</strong> достижений открыто
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gam-light-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .gam-light-card {
          padding: 32px;
          border-radius: 24px;
          background: linear-gradient(180deg, white, #FAFAFE);
          border: 1px solid var(--border);
          box-shadow: var(--sh-sm);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gam-light-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -20px rgba(15,23,42,.12);
        }
        @media (max-width: 980px) {
          .gam-light-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

window.Gamification = Gamification;
