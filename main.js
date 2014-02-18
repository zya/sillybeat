

window.onload = function(){
	//global variables
	var context = new webkitAudioContext();
	var global = {
		isPlaying: false
	};
	
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
	var kickParams = generateParameters("808 kick","",100, 1000);
	var snareParams = generateParameters("snare","",100,10000);
	var hatParams = generateParameters("hihat","",100,10000);
	var sampleParams = generateParameters("","",5000,500000);
	var percParams = generateParameters("percussion","",0,3000);
	
	//load the sounds
	var kick = new Sound(context,kickParams,function(){
		console.log('kick loaded');
		spinners.kickSpinner.stop();
	});
	
	var snare = new Sound(context,snareParams,function(){
		console.log('snare loaded');
		spinners.snareSpinner.stop();
	});
	
	var hat = new Sound(context,hatParams,function(){
		console.log('hat loaded');
		spinners.hatSpinner.stop();
	});
	
	var perc = new Sound(context,percParams,function(){
		console.log('perc loaded');
		spinners.percSpinner.stop();
	});
	
	var sample = new Sound(context,sampleParams,function(){
		console.log('sample loaded');
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

	//the loop function run every bar
	var l = new loop(function(next){

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
					

					sample.stop(next + (sixteenthNote * i) + (sixteenthNote / 1.3));
				}
			}
			
		
		}else{
			console.log('sample not loaded yet');
		}
		

	},0,speed,context);
	
	
	guiinit(global,spinners);

	

};