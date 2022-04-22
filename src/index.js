var socketIO = require('socket.io'),
    http = require('http'),
    port = process.env.PORT || 8080,
    ip = process.env.IP || '169.254.51.241', //My IP address. I try to "127.0.0.1" but it the same => don't run
    server = http.createServer().listen(port, ip, function() {
        console.log("IP = " , ip);
        console.log("start socket successfully");
});

io = socketIO.listen(server);
//io.set('match origin protocol', true);
io.set('origins', '*:*');

var run = function(socket){
socket.broadcast.emit("message", "hello");
    socket.on("message", function(value) {
        console.log(value);
    });

    socket.on("user-join", function(value) {
        console.log(value + "user-join");
        socket.broadcast.emit("new-users", value);

    });
}

io.sockets.on('connection', run);