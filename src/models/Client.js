const genders = require('../enums/genderEnum.js');

module.exports = (sequelize, DataTypes) => {
    const colunas = {
        nome_completo: DataTypes.STRING,
        sexo: DataTypes.ENUM(genders),
        data_nascimento: DataTypes.DATEONLY,
        cidade: DataTypes.INTEGER
    }
    const configuracoesTabela = {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Client = sequelize.define("clients", colunas, configuracoesTabela);

    return Client;
}