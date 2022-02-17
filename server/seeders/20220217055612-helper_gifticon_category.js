'use strict';

const getRandomNumber = (min, max) => {
  let result = parseInt(Math.random() * (Number(max) - Number(min) + 2));
  if (result === 0) {
    return 1
  } 
  return result;
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('helper_gifticon_categories', [
      {
        helper_id: 1,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 2,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 3,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 4,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 5,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 6,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 7,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 8,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 9,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 10,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 11,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 12,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 13,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 14,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 15,
        gifticon_category_id: getRandomNumber(1, 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('helper_gifticon_categories', null, {});
  }
};




