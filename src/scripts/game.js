import MovingObject from "./moving_object.js";
import Player from "./player.js";
import Gear from "./gear.js";
import NullGear from "./null_gear.js";
import GearPlatform from "./gear_platform.js";
import NullPlatform from "./null_platform.js";

class Game{

	// //Revisit. `game: this`, `this` will technically refer to Game class not the active or any Game instance.
	// static NULL_GEAR = new NullGear({game: this});
	static NULL_GEAR = new NullGear({game: null});

	// //Revisit. Attempts not being read successfully by Gear constructor() as the default value.
	// static NULL_PLATFORM = new NullPlatform({game: this, gear: this.NULL_GEAR});
	// static NULL_PLATFORM = new NullPlatform({game: this, gear: new NullGear({game: this})});
	// static NULL_PLATFORM = new NullPlatform({game: this, gear: null});

	constructor(){
		// Collection of gears, graph data structure
		// Collection of enemies

		// Collection of generic in-game elements (for testing)
		// this.gearPlatforms = []; //actually let each gear manage each platform...should not do this.
		this.generics = [];
		this.gears = [];

		

		this.currentGear = Game.NULL_GEAR;

		// Add generic gears
		this.addGear();
		this.addGear();
		this.addGear();
		this.addGear();
		this.addGear();
		this.addGear();

		// Player class
		this.player = new Player({game: this});

		this.isPaused = false;

		// this.addGenericObj();

		// Images
		this.gearShiny = new Image();
		this.gearShiny.src = './images/gear_shiny.png';
	}

	static DIM_X = 960;
	static DIM_Y = 600;
	static BGCOLOR = "pink";

	addGenericObj(){
		this.generics.push(
			new MovingObject({game: this})
		)
	}

	addGear(){
		let newPos;
		let newRadius;
		let newCounterClockWise;
		if(this.gears.length === 0){
			newRadius = 60;
			newPos = [Game.DIM_X / 2, Game.DIM_Y - 100];
			newCounterClockWise = false;
		} else {
			let prevGear = this.gears[this.gears.length - 1];
			let prevPos = this.gears[this.gears.length - 1].pos;
			let prevRad = this.gears[this.gears.length - 1].radius;
			newPos = [prevPos[0], prevPos[1] - (prevRad * 2)];
			newRadius = prevRad;
			newCounterClockWise = !prevGear.counterClockwise;
		}

		let gear = new Gear({
			pos: newPos,
			radius: newRadius,
			counterClockwise: newCounterClockWise,
			vel: [0,0],
			// radius: 60,
			game: this,
			timeBufferThreshold: 150,
			// timeBufferThreshold: 10,
			timeBufferStep: 1,
			currentTimeBuffer: 0, 
			currentAngle: 0,
			maxRotationVel: 3,
			rotationAcc: 0.2,
			rotationVel: 5,
			rotationVel: 0.5,
			rotationVel: 0.1,
			// rotationVel: 0.05,
			// rotationVel: 0.01,
			// rotationVel: 0,
			platformWidth: 30,
			// vertices: [0,45,90,135,180, 270]
			// vertices: [0, 60, 180, 270]
			// vertices: [45, 90, 225, 270]
			// vertices: [45, 90, 157.5, 225, 270, 337.5]
			// vertices: [0,180]
			vertices: [0,115,245]
		});

		this.gears.push(gear);
	}


	checkCollisions(){
		console.log(`checking collisions`);

		// Iterate all in-game elements and check collision
		
		// //Check if there is a current gear
		this.checkCurrentGear(this.player);
		console.log(`${this.currentGear}`)

		if(this.currentGear){
			this.currentGear.checkCurrentPlatform();
		}
		
	}

	// //This will also handle player OOB.
	checkObjOOB(timeDelta){
		// console.log(`current gear: ${this.currentGear.pos}`);
		// console.log(`current platform: ${this.currentGear.gearPlatforms[1].angle}`);

		// //Check if a player moved onto a valid gear first:
		// let onGear = this.gears.some(gear => {
		// 	return gear.isPlayerOn();
		// })
		// if(!onGear){
		// 	this.player.unMoveAndStop(timeDelta);

		// }

		// this.checkCurrentGear();

		// //How about: we check if any player is on any of the gear platforms on the gear?
		let onPlatform = this.currentGear.gearPlatforms.some(platform => {
			return platform.isObjInBounds(this.player);
		})
		if(!onPlatform){
			this.player.unMoveAndStop(timeDelta);
		}
	}

