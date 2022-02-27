'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.room, {
        foreignKey: 'room_id',
      });
      message.belongsTo(models.giver, {
        foreignKey: 'giver_id',
      });
      message.belongsTo(models.helper, {
        foreignKey: 'helper_id',
      });
      message.belongsTo(models.gifticon, {
        foreignKey: 'gifticon_id',
      });
    }
  }
  message.init(
    {
      room_id: DataTypes.INTEGER,
      giver_id: DataTypes.INTEGER,
      helper_id: DataTypes.INTEGER,
      gifticon_id: DataTypes.INTEGER,
      message: DataTypes.STRING,
      img: DataTypes.STRING,
      type: DataTypes.INTEGER,
      thanksImg: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'message',
    },
  );
  return message;
};
