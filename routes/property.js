const propertyRouter = require('express').Router()
const PropertyController = require('../controllers/propertyController')

propertyRouter.post('/', PropertyController.create)
propertyRouter.get('/', PropertyController.readAll)

module.exports = propertyRouter