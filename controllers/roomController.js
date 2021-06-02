const {Room, User, Tenant} = require("../models")

class RoomController {

    static findRooms(req, res, next) {
        Room.findAll()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err)
                next({message: "Internal Server Error"})
            })
    }

    // static findAllOccupied(req, res, next) {

    // }

    // static findNotOccupied(req, res, next) {

    // }
    
    
    static addRoom(req, res, next) {
        let {number, status, type, price} = req.body;
        let currentUser = req.loggedUser;
        let ownedProperty = currentUser.ownedProperty;
        
        Room.create({
            number,
            status,
            type,
            price,
            propertyId: ownedProperty.id
        })
        .then(data => {
            console.log(ownedProperty.id, "INI DI OWNEDPROPERTY")
            res.status(201).json({
                number,
                status,
                type,
                price,
                propertyId: ownedProperty.id
            })
        })
        .catch(err => {
            if(err.name === "SequelizeUniqueConstraintError") {
                next({name: "RoomAlreadyExists", errorDetail: err});
            } else {
                next(err);
            }
        })
    }

    static getRoomById(req, res, next) {
        let id = req.params.id;
       
        Room.findByPk(id)
        .then(data => {
            if(data === null) {
                next({name: "RoomNotFound"})
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static updateStatus(req, res, next) {
        let id = req.params.id;
        let {status} = req.body;
        Room.update({
            status
        }, {
            where: {
                id
            }
        })
        .then(data => {
            console.log(data, "GW LAGI DI UPDATE STATUS")
            if(data[0] === 0) {
                next({name: "RoomNotFound"})
            } else {
                res.status(200).json({
                    msg: "Status successfully updated"
                });
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static updateRoom(req, res, next) {
        let id = req.params.id;
        let {number, status, type, price} = req.body;

        Room.update({
            number, 
            status,
            type,
            price
        }, {
            where: {
                id
            }
        }).then(data => {

            if(data[0] === 0) {
                next({name: "RoomNotFound"})
            } else {
                res.status(200).json({
                    msg: "Room successfully updated"
                });
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteRoom(req, res, next) {
        let id = req.params.id;

        Room.destroy({
            where: {
                id
            }
        })
        .then(data => {
            if(data === 0) {
                next({name: "RoomNotFound"})
            } else {
                res.status(200).json({
                    msg: "Room successfully deleted"
                })
            }
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
    }

    static statusRoom = (req, res, next) => {
      Room
        .findAll({ include: Tenant })
        .then(response => {

          const data = response.reduce((acc, room) => {
            if(room.status === 'empty') {
              acc.push({
                number      : room.number,
                status      : room.status,
                type        : room.type,
                price       : room.price,
              })
            }
            else acc.push({
              number       : room.number,
              status       : room.status,
              type         : room.type,
              price        : room.price,
              tenantName   : room.Tenants[0].name,
              tenantPhone  : room.Tenants[0].phone,
              tenantCheckIn: room.Tenants[0].checkIn
            })
            return acc
          },[])
          res.status(200).json(data)
        })
        .catch(err => console.log(err))
    }
}

module.exports = RoomController;
