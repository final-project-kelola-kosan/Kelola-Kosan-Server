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
            number: 100,
            status: 'empty',
            type: 'standard',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 101,
            status: 'empty',
            type: 'standard',
            price: 2500000,
            propertyId: data.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            number: 102,
            status: 'occupied',
            type: 'deluxe',
            price: 3500000,
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
