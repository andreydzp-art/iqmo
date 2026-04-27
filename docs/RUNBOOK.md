# IQMO Runbook: что делать, если что-то сломалось

Документ написан так, чтобы человек, открывший его в 03:17 ночи под алертом,
смог найти нужный сценарий за 30 секунд и починить за 5 минут.

Декомпозиция: сначала **триаж** (определить, что именно сломалось), затем
**конкретный сценарий** с командами. Все команды предполагают, что вы зашли
по SSH под пользователем `iqmoschool_r_usr` на VPS (FastPanel).

```
APP_DIR=/var/www/iqmoschool_r_usr/data/www/iqmoschool.ru/app
LARAVEL_DIR=$APP_DIR/laravel
BACKUP_DIR=/var/www/iqmoschool_r_usr/data/backups/iqmo
```

## Триаж: что именно сломано?

| Симптом | Куда идти |
| --- | --- |
| Главная отдаёт 502 / timeout / ничего | [§ 1. Сайт лежит](#1-сайт-лежит-502--timeout) |
| Главная открывается, но логин не работает | [§ 2. Логин/регистрация сломаны](#2-логинрегистрация-сломаны) |
| `/admin/index.html` не пускает никого, включая админа | [§ 3. Админка не пускает](#3-админка-не-пускает-403--503) |
| Админка пускает, но KPI/графики пустые | [§ 4. В админке нет данных](#4-в-админке-нет-данных-всё-нули) |
| Чек-лист «после деплоя оказалось хуже» | [§ 5. Откат деплоя за 2 минуты](#5-откат-деплоя-за-2-минуты) |
| «БД повреждена» / «нужно восстановить из вчера» | [§ 6. Восстановление из бэкапа](#6-восстановление-mysql-из-бэкапа) |

## 1. Сайт лежит (502 / timeout)

**Быстрый чек.** Что отвечает фронт?

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://www.iqmoschool.ru/
```

- `502 Bad Gateway` → upstream (PHP-FPM или Node) не принимает соединения.
- `504 Gateway Timeout` → upstream живой, но не успевает ответить (БД? код?).
- `200`, но с устаревшим контентом → Nginx отдаёт кэш / static bypass.

**Что смотреть.**

```bash
sudo systemctl status php8.3-fpm        # должен быть active (running)
sudo systemctl status nginx             # активен, без alert/error в журнале
sudo tail -n 100 /var/log/nginx/error.log
sudo tail -n 100 $LARAVEL_DIR/storage/logs/laravel.log
df -h                                   # хотя бы 1 ГБ свободно на /
```

**Типичные причины и фиксы.**

- **PHP-FPM не поднялся после деплоя**: `sudo systemctl restart php8.3-fpm`.
  Если падает повторно — `journalctl -u php8.3-fpm -n 200` покажет, какой
  PHP-файл его уронил, и обычно это импорт с typo'ом или `composer install`,
  который не доехал.
- **Диск 100 %**: проверить `du -sh $LARAVEL_DIR/storage/logs/*.log` и
  `du -sh $BACKUP_DIR/*`. Чаще всего в логи навалили мегабайты — `truncate -s 0
  laravel.log` пока не починим причину.
- **MySQL не отвечает**: `sudo systemctl status mariadb` (или mysql).
  Перезапуск через `sudo systemctl restart mariadb`. Если не стартует —
  проверить `journalctl -u mariadb -n 200`, обычно это `innodb_buffer_pool_size`
  под перегрузом или диск полон.

## 2. Логин/регистрация сломаны

Чаще всего это одна из четырёх причин (в порядке убывания вероятности):

1. **Cookie не привязалась к домену.** Сайт открыт по `iqmoschool.ru`, а
   API отвечает с `www.iqmoschool.ru` (или наоборот). Cookie `iqmo_session`
   ставится с `Path=/` и без `Domain=`, поэтому она хоп-он-хост. Решение —
   жёсткий 301 на каноничный хост в Nginx.
2. **`IQMO_JWT_SECRET` поплыл.** В Laravel `.env` и Node `.env` секреты
   должны совпадать байт-в-байт. Если вы перевыпустили один и забыли про
   второй — клиент ходит между ними и видит `unauthorized` через раз.
3. **MySQL: таблица `users` или `profile_state` недоступна.** Проверка:
   ```bash
   mysql -e "SELECT COUNT(*) FROM users; SELECT COUNT(*) FROM profile_state;" iqmo
   ```
   Если ошибка — см. §6.
4. **Stale `login.html` в `laravel/public/`.** Источник правды — `public/site/login.html`,
   деплой удаляет рутовые `*.html` в `laravel/public`, но если кто-то их
   создал руками, надо повторить:
   ```bash
   find $LARAVEL_DIR/public -maxdepth 1 -type f -name '*.html' -print -delete
   ```

**Быстрый smoke на месте.**

```bash
curl -sS -X POST -H 'Content-Type: application/json' \
  -d '{}' https://www.iqmoschool.ru/api/auth/login -w '\nstatus=%{http_code}\n'
```

- `404` → роуты IQMO API не зарегистрированы. См. `laravel/bootstrap/app.php`,
  ищем `iqmo_api.php`. Скорее всего деплой накатился наполовину —
  `php artisan optimize:clear && sudo systemctl reload php8.3-fpm`.
- `422`/`401` → роут жив, форма просто пустая (это нормально на этом curl).
- `500` → читать `storage/logs/laravel.log`.

## 3. Админка не пускает (403 / 503)

Доступ в `/admin/*` контролируется middleware `iqmo.portal_admin`,
который читает email из JWT и сверяет с `IQMO_ADMIN_EMAILS` (CSV в `.env`).

**Чек-лист.**

1. Email в JWT — это то, под которым залогинен пользователь. Проверка:
   ```bash
   curl -sS -b 'iqmo_session=ВАШ_JWT' https://www.iqmoschool.ru/api/me
   ```
   Должен прийти JSON с вашим email. Если `unauthorized` — куки нет или
   она протухла, перелогиниться.
2. Email в whitelist:
   ```bash
   grep -E '^IQMO_ADMIN_EMAILS=' $LARAVEL_DIR/.env
   ```
   Список через запятую, без пробелов: `IQMO_ADMIN_EMAILS=a@iqmo.ru,b@iqmo.ru`.
   После правки `.env` — `php artisan optimize:clear`.
3. Если админка возвращает `503 Service Unavailable` — значит включён
   maintenance mode. Снять: `php artisan up`.

## 4. В админке нет данных (всё нули)

Смотрим на новую «диагностическую шторку» вверху главного экрана админки —
она прямо отвечает на этот вопрос.

| Что показывает шторка | Что это значит | Что делать |
| --- | --- | --- |
| `Нет ни одного события` (красная) | `analytics_events` пустая или ингест глухой | Проверить `POST /api/analytics/events` (см. §2 пункт 4) и что Laravel реально читает БД через connection `iqmo` (а не дефолтный `mysql`). |
| `view: N, start: 0, complete: 0` (оранжевая) | Темы открывают, но никто не запускает тесты | Это не баг, это поведение пользователей. Ингест жив. |
| `view: N, start: M, complete: 0` (оранжевая) | Тесты стартуют, но никто не доходит до итогов | Чаще всего bug в `chem-progress.js` (например, `recordAttempt` не вызывается). Локальный тест: пройти разминку с DevTools открытыми, в Network должна быть `POST /api/analytics/events` со `chem.attempt_complete`. |
| зелёная, но KPI всё равно пустые | Воронка считается за period; смените период в селекторе. По умолчанию = «сегодня». | Переключиться на «за 7 дней» / «за 30 дней». |

Контрольные SELECT'ы (запускать под пользователем БД `iqmo`):

```sql
SELECT COUNT(*), MAX(occurred_at) FROM analytics_events;
SELECT event, COUNT(*) FROM analytics_events GROUP BY event;
```

`MAX(occurred_at)` должен быть в пределах нескольких минут от `NOW()` —
иначе ингест встал.

## 5. Откат деплоя за 2 минуты

Деплой пишет `git reset --hard origin/main`, поэтому самый простой откат —
заставить `origin/main` указывать на предыдущий зелёный коммит.

**Безопасный способ — через GitHub.**

1. На GitHub откройте Actions → Deploy to VPS, найдите последний зелёный
   запуск (до того, как пошло криво) и скопируйте sha коммита (виден в
   заголовке job'а).
2. Локально:
   ```bash
   git fetch origin
   git checkout main
   git reset --hard <sha-коммита-который-был-зелёный>
   git push --force-with-lease origin main
   ```
   Это спровоцирует deploy.yml на тот sha.

**Аварийный — прямо на VPS, без GitHub.**

Подходит, если GitHub Actions недоступен и нужно срочно.

```bash
cd $APP_DIR
git log --oneline -n 5                                # выбираем коммит до поломки
git reset --hard <sha>                                # бэкенд возвращается к нему

cd $LARAVEL_DIR
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize:clear

find $LARAVEL_DIR/public -maxdepth 1 -type f -name '*.html' -print -delete
rm -rf $LARAVEL_DIR/public/admin

sudo systemctl reload php8.3-fpm                      # игнорируем, если NOPASSWD не настроен
```

После этого зайдите в админку и проверьте, что данные на месте.

> ⚠️ Откат **БД** через `php artisan migrate:rollback` обычно ломает прод
> ещё сильнее. Миграции IQMO идемпотентные, ничего «лишнего» назад катить
> не надо. Если поломка вызвана именно последней миграцией — откатывайте
> код, а БД оставляйте как есть, уберите конкретную миграцию вручную.

## 6. Восстановление MySQL из бэкапа

См. подробный гайд в [`BACKUPS.md`](./BACKUPS.md). Кратко:

```bash
# 1. Свежий снимок текущего (даже если он мусорный — нам нужен «откат к откату»):
$APP_DIR/scripts/backup-mysql.sh

# 2. Останавливаем писателей:
sudo systemctl stop php8.3-fpm                        # читай комментарий в restore-mysql.sh

# 3. Восстановление (по умолчанию — самый свежий дамп из $BACKUP_DIR):
IQMO_DB_USER=root $APP_DIR/scripts/restore-mysql.sh --yes-i-have-a-fresh-backup

# 4. Проверка размеров таблиц (скрипт сам печатает):
#      users, profile_state, analytics_events — все три > 0.

# 5. Поднимаем сервис обратно:
sudo systemctl start php8.3-fpm
```

Если нужен конкретный дамп (не последний), передайте путь:

```bash
IQMO_DB_USER=root $APP_DIR/scripts/restore-mysql.sh \
  --yes-i-have-a-fresh-backup \
  $BACKUP_DIR/iqmo-2026-04-26-040000.sql.gz
```

## 7. Что проверить после починки

Минимум:

- `curl -sS https://www.iqmoschool.ru/ | grep -q IQMO`        — главная жива.
- `curl -sS https://www.iqmoschool.ru/api/me`                  — `unauthorized` JSON.
- Залогиниться в `/admin/index.html` под админским email.
- Открыть `/topic-periodic-table.html` — вверху должна быть Метрика
  (smoke в `deploy.yml` это уже проверяет, но в аварии лучше глазами).

## Контакты и эскалация

Зафиксируйте внутри команды:

- **DNS**: где зарегистрирован `iqmoschool.ru`, у кого пароль от регистратора.
- **Хостинг (FastPanel)**: пароль root и пароль panel-пользователя, IP для
  SSH-фолбэка если SSH-агент в GitHub секретах не работает.
- **MySQL**: пароль root. Хранится в `~/.my.cnf` под пользователем
  `iqmoschool_r_usr` (см. `BACKUPS.md`).
- **GitHub**: кто owner, кто может крутить Settings → Secrets для
  `DEPLOY_HOST` / `DEPLOY_SSH_KEY`.
- **Метрика**: владелец счётчика 108770166.
