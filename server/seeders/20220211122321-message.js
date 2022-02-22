'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [{
      room_id: 1,
      giver_id: 1,
      helper_id: 1,
      gifticon_id: 1,
      message: 'thank you so much',
      img: 'https://drive.google.com/file/d/1R0rY7gKJTVz0bDbaIN3alL_Or-hsk-J5/view?usp=sharing',
      type: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('messages', null, {});
  }
};
