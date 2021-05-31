'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tenants',
      [
        {
          id: 3,
          email: 'ihsan@mail.com',
          name: 'ihsan',
          phone: '0823452234234',
          checkIn: new Date(),
          checkOut: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          email: 'abdul@mail.com',
          name: 'abdul',
          phone: '08832498213242',
          checkIn: new Date(),
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
