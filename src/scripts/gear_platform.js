import * as Util from "./util.js";
import Gear from "./gear.js";
import MovingObject from "./moving_object";

class GearPlatform extends MovingObject{
	constructor(options){
		super(options);

		// NEED 4 THINGS TO DEFINE A PLATFORM IN 2D SPACE:
		// pos, width, radius (=== length / 2), currentAngle
		// this.pos
		this.width = options.width;
		this.angle = options.angle;
		// this.radius = options.radius;
		this.gear = options.gear;
	}

	isCollideWith(){

	}

	isCollideWithPlayer(){
		// //Find coordinates of platform with its position as origin
		console.log(" ");
		console.log(" ");
		console.log(" ");
		console.log(" ");
		console.log(" ");
		console.log(" ");
		console.log(" ");
		console.log(" ");
		let overallDegrees = ((this.gear.currentAngle + this.angle + 270) % 360);
		console.log(`gear's angle:${this.gear.currentAngle}`)
		console.log(`gearplatform's angle:${this.angle}`)
		console.log(`overallDegrees:${overallDegrees}`);
		
		let overallRadians = Util.radians(overallDegrees);
		console.log(`overallRadians:${overallRadians}`);
		
		// console.log(`playerPos:${this.game.player.pos}`)
		// console.log(`gearplatform radius:${this.radius}`)
		
		// //Player pos relative to the gear's pos, without any rotations
		let playerTranslated = [
			this.game.player.pos[0] - this.pos[0],
			this.game.player.pos[1] - this.pos[1]
		];
		console.log(`player translated: ${playerTranslated}`)

		let playerPosRelativeToPlat = [
			(Math.cos(overallRadians) * playerTranslated[0]) + (Math.sin(overallRadians) * playerTranslated[1]),
			(-1 * Math.sin(overallRadians) * playerTranslated[0]) + (Math.cos(overallRadians) * playerTranslated[1])
		];

		console.log(`player translated relative to plat: ${playerPosRelativeToPlat}`)

		if(((playerPosRelativeToPlat[0] < this.width / 2) && (playerPosRelativeToPlat[0] > this.width / -2))
			&& ((playerPosRelativeToPlat[1] < this.radius) && (playerPosRelativeToPlat[1] > 0)))
		{
			console.log(`${this.angle} COLLISION`)
			return true;
		} else {
			console.log(`${this.angle} NOOO COLLISION`)
			return false;
		}

	}


}

export default GearPlatform;