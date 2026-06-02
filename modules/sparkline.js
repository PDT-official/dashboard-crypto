// ====== sparkline.js ======
const charts = new Map();

export function renderSparkline(canvas, history, color = "#4caf50") {
    if (!canvas || !history || history.length === 0) return;

    // Se il grafico ESISTE → aggiorna i dati
    if (charts.has(canvas)) {
        const chart = charts.get(canvas);
        chart.data.labels = history.map((_, i) => i + 1);
        chart.data.datasets[0].data = history;
        chart.data.datasets[0].borderColor = color;
        chart.update();
        return;
    }

    // Altrimenti → crealo
    const ctx = canvas.getContext("2d");

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: history.map((_, i) => i + 1),
            datasets: [{
                data: history,
                borderColor: color,
                borderWidth: 1,
                pointRadius: 0,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
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

    charts.set(canvas, chart);
}
