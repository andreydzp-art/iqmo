import fs from 'fs';

const html = fs.readFileSync('e:/1/extracted/_tmp-lm-bio-7/level-map-biology/reference.html', 'utf8');
const m = html.match(/<style>([\s\S]*?)<\/style>/);
let css = m[1];
css = css.replace(/[\s\S]*?(?=\/\* =+\s*\n\s*VARIANT D)/, '');
css = css.replace(/\/\* =+\s*\n\s*VARIANT DIVIDER[\s\S]*?(?=\/\* =+\s*\n\s*VARIANT D — Refined)/, '');
css = css.replace(/\.page\{[^}]+\}/g, '');
css = css.replace(/html,body\{[^}]+\}/g, '');
css = css.replace(/body\{[^}]+\}/g, '');
css = css.replace(/\.map-card\{[^}]+\}/g, '');
css = css.replace(/\.variant-divider[\s\S]*?\.current-pill\{[^}]+\}/, '');
css += `
@media (prefers-reduced-motion: reduce){
  .pd-node.active .pd-circle::before,
  .pd-node.active .pd-circle::after,
  .pd-now i,
  .pe-shimmer::before,
  .pe-sparkles .sp { animation: none !important; }
}
`;
const out = '/** Biology level map — visual ref level-map-biology (variants D/E) */\n' + css.trim() + '\n';
fs.writeFileSync('e:/1/extracted/biology-level-map.css', out);
console.log('written', out.length, 'bytes');
