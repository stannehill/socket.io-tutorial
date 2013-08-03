/*var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(4000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});*/




var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(4000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var playernum = 0;
io.sockets.on('connection', function (socket) {
    console.log('connected successfully...');
    console.log('playernum is: ' + playernum);

    playernum === 1 ? playernum = 0 : playernum++;

    socket.emit('player', {'player': playernum});

    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('volley', function (input) {
        socket.broadcast.emit('return', {'data': 1});
    });
});