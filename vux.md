主要用于移动端的基于`weui`和`vue`的ui组件库。  

有专用的vux-loader。
使用css预处理工具是less.不影响开发者使用sass等。  

安装  

	npm i vux

vux2必须配合vux-loader使用, 请在build/webpack.base.conf.js里参照如下代码进行配置：

const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})