# IQMO: бэкапы MySQL

Документ — пошаговая установка ежедневных бэкапов на VPS, тестирование
восстановления и рекомендации по offsite-копии. Делается один раз и
работает дальше само.

## Что бэкапим и зачем

Источник правды портала — БД `iqmo` на MySQL/MariaDB. Там лежат:

- **`users`** — учётки и пароль-хеши;
- **`profile_state`** — снепшоты прогресса (то, что синхронизируется через
  `/api/profile/state`);
- **`analytics_events`** — телеметрия событий (`chem.topic_view`,
  `chem.attempt_*`, `iqmo.purchase`).

Без этих данных портал бессмысленнен: пользователи не залогинятся, прогресс
не подтянется, в админке исчезнут все воронки и средние.

Дефолтная база Laravel-Breeze (`iqmoschool` или `mysql`-connection) почти
пустая и не несёт критичных данных, поэтому в бэкап не включена. Если
кто-то начнёт ей пользоваться — добавить в скрипт второй `mysqldump`.

## Установка на VPS (5 минут)

Шаги ниже для FastPanel-инсталла, пользователь `iqmoschool_r_usr`.
Если у вас другой хостинг — поправьте пути и имена сервисов.

### 1. Доступ к MySQL без пароля в командной строке

Положите учётку в `~/.my.cnf` под пользователем `iqmoschool_r_usr`:

```bash
ssh iqmoschool_r_usr@<VPS>
nano ~/.my.cnf
```

Содержимое:

```ini
[client]
host=127.0.0.1
user=iqmo_dump
password=<сильный_пароль>

[mysqldump]
host=127.0.0.1
user=iqmo_dump
password=<сильный_пароль>
```

```bash
chmod 600 ~/.my.cnf
```

> Используйте отдельного MySQL-пользователя `iqmo_dump`, не `root`.
> Минимально-необходимые привилегии: `SELECT, LOCK TABLES, SHOW VIEW,
> EVENT, TRIGGER` на БД `iqmo`. Создание (под root):
>
> ```sql
> CREATE USER 'iqmo_dump'@'localhost' IDENTIFIED BY '<сильный_пароль>';
> GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON `iqmo`.*
>   TO 'iqmo_dump'@'localhost';
> FLUSH PRIVILEGES;
> ```

### 2. Папка для дампов

```bash
mkdir -p /var/www/iqmoschool_r_usr/data/backups/iqmo
chmod 700 /var/www/iqmoschool_r_usr/data/backups/iqmo
```

`chmod 700` — критично: бэкап содержит хеши паролей, не давайте никому
другому даже на чтение.

### 3. Прогон руками — убедиться, что дамп получается

```bash
cd /var/www/iqmoschool_r_usr/data/www/iqmoschool.ru/app
chmod +x scripts/backup-mysql.sh
scripts/backup-mysql.sh
```

Ожидаемый вывод: `OK: /var/www/iqmoschool_r_usr/data/backups/iqmo/iqmo-YYYY-MM-DD-HHMMSS.sql.gz (NNNN bytes)`.

Если получили `ERROR: backup too small` — значит mysqldump молча провалился
(чаще всего: нет прав у `iqmo_dump`, или БД называется не `iqmo`).
Запустите вручную с `--verbose` и посмотрите stderr:

```bash
mysqldump --single-transaction --quick iqmo > /tmp/check.sql
ls -l /tmp/check.sql
```

### 4. Cron — раз в сутки в 04:00 утра

```bash
crontab -e
```

Добавляем:

```
MAILTO=ops@example.com
0 4 * * * /var/www/iqmoschool_r_usr/data/www/iqmoschool.ru/app/scripts/backup-mysql.sh
```

`MAILTO` — куда cron шлёт письма при ненулевом exit. Если на сервере не
настроен SMTP — оставьте пустым, в этом случае ошибки уходят в
`/var/spool/mail/iqmoschool_r_usr` и можно периодически проверять.

