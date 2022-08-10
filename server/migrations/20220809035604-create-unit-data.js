'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UnitData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      army: {
        type: Sequelize.STRING
      },
      weapons: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      weapon_skill: {
        type: Sequelize.INTEGER
      },
      ballistic_skill: {
        type: Sequelize.INTEGER
      },
      strength: {
        type: Sequelize.INTEGER
      },
      toughness: {
        type: Sequelize.INTEGER
      },
      attacks: {
        type: Sequelize.INTEGER
      },
      wounds: {
        type: Sequelize.INTEGER
      },
      save: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('UnitData');
  }
};