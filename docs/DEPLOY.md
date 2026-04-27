# Чеклист деплоя IQMO

## База данных

1. Применить схему MySQL (аккаунты + профиль + аналитика):
   - `mysql ... < server/sql/mysql-schema.sql`
   - или доверить создание таблиц старту `server` (`ensureSchema` в `server/db/mysql.js`).
2. Убедиться, что есть таблица **`analytics_events`** (колонки: `user_id`, `occurred_at`, `event`, `payload_json`, `received_at`).

## Laravel (если используете PHP вместо или вместе с Node)

1. `cp .env.example .env` — задать `DB_*`, **`IQMO_JWT_SECRET`** (тот же секрет, что у Node), а также `IQMO_DB_*` (см. ниже).
2. `php artisan migrate --force` — миграция `analytics_events` теперь жёстко привязана к connection **`iqmo`**, чтобы совпадать со схемой Node (`server/sql/mysql-schema.sql`) и кодом `IqmoAuthController` / `IqmoAdminOverviewBuilder` (они пишут/читают там же). Если таблица уже создана Node-сервером (`ensureSchema`) — миграция тихо пропустит создание.
3. Проверить маршрут: `POST /api/analytics/events`. Контроль входа:
   - аутентификация: middleware `iqmo.jwt` → 401 без валидной куки `iqmo_session`;
   - rate-limit: **45 запросов/мин** на связку IP + пользователь из JWT;
   - размер тела: `Content-Length` > **64 KB** → 413, до парсинга JSON;
   - размер батча: > **24** событий → 400 `too_many_events`;
   - whitelist `event`: `chem.topic_view` / `chem.attempt_start` / `chem.attempt_complete` / `iqmo.purchase` (остальные тихо отбрасываются);
   - `occurredAt` нормализуется в окно `[now − 7д, now + 5мин]` — что вне окна, перетирается на `now` (защита от ботов, которые пытаются «бэкфиллить» прошлое или будущее);
   - инвариант `correct ≤ total` принудительно: иначе админка показывала бы конверсию > 100 %.

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

Каноничная вёрстка лежит в **`extracted/`** — это единственное место, куда вносятся правки HTML/JS/CSS. Никогда не редактируйте файлы в `laravel/public/site/` руками: они генерируются скриптом синхронизации.

> **Текущий бой**: `.github/workflows/deploy.yml` использует **вариант B** (Laravel раздаёт `public/site/` через nginx + PHP-FPM), при этом из `public/` удаляются устаревшие копии `index.html`, `login.html`, `profile.html`, `admin/`. Перед каждым деплоем синхронизируйте `laravel/public/site/` со скриптом ниже, иначе на проде «отставшая» статика начнёт расходиться с правками в `extracted/`.

### Папка `laravel/public/uploads/` удалена из репозитория

Раньше канонические страницы оплаты лежали в двух местах сразу: `extracted/uploads/` **и** `laravel/public/uploads/`. Это размазывало правки и приводило к расхождениям. Теперь:

- Правда живёт только в `extracted/uploads/` → синкается в `laravel/public/site/uploads/`.
- Запросы вида `/uploads/payment.html`, `/uploads/thank.html` и т.п. отдаются Laravel-маршрутом из `public/site/uploads/` (см. `routes/web.php`).
- На VPS после очередного `git pull` папка `laravel/public/uploads/` исчезнет. **Это нормально**: nginx с дефолтным `try_files $uri $uri/ /index.php?$query_string;` пробросит запрос в Laravel, и страница откроется через site/uploads.
- Если на сервере nginx настроен **жёстко** на `location /uploads/ { root .../laravel/public; }` без fallback в Laravel — добавьте `try_files $uri @laravel;` или замените root на `.../laravel/public/site` (чтобы отдавать сразу из site/uploads без участия PHP).

### Вариант B (рекомендуемый) — Laravel публикует копию `extracted/` через `laravel/public/site/`

Перед каждым деплоем выполняется зеркалирование канона:

```bash
# В корне репозитория (требует Node 18+):
node scripts/sync-site.mjs
# или (Windows): powershell -ExecutionPolicy Bypass -File scripts/sync-site-html.ps1
# или (через npm):                                    npm --prefix server run sync:site
```

Скрипт удаляет в `laravel/public/site/` всё, чего нет в `extracted/`, поэтому удаления тоже синхронизируются. Запускайте его в CI/CD перед `git push`/деплоем (или сразу на сервере после `git pull`).

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

Полная инструкция по настройке (включая Ecommerce, отладку, связь с
нашей `analytics_events`) — в отдельном документе [`YANDEX-METRIKA-GOALS.md`](./YANDEX-METRIKA-GOALS.md).

Кратко — создайте в кабинете шесть **JavaScript-целей** с идентификаторами:

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

## Бэкапы MySQL и аварийное восстановление

Установка ежедневного бэкапа БД `iqmo` на VPS — отдельный одноразовый шаг,
описан в [`BACKUPS.md`](./BACKUPS.md): создание `iqmo_dump` user в MySQL,
`~/.my.cnf`, cron на 04:00, проверка восстановления в тестовую БД,
оффсайт-синхронизация (S3 или rsync). Скрипты в `scripts/`:

- [`backup-mysql.sh`](../scripts/backup-mysql.sh) — потоковый дамп с gzip, ротацией 14 дней и smoke-check на размер;
- [`restore-mysql.sh`](../scripts/restore-mysql.sh) — восстановление с предохранителем `--yes-i-have-a-fresh-backup`.

Сценарии аварийного реагирования (502, не пускает в админку, всё нули в KPI,
откат кривого деплоя) — в [`RUNBOOK.md`](./RUNBOOK.md).
