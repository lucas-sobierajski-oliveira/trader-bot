const Joi = require('joi');

module.exports = () =>
    Joi.object().keys({
        id: Joi.any().required(),
        reference: Joi.any().required(),
        shortReference: Joi.any().required(),
        createdAt: Joi.string().isoDate().required(),
        type: Joi.string().required(),
        subTotal: Joi.number().required(),
        totalPrice: Joi.number().required(),
        deliveryFee: Joi.number().required(),
        deliveryDateTime: Joi.string().isoDate().required(),
        preparationTimeInSeconds: Joi.number().required(),
        merchant: Joi.object().required(),
        payments: Joi.array().required(),
        customer: Joi.object().required(),
        deliveryAddress: Joi.object().required(),
        items: Joi.array().required()
    });
