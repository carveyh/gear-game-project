import * as Util from "./util.js";
import Game from "./game.js";
import MovingObject from "./moving_object";
import GearPlatform from "./gear_platform.js";
import NullPlatform from "./null_platform.js";

class Gear extends MovingObject{
	constructor(options){
		super(options);
		// this.pos = options.pos;
		this.counterClockwise = options.counterClockwise;
		this.timeBufferThreshold = options.timeBufferThreshold;
		this.timeBufferStep = options.timeBufferStep;
		this.timeBufferCurrent = options.timeBufferCurrent;
		this.vertices = options.vertices; //array of degrees
		this.currentAngle = options.currentAngle; //current rotation degree
		this.rotationVel = options.rotationVel;
		// this.platformWidth = options.platformWidth;
		this.platformWidth = options.platformWidth;
		this.platformWidth ||= options.radius / 2;
		this.vertices ||= [0,180]; //will have default a straight path through
		this.connectedGears ||= []; //graph structure of connected gears
		this.gearPlatforms = [];

		// //Revisit. Game.NULL_PLATFORM errors "Uncaught TypeError: Cannot read properties of undefined". Handling with a null for now.
		// this.currentPlatform = Game.NULL_PLATFORM;
		this.currentPlatform = null;

		// this.player = null;
		this.rotationVelMax = options.rotationVelMax;
		this.rotationAcc = options.rotationAcc;
		this.rotationVelMin = 0;

		this.ringGlow = 0;
		this.ringGlowIncrement = 0.03;
		this.ringGlowMax = 1;

		this.gearEngaged = false;
		this.gearEngagable = true;

		this.blueCountdown = 255;
		this.oldCanvasBorder = document.querySelector('#game-canvas').style.border;

		this.generatePlatforms();
	}

	generatePlatforms(){
		this.vertices.forEach(vertex => {
			this.gearPlatforms.push(
				new GearPlatform({
					pos: this.pos,
					vel: this.vel,
					game: this.game,
					gear: this,

					width: this.platformWidth,
					radius: this.radius,
					angle: vertex
					
				})
			)
		});
	}

	toggleEngage(){
		// //Only activate if player is around the center, and check if this gear is current gear. Also gear must be "driveable" or is gearEngagable.
		if(this.game.currentGear === this 
			&& Util.distance(this.game.player.pos, this.pos) < this.platformWidth / 2
			&& this.gearEngagable
			){
			this.gearEngaged = !this.gearEngaged;
			if(this.gearEngaged){
				this.game.player.pos = this.pos.slice(); //player should snap to gear center, not the other way around. Otherwise player can "pull" a gear a small distance and create clipping into other gears triggering collision detection and get stuck
				this.pos = this.game.player.pos;
				this.gearPlatforms.forEach(platform => {
					platform.pos = this.game.player.pos;
				})
				this.fadePageToBlue();
			} else {
				this.blueCountdown = 255;
				document.querySelector('body').style.backgroundColor = `rgb(255,255,255)`;
				document.querySelector('#game-canvas').style.borderColor = `lightgray`;
				// document.querySelector('#spoilers').style.color = `white`;
				this.pos = this.game.player.pos.slice();
				this.gearPlatforms.forEach(platform => {
					platform.pos = this.game.player.pos.slice();
				})
			}
		}
	}

	fadePageToBlue(){
		document.querySelector('body').style.backgroundColor = `rgb(${this.blueCountdown},${this.blueCountdown},255)`;
		// document.querySelector('#spoilers').style.color = `rgb(${this.blueCountdown},${this.blueCountdown},255)`;
		document.querySelector('#game-canvas').style.borderColor = `rgb(${this.blueCountdown},${this.blueCountdown},255)`;
		if(this.blueCountdown-- > 0) {
			setTimeout(this.fadePageToBlue.bind(this), 1, this.blueCountdown)
		} else {
			// this.blueCountdown = 255;
		}
	}

	gearDirFlip(){
		this.counterClockwise = !this.counterClockwise;
	}

	gearAccel(){
		if(this.gearEngagable && this.rotationVel < this.rotationVelMax){
			this.game.player.toggleEngage();
			this.rotationVel += this.rotationAcc;
		}
	}

	gearDecel(){
		if(this.gearEngagable && this.rotationVel > this.rotationVelMin){
			this.game.player.toggleEngage();
			this.rotationVel -= this.rotationAcc;
		}

	}

