(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var Game = Asteroids.Game = function () {

    NUM_ASTEROIDS = 15;
    DIM_X = 1000;
    DIM_Y = 700;
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.numAst = NUM_ASTEROIDS;
    this.asteroids = this.addAsteroids();
    this.ship = this.addShip();
	this.allObjects = this.allObjects();
	this.score = 0;
	this.lives = 5;
	this.gameOver = false;
  }
  
  Game.prototype.addAsteroids = function () {
    var asteroids = [];
	    for(var i = 0; i < this.numAst; i++){
	      asteroids.push(new Asteroids.Asteroid({ pos: this.randomPosition(), game: this}));
	    }
    
    return asteroids;
  }

  Game.prototype.addShip = function() {
    var ship = new Asteroids.Ship({ pos: this.randomPosition(), game: this });
    return ship;
  };
  
  Game.prototype.randomPosition = function() {
    var ast_pos = [Math.random() * this.dim_x, Math.random() * this.dim_y];
    return ast_pos;
  }
  
  Game.prototype.moveObjects = function(ctx){
    for (var i = 0; i < this.allObjects.length; i++) {
      this.allObjects[i].move(ctx);
	  this.checkCollisions();
    }
  }
  
  Game.prototype.draw = function(ctx) {
	  
	
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
	if (this.gameOver){
		ctx.font="100px Verdana";
		ctx.fillStyle = 'yellow'
		ctx.fillText("GAME OVER!",150,300);
		ctx.font="50px Verdana";
		ctx.fillText("Press escape to play again!",150,400);
		return;
	}
	//this.ship.draw(ctx)
    for (var i = 0; i < this.allObjects.length; i++) {
		ctx.font="30px Verdana";
		ctx.fillStyle = 'yellow'
		ctx.fillText("Score:",10,50);
		ctx.fillText(this.score,110,50)
		ctx.fillText("Lives:",10,90);
		ctx.fillText(this.lives,110,90)
      this.allObjects[i].draw(ctx);
    }

  }

  
  Game.prototype.wrap = function(obj, pos) {
	if (obj.isWrappable){   
		if (pos[0] < 0){
	      pos[0] = this.dim_x;
	    } else if (pos[1] < 0) {
	      pos[1] = this.dim_y;
	    } else if (pos[0] > this.dim_x) {
	      pos[0] = 0;
	    } else if (pos[1] > this.dim_y) {
	      pos[1] = 0;
	    }
	}
    return pos;
  }
  
  Game.prototype.checkCollisions = function(){
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.allObjects.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.allObjects[j])) {
		  this.asteroids[i].collidedWith(this.allObjects[j]);
        }
      }
    }
  }
  
  
  Game.prototype.remove = function (object) {
  	// body...
	  if (object instanceof Asteroids.Asteroid || object instanceof Asteroids.Bullet) {
		  var index = this.allObjects.indexOf(object)
	  	  this.allObjects.splice(index,1)
			  if (object instanceof Asteroids.Asteroid){
				  var indexA = this.asteroids.indexOf(object)
			  	  this.asteroids.splice(indexA,1)
			  }
	  }
	 else if (object instanceof Asteroids.Ship) {
		  var index = this.allObjects.indexOf(object)
	  	  object.relocate(this)
	  }
  };
  
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
	this.checkGameOver();
  }
  
  Game.prototype.allObjects = function() {
	  
		  return this.asteroids.concat(this.ship)
	  	  //return this.asteroids
  }
  
  Game.prototype.checkGameOver = function () {
  	
	  if (this.lives <= 0) {
	  	this.gameOver = true
	  }
  };
  // Game.prototype.addBullets = function () {
 //      var bullet = new Asteroids.Bullet({ pos: this.randomPosition(), game: this, vel: this.ship.vel });
 //      return bullet;
 //  };

})();

// Asteriods = { Game: function() {} }


// Asteriods = { Game: function() {}, Bullet: function () {} }