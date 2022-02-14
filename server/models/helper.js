'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class helper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  helper.init({
    user_type: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    img: DataTypes.STRING,
    slogan: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    activity: DataTypes.BOOLEAN,
    verification: DataTypes.BOOLEAN,
    verify_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'helper',
  });
  return helper;
};