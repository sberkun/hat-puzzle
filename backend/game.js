module.exports.exportFunction = function(peoples){
  return function(){
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
  };
};
