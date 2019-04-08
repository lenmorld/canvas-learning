import chars from './chars';

const cv = document.querySelector("#canvas");
const ctx = cv.getContext("2d");

// full screen canvas
cv.height = window.innerHeight;
cv.width = window.innerWidth;

// characters
console.log(chars);

const font_size = 10;
const columns = cv.width/font_size;
// array of characters
const drops = [];

// X
// Y =1 coordinate of the drop, initially same
for(var x=0; x < columns; x++) {
	drops[x] = 1;
}

function draw() {
	// black BG with alpha to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, cv.width, cv.height);

	// text
	ctx.fillStyle = "#0F0";
	ctx.font = font_size + "px arial";
	
	// loop over drops
	for(var i=0; i< drops.length; i++) {
		// pick random char
		var text = chars[Math.floor(Math.random() * chars.length)];

		const x = i * font_size;
		const y = drops[i] * font_size;

		ctx.fillText(text, x, y);

		// reset: send drop back to top randomly after it
		// has crossed the screen

		// add randomness to the reset to make drops scattered on Y axis

		if (y > cv.height && Math.random() > 0.975) {
			drops[i] = 0;
		}
		// increment Y coordinate
		drops[i]++;
	}
}

// TODO: use requestAnimationFrame() instead
setInterval(draw, 33);