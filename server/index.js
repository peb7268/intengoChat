
//Server
var app 	= require('express')();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

//Controllers
var home 	= require('./controllers/home');

//Socket.io Listeners
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('msg:sent', function(msgPacket){
    console.log('message recieved: ' + msgPacket.msg);
    console.log(msgPacket);
    
    io.emit('msg:rec', msgPacket);
  });
});

//Routes
app.route('/')
	.get(home.index);

//Request Listeners
http.listen(3000, requestListener);

function requestListener(){
  console.log('listening on *:3000');
}