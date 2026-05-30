# IQMO · Карточка «Первый этап по химии» (тряска колбы)

Самодостаточный компонент эпической карточки с hover-анимацией «тряска колбы».

```
shake-card/
├── shake-card.css    ← все стили (корневой класс .shake-card)
├── shake-card.html   ← разметка карточки для копирования
├── demo.html         ← рабочий пример
└── README.md
```

## Подключение

1. В `<head>` подключи шрифты и стили:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="shake-card/shake-card.css">
   ```
   Inter — для текста, JetBrains Mono — для счётчика прогресса.

2. Вставь разметку из `shake-card.html` в нужное место.

## Что где менять

| Элемент | Класс | Пример |
|---|---|---|
| Бейдж редкости | `.rarity` | `Эпическая` |
| Заголовок | `.title` | `Первый этап<br/>по химии` |
| Подзаголовок | `.subtitle` | `Успешно пройди 1 этап по химии` |
| Счётчик | `.prog-row .count` | `1 / 1` |
| Заливка прогресса | `.prog-bar i` (инлайн `width`) | `style="width:100%"` |
| Награда | `.reward-val` | `+250 XP` |

## Анимация (hover)

- колба `.flask` трясётся с раскачкой;
- орб `.orb` делает короткий press (сжатие/расширение);
- летающие шары `.ball` подрагивают.

Шиммер на прогресс-баре и дрейф частиц идут постоянно. Всё отключается при `prefers-reduced-motion: reduce`.

## Размеры

Фиксированная ширина **340px**, высота по соотношению `1 / 1.5`. Для масштаба — оберни в контейнер и примени `transform: scale(...)`.

## Заметки

- Все классы заскоуплены под `.shake-card` — конфликтов не будет.
- `id` SVG-градиентов (`shGlassFill`, `shGlassEdge`, `shHexFill`) глобальны. Если на странице несколько таких карточек — переименуй их, чтобы не пересекались.
