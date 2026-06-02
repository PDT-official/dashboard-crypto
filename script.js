// ====== script.js ======

import { loadAssetList, fetchAllData } from "./modules/fetchData.js";
import { renderTable } from "./modules/renderTable.js";

let priceHistory = {};   // storico prezzi per gli sparkline

// ===============================
//  FUNZIONE PRINCIPALE DASHBOARD
// ===============================
async function updateDashboard() {
    console.log("UPDATE DASHBOARD");

    try {
        const assetList = loadAssetList();
        const data = await fetchAllData(assetList);

        console.log("DATA:", data);

        if (!data || data.length === 0) {
            console.warn("Nessun dato ricevuto da CoinGecko");
            return;
        }

        // Aggiorna storico prezzi
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

    } catch (error) {
        console.error("ERRORE updateDashboard:", error);
    }
}

// ===============================
//  AVVIO DASHBOARD
// ===============================
updateDashboard();

// Aggiornamento ogni 5 secondi
setInterval(updateDashboard, 5000);
