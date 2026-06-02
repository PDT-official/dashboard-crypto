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
            <td>${item.id}</td>
            <td>${item.price.toFixed(4)}</td>
            <td>${item.trend}</td>
            <td>${item.volume}</td>
            <td>${item.momentum}</td>
            <td class="${signalClass}">${item.signal}</td>
            <td>
                <div class="sparkline-wrapper">
                    <canvas id="spark-${item.id}"></canvas>
                </div>
            </td>
        `;

        tableBody.appendChild(row);

        const canvas = row.querySelector("canvas");
        const history = priceHistory[item.id] || [];

        const color =
            item.signal === "verde" ? "#4caf50" :
            item.signal === "rosso" ? "#f44336" :
            "#9e9e9e";

        renderSparkline(canvas, history, color);
    });
}
