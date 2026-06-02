// ====== highlightHotAssets.js ======

export function highlightHotAssets(data) {
    data.forEach(item => {
        const row = document.querySelector(`tr td:first-child:text("${item.id}")`);
        if (!row) return;

        if (item.signal === "verde") row.parentElement.classList.add("hot-green");
        if (item.signal === "rosso") row.parentElement.classList.add("hot-red");
    });
}
