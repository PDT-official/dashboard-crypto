// ====== utils.js ======
// Funzioni di utilità comuni a tutta la dashboard

// Formatta numeri con decimali variabili
export function formatNumber(value, decimals = 4) {
    if (isNaN(value)) return "-";
    return parseFloat(value).toFixed(decimals);
}

// Log elegante per debug
export function logInfo(message, data = null) {
    console.log(`🔎 [INFO] ${message}`, data);
}

// Log errori
export function logError(message, error = null) {
    console.error(`❌ [ERRORE] ${message}`, error);
}

// Ordina asset per segnale (verde > giallo > neutro > rosso)
export function sortBySignal(data) {
    const priority = {
        "verde": 1,
        "giallo": 2,
        "neutro": 3,
        "rosso": 4
    };

    return data.sort((a, b) => priority[a.signal] - priority[b.signal]);
}

// Ordina asset per volume (decrescente)
export function sortByVolume(data) {
    return data.sort((a, b) => b.volume - a.volume);
}

// Ordina asset per momentum (forte > medio > debole)
export function sortByMomentum(data) {
    const priority = {
        "forte": 1,
        "medio": 2,
        "debole": 3
    };

    return data.sort((a, b) => priority[a.momentum] - priority[b.momentum]);
}

