/*
const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);
  ws.onopen = function(event){};
  ws.onclose = function(event){};
  ws.onerror = function(event){};
  ws.onmessage = function(event){handle(event.data);};
*/
const ws = {
  send:function(a){
     if(a==="make room"){
       handle("c:test123");
       handle("j:5");
     }
     else if(a.substring(0,2)==="c:"){
       handle("i:");
       handle("c:test123");
       handle("j:5");
     }
     else if(a==="s:"){
       handle("n:2wwwww");
       handle("s:");
       handle("a:b");
       handle("a:b");
     }
     else if(a.substring(0,2)==="a:"){
       handle(a);
       handle("a:w");
       handle("a:w");
       setTimeout(function(){ handle("r:3"); }, 3000);
     }
  },
};


function handle(message){
    var typem = message.substring(0,2);
    if(message.length<2) return;
    else if(typem==="c:"){
      game.roomcode = message.substring(2);
      document.getElementById("roomcodehtml")
        .innerHTML = "Room Code: "+game.roomcode;
    }
    else if(typem==="j:"){
      game.numplayers = parseInt(message.substring(2));
      document.getElementById("numplayershtml")
      .innerHTML = "Number of players: "+game.numplayers;
    }
    else if(typem==="i:"){
      switchSlides(1);
    }
    else if(typem==="o:"){
      document.getElementById("wrongcodehtml").style.display="block";
    }
    else if(typem==="s:"){
      switchSlides(4);
    }
    else if(typem==="n:"){
      player.number = parseInt(message.substring(2,3));
      startPlay(message.substring(3));
    }
    else if(typem==="a:"){
      handlePlayUpdate(message.substring(2));
    }
    else if(typem==="r:"){
      game.numright = parseInt(message.substring(2,3));
      game.win = game.numright>=game.numplayers-1;
      document.getElementById("resulthtml").innerHTML = ""+game.numright+" out of "+game.numplayers+" player guessed right!";
      document.getElementById("winlosehtml").innerHTML = game.win? "You Win!" : "You Lose!" ;
      switchSlides(6);
    }
}
  
const myCanvas = document.getElementById("myCanvas");
const DRAW = myCanvas.getContext("2d");            
function drawHat(x,y,w,h,c){
  if(c==="?"){
    DRAW.fillStyle = "#000000";
    DRAW.font = "30px Arial";
    DRAW.fillText("?",x,y+h*0.5);
  }
  else if(c==="u"){
    DRAW.fillStyle = "#000000";
    DRAW.font = "20px Arial";
    DRAW.fillText("(you)",x,y+h*0.5);
  }
  else if(c==="b"){
    DRAW.fillStyle = "#000000";
    DRAW.beginPath();
    DRAW.moveTo(x,y+h*0.5);
    DRAW.lineTo(x+0.5*w,y);
    DRAW.lineTo(x+w,y+h*.5);
    DRAW.stroke();
    DRAW.fill();
  }
  else if(c==="w"){
    DRAW.fillStyle = "#FFFFFF";
    DRAW.beginPath();
    DRAW.moveTo(x,y+h*0.5);
    DRAW.lineTo(x+0.5*w,y);
    DRAW.lineTo(x+w,y+h*0.5);
    DRAW.stroke();
    DRAW.fill();
  }
  DRAW.beginPath();
  DRAW.fillStyle = "#BCCBE2";
  DRAW.ellipse(x+w*0.5,y+h*0.75,w*0.4,h*0.25,0,0,2*Math.PI);
  DRAW.stroke();
  DRAW.fill();
}
function drawSay(x,y,w,h,m){
  DRAW.fillStyle = "#000000";
  DRAW.font = "20px Arial";
  DRAW.fillText(m,x,y+h*0.5);
}








var player = {
  roomhost:false,
  name:"",
  whitehat:false, 
  number: -1,
};

var game = {
  roomcode:"",
  numplayers:0,
  win: false,
  numright: 0,
  turn:0,
};

