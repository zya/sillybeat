window.onload = function(){

	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

	//to handle cors
	var protocol = location.protocol;
	var cors_server = '//zya-cors.herokuapp.com/';
	cors_api_url = protocol + cors_server;
  	
	//global variables
	var context = new AudioContext();
	var reverb = new Reverb(context); //reverb
	var delay = new SlapDelay(context);
	
	var masterGain = context.createGain();
	var beatGain = context.createGain();
	var reverbGain = context.createGain();

	//individual gains
	var kickGain = context.createGain();
	var snareGain = context.createGain();
	var hatGain = context.createGain();
	var percGain = context.createGain();
	var sampGain = context.createGain();

	//volumes
	reverbGain.gain.value = 0.3;
	hatGain.gain.value = 0.4;
	snareGain.gain.value = 0.8;
	sampGain.gain.value = 0.5;
	delay.output.gain.value = 0.2;
	//connections
	kickGain.connect(beatGain);
	snareGain.connect(beatGain);
	hatGain.connect(beatGain);
	percGain.connect(beatGain);
	sampGain.connect(beatGain);
	sampGain.connect(delay.input);
	delay.output.connect(beatGain);
	beatGain.connect(reverb.convolver);
	reverb.convolver.connect(reverbGain);
	beatGain.connect(masterGain);
	reverbGain.connect(masterGain);
	masterGain.connect(context.destination);
	
	//global object
	var global = {
		isPlaying: false
	};

	var gains = {
		kick: kickGain,
		snare: snareGain,
		hat: hatGain,
		perc: percGain,
		samp: sampGain
	};

	var l; //loop
	
	//object that holds the spinner objects
	var spinners = {

		kickSpinner: null,
		snareSpinner: null,
		hatSpinner: null,
		percSpinner: null,
		sampSpinner: null

	};


	//initialize soundcloud sdk
	SC.initialize({
    	client_id : 'e553081039dc6507a7c3ebf6211e4590'
	});
	//init gui
	
	//generate search params - query,tags,durationfrom,durationto
	var kickParams = generateParameters("808 kick","",300, 20000);
	var snareParams = generateParameters("snare","",100,10000);
	var hatParams = generateParameters("hihat","",100,10000);
	var sampleParams = generateParameters("","",5000,100000);
	var percParams = generateParameters("percussion","",0,20000);
	
	//load the sounds
	var kick = new Sound(context,cors_api_url,kickParams,kickGain,function(){
		console.log('kick loaded');
		$('#kicklink').attr('href',kick.permalink);
		spinners.kickSpinner.stop();
	});
	
	var snare = new Sound(context,cors_api_url,snareParams,snareGain,function(){
		console.log('snare loaded');
		$('#snarelink').attr('href',snare.permalink);
		spinners.snareSpinner.stop();
	});
	
	var hat = new Sound(context,cors_api_url,hatParams,hatGain,function(){
		console.log('hat loaded');
		$('#hatlink').attr('href',hat.permalink);
		spinners.hatSpinner.stop();
	});
	
	var perc = new Sound(context,cors_api_url,percParams,percGain,function(){
		console.log('perc loaded');
		$('#perclink').attr('href',perc.permalink);
		spinners.percSpinner.stop();
	});
	
	var sample = new Sound(context,cors_api_url,sampleParams,sampGain,function(){
		console.log('sample loaded');
		$('#samplink').attr('href',sample.permalink);
		spinners.sampSpinner.stop();
	});
	

	//generating patterns
	var hatPattern = generatePattern(3);
	var samplePattern = generatePattern(1);
	var kickPattern = generatePattern(4);
	var sampleOffsetPattern = generateOffsetPattern();
	
	//choose a random tempo
	var speed = (Math.random() * 3) + 1.5;
	var quarterNote = speed / 4;
	var eightNote = speed / 8;
	var sixteenthNote = speed / 16;

	delay.delay.delayTime.value = eightNote;

	
	
	
	function play(){
		//the loop function run every bar
		l = new loop(function(next){

			//here i play the sounds 
		
			if(kick.loaded){

				for(var i=0; i < kickPattern.length;i++){
					if(kickPattern[i]){
						kick.start(next + (sixteenthNote * i));
						kick.stop(next + (sixteenthNote * i) + sixteenthNote);
					}
				}
				
			}
			
			
			if(snare.loaded){
				snare.start(next + (quarterNote * 2));
				snare.stop(next + (quarterNote * 2) + eightNote);
			}
			
			
			if(perc.loaded){
				
				perc.start(next + (quarterNote * 3));
				perc.stop(next + (quarterNote * 3.5));
			}
			
			
			if(hat.loaded){

				for(var i=0; i < hatPattern.length;i++){
					if(hatPattern[i]){
						hat.start(next + (sixteenthNote * i));
						hat.stop(next + (sixteenthNote * i) + sixteenthNote);
					}
				}
				
			}

			if(sample.loaded){
				
				for(var i=0; i < samplePattern.length;i++){
					if(samplePattern[i]){

						var offset = sampleOffsetPattern[i] * (sample.buffer.duration);
						//sample.playbackRate = Math.round(Math.random() * 2);
						sample.start(next + (sixteenthNote * i),offset);
						

						sample.stop(next + (sixteenthNote * i) + (sixteenthNote));
					}
				}
				
			
			}else{
				console.log('sample not loaded yet');
			}
		

		},0,speed,context);
		
		l.start();
	}

	function stop(){
		l.stop();
	}

	function refreshSounds(){
		kick = new Sound(context, cors_api_url, kickParams,kickGain,function(){
			console.log('kick loaded');
			
			$('#kicklink').attr('href',kick.permalink);
			spinners.kickSpinner.stop();
		});

		snare = new Sound(context,cors_api_url,snareParams,snareGain,function(){
			console.log('snare loaded');
			$('#snarelink').attr('href',snare.permalink);
			spinners.snareSpinner.stop();
		});

		hat = new Sound(context,cors_api_url,hatParams,hatGain,function(){
			console.log('hat loaded');
			$('#hatlink').attr('href',hat.permalink);
			spinners.hatSpinner.stop();
		});

		perc = new Sound(context,cors_api_url,percParams,percGain,function(){
			console.log('perc loaded');
			$('#perclink').attr('href',perc.permalink);
			spinners.percSpinner.stop();
		});

		sample = new Sound(context,cors_api_url,sampleParams,sampGain,function(){
			
			console.log('sample loaded');
			$('#samplink').attr('href',sample.permalink);
			spinners.sampSpinner.stop();
		});
	}

	function refreshPatterns(){

		hatPattern = generatePattern(3);
		samplePattern = generatePattern(1);
		kickPattern = generatePattern(4);
		sampleOffsetPattern = generateOffsetPattern();

	}
	
	guiinit(global,spinners,play,stop,refreshSounds,refreshPatterns,gains);

	

};