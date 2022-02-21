'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class helper_vulnerable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      helper_vulnerable.belongsTo(models.helper, {
        foreignKey: 'helper_id',
      });
      helper_vulnerable.belongsTo(models.vulnerable, {
        foreignKey: 'vulnerable_id',
      });
    }
  }
  helper_vulnerable.init(
    {
      helper_id: DataTypes.INTEGER,
      vulnerable_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'helper_vulnerable',
    },
  );
  return helper_vulnerable;
};
