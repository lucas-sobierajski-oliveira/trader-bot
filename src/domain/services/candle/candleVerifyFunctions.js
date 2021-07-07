module.exports = ({ candleTypesEnum }) => ({
    [candleTypesEnum.DOJI] : (candle) =>  candle.candleSizePercentage <= 3,
    [candleTypesEnum.MARTELO] : (candle) => candle.candleSizePercentage >= 4 && candle.candleSizePercentage <= 30 && candle.topShadowSizePercentage <= 5,
    [candleTypesEnum.MARTELO_INVERTIDO]: (candle) => candle.candleSizePercentage >= 4 && candle.candleSizePercentage <= 30 && candle.bottonShadowSizePercentage <= 5,
    [candleTypesEnum.SPINNING_TOP] : (candle) => {
        return candle.candleSizePercentage >= 4 && candle.candleSizePercentage <= 80 && candle.topShadowSizePercentage > 5 && candle.bottonShadowSizePercentage > 5;
    },
    [candleTypesEnum.PICOLE] :(candle) => {
        return candle.candleSizePercentage >= 30 && candle.candleSizePercentage <= 80 &&  candle.topShadowSizePercentage <= 5;
    },
    [candleTypesEnum.PICOLE_DERRETIDO] : (candle) => {
        return candle.candleSizePercentage >= 30 && candle.candleSizePercentage <= 80 &&  candle.bottonShadowSizePercentage <= 5;
    },
    [candleTypesEnum.MARUBOZU] : (candle) => candle.candleSizePercentage >= 80
});
