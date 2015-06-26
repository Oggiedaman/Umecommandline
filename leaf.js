var IMAGE_PATH = 'img/björklöv.png';

function rainSprites() {
	var canvas = fullscreenCanvas();
	var ctx = canvas.getContext('2d');
	var image = document.createElement('img');
	
	image.src = IMAGE_PATH;
	image.style['display'] = 'none';
	
	$(document.body).append(image);
	$(document.body).append(canvas);
	
	var spriteList = new SpriteList(100, image, canvas.width, canvas.height);
	
	setInterval(function() {
		spriteList.update(0.1);
		spriteList.draw(ctx);
	}, 100);
}

function fullscreenCanvas() {
	var canvas = document.createElement('canvas');
	
	$(canvas).css({
		'position': 'absolute',
		'top': '0',
		'left': '0'
	});
	
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	
	return canvas;
}

function SpriteList(count, image, w, h) {
	this.image = image;
	this.sprites = [];
	
	this.width = w;
	this.height = h;
	
	for(var i = 0; i < count; i++) {
		this.addRandom();
	}
}

SpriteList.prototype.addRandom = function() {
	this.sprites.push({
		x: Math.random() * this.width,
		y: 0,
		angle: Math.random() * Math.PI,
		size: 50 + Math.random() * 50,
		grav: Math.random() * 800
	});
}

SpriteList.prototype.update = function(dt) {
	for(var i = 0; i < this.sprites.length; i++) {
		var s = this.sprites[i];
		
		s.x = s.x % this.width;
		s.y = (s.y + dt * s.grav) % this.height;
		
		s.angle += Math.PI * dt;
	}
}

SpriteList.prototype.draw = function(ctx) {
	ctx.clearRect(0, 0, this.width, this.height);
	for(var i = 0; i < this.sprites.length; i++) {
		this.drawSprite(ctx, this.sprites[i]);
	}
}

SpriteList.prototype.drawSprite = function(ctx, sprite) {
	ctx.save();
	ctx.translate(sprite.x, sprite.y);
	ctx.rotate(sprite.angle);
	ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, sprite.size, sprite.size);
	ctx.restore();
}