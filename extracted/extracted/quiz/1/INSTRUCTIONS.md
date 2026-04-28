# Квиз по биологии — установка на iqmoschool.ru/quiz/1/

## Файлы в архиве

```
quiz-package/
├── index.html              # сам квиз (переименован из iqmo-quiz-biology.html)
└── INSTRUCTIONS.md         # этот файл
```

## Что нужно сделать

Развернуть квиз по адресу **http://iqmoschool.ru/quiz/1/**

## Промпт для Cursor

> **Контекст.** Это однофайловый квиз-лендинг (15 вопросов по биологии для подготовки к ОГЭ). Все стили и JS внутри файла, внешние зависимости — только Google Fonts (Manrope + Space Grotesk).
>
> **Задача:**
> 1. Создай в корне сайта папку `quiz/1/`.
> 2. Положи в неё `index.html` из архива.
> 3. Убедись, что адрес `http://iqmoschool.ru/quiz/1/` открывает квиз (nginx/Apache должен отдавать `index.html` по умолчанию для папки).
> 4. Проверь, что кнопка «Начать подготовку» на финальном экране ведёт на `iqmo-redesign.html?register=1#start` — поправь путь под боевой URL лендинга (например, `https://iqmoschool.ru/?register=1#start`).
> 5. Логотип IQMO в шапке тоже ведёт на `iqmo-redesign.html` — поправь на `https://iqmoschool.ru/`.
> 6. Кнопка «Выйти» в шапке — туда же.
>
> **Точки замены ссылок** в `quiz/1/index.html`:
> - `<a href="iqmo-redesign.html" class="brand">` (шапка)
> - `window.location.href = 'iqmo-redesign.html'` (в JS, кнопка «Выйти»)
> - `<a href="iqmo-redesign.html?register=1#start"` (финальная кнопка результата)
>
> **Правила:**
> - Не дроби файл — всё inline, как есть.
> - Не меняй дизайн / шрифты / цвета.
> - Не выноси стили во внешний CSS.
> - Если будет ещё квиз (по химии и т.д.) — кладите в `quiz/2/`, `quiz/3/` и т.д. по той же схеме.

## Структура контента квиза

Если нужно поменять вопросы — массив `QUIZ.questions` в `<script>` (строки ~330+).
Каждый вопрос:
```js
{
  topic: "Клетка",                      // тема (попадёт в "слабые темы")
  art: "🔬",                            // эмодзи на визуале
  visual: "linear-gradient(...)",       // фон визуала
  q: "Текст вопроса?",                  // вопрос
  opts: ["A", "B", "C", "D"],          // 4 варианта
  correct: 0,                           // индекс правильного (0..3)
  exp: "Объяснение в 1 строку"          // показывается после ответа
}
```

## 3 сценария результата

В функции `renderResult()` (строки ~530+):
- **0–5 баллов** → красное кольцо, «Есть пробелы» + plan «до уверенной 4 за 3–4 недели»
- **6–10 баллов** → фиолетовое кольцо, «Хороший уровень» + plan «до 4–5 за ~2 недели»
- **11–15 баллов** → зелёное кольцо, «Шикарный результат» + plan «до 100% и пробники»

Все тексты можно править прямо в коде, переменные `tier`, `headline`, `sub`, `pitch`.

## Аналитика (рекомендуется добавить)

Перед финальным CTA в JS можно добавить отправку события:
```js
// в renderResult(), после установки HTML:
if (window.ym) ym(YOUR_ID, 'reachGoal', 'quiz_completed', { score: state.correct });
if (window.dataLayer) dataLayer.push({ event: 'quiz_completed', score: state.correct });
```

И на клик «Начать подготовку»:
```js
document.querySelector('.result__cta a.btn--primary')?.addEventListener('click', () => {
  if (window.ym) ym(YOUR_ID, 'reachGoal', 'quiz_to_register');
});
```

## Деплой

Файл статический — никакой сборки не нужно. Просто `scp` / `rsync` в `/var/www/iqmoschool.ru/quiz/1/`.
