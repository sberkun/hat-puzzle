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
  var aaa = new (require('./backend/player.js').exportFunction(ws));
  ws.on('message',(message) => {
    var soifg = new Float32Array(message.data);
    aaa.update(soifg[0],soifg[1]);
  });
  //ws.on('close', ()=>peoples.splice(ws.id,1) );
  
  
  
  var sendThis = new ArrayBuffer(3*4);
  var nana = new Float32Array(sendThis);
    nana[0] = ws.id;
    nana[1] = 200;
    nana[2] = 200;
  ws.send(sendThis);
});

//setInterval(testaaa, 3000);
