function errorHandler(err, req, res, next) {
    console.log(err)
    console.log(err.name, "<<<<<<< INI DI ERRORHANDLER")
    switch (err.name) {
        case "SequelizeValidationError":
            const errors = []
            err.errors.forEach(err => {
                errors.push(err.message)
            })
          
            res.status(400).json({message: "Bad request", errors})
            break
        case "Bad Request":
            
            res.status(400).json({message: err.message})
            break
        case "Unauthenticate":
            res.status(400).json({message: "Unauthenticate"})
            break
        case "RoomNotFound":
            res.status(404).json({message: "Room Not Found"})
            break
        case "PaymentNotFound":
            res.status(404).json({message: "Payment Not Found"})
            break
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: "Bad Request", errors: ['Email already exist']})
            break
        default: 
      
            res.status(500).json({message: err.message || "Internal Server Error"})
    }
}

module.exports = errorHandler