module.exports.exportFunction = function(client){
  this.ws = client;
  this.x = 0;
  this.y = 0;
  this.infoBuffer = new ArrayBuffer(3*4);
    this.info = new Float32Array(this.infoBuffer);
    info[0] = client.id;
    info[1] = 0;
    info[2] = 0;
  this.update = function(x,y){
    info[1] = x;
    info[2] = y;
  }
};
