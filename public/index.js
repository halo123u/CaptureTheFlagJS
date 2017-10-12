var socket = io();

var players = [],
    colors = ['blue', 'red', 'green', 'orange'];

var movePlayer = function(player){
 console.log(player);
    let box = players[player.id-1].box[0];
    box.style.top = `${player.top}%`;
    box.style.left = `${player.left}%`;
}

var updateScore = function(data){
    point.style.left= `${data.pl}%`;
    point.style.top= `${data.pt}%`;
    players.forEach(function(player, i){
        player.score.text(`${data[`p${i+1}s`]}`);
    });
}
//Initialize DOM structure of the game 
var $body = $('body');
var $container = $('<div>').addClass('container');

var $pointBox = $('<div>').addClass('point');

    $body.append($container);
    for(let i =0 ; i<4; i++){
        let box = $('<div>').addClass('box').attr('id', `box${i}`).css('background', `${colors[i]}`);
        let score =  $('<div>').addClass('score').attr('id',`score${i+1}`);
            $container.append(score);
            $container.append(box);                 
            players.push({
                box,
                score
            });
    }
        console.log(players);

    $container.append($pointBox.css('background', 'black'));

 var   point = document.querySelector('.point');
//set id to null
    ID = null;

socket.on('connect', function(){
    console.log('connected to server');
    //obtain unique ID from the server
    socket.on('setID',function(id){
        ID=id;
    });
    if(ID){
        console.log(`player${id} connected`);
    } else{
        console.log('you are spectating a game');
    }

    //Initialize player values on page load
     $(document).ready(function(){
        socket.on('init',function(initPlayers){
            for(let i =0; i < 4; i++){
                let box = players[i].box[0];
                players[i].score.text(`${initPlayers.p1s}`);
                box.style.left = `${initPlayers[`left${(i+1)}`]}%`;
                box.style.top = `${initPlayers[`top${(i+1)}`]}%`;
            }

                point.style.left = `${initPlayers.pLeft}%`;
                point.style.top = `${initPlayers.pTop}%`;
        });

        //update player values on render event
        socket.on('render',function(box){
          movePlayer(box)
        });
        
        //update scoring and randomize position of point box on score
        socket.on('P',function(data){
            updateScore(data);
        });

        //declare winner on current player clients and not spectators
        socket.on('winner', function(color){
            if(ID!==null){
                if(confirm(`${color} player won!!!!`)){
                socket.emit('reset');
                }
            }
        }); 
    });
});

    //Listen for keydown event to emit move event 
    window.addEventListener('keydown',function(e){
        console.log(ID);
        if(e.keyCode ==39){
            socket.emit('move', {key:39, id:ID});
        } else if(e.keyCode ==37){
            socket.emit('move',{key:37, id:ID});
        } else if(e.keyCode==38){
            socket.emit('move',{key:38, id:ID});
        } else if(e.keyCode == 40){
            socket.emit('move',{key:40, id:ID});
        }
    });