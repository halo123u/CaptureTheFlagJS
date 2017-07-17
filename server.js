const express = require('express');
const path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

const publicPath  = path.join(__dirname,'/public');
app.use(express.static(publicPath));
server.listen(port);

function Box(top,left,score,id, color){
    this.top = top,
    this.left = left,
    this.score = score,
    this.id = id,
    this.color = color;
}

Box.prototype.getScore = function(){

     if(this.score === 1){
         io.sockets.emit('winner',this.color);
     }
}


var playerCount = 0;
var player1 = new Box(0,0,0,1,'Blue');
var player2 = new Box(94,96,0,2,'Red');
var player3 = new Box(0,96,0,3, 'Green');
var player4 = new Box(94,0,0,4,'Orange');
var point = new Box((Math.random()*96),(Math.random()*96), -1);
var players = [player1,player2, player3, player4];
var reset = false;

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

var movebox = function(id,key){
        switch(key){
            case 39:
                if(players[id].left<96){ 
                players[id].left += 2.1;
                io.sockets.emit('render',players[id]);
                }
                break;
            case 37:
                if(players[id].left>2){ 
                players[id].left -= 2.1;
                io.sockets.emit('render',players[id]);
                }
                break;
            case 38:
                if(players[id].top>0){ 
                players[id].top -= 4.1;
                io.sockets.emit('render',players[id]);
                }
                break;
            case 40:
                if(players[id].top<94){ 
                players[id].top += 4.1;
                io.sockets.emit('render',players[id]);
                }
                break;
        }
}

var collDet = (id) => {
    if((players[id].left<= point.left) && (players[id].left+3) >= point.left
             && (players[id].top<= point.top && (players[id].top+5) >= point.top)){
                    players[id].score++;
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);
                    players[id].getScore();
                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score, p3s:player3.score , p4s:player4.score});                
            } 
}



io.on('connection', (socket) =>{
    let start = ()=>{
    if(playerCount<=0 || reset){
    //Player1
    player1.left=0;
    player1.top=0;
    player1.score=0;
    //Player2 
    player2.left=96;
    player2.top=94; 
    player2.score= 0;
    //Player3
    player3.left=96;
    player3.top=0;
    player3.score =0;
    //Player 4
    player4.left=0;
    player4.top=94;
    player4.score =0;

    }
    io.sockets.emit('init', {top1:player1.top,top2:player2.top, top3:player3.top,top4:player4.top,
        left1:player1.left, left2:player2.left,left3:player3.left,left4:player4.left, 
        pLeft:point.left,pTop:point.top,
        p1s:player1.score, p2s:player2.score, p3s:player3.score, p4s:player4.score});  
}
    start();
    if(playerCount<4){
        console.log('client connected');
        socket.emit('setID',players[playerCount].id);
        playerCount++;

        socket.on('move',(data)=>{
            movebox((data.id-1),data.key);
            collDet(data.id-1);

        });
    }
    socket.on('reset',()=>{
        reset=true;
        start();
    });
    socket.on('disconnect', ()=>{
        playerCount--;
        if(playerCount<=0){
            start();
            reset=false; 
            playerCount=0;           
        }
        console.log(playerCount);
        });
});