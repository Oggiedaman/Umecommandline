var SLIDESHOW_FADE_TIME = 2000;
var ITEM_FADE_TIME = 500;
var SLIDESHOW_STAY_TIME = 10000
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
		setVisibleItem(words[1], true);
		break;
	case 'unload':
		setVisibleItem(words[1], false);
		break;
	case 'help':
		setVisibleItem('help', true, function() {
			setTimeout(function() {
				setVisibleItem('help', false);
			}, HELP_RESET_TIME);
		});
		break;
	case 'git':
		if(words[1] == 'rekt') {
			setVisibleItem('rekt', true);
		}
	}
}

function startSlideshow(imgDiv) {
	var index = 0;
	var images = $(imgDiv).children('img');
	
	images.hide();
	function fadeImage() {
		index = (index + 1) % images.length;
		
		$(images[index]).fadeIn(SLIDESHOW_FADE_TIME / 2, function() {
			setTimeout(function() {
				$(images[index]).fadeOut(SLIDESHOW_FADE_TIME / 2, fadeImage);
			}, SLIDESHOW_STAY_TIME);
		});
	}
	fadeImage();
}

function setVisibleItem(name, visible, callback) {
	if(visible) {
		$('#item-' + name).show(ITEM_FADE_TIME, callback);
	} else {
		$('#item-' + name).hide(ITEM_FADE_TIME, callback);
	}
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}