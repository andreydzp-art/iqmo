// ============================================================
// IQMO — Reusable product-mockup primitives
// ============================================================

// ---------- Streak counter ----------
const StreakBadge = ({ days = 47, size = "md" }) => {
  const big = size === "lg";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: big ? 12 : 8,
      padding: big ? "10px 16px 10px 12px" : "6px 12px 6px 8px",
      borderRadius: 999,
      background: "linear-gradient(135deg, #FFF1D6 0%, #FFE0CF 100%)",
      border: "1px solid rgba(245,158,11,.25)",
      boxShadow: "0 8px 22px -10px rgba(245,158,11,.5)",
    }}>
      <div style={{
        width: big ? 36 : 28, height: big ? 36 : 28, borderRadius: "50%",
        background: "linear-gradient(180deg, #FBBF24, #F97316)",
        display: "grid", placeItems: "center",
        boxShadow: "inset 0 -2px 0 rgba(0,0,0,.10), 0 6px 14px -6px rgba(245,158,11,.6)",
      }}>
        <IconFlame size={big ? 20 : 16} stroke={2} style={{ color: "white" }} />
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: big ? 22 : 16, color: "var(--ink-900)" }}>
          {days} <span style={{ fontSize: big ? 13 : 11, color: "var(--ink-600)", fontWeight: 600 }}>дней</span>
        </div>
        {big && <div style={{ fontSize: 11, color: "var(--amber-600)", fontWeight: 600, marginTop: 3 }}>СЕРИЯ</div>}
      </div>
    </div>
  );
};

// ---------- XP / level bar ----------
const XPBar = ({ level = 14, xp = 1820, next = 2400, color = "indigo" }) => {
  const pct = Math.round((xp / next) * 100);
  const grad = color === "mint"
    ? "linear-gradient(90deg, #10B981, #34D399)"
    : "linear-gradient(90deg, #6366F1, #8B5CF6)";
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: grad, color: "white",
            display: "grid", placeItems: "center",
            fontWeight: 800, fontSize: 13, fontFamily: "var(--font-display)",
            boxShadow: "0 6px 14px -6px rgba(99,102,241,.6)",
          }}>{level}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-900)" }}>Уровень {level}</div>
            <div style={{ fontSize: 11, color: "var(--ink-500)", fontWeight: 600 }}>{xp.toLocaleString("ru")} / {next.toLocaleString("ru")} XP</div>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo-600)" }}>{pct}%</div>
      </div>
      <div style={{
        height: 10, borderRadius: 999, overflow: "hidden",
        background: "linear-gradient(180deg, #EEF1F8, #E2E6F2)",
        boxShadow: "inset 0 1px 2px rgba(15,23,42,.08)",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: grad,
          borderRadius: 999,
          boxShadow: "0 0 14px rgba(99,102,241,.5)",
          transition: "width 1.2s cubic-bezier(.2,.7,.2,1)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.4) 50%, transparent 100%)",
            backgroundSize: "200px 100%",
            animation: "shimmer 2s linear infinite",
          }}/>
        </div>
      </div>
    </div>
  );
};

// ---------- XP chip floating ----------
const XPChip = ({ value = "+45 XP", tone = "mint", style = {} }) => {
  const bg = tone === "mint" ? "linear-gradient(135deg, #10B981, #34D399)" :
             tone === "amber"? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
                               "linear-gradient(135deg, #6366F1, #8B5CF6)";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 14px", borderRadius: 999,
      background: bg, color: "white",
      fontWeight: 800, fontSize: 14, fontFamily: "var(--font-display)",
      boxShadow: "0 12px 26px -10px rgba(16,185,129,.55), inset 0 1px 0 rgba(255,255,255,.4)",
      letterSpacing: "-.01em",
      ...style,
    }}>
      <IconBolt size={14} stroke={2.5} /> {value}
    </div>
  );
};

// ---------- Achievement / badge ----------
const Achievement = ({ icon = "trophy", label, sub, locked = false, color = "indigo" }) => {
  const Comp = icon === "trophy" ? IconTrophy : icon === "shield" ? IconShield : icon === "star" ? IconStar : icon === "rocket" ? IconRocket : IconSparkle;
  const grad = locked ? "linear-gradient(135deg, #DDE0EA, #B6BBCB)" :
    color === "mint"  ? "linear-gradient(135deg, #10B981, #34D399)" :
    color === "amber" ? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
    color === "rose"  ? "linear-gradient(135deg, #F43F5E, #FB7185)" :
                        "linear-gradient(135deg, #6366F1, #8B5CF6)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: locked ? .55 : 1 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: grad,
        display: "grid", placeItems: "center", color: "white",
        boxShadow: locked ? "none" : "0 12px 24px -10px rgba(99,102,241,.45)",
        position: "relative",
      }}>
        <Comp size={24} stroke={2} />
        {locked && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(15,23,42,.35)", borderRadius: 16 }}><IconLock size={18} style={{ color: "white" }}/></div>}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 500 }}>{sub}</div>}
      </div>
    </div>
  );
};

