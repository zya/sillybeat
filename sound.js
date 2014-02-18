// THE SOUND CLASS
function Sound(context,searchparameters,callbackfunction){

	var that = this;
	this.loaded = false;
	this.context = context;
	this.buffer = null;
	this.url = null;
	this.request;
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		var random = Math.floor(Math.random() * tracks.length); //choose a random one
		
		//make the url and prepare it for proxying
		var url = tracks[random].stream_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		that.url = 'http://localhost:8080/' +  url;
		
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
	this.source.connect(this.context.destination);
	this.source.start(next,offset);
	
	
};

Sound.prototype.stop = function(time){
	this.source.stop(time);

};