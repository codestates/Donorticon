'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('galleries', [
      {
      helper_id: 1,
      img: 'http://imagescdn.gettyimagesbank.com/500/201904/jv11349321.jpg', 
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('galleries', null, {});
  }
};
