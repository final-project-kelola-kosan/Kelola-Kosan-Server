const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const tenantRouter = require("./tenant")


router.use("/", userRouter);

router.use(authentication)

router.use('/tenant', tenantRouter);

module.exports = router
