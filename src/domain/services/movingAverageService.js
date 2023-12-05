module.exports = ({}) => {
    let lastShortAverageHigtherThanLongAverage = null
    let shortAverage = []
    let longAverage = []

    return {
        calculateMovingAverage(prices, shortAverageRange, longAverageRange) {
            for (let i = shortAverageRange - 1; i < prices.length; i++) {
                const windowPrices = prices.slice(i - (prices.length - shortAverageRange) + 1, i + 1);
                const sum = windowPrices.reduce((acc, price) => acc + price, 0);
                const average = sum / shortAverageRange;
                shortAverage.push(average);
            }

            for (let i = longAverageRange - 1; i < prices.length; i++) {
                const windowPrices = prices.slice(i - (prices.length - longAverageRange) + 1, i + 1);
                const sum = windowPrices.reduce((acc, price) => acc + price, 0);
                const average = sum / longAverageRange;
                longAverage.push(average);
            }

            return { shortAverage, longAverage };
        },
        checkCrosedUpShortAverage(){
            let crossed = false

            const isCurrentShortAverageHigtherThanLongAverage = shortAverage[shortAverage.length - 2] > longAverage[longAverage.length - 2]

            if (isCurrentShortAverageHigtherThanLongAverage && !lastShortAverageHigtherThanLongAverage) {
               crossed = true
            }

            lastShortAverageHigtherThanLongAverage = isCurrentShortAverageHigtherThanLongAverage

            return crossed
        }
    }
}
