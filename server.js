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
//const peoples = {};
//const updateGame = require('./backend/game.js').exportFunction(peoples);
//const person = require('./backend/player.js').exportFunction;

var rooms = [];

function makeid() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function makeroom(ws){
  let roomy = {
    code: makeid(),
    players: [],
    ans: "",
    numcorrect: 0,
    turn: 0,
  };
  roomy.sendall = function(str){
    for(let a in roomy.players) roomy.players[a].send(str);
  };
  roomy.addplayer = function(cc){
    roomy.players.push(cc);
    cc.room = roomy;
    cc.send("i:");
    cc.send("c:"+roomy.code);
    roomy.sendall("j:"+roomy.players.length);
  };
  rooms.push(roomy);
  roomy.addplayer(ws);
}
function messagehandler(room, str){
  let det = str.substring(0,2);
	if(det==="s:"){ 
		/*
		room.sendall("s:");
		let gg = ""; for(let a in room.players) gg+= (Math.random()<0.5)? "b":"w";
`		room.ans = gg;
		for(int a in room.players) room.players[a].send("n:"+a+gg);
		*/
		room.sendall("s:");
		for(let a in room.players) room.ans+= (Math.random()<0.5? "b":"w");
		for(let a in room.players) room.players[a].send("n:"+a+room.ans);
	}
	else if(det==="a:"){
		if(str.substring(2)===room.ans.substring(room.turn,room.turn+1)) room.numcorrect++;
		room.turn++;
		room.sendall(str);
		if(room.turn===room.players.length) ws.send("r:"+room.numcorrect);
	}
}

wss.on('connection', (ws) => {
  ws.room = false;
  ws.on('message',(message) => {
    var str = message;
    if(str==="make room") makeroom(ws);
    else if(str.substring(0,2)==="c:"){
      for(let a in rooms){if(rooms[a].code===str.substring(2)){
        ws.room = rooms[a];
        ws.room.addplayer(ws);
        return;
      }}
      ws.send("o:");
    }
    else messagehandler(ws.room,str);
  });
  ws.on('close', ()=> {} );
});

