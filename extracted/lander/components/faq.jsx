// ============================================================
// IQMO — FAQ (accordion)
// ============================================================
const FAQ = () => {
  const [open, setOpen] = React.useState(0);

  const items = [
    {
      q: "Что такое IQMO School и для кого она?",
      a: "Это онлайн-платформа подготовки к ОГЭ для учеников 8–9 классов. Внутри — задания по форматам реального экзамена, объяснения ошибок и игровая система мотивации с уровнями, опытом и стриками. Подходит и тем, кто только начинает готовиться, и тем, кто хочет подтянуть слабые темы перед экзаменом.",
    },
    {
      q: "Чем это лучше, чем репетитор?",
      a: "Репетитор приходит 1–2 раза в неделю и стоит 2 000–4 000 ₽ за час. В IQMO ребёнок занимается каждый день по 10–15 минут, и неделя стоит 299 ₽ — в 10 раз дешевле одного занятия. Платформа адаптируется под ученика, автоматически подбирает слабые темы и сразу показывает результат, не дожидаясь следующей встречи.",
    },
    {
      q: "А ребёнок действительно будет заниматься сам?",
      a: "Это основная задача платформы. Стрики, уровни, опыт и достижения работают так же, как в играх и Duolingo — ребёнок открывает приложение сам, чтобы не потерять серию и закрыть цель недели. По нашим данным, 87% учеников продолжают заниматься на 30-й день — без напоминаний от родителей.",
    },
    {
      q: "Сколько времени в день нужно заниматься?",
      a: "Достаточно 10–15 минут в день — формат специально сделан под короткие сессии после школы или в транспорте. Эффективнее заниматься каждый день по чуть-чуть, чем раз в неделю по два часа. Платформа сама подскажет, когда стоит сделать перерыв.",
    },
    {
      q: "Могу ли я как родитель видеть прогресс?",
      a: "Да. У родителя есть отдельный кабинет с аналитикой: прогресс по темам, точность ответов, время занятий, динамика по неделям. Никакого микро-контроля — вы видите общую картину и понимаете, к каким темам стоит вернуться.",
    },
    {
      q: "Какие предметы есть на платформе?",
      a: "Сейчас доступны 9 предметов ОГЭ: математика, русский язык, обществознание, физика, химия, биология, география, информатика и история. По каждому предмету — структурированная программа и задания по форматам реального экзамена.",
    },
    {
      q: "Что если ребёнку не понравится?",
      a: "Первые 7 дней — бесплатно. За это время вы и ребёнок можете спокойно попробовать платформу и решить, подходит ли формат. Если нет — отмена в один клик, без вопросов и удержаний. Оплата спишется только если подписка не отменена.",
    },
    {
      q: "На каких устройствах работает IQMO?",
      a: "На любых: смартфон, планшет, ноутбук, компьютер. Прогресс автоматически синхронизируется между устройствами. Большинство учеников занимаются с телефона — так удобнее в коротких паузах между школой и кружками.",
    },
  ];

  return (
    <section className="section" id="faq" style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <div className="faq-grid">
          <div className="faq-intro">
            <div className="eyebrow">
              <span className="dot" />
              Частые вопросы
            </div>
            <h2 className="h-xl" style={{ marginTop: 22 }}>
              Что обычно <span className="gradient-text">спрашивают родители</span>
            </h2>
            <p className="lead" style={{ marginTop: 22 }}>
              Не нашли свой вопрос? Напишите нам — отвечаем в&nbsp;течение 2&nbsp;часов в&nbsp;любой день недели.
            </p>
            <a href="#" className="btn btn-secondary" style={{ marginTop: 28 }}>
              Задать свой вопрос <IconArrow size={14} stroke={2.2}/>
            </a>
          </div>

          <div className="faq-list">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{it.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <IconChevron size={18} stroke={2.4}/>
                    </span>
                  </button>
                  <div className="faq-a-wrap" style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}>
                    <div style={{ overflow: "hidden" }}>
                      <div className="faq-a">{it.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: minmax(0, 400px) 1fr;
          gap: 80px;
          align-items: start;
        }
        .faq-intro { padding-top: 8px; position: sticky; top: 100px; }
        .faq-list { display: flex; flex-direction: column; gap: 4px; }
        .faq-item {
          border-bottom: 1px solid var(--border);
        }
        .faq-item:first-child { border-top: 1px solid var(--border); }
        .faq-q {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0;
          gap: 24px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 18px;
          letter-spacing: -.012em;
          color: var(--ink-900);
          text-align: left;
          line-height: 1.35;
          transition: color .15s ease;
        }
        .faq-q:hover { color: var(--indigo-600); }
        .faq-icon {
          width: 36px; height: 36px;
          border-radius: 999px;
          background: var(--ink-50);
          color: var(--ink-700);
          display: grid; place-items: center;
          flex-shrink: 0;
          transition: transform .25s cubic-bezier(.2,.7,.2,1), background .2s ease, color .2s ease;
        }
        .faq-item.is-open .faq-icon {
          transform: rotate(90deg);
          background: var(--indigo-50);
          color: var(--indigo-600);
        }
        .faq-a-wrap {
          display: grid;
          transition: grid-template-rows .35s cubic-bezier(.2,.7,.2,1);
        }
        .faq-a {
          padding: 0 0 24px 0;
          font-size: 16px;
          color: var(--ink-600);
          line-height: 1.6;
          max-width: 700px;
        }
        @media (max-width: 980px) {
          .faq-grid { grid-template-columns: 1fr; gap: 40px; }
          .faq-intro { position: static; }
        }
      `}</style>
    </section>
  );
};

window.FAQ = FAQ;
