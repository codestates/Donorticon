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
    await queryInterface.bulkInsert('helper_vulnerables', [
      {
        helper_id: 1,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 2,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 3,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 4,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 5,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 6,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 7,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 8,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 9,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 10,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 11,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 12,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 13,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 14,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        helper_id: 15,
        vulnerable_id: getRandomNumber(1, 7),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('helper_vulnerables', null, {});
  }
};
