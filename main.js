var SLIDESHOW_FADE_TIME = 500;
var SLIDESHOW_STAY_TIME = 5000;
var ITEM_FADE_TIME = 500;
var HELP_RESET_TIME = 3000;

$(document).ready(function() {
	fixTextSize();
	
	var cmdline = $('#search-bar');
	cmdline.focus(function() {
		$(this).select();
	}).mouseup(function(evt) {
		evt.preventDefault();
	});
	cmdline.keyup(function(evt) {
		if(evt.key == 'Enter' || evt.keyCode == 13) {
			runCommand($(this).val());
			$(this).val('');
		}
	});
	
	startSlideshow($('.slideshow'));
});

function runCommand(cmd) {
	var words = cmd.split(/\./);
	
	words = words.map(function(s) {
		return s.toLowerCase();
	});
	
	switch(words[0]) {
	case 'load':
		setItemShown(words[1], true);
		break;
	case 'unload':
		setItemShown(words[1], false);
		break;
	case 'help':
		showItemFor('help', HELP_RESET_TIME);
		break;
	case 'git':
		if(words[1] == 'rekt') {
			var elem = $('#item-rekt');
			elem.show();
			centerElement(elem);
		}
	}
}

function startSlideshow(imgDiv) {
	var index = 0;
	var images = $(imgDiv).children('img');
	
	var width = images.width();
	
	images.css({
		'width': '0'
	});
	
	function changeImage() {
		var prevI = index;
		index = (index + 1) % images.length;
		
		$(images[prevI]).animate({
			'width': '0'
		}, SLIDESHOW_FADE_TIME);
		$(images[index]).animate({
			'width': width + 'px'
		}, SLIDESHOW_FADE_TIME,  function() {
			setTimeout(changeImage, SLIDESHOW_STAY_TIME);
		});
	}
	changeImage();
}

function centerElement(elem) {
	elem.css({
		'position': 'absolute',
		'left': (elem.parent().width() - elem.width()) / 2 + 'px',
		'top': (elem.parent().height() - elem.height()) / 2 + 'px'
	});
}

var itemZValue = 0;
function setItemShown(name, shown) {
	var item = $('#item-' + name);
	if(shown) {
		item.css({
			'left': randomInt(0, $(document).width() - item.width()) + 'px',
			'top': randomInt(0, $(document).height() - item.height()) + 'px',
			'z-index': ++itemZValue
		}).show(ITEM_FADE_TIME);
	} else {
		item.hide(ITEM_FADE_TIME);
	}
}

function showItemFor(name, time) {
	$('#item-' + name).css('z-index', ++itemZValue).show(ITEM_FADE_TIME, function() {
		setTimeout(function() {
			$('#item-' + name).hide(ITEM_FADE_TIME);
		}, time);
	});
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}

function randomInt(min, max) {
	console.log(min, max);
	return min + Math.floor(Math.random() * (max - min));
}