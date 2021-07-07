const generateQuiqOrder = () => ({
    order: {
        id: 5555,
        scheduled: false,
        pdvOrderId: '',
        pdvMerchantId: '1',
        externalOrderId: '',
        status: 'PLACED',
        originStatus: 'PLACED',
        targetStatus: '',
        originShortReference: '5586',
        placedAt: '2021-03-26T15:19:10.000Z',
        createdAt: '2021-03-26T15:19:41.000Z',
        invoiceDocument: '12',
        ackPending: false,
        serviceType: 'DELIVERY',
        cancellationCode: '',
        cancellationReason: '',
        posIntegrationError: '',
        timeToAcceptInSeconds: 300,
        cart: {
            originId: '123123',
            subTotal: 2000,
            total: 2100,
            notes: '',
            items: [
                {
                    originId: 'b662a7dc-a2de-495c-9db6-9a21bf25404c',
                    sku: '',
                    name: 'PEDIDO DE TESTE - Girrafas Burguer',
                    type: '',
                    quantity: 1,
                    description: '',
                    comments: '',
                    image: '',
                    unitPrice: 2000,
                    totalPrice: 2000,
                    baseUnitPrice: 1000,
                    baseTotalPrice: 1000,
                    discount: 0,
                    addition: 0,
                    integrationCode: '9100100100',
                    subItems: [
                        {
                            name: 'Batata Frita Pq/',
                            quantity: 1,
                            unitPrice: 500,
                            totalPrice: 500,
                            discount: 0,
                            addition: 0,
                            integrationCode: '01|27'
                        }
                    ]
                }
            ]
        },
        payment: {
            paymentMethods: [
                {
                    name: 'DÉBITO - MASTERCARD (MÁQUINA)',
                    code: 'QUIQ_PAYMENT',
                    issuer: '',
                    prepaid: false,
                    value: 2100,
                    changeFor: 0,
                    method: 'DEBIT'
                }
            ],
            charges: {
                subTotal: 2000,
                total: 2100,
                totalDiscounts: 0,
                totalInCash: 0,
                tip: 0,
                tax: 0,
                totalFee: 100,
                totalFeeTax: 0,
                packagingFee: 0,
                deliveryFee: 100,
                serviceFee: 0
            }
        },
        customer: {
            originId: '123123123',
            firstName: 'PEDIDO DE TESTE - Allan P',
            displayName: 'PEDIDO DE TESTE - Allan P',
            lastName: 'PEDIDO DE TESTE - Allan P',
            phoneNumber: '0800 200 5011',
            email: 'jururu@gmail.com',
            ordersCount: 0
        },
        merchant: {
            originId: '173805d5-a47a-4062-8599-209472ab7360',
            name: 'Teste Tokpdv',
            phoneNumber: '',
            address: {
                formattedAddress: 'RAMAL BUJARI',
                country: 'BR',
                state: 'AC',
                city: 'BUJARI',
                coordinates: {
                    latitude: '',
                    longitude: ''
                },
                neighborhood: 'Bujari',
                streetName: 'RAMAL BUJARI',
                number: '100',
                postalCode: '69923000',
                reference: '',
                complement: ''
            }
        },
        delivery: {
            deliveredAt: '1970-01-01T00:00:00.000Z',
            deliveryDateTime: '2021-03-26T15:59:10.000Z',
            deliveredBy: 'MERCHANT',
            trackingStatus: '',
            worker: {
                name: '',
                phoneNumber: '',
                instructions: '',
                latitude: '',
                longitude: '',
                photo: '',
                logisticCompany: '',
                vehiclePlateNumber: '',
                vehicleType: '',
                eta: 0,
                firstEta: 0
            },
            address: {
                formattedAddress:
                    'PEDIDO DE TESTE - NÃO ENTREGAR - Ramal Bujari, 100',
                country: 'BR',
                state: 'AC',
                city: 'Bujari',
                coordinates: {
                    latitude: '-9.822159',
                    longitude: '-67.948475'
                },
                neighborhood: 'Bujari',
                streetName: 'PEDIDO DE TESTE - NÃO ENTREGAR - Ramal Bujari',
                number: '100',
                postalCode: '00000000',
                reference: 'bbbbbbbbbbb',
                complement: 'aaaaaaaaa'
            }
        },
        preparation: {
            preparationTimeInSeconds: 2400,
            minPreparationTimeInSeconds: 2400,
            maxPreparationTimeInSeconds: 3000,
            preparationStartDateTime: '2021-03-26T15:19:10.000Z'
        },
        packaging: {
            shouldIncludeDisposableItems: false
        }
    }
});

