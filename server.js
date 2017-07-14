const express = require('express');
const path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

const publicPath  = path.join(__dirname,'/public');
app.use(express.static(publicPath));
server.listen(port);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

var playercount = 0;
io.on('connection', (socket) =>{
    console.log('client connected');
    io.sockets.emit('newPlayer', playercount);
    playercount++;
    console.log(playercount);

});

