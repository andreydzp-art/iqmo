// ============================================================
// IQMO — Final emotional CTA
// ============================================================
const FinalCTA = () => {
  return (
    <section className="section" id="cta" style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg, #0B1020 0%, #1A1F36 60%, #2D1B69 100%)",
      color: "white",
      padding: "120px 0",
    }}>
      {/* Decorative glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "radial-gradient(ellipse 700px 500px at 20% 20%, rgba(139,92,246,.4), transparent 60%)," +
          "radial-gradient(ellipse 600px 400px at 80% 90%, rgba(16,185,129,.25), transparent 60%)",
      }}/>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 80%)",
      }}/>

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <div className="eyebrow" style={{
          margin: "0 auto", background: "rgba(255,255,255,.08)", color: "white",
          borderColor: "rgba(255,255,255,.12)",
        }}>
          <span className="dot" style={{ background: "var(--mint-400)" }}/>
          ОГЭ Химия · Биология · 2026
        </div>

        <h2 className="h-display" style={{ marginTop: 26, color: "white" }}>
          Ребёнка невозможно <br className="lg-br"/>заставить учиться.<br/>
          <span style={{
            background: "linear-gradient(135deg, #FBBF24 0%, #F472B6 40%, #A78BFA 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Но&nbsp;можно сделать так,</span><br/>
          чтобы ему самому стало интересно.
        </h2>

        <p className="lead" style={{
          color: "rgba(255,255,255,.75)", margin: "26px auto 0",
          textAlign: "center", maxWidth: 640, fontSize: 19,
        }}>
          Современный формат подготовки к&nbsp;ОГЭ — карта тем по&nbsp;ФИПИ,
          тренажёр заданий, серии и&nbsp;XP-уровни.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40, justifyContent: "center" }}>
          <button type="button" className="btn btn-primary btn-lg" style={{ padding: "20px 32px", fontSize: 17 }} data-open-register data-cta-source="final">
            Начать обучение <IconArrow size={18} stroke={2.2}/>
          </button>
          <a href="/express-chemistry.html" className="btn btn-lg" style={{
            background: "rgba(255,255,255,.08)",
            color: "white",
            border: "1px solid rgba(255,255,255,.18)",
            backdropFilter: "blur(20px)",
            padding: "20px 32px", fontSize: 17,
          }}>
            <IconPlay size={16} stroke={2.2}/> Посмотреть платформу
          </a>
        </div>

        <div style={{
          marginTop: 48, paddingTop: 32, borderTop: "1px dashed rgba(255,255,255,.15)",
          display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 36px",
          fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 600,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <IconShield size={16} stroke={2} style={{ color: "var(--mint-400)" }}/> Программа по&nbsp;спецификации ФИПИ
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <IconCheck size={16} stroke={2.4} style={{ color: "var(--mint-400)" }}/> 26 типов задач ОГЭ
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <IconWifi size={16} stroke={2} style={{ color: "var(--mint-400)" }}/> На&nbsp;всех устройствах
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <IconUsers size={16} stroke={2} style={{ color: "var(--mint-400)" }}/> 12 400+ семей уже&nbsp;с&nbsp;нами
          </span>
        </div>
      </div>
    </section>
  );
};

window.FinalCTA = FinalCTA;
