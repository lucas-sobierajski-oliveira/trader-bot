const { getItem, setItem,
    accountServiceMethods:{
        authLogin,
        integrations
    }
} = require('./customHandler');

module.exports = [
    {
        method: 'GET',
        path: '/health/',
        handler: (req, res) => {
            return res.json({ ok: true }).end();
        }
    },
    { method: 'POST', path: '/example/setItem', handler: setItem },
    { method: 'POST', path: '/example/getItem', handler: getItem },
    { method: 'POST', path: '/auth/login', handler: authLogin },
    { method: 'GET', path: '/merchants/integration/sale-integration/:id', handler: integrations }
];
