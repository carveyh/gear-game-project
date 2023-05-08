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
		this.rotationVel = options.rotationVel;
		this.platformWidth = options.platformWidth;
		this.vertices ||= [0,180]; //will have default a straight path through
		this.connectedGears ||= []; //graph structure of connected gears
		this.gearPlatforms = [];

		this.generatePlatforms();
	}

	generatePlatforms(){
		this.vertices.forEach(vertex => {
			this.gearPlatforms.push(
				new GearPlatform({
					pos: this.pos,
					vel: this.vel,
					game: this.game,

					width: this.platformWidth,
					radius: this.radius,
					currentAngle: this.vertex

				})
			)
		});
	}

	draw(ctx){
		this.vertices.forEach(vertex => {
			this.drawVertex(vertex, ctx);
		})
	}



	drawVertex(degrees, ctx){
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
		// ctx.drawImage(this.game.gearShiny, 0,0, 291, 291, this.radius * -1, this.radius * -1, this.radius * 2, this.radius * 2)
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
		// ctx.beginPath();
		// ctx.strokeStyle = "white";
		// ctx.fillStyle = "blue";
		// ctx.arc(0, this.radius * -1, 5, 0, 2 * Math.PI, false);
		// ctx.fill();
		// ctx.stroke();
		// ctx.closePath();
		// this.displayCoordsOfPos(ctx,(0, this.radius * -1));

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
		// ctx.moveTo(0, this.radius * -1);
		ctx.moveTo(0, 0);

		// BUG: This returns NaN, Nan!
		let exitLocation = Util.scaledVectorDegrees(degrees, this.radius);
		// console.log(`good ol logs ${degrees}`)
		// console.log(`good ol logs ${exitLocation}`)
		ctx.lineTo(exitLocation[0], exitLocation[1]);
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
			this.currentAngle += this.rotationVel * rotationDirection * timeDelta;

		}
	}
}

export default Gear;