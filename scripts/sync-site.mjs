#!/usr/bin/env node
// Sync the canonical static site from `extracted/` into `laravel/public/site/`.
//
// Cross-platform (Node 18+). Run from the repo root:
//   node scripts/sync-site.mjs
//
// Behaviour:
//   - Mirrors every file under extracted/ into laravel/public/site/.
//   - Removes destination files that are no longer present in the source
//     (so deletes propagate, not just edits).
//   - Skips a small list of dev-only files.
//
// Goal: a single canonical copy of the site lives in extracted/. Anything
// you commit there is what gets shipped to laravel/public/site/.

import { readdir, mkdir, copyFile, stat, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'extracted');
const DST = resolve(ROOT, 'laravel', 'public', 'site');

const SKIP_FILES = new Set(['.DS_Store', 'Thumbs.db']);
const SKIP_DIRS = new Set(['node_modules', '.git']);

if (!existsSync(SRC)) {
	console.error(`[sync-site] source not found: ${SRC}`);
	process.exit(1);
}

async function walk(dir, base = dir, out = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		if (e.isDirectory()) {
			if (SKIP_DIRS.has(e.name)) continue;
			await walk(join(dir, e.name), base, out);
		} else if (e.isFile()) {
			if (SKIP_FILES.has(e.name)) continue;
			out.push(relative(base, join(dir, e.name)));
		}
	}
	return out;
}

async function ensureDir(p) {
	await mkdir(p, { recursive: true });
}

async function main() {
	const srcRel = await walk(SRC);
	const dstRel = existsSync(DST) ? await walk(DST) : [];

	const srcSet = new Set(srcRel);

	let copied = 0;
	for (const rel of srcRel) {
		const from = join(SRC, rel);
		const to = join(DST, rel);
		await ensureDir(dirname(to));
		const srcStat = await stat(from);
		let upToDate = false;
		if (existsSync(to)) {
			const dstStat = await stat(to);
			upToDate = dstStat.size === srcStat.size && dstStat.mtimeMs >= srcStat.mtimeMs;
		}
		if (!upToDate) {
			await copyFile(from, to);
			copied++;
		}
	}

	let removed = 0;
	for (const rel of dstRel) {
		if (!srcSet.has(rel)) {
			await rm(join(DST, rel), { force: true });
			removed++;
		}
	}

	console.log(`[sync-site] source: ${SRC}`);
	console.log(`[sync-site] target: ${DST}`);
	console.log(`[sync-site] copied=${copied}, removed=${removed}, total=${srcRel.length}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
