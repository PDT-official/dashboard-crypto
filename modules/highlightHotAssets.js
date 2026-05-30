// ====== highlightHotAssets.js ======
// Modulo per evidenziare gli asset "caldi" nella tabella

export function highlightHotAssets(data) {
    const rows = document.querySelectorAll("#assetTableBody tr");

    rows.forEach((row, index) => {
        const item = data[index];

        // Rimuove eventuali highlight precedenti
        row.classList.remove("hot-asset");

        // Condizione per asset "caldo"
        const isHot =
            item.signal === "verde" ||
            (item.trend === "rialzo" && item.momentum === "forte");

        if (isHot) {
            row.classList.add("hot-asset");
        }
    });
}

