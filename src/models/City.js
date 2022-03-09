const states = require('../enums/stateEnum.js');

module.exports = (sequelize, DataTypes) => {
    const colunas = {
        nome: DataTypes.STRING,
        estado: DataTypes.ENUM(states)
    }
    const configuracoesTabela = {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const City = sequelize.define("cities", colunas, configuracoesTabela);

    return City;
}