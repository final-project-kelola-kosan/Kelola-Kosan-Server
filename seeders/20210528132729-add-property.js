'use strict';

const {User} = require("../models")


module.exports = {
  up:  (queryInterface, Sequelize) => {
    return User.findOne({
      where: {
        email: "muhammadihsan076@gmail.com"
      }
    })
    .then(data => {
      return queryInterface.bulkInsert("Properties", [
        {
          name: "Wisma",
          address: "Jaksel",
          image: "https://images.unsplash.com/photo-1597047084897-51e81819a499?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
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
