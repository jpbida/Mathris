var resources = {

	colors : {
		selectedBlock : "#F4BA84", //#F6A06E #F4BA84
		stroke : "#C5B8A8", //#8E8579 #C5B8A8
		normal : "#F0E8DF", //#F0E8DF #D2C7BB #F0E8DF
		bar : "#FBF9F1",
		text : "#F0E8DF", //#827970 #F0E8DF 
		num : "#827970",
		background : "#D2C7BB",
		HUD : "#A89F96",
		deselectedBlock : "#F0E8DF",
		writing : "#827970",
		curtain : "#F4BA84",
		curtain2 : "#D2C7BB",
	},

	fonts : {
		block : "20px Arial",
		writing: "15px Arial",
	},

	sounds : {
		puff : new Audio("PicsAndSounds/puff.mp3"),
	},

	images : {
		puff : "PicsAndSounds/puff.png",
		refresh : "PicsAndSounds/refresh.png",
		play : "PicsAndSounds/play.png",
		pause : "PicsAndSounds/pause.png",
		unmute : "PicsAndSounds/unmute.png",
		mute : "PicsAndSounds/mute.png",
	},

	// x and y coordinates of objects and their dimentions
	xyDim : {
		canvas :   		{x : 0, y : 0, width : 320, height : 460},
		field :    		{x : 0, y : 60, width : 240, height : 400},
		block :    		{x : undefined, y : undefined, width : 40, height : 40},
		sidebar :  		{x : 240, y : 60, width : 80, height : 430},
		PH_Bar :  		{x : 0, y : 0, width : 320, height : 60},
		PH_line : 		{x : 0, y : 29, width : 320, height : 1},
	},

	numberOfBlocks : {row: 10, column : 6},

	speed : 1,

	initialNumBlocks : 3,
};