'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      room.belongsTo(models.giver, {
        foreignKey: 'giver_id'
      })
      room.belongsTo(models.helper, {
        foreignKey: 'helper_id'
      })
    }
  }
  room.init({
    giver_id: DataTypes.INTEGER,
    helper_id: DataTypes.INTEGER,
    activity: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};