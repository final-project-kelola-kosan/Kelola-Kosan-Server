'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tenants", [
      {
        email: "joko@mail.com",
        name: "joko",
        phone: "0823452",
        checkIn: new Date(),
        checkOut: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "papang@mail.com",
        name: "papang",
        phone: "0883249821",
        checkIn: new Date(),
        checkOut: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tenants", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
