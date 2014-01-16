
//sound class
function Sound(context,searchparameters){

	var that = this;
	this.buffer = null;
	this.loaded = false;
	this.context = context;
	this.searchResults = [];
	
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		console.log(tracks);
		//find the downloadable ones
		for(var i = 0; i < tracks.length; i++){
				//keep the downloadable ones
				if(tracks[i].downloadable){
					that.searchResults.push(tracks[i]);
				}
		}	

		//load a random one from the downloadable results
		var random = Math.floor(Math.random() * that.searchResults.length);
		var source = that.searchResults[random].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		//load the sound
		var request = new XMLHttpRequest();
		request.open('GET',source,true);
		request.responseType = "arraybuffer";
					
		request.onload = function(){
			that.context.decodeAudioData(request.response,function(b){
				console.log(b);
				that.buffer = b;
				that.loaded = true;
			},function(){
				console.log('loading failed');
			});
		};
		request.send();
	});
}

//play method
Sound.prototype.start = function(){
	var that = this;
	var now = this.context.currentTime;
	if(this.loaded){
		that.source = that.context.createBufferSource();
		that.source.buffer = that.buffer;
		that.source.connect(that.context.destination);
		that.source.start(now);
		//that.source.stop(now+1);
	}
	
};



//search parameters - kick
var parameters = {
	
	duration:{
		from: 100,
		to: 3000
	},
	
	limit: 60,
	q: "kick",

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
	setTimeout(function(){
		ssound.start();
	},5000);





};