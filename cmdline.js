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
	var words = cmd.split(/\s/);
	
	switch(words[0]) {
	case 'show':
		$('#item-' + words[1]).show(500);
		break;
	case 'hide':
		$('#item-' + words[1]).hide(500);
		break;
	}
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}