(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }


  var Ship = Asteroids.Ship = function(passedHash){
  	var COLOR = 'green';
  	var RADIUS = 40;
  	this.color = COLOR;
  	this.radius = RADIUS;
  	this.pos = passedHash['pos'];
  	this.vel = [0,0];
  	this.game = passedHash['game'];
	this.isWrappable = true;
	this.imgSrc = "lib/ship.png"
	this.size = 70;
	this.angle = 0;
	this.maxSpeed = 1000;
  }
  
  
  // Ship.prototype.relocate = function (game) {
 // 	  debugger;
 // 	  this.pos = game.randomPosition();
 // 	  this.vel = [0,0]
 //  };
 
 // Ship.prototype.collidedWith = function (otherObject) {
 //  var game = this.game;
 //  if (otherObject instanceof Asteroids.Asteroid){
 // 	  this.relocate();
 // 	  game.remove(otherObject)
 //  }
 // };
  
  Asteroids.Util.prototype.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.draw = function (ctx) {
	 	var img = new Image();
	 	img.src = this.imgSrc;
        ctx.save();
        ctx.translate(this.pos[0], this.pos[1]);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -40, -40, 80, 80);
        ctx.restore();
      }
	  
  Ship.prototype.fireBullet = function (game) {
	  var direction = Asteroids.Util.prototype.unitVec(this.angle)
      var bullet = new Asteroids.Bullet({ pos: [game.ship.pos[0], game.ship.pos[1]], game: game, 
		  vel: [direction[0]*10, direction[1]*10] });
	  game.allObjects.push(bullet);
  };
	

 })();