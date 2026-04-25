# Инструкция для Cursor — изменения в проекте

В этой сессии были изменены 2 файла. Ниже — что именно изменилось и куда вставить.

---

## 1. subject-chemistry.html

### Что изменилось
Добавлена кнопка «Войти» в верхнем меню и изменён порядок кнопок.

### Где именно
Найти блок `<div class="header__btns">` внутри `<header class="header">` (примерно строка 485).

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

**Порядок:** Главная → Профиль → Войти. Все три кнопки в одном светлом стиле (`btn--ghost`).

---

## 2. full-test-chemistry.html

### Что изменилось
Добавлены три навигационные кнопки (Главная, Профиль, Войти) в верхнюю панель рядом с существующей кнопкой «Выйти».

### Где именно
Найти блок `<div class="topbar__right">` в верхней панели.

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

**Примечание:** «Выйти» оставлена на месте — она используется во время прохождения теста. Три новых кнопки — навигация по сайту.

---

## Применение в Cursor

1. Откройте проект.
2. Замените содержимое указанных файлов на файлы из этого архива.
   ИЛИ вручную внесите правки по фрагментам «Было → Стало».
3. Убедитесь, что в проекте существует файл `login.html` (ссылка ведёт на него).
