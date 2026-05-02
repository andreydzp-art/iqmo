-- IQMO MySQL schema (auth + profile sync)
-- Usage:
--   mysql -u root -p < mysql-schema.sql

CREATE DATABASE IF NOT EXISTS iqmo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE iqmo;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(320) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  -- Server-side JWT revocation (audit #3): каждый выпущенный JWT
  -- содержит token_version на момент выдачи. INCREMENT этого поля
  -- (logout-everywhere / в будущем — смена пароля) делает все ранее
  -- выпущенные токены этого юзера невалидными.
  token_version INT UNSIGNED NOT NULL DEFAULT 1,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profile_state (
  user_id BIGINT UNSIGNED NOT NULL,
  keys_json JSON NOT NULL,
  revision BIGINT NOT NULL DEFAULT 0,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_profile_state_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profile_history (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  keys_json JSON NOT NULL,
  revision BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY idx_profile_history_user (user_id),
  CONSTRAINT fk_profile_history_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  CONSTRAINT fk_analytics_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

