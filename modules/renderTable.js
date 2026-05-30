// ====== renderTable.js ======
// Modulo per mostrare i dati nella tabella principale

export function renderTable(data) {
    const tableBody = document.getElementById("assetTableBody");
    tableBody.innerHTML = ""; // pulizia tabella

    data.forEach(item => {
        const row = document.createElement("tr");

        // Colore segnale
        let signalClass = "";
        if (item.signal === "verde") signalClass = "signal-green";
        if (item.signal === "giallo") signalClass = "signal-yellow";
        if (item.signal === "rosso") signalClass = "signal-red";

        row.innerHTML = `
            <td data-label="Asset">${item.asset}</td>
            <td data-label="Prezzo">${item.price.toFixed(4)}</td>
            <td data-label="Trend">${item.trend}</td>
            <td data-label="Volume">${item.volume}</td>
            <td data-label="Momentum">${item.momentum}</td>
            <td data-label="Segnale" class="${signalClass}">${item.signal}</td>
        `;

        tableBody.appendChild(row);
    });
}
