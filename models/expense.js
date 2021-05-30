'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Property, {foreignKey: "propertyId"});
    }
  };
  Expense.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title mustn't empty"
        }
      }
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
      validate: {
        notEmpty: {
          msg: "Year mustn't empty"
        }
      }
    },
    total: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: "Total mustn't empty"
        }
      }
    },
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};
