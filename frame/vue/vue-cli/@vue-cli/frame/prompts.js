// module.exports = [
// 	{
// 		type: 'input',
// 		name: 'locale',
// 		message: '这是一个输出',
// 		valudate: input => !!input,
// 		default: '这是输出的默认值'
// 	},
// 	// ...
// ]
module.exports = (pkg) => {
	// console.log('prompts', pkg)
	// pkg:  package.json
	// if (...) {
	// 	...
	// }
	return [
		// {
		// 	type: 'checkbox',
		// 	name: 'installOptions'
		// 	message: '请选择需要安装的插件',
		// 	choices: [{checked: true}],
		// 	default: ['vue-router', 'vuex'] 
		// }
	]
}

// 若要了解关于type的知识，请进入：https://github.com/SBoudrias/Inquirer.js