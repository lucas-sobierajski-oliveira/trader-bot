module.exports = ({ binanceService, candleService, movingAverageService, bollingerBandService, rsiService }) => ({
    execute: async (symbol, interval, chart) => {
        const binanceInstance = binanceService.getBinanceInstance();
        const chartObject = binanceInstance.ohlc(chart);
        const lastClosedCandledIndex = chartObject.open.length - 2;

        const candlePercentageObject = candleService.getCandleStickPercentages({ chartObject, position: lastClosedCandledIndex });

        const candlePatternArray = candleService.identifyCandlePattern(candlePercentageObject);

        movingAverageService.calculateMovingAverage(chartObject.close, 21, 200)

        if (movingAverageService.checkCrosedUpShortAverage()) {
            console.log('fazer uma entrada aqui, media movel curta cruzou a media movel longa!')
        }

        bollingerBandService.calculateBollingerBands(chartObject.close, chartObject.open.length - 21, 2)

        if (bollingerBandService.checkTouchUpperBandAndAfterTouchMiddle()) {
            console.log('fazer entrada aqui, tocou na banda supperior e depois na media!')
        }

        if (rsiService.calculateRSI(chartObject.close, 21) <= 20) {
            console.log('fazer entrada aqui, sobre venda!')
        }

        console.log(rsiService.calculateRSI(chartObject.close, 21))

        // refinar qual posição ta pegando se é a -2 de todas os serviço de medias
        // falta volume
        // padrão de candle
        // gerenciamento de risco
        // add desenho grafico para acompanhamento visual

        //console.log(candlePercentageObject)
        //console.log(candlePatternArray);
    }
});

//
// primeiro tipo de identificqação de entrada e saída vai ser por sequencia de padrão de candle
// criar um service para identificar um padrão grafico e aí sim chmaar o service de entrada e saída
// criar um service para simular entrada e saída- trade
