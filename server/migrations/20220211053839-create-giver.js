'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('givers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_type: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        // 게스트 로그인이 있을 수도 있으므로 allowNull을 아래 전부 표기하지 않았음
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      verification: {
        type: Sequelize.STRING,
      },
      verify_hash: {
        type: Sequelize.STRING,
      },
      black_point: {
        type: Sequelize.INTEGER,
      },
      social: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('givers');
  },
};
