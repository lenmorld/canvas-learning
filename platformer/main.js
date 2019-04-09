// source
// http://www.somethinghitme.com/2013/01/09/creating-a-canvas-platformer-tutorial-part-one/comment-page-1/#comment-719870

(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

window.someVar = "lenny";

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext("2d");
// all measurements in pixels
var width = 500;
var height = 200;
var player = {
	x: width / 2,
	y: height - 5,
	width: 15,
	height: 15,
	speed: 3,
	velX: 0,
	velY: 0,
	jumping: false,
};
var friction = 0.3;		// higher means more movement per press/ less resistance
var gravity = 0.3;		// lower means "floatier"

var keys = [];

canvas.width = width;
canvas.height = height;

// setInterval(function() {
// 	// change pos
// 	player.x += 1;
// 	player.y -= 1;
// }, 100);

function update() {
	// check keys
	if (keys[38]) {
		// up
		if (!player.jumping) {
			player.jumping = true;

			// -6
			player.velY = -player.speed*2;
		}
	}
	
	if (keys[39]) {
		// right	
		if (player.velX < player.speed) {
			player.velX++;
		}	
	}

	if (keys[37]) {
		// left
		if (player.velX > -player.speed) {
			player.velX--;
		}			
	}

	// move player
	player.x += player.velX;
	player.y += player.velY;

	// 506 >= 500-(5) true
	// x = (500-5)

	// "horizontal boundary"
	// stop moving if player reaches edge
	// dont go outside of canvas
	if (player.x >= width-player.width) {
		player.x = width-player.width;
	} else if (player.x <= 0) {
		player.x = 0;
	}

	// "vertical boundary"
	if (player.y >= height-player.height) {
		player.y = height-player.height;
		player.jumping = false;
	}

	// apply friction(key-debounce)
	player.velX *= friction;

	// apply gravity
	player.velY += gravity;

	// draw player
	ctx.clearRect(0,0,width,height);	 // erase prev. rectangle in old pos
	ctx.fillStyle = "blue";
	ctx.fillRect(player.x, player.y,
		player.width, player.height);
		// loop
	requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
});

// start the animation loop!
window.addEventListener("load", function(){
	update();
 });

// alert(window.someVar);

