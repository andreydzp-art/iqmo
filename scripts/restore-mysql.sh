#!/usr/bin/env bash
# IQMO: восстановление MySQL из дампа, сделанного `backup-mysql.sh`.
#
# !!! ЭТО РАЗРУШИТЕЛЬНАЯ ОПЕРАЦИЯ !!!
# Скрипт делает DROP DATABASE + CREATE DATABASE, после чего льёт дамп.
# Все текущие записи в БД (юзеры, прогресс, аналитика за сегодня) будут
# заменены содержимым дампа.
#
# Запуск:
#   IQMO_DB_USER=root scripts/restore-mysql.sh --yes-i-have-a-fresh-backup
#   IQMO_DB_USER=root scripts/restore-mysql.sh --yes-i-have-a-fresh-backup /path/to/iqmo-2026-04-27.sql.gz
#
# Без явного флага скрипт ничего не делает и печатает usage. Это сделано
# намеренно: один лишний `bash restore-mysql.sh` без аргументов из истории
# bash не должен обнулить продакшен.
#
# Если путь к дампу не указан, берём самый свежий из IQMO_BACKUP_DIR.
#
# ПЕРЕД ЗАПУСКОМ:
#   1. Сделайте свежий backup-mysql.sh — даже если БД «убита», у вас будет
#      slot для отката-к-откату на случай, если выбранный дамп тоже битый.
#   2. Остановите сервисы, пишущие в iqmo:
#        sudo systemctl stop php8.3-fpm   (или соответствующий)
#        pm2 stop iqmo-server             (если используется Node-вариант)
#      Иначе сразу после восстановления получите смесь старых и новых
#      данных (логин с новой солью + профиль из дампа = битый аккаунт).
#   3. Сообщите команде в чат, что прод сейчас в read-only.
#
# ПОСЛЕ ЗАПУСКА:
#   - Проверьте размеры таблиц: SELECT COUNT(*) FROM users / profile_state /
#     analytics_events.
#   - Поднимите сервисы: systemctl start php8.3-fpm.
#   - Проверьте, что вход работает (с тестового аккаунта, не с админского).

set -Eeuo pipefail

if [ "${1:-}" != "--yes-i-have-a-fresh-backup" ]; then
  cat <<'USAGE' >&2
Usage:
  restore-mysql.sh --yes-i-have-a-fresh-backup [PATH_TO_BACKUP.sql.gz]

Без флага --yes-i-have-a-fresh-backup скрипт ничего не делает.
Этот флаг — обязательный «второй ключ»: вы подтверждаете, что только что
запускали backup-mysql.sh и текущее состояние БД сохранено отдельным дампом.
USAGE
  exit 2
fi
shift

DB_NAME="${IQMO_DB_NAME:-iqmo}"
DB_HOST="${IQMO_DB_HOST:-127.0.0.1}"
BACKUP_DIR="${IQMO_BACKUP_DIR:-/var/www/iqmoschool_r_usr/data/backups/iqmo}"

if [ -n "${1:-}" ]; then
  src="$1"
else
  src=$(ls -1t "$BACKUP_DIR"/iqmo-*.sql.gz 2>/dev/null | head -n 1 || true)
fi

if [ -z "$src" ] || [ ! -f "$src" ]; then
  echo "ERROR: backup file not found." >&2
  echo "Передайте путь явно: $0 --yes-i-have-a-fresh-backup /path/to/dump.sql.gz" >&2
  echo "Или положите дамп в $BACKUP_DIR (имя iqmo-*.sql.gz)." >&2
  exit 1
fi

# Не ленимся проверить, что файл хотя бы читается gzip'ом. Иначе можно
# получить «всё OK, прод восстановлен», когда на самом деле gunzip
# провалился на середине, и БД осталась пустая.
if ! gzip -t "$src" 2>/dev/null; then
  echo "ERROR: gzip integrity check failed for $src — backup is corrupt, aborting." >&2
  exit 1
fi

CONN_OPTS=(--host="$DB_HOST")
if [ -n "${IQMO_DB_USER:-}" ]; then
  CONN_OPTS+=(--user="$IQMO_DB_USER")
fi

cat <<EOF
====================================================================
ВНИМАНИЕ: будет выполнено восстановление БД '$DB_NAME' на '$DB_HOST'
из файла:
  $src   ($(stat -c%s "$src" 2>/dev/null || stat -f%z "$src") bytes)

Текущая БД '$DB_NAME' будет полностью УДАЛЕНА перед восстановлением.

5 секунд на отмену (Ctrl+C) ...
====================================================================
EOF
sleep 5

mysql "${CONN_OPTS[@]}" -e "DROP DATABASE IF EXISTS \`$DB_NAME\`; CREATE DATABASE \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
gunzip -c "$src" | mysql "${CONN_OPTS[@]}" "$DB_NAME"

# Sanity: считаем строки в трёх ключевых таблицах. Если хоть одна не существует
# (выбран не тот дамп? повредился?) — заметим сразу, не дойдя до заявления
# «всё восстановлено».
for t in users profile_state analytics_events; do
  cnt=$(mysql "${CONN_OPTS[@]}" -N -B -e "SELECT COUNT(*) FROM \`$t\`;" "$DB_NAME" 2>/dev/null || echo "MISSING")
  echo "  $t: $cnt"
done

echo "OK: $DB_NAME restored from $src"
echo "Не забудьте поднять сервисы (php-fpm / pm2) и проверить вход."
