const { Sequelize } = require('sequelize');

var host =  process.env.DB_HOST;
var user =  process.env.DB_USER;
var userpass =  process.env.DB_PASSWORD;
var database = process.env.DB_NAME;
var port = process.env.DB_PORT;

const sequelize =  new Sequelize(database, user, userpass, {
    host: host,
    port: port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

start().catch((error) => {
    console.error(error);
    }

);

async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB connection up.");
    } catch (error) {
        console.error('database: ', database, " | user: ", user);
        console.error('DB connection error: ', error);
    }
    await sequelize.sync({alter: true});
}

module.exports = sequelize;