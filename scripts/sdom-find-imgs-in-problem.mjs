import https from 'node:https';

const id = process.argv[2] || '35256';

function get(url) {
	return new Promise((resolve, reject) => {
		https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
			let data = '';
			res.on('data', (ch) => (data += ch));
			res.on('end', () => resolve(data));
		}).on('error', reject);
	});
}

const html = await get(`https://bio-oge.sdamgia.ru/problem?id=${id}`);
const abs = html.match(/https?:\/[^"'>\s]+\.(?:png|jpg|jpeg|gif|webp)/gi) || [];
console.log([...new Set(abs)].join('\n'));
const rel = html.match(/(?:src|href)="(\/[^\s"'<>]+\.(?:png|jpg|jpeg))/gi)?.slice(0, 40);
console.log('--- relative ---');
console.log(rel?.join('\n') || '(none)');
