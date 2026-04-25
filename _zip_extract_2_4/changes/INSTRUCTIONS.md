# Инструкция для Cursor — все изменения

## ⚠️ ВАЖНО: Красная плитка с замочком — это в full-test-chemistry.html, НЕ в subject-chemistry.html

---

## 1. subject-chemistry.html — добавлена кнопка «Войти» в шапке

Найти `<div class="header__btns">` (~строка 485).

### Было
```html
<div class="header__btns">
    <a href="./profile.html" class="btn btn--ghost header__btn">Профиль</a>
    <a href="./index.html" class="btn btn--ghost header__btn">Главная</a>
</div>
```

### Стало
```html
<div class="header__btns">
    <a href="./index.html" class="btn btn--ghost header__btn">Главная</a>
    <a href="./profile.html" class="btn btn--ghost header__btn">Профиль</a>
    <a href="./login.html" class="btn btn--ghost header__btn">Войти</a>
</div>
```

---

## 2. full-test-chemistry.html — красная плитка + SVG-замочек + кнопки навигации

### 2.1 CSS плитки `.vp-tile.is--locked` (~строка 540)

### Было
```css
.vp-tile.is--locked {
    opacity: .55; cursor: not-allowed; background: #f7f8fb;
    color: var(--muted);
}
.vp-tile.is--locked .vp-tile__num { color: var(--muted); }
.vp-tile.is--locked:hover { border-color: var(--line); box-shadow: none; }
```

### Стало
```css
.vp-tile.is--locked {
    cursor: not-allowed;
    background: linear-gradient(180deg, #fff2f2 0%, #fde7e7 100%);
    color: #a94d4d;
}
.vp-tile.is--locked .vp-tile__num { color: #c25555; }
.vp-tile.is--locked .vp-tile__label { color: #b35959; }
.vp-tile.is--locked .vp-tile__status { color: #b35959; }
.vp-tile.is--locked:hover { border-color: #e88a8a; box-shadow: 0 6px 18px -10px rgba(214,90,90,.4); }
```

### 2.2 Иконка замочка в JS (~строка 1616) — emoji → SVG

### Было
```js
lockHtml = `<span class="vp-tile__lock">🔒</span>`;
```

### Стало
```js
lockHtml = `<span class="vp-tile__lock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>`;
```

### 2.3 Кнопки навигации в верхней панели

Найти `<div class="topbar__right">`.

### Было
```html
<div class="topbar__right">
    <button type="button" class="btn btn--ghost" id="btn-quit">Выйти</button>
</div>
```

### Стало
```html
<div class="topbar__right">
    <div class="header__btns" style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
        <a href="./index.html" class="btn btn--ghost">Главная</a>
        <a href="./profile.html" class="btn btn--ghost">Профиль</a>
        <a href="./login.html" class="btn btn--ghost">Войти</a>
    </div>
    <button type="button" class="btn btn--ghost" id="btn-quit" style="margin-left:8px;">Выйти</button>
</div>
```

---

## Применение

Просто замените оба файла из архива на свои в Cursor — все изменения уже внесены.
