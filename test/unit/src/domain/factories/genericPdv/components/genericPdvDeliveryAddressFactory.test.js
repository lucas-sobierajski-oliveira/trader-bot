const genericPdvDeliveryAddressFactory = require('src/domain/factories/genericPdv/components/genericPdvDeliveryAddressFactory');
const {
    generateQuiqOrder,
    generateQuiqOrderWithoutDeliveryAddress
} = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factory :: genericPdv :: components :: genericPdvDeliveryAddressFactory', () => {
    describe('#buildPayload', () => {
        let factory;

        beforeEach(() => {
            factory = genericPdvDeliveryAddressFactory();
        });

        it('Should execute', () => {
            const data = generateQuiqOrder();

            const {
                order: { delivery }
            } = data;
            const {
                formattedAddress,
                country,
                state,
                city,
                neighborhood,
                streetName,
                number,
                postalCode,
                reference,
                complement,
                coordinates
            } = delivery.address;

            const resultExpect = {
                formattedAddress: formattedAddress,
                country: country,
                state: state,
                city: city,
                coordinates: coordinates,
                neighborhood: neighborhood,
                streetName: streetName,
                streetNumber: number,
                postalCode: postalCode,
                reference: reference,
                complement: complement
            };

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });

        it('Should execute', () => {
            const data = generateQuiqOrderWithoutDeliveryAddress();

            const resultExpect = {};

            const payload = factory.buildPayload(data.order);

            expect(payload).toEqual(resultExpect);
        });
    });
});
