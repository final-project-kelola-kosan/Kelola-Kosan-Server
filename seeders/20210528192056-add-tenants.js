'use strict';

const dateString = '2021-04-01'
var firstDate = new Date(dateString + "T00:00:00");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tenants", [
      {
        email: "joko@mail.com",
        name: "joko",
        phone: "0823452",
        checkIn: firstDate,
        checkOut: null,
        bankAccount: "11112093090348945",
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
