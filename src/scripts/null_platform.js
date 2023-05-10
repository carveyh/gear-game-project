import GearPlatform from "./gear_platform";

class NullPlatform extends GearPlatform{
	constructor(options){
		// //NullPlatform must be passed in an options obj with keys:
		// //game, gear

		options.pos = [-999,-999];
		options.vel = [0,0];
		options.radius = 1;
		options.color = "rgb(0,0,0,0)";

		// //options.gear //must be passed in with options arg.
		options.width = 1;
		options.angle = 0;
		options.OOBbuffer = 2;
		options.playerWasHere = false;

		super(options);
	}
}

export default NullPlatform;