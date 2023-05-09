import MovingObject from "./moving_object.js";
import Player from "./player.js";
import Gear from "./gear.js";
import GearPlatform from "./gear_platform.js";

class Game{

	constructor(){
		// Collection of gears, graph data structure
		// Collection of enemies

		// Collection of generic in-game elements (for testing)
		// this.gearPlatforms = [];
		this.generics = [];
		this.gears = [];

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
	
	allObjects(){
		return []
		.concat(this.generics)
		.concat(this.gears)
		.concat([this.player])
		;
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
		// let prevGear = this.gears[this.gears.length - 1];
		// let prevPos = this.gears[this.gears.length - 1].pos;
		// let prevRad = this.gears[this.gears.length - 1].radius;
		// console.log(`prevRad ${prevRad}`)
		if(this.gears.length === 0){
			newRadius = 45;
			newPos = [Game.DIM_X / 2, Game.DIM_Y - 190];
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
		
		let allPlatforms = this.getAllGearPlatforms();
		// allPlatforms.forEach(platform => {
		// 	console.log(platform.isCollideWithPlayer());
		// })
		let anyCollision = allPlatforms.some(platform => {
			return platform.isCollideWithPlayer();
		})
		console.log(anyCollision);
		
	}

	getAllGearPlatforms(){
		let allPlatforms = [];
		this.gears.forEach(gear => {
			// console.log(`hi console ${gear.width}`)
			allPlatforms = allPlatforms.concat(gear.gearPlatforms);
		})
		// console.log(`hi console ${allPlatforms}`)
		return allPlatforms;
	}

	isOutOfBounds(pos){
		// Check OOB.
	}

	draw(ctx){
		// Iterate all in-game elements and draw on canvas
		// ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y);
		ctx.beginPath();
		ctx.fillStyle = Game.BGCOLOR;
		ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y);
		ctx.closePath();
		// ctx.drawImage(this.background,0,0, Game.DIM_X, Game.DIM_Y);
		
		// console.log(this.allObjects())
		this.allObjects().forEach(obj => {
			obj.draw(ctx);
		});
	}

	moveObjects(timeDelta){
		// console.log("hi")
		// Iterate all in-game elements, increment to new position after timeDelta
		// console.log(this.allObjects());
		this.allObjects().forEach(obj => {
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
	}



}

export default Game;