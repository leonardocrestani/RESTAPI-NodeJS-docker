
module.exports = (sequelize, DataTypes) => {
    const colunas = {
        nome_completo: DataTypes.STRING,
        sexo: DataTypes.ENUM('M', 'F'),
        data_nascimento: DataTypes.DATEONLY,
        idade: DataTypes.INTEGER,
        cidade_id: DataTypes.INTEGER
    }
    const configuracoesTabela = {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    const Client = sequelize.define("clients", colunas, configuracoesTabela);

    return Client;
}