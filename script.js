// ====== script.js ======

import { fetchAllData } from "./modules/fetchData.js";
import { computeSignals } from "./modules/computeSignals.js";
import { renderTable } from "./modules/renderTable.js";

// ====== PRICE HISTORY per gli sparkline ======
const priceHistory = {}; // { id: [p1, p2, ...] }

function updatePriceHistory(processedData) {
    processedData.forEach(item => {
        if (!priceHistory[item.id]) {
            priceHistory[item.id] = [];
        }

        priceHistory[item.id].push(item.price);

        // Manteniamo solo gli ultimi 30 punti
        if (priceHistory[item.id].length > 30) {
            priceHistory[item.id].shift();
        }
    });
}

// ====== UPDATE DASHBOARD ======
async function updateDashboard() {
    try {
        const rawData = await fetchAllData();
        const processedData = computeSignals(rawData);

        // Aggiorna la history per gli sparkline
        updatePriceHistory(processedData);

        // Passiamo anche la history alla tabella
        renderTable(processedData, priceHistory);

    } catch (error) {
        console.error("Errore aggiornamento dashboard:", error);
    }
}

// ====== AUTO-REFRESH ======
updateDashboard();
setInterval(updateDashboard, 15000); // ogni 15 secondi
