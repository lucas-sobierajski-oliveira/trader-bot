const AuthOperation = require('src/app/operations/auth/authOperation');

describe('app :: operations :: auth :: authOperation', () => {
    const data = { merchantId: '1', email: 'email@test.com', password: 'super-secret' };
    const cache = { merchantId: '1', accessToken: 'abc123' };

    describe('#execute', () => {
        let cacheService, authService, authOperation;

        beforeEach(() => {
            cacheService = {
                getTokenByKey: jest.fn().mockReturnValue(cache),
                saveTokenWithKey: jest.fn()
            };
            authService = { execute: jest.fn() };
            authOperation = AuthOperation({ cacheService, authService });
        });

        it('Should be successfully called and return a token from the cache', async () => {
            const response = await authOperation.execute(data);

            expect(cacheService.getTokenByKey).toHaveBeenCalledWith(data.email);
            expect(authService.execute).not.toHaveBeenCalled();
            expect(cacheService.saveTokenWithKey).not.toHaveBeenCalled();
            expect(response).toStrictEqual({ accessToken: cache.accessToken });
        });
    });

    describe('#execute', () => {
        let cacheService, authService, authOperation;
        const accessToken = 'abc123';
        const accessTokenExpirationTime = 3600;

        beforeEach(() => {
            cacheService = {
                getTokenByKey: jest.fn().mockReturnValue(undefined),
                saveTokenWithKey: jest.fn()
            };
            authService = { execute: jest.fn().mockReturnValue({ accessToken, accessTokenExpirationTime }) };
            authOperation = AuthOperation({ cacheService, authService });
        });

        it('Should be successfully called, authenticate, save to cache and return a token', async () => {
            const response = await authOperation.execute(data);

            expect(cacheService.getTokenByKey).toHaveBeenCalledWith(data.email);
            expect(authService.execute).toHaveBeenCalledWith(data);
            expect(cacheService.saveTokenWithKey).toHaveBeenCalledWith(
                data.email,
                { merchantId: cache.merchantId, accessToken: cache.accessToken },
                accessTokenExpirationTime
            );
            expect(response).toStrictEqual({ accessToken: cache.accessToken });
        });
    });
});
