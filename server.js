'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use(express.static(path.join(__dirname, 'frontend')))
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const peoples = {};
const testaaa = require('./backend/game.js').exportFunction(peoples);
const person = require('./backend/player.js').exportFunction;

wss.on('connection', (ws) => {
  ws.id = Math.random();
  peoples[ws.id] = new person(ws);
  ws.on('message',(message) => {
    peoples[ws.id].update(message.readFloatLE(0),message.readFloatLE(4));
  });
  ws.on('close', ()=> delete peoples[ws.id]);
});

setInterval(function(){
    var pplleenn = Object.keys(peoples).length;
    var infoBuffer = new ArrayBuffer(pplleenn*12);
    var info = new Float32Array(infoBuffer);
    var a=0; for(var p in peoples){
      info[a++] = peoples[p].ws.id;
      info[a++] = peoples[p].x;
      info[a++] = peoples[p].y;
    }
    for(var p in peoples){
      peoples[p].ws.send(infoBuffer);
    }
}, 100);
