const httpClient = require('src/infra/integration/rest/httpClient');
const axios = require('axios');

jest.mock('axios');

describe('Infra :: Integrations :: Rest :: httpClient ', () => {
    describe('#get Client', () => {
        let client;
        const clientConfig = {
            baseURL: 'url',
            timeout: 1000
        };

        beforeEach(() => {
            client = httpClient();
        });

        it('should call http client with config', async () => {
            client(clientConfig);

            expect(axios.create).toHaveBeenCalledWith({
                baseURL: clientConfig.baseURL,
                timeout: clientConfig.timeout
            });
        });

        it('should call http client without config', async () => {
            client({});

            expect(axios.create).toHaveBeenCalledWith({
                baseURL: '',
                timeout: 3000
            });
        });
    });
});
