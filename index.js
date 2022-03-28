'use strict';
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//socket IO package
const { Server } = require("socket.io");
const io = new Server(server)

//mongoDb package;

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

//link html file with js file

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let messageDatabase;

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        messageDatabase.insert({ msg: msg, userId: socket.id })
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

client.connect(() => {
    const database = client.db('databaseExo');
    messageDatabase = database.collection('message');

});