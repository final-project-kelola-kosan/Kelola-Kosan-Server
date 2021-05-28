const router = require('express').Router();
const UserController = require('../controllers/userController')
const userRouter = require("./user");
const roomRouter = require("./room");

router.use("/", userRouter);
router.use("/", roomRouter);

module.exports = router
