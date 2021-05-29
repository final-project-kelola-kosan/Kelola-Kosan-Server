const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const propertyRouter = require('./property')
const tenantRouter = require("./tenant")
const revenueRouter = require('./revenue')


router.use("/", userRouter)

router.use(authentication)
router.use('/properties', propertyRouter)
router.use('/revenues', revenueRouter)

router.use('/tenant', tenantRouter);

module.exports = router
