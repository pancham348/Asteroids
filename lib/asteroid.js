(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var Asteroid = Asteroids.Asteroid = function(passedHash){
    var COLOR = 'white';
    var RADIUS = 40;
    this.color = COLOR;
    this.radius = RADIUS;
    this.pos = passedHash['pos'];
    this.vel = [Asteroids.Util.prototype.randomVec(5), Asteroids.Util.prototype.randomVec(5)];
    this.game = passedHash['game'];
	this.isWrappable = true;
	this.imgSrc = "lib/asteroid.png"
	this.size = 100;
  }

 Asteroids.Util.prototype.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
 
 Asteroid.prototype.draw = function (ctx) {
	 var img = new Image();
	 img.src = this.imgSrc;
     ctx.save();
     ctx.translate(this.pos[0], this.pos[1]);
     ctx.rotate(this.angle);
     ctx.drawImage(img, -40, -40, 80, 80);
     ctx.restore();
   }
})();