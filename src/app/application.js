class Application {
    /**
     * @param {Object} ctx - Dependency Injection
     * @param {import('config')} ctx.config
     * @param {import('src/infra/integration/exchange/binance/binanceClient')} ctx.binanceClient
     */
    constructor({ config, binanceWebhook, chartOperation }) {
        this.config = config;
        this.binanceWebhook = binanceWebhook;
        this.chartOperation = chartOperation;
    }

    async start() {
        console.log('Serviço rodou');
        this.binanceWebhook.setWebhook('BNBUSDT', '5m', this.chartOperation);
    }
}

module.exports = Application;
