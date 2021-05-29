'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rooms", [
      {
        id: 1,
        number: 105,
        status: "empty",
        propertyId: 1,
        type: "standard",
        price: 2500000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        number: 106,
        status: "maintenance",
        propertyId: 1,
        type: "deluxe",
        price: 3500000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Rooms", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
