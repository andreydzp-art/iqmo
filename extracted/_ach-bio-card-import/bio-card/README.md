# IQMO · Карточка «Первый этап по биологии» (левитация)

Самодостаточный компонент редкой «водной» карточки с hover-анимацией.

```
bio-card/
├── bio-card.css    ← все стили (корневой класс .bio-card)
├── bio-card.html   ← разметка карточки для копирования
├── demo.html       ← рабочий пример
└── README.md
```

## Подключение

1. В `<head>` подключи шрифты и стили:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="bio-card/bio-card.css">
   ```

2. Вставь разметку из `bio-card.html` в нужное место.

## Что где менять

| Элемент | Класс | Пример |
|---|---|---|
| Бейдж редкости | `.rarity` | `Редкая` |
| Заголовок | `.title` | `Первый этап<br/>по биологии` |
| Подзаголовок | `.subtitle` | `Успешно пройди 1 этап по биологии` |
| Счётчик | `.prog-row .count` | `1 / 1` |
| Заливка прогресса | `.prog-bar i` (инлайн `width`) | `style="width:100%"` |
| Награда | `.reward-val` | `+150 XP` |

Чип награды — одиночный, по центру (как у карточки «тряска колбы» `.anim-shake`).

## Анимация (hover)

- орб `.orb` плавно левитирует вверх-вниз;
- лист `.leaf` мягко покачивается;
- капли `.drop` и шары `.ball` дрейфуют.

Шиммер на прогресс-баре идёт постоянно. Всё отключается при `prefers-reduced-motion: reduce`.

## Размеры

Фиксированная ширина **340px**, высота по соотношению `1 / 1.5`. Для масштаба — оберни в контейнер и примени `transform: scale(...)`.

## Заметки

- Все классы заскоуплены под `.bio-card` — конфликтов не будет.
- `id` SVG-градиентов (`bioLeaf`, `bioHexFill`) глобальны. Если на странице несколько таких карточек — переименуй их.
