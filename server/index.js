/**
 * IQMO — локальный сервер: раздача extracted/ + API аккаунта и синхронизации localStorage (префикс iqmo-chem-).
 *
 * Запуск из каталога server:
 *   set IQMO_JWT_SECRET=длинная-случайная-строка
 *   set MYSQL_HOST=127.0.0.1
 *   set MYSQL_PORT=3306
 *   set MYSQL_USER=root
 *   set MYSQL_PASSWORD=
 *   set MYSQL_DATABASE=iqmo
 *   npm install
 *   npm start
 * Откройте http://localhost:3780/ (не file:// — иначе cookie и fetch не сработают).
 */
'use strict';

const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { buildPoolFromEnv, ensureSchema } = require('./db/mysql');

const PORT = Number(process.env.PORT) || 3780;
const JWT_SECRET = process.env.IQMO_JWT_SECRET || 'dev-only-change-IQMO_JWT_SECRET';
const COOKIE_NAME = 'iqmo_session';
const ROOT = path.join(__dirname, '..', 'extracted');
const pool = buildPoolFromEnv();

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Ensure DB schema exists at startup (best-effort).
ensureSchema(pool).catch((e) => {
	console.error('MySQL schema init failed:', e?.message || e);
	// Don't run the server without DB: auth/sync endpoints depend on it.
	process.exit(1);
});

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

async function ensureProfileRow(userId) {
	const now = Date.now();
	// INSERT IGNORE relies on PK(user_id) to avoid dupes.
	await pool.query(
		'INSERT IGNORE INTO profile_state (user_id, keys_json, revision, updated_at) VALUES (?, CAST(? AS JSON), 0, ?)',
		[userId, '{}', now]
	);
}

async function snapshotHistory(userId, prevKeysJson, prevRevision) {
	await pool.query(
		'INSERT INTO profile_history (user_id, keys_json, revision, created_at) VALUES (?, CAST(? AS JSON), ?, ?)',
		[userId, prevKeysJson || '{}', Number(prevRevision) || 0, Date.now()]
	);
	const [[{ c }]] = await pool.query('SELECT COUNT(*) AS c FROM profile_history WHERE user_id = ?', [userId]);
	const cnt = Number(c) || 0;
	if (cnt > 80) {
		const toDelete = cnt - 80;
		// Delete oldest rows beyond the last 80.
		await pool.query(
			`DELETE FROM profile_history
       WHERE user_id = ?
       ORDER BY id ASC
       LIMIT ?`,
			[userId, toDelete]
		);
	}
}

app.post('/api/auth/register', async (req, res) => {
	const email = String(req.body.email || '')
		.trim()
		.toLowerCase();
	const password = String(req.body.password || '');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'invalid_email' });
	if (password.length < 8) return res.status(400).json({ error: 'password_short' });
	const hash = bcrypt.hashSync(password, 10);
	const now = Date.now();
	try {
		const [result] = await pool.query('INSERT INTO users (email, password_hash, created_at) VALUES (?,?,?)', [
			email,
			hash,
			now
		]);
		const userId = Number(result.insertId);
		const user = { id: userId, email };
		const token = signToken(user);
		res.cookie(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 30 * 86400000
		});
		await ensureProfileRow(user.id);
		return res.json({ ok: true, email: user.email });
	} catch (e) {
		// ER_DUP_ENTRY
		if (String(e?.code || '').includes('ER_DUP_ENTRY')) return res.status(409).json({ error: 'email_taken' });
		console.error(e);
		return res.status(500).json({ error: 'server' });
	}
});

