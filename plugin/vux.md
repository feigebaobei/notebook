主要用于移动端的基于`weui`和`vue`的ui组件库。  

有专用的vux-loader。
使用css预处理工具是less.不影响开发者使用sass等。  

安装  

	npm i vux // 有时需要翻墙
    // 还需要安装 vux-loader
    // npm i vux-loader // 有时需要翻墙
    // npm i less -D // 有时需要翻墙
    // npm i less-loader -D // 有时需要翻墙

vux2必须配合vux-loader使用, 请在build/webpack.base.conf.js里参照如下代码进行配置：

const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})

##基礎組件  

icon  

	<icon type="success"></icon> // type 決定icon的樣式。
	<icon type="info" is-msg></icon> // is-msg 大圖標

x-icon  
x-button