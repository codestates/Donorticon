'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('helpers', [
      {
        user_type: 2,
        name: 'parkhacker',
        email: 'parkhacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-4751-2351',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2001...',
        location: 'Seoul Gangnam-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'leehacker',
        email: 'leehacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-7554-2001',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2002...',
        location: 'Seoul Seocho-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'choihacker',
        email: 'choihacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-3123-1467',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2003...',
        location: 'Seoul Songpa-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'janghacker',
        email: 'janghacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-9010-2516',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2004...',
        location: 'Seoul Jongno-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'junghacker',
        email: 'junghacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-2352-1256',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2005...',
        location: 'seoul Yongsan-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'limhacker',
        email: 'limhacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-7531-4156',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2006...',
        location: 'Seoul Seongdong-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'chohacker',
        email: 'chohacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-4156-8884',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2007...',
        location: 'Seoul Seongdong-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'yunhacker',
        email: 'yunhacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-4674-6544',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2008...',
        location: 'Seoul Gwangjin-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'seohacker',
        email: 'seohacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-8900-6522',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2009...',
        location: 'Seoul Dongdaemun-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'kanghacker',
        email: 'kanghacker@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-4751-2351',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2010...',
        location: 'Seoul Jungnang-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'parkcoding',
        email: 'parkcoding@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-7554-2001',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2011...',
        location: 'Seoul Seongbuk-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'leecoding',
        email: 'leecoding@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-3123-1467',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2012...',
        location: 'Seoul Gangbuk-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'kangcoding',
        email: 'kangcoding@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-4751-2351',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2013...',
        location: 'Seoul Dobong-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'yuncoding',
        email: 'yuncoding@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-7554-2001',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2014...',
        location: 'Seoul Seocho-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_type: 2,
        name: 'paekcoding',
        email: 'paekcoding@codestates.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-3123-1467',
        img: `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`,
        slogan: 'save the children',
        description: 'i have been supporting a kid since 2015...',
        location: 'Seoul Seocho-gu',
        activity: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});  

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('helpers', null, {});
  }
};
