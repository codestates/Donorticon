'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('gifticons', [{
      giver_id: 1,
      helper_id: 1,
      img: 'https://drive.google.com/file/d/1qyl00N6vnEw7f8NUrlSnvmbQCgu4EBO_/view?usp=sharing',
      status: 'accepted',
      report: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('gifticons', null, {});
  }
};
