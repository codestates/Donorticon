'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class helper_gifticon_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      helper_gifticon_category.belongsTo(models.helper, {
        foreignKey: 'helper_id'
      });

      helper_gifticon_category.belongsTo(models.gifticon_category, {
        foreignKey: 'gifticon_category_id'
      });
    }
  }
  helper_gifticon_category.init({
    helper_id: DataTypes.INTEGER,
    gifticon_category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'helper_gifticon_category',
  });
  return helper_gifticon_category;
};