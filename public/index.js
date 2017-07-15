var socket = io();
var $body = $('body');
var $container = $('<div>').addClass('container');
    $body.append($container);
    $container.append($('<div>').addClass('box').attr('id', 'box1').css('background', 'blue'));
    $container.append($('<div>').addClass('box').attr('id', 'box2').css('background', 'red'));

var box1 = document.querySelector('#box1');
var box2 = document.querySelector('#box2');
    var ID = null;
socket.on('connect', function(){
    console.log('connected to server');
    socket.on('setID',function(data){
        console.log('user ID is setup');
        ID=data;
    });
     $(document).ready(function(){
    socket.on('init',function(players){
        console.log('initial users setup')

            box1.style.left= `${players.left1}%`;
            box1.style.top= `${players.top1}%`;
        
            box2.style.left= `${players.left2}%`;
            box2.style.top= `${players.top2}%`;
     });
    socket.on('render',function(box){
         if(box.id==1){
            box1.style.left= `${box.left}%`;
            box1.style.top= `${box.top}%`;
         } else if(box.id==2){
            box2.style.left= `${box.left}%`;
            box2.style.top= `${box.top}%`;
         }
    }); 

});
});
    window.addEventListener('keydown',function(e){
        console.log(e.keyCode)
        // if(ID==1){
        if(e.keyCode ==39){
            socket.emit('move', {key:39, id:ID});
        } else if(e.keyCode ==37){
            socket.emit('move',{key:37, id:ID});
        } else if(e.keyCode==38){
            socket.emit('move',{key:38, id:ID});
        } else if(e.keyCode == 40){
            socket.emit('move',{key:40, id:ID});
        }
        // }
    });