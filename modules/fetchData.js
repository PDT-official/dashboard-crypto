// ===============================
//   FETCH DATA — VERSIONE OTTIMALE
// ===============================

// Legge la lista asset dal JSON
export async function loadAssetList() {
  try {
    const response = await fetch("./data/asset-list.json");
    if (!response.ok) throw new Error("Impossibile leggere asset-list.json");
    return await response.json();
  } catch (error) {
    console.error("[ERRORE] Caricamento asset-list.json:", error);
    return [];
  }
}

// Fetch ottimizzato con /simple/price
export async function fetchAllData(assetList) {
  try {
    const ids = assetList.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Errore CoinGecko: ${response.status}`);

    const data = await response.json();

    return assetList.map(id => ({
      id,
      price: data[id]?.usd ?? 0,
      change24h: data[id]?.usd_24h_change ?? 0,
      volume: data[id]?.usd_24h_vol ?? 0,
      marketCap: data[id]?.usd_market_cap ?? 0
    }));

  } catch (error) {
    console.error("[ERRORE] fetchAllData:", error);
    return [];
  }
}
