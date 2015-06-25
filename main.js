var SLIDESHOW_FADE_TIME = 500;
var SLIDESHOW_STAY_TIME = 5000;
var ITEM_FADE_TIME = 500;
var HELP_RESET_TIME = 3000;
var TYPEWRITER_DELAY = 200;

var soundEnabled = false;

var FACTS = [
	'Umeå grundades år 1622 av Gustav II Adolf.',
	'Umeå är sveriges tolfte största tätort.',
	'I slutet av 1980-talet marknadsfördes Umeå som Norrlands huvudstad.',
	'Det bor runt 120.000 människor i Umeå kommun.',
	'Det finns 58 stadsdelar och 15 grönområden i Umeå.',
	'Umeås närmaste stad är Vasa i Finland.'
];

$(document).ready(function() {
	var cmdline = $('#search-bar');
	cmdline.css('font-size', cmdline.height() * 0.9 + 'px');
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
		if(words[1] == 'fact') {
			var fact = $('#item-fact');
			placeAtRandom(fact);
			fact.text('').show();
			typewriterEffect(fact, FACTS[randomInt(0, FACTS.length)]);
		} else {
			setElemShown($('#item-' + words[1]), true);
		}
		break;
	case 'unload':
		setElemShown($('#item-' + words[1]), false);
		break;
	case 'help':
		showElemFor($('#item-help'), HELP_RESET_TIME);
		break;
	case 'git':
		if(words[1] == 'rekt') {
			var elem = $('#item-rekt');
			showElemFor(elem, 4000);
			centerElement(elem);
		}
		break;
	case 'enable':
		if(words[1] == 'sound') {
			soundEnabled = true;
		}
		break;
	case 'sneaky':
		if(words[1] == 'peaky') {
			showElemFor($('#item-secrethelp'), HELP_RESET_TIME);
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

var elemZValue = 0;
function placeAtRandom(elem) {
	elem.css({
		'left': randomInt(0, $(document).width() - elem.width()) + 'px',
		'top': randomInt(0, $(document).height() - elem.height()) + 'px',
		'z-index': ++elemZValue
	});
}

function showElemFor(elem, time) {
	elem.css('z-index', ++elemZValue).show(ITEM_FADE_TIME, function() {
		setTimeout(function() {
			elem.hide(ITEM_FADE_TIME);
		}, time);
	});
}

function setElemShown(elem, shown) {
	function showAtRandom() {
		placeAtRandom(elem);
		elem.show(ITEM_FADE_TIME);
	}
	
	if(shown) {
		if(elem.is(':visible')) {
			// hide first, then show
			elem.hide(ITEM_FADE_TIME, showAtRandom);
		} else {
			showAtRandom();
		}
	} else {
		elem.hide(ITEM_FADE_TIME);
	}
}

function typewriterEffect(elem, text) {
	var index = 0;
	function addLetter() {
		if(++index > text.length) {
			// slice takes one less than index
			playSoundEffect('zzzz.mp3');
			return;
		}
		
		var delay;
		if(/\s/.test(text[index])) {
			delay = 0;
		} else {
			delay = TYPEWRITER_DELAY;
		}
		
		playSoundEffect('beep.mp3');
		elem.text(text.slice(0, index));
		
		setTimeout(addLetter, TYPEWRITER_DELAY);
	}
	addLetter();
}

var soundEffects = {};
function playSoundEffect(name) {
	if(!soundEnabled) {
		return;
	}
	if(!soundEffects[name]) {
		soundEffects[name] = new Audio('snd/' + name);
	}
	soundEffects[name].play();
}

function randomInt(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}