'use strict';

const mysql = require('mysql2/promise');

function readEnvInt(name, fallback) {
	const v = process.env[name];
	if (v == null || v === '') return fallback;
	const n = Number(v);
	return Number.isFinite(n) ? n : fallback;
}

function buildPoolFromEnv() {
	const host = process.env.MYSQL_HOST || '127.0.0.1';
	const port = readEnvInt('MYSQL_PORT', 3306);
	const user = process.env.MYSQL_USER || 'root';
	const password = process.env.MYSQL_PASSWORD || '';
	const database = process.env.MYSQL_DATABASE || 'iqmo';

	return mysql.createPool({
		host,
		port,
		user,
		password,
		database,
		waitForConnections: true,
		connectionLimit: readEnvInt('MYSQL_CONNECTION_LIMIT', 10),
		queueLimit: 0,
		enableKeepAlive: true
	});
}

async function ensureSchema(pool) {
	// Minimal schema guard. For production, prefer running server/sql/mysql-schema.sql via migrations.
	await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(320) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  token_version INT UNSIGNED NOT NULL DEFAULT 1,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

	// Если таблица была создана до фикса (audit #3) — догоним колонкой.
	// IF NOT EXISTS на ADD COLUMN поддерживается MySQL 8.0.29+; для
	// старее — попробуем добавить и проигнорим ER_DUP_FIELDNAME (1060).
	try {
		await pool.query('ALTER TABLE users ADD COLUMN token_version INT UNSIGNED NOT NULL DEFAULT 1 AFTER password_hash');
	} catch (e) {
		if (!e || (e.errno !== 1060 && !/Duplicate column name/i.test(String(e.message || '')))) {
			throw e;
		}
	}

	await pool.query(`
CREATE TABLE IF NOT EXISTS profile_state (
  user_id BIGINT UNSIGNED NOT NULL,
  keys_json JSON NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_profile_state_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

	await pool.query(`
CREATE TABLE IF NOT EXISTS profile_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  keys_json JSON NOT NULL,
  revision BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY idx_profile_history_user (user_id),
  CONSTRAINT fk_profile_history_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

	await pool.query(`
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  occurred_at BIGINT NOT NULL,
  event VARCHAR(64) NOT NULL,
  payload_json JSON NOT NULL,
  received_at BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY idx_analytics_event_time (event, occurred_at),
  KEY idx_analytics_user_time (user_id, occurred_at),
  CONSTRAINT fk_analytics_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);
}

module.exports = { buildPoolFromEnv, ensureSchema };

