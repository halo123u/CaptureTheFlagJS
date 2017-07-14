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

var playercount = 2;
function box(top,left,id){
    this.top=top,
    this.left=left,
    this.id=id
}
io.on('connection', (socket) =>{
    console.log('client connected');
    var player1 = new box(0,0,playercount);
    console.log(player1.top);
       socket.emit('user', {top:player1.top, left:player1.left, id: player1.id});
    playercount--;
    socket.on('move',(data)=>{
        if(data==39){
            player1.left+=100;
            io.sockets.emit('render',player1);
        } else if(data==37){
            player1.left-=100;
            io.sockets.emit('render',player1);
        } else if(data==38){
            player1.top-=100;
            io.sockets.emit('render',player1);
        } else if(data==40){
            player1.top+=100;
            io.sockets.emit('render',player1);
        }
    })
    socket.on('disconnect', ()=>{
    playercount++;
    console.log(playercount);
});

});