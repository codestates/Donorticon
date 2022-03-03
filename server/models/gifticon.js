'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gifticon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      gifticon.belongsTo(models.giver, {
        foreignKey: 'giver_id',
      });
      gifticon.belongsTo(models.helper, {
        foreignKey: 'helper_id',
      });
    }
  }
  gifticon.init(
    {
      giver_id: DataTypes.INTEGER,
      helper_id: DataTypes.INTEGER,
      img: DataTypes.STRING,
      status: DataTypes.STRING,
      report: DataTypes.BOOLEAN,
      point: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'gifticon',
    },
  );
  return gifticon;
};
