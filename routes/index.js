const router = require('express').Router();
const UserController = require('../controllers/userController')
const userRouter = require("./user");
const propertyRouter = require('./property')


router.use("/", userRouter)
router.use('/properties', propertyRouter)


module.exports = router
