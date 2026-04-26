# Чеклист деплоя IQMO

## База данных

1. Применить схему MySQL (аккаунты + профиль + аналитика):
   - `mysql ... < server/sql/mysql-schema.sql`
   - или доверить создание таблиц старту `server` (`ensureSchema` в `server/db/mysql.js`).
2. Убедиться, что есть таблица **`analytics_events`** (колонки: `user_id`, `occurred_at`, `event`, `payload_json`, `received_at`).

## Laravel (если используете PHP вместо или вместе с Node)

1. `cp .env.example .env` — задать `DB_*`, **`IQMO_JWT_SECRET`** (тот же секрет, что у Node).
2. `php artisan migrate` — создаст `analytics_events` с внешним ключом на `users`.
3. Проверить маршрут: `POST /api/analytics/events` (лимит **45 запросов/мин** на связку IP + пользователь из JWT).

**Важно:** `user_id` в JWT должен существовать в таблице `users` той же БД, иначе вставка аналитики упадёт. Если портал живёт в Node с отдельной БД `iqmo`, либо используйте ту же MySQL для Laravel, либо не вызывайте Laravel-ингест.

## Статика

1. Каноничная вёрстка в репозитории: каталог **`extracted/`**.
2. Для продакшена скопировать HTML/ассеты в **`laravel/public/site/`** (см. `scripts/sync-site-html.ps1`) или настроить nginx на раздачу из `extracted/` — главное, чтобы на сервере была **одна** актуальная копия.

## Node (локально / простой хостинг)

1. Переменные: `IQMO_JWT_SECRET`, `MYSQL_*`, при необходимости **`IQMO_ANALYTICS_RATE_PER_MIN`** (по умолчанию 45).
2. `npm start` в `server/` — открывать сайт только по `http://localhost:3780/`, не `file://`.

## Яндекс.Метрика: цели

Создайте в кабинете Метрики **JavaScript-цели** с идентификаторами (как в коде):

| Идентификатор цели   | Где срабатывает                          |
|----------------------|-------------------------------------------|
| `login`              | Успешный вход (`login.html`)              |
| `register`           | Успешная регистрация                      |
| `test_complete`      | Завершение теста (`chem-progress.js`)     |
| `topic_view`         | Просмотр страницы темы (раз в сессию)     |
| `begin_checkout`     | Отправка формы оплаты (`payment.html`)    |
| `purchase`           | Страница «Спасибо» (`thank.html`)         |

События **`dataLayer`**: `iqmo_login`, `iqmo_register`, `iqmo_test_complete`, `iqmo_topic_view`, `begin_checkout`, `purchase` (ecommerce-блок для оплаты). Проверьте в интерфейсе Метрики раздел электронной коммерции для вашего счётчика.

## Проверка аналитики событий

1. Войти на сайт (cookie `iqmo_session`).
2. Пройти разминку или тест.
3. В MySQL: `SELECT * FROM analytics_events ORDER BY id DESC LIMIT 20;`
4. Ожидаются события `chem.attempt_start`, `chem.attempt_complete`, при открытии тем — `chem.topic_view`.
