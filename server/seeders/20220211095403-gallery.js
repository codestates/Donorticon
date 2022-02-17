'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('galleries', [
      {
      helper_id: 1,
      img: 'https://drive.google.com/file/d/1R0rY7gKJTVz0bDbaIN3alL_Or-hsk-J5/view?usp=sharing', 
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('galleries', null, {});
  }
};
