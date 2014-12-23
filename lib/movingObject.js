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
	this.imgSrc = "";
	this.size = 75;
	this.angle = 0;
	this.load  = false
  };

  MovingObject.prototype.draw = function(ctx){
  		var obj = this;
		var img = new Image();
		if (obj instanceof Asteroids.Ship) {
			ctx.save();
		    ctx.translate(obj.pos[0], obj.pos[1]);
		    ctx.rotate(obj.angle);
			img.src = this.imgSrc;
		    ctx.drawImage(img, -20, -20, 50, 50);
		    ctx.restore();
		}else{
			var img = new Image();
			var load = false;
	  		img.onload = function () {
				load = true
	  		  ctx.drawImage(img, obj.pos[0], obj.pos[1], obj.size, obj.size);

	  		};
	  		img.src = this.imgSrc;
		}
		
		
  };

  MovingObject.prototype.move = function(ctx) {
	
    this.pos = this.game.wrap(this, this.pos);
	// if (this instanceof Asteroids.Ship){
// 	    this.pos[0] += direction[0];
// 	    this.pos[1] += direction[1];
// 	}else{
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	// }
    
    
  };
  
  MovingObject.prototype.relocate = function (game) {
	  this.pos = game.randomPosition();
	  this.vel = [0,0]
	  this.angle = 0;
  };
  
  MovingObject.prototype.power = function(impulse){
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
  };
  
  MovingObject.prototype.fireBullet = function (game) {
	  var direction = Asteroids.Util.prototype.unitVec(this.angle)
      var bullet = new Asteroids.Bullet({ pos: [game.ship.pos[0] + 25, game.ship.pos[1] + 25 ], game: game, 
		  vel: [direction[0]*10, direction[1]*10] });
	  game.allObjects.push(bullet);
  };
  
  MovingObject.prototype.left = function () {
  	this.angle -= (Math.PI)/4
  };
  
  MovingObject.prototype.right = function () {
  	this.angle += (Math.PI)/4
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
  var x1 = this.pos[0];
  var x2 = otherObject.pos[0];
  var y1 = this.pos[1];
  var y2 = otherObject.pos[1];
  var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  if (dist < (this.size)) {
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
			  game.lives--;
	  	  }else if (otherObject instanceof Asteroids.Bullet){
	  		  game.remove(this);
	  		  game.remove(otherObject);
			  game.score += 10;
	  	  }	
	  }
  };
})();