module.exports.exportFunction = function(client){
  this.ws = client;
  this.x = 0;
  this.y = 0;
  this.update = function(x,y){
    this.x = x;
    this.y = y;
  }
};
