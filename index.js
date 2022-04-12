'use strict';
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//socket IO package
const { Server } = require("socket.io");
const io = new Server(server)

//mongoDb package;


const mongoose = require('mongoose');
const client = mongoose.connect('mongodb://localhost:27017/databaseExo');
const Message = mongoose.model('message', { msg: String, userId: String });



//link html file with js file

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let messageDatabase;


io.on('connection', (socket) => {
    console.log(messageDatabase)
    socket.on('chat message', async (msg) => {
        io.emit('chat message', msg);
        const saveMsg = new Message({ msg: msg, userId: socket.id })
        const save = await saveMsg.save();
        console.log(save);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

