# IQMO Quiz /quiz/3 (biology-2)

Этот лендинг синхронизируется в прод через `node scripts/sync-site.mjs`:

- источник: `extracted/quiz/3/index.html`
- назначение: `laravel/public/site/quiz/3/index.html`
- URL: `/quiz/3/` (Laravel route `/quiz/{id}/`)

Интеграции:

- Метрика: счётчик `108770166`
- Email gate: отправка лида `POST /api/lead` с `quiz_id=biology-2`
- Трекинг воронки/отвала: `POST /api/quiz/track` (start/question/gate_shown/gate_submit/cta_register)

