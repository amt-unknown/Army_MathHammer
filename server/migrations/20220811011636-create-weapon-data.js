'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeaponData', {
      weapon_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      range_type: {
        type: Sequelize.STRING
      },
      strength: {
        type: Sequelize.INTEGER
      },
      attacks: {
        type: Sequelize.INTEGER
      },
      damage: {
        type: Sequelize.STRING
      },
      armor_penetration: {
        type: Sequelize.INTEGER
      },
      special_rules: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WeaponData');
  }
};