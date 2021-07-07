const supertest = require('supertest');
const defaults = require('superagent-defaults');

jest.mock('ioredis', ()=> jest.requireActual('ioredis-mock/jest'));
jest.mock('src/infra/integration/rest/httpClient', ()=> jest.requireActual('./httpClientMock'));

jest.mock('../../../../src/infra/logging/Logger', () => jest.requireActual('./loggerMock'));
jest.mock('src/infra/integration/queue/aws/sqs/SqsClient', () => jest.requireActual('./sqsClientMock'));

const container = require('src/container');
const server = container.resolve('server');
const mongoProvider = container.resolve('mongoProvider');

beforeAll(async () => {
    await mongoProvider.connect();
});

afterAll(async () => {
    await mongoProvider.mongoose.connection.close();
});

server.config.env = 'test';

const request = defaults(supertest(server.express));

expect.extend({
    toBeOneOf(received, items) {
        const pass = items.includes(received);
        const message = () => `expected ${received} to be contained in array [${items}]`;
        if (pass) {
            return {
                message,
                pass: true
            };
        }
        return {
            message,
            pass: false
        };
    }
});

module.exports = { request, container };
