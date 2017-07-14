var socket = io();
var $body = $('body');
var $container = $('<div>').addClass('container');
    $body.append($container);
var generateBox = function(playerNum){
    let backgroundColor =['red', 'blue', 'yellow', 'orange'];
    if(playerNum>= backgroundColor.length){ playerNum=0;};
    console.log(playerNum);
    $container.append($('<div>').addClass('box').css('background', `${backgroundColor[playerNum]}`));
}

socket.on('connect', function(){
    console.log('connected to server');
    $(document).ready(function(){

});
});

socket.on('newPlayer', function(data){
console.log
generateBox(data);
});
