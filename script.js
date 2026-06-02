// ====== script.js ======

import { fetchAllData, loadAssetList } from "./fetchData.js";
import { renderTable } from "./renderTable.js";

// Oggetto per salvare lo storico prezzi
const priceHistory = {};

// ===============================
//  FETCH STORICO PREZZI (7 giorni)
// ===============================
async function fetchPriceHistory(assetId) {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=7`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Errore storico ${assetId}: ${response.status}`);
        }

        const data = await response.json();

        // Estraggo solo i prezzi
        return data.prices.map(p => p[1]);

    } catch (error) {
        console.error("[ERRORE] fetchPriceHistory:", error);
        return [];
    }
}

// ===============================
//  AGGIORNA DASHBOARD
// ===============================
async function updateDashboard() {
    console.log("Aggiornamento dashboard...");

    // 1) Dati principali
    const data = await fetchAllData();

    // 2) Storico prezzi per ogni asset
    const assets = loadAssetList();

    for (const asset of assets) {
        priceHistory[asset] = await fetchPriceHistory(asset);
    }

    // 3) Render tabella
    renderTable(data, priceHistory);
}

// ===============================
//  AVVIO
// ===============================
updateDashboard();

// Aggiorna ogni 60 secondi
setInterval(updateDashboard, 60000);
