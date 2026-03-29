

let state = {
    harmony: 'analogous',
    colCount: 5,
    colors: [],
    saved: [],
    panelOpen: false,
    history: [],
    histIdx: -1,
};

const MAX_HISTORY = 50;
const MIN_COLS = 3;
const MAX_COLS = 8;

function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function isLight(h, s, l) {
    const [r, g, b] = hslToRgb(h, s, l);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 128;
}

function makeColor(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = Math.max(10, Math.min(100, s));
    l = Math.max(15, Math.min(85, l));
    const [r, g, b] = hslToRgb(h, s, l);
    const hex = rgbToHex(r, g, b);
    const rgb = `rgb(${r},${g},${b})`;
    const hslStr = `hsl(${Math.round(h)},${Math.round(s)}%,${Math.round(l)}%)`;
    const light = isLight(h, s, l);
    return { h, s, l, hex, rgb, hslStr, light, locked: false, faved: false };
}

function generatePalette(harmony, count) {
    const baseH = Math.random() * 360;
    const baseSat = 55 + Math.random() * 35;
    const baseLit = 40 + Math.random() * 25;
    let hues = [];

    if (harmony === 'analogous') {
        const spread = 20 + Math.random() * 25;
        for (let i = 0; i < count; i++) hues.push(baseH + (i - (count - 1) / 2) * spread);
    } else if (harmony === 'mono') {
        hues = Array.from({ length: count }, () => baseH);
    } else if (harmony === 'complementary') {
        const comp = baseH + 180;
        const half1 = Math.ceil(count / 2);
        const half2 = count - half1;
        const spread = 15;
        for (let i = 0; i < half1; i++) hues.push(baseH + (i - (half1 - 1) / 2) * spread);
        for (let i = 0; i < half2; i++) hues.push(comp + (i - (half2 - 1) / 2) * spread);
    } else if (harmony === 'triadic') {
        const thirds = [baseH, baseH + 120, baseH + 240];
        for (let i = 0; i < count; i++) hues.push(thirds[i % 3] + (Math.floor(i / 3) * 18));
    } else if (harmony === 'split') {
        const sp1 = baseH + 150, sp2 = baseH + 210;
        const base_ct = Math.ceil(count / 3);
        const sp_ct = Math.floor((count - base_ct) / 2);
        const rem = count - base_ct - sp_ct * 2;
        for (let i = 0; i < base_ct; i++) hues.push(baseH + (i - (base_ct - 1) / 2) * 12);
        for (let i = 0; i < sp_ct; i++) hues.push(sp1 + (i - (sp_ct - 1) / 2) * 12);
        for (let i = 0; i < sp_ct + rem; i++) hues.push(sp2 + (i - (sp_ct + rem - 1) / 2) * 12);
    } else {
        for (let i = 0; i < count; i++) hues.push(Math.random() * 360);
    }

    return hues.map((h, i) => {
        let sat = baseSat, lit = baseLit;
        if (harmony === 'mono') {
            const step = 60 / (count - 1 || 1);
            lit = 20 + i * step;
            sat = baseSat - i * 3;
        } else {
            sat += (Math.random() - 0.5) * 15;
            lit += (Math.random() - 0.5) * 18;
        }
        return makeColor(h, sat, lit);
    });
}

function render() {
    const newColors = generatePalette(state.harmony, state.colCount);
    const cols = [];
    for (let i = 0; i < state.colCount; i++) {
        if (state.colors[i] && state.colors[i].locked) {
            cols.push(state.colors[i]);
        } else {
            const nc = newColors[i] || newColors[newColors.length - 1];
            nc.locked = false;
            nc.faved = false;
            cols.push(nc);
        }
    }
    state.colors = cols;

    if (state.histIdx < state.history.length - 1) {
        state.history = state.history.slice(0, state.histIdx + 1);
    }
    state.history.push(state.colors.map(c => ({ ...c })));
    if (state.history.length > MAX_HISTORY) state.history.shift();
    state.histIdx = state.history.length - 1;

    buildColumns();
    updateHistoryBtns();
}

function historyGo(dir) {
    const target = state.histIdx + dir;
    if (target < 0 || target >= state.history.length) return;
    state.histIdx = target;
    state.colors = state.history[state.histIdx].map(c => ({ ...c }));
    state.colCount = state.colors.length;
    updateColCount();
    buildColumns();
    updateHistoryBtns();
    showToast(dir < 0 ? '← Previous palette' : 'Next palette →');
}

