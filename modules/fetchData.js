// ====== fetchData.js ======
// Modulo per ottenere i dati dagli exchange (Binance API)

async function fetchAssetList() {
    const response = await fetch("data/asset-list.json");
    return await response.json();
}

async function fetchTicker(asset) {
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${asset}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            asset: asset,
            price: parseFloat(data.lastPrice),
            volume: parseFloat(data.volume),
            change: parseFloat(data.priceChangePercent)
        };

    } catch (error) {
        console.error("Errore fetch ticker:", asset, error);
        return null;
    }
}

export async function fetchAllData() {
    const assetList = await fetchAssetList();
    const results = [];

    for (const asset of assetList) {
        const ticker = await fetchTicker(asset);
        if (ticker) results.push(ticker);
    }

    return results;
}

