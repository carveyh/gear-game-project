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
		
		
		// Images
		this.gearShiny = new Image();
		this.gearShiny.src = './images/gear_shiny.png';
		
		// Level / Screen transition
		this.levelNumber = 1;
		this.levelOver = false;
		this.transitionCountDown = 255;
		this.levelTimer = 0; //for timing story events per level
		

		this.loadFirstLevel();
		// this.loadThirdLevel();
		
		

	}

	static DIM_X = 960;
	static DIM_Y = 600;
	static BGCOLOR = "pink";


	firstGearLocation(){
		return [Game.DIM_X / 2, Game.DIM_Y - 100];
	}

	addCustomGear(options){
		options.verticies ||= [0,180];
		options.rotationVel ||= 0;
		options.radius ||= 40;
		if(options.rotationVelMax !== 0){
			options.rotationVelMax = 3;
		}
		options.timeBufferThreshold ||= 150;
		if(this.gears.length > 0){
			options.counterClockwise ||= this.gears[this.gears.length - 1].counterClockwise ? false : true; 
			let prevGear = this.gears[this.gears.length - 1];
			let prevPos = prevGear.pos;
			let prevRad = prevGear.radius;
			options.pos ||= [prevPos[0], prevPos[1] - (prevRad * 2)];
		} else {
			options.counterClockwise = false;
			options.pos ||= this.firstGearLocation();
		}

		let gear = new Gear({
				game: this,
				pos: options.pos,
				vel: [0,0],
				radius: options.radius,
				color: "gray",
				counterClockwise: options.counterClockwise,
				platformWidth: 30,
				timeBufferThreshold: options.timeBufferThreshold,
				timeBufferStep: 1,
				timeBufferCurrent: 0,
				vertices: options.vertices,
				currentAngle: 0,
				// rotationVel: 0.1,
				rotationVel: options.rotationVel,
				// rotationVelMin: 0,
				rotationVelMax: options.rotationVelMax,
				rotationVelMin: 0,
				rotationAcc: 0.2,
				gearEngagable: options.gearEngagable
				
		});
		this.gears.push(gear);
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
			
			gearEngagable: false,

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

	addStationaryGear(options){
		if(options){
			options.color ||= `#0e1a24`;
		}
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

		if(options && options.pos){
			newPos = options.pos;
		}

		let gear = new StationaryGear({
			winningTile: options.winningTile,
			color: options.color,
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

	loadLevelReset(){
		this.dialogueEl = document.querySelector('#game-dialogue');
		this.dialogueEl.innerText = "";
		document.querySelector('body').style.backgroundColor = "white";
		this.gears = [];
		this.currentGear = Game.NULL_GEAR;

		// Player class
		// //Do this after setting up gear placements, since player will auto-center to first gear.
		this.isPaused = false;
		this.levelTimer = 0;
		this.transitionCountDown = 255;
	}

	loadFirstLevel(){
		this.loadLevelReset();
		this.levelNumber = 1;

		this.addCustomGear({vertices: [270], gearEngagable: false});
		this.addCustomGear({vertices: [90, 270], gearEngagable: false});
		this.addCustomGear({vertices: [90, 180, 270], gearEngagable: false});
		this.addCustomGear({vertices: [90, 270], gearEngagable: false});
		this.addCustomGear({vertices: [90, 270], gearEngagable: false});
		this.addStationaryGear({winningTile: true, gearEngagable: false});
		this.addCustomGear({pos:[400,340],vertices:[0,180], gearEngagable: false});

		this.addCustomGear({
			pos:[320,340],vertices: [0, 90, 180, 270],
			timeBufferThreshold:1, gearEngagable: false
		});
		this.addCustomGear({
			pos:[240,340],
			vertices:[],
			rotationVel:5,
			timeBufferThreshold:70, gearEngagable: false
		});

		this.player = new Player({game: this});

		this.saved = false;
		this.alreadySaved = false;

		this.beforeHelpText = [
			`Heyy!!!`, 
			`Help!!!!`, 
			`Forget the temptingly glowing yellow tile - heeeeelp!!!`, 
			`🤢`,
			`There must be something "u" can do...oh god`, 
			`I'll tell you something good...I swear...pls...`];
		this.afterHelpText = [
			`Thank you... I need to be alone for a bit... 😵‍💫`
		];
		this.masochistText = [
			`OH GOD WHY`
		];

		// this.kenny = new Player({game: this, color: 'darkgreen', pos: [241,342]});

	}

	checkFirstLevelEvents(){
		// this.dialogueEl = document.querySelector('#game-dialogue');
		// if(this.gears[this.gears.length - 1].rotationVel === 0 && !this.alreadySaved){
		console.log(`gear rotation vel : ${this.gears[this.gears.length - 1].rotationVel}`)
		if(this.gears[this.gears.length - 1].rotationVel <= 0 && !this.saved){
			this.saved = true;
			// this.alreadySaved = true;
		}
		// if(this.gears[this.gears.length - 1].rotationVel > 1 && this.alreadySaved){
		// 	this.saved = false;
		// }
		if(this.levelTimer > 100){
			// if(!this.saved && !this.alreadySaved){
			if(!this.saved){
				let idx = Math.floor(this.levelTimer / 300) % this.beforeHelpText.length;
				this.dialogueEl.innerText = this.beforeHelpText[idx];
			}
			// if(this.saved && this.alreadySaved){
			if(this.saved){
				this.dialogueEl.innerText = this.afterHelpText[0];
			}
		}
	}
	checkFourthLevelEvents(){
		if(this.levelTimer > 300){
			this.dialogueEl.innerText = "If only there was a way to get across the space...";
		}
	}

	loadSecondLevel(){
		this.loadLevelReset();

		this.addGear();
		this.addGear();
		this.addGear();
		this.addGear();
		this.addGear();
		this.addStationaryGear({winningTile: true});

		this.player = new Player({game: this});
		
		// this.kenny = new Player();
	}
	
	loadThirdLevel(){
		this.loadLevelReset();

		this.addCustomGear({
			pos: [Game.DIM_X * 0.25, Game.DIM_Y - 100], vertices: [270], gearEngagable: false
		});
		this.addCustomGear({vertices: [90, 270], gearEngagable: false});
		this.addCustomGear({vertices: [90], gearEngagable: false});

		this.addStationaryGear({
			pos: [Game.DIM_X * 0.75, Game.DIM_Y - 100], vertices: [270], gearEngagable: false,
			winningTile: true});
		this.addCustomGear({vertices: [90, 270], gearEngagable: false});
		this.addCustomGear({vertices: [90], gearEngagable: false, rotationVelMax: 0});
		
		this.player = new Player({game: this});

		console.log(`max ${this.gears[5].rotationVelMax} | current ${this.gears[5].rotationVel}`)

	}

	checkThirdLevelEvents(){
		if(this.currentGear === this.gears[2] && this.currentGear.rotationVel >= this.currentGear.rotationVelMax){
			this.gears[2].rotationVel = 0;
			this.gears[2].currentAngle = 0;
			this.player.pos = this.gears[5].pos.slice();
			this.player.vel = [0,0];
			// this.checkCurrentGear();
			this.gears[5].rotationVel = 0;
			this.gears[5].currentAngle = 0;
			this.gears.forEach(gear => {
				gear.rotationVel = 0;
				gear.currentAngle = 0;
			})

		}
	}

	loadFourthLevel(){
		this.loadLevelReset();

		this.addCustomGear({vertices: [270]});
		this.addCustomGear({vertices: [], pos:[200, 420]});
		this.addCustomGear({vertices: [], pos:[480, 350]});
		this.addCustomGear({vertices: [], pos:[620, 250]});
		// this.addCustomGear({vertices: [90, 270]});
		// this.addCustomGear({vertices: [90, 270]});
		// this.addCustomGear({vertices: [90]});
		this.addCustomGear({vertices: [90], pos:[480, 100]});


		this.player = new Player({game: this});
	}

	loadFifthLevel(){
		this.levelNumber = 5;
		this.loadLevelReset();

		this.addCustomGear({radius: 80, rotationVel: 0.5, vertices: [0,160,180,205], pos:[Game.DIM_X / 3, Game.DIM_Y / 2]});

		this.player = new Player({game: this});
	}

	levelTransitionOut(){
		// Simple gradual color fill of canvas that fades out screen and fades it back in with new elements loaded.
		let canvas = document.querySelector('#game-canvas');
		let ctx = canvas.getContext('2d');
		// ctx.fillStyle = `rgb(${this.transitionCountDown},${this.transitionCountDown},255)`;
		// ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y);
		// console.log(this.transitionCountDown);
		// document.querySelector('#spoilers').style.color = `rgb(${this.blueCountdown},${this.blueCountdown},255)`;
		document.querySelector('#game-canvas').style.borderColor = `rgb(${this.transitionCountDown},${this.transitionCountDown},255)`;
		if(this.transitionCountDown-- > 0) {
			setTimeout(this.levelTransitionOut.bind(this), 1, this.transitionCountDown)
		} else {
			this.transitionCountDown = 255;
		}
	}

	// levelTransitionIn(){
	// 	// Add later.
	// }

	checkLevelOver(){
		switch(this.levelNumber){
			case 1:
				if(this.player.pos[1] < 145){
					console.log("level over!")
					this.levelTransitionOut();
					this.levelNumber += 1;
					this.loadSecondLevel();
				}
				break;
			case 2:
				if(this.player.pos[1] < 145){
					this.levelTransitionOut();
					this.levelNumber +=1;
					this.loadThirdLevel();
				}
				break;
			case 3:
				if((this.player.pos[0] > 600) && (this.player.pos[1] > 459)){
					this.levelTransitionOut();
					this.levelNumber +=1;
					this.loadFourthLevel();
				}
				break;
			case 4:
				if(this.player.pos[1] < 145){
					console.log("level over!")
					this.levelTransitionOut();
					this.levelNumber += 1;
					this.loadFifthLevel();
				}
				break;
		}
		
	}

	// Async functions to help with showing a screen transition
	sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}

	async pause() {
		await sleep(3000);
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
			// //Level design coding...refactor later!
			ctx.fillStyle = `RGB(198,81,2)`;
			if(this.levelNumber === 1 && obj == this.gears[6]){
				// ctx.fillRect(360, 300, 80,80);
				ctx.roundRect(360, 300, 80,80, [40]);
				ctx.beginPath();
				ctx.arc(400,340,45,0,2*Math.PI,false)
				ctx.fill();
				ctx.closePath();
			}
			if(this.levelNumber === 3 && obj == this.gears[0]){
				// ctx.fillRect(this.gears[0].pos[0]-40, this.gears[0].pos[1]-40, 80,80);
				// ctx.roundRect(this.gears[0].pos[0]-40, this.gears[0].pos[1]-40, 80,80, [40]);
				ctx.beginPath();
				ctx.arc(this.gears[0].pos[0],this.gears[0].pos[1],45,0,2*Math.PI,false)
				ctx.fill();
				ctx.closePath();
			}
			if(this.levelNumber === 3 && obj == this.gears[1]){
				// ctx.fillRect(this.gears[1].pos[0]-40, this.gears[1].pos[1]-40, 80,80);
				// ctx.roundRect(this.gears[1].pos[0]-40, this.gears[1].pos[1]-40, 80,80, [40]);
				ctx.beginPath();
				ctx.arc(this.gears[1].pos[0],this.gears[1].pos[1],45,0,2*Math.PI,false)
				ctx.fill();
				ctx.closePath();
			}
			if(this.levelNumber === 3 && obj == this.gears[4]){
				// ctx.fillRect(this.gears[4].pos[0]-40, this.gears[4].pos[1]-40, 80,80);
				// ctx.roundRect(this.gears[4].pos[0]-40, this.gears[4].pos[1]-40, 80,80, [40]);
				ctx.beginPath();
				ctx.arc(this.gears[4].pos[0],this.gears[4].pos[1],45,0,2*Math.PI,false)
				ctx.fill()
				ctx.closePath();
			}
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
		// .concat([this.kenny])
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
		// .concat([this.kenny])
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
		switch(this.levelNumber){
			case 1:
				this.gears[8].gearAccel();
				this.gears[7].gearAccel();
				break;
			default:
				this.currentGear.gearAccel();
				break;
		}
		
	}

	gearDecel(){
		switch(this.levelNumber){
			case 1:
				this.gears[8].gearDecel();
				this.gears[7].gearDecel();
				break;
			default:
				this.currentGear.gearDecel();
				break;
		}
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
			// console.log(this.kenny.pos);
		// if(!this.levelOver){
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
	
			// //Did the level end?
			this.checkLevelOver();
		// } else {
			// this.levelTransitionOut();
			// this.pause();
		// }

			// //Check level specific events
			this.levelTimer++;
			switch(this.levelNumber){
				case 1:
					this.checkFirstLevelEvents();
					break;
				case 3:
					this.checkThirdLevelEvents();
					// console.log(`vel ${this.currentGear.rotationVel} velMax ${this.currentGear.rotationVelMax}`)
					break;
				case 4:
					this.checkFourthLevelEvents();
					break;
			}
			console.log(this.levelTimer)
	}



}

export default Game;