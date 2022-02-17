'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('givers', [{
      user_type: 1,
      name: 'kimcoding',
      email: 'kimcoding@codestates.com',
      password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
      mobile: '010-1234-5678',
      img: `https://randomuser.me/api/portraits/women/${getRandomNumber(
        1,
        98,
      )}.jpg`,
      black_point: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('givers', null, {});
  }
};

