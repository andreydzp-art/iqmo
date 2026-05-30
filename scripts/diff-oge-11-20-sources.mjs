#!/usr/bin/env node
import { readFileSync } from 'node:fs';

function load(path) {
	const t = readFileSync(path, 'utf8');
	const m = t.match(/const questions = (\[[\s\S]*?\n\]);/);
	if (!m) throw new Error(`Cannot parse ${path}`);
	return eval(m[1]);
}

const main = load('C:/Users/user/Downloads/oge_chemistry_11-20.js');
const fixed = load('C:/Users/user/Downloads/oge_chemistry_11-20 (1).js');

const key = (q) => `${q.variant}-${q.type}`;
const fixedMap = new Map(fixed.map((q) => [key(q), q]));

const diffs = [];
for (const q of main.filter((x) => x.variant <= 15)) {
	const f = fixedMap.get(key(q));
	if (!f) {
		diffs.push({ variant: q.variant, type: q.type, field: '(missing in fixed file)' });
		continue;
	}
	for (const field of ['question', 'answer', 'explanation']) {
		if ((q[field] || '') !== (f[field] || '')) {
			diffs.push({
				variant: q.variant,
				type: q.type,
				field,
				mainLen: (q[field] || '').length,
				fixLen: (f[field] || '').length,
				main: (q[field] || '').slice(0, 200),
				fix: (f[field] || '').slice(0, 200),
			});
		}
	}
	const qo = JSON.stringify(q.options || null);
	const fo = JSON.stringify(f.options || null);
	if (qo !== fo) {
		diffs.push({
			variant: q.variant,
			type: q.type,
			field: 'options',
			main: qo.slice(0, 200),
			fix: fo.slice(0, 200),
		});
	}
}

console.log(`Differences in variants 11–15: ${diffs.length}`);
for (const d of diffs) {
	console.log('---');
	console.log(`V${d.variant} type ${d.type} · ${d.field}`);
	if (d.main !== undefined) {
		console.log('MAIN:', d.main);
		console.log('FIX :', d.fix);
	}
}
