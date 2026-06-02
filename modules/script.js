// ====== script.js ======

import { fetchAllData, loadAssetList } from "./fetchData.js";
import { renderTable } from "./renderTable.js";
import { fetchPriceHistory } from "./utils.js";
import { highlightHotAssets } from "./highlightHotAssets.js";

// Storico prezzi
const priceHistory = {};

async function updateDashboard() {
    console.log("Aggiornamento dashboard...");

    const data = await fetchAllData();
    const assets = loadAssetList();

    for (const asset of assets) {
        priceHistory[asset] = await fetchPriceHistory(asset);
    }

    renderTable(data, priceHistory);
    highlightHotAssets(data);
}

updateDashboard();
setInterval(updateDashboard, 60000);
