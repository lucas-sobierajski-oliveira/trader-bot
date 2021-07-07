const mongoose = require('mongoose');

jest.mock('mongoose');

const MongoProvider = require('src/infra/database/mongo/provider/mongoProvider');

describe('Infra :: Database :: monog :: provider :: MongoProvider ', () => {
    describe('#constructor', () => {
        let service, config, logger, exception;

        beforeEach(() => {
            config = 'config';
            logger = {
                info: jest.fn(),
                error: jest.fn()
            };
            exception = {};

            service = new MongoProvider({
                config,
                logger,
                exception
            });
        });

        it('should return instance', async () => {
            expect(service).toBeInstanceOf(MongoProvider);
            expect(service).toHaveProperty('config', config);
            expect(service).toHaveProperty('logger', logger);
            expect(service).toHaveProperty('exception', exception);
            expect(service).toHaveProperty('url', '');
            expect(service).toHaveProperty('connection', null);
            expect(service).toHaveProperty('mongoose', mongoose);

            expect(logger.info).not.toHaveBeenCalled();
            expect(logger.error).not.toHaveBeenCalled();
        });
    });

    describe('#_getMongoURL', () => {
        let service, config, logger, exception, _getMongoResult;
        beforeEach(() => {
            config = {
                username: 'username',
                password: 'password',
                options: {
                    authSource: 'authSource',
                    replicaSet: 'replicaSet'
                },
                servers: 'servers',
                dialect: 'dialect',
                database: 'database'
            };
            logger = {
                info: jest.fn(),
                error: jest.fn()
            };
            exception = {};

            _getMongoResult = () => {
                const { username, password, options, servers, dialect, database } = config;

                const userPass =
                    username && password ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : null;

                const url = `${dialect}://${userPass}${servers}`;

                const urlParsed = `${url}/${database}`;

                const authSource = `?authSource=${options.authSource}`;

                const replicaSet = options.replicaSet ? '&replicaSet=' + options.replicaSet : '';

                return urlParsed + authSource + replicaSet;
            };

            service = new MongoProvider({
                config,
                logger,
                exception
            });
        });

        it('should return the mongo URL', async () => {
            const mongoURL = service._getMongoURL(config);
            expect(mongoURL).toEqual(_getMongoResult());
        });

        it('should return the mongo URL, without username', async () => {
            config.username = null;
            config.options.replicaSet = null;

            const mongoURL = service._getMongoURL(config);
            expect(mongoURL).toEqual(_getMongoResult());
        });
    });

    describe('#_getConnOptions', () => {
        let service, config, logger, exception, _getConnectionOptionsResult;
        const connectionOptions = {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 3000
        };

        beforeEach(() => {
            config = { db: { options: {} } };
            logger = {
                info: jest.fn(),
                error: jest.fn()
            };
            exception = {};

            service = new MongoProvider({
                config,
                logger,
                exception
            });
        });

        it('should return the connection Options', async () => {
            _getConnectionOptionsResult = () => {
                const {
                    db: { options }
                } = config;

                return Object.assign(options, connectionOptions);
            };

            const connOpt = service._getConnOptions(config);
            expect(connOpt).toEqual(_getConnectionOptionsResult());
        });
        it('should return the connection Options without the db options', async () => {
            config.db.options = null;

            _getConnectionOptionsResult = () => {
                return Object.assign({}, connectionOptions);
            };

            const connOpt = service._getConnOptions(config);
            expect(connOpt).toEqual(_getConnectionOptionsResult());
        });
    });

    describe('#connect ', () => {
        let service, config, logger, exception, _getConnOptions, _getMongoURL;
        beforeEach(() => {
            config = { db: 'config' };
            logger = {
                info: jest.fn(),
                error: jest.fn()
            };
            exception = {};

            _getConnOptions = jest.fn().mockReturnValue({});
            _getMongoURL = jest.fn().mockReturnValue('URL');

            service = new MongoProvider({
                config,
                logger,
                exception
            });

            service._getMongoURL = _getMongoURL;
            service._getConnOptions = _getConnOptions;

            mongoose.connect.mockImplementation(() => {
                return { connection: 'true' };
            });
        });

        it('should set connection', async () => {
            await service.connect();

            expect(service.connection).toEqual({ connection: 'true' });

            expect(_getConnOptions).toHaveBeenCalledWith(service.config);
            expect(_getMongoURL).toHaveBeenCalledWith(service.config.db);

            expect(mongoose.connect).toHaveBeenCalledWith(service.url, {});

            expect(logger.info).toHaveBeenCalledWith('Mongodb connection stablished');

            expect(logger.error).not.toHaveBeenCalled();
        });

        it('should get the same connection', async () => {
            const connectionObj = { conn: true };
            service.connection = connectionObj;

            const conn = await service.connect();

            expect(conn).toEqual(connectionObj);

            expect(logger.info).not.toHaveBeenCalled();
            expect(logger.error).not.toHaveBeenCalled();
        });
    });

    describe('#connect error', () => {
        let service, config, logger, exception, _getConnOptions, _getMongoURL;
        const error = new Error('Connection Error');

        beforeEach(() => {
            config = 'config';
            logger = {
                info: jest.fn(),
                error: jest.fn()
            };
            exception = {};

            _getConnOptions = jest.fn().mockReturnValue({});
            _getMongoURL = jest.fn().mockReturnValue('URL');

            service = new MongoProvider({
                config,
                logger,
                exception
            });

            service._getMongoURL = _getMongoURL;
            service._getConnOptions = _getConnOptions;
            jest.spyOn(process, 'exit').mockImplementation(() => {});

            mongoose.connect.mockImplementation(() => Promise.reject(error));
        });

        it('should set connection', async () => {
            await service.connect();

            expect(logger.info).not.toHaveBeenCalled();

            expect(logger.error).toHaveBeenCalledWith('Error on connect Mongodb', error);
            expect(logger.error).toHaveBeenCalledWith('Shutting down service...');

            expect(process.exit).toHaveBeenCalledTimes(1);
        });
    });
});
