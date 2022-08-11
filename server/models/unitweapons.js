'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitWeapons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UnitWeapons.init({
    unit_weapons_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true, 
      autoIncrement: true
    },
    unit_id: {
      type: DataTypes.SMALLINT, 
      allowNull: false
    },
    weapon_id: {
      type: DataTypes.SMALLINT, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UnitWeapons',
    timestamps: false
  });
  return UnitWeapons;
};