const { Sequelize } = require('sequelize');

var host =  process.env.DB_HOST;
var user =  process.env.DB_USER;
var userpass =  process.env.DB_USERPASS;
var database = process.env.DB_NAME;

const sequelize =  new Sequelize(database, user, userpass, {
    host: host,
    dialect: 'mysql'
})

try {
    await sequelize.authenticate();
} catch (error) {
    console.error('DB connection error: ', error);
}

module.exports = sequelize;