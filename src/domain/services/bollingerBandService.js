module.exports = ({}) => {
    let averages = []
    let upperBands = []
    let lowerBands = []
    let allPrices = []
    let touchUpperBand = false
    let touchAverage = false
    let touchBottomBand = false

    return {
        calculateBollingerBands(prices, windowSize, numStdDev) {
            allPrices = prices
            for (let i = windowSize - 1; i < prices.length; i++) {
                const windowPrices = prices.slice(i - windowSize + 1, i + 1);
                const average = windowPrices.reduce((acc, price) => acc + price, 0) / windowSize;
                averages.push(average);

                const stdDev = Math.sqrt(windowPrices.reduce((acc, price) => acc + Math.pow(price - average, 2), 0) / windowSize);
                const upperBand = average + numStdDev * stdDev;
                const lowerBand = average - numStdDev * stdDev;
                upperBands.push(upperBand);
                lowerBands.push(lowerBand);
            }

            return { averages, upperBands, lowerBands };
        },
        checkTouchUpperBandAndAfterTouchMiddle() {
            let touched = false

            const currentPrice = allPrices[allPrices.length - 2];
            const lastUpperBand = upperBands[upperBands.length - 2];
            const lastLowerBand = lowerBands[lowerBands.length - 2];
            const lastAverage = averages[averages.length - 2];

            const differenceUpperAverage = lastUpperBand - lastAverage;
            const differenceLowerAverage = lastAverage - lastLowerBand;

            let proximityToUpperBand = ((lastUpperBand - currentPrice) / differenceUpperAverage) * 100;
            let proximityToLowerBand = ((currentPrice - lastLowerBand) / differenceLowerAverage) * 100;

            proximityToUpperBand = Math.max(0, Math.min(100, proximityToUpperBand));
            proximityToLowerBand = Math.max(0, Math.min(100, proximityToLowerBand));

            if (proximityToUpperBand >= 98) {
                touchUpperBand = true
                touchAverage = false
                touchBottomBand = false
            } else if (proximityToUpperBand <= 3 && proximityToLowerBand <= 3) {

                if (touchUpperBand) touched = true

                touchUpperBand = false
                touchAverage = true
                touchBottomBand = false
            } else if (proximityToLowerBand >= 98) {
                touchUpperBand = false
                touchAverage = false
                touchBottomBand = true
            }

            return touched;
        }
    }
}
