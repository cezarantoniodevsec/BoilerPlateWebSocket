var porta    = 3009;
var socket   = io("http://localhost:"+ porta);
var baseURL  = 'http://localhost:'+ porta +'/v1/';

function envia(msg)
{
    socket.emit('messageBroadcast',msg);
}

socket.on('messageBroadcast', function(msg)
{    
  $("#mestre").text(msg);   
  $("#result").text(msg)
  console.log(msg);
});

function enviaPing(){
  setTimeout(envia('ping'), 500000);
} 
function enviaPong(){
  setTimeout(envia('pong'), 500000);
} 