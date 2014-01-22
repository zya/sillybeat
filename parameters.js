var generateParameters = function(query,tags,durationFrom,durationTo){
	var date = new Date(2000 + Math.floor(Math.random() * 4) + 10,Math.floor(Math.random() * 12),Math.floor(Math.random()* 30));
	
	var parameters = {

		duration:{
			from: durationFrom,
			to: durationTo
		},
	
		limit: 80,
		q: query,
		tags: tags,

		//randomises the date for different results
		
		created_at:{
			to: date
		}
		
	}

	return parameters;
};