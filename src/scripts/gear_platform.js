import * as Util from "./util.js";
import Gear from "./gear.js";
import MovingObject from "./moving_object";
import Player from "./player.js";

class GearPlatform extends MovingObject{
	constructor(options){
		super(options);

		// NEED 4 THINGS TO DEFINE A PLATFORM IN 2D SPACE:
		// pos, width, radius (=== length / 2), currentAngle
		this.width = options.width;
		this.angle = options.angle;
		this.gear = options.gear;
	}

	isCollideWith(){

	}

	isObjInBounds(obj){
		if(obj instanceof Player){
			// //Find coordinates of platform with its position as origin
			let overallDegrees = ((this.gear.currentAngle + this.angle + 270) % 360);
			let overallRadians = Util.radians(overallDegrees);
			
			// //Player pos relative to the gear's pos, without any rotations
			let playerTranslated = [
				this.game.player.pos[0] - this.pos[0],
				this.game.player.pos[1] - this.pos[1]
			];
	
			let playerPosRelativeToPlat = [
				(Math.cos(overallRadians) * playerTranslated[0]) + (Math.sin(overallRadians) * playerTranslated[1]),
				(-1 * Math.sin(overallRadians) * playerTranslated[0]) + (Math.cos(overallRadians) * playerTranslated[1])
			];
	
			if(((playerPosRelativeToPlat[0] < this.width / 2) && (playerPosRelativeToPlat[0] > this.width / -2))
				&& ((playerPosRelativeToPlat[1] < this.radius) && (playerPosRelativeToPlat[1] > 0)))
			{
				return true;
			} else {
				return false;
			}
		}
	}

	handleOOB(obj){
		
	}


}

export default GearPlatform;