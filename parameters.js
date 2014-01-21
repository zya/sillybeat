var generateParameters = function(query,tags,durationFrom,durationTo){
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
			to: new Date(2000 + Math.floor(Math.random() * 4) + 10,Math.floor(Math.random() * 8),1)
		}
	}

	return parameters;
};