// ====== script.js ======
// Motore principale della dashboard

import { fetchAllData } from "./modules/fetchData.js";
import { computeSignals } from "./modules/computeSignals.js";
import { renderTable } from "./modules/renderTable.js";
import { highlightHotAssets } from "./modules/highlightHotAssets.js";
import { logInfo, logError } from "./modules/utils.js";

// Intervallo aggiornamento (in millisecondi)
const REFRESH_INTERVAL = 10000; // 10 secondi

async function updateDashboard() {
    try {
        logInfo("Aggiornamento dati in corso...");

        // 1) Fetch dati grezzi
        const rawData = await fetchAllData();

        // 2) Calcolo segnali
        const processedData = computeSignals(rawData);

        // 3) Render tabella
        renderTable(processedData);

        // 4) Evidenzia asset caldi
        highlightHotAssets(processedData);

        logInfo("Dashboard aggiornata");

    } catch (error) {
        logError("Errore durante l'aggiornamento della dashboard", error);
    }
}

// Primo avvio
updateDashboard();

// Aggiornamento automatico
setInterval(updateDashboard, REFRESH_INTERVAL);
