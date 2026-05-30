export function computeSignals(rawData) {
    return rawData.map(item => {
        
        // TREND (basato sulla variazione % 24h)
        let trend = "laterale";
        if (item.change > 2) trend = "rialzo";
        if (item.change < -2) trend = "ribasso";

        // MOMENTUM (semplificato: variazione %)
        let momentum = "debole";
        if (item.change > 1) momentum = "medio";
        if (item.change > 3) momentum = "forte";

        // VOLUME (confronto con soglia fissa per ora)
        let volumeSignal = "normale";
        if (item.volume > 500000) volumeSignal = "alto";
        if (item.volume < 50000) volumeSignal = "basso";

        // SEGNALE FINALE (logica semplice)
        let signal = "neutro";
        if (trend === "rialzo" && momentum === "forte") signal = "verde";
        if (trend === "rialzo" && momentum === "medio") signal = "giallo";
        if (trend === "ribasso") signal = "rosso";

        return {
            asset: item.asset,
            price: item.price,
            trend: trend,
            volume: volumeSignal,
            momentum: momentum,
            signal: signal
        };
    });
}
