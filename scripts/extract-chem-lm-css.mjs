import fs from 'fs';

const html = fs.readFileSync('e:/1/extracted/_tmp-lm-chem-8/level-map-chemistry/reference.html', 'utf8');
const m = html.match(/<style>([\s\S]*?)<\/style>/);
let css = m[1];
css = css.replace(/[\s\S]*?(?=\/\* =+\s*\n\s*VARIANT D)/, '');
css = css.replace(/\.page\{[^}]+\}/g, '');
css = css.replace(/html,body\{[^}]+\}/g, '');
css = css.replace(/body\{[^}]+\}/g, '');
css = css.replace(/\.map-card\{[^}]+\}/g, '');
css = css.replace(/\/\* =+\s*\n\s*VARIANT DIVIDER[\s\S]*?(?=\/\* =+\s*\n\s*VARIANT D — Refined)/, '');
css += `
.map-card{position:relative;border-radius:24px}
.pd-circle .num{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion: reduce){
  .pd-node.active .pd-circle::before,
  .pd-node.active .pd-circle::after,
  .pd-now i,
  .pe-shimmer::before,
  .pe-sparkles .sp,
  .pd-svg circle animateMotion,
  .pd-svg animate { animation: none !important; }
  .pd-svg circle { display: none; }
}
`;
const out =
	'/** Chemistry level map — visual ref level-map-chemistry (variants D–G, pf/pg) */\n' +
	css.trim() +
	'\n';
fs.writeFileSync('e:/1/extracted/chemistry-level-map.css', out);
console.log('written', out.length, 'bytes');
