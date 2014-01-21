

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
	//tags: "kick,"

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
	
	//load the sounds
	var ssound = new Sound(context,parameters);
	
	var l = new loop(function(next){
		ssound.start(next);
	},0,0.5,context);
	
	setTimeout(function(){
		l.start();
	},4000);


};