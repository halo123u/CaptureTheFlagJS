var socket = io();
var $body = $('body');
var $container = $('<div>').addClass('container');
    $body.append($container);
    $container.append($('<div>').addClass('box').attr('id', 'box1').css('background', 'blue'));
    $container.append($('<div>').addClass('box').attr('id', 'box2').css('background', 'red'));
    var box1 = document.querySelector('#box1');
    var ID = null;
socket.on('connect', function(){
    console.log('connected to server');
    socket.on('setID',(data) =>{
        console.log(data);
        ID=data;
    });
    $(document).ready(function(){
    socket.on('user',function(box){

        if(box.id==1){
            box1.style.left= `${box.left}px`;
            box1.style.top= `${box.top}px`;
        } else if(box.id==2){
            box2.style.left= `${box.left}px`;
            box2.style.top= `${box.top}px`;
        }
    });
    socket.on('render',function(box){
         if(box.id==1){
            box1.style.left= `${box.left}px`;
            box1.style.top= `${box.top}px`;
         } else if(box.id==2){
            box2.style.left= `${box.left}px`;
            box2.style.top= `${box.top}px`;
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