# Чеклист деплоя IQMO

## База данных

1. Применить схему MySQL (аккаунты + профиль + аналитика):
   - `mysql ... < server/sql/mysql-schema.sql`
   - или доверить создание таблиц старту `server` (`ensureSchema` в `server/db/mysql.js`).
2. Убедиться, что есть таблица **`analytics_events`** (колонки: `user_id`, `occurred_at`, `event`, `payload_json`, `received_at`).

## Laravel (если используете PHP вместо или вместе с Node)

1. `cp .env.example .env` — задать `DB_*`, **`IQMO_JWT_SECRET`** (тот же секрет, что у Node), а также `IQMO_DB_*` (см. ниже).
2. `php artisan migrate --force` — миграция `analytics_events` теперь жёстко привязана к connection **`iqmo`**, чтобы совпадать со схемой Node (`server/sql/mysql-schema.sql`) и кодом `IqmoAuthController` / `IqmoAdminOverviewBuilder` (они пишут/читают там же). Если таблица уже создана Node-сервером (`ensureSchema`) — миграция тихо пропустит создание.
3. Проверить маршрут: `POST /api/analytics/events` (лимит **45 запросов/мин** на связку IP + пользователь из JWT).

### Один источник правды для аккаунтов

Канон таблицы **`users`** — Node-схема (`server/sql/mysql-schema.sql`, БД `iqmo`). Все рабочие IQMO-контроллеры в Laravel ходят через `DB::connection('iqmo')`. Дефолтное соединение `mysql` (Laravel Breeze) на портале не используется и хранится только под штатные миграции Breeze.

В `.env` укажите две группы переменных:

```env
# Стандартный Laravel (Breeze)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=...
DB_PASSWORD=...

# Канон IQMO (та же база, что у Node)
IQMO_DB_HOST=127.0.0.1
IQMO_DB_PORT=3306
IQMO_DB_DATABASE=iqmo
IQMO_DB_USERNAME=...
IQMO_DB_PASSWORD=...
```

Если на сервере раньше уже выкатывалась версия, где аналитика создавалась в дефолтном `DB_DATABASE`, можно опционально убрать дубль:

```sql
-- В дефолтной Laravel-базе (DB_DATABASE), если аналитики там быть не должно:
DROP TABLE IF EXISTS analytics_events;
```

## Статика (один источник правды)

Каноничная вёрстка лежит в **`extracted/`** — это единственное место, куда вносятся правки HTML/JS/CSS. Никогда не редактируйте файлы в `laravel/public/site/` или `laravel/public/uploads/` руками: они либо генерируются скриптом синхронизации, либо подменяются nginx.

> **Текущий бой**: `.github/workflows/deploy.yml` использует **вариант B** (Laravel раздаёт `public/site/` через nginx + PHP-FPM), при этом из `public/` удаляются устаревшие копии `index.html`, `login.html`, `profile.html`, `admin/`. Перед каждым деплоем синхронизируйте `laravel/public/site/` со скриптом ниже, иначе на проде «отставшая» статика начнёт расходиться с правками в `extracted/`.

### Вариант B (рекомендуемый) — Laravel публикует копию `extracted/` через `laravel/public/site/`

Перед каждым деплоем выполняется зеркалирование канона:

```bash
# В корне репозитория (требует Node 18+):
node scripts/sync-site.mjs
# или (Windows): powershell -ExecutionPolicy Bypass -File scripts/sync-site-html.ps1
# или (через npm):                                    npm --prefix server run sync:site
```

Скрипт удаляет в `laravel/public/site/` всё, чего нет в `extracted/`, поэтому удаления тоже синхронизируются. Запускайте его в CI/CD перед `git push`/деплоем (или сразу на сервере после `git pull`).

> Примечание: каталог `laravel/public/uploads/` — историческое наследие. На свежих развёртываниях его можно не использовать; держите его в синхронности только если nginx ещё ссылается на него.

### Вариант A (альтернатива) — nginx раздаёт `extracted/` напрямую

Если переходите на чистый nginx без PHP-FPM для статики, замените root в конфиге:

```nginx
root  /var/www/iqmo/extracted;
index index.html;
```

В этом случае `laravel/public/site/` на сервере не нужен и его можно не выкатывать. Не сочетайте варианты A и B одновременно: получите два расходящихся источника.

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
