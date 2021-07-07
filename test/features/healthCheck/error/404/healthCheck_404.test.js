const { request } = require('test/support/features/setup/setup.features');

describe('Integration :: health check', () => {
    describe('#Success', () => {
        it('Should return sucess', async () => {
            const res = await request.post('/healthcheck').send();
            expect(res.status).toBe(404);
        });
    });
});
