
//loader function
function Sound(source,context,i,bank){

    var request = new XMLHttpRequest();
        request.open('GET', source , true);
        request.responseType = "arraybuffer";
        
    request.onload = function(){
        context.decodeAudioData(request.response, function(e){
        	bank[i] = e;
        });
    };
    request.send();   
}

//search parameters
var parameters = {
	
	duration:{
		from: 300,
		to: 2000
	},
	
	limit: 30,
	tags: "kick,"

};


window.onload = function(){
	//global variables
	var context = new webkitAudioContext();
	//to keep the buffers
	var bank1 = [];
	//initialize soundcloud sdk
	SC.initialize({
    	client_id : 'e553081039dc6507a7c3ebf6211e4590'
	});
	//init gui
	guiinit();
	//load the sounds
	SC.get('/tracks',parameters,function(e){
		for(var i = 0; i < e.length; i++){
			//check if its downloadabel
			if(e[i].downloadable){
				//prepare the download link
				var source = e[i].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				//load the sounds - return a buffer - and push to the give array
				var s = new Sound(source,context,i,bank1);
				
			}
		};
		
	});


};