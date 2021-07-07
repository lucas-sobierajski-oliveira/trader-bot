const genericPdvItemsFactory = require('src/domain/factories/genericPdv/components/genericPdvItemsFactory');
const { generateQuiqOrder } = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factory :: genericPdv :: components :: genericPdvItemsFactory', () => {
    describe('#buildPayload', () => {
        let factory;

        beforeEach(() => {
            factory = genericPdvItemsFactory();
        });

        it('Should execute', () => {
            const data = generateQuiqOrder();

            const {
                order: { cart }
            } = data;
            const { items } = cart;

            const resultExpect = items.map((item) => {
                const {
                    name,
                    baseTotalPrice,
                    totalPrice,
                    quantity,
                    integrationCode,
                    discount,
                    addition,
                    subItems
                } = item;

                let totalPriceSubItems = 0;

                const subItemsParse = subItems.map((subItem) => {
                    const {
                        name: subItemName,
                        quantity: subItemQuantity,
                        unitPrice: subItemUnitPrice,
                        totalPrice: subItemTotalPrice,
                        discount: subItemDiscount,
                        addition: subItemAddition,
                        integrationCode: subItemIntegrationCode
                    } = subItem;

                    totalPriceSubItems = totalPriceSubItems + subItemTotalPrice + subItemAddition - subItemDiscount;

                    return {
                        name: subItemName,
                        quantity: subItemQuantity,
                        price: subItemUnitPrice,
                        totalPrice: subItemTotalPrice,
                        discount: subItemDiscount,
                        addition: subItemAddition,
                        externalCode: subItemIntegrationCode
                    };
                });

                return {
                    name: name,
                    quantity: quantity,
                    price: baseTotalPrice,
                    subItemsPrice: totalPriceSubItems,
                    totalPrice: totalPrice,
                    discount: discount,
                    addition: addition,
                    externalCode: integrationCode,
                    subItems: subItemsParse
                };
            });

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });
    });
});
