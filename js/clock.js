window.onload = function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d")
	var resize = function(){
		context.canvas.width = window.innerWidth/1.1;
		context.canvas.height = window.innerHeight/1.1;
	};
	

	resize();

	var FrameRate = 1;

	counter = 0;
	centerX = context.canvas.width/2;
	centerY = context.canvas.height/2;

	radius = centerX/3;

	s_hand_length = (5/8);
	m_hand_length = (7/8);
	h_hand_length = (3/8);	

	var onFrame = function() {

		
		//Resize if needed
		if (context.canvas.width != window.innerWidth/2 || context.canvas.height != window.innerHeight/2) {
			resize();
		}
		
		
		
		clearCanvas();
		context.lineWidth = 10;
		

		//Draw Circle
		context.beginPath();	
		context.strokeStyle = "#123456";
		context.arc(centerX,centerY,radius,0,2*Math.PI);	
		context.stroke();

		//Draw Hour Numbers
		context.font = "30px Arial";
		for(theta = 0, i = 3; theta<= 2*Math.PI; theta+= Math.PI/(6)) {
			context.fillText(i,-13+centerX+(radius+20)*Math.cos(theta),10+centerY+(radius+20)*Math.sin(theta));
			i = (i+1)%13;
			if (i==0) i++;
		}

		t = new Date().getTime() - 1000*60*60*7;
	

		//Minute Hand
		context.beginPath();	
		context.strokeStyle = "#000000";
		context.moveTo(centerX,centerY);
		context.lineTo(radius*m_hand_length*Math.cos(-Math.PI/2 +2*Math.PI*t/(60*60*1000))+centerX,m_hand_length*radius*Math.sin(-Math.PI/2 +2*Math.PI*t/(60*60*1000))+centerY);
		context.stroke();
	
		//Hour Hand		
		context.beginPath();	
		context.strokeStyle = "#000000";
		context.moveTo(centerX,centerY);
		context.lineTo(radius*h_hand_length*Math.cos(-Math.PI/2 +2*Math.PI*t/(12*60*60*1000))+centerX,h_hand_length*radius*Math.sin(-Math.PI/2 +2*Math.PI*t/(12*60*60*1000))+centerY);	
		context.stroke();

		//Second Hand
		context.beginPath();	
		context.strokeStyle = "#ff0000";
		context.moveTo(centerX,centerY);
		context.lineTo(radius*s_hand_length*Math.cos(-Math.PI/2 +2*Math.PI*t/(60*1000))+centerX,s_hand_length*radius*Math.sin(-Math.PI/2 +2*Math.PI*Math.round(t/1000)/(60))+centerY);
		context.stroke();
	};

	var clearCanvas = function() {
		context.clearRect(0,0,canvas.width,canvas.height);	
	};

	setInterval(onFrame, 1000.0/FrameRate);

};

