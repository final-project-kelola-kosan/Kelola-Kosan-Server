const { verifyToken} = require('../helpers/jwt')
const {Tenant, User} = require('../models')

async function authentication(req, res, next) {
    try {
        
        const {access_token} = req.headers
        if (access_token) {
            const decode = verifyToken(access_token)
            const foundUser = await User.findOne({
                where: {
                    email: decode.email
                }
            })
            if (foundUser) {
                req.loggedUser = {
                    id: decode.id,
                    email: decode.email
                }
                
                next()
            } else {
                res.status(401).json({message: "Invalid access_token"})
            }
        } else {
            next({name: "Unauthenticate"})
            // throw {status: 401, message: "You must login first"}
        }
    } catch (err) {
        next(err)
    }
}

async function authorization(req, res, next) {
    try {
        const id = +req.params.id
        const foundUser = await Tenant.findOne({where: { id: id }})
        if (foundUser) {
            if (foundUser.UserId === req.loggedUser.id) {
                next()
            } else {
                res.status(401).json({message: "Unauthorized"})
            }
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {authentication, authorization}