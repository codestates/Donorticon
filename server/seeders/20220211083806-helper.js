'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('helpers', [{
      user_type: 1,
      name: 'parkhacker',
      email: 'parkhacker@codestates.com',
      password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
      mobile: '010-8765-4321',
      img: 'https://drive.google.com/file/d/1ZZ623uRSdNtvDhcho27A5-SjdIdn2Daw/view?usp=sharing',
      slogan: 'save the children',
      description: 'i have been supporting a kid since 2015...',
      location: 'seoul gangnam-gu',
      activity: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('helpers', null, {});
  }
};
