$(window).ready(function() {
	$('.hidden-item').hide();
	fixTextSize();
	
	$('#search-bar').keyup(function(evt) {
		if(evt.key == 'Enter' || evt.keyCode == 13) {
			runCommand($(this).val());
			$(this).val('');
		}
	});
});

function runCommand(cmd) {
	var words = cmd.split(/\./);
	
	words = words.map(function(s) {
		return s.toLowerCase();
	});
	
	switch(words[0]) {
	case 'load':
		$('#item-' + words[1]).show(500);
		break;
	case 'unload':
		$('#item-' + words[1]).hide(500);
		break;
	}
}

function startSlideshow(imgNames) {
	var img = $('slideshow-img');
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}