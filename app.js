/* Basic Minesweeper (no deps) */

const DIFFICULTIES = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

const els = {
  board: document.querySelector("[data-board]"),
  difficulty: document.querySelector("[data-difficulty]"),
  newButtons: Array.from(document.querySelectorAll('[data-action="new"]')),
  status: document.querySelector("[data-status]"),
  minesLeft: document.querySelector("[data-mines-left]"),
  time: document.querySelector("[data-time]"),
};

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function keyOf(r, c) {
  return `${r},${c}`;
}

function neighborsOf(r, c, rows, cols) {
  const out = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const rr = r + dr;
      const cc = c + dc;
      if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) continue;
      out.push([rr, cc]);
    }
  }
  return out;
}

function buildEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      num: 0,
      revealed: false,
      flagged: false,
    })),
  );
}

function placeMines(grid, rows, cols, mineCount, safeSet) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (safeSet.has(keyOf(r, c))) continue;
      cells.push([r, c]);
    }
  }
  // Fisher–Yates shuffle
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const minesToPlace = clamp(mineCount, 0, cells.length);
  for (let i = 0; i < minesToPlace; i++) {
    const [r, c] = cells[i];
    grid[r][c].mine = true;
  }
}

function computeNumbers(grid, rows, cols) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell.mine) {
        cell.num = 0;
        continue;
      }
      let n = 0;
      for (const [rr, cc] of neighborsOf(r, c, rows, cols)) {
        if (grid[rr][cc].mine) n++;
      }
      cell.num = n;
    }
  }
}

function isWin(grid, rows, cols, mineCount) {
  let revealed = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].revealed) revealed++;
    }
  }
  return revealed === rows * cols - mineCount;
}

function countFlags(grid, rows, cols) {
  let f = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].flagged) f++;
    }
  }
  return f;
}

let state = null;

function setStatus(text) {
  if (els.status) els.status.textContent = text;
}

function setTime(t) {
  if (els.time) els.time.textContent = String(t);
}

function setMinesLeft(n) {
  if (els.minesLeft) els.minesLeft.textContent = String(n);
}

function stopTimer() {
  if (!state) return;
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function startTimer() {
  if (!state) return;
  if (state.timerId) return;
  state.timerId = window.setInterval(() => {
    if (!state || state.over) return;
    state.timeSec += 1;
    setTime(state.timeSec);
  }, 1000);
}

function syncCounters() {
  if (!state) return;
  const flags = countFlags(state.grid, state.rows, state.cols);
  setMinesLeft(Math.max(0, state.mines - flags));
}

function renderBoard() {
  if (!els.board || !state) return;
  const { rows, cols } = state;
  els.board.style.gridTemplateColumns = `repeat(${cols}, var(--cell))`;
  els.board.innerHTML = "";

  const frag = document.createDocumentFragment();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ms-cell";
      btn.dataset.r = String(r);
      btn.dataset.c = String(c);
      btn.setAttribute("aria-label", `Клетка ${r + 1}:${c + 1}`);
      frag.appendChild(btn);
    }
  }
  els.board.appendChild(frag);

  paintAllCells();
}

function paintCell(r, c) {
  const cell = state.grid[r][c];
  const idx = r * state.cols + c;
  const el = els.board.children[idx];
  if (!el) return;

  el.className = "ms-cell";
  el.textContent = "";
  el.disabled = false;

  if (cell.flagged && !cell.revealed && !state.over) {
    el.classList.add("is-flagged");
    el.textContent = "⚑";
    el.setAttribute("aria-label", `Флажок ${r + 1}:${c + 1}`);
    return;
  }

  if (!cell.revealed) return;

  el.classList.add("is-revealed");
  el.disabled = true;

  if (cell.mine) {
    el.classList.add("is-mine");
    el.textContent = "✹";
    el.setAttribute("aria-label", `Мина ${r + 1}:${c + 1}`);
    return;
  }

  if (cell.num > 0) {
    el.textContent = String(cell.num);
    el.classList.add(`ms-n${cell.num}`);
    el.setAttribute("aria-label", `Число ${cell.num} ${r + 1}:${c + 1}`);
  } else {
    el.setAttribute("aria-label", `Пусто ${r + 1}:${c + 1}`);
  }
}

function paintAllCells() {
  for (let r = 0; r < state.rows; r++) {
    for (let c = 0; c < state.cols; c++) paintCell(r, c);
  }
  syncCounters();
}

function revealFlood(sr, sc) {
  const q = [[sr, sc]];
  const seen = new Set([keyOf(sr, sc)]);
  while (q.length) {
    const [r, c] = q.shift();
    const cell = state.grid[r][c];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;

    if (cell.num !== 0) continue;
    for (const [rr, cc] of neighborsOf(r, c, state.rows, state.cols)) {
      const k = keyOf(rr, cc);
      if (seen.has(k)) continue;
      seen.add(k);
      const ncell = state.grid[rr][cc];
      if (ncell.revealed || ncell.flagged) continue;
      q.push([rr, cc]);
    }
  }
}

