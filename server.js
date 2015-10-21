var express = require("express");
var path = require("path");
var server = require("http").Server(app);
var app = express();

var usernames = {};
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
// tell the express app to listen on port 8000
app.get('/', function(req, res) {
	console.log(res.body);
 res.render("index", {});
});
app.get('/index', function(req, res) {
	
 res.render("index", {});
});
var server=app.listen(8000, function() 
{
 	console.log("listening on port 8000");
})
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	 	console.log("socket are on...");
	console.log(socket.id);
	var message_array = [];
	var user = [];

	socket.on('new_user', function(data){
		user.push(data.name);
		io.emit('new_user_from_server', {response: user, message_load: message_array});
	});


	socket.on('new_message', function(data){
		message_array.push(data);
		console.log(message_array);
		io.emit('post_message', {response: message_array});
	});

	socket.on('disconnect', function(){
		console.log(user);
		io.emit('disconnect', {response: user + " has been disconnected"});
	});
});