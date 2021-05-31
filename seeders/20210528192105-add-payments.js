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
        month: 5,
        year: 2021,
        nextDueDate: firstDate,
        paidCash: 2500000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        month: 3,
        year: 2021,
        nextDueDate: secondDate,
        paidCash: 2500000,
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
    return queryInterface.bulkDelete("Payment", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
