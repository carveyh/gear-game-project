import Player from "./player.js";

class GameView{

	constructor(game, ctx){
		this.game = game;
		this.ctx = ctx;
		this.lastTime = 0;
		this.keyPresses = {};

		this.bindKeyHandlers();
	}

	static WASD_MOVES = {
		w: [0,-1],
		a: [-1,0],
		s: [0,1],
		d: [1,0]
	};

	animate(currentTime){
		console.log(this.lastTime);
		const timeDelta = currentTime - this.lastTime;
		this.game.step(timeDelta);
		this.game.draw(this.ctx);
		this.lastTime = currentTime;

		requestAnimationFrame(this.animate.bind(this));
	}

	start(){
		requestAnimationFrame(this.animate.bind(this));
	}

	bindKeyHandlers(){
		document.addEventListener('keydown', (e) => {
			let key = e.key;
			this.keyPresses[key] = true;
			this.keyMapping.call(this);
			e.preventDefault();
		})
		document.addEventListener('keyup', (e) => {
			let key = e.key;
			delete this.keyPresses[key];
			this.keyMapping.call(this);
			e.preventDefault();
		})
	}

	keyMapping(){
		if(Object.keys(this.keyPresses).length === 0){
			// console.log("no presses atm")
			this.game.player.vel = [0,0];
			this.game.player.isMoving = false;
			return;
		}

		// reset player velocity, then apply all input velocity modifiers
		this.game.player.vel = [0,0]
		Object.keys(this.keyPresses).forEach(key => {
			// console.log(Object.keys(this.keyPresses))
			if(GameView.WASD_MOVES[key]){
				this.game.player.isMoving = true;
				this.game.player.updateSpeed(GameView.WASD_MOVES[key]);
			} else {
				// this.game.player.isMoving = false;
			}

			if(key === ' '){
				// this.game.ship.fireBullet();
			}
		})
	}
}

export default GameView;