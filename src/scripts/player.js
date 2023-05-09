// Bookmark: return to game_view.js to complete keyMapping() logic

import Game from "./game.js";
import MovingObject from "./moving_object";

class Player extends MovingObject{
	
	constructor(options){
		options.pos ||= [Game.DIM_X / 3, Game.DIM_Y / 3];
		options.vel ||= [0,0];
		options.radius ||= 10;
		options.color ||= Player.COLOR;
		super(options)

		this.speedMultiplier = Player.SPEED_MULTIPLIER;

	}

	static SPEED_MULTIPLIER = 3.5;
	static COLOR = "red";

	customDraw(ctx){

	}

	customMove(timeDelta){

	}

	updateSpeed(vel){
		// this.vel = [0,0];
		this.vel[0] += vel[0] / 10 * this.speedMultiplier;
		this.vel[1] += vel[1] / 10 * this.speedMultiplier;
	}
}

export default Player;