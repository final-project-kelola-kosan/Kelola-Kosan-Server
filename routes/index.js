const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const roomRouter = require("./room");
const propertyRouter = require('./property');
const tenantRouter = require("./tenant");
const paymentRouter = require("./payment");
const expenseRouter = require("./expense");


router.use("/", userRouter);

router.use(authentication);
router.use('/properties', propertyRouter);
router.use('/expenses', expenseRouter);
router.use('/tenant', tenantRouter);
router.use("/rooms", roomRouter);
router.use("/payments", paymentRouter);

module.exports = router
