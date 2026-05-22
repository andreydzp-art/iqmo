// ============================================================
// IQMO — Icon set (outline, geometric, 1.75 stroke)
// ============================================================
const Icon = ({ children, size = 22, stroke = 1.75, className = "", style = {} }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round"
    className={className} style={style}
  >
    {children}
  </svg>
);

const IconFlame = (p) => <Icon {...p}><path d="M12 3c1 4 5 5 5 9a5 5 0 1 1-10 0c0-1.7 .8-2.6 1.7-3.4C9.6 7.8 10 6 10 4c1 1 2 2 2 4 1-1 1.4-2 0-5Z" /></Icon>;
const IconBolt  = (p) => <Icon {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" /></Icon>;
const IconTrophy= (p) => <Icon {...p}><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M5 5H3v2a3 3 0 0 0 3 3"/><path d="M19 5h2v2a3 3 0 0 1-3 3"/><path d="M10 14h4v3h-4z"/><path d="M8 20h8"/></Icon>;
const IconShield= (p) => <Icon {...p}><path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconStar  = (p) => <Icon {...p}><path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z"/></Icon>;
const IconHeart = (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></Icon>;
const IconCheck = (p) => <Icon {...p}><path d="m5 12 5 5L20 7"/></Icon>;
const IconX     = (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>;
const IconArrow = (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>;
const IconPlay  = (p) => <Icon {...p}><path d="M8 5v14l11-7L8 5Z"/></Icon>;
const IconPhone = (p) => <Icon {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></Icon>;
const IconChart = (p) => <Icon {...p}><path d="M4 19h16"/><path d="M7 16v-5"/><path d="M12 16V8"/><path d="M17 16v-3"/></Icon>;
const IconRocket= (p) => <Icon {...p}><path d="M14 4c3 .5 6 3.5 6 6.5-2 1-4 2-5 4-1 2-1.5 4-2.5 5.5-2-1-3.5-2.5-4.5-4.5C6 13.5 7 11.5 9 10c2-1 3-3 5-6Z"/><circle cx="14" cy="10" r="1.4"/><path d="M5 14c-1 1.5-1 4 0 5 1 1 3.5 1 5 0"/></Icon>;
const IconBook  = (p) => <Icon {...p}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 0 2 2h12"/></Icon>;
const IconTarget= (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6"/></Icon>;
const IconBell  = (p) => <Icon {...p}><path d="M6 18V11a6 6 0 1 1 12 0v7"/><path d="M4 18h16"/><path d="M10 21a2 2 0 0 0 4 0"/></Icon>;
const IconClock = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>;
const IconUsers = (p) => <Icon {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.2 3.1-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="8" r="2.5"/><path d="M21 19c-.3-2-1.5-3.4-3.5-4"/></Icon>;
const IconSparkle=(p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></Icon>;
const IconLock  = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></Icon>;
const IconUnlock= (p) => <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/></Icon>;
const IconLayers= (p) => <Icon {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/></Icon>;
const IconBrain = (p) => <Icon {...p}><path d="M9 5a3 3 0 0 1 3-1 3 3 0 0 1 3 1c2 0 4 1.5 4 4 0 1-.4 1.8-1 2.4.6.6 1 1.4 1 2.4 0 2-1.5 3.5-3.5 3.5C15 19 13.6 20 12 20s-3-1-3.5-2.7C6.5 17.3 5 15.8 5 13.8c0-1 .4-1.8 1-2.4-.6-.6-1-1.4-1-2.4C5 6.5 7 5 9 5Z"/><path d="M12 4v16"/></Icon>;
const IconWand  = (p) => <Icon {...p}><path d="m5 19 11-11 3 3L8 22l-3 0v-3Z"/><path d="m15 5 1 1"/><path d="M3 5h2M4 4v2"/><path d="M19 13h2M20 12v2"/></Icon>;
const IconCalendar = (p) => <Icon {...p}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16"/><path d="M8 3v4M16 3v4"/></Icon>;
const IconWifi  = (p) => <Icon {...p}><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></Icon>;
const IconChevron=(p)=> <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>;
const IconQuote = (p) => <Icon {...p}><path d="M6 16c0-3.5 2-6 5-7l-1 2c-1.5.6-2 2-2 3h3v4H6v-2Z"/><path d="M14 16c0-3.5 2-6 5-7l-1 2c-1.5.6-2 2-2 3h3v4h-5v-2Z"/></Icon>;
const IconHome  = (p) => <Icon {...p}><path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z"/></Icon>;

// Brand mark
const Logo = ({ size = 30 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: "var(--grad-primary)",
      boxShadow: "0 8px 20px -8px rgba(99,102,241,.6), inset 0 1px 0 rgba(255,255,255,.4)",
      display: "grid", placeItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <svg width={size*0.62} height={size*0.62} viewBox="0 0 24 24" fill="none">
        <path d="M5 4h3v16H5z" fill="white"/>
        <path d="M11 4h3l5 10v6h-3l-5-10V4Z" fill="white" opacity=".95"/>
        <circle cx="19" cy="6" r="2" fill="#FCD34D"/>
      </svg>
    </div>
    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-.02em", color: "var(--ink-900)" }}>
      IQMO <span style={{ color: "var(--ink-500)", fontWeight: 500 }}>School</span>
    </div>
  </div>
);

Object.assign(window, {
  Icon, Logo,
  IconFlame, IconBolt, IconTrophy, IconShield, IconStar, IconHeart,
  IconCheck, IconX, IconArrow, IconPlay, IconPhone, IconChart,
  IconRocket, IconBook, IconTarget, IconBell, IconClock, IconUsers,
  IconSparkle, IconLock, IconUnlock, IconLayers, IconBrain, IconWand,
  IconCalendar, IconWifi, IconChevron, IconQuote, IconHome,
});
