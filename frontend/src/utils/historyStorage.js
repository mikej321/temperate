const KEY = 'history';
const MAX = 2;

export function readHistory() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : []; // Reads localStorage and returns [] if empty
    } catch {
        return [];
    }
}

export function writeHistory(arr) {
    try {
        localStorage.setItem(KEY, JSON.stringify(arr));
    } catch(err) {
        console.error('Failed to write history', e);
    }
}

export function checkHistory() {
    if (localStorage.getItem(KEY) == null) writeHistory([]);
}

export function pushHistory(loc) {
    const id = loc.id || `${Number(loc.lat).toFixed(4)}, ${Number(loc.lon).toFixed(4)}`;
    const entry = {
        id,
        name: loc.name,
        lat: Number(loc.lat),
        lon: Number(loc.lon),
        admin1: loc.admin1 || null,
        country: loc.country || null,
        temp: null,
        savedAt: Date.now()
    }

    const arr = readHistory();

    const filtered = arr.filter(x => x.id !== id);

    const next = [entry, ...filtered].slice(0, MAX);

    writeHistory(next);
    return next;
}