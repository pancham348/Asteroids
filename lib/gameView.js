(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {}; 
  }
  
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };
  
  GameView.prototype.start = function() {
    setInterval(function () {
      this.game.draw(this.ctx);
    }, 30);
	  
    //setInterval(this.game.moveObjects.bind(this.game), 10);
    setInterval(this.game.step.bind(this.game), 10);
	this.bindKeyHandlers();
  }
  
  GameView.prototype.bindKeyHandlers = function () {
	  var game = this.game;
	  var ctx = this.ctx;
	  key('up',function (event) {
		  event.preventDefault();
		  game.ship.power([0,-0.5])
	  });

	  	key('down', function (event) {
			event.preventDefault();
			game.ship.power([0,0.5])
		});

	  	key('left', function (event) {
			event.preventDefault();
			game.ship.left();
			game.ship.power([-0.5,0])
		});

	  	key('right', function (event) {
			event.preventDefault();
			game.ship.right()
			game.ship.power([0.5,0])
		});
		
	  	key('space', function (event) {
			event.preventDefault();
			game.ship.fireBullet(game);
		});
  };
})();