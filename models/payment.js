'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Room, {foreignKey: "roomId"});
      Payment.belongsTo(models.Tenant, {foreignKey: "tenantId"});
    }
  };
  Payment.init({
    month: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "month mustn't empty"
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "year mustn't empty"
        }
      }
    },
    nextDueDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "year mustn't empty"
        }
      }
    },
    paidCash: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: "paidCash mustn't empty"
        }
      }
    },
    tenantId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};