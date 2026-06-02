// ====== computeSignals.js ======

export function computeSignals(change24h) {
    if (change24h > 2) return "verde";
    if (change24h < -2) return "rosso";
    return "giallo";
}
