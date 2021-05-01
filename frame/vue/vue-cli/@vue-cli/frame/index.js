module.exports = (api, options) => {
	// api      pluginapi实例
	// options  vue.config.js配置对象

	//修改webpack配置
	api.chainWebpack(webpackConfig => {
		webpackConfig.plugin('plugin-name').use(AueAutoRoutingPlugin, [
		{
			pages: 'src/pages',
			nested: true
		}])
	})
	// 创建新的cli-service命令
	api.registerCommand('greet', {
		description: '...',
		usage: 'vue-cli-service greet',
		options: {'--name': '...'}
	}, (args) => {
		if (args.name) {
			// ...
		} else {
			// ...
		}
		console.log('greet say hi for you.')
	})
	// 修改vue-cli-service命令
	const { serve } = api.service.commands
	const serveFn = serve.fn
	serve.fn = (...args) => {
		return serveFn(...args).then(res => {
			if (res && res.url) {
				// ...
			}
		})
	}
}

// 为命令指定模式
module.exports.defaultModes = {
	build: 'production'
}
