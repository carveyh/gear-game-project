// Math / utility functions.

export function addVectors(vec1, vec2) {
	return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}

export function scaledVector(deg, length){
	return scale(unitVector(deg), length);
}

export function unitVector(deg) {
	return [Math.sin(deg), Math.cos(deg)];
}

export function scale(vec, m) {
	return [vec[0] * m, vec[1] * m];
}

export function radians(degrees) {
	return degrees * 2 * Math.PI / 360;
}

export function distance(pointA, pointB){
	return Math.abs(Math.sqrt(
		((pointB[0] - pointA[0]) ** 2) +
		((pointB[1] - pointA[1]) ** 2)
	))
}

export function norm(vec){
	return distance([0,0], vec);
}

export function dir(vec) { //normalize a velocity to scale of 1 pixel
	return scale(vec, (1 / norm(vec)));
}

