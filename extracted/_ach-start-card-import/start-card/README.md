# IQMO · Карточка «Старт на портале»

Самодостаточный компонент карточки‑награды за вход на портал.

```
start-card/
├── start-card.css    ← все стили (корневой класс .start-card)
├── start-card.html   ← разметка карточки для копирования
├── demo.html         ← рабочий пример
└── README.md
```

## Подключение

1. В `<head>` подключи шрифты и стили:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="start-card/start-card.css">
   ```
   Inter — для текста, JetBrains Mono — для счётчика прогресса. Без них возьмётся системный шрифт.

2. Вставь разметку из `start-card.html` в нужное место.

## Что где менять

| Элемент | Класс | Пример |
|---|---|---|
| Бейдж редкости | `.rarity` | `Обычная` |
| Заголовок | `.title` | `Старт на портале` |
| Подзаголовок | `.subtitle` | `Начни свой путь в IQMO` |
| Счётчик | `.prog-row .count` | `1 / 1` |
| Заливка прогресса | `.prog-bar i` (инлайн `width`) | `style="width:100%"` |
| Награда | `.reward-val` | `+50 XP` |

## Размеры

Карточка фиксированной ширины **340px**, высота по соотношению `1 / 1.5`.
Чтобы отмасштабировать — оберни в контейнер и примени `transform: scale(...)`.

## Анимации

При наведении: рюкзак мягко «дышит» вверх‑вниз, орбита медленно поворачивается, искры мерцают чаще. Всё отключается при `prefers-reduced-motion: reduce`.

## Заметки

- Все классы заскоуплены под `.start-card` — конфликтов со своими стилями не будет.
- `id` градиентов в SVG (`sbBody`, `sbPocket`, `sbStrap`) глобальны: если на одной странице несколько таких карточек, переименуй их, чтобы не пересекались.
