const AuthService = require('src/app/services/auth/authService');
const quiqRestaurantStatusEnum = require('src/domain/enum/quiq/quiqRestaurantStatusEnum')();
const detailEnum = require('src/domain/enum/error/detailEnum')();
const actionEnum = require('src/domain/enum/event/actionEnum')();

describe('app :: services :: auth :: authService', () => {
    const data = { merchantId: '1', email: 'email@test.com', password: 'super-secret' };
    const { merchantId, ...credentials } = data;
    const tokenData = { accessToken: true, accessTokenExpirationTime: true };

    describe('#execute', () => {
        let accountServiceRestClient, tokenErrorFactory, exception, authService;
        const integrationsData = [{ status: 'OPENED' }];
        const token = { accessToken: true, accessTokenExpirationTime: true };

        beforeEach(() => {
            accountServiceRestClient = {
                getToken: jest.fn().mockReturnValue({ tokenData }),
                getIntegrations: jest.fn().mockReturnValue({ integrationsData })
            };
            tokenErrorFactory = { buildError: jest.fn() };
            exception = { integration: jest.fn() };
            authService = AuthService({
                accountServiceRestClient,
                quiqRestaurantStatusEnum,
                tokenErrorFactory,
                actionEnum,
                detailEnum,
                exception
            });
        });

        it('Should be successfully called', async () => {
            const response = await authService.execute(data);

            expect(accountServiceRestClient.getToken).toHaveBeenCalledWith(credentials);
            expect(tokenErrorFactory.buildError).not.toHaveBeenCalled();
            expect(exception.integration).not.toHaveBeenCalled();
            expect(accountServiceRestClient.getIntegrations).toHaveBeenCalledWith({ merchantId });
            expect(tokenErrorFactory.buildError).not.toHaveBeenCalled();
            expect(exception.integration).not.toHaveBeenCalled();
            expect(response).toStrictEqual(token);
        });
    });

    describe('#execute', () => {
        let accountServiceRestClient, tokenErrorFactory, exception, authService;
        const tokenError = new Error('Generic PDV Service error on authentication action');

        beforeEach(() => {
            accountServiceRestClient = {
                getToken: jest.fn().mockReturnValue({ tokenError }),
                getIntegrations: jest.fn()
            };
            tokenErrorFactory = { buildError: jest.fn().mockReturnValue(tokenError) };
            exception = {
                integration: jest.fn().mockImplementation(() => {
                    throw tokenError;
                })
            };
            authService = AuthService({
                accountServiceRestClient,
                quiqRestaurantStatusEnum,
                tokenErrorFactory,
                actionEnum,
                detailEnum,
                exception
            });
        });

        it('Should be called and return a token error', async () => {
            try {
                expect(await authService.execute(data)).toThrowError();
            } catch (error) {
                expect(accountServiceRestClient.getToken).toHaveBeenCalledWith(credentials);
                expect(tokenErrorFactory.buildError).toHaveBeenCalledWith(
                    detailEnum.AUTHENTICATION_FAILED,
                    actionEnum.AUTHENTICATION
                );
                expect(exception.integration).toHaveBeenCalledWith(tokenError);
                expect(accountServiceRestClient.getIntegrations).not.toHaveBeenCalled();
                expect(tokenErrorFactory.buildError.mock.calls.length).toEqual(1);
                expect(exception.integration.mock.calls.length).toEqual(1);
                expect(error).toEqual(tokenError);
            }
        });
    });

    describe('#execute', () => {
        let accountServiceRestClient, tokenErrorFactory, exception, authService;
        const integrationsError = new Error('Generic PDV Service error on authentication action');

        beforeEach(() => {
            accountServiceRestClient = {
                getToken: jest.fn().mockReturnValue({ tokenData }),
                getIntegrations: jest.fn().mockReturnValue({ integrationsError })
            };
            tokenErrorFactory = { buildError: jest.fn().mockReturnValue(integrationsError) };
            exception = {
                integration: jest.fn().mockImplementation(() => {
                    throw integrationsError;
                })
            };
            authService = AuthService({
                accountServiceRestClient,
                quiqRestaurantStatusEnum,
                tokenErrorFactory,
                actionEnum,
                detailEnum,
                exception
            });
        });

        it('Should be called and return a integrations error', async () => {
            try {
                expect(await authService.execute(data)).toThrowError();
            } catch (error) {
                expect(accountServiceRestClient.getToken).toHaveBeenCalledWith(credentials);
                expect(accountServiceRestClient.getIntegrations).toHaveBeenCalledWith({ merchantId });
                expect(tokenErrorFactory.buildError).toHaveBeenCalledWith(
                    detailEnum.AUTHENTICATION_FAILED,
                    actionEnum.AUTHENTICATION
                );
                expect(exception.integration).toHaveBeenCalledWith(integrationsError);
                expect(tokenErrorFactory.buildError.mock.calls.length).toEqual(1);
                expect(exception.integration.mock.calls.length).toEqual(1);
                expect(error).toEqual(integrationsError);
            }
        });
    });
});
