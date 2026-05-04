import https from 'node:https';

const ids = [
	12121, 35144, 379, 12233, 1535, 8399, 2939, 1401, 1241, 380, 1178, 408, 2648,
	39332, 586, 39334, 1561, 39194, 35256, 35206, 35266,
];

function get(url) {
	return new Promise((resolve, reject) => {
		https
			.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
				let data = '';
				res.on('data', (ch) => (data += ch));
				res.on('end', () => resolve(data));
			})
			.on('error', reject);
	});
}

function decodeHtml(s) {
	return s
		.replace(/&shy;/gi, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
		.replace(/\s+/g, ' ')
		.trim();
}

function extractAnswer(html) {
	// После блока решения типичный паттерн: "Ответ: ... " в тексте без HTML
	let m = html.match(/Ответ:\s*([\s\S]{0,200}?)(?:<\/|$)/gi);
	const plain = decodeHtml(html.replace(/<[^>]+>/g, ' '));

	// «Ответ: листопад» или последовательности цифр
	const m2 = plain.match(/Ответ:\s*([^\r\nР]+)/i);
	if (m2) {
		let a = decodeHtml(m2[1]).split('Решения')[0].split('Раздел кодификатора')[0].trim();
		if (a.length > 140) a = a.slice(0, 140);
		return a;
	}
	return '?';
}

for (let i = 0; i < ids.length; i++) {
	const id = ids[i];
	process.stderr.write(`${i + 1}/${ids.length} ${id}...\n`);
	const html = await get(`https://bio-oge.sdamgia.ru/problem?id=${id}`);
	const ans = extractAnswer(html);
	console.log(JSON.stringify({ n: i + 1, id, ans }));
	await new Promise((r) => setTimeout(r, 400));
}