	draw(ctx){
		// //Apply translation and rotation to canvas origin
		ctx.save();
		ctx.translate(this.pos[0], this.pos[1]);
		ctx.rotate(Util.radians(this.currentAngle));

		// //Draw Gear canvas basic shape
		this.drawGearSilhouette(ctx);

		// //Draw outline of gear if player is standing on it
		this.drawGearOutline(ctx);

		// //Gear - image file
		this.drawGearImage(ctx);

		// //Draw all platforms - object representation of each path
		this.drawAllPlatforms(ctx);

		// //Draw floating text (optional)
		this.drawFloatText(ctx);

		// //Revert translation and rotation to canvas origin
		ctx.restore();

		// //LEVEL DESIGN HELPER
		this.displayCoords(ctx);

	}

	drawFloatText(ctx){
		// //Just proving to myself you can fillText with emojis (for most browsers)
		// ctx.font = "20px Georgia";
		// ctx.fillText("🥹", 100,100);
	}

	drawGearOutline(ctx){
		ctx.beginPath();
		if(this.isPlayerOn()){
		// if(this.game.currentGear === this){
			if(this.ringGlow < this.ringGlowMax) this.ringGlow += this.ringGlowIncrement * 1.1;
		} else {
			if(this.ringGlow > 0) this.ringGlow -= this.ringGlowIncrement * 3;
		}
		ctx.strokeStyle = `rgb(255,255,0,${this.ringGlow})`;
		ctx.lineWidth = 5;
		// ctx.fontStyle = "40px";
		// ctx.fillFont("HMM", 0,0)
		ctx.arc(0,0,this.radius + 9,0,2*Math.PI,false);
		ctx.stroke();
		ctx.closePath();
	}

	drawGearSilhouette(ctx){
		// //Gear itself - the canvas shape
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(0,0,this.radius,0,2*Math.PI,false);
		ctx.fill();
		ctx.closePath();
	}

	drawGearInnerRing(ctx){
		if(this.game.currentGear === this){
			// ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255}, ${Math.random() * 255})`;
			ctx.strokeStyle = `rgb(255,255,0)`;
			ctx.arc(0,0,this.platformWidth / 2, 0, 2*Math.PI, false)
			ctx.stroke();
		}
	}

	drawGearImage(ctx){
		// ctx.drawImage(this.game.gearShiny, 0,0, 291, 291, this.radius * -1, this.radius * -1, this.radius * 2, this.radius * 2)

		let oppOffset = 24;
		if(this.counterClockwise){
			ctx.rotate(Util.radians(360/oppOffset));
		}
		ctx.drawImage(
			this.game.gearShiny, 
			0,
			0, 
			291, // original image width
			291, // original image height
			(this.radius + 5) * -1, 
			(this.radius + 5) * -1, 
			(this.radius + 5) * 2, 
			(this.radius + 5) * 2
		);

		if(this.counterClockwise){
			ctx.rotate(Util.radians(360/oppOffset) * -1);
		}
	}

	// //Visualize platforms - draw all platforms
	drawAllPlatforms(ctx){
		// this.drawPlatformCenter(ctx);
		this.playerOnAPlatform = false;
		this.gearPlatforms.forEach(platform => {
			this.drawPlatform(platform, ctx);
		})
		if(this.playerOnAPlatform) this.drawGearInnerRing(ctx);
	}

	// //Draw center circle area
	// drawPlatformCenter(ctx){
	// 	ctx.beginPath();
	// 	ctx.strokeStyle = "rgb(0,255,0)";
	// 	ctx.arc(0, 0, this.platformWidth / 2, 0, 2*Math.PI,false);
	// 	ctx.stroke();
	// 	ctx.closePath();
	// }

	// //Draw an individual platform
	drawPlatform(platform, ctx){
		ctx.beginPath();
		// let exitLocation = Util.scaledVectorDegrees(platform.angle, platform.radius);
		// ctx.moveTo(0, 0);

		// ctx.lineTo(exitLocation[0], exitLocation[1]);
		// ctx.lineWidth = this.platformWidth;
		// ctx.strokeStyle = "rgb(0,255,0)";
		// ctx.stroke();
		ctx.rotate(Util.radians(platform.angle));
		
		if((this.game.currentGear === this) && (platform.isObjInBounds(this.game.player))){
		// if((this.game.currentGear === this)){
		// if(platform.isObjInBounds(this.game.player)){
			ctx.fillStyle = "rgb(0,255,0)";
			ctx.fillRect(0, (platform.width / 2) * -1, platform.radius, platform.width );
			ctx.arc(0, 0, this.platformWidth / 2, 0, 2*Math.PI,false);
			ctx.stroke();
			this.playerOnAPlatform = true;
			

		} else {

			// ctx.strokeStyle = "rgb(0,255,0)";
			ctx.fillStyle = "rgb(0,255,255,0.5)";
			ctx.fillRect(0, (platform.width / 2) * -1, platform.radius, platform.width );
			ctx.fillStyle = "rgb(0,255,255,0.2)";
			ctx.arc(0, 0, this.platformWidth / 2, 0, 2*Math.PI,false);
			ctx.fill();
		}



		// //DISPLAY ANGLE OF EACH PLATFORM
		// ctx.font = "20px Arial";
		// ctx.fillStyle = "rgb(150,150,150)";
		// ctx.fillText(`  ${platform.angle}`, platform.radius, 5)
		ctx.rotate(Util.radians(platform.angle) * -1);

		// this.displayCoords(ctx);

		ctx.closePath();
	}