> **Окно 04:00 UTC выбрано не случайно**: на это время приходится минимум
> трафика (ночь по Москве), и `--single-transaction` создаёт минимум
> блокировок именно в это время. Если у вас активная аудитория из США /
> Азии — сдвиньте, но не на час пик.

### 5. Проверить, что cron реально срабатывает

На следующий день:

```bash
ls -lh /var/www/iqmoschool_r_usr/data/backups/iqmo/
# Ожидаем: iqmo-YYYY-MM-DD-040000.sql.gz, размер не нулевой.
```

Если файла нет — `journalctl -u cron --since today | grep iqmo`. Чаще
всего проблема в правах: cron запускается под другим shell/окружением,
без `~/.my.cnf`. Решение — указать `HOME=/var/www/iqmoschool_r_usr`
в первой строке crontab.

## Тест восстановления (важно сделать хотя бы раз)

Бэкап без проверенного восстановления — это иллюзия. Раз в квартал делайте
учения: восстанавливаете последний дамп в **отдельную тестовую БД** и
проверяете количество строк.

```bash
# 1. Свежий бэкап текущего состояния — так, на всякий.
scripts/backup-mysql.sh

# 2. Создаём чистую базу под тест.
mysql -e "DROP DATABASE IF EXISTS iqmo_restore_test;
          CREATE DATABASE iqmo_restore_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Восстанавливаем туда последний дамп.
src=$(ls -1t /var/www/iqmoschool_r_usr/data/backups/iqmo/iqmo-*.sql.gz | head -n 1)
gunzip -c "$src" | mysql iqmo_restore_test

# 4. Сравниваем размеры с прод-БД.
mysql -N -B -e "SELECT
  (SELECT COUNT(*) FROM iqmo.users) AS prod_users,
  (SELECT COUNT(*) FROM iqmo_restore_test.users) AS bk_users,
  (SELECT COUNT(*) FROM iqmo.profile_state) AS prod_states,
  (SELECT COUNT(*) FROM iqmo_restore_test.profile_state) AS bk_states,
  (SELECT COUNT(*) FROM iqmo.analytics_events) AS prod_events,
  (SELECT COUNT(*) FROM iqmo_restore_test.analytics_events) AS bk_events;"

# 5. Удаляем тестовую базу.
mysql -e "DROP DATABASE iqmo_restore_test;"
```

`bk_*` должны быть равны `prod_*` (или `prod_*` чуть больше за счёт строк,
добавленных после момента бэкапа). Если `bk_*` сильно меньше или нули —
дамп битый, разбираемся (см. ниже «когда дамп битый»).

## Восстановление в прод (на случай аварии)

