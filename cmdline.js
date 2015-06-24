var SLIDESHOW_FADE_TIME = 2000;
var ITEM_FADE_TIME = 500;

$(document).ready(function() {
	$('.hidden-item').hide();
	fixTextSize();
	
	$('#search-bar').keyup(function(evt) {
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
		$('#item-' + words[1]).show(ITEM_FADE_TIME);
		break;
	case 'help':
		$('#item-help').show(ITEM_FADE_TIME);
		break;
	case 'unload':
		$('#item-' + words[1]).hide(ITEM_FADE_TIME);
		break;
	}
}

function startSlideshow(imgDiv) {
	var index = 0;
	var images = $(imgDiv).children('img');
	
	images.hide();
	function fadeImage() {
		index = (index + 1) % images.length;
		
		$(images[index]).fadeIn(SLIDESHOW_FADE_TIME / 2, function() {
			$(images[index]).fadeOut(SLIDESHOW_FADE_TIME / 2, fadeImage);
		});
	}
	fadeImage();
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}