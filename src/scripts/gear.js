import * as Util from "./util.js";
import MovingObject from "./moving_object";
import GearPlatform from "./gear_platform.js";

class Gear extends MovingObject{
	constructor(options){
		super(options);
		this.counterClockwise = options.counterClockwise;
		this.timeBufferThreshold = options.timeBufferThreshold;
		this.timeBufferStep = options.timeBufferStep;
		this.currentTimeBuffer = options.currentTimeBuffer;
		this.vertices = options.vertices; //array of degrees
		this.currentAngle = options.currentAngle; //current rotation degree
		this.rotationSpeed = options.rotationSpeed;
		this.platformWidth = options.platformWidth;
		this.connectedGears ||= []; //graph structure of connected gears

		this.generatePlatforms();
	}

	generatePlatforms(){

	}

	draw(ctx){
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(Util.radians(this.currentAngle));

		// Gear itself - the canvas shape
		// ctx.beginPath();
		// ctx.fillStyle = this.color;
		// ctx.arc(0,0,this.radius,0,2*Math.PI,false);
		// ctx.fill();
		// ctx.closePath();

		// Gear - image file
		// ctx.drawImage(this.game.gearShiny, 0,0, 291, 291, -145.5, -145.5, 291, 291)
		// ctx.drawImage(
		// 	this.game.gearShiny, 
		// 	0,
		// 	0, 
		// 	291, // original image width
		// 	291, // original image height
		// 	(this.radius + 5) * -1, 
		// 	(this.radius + 5) * -1, 
		// 	(this.radius + 5) * 2, 
		// 	(this.radius + 5) * 2
		// );

		// Linear path entry point
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "blue";
		ctx.arc(0, this.radius * -1, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		this.displayCoordsOfPos(ctx,(0, this.radius * -1));

		// Linear path exit point
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "green";
		ctx.arc(0, this.radius, 5, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		// Linear path
		ctx.beginPath();
		ctx.moveTo(0, this.radius * -1);
		ctx.lineTo(0, this.radius);
		ctx.lineWidth = this.platformWidth;
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.stroke();
		ctx.closePath();

		ctx.restore();
	}

	customMove(timeDelta){
		// Stutter step
		this.currentTimeBuffer += this.timeBufferStep;
		if(this.currentTimeBuffer % this.timeBufferThreshold === 0){
			let rotationDirection = 1;
			this.counterClockwise ? rotationDirection = -1 : rotationDirection = 1;
			this.currentAngle += this.rotationSpeed * rotationDirection * timeDelta;

		}
	}
}

export default Gear;