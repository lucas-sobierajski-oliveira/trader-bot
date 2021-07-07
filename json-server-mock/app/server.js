const jsonServer = require('json-server');
const routes = require('./routes');
const middlewares = jsonServer.defaults();
const customRoutes = require('./routes/customRoutes');
const db = require('../db.json');

module.exports = {
    startListen: async (port = 0) => {
        let listeningPort = port;
        global.mockData = db;
        const server = jsonServer.create();

        server.use(jsonServer.bodyParser);
        server.use(middlewares);
        server.use(jsonServer.rewriter(routes));

        customRoutes.forEach((route) => {
            server[route.method.toLowerCase()](
                route.path,
                route.middleware || ((req, res, next) => next()),
                route.handler
            );
        });

        try {
            const listeningServer = await server.listen(listeningPort);

            listeningPort = listeningServer.address().port;

            console.log(`Json Server Mock => Started at http://localhost:${listeningPort}`);

            return listeningPort;
        } catch (error) {
            console.error(`Json Server Mock => Failed to start at ${listeningPort}`);
            throw error;
        }
    }
};
