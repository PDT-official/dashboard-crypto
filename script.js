// ====== script.js ======
// Motore principale della dashboard

import { updateDashboard } from "./modules/fetchData.js";
import { computeSignals } from "./modules/computeSignals.js";
import { renderTable } from "./modules/renderTable.js";
import { highlightHotAssets } from "./modules/highlightHotAssets.js";
import { logInfo, logError } from "./modules/utils.js";

// Questa funzione verrà chiamata da fetchData.js
window.updateUI = function (rawData) {
    try {
        logInfo("Elaborazione dati...");

        // 1) Calcolo segnali
        const processedData = computeSignals(rawData);

        // 2) Render tabella
        renderTable(processedData);

        // 3) Evidenzia asset caldi
        highlightHotAssets(processedData);

        logInfo("Dashboard aggiornata");

    } catch (error) {
        logError("Errore durante l'aggiornamento della UI", error);
    }
};

// Avvio dashboard (fetchData.js gestisce il timer)
updateDashboard();
