var socket = io();

var players = [],
    colors = ['blue', 'red', 'green', 'orange'];

var movePlayer = function(player){
 console.log(player);
    let box = players[player.id-1];
    box[0].style.top = `${player.top}%`;
    box[0].style.left = `${player.left}%`;
}

//Initialize DOM structure of the game 
var $body = $('body');
var $container = $('<div>').addClass('container'),
    $scoreBoard = $('<div>').addClass('score').attr('id','score1'),
    $scoreBoard2 = $('<div>').addClass('score').attr('id','score2'),
    $scoreBoard3 = $('<div>').addClass('score').attr('id','score3'),
    $scoreBoard4 = $('<div>').addClass('score').attr('id','score4');

var $pointBox = $('<div>').addClass('point');

    $body.append($container);
    for(let i =0 ; i<4; i++){
        let box =$('<div>').addClass('box').attr('id', `box${i}`).css('background', `${colors[i]}`);
            $container.append(box);                 
            players.push(box);
    }

    $container.append($pointBox.css('background', 'black'));
    $container.append($scoreBoard);
    $container.append($scoreBoard2);
    $container.append($scoreBoard3);
    $container.append($scoreBoard4);

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
            console.log(players);
            for(let i =0; i < 4; i++){
                let box = players[i];
                box[0].style.left = `${initPlayers[`left${(i+1)}`]}%`;
                box[0].style.top = `${initPlayers[`top${(i+1)}`]}%`;
            }

                point.style.left = `${players.pLeft}%`;
                point.style.top = `${players.pTop}%`;

                $scoreBoard.text(`${players.p1s}`);
                $scoreBoard2.text(`${players.p2s}`);
                $scoreBoard3.text(`${players.p3s}`);
                $scoreBoard4.text(`${players.p4s}`);
        });

        //update player values on render event
        socket.on('render',function(box){
          movePlayer(box)
        });
        //update scoring and randomize position of point box on score
        socket.on('P',function(data){
            point.style.left= `${data.pl}%`;
            point.style.top= `${data.pt}%`;
            $scoreBoard.text(`${data.p1s}`);
            $scoreBoard2.text(`${data.p2s}`);
            $scoreBoard3.text(`${data.p3s}`);
            $scoreBoard4.text(`${data.p4s}`)


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