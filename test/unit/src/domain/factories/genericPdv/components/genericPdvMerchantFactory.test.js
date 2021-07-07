const genericPdvMerchantFactory = require('src/domain/factories/genericPdv/components/genericPdvMerchantFactory');
const { generateQuiqOrder, generateQuiqOrderWithoutDeliveryAddress } = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factory :: genericPdv :: components :: genericPdvMerchantFactory', () => {
    describe('#buildPayload', () => {
        let factory;

        beforeEach(() => {
            factory = genericPdvMerchantFactory();
        });

        it('Should execute and return json with values', () => {
            const data = generateQuiqOrder();

            const {
                order: { merchant }
            } = data;
            const { originId, name, address } = merchant;
            const { formattedAddress, country, state, city, neighborhood, streetName, number, postalCode } = address;

            const resultExpect = {
                id: originId,
                name: name,
                phones: [],
                address: {
                    formattedAddress: formattedAddress,
                    country: country,
                    state: state,
                    city: city,
                    neighborhood: neighborhood,
                    streetName: streetName,
                    streetNumber: number,
                    postalCode: postalCode
                }
            };

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });

        it('Should execute and return empty json', () => {
            const data = generateQuiqOrderWithoutDeliveryAddress();

            const {
                order: { merchant }
            } = data;
            const { originId, name } = merchant;

            const resultExpect = {
                id: originId,
                name: name,
                phones: []
            };

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });
    });
});
