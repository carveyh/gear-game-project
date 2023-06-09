Up Next:

- Translate concepts from gear-game-research into gear-game-project. Further research:
	- DONE - Asteroids, Bonus 2: requestAnimationFrame (vs using setInterval)
	- DONE - Github: how to cut a branch to work on another feature, revisit Screwdoku project - sort of.
	- Refresher on basic gear trigonometry
	- Graph all gears per set.


- class GameView
	+ MOVES defines direction of WASD movement
	+ constructor(game, ctx): binds keypress eventListeners. 
	+ start(): sets interval of updating each item's move() and draw()
- class Game
	+ DIM_X
	+ DIM_Y
	+ Load all images
	+ gearList // adding a new gear, can only be added if does not collide with another gear, and connects with at least one existing gear. New gear 
- class MovingObject
	- Define Player < MovingObject class
	- Define Gear < MovingObject class
		+ pos
		+ radius
		+ subdivisions // e.g. split into 6 arms
		+ startingSubDivision // e.g. start at arm 4 of 6
		+ connectedGears[]

- IDEAS:
	- Run button, running on a gear will speed rotation of connected gear, to activate gears that slow return to "deactivated" state
	
- FLOW:
	- Intro modal: welcome to the weird world of gears! What the heck is going on?? Move with WASD to start...and find out...

	- What makes you tick
	- IMAGAGAIMS

Sources:
- git branching and merging: https://stackoverflow.com/questions/4470523/create-a-branch-in-git-from-another-branch

- Math.min(a, b) could be useful to ensure "snapping" of gears to ensure proper bridging of paths, in additional to explicitly defining tolerances. Discovery: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame 

- Rotating Coordinate Systems. Source: https://www.youtube.com/watch?v=-HcDl_gyeMs

- [UNUSED] Refresher on gear trigonometry. Source: https://www.youtube.com/watch?v=oKpedwnJQVk

- Gear icon. Source: https://www.freeiconspng.com/images/gear-icon

- Possible tutorial reference on top-down game dev: https://youtu.be/C4_iRLlPNFc

- Possible collision detection implemention / backup based on color sampling (not ideal): https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mousemove 

- Inverse trig review. Source: https://www.mathsisfun.com/algebra/trig-finding-angle-right-triangle.html