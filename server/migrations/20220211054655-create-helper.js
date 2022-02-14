'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('helpers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: { // 게스트 로그인 기능 사용할 시 정보가 필요하지 않을 수 있으므로 allowNull을 따로 표기 안함
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      slogan: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      activity: {
        type: Sequelize.BOOLEAN
      },
      verification: {
        type: Sequelize.BOOLEAN
      },
      verify_hash: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('helpers');
  }
};