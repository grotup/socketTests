var socket = io('http://localhost:3000');
	socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});

socket.on('userConnected', function(data){
	console.log(data.length);
	for (var i = data.length - 1; i >= 0; i--) {
		console.log(i);
		$("#userList").append("<li>"+data[i]+"</li>");
	};
});

$("#userList").append("<li>Coucou ! </li>");

window.onLoad = function(){
	socket.emit('connection');
};

window.onBeforeUnload = function(){
	socket.disconnect();
}