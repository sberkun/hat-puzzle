module.exports.exportFunction = function(client){
  this.ws = client;
  this.x = 0;
  this.y = 0;
  this.infoBuffer = new ArrayBuffer(3*4);
    this.info = new Float32Array(this.infoBuffer);
    this.info[0] = client.id;
    this.info[1] = 0;
    this.info[2] = 0;
  this.update = function(x,y){
    this.info[1] = x;
    this.info[2] = y;
  }
};
