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

var playerCount = 2;
function box(top,left,id){
    this.top=top,
    this.left=left,
    this.id=id
}
var player1 = new box(0,0,1);
var player2 = new box(0,0,2);
var players = [player1,player2]
io.on('connection', (socket) =>{
    if(playerCount>0){
        console.log('client connected');
        socket.emit('setID',player1.id);
        socket.emit('user', {top:player1.top, left:player1.left});
        socket.on('move',(data)=>{
            //    console.log(data.key, data.id);
            if(data.id==1){       
                if(data.key==39){
                    player1.left+=100;
                    io.sockets.emit('render',player1);
                } else if(data.key==37){
                    player1.left-=100;
                    io.sockets.emit('render',player1);
                } else if(data.key==38){
                    player1.top-=100;
                    io.sockets.emit('render',player1);
                } else if(data.key==40){
                    player1.top+=100;
                    io.sockets.emit('render',player1);
                }
            } else if(data.id==2){       
                if(data.key==39){
                    player2.left+=100;
                    io.sockets.emit('render',player2);
                } else if(data.key==37){
                    player2.left-=100;
                    io.sockets.emit('render',player2);
                } else if(data.key==38){
                    player2.top-=100;
                    io.sockets.emit('render',player2);
                } else if(data.key==40){
                    player2.top+=100;
                    io.sockets.emit('render',player2);
                }
            }   
        });
        socket.on('disconnect', ()=>{
        playerCount++;
        console.log(playerCount);
        });
    }
});