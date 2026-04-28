# IQMO Quiz /quiz/4 (biology-2-short)

Короткая версия квиза (12 вопросов). Синхронизируется в прод через `node scripts/sync-site.mjs`:

- источник: `extracted/quiz/4/index.html`
- назначение: `laravel/public/site/quiz/4/index.html`
- URL: `/quiz/4/`

Интеграции:

- Метрика: `108770166`
- Email gate: `POST /api/lead` с `quiz_id=biology-2-short`
- Трекинг метрик: `POST /api/quiz/track` (start/question/gate_shown/gate_submit/cta_register)

