var IMAGE_PATH = 'img/björklöv.png';

$(document).ready(function() {
	var canvas = fullscreenCanvas();
	var ctx = canvas.getContext('2d');
	var image = document.createElement('img');
	
	image.src = IMAGE_PATH;
	
	$(document.body).append(image);
	$(document.body).append(canvas);
	
	var spriteList = new SpriteList(10, image, canvas.width, canvas.height);
	
	setInterval(function() {
		spriteList.update(0.1);
		spriteList.draw(ctx);
	}, 100);
});

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

Sprite.image = null;

function Sprite(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.angle = 0;
}

Sprite.prototype.update = function(dt) {
	this.y += 100 * dt;
	
	this.angle += dt * Math.PI;
}

Sprite.prototype.draw = function(ctx, img) {
	ctx.save();
	ctx.translate(this.x - img.width / 2, this.y - img.height / 2);
	ctx.rotate(this.angle);
	ctx.drawImage(img, 0, 0, this.size, this.size);
	ctx.restore();
}

function SpriteList(count, image, w, h) {
	this.image = image;
	this.sprites = [];
	
	console.log(image);
	
	this.width = w;
	this.height = h;
	
	for(var i = 0; i < count; i++) {
		this.sprites.push(new Sprite(Math.random() * this.width, 0, Math.random() * 100));
	}
}

SpriteList.prototype.update = function(dt) {
	for(var i = 0; i < this.sprites.length; i++) {
		var s = this.sprites[i];
		s.update(dt);
		s.x = s.x % this.width;
		s.y = s.y % this.height;
	}
}

SpriteList.prototype.draw = function(ctx) {
	ctx.clearRect(0, 0, this.width, this.height);
	for(var i = 0; i < this.sprites.length; i++) {
		this.sprites[i].draw(ctx, this.image);
	}
}