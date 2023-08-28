const { Sequelize } = require('sequelize-typescript');
const constants = require('../bin/constants');
const { Channel } = require('./models/Channel');

let host =  process.env.DB_HOST;
let user =  process.env.DB_USER;
let userpass =  process.env.DB_PASSWORD;
let database = process.env.DB_NAME;
let port = process.env.DB_PORT;
let socket = process.env.SOCKET_PATH;
let logging = process.env.SQ_LOGGING;

console.log(__dirname);
console.log("User: " + process.env.DB_USER);

// @ts-ignore
// Here "host" should be the docker service name
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
    retry: {
        max: 10,
        timeout: 10000,
    },
    logging: false,
    models: [__dirname + '/models']
});

function createStaticChatChannels() {
    constants.chatChannels.forEach((chanName, index) => {
        Channel.findOrCreate({where: {name: chanName}});
    });
}

async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB connection up.");
        console.log(sequelize.isDefined('Player'));
        //{force:true} drops the DB in case of model changes.
        sequelize.sync({force: false}).catch((value) => {console.log(value)}).then(() => {console.log("Sync OK")
        createStaticChatChannels();
    });
        
    } catch (error) {
        console.error('database: ', database, " | user: ", user);
        console.error('DB connection error: ', JSON.stringify(error));
    }
};

module.exports = {start}