'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gifticons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      giver_id: {
        type: Sequelize.INTEGER,
      },
      helper_id: {
        type: Sequelize.INTEGER,
      },
      img: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      report: {
        type: Sequelize.BOOLEAN,
      },
      point: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('gifticons');
  },
};
