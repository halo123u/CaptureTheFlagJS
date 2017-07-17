const express = require('express');
const path = require('path');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

const publicPath  = path.join(__dirname,'/public');
app.use(express.static(publicPath));
server.listen(port);

function box(top,left,score,id){
    this.top=top,
    this.left=left,
    this.score=score,
    this.id=id
}

var playerCount = 0;
var player1 = new box(0,0,0,1);
var player2 = new box(94,96,0,2);
var player3 = new box(0,96,0,3);
var point = new box((Math.random()*96),(Math.random()*96), -1);
var players = [player1,player2, player3];

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
                console.log('going up works');
                if(players[id].top>0){ 
                players[id].top -= 4.1;
                io.sockets.emit('render',players[id]);
                }
                break;
            case 40:
                console.log('goind down works');
                if(players[id].top<94){ 
                players[id].top += 4.1;
                io.sockets.emit('render',players[id]);
                }
                break;
        }
}


io.on('connection', (socket) =>{
    socket.emit('init', {top1:player1.top,top2:player2.top, top3:player3.top,left1:player1.left, 
            left2:player2.left,left3:player3.left, pLeft:point.left,pTop:point.top, p1s:player1.score, p2s:player2.score, p3s:player3.score});
    if(playerCount<3){
        console.log('client connected');
        socket.emit('setID',players[playerCount].id);
        playerCount++;

        socket.on('move',(data)=>{
            if((player1.left<= point.left) && (player1.left+3) >= point.left
             && (player1.top<= point.top && (player1.top+5) >= point.top)){
                    player1.score++;
                    console.log(player1.score);
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);

                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score, p3s:player3.score});                
            } 
            
            if((player2.left<= point.left) && (player2.left+3) >= point.left
             && (player2.top<= point.top && (player2.top+5) >= point.top)){

                    player2.score++;
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);
                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score , p3s:player3.score});              
            } 
            
             if((player3.left<= point.left) && (player3.left+3) >= point.left
             && (player3.top<= point.top && (player3.top+5) >= point.top)){

                    player3.score++;
                    point.left = (Math.random()*96);
                    point.top = (Math.random()*96);
                    io.sockets.emit('P',{pl:point.left,pt:point.top, p1s:player1.score , p2s:player2.score , p3s:player3.score});              
            } 
                movebox((data.id-1),data.key);

        });
    }
    socket.on('disconnect', ()=>{
        playerCount--;
        if(playerCount<=0){
            player1.left=0;
            player1.top=0;
            player2.left=96;
            player2.top=94; 
            player3.left=96;
            player3.top=0; 
            playerCount=0;           
        }
        console.log(playerCount);
        });
});