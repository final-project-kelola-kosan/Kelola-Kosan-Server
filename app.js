if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const port = process.env.PORT || 4000
const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(router)

app.use(errorHandler)

module.exports = app;