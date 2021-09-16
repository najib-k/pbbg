const { Sequelize } = require('sequelize-typescript');

let host =  process.env.DB_HOST;
let user =  process.env.DB_USER;
let userpass =  process.env.DB_PASSWORD;
let database = process.env.DB_NAME;
let port = process.env.DB_PORT;
let socket = process.env.SOCKET_PATH;

console.log(__dirname);

// @ts-ignore
const sequelize =  new Sequelize(database, user, userpass, {
    host: host,
    port: port,
    dialect: 'mysql',
    socketPath: socket,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    models: [__dirname + '/models']
});

async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB connection up.");
        console.log(sequelize.isDefined('Player'));
        sequelize.sync().catch((value) => {console.log(value)}).then(() => {console.log("Sync OK")});
    } catch (error) {
        console.error('database: ', database, " | user: ", user);
        console.error('DB connection error: ', error);
    }
};

module.exports = {start}