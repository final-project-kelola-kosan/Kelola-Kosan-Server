'use strict';

const {Property} = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Property.findOne({
      where: {
        name: "Wisma"
      }
    })
    .then(data => {
      return queryInterface.bulkInsert("Revenues", [
        {
          month: 1,
          year: 2021,
          total: 20000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 2,
          year: 2021,
          total: 34000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 3,
          year: 2021,
          total: 24000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 4,
          year: 2021,
          total: 45000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 5,
          year: 2021,
          total: 34000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 6,
          year: 2021,
          total: 56000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 7,
          year: 2021,
          total: 36000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 8,
          year: 2021,
          total: 24000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 9,
          year: 2021,
          total: 27000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 10,
          year: 2021,
          total: 30000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 11,
          year: 2021,
          total: 21000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          month: 12,
          year: 2021,
          total: 29000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
    })
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Revenues", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};