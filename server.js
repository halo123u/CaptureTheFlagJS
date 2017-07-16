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

var playerCount = 0;
function box(top,left,score,id){
    this.top=top,
    this.left=left,
    this.score=score,
    this.id=id
}
// box.prototype.scored = ()=>{
//     return 10;
// } 
var player1 = new box(0,0,0,1);
var player2 = new box(94,96,0,2);
var point = new box((Math.random()*96),(Math.random()*96), -1);
var players = [player1,player2]
io.on('connection', (socket) =>{
    socket.emit('init', {top1:player1.top,top2:player2.top,left1:player1.left, 
            left2:player2.left, pLeft:point.left,pTop:point.top, p1s:player1.score, p2s:player2.score});
    if(playerCount<2){
        console.log('client connected');
        socket.emit('setID',players[playerCount].id);
        playerCount++;

        socket.on('move',(data)=>{
            // console.log(point.left, point.top);
            if((player1.left<= point.left) && (player1.left+3) >= point.left
             && (player1.top<= point.top && (player1.top+5) >= point.top)){
                    player1.score++;
                    console.log(player1.score);
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);
                    // console.log(player1.scored());

                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score});                
            } 
            
            if((player2.left<= point.left) && (player2.left+3) >= point.left
             && (player2.top<= point.top && (player2.top+5) >= point.top)){

                    player2.score++;
                    console.log(player2.score);
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);
                    // p1Score++;
                    // console.log(p1Score);
                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score});              
            }     
            if(data.id==1){             
                if(data.key==39 && player1.left<96){
                    player1.left+=2.1;
                    console.log(player1.left);
                    console.log(player2.left);
                    io.sockets.emit('render',player1);
                    // io.sockets.emit('render',player2);
                } else if(data.key==37 && player1.left>2){
                    console.log(player1.left);
                    console.log(player2.left);
                    player1.left-=2.1;
                    io.sockets.emit('render',player1);
                    // io.sockets.emit('render',player2);
                } else if(data.key==38&&player1.top>0){
                    console.log(player1.top);
                    console.log(player2.top);
                    player1.top-=4.1;
                    io.sockets.emit('render',player1);
                    // io.sockets.emit('render',player2);
                } else if(data.key==40&&player1.top<94){
                    player1.top+=4.1;
                    console.log(player1.top);
                    console.log(player2.top);
                    io.sockets.emit('render',player1);
                    // io.sockets.emit('render',player2);
                }
            } else if(data.id==2){       
                if(data.key==39&&player2.left<96){
                    player2.left+=2;
                    console.log(player1.left);
                    console.log(player2.left);
                    io.sockets.emit('render',player2);
                    io.sockets.emit('render',player1);
                } else if(data.key==37&& player2.left>0){
                    player2.left-=2;
                    io.sockets.emit('render',player2);
                    io.sockets.emit('render',player1);
                } else if(data.key==38&& player2.top>0){
                    player2.top-=4;
                    io.sockets.emit('render',player2);
                    io.sockets.emit('render',player1);
                } else if(data.key==40 && player2.top<94){
                    player2.top+=4;
                    io.sockets.emit('render',player2);
                    io.sockets.emit('render',player1);
                }
            }   
        });
    }
    socket.on('disconnect', ()=>{
        playerCount--;
        if(playerCount<=0){
            player1.left=0;
            player1.top=0;
            player2.left=98;
            player2.top=96; 
            playerCount=0;           
        }
        console.log(playerCount);
        });
});