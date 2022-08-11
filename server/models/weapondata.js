'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeaponData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UnitData, UnitWeapons}) {
      WeaponData.belongsToMany(UnitData, {
        foreignKey: "weapon_id",
        as: "units", 
        through: UnitWeapons
      })
    }
  };
  WeaponData.init({
    weapon_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true, 
      autoIncrement: true
    },
    name: DataTypes.STRING,
    range_type: DataTypes.STRING,
    strength: DataTypes.SMALLINT, 
    attacks:  DataTypes.SMALLINT,
    damage: DataTypes.STRING,
    armor_penetration: DataTypes.SMALLINT, 
    special_rules: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'WeaponData',
  });
  return WeaponData;
};