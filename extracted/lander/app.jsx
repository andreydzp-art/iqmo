// ============================================================
// IQMO School — App entry
// ============================================================
const App = () => {
  // Reveal-on-scroll: tag every section's first-level child to fade in.
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "-40px 0px -10% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Nav/>
      <main>
        <Hero/>
        <div className="reveal"><Pain/></div>
        <div className="reveal"><Mobile/></div>
        <div className="reveal"><Gamification/></div>
        <div className="reveal"><Features/></div>
        <div className="reveal"><Comparison/></div>
        <div className="reveal"><Trust/></div>
        <div className="reveal"><Pricing/></div>
        <div className="reveal"><FAQ/></div>
        <div className="reveal"><FinalCTA/></div>
      </main>
      <Footer/>

      {/* Sticky mobile CTA */}
      <div className="sticky-cta">
        <div className="price-tag">
          299&nbsp;₽ <span>в неделю · без репетитора</span>
        </div>
        <button type="button" className="btn btn-primary" data-open-register data-cta-source="sticky">
          Попробовать <IconArrow size={14} stroke={2.4}/>
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