	// //Refactor to use this for any obj type
	checkCurrentGear(obj){
		if(obj instanceof Player){
			let isOnAGear = false;

			for(let i = 0; i < this.gears.length; i++){
				
				// //REFACTOR: change gear.isPlayerOn to be more dynamic and accept other obj types.
				if(this.gears[i].isPlayerOn()){
					this.currentGear = this.gears[i];
					isOnAGear = true;
					break;
				}
				// this.currentGear = Game.NULL_GEAR;
			}
			if(!isOnAGear){
				// this.currentGear = null;
				// obj.unMoveAndStop();
			}
			
		}

		// //Placeholder to check for other class types
		// if(obj instanceof OtherClass){}
	}

	draw(ctx){
		// Iterate all in-game elements and draw on canvas
		
		// //Draw game background
		this.drawGameBackground(ctx);


		this.getAllObjects().forEach(obj => {
			obj.draw(ctx);
		});
	}

	drawGameBackground(ctx){
		// //Draw background: simple color background
		// ctx.beginPath();
		// ctx.fillStyle = Game.BGCOLOR;
		// ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y);
		// ctx.closePath();
		// ctx.drawImage(this.background,0,0, Game.DIM_X, Game.DIM_Y);
		
		// //Draw background: gradient background
		ctx.beginPath();
		// const gradient = ctx.createLinearGradient(0, 0, Game.DIM_X, Game.DIM_Y);
		const gradient = ctx.createLinearGradient(0, 0, Game.DIM_X, 0);
		gradient.addColorStop(0,`rgb(0,0,255)`);
		gradient.addColorStop(0.25,`rgb(255,255,255)`);
		gradient.addColorStop(0.75,`rgb(255,255,255)`);
		gradient.addColorStop(1,`rgb(0,0,255)`);
		ctx.fillStyle = gradient;
		ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y);

		ctx.closePath();
	}

	// //Deprecating into (1) getAllBackgroundObjects then (2) getAllLiveObjects
	// //Because the world spins no matter what, and living objects can then interact after world rules apply.
	getAllObjects(){
		return []
		.concat(this.generics)
		.concat(this.gears)
		.concat([this.player])
		;
	}

	getAllBackgroundObjects(){
		return []
		.concat(this.generics)
		.concat(this.gears)
		;
	}
	
	getAllLiveObjects(){
		return []
		.concat([this.player])
		;
	}

	getAllGearPlatforms(){
		let allPlatforms = [];
		this.gears.forEach(gear => {
			allPlatforms = allPlatforms.concat(gear.gearPlatforms);
		})
		return allPlatforms;
	}

	gearAccel(){
		this.currentGear.gearAccel();
	}

	gearDecel(){
		this.currentGear.gearDecel();
	}

	isOutOfBounds(pos){
		// Check OOB.
	}

	// //Deprecating into (1) moveBackgroundObjects then (2) moveLiveObjects
	// //Because the world spins no matter what, and living objects can then interact after world rules apply.
	moveObjects(timeDelta){
		// Iterate all in-game elements, increment to new position after timeDelta
		this.getAllObjects().forEach(obj => {
			obj.move(timeDelta);
		})
	}

	moveBackgroundObjects(timeDelta){
		// Disable player movement first...and then restore it?
		let tempPlayerVel = this.player.vel.slice();
		this.player.vel = [0,0];
		this.getAllBackgroundObjects().forEach(obj => {
			obj.move(timeDelta);
		})
		this.player.vel = tempPlayerVel;
	}

	moveLiveObjects(timeDelta){
		this.getAllLiveObjects().forEach(obj => {
			obj.move(timeDelta);
		})
	}

	remove(obj){
		// Delete an object from gameworld
	}

	step(timeDelta){
		// invokes moveObjects and checkCollisions

		// //Step 1a: move background objs; Step 1b: checks collisions
		this.moveBackgroundObjects(timeDelta);
		// // checkCollisions() will update game.currentGear;
		// this.checkCollisions();

		// //Step 2a: move live objs; Step 2b: checks collisions
		this.checkCollisions();
		this.moveLiveObjects(timeDelta);
		// // checkCollisions() will update game.currentGear;
		console.log(`checking collisions success after moving bg objects, and now trying after moving live objects`)
		this.checkCollisions();
		this.checkObjOOB(timeDelta);


		// //
		// this.moveObjects(timeDelta);
		// this.checkCollisions();
	}



}

export default Game;