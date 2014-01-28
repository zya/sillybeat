//sound loader
function Sound(context,searchparameters){

	var that = this;
	this.loaded = false;
	this.context = context;
	this.buffer = null;
	this.url = null;
	
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		var random = Math.floor(Math.random() * tracks.length); //choose a random one
		that.url = tracks[random].stream_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		
		//load the buffer - decode it and return buffer
		

	},function(){
		//get failed
		console.log('get failed');
	});

	return this.buffer;
}

//play method
Sound.prototype.start = function(next,offset){
	
	//create the buffer
	
};

Sound.prototype.stop = function(time){
	

};