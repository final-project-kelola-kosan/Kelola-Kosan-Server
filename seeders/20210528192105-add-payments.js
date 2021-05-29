'use strict';

const dateString = '2021-06-01'
var firstDate = new Date(dateString + "T00:00:00");
console.log(firstDate);

const dateStr2 = '2021-04-01'
var secondDate = new Date(dateStr2 + "T00:00:00");
console.log(secondDate);

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Payments", [
      {
        id: 1,
        month: 5,
        year: 2021,
        nextDueDate: firstDate,
        paidCash: 2500000,
        tenantId: 1,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        month: 3,
        year: 2021,
        nextDueDate: secondDate,
        paidCash: 2500000,
        tenantId: 2,
        roomId: 2,
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

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
