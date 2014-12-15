// var asteroids = window.Asteroids || {}
(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var MovingObject = Asteroids.MovingObject = function(passedHash) {
    this.pos = passedHash['pos'];
    this.vel = passedHash['vel'];
    this.radius = passedHash['radius'];
    this.color = passedHash['color'];
    this.game = passedHash['game'];
	this.isWrappable = true;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
	
  };

  MovingObject.prototype.move = function(ctx) {
    this.pos = this.game.wrap(this, this.pos);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    
  };
  
  MovingObject.prototype.relocate = function (game) {
	  this.pos = game.randomPosition();
	  this.vel = [0,0]
  };
  
  MovingObject.prototype.power = function(impulse){
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
  };
  
  MovingObject.prototype.fireBullet = function (game) {
      var bullet = new Asteroids.Bullet({ pos: [game.ship.pos[0] + game.ship.radius, game.ship.pos[1] + game.ship.radius ], game: game, vel: [this.vel[0]+2, this.vel[1]+2] });
	  game.allObjects.push(bullet);
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
  var x1 = this.pos[0];
  var x2 = otherObject.pos[0];
  var y1 = this.pos[1];
  var y2 = otherObject.pos[1];
  var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  if (dist < (this.radius + otherObject.radius)) {
    return true;
  }  
  else{
    return false;
    }
  }
  
  MovingObject.prototype.collidedWith = function (otherObject) {
  	  var game = this.game;
	  if (this instanceof Asteroids.Asteroid) {
	  	  if (otherObject instanceof Asteroids.Ship){
	  		  otherObject.relocate(game);
	  		  game.remove(this)
	  	  }else if (otherObject instanceof Asteroids.Bullet){
	  		  game.remove(this);
	  		  game.remove(otherObject);
	  	  }	
	  }
  };
})();