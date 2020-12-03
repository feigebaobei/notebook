# webpack常用的插件

## html-webpack-plugin

生成thml文件。

## mini-css-extract-plugin(旧包extract-text-webpack-plugin)

分离js里的css.
这个插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持按需加载CSS和SourceMaps。\

### usage

```
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
}
```

## clean-webpack-plugin

清除上次打包结果。

## webpack.optimize.CommonsChunkPlugin(options)

提取出公共代码。

## webpack-dev-server(HotModuleReplacementPlugin)

热更新替换

## webpack.optimize.UglifyJsPlugin()

压缩代码

## webpack.DllPlugin()

## CompressionWebpackPlugin
## copy-webpack-plugin

把指定的资源复制到指定的目录。
```
plugins: [
  new CopeWebpackPlugin([{
    from: './src/assets/images',
    to: './assets/images',
    ignore: ['.*']
  }])
]
```
## webpack-merge(这不是一个webpack的插件)
