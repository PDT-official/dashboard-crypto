// ====== utils.js ======

export async function fetchPriceHistory(assetId) {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=7`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Errore storico ${assetId}: ${response.status}`);

        const data = await response.json();
        return data.prices.map(p => p[1]);

    } catch (error) {
        console.error("[ERRORE] fetchPriceHistory:", error);
        return [];
    }
}
