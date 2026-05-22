// ============================================================
// IQMO — Navigation
// ============================================================
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { l: "Платформа", href: "#gamification" },
    { l: "Возможности", href: "#features" },
    { l: "Сравнение", href: "#comparison" },
    { l: "Отзывы", href: "#trust" },
    { l: "Цена", href: "#pricing" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      transition: "background .3s ease, box-shadow .3s ease, backdrop-filter .3s ease",
      background: scrolled ? "rgba(250,250,254,.78)" : "transparent",
      backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 76,
      }}>
        <Logo />
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-links">
          {links.map(({ l, href }) => (
            <a key={l} href={href} style={{
              padding: "10px 14px", fontSize: 14, fontWeight: 600, color: "var(--ink-600)",
              borderRadius: 999, transition: "color .15s ease, background .15s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink-900)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-600)"}
            >{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="/login.html" className="btn btn-ghost" style={{ padding: "12px 18px", fontSize: 14 }}>Войти</a>
          <button type="button" className="btn btn-primary" style={{ padding: "12px 20px", fontSize: 14 }} data-open-register data-cta-source="nav">
            Попробовать <IconArrow size={16} stroke={2.2}/>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
};

window.Nav = Nav;
