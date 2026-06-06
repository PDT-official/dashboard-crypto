// ====== script.js ======

import { fetchAllData, loadAssetList } from "./fetchData.js";
import { renderTable } from "./renderTable.js";
import { fetchPriceHistory } from "./utils.js";
import { highlightHotAssets } from "./highlightHotAssets.js";

// Storico prezzi
const priceHistory = {};

// ====== LOADING DORATO ======
function showLoader() {
    const loader = document.getElementById("loading-gold");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.getElementById("loading-gold");
    if (loader) loader.style.display = "none";
}
// ============================

async function updateDashboard() {
    console.log("Aggiornamento dashboard...");

    // Mostra loading dorato
    showLoader();

    try {
        // 1) Fetch dati principali
        const data = await fetchAllData();

        // 2) Lista asset
        const assets = loadAssetList();

        // 3) Storico prezzi per ogni asset
        for (const asset of assets) {
            priceHistory[asset] = await fetchPriceHistory(asset);
        }

        // 4) Render tabella
        renderTable(data, priceHistory);

        // 5) Evidenzia asset caldi
        highlightHotAssets(data);

    } catch (error) {
        console.error("Errore durante l'aggiornamento della dashboard:", error);
    }

    // Nascondi loading dorato
    hideLoader();
}

// Primo avvio
updateDashboard();

// Aggiornamento automatico ogni 60 secondi
setInterval(updateDashboard, 60000);
