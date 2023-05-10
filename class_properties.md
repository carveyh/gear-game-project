<!-- MovingObject -->
@game: Game
@pos: [x,y]
@vel: [x,y]
@radius: integer
@color: `rgb(r,g,b,a)`

<!-- Gear extends MovingObject -->
@counterClockWise: boolean
@platformWidth: integer

@timeBufferThreshold: integer
@timeBufferStep: integer
@timeBufferCurrent: integer

@vertices: [degree1, degree2, ...]

@currentAngle: number <degree>
@rotationVel: integer <degree>
@rotationVelMin: integer <degree>
@rotationVelMax: integer <degree>
@rotationAcc: integer <degree>

@ringGlow: float
@ringGlowIncrement: float
@ringGlowMax: float

@connectedGears: [Gear1, Gear2, ...]
@player: Player

<!-- StationaryGear extends Gear -->
