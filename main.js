

//search parameters - kick
var parameters = {

	duration:{
		from: 100,
		to: 2000
	},
	
	limit: 60,
	q: "kick",
	tags: "kick,",

	//randomises the date for different results
	created_at:{
		to: new Date(2000 + Math.floor(Math.random() * 4) + 10,Math.floor(Math.random() * 8),1)
	}
};

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
	var kickParams = generateParameters("kick","kick,",100,3000);
	var snareParams = generateParameters("snare","snare,",100,2000);
	var hatParams = generateParameters("hihat","hihat,",100,1000);
	var sampleParams = generateParameters("pad","",5000,20000);
	//load the sounds
	var kick = new Sound(context,kickParams);
	var snare = new Sound(context,snareParams);
	var hat = new Sound(context,hatParams);
	var sample = new Sound(context,sampleParams);
	
	
	var speed = (Math.random() * 4) + 1;
	var eightNote = speed / 3;
	
	var l = new loop(function(next){
		kick.start(next);
		kick.stop(next + eightNote);
		snare.start(next + (eightNote * 2));

		hat.start(next);
		hat.start(next + eightNote);
		hat.start(next + eightNote * 2);
		hat.start(next + eightNote * 3);
		hat.start(next + eightNote * 4);
		
		
		sample.start(next,Math.random() * (sample.buffer.duration / 1.5));
		sample.stop(next + eightNote * 4);
		sample.start(next + eightNote * 8,Math.random() * sample.buffer.duration);
		sample.stop(next + 2);

		


	},0,speed,context);
	
	setTimeout(function(){
		l.start();
	},7000);
	

	

};