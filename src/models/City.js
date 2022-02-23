
module.exports = (sequelize, DataTypes) => {
    const colunas = {
        nome: DataTypes.STRING,
        estado: DataTypes.CHAR(2)
    }
    const configuracoesTabela = {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const City = sequelize.define("cities", colunas, configuracoesTabela);

    return City;
}