const AccountServiceRestClient = require('src/infra/integration/rest/accountServiceRestClient');

describe('infra :: integration :: rest :: accountServiceRestClient', () => {
    const credentials = { email: 'email@test.com', password: 'super-secret' };
    const merchantId = '1';

    describe('#getToken', () => {
        let config, clientConfig, httpConfig, logger, httpClient, accountServiceRestClient;
        const data = { accessToken: true, accessTokenExpirationTime: true, tokenType: true };
        const post = jest.fn().mockReturnValue({ data });

        beforeEach(() => {
            config = {
                integration: {
                    rest: {
                        accountService: {
                            baseURL: 'baseURL',
                            timeout: 1000,
                            externalCallMsg: 'externalCallMsg'
                        }
                    }
                }
            };
            clientConfig = config.integration.rest.accountService;
            httpConfig = {
                method: 'post',
                url: '/auth/login',
                data: credentials
            };
            logger = {
                info: jest.fn(),
                error: jest.fn(),
                debugHttpClientError: jest.fn()
            };
            httpClient = jest.fn().mockReturnValue(post);
            accountServiceRestClient = AccountServiceRestClient({ config, logger, httpClient });
        });

        it('Should call the http client with config', async () => {
            expect(httpClient).toHaveBeenCalledWith({ baseURL: clientConfig.baseURL, timeout: clientConfig.timeout });
        });

        it('Should call the http client successfully', async () => {
            const response = await accountServiceRestClient.getToken(credentials);

            expect(post).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).toHaveBeenCalledWith(`${clientConfig.externalCallMsg}, to get token`);
            expect(response).toStrictEqual({ tokenData: data });
            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.debugHttpClientError).not.toHaveBeenCalled();
        });
    });

    describe('#getToken', () => {
        let config, httpConfig, logger, httpClient, accountServiceRestClient;
        const error = new Error();
        const post = jest.fn().mockImplementation(() => {
            throw error;
        });

        beforeEach(() => {
            config = {
                integration: {
                    rest: {
                        accountService: {
                            baseURL: 'baseURL',
                            timeout: 1000,
                            externalCallMsg: 'externalCallMsg'
                        }
                    }
                }
            };
            httpConfig = {
                method: 'post',
                url: '/auth/login',
                data: credentials
            };
            logger = {
                info: jest.fn(),
                error: jest.fn(),
                debugHttpClientError: jest.fn()
            };
            httpClient = jest.fn().mockReturnValue(post);
            accountServiceRestClient = AccountServiceRestClient({ config, logger, httpClient });
        });

        it('Should call the http client and return an error', async () => {
            const response = await accountServiceRestClient.getToken(credentials);

            expect(post).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).not.toHaveBeenCalled();
            expect(response).toStrictEqual({ tokenError: error });
            expect(logger.error).toHaveBeenCalledWith(
                'Http request error when calling account service rest client to get token'
            );
            expect(logger.debugHttpClientError).toHaveBeenCalledWith(error);
        });
    });

    describe('#getIntegrations', () => {
        let config, clientConfig, httpConfig, logger, httpClient, accountServiceRestClient;
        const data = [{ status: 'OPENED' }];
        const get = jest.fn().mockReturnValue({ data });

        beforeEach(() => {
            config = {
                integration: {
                    rest: {
                        accountService: {
                            baseURL: 'baseURL',
                            timeout: 1000,
                            externalCallMsg: 'externalCallMsg'
                        }
                    }
                }
            };
            clientConfig = config.integration.rest.accountService;
            httpConfig = {
                method: 'get',
                url: '/merchants/integration/sale-integration/1'
            };
            logger = {
                info: jest.fn(),
                error: jest.fn(),
                debugHttpClientError: jest.fn()
            };
            httpClient = jest.fn().mockReturnValue(get);
            accountServiceRestClient = AccountServiceRestClient({ config, logger, httpClient });
        });

        it('Should call the http client with config', async () => {
            expect(httpClient).toHaveBeenCalledWith({ baseURL: clientConfig.baseURL, timeout: clientConfig.timeout });
        });

        it('Should call the http client successfully', async () => {
            const response = await accountServiceRestClient.getIntegrations({ merchantId });

            expect(get).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).toHaveBeenCalledWith(`${clientConfig.externalCallMsg}, to get integrations`);
            expect(response).toStrictEqual({ integrationsData: data });
            expect(logger.error).not.toHaveBeenCalled();
            expect(logger.debugHttpClientError).not.toHaveBeenCalled();
        });
    });

    describe('#getIntegrations', () => {
        let config, httpConfig, logger, httpClient, accountServiceRestClient;
        const error = new Error();
        const get = jest.fn().mockImplementation(() => {
            throw error;
        });

        beforeEach(() => {
            config = {
                integration: {
                    rest: {
                        accountService: {
                            baseURL: 'baseURL',
                            timeout: 1000,
                            externalCallMsg: 'externalCallMsg'
                        }
                    }
                }
            };
            httpConfig = {
                method: 'get',
                url: '/merchants/integration/sale-integration/1'
            };
            logger = {
                info: jest.fn(),
                error: jest.fn(),
                debugHttpClientError: jest.fn()
            };
            httpClient = jest.fn().mockReturnValue(get);
            accountServiceRestClient = AccountServiceRestClient({ config, logger, httpClient });
        });

        it('Should call the http client and return an error', async () => {
            const response = await accountServiceRestClient.getIntegrations({ merchantId });

            expect(get).toHaveBeenCalledWith(httpConfig);
            expect(logger.info).not.toHaveBeenCalled();
            expect(response).toStrictEqual({ integrationsError: error });
            expect(logger.error).toHaveBeenCalledWith(
                'Http request error when calling account service rest client to get integrations'
            );
            expect(logger.debugHttpClientError).toHaveBeenCalledWith(error);
        });
    });
});
