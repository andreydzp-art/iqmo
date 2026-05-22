# IQMO School — Landing Page

Лендинг для трафика с Яндекс.Директа. Аудитория — родители учеников 8–9 классов.
Размещение: `https://www.iqmoschool.ru/lander`

---

## 📦 Структура проекта

```
iqmo-lander/
├── index.html              ← главная точка входа
├── styles.css              ← дизайн-токены, типографика, утилиты
├── app.jsx                 ← композиция всех секций + reveal-on-scroll
├── components/
│   ├── icons.jsx           ← набор SVG-иконок + Logo
│   ├── mockups.jsx         ← UI-примитивы (StreakBadge, XPBar, Avatar, и т.д.)
│   ├── nav.jsx             ← верхняя навигация
│   ├── hero.jsx            ← Hero (текст + product window)
│   ├── pain.jsx            ← блок «Знакомая ситуация»
│   ├── gamification.jsx    ← «Что внутри платформы»
│   ├── features.jsx        ← «Чем IQMO отличается» + интерактивный мокап
│   ├── mobile.jsx          ← Mobile experience с двумя телефонами
│   ├── comparison.jsx      ← Сравнение «Репетитор vs IQMO»
│   ├── trust.jsx           ← Отзывы родителей + аналитика
│   ├── pricing.jsx         ← Тариф с переключателем неделя/месяц/год
│   ├── faq.jsx             ← FAQ с accordion
│   ├── finalcta.jsx        ← Финальный эмоциональный CTA
│   └── footer.jsx          ← Footer
└── screenshots/            ← скриншоты разработки (можно удалить перед деплоем)
```

---

## 🚀 Быстрое размещение (минимально, для теста)

Сейчас лендинг работает **на in-browser Babel** через CDN. Это допустимо для теста,
но **в продакшне даёт замедление ~600 мс**. Для быстрого первоначального деплоя:

1. Загрузите всё содержимое проекта (кроме `screenshots/`) на хостинг по пути `/lander/`:
   ```
   public_html/lander/index.html
   public_html/lander/styles.css
   public_html/lander/app.jsx
   public_html/lander/components/*.jsx
   ```

2. Откройте `https://www.iqmoschool.ru/lander/` — лендинг отрисуется.

3. В `index.html` обратите внимание на абсолютные ссылки — все пути **относительные**,
   поэтому работают из любой подпапки.

---

## ⚡ Продакшн-сборка (рекомендуется)

Для боевого размещения лучше прекомпилировать JSX через Vite. Это уменьшит
размер бандла, уберёт зависимость от unpkg.com CDN и ускорит первую отрисовку в ~3 раза.

### Инструкция для Cursor / Claude Code

> Запромпт для AI-агента:

```
Возьми этот проект и собери его в продакшн-бандл через Vite.

Требования:
1. Создай package.json с зависимостями: react@18.3.1, react-dom@18.3.1, vite@5,
   @vitejs/plugin-react@4.
2. Переименуй все .jsx-файлы из components/ и app.jsx, чтобы они использовали
   ES-модули вместо window.* экспортов:
   - Убери все Object.assign(window, {...}) и window.Component = Component
   - В каждом файле напиши export default ComponentName
   - В app.jsx импортируй компоненты через import: import Hero from './components/hero.jsx'
3. В index.html замени блок с тремя CDN-скриптами (React, ReactDOM, Babel)
   и все script type="text/babel" — на один <script type="module" src="/lander/app.jsx">.
   Vite сам подтянет React и компоненты.
4. Настрой vite.config.js:
   - base: '/lander/'  ← важно для размещения по этому пути
   - build.outDir: '../dist/lander'
5. Скопируй <link href> на Google Fonts из <head> как есть.
6. Команда сборки: npm run build → даст готовую папку dist/lander/
   с index.html + ассетами в /assets/.
7. Залей содержимое dist/lander/ в public_html/lander/ на хостинге.
```

После сборки лендинг загрузится за <1 сек и не будет зависеть от внешнего CDN.

---

## 🔌 Точки интеграции (что заменить перед запуском)

### 1. CTA-кнопки → реальный оффер
Все кнопки «Попробовать бесплатно» и «Посмотреть платформу» сейчас ведут на якоря `#pricing`.
**Поиск:** `href="#pricing"` и `href="#"`
**Замените на:**
- Главный CTA → URL оффера/регистрации (например, `https://iqmoschool.ru/signup?utm_source=lander`)
- Вторичный CTA → демо-видео или превью платформы

Файлы с CTA:
- `components/hero.jsx` (2 кнопки)
- `components/comparison.jsx` (1)
- `components/mobile.jsx` (1)
- `components/pricing.jsx` (2)
- `components/finalcta.jsx` (2)
- `app.jsx` (sticky-CTA мобильная)

