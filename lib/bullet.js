(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var Bullet = Asteroids.Bullet = function(passedHash){
    var COLOR = 'pink';
    var RADIUS = 5;
    this.color = COLOR;
    this.radius = RADIUS;
    this.pos = passedHash['pos'];
    this.vel = passedHash['vel'];
    this.game = passedHash['game'];
	this.isWrappable = false;
  }
 


 Asteroids.Util.prototype.inherits(Bullet, Asteroids.MovingObject);
})();