// ---------- Progress ring ----------
const Ring = ({ value = 78, size = 88, label = "", sub = "", color = "indigo" }) => {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const stroke = color === "mint" ? "url(#ringMint)" : color === "amber" ? "url(#ringAmber)" : "url(#ringIndigo)";
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="ringIndigo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="ringMint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981"/><stop offset="100%" stopColor="#34D399"/>
          </linearGradient>
          <linearGradient id="ringAmber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#FBBF24"/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} stroke="#EEF0F7" strokeWidth="8" fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={stroke} strokeWidth="8" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", lineHeight: 1.1 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: size > 100 ? 28 : 20, color: "var(--ink-900)" }}>{value}<span style={{ fontSize: 13, color: "var(--ink-500)" }}>%</span></div>
          {label && <div style={{ fontSize: 10, color: "var(--ink-500)", fontWeight: 600, marginTop: 2, letterSpacing: ".04em", textTransform: "uppercase" }}>{label}</div>}
        </div>
      </div>
    </div>
  );
};

// ---------- Avatar circle ----------
const Avatar = ({ initials = "АП", color = "indigo", size = 32, ring = false }) => {
  const grad = color === "mint"  ? "linear-gradient(135deg, #10B981, #34D399)" :
               color === "amber" ? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
               color === "rose"  ? "linear-gradient(135deg, #F43F5E, #FB7185)" :
               color === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" :
                                   "linear-gradient(135deg, #6366F1, #818CF8)";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: grad, color: "white",
      display: "grid", placeItems: "center",
      fontWeight: 700, fontSize: size * 0.36,
      fontFamily: "var(--font-display)",
      boxShadow: ring ? "0 0 0 3px white, 0 0 0 4.5px var(--indigo-200)" : "0 4px 10px -3px rgba(15,23,42,.18)",
      flexShrink: 0,
    }}>{initials}</div>
  );
};

// ---------- Subject tile ----------
const SubjectTile = ({ icon: I, name, progress, tasks, color = "indigo", active = false }) => {
  const grad = color === "mint" ? "linear-gradient(135deg, #10B981, #34D399)" :
               color === "amber"? "linear-gradient(135deg, #F59E0B, #FBBF24)" :
               color === "rose" ? "linear-gradient(135deg, #F43F5E, #FB7185)" :
               color === "violet"? "linear-gradient(135deg, #8B5CF6, #A78BFA)" :
                                   "linear-gradient(135deg, #6366F1, #818CF8)";
  return (
    <div style={{
      padding: 14, borderRadius: 18,
      background: "white",
      border: active ? "1.5px solid var(--indigo-300)" : "1px solid var(--border)",
      boxShadow: active ? "0 14px 32px -14px rgba(99,102,241,.4)" : "0 2px 6px rgba(15,23,42,.04)",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, background: grad, color: "white",
        display: "grid", placeItems: "center", flexShrink: 0,
        boxShadow: "0 8px 18px -8px rgba(99,102,241,.5)",
      }}><I size={20} stroke={2}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink-900)" }}>{name}</div>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-600)" }}>{progress}%</div>
        </div>
        <div style={{ height: 5, background: "#EEF1F8", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: grad, borderRadius: 999 }}/>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-500)", marginTop: 5, fontWeight: 500 }}>{tasks} заданий</div>
      </div>
    </div>
  );
};

// ---------- Phone frame ----------
const PhoneFrame = ({ children, w = 280, h = 580 }) => (
  <div style={{
    width: w, height: h,
    borderRadius: 44, padding: 8,
    background: "linear-gradient(180deg, #1A1F36, #0B1020)",
    boxShadow: "0 40px 80px -30px rgba(15,23,42,.45), inset 0 0 0 1.5px rgba(255,255,255,.06)",
    position: "relative",
  }}>
    <div style={{
      position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
      width: 100, height: 24, borderRadius: 999, background: "#0B1020", zIndex: 2,
    }}/>
    <div style={{
      width: "100%", height: "100%",
      borderRadius: 36, background: "white",
      overflow: "hidden", position: "relative",
    }}>
      {children}
    </div>
  </div>
);

Object.assign(window, {
  StreakBadge, XPBar, XPChip, Achievement, Ring, Avatar, SubjectTile, PhoneFrame
});
