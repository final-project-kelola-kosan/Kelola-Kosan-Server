'use strict';

const {User} = require("../models")


module.exports = {
  up:  (queryInterface, Sequelize) => {
    return User.findOne({
      where: {
        email: "admin@mail.com"
      }
    })
    .then(data => {
      return queryInterface.bulkInsert("Properties", [
        {
          name: "Wisma",
          address: "Jaksel",
          image: "Blablah",
          phone: "14045",
          userId: data.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    })
    
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Properties", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
