import Example from './scripts/example';

document.addEventListener("DOMContentLoaded", () => {
	console.log("hello world");

	// Then just do "npm run watch" in terminal

	// Use defer in JS script tag in index.html? Yes we can, but standard practice is DOMContentLoaded.

	const main = document.getElementById('main');
	new Example(main)

})