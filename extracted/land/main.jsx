/* global React, ReactDOM */
// IQMO School — production landing (/land)

const { Nav, Hero, Problem, WhyDifferent, Comparison, HowUsed, Trust, Pricing, FinalCTA, StickyCTA } = window.IQMO_SECTIONS;

const TWEAK_DEFAULTS = {
  direction: 'premium',
  theme: 'light',
  price: 299,
  headline: 'Подготовка к ОГЭ без репетиторов |за 299 ₽ в неделю|',
  heroLayout: 'split',
  mascotInDash: true,
  stickyMobileCta: true,
  showFloatCards: true,
};

function Landing({ narrow, t }) {
  const headline = t.headline.replace(/299/g, String(t.price));

  return (
    <div
      className="iqmo"
      data-direction={t.direction}
      data-theme={t.theme}
      data-narrow={narrow ? 'true' : 'false'}
      data-hero-layout={t.heroLayout}
      data-mascot={t.mascotInDash ? 'on' : 'off'}
      data-float={t.showFloatCards ? 'on' : 'off'}
      style={{ minHeight: '100%' }}
    >
      <Nav narrow={narrow} />
      <Hero narrow={narrow} price={t.price} headline={headline} />
      <Problem />
      <WhyDifferent narrow={narrow} />
      <Comparison price={t.price} />
      <HowUsed />
      <Trust />
      <Pricing price={t.price} />
      <FinalCTA />
      {t.stickyMobileCta && <StickyCTA price={t.price} />}
    </div>
  );
}

function useNarrow() {
  const [narrow, setNarrow] = React.useState(
    () => window.matchMedia('(max-width: 640px)').matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return narrow;
}

function App() {
  const narrow = useNarrow();
  return <Landing narrow={narrow} t={TWEAK_DEFAULTS} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
