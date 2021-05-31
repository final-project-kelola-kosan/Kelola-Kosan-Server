'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          id: 3,
          number: 105,
          status: 'empty',
          propertyId: 1,
          type: 'standard',
          price: 2500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          number: 106,
          status: 'occupied',
          propertyId: 1,
          type: 'deluxe',
          price: 3500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          number: 107,
          status: 'occupied',
          propertyId: 1,
          type: 'deluxe',
          price: 3500000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
