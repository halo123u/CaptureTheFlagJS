var socket = io();
var $body = $('body');
var $container = $('<div>').addClass('container');
    $body.append($container);
    $container.append($('<div>').addClass('box').attr('id', 'box1').css('background', 'blue'));
    $container.append($('<div>').addClass('box').attr('id', 'box2').css('background', 'red'));
    var box1 = document.querySelector('#box1');

socket.on('connect', function(data){
    console.log('connected to server');
    $(document).ready(function(){
    socket.on('user',function(box){
        console.log(box);
        box1.style.left= `${box.left}px`;
        box1.style.top= `${box.top}px`;
    });
    socket.on('render',function(box){
        box1.style.left= `${box.left}px`;
        box1.style.top= `${box.top}px`;
    });

});
});
    window.addEventListener('keydown',function(e){
        console.log(e.keyCode)
        if(e.keyCode ==39){
            socket.emit('move', e.keyCode);
        } else if(e.keyCode ==37){
            socket.emit('move',e.keyCode);
        } else if(e.keyCode==38){
            socket.emit('move',e.keyCode);
        } else if(e.keyCode == 40){
            socket.emit('move',e.keyCode);
        }
    });