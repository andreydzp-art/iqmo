# IQMO · Profile Header · Premium Minimal v2

Полностью переделанная шапка профиля IQMO в стиле Apple/Linear/Notion + premium retention-механика.

## Содержимое архива

| Файл | Назначение |
|---|---|
| `demo.html` | Готовый preview — открой в браузере для визуальной сверки |
| `header.html` | Чистый HTML-сниппет для копи-паста в свою страницу |
| `header.css` | Все стили + анимации (изолированы под `.iqmo-hero`) |
| `avatar-dasha.png` | Тестовый аватар (замени на свой) |
| `INSTRUCTIONS.md` | Этот файл |

---

## Зависимости

### Шрифты

Добавь в `<head>` (если ещё нет):

```html
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet"/>
```

### JS

Никакого. Все анимации на чистом CSS.

---

## Быстрая интеграция

### 1. Подключи стили

```html
<link rel="stylesheet" href="path/to/header.css"/>
```

или скопируй весь `header.css` в существующий `<style>` блок страницы.

### 2. Вставь сниппет

Скопируй содержимое `header.html` в нужное место. Корневой контейнер — `<section class="iqmo-hero">`. Все вложенные стили namespaced под `.iqmo-hero` и **не конфликтуют** с глобальным CSS.

### 3. Подмени данные

См. таблицу ниже.

---

## Структура

```
.iqmo-hero
├── .hero-deco (ambient particles)
├── .hero-inner — main grid (240px | 1fr | 384px)
│   ├── .av          (avatar + level ring + level chip)
│   ├── .h-id        (name + handle + meta + XP bar)
│   └── .streak      (серия дней — violet prestige card)
└── .hero-secondary — compact stats row (Лига / Точность / Курс)
```

---

## Точки привязки к API

### Avatar / Level

| Селектор | Что меняет | Текущее |
|---|---|---|
| `.av-img img[src]` | URL аватара | `avatar-dasha.png` |
| `.av-pct` | % прогресса текущего уровня | `61%` |
| `.av-chip` | номер уровня | `LVL 16` |
| `.av-ring background:conic-gradient(...)` | угол заливки ring | `61%` (см. ниже) |

### Conic ring — динамический угол

В CSS `.av-ring` использует:
```css
background:conic-gradient(
  from -90deg,
  #818cf8 0%, #6366f1 28%, #7c3aed 61%,        /* ← заполненная часть до 61% */
  rgba(15,18,38,.06) 61%, rgba(15,18,38,.06) 100%
);
```

Для динамики проще всего инлайн-стилем:
```html
<div class="av-ring" style="background: conic-gradient(from -90deg, #818cf8 0%, #6366f1 calc(var(--lvl-pct,61%) * 0.46), #7c3aed var(--lvl-pct,61%), rgba(15,18,38,.06) var(--lvl-pct,61%) 100%);"></div>
```

### Identity

| Селектор | Что меняет |
|---|---|
| `.h-name` | имя |
| `.h-handle` | IQ-ID |
| `.h-pro` | бейдж Pro (можно скрыть `display:none` для free-юзеров) |
| `.h-meta-row .rank` | ранг |

### XP bar

| Селектор | Что меняет |
|---|---|
| `.xp-fill { width: 61% }` | прогресс % (inline-style!) |
| `.xp-dot { left: 61% }` | glowing pellet — тот же % |
| `.xp-head .lvlnow` | "Уровень 16 → 17" |
| `.xp-head .lvlnext b` | название след. уровня |
| `.xp-foot .now` | XP / max |
| `.xp-foot .week b` | weekly XP |

Привязка через CSS переменную:
```html
<div class="xp-bar" style="--xp-pct:61%">
  <div class="xp-fill" style="width:var(--xp-pct)"></div>
  <div class="xp-dot"  style="left:var(--xp-pct)"></div>
</div>
```

### Streak card

| Селектор | Что меняет | Текущее |
|---|---|---|
| `.s-num` | число дней подряд | `4` |
| `.s-lbl` | словоформа | `дня подряд` |
| `.s-meta` | мета: всего серий, % | `всего 18 серий · топ 12%` |
| `.s-today` | bonus-множитель | `×1.10` |
| `.s-caps .cap` | капсулы — добавь `.on` для заполненных, `.now` на текущую | 4/7 |
| `.s-prog-foot .left b` | дней до награды | `3 дня` |
| `.frac` | прогресс fraction | `04 / 07` |
| `.vault-name` | название награды | `«Железная воля»` |
| `.vault-xp` | XP за награду | `+200 XP` |
| `.vault-tag` | редкость | `★ Rare` |
| `.s-urg b` | таймер до сброса серии | `2 ч 46 мин` |