function updateHistoryBtns() {
    const prev = document.getElementById('hist-prev');
    const next = document.getElementById('hist-next');
    const pos = document.getElementById('hist-pos');
    prev.disabled = state.histIdx <= 0;
    next.disabled = state.histIdx >= state.history.length - 1;
    pos.textContent = state.history.length > 1 ? (state.histIdx + 1) + '/' + state.history.length : '';
}

function buildColumns() {
    const wrap = document.getElementById('columns-wrap');
    wrap.innerHTML = '';
    state.colors.forEach((col, i) => {
        const div = document.createElement('div');
        div.className = 'color-col';
        div.style.backgroundColor = col.hex;

        const textColor = col.light ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)';
        const textColorDim = col.light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.55)';

        div.innerHTML = `
                    <div class="col-actions">
                        <button class="col-action-btn ${col.locked ? 'locked' : ''}" title="${col.locked ? 'Unlock' : 'Lock'}" onclick="toggleLock(${i})">
                            ${col.locked ? '<i class="ri-lock-star-fill"></i>' : '<i class="ri-lock-unlock-line"></i>'}
                        </button>
                        <button class="col-action-btn ${col.faved ? 'faved' : ''}" title="Save palette" onclick="saveSingle(${i})">
                            ${col.faved ? '<i class="ri-heart-add-2-fill"></i>' : '<i class="ri-heart-add-2-line"></i>'}
                        </button>
                    </div>
                    <div class="col-info">
                        <div class="col-name" style="color:${textColorDim};">${getColorName(col.h, col.s, col.l)}</div>
                        <div class="col-hex" style="color:${textColor};" onclick="copyText('${col.hex}', this)" title="Copy HEX">${col.hex.toUpperCase()}</div>
                        <div class="col-rgb" style="color:${textColorDim};" onclick="copyText('${col.rgb}', this)" title="Copy RGB">${col.rgb}</div>
                        <div class="col-hsl" style="color:${textColorDim};" onclick="copyText('${col.hslStr}', this)" title="Copy HSL">${col.hslStr}</div>
                    </div>
                    <div class="col-shade-strip"></div>
                `;

        wrap.appendChild(div);
    });
}

function refreshColumns() {
    buildColumns();
}

function getColorName(h, s, l) {
    if (s < 12) {
        if (l < 20) return 'Near Black';
        if (l > 80) return 'Near White';
        return 'Gray';
    }
    const hNames = [
        [15, 'Red'], [40, 'Orange'], [65, 'Yellow'], [150, 'Green'],
        [185, 'Cyan'], [255, 'Blue'], [285, 'Indigo'], [330, 'Violet'],
        [355, 'Pink'], [360, 'Red'],
    ];
    let name = 'Color';
    for (const [max, n] of hNames) { if (h <= max) { name = n; break; } }
    if (l < 28) return `Dark ${name}`;
    if (l > 72) return `Light ${name}`;
    if (s > 80) return `Vivid ${name}`;
    return name;
}

function toggleLock(i) {
    state.colors[i].locked = !state.colors[i].locked;
    refreshColumns();
}

function saveSingle(i) {
    saveCurrentPalette();
    state.colors[i].faved = true;
    refreshColumns();
}

function saveCurrentPalette() {
    const entry = { colors: state.colors.map(c => ({ ...c })), ts: Date.now(), harmony: state.harmony };
    state.saved.unshift(entry);
    persistSaved();
    renderSaved();
    showToast('Palette saved ♥');
}

function deleteSaved(idx) {
    state.saved.splice(idx, 1);
    persistSaved();
    renderSaved();
}

function loadSaved(idx) {
    const entry = state.saved[idx];
    state.colors = entry.colors.map(c => ({ ...c, locked: false, faved: false }));
    state.colCount = state.colors.length;
    updateColCount();
    buildColumns();
    showToast('Palette loaded');
}

