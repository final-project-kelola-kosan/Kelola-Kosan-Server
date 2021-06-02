'use strict';

const { Property } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Property.findOne({
      where: {
        name: 'Wisma',
      },
    }).then((data) => {
      return queryInterface.bulkInsert(
        'Rooms',
        [
          {
            number: 105,
            status: 'empty',
            type: 'standard',
            price: 1500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 106,
            status: 'empty',
            type: 'deluxe',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 107,
            status: 'empty',
            type: 'standard',
            price: 1500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 108,
            status: 'maintenance',
            type: 'deluxe',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 109,
            status: 'occupied',
            type: 'standard',
            price: 1500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 110,
            status: 'empty',
            type: 'deluxe',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 111,
            status: 'empty',
            type: 'standard',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
