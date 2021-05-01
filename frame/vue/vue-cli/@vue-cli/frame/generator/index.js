module.exports = (api, options, ) => {
	// api      generatorapi实例
	// genOpt   generator选项
	// rootOpt  整个预设置对象

	// 创建新模板
	api.render('./template')
	// 扩展包。
	api.extendPackage({
		// 用于添加依赖
		dependencies: {
			'plugin-name': '0.0.0'
		},
		// 添加脚本，即定义脚本
		scripts: {
			greet: 'vue-cli-service greet'
		}
	})
	// 修改主文件
		// 引入插件
	api.injectImports(api.entryFile, `import router from './router'`)
	// 修改主文件
		// 为vue注入插件
	api.afterInvoke(() => {
		// 在文件被写入硬盘后调用
		const { EOL } = require('os') //操作系统特定的行末标志。posix: \n windows: \r\n
		const fs = require('fs')
		const contentMain = fs.readFileSync(api.resolve(api.entryFile), {encoding: 'utf-8'})
		const lines = contentMain.split(/\r?\n/g)
		const renderIndex = lines.findIndex(line => line.match(/render/))
		lines[renderIndex] += `${EOL} router,`
		fs.writeFileSync(api.entryFile, lines.join(EOL), {encoding: 'utf-8'})
	})

}