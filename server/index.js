/**
 * IQMO — локальный сервер: раздача extracted/ + API аккаунта и синхронизации localStorage (префикс iqmo-chem-).
 *
 * Запуск из каталога server:
 *   set IQMO_JWT_SECRET=длинная-случайная-строка
 *   npm install
 *   npm start
 * Откройте http://localhost:3780/ (не file:// — иначе cookie и fetch не сработают).
 */
'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Database = require('better-sqlite3');

const PORT = Number(process.env.PORT) || 3780;
const JWT_SECRET = process.env.IQMO_JWT_SECRET || 'dev-only-change-IQMO_JWT_SECRET';
const COOKIE_NAME = 'iqmo_session';
const ROOT = path.join(__dirname, '..', 'extracted');
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'iqmo.sqlite');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS profile_state (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  keys_json TEXT NOT NULL DEFAULT '{}',
  revision INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS profile_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  keys_json TEXT NOT NULL,
  revision INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_profile_history_user ON profile_history(user_id);
`);

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

function signToken(user) {
	return jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}

function readToken(req) {
	const c = req.cookies[COOKIE_NAME];
	if (!c) return null;
	try {
		return jwt.verify(c, JWT_SECRET);
	} catch {
		return null;
	}
}

function auth(req, res, next) {
	const p = readToken(req);
	if (!p) return res.status(401).json({ error: 'unauthorized' });
	req.user = { id: p.uid, email: p.email };
	next();
}

function ensureProfileRow(userId) {
	const now = Date.now();
	const row = db.prepare('SELECT user_id FROM profile_state WHERE user_id = ?').get(userId);
	if (!row) {
		db.prepare('INSERT INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?,?,0,?)').run(
			userId,
			'{}',
			now
		);
	}
}

function snapshotHistory(userId, prevKeysJson, prevRevision) {
	db.prepare(
		'INSERT INTO profile_history (user_id, keys_json, revision, created_at) VALUES (?,?,?,?)'
	).run(userId, prevKeysJson, prevRevision, Date.now());
	const cnt = db.prepare('SELECT COUNT(*) AS c FROM profile_history WHERE user_id = ?').get(userId).c;
	if (cnt > 80) {
		const cut = db
			.prepare('SELECT id FROM profile_history WHERE user_id = ? ORDER BY id ASC LIMIT ?')
			.all(userId, cnt - 80);
		const del = db.prepare('DELETE FROM profile_history WHERE id = ?');
		for (let i = 0; i < cut.length; i++) del.run(cut[i].id);
	}
}

app.post('/api/auth/register', (req, res) => {
	const email = String(req.body.email || '')
		.trim()
		.toLowerCase();
	const password = String(req.body.password || '');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'invalid_email' });
	if (password.length < 8) return res.status(400).json({ error: 'password_short' });
	const hash = bcrypt.hashSync(password, 10);
	const now = Date.now();
	try {
		const info = db
			.prepare('INSERT INTO users (email, password_hash, created_at) VALUES (?,?,?)')
			.run(email, hash, now);
		const user = { id: Number(info.lastInsertRowid), email };
		const token = signToken(user);
		res.cookie(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 30 * 86400000
		});
		ensureProfileRow(user.id);
		return res.json({ ok: true, email: user.email });
	} catch (e) {
		if (String(e.message || e).includes('UNIQUE')) return res.status(409).json({ error: 'email_taken' });
		console.error(e);
		return res.status(500).json({ error: 'server' });
	}
});

app.post('/api/auth/login', (req, res) => {
	const email = String(req.body.email || '')
		.trim()
		.toLowerCase();
	const password = String(req.body.password || '');
	const row = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(email);
	if (!row || !bcrypt.compareSync(password, row.password_hash)) {
		return res.status(401).json({ error: 'invalid_credentials' });
	}
	const token = signToken({ id: row.id, email: row.email });
	res.cookie(COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 30 * 86400000
	});
	ensureProfileRow(row.id);
	return res.json({ ok: true, email: row.email });
});

app.post('/api/auth/logout', (req, res) => {
	res.clearCookie(COOKIE_NAME, { path: '/' });
	res.json({ ok: true });
});

app.get('/api/me', (req, res) => {
	const p = readToken(req);
	if (!p) return res.status(401).json({ error: 'unauthorized' });
	res.json({ id: p.uid, email: p.email });
});

app.get('/api/profile/state', auth, (req, res) => {
	ensureProfileRow(req.user.id);
	const row = db
		.prepare('SELECT keys_json, revision, updated_at FROM profile_state WHERE user_id = ?')
		.get(req.user.id);
	let keys;
	try {
		keys = JSON.parse(row.keys_json);
		if (!keys || typeof keys !== 'object') keys = {};
	} catch {
		keys = {};
	}
	res.json({ revision: row.revision, updatedAt: row.updated_at, keys });
});

app.put('/api/profile/state', auth, (req, res) => {
	const body = req.body || {};
	const incomingKeys = body.keys;
	if (!incomingKeys || typeof incomingKeys !== 'object') {
		return res.status(400).json({ error: 'keys_required' });
	}
	const baseRevision = body.baseRevision == null ? null : Number(body.baseRevision);

	const row = db
		.prepare('SELECT keys_json, revision FROM profile_state WHERE user_id = ?')
		.get(req.user.id);
	if (!row) return res.status(500).json({ error: 'no_state' });

	const serverRev = Number(row.revision) || 0;
	if (baseRevision != null && baseRevision !== serverRev) {
		let keys;
		try {
			keys = JSON.parse(row.keys_json);
		} catch {
			keys = {};
		}
		return res.status(409).json({
			error: 'revision_mismatch',
			server: { revision: serverRev, keys }
		});
	}

	const sanitized = {};
	for (const k of Object.keys(incomingKeys)) {
		if (typeof k !== 'string' || k.indexOf('iqmo-chem-') !== 0) continue;
		const v = incomingKeys[k];
		if (v === null || v === undefined) continue;
		sanitized[k] = String(v);
	}
	const keysJson = JSON.stringify(sanitized);
	const newRev = serverRev + 1;
	const now = Date.now();

	snapshotHistory(req.user.id, row.keys_json, row.revision);

	db.prepare('UPDATE profile_state SET keys_json = ?, revision = ?, updated_at = ? WHERE user_id = ?').run(
		keysJson,
		newRev,
		now,
		req.user.id
	);

	res.json({ ok: true, revision: newRev, updatedAt: now });
});

app.get('/api/profile/history', auth, (req, res) => {
	const rows = db
		.prepare(
			'SELECT id, revision, created_at, LENGTH(keys_json) AS bytes FROM profile_history WHERE user_id = ? ORDER BY id DESC LIMIT 25'
		)
		.all(req.user.id);
	res.json({ items: rows });
});

app.post('/api/profile/restore', auth, (req, res) => {
	const hid = Number(req.body.historyId);
	if (!Number.isFinite(hid)) return res.status(400).json({ error: 'historyId_required' });
	const hist = db
		.prepare('SELECT keys_json, revision FROM profile_history WHERE user_id = ? AND id = ?')
		.get(req.user.id, hid);
	if (!hist) return res.status(404).json({ error: 'not_found' });

	const cur = db
		.prepare('SELECT keys_json, revision FROM profile_state WHERE user_id = ?')
		.get(req.user.id);
	snapshotHistory(req.user.id, cur.keys_json, cur.revision);

	const newRev = cur.revision + 1;
	const now = Date.now();
	db.prepare('UPDATE profile_state SET keys_json = ?, revision = ?, updated_at = ? WHERE user_id = ?').run(
		hist.keys_json,
		newRev,
		now,
		req.user.id
	);
	let keys;
	try {
		keys = JSON.parse(hist.keys_json);
	} catch {
		keys = {};
	}
	res.json({ ok: true, revision: newRev, keys });
});

app.use(express.static(ROOT));

app.listen(PORT, () => {
	console.log('IQMO server: http://localhost:' + PORT + '/');
	console.log('Статика: ' + ROOT);
	if (JWT_SECRET === 'dev-only-change-IQMO_JWT_SECRET') {
		console.warn('ВНИМАНИЕ: задайте IQMO_JWT_SECRET для продакшена.');
	}
});
