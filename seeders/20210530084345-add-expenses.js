'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Expenses', [
      {
        id: 1,
        title: 'Perbaikan Air',
        month: 1,
        year: 2021,
        total: 10000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Perbaikan Kamar',
        month: 2,
        year: 2021,
        total: 15000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'Perbaikan Genteng Bocor',
        month: 3,
        year: 2021,
        total: 26000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: 'Membeli Kasur Tambahan',
        month: 4,
        year: 2021,
        total: 10000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: 'Membayar Listrik',
        month: 5,
        year: 2021,
        total: 12000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: 'Membayar Listrik',
        month: 6,
        year: 2021,
        total: 11000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        title: 'Membayar Listrik',
        month: 7,
        year: 2021,
        total: 13000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        title: 'Membayar Listrik',
        month: 8,
        year: 2021,
        total: 9000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        title: 'Membayar Listrik',
        month: 9,
        year: 2021,
        total: 14000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        title: 'Membayar Listrik',
        month: 10,
        year: 2021,
        total: 15000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        title: 'Perbaikan Air',
        month: 11,
        year: 2021,
        total: 8000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        title: 'Perbaikan Air',
        month: 12,
        year: 2021,
        total: 10000000,
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Expenses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
