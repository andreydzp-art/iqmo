# IQMO Quiz /quiz/5 (chemistry-2)

Лендинг квиза по химии (12 вопросов). Синхронизируется в прод через `node scripts/sync-site.mjs`:

- источник: `extracted/quiz/5/index.html`
- назначение: `laravel/public/site/quiz/5/index.html`
- URL: `/quiz/5/`

Интеграции:

- Метрика: `108770166`
- Email gate: `POST /api/lead` с `quiz_id=chemistry-2`
- Трекинг метрик: `POST /api/quiz/track` (start/question/gate_shown/gate_submit/cta_register)

