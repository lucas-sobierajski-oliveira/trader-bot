const Binance = require('node-binance-api');

/**
 * @param {Object} ctx - Dependency Injection
 * @param {import('config/index')} ctx.config
 */
module.exports = ({ config }) => {
    const binance = new Binance().options({
        APIKEY: config.exchange.binance.apiKey,
        APISECRET: config.exchange.binance.apiSecret
    });

    return {
        getInstance: () => binance,
        setChart: (symbolCode, timeInterval, operation) => {
            binance.websockets.chart(symbolCode, timeInterval, async (symbol, interval, chart) => {
                operation.execute(symbol, interval, chart);
            });
        }
    };
};
