// mistakes-store.js
// Общий банк личных ошибок по химии. Используется всеми режимами тестов.
//
// API (window.MistakesStore):
//   add(qid, source)         — добавить/обновить запись об ошибке
//   remove(qid)              — удалить запись (при верном решении)
//   list()                   — вернуть все записи [{qid, source, date, attempts}]
//   clear()                  — очистить весь банк
//   commitTestResults(res)   — после завершения теста:
//                              res = { source, items: [{qid, ok}] }
//                              Ошибки → добавить. Верно решённые → удалить.
//
// Формат записи:
//   { qid: Number, source: 'full' | 'trial' | 'warmup' | 'quick',
//     sourceLabel: String,    // "Полный вариант ОГЭ"
//     date: ISOString,        // когда впервые попала
//     lastDate: ISOString,    // последняя встреча
//     attempts: Number }      // сколько раз ошибался

(function () {
	const KEY = 'iqmo-chem-mistakes-v1';

	const SOURCE_LABELS = {
		full: 'Полный вариант ОГЭ',
		quick: 'Быстрый тест',
		trial: 'Пробный вариант',
		warmup: 'Разминка'
	};

	function read() {
		try {
			const raw = localStorage.getItem(KEY);
			if (!raw) return [];
			const a = JSON.parse(raw);
			return Array.isArray(a) ? a : [];
		} catch (e) { return []; }
	}

	function write(arr) {
		try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
	}

	function add(qid, source) {
		const arr = read();
		const now = new Date().toISOString();
		const idx = arr.findIndex(x => x.qid === qid);
		if (idx >= 0) {
			// Уже есть — обновим дату и счётчик
			arr[idx].lastDate = now;
			arr[idx].attempts = (arr[idx].attempts || 1) + 1;
			arr[idx].source = source;
			arr[idx].sourceLabel = SOURCE_LABELS[source] || source;
		} else {
			arr.push({
				qid,
				source,
				sourceLabel: SOURCE_LABELS[source] || source,
				date: now,
				lastDate: now,
				attempts: 1
			});
		}
		write(arr);
	}

	function remove(qid) {
		const arr = read().filter(x => x.qid !== qid);
		write(arr);
	}

	function list() { return read(); }

	function clear() { write([]); }

	function commitTestResults({ source, items }) {
		if (!Array.isArray(items)) return;
		items.forEach(it => {
			if (!it || typeof it.qid !== 'number') return;
			if (it.ok) remove(it.qid);
			else       add(it.qid, source);
		});
	}

	window.MistakesStore = { add, remove, list, clear, commitTestResults };
})();