	// //Detects if player is on a gear
	isPlayerOn(){
		let gearToGearJumpBuffer = 0;
		// let gearToGearJumpBuffer = 5;
		// Permit a jump buffer if player is btwn 


		return (Util.distance(this.game.player.pos, this.pos) < this.radius + gearToGearJumpBuffer);
	}

	checkCurrentPlatform(){
		for(let i = 0; i < this.gearPlatforms.length; i++){
			if(this.gearPlatforms[i].isObjInBounds(this.game.player)){
				this.currentPlatform = this.gearPlatforms[i];
				return;
			}
		}
		// this.currentPlatform = Game.NULL_PLATFORM;
	}

	customMove(timeDelta){
		// //WITH stutter step and smooth periodic stop.

		this.timeBufferCurrent += this.timeBufferStep * timeDelta / 20;
		
		let rotationDirection = 1;
		this.counterClockwise ? rotationDirection = -1 : rotationDirection = 1;
		let finalAngleChange = this.rotationVel * rotationDirection * timeDelta;

		// //NEED TO DRY - BLOCK WITH MINOR DIFF 1of2 PARTS
		if((this.timeBufferCurrent % this.timeBufferThreshold) < this.timeBufferThreshold * .65){
			this.currentAngle = (this.currentAngle + finalAngleChange) % 360;

			if(this.game.currentGear === this){
				this.rotatePlayer(timeDelta, finalAngleChange);
			}
		}

		// //NEED TO DRY - BLOCK WITH MINOR DIFF 2of2 PARTS
		else if((this.timeBufferCurrent % this.timeBufferThreshold) < this.timeBufferThreshold * .75){
			finalAngleChange = this.rotationVel * rotationDirection * timeDelta / 10;
			this.currentAngle = (this.currentAngle + finalAngleChange) % 360;

			if(this.game.currentGear === this){
					this.rotatePlayer(timeDelta, finalAngleChange);
			}
		}
	}

	calcPlayerAngleRelToGearRadians(pos){
		// What about at X === 0...?

		if(pos[0] >= 0) {
			// If positive X
			return Math.atan(pos[1] / pos[0]);
		} else {
			// If negative X
			return Math.PI + Math.atan(pos[1] / pos[0]);
		}
		
	}

	rotatePlayer(timeDelta, finalAngleChange){
		if(this.rotationVel > 0){
			// if(this.game.player.pos[0] === this.pos[0] && this.game.player.pos[1] === this.pos[1] || this.game.player.isMoving ){
			if(this.game.player.pos[0] === this.pos[0] && this.game.player.pos[1] === this.pos[1]){

			} else {
				// //Rotate the player based on player's current distance from gear center.
				// //------------------------------------------------------------------------------
				// //First, find player's current pos relative to gear pos as origin:
				const playerPosRelativeToGear = [this.game.player.pos[0] - this.pos[0], this.game.player.pos[1] - this.pos[1]];
				
				// //FIX of issue:
				// //Get the angle in radians relative to gear pos as origin:
				const playerAngleRelToGearRadians = this.calcPlayerAngleRelToGearRadians(playerPosRelativeToGear); //radians
				
				// //Apply the same angle change made to gear as to player:
				// //It has to be in radians.
				const finalAngleChangeRadians = Util.radians(finalAngleChange); //radians
				const playerNewAngleRadians = playerAngleRelToGearRadians + finalAngleChangeRadians; //radians
				// //Get new player position relative to gear as origin after angle change:
				const hypotenuse = Util.distance([0,0], playerPosRelativeToGear);
				// if(playerNewAngleRadians)
				const playerNewPosRelativeToGear = Util.scaledVectorRadians(playerNewAngleRadians, hypotenuse);
				// //Finally, translate new player position from gear origin to canvas origin:
				const newPlayerFinalPos = [playerNewPosRelativeToGear[0] + this.pos[0], playerNewPosRelativeToGear[1] + this.pos[1]];
				// this.game.player.pos = newPlayerFinalPos;
				this.game.player.updatePos(newPlayerFinalPos);
				
			}
		}
	}
}

export default Gear;