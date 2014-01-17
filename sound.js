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
		console.log(that.searchResults);
		var random = Math.floor(Math.random() * that.searchResults.length);
		var source = that.searchResults[random].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		//load the sound
		var request = new XMLHttpRequest();
		request.open('GET',source,true);
		request.responseType = "arraybuffer";
					
		request.onload = function(){
			that.context.decodeAudioData(request.response,function(b){
				
				that.buffer = b;
				that.loaded = true;
			},function(){
				//if failed - try another one
				console.log('request failed');
				var random = Math.floor(Math.random() * that.searchResults.length);
				var source = that.searchResults[random].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				request.open('GET',source,true);
				request.send();
			});
		};
		request.send();
	});
}

//play method
Sound.prototype.start = function(next){
	var that = this;
	if(this.loaded){
		that.source = that.context.createBufferSource();
		that.source.buffer = that.buffer;
		that.source.connect(that.context.destination);
		that.source.start(next);
		//that.source.stop(now+1);
	}
	
};