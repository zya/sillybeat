//loader function
function Sound(source,context){

    var request = new XMLHttpRequest();
        request.open('GET', source , true);
        request.responseType = "arraybuffer";
        
    request.onload = function(){
        context.decodeAudioData(request.response, function(e){
        	var source = context.createBufferSource();
        	source.buffer = e;
        	source.connect(context.destination);
        	source.start(0);
        });
    };
    request.send();
    
}

var parameters = {
	/*
	bpm: {
		from: 100,
		to: 105
	},
	*/
	
	duration:{
		from: 300,
		to: 2000
	},
	
	limit: 20,
	tags: "kick,"

};





window.onload = function(){
	
	var context = new webkitAudioContext();

	SC.initialize({
    	client_id : 'e553081039dc6507a7c3ebf6211e4590'
	});
	
	SC.get('/tracks',parameters,function(e){
		for(var i = 0; i < e.length; i++){
			
			if(e[i].downloadable){

				var source = e[i].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				var s = new Sound(source,context);
				console.log('test');
			}
		};
	});
};