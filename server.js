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
const peoples = [];
const testaaa = require('./backend/game.js').exportFunction(peoples);

wss.on('connection', (ws) => {
  ws.id = Math.random();
    if(peoples[ws.id]) ws.id = Math.random();
    if(peoples[ws.id]) ws.id = Math.random();
    if(peoples[ws.id]) ws.id = Math.random();
    if(peoples[ws.id]) ws.id = Math.random();
    if(peoples[ws.id]){ws.send("uh oh bad, couldn't connect");return;}
  peoples[ws.id] = new require('./backend/player.js').exportFunction(ws.id);
  ws.on('message',(message) => {});
  ws.on('close', ()=>peoples.splice(ws.id,1) );
  //ws.send("hi");
});

