function loader(context,searchparameters){

	//for scope issues
	var that = this;
	this.buffer = null;
	this.isLoaded = false;
	this.found = false;
	

	SC.get('/tracks',searchparameters,function(tracks){
		//to limit the load to 1
		
		for(var i = 0; i < tracks.length; i++){

			if(tracks[i].downloadable && !that.found){
				//prepare the download link
				var source = tracks[i].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
				//load the sounds - return a buffer - and push to the give array
				that.found = true; //to limit the load to 1;

			}
		}
	};

	return this.buffer;

}


function Sound(context,searchparameters){

	var that = this;
	this.buffer = null;
	this.isLoaded = false;
	this.found = false;

	this.load = function(){
		SC.get('/tracks',searchparameters,function(tracks){
		//to limit the load to 1
		
			for(var i = 0; i < tracks.length; i++){

				if(tracks[i].downloadable && !that.found){
					//prepare the download link
					var source = tracks[i].download_url + '?client_id=e553081039dc6507a7c3ebf6211e4590';
					//load the sounds - return a buffer - and push to the give array
					that.found = true; //to limit the load to 1;

				}
			}
		};
	}

	this.load();
}