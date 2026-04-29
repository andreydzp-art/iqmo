# Quiz `/quiz/6/` — Биология v3 (12 вопросов)

- **URL:** `https://www.iqmoschool.ru/quiz/6/`
- **`quiz_id` (API / Метрика):** `biology-3`
- **Источник:** архив Cloud Design (`iqmo-quiz-biology-v3.html`).

## Деплой

1. Правки в `extracted/quiz/6/index.html`.
2. Из корня репозитория: `node scripts/sync-site.mjs` (копирует в `laravel/public/site/quiz/6/`).
3. Пуш в `main` — GitHub Actions.

## API

- События: `POST /api/quiz/track` (`start`, `question`, `gate_shown`, `gate_submit`, `complete`, `cta_register`).
- Лид: `POST /api/lead` с полем `quiz_id: "biology-3"`.

## Яндекс.Метрика

Цели: `quiz_started`, `quiz_completed`, `quiz_register_click`, `quiz_email_captured` (счётчик `108770166`).
