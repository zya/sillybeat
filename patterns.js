var generatePattern = function(probability){
	var array = [];
	for(var i =0; i < 16; i++){
		var random = Math.round(Math.random() * probability);

		//the higher the probability - the lower the chance
		if(random === 1){
			array[i] = true;
		}
	}
	return array;
};

var generateOffsetPattern = function(){
	var array = [];
	for(var i =0; i < 16; i++){
		array[i] = Math.random();
	}
	return array;
};

