/**
 * Регрессия: IqmoVariantBest учитывает part1Percent без answers.
 * Запуск: node scripts/validate-variant-best.mjs
 */
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const fs = require('node:fs');
const path = require('node:path');

const srcPath = path.join(process.cwd(), 'extracted', 'iqmo-variant-best.js');
const src = fs.readFileSync(srcPath, 'utf8');
const sandbox = { window: {}, global: {} };
vm.runInNewContext(src, sandbox);
const VB = sandbox.window.IqmoVariantBest;
if (!VB) {
	console.error('IqmoVariantBest not exported');
	process.exit(1);
}

const variant = { id: 7, qids: [1, 2, 3] };
const bank = [
	{ id: 1, type: 'input', correct: 'a' },
	{ id: 2, type: 'input', correct: 'b' },
	{ id: 3, type: 'written', correct: 'x' }
];

const stateNoAnswers = { finished: true, part1Percent: 94 };
const best = VB.fromState(stateNoAnswers, variant, bank);
if (!best || best.percent !== 94) {
	console.error('FAIL: expected 94% from part1Percent, got', best);
	process.exit(1);
}

const stateWithWrongAnswers = { finished: true, part1Percent: 88, answers: { 1: 'wrong' } };
const best2 = VB.fromState(stateWithWrongAnswers, variant, bank);
if (!best2 || best2.percent !== 88) {
	console.error('FAIL: stored percent should win over empty/wrong answers, got', best2);
	process.exit(1);
}

const stateReal = { finished: true, answers: { 1: 'a', 2: 'b' } };
const best3 = VB.fromState(stateReal, variant, bank);
if (!best3 || best3.percent !== 100) {
	console.error('FAIL: expected 100% from answers, got', best3);
	process.exit(1);
}

if (!VB.finishedPassed(stateNoAnswers)) {
	console.error('FAIL: finishedPassed should be true for 94%');
	process.exit(1);
}

console.log('OK: validate-variant-best (' + srcPath + ')');
