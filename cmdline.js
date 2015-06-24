$(window).ready(function() {
	$('.hidden-item').hide();
	fixTextSize();
});

function runCommand(cmd) {
	var words = cmd.split(/\s/);
	$(words[0]).show(500);
}

function fixTextSize() {
	var elem = $('#search-bar');
	elem.css('font-size', elem.height() * 0.9 + 'px');
}