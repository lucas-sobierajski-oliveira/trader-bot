module.exports = ({ binanceClient }) => ({
    setWebhook: (symbolCode, timeInterval, operation) => binanceClient.setChart(symbolCode, timeInterval, operation)
});
