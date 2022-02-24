'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('helper_gifticon_categories', {
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
      gifticon_category_id: {
        allowNull: false,
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
    await queryInterface.dropTable('helper_gifticon_categories');
  },
};
