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
    Property
      .findAll()
      .then(properties => {
        res.status(200).json(properties)
      })
      .catch(err => next(err))
  }

  static update = (req, res, next) => {
    const id = req.params.id

    const dataUpdate = {
      name : req.body.name,
      address : req.body.address,
      image: req.body.image,
      phone: req.body.phone
    }

    Property
      .update(dataUpdate, { where: {id}, returning: true })
      .then(updated => res.status(200).json({ updated }))
      .catch(err => next(err))
  }

  static delete = (req, res, next) => {
    const id = +req.params.id

    Property
      .destroy({ where: {id}, returning: true })
      .then(deleted => {
        if(deleted) res.status(200).json({ message: 'Property has been delete!' })
        else res.status(404).json({ message: 'Data not found!'})
      })
  }

}

module.exports = PropertyController