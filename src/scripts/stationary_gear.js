import Gear from "./gear";

class StationaryGear extends Gear{
	constructor(options){
		options.rotationVel = 0;
		options.rotationAcc = 0;
		options.vertices = [];
		super(options);	
		this.winningTile = options.winningTile;
		this.winningTile ||= false;
		this.winningColorTicker = 0;

	}

	drawGearImage(ctx){
		this.drawGearSilhouette(ctx);
	}

	draw(ctx){
		// console.log(this.pos);
		// console.log(this.radius);
		// ctx.fillStyle = `rgb(191, 100, 27)`;
		if(this.winningTile){
			this.winningFlash(ctx);
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);
		}
	}

	winningFlash(ctx){
		// this.winningColorTicker = (this.winningColorTicker + 1) % 255;
		// ctx.fillStyle = `rgb(255,${this.winningColorTicker %100000000000000},0)`;
		this.winningColorTicker = (this.winningColorTicker + 7);
		ctx.fillStyle = `rgb(255,${this.winningColorTicker % 255},0)`;
		ctx.fillRect(this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius * 2, this.radius * 2);

	}
}

export default StationaryGear;