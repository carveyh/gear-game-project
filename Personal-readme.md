Up Next:

- Translate concepts from gear-game-research into gear-game-project:

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
	
