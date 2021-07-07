const { request } = require('test/support/features/setup/setup.features');

describe('Integration :: Auth Route only', () => {
    describe('#Success', () => {
        it('Should return sucess only', async () => {
            const res = await request.post('/api/oauth/token').send({
                'email':'lucas@gmail.com',
                'password':'123123',
                'merchantId':'1'
            });
            console.log(res.data);
            expect(res.status).toBe(200);
        });
    });
});
