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

    static deletePayment(req, res, next) {
        let id = req.params.id;
        Payment.destroy({
            where: {
                id
            }
        })
        .then(data => {

            if(data === 0) {
                next({name: "PaymentNotFound"});
            } else {
                res.status(200).json({
                    msg: "Payment successfully deleted"
                })
            }
        })
        .catch(err => {
            console.log(err);
            next(err);  
        })
    }

    static findPaymentById(req, res, next) {
        let id = req.params.id;
        Payment.findByPk(id)
            .then(data => {
                console.log(data, "LAGI DI PAYMENT FIND BY PK")
                if(data === null) {
                    next({name: "PaymentNotFound"})
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
    }

    static editPayment(req, res, next) {
        
    }
}

module.exports = PaymentController;