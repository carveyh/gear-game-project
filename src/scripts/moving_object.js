import * as Util from "./util.js";
import Game from "./game.js";

class MovingObject{
	constructor(options){
		// this.game // Must be passed in
		this.game = options.game;

		// this.pos ||= [Game.DIM_X * Math.random(),Game.DIM_Y * Math.random()];
		this.pos = options.pos;
		this.vel = options.vel;
		this.radius = options.radius;
		this.color = options.color;

		this.vel ||= [Math.random() - 0.5, Math.random() - 0.5]
		this.radius ||= 40;
		this.color ||= MovingObject.COLOR;

	}

	static COLOR = "gray";

	draw(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		// Dev helper - checking position
		// this.displayCoords(ctx);
		
		// Subclass specific rendering
		this.customDraw(ctx);
	}

	// //Custom movement to be overwritten in subclass
	customDraw(ctx){}

	displayCoords(ctx){
		ctx.font = "30px Arial";
		ctx.fillStyle = "purple";
		ctx.fillText(`X: ${Math.floor(this.pos[0])}, Y: ${Math.floor(this.pos[1])}`,this.pos[0] + 30, this.pos[1] + 30)
	}

	displayCoordsOfPos(ctx,pos) {
		ctx.beginPath();
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
		ctx.fillText(`X: ${Math.floor(pos[0])}, Y: ${Math.floor(pos[1])}`,pos[0] + 30, pos[1] + 30)
		ctx.closePath();
	}

	isCollideWith(otherObject){

	}

	move(timeDelta){
		this.pos[0] = this.pos[0] + (this.vel[0] * timeDelta);
		this.pos[1] = this.pos[1] + (this.vel[1] * timeDelta);
		this.customMove(timeDelta);
	}

	// //Custom movement to be overwritten in subclass
	customMove(timeDelta){}
}

export default MovingObject;