Подробно — в [`RUNBOOK.md` § 6](./RUNBOOK.md#6-восстановление-mysql-из-бэкапа).
Кратко:

```bash
# обязательно: свежий дамп текущего состояния
scripts/backup-mysql.sh

# остановить писателей (важно!)
sudo systemctl stop php8.3-fpm

# само восстановление
IQMO_DB_USER=root scripts/restore-mysql.sh --yes-i-have-a-fresh-backup

# поднять сервис
sudo systemctl start php8.3-fpm
```

Скрипт `restore-mysql.sh` в самом конце печатает количество строк в трёх
ключевых таблицах. Если хоть одна `0` или `MISSING` — восстановление
прошло криво, не торопитесь поднимать php-fpm, разбирайтесь.

## Offsite-копия (рекомендация)

Локальные бэкапы спасают от «удалили таблицу руками», но не от пожара
на VPS / отказа диска / угона аккаунта хостинга. Минимально-достаточный
оффсайт:

### Вариант A: Yandex Object Storage (S3-совместимый, ~₽3/ГБ/мес)

Создайте бакет `iqmo-backups`, выпустите статический ключ, и в cron:

```
30 4 * * * /usr/local/bin/aws --endpoint-url=https://storage.yandexcloud.net s3 sync \
  /var/www/iqmoschool_r_usr/data/backups/iqmo/ \
  s3://iqmo-backups/iqmo/ \
  --exclude '*.partial' \
  --no-progress >> /var/log/iqmo-s3-sync.log 2>&1
```

`--exclude '*.partial'` важен: иначе sync подхватит наполовину готовый
дамп, если попадёт в окно 04:00–04:30.

### Вариант B: rsync на удалённую машину

Если есть второй сервер (домашний NAS, второй VPS) — самый простой путь:

```
30 4 * * * rsync -az --delete-after \
  /var/www/iqmoschool_r_usr/data/backups/iqmo/ \
  backup-user@nas.local:/srv/iqmo-backups/
```

С ключом без passphrase в `~/.ssh/iqmo-backup` и явным `IdentityFile=` в
`~/.ssh/config`.

### Что точно НЕ надо

- **Класть бэкап в Git LFS репозитория** — содержит хеши паролей,
  репо публичный.
- **Оставлять бэкапы только локально**. Нагрев диска убьёт и прод, и
  бэкапы одновременно.
- **Хранить много истории на горячем диске.** 14 дней с
  `IQMO_BACKUP_RETAIN_DAYS=14` — компромисс между объёмом и шансом
  заметить медленный data-corruption (где плохие записи копятся неделю,
  и нужно откатиться к «до»).

## Что бэкапим **кроме** БД

База — это самое критичное, но не единственное. По убыванию важности:

1. **`.env` файлы** Laravel и Node — содержат `IQMO_JWT_SECRET`, без
   которого даже восстановленная БД бесполезна (все JWT в кукэ
   подписаны старым секретом). Бэкапить руками после каждой правки.
   Хранить отдельно от БД-дампов (разные ключи доступа).
2. **`/etc/nginx/conf.d/iqmoschool.ru.conf`** или эквивалент в FastPanel —
   восстановить руками займёт час и легко промахнуться по `try_files`.
3. **`scripts/`** в репо — уже в Git, отдельный бэкап не нужен.

Простой набор из шага «`.env` + nginx-конфиг» можно положить в зашифрованный
архив и приложить к ежедневному offsite-sync (`gpg --symmetric` с
паролем, сохранённым в менеджере паролей).

## Когда дамп битый: симптомы и причины

| Симптом | Скорее всего |
| --- | --- |
| `ERROR: backup too small` | Нет прав у `iqmo_dump`, или БД переименована, или mysqldump упал на ошибке. Запустите `mysqldump` вручную с `--verbose` и `2>&1`. |
| `Error: Couldn't read default options from /root/.my.cnf` | Cron под другим пользователем. Уточните `HOME=` в crontab. |
| `gzip: stdin: not in gzip format` при восстановлении | Файл частично записан (диск кончился прямо в момент бэкапа?). Проверка: `gzip -t файл.sql.gz`. Если `not in gzip format` — берём предыдущий день. |
| `Got error 1062 "Duplicate entry" on insert` при восстановлении | Восстанавливаем поверх непустой БД. Скрипт делает `DROP DATABASE` сам — значит вы запустили `gunzip | mysql` руками. Используйте `restore-mysql.sh`. |

## Чек-лист «всё ли я сделал»

- [ ] `~/.my.cnf` создан, `chmod 600`, mysql `iqmo_dump` user работает.
- [ ] `/var/www/iqmoschool_r_usr/data/backups/iqmo/` существует, `chmod 700`.
- [ ] Ручной запуск `scripts/backup-mysql.sh` создаёт файл и печатает `OK:`.
- [ ] Cron-запись добавлена, `MAILTO=` настроен.
- [ ] Через сутки лежит файл с датой/временем cron-запуска.
- [ ] Хотя бы раз сделали тест восстановления в `iqmo_restore_test`.
- [ ] Настроена оффсайт-синхронизация (S3 / rsync / эквивалент).
- [ ] `.env` с `IQMO_JWT_SECRET` лежит отдельно от БД-дампов.
