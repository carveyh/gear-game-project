import Gear from "./gear";

class NullGear extends Gear{
	constructor(options){
		options.pos = [-999,-999];
		options.vel = [0,0];
		options.radius = 1;
		options.color = "rgb(0,0,0,0)";
		options.counterClockwise = false;
		options.timeBufferThreshold = 1;
		options.timeBufferStep = 1;
		options.currentTimeBuffer = 1;
		options.vertices = [];
		options.currentAngle = 0;
		options.rotationVel = 0;
		options.platformWidth = 0;
		options.maxRotationVel = 0;
		options.rotationAcc = 0;
		options.minSpeed = 0;
		options.ringGlow = 0;
		options.ringGlowIncrement = 0;
		options.maxRingGlow = 0;
		
		options.connectedGears = [];
		options.player = null;
		super(options);
	}
}

export default NullGear;