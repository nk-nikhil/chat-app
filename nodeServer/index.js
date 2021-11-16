//node Server which will handle socket io connections
var express = require('express');
//var cors = require('cors');
//const { Socket } = require('socket.io');
var app = express();
var http = require('http');

// fs = require('fs');
// var logger = fs.createWriteStream('log.txt', {
//   flags: 'a' // 'a' means appending (old data will be preserved)
// })
// logger.write('hello');

const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "*"
  }
});

httpServer.listen(8001);
const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    var d = new Date(); //for time
    console.log("Your name", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', { name: users[socket.id], Date: d.getHours() + ':' + d.getMinutes() });
    //logger.write("he")
  });

  socket.on('send', message => {
    debugger;
    console.log("receive", message);
    var d = new Date(); // for time
    socket.broadcast.emit('receive', { message: message, name: users[socket.id], Date: d.getHours() + ':' + d.getMinutes() });
  });

  socket.on('disconnect', message => {
    var d = new Date(); //for time
    socket.broadcast.emit('left', { name: users[socket.id], Date: d.getHours() + ':' + d.getMinutes() });
    delete users[socket.id];
  });

});