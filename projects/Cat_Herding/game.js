//creating the canvas
var canvas = document.getElementById("canvas");
canvas.width = 512;
canvas.height = 480;
var ctx = canvas.getContext("2d");


//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "images/bg.gif";

//player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function(){
	playerReady = true;
};
playerImage.src = "images/player.png";

//cat image
var catReady = false;
var catImage = new Image();
catImage.onload = function(){
	catReady = true;
};
catImage.src = "images/cat.png";

//adding another cat
var cat2Ready = false;
var cat2Image = new Image();
cat2Image.onload = function(){
	cat2Ready = true;
};
cat2Image.src = "images/cat2.png";

//Game objects
var player = {
	speed: 256, //movement in pixels per second
	x: canvas.width/2,
	y: canvas.height/2
};

var cat = {//numbers should keep cats from being cut off on the edge
	x: 32 + (Math.random() * (canvas.width - 64)),
	y: 32 + (Math.random() * (canvas.height - 64)),
	speed: 192,
	vx: 48,
	vy: 48
};

var cat2 = {
	x: 32 + (Math.random() * (canvas.width - 64)),
	y: 32 + (Math.random() * (canvas.height - 64)),
	speed: 192,
	vx: 48,
	vy: 48
};

var catsCaught = 0;

//keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
	delete keysDown[e.keyCode];
}, false);

function sprite(){
	if(38 in keysDown){
		ctx.drawImage(
			playerImage, 
			32, 0, 32, 64,
			player.x, player.y, 32, 64);
		}
	else if(40 in keysDown){//down
		ctx.drawImage(
			playerImage, 
			0, 0, 32, 64,
			player.x, player.y, 32, 64);
	}
	else if (37 in keysDown) {//left
		ctx.drawImage(
			playerImage, 
			64, 0, 32, 64,
			player.x, player.y, 32, 64);
	}
	else if (39 in keysDown) {//right
		ctx.drawImage(
			playerImage, 
			96, 0, 32, 64,
			player.x, player.y, 32, 64);
	}
	else {
		ctx.drawImage(
		playerImage, 
		0, 0, 32, 64,
		player.x, player.y, 32, 64);
	}
};


function animate(){
	cat.x += (cat.vx / cat.speed);
	cat.y += (cat.vy / cat.speed);
	
	//bounce off walls
	if (cat.x + 32 > canvas.width || cat.x < 0) {
		cat.vx *= -1;
	};
	if (cat.y + 32 > canvas.height || cat.y < 0) {
		cat.vy *= -1;
	};

	cat2.x -= (cat2.vx / cat2.speed);
	cat2.y += (cat2.vy / cat2.speed);
	if (cat2.x + 32 > canvas.width || cat2.x < 0) {
		cat2.vx *= -1;
	};
	if (cat2.y + 32 > canvas.height || cat2.y < 0) {
		cat2.vy *= -1;
	};

	//avoid player
	if (player.x <= (cat.x + 33)
		&& cat.x <= (player.x +33)
		&& player.y <= (cat.y + 33)
		&& cat.y <= (player.y + 64)) {
			cat.vy = (cat.vy * (-1));
			cat.vx = (cat.vx * (-1));
	};
	if (player.x <= (cat2.x + 33)
		&& cat2.x <= (player.x +33)
		&& player.y <= (cat2.y + 33)
		&& cat2.y <= (player.y + 64)) {
			cat2.vy *= -1;
			cat2.vx *= -1;
	};	
};

//update game objects
var update = function(modifier){
	if(38 in keysDown){ //38 = up button
		player.y -= player.speed * modifier;
		//but what if the player goes off screen?
		if(player.y <0){
			player.y =0;
		}
	}
	if(40 in keysDown){//down
		player.y += player.speed * modifier;
		if (player.y > 416) {
			player.y =416;
		};
	}
	if (37 in keysDown) {//left
		player.x -= player.speed * modifier;
		if (player.x < 0) {
			player.x =0;
		};
	}
	if (39 in keysDown) {//right
		player.x += player.speed *modifier;
		if (player.x > 480) {
			player.x = 480;
		};
	}

	//check if they are touching/caught
	if (
		player.x <= (cat.x + 32)
		&& cat.x <= (player.x +32)
		&& player.y <= (cat.y + 32)
		&& cat.y <= (player.y + 63)
		) {//only this cat's position is randomized if caught
			cat.x = 32 + (Math.random() * (canvas.width - 64));
			cat.y = 32 + (Math.random() *(canvas.height - 64));
			++catsCaught;
		}
	else if	(
		player.x <= (cat2.x + 32)
		&& cat2.x <= (player.x +32)
		&& player.y <= (cat2.y + 32)
		&& cat2.y <= (player.y + 63)
		) {
			cat2.x = 32 + (Math.random() * (canvas.width - 64));
			cat2.y = 32 + (Math.random() *(canvas.height - 64));
			++catsCaught;
		}
};

//draws everything
var render = function(){
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0, 512, 480);
	}

	if (playerReady) {

		sprite();
	}

	if (catReady) {
		ctx.drawImage(catImage, cat.x, cat.y);
	}
	if(cat2Ready){
		ctx.drawImage(cat2Image, cat2.x, cat2.y)
	}

	//score
	var score = document.getElementById("caughtBox");
	score.innerHTML="Cats captured: " + catsCaught;
};


//pop up message
var popUp = function () {
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black"; 
	ctx.fillRect(90, 140, 310, 100);
	ctx.beginPath();
	ctx.moveTo(90, 140);
	ctx.lineTo(400,140);
	ctx.lineTo(400, 240);
	ctx.lineTo(90, 240);
	ctx.lineTo(90, 140);
	ctx.lineWidth = 5;
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.font = "bold " + 40 + "pt Courier ";
	ctx.fillText("GAME OVER", 100, 200);
};

//end the game
var time = 0;
var end = function(mod){
	time += mod;
	var timeLeft =(10 - time).toFixed(1);
	var tBox = document.getElementById('timeBox');//get reference to <p>
	tBox.innerHTML ="Time left: " + timeLeft;//insert this into <p>
	if (timeLeft <= 0) {
		clearInterval(interval);
		popUp();
	};
};

//the main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta/1000);
	render();
	sprite();
	end(delta/1000);
	animate();
	then = now;
};

//playing the game
var then = Date.now();
var interval = setInterval(main, 1); //executes as fast a possible