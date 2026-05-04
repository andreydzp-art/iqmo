import https from 'node:https';

const id = process.argv[2] || '12121';

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
const re = /src="([^"]+\.(?:png|jpg|jpeg|webp|gif))"/gi;
const found = [];
let m;
while ((m = re.exec(html)) !== null) found.push(m[1]);
console.log([...new Set(found)].join('\n'));
