// ====== script.js ======
import { loadAssetList, fetchAllData } from "./modules/fetchData.js";
import { renderTable } from "./modules/renderTable.js";

let priceHistory = {};

async function updateDashboard() {
    const assetList = await loadAssetList();
    const data = await fetchAllData(assetList);

    // Aggiorna lo storico prezzi
    data.forEach(item => {
        if (!priceHistory[item.id]) priceHistory[item.id] = [];
        priceHistory[item.id].push(item.price);

        // Mantieni solo gli ultimi 50 valori
        if (priceHistory[item.id].length > 50) {
            priceHistory[item.id].shift();
        }
    });

    // Aggiorna tabella + grafici
    renderTable(data, priceHistory);
}

// Primo caricamento
updateDashboard();

// Aggiornamento periodico
setInterval(updateDashboard, 5000);
