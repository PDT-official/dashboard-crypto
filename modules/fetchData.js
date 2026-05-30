// ===============================
//   FETCH DATA — COINGECKO
// ===============================

// Lista asset (CoinGecko IDs)
const assetList = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "cardano",
  "ripple",
  "solana",
  "avalanche-2",
  "polkadot",
  "chainlink",
  "polygon",
  "cosmos",
  "litecoin",
  "ethereum-classic",
  "stellar",
  "near",
  "aptos",
  "arbitrum",
  "optimism",
  "filecoin",
  "aave",
  "ondo-finance"   // AGGIUNTO
];

// Funzione per ottenere i dati da CoinGecko
async function fetchAssetData(assetId) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${assetId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errore CoinGecko: ${response.status}`);

    const data = await response.json();

    return {
      id: assetId,
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_percentage_24h,
      volume: data.market_data.total_volume.usd,
      marketCap: data.market_data.market_cap.usd
    };

  } catch (error) {
    console.error(`[ERRORE] Asset ${assetId}:`, error);
    return null;
  }
}

// Funzione principale per aggiornare la dashboard
async function updateDashboard() {
  console.log("[INFO] Aggiornamento dati in corso...");

  const results = await Promise.all(assetList.map(fetchAssetData));

  const validResults = results.filter(r => r !== null);

  console.log("[INFO] Dati aggiornati:", validResults);

  // Qui aggiorni la UI
  updateUI(validResults);
}

// Aggiorna ogni 60 secondi
setInterval(updateDashboard, 60000);

// Primo avvio
updateDashboard();
