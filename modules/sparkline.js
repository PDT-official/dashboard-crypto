// ====== sparkline.js ======

export function renderSparkline(canvas, data, color) {
    if (!canvas || data.length === 0) return;

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
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}
