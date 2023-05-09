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
		let overallDegrees = (this.gear.currentAngle + this.angle) % 360;
		
		let overallRadians = Util.radians(overallDegrees);

		// console.log(`hi console ${this.gear.pos} | ${this.pos}`)
		// console.log(`hi console ${this.game.player.pos} | ${this.radius}`)
		let playerTranslated = [
			this.game.player.pos[0] - this.pos[0],
			this.game.player.pos[1] - this.pos[1]
		];
		// console.log(`hi console ${playerTranslated}`)

		let playerPosRelativeToPlat = [
			(Math.cos(overallRadians) * playerTranslated[0]) + (Math.sin(overallRadians) * playerTranslated[1]),
			(-1 * Math.sin(overallRadians) * playerTranslated[0]) + (Math.cos(overallRadians) * playerTranslated[1])
		];

		if(((playerPosRelativeToPlat[0] < this.width / 2) && (playerPosRelativeToPlat[0] > this.width / -2))
			|| ((playerPosRelativeToPlat[1] < this.radius) && (playerPosRelativeToPlat[1] > 0)))
		{
			return true;
		} else {
			return false;
		}

	}


}

export default GearPlatform;