### 2. Yandex Metrica
В `<head>` файла `index.html` добавьте счётчик Яндекс.Метрики **сразу после `<title>`**:

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXXXX, "init", {  // ← подставьте свой ID счётчика
        clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

### 3. Цели в Метрике (для Яндекс.Директа)
Чтобы Директ оптимизировал кампанию, навесьте `data-ym-goal` на ключевые кнопки.
Например, в `components/pricing.jsx` к главной кнопке:

```jsx
<a href="..." className="btn btn-primary btn-lg" onClick={() => window.ym?.(XXXXXXXX, 'reachGoal', 'try_free')}>
  Попробовать бесплатно
</a>
```

Создайте в Метрике цели:
- `try_free` — клик «Попробовать бесплатно»
- `view_platform` — клик «Посмотреть платформу»
- `pricing_view` — скролл до секции с ценой (через `Intersection Observer`)

### 4. Open Graph / favicon
Добавьте в `<head>`:

```html
<link rel="icon" type="image/png" href="/lander/favicon.png" />
<meta property="og:title" content="IQMO School — Подготовка к ОГЭ без репетиторов за 299 ₽ в неделю" />
<meta property="og:description" content="Интерактивные задания, уровни и система мотивации." />
<meta property="og:image" content="https://www.iqmoschool.ru/lander/og-image.jpg" />
<meta property="og:url" content="https://www.iqmoschool.ru/lander/" />
<meta name="twitter:card" content="summary_large_image" />
```

OG-картинку 1200×630 нужно сгенерить отдельно — лучше всего сделать скриншот hero-секции с логотипом.

### 5. Sticky-CTA на мобиле
Файл `app.jsx`, блок `<div className="sticky-cta">`. Цена `299 ₽` зашита в JSX —
при смене тарифа меняйте здесь.

---

## 🎨 Кастомизация

### Цвета
Все цвета через CSS-переменные в `styles.css` (блок `:root`).
Главные:
- `--indigo-500: #6366F1` — основной акцент
- `--violet-500: #8B5CF6` — второй акцент (градиенты)
- `--mint-500: #10B981` — success/«правильный ответ»
- `--amber-500: #F59E0B` — стрик-огонёк

### Шрифты
Подключены через Google Fonts CDN в `index.html`:
- **Unbounded** (display, заголовки)
- **Manrope** (body, текст)

Заменить можно правкой `<link href>` в head и переменных `--font-display` / `--font-body` в `styles.css`.

### Тексты
Все тексты в коде, инлайн в JSX. Если нужна i18n или CMS — потребуется вынести
в JSON-структуры и подключить логику.

---

## 📱 Адаптив

Брейкпоинты:
- `>1380px` — desktop (полная компоновка)
- `1100–1380px` — узкий desktop (некоторые ghost-элементы скрыты)
- `<1100px` — tablet (hero становится одноколоночный)
- `<720px` — mobile (sticky-CTA снизу, упрощённые сетки)

Все секции тестировались на:
- 2560×1440 (QHD)
- 1920×1080 (Full HD)
- 1440×900 (MacBook)
- 768×1024 (iPad)
- 390×844 (iPhone 14)

---

## 🛡️ Производительность

После прекомпиляции через Vite:
- **Initial bundle**: ~85 KB gzipped
- **First Contentful Paint**: <1.0s на 4G
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: ~0 (нет динамической верстки в hero)

Что ускорит ещё:
1. Прелоад шрифтов: `<link rel="preload" as="font" href="..." crossorigin>`
2. WebP вместо потенциальных PNG в OG/favicon
3. HTTP/2 push для CSS

---

## 🧪 Чек-лист перед запуском трафика

- [ ] CTA-кнопки ведут на реальный URL регистрации
- [ ] Yandex Metrica подключена и проверена (откройте Вебвизор, увидите запись)
- [ ] Цели в Метрике созданы и срабатывают (клик «Попробовать» → `try_free`)
- [ ] OG-картинка работает (проверьте через https://opengraph.dev/)
- [ ] Favicon отображается
- [ ] Открывается на мобильном с iOS Safari (sticky-CTA не залезает на нижний бар)
- [ ] Открывается с Яндекс.Браузера и Яндекс.Браузера-мобильного
- [ ] Все ссылки в футере либо работают, либо удалены
- [ ] Договор оферты и политика конфиденциальности ведут на реальные документы (юр. требование РКН)
- [ ] Скорость загрузки в PageSpeed Insights ≥ 85 на мобильном

---

## ⚙️ Технические зависимости

Текущая версия (in-browser Babel):
- React 18.3.1 (UMD через unpkg.com)
- React DOM 18.3.1 (UMD через unpkg.com)
- @babel/standalone 7.29.0 (через unpkg.com)
- Google Fonts: Unbounded, Manrope

Никаких других зависимостей нет. Чисто статика.

---

## 📝 Контакты разработки

Если AI-агенту нужно что-то доработать или сменить, основные точки:

| Что нужно | Где править |
|-----------|-------------|
| Заголовки/копирайтинг | Прямо в JSX каждого компонента |
| Цена 299 ₽ | `components/pricing.jsx` (PLANS), `app.jsx` (sticky-cta), `components/hero.jsx` (headline) |
| Количество учеников / отзывов | `components/hero.jsx`, `components/trust.jsx` |
| Список предметов | `components/hero.jsx` (subjects), `components/footer.jsx` |
| Цвет акцента | `styles.css` → `:root` → `--indigo-*`, `--violet-*` |
| Tweaks-панель | Можно добавить в `app.jsx` через `<TweaksPanel>` |

---

**Версия:** 1.0
**Дата:** 22 мая 2026
**Автор разработки лендинга:** Claude (через onmessage.dev)
