const Enum = require('src/domain/enum/enum');

module.exports = () =>
    Enum({
        DOJI: 'DOJI',
        MARTELO: 'MARTELO',
        MARTELO_INVERTIDO: 'MARTELO_INVERTIDO',
        SPINNING_TOP: 'SPINNING_TOP',
        PICOLE: 'PICOLE',
        PICOLE_DERRETIDO: 'PICOLE_DERRETIDO',
        MARUBOZU: 'MARUBOZU',
        SPINNING_TOP_FAT: 'SPINNING_TOP_FAT'
    });