function renderSaved() {
    const list = document.getElementById('saved-list');
    const empty = document.getElementById('saved-empty');
    const badge = document.getElementById('saved-badge');

    if (!state.saved.length) {
        empty.style.display = 'flex';
        list.style.display = 'none';
        badge.classList.remove('visible');
        return;
    }
    empty.style.display = 'none';
    list.style.display = 'flex';
    badge.textContent = state.saved.length;
    badge.classList.add('visible');

    list.innerHTML = state.saved.map((entry, idx) => `
                <div class="saved-item">
                    <div class="saved-item-swatches">
                        ${entry.colors.map(c => `<div class="saved-swatch" style="background:${c.hex};" title="${c.hex}"></div>`).join('')}
                    </div>
                    <div class="saved-item-footer">
                        <div class="saved-item-label">${entry.harmony} · ${entry.colors.length} cols · ${new Date(entry.ts).toLocaleTimeString()}</div>
                        <button class="saved-item-load" onclick="loadSaved(${idx})">Load</button>
                        <button class="saved-item-del" onclick="deleteSaved(${idx})">✕</button>
                    </div>
                </div>
            `).join('');
}

let toastTimer = null;
function showToast(msg) {
    const t = document.getElementById('copy-toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

function copyText(text, el) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(`Copied: ${text}`);
    });
}

function exportCSS() {
    const lines = [':root {'];
    state.colors.forEach((c, i) => {
        lines.push(`  --color-${i + 1}: ${c.hex};`);
        lines.push(`  --color-${i + 1}-rgb: ${c.rgb};`);
        lines.push(`  --color-${i + 1}-hsl: ${c.hslStr};`);
    });
    lines.push('}');
    downloadText(lines.join('\n'), 'palette.css', 'text/css');
}

function exportJSON() {
    const data = state.colors.map((c, i) => ({
        index: i + 1, hex: c.hex, rgb: c.rgb, hsl: c.hslStr, name: getColorName(c.h, c.s, c.l)
    }));
    downloadText(JSON.stringify(data, null, 2), 'palette.json', 'application/json');
}

function exportTXT() {
    const lines = state.colors.map((c, i) =>
        `${i + 1}. ${c.hex.toUpperCase()}  |  ${c.rgb}  |  ${c.hslStr}  |  ${getColorName(c.h, c.s, c.l)}`
    );
    downloadText(lines.join('\n'), 'palette.txt', 'text/plain');
}

function downloadText(text, filename, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
}

function persistSaved() {
    try { localStorage.setItem('paletteforge_saved', JSON.stringify(state.saved)); } catch (e) { }
}
function loadPersisted() {
    try {
        const s = localStorage.getItem('paletteforge_saved');
        if (s) state.saved = JSON.parse(s);
    } catch (e) { }
}

function updateColCount() {
    document.getElementById('col-count').textContent = state.colCount;
    document.getElementById('col-minus').disabled = state.colCount <= MIN_COLS;
    document.getElementById('col-plus').disabled = state.colCount >= MAX_COLS;
}

document.getElementById('col-minus').addEventListener('click', () => {
    if (state.colCount <= MIN_COLS) return;
    state.colCount--;
    state.colors = state.colors.slice(0, state.colCount);
    updateColCount();
    buildColumns();
});

document.getElementById('col-plus').addEventListener('click', () => {
    if (state.colCount >= MAX_COLS) return;
    state.colCount++;
    const newCols = generatePalette(state.harmony, state.colCount);
    state.colors.push(newCols[state.colCount - 1] || newCols[0]);
    updateColCount();
    buildColumns();
});

document.querySelectorAll('.harmony-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.harmony-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.harmony = btn.dataset.harmony;
        render();
    });
});

document.getElementById('saved-btn').addEventListener('click', () => {
    state.panelOpen = !state.panelOpen;
    document.getElementById('saved-panel').classList.toggle('open', state.panelOpen);
});
document.getElementById('saved-close').addEventListener('click', () => {
    state.panelOpen = false;
    document.getElementById('saved-panel').classList.remove('open');
});

document.getElementById('gen-btn').addEventListener('click', render);

document.addEventListener('keydown', e => {
    if (e.target !== document.body) return;
    if (e.code === 'Space') { e.preventDefault(); render(); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); historyGo(-1); }
    if (e.code === 'ArrowRight') { e.preventDefault(); historyGo(+1); }
});

document.getElementById('hist-prev').addEventListener('click', () => historyGo(-1));
document.getElementById('hist-next').addEventListener('click', () => historyGo(+1));

loadPersisted();
renderSaved();
updateColCount();
render();

// DOCS MODAL
const docsOverlay = document.getElementById('docs-overlay');
document.getElementById('docs-btn').addEventListener('click', () => docsOverlay.classList.add('open'));
document.getElementById('docs-close').addEventListener('click', () => docsOverlay.classList.remove('open'));
docsOverlay.addEventListener('click', e => { if (e.target === docsOverlay) docsOverlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') docsOverlay.classList.remove('open'); });