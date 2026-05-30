// ============================================================
// IQMO — Mobile experience
// ============================================================
const Mobile = () => {
  return (
    <section className="section" id="mobile" style={{
      background: "linear-gradient(180deg, #F8F4FF 0%, #EEF2FF 100%)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
      position: "relative",
    }}>
      <div className="container">
        <div className="mobile-grid">
          {/* Copy */}
          <div>
            <div className="eyebrow">
              <span className="dot"/>
              Mobile First
            </div>
            <h2 className="h-xl" style={{ marginTop: 22 }}>
              Подготовка в&nbsp;телефоне — там, где ребёнок и&nbsp;так проводит время.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              IQMO работает на&nbsp;любом устройстве. 10&nbsp;минут перед сном, 5&nbsp;минут в&nbsp;транспорте, серия заданий за&nbsp;завтраком&nbsp;— и&nbsp;подготовка идёт каждый день, без&nbsp;уговоров.
            </p>

            <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
              {[
                { i: IconWifi,     t: "Работает на смартфоне, планшете и&nbsp;компьютере" },
                { i: IconClock,    t: "Короткие сессии по&nbsp;5–15 минут" },
                { i: IconBell,     t: "Напоминания, которые мотивируют, а&nbsp;не&nbsp;раздражают" },
                { i: IconHeart,    t: "Ребёнок сам открывает приложение — потому что хочет" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "white", color: "var(--indigo-600)",
                    display: "grid", placeItems: "center", flexShrink: 0,
                    border: "1px solid var(--border-strong)",
                    boxShadow: "var(--sh-xs)",
                  }}><r.i size={18} stroke={2}/></div>
                  <div style={{ fontSize: 16, color: "var(--ink-800)", fontWeight: 600 }}
                       dangerouslySetInnerHTML={{ __html: r.t }}/>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary" data-open-register data-cta-source="mobile">Начать подготовку <IconArrow size={16} stroke={2.2}/></button>
              <a href="#features" className="btn btn-secondary">Подробнее <IconChevron size={14} stroke={2.2}/></a>
            </div>
          </div>

          {/* Phones */}
          <div className="phones-wrap">
            {/* Background blob */}
            <div style={{
              position: "absolute", inset: "-15%",
              background: "radial-gradient(ellipse at center, rgba(139,92,246,.25), transparent 60%)",
              filter: "blur(40px)",
              zIndex: 0,
            }}/>

            {/* Back phone */}
            <div className="phone-back">
              <PhoneFrame w={240} h={490}>
                <PhoneScreenStats/>
              </PhoneFrame>
            </div>

            {/* Front phone */}
            <div className="phone-front">
              <PhoneFrame w={260} h={530}>
                <PhoneScreenTask/>
              </PhoneFrame>
            </div>

            {/* Floating chips around phones */}
            <div className="phone-chip phone-chip-1">
              <XPChip value="+45 XP" tone="mint"/>
            </div>
            <div className="phone-chip phone-chip-2">
              <div className="card" style={{
                padding: "8px 14px", borderRadius: 14,
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 16px 30px -14px rgba(15,23,42,.18)",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg, #FBBF24, #F97316)",
                  display: "grid", placeItems: "center",
                }}>
                  <IconFlame size={14} stroke={2.5} style={{ color: "white" }}/>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-900)" }}>День 47 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mobile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .phones-wrap {
          position: relative;
          height: 560px;
          display: grid; place-items: center;
        }
        .phone-back {
          position: absolute;
          top: 40px; left: 50%;
          transform: translateX(-95%) rotate(-6deg);
          z-index: 1;
        }
        .phone-front {
          position: relative;
          z-index: 2;
          transform: translateX(36px) rotate(4deg);
        }
        .phone-chip { position: absolute; z-index: 4; }
        .phone-chip-1 { top: 30px; right: 10%; animation: float 5s ease-in-out infinite; }
        .phone-chip-2 { bottom: 60px; left: 4%; animation: float 4.5s ease-in-out infinite .5s; }

        @media (max-width: 980px) {
          .mobile-grid { grid-template-columns: 1fr; gap: 40px; }
          .phones-wrap { height: 540px; }
        }
        @media (max-width: 500px) {
          .phones-wrap { transform: scale(.85); height: 480px; }
        }
      `}</style>
    </section>
  );
};

// ============================================================
// Phone screens
// ============================================================
const PhoneScreenTask = () => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", paddingTop: 48, background: "white" }}>
    {/* Status bar fake */}
    <div style={{ position: "absolute", top: 18, left: 24, right: 24, display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "var(--ink-900)" }}>
      <span>9:41</span>
      <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ width: 16, height: 8, borderRadius: 2, background: "var(--ink-900)" }}/>
      </span>
    </div>

    {/* Header */}
    <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar initials="МК" color="violet" size={32}/>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600 }}>Привет,</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Максим</div>
        </div>
      </div>
      <StreakBadge days={47} size="sm"/>
    </div>

    {/* Card */}
    <div style={{ margin: "12px 14px", padding: 14, borderRadius: 18, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "white", boxShadow: "0 12px 26px -10px rgba(99,102,241,.5)" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", opacity: .9 }}>Задание дня</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6, lineHeight: 1.3 }}>Квадратные уравнения · №14</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <div style={{ fontSize: 10, opacity: .9, display: "flex", gap: 6, alignItems: "center" }}>
          <IconBolt size={11} stroke={2.5}/> +45 XP · 4 мин
        </div>
        <div style={{ padding: "6px 10px", borderRadius: 999, background: "white", color: "var(--indigo-600)", fontSize: 10, fontWeight: 800 }}>Начать →</div>
      </div>
    </div>

    {/* XP bar mini */}
    <div style={{ padding: "0 14px" }}>
      <XPBar level={14} xp={1820} next={2400}/>
    </div>

    {/* Subjects */}
    <div style={{ padding: "12px 14px", display: "grid", gap: 8 }}>
      {[
        { i: IconBrain, n: "Математика", p: 72, c: "indigo" },
        { i: IconBook,  n: "Русский",    p: 58, c: "violet" },
      ].map((s,i) => {
        const grad = s.c === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" : "linear-gradient(135deg, #6366F1, #818CF8)";
        return (
          <div key={i} style={{ padding: 10, borderRadius: 14, background: "white", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: grad, color: "white", display: "grid", placeItems: "center" }}>
              <s.i size={16} stroke={2}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-500)" }}>{s.p}%</div>
              </div>
              <div style={{ height: 4, background: "#EEF1F8", borderRadius: 999, marginTop: 5 }}>
                <div style={{ width: `${s.p}%`, height: "100%", background: grad, borderRadius: 999 }}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Bottom tab */}
    <div style={{ marginTop: "auto", padding: "10px 14px 18px", display: "flex", justifyContent: "space-around", borderTop: "1px solid var(--border)", background: "white" }}>
      {[IconHome, IconLayers, IconChart, IconUsers].map((I, i) => (
        <div key={i} style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", color: i === 0 ? "var(--indigo-600)" : "var(--ink-400)", background: i === 0 ? "var(--indigo-50)" : "transparent" }}>
          <I size={18} stroke={2}/>
        </div>
      ))}
    </div>
  </div>
);

const PhoneScreenStats = () => (
  <div style={{ width: "100%", height: "100%", paddingTop: 48, background: "linear-gradient(180deg, #FAFAFE, white)" }}>
    <div style={{ padding: "12px 16px" }}>
      <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>Прогресс</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink-900)", marginTop: 4 }}>Эта неделя</div>
    </div>

    {/* Chart */}
    <div style={{ padding: "8px 16px" }}>
      <div style={{ display: "flex", alignItems: "end", gap: 6, height: 110 }}>
        {[40, 65, 30, 80, 70, 95, 60].map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: "100%",
              height: `${h}%`,
              borderRadius: 6,
              background: i === 5 ? "linear-gradient(180deg, #8B5CF6, #6366F1)" : "linear-gradient(180deg, #C0C7FE, #9BA4FB)",
              boxShadow: i === 5 ? "0 6px 14px -4px rgba(139,92,246,.5)" : "none",
            }}/>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--ink-500)" }}>{["П","В","С","Ч","П","С","В"][i]}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      <div style={{ padding: 10, borderRadius: 14, background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)", border: "1px solid var(--mint-300)" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--mint-600)", textTransform: "uppercase", letterSpacing: ".04em" }}>Точность</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--mint-600)", marginTop: 2 }}>89%</div>
      </div>
      <div style={{ padding: 10, borderRadius: 14, background: "var(--indigo-50)", border: "1px solid var(--indigo-200)" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--indigo-600)", textTransform: "uppercase", letterSpacing: ".04em" }}>Решено</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--indigo-600)", marginTop: 2 }}>84</div>
      </div>
    </div>

    {/* Achievement */}
    <div style={{ margin: "0 16px", padding: 12, borderRadius: 14, background: "linear-gradient(135deg, #1A1F36, #2D3350)", color: "white", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #F59E0B, #FB7185)", display: "grid", placeItems: "center" }}>
        <IconTrophy size={18} stroke={2.2}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--amber-300)", textTransform: "uppercase" }}>Достижение</div>
        <div style={{ fontSize: 12, fontWeight: 700, marginTop: 1 }}>50 заданий подряд!</div>
      </div>
    </div>
  </div>
);

window.Mobile = Mobile;
