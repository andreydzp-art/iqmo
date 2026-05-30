/* global React, ReactDOM */
// IQMO School — production landing (/land)
//
// Главная не должна ассоциироваться с продажей доступа: блоки Pricing,
// Comparison и StickyCTA сняты с рендера (компоненты остались в
// window.IQMO_SECTIONS на случай, если их кто-то импортирует со стороны),
// price/headline-копия — в чисто образовательном тоне.

const { Nav, Hero, Problem, WhyDifferent, HowUsed, Trust, FinalCTA } = window.IQMO_SECTIONS;

const TWEAK_DEFAULTS = {
  direction: 'premium',
  theme: 'light',
  headline: 'Подготовка к ОГЭ |в формате тренажёра|',
  heroLayout: 'split',
  mascotInDash: true,
  showFloatCards: true,
};

function Landing({ narrow, t }) {
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
      <Hero narrow={narrow} headline={t.headline} />
      <Problem />
      <WhyDifferent narrow={narrow} />
      <HowUsed />
      <Trust />
      <FinalCTA />
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
