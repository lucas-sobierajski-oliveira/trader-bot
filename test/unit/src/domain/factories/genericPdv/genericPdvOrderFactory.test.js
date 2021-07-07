const genericPdvOrderFactory = require('src/domain/factories/genericPdv/genericPdvOrderFactory');
const genericPdvMerchantFactory = require('src/domain/factories/genericPdv/components/genericPdvMerchantFactory')();
const genericPdvCustomerFactory = require('src/domain/factories/genericPdv/components/genericPdvCustomerFactory')();
const genericPdvDeliveryAddressFactory = require('src/domain/factories/genericPdv/components/genericPdvDeliveryAddressFactory')();
const genericPdvItemsFactory = require('src/domain/factories/genericPdv/components/genericPdvItemsFactory')();
const genericPdvPaymentsFactory = require('src/domain/factories/genericPdv/components/genericPdvPaymentsFactory')();

const genericPdvOrderSchema = require('src/domain/schemas/genericPdv/genericPdvOrderSchema')();
const serviceTypeEnum = require('src/domain/enum/serviceTypeEnum')();
const { generateQuiqOrder, generateTakeAwayQuiqOrder } = require('test/support/factories/order/createOrderQuiqFactory');

describe('src :: domain :: factories :: genericPdv :: genericPdvOrderFactory', () => {
    describe('#buildPayload', () => {
        let factory, ctx;
        describe('execute DELIVERY payload', () => {
            beforeEach(() => {
                ctx = {
                    genericPdvMerchantFactory,
                    genericPdvCustomerFactory,
                    genericPdvDeliveryAddressFactory,
                    genericPdvItemsFactory,
                    genericPdvPaymentsFactory,
                    genericPdvOrderSchema,
                    serviceTypeEnum,
                    exception: { operation: jest.fn() }
                };
                factory = genericPdvOrderFactory(ctx);
            });

            it('Execute', () => {
                const data = generateQuiqOrder();

                const spyValidate = jest.spyOn(genericPdvOrderSchema, 'validate');
                const spyMerchantFactory = jest.spyOn(genericPdvMerchantFactory, 'buildPayload');
                const spyCustumerFactory = jest.spyOn(genericPdvCustomerFactory, 'buildPayload');
                const spyDeliveryAddressFactory = jest.spyOn(genericPdvDeliveryAddressFactory, 'buildPayload');
                const spyItemsFactory = jest.spyOn(genericPdvItemsFactory, 'buildPayload');
                const spyPaymentsFactory = jest.spyOn(genericPdvPaymentsFactory, 'buildPayload');

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

                factory.buildPayload(data.order);

                expect(spyMerchantFactory).toHaveBeenCalledWith(data.order);
                expect(spyCustumerFactory).toHaveBeenCalledWith(data.order);
                expect(spyDeliveryAddressFactory).toHaveBeenCalledWith(data.order);
                expect(spyItemsFactory).toHaveBeenCalledWith(data.order);
                expect(spyPaymentsFactory).toHaveBeenCalledWith(data.order, total);
                expect(spyValidate).toHaveBeenCalled();
                expect(ctx.exception.operation).not.toHaveBeenCalled();
            });
        });
        describe('execute TAKEAWAY payload', () => {
            beforeEach(() => {
                ctx = {
                    genericPdvMerchantFactory,
                    genericPdvCustomerFactory,
                    genericPdvDeliveryAddressFactory,
                    genericPdvItemsFactory,
                    genericPdvPaymentsFactory,
                    genericPdvOrderSchema: { validate: jest.fn().mockReturnValue({ error: true }) },
                    serviceTypeEnum,
                    exception: {
                        operation: jest.fn().mockImplementation(() => {
                            throw new Error();
                        })
                    }
                };
                factory = genericPdvOrderFactory(ctx);
            });

            it('Execute', () => {
                const data = generateTakeAwayQuiqOrder();

                const spyMerchantFactory = jest.spyOn(genericPdvMerchantFactory, 'buildPayload');
                const spyCustumerFactory = jest.spyOn(genericPdvCustomerFactory, 'buildPayload');
                const spyDeliveryAddressFactory = jest.spyOn(genericPdvDeliveryAddressFactory, 'buildPayload');
                const spyItemsFactory = jest.spyOn(genericPdvItemsFactory, 'buildPayload');
                const spyPaymentsFactory = jest.spyOn(genericPdvPaymentsFactory, 'buildPayload');

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

                try {
                    factory.buildPayload(data.order);
                } catch (error) {
                    expect(spyMerchantFactory).toHaveBeenCalledWith(data.order);
                    expect(spyCustumerFactory).toHaveBeenCalledWith(data.order);
                    expect(spyDeliveryAddressFactory).toHaveBeenCalledWith(data.order);
                    expect(spyItemsFactory).toHaveBeenCalledWith(data.order);
                    expect(spyPaymentsFactory).toHaveBeenCalledWith(data.order, total);
                    expect(ctx.genericPdvOrderSchema.validate).toHaveBeenCalled();
                    expect(ctx.exception.operation).toHaveBeenCalled();
                    expect(error).toEqual(new Error());
                }
            });
        });
    });
});
