$(window).ready(function() {
	$('.hidden-item').hide();
});

function runCommand(cmd) {
	var words = cmd.split(/\s/);
	$(words[0]).show(500);
}