// THE SOUND CLASS
function Sound(context,searchparameters,output,callbackfunction){

	var that = this;
	this.loaded = false;
	this.context = context;
	this.buffer = null;
	this.destination = output;
	this.url = null;
	this.permalink = null;
	this.request;
	this.playbackRate = Math.random() + 0.3;
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		var random = Math.floor(Math.random() * tracks.length); //choose a random one
		//make the url and prepare it for proxying
		var url = tracks[random].stream_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		that.permalink = tracks[random].permalink_url;
		that.url = 'http://sillybeat.herokuapp.com:8888' +  url;
		
		//load the buffer - decode it and return buffer
		that.request = new XMLHttpRequest();
		that.request.open('GET', that.url, true);
		that.request.responseType = "arraybuffer";

		that.request.onload = function(){
			that.context.decodeAudioData(that.request.response, function(b){
				that.buffer = b;
				that.loaded = true;
				callbackfunction();
			},function(){
				console.log('decode failed');
				var random = Math.floor(Math.random() * tracks.length); //choose a random one
				//make the url and prepare it for proxying
				var url = tracks[random].stream_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				that.url = 'http://localhost:8888/' +  url;
				that.request.open('GET', that.url, true);
				that.request.send();
			});
		};

		that.request.send();
		
	},function(){
		//get failed
		console.log('get failed');
	});

	return this.buffer;
}

//play method
Sound.prototype.start = function(next,offset,duration){
	
	//create the buffer
	this.source = this.context.createBufferSource();
	this.source.buffer = this.buffer;
	this.source.playbackRate.value = this.playbackRate;
	this.source.connect(this.destination);
	this.source.start(next,offset);
	
	
};

Sound.prototype.stop = function(time){
	this.source.stop(time);

};