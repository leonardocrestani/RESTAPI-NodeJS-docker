const states = require('../enums/stateEnum');
const tableConfig = require('../config/tableConfig');

module.exports = (sequelize, DataTypes) => {
  const columns = {
    name: DataTypes.STRING,
    state: DataTypes.ENUM(states),
  };
  const City = sequelize.define('cities', columns, tableConfig);

  return City;
};
