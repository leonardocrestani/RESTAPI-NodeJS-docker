const configDatabase = {
        database: 'cadastro',
        user: 'root',
        password: 'admin',
        host: '127.0.0.1',
        dialect: 'mysql',
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
}

module.exports = configDatabase;