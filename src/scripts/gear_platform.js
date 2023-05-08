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
		this.currentAngle = options.currentAngle;
		this.radius = options.radius;
	}

	isCollideWith(){

	}

	isCollideWithPlayer(){

	}


}

export default GearPlatform;