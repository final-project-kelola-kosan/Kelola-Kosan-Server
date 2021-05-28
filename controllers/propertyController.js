const { Property } = require('../models')

class PropertyController {

  static create = (req, res, next) => {
    
    const addProperty = {
      name : req.body.name,
      address : req.body.address,
      image: req.body.image,
      phone: req.body.phone,
      userId: req.body.userId
    }

    Property
      .create({ ...addProperty})
      .then(data => {
        res.status(201).json({
          id: data.id,
          name : data.name,
          address : data.address,
          image: data.image,
          phone: data.phone,
          userId: data.userId
        })
      })
      .catch(err => next(err))
  }

  static readAll = (req, res, next) => {
    
  }

}

module.exports = PropertyController