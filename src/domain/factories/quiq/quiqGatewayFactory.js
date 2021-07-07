module.exports = ({ pdvEnum }) => ({
    buildPayload: (data) => {
        const payload = {
            orderId: data.dbObject.order_id_quiq,
            event: data.status,
            timestamp: new Date().toISOString(),
            pdv: pdvEnum.GENERIC
        };
        return payload;
    }
});