const generateQuiqOrderWithoutDeliveryAddress = () => ({
    order: {
        id: 5555,
        scheduled: false,
        pdvOrderId: '',
        pdvMerchantId: '1',
        externalOrderId: '',
        status: 'PLACED',
        originStatus: 'PLACED',
        targetStatus: '',
        originShortReference: '5586',
        placedAt: '2021-03-26T15:19:10.000Z',
        createdAt: '2021-03-26T15:19:41.000Z',
        invoiceDocument: '12',
        ackPending: false,
        serviceType: 'DELIVERY',
        cancellationCode: '',
        cancellationReason: '',
        posIntegrationError: '',
        timeToAcceptInSeconds: 300,
        cart: {
            originId: '123123',
            subTotal: 2000,
            total: 2100,
            notes: '',
            items: [
                {
                    originId: 'b662a7dc-a2de-495c-9db6-9a21bf25404c',
                    sku: '',
                    name: 'PEDIDO DE TESTE - Girrafas Burguer',
                    type: '',
                    quantity: 1,
                    description: '',
                    comments: '',
                    image: '',
                    unitPrice: 2000,
                    totalPrice: 2000,
                    baseUnitPrice: 1000,
                    baseTotalPrice: 1000,
                    discount: 0,
                    addition: 0,
                    integrationCode: '9100100100',
                    subItems: [
                        {
                            name: 'Batata Frita Pq/',
                            quantity: 1,
                            unitPrice: 500,
                            totalPrice: 500,
                            discount: 0,
                            addition: 0,
                            integrationCode: '01|27'
                        }
                    ]
                }
            ]
        },
        payment: {
            paymentMethods: [
                {
                    name: 'DÉBITO - MASTERCARD (MÁQUINA)',
                    code: 'QUIQ_PAYMENT',
                    issuer: '',
                    prepaid: false,
                    value: 2100,
                    changeFor: 0,
                    method: 'DEBIT'
                }
            ],
            charges: {
                subTotal: 2000,
                total: 2100,
                totalDiscounts: 0,
                totalInCash: 0,
                tip: 0,
                tax: 0,
                totalFee: 100,
                totalFeeTax: 0,
                packagingFee: 0,
                deliveryFee: 100,
                serviceFee: 0
            }
        },
        customer: {
            originId: '123123123',
            firstName: 'PEDIDO DE TESTE - Allan P',
            displayName: 'PEDIDO DE TESTE - Allan P',
            lastName: 'PEDIDO DE TESTE - Allan P',
            phoneNumber: '0800 200 5011',
            email: 'jururu@gmail.com',
            ordersCount: 0
        },
        merchant: {
            originId: '173805d5-a47a-4062-8599-209472ab7360',
            name: 'Teste Tokpdv',
            phoneNumber: ''
        },
        delivery: {
            deliveredAt: '1970-01-01T00:00:00.000Z',
            deliveryDateTime: '2021-03-26T15:59:10.000Z',
            deliveredBy: 'MERCHANT',
            trackingStatus: '',
            worker: {
                name: '',
                phoneNumber: '',
                instructions: '',
                latitude: '',
                longitude: '',
                photo: '',
                logisticCompany: '',
                vehiclePlateNumber: '',
                vehicleType: '',
                eta: 0,
                firstEta: 0
            }
        },
        preparation: {
            preparationTimeInSeconds: 2400,
            minPreparationTimeInSeconds: 2400,
            maxPreparationTimeInSeconds: 3000,
            preparationStartDateTime: '2021-03-26T15:19:10.000Z'
        },
        packaging: {
            shouldIncludeDisposableItems: false
        }
    }
});

