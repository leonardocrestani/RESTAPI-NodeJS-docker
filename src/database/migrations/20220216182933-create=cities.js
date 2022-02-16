'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
          type: Sequelize.CHAR(2),
          allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('cities');
  }
};