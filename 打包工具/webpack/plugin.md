# webpack常用的插件

## html-webpack-plugin

### 功能

1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

### 处理过程

将 webpack中`entry`配置的相关入口chunk  和  `extract-text-webpack-plugin`抽取的css样式   插入到该插件提供的`template`或者`templateContent`配置项指定的内容基础上生成一个html文件，具体插入方式是将样式`link`插入到`head`元素中，`script`插入到`head`或者`body`中。

### usage

可以不需要参数。
可以设置多个html页面。

```
plugins: [
  new HtmlWebpackPlugin({...}),
  new HtmlWebpackPlugin({...}),
  new HtmlWebpackPlugin({...})
]
```

#### 配置自定义模板

```
<!DOCTYPE html>
<html style="font-size: 20px">
  <head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <% for(var css in htmlWebpackPlugin.files.css) { %>
      <link href="<%= htmlWebpackPlugin.files.css[css] %>" rel="stylesheet" />
    <% } %>
  </head>
  <body>
    <div id="app"></div>
    <% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
      <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
    <% } %>
  </body>
</html>
```
htmlWebpackPlugin是html-webpack-plugin插件在生成html文件过程中产生的数据。

### options

||说明|类型|默认||
|-|-|-|-|-|
|template||本地模板文件的位置|||
|templateContent|string / function|指定模板的内容，不与template共存。|||
|filename||文件名|index.html||
|hash|||||
|inject|Boolean(true:body(在body底部), false不注入)/head/body||||
|compile|||||
|favicon|||||
|minfy|||||
|files|||||
|showErrors|||||
|chunks|需要插入到模板中的chunk||把entry中所有的chunk注入到模板||
|excludeChunks|不需要注入的chunk||||
|chunkSortMode|注入的顺序|none/auto/function|auto||
|title|||||
|xhtml|是否渲染link为自闭合标签。|Boolean|||
|cache|是否缓存打包结果。|Boolean|||
|showErrors||Boolean|||
|minify|是否压缩||||

### 插件事件

1. 要么全插入head,要么全插入body.
2. 不支持html中文件内联。

异步事件
html-webpack-plugin-before-html-generation
html-webpack-plugin-before-html-processing
html-webpack-plugin-alter-asset-tags
html-webpack-plugin-after-html-processing
html-webpack-plugin-after-emit
同步事件
html-webpack-plugin-alter-chunks

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
