# Чеклист деплоя IQMO

### Почему в GitHub Actions «два прогона» на один push

На `push` в `main` запускаются **два разных** workflow — это **не** «деплой дважды»:

| Workflow | Файл | Задача |
| --- | --- | --- |
| **Tests** | `.github/workflows/test.yml` | PHPUnit `Unit` + небольшой набор `Feature` (без MySQL), для PR и для `main`. **На сервер ничего не копирует.** |
| **Deploy to VPS** | `.github/workflows/deploy.yml` | `PHPUnit (Unit) gate` → **на runner'е** `node scripts/sync-site.mjs` → **rsync** `laravel/public/site/` на VPS → **SSH** `git reset` + `composer` / миграции → **smoke** по HTTP. Node **на сервере не обязателен**. |

Список run’ов на один коммит обычно выглядит как `Tests #N` и `Deploy to VPS #M` — нормально. Если **Deploy to VPS** красный, раскройте job **deploy** (не `smoke` — он не запустится, если упал `deploy`).

### Автодеплой с машины разработчика

**Прод меняется только после `git push` в `main`.** Локальный коммит без пуша на GitHub сервер не видит.

После правок в `extracted/`, `laravel/` или `scripts/` обычно: `git add` → `git commit` → из корня репозитория **`npm run deploy:push`** (скрипт проверяет, что вы на `main` и рабочее дерево чистое). На GitHub Actions затем выполняются `sync-site`, rsync на VPS и smoke — см. таблицу выше.

Коммиты, которые затрагивают **только** `.cursor/**` или **только** `docs/**`, по `paths-ignore` в `deploy.yml` **не** запускают деплой (чтобы не гонять раннер на мета-файлах). Если нужно принудительно задеплоить без изменений кода — **Actions → Deploy to VPS → Run workflow**.

**Где смотреть причину:** шаги *SSH* / *Rsync* / *smoke* → в логе ищите `=== DEPLOY: … ===`. Чаще всего: **rsync** (SSH-ключ, права на `laravel/public/site`, на сервере должен быть `rsync` в PATH), **`composer install`**, **`php artisan migrate`**. Сообщения об ошибке сразу под выводом шага.

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

## Статика — единственный источник правды

Все HTML/JS/CSS/изображения сайта лежат в **`extracted/`** (75 файлов в git). Это единственное место, куда вносятся правки. Папка `laravel/public/site/` — **сгенерированная** копия, в `.gitignore`, в репозитории её нет.

### Как это работает

- **Источник:** `extracted/` (commits to git)
- **Цель (рантайм):** `laravel/public/site/` — её читают Laravel-маршруты (`routes/web.php`).
- **Преобразование:** `node scripts/sync-site.mjs` зеркалит первое во второе и **удаляет в target всё, чего нет в source** (так что `git rm` в `extracted/` тоже распространяется). Папка **`extracted/admin/`** в `public/site/` **намеренно не копируется** (админка отдаётся только из `resources/admin-ui` через Laravel; иначе при `root` = `public/site` nginx отдаёт `/admin/index.html` как статику и обходит middleware).
- **Bundle вопросов:** тот же sync-скрипт собирает `chemistry-banks-bundle.js` из 17 файлов `chemistry-cat*-source.js` и кладёт его одновременно в `extracted/` и `laravel/public/site/`. Источник — git'овые `*-source.js`, сам bundle не отслеживается (`.gitignore`). Это закрывает старый класс ошибок, когда страница теста забывала один из 17 `<script>` тегов и часть категорий тихо исчезала.

### На деплое (автоматически)

`deploy.yml` прогоняет **`node scripts/sync-site.mjs` на GitHub runner** (Node 20, см. `actions/setup-node`), затем **rsync** с `--delete` в `…/app/laravel/public/site/` и только потом **SSH** с `git reset` + `composer` / миграциями. На **VPS Node не требуется** (раньше sync шёл по SSH, и nvm/node не был в PATH — деплой падал). Пакет **`openssh-server` + `rsync`** на сервере обычно уже есть. Никаких ручных синков перед `git push` не нужно.

**Secrets:** `DEPLOY_HOST` и `DEPLOY_USER` должны быть **одна строка без пробела в конце и без перевода строки** (если вставить «как в блокноте» с лишним Enter, ssh пишет `hostname contains invalid characters`). В workflow значения **обрезаются**, но лучше поправить и в кабинете GitHub.

### Локально (если правите HTML и хотите проверить через `php artisan serve`)

```bash
npm run sync              # = node scripts/sync-site.mjs
php artisan serve         # дальше как обычно
```

Без `npm run sync` локальный Laravel-сервер вернёт 404 на `/subject-chemistry.html` — `laravel/public/site/` пустая, Laravel не из чего отдавать.

### Что НЕ надо делать

- ❌ Никогда не редактировать файлы в `laravel/public/site/` — при следующем синке всё перетрётся.
- ❌ Не коммитить `laravel/public/site/` обратно в git (она в `.gitignore` ровно ради этого).
- ❌ Не добавлять `laravel/public/uploads/` — её больше нет, маршрут `/uploads/*` отдаётся Laravel-роутом из `public/site/uploads/`.

### История раздвоений

До 2026-04-27 в репозитории одновременно жили **обе** копии (`extracted/` и `laravel/public/site/`, ~140 файлов-дубликатов), и держать их в синхроне приходилось руками: пропускаешь `npm run sync` перед коммитом — и pages в проде разъезжаются. Именно по этой схеме месяц назад на `subject-chemistry.html` пропадала Метрика. С PR «HTML consolidation» дубль убран, sync встроен в deploy — этот класс ошибок закрыт.

### Путь в FastPanel и путь, куда пишет GitHub Actions

Скрипт деплоя (`.github/workflows/deploy.yml`) всегда работает в **одном** каталоге с git:

`APP_DIR=/var/www/iqmoschool_r_usr/data/www/iqmoschool.ru/app`

Статика `laravel/public/site/` в прод попадает **через rsync из CI**; на сервере в `APP_DIR` делается `git reset` к `origin/main` (Laravel, `extracted/`, `routes/`, `resources/`, т.д.).

В **файловом менеджере** FastPanel иногда открывается **другой** путь — например `/var/www/iqmoschool.ru/app/...` (без `.../iqmoschool_r_usr/data/.../`). Это может быть **не та** копия репозитория: старые файлы, ручные правки прошлых лет, пустой `git`. Тогда в редакторе по-прежнему `href="./index.html"` у «Биологии», хотя **живой** сайт уже отдаётся из `APP_DIR` и после успешного деплоя в HTML должна быть ссылка на биологию.

**Что сделать**

1. Убедиться, что [Deploy to VPS] на последнем коммите в `main` **зелёный**.
2. Проверить не редактором, а факт: `curl -sS https://www.iqmoschool.ru/subject-chemistry/ | findstr /i subject-biology` (или в Linux `grep subject-biology`). Старый URL `/subject-chemistry.html` должен 301-редиректить на `/subject-chemistry/`.
3. Править статику **только** в `extracted/` в репозитории, не вручную в `laravel/public/site/` на сервере (следующий sync перетрёт).
4. Вручную: с машины, где установлен **Node ≥18** — `cd` в корень репозитория, `node scripts/sync-site.mjs`, затем скопируйте `laravel/public/site/` на сервер (или `git pull` в `APP_DIR` и `sync` на той же машине, если репозиторий один).
5. Чтобы путь в панели совпадал с продом, уточните у хостинга, не ссылка ли `/var/www/iqmoschool.ru/...` на `.../iqmoschool_r_usr/data/...` (`readlink -f` / сравнение inodes).

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
