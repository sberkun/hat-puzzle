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
      document.getElementById("resulthtml").innerHTML = ""+game.numright+" out of "+game.numplayers+" player guessed right!";
      document.getElementById("winlosehtml").innerHTML = game.win? "You Win!" : "You Lose!" ;
      switchSlides(6);
    }
}
  
const myCanvas = document.getElementById("myCanvas");
const DRAW = myCanvas.getContext("2d");            
function drawHat(x,y,w,h,c){
  if(c==="?"){
    DRAW.font = "30px Arial";
    DRAW.fillText("?",x,y+h);
  }
  else if(c==="u"){
    DRAW.font = "20px Arial";
    DRAW.fillText("(you)",x,y+h);
  }
  else if(c==="b"){
    DRAW.fillStyle = "#000000";
    DRAW.beginPath();
    DRAW.moveTo(x,y+h);
    DRAW.lineTo(x+0.5*w,y);
    DRAW.lineTo(x+w,y+h);
    DRAW.stroke();
    DRAW.fill();
  }
  else if(c==="w"){
    DRAW.fillStyle = "#FFFFFF";
    DRAW.beginPath();
    DRAW.moveTo(x,y+h);
    DRAW.lineTo(x+0.5*w,y);
    DRAW.lineTo(x+w,y+h);
    DRAW.stroke();
    DRAW.fill();
  }
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
  alert("f51");
}
function f52(){
  alert("f52");
}
function f61(){
  switchSlides(0);
}


function startPlay(message){ //sets up game screen
  let eachwid = myCanvas.width/game.numplayers;
  let eachhig = myCanvas.height/2;
  for(let a=0;a<game.numplayers;a++){
    if(a<player.number)        drawHat(eachwid*a,0,eachwid,eachhig,"?");
    else if(a===player.number) drawHat(eachwid*a,0,eachwid,eachhig,"u");
    else drawHat(eachwid*a,0,eachwid,eachhig,message.substring(a,a+1));
  }
}
function handlePlayUpdate(message){
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