window.onload = function(){
    var slideEls = document.getElementsByClassName("slide");
    slideEls[0].style.display = "block";
    
    var slides = [];
      slides[0] = new makeFading(slideEls[0],1); // make/join room
      slides[1] = new makeFading(slideEls[1],0); // collect players
      slides[2] = new makeFading(slideEls[2],0); // enter room code
      slides[3] = new makeFading(slideEls[3],0); // enter name - - deprecated
      slides[4] = new makeFading(slideEls[4],0); // story
      slides[5] = new makeFading(slideEls[5],0); // game
      slides[6] = new makeFading(slideEls[6],0); // win/lose
    switchSlides.slides = slides;
    switchSlides.currentSlide = 0;
};


function f01(){
  ws.send("make room");
  player.roomhost = true;
  document.getElementById("startbuttonhtml").style.display = "inline-block";
  switchSlides(1);
}
function f02(){
  switchSlides(2);
}
function f11(){
  document.getElementById("startbuttonhtml").style.display = "none";
  ws.send("s:");
}
form1.onsubmit = function(e){ //f21
    e.preventDefault();
    var codey = form1.cc.value;
    ws.send("c:"+codey);
    form1.cc.value = "";
    return false;
};
function f31(){
  switchSlides(1);
}
function f41(){
  switchSlides(5);
}
function f51(){
  ws.send("a:w");
  document.getElementById("choicehtml").style.display = "none";
}
function f52(){
  ws.send("a:b");
  document.getElementById("choicehtml").style.display = "none";
}
function f61(){
  switchSlides(0);
}


function startPlay(message){ //sets up game screen
  let eachwid = myCanvas.width/game.numplayers;
  let eachhig = myCanvas.height*0.75;
  for(let a=0;a<game.numplayers;a++){
    if(a<player.number)        drawHat(eachwid*a,0,eachwid,eachhig,"?");
    else if(a===player.number) drawHat(eachwid*a,0,eachwid,eachhig,"u");
    else drawHat(eachwid*a,0,eachwid,eachhig,message.substring(a,a+1));
  }
  if(player.number===0) document.getElementById("choicehtml").style.display = "block";
}
function handlePlayUpdate(message){
  let eachwid = myCanvas.width/game.numplayers;
  let eachtop = myCanvas.height*0.75*0.75;
  let eachhig = myCanvas.height*0.75*0.25;
  if(message==="b") drawSay(eachwid*game.turn,eachtop,eachwid,eachhig,'"black"');
  else if(message==="w") drawSay(eachwid*game.turn,eachtop,eachwid,eachhig,'"white"');
  game.turn++;
  if(player.number===game.turn) document.getElementById("choicehtml").style.display = "block";
}














function makeFading(el,p){
    this.el = el;
    this.p = p;
    this.interval = 0;
    this.fading = false;
    el.style.opacity = p;
}
makeFading.prototype.fadeIn = function(doAfter){
    var elo = this;
    if(elo.fading) window.clearInterval(elo.interval);
    elo.fading = true;
    elo.el.style.opacity = elo.p;
    elo.interval = setInterval(function(){
        elo.p+=(1-elo.p)*0.1+0.001; 
        elo.el.style.opacity = elo.p;
        if(elo.p>=1){
          clearInterval(elo.interval);
          elo.fading = false;
          doAfter();
        }
    },20);
};
makeFading.prototype.fadeOut = function(doAfter){
    var elo = this;
    if(elo.fading) window.clearInterval(this.interval);
    elo.fading = true;
    elo.el.style.opacity = this.p;
    elo.interval = window.setInterval(function(){
        elo.p -= (elo.p)*0.1+0.001;
        elo.el.style.opacity = elo.p;
        if(elo.p<=0){
          window.clearInterval(elo.interval);
          elo.fading = false;
          doAfter();
        }
    },20);
};
function switchSlides(num2){
    var el1 = switchSlides.slides[switchSlides.currentSlide];
    var el2 = switchSlides.slides[num2];
    //el1: fades out, display = none
    //el2: display = block, fades in
    el1.fadeOut(function(){
      el1.el.style.display = "none";
      el2.el.style.display = "block";
      el2.fadeIn(function(){});
    });
    switchSlides.currentSlide = num2;
}
