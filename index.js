const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('username', username => {
    console.log(username + ' has logged in');
    io.emit('server message', username + ' has logged in')
  });


  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('client', client => {
      io.emit('client', client);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
