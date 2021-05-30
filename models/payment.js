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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    month: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'),
      allowNull: false,
      validate: {
        isIn: {
          args: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          msg: "Insert Valid Month"
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "year mustn't empty"
        }
      }
    },
    nextDueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "due date mustn't empty"
        }
      }
    },
    paidCash: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
