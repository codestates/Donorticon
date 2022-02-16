'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('gifticon_categories', [
      {
        name: '식품',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '화장품',
        createdAt: new Date(),
        updatedAt: new Date()     
      },
      {
        name: '임신/출산/유아 용품',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '디지털/가전',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '의류',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: '리빙/주방/꽃',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: '레저/스포츠',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: '상품권/영화/도서',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('gifticon_categories', null, {});
  }
};
