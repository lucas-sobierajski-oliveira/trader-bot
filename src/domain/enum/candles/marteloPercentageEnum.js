const Enum = require('src/domain/enum/enum');

module.exports = () =>
    Enum({
        NAME: 'MARTELO',
        CANDLE_MIN_PERCENTAGE: 0,
        CANDLE_MAX_PERCENTAGE: 30,
        SHADOW_TOP_MIN_PERCENTAGE: 0,
        SHADOW_TOP_MAX_PERCENTAGE: 5
    });
