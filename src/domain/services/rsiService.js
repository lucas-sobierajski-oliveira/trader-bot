module.exports = ({}) => {
    return {
        calculateRSI(prices, period = 14) {
            if (prices.length < period + 1) {
                throw new Error("Not enough data points to calculate RSI");
            }

            const changes = [];
            for (let i = 1; i < prices.length - 2; i++) {
                changes.push(prices[i] - prices[i - 1]);
            }

            const gains = [];
            const losses = [];
            for (let i = 0; i < changes.length; i++) {
                if (changes[i] >= 0) {
                    gains.push(changes[i]);
                    losses.push(0);
                } else {
                    gains.push(0);
                    losses.push(Math.abs(changes[i]));
                }
            }

            let avgGain = gains.slice(0, period).reduce((total, val) => total + val) / period;
            let avgLoss = losses.slice(0, period).reduce((total, val) => total + val) / period;

            let RS = avgGain / avgLoss;
            let RSISeries = [100 - (100 / (1 + RS))];

            for (let i = period; i < prices.length - 2; i++) {
                const currentGain = changes[i] >= 0 ? changes[i] : 0;
                const currentLoss = changes[i] < 0 ? Math.abs(changes[i]) : 0;

                avgGain = ((avgGain * (period - 1)) + currentGain) / period;
                avgLoss = ((avgLoss * (period - 1)) + currentLoss) / period;

                RS = avgGain / avgLoss;
                RSISeries.push(100 - (100 / (1 + RS)));
            }

            return RSISeries;
        }
    }
}
