function guiinit(global, spinners, startcallback, stopcallback, soundrefreshcallback, patternsrefreshcallback, nodes,recordstart, recordstop){
	//spinner params

	var params = {

		lines: 17, // The number of lines to draw
  		length: 0, // The length of each line
  		width: 2, // The line thickness
  		radius: 10, // The radius of the inner circle
  		corners: 1, // Corner roundness (0..1)
  		rotate: 30, // The rotation offset
  		direction: 1, // 1: clockwise, -1: counterclockwise
  		color: '#fff', // #rgb or #rrggbb or array of colors
  		speed: 1.2, // Rounds per second
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
		soundrefreshcallback();
		getPics();
		spinners.kickSpinner = new Spinner(params).spin(spinnerTargetKick);
		spinners.snareSpinner = new Spinner(params).spin(spinnerTargetSnare);
		spinners.hatSpinner = new Spinner(params).spin(spinnerTargetHihat);
		spinners.percSpinner = new Spinner(params).spin(spinnerTargetPerc);
		spinners.sampSpinner = new Spinner(params).spin(spinnerTargetSamp);

	});

	$('#newPatterns').click(function(){
		patternsrefreshcallback();
		getPics();
	});

	$('#play').click(function(){
		if(global.isPlaying){
			$(this).attr('class','glyphicon glyphicon-play butt');
			global.isPlaying = false;
			stopcallback();

		}else {
			$(this).attr('class','glyphicon glyphicon-pause butt');
			global.isPlaying = true;
			startcallback();
		}
	});

	$('.vol').click(function(e){
		e.preventDefault();
		if($(this).attr('class') === 'glyphicon glyphicon-volume-up vol'){
			$(this).attr('class','glyphicon glyphicon-volume-off vol');
			var id = $(this).attr('id');
			switch(id){
				case 'kickvol':
					nodes.kick.gain.value = 0;

				break;

				case'snarevol':
					nodes.snare.gain.value = 0;
				break;

				case 'hatvol':
					nodes.hat.gain.value = 0;
				break;

				case'percvol':
					nodes.perc.gain.value = 0;

				break;

				case'sampvol':
					nodes.samp.gain.value = 0;
				break;
			}
		}else{
			$(this).attr('class','glyphicon glyphicon-volume-up vol');
			var id = $(this).attr('id');
			switch(id){
				case 'kickvol':
					nodes.kick.gain.value = 1;

				break;

				case'snarevol':
					nodes.snare.gain.value = 0.8;
				break;

				case 'hatvol':
					nodes.hat.gain.value = 0.4;
				break;

				case'percvol':
					nodes.perc.gain.value = 0.8;

				break;

				case'sampvol':
					nodes.samp.gain.value = 1.2;
				break;
			}
		}
		
	});

	$('#record').click(function(){
		
		if($(this).attr('class') === 'glyphicon glyphicon-record butt'){
			recordstart();
			$(this).attr('class','glyphicon glyphicon-stop butt');
		}else if($(this).attr('class') === 'glyphicon glyphicon-stop butt'){
			recordstop();
			$(this).attr('class','glyphicon glyphicon-record butt');
		}
		
	});

	function setBackGround(e){
		
		var random = Math.round(Math.floor(Math.random() * e.response.length));

		if(e.response[random].type === 'photo'){

			$('#back').css({

				background: "url('" + e.response[random].photos[0].original_size.url + "')",
                'background-size': "5% 5%",
                opacity: '0.25'

			});
		
		}else{

			setBackGround();
		}

	}
	

	function getPics(){

		$.ajax({
	        url: 'http://api.tumblr.com/v2/tagged?tag=gif&api_key=cIBh1bpFkHI2pyWmGDV3YPOlErsRgNCtsJ715Pl09uMKEY2kOK&limit=40',
	        success: setBackGround,
	        dataType: 'jsonp'
   		 });

	}

	getPics();

	$('#questionmark').click(function(){

		var state = String($('#desc').css('visibility'));
		console.log(state);
		
		if(state === 'hidden'){

			$('#desc').css('visibility','visible')

		}else{

			$('#desc').css('visibility','hidden')
		}

	});



}

