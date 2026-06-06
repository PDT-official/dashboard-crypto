// ====== sparkline.js ======

export function renderSparkline(canvas, data, color = "#4caf50") {
    if (!canvas || !data) return;

    const isFallback = data.every(v => v === 0);

    // Se è fallback → scriviamo testo nel canvas
    if (isFallback) {
        const ctx = canvas.getContext("2d");

        // Pulizia
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#888";
        ctx.font = "18px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Testo multilingua
        const msg = "Nessun dato allo stato attuale\nNo data available\n当前无数据";

        // Disegno multilinea
        const lines = msg.split("\n");
        const lineHeight = 12;
        const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;

        lines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
        });

        return; // Non disegnare grafico
    }

    // Se NON è fallback → disegna grafico normale
    new Chart(canvas, {
        type: "line",
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data,
                borderColor: color,
                borderWidth: 1,
                pointRadius: 0,
                tension: 0.3
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}
