# Quiz `/quiz/7/` — Биология v2 package (12 вопросов)

- **URL:** `https://www.iqmoschool.ru/quiz/7/`
- **`quiz_id`:** `biology-v2` (отдельно от `biology-2` на `/quiz/3/`)
- **Источник:** `quiz-biology-v2-package/iqmo-quiz-biology-v2.html`

## Деплой

1. Правки в `extracted/quiz/7/index.html`.
2. `node scripts/sync-site.mjs`
3. Пуш в `main` → GitHub Actions.

## API и Метрика

- `/api/quiz/track`, `/api/lead`, цели Метрики: как у остальных квизов (`quiz_started`, `quiz_completed`, `quiz_register_click`, `quiz_email_captured`).
