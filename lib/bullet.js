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
	this.imgSrc = "lib/bullet.png";
	this.size = 20;
  }
 


 Asteroids.Util.prototype.inherits(Bullet, Asteroids.MovingObject);
 
 Bullet.prototype.draw = function (ctx) {
	var obj = this;
	var img = new Image();
	img.src = this.imgSrc;
	var load = false;
	img.onload = function () {
		load = true
	  ctx.drawImage(img, obj.pos[0], obj.pos[1], obj.size, obj.size);
	};
	
	}
})();