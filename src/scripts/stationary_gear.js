import Gear from "./gear";

class StationaryGear extends Gear{
	constructor(options){
		options.rotationVel = 0;
		options.rotationAcc = 0;
		options.vertices = [];
		super(options);	

	}

	drawGearImage(ctx){
		this.drawGearSilhouette(ctx);
	}

	draw(ctx){
		// console.log(this.pos);
		// console.log(this.radius);
		// ctx.fillStyle = `rgb(191, 100, 27)`;
		ctx.fillStyle = `#0e1a24`;
		ctx.fillRect(this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
	}
}

export default StationaryGear;