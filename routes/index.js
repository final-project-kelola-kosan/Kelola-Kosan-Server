const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const propertyRouter = require('./property')
const tenantRouter = require("./tenant")


router.use("/", userRouter)
router.use('/properties', propertyRouter)

router.use(authentication)

router.use('/tenant', tenantRouter);

module.exports = router
