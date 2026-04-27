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

import { readdir, mkdir, copyFile, stat, rm, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'extracted');
const DST = resolve(ROOT, 'laravel', 'public', 'site');

// Имя bundle'а вопросов. Генерируется этим скриптом из 17 файлов
// `chemistry-cat*-source.js`, потому что иначе каждая страница теста
// тащит 17 синхронных <script> тегов подряд, и любая правка списка
// (новая категория, переименование, новый cache-buster) требует
// одинаковой правки в 5 HTML-файлах. С bundle'ом меняется один список
// в этом скрипте, и фронт получает один синхронный <script>.
const BUNDLE_NAME = 'chemistry-banks-bundle.js';

// Порядок: тот же, в каком файлы перечислены в `warmup-chemistry.html`,
// чтобы порядок вопросов в `window.CHEMISTRY_QUESTIONS` сохранился (важно
// для повторяемости рендомизации, которая может зависеть от индексов).
const BANK_FILES = [
	'chemistry-cat01-source.js',
	'chemistry-cat03-source.js',
	'chemistry-cat04-source.js',
	'chemistry-cat04-custom-source.js',
	'chemistry-cat05-source.js',
	'chemistry-cat06-source.js',
	'chemistry-cat06-custom-source.js',
	'chemistry-cat07-source.js',
	'chemistry-cat08-source.js',
	'chemistry-cat09-source.js',
	'chemistry-cat11-source.js',
	'chemistry-cat12-source.js',
	'chemistry-cat13-source.js',
	'chemistry-cat10-source.js',
	'chemistry-cat14-source.js',
	'chemistry-cat15-source.js',
	'chemistry-cat16-source.js',
];

// Bundle ИГНОРИТСЯ при копировании (он генерируется отдельно, и не должен
// быть в `extracted/` сам по себе — иначе git его словит как untracked,
// а .gitignore-то на этот случай и сделан).
const SKIP_FILES = new Set(['.DS_Store', 'Thumbs.db', BUNDLE_NAME]);
const SKIP_DIRS = new Set(['node_modules', '.git']);

/** Админка в `laravel/resources/admin-ui`; не зеркалить `extracted/admin` в `public/site/admin/`.
 *  При `root` = `public/site` nginx отдаёт `/admin/index.html` как статику до PHP — обход авторизации,
 *  падает smoke в deploy.yml. */
function shouldSkipAdminMirror(relPosix) {
	return relPosix === 'admin' || relPosix.startsWith('admin/');
}

if (!existsSync(SRC)) {
	console.error(`[sync-site] source not found: ${SRC}`);
	process.exit(1);
}

async function walk(dir, base = dir, out = [], skipAdminFromSource = false) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		if (e.isDirectory()) {
			if (SKIP_DIRS.has(e.name)) continue;
			const rel = relative(base, join(dir, e.name)).replace(/\\/g, '/');
			if (skipAdminFromSource && shouldSkipAdminMirror(rel)) continue;
			await walk(join(dir, e.name), base, out, skipAdminFromSource);
		} else if (e.isFile()) {
			if (SKIP_FILES.has(e.name)) continue;
			const rel = relative(base, join(dir, e.name)).replace(/\\/g, '/');
			if (skipAdminFromSource && shouldSkipAdminMirror(rel)) continue;
			out.push(rel);
		}
	}
	return out;
}

async function ensureDir(p) {
	await mkdir(p, { recursive: true });
}

async function main() {
	const srcRel = await walk(SRC, SRC, [], true);
	const dstRel = existsSync(DST) ? await walk(DST, DST, [], false) : [];

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
		if (rel === BUNDLE_NAME) continue; // bundle — артефакт сборки, не зеркало
		if (!srcSet.has(rel)) {
			await rm(join(DST, rel), { force: true });
			removed++;
		}
	}

	const bundleSize = await buildChemistryBanksBundle();

	console.log(`[sync-site] source: ${SRC}`);
	console.log(`[sync-site] target: ${DST}`);
	console.log(`[sync-site] copied=${copied}, removed=${removed}, total=${srcRel.length}`);
	console.log(`[sync-site] bundle: ${BUNDLE_NAME} (${bundleSize} bytes, ${BANK_FILES.length} banks)`);
}

/**
 * Склеиваем 17 банков вопросов в один файл и кладём его сразу в две папки:
 *   1. `extracted/` — чтобы локальное открытие через `php artisan serve`
 *      и `file://` (если кому-то надо для отладки одной страницы) не
 *      получало 404.
 *   2. `laravel/public/site/` — то, что реально отдаётся nginx-ом в проде.
 *
 * Между файлами вставляем `\n;\n` — точка с запятой защищает от пропущенной
 * `;` в конце предыдущего файла (классический grep-сцепленный JS-баг, когда
 * последняя строка одного банка превращается в вызов функции из следующего).
 *
 * Размер возвращаем для лога, чтобы в CI было сразу видно, что bundle не
 * усох до нескольких килобайт (= потерянный банк).
 */
async function buildChemistryBanksBundle() {
	const header =
		'/* AUTO-GENERATED by scripts/sync-site.mjs — DO NOT EDIT.\n' +
		' * Source files in extracted/chemistry-cat*-source.js. To regenerate,\n' +
		` * run \`node scripts/sync-site.mjs\`. Bundles ${BANK_FILES.length} banks of chemistry questions.\n` +
		' */\n';

	const parts = [header];
	for (const name of BANK_FILES) {
		const fp = join(SRC, name);
		if (!existsSync(fp)) {
			throw new Error(`[sync-site] bundle source missing: ${fp}`);
		}
		const body = await readFile(fp, 'utf8');
		parts.push(`\n/* ===== ${name} ===== */\n`);
		parts.push(body);
		parts.push('\n;\n');
	}
	const bundle = parts.join('');

	const outA = join(SRC, BUNDLE_NAME);
	const outB = join(DST, BUNDLE_NAME);
	await ensureDir(dirname(outA));
	await ensureDir(dirname(outB));
	await writeFile(outA, bundle, 'utf8');
	await writeFile(outB, bundle, 'utf8');

	return bundle.length;
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
