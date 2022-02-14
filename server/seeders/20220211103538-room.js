'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [{
      giver_id: 1,
      helper_id: 1,
      activity: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('rooms', null, {});
  }
};
