import MovingObject from "./moving_object.js";
import Player from "./player.js";
import Gear from "./gear.js";
import GearPlatform from "./gear_platform.js";

class Game{

	constructor(){
		// Collection of gears, graph data structure
		// Collection of enemies

		// Collection of generic in-game elements (for testing)
		this.gearPlatforms = [];
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
		let gear = new Gear({
			// pos: [Game.DIM_X / 2, Game.DIM_Y - 90],
			vel: [0,0],
			// radius: 60,
			game: this,
			// counterClockwise: false,
			// timeBufferThreshold: 300,
			timeBufferThreshold: 150,
			timeBufferStep: 1,
			currentTimeBuffer: 0, 
			currentAngle: 0,
			rotationVel: 0.1,
			// rotationVel: 0.01,
			platformWidth: 30,
			// vertices: [0,45,90,135,180]
			vertices: [90,270]
		});

		if(this.gears.length === 0){
			gear.pos ||= [Game.DIM_X / 2, Game.DIM_Y - 90];
			gear.radius ||= 60;
			gear.counterClockwise = false;
		} else {
			let prevGear = this.gears[this.gears.length - 1];
			let prevPos = this.gears[this.gears.length - 1].pos;
			let prevRad = this.gears[this.gears.length - 1].radius;
			gear.pos = [prevPos[0], prevPos[1] - (prevRad * 2)];
			gear.radius = prevRad;
			gear.counterClockwise = !prevGear.counterClockwise;
		}

		
		this.gears.push(gear);
	}

	checkCollisions(){
		// Iterate all in-game elements and check collision
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