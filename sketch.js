// clock -- E.Edwards :: @orangeDinosaurDisco
// 2020. 
// mini-task to assist p5.js learnings

// -- cmd + f :: search
// -- TODO :: TODO List
// -- ✓ :: Done



function preload() {
	arialFont = loadFont("assets/Arial Bold.ttf");

}

let canvas;

let numBlock;
let midX;
let midY;
let colVal = [];
let blockWidth;
let blockStep;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('z-index', '-1');
	// how do I make it reactive to window size 
	midX = windowWidth / 2;
	midY = windowHeight / 2;
	for (let i = 0; i < 13; i++) { // setup static random colour values for each block

		colVal[i] = random(i, 255);

	}
	rectMode(CENTER);
}


function draw() {

	background(180, 80, 90);

	let hr = hour();
	let min = minute();
	let sec = second();
	let tensPos;


	blockWidth = windowWidth / 10;
	blockStep = blockWidth / 2;

	push();
	translate(0, windowHeight / 2);
	for (let i = 0; i < 10; i++) {

		blockInfo(i, blockWidth * i, 0);
		if (i < 6) {
			tensPos = i * blockWidth; // TODO multiplier dynamic ✓
			// console.log(tensPos);
		}
	}
	pop();

	push();
	translate(0, windowHeight / 2);
	for (let i = 0; i < 10; i++) {
		digit(i);
	}
	pop();

	push();
	translate(blockStep, windowHeight / 2);
	secondsCounter(sec, tensPos);
	minutesCounter(min, tensPos);
	hoursCounter(hr, tensPos);
	pop();

	// -- font and clock 
	strokeCap(ROUND);
	strokeJoin(ROUND);
	stroke(0);

	textFont(arialFont);
	textSize(60);
	textAlign(LEFT, TOP);
	let red = 10;
	fill(255);
	text(hr + " | " + min + " | " + sec, 100, 100);

}

function hoursCounter(hr, tensPos) {
	let rectHr;
	let tensHr = 0;

	if (hr < 10) {
		rectHr = map(hr, 0, 9, 0, numBlock.x);
		tensHr = 0;
	} else if (hr < 20) {
		rectHr = map(hr, 10, 19, 0, numBlock.x);
		tensHr = 1;
	} else if (hr < 30) {
		rectHr = map(hr, 20, 29, 0, numBlock.x);
		tensHr = 2;
	} else if (hr < 40) {
		rectHr = map(hr, 30, 39, 0, numBlock.x);
		tensHr = 3;
	} else if (hr < 50) {
		rectHr = map(hr, 40, 49, 0, numBlock.x);
		tensHr = 4;
	} else if (hr < 60) {
		rectHr = map(hr, 50, 59, 0, numBlock.x);
		tensHr = 5;
	}

	fill(60, 0, 0, 80);
	// -- Seconds' noughts position 
	rect(rectHr, 0, blockWidth * 0.8, windowHeight);

	// -- Seconds' tens position
	fill(60, 0, 0, 80);
	tensHr = map(tensHr, 0, 5, 0, tensPos)
	rect(tensHr, 0, blockWidth, windowHeight);


	// TODO REACTIVE :: Rect width needs to be dynamic 

}

function minutesCounter(min, tensPos) {
	fill(50, 200, 60, 180);
	console.log(min);

	let rectMin;
	let tensMin = 0;

	if (min < 10) {
		rectMin = map(min, 0, 9, 0, numBlock.x);
		tensMin = 0;
	} else if (min < 20) {
		rectMin = map(min, 10, 19, 0, numBlock.x);
		tensMin = 1;
	} else if (min < 30) {
		rectMin = map(min, 20, 29, 0, numBlock.x);
		tensMin = 2;
	} else if (min < 40) {
		rectMin = map(min, 30, 39, 0, numBlock.x);
		tensMin = 3;
	} else if (min < 50) {
		rectMin = map(min, 40, 49, 0, numBlock.x);
		tensMin = 4;
	} else if (min < 60) {
		rectMin = map(min, 50, 59, 0, numBlock.x);
		tensMin = 5;
	}

	// // -- Seconds' noughts position 
	fill(255, 0, 0, 120);
	rect(rectMin, 0, blockWidth * 0.6, windowHeight); // TODO  yPos in relation to num/also dynamic
	// // -- Seconds' tens position

	fill(255, 0, 0, 120);
	tensMin = map(tensMin, 0, 5, 0, tensPos);
	rect(tensMin, 0, blockWidth * 0.8, windowHeight);

}

function secondsCounter(sec, tensPos) {
	let rectSec;
	let tens = 0;

	if (sec < 10) {
		rectSec = map(sec, 0, 9, 0, numBlock.x);
		tens = 0;
	} else if (sec < 20) {
		rectSec = map(sec, 10, 19, 0, numBlock.x);
		tens = 1;
	} else if (sec < 30) {
		rectSec = map(sec, 20, 29, 0, numBlock.x);
		tens = 2;
	} else if (sec < 40) {
		rectSec = map(sec, 30, 39, 0, numBlock.x);
		tens = 3;
	} else if (sec < 50) {
		rectSec = map(sec, 40, 49, 0, numBlock.x);
		tens = 4;
	} else if (sec < 60) {
		rectSec = map(sec, 50, 59, 0, numBlock.x);
		tens = 5;
	}

	fill(200, 0, 0, 160);
	// -- Seconds' noughts position 
	rect(rectSec, 0, blockWidth * 0.2, windowHeight);

	// -- Seconds' tens position
	fill(200, 0, 0, 160);
	tens = map(tens, 0, 5, 0, tensPos)
	rect(tens, 0, blockWidth * 0.4, windowHeight);


	// TODO REACTIVE :: Rect width needs to be dynamic 

}

// -- Number grid position and colour
function blockInfo(indexVal, xPos, yPos) {

	numBlock = {
		index: indexVal,
		x: xPos, //position : (xPos, yPos) - ? why can't this be called for rect...
		y: yPos,
		col: color(colVal[indexVal])
	};
	fill(numBlock.col, 100)
	// rectMode(CENTER);
	rect(numBlock.x + blockStep, numBlock.y, blockWidth, windowHeight);

}

function digit(num) {

	let numPosX = (blockWidth * num);
	let numPosY = 0 - windowHeight * 0.007; // multiplier to compensate for imbalance between median:capHeight:baseline
	fill(255 - colVal[num], 255);
	textFont(arialFont);
	textSize(60);
	textAlign(CENTER, CENTER);
	text(num, numPosX + blockStep, numPosY);


}