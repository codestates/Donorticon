'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      score.belongsTo(models.giver, {
        foreignKey: 'giver_id'
      })
      giver.belongsTo(models.grade, {
        foreignKey: 'helper_id'
      })
    }
  }
  score.init({
    giver_id: DataTypes.INTEGER,
    helper_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'score',
  });
  return score;
};