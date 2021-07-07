const genericPdvPaymentsFactory = require('src/domain/factories/genericPdv/components/genericPdvPaymentsFactory');
const { generateQuiqOrder } = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factory :: genericPdv :: components :: genericPdvPaymentsFactory', () => {
    describe('#buildPayload', () => {
        let factory;

        beforeEach(() => {
            factory = genericPdvPaymentsFactory();
        });

        it('Should execute', () => {
            const data = generateQuiqOrder();
            const {
                order: { cart }
            } = data;

            const calcTotalDiscount = (items) => {
                let discounts = 0;
                let totalItems = 0;
                items.forEach((item) => {
                    discounts = discounts + item.discount;
                    totalItems = totalItems + item.totalPrice;
                });

                return [totalItems, discounts];
            };

            const [totalItems, discounts] = calcTotalDiscount(cart.items);
            const total = totalItems - discounts;

            const {
                order: {
                    payment: { paymentMethods }
                }
            } = data;

            const { method, name, code, prepaid } = paymentMethods[0];

            const resultExpect = [
                {
                    name: method,
                    code: code,
                    value: total,
                    prepaid: prepaid,
                    issuer: name
                }
            ];

            const payload = factory.buildPayload(data.order, total);

            expect(payload).toEqual(resultExpect);
        });
    });
});
