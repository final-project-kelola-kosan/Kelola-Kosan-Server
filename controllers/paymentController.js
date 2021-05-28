const {Room, Tenant, Payment} = require("../models")

class PaymentController {

    static createPayment(req, res, next) {
        let {month, year, nextDueDate, paidCash} = req.body;

        // Payment.create({
        //     month,
        //     year,
        //     nextDueDate,
        //     paidCash
        // })
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