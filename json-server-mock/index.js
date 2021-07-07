const server = require('./app/server');

const start = async () => {
    const port = process.env.PORT || 4000;
    await server.startListen(port);
};

start();
