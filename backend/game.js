module.exports.exportFunction = function(peoples){
  var infoBuffer = new ArrayBuffer(peoples.length*12);
  var info = new Float32Array(infoBuffer);
  return function(){
    if(info.length!=3*peoples.length) {
      infoBuffer = new ArrayBuffer(peoples.length*12);
      info = new Float32Array(infoBuffer);
    }
    var a=0; for(var p in peoples){
      info[a++] = peoples[p].ws.id;
      info[a++] = peoples[p].x;
      info[a++] = peoples[p].y;
    }
    for(var p in peoples){
      console.log(typeof infoBuffer);
      peoples[p].ws.send(infoBuffer);
    }
  };
};
