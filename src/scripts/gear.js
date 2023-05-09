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
					currentAngle: vertex
					
				})
			)
		});
	}

	draw(ctx){
		// //Apply translation and rotation to canvas origin
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(Util.radians(this.currentAngle));

		// //Draw Gear itself
		this.drawGearOutline(ctx);

		// //Gear - image file
		this.drawGearImage(ctx);

		// //Draw all platforms - object representation of each path
		this.drawAllPlatforms(ctx);

		// //Revert translation and rotation to canvas origin
		ctx.restore();
	}

	drawGearOutline(ctx){
		// //Gear itself - the canvas shape
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(0,0,this.radius,0,2*Math.PI,false);
		ctx.fill();
		ctx.closePath();
	}

	drawGearImage(ctx){
		ctx.drawImage(this.game.gearShiny, 0,0, 291, 291, this.radius * -1, this.radius * -1, this.radius * 2, this.radius * 2)
		ctx.drawImage(
			this.game.gearShiny, 
			0,
			0, 
			291, // original image width
			291, // original image height
			(this.radius + 5) * -1, 
			(this.radius + 5) * -1, 
			(this.radius + 5) * 2, 
			(this.radius + 5) * 2
		);
	}

	// //Visualize platforms - draw all platforms
	drawAllPlatforms(ctx){
		this.drawPlatformCenter(ctx);
		this.gearPlatforms.forEach(platform => {
			this.drawPlatform(platform, ctx);
		})
	}

	// //Draw center circle area
	drawPlatformCenter(ctx){
		ctx.beginPath();
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.arc(0, 0, this.platformWidth / 2, 0, 2*Math.PI,false);
		ctx.stroke();
		ctx.closePath();
	}

	// //Draw an individual platform
	drawPlatform(platform, ctx){
		ctx.beginPath();
		// let exitLocation = Util.scaledVectorDegrees(platform.currentAngle, platform.radius);
		// ctx.moveTo(0, 0);

		// ctx.lineTo(exitLocation[0], exitLocation[1]);
		// ctx.lineWidth = this.platformWidth;
		// ctx.strokeStyle = "rgb(0,255,0)";
		// ctx.stroke();
		ctx.rotate(Util.radians(platform.currentAngle));
		ctx.strokeStyle = "rgb(0,255,0)";
		ctx.strokeRect(0, (platform.width / 2) * -1, platform.radius, platform.width );
		ctx.font = "20px Arial";
		ctx.fillStyle = "magenta";
		ctx.fillText(`  ${platform.currentAngle}`, platform.radius, 5)
		ctx.rotate(Util.radians(platform.currentAngle) * -1);

		ctx.closePath();
	}

	customMove(timeDelta){
		// //Regular stutter step
		// this.currentTimeBuffer += this.timeBufferStep;
		// if(this.currentTimeBuffer % this.timeBufferThreshold === 0){
		// 	let rotationDirection = 1;
		// 	this.counterClockwise ? rotationDirection = -1 : rotationDirection = 1;
		// 	let finalAngleChange = this.rotationVel * rotationDirection * timeDelta;
		// 	this.currentAngle = (this.currentAngle + finalAngleChange) % 360;
		// }

		// //Pause stutter step
		this.currentTimeBuffer += this.timeBufferStep * timeDelta / 20;
		if((this.currentTimeBuffer % this.timeBufferThreshold) < this.timeBufferThreshold * .75){
			let rotationDirection = 1;
			this.counterClockwise ? rotationDirection = -1 : rotationDirection = 1;
			let finalAngleChange = this.rotationVel * rotationDirection * timeDelta;
			this.currentAngle = (this.currentAngle + finalAngleChange) % 360;
		} else {
		}

		// //"Stick" the player to go with you
		
	}
}

export default Gear;