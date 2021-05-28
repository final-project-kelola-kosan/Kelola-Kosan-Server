const router = require('express').Router();
const {authentication} = require("../middlewares/auth.js");
const userRouter = require("./user");
const roomRouter = require("./room");


const tenantRouter = require("./tenant")


router.use("/", userRouter);

router.use(authentication)

router.use('/tenant', tenantRouter);
router.use("/", roomRouter);

module.exports = router
