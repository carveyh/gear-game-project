import MovingObject from "./moving_object.js";
import Player from "./player.js";
import Gear from "./gear.js";
import NullGear from "./null_gear.js";
import GearPlatform from "./gear_platform.js";

class Game{

	static NULL_GEAR = new NullGear({game: this});

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
			// counterClockwise: false,
			// timeBufferThreshold: 150,
			timeBufferThreshold: 150,
			timeBufferStep: 1,
			currentTimeBuffer: 0, 
			currentAngle: 0,
			maxRotationVel: 3,
			rotationAcc: 0.2,
			rotationVel: 5,
			rotationVel: 0.1,
			// rotationVel: 0.01,
			// rotationVel: 0,
			platformWidth: 30,
			// vertices: [0,45,90,135,180]
			vertices: [0, 60, 180, 270]
			// vertices: [60]
		});

		this.gears.push(gear);
	}


	checkCollisions(){
		// Iterate all in-game elements and check collision
		
		// //Check if there is a current gear
		this.checkCurrentGear();

		this.currentGear.gearPlatforms.forEach(platform => {
			platform.isObjInBounds(this.player);
		})

		// //Logic, but doesn't actually affect anything yet.
		// let allPlatforms = this.getAllGearPlatforms();
		// let anyCollision = allPlatforms.some(platform => {
		// 	return platform.isObjInBounds();
		// })
		
	}

	checkCurrentGear(){
		for(let i = 0; i < this.gears.length; i++){
			if(this.gears[i].isPlayerOn()){
				this.currentGear = this.gears[i];
				return;
			}
			this.currentGear = Game.NULL_GEAR;
		}
	}

	draw(ctx){
		// Iterate all in-game elements and draw on canvas

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

		this.getAllObjects().forEach(obj => {
			obj.draw(ctx);
		});
	}

	getAllObjects(){
		return []
		.concat(this.generics)
		.concat(this.gears)
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


	moveObjects(timeDelta){
		// Iterate all in-game elements, increment to new position after timeDelta
		this.getAllObjects().forEach(obj => {
			obj.move(timeDelta);
		})
	}

	remove(obj){
		// Delete an object from gameworld
	}

	step(timeDelta){
		// invokes moveObjects and checkCollisions
		this.moveObjects(timeDelta);
		this.checkCollisions();
		// console.log(this.currentGear);
	}



}

export default Game;