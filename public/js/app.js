var socket = io('http://localhost:3000');
var width = 10;
var max = 250;
var min = 0;
var clients = [];
var me = {};

socket.on('userConnected', function(data){
	clients = data;
	$("#userList").empty();
	for (var i = data.length - 1; i >= 0; i--) {
		$("#userList").append("<li>"+data[i].id+"</li>");
	};

	me = clients.find(currentSocket);

	updateCanvas();
});

window.onBeforeUnload = function(){
	socket.disconnect();
}

// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

updateCanvas = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < clients.length; i++) {
		ctx.fillRect(clients[i].posX, clients[i].posY, width, width);
	}
};

window.addEventListener("keydown", function (event) {

	if (event.defaultPrevented) {
		return; // Should do nothing if the key event was already consumed.
	}
	switch (event.keyIdentifier) {
    case "Down":
			me.posY +=1;
			break;
    case "Up":
			me.posY -=1;
    	break;
    case "Left":
			me.posX -=1;
    	break;
    case "Right":
			me.posX +=1;
    	break;
	}
	socket.emit('update', me);
});


currentSocket = function(element, index, array){
	return element.id == socket.id;
};
