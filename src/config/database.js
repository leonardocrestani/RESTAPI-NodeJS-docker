require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const configDatabase = {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    storage: './tests/database.sqlite'
}

module.exports = configDatabase;