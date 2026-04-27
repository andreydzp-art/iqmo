# IQMO: бэкапы MySQL

Документ — пошаговая установка ежедневных бэкапов на VPS, тестирование
восстановления и рекомендации по offsite-копии. Делается один раз и
работает дальше само.

## Что бэкапим и зачем

Источник правды портала — БД **`iqmo_app`** на MySQL/MariaDB (имя по
умолчанию из `config/database.php`, переопределяется через
`IQMO_DB_DATABASE` в `.env`). Там лежат:

- **`users`** — учётки и пароль-хеши;
- **`profile_state`** — снепшоты прогресса (то, что синхронизируется через
  `/api/profile/state`);
- **`analytics_events`** — телеметрия событий (`chem.topic_view`,
  `chem.attempt_*`, `iqmo.purchase`).

Без этих данных портал бессмыслен: пользователи не залогинятся, прогресс
не подтянется, в админке исчезнут все воронки и средние.

Соседняя база `iqmo_laravel` — служебная для Laravel-Breeze (sessions,
cache, password_resets), почти пустая, потеря не критична. Если когда-то
начнёт использоваться по-серьёзному — добавить вторым `mysqldump`-ом.

## Установка на VPS (5 минут)

Шаги ниже — для FastPanel-инсталла. Есть две схемы, выбирайте одну:

- **Схема А — «через SSH»** (классическая, см. § 1–5 ниже). Подходит, если
  у вас есть SSH-доступ под системным юзером (например `iqmoschool_r_usr`).
- **Схема Б — «через FastPanel UI»** (см. § «Установка через FastPanel UI»
  в самом конце документа). Подходит, если SSH закрыт key-only и быстро
  его открыть не получается. Все те же файлы создаются через файловый
  менеджер, cron — через «Планировщик», запуск — от `fastuser`.

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
> EVENT, TRIGGER` на БД `iqmo_app`. Создание (под root):
>
> ```sql
> CREATE USER 'iqmo_dump'@'localhost' IDENTIFIED BY '<сильный_пароль>';
> GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON `iqmo_app`.*
>   TO 'iqmo_dump'@'localhost';
> FLUSH PRIVILEGES;
> ```
>
> Если SSH-доступа к root нет — те же привилегии раздаст FastPanel при
> создании MySQL-юзера, привязанного к базе `iqmo_app` (UI-путь:
> «Базы данных → iqmo_app → Пользователи → Добавить»). FastPanel выдаст
> «все привилегии в этой БД», что чуть шире наших минимальных, но
> ограничено одной БД, поэтому приемлемо.

### 2. Папка для дампов

```bash
mkdir -p ~/backups/iqmo
chmod 700 ~/backups/iqmo
```

`chmod 700` — критично: бэкап содержит хеши паролей, не давайте никому
другому даже на чтение.

> Дефолт скрипта — `${HOME}/backups/iqmo`. Если хотите положить дампы в
> другое место (например, на отдельный smount-овый диск), задайте
> `IQMO_BACKUP_DIR=/mnt/backups/iqmo` в crontab.

### 3. Прогон руками — убедиться, что дамп получается

```bash
cd /var/www/iqmoschool_r_usr/data/www/iqmoschool.ru/app
chmod +x scripts/backup-mysql.sh
scripts/backup-mysql.sh
```

Ожидаемый вывод: `OK: ~/backups/iqmo/iqmo-YYYY-MM-DD-HHMMSS.sql.gz (NNNN bytes)`.

Если получили `ERROR: backup too small` — значит mysqldump молча провалился
(чаще всего: нет прав у `iqmo_dump`, или БД называется не `iqmo_app`).
Запустите вручную с `--verbose` и посмотрите stderr:

```bash
mysqldump --single-transaction --quick iqmo_app > /tmp/check.sql
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
ls -lh ~/backups/iqmo/
# Ожидаем: iqmo-YYYY-MM-DD-040000.sql.gz, размер не нулевой.
```

Если файла нет — `journalctl -u cron --since today | grep iqmo`. Чаще
всего проблема в правах: cron запускается под другим shell/окружением,
без `~/.my.cnf`. Решение — указать `HOME=/var/www/<sysuser>`
в первой строке crontab (cron должен видеть `$HOME`, иначе скрипт
поднимет понятную ошибку «HOME must be set»).

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
src=$(ls -1t ~/backups/iqmo/iqmo-*.sql.gz | head -n 1)
gunzip -c "$src" | mysql iqmo_restore_test

# 4. Сравниваем размеры с прод-БД.
mysql -N -B -e "SELECT
  (SELECT COUNT(*) FROM iqmo_app.users) AS prod_users,
  (SELECT COUNT(*) FROM iqmo_restore_test.users) AS bk_users,
  (SELECT COUNT(*) FROM iqmo_app.profile_state) AS prod_states,
  (SELECT COUNT(*) FROM iqmo_restore_test.profile_state) AS bk_states,
  (SELECT COUNT(*) FROM iqmo_app.analytics_events) AS prod_events,
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
  $HOME/backups/iqmo/ \
  s3://iqmo-backups/iqmo/ \
  --exclude '*.partial' \
  --no-progress >> $HOME/logs/iqmo-s3-sync.log 2>&1
```