const generateTakeAwayQuiqOrder = () => ({
    order: {
        id: 5555,
        scheduled: false,
        pdvOrderId: '',
        pdvMerchantId: '1',
        externalOrderId: '',
        status: 'PLACED',
        originStatus: 'PLACED',
        targetStatus: '',
        originShortReference: '5586',
        placedAt: '2021-03-26T15:19:10.000Z',
        createdAt: '2021-03-26T15:19:41.000Z',
        invoiceDocument: '12',
        ackPending: false,
        serviceType: 'TAKEAWAY',
        cancellationCode: '',
        cancellationReason: '',
        posIntegrationError: '',
        timeToAcceptInSeconds: 300,
        cart: {
            originId: '123123',
            subTotal: 2000,
            total: 2100,
            notes: '',
            items: [
                {
                    originId: 'b662a7dc-a2de-495c-9db6-9a21bf25404c',
                    sku: '',
                    name: 'PEDIDO DE TESTE - Girrafas Burguer',
                    type: '',
                    quantity: 1,
                    description: '',
                    comments: '',
                    image: '',
                    unitPrice: 2000,
                    totalPrice: 2000,
                    baseUnitPrice: 1000,
                    baseTotalPrice: 1000,
                    discount: 0,
                    addition: 0,
                    integrationCode: '9100100100',
                    subItems: [
                        {
                            name: 'Batata Frita Pq/',
                            quantity: 1,
                            unitPrice: 500,
                            totalPrice: 500,
                            discount: 0,
                            addition: 0,
                            integrationCode: '01|27'
                        }
                    ]
                }
            ]
        },
        payment: {
            paymentMethods: [
                {
                    name: 'DÉBITO - MASTERCARD (MÁQUINA)',
                    code: 'QUIQ_PAYMENT',
                    issuer: '',
                    prepaid: false,
                    value: 2100,
                    changeFor: 0,
                    method: 'DEBIT'
                }
            ],
            charges: {
                subTotal: 2000,
                total: 2100,
                totalDiscounts: 0,
                totalInCash: 0,
                tip: 0,
                tax: 0,
                totalFee: 100,
                totalFeeTax: 0,
                packagingFee: 0,
                deliveryFee: 100,
                serviceFee: 0
            }
        },
        customer: {
            originId: '123123123',
            firstName: 'PEDIDO DE TESTE - Allan P',
            displayName: 'PEDIDO DE TESTE - Allan P',
            lastName: 'PEDIDO DE TESTE - Allan P',
            phoneNumber: '0800 200 5011',
            email: 'jururu@gmail.com',
            ordersCount: 0
        },
        merchant: {
            originId: '173805d5-a47a-4062-8599-209472ab7360',
            name: 'Teste Tokpdv',
            phoneNumber: '',
            address: {
                formattedAddress: 'RAMAL BUJARI',
                country: 'BR',
                state: 'AC',
                city: 'BUJARI',
                coordinates: {
                    latitude: '',
                    longitude: ''
                },
                neighborhood: 'Bujari',
                streetName: 'RAMAL BUJARI',
                number: '100',
                postalCode: '69923000',
                reference: '',
                complement: ''
            }
        },
        delivery: {
            deliveredAt: '1970-01-01T00:00:00.000Z',
            deliveredBy: 'MERCHANT',
            trackingStatus: '',
            worker: {
                name: '',
                phoneNumber: '',
                instructions: '',
                latitude: '',
                longitude: '',
                photo: '',
                logisticCompany: '',
                vehiclePlateNumber: '',
                vehicleType: '',
                eta: 0,
                firstEta: 0
            },
            address: {
                formattedAddress:
                    'PEDIDO DE TESTE - NÃO ENTREGAR - Ramal Bujari, 100',
                country: 'BR',
                state: 'AC',
                city: 'Bujari',
                coordinates: {
                    latitude: '-9.822159',
                    longitude: '-67.948475'
                },
                neighborhood: 'Bujari',
                streetName: 'PEDIDO DE TESTE - NÃO ENTREGAR - Ramal Bujari',
                number: '100',
                postalCode: '00000000',
                reference: 'bbbbbbbbbbb',
                complement: 'aaaaaaaaa'
            }
        },
        preparation: {
            preparationTimeInSeconds: 2400,
            minPreparationTimeInSeconds: 2400,
            maxPreparationTimeInSeconds: 3000,
            preparationStartDateTime: '2021-03-26T15:19:10.000Z'
        },
        packaging: {
            shouldIncludeDisposableItems: false
        }
    }
});

module.exports = { generateQuiqOrder, generateTakeAwayQuiqOrder, generateQuiqOrderWithoutDeliveryAddress };
