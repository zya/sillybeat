

window.onload = function(){
	//global variables
	var context = new webkitAudioContext();
	
	//initialize soundcloud sdk
	SC.initialize({
    	client_id : 'e553081039dc6507a7c3ebf6211e4590'
	});
	//init gui
	guiinit();
	
	
	//generate search params - query,tags,durationfrom,durationto
	var kickParams = generateParameters("kick","kick,",100,5000);
	var snareParams = generateParameters("snare","snare,",100,5000);
	var hatParams = generateParameters("hihat","hihat,",100,1000);
	//fx - pad - choir
	var sampleParams = generateParameters("pad","",Math.round((Math.random() * 10000) + 5000),50000);
	var percParams = generateParameters("percussion","",100,3000);
	//load the sounds
	var kick = new Sound(context,kickParams);
	var snare = new Sound(context,snareParams);
	var hat = new Sound(context,hatParams);
	var perc = new Sound(context,percParams);
	var sample = new Sound(context,sampleParams);
	
	//choose a random tempo
	var speed = (Math.random() * 3) + 0.8;
	var quarterNote = speed / 4;
	
	var l = new loop(function(next){
		kick.start(next);
		kick.stop(next + quarterNote);
		snare.start(next + (quarterNote * 2));
		perc.start(next + (quarterNote * 3));
		perc.stop(next + (quarterNote * 3.5));
		hat.start(next);
		hat.start(next + quarterNote);
		hat.start(next + quarterNote * 2);
		hat.start(next + quarterNote * 3);
		//hat.start(next + eightNote * 4);

		if(sample.loaded){
			var offset = Math.random() * (sample.buffer.duration / 1.5);
			sample.start(next,offset);
			sample.stop(next + speed);

			sample.source.playbackRate.value = 0.5;
			sample.start(next,offset);
			sample.stop(next + speed);

			sample.source.playbackRate.value = 2;
			sample.start(next,offset);
			sample.stop(next + speed);
		
		}else{
			console.log('sample not loaded yet');
		}
		

	},0,speed,context);
	
	setTimeout(function(){
		l.start();
	},7000);
	

	

};