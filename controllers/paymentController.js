const { Room, Tenant, Payment, sequelize } = require('../models');
class PaymentController {
  static createPayment(req, res, next) {
    let { month, year, nextDueDate, paidCash } = req.body;
    let { roomId, tenantId } = req.params;

    Payment.create({
      month,
      year,
      nextDueDate,
      paidCash,
      roomId,
      tenantId,
    })
      .then((data) => {
        Room.update({ status: 'occupied' }, { where: { id: roomId } });
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static findPayments(req, res, next) {
    Payment.findAll({
      include: [
        {
          model: Room,
        },
        {
          model: Tenant,
        },
      ],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deletePayment(req, res, next) {
    let id = req.params.id;
    Payment.destroy({
      where: {
        id,
      },
    })
      .then((data) => {
        if (data === 0) {
          next({ name: 'PaymentNotFound' });
        } else {
          res.status(200).json({
            msg: 'Payment successfully deleted',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static findPaymentById(req, res, next) {
    let id = req.params.id;
    Payment.findByPk(id)
      .then((data) => {
        console.log(data, 'LAGI DI PAYMENT FIND BY PK');
        if (data === null) {
          next({ name: 'PaymentNotFound' });
        } else {
          res.status(200).json(data);
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static editPayment(req, res, next) {
    let { id } = req.params;
    let { month, year, nextDueDate, paidCash } = req.body;

    Payment.update(
      {
        month,
        year,
        nextDueDate,
        paidCash,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    )
      .then((data) => {
        if (data[0] === 0) {
          next({ name: 'PaymentNotFound' });
        } else {
          res.status(200).json({
            msg: 'Payment updated successfully',
            updatedData: data[1][0],
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static reportPayment = (req, res, next) => {
    let year = new Date();
    year = year.getFullYear();

    Payment.findAll({
      where: { year },
      attributes: [
        'month',
        [sequelize.fn('sum', sequelize.col('paidCash')), 'totalPaid'],
      ],
      group: ['month'],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  };
}

module.exports = PaymentController;
