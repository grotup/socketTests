var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
var max = 250;
var min = 0;

app.listen(3000);
var usersConnected = [];
var simplifiedUsers = [];

io.sockets.on('connection', function (socket) {
	usersConnected.push(socket);
	var client = {
		id : socket.client.conn.id,
		posX : Math.floor(Math.random() * (max - min) + min),
		posY : Math.floor(Math.random() * (max - min) + min)
	}
	simplifiedUsers.push(client);
	console.log("user connected (" + usersConnected.length + ")");

	socket.emit('userConnected', simplifiedUsers);
	socket.broadcast.emit('userConnected', simplifiedUsers);

	socket.on('connected', function(data){
		console.log(data);
		var index = usersConnected.indexOf(socket);
		simplifiedUsers[index].posX = data.posX;
		simplifiedUsers[index].posY = data.posY;
		socket.broadcast.emit('userConnected', simplifiedUsers);
		console.log(simplifiedUsers);
	});

	socket.on('update', function(data){
		console.log("Oui ?");
		var index = usersConnected.indexOf(socket);
		console.log(simplifiedUsers[index]);
		simplifiedUsers[index].posX = data.posX;
		simplifiedUsers[index].posY = data.posY;
		console.log(simplifiedUsers[index]);

		socket.emit('userConnected', simplifiedUsers);
		socket.broadcast.emit('userConnected', simplifiedUsers);
	});

	socket.on('disconnect', function(){
		var index = usersConnected.indexOf(socket);
		usersConnected.splice(index, 1);
		simplifiedUsers.splice(index,1);
		console.log("user disconnected ("+usersConnected.length+")");
		socket.broadcast.emit('userConnected', simplifiedUsers);
	});
});

setInterval(function(){
	console.log("number of users : " + usersConnected.length, simplifiedUsers);
	for (var i = simplifiedUsers.length - 1; i >= 0; i--) {
		console.log("=> " + simplifiedUsers[i].id);
	};
}, 5000);
