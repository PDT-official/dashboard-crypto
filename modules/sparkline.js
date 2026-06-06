// ====== sparkline.js ======

export function renderSparkline(canvas, data, color = "#4caf50") {
    if (!canvas || !data) return;

    const isFallback = data.every(v => v === 0);

    // ===== FALLBACK CON TICKER MULTILINGUA =====
    if (isFallback) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;

        // Testo multilingua (8 lingue)
        const message = [
            "Nessun dato allo stato attuale",
            "No data available",
            "No hay datos disponibles",
            "Aucune donnée disponible",
            "Keine Daten verfügbar",
            "Данные недоступны",
            "当前无数据",
            "データがありません"
        ].join("   •   ");

        ctx.font = "28px Inter, sans-serif";
        ctx.fillStyle = "#888";
        ctx.textBaseline = "middle";

        let x = w; // parte da destra

        function animate() {
            ctx.clearRect(0, 0, w, h);

            // Disegna il testo
            ctx.fillText(message, x, h / 2);

            // Movimento verso sinistra
            x -= 1.5;

            // Quando esce dallo schermo → ricomincia da destra
            const textWidth = ctx.measureText(message).width;
            if (x < -textWidth) x = w;

            requestAnimationFrame(animate);
        }

        animate();
        return;
    }

    // ===== GRAFICO NORMALE =====
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
