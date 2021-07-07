const genericPdvCustomerFactory = require('src/domain/factories/genericPdv/components/genericPdvCustomerFactory');
const { generateQuiqOrder } = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factory :: genericPdv :: components :: genericPdvCustomerFactory', () => {
    describe('#buildPayload', () => {
        let factory;

        beforeEach(() => {
            factory = genericPdvCustomerFactory();
        });

        it('Should execute', () => {
            const data = generateQuiqOrder();

            const {
                order: { customer }
            } = data;
            const { originId, displayName, phoneNumber, ordersCount } = customer;

            const resultExpect = {
                id: originId,
                uuid: originId,
                name: displayName,
                taxPayerIdentificationNumber: '',
                phone: phoneNumber,
                ordersCountOnRestaurant: ordersCount
            };

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });
    });
});