function endGame(win, triggeredAt) {
  state.over = true;
  stopTimer();

  // reveal all mines; mark wrong flags
  for (let r = 0; r < state.rows; r++) {
    for (let c = 0; c < state.cols; c++) {
      const cell = state.grid[r][c];
      if (cell.mine) cell.revealed = true;
    }
  }

  paintAllCells();

  // wrong flags styling
  for (let r = 0; r < state.rows; r++) {
    for (let c = 0; c < state.cols; c++) {
      const cell = state.grid[r][c];
      if (!cell.flagged) continue;
      if (cell.mine) continue;
      const idx = r * state.cols + c;
      const el = els.board.children[idx];
      if (el) el.classList.add("is-wrong");
    }
  }

  if (triggeredAt && !win) {
    const [r, c] = triggeredAt;
    const idx = r * state.cols + c;
    const el = els.board.children[idx];
    if (el) el.classList.add("is-mine");
  }

  if (win) {
    setStatus(`Победа! Время: ${state.timeSec} c.`);
  } else {
    setStatus("Поражение. Нажмите «Новая игра», чтобы попробовать ещё раз.");
  }
}

function ensureGenerated(firstR, firstC) {
  if (state.generated) return;
  state.generated = true;

  const safe = new Set();
  safe.add(keyOf(firstR, firstC));
  // Make first click a nice opening (3x3 safe zone when possible)
  for (const [rr, cc] of neighborsOf(firstR, firstC, state.rows, state.cols)) {
    safe.add(keyOf(rr, cc));
  }

  placeMines(state.grid, state.rows, state.cols, state.mines, safe);
  computeNumbers(state.grid, state.rows, state.cols);
}

function onOpen(r, c) {
  if (!state || state.over) return;
  const cell = state.grid[r][c];
  if (cell.flagged || cell.revealed) return;

  ensureGenerated(r, c);
  if (!state.started) {
    state.started = true;
    startTimer();
    setStatus("Игра началась.");
  }

  if (cell.mine) {
    cell.revealed = true;
    endGame(false, [r, c]);
    return;
  }

  revealFlood(r, c);
  paintAllCells();

  if (isWin(state.grid, state.rows, state.cols, state.mines)) {
    endGame(true);
  }
}

function onToggleFlag(r, c) {
  if (!state || state.over) return;
  const cell = state.grid[r][c];
  if (cell.revealed) return;

  cell.flagged = !cell.flagged;
  paintCell(r, c);
  syncCounters();
}

function newGame() {
  const diffKey = els.difficulty?.value ?? "medium";
  const diff = DIFFICULTIES[diffKey] ?? DIFFICULTIES.medium;

  stopTimer();
  state = {
    rows: diff.rows,
    cols: diff.cols,
    mines: diff.mines,
    grid: buildEmptyGrid(diff.rows, diff.cols),
    generated: false,
    started: false,
    over: false,
    timeSec: 0,
    timerId: null,
  };

  setTime(0);
  setMinesLeft(diff.mines);
  setStatus("Нажмите на поле, чтобы начать.");
  renderBoard();
}

function getRCFromEventTarget(target) {
  const btn = target?.closest?.(".ms-cell");
  if (!btn) return null;
  const r = Number(btn.dataset.r);
  const c = Number(btn.dataset.c);
  if (!Number.isFinite(r) || !Number.isFinite(c)) return null;
  return [r, c];
}

function setupEvents() {
  els.newButtons.forEach((b) => b.addEventListener("click", newGame));
  els.difficulty?.addEventListener("change", newGame);

  // Disable default context menu on the board
  els.board?.addEventListener("contextmenu", (e) => e.preventDefault());

  els.board?.addEventListener("mousedown", (e) => {
    const rc = getRCFromEventTarget(e.target);
    if (!rc) return;
    const [r, c] = rc;
    if (e.button === 2) {
      e.preventDefault();
      onToggleFlag(r, c);
      return;
    }
    if (e.button === 0) {
      onOpen(r, c);
    }
  });

  // Touch: long-press to flag
  let pressTimer = null;
  let pressRC = null;
  const clearPress = () => {
    if (pressTimer) window.clearTimeout(pressTimer);
    pressTimer = null;
    pressRC = null;
  };

  els.board?.addEventListener(
    "touchstart",
    (e) => {
      const rc = getRCFromEventTarget(e.target);
      if (!rc) return;
      pressRC = rc;
      pressTimer = window.setTimeout(() => {
        if (!pressRC) return;
        onToggleFlag(pressRC[0], pressRC[1]);
        clearPress();
      }, 420);
    },
    { passive: true },
  );
  els.board?.addEventListener("touchend", (e) => {
    if (!pressRC) return;
    // short tap = open
    const wasLong = !pressTimer;
    if (pressTimer) {
      window.clearTimeout(pressTimer);
      pressTimer = null;
      const [r, c] = pressRC;
      pressRC = null;
      if (!wasLong) onOpen(r, c);
    } else {
      pressRC = null;
    }
  });
  els.board?.addEventListener("touchcancel", clearPress);
}

setupEvents();
newGame();

