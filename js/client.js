//const io = ('socket.io');
//import * as io from "../nodeServer/node_modules/socket.io";
const socket = io('http://localhost:8001');
//const process = require('process');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('alarm.wav');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    debugger;
    e.preventDefault();
    const message = messageInput.value;
    var d = new Date(); //for time
    append('<div class="nameBold">' + `You:` + '</div>' + `${message}` + '<div class ="timestamp">' + d.getHours() + ':' + d.getMinutes() + '</div>', 'right');
    socket.emit('send', message);
    messageInput.value = ''
});

const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);

socket.on('user-joined', name => {
    append('<div class="nameBold">' + `${name.name}:` + '</div>' + ' Joined the chat ' + '<div class ="timestamp">' + `${name.Date}` + '</div>', 'right');
});

socket.on('receive', data => {
    append('<div class="nameBold">' + `${data.name}:` + '</div>' + `${data.message} ` + '<div class ="timestamp">' + `${data.Date}` + '</div>', 'left');
});

socket.on('left', name => {
    append('<div class="nameBold">' + `${name.name}:` + '</div>' + `left the chat ` + '<div class ="timestamp">' + `${name.Date}` + '</div>', 'left');
});
