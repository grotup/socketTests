var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);
var usersConnected = [];
var simplifiedUsers = [];

io.sockets.on('connection', function (socket) {
	usersConnected.push(socket);
	simplifiedUsers.push(socket.client.conn.id);
	console.log("user connected (" + usersConnected.length + ")");
  
  	socket.broadcast.emit('userConnected', simplifiedUsers);

  	socket.on('disconnect', function(){
  		var index = usersConnected.indexOf(socket);
  		usersConnected.splice(index, 1);
  		simplifiedUsers.splice(index,1);
  		console.log("user disconnected ("+usersConnected.length+")");
  	});
});

setInterval(function(){
	console.log("number of users : " + usersConnected.length);
	for (var i = usersConnected.length - 1; i >= 0; i--) {
		console.log("=> " + usersConnected[i].client.conn.id);
	};
}, 1000);