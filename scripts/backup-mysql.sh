#!/usr/bin/env bash
# IQMO: ежедневный бэкап MySQL.
#
# Где запускать: на VPS, под пользователем, у которого есть `~/.my.cnf`
# с правами SELECT/LOCK TABLES/SHOW VIEW/EVENT/TRIGGER на БД `iqmo_app`.
# Конфигурация — через переменные окружения, не через флаги (так удобнее
# в cron/systemd-таймере), все имеют разумные дефолты для FastPanel-инсталла:
#
#   IQMO_DB_NAME              имя БД                   (default: iqmo_app — совпадает с config/database.php)
#   IQMO_DB_HOST              хост MySQL               (default: 127.0.0.1)
#   IQMO_DB_USER              пользователь, если не из ~/.my.cnf  (default: empty)
#   IQMO_BACKUP_DIR           куда складывать дампы    (default: $HOME/backups/iqmo)
#   IQMO_BACKUP_RETAIN_DAYS   сколько хранить          (default: 14)
#   IQMO_BACKUP_MIN_BYTES     пол ниже которого считаем дамп подозрительным (default: 2048)
#
# Почему имя по умолчанию `iqmo_app`: на FastPanel-инсталле БД называется
# `iqmo_app` (см. `config/database.php`), а не «логическое» `iqmo`. Если у
# вас другое имя — переопределите через `IQMO_DB_NAME=...` в cron-команде.
# Почему BACKUP_DIR по умолчанию относительно $HOME: cron от любого
# пользователя гарантированно может писать в свой домашний каталог,
# а абсолютный путь типа `/var/www/<user>/...` ломается при смене юзера.
#
# Что в дампе:
#   --single-transaction        — снимок без блокировки таблиц на запись
#                                 (требует InnoDB; у нас всё InnoDB);
#   --routines / --triggers     — процедуры и триггеры, на случай если
#                                 кто-то их когда-то добавит вручную;
#   --quick                     — потоковая выгрузка по строкам, без
#                                 буферизации в памяти на больших таблицах
#                                 (analytics_events со временем разрастётся);
#   --default-character-set=utf8mb4 — против битой кириллицы в дампе.
#
# Атомарность: пишем в `.sql.gz.partial`, в самом конце rename в `.sql.gz`.
# Это значит, что наблюдатель (см. BACKUPS.md, раздел про мониторинг)
# никогда не увидит полупустой файл свежего бэкапа.
#
# Smoke: после `gzip` проверяем размер. Если меньше IQMO_BACKUP_MIN_BYTES,
# дамп считается мусорным (БД пустая? права слетели? mysqldump ругнулся
# в stderr и отдал пустой stdout?) — exit 1, файл стирается, cron пришлёт
# письмо если MAILTO задан.
#
# Ротация: всё, что старше IQMO_BACKUP_RETAIN_DAYS дней, удаляется.

set -Eeuo pipefail
export LC_ALL=C                               # стабильное форматирование дат, числовой сортировки
umask 077                                     # бэкапы — только для владельца

DB_NAME="${IQMO_DB_NAME:-iqmo_app}"
DB_HOST="${IQMO_DB_HOST:-127.0.0.1}"
DB_USER="${IQMO_DB_USER:-}"
# `${HOME:?HOME must be set}` — на cron-инсталлах HOME иногда не выставлен,
# тогда мы лучше упадём с понятной ошибкой, чем создадим `/backups/iqmo` от рута.
BACKUP_DIR="${IQMO_BACKUP_DIR:-${HOME:?HOME must be set in cron/env}/backups/iqmo}"
RETAIN_DAYS="${IQMO_BACKUP_RETAIN_DAYS:-14}"
MIN_BYTES="${IQMO_BACKUP_MIN_BYTES:-2048}"

mkdir -p "$BACKUP_DIR"

ts=$(date +%Y-%m-%d-%H%M%S)
out="$BACKUP_DIR/iqmo-$ts.sql.gz"
tmp="$out.partial"

# stderr направляем в stdout, чтобы cron-письмо видело реальную ошибку
# mysqldump (например `Access denied for user 'X'@'Y'`), а не молчаливый exit 1.
DUMP_OPTS=(
  --host="$DB_HOST"
  --single-transaction
  --quick
  --routines
  --triggers
  --events
  --default-character-set=utf8mb4
  --no-tablespaces
)
if [ -n "$DB_USER" ]; then
  DUMP_OPTS+=(--user="$DB_USER")
fi

# Поток: mysqldump | gzip > tmp. Если mysqldump упадёт в середине, pipefail
# поднимет exit-код и tmp удалится в trap'е. Мы НЕ перехватываем SIGTERM —
# хотим, чтобы прерывание оставило систему в консистентном состоянии
# (готов partial-файл, который не виден потребителям).
cleanup() { rm -f "$tmp" 2>/dev/null || true; }
trap cleanup ERR INT

mysqldump "${DUMP_OPTS[@]}" "$DB_NAME" | gzip -c > "$tmp"

size=$(stat -c%s "$tmp" 2>/dev/null || stat -f%z "$tmp")
if [ "$size" -lt "$MIN_BYTES" ]; then
  echo "ERROR: backup too small ($size < $MIN_BYTES bytes), refusing to publish $out" >&2
  cleanup
  exit 1
fi

mv "$tmp" "$out"
trap - ERR INT

# Ротация. -mtime +N удаляет файлы со mtime старше N*24 часов. Для
# RETAIN_DAYS=14 это значит «храним последние две недели».
find "$BACKUP_DIR" -maxdepth 1 -type f -name 'iqmo-*.sql.gz' -mtime +"$RETAIN_DAYS" -print -delete || true

echo "OK: $out ($size bytes)"
