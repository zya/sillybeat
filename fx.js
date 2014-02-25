function Reverb(context){
	
	this.request = new XMLHttpRequest();
	this.convolver = context.createConvolver();
	var that = this;
	this.url = 'audio/ir.mp3';
	this.request.open('GET',that.url,true);
	this.request.responseType = "arraybuffer";
	
	this.request.onload = function(){
		context.decodeAudioData(that.request.response,function(b){
			that.convolver.buffer = b;
			console.log('reverb loaded');
		})
	};
	this.request.send();
	

}

Reverb.prototype.connect = function(destination){

	this.convolver.connect(destination);

};

Reverb.prototype.inp = function(input){
	input.connect(this.convolver);
};

function SlapDelay(context){
	this.input = context.createGain();
	this.output = context.createGain();
	this.delay = context.createDelay();
	this.feedback = context.createGain();
	
	this.feedback.gain.value = 0.15;

	this.input.connect(this.delay);
	this.delay.connect(this.feedback);
	this.feedback.connect(this.delay);
	this.delay.connect(this.output);
	//this.filter.connect(this.output);
	
}