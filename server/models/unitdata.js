'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UnitData.init({
    unitId: {
      type: DataTypes.SMALLINT,
      primaryKey: true, 
      autoIncrement: true
    },
    name: DataTypes.STRING,
    army: DataTypes.STRING,
    weapons: DataTypes.ARRAY(DataTypes.STRING),
    weapon_skill: DataTypes.SMALLINT,
    ballistic_skill: DataTypes.SMALLINT,
    strength: DataTypes.SMALLINT,
    toughness: DataTypes.SMALLINT,
    attacks: DataTypes.SMALLINT,
    wounds: DataTypes.SMALLINT,
  }, {
    sequelize,
    underscored: true, 
    modelName: 'UnitData',
  });
  return UnitData;
};