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
		this.OOBbuffer = 2;
		this.playerWasHere = false;
	}

	// //Manage OOB controller, to be called by game instance.
	// //This controller then calls its inner helper methods.
	manageOOB(obj){
		// //Manage other object type OOB logic (PLACEHOLDER)

		// //Manage player OOB logic
		if(obj instanceof Player){
			if(this.isObjInBounds(obj)){
				this.playerWasHere = true;
			} else {
				if(this.game.currentGear === this.gear){
					this.gear.gearPlatforms.some(platform => {
						platform.isObjInBounds(obj)
					})
				}
			}
		}
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

			let rightBoundaryProximity = (this.width / 2) - playerPosRelativeToPlat[0];
			let leftBoundaryProximity = playerPosRelativeToPlat[0] - (this.width / -2);
			let topBoundaryProximity = playerPosRelativeToPlat[1];
			let bottomBoundaryProximity = this.radius - playerPosRelativeToPlat[1];
			let handleOOBOptionOffset = [0,0];
	
			if(((playerPosRelativeToPlat[0] < this.width / 2) && (playerPosRelativeToPlat[0] > this.width / -2))
				&& ((playerPosRelativeToPlat[1] < this.radius) && (playerPosRelativeToPlat[1] > 0)))
			{
				return true;
			} else {
				if(this.gear.isPlayerOn()){
					if(rightBoundaryProximity <= this.OOBbuffer) handleOOBOptionOffset = Util.addTwoVectors(handleOOBOptionOffset, [-2,0])
					if(leftBoundaryProximity <= this.OOBbuffer) handleOOBOptionOffset = Util.addTwoVectors(handleOOBOptionOffset, [2,0])
					if(topBoundaryProximity <= this.OOBbuffer) handleOOBOptionOffset = Util.addTwoVectors(handleOOBOptionOffset, [2,0])
					if(bottomBoundaryProximity <= this.OOBbuffer) handleOOBOptionOffset = Util.addTwoVectors(handleOOBOptionOffset, [-2,0])

					this.handleOOB(obj,handleOOBOptionOffset);
				}
				return false;
			}
		}
	}

	// //I want this to push the player back onto the platform if player is not moving onto another "steppable" object.
	handleOOB(obj, options){
		if(obj instanceof Player){
			// //Math to apply the offset in original x,y coord system
			obj.updatePos
		}
	}


}

export default GearPlatform;