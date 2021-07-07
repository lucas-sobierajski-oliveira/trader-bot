module.exports = ({ binanceService, candleService }) => ({
    execute: async (symbol, interval, chart) => {
        const binanceInstance = binanceService.getBinanceInstance();
        const chartObject = binanceInstance.ohlc(chart);
        const lastClosedCandledIndex = chartObject.open.length - 3;

        const candlePercentageObject = candleService.getCandleStickPercentages({ chartObject, position: lastClosedCandledIndex });

        const candlePatternArray = candleService.identifyCandlePattern(candlePercentageObject);

        console.log(candlePatternArray);
    }
});
