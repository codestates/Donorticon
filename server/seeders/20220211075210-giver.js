'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('givers', [{
      user_type: 1,
      name: 'kimcoding',
      email: 'kimcoding@codestates.com',
      password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
      mobile: '010-1234-5678',
      img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
      black_point: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('givers', null, {});
  }
};

