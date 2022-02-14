'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vulnerables', [
      {
        name: 'children',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'elderly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'physical challenged',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'multicultural',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'female',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'etc',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('vulnerables', null, {});
  }
};
