'use strict';
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Admin Kosan",
        email: "muhammadihsan076@gmail.com",
        username: "admin",
        bankAccount: "9812938",
        password: bcrypt.hashSync("postgres", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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
    return queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
