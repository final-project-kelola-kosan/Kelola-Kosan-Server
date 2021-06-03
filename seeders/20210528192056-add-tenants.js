'use strict';

const dateString = '2021-04-01';
var firstDate = new Date(dateString + 'T00:00:00');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tenants',
      [
        {
          email: 'qojack82nasution@gmail.com',
          name: 'Jack',
          phone: '0823452',
          checkIn: firstDate,
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'jecksfresley@gmail.com',
          name: 'Jecksen',
          phone: '085398464583',
          checkIn: firstDate,
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'hidayatarifin063@gmail.com',
          name: 'Arifin',
          phone: '081347767810',
          checkIn: firstDate,
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'hidayahtaufikk12@gmail.com',
          name: 'Taufik',
          phone: '089693224053',
          checkIn: firstDate,
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'HarunsAS@gmail.com',
          name: 'Harun',
          phone: '085391818787',
          checkIn: firstDate,
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
    return queryInterface.bulkDelete('Tenants', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
