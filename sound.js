//sound class
var createCORSRequest = function (method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Most browsers.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // IE8 & IE9
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
};

//sound loader
function Sound(context,searchparameters){

	var that = this;
	this.loaded = false;
	this.context = context;
	this.audio = new Audio();
	this.url = null;
	
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		var random = Math.floor(Math.random() * tracks.length);
		that.url = tracks[random].stream_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		that.audio.src = that.url;
		that.loaded = true;
		
		

	},function(){
		//get failed
		console.log('get failed');
	});
}

//play method
Sound.prototype.start = function(next,offset){
	this.audio = new Audio();
	this.audio.src = this.url;
	
	this.source = this.context.createMediaElementSource(this.audio);
	this.source.connect(this.context.destination);
	this.source.mediaElement.play(next);

	console.log('test');
	
};

Sound.prototype.stop = function(time){
	
};