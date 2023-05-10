// Bookmark: return to game_view.js to complete keyMapping() logic

import Game from "./game.js";
import MovingObject from "./moving_object";

class Player extends MovingObject{
	
	constructor(options){
		// options.pos ||= [Game.DIM_X / 4, Game.DIM_Y / 4];

		// //Now...we initialize player location to the same as first gear of the level.
		const spawnGear = options.game.gears[0];
		options.pos = spawnGear.pos.slice();
		// options.pos[1] += 5; //for testing issues with zero distance from current gear

		options.vel ||= [0,0];
		options.radius ||= 10;
		options.color ||= Player.COLOR;
		super(options)
		this.isMoving = false;
		this.gear = spawnGear;
		spawnGear.player = this;
		this.speedMultiplier = Player.SPEED_MULTIPLIER;
		this.oldPos = this.pos;
	}

	// static SPEED_MULTIPLIER = 3.5;
	static SPEED_MULTIPLIER = 2;
	static SPEED_MULTIPLIER = 1.5;
	// static SPEED_MULTIPLIER = 0.5;
	static COLOR = "red";

	customDraw(ctx){

	}

	customMove(timeDelta){

	}

	updatePos(newPos){
		this.oldPos = this.pos;
		this.pos = newPos;
	}

	updateSpeed(vel){
		this.vel[0] += vel[0] / 10 * this.speedMultiplier;
		this.vel[1] += vel[1] / 10 * this.speedMultiplier;
	}
}

export default Player;