`--exclude '*.partial'` важен: иначе sync подхватит наполовину готовый
дамп, если попадёт в окно 04:00–04:30.

### Вариант B: rsync на удалённую машину

Если есть второй сервер (домашний NAS, второй VPS) — самый простой путь:

```
30 4 * * * rsync -az --delete-after \
  $HOME/backups/iqmo/ \
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
- [ ] `~/backups/iqmo/` существует, `chmod 700`.
- [ ] Ручной запуск `scripts/backup-mysql.sh` создаёт файл и печатает `OK:`.
- [ ] Cron-запись добавлена, `MAILTO=` настроен.
- [ ] Через сутки лежит файл с датой/временем cron-запуска.
- [ ] Хотя бы раз сделали тест восстановления в `iqmo_restore_test`.
- [ ] Настроена оффсайт-синхронизация (S3 / rsync / эквивалент).
- [ ] `.env` с `IQMO_JWT_SECRET` лежит отдельно от БД-дампов.

## Установка через FastPanel UI (без SSH)

Пошаговая шпаргалка для случая, когда SSH закрыт key-only и быстро его
открывать не хочется. Все действия — только в веб-кабинете FastPanel,
на правах админа (пользователь `fastuser`). Cron в итоге будет крутиться
от `fastuser` — это нормально, `mysqldump` подключается к БД своим
MySQL-логином (`iqmo_dump`), а не от имени запускающего OS-юзера.

1. **MySQL-юзер `iqmo_dump`** — «Базы данных → `iqmo_app` → Пользователи →
   Добавить пользователя». Логин `iqmo_dump`, сильный пароль (запишите!),
   привилегии — те, что предлагает FastPanel по умолчанию (привязаны к
   одной БД, этого достаточно).

2. **`~/.my.cnf` для `fastuser`** — «Файловый менеджер», перейти в
   `/var/www/fastuser/data/` (там лежат `.bashrc`, `.bash_profile` —
   значит это и есть `$HOME` для `fastuser`). Включить «показ скрытых
   файлов». Создать файл `.my.cnf` с содержимым из § 1 («Доступ к MySQL»),
   подставив реальный пароль `iqmo_dump`. Через «Изменить права»
   выставить **`600`** (только владелец читает/пишет).

3. **Скрипт и папка под бэкапы** — там же, в `/var/www/fastuser/data/`:
   - создать папку `scripts`, в ней файл `backup-mysql.sh`, вставить
     содержимое из репозитория (`scripts/backup-mysql.sh`), права `755`;
   - создать папку `backups/iqmo` (она появится сама после первого
     запуска скрипта, но можно и руками — права `700`).

4. **Тестовый запуск** — FastPanel «Планировщик → Добавить задачу»:
   - команда: `bash /var/www/fastuser/data/scripts/backup-mysql.sh`
   - расписание: «один раз через 2 минуты» (или ближайший возможный
     паттерн — `* * * * *` с последующим удалением);
   - сохранить, дождаться запуска. Через ~3 минуты в `backups/iqmo/`
     должен появиться `iqmo-YYYY-MM-DD-HHMMSS.sql.gz` размером не
     меньше пары килобайт.

5. **Постоянный cron** — после успешной проверки той же записи в
   «Планировщике» меняем расписание на `0 4 * * *` (ежедневно в 04:00).
   В поле «MAILTO» (если есть) вписываем рабочую почту — FastPanel
   при ошибке cron пришлёт письмо.

6. **Усиление**: смените пароль `iqmo_dump`, который вы вводили в чат
   при установке, на свежий через тот же UI; обновите его в `.my.cnf`.
   Это закрывает возможный лог-leak в средах разработки.

После успеха — отметьте чек-лист выше: пути в нём абсолютные через
`~/`/`$HOME`, поэтому корректны и для FastPanel-схемы тоже.
