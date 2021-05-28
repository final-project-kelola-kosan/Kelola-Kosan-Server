const router = require('express').Router();
const UserController = require('../controllers/userController')
const userRouter = require("./user");


router.use("/", userRouter);


module.exports = router
