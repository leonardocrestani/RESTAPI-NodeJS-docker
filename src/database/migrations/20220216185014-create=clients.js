const genders = require('../../enums/genderEnum');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM(genders),
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('clients');
  },
};
