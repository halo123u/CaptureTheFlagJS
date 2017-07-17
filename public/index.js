var socket = io();
var $body = $('body');
var $container = $('<div>').addClass('container');
var $scoreBoard = $('<div>').addClass('score').attr('id','score1');
var $scoreBoard2 = $('<div>').addClass('score').attr('id','score2');
var $scoreBoard3 = $('<div>').addClass('score').attr('id','score3');
var $scoreBoard4 = $('<div>').addClass('score').attr('id','score4');
var $pointBox = $('<div>').addClass('point');
    $body.append($container);
    $container.append($('<div>').addClass('box').attr('id', 'box1').css('background', 'blue'));
    $container.append($('<div>').addClass('box').attr('id', 'box2').css('background', 'red'));
    $container.append($('<div>').addClass('box').attr('id', 'box3').css('background', 'green'));
    $container.append($('<div>').addClass('box').attr('id', 'box4').css('background', 'orange'));
    $container.append($pointBox.css('background', 'black'));
    $container.append($scoreBoard);
    $container.append($scoreBoard2);
    $container.append($scoreBoard3);
    $container.append($scoreBoard4);

var box1 = document.querySelector('#box1');
var box2 = document.querySelector('#box2');
var box3 = document.querySelector('#box3');
var box4 = document.querySelector('#box4');
var point = document.querySelector('.point');
var ID = null;

socket.on('connect', function(){
    console.log('connected to server');
    socket.on('setID',function(data){
        console.log('user ID is setup');
        ID=data;
        console.log(ID);
    });
     $(document).ready(function(){
    socket.on('init',function(players){
        console.log('initial users setup')

            box1.style.left= `${players.left1}%`;
            box1.style.top= `${players.top1}%`;
        
            box2.style.left= `${players.left2}%`;
            box2.style.top= `${players.top2}%`;
            
            box3.style.left= `${players.left3}%`;
            box3.style.top= `${players.top3}%`;
            
            box4.style.left= `${players.left4}%`;
            box4.style.top= `${players.top4}%`;

            point.style.left = `${players.pLeft}%`;
            point.style.top = `${players.pTop}%`;

            $scoreBoard.text(`${players.p1s}`);
            $scoreBoard2.text(`${players.p2s}`);
            $scoreBoard3.text(`${players.p3s}`);
            $scoreBoard4.text(`${players.p4s}`);
     });
    socket.on('render',function(box){
         if(box.id==1){
            box1.style.left= `${box.left}%`;
            box1.style.top= `${box.top}%`;
         } else if(box.id==2){
            box2.style.left= `${box.left}%`;
            box2.style.top= `${box.top}%`;
         } else if(box.id==3){
            box3.style.left= `${box.left}%`;
            box3.style.top= `${box.top}%`;
         } else if(box.id ==4){
            box4.style.left= `${box.left}%`;
            box4.style.top= `${box.top}%`;
         }
    });
    socket.on('P',function(data){
        point.style.left= `${data.pl}%`;
        point.style.top= `${data.pt}%`;
        $scoreBoard.text(`${data.p1s}`);
        $scoreBoard2.text(`${data.p2s}`);
        $scoreBoard3.text(`${data.p3s}`);
        $scoreBoard4.text(`${data.p4s}`)


    });
    socket.on('winner', function(color){
        if(ID!==null){
            if(confirm(`${color} player won!!!!`)){
            socket.emit('reset');
            }
        }
    }); 

});
});
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