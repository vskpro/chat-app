const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 3000;
const io = require('socket.io')(server);


io.on('connection', client => {
    
    console.log('A new client has been connected with id: ' + client.id);

    client.on('SendMessage', data => {
        client.emit('NewMessage', data);
    });

});

server.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})