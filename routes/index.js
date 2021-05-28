const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const roomRouter = require("./room");
const propertyRouter = require('./property')
const tenantRouter = require("./tenant")


router.use("/", userRouter)

router.use(authentication)
router.use('/properties', propertyRouter);
router.use('/tenant', tenantRouter);
router.use("/rooms", roomRouter);

module.exports = router
