(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var Asteroid = Asteroids.Asteroid = function(passedHash){
    var COLOR = 'white';
    var RADIUS = 20;
    this.color = COLOR;
    this.radius = RADIUS;
    this.pos = passedHash['pos'];
    this.vel = [Asteroids.Util.prototype.randomVec(5), Asteroids.Util.prototype.randomVec(5)];
    this.game = passedHash['game'];
	this.isWrappable = true;
  }

 Asteroids.Util.prototype.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
})();