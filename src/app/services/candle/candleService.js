module.exports = ({ candleVerifyFunctions }) => ({
    getCandleStickPercentages: ({ chartObject, position } ) => {
        const { open, high, low, close } = chartObject;
        const candle = { open: open[position], high: high[position], low: low[position], close: close[position] };
        const isHighMovement = candle.open < candle.close;
        const totalSize = Math.abs(candle.high - candle.low);
        const candleSize = Math.abs(candle.open - candle.close);
        const topShadowSize = isHighMovement ? candle.high - candle.close : candle.high - candle.open;
        const bottonShadowSize = isHighMovement ? candle.open - candle.low : candle.close - candle.low;

        const candleSizePercentage = ((candleSize * 100 ) / totalSize).toFixed(0);
        const topShadowSizePercentage = ((topShadowSize * 100 ) / totalSize).toFixed(0);
        const bottonShadowSizePercentage = ((bottonShadowSize * 100 ) / totalSize).toFixed(0);

        return { topShadowSizePercentage, candleSizePercentage, bottonShadowSizePercentage, isHighMovement };
    },
    identifyCandlePattern: (candlePercentageObject) => {
        const allCandleTypes = Object.keys(candleVerifyFunctions);
        const candleType  = allCandleTypes.reduce((acc, currentCandleType) => {
            candleVerifyFunctions[currentCandleType](candlePercentageObject) && acc.push(currentCandleType);
            return acc;
        }, []);

        return candleType;
    }
});
