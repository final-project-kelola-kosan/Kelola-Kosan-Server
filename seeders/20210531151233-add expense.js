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
      return queryInterface.bulkInsert("Expenses", [
        {
          title: 'Perbaikan Air',
          month: 1,
          year: 2021,
          total: 1000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Perbaikan Kamar',
          month: 2,
          year: 2021,
          total: 1500000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Perbaikan Genteng Bocor',
          month: 3,
          year: 2021,
          total: 2600000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membeli Kasur Tambahan',
          month: 4,
          year: 2021,
          total: 1000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membayar Listrik',
          month: 5,
          year: 2021,
          total: 1200000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membayar Listrik',
          month: 6,
          year: 2021,
          total: 1100000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membayar Listrik',
          month: 7,
          year: 2021,
          total: 1300000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membayar Listrik',
          month: 8,
          year: 2021,
          total: 1000000,
          propertyId: data.id,          
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Membayar Listrik',
          month: 9,
          year: 2021,
          total: 1400000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Membayar Listrik',
          month: 10,
          year: 2021,
          total: 1500000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          title: 'Perbaikan Air',
          month: 11,
          year: 2021,
          total: 1000000,
          propertyId: data.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Perbaikan Air',
          month: 12,
          year: 2021,
          total: 1000000,
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
    return queryInterface.bulkDelete("Expenses", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
