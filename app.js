if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const port = process.env.PORT || 4000;
const errorHandler = require('./middlewares/errorHandler.js');
const cron = require("node-cron");

app.use(cors())

app.use(express.urlencoded({extended: true}))


app.use(express.json())

app.use(router)
const {sendMail} = require("./controllers/nodemailer/nodemailer");
let counter = 1;

cron.schedule("* * * * *", () => {
  console.log("MASOOK")
  sendMail(`hello world ${counter}`, "this is email body it can contain html also");
  counter++;
})

app.use(errorHandler)

module.exports = app;