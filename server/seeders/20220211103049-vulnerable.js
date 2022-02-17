'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vulnerables', [
      {
        name: '아동청소년',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '어르신',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '장애인',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '다문화',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '가족/여성',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: '정신질환자',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: '그 외',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('vulnerables', null, {});
  }
};
