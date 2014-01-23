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
	this.buffer = null;
	this.loaded = false;
	this.context = context;
	this.searchResults = [];
	this.playbackRate = 1;
	
	//get sounds from soundcloud
	SC.get('/tracks',searchparameters,function(tracks){
		
		
		//find the downloadable ones
		for(var i = 0; i < tracks.length; i++){
				//keep the downloadable ones
				if(tracks[i].downloadable && tracks[i].sharing === 'public'){
					that.searchResults.push(tracks[i]);
					
				}
		}

		//load a random one from the downloadable results
		var random = Math.floor(Math.random() * that.searchResults.length);
		console.log(random + "and" + that.searchResults.length);
		var source = that.searchResults[random].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
		console.log(that.searchResults[random]);
		
		//load the sound
		/*
		var request = jQuery.ajax({
			url: source,
			type: 'GET',
			//dataType: "xml",
			crossDomain: true,
			responseType: "arraybuffer",
			success: function(response){
				console.log(response);
			}
			
		});
		*/

		
	
		var request = createCORSRequest('GET',source);
		request.responseType = "arraybuffer";

		request.onload = function(){
			that.context.decodeAudioData(request.response,function(b){
				that.buffer = b;
				that.loaded = true;
			},function(){
				//decode failed
				console.log('decode failed');
			});
		};

		request.onerror = function(){
			console.log('request failed');
		};
		
		request.send();
		

		/*
		var request = new XMLHttpRequest();
		request.open('GET',source,true);
		request.responseType = "arraybuffer";
					
		request.onload = function(){
			that.context.decodeAudioData(request.response,function(b){
				
				that.buffer = b;
				that.loaded = true;
			},function(){
				//if failed - try another one
				console.log('audio decode failed');
				var random = Math.floor(Math.random() * that.searchResults.length);
				var source = that.searchResults[random].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				request.open('GET',source,true);
				request.send();
			});
		};

		request.onerror = function(){
			console.log('XML HTTP failed');
		};
		request.send();
		*/

	},function(){
		//get failed
		console.log('get failed');
	});
}

//play method
Sound.prototype.start = function(next,offset){
	
	var that = this;
	if(this.loaded){
		that.source = that.context.createBufferSource();
		that.source.playbackRate = that.playbackRate;
		that.source.buffer = that.buffer;
		that.source.connect(that.context.destination);
		that.source.start(next,offset);
		//that.source.stop(now+1);
	}
	
};

Sound.prototype.stop = function(time){
	this.source.stop(time);
};