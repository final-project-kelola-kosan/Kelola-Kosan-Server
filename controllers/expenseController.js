const {Expense} = require("../models");

class ExpenseController {
    static async addExpense(req, res, next) {
        let { title, month, year, total } = req.body
        console.log(req.loggedUser, "<<<<<<")
        let {id} = req.loggedUser
        try {
            const data = await Expense.create({
                title,
                month, 
                year,
                total,
                userId : id
            })
            res.status(201).json(data)
        } catch(err) {
            next(err)
        }
    }

    static async getExpense(req, res, next) {
        try {
            const data = await Expense.findAll()
            res.status(200).json(data);
        }catch(err) {
            next(err)
        }
    }

    static async getExpenseId(req, res, next) {
        let id = req.params.id
        try {
            const data = await Expense.findOne({
                where: {
                    id
                }
            })
    
            if (!data) {
                throw {status: 404, message: "error not found"}
             } else {
                 res.status(200).json(data)
             }
        } catch(err) {
            next(err)
        }
    }

    static async putExpenseId(req, res, next) {
        let { title, month, year, total } = req.body
        let id = +req.params.id
        let data = {
                title,
                month,
                year,
                total,
            }
        try {
            const findOne = await Expense.findOne({where: { id: id }})
            if(!findOne) {
                throw {status: 404, message: "error not found"}
            } else {
                const updated = await Expense.update(data, { where: { id: id }, returning: true })
                if (!updated) {
                    throw {status: 404, message: "error not found"}
                } else {
                    res.status(200).json(updated[1][0])
                }
            }
        } catch (err) {
            next(err)
        }  
    }

    static async patchExpensesId(req, res, next) {
        let { title } = req.body
        let id = +req.params.id
        try {
            const data = await Expense.findOne({where: { id: id }})
            if(!data) {
                throw {status: 404, message: "error not found"}
            } else {
                const updated = await Expense.update({ title: title }, { where: { id: id }, returning: true })
                if (!updated) {
                    throw {status: 404, message: "error not found"}
                } else {
                    res.status(200).json({
                       updated:updated[1][0]
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteExpenseId(req, res, next) {
        let id = +req.params.id
        try {
            const data = await Expense.findOne({where: { id: id }})
            if(!data) {
                throw {status: 404, message: "error not found"}
            } else {
                const deleted = await Expense.destroy({ where: { id: id }, returning: true })
                if (!deleted) {
                    throw {status: 404, message: "error not found"}
                } else {
                    res.status(200).json({
                        message: "Expense successfully deleted"
                    })
                }
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = ExpenseController;