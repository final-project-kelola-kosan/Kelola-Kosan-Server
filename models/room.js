'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Property, {foreignKey: "propertyId"});
      Room.belongsToMany(models.Tenant, {through: models.Payment, foreignKey: "roomId"});
    }
  };
  Room.init({
    number: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "number mustn't be empty"
        }
      }
    },
    status: {
      type: DataTypes.ENUM({
        values: ['empty', 'maintenance', 'occupied']
      }),
      validate: {
        notEmpty: {
          msg: "status mustn't be empty"
        }
      }
    },
    propertyId: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM({
        values: ['standard', 'deluxe']
      }),
      validate: {
        notEmpty: {
          msg: "type mustn't be empty"
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: "type mustn't be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
    hooks: {
      beforeCreate(instance, options) {
        instance.status = instance.status.toLowerCase();
        instance.type = instance.type.toLowerCase();
      }
    }

  });
  return Room;
};