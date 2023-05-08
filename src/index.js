import * as Util from './scripts/util.js';
import GameView from './scripts/game_view.js';
import Game from './scripts/game.js';
import MovingObject from './scripts/moving_object.js';

// "npm run watch" in terminal

// Use defer in JS script tag in index.html? Yes we can, but standard practice is DOMContentLoaded.
document.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById('game-canvas');
	canvas.width = Game.DIM_X;
	canvas.height = Game.DIM_Y;
	const ctx = canvas.getContext('2d');
	const game = new Game();
	const gameView = new GameView(game, ctx);
	gameView.start();

})