app.post('/api/auth/login', async (req, res) => {
	const email = String(req.body.email || '')
		.trim()
		.toLowerCase();
	const password = String(req.body.password || '');
	const [rows] = await pool.query('SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1', [email]);
	const row = rows && rows[0];
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
	await ensureProfileRow(row.id);
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

app.get('/api/profile/state', auth, async (req, res) => {
	await ensureProfileRow(req.user.id);
	const [rows] = await pool.query('SELECT keys_json, revision, updated_at FROM profile_state WHERE user_id = ? LIMIT 1', [
		req.user.id
	]);
	const row = rows && rows[0];
	if (!row) return res.status(500).json({ error: 'no_state' });
	let keys = row.keys_json;
	// mysql2 may return JSON as string depending on settings; normalize.
	if (typeof keys === 'string') {
		try {
			keys = JSON.parse(keys);
		} catch {
			keys = {};
		}
	}
	if (!keys || typeof keys !== 'object') keys = {};
	res.json({ revision: Number(row.revision) || 0, updatedAt: Number(row.updated_at) || 0, keys });
});

app.put('/api/profile/state', auth, async (req, res) => {
	const body = req.body || {};
	const incomingKeys = body.keys;
	if (!incomingKeys || typeof incomingKeys !== 'object') {
		return res.status(400).json({ error: 'keys_required' });
	}
	const baseRevision = body.baseRevision == null ? null : Number(body.baseRevision);

	const [rows] = await pool.query('SELECT keys_json, revision FROM profile_state WHERE user_id = ? LIMIT 1', [req.user.id]);
	const row = rows && rows[0];
	if (!row) return res.status(500).json({ error: 'no_state' });

	const serverRev = Number(row.revision) || 0;
	if (baseRevision != null && baseRevision !== serverRev) {
		let keys = row.keys_json;
		if (typeof keys === 'string') {
			try {
				keys = JSON.parse(keys);
			} catch {
				keys = {};
			}
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

	await snapshotHistory(req.user.id, typeof row.keys_json === 'string' ? row.keys_json : JSON.stringify(row.keys_json), row.revision);

	await pool.query('UPDATE profile_state SET keys_json = CAST(? AS JSON), revision = ?, updated_at = ? WHERE user_id = ?', [
		keysJson,
		newRev,
		now,
		req.user.id
	]);

	res.json({ ok: true, revision: newRev, updatedAt: now });
});

app.get('/api/profile/history', auth, async (req, res) => {
	const [rows] = await pool.query(
		'SELECT id, revision, created_at, CHAR_LENGTH(CAST(keys_json AS CHAR)) AS bytes FROM profile_history WHERE user_id = ? ORDER BY id DESC LIMIT 25',
		[req.user.id]
	);
	res.json({ items: rows || [] });
});

app.post('/api/profile/restore', auth, async (req, res) => {
	const hid = Number(req.body.historyId);
	if (!Number.isFinite(hid)) return res.status(400).json({ error: 'historyId_required' });
	const [histRows] = await pool.query(
		'SELECT keys_json, revision FROM profile_history WHERE user_id = ? AND id = ? LIMIT 1',
		[req.user.id, hid]
	);
	const hist = histRows && histRows[0];
	if (!hist) return res.status(404).json({ error: 'not_found' });

	const [curRows] = await pool.query('SELECT keys_json, revision FROM profile_state WHERE user_id = ? LIMIT 1', [req.user.id]);
	const cur = curRows && curRows[0];
	if (!cur) return res.status(500).json({ error: 'no_state' });
	await snapshotHistory(
		req.user.id,
		typeof cur.keys_json === 'string' ? cur.keys_json : JSON.stringify(cur.keys_json),
		cur.revision
	);

	const newRev = cur.revision + 1;
	const now = Date.now();
	const histJson = typeof hist.keys_json === 'string' ? hist.keys_json : JSON.stringify(hist.keys_json);
	await pool.query('UPDATE profile_state SET keys_json = CAST(? AS JSON), revision = ?, updated_at = ? WHERE user_id = ?', [
		histJson,
		newRev,
		now,
		req.user.id
	]);
	let keys = hist.keys_json;
	if (typeof keys === 'string') {
		try {
			keys = JSON.parse(keys);
		} catch {
			keys = {};
		}
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
