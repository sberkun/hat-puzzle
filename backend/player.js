module.exports.exportFunction = function(iddddd){
  this.id = iddddd;
  this.x = 0;
  this.y = 0;
  this.info = new Float64Array(3);
    info[0] = iddddd;
    info[1] = 0;
    info[2] = 0;
  this.update = function(x,y){
    info[1] = x;
    info[2] = y;
  }
};
