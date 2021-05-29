const express = require("express");
const paymentRouter = express.Router();
const PaymentController = require("../controllers/paymentController");

paymentRouter.get("/", PaymentController.findPayments);
paymentRouter.post("/:roomId/:tenantId", PaymentController.createPayment);
paymentRouter.delete("/:id", PaymentController.deletePayment);



module.exports = paymentRouter

