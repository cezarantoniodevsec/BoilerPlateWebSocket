var   dotenv     = require('dotenv'); dotenv.config();
const express    = require('express');
const app        = express();
var   http       = require('http').Server(app);
var   io         = require('socket.io')(http);
var   port       = process.env.PORTA;
const path       = require('path');
var contadorServ = 0; 

app.use(express.static(path.join(__dirname, 'public')));

http.listen(port, function(){
    console.log('listening on *:'+ port);
});

app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket)
{
	console.log('conectado....!'); 
	socket.on('messageBroadcast', function(etapaAtual)
	{	
		if(etapaAtual == 'ping'){ 
           contadorServ++;		   
		   console.log('Respondendo ping...');
          comunicaAoCliente('pong -' + contadorServ);           
        }else{
			contadorServ--;		   
		    console.log('Respondendo pong...');
           comunicaAoCliente('ping -' + contadorServ);           
		} 	
	});
});

function comunicaAoCliente(msg)
{
	console.log(msg); 
	io.emit('messageBroadcast', msg);
}