// ====== sparkline.js ======
// Mini grafici stile TradingView (Chart.js)

export function renderSparkline(canvas, data, color = "#4caf50") {
    if (!canvas || !data || data.length === 0) return;

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
            responsive: false,            // <— BLOCCA Chart.js
            maintainAspectRatio: false,   // <— BLOCCA Chart.js
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
