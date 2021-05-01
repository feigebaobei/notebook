module.exports = [
	{
		type: 'input',
		name: 'locale',
		message: '..',
		valudate: input => !!input,
		default: 'en'
	},
	// ...
]
// module.exports = (pkg) => {
	// pkg:  package.json
	// if (...) {
	// 	...
	// }
// 	return [...]
// }