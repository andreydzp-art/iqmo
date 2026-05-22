// ============================================================
// IQMO — Footer
// ============================================================
const Footer = () => {
  const cols = [
    {
      h: "Платформа",
      l: ["Возможности", "Геймификация", "Аналитика", "Мобильное приложение"],
    },
    {
      h: "Предметы",
      l: ["Математика", "Русский язык", "Физика", "Информатика", "Все предметы"],
    },
    {
      h: "Компания",
      l: ["О школе", "Команда", "Карьера", "Контакты"],
    },
    {
      h: "Помощь",
      l: ["Поддержка", "FAQ", "Договор оферты", "Политика конфиденциальности"],
    },
  ];

  return (
    <footer style={{
      background: "white",
      borderTop: "1px solid var(--border)",
      padding: "64px 0 28px",
    }}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo size={34}/>
            <p style={{ marginTop: 18, fontSize: 14, color: "var(--ink-600)", lineHeight: 1.55, maxWidth: 320 }}>
              IQMO School — современная платформа подготовки к&nbsp;ОГЭ. Геймифицированный формат, который реально работает.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {[
                {l: "VK"},
                {l: "TG"},
                {l: "YT"},
              ].map((s, i) => (
                <a key={i} href="#" style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "var(--ink-50)", color: "var(--ink-600)",
                  display: "grid", placeItems: "center",
                  fontSize: 11, fontWeight: 800, letterSpacing: ".04em",
                  border: "1px solid var(--border)",
                  transition: "all .15s ease",
                }}>{s.l}</a>
              ))}
            </div>
          </div>

          {cols.map((c, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink-900)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>
                {c.h}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.l.map((l, j) => (
                  <a key={j} href="#" style={{ fontSize: 14, color: "var(--ink-600)", fontWeight: 500, transition: "color .15s ease" }}
                     onMouseEnter={e => e.currentTarget.style.color = "var(--ink-900)"}
                     onMouseLeave={e => e.currentTarget.style.color = "var(--ink-600)"}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          fontSize: 13, color: "var(--ink-500)", fontWeight: 500,
        }}>
          <div>© 2026 IQMO · ООО «Контент Айти» · ИНН 7810985013</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:support@iqmo.ru" style={{ color: "var(--ink-500)" }}>support@iqmo.ru</a>
            <a href="/docs/oferta.pdf" target="_blank" rel="noopener" style={{ color: "var(--ink-500)" }}>Оферта</a>
            <a href="/docs/privacy_policy.pdf" target="_blank" rel="noopener" style={{ color: "var(--ink-500)" }}>Политика</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: span 2; }
        }
      `}</style>
    </footer>
  );
};

window.Footer = Footer;
