
module.exports = (sequelize, DataTypes) => {
    const colunas = {
        nome: DataTypes.STRING,
        estado: DataTypes.CHAR(2)
    }
    const configuracoesTabela = {
        freezeTableName: true,
        tableName: 'Cities',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const City = sequelize.define("City", colunas, configuracoesTabela);

    return City;
}