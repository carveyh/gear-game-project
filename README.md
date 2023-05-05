BACKGROUND

Gear Game is a top-down 2D game whose core functionality revolves around gears. Using keyboard input, the player can navigate a main character through a world of interconnected (or disconnected) gears, each with linear paths on their faces. Traversal from one gear to another adjacent gear will only be possible if the paths connect at the point where the gears touch.

As a game, the basic win condition will be reaaching a specific location on a level, or collecting items from specific locations before moving to a desired location.

Gear Game has several variations as outlined below.

FUNCTIONALITY & MVPs

- Within Gear Game, players will be able to:
	- Start, pause, and reset the current playable level
	- Move across the face of a gear using directional keyboard input fixed to the viewport
	- Traverse from one gear to an adjacent gear if their paths connect
	- Manipulate gear states to change rotation direction (clockwise or counterclockwise), rotation periodicity, and rotation speed, for one or more gears at a time

- Additionally, this project will include:
	- An About modal describing the background and rules of the game
	- A production README

WIREFRAMES

<!-- ![[URL](https://wireframe.cc/e6LSUC)](https://wireframe.cc/e6LSUC) -->
![URL](./wireframe.png)

TECHNOLOGIES, LIBRARIES, AND APIs

This project will be implemented with the following technologies:
- The `Canvas API` to render the game board
- `Webpack` and `Babel` to bundle and transpile the source JavaScript code
- `npm` to manage project dependencies

IMPLEMENTATION TIMELINE

- Friday & Weekend: Setup project, including getting webpack up and running. Get canvas to show up on screen, familiarity with Canvas API. Create `Player` and `Gear` classes. Adding basic sprites for visual appeal.
- Monday: Implement core functionality and underlying logic of Gear Game - player movement, gear movement, and periodicity to gear movement if time allows.
- Tuesday: Implement gear traversal and collision detection, and user controls.
- Wednesday: Implement a bonus feature if possible, and style overall webpage.
- Thursday Morning: Deploy to Github pages and initial community demos.

BONUS FEATURES

There are many potential spin-offs (badum-tsh) for this project, including:
- Gear variations
	- Gears with differing radii
	- Periodicity to gear movement if not already implemented
		- Smooth rotations (watches with "sweeping" for the second hand) vs "snap" rotations (watches with "ticking" for the second hand)
	- Gears offering irregular paths (disjointed (entry and exit points are not offset at 180 degrees), multi-path, dead ends)
	- Irregularly shaped gears
	- Independent sets of interconnected gears connected by regular platforms
	- 3d gear plane: gears may be "lifted" to another plane to disconnect them from a given system
	- "All green" abilities - coordinating a cascade of gear pathways to connect in rapid succession for satisfying player "flow"
- Enemy AI: 
	- Wandering their own gear faces, or if possible, traversal to other gears
	- Pathing towards player
	- Basic melee enemies - damage inflicted upon direct contact with player
	- Projectile enemies
		- ground-based projectiles' forward movement is fixed to the current gear
		- air-borne projectiles' forward movement is fixed to the overall viewport, do not change with current gear
	will either roam the map and wander, and traverse onto other gears if a connection is possible. Enemies can attack either via melee, or projectiles. A unique aspect of the game is some projectiles will continue forward movement following the same paths available to player/enemy movement
- Music
	- Basic volume, mute controls
	- Periodicity of gear rotations synchronized with background music
		- Or, specifically avoiding synchronicity with music if desired...and turning on synchronicity during specific events
		- Increasing music tempo during specific events
- Gameplay
	- Hot / cold system - all gears are "hot", players have a limit to how many "hot" gears they may traverse before taking incremental or game-ending damage. Limit can be refreshed by visiting "cold" spots
	- Walls attached to gears, players may manipulate gears to block projectiles


VERY BONUS FEATURES

- "Turn-based" aspect variation, gears and enemies only move with each gear traversal done by the player ("gear time" progresses only if player changes gear position)
- A viewport fixed to the player's current gear, with all other gears revolving around the current gear
- Time rewinding
