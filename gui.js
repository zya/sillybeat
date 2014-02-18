function guiinit(global, spinners){
	//spinner params
	
	var params = {

		lines: 17, // The number of lines to draw
  		length: 0, // The length of each line
  		width: 2, // The line thickness
  		radius: 10, // The radius of the inner circle
  		corners: 1, // Corner roundness (0..1)
  		rotate: 30, // The rotation offset
  		direction: 1, // 1: clockwise, -1: counterclockwise
  		color: '#000', // #rgb or #rrggbb or array of colors
  		speed: 1.4, // Rounds per second
  		trail: 54, // Afterglow percentage
  		shadow: false, // Whether to render a shadow
  		hwaccel: false, // Whether to use hardware acceleration
  		className: 'spinner', // The CSS class to assign to the spinner
  		zIndex: 2e9, // The z-index (defaults to 2000000000)
  		top: 'auto', // Top position relative to parent in px
  		left: 'auto' // Left position relative to parent in px

	};
	var spinnerTargetKick = document.getElementById('spinnerTargetKick');
	spinners.kickSpinner = new Spinner(params).spin(spinnerTargetKick);

	var spinnerTargetSnare = document.getElementById('spinnerTargetSnare');
	spinners.snareSpinner = new Spinner(params).spin(spinnerTargetSnare);

	var spinnerTargetHihat = document.getElementById('spinnerTargetHihat');
	spinners.hatSpinner = new Spinner(params).spin(spinnerTargetHihat);

	var spinnerTargetPerc = document.getElementById('spinnerTargetPerc');
	spinners.percSpinner = new Spinner(params).spin(spinnerTargetPerc);

	var spinnerTargetSamp = document.getElementById('spinnerTargetSamp');
	spinners.sampSpinner = new Spinner(params).spin(spinnerTargetSamp);

	//spinner.stop();

	$('#newSounds').click(function(){
		$(this).animate({
			
		},1000);
	});

	$('#play').click(function(){
		if(global.isPlaying){
			$(this).attr('class','glyphicon glyphicon-play butt');
			global.isPlaying = false;
		}else {
			$(this).attr('class','glyphicon glyphicon-pause butt');
			global.isPlaying = true;
		}
	});
}

