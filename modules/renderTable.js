// ====== renderTable.js ======
import { renderSparkline } from "./sparkline.js";

export function renderTable(data, priceHistory) {
    const tableBody = document.getElementById("assetTableBody");
    tableBody.innerHTML = "";

    // Mappa ticker → evita undefined
    const symbols = {
    bitcoin: "BTC-USDC",
    ethereum: "ETH-USDC",
    binancecoin: "BNB-USDC",
    cardano: "ADA-USDC",
    ripple: "XRP-USDC",
    solana: "SOL-USDC",
    "avalanche-2": "AVAX-USDC",
    polkadot: "DOT-USDC",
    chainlink: "LINK-USDC",
    polygon: "MATIC-USDC",
    cosmos: "ATOM-USDC",
    litecoin: "LTC-USDC",
    "ethereum-classic": "ETC-USDC",
    stellar: "XLM-USDC",
    near: "NEAR-USDC",
    aptos: "APT-USDC",
    arbitrum: "ARB-USDC",
    optimism: "OP-USDC",
    filecoin: "FIL-USDC",
    aave: "AAVE-USDC",
    "ondo-finance": "ONDO-USDC"
};

    data.forEach(item => {
        const row = document.createElement("tr");

        let signalClass = "";
        if (item.signal === "verde") signalClass = "signal-green";
        if (item.signal === "giallo") signalClass = "signal-yellow";
        if (item.signal === "rosso") signalClass = "signal-red";

        row.innerHTML = `
            <td>
                ${item.id}
                <span style="
                    background:#eef;
                    color:#334;
                    padding:2px 6px;
                    border-radius:6px;
                    font-size:11px;
                    margin-left:8px;
                    font-weight:600;
                    display:inline-block;
                ">
                    ${symbols[item.id] || ""}
                </span>
            </td>

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
