module.exports.exportFunction = function(peoples){
  var info = new Float64Array(peoples.length*3);
  return function(){
    if(info.length!=3*peoples.length) 
      info = new Float64Array(peoples.length*3);
    var a=0; for(var p in peoples){
      info[a++] = peoples[p].ws.id;
      info[a++] = peoples[p].x;
      info[a++] = peoples[p].y;
    }
    for(var p in peoples){
      peoples[p].ws.send(info);
    }
  };
};
