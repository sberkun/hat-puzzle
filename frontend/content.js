(function() {
  var canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}());

var coords = ew Float64Array(2);
  coods[0] = 0;
  coods[1] = 0;

document.addEventListener('mousemove',function(mouseE){
  coords[0] = mouseE.clientX;
  coords[1] = mouseE.clientY;
});

setInterval(function(){
  ws.send(coords);
}, 20);

