'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'helper_vulnerables',
      [
        {
          helper_id: 1,
          vulnerable_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          helper_id: 1,
          vulnerable_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          helper_id: 1,
          vulnerable_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('helper_vulnerables', null, {});
  },
};
