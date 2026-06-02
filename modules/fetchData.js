// ====== fetchData.js ======

const assetList = [
  "bitcoin", "ethereum", "binancecoin", "cardano", "ripple",
  "solana", "avalanche-2", "polkadot", "chainlink", "polygon",
  "cosmos", "litecoin", "ethereum-classic", "stellar", "near",
  "aptos", "arbitrum", "optimism", "filecoin", "aave", "ondo-finance"
];

export function loadAssetList() {
    return assetList;
}

export async function fetchAllData() {
    try {
        const ids = assetList.join(",");
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Errore CoinGecko: ${response.status}`);

        const data = await response.json();

        return data.map(asset => ({
            id: asset.id,
            price: asset.current_price,
            trend: asset.price_change_percentage_24h?.toFixed(2) + "%",
            volume: asset.total_volume,
            momentum: asset.market_cap_change_percentage_24h?.toFixed(2) + "%",
            signal: getSignal(asset.price_change_percentage_24h)
        }));

    } catch (error) {
        console.error("[ERRORE] fetchAllData:", error);
        return [];
    }
}

function getSignal(change24h) {
    if (change24h > 2) return "verde";
    if (change24h < -2) return "rosso";
    return "giallo";
}