#### Капсулы — логика заполнения

```html
<div class="s-caps">
  <span class="cap on"></span>     <!-- день 1: заполнен -->
  <span class="cap on"></span>     <!-- день 2: заполнен -->
  <span class="cap on"></span>     <!-- день 3: заполнен -->
  <span class="cap on now"></span> <!-- день 4: текущий (пульсирует) -->
  <span class="cap"></span>        <!-- день 5: пустой -->
  <span class="cap"></span>        <!-- день 6 -->
  <span class="cap"></span>        <!-- день 7 -->
</div>
```

#### Состояния серии

| Состояние | Изменения |
|---|---|
| **Активна** | как есть |
| **В зоне риска (< 3 ч)** | `.s-urg` можно ускорить анимацию пульса |
| **Прервана** | `.s-eye` → "Серия · прервана"; убрать `.cap.on`; убрать `.s-today` |
| **Награда получена** | confetti (см. ниже) + все 7 капсул `.on` |

---

## Словоформы (rus pluralization)

```js
function streakLabel(n){
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'день подряд';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'дня подряд';
  return 'дней подряд';
}
```

Применяй к `.s-lbl`.

---

## Адаптив

- Базовая ширина: **1280px** (центральный shell).
- Hero grid: `240px | 1fr | 384px` — оптимально для viewport ≥ 1180px.
- На `< 1180px` коллапсируется в 2 колонки, streak уходит вниз.

Если нужна планшетная/мобильная версия — лучше переписать grid вручную, а не сжимать. Стрик-карте нужен воздух.

---

## Анимации

8 CSS keyframes (все в `header.css`):

| Keyframe | Длит. | Где |
|---|---|---|
| `iqmoHaloBreathe` | 4.8s | avatar outer halo |
| `iqmoXpBreathe` | 3.4s | XP bar glow + dot |
| `iqmoShimmer` | 2.6s | XP bar swept light |
| `iqmoStreakSheen` | 14s | streak card diagonal sheen |
| `iqmoAura` | 4.4–5s | streak emblem + corner aura |
| `iqmoStreakFloat` | 5.5–7s | floating particles |
| `iqmoRingSpin` | 60–90s | prestige emblem rings (slow) |
| `iqmoPulse` | 1.6–1.8s | live indicators (pulse dots) |
| `iqmoCapPulse` | 2s | active capsule glow |
| `iqmoFloat` | 5.5–7s | ambient hero particles |

`prefers-reduced-motion: reduce` — всё отключается автоматически.

---

## Палитра (для справки)

```
violet primary  #7c3aed
violet light    #a78bfa  
violet deep     #4c1d95 / #2e1065 / #1e1b4b
indigo          #6366f1 / #818cf8
muted text      #6b7094 / #9aa0bf
ink             #0f1226 / #2a2e4a
surface         #ffffff / #fafbff
line            #e6e8f0 / #eef0f7
emerald (delta) #047857
amber (Pro)     #b45309
```

---

## Что убрано намеренно

- **CTA "Быстрое повторение"** — карта читается как passive status, не как promo banner.
  Если нужна — добавь кнопку после `.s-urg`:
  ```html
  <button class="s-cta">Быстрое повторение</button>
  ```
  + свои стили под общую систему.
- **Оранжевые градиенты** — карта в единой violet/indigo системе.
- **Glossy orb** — заменён на segmented prestige emblem с двойным вращающимся ring.
- **Толстые progress bars** — capsules 4px высотой с 8px gap (dashboard-grade).

---

## Уникальность SVG gradient ID

В streak emblem используется `<linearGradient id="iqmo-violet-flame">`. Если на странице может рендериться несколько шапок (A/B-тест) — сделай ID уникальным per-instance:

```html
<linearGradient id="iqmo-violet-flame-{userId}">
...
<path fill="url(#iqmo-violet-flame-{userId})"/>
```

---

## Следующие шаги

1. Подмени `avatar-dasha.png` на API-аватар.
2. Привяжи `.xp-fill width` + `.xp-dot left` + `.av-pct` к одному источнику (% уровня).
3. Привяжи капсулы `.cap.on / .now` к индексу текущего дня в серии.
4. Сделай таймер `.s-urg b` живым (обновляй раз в минуту через JS).
5. Опционально — confetti / celebration overlay при 7/7.

Если что — пиши, помогу с edge-кейсами или сделаю tweakable-версию.
