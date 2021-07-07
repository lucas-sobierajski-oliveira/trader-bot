const CacheService = require('src/app/services/cache/cacheService');

describe('app :: services :: cache :: cacheService', () => {
    const key = '1';
    const value = 'abc123';
    const ttl = 3600;

    describe('#getTokenByKey', () => {
        let redisClient, cacheService;

        beforeEach(() => {
            redisClient = { get: jest.fn().mockReturnValue(value) };
            cacheService = CacheService({ redisClient });
        });

        it('Should be successfully called', async () => {
            const response = await cacheService.getTokenByKey(key);

            expect(redisClient.get).toHaveBeenCalledWith(key);
            expect(response).toStrictEqual(value);
        });
    });

    describe('#saveTokenWithKey', () => {
        let redisClient, cacheService;

        beforeEach(() => {
            redisClient = { set: jest.fn().mockReturnValue('OK') };
            cacheService = CacheService({ redisClient });
        });

        it('Should be successfully called', async () => {
            const response = await cacheService.saveTokenWithKey(key, value, ttl);

            expect(redisClient.set).toHaveBeenCalledWith(key, value, ttl);
            expect(response).toStrictEqual('OK');
        });
    });
});
