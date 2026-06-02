// ====== renderTable.js ======
import { renderSparkline } from "./sparkline.js";

export function renderTable(data, priceHistory) {
    const tableBody = document.getElementById("assetTableBody");
    tableBody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        let signalClass = "";
        if (item.signal === "verde") signalClass = "signal-green";
        if (item.signal === "giallo") signalClass = "signal-yellow";
        if (item.signal === "rosso") signalClass = "signal-red";

        row.innerHTML = `
            <td data-label="Asset">${item.id}</td>
            <td data-label="Prezzo">${item.price.toFixed(4)}</td>
            <td data-label="Trend">${item.trend}</td>
            <td data-label="Volume">${item.volume}</td>
            <td data-label="Momentum">${item.momentum}</td>
            <td data-label="Segnale" class="${signalClass}">${item.signal}</td>
            <td data-label="Grafico">
                <div class="sparkline-wrapper">
                    <canvas id="spark-${item.id}"></canvas>
                </div>
            </td>
        `;

        tableBody.appendChild(row);

        // Sparkline
        const canvas = row.querySelector("canvas");
        const history = priceHistory[item.id] || [];

        const color =
            item.signal === "verde" ? "#4caf50" :
            item.signal === "rosso" ? "#f44336" :
            "#9e9e9e";

        renderSparkline(canvas, history, color);
    });
}
