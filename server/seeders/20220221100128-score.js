'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'scores',
      [
        {
          giver_id: 1,
          helper_id: 1,
          point: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          giver_id: 1,
          helper_id: 2,
          point: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          giver_id: 1,
          helper_id: 3,
          point: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          giver_id: 1,
          helper_id: 4,
          point: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          giver_id: 1,
          helper_id: 5,
          point: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('scores', null, {});
  },
};
