'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('gifticon_categories', [
      {
        name: 'food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cosmetic',
        createdAt: new Date(),
        updatedAt: new Date()     
      },
      {
        name: 'children',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'electrical device',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cloth',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'kitchen',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'sport',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'movie',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('gifticon_categories', null, {});
  }
};
