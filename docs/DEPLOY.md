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

## Статика (один источник правды)

Каноничная вёрстка лежит в **`extracted/`** — это единственное место, куда вносятся правки HTML/JS/CSS. Никогда не редактируйте файлы в `laravel/public/site/` или `laravel/public/uploads/` руками: они либо генерируются скриптом синхронизации, либо подменяются nginx.

Выберите **одну** из двух стратегий деплоя и держитесь её:

### Вариант A — nginx раздаёт `extracted/` напрямую (проще)

Меньше шагов, нет дубля.

```nginx
root  /var/www/iqmo/extracted;
index index.html;
```

В этом случае `laravel/public/site/` на сервере не используется и его можно не выкатывать.

### Вариант B — Laravel публикует копию `extracted/` через `laravel/public/site/`

Если хочется, чтобы артефакты обслуживал PHP-FPM/Octane, перед каждым деплоем выполняется зеркалирование канона:

```bash
# В корне репозитория (требует Node 18+):
node scripts/sync-site.mjs
# или (Windows): powershell -ExecutionPolicy Bypass -File scripts/sync-site-html.ps1
# или (через npm):                                    npm --prefix server run sync:site
```

Скрипт удаляет в `laravel/public/site/` всё, чего нет в `extracted/`, поэтому удаления тоже синхронизируются. Запускайте его в CI/CD перед `git push`/деплоем (или сразу на сервере после `git pull`).

> Примечание: каталог `laravel/public/uploads/` — историческое наследие. На свежих развёртываниях его можно не использовать; держите его в синхронности только если nginx ещё ссылается на него.

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
