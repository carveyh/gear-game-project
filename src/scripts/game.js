import MovingObject from "./moving_object.js";
import Player from "./player.js";
import Gear from "./gear.js";
import NullGear from "./null_gear.js";
import GearPlatform from "./gear_platform.js";
import NullPlatform from "./null_platform.js";
import StationaryGear from "./stationary_gear.js";
import * as Util from "./util.js";

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
		this.addStationaryGear();

		this.loadFirstLevel();

		// Player class
		this.player = new Player({game: this});
		this.isPaused = false;


		// Images
		this.gearShiny = new Image();
		this.gearShiny.src = './images/gear_shiny.png';
	}

	static DIM_X = 960;
	static DIM_Y = 600;
	static BGCOLOR = "pink";

	loadFirstLevel(){
		
	}

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
			newRadius = 40;
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
			timeBufferCurrent: 0, 
			currentAngle: 0,
			rotationVelMax: 3,
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

	addStationaryGear(){
		let newPos;
		let newRadius;
		let newCounterClockWise;
		if(this.gears.length === 0){
			newRadius = 40;
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

		let gear = new StationaryGear({
			pos: newPos,
			radius: newRadius,
			counterClockwise: newCounterClockWise,
			vel: [0,0],
			// radius: 60,
			game: this,
			timeBufferThreshold: 150,
			// timeBufferThreshold: 10,
			timeBufferStep: 1,
			timeBufferCurrent: 0, 
			currentAngle: 0,
			rotationVelMax: 3,
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

	levelTransition(){
		// Simple gradual color fill that fades out screen and fades it back in with new elements loaded.
		
	}

	checkCollisions(){
		// console.log(`checking collisions`);

		// Iterate all in-game elements and check collision
		
		// //Check if there is a current gear
		this.checkCurrentGear(this.player);

		if(this.currentGear){
			this.currentGear.checkCurrentPlatform();
		}
		
	}

	// //This will also handle player OOB.
	checkObjOOB(timeDelta){
		if(!this.currentGear.gearEngaged){
			// //If player is not "driving" a gear, check its walking in bounds
			let onPlatform = this.currentGear.gearPlatforms.some(platform => {
				return platform.isObjInBounds(this.player);
			})
			if(!onPlatform){
				this.player.unMoveAndStop(timeDelta);
			}
		} else {
			// //If player is "driving" a gear, check the gear being driven for collision with other world elements,
			// //currently just other gears.
			// //DO NOT CHECK COLLISION WITH ITSELF.
			// //This will bug if player accidentally clipped into another gear's collision area already.
			let drivenGearCollideWithOtherGears = this.gears.some(gear => {
				let distance = Util.distance(this.currentGear.pos, gear.pos);
				let separationNeeded = this.currentGear.radius + gear.radius;
				// console.log(`distance ${distance} | separation needed ${separationNeeded}`)
				return (gear !== this.currentGear) && (distance < separationNeeded);
			})
			// console.log(`${drivenGearCollideWithOtherGears}`);
			if(drivenGearCollideWithOtherGears){
				this.player.unMoveAndStop(timeDelta);
			}

			// //PLACEHOLDER: check collision with other stuff while in "driving mode"
			// 
		}
		
	}

	// //Refactor to use this for any obj type
	checkCurrentGear(obj){
		if(obj instanceof Player){
			if(this.currentGear.gearEngaged){
				return;
			}
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

	gearDirFlip(){
		this.currentGear.gearDirFlip();
	}

	gearAccel(){
		this.currentGear.gearAccel();
	}

	gearDecel(){
		this.currentGear.gearDecel();
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
		// let tempPlayerVel = this.player.vel.slice();
		// this.player.vel = [0,0];
		this.getAllBackgroundObjects().forEach(obj => {
			obj.move(timeDelta);
		})
		// this.player.vel = tempPlayerVel;
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
		// console.log(`checking collisions success after moving bg objects, and now trying after moving live objects`)
		this.checkCollisions();
		this.checkObjOOB(timeDelta);


		// //
		// this.moveObjects(timeDelta);
		// this.checkCollisions();
	}



}

export default Game;