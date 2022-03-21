const genders = require('../enums/genderEnum');
const tableConfig = require('../config/tableConfig');

module.exports = (sequelize, DataTypes) => {
  const columns = {
    full_name: DataTypes.STRING,
    gender: DataTypes.ENUM(genders),
    birth_date: DataTypes.DATEONLY,
    city: DataTypes.INTEGER,
  };
  const Client = sequelize.define('clients', columns, tableConfig);

  return Client;
};
