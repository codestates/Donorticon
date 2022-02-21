'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('helper_vulnerables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      helper_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      vulnerable_id: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('helper_vulnerables');
  },
};
