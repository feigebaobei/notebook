module.exports = (api, options) => {
	// console.log('frame index', api)
	// api      pluginapi实例
	// options  vue.config.js配置对象

	//修改webpack配置
	// api.chainWebpack(webpackConfig => {
	// 	webpackConfig.plugin('plugin-name').use(AueAutoRoutingPlugin, [
	// 	{
	// 		pages: 'src/pages',
	// 		nested: true
	// 	}])
	// })
	// 创建新的cli-service命令
	// api.registerCommand('greet', {
	// 	description: 'run console',
	// 	usage: 'vue-cli-service greet',
	// 	options: {'--name': 'input your name'}
	// }, (args) => {
	// 	console.log(`hi${args.name ? ', args.name' : '!'}`)
	// })
	// 修改vue-cli-service命令
	// const { serve } = api.service.commands
	// console.log('serve', serve)
	// const serveFn = serve.fn
	// serve.fn = (...args) => {
	// 	return serveFn(...args).then(res => {
	// 		if (res && res.url) {
	// 			// ...
	// 		}
	// 	})
	// }
}

// 为命令指定模式
// module.exports.defaultModes = {
// 	build: 'production'
// }
