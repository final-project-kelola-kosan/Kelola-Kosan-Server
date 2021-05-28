const {Room, Tenant, Payment} = require("../models")

class PaymentController {

    static createPayment(req, res, next) {
        let {month, year, nextDueDate, paidCash} = req.body;
        let {roomId, tenantId} = req.params;
        Payment.create({
            month,
            year,
            nextDueDate,
            paidCash,
            roomId,
            tenantId
        })
        .then(data => {
            console.log(data, "INI DI PAYMENT BANGSAT")
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
    }

    static findPayments(req, res, next) {

        Payment.findAll({
            include: [
                {
                    model: Room
                },
                {
                    model: Tenant
                }
            ]
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = PaymentController;