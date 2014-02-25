window.onload = function(){

	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

	//to handle cors
	var protocol = location.protocol;
	var cors_server = '//zya-cors.herokuapp.com/';
	cors_api_url = protocol + cors_server;
  	
	//audio nodes
	var context = new AudioContext();
	var reverb = new Reverb(context); //reverb
	var delay = new SlapDelay(context);
	var compressor = context.createDynamicsCompressor();
	compressor.ratio.value = 5;
	compressor.threshold.value = -15;
	
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
	kickGain.gain.value = 1;
	reverbGain.gain.value = 0.5;
	hatGain.gain.value = 0.4;
	snareGain.gain.value = 0.15;
	percGain.gain.value = 0.4;
	sampGain.gain.value = 1;
	delay.output.gain.value = 0.5;
	
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
	masterGain.connect(compressor);
	compressor.connect(context.destination);
	
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
	var kick,snare,hat,perc,sample; //global
	var kickParams,snareParams,hatParams,percParams,sampleParams;
	var hatPattern,samplePattern,kickPattern,sampleOffsetPattern;
	
	//object that holds the spinner objects
	var spinners = {

		kickSpinner: null,
		snareSpinner: null,
		hatSpinner: null,
		percSpinner: null,
		sampSpinner: null

	};

	

	//choose a random tempo
	var speed = (Math.random() * 3.5) + 1;
	var quarterNote = speed / 4;
	var eightNote = speed / 8;
	var sixteenthNote = speed / 16;
	delay.delay.delayTime.value = eightNote;

	//play function starts the loop
	function play(){
		//the loop function run every bar
		l = new loop(function(next){

			//here i play the sounds 

			for(var i = 0; i < 16; i++){
				
				//kick
				if(kick.loaded && kickPattern[i]){

					kick.start(next + (sixteenthNote * i));
					kick.stop(next + (sixteenthNote * i) + (sixteenthNote * 1.5));

				}
				//snare
				if(snare.loaded){

					snare.start(next + (quarterNote * 2));
					snare.stop(next + (quarterNote * 2) + sixteenthNote);
				}
				//hihat
				if(hat.loaded && hatPattern[i]){

					hat.start(next + (sixteenthNote * i));
					hat.stop(next + (sixteenthNote * i) + sixteenthNote);
				}
				//perc
				if(perc.loaded){
					perc.start(next + (quarterNote * 3));
					perc.stop(next + (quarterNote * 3.5));
				}
				//sample
				if(sample.loaded && samplePattern[i]){

					var offset = sampleOffsetPattern[i] * (sample.buffer.duration);
					sample.start(next + (sixteenthNote * i),offset);
					sample.stop(next + (sixteenthNote * i) + (sixteenthNote));
				}

			}
			

		},0,speed,context);
		
		l.start();
	}

	//stop functin stops the loop
	function stop(){
		l.stop();
	}

	//generate search params - query,tags,durationfrom,durationto
	function generateParams(){
		
		kickParams = generateParameters("808 kick","",300, 30000);
		snareParams = generateParameters("snare","",100,30000);
		hatParams = generateParameters("hihat","",100,30000);
		sampleParams = generateParameters("","",5000,100000);
		percParams = generateParameters("percussion","",0,30000);

	}
	

	//gets sounds and sets the link on the ui
	function getSounds(){

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

	
	//refreshes the patterns
	function createPatterns(){

		//make new patterns
		hatPattern = generatePattern(3);
		samplePattern = generatePattern(1);
		kickPattern = generatePattern(4);
		sampleOffsetPattern = generateOffsetPattern();

	}
	
	//initialize soundcloud sdk
	SC.initialize({
    	client_id : 'e553081039dc6507a7c3ebf6211e4590'
	});
	//generate search parameters
	generateParams();
	//get sounds
	getSounds();
	//create Patterns
	createPatterns();
	//init gui
	guiinit(global,spinners,play,stop,getSounds,createPatterns,gains);

};