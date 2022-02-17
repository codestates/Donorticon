'use strict';

const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'givers',
      [
        {
          user_type: 1,
          name: 'kimcoding',
          email: 'kimcoding@codestates.com',
          password:
            '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
          mobile: '010-1234-5678',
          img: `https://randomuser.me/api/portraits/women/${getRandomNumber(
            1,
            98,
          )}.jpg`,
          black_point: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          verification: 1,
          verify_hash:
            '597bc8bed75f7f835bb20deab9e808e3dd831a05c21401f23ecb72a8bef152445323911386b64ffd57cbfc356c371fb5b34e724d5a5d1f462e36461cb623660c80f26f69d4c51f29bf640e0135159b9ffedf972816e03494eb52ac5fac50df9a49489365e9ea230ce3faf560737b5a145a4a2f027fa0ec65ddb3ecc8290178',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('givers', null, {});
  },
};
