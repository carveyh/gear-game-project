//----------------------------------------------------------------------------------------
// Math to convert from default coordinate system to
// a GearPath's coordinate system to check for collision detection etc
//----------------------------------------------------------------------------------------

// Return an x,y position translated by an x,y vector.
export function translatedPos(startPos, translationVec){
	return [startPos[0] - translationVec[0], startPos[1] - translationVec[1]];
}

// Return a new x,y position in terms of the new x,y axes after rotating the origin "degrees" degrees (not radians)
export function rotatedPos(startPos, degrees){
	let rads = radians(degrees);
	let rotatedX = (Math.cos(rads) * startPos[0]) + (Math.sin(rads) * startPos[1]);
	let rotatedY = (-1 * Math.sin(rads) * startPos[0]) + (Math.cos(rads) * startPos[1]);
	return [rotatedX, rotatedY];
}

// Return a new x,y position in terms of the new x,y axes after first translating origin by a vector and then rotating new origin "degrees" degrees (not radians)
export function translatedAndRotatedPos(startPos, translationVec, degrees){
	let translated = translatedPos(startPos, translationVec);
	return rotatedPos(translated, degrees);
}

//----------------------------------------------------------------------------------------
// Math / utility functions.
//----------------------------------------------------------------------------------------

// Return a new x,y vector after coming two vectors via simple addition.
export function addTwoVectors(vec1, vec2) {
	return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}

// Return an x,y vector, given an angle in radians and a desired vector length
export function scaledVectorRadians(radians, length){
	return scale(unitVector(radians), length);
}

// Return an x,y vector, given an angle in degrees and a desired vector length
export function scaledVectorDegrees(degrees, length){
	let radians = this.radians(degrees);
	return scale(unitVector(radians), length);
}


// Return the x,y coords of a vector of length 1 given an angle in radians
export function unitVector(radians) {
	return [Math.sin(radians), Math.cos(radians)];
}

// Return an x,y vector scaled by magnitude m
export function scale(vec, m) {
	return [vec[0] * m, vec[1] * m];
}

// Convert an angle from degrees to radians
export function radians(degrees) {
	return degrees * 2 * Math.PI / 360;
}

// Return the distance between two x,y points (absolute value)
export function distance(pointA, pointB){
	return Math.abs(Math.sqrt(
		((pointB[0] - pointA[0]) ** 2) +
		((pointB[1] - pointA[1]) ** 2)
	))
}

// Return the length of a vector given a vector position
export function norm(vec){
	return distance([0,0], vec);
}

// Return a vector with a length of 1 given a current vector position, a unit "direction" multiplier.
export function dir(vec) {
	return scale(vec, (1 / norm(vec)));
}

