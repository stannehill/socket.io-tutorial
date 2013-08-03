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

  playernum === 1 ? playernum = 0 : playernum++;

  socket.emit('player', {'player': playernum});
  
  socket.on('volley', function (input) {
    socket.broadcast.emit('return', {'data': 1});
  });
});