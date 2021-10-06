const io = require('../bin/www');

io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('disconnect');
});