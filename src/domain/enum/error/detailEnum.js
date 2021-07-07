const Enum = require('src/domain/enum/enum');

module.exports = () =>
    Enum({
        INVALID_TOKEN: 'Invalid token',
        AUTHENTICATION_FAILED: 'Authentication failed'
    });
